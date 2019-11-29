$baseurl = "https://demo.slmobile.de/demoapi/";

# Login
$accesstoken = Invoke-RestMethod -Uri "$baseurl/Login" -Method POST -ContentType 'application/json' -Body '{"username":"APIDemo", "password": "Ap1Dem0", "AppKey": "App-Demo20191122"}';

$headerinfo = @{"Authorization"=$accesstoken.TokenType + " " + $accesstoken.AccessToken};

$parameters =  "[{
                    'Name':  'Artikelnummer',
                    'Value':  '100001'
                 },
                 {
                    'Name':  'Artikelgruppe',
                    'Value':  '110'
                 }]" 

# Get Article
$result = Invoke-RestMethod -Uri "$baseurl/Macros/SelectArticleByExplicitNumberAndGroup " -Method POST -ContentType 'application/json' -Body $parameters -Header $headerinfo

$result

$resultColumnNames = $result.ColumnNames | ConvertTo-Json
$resultRows = $result.Rows | ConvertTo-Json

$resultColumnNames 
$resultRows

