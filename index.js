

$( document ).ready(function() {
  move = function(x, y) {
    if (x < -window.maxX) {
      x = -window.maxX
    }
    if (x > window.maxX){
      x = window.maxX
    }
    if (y < -window.maxY) {
      y = -window.maxY
    }
    if (y > window.maxY){
      y = window.maxY
    }
    console.log(x, y)
    $('.move').each(function(i, el) {
      data = $(el).data()
      newX = data.origin.left + x * data.r
      newY = data.origin.top + y * data.r

      $(el).css({top: newY + 'px', left: newX + 'px' })
    })
  }


  $('.move').each(function(i, el) {
    $(el).data('origin', $(el).position())
  })
  window.maxX = -$('#outer').data('origin').left
  window.maxY = -$('#outer').data('origin').top

  $('body').on('mousemove', function(e) {
    window.targetX = (e.clientX - $('body').width()/2);
    window.targetY = (e.clientY - $('body').height()/2);
  })

  window.addEventListener("deviceorientation", function () {
        console.log(event.gamma, event.beta)
        window.targetX = event.gamma*10
        window.targetY = event.beta*10
    }, true)

  setInterval(function() {
    move(window.targetX, window.targetY)
  }, 10)
});
