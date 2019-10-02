using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace SelectLine.Api.WPFDemo
{
    /// <summary>
    /// Interaktionslogik für Login.xaml
    /// </summary>
    public partial class Login : Window
    {
        public Login()
        {
            InitializeComponent();
        }

        private Boolean RequiredValuesAreValid(String userName, String password)
        {
            return !String.IsNullOrWhiteSpace(userName) && !String.IsNullOrWhiteSpace(password);
        }

        private void BtnLoginClick(object sender, RoutedEventArgs e)
        {
            LaError.Content = "";
            var userName = EdUser.Text;
            var password = EdPassword.Password;
            try
            {
                if (!RequiredValuesAreValid(userName, password))
                {
                    LaError.Content = "Error: Logindaten fehlen.";
                    return;
                }

                Communication.SetCredentials(userName, password);
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
