<%@ Page Title="" Language="C#" MasterPageFile="~/User/User.Master" AutoEventWireup="true" EnableEventValidation="false" CodeBehind="ServiceBooking.aspx.cs" Inherits="MYPROJECT.User.ServiceBooking" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   <section class="book_section layout_padding">
        <div class="container">
            <div class="heading_container">
                <div class="align-self-end">
                    <asp:Label ID="lblMsg" runat="server" Visible="false"></asp:Label>
                </div>
                <asp:Label ID="lblHeaderMsg" runat="server" Text="<h2>Enter Service Details</h2>"></asp:Label>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form_container" >
                        <div>
                           
                            <asp:TextBox ID="txtName" runat="server" CssClass="form-control" placeholder="Enter Full Name" ToolTip="Full Name"></asp:TextBox>
                             <asp:HiddenField ID="hdnId" runat="server" Value="0" />
                        </div>

                        <div>
                           
                            <asp:TextBox ID="txtBikeno" runat="server" CssClass="form-control" placeholder="Enter Bike Number" ToolTip="Username"></asp:TextBox>

                        </div>

                        <div>
                           
                            <asp:TextBox ID="txtMobile" runat="server" CssClass="form-control" placeholder="Enter  Mobilenumber" ToolTip="Mobile"></asp:TextBox>

                        </div>
                   </div>
                </div>
            
                
            <div class="col-md-6">
                <div class="form_container">
                    <div>

                        <asp:TextBox ID="txtAddress" runat="server" CssClass="form-control" placeholder="Enter Address" ToolTip="Address" TextMode="MultiLine"></asp:TextBox>

                    </div>

                   



                   <div>
                           
                            <asp:TextBox ID="txtBikeModel" runat="server" CssClass="form-control" placeholder="Enter Bike Model" ToolTip="Email"></asp:TextBox>
                        </div>

                    <div>
                           
                            <asp:TextBox ID="txtsuggesstion" runat="server" CssClass="form-control" placeholder="Enter Service Suggestion" ToolTip="Email"></asp:TextBox>
                        </div>

                    <div>
                           
                            <asp:TextBox ID="txtSdate" type="date" runat="server" CssClass="form-control"  ToolTip="Email"></asp:TextBox>
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
