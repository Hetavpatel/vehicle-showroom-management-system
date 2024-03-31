<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="ServicebookList.aspx.cs" Inherits="MYPROJECT.Admin.ServicebookList" %>
<%@ Import Namespace="MYPROJECT" %>

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
                                                <h4 class="sub-title">Users Lists</h4>

                                                <div class="card-block table-border-style">
                                                    <div class="table-responsive">
                                                        <asp:Repeater ID="rservice" runat="server"  >
                                                            <HeaderTemplate>
                                                                <table class="table data-table-export table-hover nowrap">
                                                                    <thead>
                                                                        <tr>
                                                                            <th class="table-plus">ServiceId</th>
                                                                            <th>Name</th>
                                                                            <th>BikeNo</th>
                                                                            <th>PhoneNo</th>
                                                                            <th>Address</th>
                                                                             <th>BikeModel</th>
                                                                             <th>ServiceSuggestion</th>
                                                                             <th>ServiceDate</th>
                                                                            <th class="dataTable-nonsort">Delete</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                            </HeaderTemplate>
                                                            <ItemTemplate>
                                                                <tr>
                                                                    <td><%# Eval("ServiceId") %></td>
                                                                    <td><%# Eval("BikeNo") %></td>
                                                                    <td><%# Eval("PhoneNo") %></td>
                                                                    <td><%# Eval("Address") %></td>
                                                                    <td><%# Eval("BikeModel") %></td>
                                                                     <td><%# Eval("ServiceSuggestion") %></td>
                                                                    <td><%# Eval("ServiceDate") %></td>
                                                                    <td>
                                                                        <asp:LinkButton ID="lnkDelete" runat="server" Text="Delete" CssClass="badge badge-primary" CommandArgument='<%# Eval("UserId")  %>' CommandName="delete" OnClientClick="return confirm('Do you want to delete this User?');"><i class="ti-trash"></i></asp:LinkButton>
                                                                    </td>

                                                                </tr>
                                                            </ItemTemplate>
                                                            <FooterTemplate>
                                                                </tbody>
                                                                </table>
                                                            </FooterTemplate>
                                                        </asp:Repeater>
                                                        <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:cs %>" ProviderName="<%$ ConnectionStrings:cs.ProviderName %>" SelectCommand="SELECT * FROM [Servicebooking]"></asp:SqlDataSource>
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
