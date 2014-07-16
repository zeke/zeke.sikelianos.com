function colorLinks() {
  var color = colors[Math.floor(Math.random()*colors.length)]
  Array.prototype.forEach.call(document.querySelectorAll("h3 a"), function(a, i){
    a.style.color = color;
  });
  // document.querySelector("h1").style.color = color;
}

var colors = [
  "rgb(223, 12, 170)",
  "rgb(3, 159, 117)",
  "rgb(210, 73, 5)",
  "rgb(160, 35, 227)",
  "rgb(228, 154, 14)",
  "rgb(215, 32, 51)",
  "rgb(2, 134, 227)"
]

document.addEventListener('DOMContentLoaded', function(){
  // colorLinks()
  // setInterval(colorLinks, 2000)
});
