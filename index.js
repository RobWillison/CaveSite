

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

    $('.move').each(function(i, el) {
      data = $(el).data()
      newX = x * data.r
      newY = y * data.r

      $(el).css('-webkit-transform','translate('+newX+'px,'+newY+'px)');
      $(el).css('transform','translate('+newX+'px,'+newY+'px)');
      $(el).css('-ms-transform','translate('+newX+'px,'+newY+'px)');
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
        window.targetX = event.gamma*10
        window.targetY = event.beta*10
    }, true)

  setInterval(function() {
    move(window.targetX, window.targetY)
  }, 10)
});
