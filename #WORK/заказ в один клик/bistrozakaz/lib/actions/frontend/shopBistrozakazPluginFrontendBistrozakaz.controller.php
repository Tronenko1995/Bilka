<?php

/**
 * @author Roman Ulashev <truetamtam@gmail.com>
 * @link   http://artbrains.ru
 */
class shopBistrozakazPluginFrontendBistrozakazController extends waJsonController
{
    /**
     * @var array|mixed|null|string
     */
    private $_aBzSettings = array();
    /**
     * @var array|mixed
     */
    private $_aRequestData = array();
    /**
     * @var string
     */
    private $_sMode;
    /**
     * @var shopBistrozakazCart
     */
    private $cart;
    /**
     * @var shopCartItemsModel
     */
    private $cartModel;


    /**
     * Constructor.
     *
     * @throws waException
     */
    function __construct()
    {
        // data from bistrozakaz
        if (is_null(waRequest::post('product_id', null, waRequest::TYPE_INT)) &&
            (bool)$this->_aBzSettings['enabled'] == false
        ) {
            return;
        }

        $this->_aRequestData = waRequest::post();

        try {
            /** @var shopPlugin $oBzPlugin */
            $oBzPlugin = wa()->getPlugin('bistrozakaz');
            $this->_aBzSettings = $oBzPlugin->getSettings();
            $this->_sMode = isset($this->_aBzSettings['mode']) ?
                $this->_aBzSettings['mode'] : shopBistrozakazPlugin::BZ_MODE_PHONE;
        } catch (waException $e) {
            waLog::log('[bistrozakaz]: ' . $e->getMessage(), 'zakazv1click.log');
            $this->errors = $e->getMessage();
        }
    }


    /**
     * Bistrozakaz plugin main process.
     * execute === "Create order"
     *
     * @return void
     */
    public function execute()
    {
        // order workflow
        $oShopWorkflow = new shopWorkflow();

        try {
            // cart and cartItemsModel initialized in items2Cart()
            $this->items2Cart();
            $this->checkCartItems();
            // processing order. Getting all needed data: contact, items, params, order url...
            $aOrderData = $this->getOrderData();
            $iOrderId = $oShopWorkflow->getActionById('create')->run($aOrderData);

            // formatting successful order message, all with {$order_id}
            $sSuccessOrderTextRaw = $this->_aBzSettings['successful_order_text'];

            $orderIdEncoded = shopHelper::encodeOrderId($iOrderId);

            if($sSuccessOrderTextRaw != "") {
                $sSuccessOrderFormatted = str_replace('{$order_id}', $orderIdEncoded, $sSuccessOrderTextRaw);
            } else {
                $sSuccessOrderFormatted = $orderIdEncoded;
            }

            $sSuccessOrderFormatted = htmlspecialchars($sSuccessOrderFormatted, ENT_NOQUOTES, 'UTF-8');

            $this->response = array(
                'message' => nl2br($sSuccessOrderFormatted),
                'orderId' => $iOrderId,
                'orderIdEncoded' => $orderIdEncoded,
                'orderData' => array(
                    'params' => $aOrderData['params']
                )
            );
            $this->clearOrderedCart();
        } catch (waException $e) {
            $this->clearOrderedCart();
            waLog::log('[bistrozakaz]: ' . $e->getMessage(), 'zakazv1click.log');
            $this->errors = $e->getMessage();
        }
    }


    /**
     * Place all items to cart.
     * One bz button push = one cart.
     * All items are cleared after request.
     *
     * @throws waException
     */
    private function items2Cart()
    {
        $sCode = md5(uniqid(time(), true));
        $this->cart = new shopBistrozakazCart($sCode);
        $this->cartModel = new shopCartItemsModel();

        $data = $this->_aRequestData;

        // add sku
        $oSkuModel = new shopProductSkusModel();
        $oProductModel = new shopProductModel();
        if (!isset($data['product_id'])) {
            $aSku = $oSkuModel->getById($data['sku_id']);
            $aProduct = $oProductModel->getById($aSku['product_id']);
        } else {
            $aProduct = $oProductModel->getById($data['product_id']);
            if (isset($data['sku_id'])) {
                $aSku = $oSkuModel->getById($data['sku_id']);
            } else {
                if (isset($data['features'])) {
                    $product_features_model = new shopProductFeaturesModel();
                    $sku_id = $product_features_model->getSkuByFeatures($aProduct['id'], $data['features']);
                    if ($sku_id) {
                        $aSku = $oSkuModel->getById($sku_id);
                    } else {
                        $aSku = null;
                    }
                } else {
                    $aSku = $oSkuModel->getById($aProduct['sku_id']);
                    if (!$aSku['available']) {
                        $aSku = $oSkuModel->getByField(array('product_id' => $aProduct['id'], 'available' => 1));
                    }

                    if (!$aSku) {
                        throw new waException('Товар недоступен.');
                    }
                }
            }
        }

        $iQuantity = waRequest::post('quantity', 1);
        if ($aProduct && $aSku) {

            // hidden from site
            if(!$aProduct['status']) {
                throw new waException('Товар недоступен.');
            }

            // check quantity
            if (!wa()->getSetting('ignore_stock_count')) {

                // limit by main stock
                if (wa()->getSetting('limit_main_stock') && waRequest::param('stock_id')) {
                    $product_stocks_model = new shopProductStocksModel();
                    $row = $product_stocks_model->getByField(array('sku_id' => $aSku['id'], 'stock_id' => waRequest::param('stock_id')));
                    if ($row) {
                        $aSku['count'] = $row['count'];
                    }
                }

                $c = $this->cartModel->countSku($sCode, $aSku['id']);
                if ($aSku['count'] !== null && $c + $iQuantity > $aSku['count']) {
                    $iQuantity = $aSku['count'] - $c;
                    if (!$iQuantity) {
                        if ($aSku['count'] > 0) {
                            throw new waException('Товар недоступен.');
                        } else {
                            throw new waException('Товар недоступен.');
                        }
                        return;
                    } else {
                        throw new waException('Товар недоступен.');
                    }
                }
            }
            $services = waRequest::post('services', array());
            if ($services) {
                $variants = waRequest::post('service_variant');
                $temp = array();
                $service_ids = array();
                foreach ($services as $service_id) {
                    if (isset($variants[$service_id])) {
                        $temp[$service_id] = $variants[$service_id];
                    } else {
                        $service_ids[] = $service_id;
                    }
                }
                if ($service_ids) {
                    $service_model = new shopServiceModel();
                    $temp_services = $service_model->getById($service_ids);
                    foreach ($temp_services as $row) {
                        $temp[$row['id']] = $row['variant_id'];
                    }
                }
                $services = $temp;
            }
            $item_id = null;
            $item = $this->cartModel->getItemByProductAndServices($sCode, $aProduct['id'], $aSku['id'], $services);
            if ($item) {
                $item_id = $item['id'];
                $this->cart->setQuantity($item_id, $item['quantity'] + $iQuantity);
            }
            if (!$item_id) {
                $data = array(
                    'create_datetime' => date('Y-m-d H:i:s'),
                    'product_id'      => $aProduct['id'],
                    'sku_id'          => $aSku['id'],
                    'quantity'        => $iQuantity,
                    'type'            => 'product',
                );
                if ($services) {
                    $data_services = array();
                    foreach ($services as $service_id => $variant_id) {
                        $data_services[] = array(
                            'service_id'         => $service_id,
                            'service_variant_id' => $variant_id,
                        );
                    }
                } else {
                    $data_services = array();
                }
                $this->cart->addItem($data, $data_services);
            }
        }
    }


    /**
     * Check unavailable items.
     *
     * @throws waException
     */
    private function checkCartItems()
    {
        if (!wa()->getSetting('ignore_stock_count')) {
            $check_count = true;
            if (wa()->getSetting('limit_main_stock') && waRequest::param('stock_id')) {
                $check_count = waRequest::param('stock_id');
            }
            $cart_model = new shopCartItemsModel();
            $not_available_items = $cart_model->getNotAvailableProducts($this->cart->getCode(), $check_count);
            foreach ($not_available_items as $row) {
                if ($row['sku_name']) {
                    $row['name'] .= ' (' . $row['sku_name'] . ')';
                }
                if ($row['available']) {
                    if ($row['count'] > 0) {
                        throw new waException('Товар недоступен.');
                    } else {
                        throw new waException('Товар недоступен.');
                    }
                } else {
                    throw new waException('Товар недоступен.');
                }
            }
        }
    }


    /**
     * Setting order data and information,
     * also metadata from js/phone-codes.json.
     */
    private function getOrderData()
    {
        // get cart items for order data
        $aItems = $this->cart->items(false);
        // remove id from item
        foreach ($aItems as &$item) {
            unset($item['id']);
            unset($item['parent_id']);
        }
        unset($item);

        // searching for contact
        $oContact = $this->getDetectedContact();
        $oContact->set('name', 'Заказ в 1 клик.[' . uniqid() . ']');
        $oContact->set($this->_sMode, waRequest::post('contact', null, waRequest::TYPE_STRING_TRIM));

        // showcase, ip, browser
        $sRoutingUrl = wa()->getRouting()->getRootUrl();
        $aParams = array();
        $aParams['storefront'] = wa()->getConfig()->getDomain() . ($sRoutingUrl ? "/$sRoutingUrl" : '');
        $aParams['ip'] = waRequest::getIp();
        $aParams['user_agent'] = waRequest::getUserAgent();


        $aTranslate = array(
            'phone' => 'Телефон',
            'email' => 'Email',
        );
        // comment with metadata from js/phone-codes.json
        $sCommentText = '';
        if (wa()->getUser()->isAuth()) {
            // addresses
            foreach (array('shipping', 'billing') as $ext) {
                $sAddress = $oContact->getFirst('address.' . $ext);
                if ($sAddress) {
                    foreach ($sAddress['data'] as $k => $v) {
                        $aParams[$ext . '_address.' . $k] = $v;
                    }
                }
            }
            $sCommentText .= "Введённый {$aTranslate[$this->_sMode]}: {$this->_aRequestData['contact']}";
        }

        $sCommentText .= "\n--\n";
        $sCommentText .= "Заказ оформлен в 1 клик.\n";

        if (isset($this->_aRequestData['metadata']) && !empty($this->_aRequestData['metadata'])) {
            $sCommentText .= "--\n";
            $sCommentText .= "метаданные:\n";
            foreach ($this->_aRequestData['metadata'] as $sMetaName => $sMetaVal) {
                if ($sMetaVal != '') {
                    $sCommentText .= "{$sMetaName}: $sMetaVal\n";
                }
            }
        }

        // order data forming explicitly
        $aOrderData = array(
            'items'    => $aItems,
            'total'    => $this->cart->total(false),
            'contact'  => $oContact,
            'params'   => $aParams,
            'discount' => null,
            'shipping' => null,
            'comment'  => $sCommentText,
        );

        return $aOrderData;
    }


    /**
     * Getting current logged in user, searched by email, or creating new user.
     *
     * @return waAuthUser|waContact|waUser
     *
     * @throws waException
     */
    private function getDetectedContact()
    {
        $oContact = null;

        // contact
        // existing contact data, new contact if not logged in
        if (wa()->getUser()->isAuth()) {
            $oContact = wa()->getUser();

            return $oContact;
        } else {
            // searching by email mode
            if ($this->_sMode == shopBistrozakazPlugin::BZ_MODE_PHONE) {
                $oContact = $this->getContactByPhone();
            } else {
                $oContact = $this->getContactByEmail();
            }

            return $oContact;
        }
    }


    /**
     * Get contact by phone.
     *
     * @return waContact
     * @throws waException
     */
    private function getContactByPhone()
    {
        // phone mode
        // searching for contact, first found is populating contact
        $oModel = new waModel();
        $oContact = new waContact();
        $iPhone = waRequest::post('contact', null, waRequest::TYPE_STRING_TRIM);

        if (is_null($iPhone) || strlen($iPhone) < 1) {
            throw new waException('Телефон не введён.');
        }
        // Phone contains requested string
        if (preg_match('~^[wp0-9\-\+\#\*\(\)\. ]+$~', $iPhone)) {
            $dq = preg_replace("/[^\d]+/", '', $iPhone);
            $sql = "SELECT c.id, c.name, d.value as phone
                               FROM wa_contact AS c
                                   JOIN wa_contact_data AS d
                                       ON d.contact_id=c.id AND d.field='phone'
                               WHERE d.value LIKE '%" . $oModel->escape($dq, 'like') . "%'";
            $aContacts = $oModel->query($sql)->fetchAll('id');
            if (!empty($aContacts)) {
                $oContact = new waContact(array_shift($aContacts));
            }
        }

        return $oContact;
    }


    /**
     * Get contact by email.
     *
     * @return waContact
     * @throws waException
     */
    private function getContactByEmail()
    {
        $oContactModel = new waContactModel();
        $sMail = waRequest::post('contact', null, waRequest::TYPE_STRING_TRIM);
        if (is_null($sMail) || strlen($sMail) < 1) {
            throw new waException('Email не введён.');
        }
        $iContactInfo = $oContactModel->getByEmail(waRequest::post('contact', null, waRequest::TYPE_STRING_TRIM));
        $oContact = new waContact((int)$iContactInfo['id']);

        return $oContact;
    }

    /**
     * Clear ordered cart
     */
    private function clearOrderedCart()
    {
        $this->cart->clear();
    }
}