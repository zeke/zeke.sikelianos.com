var x;
var y;
var l = [0, 0,  0];
var r = [0, 0,  0];
var s = [0.5, 1, 2];

function setup(e) {
  var layer0 = document.getElementById('layer0');
  var layer1 = document.getElementById('layer1');
  var layer2 = document.getElementById('layer2');
};

document.onmousemove = function(e) {
  x = e.x;
  y = e.y;

  // if (x < 0) {y = 0}
  // if (y < 0) {y = 0}

  l[0] = x * s[0];
  l[1] = x * s[1];
  l[2] = x * s[2];

  r[0] = y * s[0];
  r[1] = y * s[1];
  r[2] = y * s[2];

  layer0.style.backgroundPosition = '' + l[0] + 'px ' + r[0] + 'px';
  layer1.style.backgroundPosition = '' + l[1] + 'px ' + r[1] + 'px';
  layer2.style.backgroundPosition = '' + l[2] + 'px ' + r[2] + 'px';
}
