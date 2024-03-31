<%@ Page Title="" Language="C#" MasterPageFile="~/User/User.Master" AutoEventWireup="true" CodeBehind="Contact.aspx.cs" Inherits="MYPROJECT.User.Contact" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- book section -->
  <section class="book_section layout_padding">
    <div class="container">
      <div class="heading_container">
        <h2>
          Send Message
        </h2>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form_container">
            <form action="">
              <div>
                  <asp:TextBox ID="TextBox1"  class="form-control" runat="server"></asp:TextBox>
              </div>
              <div>
                 <asp:TextBox ID="TextBox2"  class="form-control" runat="server"></asp:TextBox>
              </div>
              <div>
                 <asp:TextBox ID="TextBox3"  class="form-control" runat="server"></asp:TextBox>
              </div>
             <div>
                <asp:TextBox ID="TextBox4"  class="form-control" runat="server"></asp:TextBox>
              </div>
                
                <asp:Button ID="btnsubmit" runat="server" Text="Contact" OnClick="btnsubmit_Click" />
              
            </form>
          </div>
        </div>
        <div class="col-md-6">
          <div class="map_container ">
            <div id="googleMap"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- end book section -->

</asp:Content>
