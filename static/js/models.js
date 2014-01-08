$(function(){
  var LocationModel = Backbone.Model.extend({
    urlRoot: '/api/locations/',
  });
  var loc = new LocationModel({id: "2"});
  loc.fetch({
    success: function (loc) {
      console.log(loc.toJSON());
    }
  });
  var new_loc = new LocationModel();
  new_loc.save({ name: "bb location", address: "addr" }, {
    success: function (l) {
      console.log(l.toJSON());
    }
  });
});