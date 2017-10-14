NodeList.prototype.forEach = Array.prototype.forEach
var $form

$(init)

function init () {
  $form = document.querySelector('#feedback')
  detectLocation()
}

function detectLocation () {
  $.getJSON('https://ipinfo.io', function (ipinfo) {
    $form.querySelectorAll('[data-source]').forEach(function (input) {
      input.value = ipinfo[input.dataset.source]
    })
  })
}