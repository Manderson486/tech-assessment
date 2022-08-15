using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using CSharp.Models;
using System.IO;
using System.Linq;

namespace CSharp.Controllers
{
    [ApiController]
    [Route("")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            var toread = System.IO.File.ReadAllText(@"data\orders.json");
            JArray o1 = JArray.Parse(toread);

            var sortedObj = new JArray(
                o1.OrderBy(p => (string)p["firstName"])
            );

            string output = sortedObj.ToString();

            return output;
        }

        [HttpPost]
        public void Post(Orders json)
        {
            JObject thisObj = json.toJSON(); //JObject.Parse("");
            var toread = System.IO.File.ReadAllText(@"data\orders.json");
            JArray objList = JArray.Parse(toread);
            objList.Add(thisObj);
            System.IO.File.WriteAllText(@"data\orders.json",objList.ToString());
        }

        [HttpPost]
        [Route("update")]
        public void Update(Orders json)
        {
            JObject thisObj = json.toJSON(); //JObject.Parse("");
            var id = ((int)thisObj["id"]);
            var toread = System.IO.File.ReadAllText(@"data\orders.json");
            JArray objList = JArray.Parse(toread);
            objList.Single(p =>
            {
                return ((int)p["id"]) == id;
            }).Replace(json.toJSON());
            System.IO.File.WriteAllText(@"data\orders.json", objList.ToString());
            //return toReturn;
        }
    }
}
