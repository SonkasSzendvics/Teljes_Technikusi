using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace konzol
{
    public class Program
    {
        public static ServerConnection connection = new ServerConnection();
        public static List<ArtData> artData = new List<ArtData>();
        
        static async Task Main(string[] args)
        {

            artData = await listReader();
            string CommanString = "run";
            while (CommanString == "run")
            {
                CommanString = await Chooser(CommanString);
            }



        }

        static async Task<string> Chooser(string command)
        {
            DrawMenu();
            int number = 0;
            string menuItem = Console.ReadLine().Trim();
            int.TryParse(menuItem, out number);
            if(number < 1 ||  number > 5)
            {
                return command;
            }
            switch (number)
            {

                case 1:
                    Console.Clear();
                    Console.WriteLine("Műalkotások listája: ");
                    foreach (ArtData data in artData)
                    {
                        Console.WriteLine($"A műalkotás neve: {data.title}, az ára:{data.value}");
                    }


                    break;
                case 2:
                    Console.Clear();
                    Console.WriteLine("Adj meg egy számot: ");
                    string szamString = Console.ReadLine();
                    int szam = 0;
                    int.TryParse(szamString, out szam);
                    foreach (ArtData data in artData)
                    {
                        if (szam < data.value)
                        {
                            Console.WriteLine($"A műalkotás neve: {data.title}, az ára:{data.value}");
                        }
                        
                    }


                    break;
                case 3:
                    Console.Clear();
                    Console.WriteLine("Műalkotások száma: " + artData.Count());

                    break;
                case 4:
                    Console.Clear();
                    Console.WriteLine("Műalkotások átlaga: " + artData.Average(f => f.value));

                    break;
                case 5:
                    command = "exit";
                    break;
                default:
                    
                    break;
            }
            Console.ReadKey();
            return command;
        }

        static public void DrawMenu()
        {
            
            Console.WriteLine("1. Műalkotások listázása ");
            Console.WriteLine("2. Adott érték feletti műalkotások listázása ");
            Console.WriteLine("3. Műalkotások számának kiírása ");
            Console.WriteLine("4. Átlagos műalkotás érték megadása ");
            Console.WriteLine("5. Kilépés ");
            Console.WriteLine();

            
        }

        static public async Task<List<ArtData>> listReader()
        {
            artData = await connection.getArtWork();
            return artData;

        }


    }
}
