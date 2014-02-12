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
Backbone.history.start({root: "/m/"});

function homeRoute() {
  console.log("HOME");
  //JJ.AppView.showView(new JJ.Views.HomePage({}));
}

function entryRoute(id) {
	console.log("ENTRY");
  // 'new' signifies a new Entry is being created.
  if (id === "new") {
    var entry = new JJ.Models.JudoEntry();
    JJ.AppView.showView(new JJ.Views.EditJudoEntry({model: entry}));
  } else {
  // Else load an existing Entry.
    var entry = new JJ.Models.JudoEntry({id: id});
    entry.fetch({
      success: function(m) {
        JJ.AppView.showView(new JJ.Views.EditJudoEntry({model: m}));
      },
      error: JJ.Util.unknownRoute
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
    error: JJ.Util.unknownRoute
  });
}
*/