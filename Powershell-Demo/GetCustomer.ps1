$baseurl = "https://demo.slmobile.de/demoapi/";

# Login
$accesstoken = Invoke-RestMethod -Uri "$baseurl/Login" -Method POST -ContentType 'application/json' -Body '{"username":"APIDemo", "password": "Ap1Dem0", "AppKey": "App-Demo20191122"}';

$headerinfo = @{"Authorization"=$accesstoken.TokenType + " " + $accesstoken.AccessToken};

# Get Customer List
Invoke-RestMethod -Uri "$baseurl/Customers" -Headers $headerinfo;
