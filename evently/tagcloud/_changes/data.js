function(resp) {
  var tags = resp.rows.map(function(r) {
    return {
      tag : r.key,
      // todo use a new mustache delimiter for this
      tag_uri : encodeURIComponent(r.key),
      count : (r.value * 4) + 10
    };
  });
  return {tags:tags};
}
