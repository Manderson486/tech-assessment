using Newtonsoft.Json.Linq;

namespace CSharp.Models
{
    public class Orders
    {
        public int id { get; set; }
        public string firstName { get; set; }
        public string Product { get; set; }
        public int price { get; set; }
        public string payment { get; set; }

        public JObject toJSON()
        {
            JObject jobj = new JObject();
            jobj.Add("id",id);
            jobj.Add("firstName", firstName);
            jobj.Add("product",Product);
            jobj.Add("price",price);
            jobj.Add("payment",payment);
            return jobj;
        }
    }
}
