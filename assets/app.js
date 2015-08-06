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
