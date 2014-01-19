JJ.Router = Backbone.Router.extend({
  routes: {
    "(/)": "home",
    //"entry/:id(/)": "showEntry",
    "entry/:id/edit(/)": "editEntry",
    "*unknown": "unknownRoute"
  }
});

// Instantiate the router
JJ.router = new JJ.Router;

JJ.router.on('route:home', home);
JJ.router.on('route:editEntry', editEntry);
//JJ.router.on('route:showEntry', showEntry);
JJ.router.on('route:unknownRoute', JJ.handleUnknownRoute);

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();

function home() {
  JJ.debug.log("HOME!");
}

function editEntry(id) {
  if (id === "#") {
    var entry = new JJ.Models.JudoEntry();
    new JJ.Views.EditEntry({model: entry, el: $('#content')});
  } else {
    var entry = new JJ.Models.JudoEntry({id: id});
    entry.fetch({
      success: function(m) {
        new JJ.Views.EditEntry({model: m, el: $('#content')});
      },
      error: JJ.handleUnknownRoute
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
    error: JJ.handleUnknownRoute
  });
}
*/