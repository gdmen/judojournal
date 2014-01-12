$(document).foundation();

$(function() {

var AppRouter = Backbone.Router.extend({
  routes: {
    "": "home",
    "entry/:id": "showEvent",
    "entry/:id/edit": "editEvent",
    "*unknown": "unknownRoute" // Backbone will try match the route above first
  }
});
// Instantiate the router
var app_router = new AppRouter;

app_router.on('route:home', home);
app_router.on('route:editEvent', editEvent);
app_router.on('route:showEvent', showEvent);
app_router.on('route:unknownRoute', handleUnknownRoute);
// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();

function home() {
  console.log("HOME!");
}

function editEvent(id) {
  if (id === "#") {
    var event = new EventModel();
    new EditEventView({model: event, el: $('#content'), prior_status: new StatusModel(), location: new LocationModel(), activity: new ActivityModel()});
  } else {
    var event = new EventModel({id: id});
    event.fetch({
      success: function (m) {
        var prior_status = new StatusModel({id: m.get('prior_status')});
        prior_status.fetch();
        var location = new LocationModel({id: m.get('location')});
        location.fetch();
        var activity = new ActivityModel({id: m.get('activity')});
        activity.fetch();
        new EditEventView({model: m, el: $('#content'), prior_status: prior_status, location: location, activity: activity});
      },
      error: handleUnknownRoute
    });
  }
}

function showEvent(id) {
  event = new EventModel({id: id});
  event.fetch({
    success: function (m) {
      var prior_status = new StatusModel({id: m.get('prior_status')});
      prior_status.fetch();
      var location = new LocationModel({id: m.get('location')});
      location.fetch();
      var activity = new ActivityModel({id: m.get('activity')});
      activity.fetch();
      new ShowEventView({model: m, el: $('#content'), prior_status: prior_status, location: location, activity: activity});
    },
    error: handleUnknownRoute
  });
}

function handleUnknownRoute() {
  //window.location = "/";
  console.log("UNKNOWN ROUTE");
}

});

/*

    event.fetch({
      success: function (m) {
        console.log(m.toJSON());
      },
      error: handleUnknownRoute
    });
    */