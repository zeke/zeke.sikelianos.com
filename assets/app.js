"use strict";

var on = document.addEventListener

on('keyup', function(event){
  // console.log(event)
  if (~[219, 221].indexOf(event.keyCode)) {
    document.body.classList.toggle("disabled")
  }
})

on('DOMContentLoaded', function(){

  // document.querySelector("#toc").addEventListener('click', function(event){
  //   // event.preventDefault()
  //   event.stopPropagation()
  // })

  document.querySelector("#toggle").addEventListener('click', function(event){
    document.body.classList.toggle("disabled")
    event.preventDefault()
    event.stopPropagation()
  })

  on('click', function(event){
    document.body.classList.remove("disabled")
  })

})

// $(function() {
//   $('a[href*=#]:not([href=#])').click(function() {
//     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
//       var target = $(this.hash);
//       // location.hash = $(this.hash).selector.slice(1)
//       target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
//       if (target.length) {
//         $('html,body').animate({
//           scrollTop: target.offset().top
//         }, 500, 'swing', function(e) {
//           console.log($(this));
//         });
//
//         return false;
//       }
//     }
//   });
// });
