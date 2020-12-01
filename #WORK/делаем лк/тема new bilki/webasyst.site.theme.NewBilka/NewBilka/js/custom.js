$(document).ready(function() {

    const screenWidth = document.body.clientWidth;
    const dark = $('.mobile-darkness');

  /* Кнопка назад */
  $('.jsBack').on('click', function(e){
    e.preventDefault();
    history.back();
  });
    
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

    /* FunctionBreadCrumb + sidebar */
    const pos = window.location.pathname;
    if( $(`a[href="${pos}"]`).attr('rel') === 'category') {
        const that =  $(`a[href="${pos}"][rel='category']`);
        const categText = that.text();
        const categLink = that.attr('href');
        $('#NewBreadcrumb').append(`<li class="breadcrumb__item"><a href="${categLink}" class="breadcrumb__link">${categText}</a></li>`);
        $('.sidebar__nav-title').text(categText);
        /* если у категории есть подкатегории*/
        if (that.closest('.catalog-button__item').find('.catalog-button__item-child').length) {
            const sub = that.closest('.catalog-button__item').find('.item-child-center')[0];
            const subList = $(sub).find('.item-child-center__item');
            const subCount = subList.length;
            for(let i = 0; i < subCount; i++) {
                let a = $(subList[i]).text(),
                    b = $(subList[i]).find('a').attr('href');
                $('.sidebar__nav-items').append(`<li class="sidebar__nav-item">\
                <a href="${b}" class="sidebar__nav-link">${a}</a>\
                <svg class="sidebar__nav-svg" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\
                    <path d="M8 6L5 9V3L8 6Z" fill="#F37A22"/>\
                </svg>\                   
            </li>`);
            }
        };
        console.log('%c NewBilka -> Вы в категории', 'color: green');
    } else if( $(`a[href="${pos}"]`).attr('rel') === 'sub_category') {
        const that =  $(`a[href="${pos}"][rel='sub_category']`);
        const subCategText = that.text();
        const subCategLink = that.attr('href');
        const categText = that.closest('.catalog-button__item').find('a[rel="category"]').text();
        const categLink = that.closest('.catalog-button__item').find('a[rel="category"]').attr('href');
        $('#NewBreadcrumb').append(`<li class="breadcrumb__item"><a href="${categLink}" class="breadcrumb__link">${categText}</a></li><li class="breadcrumb__item"><a href="${subCategLink}" class="breadcrumb__link">${subCategText}</a></li>`);
        $('.sidebar__nav-title').text(categText);
        /* если у категории есть подкатегории*/
        if (that.closest('.catalog-button__item').find('.catalog-button__item-child').length) {
            const sub = that.closest('.catalog-button__item').find('.item-child-center')[0];
            const subList = $(sub).find('.item-child-center__item');
            const subCount = subList.length;
            for(let i = 0; i < subCount; i++) {
                let a = $(subList[i]).text(),
                    b = $(subList[i]).find('a').attr('href');
                    if (pos !== b) {
                        $('.sidebar__nav-items').append(`<li class="sidebar__nav-item">\
                        <a href="${b}" class="sidebar__nav-link">${a}</a>\
                        <svg class="sidebar__nav-svg" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\
                            <path d="M8 6L5 9V3L8 6Z" fill="#F37A22"/>\
                        </svg>\                   
                    </li>`);
                    } else {
                        $('.sidebar__nav-items').append(`<li class="sidebar__nav-item active">\
                        <a href="${b}" class="sidebar__nav-link">${a}</a>\
                        <svg class="sidebar__nav-svg" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\
                            <path d="M8 6L5 9V3L8 6Z" fill="#F37A22"/>\
                        </svg>\                   
                    </li>`);
                    }
            }
        };
        console.log('%c NewBilka -> Вы в подкатегории', 'color: green');
    }

    if ($('.page-find').length >= 1) {
        console.log('%c NewBilka -> Вы в поисковике', 'color: green');
        // $('#NewBreadcrumb').css('display','none');
        // $('.sidebar__nav').css('display','none');
        // $('.main-container__banner').css('display','none');
        // $('.sidebar').css('display','none');
        // const regex = /\?query=/gi,
            //   regex2 = /\?page\=\d+&query\=/gi,
            //   query = document.location.search.replaceAll(regex, ''),
            //   query2 = query.replaceAll(regex2, '');
        // console.log(document.location.search);
        // console.log(query);
        // console.log(query2);
        const query = $('.js-searchpro__field-input').val();
        const findText = $('js-searchpro__page-description').text();
        const findCount = $('.main-container__items')[0].childElementCount;
        if ($('.none-find').length >= 1) {
            $('.none-find').text(query);
        }
        if ($('.main-container__top').length >= 1) {
            $('.main-container__top').prepend(`<div class="main-container__top-left"><p class="main-container__top-title">«${query}»</p><p class="main-container__top-description">${findText}</p></div>`);
        }
        if (findCount < 30) {
            $('.jsMoreItems').css('display','none');
        }

      }

  function equalHeight(columnClass) {
      let max_col_height = 0; // максимальная высота, первоначально 0
      $('.'+columnClass).each(function(){ // цикл "для каждой из колонок"
          if ($(this).height() > max_col_height) { // если высота колонки больше значения максимальной высоты,
              max_col_height = $(this).height(); // то она сама становится новой максимальной высотой
          }
      });
      $('.'+columnClass).height(max_col_height); // устанавливаем высоту каждой колонки равной значению максимальной высоты
  }


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

  if ( $('.main-container__top-row .select').find('.sort-asc').length == 1 ) {
    console.log( $('.select').find('.sort-asc') );
    $('.main-container__top-row .select__head').append('<i class="sort-asc"></i>');
  } else if ( $('.main-container__top-row .select').find('.sort-desc').length == 1 ) {
    console.log( $('.select').find('.sort-desc') );
    $('.main-container__top-row .select__head').append('<i class="sort-desc"></i>');
  }

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


/* смена товара при клике на цвет в каталогах делегирование */
$(document).on('click','.jsChangeColor', function (e) {

    e.preventDefault();

    const item = $(this).closest('.main-container__item'),
          itemImg = $(item).find('img[itemprop="image"]'),
          itemImgId = $(itemImg).attr('image_id'),
          itemImgSrc = $(itemImg).attr('src'),
          itemArticle = $(item).find('.jsItemCode'),
          itemArticleText = $(itemArticle).text(),
          NewImgId = $(this).closest('li').attr('image_id'),
          NewPrice = Math.round( $(this).closest('li').attr('price') ),
          NewArticle = $(this).closest('li').attr('article');
          NewImgSrc = itemImgSrc.replaceAll(itemImgId, NewImgId);

    $(itemArticle).text(NewArticle);
    if (NewImgId !== '') {
        $(itemImg).attr('src', NewImgSrc);
        $(itemImg).attr('image_id', NewImgId);
    }
    $(item).find('meta[itemprop="price"]').attr('content',NewPrice);
    $(item).find('.main-container__item-for-price-text').text(`${NewPrice} грн.`);

});

let lastTimeout;
// if (!$(this).closest('li').hasClass('active')) {
    function jsChangeItem(that) {
        const color = $(that).attr('data-text');
        const dataValue = $(that).attr('data-value');
        const infoBlock = $(`.jsSkusProducts li meta[content="${color}"]`);
        const productArticle = $(infoBlock).siblings('meta[itemprop="MPN"]').attr('content');
        const productPrice = $(infoBlock).siblings('meta[itemprop="price"]').attr('content');
        const productImgId = $(infoBlock).siblings('meta[itemprop="imageId"]').attr('content');
        const firstImgId = $(infoBlock).closest('.jsSkusProducts').find('li').first().find('meta[itemprop="imageId"]').attr('content');
        let productImg;
        if ($(".page-card__container-left-photo-slider .slick-slide[data-slick-index='0'] .page-card__container-left-photo-img img").length) {
            productImg = $(".page-card__container-left-photo-slider .slick-slide[data-slick-index='0'] .page-card__container-left-photo-img img");
        }
        else if ($(".page-card__container-left-photo-slider .slick-slide[data-slick-index='1'] .page-card__container-left-photo-img img").length) {
            productImg = $(".page-card__container-left-photo-slider .slick-slide[data-slick-index='1'] .page-card__container-left-photo-img img");
        } else {
            productImg = $(".page-card__container-left-photo-slider-item .page-card__container-left-photo-img img");
        }
        let productImgSrc = $(productImg).attr('src');
        const NewProductImgSrc = productImgSrc.replaceAll(firstImgId, productImgId);

        $('.js-product-price').attr('data-price', productPrice);
        $('.jsPrice').text(`${productPrice}`);
        $('.jsArticle').text(productArticle);


        const dataSlickIndex = $(`.page-card__container-left-photo-slider-item .page-card__container-left-photo-img img[src='${NewProductImgSrc}']`).closest('.slick-slide').attr('data-slick-index');

        $('.js-sku-feature').val(dataValue);
        $('.modal__buy-one-click .sku-feature option').removeAttr('selected');
        $(`.modal__buy-one-click .sku-feature option[value=${dataValue}]`).attr('selected', 'selected').trigger('change');
        $('.page-card__container-left-photo-slider').slick('slickGoTo',dataSlickIndex);
    }

/* смена товара при клике на цвет в карте товара */
$('.jsChangeItem').on('click', function (e) {
    e.preventDefault();
    const that = this;
    $('.jsChangeItemFather').removeClass('active');
    $(that).closest('li').addClass('active');

    if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        jsChangeItem(that);
      }, 400);

});



/* загрузка фотки по выбраному цвету */
$(window).on('load', function(){
    if ($('.page-card__container-center-colors-list .active .jsChangeItem').length >= 1) {
        $('.page-card__container-center-colors-list .active .jsChangeItem').click();
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
            },
            close: function () {
                if ($('.modal__buy-one-click').hasClass('success')) {
                    $('.modal__buy-one-click').removeClass('success');
                }
            }
        }
    });
});

/* кнопка купить в модалке один клик */
$('body').on('ok.bistrozakaz.order', function() {
  $('.modal__buy-one-click').addClass('success');
});

/* кнопка хорошо в модалке один клик */
$('.jsOneClickOk').on('click', function(e) {
    $.magnificPopup.close();
});

/*отлов сабмита в формах*/
$('.modal__buy-one-click').on('submit','.modal__buy-one-click-form--success', function(e) {
  e.preventDefault();
  console.log('sub2');
  $.magnificPopup.close();
});

$('.modal__write-feedback').on('submit','.modal__write-feedback-form', function(e) {
//   e.preventDefault();
//   $.magnificPopup.close();
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
  const rateInput = $(this).siblings('input[name="rate"]');
  switch (rate) {
    case 5:
      rateText.text( rateText.attr('s5') );
      dafaultRateText = rateText.attr('s5');
      $(rateInput).val(5);
    break;
    case 4:
      rateText.text( rateText.attr('s4') );
      dafaultRateText = rateText.attr('s4');
      $(rateInput).val(4);
    break;
    case 3:
      rateText.text( rateText.attr('s3') );
      dafaultRateText = rateText.attr('s3');
      $(rateInput).val(3);
    break;
    case 2:
      rateText.text( rateText.attr('s2') );
      dafaultRateText = rateText.attr('s2');
      $(rateInput).val(2);
    break;
    case 1:
      rateText.text( rateText.attr('s1') );
      dafaultRateText = rateText.attr('s1');
      $(rateInput).val(1);
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
const posArticles = window.location.pathname;
if (posArticles === '/articles/') {
    $('.jsTabs').removeClass('active');
    $('.jsTabs').first().addClass('active');
}
if ($('.select__list').length >= 1) {
    if ($('.select__item[selected]').length >= 1) {
        const selText = $('.select__item[selected]').text();
        $('.select__head').text(selText);
    }
}


/* CardTabs */
$('.jsCardTabs').on('click', function() {
  const forTab = $(this).attr('s1');
  $('.jsCardTabs').removeClass('active');
  $(this).toggleClass('active');
  $('.jsCardTabsItem').addClass('hideCardTabsItem');
  $(`.${forTab}`).removeClass('hideCardTabsItem');
});


/* ВСЕ СЛАЙДЕРЫ!!! */

if ($('.page-card__container-left-photo-slider').length >= 1) {

    $('.page-card__container-left-photo-slider').slick({
      arrows: true,
      infinite: false,
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
    //   greedy: false,
      clearIncomplete: true,
      placeholder: "_",
    //   rightAlign: false,
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

/* загрузка отзывов*/
if ($('.page-card__info-reviews-items').length >= 1) {
    var startRev = 3;
    var nowRew = 0;
    var countRev = $('.page-card__info-reviews-items')[0].childElementCount - 1; //7
    console.log(countRev);
    
    if (countRev > startRev) { //если изначально отзывов больше 3х
        $('.page-card__info-reviews-item').addClass('hide');
        for (let i = 0; i < 3; i++) {
            $(`.page-card__info-reviews-item:eq(${i})`).removeClass('hide');
            console.log(`${i}`);
        }
    } else {
        $('.jsMoreReviews').addClass('hide');
    }

}
/* загрузка отзывов при клике на еще отзывы */
$('.jsMoreReviews').on('click', function(e) {
    e.preventDefault();
    $('.page-card__info-reviews-item').addClass('hide');
    for (let i = nowRew; i < nowRew+5; i++) {
        $(`.page-card__info-reviews-item:eq(${i})`).removeClass('hide');
        console.log(`${i}`);
        if (i===(countRev-1)) {
            console.log('брейк!');
            $('.jsMoreReviews').addClass('hide');
            break;
        }
    }
});
/*отключение показать еще*/
if ($('.main-container__items').length >= 1) {
    if ( $('.main-container__items')[0].childElementCount < 30 ) {
        $('.jsMoreItems').addClass('hide');
    }
};

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


});
// Main Class
( function($, waTheme) {

    $.ajaxSetup({ cache: false });

    var FixedBlock = ( function($) {

        FixedBlock = function(options) {
            var that = this;

            // DOM
            that.$window = $(window);
            that.$wrapper = options["$section"];
            that.$wrapperW = options["$wrapper"];

            // VARS
            that.type = (options["type"] || "bottom");
            that.lift = (options["lift"] || 0);

            // DYNAMIC VARS
            that.offset = {};
            that.$clone = false;
            that.is_fixed = false;

            // INIT
            that.initClass();
        };

        FixedBlock.prototype.initClass = function() {
            var that = this,
                $window = that.$window,
                resize_timeout = 0;

            $window.on("resize", function() {
                clearTimeout(resize_timeout);
                resize_timeout = setTimeout( function() {
                    that.resize();
                }, 100);
            });

            $window.on("scroll", watcher);

            that.$wrapper.on("resize", function() {
                that.resize();
            });

            that.init();

            function watcher() {
                var is_exist = $.contains($window[0].document, that.$wrapper[0]);
                if (is_exist) {
                    that.onScroll($window.scrollTop());
                } else {
                    $window.off("scroll", watcher);
                }
            }

            that.$wrapper.data("block", that);
        };

        FixedBlock.prototype.init = function() {
            var that = this;

            if (!that.$clone) {
                var $clone = $("<div />").css("margin", "0");
                that.$wrapper.after($clone);
                that.$clone = $clone;
            }

            that.$clone.hide();

            var offset = that.$wrapper.offset();

            that.offset = {
                left: offset.left,
                top: offset.top,
                width: that.$wrapper.outerWidth(),
                height: that.$wrapper.outerHeight()
            };
        };

        FixedBlock.prototype.resize = function() {
            var that = this;

            switch (that.type) {
                case "top":
                    that.fix2top(false);
                    break;
                case "bottom":
                    that.fix2bottom(false);
                    break;
            }

            var offset = that.$wrapper.offset();
            that.offset = {
                left: offset.left,
                top: offset.top,
                width: that.$wrapper.outerWidth(),
                height: that.$wrapper.outerHeight()
            };

            that.$window.trigger("scroll");
        };

        /**
         * @param {Number} scroll_top
         * */
        FixedBlock.prototype.onScroll = function(scroll_top) {
            var that = this,
                window_w = that.$window.width(),
                window_h = that.$window.height();

            // update top for dynamic content
            that.offset.top = (that.$clone && that.$clone.is(":visible") ? that.$clone.offset().top : that.$wrapper.offset().top);

            switch (that.type) {
                case "top":
                    var bottom_case = (that.$wrapperW ? ((scroll_top + that.offset.height) < that.$wrapperW.height() + that.$wrapperW.offset().top) : true),
                        use_top_fix = (that.offset.top - that.lift < scroll_top && bottom_case);

                    that.fix2top(use_top_fix);
                    break;
                case "bottom":
                    var use_bottom_fix = (that.offset.top && scroll_top + window_h < that.offset.top + that.offset.height);
                    that.fix2bottom(use_bottom_fix);
                    break;
            }

        };

        /**
         * @param {Boolean|Object} set
         * */
        FixedBlock.prototype.fix2top = function(set) {
            var that = this,
                fixed_class = "is-top-fixed";

            if (set) {
                that.$wrapper
                    .css({
                        position: "fixed",
                        top: that.lift,
                        left: that.offset.left,
                        width: that.offset.width
                    })
                    .addClass(fixed_class);

                that.$clone.css({
                    height: that.offset.height
                }).show();

            } else {
                that.$wrapper.removeClass(fixed_class).removeAttr("style");
                that.$clone.removeAttr("style").hide();
            }

            that.is_fixed = !!set;
        };

        /**
         * @param {Boolean|Object} set
         * */
        FixedBlock.prototype.fix2bottom = function(set) {
            var that = this,
                fixed_class = "is-bottom-fixed";

            if (set) {
                that.$wrapper
                    .css({
                        position: "fixed",
                        bottom: 0,
                        left: that.offset.left,
                        width: that.offset.width
                    })
                    .addClass(fixed_class);

                that.$clone.css({
                    height: that.offset.height
                }).show();

            } else {
                that.$wrapper.removeClass(fixed_class).removeAttr("style");
                that.$clone.removeAttr("style").hide();
            }

            that.is_fixed = !!set;
        };

        return FixedBlock;

    })(jQuery);

    // Main class
    var Layout = ( function($) {

        Layout = function(options) {
            var that = this;

            // DOM
            that.$window = $(window);
            that.$wrapper = waTheme.layout.$wrapper;
            that.$block = waTheme.layout.$block;
            that.$content = waTheme.layout.$content;
            that.$sidebar = waTheme.layout.$sidebar;
            that.$footer = ( waTheme.layout.$footer && waTheme.layout.$footer.length ? waTheme.layout.$footer : false);

            // VARS

            // DYNAMIC VARS

            // INIT
            that.initClass();
        };

        Layout.prototype.initClass = function() {
            var that = this;
            //
            if (that.$footer) {
                that.initMinSpace();
            }
            //
            that.initAuthAdapters();
            //
            that.initCaptcha();
            //
            that.initSidebar();

            $.ajaxSetup({
                cache: false
            });
        };

        // Min space before footer
        Layout.prototype.initMinSpace = function() {
            var that = this;

            var $window = that.$window,
                $content = that.$content,
                $footer = that.$footer.find(".s-footer-block");

            setSpace();

            $window.on("resize", setSpace);

            window.addEventListener("orientationchange", setSpace);

            function setSpace() {
                $content.removeAttr("style");

                var display_height = $window.height(),
                    main_height = $content.closest(".s-content-wrapper").height(),
                    footer_top = $footer.offset().top,
                    footer_height = $footer.outerHeight(true);

                var delta = ( display_height - (footer_top + footer_height) );

                if (delta > 0) {
                    $content.css({
                        "min-height": main_height + delta + "px"
                    });
                }
            }

        };

        Layout.prototype.initAuthAdapters = function() {
            var that = this;

            $(".s-adapters-section").on("click", "a", function(event) {
                event.preventDefault();
                onProviderClick( $(this) );
            });

            function onProviderClick( $link ) {
                var $li = $link.closest("li"),
                    provider = $li.data("provider");

                if (provider !== 'guest' && provider !== 'signup') {
                    var left = (screen.width-600)/ 2,
                        top = (screen.height-400)/ 2,
                        href = $link.attr("href");

                    if ( ( typeof require_authorization !== "undefined" ) && !require_authorization) {
                        href = href + "&guest=1";
                    }

                    window.open(href, "oauth", "width=600,height=400,left="+left+",top="+top+",status=no,toolbar=no,menubar=no");
                }
            }
        };

        Layout.prototype.initCaptcha = function() {
            var that = this;

            // Click on refresh button or image
            $(".wa-captcha").on("click", ".wa-captcha-refresh, .wa-captcha-img", function(event) {
                event.preventDefault();
                refreshCaptcha( $(this) );
            });

            // Refresh Captcha
            function refreshCaptcha($target) {
                var $wrapper = $target.closest(".wa-captcha"),
                    captcha = $wrapper.find(".wa-captcha-img");

                if (captcha.length) {
                    var newCaptchaHref = captcha.attr("src").replace( /\?.*$/,'?rid='+Math.random() );

                    captcha.attr("src", newCaptchaHref);

                    captcha.one("load", function() {
                        $wrapper.find('.wa-captcha-input').focus();
                    });
                }

                $wrapper.find("input").val("");
            }
        };

        Layout.prototype.initSidebar = function() {
            var that = this;

            if (!that.$sidebar || !that.$sidebar.length) {
                return false;
            }

            var Sidebar = ( function($) {

                Sidebar = function (options) {
                    var that = this;

                    // DOM
                    that.$wrapper = options["$wrapper"];

                    // VARS

                    // DYNAMIC VARS

                    // INIT
                    that.initClass();
                };

                Sidebar.prototype.initClass = function() {
                    var that = this;

                    that.initDeepLists();
                };

                Sidebar.prototype.initDeepLists = function() {
                    var that = this,
                        $lists = that.$wrapper.find(".js-deep-list");

                    $lists.each( function() {
                        var $list = $(this);

                        $list.on("click", ".js-toggle", function(event) {
                            event.preventDefault();

                            var $li = $(this).closest("li"),
                                open_class = "is-opened";

                            $li.toggleClass(open_class);
                        });
                    });
                };

                return Sidebar;

            })($);

            new Sidebar({
                $wrapper: that.$sidebar
            });
        };

        return Layout;

    })($);

    // Pane :: bottom panel with store buttons
    var Pane = (function($) {

        Pane = function(options) {
            var that = this;

            // DOM
            that.$wrapper = options["$wrapper"];

            // VARS

            // DYNAMIC VARS

            // INIT
            that.initClass();
        };

        Pane.prototype.initClass = function() {
            var that = this;

            that.initSticky();
        };

        Pane.prototype.initSticky = function() {
            var that = this,
                $wrapper = that.$wrapper.find(".js-pane-wrapper");

            var FixedBlock = ( function($) {

                FixedBlock = function(options) {
                    var that = this;

                    // DOM
                    that.$window = $(window);
                    that.$wrapper = options["$wrapper"];
                    that.$section = options["$section"];
                    that.$wrapperContainer = that.$wrapper.parent();

                    // VARS
                    that.type = (options["type"] || "bottom");

                    // DYNAMIC VARS
                    that.offset = {};
                    that.$clone = false;
                    that.is_fixed = false;

                    // INIT
                    that.initClass();
                };

                FixedBlock.prototype.initClass = function() {
                    var that = this,
                        $window = that.$window,
                        resize_timeout = 0;

                    $window.on("resize", function() {
                        clearTimeout(resize_timeout);
                        resize_timeout = setTimeout( function() {
                            that.resize();
                        }, 100);
                    });

                    $window.on("scroll", watcher);

                    that.$wrapper.on("resize", function() {
                        that.resize();
                    });

                    that.init();

                    watcher();

                    function watcher() {
                        var is_exist = $.contains($window[0].document, that.$wrapper[0]);
                        if (is_exist) {
                            that.onScroll($window.scrollTop());
                        } else {
                            $window.off("scroll", watcher);
                        }
                    }

                    that.$wrapper.data("block", that);
                };

                FixedBlock.prototype.init = function() {
                    var that = this;

                    if (!that.$clone) {
                        var $clone = $("<div />");
                        that.$wrapperContainer.append($clone);
                        that.$clone = $clone;
                    }

                    that.$clone.hide();

                    var offset = that.$wrapper.offset();
                    that.offset = {
                        left: offset.left,
                        top: offset.top,
                        width: that.$wrapper.outerWidth(),
                        height: that.$wrapper.outerHeight()
                    };
                };

                FixedBlock.prototype.resize = function() {
                    var that = this;

                    switch (that.type) {
                        case "top":
                            that.fix2top(false);
                            break;
                        case "bottom":
                            that.fix2bottom(false);
                            break;
                    }

                    var offset = that.$wrapper.offset();
                    that.offset = {
                        left: offset.left,
                        top: offset.top,
                        width: that.$wrapper.outerWidth(),
                        height: that.$wrapper.outerHeight()
                    };

                    that.$window.trigger("scroll");
                };

                /**
                 * @param {Number} scroll_top
                 * */
                FixedBlock.prototype.onScroll = function(scroll_top) {
                    var that = this,
                        window_w = that.$window.width(),
                        window_h = that.$window.height();

                    // update top for dynamic content
                    that.offset.top = that.$wrapperContainer.offset().top;

                    switch (that.type) {
                        case "top":
                            var bottom_case = (that.$section ? ((scroll_top + that.offset.height) < that.$section.height() + that.$section.offset().top) : true),
                                use_top_fix = (that.offset.top < scroll_top && bottom_case);

                            that.fix2top(use_top_fix);
                            break;
                        case "bottom":
                            var use_bottom_fix = (that.offset.top && scroll_top + window_h < that.offset.top + that.offset.height);
                            that.fix2bottom(use_bottom_fix);
                            break;
                    }

                };

                /**
                 * @param {Boolean|Object} set
                 * */
                FixedBlock.prototype.fix2top = function(set) {
                    var that = this,
                        fixed_class = "is-top-fixed";

                    if (set) {
                        that.$wrapper
                            .css({
                                left: that.offset.left,
                                width: that.offset.width
                            })
                            .addClass(fixed_class);

                        that.$clone.css({
                            height: that.offset.height
                        }).show();

                    } else {
                        that.$wrapper.removeClass(fixed_class).removeAttr("style");
                        that.$clone.removeAttr("style").hide();
                    }

                    that.is_fixed = !!set;
                };

                /**
                 * @param {Boolean|Object} set
                 * */
                FixedBlock.prototype.fix2bottom = function(set) {
                    var that = this,
                        fixed_class = "is-bottom-fixed";

                    if (set) {
                        that.$wrapper
                            .css({
                                left: that.offset.left,
                                width: that.offset.width
                            })
                            .addClass(fixed_class);

                        that.$clone.css({
                            height: that.offset.height
                        }).show();

                    } else {
                        that.$wrapper.removeClass(fixed_class).removeAttr("style");
                        that.$clone.removeAttr("style").hide();
                    }

                    that.is_fixed = !!set;
                };

                return FixedBlock;

            })(jQuery);

            new FixedBlock({
                $wrapper: $wrapper,
                type: "bottom"
            });

        };

        return Pane;
    })($);

    // Pane :: Compare
    var Compare = ( function($) {

        var change_functions = [];

        Compare = function(options) {
            var that = this;

            // DOM
            that.$wrapper = options["$wrapper"];
            that.$count = that.$wrapper.find(".js-count");
            that.$compareIcon = that.$wrapper.find(".js-compare-icon");
            that.onChange = options["onChange"];

            // VARS

            // DYNAMIC VARS
            that.count = null;

            // INIT
            that.initClass();
        };

        Compare.prototype.initClass = function() {
            var that = this,
                is_frame = waTheme.is_frame;

            if (that.onChange && (typeof that.onChange === "function") ) {
                change_functions.push(that.onChange);
            }

            if (!is_frame) {
                that.update();
            }
        };

        Compare.prototype.update = function() {
            var that = this,
                compare = $.cookie("shop_compare"),
                count;

            compare = (compare) ? compare.split(',') : [];
            count = compare.length;

            if ( count > 0 ) {
                that.$count.text(count);
                that.toggle(true);
            } else {
                that.$count.text(0);
                that.toggle();
            }

            that.count = count;

            $.each(change_functions, function(index, func) {
                try {
                    func(that);
                } catch(e) {
                    console.log(e.message);
                }
            });
        };

        Compare.prototype.toggle = function(show) {
            var that = this,
                empty_class = "is-empty",
                active_class = "active";

            if (show) {
                that.$wrapper.removeClass(empty_class);
                that.$compareIcon.addClass(active_class);
            } else {
                that.$wrapper.addClass(empty_class);
                that.$compareIcon.removeClass(active_class);
            }
        };

        /**
         * @param {String|Number} product_id
         * @param {Object?} $image
         * @return {Boolean}
         * */
        Compare.prototype.addToCompare = function(product_id, $image) {
            var that = this;

            product_id = product_id + "";

            var cookie_name = "shop_compare",
                cookie_compare = $.cookie(cookie_name),
                compare_ids = (cookie_compare) ? cookie_compare.split(',') : [],
                index = compare_ids.indexOf(product_id),
                is_added = (index >= 0);

            if (is_added) {
                remove(product_id);
                that.update();

            } else {
                add(product_id);

                if ($image && $image.length) {
                    animate($image).then( function() {
                        that.update();
                    });
                }
            }

            return !is_added;

            /**
             * @param {Object} $image
             * */
            function animate($image) {
                var deferred = $.Deferred();

                // DOM
                var $clone = $image.clone();

                // VARS
                var offset = $image.offset(),
                    image_w = $image.width(),
                    image_h = $image.height(),
                    cartCount = $('.counter.js-count');
                    cart_offset = cartCount.offset(),
                    time = 2000;

                var clone_class = "s-clone-wrapper",
                    animate_to_class = "is-animated";

                $clone
                    .hide()
                    .addClass(clone_class);

                $clone.css({
                    top: offset.top,
                    left: offset.left,
                    width: image_w,
                    height: image_h
                });

                $clone.appendTo($("body")).show();

                $clone.css({
                    top: cart_offset.top,
                    left: cart_offset.left,
                    width: 0,
                    height: 0,
                    opacity: 0
                }).addClass(animate_to_class);

                setTimeout( function() {
                    $clone.remove();
                    deferred.resolve();
                }, time);

                return deferred.promise();
            }

            /**
             * @param {String} product_id
             * */
            function add(product_id) {
                compare_ids.push(product_id);
                $.cookie(cookie_name, compare_ids.join(','), {expires: 30, path: '/'});
            }

            /**
             * @param {String} product_id
             * */
            function remove(product_id) {
                compare_ids.splice(index, 1);

                if (compare_ids.length > 0) {
                    $.cookie(cookie_name, compare_ids.join(','), { expires: 30, path: '/'});
                } else {
                    $.cookie(cookie_name, null, {path: '/'});
                }
            }
        };

        /**
         * @param {Function} func
         * */
        Compare.prototype.onChange = function(func) {
            if (typeof func === "function") {
                change_functions.push(func);
            }
        };

        return Compare;
    })($);

    // Pane :: Cart
    var Cart = (function($) {

        var change_functions = [];

        Cart = function(options) {
            var that = this;

            // DOM
            that.$wrapper = options["$wrapper"];
            that.$count = that.$wrapper.find(".jsCartCount");
            that.$text = that.$wrapper.find(".jsTotalPrice");

            // VARS

            // DYNAMIC VARS
            that.count = options["count"];

            // INIT
            that.initClass();
        };

        Cart.prototype.initClass = function() {
            var that = this;

            $(document).on("cartIsChanged", function(event, data) {
                that.update(data);
            });


        };

        /**
         * @param {Object} data
         * */
        Cart.prototype.update = function(data) {
            var that = this;

            if (data.count > 0) {
                that.$count.text(data.count);
                that.$text.html(data.text);
                that.count = (data.count);
                toggle(true);
            } else {
                that.$count.text(0);
                that.$text.html(data.text);
                that.count = 0;
                toggle();
            }

            function toggle(show) {
                var empty_class = "is-empty";

                if (show) {
                    that.$wrapper.removeClass(empty_class);
                } else {
                    that.$wrapper.addClass(empty_class);
                }
            }

            $.each(change_functions, function(index, func) {
                try {
                    func(that);
                } catch(e) {
                    console.log(e.message);
                }
            });
        };

        /**
         * @param {Function} func
         * */
        Cart.prototype.onChange = function(func) {
            if (typeof func === "function") {
                change_functions.push(func);
            }
        };

        /**
         * @param {Object} $image
         * */
        Cart.prototype.animateAddToCart = function($image) {
            var that = this;

            if ($image && $image.length) {
                animate($image);
            }

            /**
             * @param {Object} $image
             * */
            function animate($image) {
                var deferred = $.Deferred();

                // DOM
                var $clone = $image.clone();

                // VARS
                var offset = $image.offset(),
                    image_w = $image.width(),
                    image_h = $image.height(),
                    cartCount = $('.counter.jsCartCount');
                    cart_offset = cartCount.offset(),
                    time = 2000;

                var clone_class = "s-clone-wrapper",
                    animate_to_class = "is-animated";

                $clone
                    .hide()
                    .addClass(clone_class);

                $clone.css({
                    top: offset.top,
                    left: offset.left,
                    width: image_w,
                    height: image_h
                });

                $clone.appendTo($("body")).show();

                $clone.css({
                    top: cart_offset.top,
                    left: cart_offset.left,
                    width: 0,
                    height: 0,
                    opacity: 0
                }).addClass(animate_to_class);

                setTimeout( function() {
                    $clone.remove();
                    deferred.resolve();
                }, time);

                return deferred.promise();
            }
        };

        return Cart;

    })($);

    // Header :: Catalog
    var Catalog = ( function($) {

        Catalog = function(options) {
            var that = this;

            // DOM
            that.$wrapper = options["$wrapper"];
            that.$button = that.$wrapper.find(".s-catalog-button");
            that.$list = that.$wrapper.find(".s-catalog-list");

            // VARS
            that.open_class = "is-opened";
            that.hover_class = "is-hover";
            that.is_locked = options["is_locked"];

            // DYNAMIC VARS
            that.is_opened = false;
            that.is_touch_enabled = waTheme.is_touch_enabled;
            that.$activeMenu = false;

            // TIMERS
            that.timer_1 = 0;
            that.timer_2 = 0;
            that.timer_3 = 0;
            that.open_timer = 0;
            that.show_time = 666;
            that.hide_time = 666;

            // INIT
            $(document).ready( function() {
                that.initClass();
            });
        };

        Catalog.prototype.initClass = function() {
            var that = this;

            that.$block = waTheme.layout.$block;
            that.$sidebar = waTheme.layout.$sidebar;

            // Set sidebar lift
            if (that.is_locked) {
                that.$sidebar.css("padding-top", that.$list.outerHeight());
            }
            //
            that.bindEvents();
        };

        Catalog.prototype.bindEvents = function() {
            var that = this;

            // Show/hide main menu
            if (that.is_touch_enabled) {
                that.$button[0].addEventListener("touchstart", function () {
                    that.toggleView();
                });

                var $openedLi = false;

                that.$wrapper.on("click", "a", function(event) {
                    event.preventDefault();

                    var $link = $(this),
                        $li = $link.closest("li"),
                        has_menu = !!$li.find("> .s-sub-wrapper").length;

                    var active_class = "is-opened";

                    if ($openedLi) {
                        $openedLi.removeClass(active_class);
                        $openedLi = false;
                    }

                    if (has_menu) {
                        $openedLi = $li.addClass(active_class);

                    } else {
                        location.href = $link[0].href;
                    }
                });

            } else {
                that.$button.on("mouseenter", function() {
                    that.open_timer = setTimeout( function() {
                        that.toggleView("show");
                    }, that.show_time);

                });

                that.$button.on("click", function() {
                    if (!that.is_locked) {
                        clearTimeout(that.open_timer);
                        if (that.is_opened) {
                            that.toggleView("hide");
                        } else {
                            that.toggleView("show");
                        }
                    }
                });

                that.$button.on("mouseleave", function() {
                    clearTimeout(that.open_timer);
                });

                that.$wrapper.on("mouseenter", function() {
                    clearTimeout(that.timer_1);
                });

                that.$wrapper.on("mouseleave", function() {
                    that.timer_1 = setTimeout( function() {
                        that.hideSubmenu();
                        that.toggleView("hide");
                    }, that.hide_time);
                });
            }

            // Show/hide submenu
            if (!that.is_touch_enabled) {
                that.$list.on("mouseenter", "> li", function() {
                    var $li = $(this);
                    clearTimeout(that.timer_2);
                    clearTimeout(that.timer_3);
                    that.timer_3 = setTimeout( function() {
                        that.hideSubmenu();
                        that.showSubmenu($li);
                    }, that.show_time);
                });
                that.$list.on("mouseleave", "> li", function() {
                    that.timer_2 = setTimeout( function() {
                        that.hideSubmenu();
                    }, that.hide_time);
                });
            }
        };

        Catalog.prototype.toggleView = function(show) {
            var that = this,
                show_list;

            clearTimeout(that.timer_1);

            if (!that.is_locked) {
                if (show) {
                    if (show === "show") {
                        show_list = true;
                    } else if (show === "hide") {
                        show_list = false;
                    }
                } else {
                    show_list = !that.is_opened;
                }

                if (show_list) {
                    that.$wrapper.addClass(that.open_class);
                    that.is_opened = true;
                } else {
                    that.$wrapper.removeClass(that.open_class);
                    that.is_opened = false;
                    that.hideSubmenu();
                }
            }
        };

        Catalog.prototype.showSubmenu = function($li) {
            var that = this,
                is_active = $li.hasClass(that.hover_class);

            clearTimeout(that.timer_2);

            if (!is_active) {
                that.hideSubmenu();
                //
                setSubmenuWidth($li);
                //
                that.$activeMenu = $li.addClass(that.hover_class);
            }

            function setSubmenuWidth( $li ) {
                var $sub_list = $li.find(".s-sub-wrapper");
                if ($sub_list.length) {
                    var width = that.$block.outerWidth() - that.$list.outerWidth() - 32 + 8;
                    $sub_list.css("width", width + "px");
                }
            }
        };

        Catalog.prototype.hideSubmenu = function() {
            var that = this;

            clearTimeout(that.timer_2);

            if (that.$activeMenu) {
                that.$activeMenu.removeClass(that.hover_class);
                that.$activeMenu = false;
            }
        };

        return Catalog;

    })($);

    // MAILER app email subscribe form
    var SubscribeSection = ( function($) {

        SubscribeSection = function(options) {
            var that = this;

            // DOM
            that.$wrapper = options["$wrapper"];
            that.$form = that.$wrapper.find("form");
            that.$emailField = that.$wrapper.find(".js-email-field");
            that.$submitButton = that.$wrapper.find(".js-submit-button");

            // VARS
            that.request_uri = options["request_uri"];
            that.locales = options["locales"];

            // DYNAMIC VARS

            // INIT
            that.initClass();
        };

        SubscribeSection.prototype.initClass = function() {
            var that = this;

            if (that.request_uri.substr(0,4) === "http") {
                that.request_uri = that.request_uri.replace("http:", "").replace("https:", "");
            }

            var $invisible_captcha = that.$form.find(".wa-invisible-recaptcha");
            if (!$invisible_captcha.length) {
                that.initView();
            }

            that.initSubmit();
        };

        SubscribeSection.prototype.initView = function() {
            var that = this;

            that.$emailField.on("focus", function() {
                toggleView(true);
            });

            $(document).on("click", watcher);

            function watcher(event) {
                var is_exist = $.contains(document, that.$wrapper[0]);
                if (is_exist) {
                    var is_target = $.contains(that.$wrapper[0], event.target);
                    if (!is_target) {
                        toggleView(false);
                    }
                } else {
                    $(document).off("click", watcher);
                }
            }

            function toggleView(show) {
                var active_class = "is-extended";
                if (show) {
                    that.$wrapper.addClass(active_class);
                } else {
                    var email_value = that.$emailField.val();
                    if (!email_value.length) {
                        that.$wrapper.removeClass(active_class);
                    } else {

                    }
                }
            }
        };

        SubscribeSection.prototype.initSubmit = function() {
            var that = this,
                $form = that.$form,
                $errorsPlace = that.$wrapper.find(".js-errors-place"),
                is_locked = false;

            $form.on("submit", onSubmit);

            function onSubmit(event) {
                event.preventDefault();

                var formData = getData();

                if (formData.errors.length) {
                    renderErrors(formData.errors);
                } else {
                    request(formData.data);
                }
            }

            /**
             * @return {Object}
             * */
            function getData() {
                var result = {
                        data: [],
                        errors: []
                    },
                    data = $form.serializeArray();

                $.each(data, function(index, item) {
                    if (item.value) {
                        result.data.push(item);
                    } else {
                        result.errors.push({
                            name: item.name
                        });
                    }
                });

                return result;
            }

            /**
             * @param {Array} data
             * */
            function request(data) {
                if (!is_locked) {
                    is_locked = true;

                    var href = that.request_uri;

                    $.post(href, data, "jsonp")
                        .always( function() {
                            is_locked = false;
                        })
                        .done( function(response) {
                            if (response.status === "ok") {
                                renderSuccess();

                            } else if (response.errors) {
                                var errors = formatErrors(response.errors);
                                renderErrors(errors);
                            }
                        });
                }

                /**
                 * @param {Object} errors
                 * @result {Array}
                 * */
                function formatErrors(errors) {
                    var result = [];

                    $.each(errors, function(text, item) {
                        var name = item[0];

                        if (name === "subscriber[email]") { name = "email"; }

                        result.push({
                            name: name,
                            value: text
                        });
                    });

                    return result;
                }
            }

            /**
             * @param {Array} errors
             * */
            function renderErrors(errors) {
                var error_class = "error";

                if (!errors || !errors[0]) {
                    errors = [];
                }

                $.each(errors, function(index, item) {
                    var name = item.name,
                        text = item.value;

                    var $field = that.$wrapper.find("[name=\"" + name + "\"]"),
                        $text = $("<span class='c-error' />").addClass("error");

                    if ($field.length && !$field.hasClass(error_class)) {
                        if (text) {
                            $field.parent().append($text.text(text));
                        }

                        $field
                            .addClass(error_class)
                            .one("focus click change", function() {
                                $field.removeClass(error_class);
                                $text.remove();
                            });
                    } else {
                        $errorsPlace.append($text);

                        $form.one("submit", function() {
                            $text.remove();
                        });
                    }
                });
            }

            function renderSuccess() {
                var $text = that.$wrapper.find(".js-success-message");
                $form.hide();
                $text.show();
            }
        };

        return SubscribeSection;

    })(jQuery);

    var ScheduleSection = ( function($) {

        ScheduleSection = function(options) {
            var that = this;

            // DOM
            that.$wrapper = options["$wrapper"];

            // VARS

            // DYNAMIC VARS

            // INIT
            that.initClass();
        };

        ScheduleSection.prototype.initClass = function() {
            var that = this,
                $wrapper = that.$wrapper;

            var open_class = "is-open";

            $wrapper.on("click", ".js-show-schedule", function(event) {
                event.preventDefault();
                $wrapper.toggleClass(open_class);
            });

            $wrapper.on("click", ".js-close-schedule", function(event) {
                event.preventDefault();
                $wrapper.removeClass(open_class);
            });

            $(document).on("click", clickWatcher);
            function clickWatcher(event) {
                var is_exist = $.contains(document, $wrapper[0]);
                if (is_exist) {
                    var is_target = $.contains($wrapper[0], event.target);
                    if (!is_target) {
                        if ($wrapper.hasClass(open_class)) {
                            $wrapper.removeClass(open_class);
                        }
                    }
                } else {
                    $(document).off("click", clickWatcher);
                }
            }

            $(document).on("keyup", keyWatcher);
            function keyWatcher(event) {
                var is_exist = $.contains(document, $wrapper[0]);
                if (is_exist) {
                    var is_escape = (event.keyCode === 27);
                    if (is_escape) {
                        if ($wrapper.hasClass(open_class)) {
                            $wrapper.removeClass(open_class);
                        }
                    }
                } else {
                    $(document).off("click", keyWatcher);
                }
            }
        };

        return ScheduleSection;

    })(jQuery);

    // PAGES

    var ProfilePage = ( function($) {

        ProfilePage = function(options) {
            var that = this;

            // DOM
            that.$wrapper = options["$wrapper"];
            that.locales = options["locales"];

            // VARS

            // DYNAMIC VARS
            that.is_locked = false;
            that.xhr = false;

            // INIT
            that.initClass();
        };

        ProfilePage.prototype.initClass = function() {
            var that = this;

            that.initEditProfile();
        };

        ProfilePage.prototype.initEditProfile = function() {
            var that = this,
                $wrapper = that.$wrapper.find(".js-form-wrapper");

            if (!$wrapper.length) { return false; }

            var ProfileSection = ( function($) {

                ProfileSection = function(options) {
                    var that = this;

                    // DOM
                    that.$wrapper = options["$wrapper"];
                    that.$editBlock = that.$wrapper.find(".js-edit-block");
                    that.$viewBlock = that.$wrapper.find(".js-view-block");
                    that.$passwordField = that.$editBlock.find(".wa-field-password");
                    that.$photoField = that.$editBlock.find(".wa-field-photo");

                    // VARS
                    that.locales = options["locales"];

                    // DYNAMIC VARS

                    // INIT
                    that.initClass();
                };

                ProfileSection.prototype.initClass = function() {
                    var that = this;
                    //
                    that.initBlockToggle();
                    //
                    if (that.$passwordField.length) {
                        that.initChangePassword();
                    }
                    //
                    if (that.$photoField.length) {
                        that.initPhotoSection();
                    }
                };

                ProfileSection.prototype.initBlockToggle = function() {
                    var that = this;

                    // show Edit Form
                    that.$wrapper.on("click", ".js-show-edit-form", function(event) {
                        event.preventDefault();
                        toggle(true);
                    });

                    // hide edit Form
                    that.$wrapper.on("click", ".js-reset-form", function(event) {
                        event.preventDefault();
                        that.$wrapper.trigger("onReset");
                        toggle(false);
                    });

                    /**
                     * @param {Boolean} show
                     * */
                    function toggle(show) {
                        if (show) {
                            that.$viewBlock.hide();
                            that.$editBlock.show();

                        } else {
                            that.$editBlock.hide();
                            that.$viewBlock.show();
                        }
                    }
                };

                ProfileSection.prototype.initChangePassword = function() {
                    var that = this,
                        $password = that.$passwordField,
                        $passwordBlock = $password.find("p"),
                        $changeLink = $("<a class=\"s-button s-change-password-button js-change-password\" href=\"javascript:void(0);\">" + that.locales["changePasswordText"] + "</a>").hide(),
                        hidden_class = "is-hidden",
                        is_changed = false;

                    // Render
                    $password.find('.wa-value').prepend($changeLink);

                    $changeLink.on("click", function(event) {
                        event.preventDefault();
                        toggle(true);
                    });

                    var $viewChangePassword = that.$viewBlock.find(".js-change-password-force").show();
                    $viewChangePassword.on("click", function(event) {
                        event.preventDefault();

                        that.$wrapper.find(".js-show-edit-form").trigger("click");
                        toggle(true);
                        setTimeout(function() {
                            $(window).scrollTop($password.offset().top);
                        }, 100)
                    });

                    toggle(false);

                    that.$wrapper.on("onReset", function() {
                        if (is_changed) {
                            toggle(false);
                        }
                    });

                    /**
                     * @param {Boolean} show
                     * */
                    function toggle(show) {
                        if (show) {
                            $changeLink.hide();
                            $passwordBlock.removeClass(hidden_class);

                        } else {
                            $changeLink.show();
                            $passwordBlock.addClass(hidden_class);
                        }

                        is_changed = show;
                    }
                };

                ProfileSection.prototype.initPhotoSection = function() {
                    var that = this,
                        $photo = that.$photoField,
                        $delete_photo_link = $("<a class=\"js-delete-photo\" href=\"javascript:void(0);\">" + that.locales["deletePhotoText"] + "</a>"),
                        $delete_link_wrapper = $("<p />").append($delete_photo_link),
                        $photo_input = $photo.find('[name="profile[photo]"]'),
                        $user_photo = $photo.find('img:first'),
                        $default_photo = $photo.find('img:last'),
                        photo_input_val = $photo_input.val(),
                        is_changed = false;

                    if ($user_photo[0] !== $default_photo[0]) {
                        $default_photo.hide()
                            .after($delete_link_wrapper);

                        $delete_photo_link.on("click", function(event) {
                            event.preventDefault();
                            toggle(true);
                        });

                    } else {
                        $default_photo.show();
                    }

                    that.$wrapper.on("onReset", function() {
                        if (is_changed) {
                            toggle(false);
                        }
                    });

                    /**
                     * @param {Boolean} show
                     * */
                    function toggle(show) {
                        if (show) {
                            $user_photo.hide();
                            $default_photo.show();
                            $delete_photo_link.hide();
                            $photo_input.val('');
                        } else {
                            $user_photo.show();
                            $default_photo.hide();
                            $delete_photo_link.show();
                            $photo_input.val(photo_input_val);
                        }

                        is_changed = show;
                    }
                };

                return ProfileSection;

            })($);

            new ProfileSection({
                $wrapper: $wrapper,
                locales: that.locales
            });
        };

        return ProfilePage;

    })($);

    //

    waTheme.init.site.Layout = Layout;
    waTheme.init.site.Pane = Pane;
    waTheme.init.site.ProfilePage = ProfilePage;
    waTheme.init.site.FixedBlock = FixedBlock;
    waTheme.init.site.SubscribeSection = SubscribeSection;
    waTheme.init.site.ScheduleSection = ScheduleSection;

    waTheme.init.shop.Compare = Compare;
    waTheme.init.shop.Cart = Cart;
    waTheme.init.shop.Catalog = Catalog;

})(jQuery, window.waTheme);