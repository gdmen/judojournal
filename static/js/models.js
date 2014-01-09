$(function(){
  var LocationModel = Backbone.Model.extend({
    urlRoot: '/api/locations/',
  });
  var GoalModel = Backbone.Model.extend({
    urlRoot: '/api/goals/',
  });
  var QuestionModel = Backbone.Model.extend({
    urlRoot: '/api/questions/',
  });
  var StatusModel = Backbone.Model.extend({
    urlRoot: '/api/statuses/',
  });
  var EventModel = Backbone.Model.extend({
    urlRoot: '/api/events/',
  });
  
  /*var location = new LocationModel({id: "1"});
  location.fetch({
    success: function (x) {
      console.log(x.toJSON());
    }
  });*/
  
  var status = new StatusModel({id: "1"});
  status.fetch({
    success: function (x) {
      console.log(x.toJSON());
  var event = new EventModel();
  event.save(
    {
      rating: 3,
      start_time: "2012-09-04 06:00Z",
      end_time: "2012-09-04 06:01Z",
      prior_status: 1,
    },
    {
      success: function (x) {
        console.log(x.toJSON());
      }
    }
  );
    }
  });
      
  var new_loc = new LocationModel();
  /*new_loc.save({ name: "bb location", address: "addr" }, {
    success: function (x) {
      console.log(x.toJSON());
    }
  });*/
});
//2012-09-04 06:00Z