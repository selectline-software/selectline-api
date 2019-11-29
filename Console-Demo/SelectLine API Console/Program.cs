using System.Linq;

namespace SelectLine_API_Console
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using SelectLine.Erp.Models;
    using SelectLine.Erp.Models.ApiResponseModels;

    public class Program
    {
        private const String BaseAddress = @"https://demo.slmobile.de/demoapi/";

        private static Token Token { get; set; }

        public static void Main(string[] args)
        {
            Console.WriteLine("Start");
            Console.WriteLine("\nGet Info");
            GetInfo();
            Console.WriteLine("\nLogin");
            Login();
            Console.WriteLine("\nGet customer");
            GetCustomerList();
            Console.WriteLine("\nGet customer 10007");
            GetCustomer();
            Console.WriteLine("\nModify customer 10007");
            ModifyCustomer();
            Console.WriteLine("\nGet customer 10007");
            GetCustomer();
            Console.WriteLine("press key to continue");
            Console.ReadKey();
        }

        /// <summary>
        /// Sendet einen Request an die API URL ohne weitere Angaben
        /// GET - Request
        /// </summary>
        private static void GetInfo()
        {
            using (var client = new HttpClient())
            {
                // Die Basisadresse der API dem HttpClient mitteilen
                client.BaseAddress = new Uri(BaseAddress);
                
                // GET Request ohne zusätzliche URL angaben
                var response = client.GetAsync(String.Empty).Result;

                // Response auswerten
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    // Wenn StatusCode wie erwartet, dann Content auslesen und direkt auf das Model binden
                    // Erkennt Methode automatisch das Datenformat JSON oder XML
                    var apiInfo = response.Content.ReadAsAsync<ApiInfo>().Result;

                    // Ergebnis anzeigen
                    Console.WriteLine("\t-|" + apiInfo.Product);
                    Console.WriteLine("\t-|" + apiInfo.Version);
                    Console.WriteLine("\t-|" + apiInfo.Description);
                }
                else
                {
                    // Wenn Statuscode auf Fehler schliessen läßt, dann Content als ApiResponse auslesen
                    var apiResponse = response.Content.ReadAsAsync<ApiResponse>().Result;

                    // Fehler anzeigen
                    Console.WriteLine(response.StatusCode + " " + apiResponse.Message);
                }
            }
        }

        /// <summary>
        /// Anmelden an der API - Braucht einen SL.mobile Account
        /// Url: api\Account\Login
        /// POST - Request
        /// </summary>
        private static void Login()
        {
            using (var client = new HttpClient())
            {
                // Die Basisadresse der API dem HttpClient mitteilen
                client.BaseAddress = new Uri(BaseAddress);

                // POST Model anlegen, das Model wird so komplett übertragen mit allen Properties, andernfalls muss man ein 
                // anonymes Object erstellen
                var credentials = new Credentials
                {
                    UserName = "APIDemo",
                    Password = "Ap1Dem0",
                    AppKey = "App-Demo20191122"
                };

                // Gibt das Antwortformat, welches man verarbeiten kann, ist das in .Net wichtig? 
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                // Post Model als JSON (Content-Type: application/json)
                var response = client.PostAsJsonAsync(@"Login", credentials).Result;
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    Token = response.Content.ReadAsAsync<Token>().Result;
                    Console.WriteLine("\t" + Token.TokenType + " " + Token.AccessToken);
                }
                else
                {
                    var apiResponse = response.Content.ReadAsAsync<ApiResponse>().Result;
                    Console.WriteLine("\t" + response.StatusCode + " " + apiResponse.Message);
                }
            }
        }

        /// <summary>
        /// GET CustomerList
        /// Url: api\Customer
        /// Authorization notwending
        /// </summary>
        private static void GetCustomerList()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseAddress);

                // Request die einen Login erfordern müssen im Header die Authorsierung durchführen, dazu
                // wird Authorization: LoginId 12345-12345-12345-12345-12345 hinzugefügt
                client.DefaultRequestHeaders.Add("Authorization", Token.TokenType + " " + Token.AccessToken);

                // Abrufen der CustomerList mit Sorting
                var response = client.GetAsync(@"Customers?orderby=Number").Result;
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    // Content as List auslesen und anzeigen
                    var customerList = response.Content.ReadAsAsync<List<Customer>>().Result;
                    foreach (var customer in customerList)
                    {
                        Console.WriteLine("\t-|" + customer.Number + " - " + customer.Company);
                    }
                }
                else
                {
                    var apiResponse = response.Content.ReadAsAsync<ApiResponse>().Result;
                    Console.WriteLine("\t" + response.StatusCode + " " + apiResponse.Message);
                }
            }
        }

        /// <summary>
        /// GET Customer
        /// Url: api\Customer\Id bzw. bei uns api\Customer?customerNumber
        /// Authorization notwendig
        /// </summary>
        private static void GetCustomer()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseAddress);

                // Authorization nicht vergessen
                client.DefaultRequestHeaders.Add("Authorization", Token.TokenType + " " + Token.AccessToken);

                // einzelnen Kunden abrufen mit CustomerNumber
                var response = client.GetAsync(@"Customers?filter=Number EQ '10007'").Result;
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    // Auslesen und Anzeigen
                    var customers = response.Content.ReadAsAsync<List<Customer>>().Result;
                    var firstCustomer = customers.First();
                    Console.WriteLine("\t-|" + firstCustomer.Number + " - " + firstCustomer.Company);
                    Console.WriteLine("\t |Phone: " + firstCustomer.Contact.TelephoneNumber1);

                }
                else
                {
                    var apiResponse = response.Content.ReadAsAsync<ApiResponse>().Result;
                    Console.WriteLine("\t" + response.StatusCode + " " + apiResponse.Message);
                }
            }
        }

        /// <summary>
        /// PUT Customer
        /// Url: api\Customer?customerNumber
        /// Authorization notwendig
        /// </summary>
        private static void ModifyCustomer()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseAddress);

                // Authorization nicht vergessen
                client.DefaultRequestHeaders.Add("Authorization", Token.TokenType + " " + Token.AccessToken);

                // Attention !!! nur Objekte mit Properties die überschrieben werden sollen, bei typisierten Sprachen zu beachten
                // Alternative anonyme Objekte
                Random random = new Random();
                int randomNumber = random.Next(0, 100);
                var customer = new 
                {
                    Contact = new 
                    {
                        TelephoneNumber1 = $"0391/987 654 {randomNumber}"
                    }
                };

                // PUT um einen Customer zu ändern, POST um ihn neu erstellen
                var response = client.PutAsJsonAsync(@"Customers\10007", customer).Result;
                if (response.StatusCode == HttpStatusCode.NoContent)
                {
                    Console.WriteLine("\tOK");

                }
                else
                {
                    var apiResponse = response.Content.ReadAsAsync<ApiResponse>().Result;
                    Console.WriteLine(response.StatusCode + " " + apiResponse.Message);
                }
            }
        }
    }
}
