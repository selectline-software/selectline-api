<!DOCTYPE HTML>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width" />
	<link rel="stylesheet" type="text/css" href="style.css">	
</head>
<body>
	<div class="GroupBox">
		<h1>PHP-DEMO FOR SELECTLINE API</h1>
<?php

$BaseUri = "http://demo.slmobile.de/demoapi/";

function CallSLMAPI($method, $url, $auth = "", $data = false, $print = false)
{
    $curl = curl_init();
    
    //Set the proxy to use Fiddler
   // curl_setopt($curl, CURLOPT_PROXY, '127.0.0.1:8888');
	
	//The header needs to set to content type json, since the data for each request is send as JSON
	$httpHeader = array('Content-Type: application/json');
	if ($auth!="")
	{
		array_push($httpHeader, $auth);
	}
	
	curl_setopt($curl, CURLOPT_HTTPHEADER, $httpHeader); 
	
	switch ($method)
    {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);
            if ($data)
                //curl_setopt($curl, CURLOPT_POSTFIELDS, "{'UserName':'APIDemo','Password':'Ap1Dem0'}");
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_PUT, 1);
            break;
        default:
            if ($data)
                $url = sprintf("%s?%s", $url, http_build_query($data));
    }

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($curl);
       
    curl_close($curl);

    if ($print) 
    {
    	echo $url."<br />";
    	echo "<tt>".str_replace(',',', ',$result)."</tt>"."<br />";
    }
    
	if (isJSON($result))
	{
		$jsonValue = json_decode($result);
		isError($jsonValue, true);
		if ($print) echo "<br /><br />";
		return $jsonValue;
	}		
	return "";	
}

//Checks, if a given string is in json format
function isJSON($string)
{
	json_decode($string);
 	return (json_last_error() == JSON_ERROR_NONE);
}

//Returns, if the result of a SL.mobile API call contains an ErroCode and optional print it
function isError($json, $printError = false)
{
	if (isset($json->ErrorCode))
	{
		if ($printError)
		{
			echo "<b>Error:</b> ".$json->ErrorCode."<br />";
		}
		return true;
	}
	return false;
}

function extractJSONValue($value, $print = false, $label = "")
{
	if (isset($value))
	{
		if ($print)
		{
			echo "<b>".$label.":</b> ".$value."<br />";
		}
		return $value;
	}
	
	return "";
}

//---- INFO ----

echo "<h2>Info:</h2>";

$returnValue = CallSLMAPI("GET",$BaseUri."Info","",false,true);


//---- LOGIN ----

echo "<h2>Login:</h2>";

//Define parameters for the request as an array
$myData = array ('UserName' => 'APIDemo',
				 'Password' => 'Ap1Dem0');

$returnValue = CallSLMAPI("POST",$BaseUri."Login","",json_encode($myData),true);

//Get the AccessToken
$accessToken = extractJSONValue($returnValue->AccessToken,true, "AccessToken");
$tokenType = extractJSONValue($returnValue->TokenType,true, "TokenType");
$authorizationString = 'Authorization: '.$tokenType.' '.$accessToken;
?>
<br />
<br />
<br />
<?php
//---- CUSTOMER ----

echo "<h2>Customer (GET):</h2>";

// GET List of customers
$returnValue = CallSLMAPI("GET",$BaseUri."Customers",$authorizationString, null, true);


// GET Customer by number
$returnValue = CallSLMAPI("GET", $BaseUri."Customers/10001", $authorizationString, null, true);

?>
	</div>
</body>
</html>