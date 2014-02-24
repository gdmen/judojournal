(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['entry/judo/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "\r\n<div class=\"entry private\">\r\n  <div class=\"row\">\r\n\r\n    <div class=\"columns\">\r\n    \r\n      <div id=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-save\" class=\"entry-save disabled\">\r\n        <i class=\"saving fa fa-spinner fa-spin\"></i>\r\n        <i class=\"enabled fa fa-floppy-o\"></i>\r\n        <i class=\"disabled fa fa-check\"></i>\r\n      </div>\r\n\r\n      <div id=\"entry-rating\">\r\n        ";
  stack1 = self.invokePartial(partials['partials/rating'], 'partials/rating', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      </div>\r\n      \r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"row\">\r\n\r\n    <div class=\"columns entry-header\">\r\n    \r\n      <div class=\"entry-header-row\">\r\n        <div id=\"art\"></div>\r\n        <div id=\"type\"></div>\r\n        <div id=\"location\"></div>\r\n      </div>\r\n    \r\n      <div class=\"entry-header-row\">\r\n        <div>\r\n          <h3 class=\"headertext edit-link modal-trigger date-modal\">\r\n            <i class=\"fa fa-calendar\"></i>\r\n            <span class=\"display date\">";
  if (helper = helpers.displayDate) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.displayDate); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n          </h3>\r\n        </div>\r\n        <div>\r\n          <h3 class=\"plaintext\">from</h3>\r\n          <h3 class=\"headertext edit-link modal-trigger start-time-modal\">\r\n            <i class=\"fa fa-clock-o\"></i>\r\n            <span class=\"display start\">";
  if (helper = helpers.displayStart) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.displayStart); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n          </h3>\r\n        </div>\r\n        <div>\r\n          <h3 class=\"plaintext\">until</h3>\r\n          <h3 class=\"headertext edit-link modal-trigger end-time-modal\">\r\n            <i class=\"fa fa-clock-o\"></i>\r\n            <span class=\"display end\">";
  if (helper = helpers.displayEnd) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.displayEnd); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n          </h3>\r\n        </div>\r\n      </div>\r\n      \r\n    </div>\r\n    \r\n  </div>\r\n\r\n  \r\n\r\n  <div class=\"row\">\r\n\r\n    <div class=\"medium-10 large-8 columns\">\r\n      <div id=\"drills\"></div>\r\n    </div>\r\n\r\n    <div class=\"medium-10 large-8 columns\">\r\n      <div id=\"sparring\"></div>\r\n    </div>\r\n\r\n    <div class=\"medium-10 large-8 columns end\">\r\n      <div id=\"notes\"></div>\r\n    </div>\r\n    \r\n  </div>\r\n\r\n\r\n  <div class=\"row\">\r\n    <div class=\"columns\">\r\n    \r\n      <div class=\"modal-wrapper modal-centered date-modal\">\r\n        <div class=\"click-away-overlay\"></div>\r\n        <div class=\"modal\">\r\n          <div id=\"date\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":date\"></div>\r\n        </div>\r\n      </div>\r\n        \r\n      <div class=\"modal-wrapper modal-centered start-time-modal\">\r\n        <div class=\"click-away-overlay\"></div>\r\n        <div class=\"modal\">\r\n          <div id=\"start\"></div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-wrapper modal-centered end-time-modal\">\r\n        <div class=\"click-away-overlay\"></div>\r\n        <div class=\"modal\">\r\n          <div id=\"end\"></div>\r\n        </div>\r\n      </div>\r\n      \r\n    </div>\r\n  </div>\r\n</div>";
  return buffer;
  });
templates['entry/module/drill/list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  buffer += "\r\n<div class=\"module-section drill\">\r\n  <div class=\"section-header\">\r\n    <div class=\"buttons\">\r\n      <button class=\"tiny secondary radius add-model\">add <i class=\"fa fa-plus\"></i></button>\r\n    </div>\r\n    <h3 class=\"list-title\">Drills</h3>\r\n  </div>\r\n  <ul class=\"model-list row\">\r\n  </ul>\r\n</div>";
  return buffer;
  });
templates['entry/module/drill/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\r\n<li class=\"has-body model-entry columns\">\r\n  <div class=\"model-body-cap\"></div>\r\n  <div class=\"model-header\">\r\n    <div class=\"buttons\">\r\n      <button class=\"view tiny alert radius delete-model\">remove</button>\r\n      <button class=\"view tiny success radius edit-model\">edit <i class=\"fa fa-pencil\"></i ></button>\r\n      <button class=\"edit tiny secondary radius view-model\">close</button>\r\n      <div id=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-save\" class=\"edit save-model disabled\">\r\n        <i class=\"saving fa fa-spinner fa-spin\"></i>\r\n        <i class=\"enabled fa fa-floppy-o\"></i>\r\n        <i class=\"disabled fa fa-check\"></i>\r\n      </div>\r\n    </div>\r\n    <div class=\"model-title\">\r\n      <span class=\"view\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n      <input class=\"edit\" type=\"text\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":name\" class=\"focus\" placeholder=\"Name\" value=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n    </div>\r\n  </div>\r\n  <div class=\"model-body\">\r\n    <span class=\"view\">";
  if (helper = helpers.compiled_details) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.compiled_details); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n    <textarea class=\"edit\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":details\" placeholder=\"Details\">";
  if (helper = helpers.details) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.details); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</textarea>\r\n  </div>\r\n</li>";
  return buffer;
  });
templates['entry/module/note/list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  buffer += "\r\n<div class=\"module-section note\">\r\n  <div class=\"section-header\">\r\n    <div class=\"buttons\">\r\n      <button class=\"tiny secondary radius add-model\">add <i class=\"fa fa-plus\"></i></button>\r\n    </div>\r\n    <h3 class=\"list-title\">Notes</h3>\r\n  </div>\r\n  <ul class=\"model-list row\">\r\n  </ul>\r\n</div>";
  return buffer;
  });
templates['entry/module/note/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\r\n<li class=\"has-body model-entry columns\">\r\n  <div class=\"model-body-cap\"></div>\r\n  <div class=\"model-header\">\r\n    <div class=\"buttons\">\r\n      <button class=\"view tiny alert radius delete-model\">remove</button>\r\n      <button class=\"view tiny success radius edit-model\">edit <i class=\"fa fa-pencil\"></i ></button>\r\n      <button class=\"edit tiny secondary radius view-model\">close</button>\r\n      <div id=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-save\" class=\"edit save-model disabled\">\r\n        <i class=\"saving fa fa-spinner fa-spin\"></i>\r\n        <i class=\"enabled fa fa-floppy-o\"></i>\r\n        <i class=\"disabled fa fa-check\"></i>\r\n      </div>\r\n    </div>\r\n    <div class=\"model-title\">\r\n      <span class=\"view\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n      <input class=\"edit\" type=\"text\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":title\" class=\"focus\" placeholder=\"Title\" value=\"";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n    </div>\r\n  </div>\r\n  <div class=\"model-body\">\r\n    <span class=\"view\">";
  if (helper = helpers.compiled_details) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.compiled_details); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n    <textarea class=\"edit\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":details\" placeholder=\"Details\">";
  if (helper = helpers.details) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.details); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</textarea>\r\n  </div>\r\n</li>";
  return buffer;
  });
templates['entry/module/sparring/list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  buffer += "\r\n<div class=\"module-section sparring\">\r\n  <div class=\"section-header\">\r\n    <div class=\"buttons\">\r\n      <button class=\"tiny secondary radius add-model\">add <i class=\"fa fa-plus\"></i></button>\r\n    </div>\r\n    <h3 class=\"list-title\">Sparring</h3>\r\n  </div>\r\n  <ul class=\"model-list row\">\r\n  </ul>\r\n</div>";
  return buffer;
  });
templates['entry/module/sparring/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\r\n<li class=\"has-body model-entry columns\">\r\n  <div class=\"model-body-cap\"></div>\r\n  <div class=\"model-header\">\r\n    <div class=\"buttons\">\r\n      <button class=\"view tiny alert radius delete-model\">remove</button>\r\n      <button class=\"view tiny success radius edit-model\">edit <i class=\"fa fa-pencil\"></i ></button>\r\n      <button class=\"edit tiny secondary radius view-model\">close</button>\r\n      <div id=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-save\" class=\"edit save-model disabled\">\r\n        <i class=\"saving fa fa-spinner fa-spin\"></i>\r\n        <i class=\"enabled fa fa-floppy-o\"></i>\r\n        <i class=\"disabled fa fa-check\"></i>\r\n      </div>\r\n    </div>\r\n    <div class=\"model-title\">\r\n      <span class=\"view\">";
  if (helper = helpers.partner) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.partner); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " (";
  if (helper = helpers.minutes) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.minutes); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " minutes)</span>\r\n      <input class=\"edit\" type=\"text\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":partner\" class=\"focus\" placeholder=\"Partner\" value=\"";
  if (helper = helpers.partner) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.partner); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n      <input class=\"edit\" type=\"number\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":minutes\" placeholder=\"Minutes\" value=\"";
  if (helper = helpers.minutes) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.minutes); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n    </div>\r\n  </div>\r\n  <div class=\"model-body\">\r\n    <span class=\"view\">";
  if (helper = helpers.compiled_details) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.compiled_details); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\r\n    <textarea class=\"edit\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":details\" placeholder=\"Details\">";
  if (helper = helpers.details) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.details); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</textarea>\r\n  </div>\r\n</li>";
  return buffer;
  });
templates['entry/select'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n      <h3 class=\"headertext edit-link selected-key\"><i class=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.icon)),stack1 == null || stack1 === false ? stack1 : stack1.className)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.icon)),stack1 == null || stack1 === false ? stack1 : stack1.text)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</i > ";
  if (helper = helpers.selectedKey) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.selectedKey); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h3>\r\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n      <h3 class=\"headertext edit-link placeholder\"><i class=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.icon)),stack1 == null || stack1 === false ? stack1 : stack1.className)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.icon)),stack1 == null || stack1 === false ? stack1 : stack1.text)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</i > ";
  if (helper = helpers.placeholder) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.placeholder); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h3>\r\n    ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n          <li id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\r\n              data-value=\"";
  if (helper = helpers.resource_uri) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.resource_uri); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\r\n              class=\"select-option ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"\r\n          >\r\n            ";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n          </li>\r\n        ";
  return buffer;
  }
function program6(depth0,data) {
  
  
  return "option-selected";
  }

  buffer += "\r\n\r\n<div id=\"";
  if (helper = helpers.field) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.field); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-select\" class=\"single-select\">\r\n  <div class=\"click-away-overlay\"></div>\r\n  <input class=\"select-input\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":";
  if (helper = helpers.field) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.field); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" type=\"text\"/>\r\n  <div class=\"select-display\">\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selectedKey), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    <div class=\"select-drop\">\r\n      <div class=\"select-search\">\r\n        <input type=\"text\" autocomplete=\"off\" placeholder=\"";
  if (helper = helpers.hint) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.hint); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"/>\r\n        <i class=\"fa fa-search fa-2x\"></i>\r\n      </div>\r\n      <ul class=\"select-options\">\r\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.options), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      </ul>\r\n      <h3 class=\"edit-link select-create\">\r\n      </h3>\r\n    </div>\r\n  </div>\r\n</div>";
  return buffer;
  });
templates['partials/rating'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n		<label for=\""
    + escapeExpression(((stack1 = (depth1 && depth1.cid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":rating-";
  if (helper = helpers.rating) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.rating); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n			<input id=\""
    + escapeExpression(((stack1 = (depth1 && depth1.cid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":rating-";
  if (helper = helpers.rating) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.rating); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" type=\"radio\" name=\""
    + escapeExpression(((stack1 = (depth1 && depth1.cid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":rating\" value=\"";
  if (helper = helpers.rating) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.rating); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\r\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.checked), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\r\n			<img src=\"/static/img/rating-";
  if (helper = helpers.rating) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.rating); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ".png\">\r\n		</label>\r\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " checked";
  }

  buffer += "\r\n<div class=\"rating\">\r\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.ratings), {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>";
  return buffer;
  });
templates['partials/time'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n		<select id=\"";
  if (helper = helpers.identifier) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.identifier); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-hour\" name=\"";
  if (helper = helpers.identifier) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.identifier); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":hour\">\r\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.hours), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		</select>\r\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n				<option value=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  if (helper = helpers.display) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.display); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</option>\r\n			";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "selected";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n		<select id=\"";
  if (helper = helpers.identifier) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.identifier); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-minute\" name=\"";
  if (helper = helpers.identifier) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.identifier); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":minute\">\r\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.minutes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		</select>\r\n	";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n		<select id=\"";
  if (helper = helpers.identifier) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.identifier); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-period\" name=\"";
  if (helper = helpers.identifier) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.identifier); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":period\">\r\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.periods), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		</select>\r\n	";
  return buffer;
  }

  buffer += "\r\n<div class=\"time-select\">\r\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hours), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.minutes), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.periods), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>";
  return buffer;
  });
})();