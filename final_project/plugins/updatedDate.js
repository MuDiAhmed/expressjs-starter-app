function updateDate(schema, options) {
  schema.pre(
    ["findOneAndUpdate", "update", "updateOne", "updateMany"],
    { query: true, document: false },
    function() {
      if (!schema.paths.updateDate) return;
      this.set({ updateDate: Date.now() });
    }
  );
}

module.exports = updateDate;
