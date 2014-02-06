/*
 * http://lostechies.com/derickbailey/
 */
function AppView(){/*
	 * Hacky resets since backbone seems to not do a full page refresh between pages.
	 */
	this.pageReset = function() {
		// Foundation menu
		$(".top-bar").removeClass("expanded");
	};
 
	this.clearView = function() {
		console.log("clearView");
		if (this.currentView){
			this.currentView.close();
		}
		this.pageReset();
	};
	
	this.showView = function(view) {
		console.log("showView");
		this.currentView = view;
		$("#content").html(this.currentView.el);
		this.currentView.render();
  };
 
}
JJ.AppView = new AppView();

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

function home() {
  JJ.AppView.showView(new JJ.Views.HomePage({}));
}

function editEntry(id) {
	console.log("ROUTED");
	JJ.AppView.clearView();
  // # signifies a new Entry is being created.
  if (id === "#") {
    var entry = new JJ.Models.JudoEntry();
    JJ.AppView.showView(new JJ.Views.EditJudoEntry({model: entry}));
  } else {
  // Else load an existing Entry.
    var entry = new JJ.Models.JudoEntry({id: id});
    entry.fetch({
      success: function(m) {
        JJ.AppView.showView(new JJ.Views.EditJudoEntry({model: m}));
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