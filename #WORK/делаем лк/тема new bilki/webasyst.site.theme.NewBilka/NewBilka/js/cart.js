function defaultInputValue(input, cssClass) {
    if (!(input instanceof jQuery)) {
        input = $(input);
    }
    var defValue = input.attr('placeholder');
    var onBlur = function() {
        var v = input.val();
        if (!v || v == defValue) {
            input.val(defValue);
            input.addClass(cssClass);
        }
    };
    onBlur();
    input.blur(onBlur);
    input.focus(function() {
        if (input.hasClass(cssClass)) {
            input.removeClass(cssClass);
            input.val('');
        }
    });
}


$(function() {

    function updateCart(data)
    {
        $("#cart .cart-total .value").html(data.total);
        $(".cart-page .cart-total").html(data.total);
        if (data.discount_numeric) {
            $(".cart-discount").parent().show();
        }
        $(".cart-discount").html('&minus; ' + data.discount);
        if (data.discount_numeric > 0) {
            $(".cart-block-discount").show().find("span").html(data.discount);
        } else {
            $(".cart-block-discount").hide();
        }
        $(".count-block .count").text(data.count);
        $(".bottom-fixed .mobile-cart .indicator").text(data.count);

        if (data.add_affiliate_bonus) {
            $(".affiliate").show().html(data.add_affiliate_bonus);
        } else {
            $(".affiliate").hide();
        }
    }

    // add to cart block: services
    $(".services input:checkbox").click(function() {
        var obj = $('select[name="service_variant[' + $(this).closest('.cart-row').data('id') + '][' + $(this).val() + ']"]');
        if (obj.length) {
            if ($(this).is(':checked')) {
                obj.removeAttr('disabled');
            } else {
                obj.attr('disabled', 'disabled');
            }
        }
    });

    $(".cart a.delete").click(function() {
        var that = $(this);
        var cartRow = $(this).closest('.cart-row');
        var id = cartRow.data('id');
        var i = $(this).find("i");
        i.removeClass("close-bw").addClass("loading");
        $.post('delete/', {html: ($.multishop.ruble == 'html' ? 1 : 0), id: id}, function(response) {
            if (response.data.count == 0) {
                location.reload();
            }
            cartRow.remove();
            $(".cart-block-row[data-id='" + id + "']").remove();
            updateCart(response.data);
            if ($(".bottom-fixed .mobile-cart").is(":visible")) {
                bouncePopup($(".bottom-fixed .mobile-cart"), "+ " + $.multishop.translate('Removed from cart'));
            }
            if (typeof $.itemsets !== 'undefined') {
                $.itemsets.cartDelete(that);
            }
        }, "json");
        return false;
    });
    // Изменение количества товаров
    var changeQuantity = function(that, callback) {
        if (that.val() > 0) {
            var cartRow = that.closest('.cart-row');
            var id = cartRow.data('id');
            var cartBlockRow = $(".cart-block-row[data-id='" + id + "']");
            that.prop('disabled', true);
            $.post('save/', {html: ($.multishop.ruble == 'html' ? 1 : 0), id: id, quantity: that.val()}, function(response) {
                that.prop('disabled', false);
                cartRow.find('.item-total').html(response.data.item_total);
                cartBlockRow.find('.price').html(response.data.item_total);
                if (response.data.q) {
                    that.val(response.data.q);
                }
                cartBlockRow.find('input.qty').val(that.val());
                if (typeof $.itemsets !== 'undefined') {
                    $.itemsets.quantityChange(that);
                }
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    that.removeClass('error');
                }
                if (callback) {
                    callback.call();
                }
                updateCart(response.data);
            }, "json");
        } else {
            that.val(1);
        }
    };

    $(".f-quantity-minus").click(function() {
        var btn = $(this);
        var i = btn.find("i");
        if (!i.hasClass("loading")) {
            i.removeClass("ms larr-bw").addClass("ig loading");
            var quantity = btn.closest(".quantity").find("input[name*='quantity']");
            if (parseInt(quantity.val()) > 1) {
                quantity.val(function(i, oldval) {
                    return --oldval;
                });
                changeQuantity(quantity, function() {
                    i.removeClass("ig loading").addClass("ms larr-bw");
                });
            } else {
                i.removeClass("ig loading").addClass("ms larr-bw");
            }
        }
        return false;
    });

    $(".f-quantity-plus").click(function() {
        var btn = $(this);
        var i = btn.find("i");
        if (!i.hasClass("loading")) {
            i.removeClass("ms rarr-bw").addClass("ig loading");
            btn.closest(".quantity").find("input[name*='quantity']").val(function(i, oldval) {
                return ++oldval;
            });
            changeQuantity(btn.siblings(".qty"), function() {
                i.removeClass("ig loading").addClass("ms rarr-bw");
            });
        }
        return false;
    });

    $(".cart input.qty").change(function() {
        changeQuantity($(this));
    });

    $(".cart .services input:checkbox").change(function() {
        var div = $(this).closest('div');
        var cartRow = $(this).closest('.cart-row');
        if ($(this).is(':checked')) {
            var parent_id = cartRow.data('id');
            var data = {html: ($.multishop.ruble == 'html' ? 1 : 0), parent_id: parent_id, service_id: $(this).val()};
            var variants = $('select[name="service_variant[' + parent_id + '][' + $(this).val() + ']"]');
            if (variants.length) {
                data['service_variant_id'] = variants.val();
            }
            $.post('add/', data, function(response) {
                div.data('id', response.data.id);
                cartRow.find('.item-total').html(response.data.item_total);
                updateCart(response.data);
            }, "json");
        } else {
            $.post('delete/', {html: ($.multishop.ruble == 'html' ? 1 : 0), id: div.data('id')}, function(response) {
                div.data('id', null);
                cartRow.find('.item-total').html(response.data.item_total);
                updateCart(response.data);
            }, "json");
        }
    });

    defaultInputValue($(".coupon-code"), 'empty');

    $(".cart .services select").change(function() {
        var cartRow = $(this).closest('.cart-row');
        $.post('save/', {html: ($.multishop.ruble == 'html' ? 1 : 0), id: $(this).closest('div').data('id'), 'service_variant_id': $(this).val()}, function(response) {
            cartRow.find('.item-total').html(response.data.item_total);
            updateCart(response.data);
        }, "json");
    });

    $("#cancel-affiliate").click(function() {
        $(this).closest('form').append('<input type="hidden" name="use_affiliate" value="0">').submit();
        return false;
    });
});