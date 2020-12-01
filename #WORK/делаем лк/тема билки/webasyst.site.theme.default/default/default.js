// Show Menu on Hover
( function($) {
     $(".addtocart").click(function() {
  $(this).css('display') == 'block';
  $(this).addClass("block");

  
});

    var enter, leave;

    var storage = {
        activeClass: "submenu-is-shown",
        showTime: 0,
        $last_li: false,
        getMain: function() {
            return $(".maincontent");
        },
        getFooter: function() {
            return $(".globalfooter");
        }
    };

    var bindEvents = function() {
        var $selector = $(".flyout-nav > li");

        $selector.on("mouseenter", function() {
            showSubMenu( $(this) );
        });

        $selector.on("mouseleave", function() {
            hideSubMenu( $(this) );
        });

        $selector.on("click", function() {
            var $li = $(this),
                is_active = $li.hasClass(storage.activeClass);

            if (is_active) {
                var href = $li.find("> a").attr("href");
                if ( href && (href !== "javascript:void(0);") ) {
                    hideSubMenu( $li );
                }

            } else {
                showSubMenu( $li );
            }
        });

    };

    var showSubMenu = function( $li ) {
        var is_active = $li.hasClass(storage.activeClass),
            has_sub_menu = ( $li.find(".flyout").length );

        if (is_active) {
            clearTimeout( leave );

        } else {
            if (has_sub_menu) {

                enter = setTimeout( function() {

                    if (storage.$last_li && storage.$last_li.length) {
                        clearTimeout( leave );
                        storage.$last_li.removeClass(storage.activeClass);
                    }

                    $li.addClass(storage.activeClass);
                    toggleMainOrnament(true);
                }, storage.showTime);
            }
        }
    };

    var hideSubMenu = function( $li ) {
        var is_active = $li.hasClass(storage.activeClass);

        if (!is_active) {
            clearTimeout( enter );

        } else {
            storage.$last_li = $li;

            leave = setTimeout(function () {
                $li.removeClass(storage.activeClass);
                toggleMainOrnament(false);
            }, storage.showTime * 2);
        }
    };

    var toggleMainOrnament = function($toggle) {
        var $main = storage.getMain(),
            $footer = storage.getFooter();

        if ($toggle) {
            $main.addClass(storage.activeClass);
            $footer.addClass(storage.activeClass);

        } else {
            $main.removeClass(storage.activeClass);
            $footer.removeClass(storage.activeClass);
        }
    };

    $(document).ready( function() {
        bindEvents();
    });

})(jQuery);

var MatchMedia = function( media_query ) {
    var matchMedia = window.matchMedia,
        is_supported = (typeof matchMedia === "function");
    if (is_supported && media_query) {
        return matchMedia(media_query).matches
    } else {
        return false;
    }
};

$(document).ready(function() {
    

    // custom LOGO position adjustment
    if ($('#logo').length)
    {
        $(window).load(function(){
        
            var _logo_height = $('#logo').height();
            var _logo_vertical_shift = Math.round((_logo_height-25)/2);
            
            $('#header-container').css('padding-top', _logo_vertical_shift+'px');
            $('#logo').css('margin-top', '-'+_logo_vertical_shift+'px');
        
        });
    }

    // MOBILE nav slide-out menu
    $('#mobile-nav-toggle').click( function(){
        if (!$('.nav-negative').length) {
            $('body').prepend($('header .apps').clone().removeClass('apps').addClass('nav-negative'));
            $('body').prepend($('header .auth').clone().addClass('nav-negative'));
            $('body').prepend($('header .search').clone().addClass('nav-negative'));
            $('body').prepend($('header .offline').clone().addClass('nav-negative'));
            $('.nav-negative').hide().slideToggle(200);
        } else {
            $('.nav-negative').slideToggle(200);
        }
        $("html, body").animate({ scrollTop: 0 }, 200);
        return false;
    });
        
    // MAILER app email subscribe form
    $('#mailer-subscribe-form input.charset').val(document.charset || document.characterSet);
    $('#mailer-subscribe-form').submit(function() {
        var form = $(this);

        var email_input = form.find('input[name="email"]');
        var email_submit = form.find('input[type="submit"]');
        if (!email_input.val()) {
            email_input.addClass('error');
            return false;
        } else {
            email_input.removeClass('error');
        }
        
        email_submit.hide();
        email_input.after('<i class="icon16 loading"></i>');

        $('#mailer-subscribe-iframe').load(function() {
            $('#mailer-subscribe-form').hide();
            $('#mailer-subscribe-iframe').hide();
            $('#mailer-subscribe-thankyou').show();
        });
    });
     });
     $( document ).ready(function() {
         $('.show_popular').css({
            'font-weight': 'bold'
        });
        $('.dropdown > li').addClass('collapsible');
     $('.show_popular').click(function() {
         $('.hidden_option').hide('slow');
         
         $('.show_popular').css({
            'font-weight': 'bold'
        });
        $('.show_all').css({
            'font-weight': 'normal'
        });
     });
     $('.show_all').click(function() {
         $('.hidden_option').show('slow');
         $('.hidden_option').css({
            'display': 'block'
        });
         $('.show_all').css({
            'font-weight': 'bold'
        });
        $('.show_popular').css({
            'font-weight': 'normal'
        });
        
     });
     
});