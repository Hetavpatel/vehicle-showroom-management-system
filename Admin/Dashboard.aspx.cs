using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MYPROJECT.Admin
{
    public partial class Dashboard : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        SqlDataAdapter sda;
        DataTable dt;
        string str = ConfigurationManager.ConnectionStrings["cs"].ConnectionString;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["Admin"] == null)
            {
                Response.Redirect("../User/Login.aspx");
            }
            if (!IsPostBack)
            {
                Users();
                Categories();
                Contacts();
                Products();
                Orders();


            }
        }

        private void Contacts()
        {
            con = new SqlConnection(str);
            sda = new SqlDataAdapter("Select Count(*) from Contact", con);
            dt = new DataTable();
            sda.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                Session["Contact"] = dt.Rows[0][0];
            }
            else
            {
                Session["Contact"] = 0;
            }
        }

        private void Users()
        {
            con = new SqlConnection(str);
            sda = new SqlDataAdapter("Select Count(*) from Users", con);
            dt = new DataTable();
            sda.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                Session["Users"] = dt.Rows[0][0];
            }
            else
            {
                Session["Users"] = 0;
            }
        }

        private void Products()
        {
            con = new SqlConnection(str);
            sda = new SqlDataAdapter("Select Count(*) from Products", con);
            dt = new DataTable();
            sda.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                Session["Products"] = dt.Rows[0][0];
            }
            else
            {
                Session["Products"] = 0;
            }
        }

        private void Categories()
        {
            con = new SqlConnection(str);
            sda = new SqlDataAdapter("Select Count(*) from Categories", con);
            dt = new DataTable();
            sda.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                Session["Categories"] = dt.Rows[0][0];
            }
            else
            {
                Session["Categories"] = 0;
            }
        }

        private void Orders()
        {
            con = new SqlConnection(str);
            sda = new SqlDataAdapter("Select Count(*) from Orders", con);
            dt = new DataTable();
            sda.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                Session["Orders"] = dt.Rows[0][0];
            }
            else
            {
                Session["Orders"] = 0;
            }
        }

    }
}