<?php
/**
 * @author Roman Ulashev <truetamtam@gmail.com>
 * @link   http://artbrains.ru
 */

return array(
    // plugin toggle
    'enabled'               => array(
        'title'        => 'Плагин включен',
        'value'        => '0',
        'control_type' => waHtmlControl::CHECKBOX,
        'description'  => '',
    ),
    // hook toggle
    'frontend_product.cart' => array(
        'title'        => 'Вывод через хук "frontend_product.cart" возле кнопки "В корзину"',
        'value'        => '1',
        'description'  => '',
        'control_type' => waHtmlControl::CHECKBOX,
    ),
    // mode
    'mode'                  => array(
        'title'        => 'Спрашивать Email или Мобильный',
        'value'        => '7',
        'description'  => '',
        'control_type' => waHtmlControl::RADIOGROUP,
        'options'      => array(
            array(
                'value'       => 'phone',
                'title'       => 'Мобильный',
                'description' => '',
            ),
            array(
                'value'       => 'email',
                'title'       => 'Email',
                'description' => '',
            ),
        ),
    ),
    // default string for phone field
    'prefix_value'          => array(
        'title'        => 'Строка по умолчанию для поля "Телефон"',
        'value'        => '8',
        'description'  => '',
        'control_type' => waHtmlControl::INPUT,
    ),
    // button text
    'button_text'           => array(
        'title'        => 'Надпись в кнопке',
        'value'        => 'Заказ в 1 клик',
        'description'  => '',
        'control_type' => waHtmlControl::INPUT,
    ),
    'successful_order_text' => array(
        'title' => 'Сообщение после успешного заказа',
        'value' => 'Номер вашего заказа {$order_id}',
        'description' => 'Текст выводимый после нажатия на кнопку мгновенного заказа.<br>
        Вставьте в тексте - <b>{$order_id}</b> для вывода номера заказа.',
        'control_type' => waHtmlControl::TEXTAREA,
    ),
    // contract settings
    // contract check is enabled
    'contract_is_enabled' => array(
        'title'        => 'Включить соглашение на обработку личных данных',
        'value'        => false,
        'description'  => '',
        'control_type' => waHtmlControl::CHECKBOX,
    ),
    // contract text
    'contract_text' => array(
        'title'        => 'Текст в строке о соглашении на обработку личных данных',
        'value'        => 'Согласен с ',
        'description'  => '',
        'control_type' => waHtmlControl::INPUT,
    ),
    // contract link text
    'contract_link_text' => array(
        'title'        => 'Текст ссылки на соглашение об обработке личных данных',
        'value'        => 'условиями',
        'description'  => '',
        'control_type' => waHtmlControl::INPUT,
    ),
    // contract link
    'contract_link' => array(
        'title'        => 'Ссылка на соглашение об обработке личных данных',
        'value'        => '#contract-link',
        'description'  => 'Разработчикам: Через javascript можно назначить обработчик ссылки. Вызвать всплывающее окно, и т.д...',
        'control_type' => waHtmlControl::INPUT,
    ),
    'contract_link_is_blank' => array(
        'title'        => 'Открывать соглашение в новом окне.',
        'value'        => false,
        'description'  => 'Устанавливает target="_blank"',
        'control_type' => waHtmlControl::CHECKBOX,
    ),
    // localstorage settings
    'contract_namespace' => array(
        'title'        => 'Имя ключа в localstorage.',
        'value'        => 'shop/bistrozakaz-contract',
        'description'  => 'Разработчикам: Устанавливается в этот параметр, при согласии на обработку лчиных данных.<br>
                            key => true||false. Плагин будет читать из этого ключа. Можно установить общее для всего сайта.',
        'control_type' => waHtmlControl::INPUT,
    ),

    // custom
    // css redactor
    'set'                   => array(
        'control_type' => waHtmlControl::CUSTOM . ' ' . 'shopBistrozakazPlugin::editFiles',
    ),
);