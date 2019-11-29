namespace SelectLine.Api.WPFDemo
{
    using System;
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Windows;
    using Newtonsoft.Json;

    public class PersonDetailContact
    {
        public String TelephoneNumber1 { get; set; }
        public String TelephoneNumber2 { get; set; }
        public String EMail1 { get; set; }
        public String EMail2 { get; set; }
    }
    public class Container
    {
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Company { get; set; }
        public PersonDetailContact Contact { get; set; }

        public String Name
        {
            get
            {
                var tmp = Company;
                if (String.IsNullOrEmpty(tmp))
                {
                    tmp = FirstName + " " + LastName;
                }

                return tmp;
            }
        }
    }
    /// <summary>
    /// Interaktionslogik für GetAnsicht.xaml
    /// </summary>
    public partial class GetAnsicht : Window
    {
        public GetAnsicht()
        {
            InitializeComponent();
        }

        public void LoadAnsicht(String type)
        {
            switch (type)
            {
                case "Customers":
                    LaTitle.Content = "Kunden";
                    Get("Customers");
                    break;
                case "Supplier":
                    LaTitle.Content = "Lieferanten";
                    Get("Suppliers");
                    break;
                case "Prospect":
                    LaTitle.Content = "Interessenten";
                    Get("Prospects");
                    break;
                default:
                    LaTitle.Content = "Unbekannt";
                    break;
            }
        }

        private IEnumerable<Container> GetContainerList(HttpResponseMessage message)
        {
            var result = message.Content.ReadAsStringAsync().Result;

            var list = new List<Container>();

            if (result[0].Equals('['))
            {
                list.AddRange(JsonConvert.DeserializeObject<List<Container>>(result));
            }
            else
            {
                list.Add(JsonConvert.DeserializeObject<Container>(result));
            }

            return list;
        }

        private void Get(String type)
        {
            var message = Communication.GetMessage(String.Concat(Communication.GetApiUrl(), type));

            if (!message.IsSuccessStatusCode)
            {
                var apiResponse = Communication.GetErrorResponseFromResponseMessage(message);
                LaError.Content = apiResponse.Message;
            }
            else
            {
                ListView.ItemsSource = GetContainerList(message);
            }
        }

        private void BtnCloseClick(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}
