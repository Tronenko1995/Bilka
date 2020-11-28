<?php
try {
    // copying public files to wa-data
    $aFiles2Copy = array(
        'templates' => array(
            'templates/actions/frontend/bistrozakazButton.html'
        )
    );

    $sBzPath = wa()->getAppPath('plugins/bistrozakaz/', 'shop');
    $sDataPath = wa()->getDataPath('bistrozakaz/', true, 'shop', true);

    foreach ($aFiles2Copy['templates'] as &$template) {
        waFiles::copy("{$sBzPath}{$template}", "{$sDataPath}{$template}");
    }
}catch (Exception $e) {
    waLog::log('[bistrozakaz]update: ' . $e->getMessage());
}
