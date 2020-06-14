<?php

namespace fraserboag\mailchimpintegration\controllers;

use Craft;
use craft\web\Controller;

class SignupController extends Controller
{

    protected $allowAnonymous = true;

    public function actionSend()
    {

        $this->requirePostRequest();
        $request = Craft::$app->getRequest();
        $emailAddress = $request->getBodyParam('email');

		$data = array(
		    'email_address' => $emailAddress,
		    'status' => 'subscribed'
		);
		$payload = json_encode($data);

		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, 'https://us5.api.mailchimp.com/3.0/lists/f2c24a3c41/members/');
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
		curl_setopt($ch, CURLOPT_USERPWD, 'boagonline:69665a3965c6cd8485c18701fc9714a7-us5');

		$result = curl_exec($ch);
		curl_close($ch);

        $response = ['response' => 'success'];
        return $this->asJson($response);
	}
	
}