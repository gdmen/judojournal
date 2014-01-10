var TEMPLATES = {};

TEMPLATES['model/status'] = _.template([
  "<div class='status'>",
  "<%= rating %>",
  "<br />",
  "<%= text %>",
  "<br />",
  "<%= lbs %>",
  "</div>",
].join(''));

TEMPLATES['model/event'] = _.template([
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