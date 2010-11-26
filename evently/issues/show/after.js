function(resp) {
  // remember complete doc in current
  $$("#content").current = resp.rows[0].value;
  var status = $$("#content").current.status;
  $("select", this).val(status);
  $("table", this).css('border-left', '2px solid #3E83C9');
  $("table tr:even").addClass("even");
  // no special stuff for comments
  $("#replies").parents("tr").removeClass('even')
};
