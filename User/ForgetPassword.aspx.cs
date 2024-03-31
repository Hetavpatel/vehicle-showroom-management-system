using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MYPROJECT.User
{
    public partial class ForgetPassword : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnSend_Click(object sender, EventArgs e)
        {
            // Get the email address from the session
            string Email = txtEmail.Text;
            Session["Email"] = Email;


            // Generate a random 6-digit OTP
            int otp = new Random().Next(100000, 999999);

            // Store the OTP in a session variable
            Session["otp"] = otp;

            // Store the time the OTP was generated
            Session["otpGeneratedTime"] = DateTime.Now;

            // Send the OTP to the user's email
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

                mail.From = new MailAddress("20bmiit049@gmail.com");
                mail.To.Add(Email);
                mail.Subject = "Verify OTP";
                mail.Body = "Your OTP is: " + otp;

                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("20bmiit049@gmail.com", "vfjjdrnlzqqpbote");
                SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);
                //lSuccessfully send a otp.

                Response.Write("<script>alert('Your have send you a OTP.')</script>");
                Response.Redirect("Enterotp.aspx");

                Console.WriteLine("mail send" + otp);
            }
            catch (Exception ex)
            {
                //lblMessage.Text = ex.Message;

                Response.Write("<script>alert('We have a problem sending mail.')</script>");
            }
        }
    }
}