### Beispiele für Python 3.8
### Bereitgestellt von www.myvision.de
### Author Harald Sichert (sichert@myvision.de)
### Lizenz Apache License 2.0

import requests
import pprint
pp = pprint.PrettyPrinter(depth=4)

# SSH- Zertifikatfehlermeldungen unterdrücken, wenn auf einer lokalen Testumgebung 
# mit selbstsignierten Zertifikaten ausprobiert wird
# (in Verbindung mit response = requests.request( ...verify=False))
requests.packages.urllib3.disable_warnings() 

base_url = "https://demo.slmobile.de/demoapi/"
payload = ''
headers = {}

### Info abrufen
def info():
    url = base_url + "Info"
    payload = ''
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("GET", url, headers=headers, data = payload, verify=False)

    # print(response.text.encode('utf8'))
    pp.pprint(response.json())


### Login durchführen und Auth-Token merken für weitere Abfragen
def login():
    url = base_url + "Login"
    payload = '{"username": "APIDemo", "password": "Ap1Dem0", "AppKey": "App-Demo20191122"}'
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data = payload, verify=False)
    # pp.pprint(response.json())

    token = response.json()['AccessToken']
    print("Der aktuelle Token ist: " + token)
    return token

### Artikel abfragen

def art_where():
    ## Nur bestimmte Artikel, aber alle Felder von Artikel
    token = login()
    payload = {}
    headers = {
    'Authorization': 'LoginId ' + token
    }

    where = "?filter=(Number EQ '120004') OR (Number EQ '300006')"
    # where = "?filter=Weight GT 5 AND Weight LT 10"
    url = base_url + "Articles" + where

    response = requests.request("GET", url, headers=headers, data = payload, verify=False)

    articles = response.json()
    for article in articles:
        art_no = article['Number']
        print(f"\n>>> Artikel {art_no}:")
        pp.pprint(article)

def art_all():
    ## Alle Artikel, aber dafür nur bestimmte Felder
    token = login()
    payload = {}
    headers = {
    'Authorization': 'LoginId ' + token
    }    
    url = base_url + "Articles"
    response = requests.request("GET", url, headers=headers, data = payload, verify=False)

    fields = ['Number', 'Name', 'QuantityUnit', 'ArticleGroupNumber', 'ArticleKind', 'IsShopActive']
    articles = response.json()
    print('\n\nGesamtanzahl der Artikel: ' + str(len(articles)))
    for article in articles:
        # print(type(article))
        article = dict(filter(lambda x: x[0] in fields, article.items()))
        art_no = article['Number']
        print(f"\n>>> Artikel {art_no}:")
        pp.pprint(article)

### Kunden abrufen
def customer_all():
    ## Alle Kunden, aber dafür nur bestimmte Felder
    token = login()
    payload = {}
    headers = {
    'Authorization': 'LoginId ' + token
    }    
    url = base_url + "Customers"
    response = requests.request("GET", url, headers=headers, data = payload, verify=False)

    fields = ['Number', 'OwnNumber', 'AccountGroupNumber', 'LanguageId', 'CountryOfEurope"', 'IsInactive']
    customers = response.json()
    print('\n\nGesamtanzahl der Kunden: ' + str(len(customers)))
    for customer in customers:
        customer = dict(filter(lambda x: x[0] in fields, customer.items()))
        art_no = customer['Number']
        print(f"\n>>> Kunde {art_no}:")
        pp.pprint(customer)


### Dokument anlegen
doc_min = """
    {
        "KindFlag": "F",
        "BusinessPartner":
            {
                "Address":
                {
                "Number": "10033"
                }
            }
    }
"""

doc_max = """
{
  "Number": "sample string 1",
  "KindFlag": "sample string 2",
  "ExtraFields": {
    "sample string 1": "sample string 2",
    "sample string 3": "sample string 4"
  },
  "Date": "2020-08-04T12:52:18.6190377+02:00",
  "BusinessPartner": {
    "LastName": "sample string 1",
    "Company": "sample string 2",
    "Salutation": "sample string 3",
    "FirstName": "sample string 4",
    "Address": {
      "Number": "sample string 1",
      "Street": "sample string 2",
      "City": "sample string 3",
      "ZipCode": "sample string 4",
      "CountryId": "sample string 5",
      "AdditionalInformation1": "sample string 6",
      "AdditionalInformation2": "sample string 7",
      "AdditionalInformation3": "sample string 8"
    },
    "BusinessPartnerReferenceNumber": "sample string 5",
    "ReferenceAddressNumber": "sample string 6",
    "BusinessPartnerContract": "sample string 7",
    "BusinessPartnerContractDate": "2020-08-04T12:52:18.6190377+02:00",
    "ContactPersonId": 8
  },
  "Payment": {
    "BankingDetailsId": 1,
    "BankAccount": "sample string 2",
    "IsCashSale": true,
    "PaymentTerm": "sample string 4",
    "PaymentTermLabel": "sample string 5",
    "PaymentPeriod": 6,
    "PaymentPeriodLabel": "sample string 7",
    "PaymentPeriodKind": 8,
    "PaymentDocumentReferenceNumber": "sample string 9",
    "FinancialAccountNumber": "sample string 10",
    "BankAccountGroup": "sample string 11",
    "BankAccountGroupLabel": "sample string 12",
    "CostCenterNumber": "sample string 13",
    "CostCenterLabel": "sample string 14",
    "FinancialAccountExportDate": "2020-08-04T12:52:18.6190377+02:00",
    "FinancialAccountClause": "sample string 16",
    "IsPaymentLock": true
  },
  "IsPrinted": true,
  "EmployeeNumber": "sample string 4",
  "EmployeeLabel": "sample string 5",
  "SalesmanNumber": "sample string 6",
  "SalesmanLabel": "sample string 7",
  "WarehouseNumber": "sample string 8",
  "WarehouseLabel": "sample string 9",
  "CurrencyCode": "sample string 10",
  "CurrencyLabel": "sample string 11",
  "CurrencyExchangeRate": 12.1,
  "DeliveryTermNumber": "sample string 13",
  "DeliveryTermLabel": "sample string 14",
  "DeliveryText": "sample string 15",
  "DeliveryText2": "sample string 16",
  "PriceGroupNumber": "sample string 17",
  "PriceGroupLabel": "sample string 18",
  "PriceKindFlag": "sample string 19",
  "DiscountGroupNumber": "sample string 20",
  "DiscountGroupLabel": "sample string 21",
  "DiscountAmount": 22.1,
  "CashDiscountDays": 23,
  "CashDiscountDaysKind": 24,
  "CashDiscountPercent": 25.1,
  "CashDiscountLabel": "sample string 26",
  "CashDiscount2Days": 27,
  "CashDiscount2DaysKind": 28,
  "CashDiscount2Percent": 29.1,
  "CashDiscount2Label": "sample string 30",
  "AlternativeWirCurrencyAmount": 31.1,
  "AlternativeWirCurrencyPercent": 32.1,
  "AlternativeWirCurrencyKind": "sample string 33",
  "DeliveryDate": "2020-08-04T12:52:18.6190377+02:00",
  "StatusLabel": "sample string 34",
  "OurReference": "sample string 35",
  "LanguageCode": "sample string 36",
  "LanguageLabel": "sample string 37",
  "DeliveryDocumentNumber": "sample string 38",
  "MaintenanceContractReference": 39,
  "DefaultPrintTemplate": "sample string 40",
  "BillingAddress": "sample string 41",
  "RateKind": 42,
  "FixedRate": 43.1,
  "EuropeanCountryCode": "sample string 44",
  "TrafficRouteKind": "sample string 45",
  "TrafficRouteKindLabel": "sample string 46",
  "InternationalLocationNumber": "sample string 47",
  "NativeInvoiceRecipientNumber": "sample string 48",
  "EdiStatusKind": "sample string 49",
  "EdiStatusLabel": "sample string 50",
  "ValutaDate": "2020-08-04T12:52:18.6190377+02:00",
  "WarehouseLocationNumber": "sample string 51",
  "WarehouseLocationLabel": "sample string 52",
  "PositionTotalRoundNearest": 53,
  "TotalRoundNearest": 54,
  "AssociationRegulatorNumber": "sample string 55",
  "DelcrederePercent": 56.1,
  "StockTransferCode": "sample string 57",
  "DisplayName": "sample string 58",
  "ReturnMerchandiseAuthorizationNumber": "sample string 59",
  "ReportCountryCode": "sample string 60",
  "CustomField": {
    "Text1": "sample string 1",
    "Text2": "sample string 2",
    "Number1": 1.1,
    "Number2": 1.1,
    "Number3": 1,
    "Number4": 1,
    "Date1": "2020-08-04T12:52:18.6190377+02:00",
    "Date2": "2020-08-04T12:52:18.6190377+02:00",
    "Flag1": true,
    "Flag2": true,
    "Flag3": true,
    "Flag4": true
  },
  "StatusFlag": "sample string 61",
  "DeliveryAddress": {
    "Number": 1,
    "Salutation": "sample string 2",
    "Title": "sample string 3",
    "FirstName": "sample string 4",
    "LastName": "sample string 5",
    "Company": "sample string 6",
    "Department": "sample string 7",
    "Function": "sample string 8",
    "Priority": 9,
    "InternationalLocationNumber": "sample string 10",
    "Address": {
      "Street": "sample string 1",
      "City": "sample string 2",
      "ZipCode": "sample string 3",
      "CountryFlag": "sample string 4",
      "AdditionalInformation1": "sample string 5",
      "AdditionalInformation2": "sample string 6",
      "AdditionalInformation3": "sample string 7"
    },
    "PostOfficeBox": {
      "Number": "sample string 1",
      "ZipCode": "sample string 2",
      "City": "sample string 3",
      "CountryId": "sample string 4"
    },
    "Contact": {
      "FaxNumber": "sample string 1",
      "TelephoneNumber1": "sample string 2",
      "TelephoneNumber2": "sample string 3",
      "TelephoneNumber3": "sample string 4",
      "EMail": "sample string 5",
      "HomePageUrl": "sample string 6"
    }
  },
  "PaymentReference": "sample string 62"
}
"""

def doc_new(doc):
    ## Neues Dokument minimalistisch anlegen
    token = login()
    payload = doc
    headers = {
    'Authorization': 'LoginId ' + token
    }

    url = base_url + "Documents"

    response = requests.request("POST", url, headers=headers, data = payload, verify=False)

    pp.pprint(response.json())

### Aufruf der gewünschten Funktionalität
info()
# art_where()
# art_all()
customer_all()
# doc_new(doc_min)
# doc_new(doc_max)