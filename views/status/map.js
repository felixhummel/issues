function(doc) {
  if (doc.type == "issue") {
    // emit assigned_to here, so we can query by key
    emit([doc.status, doc.created_at], doc)
  }
}

