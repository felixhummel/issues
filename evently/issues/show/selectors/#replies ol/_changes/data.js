function(row) {
  return {
    text: row.value && row.value.reply,
    created_at: row.value && $.prettyDate(row.value.created_at),
    author: row.value && row.value.profile.nickname
  };
};
