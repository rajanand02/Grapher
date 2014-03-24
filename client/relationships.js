Grapher.Relationships = {
  create: function (node_a, node_b) {
    RelationshipsModel.insert(
      "node_a": node_a,
      "node_b": node_b
    );
  },
  delete: function (realationship) {
    RelationshipsModel.remove({
      "_id": realationship
    });
  }
};
