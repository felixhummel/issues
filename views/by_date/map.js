function(doc) {
  if (doc.type == "issue") {
    emit(doc.created_at, doc)
  }
}

