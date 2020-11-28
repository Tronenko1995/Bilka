$(document).ready(function() {

  const screenWidth = document.body.clientWidth;
  const dark = $('.mobile-darkness');

     
    /* Декстоп вызов меню-каталог */
    $('.jsCatalog').on('click', function(){
      $('.catalog-button__for-list').toggleClass('hide');
      $(this).toggleClass('active');
    });

    /* Декстоп вызов под-меню-каталог */
    $('.catalog-button__item').on('click', function() {
      $('.item-child').addClass('hide');
      $(this).find('.item-child').removeClass('hide');
    });

    /* Вызов корзины десктоп + моби */
    $('.jsCart').on('click', function(e){
      e.preventDefault();
      $(this).toggleClass('open');
      $('.cart').toggleClass('active');
      if (screenWidth <= 1200) {
        $(dark).toggleClass('active');
      }
    });

    /* Моб вызов меню */
    $('.jsMobMenu').on('click', function() {

        $('.mobile-menu').toggleClass('active');
        $(dark).toggleClass('active');

        if ( $('.mobile-catalog').hasClass('active') ) {
          $('.mobile-catalog').toggleClass('active');
          $('.mobile-menu').css('opacity','1');
        }

    });

    /* Моб вызов фильтр */
    $('.jsMobiFilter').on('click', function() {
        $('.sidebar__filter').toggleClass('active');
        $(dark).toggleClass('active');
    });

    /* Моб вызов меню каталог */
    $('.js-mobile-button-2').on('click', function() {

      if ( !$('.mobile-catalog').hasClass('active') ) {
        $('.mobile-catalog').toggleClass('active');
        $('.mobile-menu').css('opacity','0');
      }
      else {
        $('.mobile-catalog').toggleClass('active');
        $('.mobile-menu').css('opacity','1');
      }
    });

    $('.mobile-catalog__svg').on('click', function() {
      if (!$(this).closest('.mobile-catalog__item').hasClass('active')) {
        $('.mobile-catalog__item').removeClass('active');
        $(this).closest('.mobile-catalog__item').addClass('active');
      } else {
        $('.mobile-catalog__item').removeClass('active');
      }
    });

/* Закрыть вне блока*/
$(document).on('click',function(e){

    if(!$('.catalog-button__for-list').hasClass('hide')){
      if (!$('.jsCatalog').is(e.target) && $('.jsCatalog').has(e.target).length === 0 && !$('.catalog-button__for-list').is(e.target) && $('.catalog-button__for-list').has(e.target).length === 0) {
        $('.catalog-button__for-list').addClass('hide');
          $('.jsCatalog').removeClass('active');
      }
    }

      if($('.cart').hasClass('active')){
        if ( !$('.jsCart').is(e.target) && $('.jsCart').has(e.target).length === 0 && !$('.cart').is(e.target) && $('.cart').has(e.target).length === 0 ) {
          $('.cart').toggleClass('active');
          $('.jsCart').removeClass('open');
          if( (dark).hasClass('active') ) {
            $(dark).toggleClass('active');
          }
        }
      }

      if($('.sidebar__filter').hasClass('active')){
        if ( !$('.sidebar__filter').is(e.target) && $('.sidebar__filter').has(e.target).length === 0 && !$('.jsMobiFilter').is(e.target) ) {
          $('.sidebar__filter').toggleClass('active');
          if( (dark).hasClass('active') ) {
            $(dark).toggleClass('active');
          }
        }
      }

      if($('.mobile-menu').hasClass('active')){
        if ( !$('.mobile-menu').is(e.target) && $('.mobile-menu').has(e.target).length === 0 && !$('.jsMobMenu').is(e.target) && $('.jsMobMenu').has(e.target).length === 0 && !$('.mobile-catalog').is(e.target) && $('.mobile-catalog').has(e.target).length === 0 ) {
          $('.mobile-menu').toggleClass('active');
          if( $(dark).hasClass('active') ) {
            $(dark).toggleClass('active');
          }
          if( $('.mobile-catalog').hasClass('active') ) {
            $('.mobile-catalog').toggleClass('active');
            $('.mobile-menu').css('opacity','1');
          }
        }
      }

   });

  function equalHeight(columnClass) {
      let max_col_height = 0; // максимальная высота, первоначально 0
      $('.'+columnClass).each(function(){ // цикл "для каждой из колонок"
          if ($(this).height() > max_col_height) { // если высота колонки больше значения максимальной высоты,
              max_col_height = $(this).height(); // то она сама становится новой максимальной высотой
          }
      });
      $('.'+columnClass).height(max_col_height); // устанавливаем высоту каждой колонки равной значению максимальной высоты
  }

/* проверка элементов на странице */
  if ($('.slider__wrap').length >= 1) {

      $('.slider__wrap').slick({
        arrows: false,
        dots: true
      });

  }


    if (screenWidth >= 1170) {

      if ($('.new-items-slider').length >= 1) {

        $('.new-items-slider').slick({
          arrows: true,
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          draggable: false
        });
    }

    if ($('.top-sales-slider').length >= 1) {

      $('.top-sales-slider').slick({
        arrows: true,
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          draggable: false
    });
  }

  if ($('.last-review-slider').length >= 1) {

    $('.last-review-slider').slick({
      arrows: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: false
  });
}

    equalHeight('new-items-slider__item');
    equalHeight('top-sales-slider__item');
    equalHeight('last-review-slider__item');
    equalHeight('recommended-products-slider__item');

    }

    if ($('.recommended-products-slider').length >= 1) {

      $('.recommended-products-slider').slick({
        arrows: true,
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          draggable: false,
          responsive: [
            {
              breakpoint: 1201,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 901,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 631,
              settings: "unslick"
            }]
    });
  }

  if ($('.page-card__container-left-photo-slider').length >= 1) {

    $('.page-card__container-left-photo-slider').slick({
      arrows: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true
  });
}

if ($('.page-card__kit-slider').length >= 1) {

  $('.page-card__kit-slider').slick({
    arrows: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true
  });
}

if ($('.page-card__container-left-customer_photos-slider').length >= 1) {

  $('.page-card__container-left-customer_photos-slider').slick({
    arrows: true,
      infinite: true,
      draggable: false,
      rows: 1,
      slidesToShow: 3,
      slidesPerRow: 1,
      slidesToScroll: 1,
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 525, //-6
          settings: {
            rows: 2,
            slidesToShow: 5,
            slidesPerRow: 1,
            slidesToScroll: 1,
          }
        }]
  });
}

if ($('.jsPhone').length >= 1) {
  /* Валидация телефона */
  $(".jsPhone").inputmask({
    mask: "+380 (99) 999-99-99",
    clearIncomplete: true,
    placeholder: "_",
    showMaskOnHover: false,
    showMaskOnFocus: true,
  });
}

/* Валидация имени */
$('.jsName').keyup(function() {
	this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁіІєЄїЇ\-\'\s]/g, "");
});

/* Валидация фамилии */
$('.jsSurname').keyup(function() {
	this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁіІєЄїЇ\-\'\s]/g, "");
});

/* Валидация email */
$('.jsMail').keyup(function() {
	this.value = this.value.replace(/[^a-zA-Z@\.\-\d]/g, "");
});

/* Валидация Даты */
if ($('.jsDate').length >= 1) {
  /* Валидация телефона */
  $(".jsDate").inputmask({
    mask: "99/ 99/ 9999",
    clearIncomplete: true,
    placeholder: "ДД/ ММ/ ГГГГ",
    showMaskOnHover: false,
    showMaskOnFocus: true
  });
}

/* Показать/скрыть пароль */
$('.jsPasswordShow').on('click', function() {
  $(this).siblings('.jsPassword').attr('type','text');
  $(this).toggleClass('hide');
  $(this).siblings('.jsPasswordHide').toggleClass('hide');
});
$('.jsPasswordHide').on('click', function() {
  $(this).siblings('.jsPassword').attr('type','password');
  $(this).toggleClass('hide');
  $(this).siblings('.jsPasswordShow').toggleClass('hide');
});

  //   $('.select').on('click',function () {
  //     if ($(this).hasClass('open')) {
  //         $(this).removeClass('open');
  //     } else {
  //       $(this).addClass('open');
  //     }
  // });

  // $('.select').on('click', '.select__item', function (event) {
  //     event.stopPropagation();
  //     $(this).parent().prev().text($(this).text());
  //     $(this).parent().prev().prev().val($(this).text());
  //     $(this).closest('.select').removeClass('open');
  // });

  /* Открытие селекта */
$('.select').on('click', function () {
  $(this).toggleClass('open');
});
/* Открытие селекта табом */
$('.select').keypress(function(e) {
  if (e.which == 13) {
      $(this).toggleClass('open');
  }
});

/* Смена текста и значения по клику на итем селекта + закрытие селекта */
$('.select').on('click', '.select__item', function (e) {
  e.stopPropagation();

  const itemText = $(this).text();
  const select = $(this).closest('.select');

  $(select).find('.select__head').text(itemText);
  $(select).find('.select__input').val(itemText);
  $(select).addClass('active').removeClass('open');
  $(select).find('.select__list .active').removeClass('active');
  $(this).addClass('active');
});
/* Смена текста и значения по клику на итем селекта + закрытие селекта табом */
$('.select__item').keypress(function(e) {
  e.stopPropagation();
  const itemText = $(this).text();
  const select = $(this).closest('.select');

  $(select).find('.select__head').text(itemText);
  $(select).find('.select__input').val(itemText);
  $(select).addClass('active').removeClass('open');
});

/* Закрытие всех селектов при клике вне блока селектов */
$(document).on('click', function (e) {
  if ( !$('.select').is(e.target) && !$('.select').is(e.target) && $('.select').has(e.target).length === 0) {
      $('.select').removeClass('open');
  };
});

  $('.jsWatchMore').on('click', function(e){
    e.preventDefault();
    if (!$(this).hasClass('active')) {
      $(this).siblings('.watch-full').css('display','block');
      $(this).text('Меньше').addClass('active');
  } else {
    $(this).siblings('.watch-full').css('display','none');
      $(this).text('Еще').removeClass('active');
  }
  });

  /* Модалка написать отзыв jsWriteFeedback */
  $('.jsWriteFeedback').on('click', function (event) {
    event.preventDefault();
    $.magnificPopup.open({
        items: {
            src: '#writeFeedback'
        },
        callbacks: {
            open: function () {
              if (document.body.clientWidth > 610) {
                $(this.container).find('.mfp-content').css({
                    'width': '570px'
                });
            } else {
                $(this.container).find('.mfp-content').css({
                    'width': '345px'
                });
            }
                $(this.container).find('.mfp-close').addClass('new-close');
            }
        }
    });
});

  /* Модалка купить в один клик jsBuyOneClick */
  $('.jsBuyOneClick').on('click', function (event) {
    event.preventDefault();
    $.magnificPopup.open({
        items: {
            src: '#buyOneClick'
        },
        callbacks: {
            open: function () {
                if (document.body.clientWidth > 610) {
                    $(this.container).find('.mfp-content').css({
                        'width': '570px'
                    });
                } else {
                    $(this.container).find('.mfp-content').css({
                        'width': '345px'
                    });
                }
                $(this.container).find('.mfp-close').addClass('new-close');
            }
        }
    });
});

  /* Модалка вход */
  $('.jsPrivateLogin').on('click', function (event) {
    event.preventDefault();
    $.magnificPopup.open({
        items: {
            src: '#privateLogin'
        },
        callbacks: {
            open: function () {
                if (document.body.clientWidth > 610) {
                    $(this.container).find('.mfp-content').css({
                        'width': '570px'
                    });
                } else {
                    $(this.container).find('.mfp-content').css({
                        'width': '345px'
                    });
                }
                $(this.container).find('.mfp-close').addClass('new-close');
            }
        }
    });
});

/* Модалка вход -> рега */
$('.jsPrivateReg').on('click', function (event) {
  event.preventDefault();
  $('#privateLogin').addClass('reg');
});

/* Модалка рега -> вход */
$('.jsPrivateLogin2').on('click', function (event) {
  event.preventDefault();
  $('#privateLogin').removeClass('reg');
});

/*отлов сабмита в формах*/
$('.modal__buy-one-click').on('submit','.modal__buy-one-click-form', function(e) {
  e.preventDefault();
  console.log('sub');
  $(this).closest('.modal__buy-one-click').addClass('success');
});

$('.modal__buy-one-click').on('submit','.modal__buy-one-click-form--success', function(e) {
  e.preventDefault();
  console.log('sub2');
  $.magnificPopup.close();
});

$('.modal__write-feedback').on('submit','.modal__write-feedback-form', function(e) {
  e.preventDefault();
  $.magnificPopup.close();
});

/* Ретинг */
let dafaultRateText = '';

$('.jsRatingSvg').hover(
  function() {
    const rate = parseInt( $(this).attr('for') );
    const rateText = $(this).siblings('.jsRatingText');
    switch (rate) {
      case 5:
        rateText.text( rateText.attr('s5') );
        console.log(rate);
      break;
      case 4:
        rateText.text( rateText.attr('s4') );
      break;
      case 3:
        rateText.text( rateText.attr('s3') );
      break;
      case 2:
        rateText.text( rateText.attr('s2') );
      break;
      case 1:
        rateText.text( rateText.attr('s1') );
      break;
    }
  }, function() {
    const rate = parseInt( $(this).attr('for') );
    const rateText = $(this).siblings('.jsRatingText');
    rateText.text(dafaultRateText);
  }
);
$('.jsRatingSvg').on('click', function() {

  const rate = parseInt( $(this).attr('for') );
  const rateText = $(this).siblings('.jsRatingText');
  switch (rate) {
    case 5:
      rateText.text( rateText.attr('s5') );
      dafaultRateText = rateText.attr('s5');
      console.log(dafaultRateText);
    break;
    case 4:
      rateText.text( rateText.attr('s4') );
      dafaultRateText = rateText.attr('s4');
    break;
    case 3:
      rateText.text( rateText.attr('s3') );
      dafaultRateText = rateText.attr('s3');
    break;
    case 2:
      rateText.text( rateText.attr('s2') );
      dafaultRateText = rateText.attr('s2');
    break;
    case 1:
      rateText.text( rateText.attr('s1') );
      dafaultRateText = rateText.attr('s1');
    break;
  }

});


/* New Accordion */
$('.jsAccordion').on('click', function() {
  $(this).toggleClass('active');
  $(this).siblings('.jsAccordionItem').toggleClass('open');
});

/* NewsTabs */
$('.jsTabs').on('click', function() {
  $('.jsTabs').removeClass('active');
  $(this).toggleClass('active');
});

/* CardTabs */
$('.jsCardTabs').on('click', function() {
  const forTab = $(this).attr('s1');
  $('.jsCardTabs').removeClass('active');
  $(this).toggleClass('active');
  $('.jsCardTabsItem').addClass('hideCardTabsItem');
  $(`.${forTab}`).removeClass('hideCardTabsItem');
});

/* check radio one-step */

$('input[name="delivery"').on('change', function() {
  if(this.checked) {
    $('.jsDeliveryItemText').addClass('hide');
    $(this).closest('.jsDeliveryItem').find('.jsDeliveryItemText').removeClass('hide');
  }
});

/* pay one-step */
$('.jsPayOneStep').on('click', function() {
  $('.jsPayOneStep').removeClass('active');
  $(this).addClass('active');
});

/* скролл на якорь */
function scrollToAnchor (idBlock,time) {
  let block = $(`#${idBlock}`).offset().top;
  $('body,html').animate({scrollTop: block}, time);
}


$('.jsReviewsDown').on("click", function (e) {
  e.preventDefault();
  scrollToAnchor('blockReviews',2000);
});

$('.jsDescriptionDown').on("click", function (e) {
  e.preventDefault();
  scrollToAnchor('blockDescription',2000);
  $('.jsCardTabs[s1="jsCardTabs2"]').click();
});

});