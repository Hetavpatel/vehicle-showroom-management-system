using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MYPROJECT.User
{
    public partial class ResetPassword : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        SqlDataAdapter sda;



        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            string Email = txtEmail.Text;
            string newPassword = txtnew.Text;
            string confirmPassword = txtconfirm.Text;

            if (newPassword == confirmPassword)
            {
                con = new SqlConnection(Connection.GetConnectionString());


                SqlCommand cmd = new SqlCommand("UPDATE Users SET Password = @Password where Email=@Email", con);
                cmd.Parameters.AddWithValue("@Password", newPassword);
                cmd.Parameters.AddWithValue("@Email", Email);
                con.Open();

                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected > 0)
                {
                    //lblMessage.Text = "Password updated successfully.";
                    Response.Write("<script>alert('Password updated successfully.')</script>");
                    Response.Redirect("Login.aspx");
                }
                else
                {
                    //lblMessage.Text = "Failed to update password. Please try again.";
                    Response.Write("<script>alert('Failed to update password.')</script>");
                }

                con.Close();
            }
            else
            {
                //lblMessage.Text = "New password and confirm password do not match. Please try again.";
                Response.Write("<script>alert('New password and confirm password do not match. Please try again.')</script>");
            }
        }
    }
}