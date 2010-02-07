(function($) {
  // utility functions used in the implementation
  
  function forIn(obj, fun) {
    var name;
    for (name in obj) {
      if (obj.hasOwnProperty(name)) {
        fun(name, obj[name]);
      }
    }
  };
  
  function runIfFun(me, fun, args) {
    // if the field is a function, call it, bound to the widget
    if (typeof fun == "function") {
      return fun.apply(me, args);
    } else {
      return fun;
    }
  }

  $.evently = {
    connect : function(source, target, events) {
      events.forEach(function(e) {
        source.bind(e, function() {
          var args = $.makeArray(arguments);
          args.shift();
          target.trigger(e, args);
        });
      });
    },
    paths : []
  };
  
  $.fn.evently = function(events, app, init_args) {

    var self = $(this);

    function eventlyHandler(name, e) {
      if (e.path) {
        $(this).pathbinder(name, e.path);
      }
      if (e.template || e.selectors) {
        templated(self, name, e);
      } else if (e.fun) {
        self.bind(name, e.fun);        
      } else if (typeof e == "string") {
        self.bind(name, function() {
          $(this).trigger(e);
        });
      } else if (typeof e == "function") {
        self.bind(name, e);
      } else if ($.isArray(e)) { 
        for (var i=0; i < e.length; i++) {
          // handle arrays recursively
          eventlyHandler(name, e[i]);
        };
      }
    };



    function applySelectors(me, selectors) {
      forIn(selectors, function(selector, bindings) {
        forIn(bindings, function(name, evs) {
          // $.log("bind "+name+" to "+selector+" to trigger "+evs);
          $(selector, me).bind(name, function() {
            var ev, self = $(this);
            if ($.isArray(evs)) {
              for (var i=0; i < evs.length; i++) {
                ev = evs[i];
                if (typeof ev == "function") {
                  ev.apply(self, arguments);
                } else {
                  self.trigger(ev);              
                }
              }
            } else {
              if (typeof evs == "function") {
                evs.apply(self, arguments);
              } else {
                self.trigger(evs);              
              }
            }
            return false;
          });
        });
      });
    };

    function templated(ctx, name, e) {
      ctx.bind(name, function() {
        var args = $.makeArray(arguments);
        var me = $(this), selectors, items;
        if (e.template) {
          me.html($.mustache(
            runIfFun(me, e.template, args),
            runIfFun(me, e.data, args), 
            runIfFun(me, e.partials, args)));
        }
        selectors = runIfFun(me, e.selectors, args);
        if (selectors) {
          applySelectors(me, selectors);
        }
        if (e.after) {
          e.after.apply(me, args);
        }
        if (e.changes) {
          setupChanges(me, app, e.changes);
        }
      });
    };

    // setup the handlers onto self
    forIn(events, eventlyHandler);
    
    if (!($.pathbinder && $.pathbinder.hashChanged()) && events.init) {
      self.trigger("init", init_args);
    }
  };
  
  function changesQuery(me, app, c) {
    $.log("changesQuery")
    var q = runIfFun(me, c.query, [params]); // todo get the params from the path event
    var viewName = q.view;
    delete q.view;
    var userSuccess = q.success;
    delete q.success;
    q.success = function(resp) {
      // here is where we handle the per-row templates
      var act = c.render || "append";
      if (c.template) {
        resp.rows.reverse().forEach(function(row) {
          var item = ($.mustache(
            runIfFun(me, c.template, [row]),
            runIfFun(me, c.data, [row]), 
            runIfFun(me, c.partials, [row])));
          selectors = runIfFun(me, c.selectors, [row]);
          if (selectors) {
            applySelectors(item, selectors);
          }
          me[act](item);
        });
      }
      userSuccess && userSuccess(resp);
    };
    newRows(app, viewName, q);
  }  

  function setupChanges(me, app, changes) {
    $.log("setupChanges")
    // items has fields:
    // render, query, template, data
    $.log(changes)
    // todo: scope this to a db

    $("body").bind("evently.changes", function(change) {
      var c = runIfFun(me, changes, [change]);
      if (c.query) {
        // todo the initial setup might want to run slightly differently (use path info)
        changesQuery(me, app, c)
      } else {
        // just render the template with the data (which might be a fun)
      }
    });
  };
  
  // this is for the items handler
  var lastViewId, highKey, inFlight;
  function newRows(app, view, opts) {
    $.log(["newRows", arguments])
    // on success we'll set the top key
    var thisViewId, successCallback = opts.success, full = false;
    function successFun(resp) {
      inFlight = false;
      if (resp.rows.length > 0) {
        if (opts.descending) {
          highKey = resp.rows[0].key;
        } else {
          highKey = resp.rows[resp.rows.length -1].key;
        }
      };
      resp.rows = resp.rows.filter(function(a,b) {
        return a.key != b.key;
      });
      if (successCallback) successCallback(resp, full);
    };
    opts.success = successFun;
    
    if (opts.descending) {
      thisViewId = view + (opts.startkey ? opts.startkey.toSource() : "");
    } else {
      thisViewId = view + (opts.endkey ? opts.endkey.toSource() : "");
    }
    // $.log(["thisViewId",thisViewId])
    // for query we'll set keys
    if (thisViewId == lastViewId) {
      // we only want the rows newer than changesKey
      if (opts.descending) {
        opts.endkey = highKey;
        // opts.inclusive_end = false;
      } else {
        opts.startkey = highKey;
      }
      // $.log("more view stuff")
      if (!inFlight) {
        inFlight = true;
        app.view(view, opts);
      }
    } else {
      // full refresh
      // $.log("new view stuff")
      full = true;
      lastViewId = thisViewId;
      highKey = null;
      inFlight = true;
      app.view(view, opts);
    }
  };
  setTimeout(function() {
    console.log('trigger("evently.changes")')
    $("body").trigger("evently.changes");
  },100);
})(jQuery);
