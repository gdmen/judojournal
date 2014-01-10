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
  console.log( "Edit event number " + id );
  var event;
  if (id === "#") {
    event = new EventModel();
  } else {
    event = new EventModel({id: id});
    event.fetch({
      success: function (m) {
        console.log('event loaded');
      },
      error: handleUnknownRoute
    });
  }
}

function handleUnknownRoute() {
  //window.location = "/";
  console.log("UNKNOWN ROUTE");
}
function showEvent(id) {
  event = new EventModel({id: id});
  event.fetch({
    success: function (m) {
      console.log('event loaded');
      var prior_status = new StatusModel({id: m.get('prior_status')});
      prior_status.fetch({
        success: function (n) {
          console.log('FETCHED STATUS');
        }});
      new EventView({model: m, el: $('#content'), prior_status: prior_status});
    },
    error: handleUnknownRoute
  });
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