JJ.Router = Backbone.Router.extend({
  routes: {
    "(/)": "home",
    //"entry/:id(/)": "showEntry",
    "entry/:id/edit(/)": "editEntry",
    "*unknown": "unknownRoute"
  }
});

JJ.router = new JJ.Router;
JJ.router.on('route:home', home);
JJ.router.on('route:editEntry', editEntry);
//JJ.router.on('route:showEntry', showEntry);
JJ.router.on('route:unknownRoute', JJ.Util.handleUnknownRoute);

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();

/*
 * Hacky resets since backbone seems to not do a full page refresh between pages.
 */
function pageReset() {
	// Foundation menu
	$(".top-bar").removeClass("expanded");
}

function home() {
	pageReset();
  new JJ.Views.HomePage({el: $('#content')});
}

function editEntry(id) {
	pageReset();
  // # signifies a new Entry is being created.
  if (id === "#") {
    var entry = new JJ.Models.JudoEntry();
    new JJ.Views.EditJudoEntry({model: entry, el: $('#content')});
  } else {
  // Else load an existing Entry.
    var entry = new JJ.Models.JudoEntry({id: id});
    entry.fetch({
      success: function(m) {
        new JJ.Views.EditJudoEntry({model: m, el: $('#content')});
      },
      error: JJ.Util.handleUnknownRoute
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
    error: JJ.Util.handleUnknownRoute
  });
}
*/