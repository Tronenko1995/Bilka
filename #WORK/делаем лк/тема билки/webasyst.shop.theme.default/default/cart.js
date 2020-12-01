
$(function () {
	$(".cupon-text").click(function () {
		$(".cupon").fadeIn();
		$(this).hide();
		return false;
	});
    $("#cancel-affiliate").click(function () {
        $('.cartform').append('<input type="hidden" name="use_affiliate" value="0">').submit();
        return false;
    });
	function updateCart(data) {
		$(".cart-total").html(data.total);
		if (data.discount_numeric) {
			$(".cart-discount").closest('tr').show();
		}
		$(".cart-discount").html(data.discount);
		$(".affiliate").hide();
		if (data.count == 0 ) {
			$(".cart .cart-block").remove();
		}
	}

	// delete product
	$(".cart a.delete").click(function () {
		var tr = $(this).closest('div.cart-product');
		$.post('delete/', {
			id : tr.data('id')
		}, function (response) {
			tr.slideUp("slow");
			updateCart(response.data);
			tr.remove();
			$(".cart-count").html(response.data.count);
			if (response.data.count == 0) {
				$('.cartfull').hide();
				$('.emptycart').show();
			}
		}, "json");
		return false;
	});

	$(document).on("click", ".inc_cart", function () {

		$(this).closest(".cart-product").fadeOut('fast', function () {
			$(this).fadeIn('fast', function () {
			});
		});
		return false;
	});

	$(document).on("click", ".dec_cart", function () {
		var current = $(this).closest(".select_quantity").find(".select_input_cart").val();
		if (current != 1) {
			$(this).closest(".cart-product").fadeOut('fast', function () {
				$(this).fadeIn('fast', function () {
				});
			});
		}

		return false;
	});

	// change quantity
	$(document).on( 'click', '.dec_cart, .inc_cart', function() {
		var thisinput = $(this).closest("div.cart-product");
		var that = thisinput.find(".qty");
		if (that.val() > 0) {
			if (that.val()) {
				$.post('save/', {
					id : thisinput.data('id'),
					quantity : that.val()
				}, function (response) {
					$('.cart-count').html(response.data.count);
					$('.cart-total').html(response.data.total);
					thisinput.find('.item-total').html(response.data.item_total);
					thisinput.find().html(response.data.discount);
					if (response.data.q) {
						that.val(response.data.q);
					}
					if (response.data.error) {
						alert(response.data.error);
					} else {
						that.removeClass('error');
					}
					updateCart(response.data);
				}, "json");
			}
		}
	});
	
	// change quantity
	$(".qty").change(function () {
		var tr = $(this).closest('div.cart-product');
		tr.fadeOut('fast', function () {
			$(this).fadeIn('fast', function () {
			});
		});
		var that = $(this);
		if (that.val() > 0) {
			if (that.val()) {
				$.post('save/', {
					id : tr.data('id'),
					quantity : that.val()
				}, function (response) {
					$('.cart-count').html(response.data.count);
					$('.cart-total').html(response.data.total);
					tr.find('.item-total').html(response.data.item_total);
					tr.find().html(response.data.discount);
					if (response.data.q) {
						that.val(response.data.q);
					}
					if (response.data.error) {
						alert(response.data.error);
					} else {
						that.removeClass('error');
					}
					updateCart(response.data);
				}, "json");
			}
		}
		if (that.val() == 0) {
			var tr = $(this).closest('div.cart-product');
			$.post('delete/', {
				id : tr.data('id')
			}, function (response) {
				tr.slideUp("slow");
				updateCart(response.data);
				tr.remove();
				$(".cart-count").html(response.data.count);
				if (response.data.count == 0) {
					$('.cartfull').hide();
					$('.emptycart').show();
				}
			}, "json");
			return false;
		}
	});

    // add to cart block: services
    $(".services input:checkbox").click(function () {
	
        var obj = $('select[name="service_variant[' + $(this).closest('.cart-product').data('id') + '][' + $(this).val() + ']"]');
		//alert(obj.lenght);
        if (obj.length) {
            if ($(this).is(':checked')) {
                obj.removeAttr('disabled');
            } else {
                obj.attr('disabled', 'disabled');
            }
        }
    });
	
	    $(".services input:checkbox").change(function () {
        var div = $(this).closest('div');
        var tr = $(this).closest('.cart-product');
        if ($(this).is(':checked')) {
           var parent_id = $(this).closest('.cart-product').data('id')
           var data = {parent_id: parent_id, service_id: $(this).val()};
           var variants = $('select[name="service_variant[' + parent_id + '][' + $(this).val() + ']"]');
           if (variants.length) {
               data['service_variant_id'] = variants.val();
           }
           $.post('add/', data, function(response) {
               div.data('id', response.data.id);
               tr.find('.item-total').html(response.data.item_total);
               updateCart(response.data);
           }, "json");
        } else {
           $.post('delete/', {id: div.data('id')}, function (response) {
               div.data('id', null);
               tr.find('.item-total').html(response.data.item_total);
               updateCart(response.data);
           }, "json");
        }
    });

	$(".services select").change(function () {
		var tr = $(this).closest('.cart-product');
		$.post('save/', {
			id : $(this).closest('div').data('id'),
			'service_variant_id' : $(this).val()
		}, function (response) {
			tr.find('.item-total').html(response.data.item_total);
			updateCart(response.data);
		}, "json");
	});
	
    $("div.addtocart input:button").click(function () {
        $.post($(this).data('url'), {product_id: $(this).data('product_id')}, function (response) {
            if (response.status == 'ok') {
				
                var cart_total = $(".cartcount");
                $(".content").load(location.href, function () {
                    cart_total.html(response.data.count);
                }); 
            }
        }, 'json');
       return false;
    });
	
});
