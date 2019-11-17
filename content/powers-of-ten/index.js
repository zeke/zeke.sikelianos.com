NodeList.prototype.forEach = Array.prototype.forEach

document.querySelectorAll('canvas').forEach(function (canvas) {
  var ctx = canvas.getContext('2d')
  var canvasSize = Math.min(window.innerWidth, window.innerHeight) - 200
  var dotSize = 2
  var power = Number(canvas.dataset.power)

  canvas.width = canvasSize
  canvas.height = canvasSize

  //	Draw the background
  ctx.fillStyle = '#f7df1e' // javascript yellow
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw dots
  ctx.fillStyle = '#000000'

  for (var i = 0; i < power; i++) {
    ctx.beginPath()
    ctx.arc(
      Math.random() * canvasSize,
      Math.random() * canvasSize,
      dotSize,
      0,
      2 * Math.PI)
    ctx.fill()
  }
})
