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
JJ.router.on("route:unknown", JJ.Util.unknownRoute);

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start({pushState: true, root: "/"});

function homeRoute() {
  console.log("HOME");
  var entries = new JJ.Models.JudoEntryCollection();
  entries.fetch({
    success: function(c) {
      JJ.AppView.showView(new JJ.Views.Home({entries: c}));
    },
    error: JJ.Util.backboneError,
  });
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