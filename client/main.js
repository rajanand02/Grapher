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
Template.graphs_page.events({
  "click #new_graph" : function() {
    Grapher.Graphs.create("New Graph (double click to rename)", Meteor.userId());
  },
  "dblclick .graph_title" : function() {
    var new_name = prompt("Please enter the new name", this.name);
    if(new_name) {
      Grapher.Graphs.rename(this._id, new_name);
    }
  },
  "click .delete_graph" : function() {
    if(confirm("Are you sure you want to remove '" + this.name + "'")) {
      Grapher.Graphs.delete(this._id);
    }
  },
  "click .open_graph" : function() {
    Grapher.Graphs.change_current(this);
  }
});
Template.nodes_page.graph_name = function(){
  var graph = Session.get("current_graph");
  return graph.name;
}
Template.nodes_page.events({
  'click #new_node' : function(){
    var graph = Session.get("current_graph");
    Grapher.Nodes.create("New Node", "blue", {x:250, y:250}, 
                         graph._id);
  },
  'click .remove_node' : function(){
    Grapher.Nodes.delete(this._id);
  },
  'dblclick .node_text' : function(){
    var text = prompt("Please enter the new text", this.text);
    if(text){
      Grapher.Nodes.change_text(this._id, text);
    }
  }, 
  'click #go_back' : function(){
    Session.set("current_graph");
  },
  'click .node' : select_node,
  'click #relationships' : unselect_node,
  'click .color_box' : color_node, 
  'mouseover .node' : drag_node,
  'click .node_border' : add_relationship,
  'mousemove #node_area' : draw_line,
  'dblclick .rel_line' : delete_relationship
});


function sleect_node() {
  Session.set("node_selected", this._id);
}
function unselect_node() {
  if (e.target.id == "relationships") {
    Session.set("node_selected");
  }
}

Template.node.selected = function () {
  if (Session.equals("node_selected", this._id)) {
    return "node_selected";
  }
  return "";
}

function color_node(e) {
  var color = $(e.target).attr("color");
  var node = Session.get("node_selected");
  if (color && node) {
    Grapher.Nodes.change_color(node,color);
 } 
}
