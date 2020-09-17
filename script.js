$(document).ready(function(){
  $('.hamburger-menu-button').on('click',function() {
    $('.navbar-list').addClass('activated').toggleClass('active');
    $('.hamburger-menu-button').toggleClass('toggle');
  });

  $('.navbar-list').on('transitionend', function() {
    $(this).removeClass('activated');
  });

  //change dots and slides on click on dot 
  $dot.on('click', function() {
    changeDots($(this));
    changeSlides($(this));
  });

  //change dots style
  function changeDots(dot) {
    $dot.not(dot).removeClass('js-dot-active');
    dot.addClass('js-dot-active');
  };

  function changeSlides(slide) {
    let currentSlide = slide.index();
    let translateAmount = '-' + currentSlide * 100 / numberOfSlides + '%';

    $sliderTrack.css({'transform': 'translateX(' + translateAmount + ')'});
  };

  //change slides on click
  $slide.on('click', function() {
    changeSlidesOnClick($(this));
  });

  function changeSlidesOnClick(slide) {
    let currentSlide = slide.index() + 1;

    let translateAmount = currentSlide * 100 / numberOfSlides + "%";
    
    if (currentSlide == numberOfSlides){
      $sliderTrack.css({'transform': 'translateX(0%)'});
    }
    else {
      $sliderTrack.css({'transform': 'translateX( -' + translateAmount + ')'});
    }
    
  };

});