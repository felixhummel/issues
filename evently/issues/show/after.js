function(resp) {
  // remember complete doc in current
  $$("#content").current = resp.rows[0].value;
  var status = $$("#content").current.status;
  $("select", this).val(status);
};
