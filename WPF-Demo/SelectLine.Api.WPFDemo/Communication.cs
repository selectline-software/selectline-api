namespace SelectLine.Api.WPFDemo
{
    using System;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using Erp.Models;
    using Erp.Models.ApiResponseModels;

    using Newtonsoft.Json;

    public static class Communication
    {
        private static String Username { get; set; }
        private static String Password { get; set; }
        private static String AppKey { get; set; }
        private static String AccessToken { get; set; }

        public static String GetApiUrl()
        {
            return "https://demo.slmobile.de/demoapi/";
        }

        public static WebApiInfoModel InfoModel { get; set; }
        public static WebApiUserModel UserModel { get; set; }

        public static void SetCredentials(String username, String password, String appkey)
        {
            Username = username;
            Password = password;
            AppKey = appkey;
        }

        internal static HttpResponseMessage PostLoginRequest(String apiUri)
        {
            var apiUrl = String.Concat(String.IsNullOrEmpty(apiUri) ? GetApiUrl() : apiUri, "Login");

            var message = PostMessage<Object>(apiUrl, null);

            if (message.IsSuccessStatusCode)
            {
                var tokenModel = message.Content.ReadAsAsync<Token>().Result;
                if (tokenModel != null)
                {
                    AccessToken = tokenModel.AccessToken;
                    HasUser(apiUri);
                }
            }

            return message;
        }

        internal static Boolean HasUser(String apiUri)
        {
            var apiUrl = String.Concat(String.IsNullOrEmpty(apiUri) ? GetApiUrl() : apiUri, "Users/Current");
            var message = GetMessage(apiUrl);
            if (message.IsSuccessStatusCode)
            {
                UserModel = message.Content.ReadAsAsync<WebApiUserModel>().Result;
            }
            return message.IsSuccessStatusCode;
        }

        public static ApiResponse GetErrorResponseFromResponseMessage(HttpResponseMessage message)
        {
            var result = message.Content.ReadAsStringAsync().Result;

            return JsonConvert.DeserializeObject<ApiResponse>(result);
        }

        internal static HttpResponseMessage PostLogoutRequest(String apiUri)
        {
            var apiUrl = String.Concat(String.IsNullOrEmpty(apiUri) ? GetApiUrl() : apiUri, "Logout");
            var message = PostMessage<Object>(apiUrl, null);

            if (message.IsSuccessStatusCode)
            {
                AccessToken = String.Empty;
            }

            return message;
        }

        internal static HttpResponseMessage PostMessage<T>(String requestUri, T unit) where T : class
        {
            using (var client = new HttpClient())
            {
                SetClientDefaults(client, requestUri);
                SetClientAuthorization(client);

                HttpContent content = null;

                if (unit != null)
                {
                    content = new StringContent(JsonConvert.SerializeObject(unit));
                    content.Headers.ContentType = new MediaTypeWithQualityHeaderValue("application/json");
                }
                else
                {
                    var credentials = CreateCredentials();
                    content = CreateContent(credentials);
                }

                return client.PostAsync(requestUri, content).Result;
            }
        }


        internal static HttpResponseMessage GetMessage(String requestUri)
        {
            using (var client = new HttpClient())
            {
                SetClientDefaults(client, requestUri);
                SetClientAuthorization(client);
                return client.GetAsync(requestUri).Result;
            }
        }

        private static Credentials CreateCredentials()
        {
            return new Credentials
            {
                UserName = Username,
                Password = Password,
                AppKey = AppKey
            };
        }

        private static StringContent CreateContent(Credentials credentials)
        {
            var content = new StringContent(JsonConvert.SerializeObject(credentials));
            content.Headers.ContentType = new MediaTypeWithQualityHeaderValue("application/json");
            return content;
        }

        private static void SetClientDefaults(HttpClient client, String uriString)
        {
            if (String.IsNullOrEmpty(uriString))
            {
                client.BaseAddress = new Uri(GetApiUrl());
            }
            else
            {
                client.BaseAddress = new Uri(uriString);
            }
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        private static void SetClientAuthorization(HttpClient client)
        {
            if (!String.IsNullOrEmpty(AccessToken))
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("LoginId", AccessToken);
            }
        }
    }
}
