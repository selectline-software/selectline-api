using System.Threading.Tasks;

namespace SelectLine.Api.WPFDemo
{
    using System.Windows;
    using Newtonsoft.Json;

    /// <summary>
    /// Interaktionslogik für Start.xaml
    /// </summary>
    public partial class Start : Window
    {
        public Start()
        {
            InitializeComponent();
            LoadApiInfo();
            ShowLogin();
        }

        private void LoadApiInfo()
        {
            var response = Communication.GetMessage("");
            var result = response.Content.ReadAsStringAsync().Result;
            var infoModel = JsonConvert.DeserializeObject<WebApiInfoModel>(result);
            Communication.InfoModel = infoModel;
            LaProduct.Content = infoModel.Product;
            LaVersion.Content = infoModel.Version;
            LaBuildDate.Content = infoModel.BuildDate;
        }

        private async void ShowLogin()
        {
            await Task.Delay(2000);
            var login = new Login();
            login.ShowInTaskbar = true;
            login.Show();
            this.Close();
        }
    }
}
