// requirejs(['jquery', 'canvas', 'app/sub'],
// function   ($,        canvas,   sub) {
//     //jQuery, canvas and the app/sub module are all
//     //loaded and can be used here now.
// });

require.config({ urlArgs: "v=" +  (new Date()).getTime() });

require(["beautify"], function(beautify) {

  var beautify = beautify.js_beautify
  var data = {
    tips: [
      {
        task: "Select a single element",
        jquery: "$('#thing')",
        vanilla: "document.querySelector('#thing')"
      },{
        task: "Select many elements",
        jquery: "$('ol.items > li')",
        vanilla: "document.querySelectorAll('ol.items > li')"
      },{
        task: "Add a class",
        jquery: "$(element).addClass('foo')",
        vanilla: "element.classList.add('foo')"
      },{
        task: "Remove a class",
        jquery: "$(element).removeClass('foo')",
        vanilla: "element.classList.remove('foo')"
      },{
        task: "Toggle a class",
        jquery: "$(element).toggleClass('foo')",
        vanilla: "element.classList.toggle('foo')"
      },{
        task: "Detect DOM readyness",
        jquery: "$(document).ready(function(){\n  // ready\n})",
        vanilla: "document.addEventListener('DOMContentLoaded', function(){\n  // ready\n})"
      },{
        task: "Attach event handlers",
        jquery: "$('a').click(function() {\n // clicked\n})",
        vanilla: beautify("[].forEach.call(document.querySelectorAll('a'), function(el) {el.addEventListener('click', function() {/* c */});});")
      },{
        task: "Get an attribute",
        jquery: "$(element).attr('title')",
        vanilla: "element.getAttribute('title')"
      },{
        task: "Set an attribute",
        jquery: "$(element).attr('title', 'bumbershoot')",
        vanilla: "element.setAttribute('title', 'bumbershoot')"
      },{
        task: "Create an element",
        jquery: "$('<div/>')",
        vanilla: "document.createElement('div')"
      },{
        task: "Append an element to the DOM",
        jquery: "$(element).append(element)",
        vanilla: "element.appendChild(element)"
      },{
        task: "Clone an element",
        jquery: "element.clone()",
        vanilla: "element.cloneNode(true)"
      },{
        task: "Get element contents",
        jquery: "$(element).html()",
        vanilla: "element.innerHTML"
      },{
        task: "Replace element contents",
        jquery: "$(element).html('<h1>Hello</h1>')",
        vanilla: "element.innerHTML = '<h1>Hello</h1>'"
      },{
        task: "Determine element emptiness",
        jquery: "if ($(element).is(':empty'))",
        vanilla: "if(!element.hasChildNodes())"
      },{
        task: "Select element parent",
        jquery: "$(element).parent()",
        vanilla: "element.parentNode"
      },{
        task: "Select element sibling",
        jquery: "$(element).next()",
        vanilla: "element.nextSibling"
      }
    ],
    commentedTask: function () {
      return "// " + this.task + "\n";
    },
    beautifulVanilla: function () {
      return this.vanilla;
    }
  };

  var template = document.querySelector('#tipTemplate').innerHTML;

  document.querySelector('#tips').innerHTML = Mustache.render(template, data);
  Rainbow.color();
});