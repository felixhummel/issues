function(resp, e) {
  // XXX hack. must be a better way to get new row...
  var new_row = $(this).children().last();
  new_row.click(function() {
    var link = $(this).attr('link');
    window.location = link;
  });
  new_row.mouseover(function(){$(this).addClass("over");}).mouseout(function(){$(this).removeClass("over");}).children().css('cursor', 'pointer');
  $("tbody tr:even").addClass("even");
}
