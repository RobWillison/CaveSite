
var loadedImages = []

function loadImages(width, height) {
  images = []

  for (i = 1; i < 6; i++) {
    el = document.getElementById('image-' + i)
    height = width * (el.height / el.width)
    images.push(createImageBitmap(el, 0, 0, el.width, el.height, {resizeWidth: width, resizeHeight: height}))
  }
  return Promise.all(images)
}

function draw() {
  var canvas=document.getElementById("canvas");
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  var context = canvas.getContext("2d");

  imageWidth = canvas.width * 1.5
  imageHeight = canvas.height * 1.5

  loadedImages.forEach(function(image){
    context.drawImage(image.image, image.x, image.y, imageWidth, imageHeight)
  })

  window.requestAnimationFrame(draw);
}

function updateImageLocation(x, y) {
  loadedImages.forEach(function(image){
    originX = -window.innerWidth * 0.25
    originY = -window.innerHeight * 0.25
    newX = originX + x * image.r
    newY = originY + y * image.r
    if (newX < originX*2) {
      newX = originX*2
    }
    if (newX > 0){

      newX = 0
    }
    if (newY < originY*2) {
      newY = originY*2
    }
    if (newY > 0){
      newY = 0
    }
    image.x = newX
    image.y = newY
  })
}

$( document ).ready(function() {

  loadImages(window.innerWidth*1.5, window.innerHeight*1.5).then(function(images) {
    var r = 0
    images.forEach(function(image){
      loadedImages.push({image: image, x: -(window.innerWidth * 0.25), y: -(window.innerHeight * 0.25), r: r})
      r += 0.2
    })
    draw()
  })

  $('body').on('mousemove', function(e) {
      updateImageLocation((e.clientX - $('body').width()/2), (e.clientY - $('body').height()/2))
  })

  window.addEventListener("deviceorientation", function () {
      updateImageLocation(event.gamma*10, event.beta*10)
  }, true)

});
