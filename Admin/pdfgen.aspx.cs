using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using iTextSharp.text;
using System.IO;
using iTextSharp.text.html.simpleparser;
using iTextSharp.text.pdf;

namespace MYPROJECT.Admin
{
    public partial class pdfgen : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string ServiceDate = Session["ServiceDate"].ToString();
            Label2.Text = ServiceDate;



            string Name = Session["BikeName"].ToString();
            Label4.Text = Name;



            string BikeNO = Session["Description"].ToString();
            Label5.Text = BikeNO;

            string phoneNO = Session["Price"].ToString();
            Label6.Text = phoneNO;

            string Bikemodel = Session["s"].ToString();
            Label7.Text = Bikemodel;

           
        }

        private void exportpdf()
        {
            Response.ContentType = "application/pdf";
            Response.AddHeader("content-disposition", "attachment;filename=OrderInvoice.pdf");
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            StringWriter sw = new StringWriter();
            HtmlTextWriter hw = new HtmlTextWriter(sw);
            Panel1.RenderControl(hw);
            StringReader sr = new StringReader(sw.ToString());
            Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 100f, 0f);
            HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
            PdfWriter.GetInstance(pdfDoc, Response.OutputStream);
            pdfDoc.Open();
            htmlparser.Parse(sr);
            pdfDoc.Close();

            Response.Write(pdfDoc);
            Response.End();
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            exportpdf();
        }
    }
}