function(doc) {
  if (doc.type == "issue") {
    emit(doc._id, doc)
  }
}

