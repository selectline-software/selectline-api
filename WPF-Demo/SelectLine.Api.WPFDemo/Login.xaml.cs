namespace SelectLine.Api.WPFDemo
{
    using System;
    using System.Windows;

    /// <summary>
    /// Interaktionslogik für Login.xaml
    /// </summary>
    public partial class Login : Window
    {
        public Login()
        {
            InitializeComponent();
        }

        private Boolean RequiredValuesAreValid(String userName, String password, String appkey)
        {
            return !String.IsNullOrWhiteSpace(userName) && !String.IsNullOrWhiteSpace(password) && !String.IsNullOrWhiteSpace(appkey);
        }

        private void BtnLoginClick(object sender, RoutedEventArgs e)
        {
            LaError.Content = "";
            var userName = EdUser.Text;
            var password = EdPassword.Password;
            var appkey = EdAppKey.Text;
            try
            {
                if (!RequiredValuesAreValid(userName, password, appkey))
                {
                    LaError.Content = "Error: Logindaten fehlen.";
                    return;
                }

                Communication.SetCredentials(userName, password, appkey);
                var message = Communication.PostLoginRequest("");
                if (message.IsSuccessStatusCode)
                {
                    var mainwindow = new MainWindow();
                    mainwindow.ShowInTaskbar = true;
                    mainwindow.Show();
                    this.Close();
                }
                else
                {
                    var apiResponse = Communication.GetErrorResponseFromResponseMessage(message);
                    LaError.Content = apiResponse.Message;
                }
            }
            catch (Exception exception)
            {
                LaError.Content = exception.Message;
            }
        }
    }
}
