// Instantiate app namespace
window.JJ = {};

JJ.debug.log = function(s) {
  console.log(s);
}
JJ.debug.backboneError = function(response) {
  JJ.debug.log("ERROR");
  JJ.debug.log(response);
}

JJ.handleUnknownRoute = function(url) {
  //window.location = "/";
  JJ.debug.log("UNKNOWN ROUTE");
  JJ.debug.log(url);
}