(function($) {
    
    $.reviewsplus_frontend = {
        
        frontend_url: "",        
        show_div: {},
        form_div: {},
        
        init: function(options) {
            
            if(typeof(options.frontend_url) !== "undefined") {
                $.reviewsplus_frontend.frontend_url = options.frontend_url;
            }
                        
            if(typeof(options.popup) !== 'undefined' && options.popup == 1) {
                $.reviewsplus_frontend.show_div = $("#reviewsplus-form-popup .reviewsplus-popup-wrap .reviewsplus-popup-content");
                $.reviewsplus_frontend.form_div = $("#reviewsplus-form-popup");
                $("#reviewsplus-form-popup .reviewsplus-popup-wrap").css('width', '550px');                
            } else {
                $.reviewsplus_frontend.show_div = $("#reviewsplus-form-div .reviewsplus-div-content");
                $.reviewsplus_frontend.form_div = $("#reviewsplus-form-div");
            }
            
            $.reviewsplus_frontend.show_div.append($("#reviewsplus-add-form"));
            
            $("#reviewsplus-add-form").show();
            
            $.reviewsplus_frontend.initRate();
            
            $.reviewsplus_frontend.initShowHide();
            
            $(".reviewsplus-pages-link").on('click', function() {
                
                if($.reviewsplus_frontend.frontend_url == "") {
                    return false;
                }
                
                var page = $(this).data('reviewsplus-page');
                var pid = $(this).closest('.reviewsplus-pages').data('reviewsplus-pid');
                
                if(typeof(pid) !== 'undefined') {
                    
                    if(typeof(page) === 'undefined') {
                        page = 1;
                    }
                    
                    $.ajax({
                        url: $.reviewsplus_frontend.frontend_url + 'showReviewsPage',
                        data: 'pid=' + pid +
                              '&page= ' + page,  
                        dataType: "json",
                        type: "post",
                    
                        success: function(response) {                            
                            
                            if(response.status !== 'fail' && typeof(response.data.html) !== 'undefined') {
                                
                                $(".reviewsplus-main").html(response.data.html);
                                $(".reviewsplus-pages-link").removeClass('selected');
                                $('.reviewsplus-pages-link[data-reviewsplus-page="' + page + '"').addClass('selected');
                                $.reviewsplus_frontend.initShowHide();                                
                            } else {
                                if(console) {
                                    console.log(response);
                                }
                                return false;
                            }
                                                                         
                        },
                    
                        error: function(jqXHR, errorText, errorThrown) {
                            if(console){
                                console.log(jqXHR, errorText, errorThrown);
                            }
                        }                    
                    });                    
                }                
            });
            
            
            $(".reviewsplus-del-link").on('click', function() {
                
                if($.reviewsplus_frontend.frontend_url == "") {
                    return false;
                }
                
                if(!confirm("Удалить комментарий?")) {
                    return false;
                }
                
                var rev_div = $(this).closest('.reviewsplus-review');
                var review_id = rev_div.data('reviewsplus-review-id');
                
                $.ajax({
                    url: $.reviewsplus_frontend.frontend_url + 'delReview',
                    data: 'review_id=' + review_id,
                    dataType: "json",
                    type: "post",
                    
                    success: function(response) {
                        
                        if(response.status === 'fail') {
                            if(console) {
                                console.log(response);
                            }
                            return false;
                        } 
                        
                        $(rev_div).hide(1000);                                               
                    },
                    
                    error: function(jqXHR, errorText, errorThrown) {
                        if(console){
                            console.log(jqXHR, errorText, errorThrown);
                        }
                    }                    
                });                
            });            
            
            $(".reviewsplus-add").on('click', function() {
                
                $("#reviewsplus-add-form").trigger('reset');
                $(".reviewsplus-rate-field").val(0);
                
                $(".reviewsplus-review-rate").each(function() {
                    $(this).attr('data-rate', 0);
                    
                    $(this).find('i').each(function() {                       
                       $(this).removeClass('star');
                       $(this).addClass('star-empty');
                    });                    
                });  
                
                $(".reviewsplus-add-result").empty();
                $(".reviewsplus-add").hide();
                
                $.reviewsplus_frontend.form_div.show();
                
                var height = $("#reviewsplus-form-popup .reviewsplus-popup-wrap .reviewsplus-popup-content").height();
                var w_height = $(window).height();
                
                if(height > w_height) {
                    height = w_height - (w_height*20/100) + 'px';
                    $("#reviewsplus-form-popup .reviewsplus-popup-wrap .reviewsplus-popup-content").css('height', height);
                }

                $.reviewsplus_frontend.initFormButtons();                
            });      
        },   
        
        initFormButtons: function() {
            var self = this;
            $("#reviewsplus-form-popup .reviewsplus-popup-overlay").on('click', function() {
                $("#reviewsplus-form-popup").hide();
                $(".reviewsplus-add").show();
            });
            
            $("#reviewsplus-form-popup .reviewsplus-popup-title .reviewsplus-popup-title-close a").on('click', function() {
                $("#reviewsplus-form-popup").hide();
                $(".reviewsplus-add").show();
            });
            
            $("#reviewsplus-form-div .reviewsplus-div-title .reviewsplus-div-title-close").on('click', function() {
                $("#reviewsplus-form-div").hide();
                $(".reviewsplus-add").show();
            });
            
            $("#reviewsplus-add-form").submit(function () {
                var f = $(this);                
                var action = f.attr('action');
                var msg = '';
                var error = false;
                if(!$.reviewsplus_frontend.validate(f)) {
                    return false;
                }
                $.ajax({
                    url: action,
                    data: f.serialize(),
                    dataType: "json",
                    type: "post",
                    
                    success: function(response) {
                                                        
                        if(response.status === 'fail') {
                            if(console) {
                                console.log(response);
                            }
                                
                            if(typeof(response.errors) !== 'undefined') {

                                $.each(response.errors, function(i, val) {

                                    if(i === 'captcha_refresh' && val) {
                                        $('.wa-captcha-refresh').click();
                                        return;
                                    } 

                                    if(i !== 'captcha_refresh') {
                                        msg += val + '<br/>'; 
                                    }  

                                });                                    
                            }

                            $(".reviewsplus-add-result").css('border', '2px solid red');
                            error = true;
                        } else {                                
                            msg += response.data.msg;
                            $(".reviewsplus-add-result").css('border', '2px solid green');
                        }                            
                            
                    },                        
                       
                    error: function(jqXHR, errorText, errorThrown) {
                        if(console){
                            console.log(jqXHR, errorText, errorThrown);
                        }
                    },
                        
                    complete: function(jqXHR, textStatus) {
                            
                        if(textStatus !== 'success') {
                            error = true;
                            msg = 'Что-то пошло не так ...';
                            if(console) {
                                console.log(jqXHR, textStatus);
                            }
                        }
                            
                            
                        $(".reviewsplus-add-result").html(msg);
                        $(".reviewsplus-add-result").show();
                        setTimeout(function(){
                            $(".reviewsplus-add-result").empty();
                            $(".reviewsplus-add-result").hide();
                            $(".reviewsplus-add-result").css('border', '');
                            if(!error) {                                
                                location.reload(true);
                            }                                
                        }, 1500);                            
                    }
                });
                return false;
            });
        },
        validate:function($form) {
            var result = true;
            $form.find('.reviewsplus-rate-field').each(function () {
                if($(this).attr('rate-required') && parseInt($(this).val())<1){
                    result = false;
                    $(this).closest('.wa-value').addClass('error');
                    $(this).unbind('change').change(function () {
                        $(this).closest('.wa-value').removeClass('error');
                    });
                }
            });
            return result;
        },
        initRate: function() {
            
            $.each($('.reviewsplus-review-rate'), function(e) {
                $(this).rateWidget({
                    onUpdate: function(rate) {
                        $('#reviewplus-rateid-' + e).val(rate);
                        $('#reviewplus-rateid-' + e).trigger('change');
                    },
                    withClearAction: false
                });              
            });             
        },
        
        initShowHide: function() {
            $(".reviewsplus-show-hide-comment").on('click', function() {
                
                $(this).closest('.reviewsplus-review').find('.reviewsplus-review-comment').toggle(500);
            });  
        }        
    };
    
})(jQuery);