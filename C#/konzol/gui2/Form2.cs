using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace gui2
{
    public partial class Form2 : Form
    {
        public Form2(int id, string name, int value)
        {
            InitializeComponent();
            label1.Text = "A műalkotás neve: " + name;
            label2.Text = "A műalkotás értéke: " + value;
            label3.Text = "A műalkotás id-ja: " + id;

            this.FormClosed += Valtas;
        }

        public void Valtas(object e, EventArgs s)
        {
            Form1 form1 = new Form1();
            form1.Show();
            this.Hide();
        }
    }
}
