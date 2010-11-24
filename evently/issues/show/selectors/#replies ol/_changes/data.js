function(row) {
  return {
    text: row.value && row.value.reply,
    author: row.value && row.value.profile.nickname
  };
};
