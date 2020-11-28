<?php
/**
 * @author Roman Ulashev <truetamtam@gmail.com>
 * @link   http://artbrains.ru
 */

// setting default bistrozakaz settings
$oSettingsModel = new waAppSettingsModel();
$aDefaultSettings = array(
    'enabled'               => '1',
    'mode'                  => 'phone',
    'frontend_product.cart' => '1',
    'prefix_value'          => '7'
);

try {
    foreach ($aDefaultSettings as $name => $value) {
        $oSettingsModel->set('shop.bistrozakaz', $name, $value);
    }
} catch (waDbException $e) {
    waLog::log('[bistrozakaz]install: ' . $e->getMessage());
}

// copying public files to wa-data
$aFiles2Copy = array(
    'css'       => array(
        'css/bistrozakaz.css'
    ),
    'js'        => array(
        'js/phone-codes.json'
    ),
    'templates' => array(
        'templates/actions/frontend/bistrozakazButton.html'
    )
);

$sBzPath = wa()->getAppPath('plugins/bistrozakaz/', 'shop');
$sDataPath = wa()->getDataPath('bistrozakaz/', true, 'shop', true);

foreach ($aFiles2Copy['css'] as &$css) {
    waFiles::copy("{$sBzPath}{$css}", "{$sDataPath}{$css}");
}
foreach ($aFiles2Copy['js'] as &$js) {
    waFiles::copy("{$sBzPath}{$js}", "{$sDataPath}{$js}");
}
foreach ($aFiles2Copy['templates'] as &$template) {
    waFiles::copy("{$sBzPath}{$template}", "{$sDataPath}{$template}");
}