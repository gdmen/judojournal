JJ.Router = Backbone.Router.extend({
  routes: {
    "(/)": "home",
    //"entry/:id(/)": "showEntry",
    "entry/:id/edit(/)": "editEntry",
    "*unknown": "unknownRoute" // Backbone will try match the route above first
  }
});
// Instantiate the router
JJ.router = new JJ.Router;

JJ.router.on('route:home', home);
JJ.router.on('route:editEntry', editEntry);
//JJ.router.on('route:showEntry', showEntry);
JJ.router.on('route:unknownRoute', function() { console.log("router problem"); handleUnknownRoute()});
// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();

function home() {
  console.log("HOME!");
}

function editEntry(id) {
  var view = null;
  if (id === "#") {
    var entry = new JJ.EntryAModel();
    entry.set('type', new JJ.EntryTypeModel());
    entry.set('location', new JJ.LocationModel());
    view = new JJ.EditEntryView({model: entry, el: $('#content')});
  } else {
    var entry = new JJ.EntryAModel({id: id});
    entry.fetch({
      success: function(m) {
        view = new JJ.EditEntryView({model: m, el: $('#content')});
      },
      error: handleUnknownRoute
    });
  }
}
/*
function showEntry(id) {
  entry = new EntryAModel({id: id});
  entry.fetch({
    success: function(m) {
      var prior_status = new StatusModel({id: m.get('prior_status')});
      prior_status.fetch();
      var location = new LocationModel({id: m.get('location')});
      location.fetch();
      var activity = new ActivityModel({id: m.get('activity')});
      activity.fetch();
      new ShowEntryView({model: m, el: $('#content'), prior_status: prior_status, location: location, activity: activity});
    },
    error: handleUnknownRoute
  });
}
*/
function handleUnknownRoute() {
  //window.location = "/";
  console.log("UNKNOWN ROUTE");
}