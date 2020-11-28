<?php
return array(
    'name'          => 'Мгновенный заказ в 1 клик',
    'img'           => 'img/bistrozakaz.png',
    'version'       => '1.5.22',
    'vendor'        => '882864',
    'frontend'      => true,
    'shop_settings' => false, // means, custom settings not enabled
    'handlers'      => array(
        'frontend_product' => 'hookCartButton'
    ),
);
