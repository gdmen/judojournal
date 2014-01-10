var TEMPLATES = {};

TEMPLATES['model/status/show'] = _.template([
  "<div class='status'>",
  "<%= rating %>",
  "<br />",
  "<%= text %>",
  "<br />",
  "<%= lbs %>",
  "</div>",
].join(''));

TEMPLATES['model/event/show'] = _.template([
  "<div id='prior_status'></div>",
  "<br />",
  "<hr />",
  "<br />",
  "<%= rating %>",
  "<br />",
  "<%= start_time %>",
  "<br />",
  "<%= end_time %>",
].join(''));

TEMPLATES['model/status/edit'] = _.template([
  "<h4>Status</h2>",
  "<input type='text' name='rating' value='<%= rating %>' />",
  "<br />",
  "<input type='text' name='text' value='<%= text %>' />",
  "<br />",
  "<input type='text' name='lbs' value='<%= lbs %>' />",
].join(''));

TEMPLATES['model/event/edit'] = _.template([
  "<h4>Event</h2>",
  "<br />",
  "<input type='text' name='rating' value='<%= rating %>' />",
  "<br />",
  "<input type='text' name='start_time' value='<%= start_time %>' />",
  "<br />",
  "<input type='text' name='end_time' value='<%= end_time %>' />",
  "<div id='prior_status'></div>",
].join(''));