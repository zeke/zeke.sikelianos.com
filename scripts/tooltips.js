const $ = require('jquery')

module.exports = function() {
  $(function() {
    require('tipsy-browserify')($)
    $('[rel=tipsy]').tipsy({
      fade: false,
      gravity: 's',
      opacity: 1
    })
  })
}
