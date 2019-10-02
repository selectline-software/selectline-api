using System.Reflection;
using System.Runtime.InteropServices;

namespace SelectLine.Api.WPFDemo
{
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

    /// <summary>
    /// Interaktionslogik für Information.xaml
    /// </summary>
    public partial class Information : Window
    {
        public Information()
        {
            InitializeComponent();
            FillStackPanel(InfoStackPanel, Communication.InfoModel);
            FillStackPanel(UserStackPanel, Communication.UserModel);
        }

        private void FillStackPanel(StackPanel panel, Object obj)
        {
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                panel.Children.Add(new Label
                {
                    Foreground = (SolidColorBrush)(new BrushConverter().ConvertFrom("#888")),
                    FontSize = 14,
                    Content = propertyInfo.Name
                });
                panel.Children.Add(new Label { FontSize = 16, Content = propertyInfo.GetValue(obj) });
            }
        }

        private void BtnCloseClick(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}
