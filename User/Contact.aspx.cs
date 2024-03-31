using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MYPROJECT.User
{
    public partial class Contact : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        SqlDataAdapter sda;
        DataTable dt;
        protected void Page_Load(object sender, EventArgs e)
        {

        }

      

            private void Clear()
            {
                TextBox1.Text = string.Empty;
                TextBox2.Text = string.Empty;
                TextBox3.Text = string.Empty;
                TextBox4.Text = string.Empty;
            }

        protected void btnsubmit_Click(object sender, EventArgs e)
        {
            int contactId = Convert.ToInt32(Request.QueryString["id"]);
            con = new SqlConnection(Connection.GetConnectionString());
            con.Open();
            cmd = new SqlCommand("Contact_Crud", con);
            cmd.Parameters.AddWithValue("@Action", "INSERT");
            cmd.Parameters.AddWithValue("@ContactId", contactId);
            cmd.Parameters.AddWithValue("@Name", TextBox1.Text.Trim());
            cmd.Parameters.AddWithValue("@Email", TextBox2.Text.Trim());
            cmd.Parameters.AddWithValue("@Subject", TextBox3.Text.Trim());
            cmd.Parameters.AddWithValue("@Message", TextBox4.Text.Trim());
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.ExecuteNonQuery();
            ScriptManager.RegisterStartupScript(this, this.GetType(), "script", "alert('Successfully Submmited');", true);
            Clear();
        }
    }
}