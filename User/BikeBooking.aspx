<%@ Page Title="" Language="C#" MasterPageFile="~/User/User.Master" AutoEventWireup="true" enableEventValidation="false" CodeBehind="BikeBooking.aspx.cs"  Inherits="MYPROJECT.User.BikeBooking" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="book_section layout_padding">
        <div class="container">
            <div class="heading_container">
                <div class="align-self-end">
                    <asp:Label ID="lblMsg" runat="server" Visible="false"></asp:Label>
                </div>
                <asp:Label ID="lblHeaderMsg" runat="server" Text="<h2>Enter Booking Details</h2>"></asp:Label>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form_container" >
                        <div>
                           
                          <asp:TextBox ID="txtname" runat="server"  class="form-control" placeholder="Your Name"></asp:TextBox>
                             <asp:HiddenField ID="hdnId" runat="server" Value="0" />
                        </div>

                        <div>
                           
                           <asp:TextBox ID="txtemail" runat="server" class="form-control" placeholder="Email "></asp:TextBox>

                        </div>

                        <div>
                           
                            <asp:TextBox ID="txtphone" runat="server" class="form-control" placeholder="Phone Number"></asp:TextBox>
                        </div>
                         <div>
                           
                          <asp:TextBox ID="txtaddress" runat="server" class="form-control" placeholder="Enter address"></asp:TextBox>
                        </div>
                         <div>
                           
                            <asp:TextBox ID="txtDpayment" runat="server"  class="form-control" placeholder="Down payment"></asp:TextBox>
                        </div>
                   </div>
                </div>
            
                
            

            <div class="row pl-4">
                <div class="btn-box">
                    <asp:Button ID="btnsbook" runat="server" Text="Book" CssClass="btn btn-success rounded-pill pl-4 text-white" OnClick="btnRegister_Click" />
                   

                </div>
            </div>

           
        </div>
    </div>
    </section>
  <!-- end book section -->
</asp:Content>
