using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SelectLine_API_Console
{
    public class Contact
    {
        public String TelephoneNumber1 { get; set; }
    }
    public class Customer
    {
        public String Number { get; set; }
        public String Company { get; set; }
        public Contact Contact { get; set; }
    }
}
