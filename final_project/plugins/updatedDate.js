function updateDate(schema, options) {
  schema.pre(
    [
      "findOneAndUpdate",
      "updateOne",
      "findByIdAndUpdate",
      "update",
      "updateMany"
    ],
    function() {
      if (!schema.paths.updateDate) return;
      this.set({ updateDate: Date.now() });
    }
  );
}

module.exports = updateDate;
