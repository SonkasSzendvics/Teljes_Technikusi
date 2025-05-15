using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net.Http;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace konzol
{
    public class ServerConnection
    {
        HttpClient client = new HttpClient();
        
        public async Task<List<ArtData>> getArtWork()
        {
            List<ArtData> all = new List<ArtData>();
            string url = "http://127.1.1.1:3000/artworks";
			try
			{
                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                string result = await response.Content.ReadAsStringAsync();
                all = JsonConvert.DeserializeObject<List<ArtData>>(result); 
			}
			catch (Exception e)
			{

                Console.WriteLine(e.Message);
                
			}

            return all;
        }

        public async Task<bool> register(string username, string password)
        {
            string url = "http://127.1.1.1:3000/register";
            ArtData artWork = new ArtData();
            try
            {
                var JsonData = new
                {
                    regUser = username,
                    regPass = password
                };
                string jsonString = JsonConvert.SerializeObject(JsonData);
                StringContent Sendthis = new StringContent(jsonString, Encoding.UTF8, "Application/JSON");
                HttpResponseMessage response = await client.PostAsync(url, Sendthis);

                string result = await response.Content.ReadAsStringAsync();
                artWork = JsonConvert.DeserializeObject<ArtData>(result);
                return true;

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }

    }
}
