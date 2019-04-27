$(document).ready(function () {
  lazy();
  nav();
  landingScroll();
  search();
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
});

//global variables
var innerWidth = $('body').innerWidth(),
  mobileLink = $('.mobile-nav__link'),
  scrollLink = $('.scroll-link'),
  overlay = $('.overlay');


//lazy
function lazy() {
  $(".lazy").Lazy({
    visibleOnly: true,
    threshold: '',
    effect: 'fadeIn',
    effectTime: '300'
  });
}

//nav
function nav() {
  var navButton = $('.mobile-button'),
    nav = $('.header .nav');

  navButton.click(function (event) {
    event.preventDefault();
    nav.toggleClass('nav_active');
    navState();
  })

  function navState() {
    if (nav.hasClass('nav_active')) {
      navButton.addClass('mobile-button_active');
      nav.slideDown(300);
    } else {
      navButton.removeClass('mobile-button_active');
      nav.slideUp(300);
    }
  }
  $(window).resize(function () {
    if (innerWidth > 992) {
      nav.removeClass('nav_active');
    }
  });
}

//якорные ссылки
function landingScroll() {
  scrollLink.click(function (event) {
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    event.preventDefault();

    if (mobileLink.is(event.target)) {
      setTimeout(function () {
        $('body,html').animate({
          scrollTop: top
        }, 400);
      }, 300)
    } else {
      $('body,html').animate({
        scrollTop: top
      }, 400);
    }
  })
}

//якорные ссылки {
  function search() {
    var button = $('.buttons__overlay'),
        input = $('.buttons__input'),
        formBlock = $('.buttons__form');

      //скрываем если клик был вне формы
      $(document).mouseup(function (e){
        if (formBlock.hasClass('buttons__form_active') && !formBlock.is(e.target) 
            && formBlock.has(e.target).length === 0) { 
              formBlock.removeClass('buttons__form_active');
              state(); 
        }
      });

    button.on('click, mouseenter', function(){
      formBlock.addClass('buttons__form_active');
      state();
    })
    formBlock.on('mouseleave', function(){
      formBlock.removeClass('buttons__form_active');
      state();
    })
    //проверка состояния формы
    function state() {
      if(formBlock.hasClass('buttons__form_active')) {
        input.fadeIn(300);
        button.hide();
      } else {
        input.fadeOut(300);
        button.show();
      }
    }
}