using System.Collections.Generic;

namespace CSharp.Models
{
    public class Customers
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public int age { get; set; }
        public string phoneNumber { get; set; }
        public Address address { get; set; }
        public ICollection<Orders> orders {get; set;}
    }
}
