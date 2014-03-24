Template.grapher.logged_in = function () {
  return Meteor.user();
};
Template.grapher.graph_selected = function () {
  return Session.get("current_graph");
};
Template.graphs_page.has_graphs = function () {
  return GraphsModel.find({}).count();
}
Template.graphs_page.graphs = function () {
  return GraphsModel.find({});
}
  

