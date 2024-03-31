using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MYPROJECT.User
{
    public partial class Enterotp : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected void btndone_Click(object sender, EventArgs e)
        {
            string enteredOTP = txtotp.Text;
            string storedOTP = Session["otp"].ToString();

            if (enteredOTP == storedOTP)
            {
                Response.Redirect("ResetPassword.aspx");
            }
            else
            {
                //lblMessage.Text = "Incorrect OTP. Please try again.";
                Response.Write("<script>alert('Wrong otp.')</script>");
            }
        }
    }

}