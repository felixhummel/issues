function(doc) {
  if (doc.type == "reply") {
    emit([doc.issue, doc.created_at], doc)
  }
}

