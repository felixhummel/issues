function(resp) {
  var data = {};
  var replies = resp.rows.map(function(row) {
    return {
      text: row.value && row.value.reply
      // TODO author
    };
  });
  return {replies:replies};
};
