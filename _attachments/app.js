$.couch.app(function(app) {
  var since_seq = 0;
  var userProfile;
  // todo, use the templates ddoc object for this.
  
  $.couch.app.profile.loggedOut.mustache = app.ddoc.templates.logged_out;
  
  $.couch.app.profile.profileReady.mustache = app.ddoc.templates.create_task;

  $.couch.app.profile.profileReady.selectors = {
    form : {
      submit : function() {
        var texta = $("textarea[name=body]", this);
        var newTask = {
          body : texta.val(),
          type : "task",
          created_at : new Date(),
          authorProfile : userProfile
        };
        app.db.saveDoc(newTask, {
          success : function() {
            texta.val('');
          }
        });
        return false;
      }
    }
  };

  $.couch.app.profile.profileReady.after = function(e, profile) {
    // userProfile is in the outer closure
    userProfile = profile;
  };
  
  // $("#profile").evently($.couch.app.profile);
  // 
  // // link the widgets
  // $.evently.connect($("#account"), $("#profile"), ["loggedIn", "loggedOut"]);
  // 
  // // setup the account widget
  // $("#account").evently($.couch.app.account);
  // 
  // todo move to a plugin somewhere
  $.linkify = function(body) {
    return body.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,function(a) {
      return '<a target="_blank" href="'+a+'">'+a+'</a>';
    }).replace(/\@([\w\-]+)/g,function(user,name) {
      return '<a href="#/mentions/'+encodeURIComponent(name)+'">'+user+'</a>';
    }).replace(/\#([\w\-\.]+)/g,function(word,tag) {
      return '<a href="#/tags/'+encodeURIComponent(tag)+'">'+word+'</a>';
    });
  };

  
  var replies = {
    init : {
      mustache : app.ddoc.templates.replies,
      data : function(e, rows) {
        return {
          rows : rows.map(function(r) {
            // todo eliminate duplication here
            var v = r.value;
            return {
              avatar_url : v.authorProfile && v.authorProfile.gravatar_url,
              body : $.linkify($.mustache.escape(r.value.body)),
              name : v.authorProfile && v.authorProfile.name,
              name_uri : v.authorProfile && encodeURIComponent(v.authorProfile.name),
              id : r.id
            }
          })
        }
      } 
    }
  };
  
  // var tagcloud = {
  //   init : "refresh",
  //   refresh : function() {
  //     var tagcloud = $(this);
  //     app.view("tag-cloud", {
  //       group_level : 1,
  //       success : function(resp) {
  //         tagcloud.trigger("redraw", [resp.rows]);
  //       }
  //     });
  //   },
  //   redraw : {
  //     mustache : app.ddoc.templates.tag_cloud,
  //     data : function(e, rows) {
  //       var tags = rows.map(function(r) {
  //         return {
  //           tag : r.key,
  //           // todo use a new mustache delimiter for this
  //           tag_uri : encodeURIComponent(r.key),
  //           count : r.value * 10
  //         }
  //       });
  //       return {tags:tags};
  //     }
  //   }
  // };

  var tagcloud = {
    init : {
      query : {
        view : "tag-cloud",
        group_level : 1,
      },
      mustache : app.ddoc.templates.tag_cloud,
      data : function(resp) {
        $.log("tagcloud data", arguments)
        var tags = resp.rows.map(function(r) {
          return {
            tag : r.key,
            // todo use a new mustache delimiter for this
            tag_uri : encodeURIComponent(r.key),
            count : r.value * 10
          }
        });
        return {tags:tags};
      }
    }
  };
  
  var usercloud = {
    init : "foo",
    foo : {
      query : {
        view : "user-cloud",
        group_level : 1,
      },
      mustache : app.ddoc.templates.user_cloud,
      data : function(resp) {
        var users = resp.rows.map(function(r) {
          return {
            user : r.key,
            user_uri : encodeURIComponent(r.key),
            count : r.value * 10
          }
        });
        return {users:users};
      }
    }
  };
  
  $("#tagcloud").evently(tagcloud, app);
  $("#usercloud").evently(usercloud, app);

  // connectToChanges(app, function() {
  //   $.log("tr cha")
  //   $("body").trigger("evently.changes");
  // });



});
