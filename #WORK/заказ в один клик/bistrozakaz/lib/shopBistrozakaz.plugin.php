<?php

/**
 * Class shopBistrozakazPlugin.
 *
 * Plugin settings:
 * 1). enabled
 * 2). mode = phone|email
 * 3). success_text
 * 4). error_text
 * 5). fail_text
 * 6). prefix_value
 * 7). quantity_value TODO: [?]user quantity value.
 *
 * TODO: [?]storage once bistrozakaz pushed.
 */
class shopBistrozakazPlugin extends shopPlugin
{
    const BZ_MODE_PHONE = 'phone';
    const BZ_MODE_EMAIL = 'email';


    /**
     * Bistrozakaz plugin button html.
     *
     * @param $product
     *
     * @return string
     */
    public static function getBzButton($product)
    {
        // base and objects
        $sHtml = '';
        $aViewVars = self::getShopEnv();


        // is plugin enabled?
        // product available?
        // is in stock?
        // no? Returning ""

        // enabled
        $bPluginEnabled = (bool)wa()->getSetting('enabled', false, 'shop.bistrozakaz');

        // stock
        if(wa()->getSetting('ignore_stock_count')) {
            $bInStock = true;
        } else {
            $bInStock = (int)$product['count'] > 0 || $product['count'] === null;
        }

        // even one sku is available, showing the button, but only if product is active.
        if($product['sku_count'] > 1) {
            $bProductAvailable = false;

            if((bool)$product['status']) {
                foreach ($product['skus'] as $aSku) {
                    if ($aSku['available']) {
                        $bProductAvailable = true;
                    }
                }
            }
        } else {
            // availability
            $bProductAvailable = (bool)$product['status'] && (bool)$product['skus'][$product['sku_id']]['available'];
        }

        if ($bPluginEnabled == false || $bInStock == false || $bProductAvailable == false)
            return $sHtml;


        // view
        $oView = wa()->getView();

        self::css($aViewVars);
//        self::js($aViewVars);

        // 2 modes. Phone first.
        // return $sHtml
        $sMode = $aViewVars['mode'];

        return self::bistrozakazHtml($sMode, $oView, $aViewVars);
    }


    /**
     * Method for hook frontend_product.cart.
     *
     * @param $product
     *
     * @return array $aHtml
     */
    public function hookCartButton($product)
    {
        $aHtml = array();

        // hook is enabled in cart?
        if ($this->getSettings('frontend_product.cart')) {
            $aHtml['cart'] = self::getBzButton($product['data']);
        }

        return $aHtml;
    }


    /**
     * Bistrozakaz button in custom place.
     *
     * @param $product
     *
     * @return string
     */
    public static function button($product)
    {

        $sHtml = '';

        if (!wa()->getSetting('frontend_product.cart', false, 'shop.bistrozakaz')) {
            $sHtml = self::getBzButton($product['data']);
        }

        return $sHtml;
    }


    public static function editFiles()
    {
        $oView = wa()->getView();

        $waBzDataPath = wa()->getDataPath('bistrozakaz', true, 'shop', false);

        $oView->assign('bz_button_css', file_get_contents(trim($waBzDataPath . '/css/bistrozakaz.css')));
        $oView->assign('bz_data_url', wa()->getDataUrl('bistrozakaz/', true, 'shop'));

        $sHtml = $oView->fetch(wa()->getAppPath('plugins/bistrozakaz') .
            '/templates/actions/backend/bistrozakazEditFiles.html');
        return $sHtml;
    }


    /**
     * 2 modes. Phone or email
     *
     * @param string $sMode
     *
     * @param waView $oView
     * @param array  $aViewVars
     *
     * @return string
     */
    private static function bistrozakazHtml($sMode = 'phone', $oView, $aViewVars)
    {
        $oView->assign('bz_view_vars', $aViewVars);
        $sHtml = $oView->fetch($aViewVars['wa_app_path'] . '/templates/actions/frontend/' .
            'bistrozakaz' . ucfirst(strtolower($sMode)) . ".html");

        return $sHtml;
    }


    /**
     * Shop environment variables.
     *
     * @return mixed
     * @throws waException
     */
    private static function getShopEnv()
    {
        $aViewVars = array();

        $aViewVars['version'] = wa()->getPlugin('bistrozakaz')->getVersion();
        $aViewVars['wa_app_static_url'] = wa()->getAppStaticUrl('shop', true);
        $aViewVars['wa_app_path'] = wa()->getAppPath('plugins/bistrozakaz', 'shop');
        $aViewVars['wa_data_path'] = wa()->getDataPath('bistrozakaz', true, 'shop', false);
        $aViewVars['wa_data_url'] = wa()->getDataUrl('bistrozakaz', true, 'shop', true);
        $aViewVars['wa_is_auth'] = wa()->getUser()->isAuth();
        $aViewVars['mode'] = wa()->getSetting('mode', 'phone', 'shop.bistrozakaz');

        return $aViewVars;
    }


    /**
     * Bistrozakaz css.
     *
     * @param $aViewVars
     */
    private static function css($aViewVars)
    {
        // main css
        wa()->getResponse()->addCss($aViewVars['wa_app_static_url'] .
            'plugins/bistrozakaz/css/bistrozakaz.main.min.css?v' . $aViewVars['version']);
        // user editable css
        wa()->getResponse()->addCss($aViewVars['wa_data_url'] . '/css/bistrozakaz.css?v' . $aViewVars['version']);
    }
}
