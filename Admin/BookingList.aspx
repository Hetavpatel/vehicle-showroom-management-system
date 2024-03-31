<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="BookingList.aspx.cs" Inherits="MYPROJECT.Admin.BookingList" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
      <script>
        /* for disappearing alert message */
        window.onload = function () {
            var seconds = 5;
            setTimeout(function () {
                document.getElementById("<%=lblMsg.ClientID %>").style.display = "none";
            }, seconds * 1000);
        };
      </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <div class="pcoded-inner-content pt-0">

        <div class="align-align-self-end">
            <asp:Label ID="lblMsg" runat="server" Visible="false"></asp:Label>
        </div>

        <div class="main-body">
            <div class="page-wrapper">

                <div class="page-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="card">
                                <div class="card-header">

                                    <div class="card-block">
                                        <div class="row">

                                            <div class="col-sm-8 col-md-8 col-lg-8 mobile-inputs">
                                                <h4 class="sub-title">Service List</h4>

                                                <div class="card-block table-border-style">
                                                    <div class="table-responsive">
                                                        <asp:Repeater ID="Repeater1" runat="server" DataSourceID="Slist">
                                                             <HeaderTemplate>
                                                                <table class="table data-table-export table-hover nowrap">
                                                                    <thead>
                                                                        <tr>
                                                                            <th class="table-plus">Booking Id</th>
                                                                            
                                                                            <th>Name</th>
                                                                            <th>Email</th>
                                                                           <th>Phone No</th>
                                                                            <th>Address</th>
                                                                            <th>Down payment</th>
                                                                           
                                                                            <th>Booking Date</th>
                                                                            <th class="dataTable-nonsort">Delete</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                            </HeaderTemplate>
                                                            <ItemTemplate>
                                                                <tr>
                                                                    <td><%# Eval("BookID") %></td>
                                                                    <td><%# Eval("Name") %></td>
                                                                    <td><%# Eval("Email") %></td>
                                                                    <td><%# Eval("PhoneNO") %></td>
                                                                    <td><%# Eval("Address") %></td>
                                                                    <td><%# Eval("DownPayment") %></td>
                                                                    <td><%# Eval("BDate") %></td>
                                                                    
                                                                    
                                                                    <td>
                                                                        <asp:LinkButton ID="lnkDelete" runat="server" Text="Delete" CssClass="badge badge-primary" CommandArgument='<%# Eval("BookId")  %>' CommandName="delete" OnClientClick="return confirm('Do you want to delete this User?');"><i class="ti-trash"></i></asp:LinkButton>
                                                                    </td>

                                                                </tr>
                                                            </ItemTemplate>
                                                            <FooterTemplate>
                                                                </tbody>
                                                                </table>
                                                            </FooterTemplate>
                                                        </asp:Repeater>
                                                        <asp:SqlDataSource ID="Slist" runat="server" ConnectionString="<%$ ConnectionStrings:cs %>" ProviderName="<%$ ConnectionStrings:cs.ProviderName %>" SelectCommand="SELECT * FROM [Bikebooking]"></asp:SqlDataSource>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
