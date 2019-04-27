$(document).ready(function () {
  lazy();
  nav();
  search();
  cover();
  gallery();
  asideNav();
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
});

//global variables
var innerWidth = $('body').innerWidth(),
$navButton = $('.mobile-button'),
navButtonActive = 'mobile-button_active',
$mainNav = $('.header .nav'),
$asideNav = $('.aside-nav'),
flag,
// главная / второстепенная страницы
isMain = $('*').is('.page_main');


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
  $navButton.click(function (event) {
    event.preventDefault();
    $navButton.toggleClass(navButtonActive);
    // если на главной странице - работаем с главным меню
    if (isMain) {
      nav1State();
    }
    // если на второстепенной - работаем с сайдбаром
    else {
      nav2State();
    }
  })

  function nav1State() {
    if ($navButton.hasClass(navButtonActive)) {
      $mainNav.slideDown(300);
    } else {
      $mainNav.slideUp(300);
    }
  }
  function nav2State() {
    if ($navButton.hasClass(navButtonActive)) {
      $asideNav.slideDown(300);
    } else {
      $asideNav.slideUp(300);
    }
  }

  $(window).resize(function () {
    if (innerWidth > 768) {
      if(flag) {
        $navButton.removeClass(navButtonActive);
        if (isMain) {
          $mainNav.show();
        } else {
          $asideNav.show();
        }
        flag = false;
      }
    } else {
      if(!flag) {
        if (isMain) {
          $mainNav.hide();
        } else {
          $asideNav.hide();
        }
        flag = true;
      }
    }
  });
}
// поиск
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
//images
function cover() {
  $('.cover-box').each(function() {
    //set size
    var th = $(this).height(),//box height
        tw = $(this).width(),//box width
        im = $(this).children('img'),//image
        ih = im.height(),
        iw = im.width();
    if ((tw/th) >= (iw/ih)) {
        im.addClass('ww').removeClass('wh');
    } else {
        im.addClass('wh').removeClass('ww');
    }
  });
}
function gallery() {
  if ($('.gallery').length){
    var $sliderFor = $('.gallery-slider'),
        $sliderNav = $('.gallery-slider-nav');

    

    $sliderFor.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: $sliderNav,
      lazyLoad: 'ondemand'
    });
    $sliderNav.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: $sliderFor,
      dots: false,
      focusOnSelect: true,
      arrows: true,
      lazyLoad: 'ondemand',
      prevArrow: '.gallery-button_prev',
      nextArrow: '.gallery-button_next',
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    });
  }
}
function asideNav() {
  var $link = $('.aside-nav__link'),
      $dropdown = $('.aside-nav__list_dropdown');

  $link.on('click', function(e) {
    if($(this).siblings('.aside-nav__list_dropdown').length) {
      e.preventDefault();
      $(this).toggleClass('active');
      state();
    }
  })

  function state() {
    $dropdown.each(function() {
      if ($(this).siblings($link).hasClass('active')) {
        $(this).slideDown();
      } else {
        $(this).slideUp();
      }
    })
  }

  //костыль для статики, извиняюсь
  var href = document.location.pathname,
  currentPage = $(`.aside-nav__link[href='${href}']`);
  currentPage.addClass('active');
  currentPage.parents('.aside-nav__item').find('.aside-nav__link').filter(':first').addClass('active');
  currentPage.parents('.aside-nav__list_dropdown').show();
}