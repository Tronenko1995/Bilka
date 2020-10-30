$(document).ready(function() {

  const screenWidth = document.body.clientWidth;

  const mobileButton = $('.jsMobMenu');
  const mobileMenu = $('.mobile-menu');
  const mobileCatalog = $('.mobile-catalog');
  const mobiFilter = $('.jsMobiFilter');

  const catalogButton = $('.jsCatalog');
  const catalogList = $('.catalog-button__for-list');

  const cartButton = $('.jsCart');
  const cartList = $('.cart');

  const dark = $('.mobile-darkness');


  var mobMenu = 0;
  var mobCatalog = 0;

  var mobCart = 0;

  let mobFilter = 0;
     
    /* Декстоп вызов меню-каталог */
    $(catalogButton).on('click', function(e){
      $(catalogList).toggleClass('hide');
      $(this).toggleClass('active');
    });

    /* Декстоп вызов под-меню-каталог */
    $('.catalog-button__item').on('click', function() {
      $('.item-child').addClass('hide');
      $(this).find('.item-child').removeClass('hide');
    });

    /* Декстоп вызов корзины*/
    $(cartButton).on('click', function(e){
      e.preventDefault();
      if (screenWidth > 550) {
        $(cartList).toggleClass('hide');
      }

      $(this).toggleClass('open');
      /* мобильная версия*/
      if (screenWidth <= 550) {
        if ( mobCart == 0 ) {
          mobCart = 1;
          $(cartList).css('left','0');
          $(dark).css('right','0');
        } else {
          mobCart = 0;
          $(cartList).css('left','-324px');
          $(dark).css('right','-100%');
        }
      }
    });

    if (screenWidth < 550) {
      $(cartList).removeClass('hide');
    }

    /* Моб вызов меню */
    $(mobileButton).on('click', function() {
      if (mobMenu == 0) {
        mobMenu = 1;
        $('.mobile-menu').css('left','0');
        $(dark).css('right','0');
      }
      else {
        mobMenu = 0;
        $('.mobile-menu').css('left','-324px');
        $(dark).css('right','-100%');
        if (mobCatalog == 1) {
          mobCatalog = 0;
          $('.mobile-catalog').css('left','-324px');
          $('.mobile-menu').css('opacity','1');
        }
      }
    });

    /* Моб вызов фильтр */
    $(mobiFilter).on('click', function() {
      if (mobFilter == 0) {
        mobFilter = 1;
        $('.sidebar__filter').css('left','0');
        $(dark).css('right','0');
      }
      else {
        mobFilter = 0;
        $('.sidebar__filter').css('left','-285px');
        $(dark).css('right','-100%');
      }
    });

    /* Моб вызов меню каталог */
    $('.js-mobile-button-2').on('click', function() {
      if (mobCatalog == 0) {
        mobCatalog = 1;
        $('.mobile-catalog').css('left','0');
        $('.mobile-menu').css('opacity','0');
      }
      else {
        mobCatalog = 0;
        $('.mobile-catalog').css('left','-324px');
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

    if(!$(catalogList).hasClass('hide')){
      if (!catalogButton.is(e.target) && catalogButton.has(e.target).length === 0 && !catalogList.is(e.target) && catalogList.has(e.target).length === 0) {
          $(catalogList).addClass('hide');
          $(catalogButton).removeClass('active');
      }
    }

    if (screenWidth > 550) {
      if(!$(cartList).hasClass('hide')){
        if ( !cartButton.is(e.target) && cartButton.has(e.target).length === 0 && !cartList.is(e.target) && cartList.has(e.target).length === 0 ) {
          $(cartList).addClass('hide');
          $(cartButton).removeClass('open');
        }
      }
    }
  
      // if (mobMenu != 0) {
      //  if (!mobileMenu.is(e.target) && mobileMenu.has(e.target).length === 0) {
      //    if (!mobileCatalog.is(e.target) && mobileCatalog.has(e.target).length === 0) {
      //      $(mobileCatalog).css('left','-280px');
      //      mobCatalog = 0;
      //      mobMenu = 0;
      //      $(mobileMenu).css('left','-280px');
      //      $(mobileMenu).css('opacity','1');
      //      $('.mobile-darkness').css('right','-100%');
      //    }
      //  }
      // }

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


    $('.slider__wrap').slick({
    	arrows: false,
    	dots: true
    });

    if (screenWidth >= 1170) {

    $('.new-items-slider').slick({
      arrows: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      draggable: false
    });

    $('.top-sales-slider').slick({
        arrows: true,
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          draggable: false
    });

    $('.last-review-slider').slick({
        arrows: true,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          draggable: false
    });

    equalHeight('new-items-slider__item');
    equalHeight('top-sales-slider__item');
    equalHeight('last-review-slider__item');
    equalHeight('recommended-products-slider__item');

    }

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

    $('.select').on('click',function () {
      if ($(this).hasClass('open')) {
          $(this).removeClass('open');
      } else {
        $(this).addClass('open');
      }
  });

  $('.select').on('click', '.select__item', function (event) {
      event.stopPropagation();
      $(this).parent().prev().text($(this).text());
      $(this).parent().prev().prev().val($(this).text());
      $(this).closest('.select').removeClass('open');
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


});