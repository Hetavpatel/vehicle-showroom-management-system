using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MYPROJECT.User
{
    public partial class BikeBooking : System.Web.UI.Page
    {
        SqlConnection con;
        SqlCommand cmd;
        SqlDataAdapter sda;
        DataTable dt;
        protected void Page_Load(object sender, EventArgs e)
        {
           

            if (!IsPostBack)
            {
                if (Session["userId"] == null)
                {
                    Response.Redirect("Login.aspx");
                }
                else
                {

                }
            }

        }

        protected void btnRegister_Click(object sender, EventArgs e)
        {
            int userId = Convert.ToInt32(Request.QueryString["id"]);
            string actionName = string.Empty;

            int BookId = Convert.ToInt32(hdnId.Value);
            con = new SqlConnection(Connection.GetConnectionString());
            cmd = new SqlCommand("booking_crud", con);
            cmd.Parameters.AddWithValue("@Action", BookId == 0 ? "INSERT" : "UPDATE");

            cmd.Parameters.AddWithValue("@Name", txtname.Text);
            cmd.Parameters.AddWithValue("@Email", txtemail.Text);
            cmd.Parameters.AddWithValue("@PhoneNO", txtphone.Text.ToString());
            cmd.Parameters.AddWithValue("@Address", txtaddress.Text);
            cmd.Parameters.AddWithValue("@DownPayment", txtDpayment.Text);
           
         


            cmd.CommandType = CommandType.StoredProcedure;
            try
            {
                con.Open();
                cmd.ExecuteNonQuery();
                actionName = BookId == 0 ? "inserted" : "updated";
                lblMsg.Visible = true;
                lblMsg.Text = "Bike Booked  " + actionName + "  Successfull!";
                lblMsg.CssClass = "alert alert-success";
                Response.Redirect("Payment.aspx");

            }
            catch (Exception ex)
            {
                lblMsg.Visible = true;
                lblMsg.Text = "Error " + ex.Message;
                lblMsg.CssClass = "alert alert-danger";
            }
            finally
            {
                con.Close();
            }

        }
    }
}