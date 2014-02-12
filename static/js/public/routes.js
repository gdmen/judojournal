JJ.Router = Backbone.Router.extend({
  routes: {
    "(/)": "home",
    "entry/:id(/)": "entry",
    "*unknown": "unknown"
  }
});

JJ.router = new JJ.Router;
JJ.router.on("route:home", homeRoute);
JJ.router.on("route:entry", entryRoute);
//JJ.router.on("route:showEntry", showEntry);
JJ.router.on("route:unknown", JJ.Util.unknownRoute);

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start({pushState: true, root: "/"});

function homeRoute() {
  console.log("HOME");
  JJ.AppView.showView(new JJ.Views.Home({}));
}

function entryRoute(id) {
	console.log("ENTRY");
  // Else load an existing Entry.
  var entry = new JJ.Models.JudoEntry({id: id});
  entry.fetch({
    success: function(m) {
      JJ.AppView.showView(new JJ.Views.ViewJudoEntry({model: m}));
    },
    error: JJ.Util.unknownRoute
  });
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
    error: JJ.Util.unknownRoute
  });
}
*/