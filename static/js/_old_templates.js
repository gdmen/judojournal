var TEMPLATES = {};

TEMPLATES['model/status/edit'] = _.template([
  '<h4>Status</h2>',
  '<input type="text" name="rating" value="<%= rating %>" />',
  '<br />',
  '<input type="text" name="text" value="<%= text %>" />',
  '<br />',
  '<input type="text" name="lbs" value="<%= lbs %>" />',
].join(""));

TEMPLATES['model/location/edit'] = _.template([
  '<h4>location</h2>',
  '<input type="text" name="name" value="<%= name %>" />',
  '<br />',
  '<input type="text" name="url" value="<%= url %>" />',
  '<br />',
  '<input type="text" name="address" value="<%= address %>" />',
].join(""));

TEMPLATES['model/activity/edit'] = _.template([
  '<h4>activity</h2>',
  '<input type="text" name="activity" value="<%= activity %>" />',
  '<br />',
  '<input type="text" name="type" value="<%= type %>" />',
].join(""));

TEMPLATES['model/event/edit'] = _.template([
  '<h4>Event</h2>',
  '<br />',
  '<input type="text" name="rating" value="<%= rating %>" />',
  '<br />',
  '<input type="text" name="start_time" value="<%= start_time %>" />',
  '<br />',
  '<input type="text" name="end_time" value="<%= end_time %>" />',
  '<div id="prior_status"></div>',
  '<div id="location"></div>',
  '<div id="activity"></div>',
  '<button id="save">save</button>',
].join(""));