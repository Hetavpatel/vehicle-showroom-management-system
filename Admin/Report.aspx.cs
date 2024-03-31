using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace MYPROJECT.Admin
{
    public partial class Report : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        SqlDataAdapter sda;
        DataTable dt;
        protected void Page_Load(object sender, EventArgs e)
        {

        }



        protected void btnSeacrh_Click(object sender, EventArgs e)
        {
            con = new SqlConnection(Connection.GetConnectionString());
            cmd = new SqlCommand("Report", con);
            cmd.CommandType = CommandType.StoredProcedure;
            con.Open();
            cmd.Parameters.AddWithValue("@startdate", txtStart.Text);
            cmd.Parameters.AddWithValue("@enddate", txtEnd.Text);
            sda = new SqlDataAdapter(cmd);
            dt = new DataTable();
            sda.Fill(dt);
            cmd.ExecuteNonQuery();
            GridView1.DataSource = dt;
            GridView1.DataBind();
            con.Close();
        }
    }
}