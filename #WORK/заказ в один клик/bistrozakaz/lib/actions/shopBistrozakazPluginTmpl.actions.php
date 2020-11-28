<?php

class shopBistrozakazPluginTmplActions extends waJsonActions
{


    public function getAction()
    {
        $this->getTmplCss();
    }


    public function putAction()
    {
        $sTmplData = waRequest::post('bz_tmpl_css');
        $this->writeTmplCss($sTmplData);
    }


    public function backAction()
    {
        $this->restoreTmplCss();
    }


    /**
     * Get template css file.
     */
    private function getTmplCss()
    {
        $sDataPath = wa()->getDataPath('bistrozakaz/', true, 'shop', false);

        if (!file_exists($sDataPath . 'css/bistrozakaz.css')) {
            $this->restoreTmplCss();
        }

        $this->response['code'] = file_get_contents($sDataPath . 'css/bistrozakaz.css');
    }

    /**
     * Write template css file.
     *
     * @param $sTmplData
     */
    private function writeTmplCss($sTmplData)
    {
        if ($sTmplData == '')
            return;

        $sDataPath = wa()->getDataPath('bistrozakaz/', true, 'shop', false);
        waFiles::write($sDataPath . 'css/bistrozakaz.css', $sTmplData);
    }


    /**
     * Restore template css file.
     *
     * @throws Exception
     */
    private function restoreTmplCss()
    {
        $sAppPath = wa()->getAppPath('plugins/bistrozakaz/', 'shop');
        $sDataPath = wa()->getDataPath('bistrozakaz/', true, 'shop', false);

        waFiles::copy($sAppPath . 'css/bistrozakaz.css', $sDataPath . 'css/bistrozakaz.css');
    }
}