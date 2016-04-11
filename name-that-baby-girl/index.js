document.addEventListener('DOMContentLoaded', function(){

  String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  // Way faster than underscore's _.uniq()
  // http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
  Array.prototype.unique = function () {
    var o = {},
        i,
        l = this.length,
        r = [];
    for (i = 0; i < l; i += 1) o[this[i]] = this[i];
    for (i in o) r.push(o[i]);
    return r;
  };

  // Build list
  window.names = document.querySelector("#names").innerHTML.split("\n");
  names = names.map(function(name){ return name.toTitleCase(); })
  names = names.unique();
  names = names.sort()

  // Search
  document.querySelector("#input").addEventListener('input', function() {

    // Bail if no search is present
    if (input.value.length < 1) {
      document.querySelector('#substrings').innerHTML = "";
      document.querySelector('#initials').innerHTML = "";
      document.querySelector('#terminals').innerHTML = "";
      return;
    }

    // Substring Matches
    var substrings = names.filter(function(name){
      return new RegExp(input.value, "i").test(name);
    });

    // Names that start with the query
    var initials = substrings.filter(function(name){
      return new RegExp("^" + input.value, "i").test(name);
    });

    // Names that start with the query
    var terminals = substrings.filter(function(name){
      return new RegExp(input.value+"$", "i").test(name);
    });

    document.querySelector('#substrings').innerHTML = substrings.slice(0,100).join("<br>");
    document.querySelector('#initials').innerHTML = initials.slice(0,100).join("<br>");
    document.querySelector('#terminals').innerHTML = terminals.slice(0,100).join("<br>");
  });

})
