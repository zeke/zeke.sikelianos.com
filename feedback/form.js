NodeList.prototype.forEach = Array.prototype.forEach
var $form

$(init)

function init () {
  $form = document.querySelector('#feedback')
  detectLocation()
  handleFormSubmission()
}

function detectLocation () {
  $.getJSON('https://ipinfo.io', function (ipinfo) {
    $form.querySelectorAll('[data-source]').forEach(function (input) {
      input.value = ipinfo[input.dataset.source]
    })
  })
}

function handleFormSubmission () {
  if (location.search.match('thanks')) {
    document.querySelector('#feedback-label').textContent = 'Thanks. Anything else you want to tell me?'
    document.querySelector('fieldset.name').style.display = 'none'
    document.querySelector('fieldset.email').style.display = 'none'
  }
}