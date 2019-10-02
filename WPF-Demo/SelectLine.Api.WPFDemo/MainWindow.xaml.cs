

using SelectLine.Erp.Models.ApiResponseModels;

namespace SelectLine.Api.WPFDemo
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Net.Http;
    using System.Text.RegularExpressions;
    using System.Windows;
    using System.Windows.Controls;

    using Newtonsoft.Json;

    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow
    {
        public MainWindow()
        {
            this.InitializeComponent();
            LaUser.Content = Communication.UserModel.DisplayName;
        }

        private void BtnLogoutClick(object sender, RoutedEventArgs e)
        {
            try
            {
                var message = Communication.PostLogoutRequest("");
                var login = new Login();
                login.Show();
                this.Close();
            }
            catch (Exception)
            {
                MessageBox.Show("Fehler beim Logout. Der Service ist nicht mehr erreichbar.");
            }
        }

        private void BtnInformationClick(object sender, RoutedEventArgs e)
        {
            var infoDlg = new Information();
            infoDlg.ShowDialog();
        }

        private void BtnCustomer(object sender, RoutedEventArgs e)
        {
            if (Communication.HasUser(""))
            {
                var getAnsicht = new GetAnsicht();
                getAnsicht.LoadAnsicht("Customers");
                getAnsicht.ShowDialog();
            }
            else
            {
                ShowLogin();
            }
        }

        private void ShowLogin()
        {
            var loginDlg = new Login();
            loginDlg.ShowInTaskbar = true;
            loginDlg.Show();
            this.Close();
        }

        private void BtnSupplier(object sender, RoutedEventArgs e)
        {
            if (Communication.HasUser(""))
            {
                var getAnsicht = new GetAnsicht();
                getAnsicht.LoadAnsicht("Supplier");
                getAnsicht.ShowDialog();
            }
            else
            {
                ShowLogin();
            }
        }

        private void BtnProspect(object sender, RoutedEventArgs e)
        {
            if (Communication.HasUser(""))
            {
                var getAnsicht = new GetAnsicht();
                getAnsicht.LoadAnsicht("Prospect");
                getAnsicht.ShowDialog();
            }
            else
            {
                ShowLogin();
            }
        }
    }
}
