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
    public partial class ServiceBooking : System.Web.UI.Page
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

            int ServiceId = Convert.ToInt32(hdnId.Value);
            con = new SqlConnection(Connection.GetConnectionString());
            cmd = new SqlCommand("Service_crud", con);
            cmd.Parameters.AddWithValue("@Action", ServiceId == 0 ? "INSERT" : "UPDATE");

            cmd.Parameters.AddWithValue("@Name", txtName.Text);
            cmd.Parameters.AddWithValue("@BikeNo", txtBikeno.Text);
            cmd.Parameters.AddWithValue("@PhoneNo", txtMobile.Text.ToString());
            cmd.Parameters.AddWithValue("@Address", txtAddress.Text);
            cmd.Parameters.AddWithValue("@BikeModel", txtBikeModel.Text);
            cmd.Parameters.AddWithValue("@ServiceSuggestion", txtsuggesstion.Text);
            cmd.Parameters.AddWithValue("@ServiceDate", txtSdate.Text);
            cmd.Parameters.AddWithValue("@UserId", Session["userId"]);


            cmd.CommandType = CommandType.StoredProcedure;

            Session["Name"] = txtName.Text.ToString();
            Session["ServiceDate"] = txtSdate.Text.ToString(); 
            Session["BikeNO"] = txtBikeno.Text.ToString(); 
            Session["phoneNO"] = txtMobile.Text.ToString(); 
            Session["Bikemodel"] = txtBikeModel.Text.ToString(); 
            Session["suggesstion"] = txtsuggesstion.Text.ToString();

            Response.Redirect("pdfgen.aspx");
           
            try
            {
                con.Open();
                cmd.ExecuteNonQuery();
                actionName = ServiceId == 0 ? "inserted" : "updated";
                lblMsg.Visible = true;
                lblMsg.Text = "Service Booked  " + actionName + "  Successfull!";
                lblMsg.CssClass = "alert alert-success";
               

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