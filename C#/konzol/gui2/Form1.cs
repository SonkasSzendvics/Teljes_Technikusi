using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Windows.Forms.VisualStyles;
using konzol;

namespace gui2
{
    public partial class Form1 : Form
    {
        static public List<ArtData> data = new List<ArtData>();
        ServerConnection connection = new ServerConnection();


        public Form1()
        {
            InitializeComponent();
            button1.Text = "Regisztráció";
            button1.Click += Form3Valtas;
            listReader();
            listBox1.Click += Adatok;






        }
        public void Form3Valtas(object s, EventArgs e)
        {
            Form3 form3 = new Form3();
            form3.Show();
            this.Hide();
        }

        public async void listReader()
        {
            data = await connection.getArtWork();
            listBox1.Items.Clear();
            foreach (ArtData art in data)
            {
                listBox1.Items.Add($"A műalkotás neve: {art.title}, az ára:{art.value}");
            }
        }

        public async void Adatok(object s, EventArgs e)
        {
            data = await connection.getArtWork();
            int selectedIndex = listBox1.SelectedIndex;
            Form2 form2 = new Form2(data[selectedIndex].id, data[selectedIndex].title, data[selectedIndex].value);
            form2.Show();
            this.Hide();
        }
    }
}
