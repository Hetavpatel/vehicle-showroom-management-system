<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="Servicelist.aspx.cs" Inherits="MYPROJECT.Admin.Servicelist" %>
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
                                                        <asp:Repeater ID="rUsers" runat="server" OnItemCommand="rUsers_ItemCommand" >
                                                            <HeaderTemplate>
                                                                <table class="table data-table-export table-hover nowrap">
                                                                    <thead>
                                                                        <tr>
                                                                            <th class="table-plus">AServiceId</th>
                                                                            <th>Bike Name</th>
                                                                            <th>Service perform</th>
                                                                            <th>Totalprice</th>
                                                                            <th>Service date</th>
                                                                            <th class="dataTable-nonsort">Delete</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                            </HeaderTemplate>
                                                            <ItemTemplate>
                                                                <tr>
                                                                    <td><%# Eval("AServiceId") %></td>
                                                                    <td><%# Eval("Bikemodel") %></td>
                                                                    <td><%# Eval("Serviceperform") %></td>
                                                                    <td><%# Eval("Totalprice") %></td>
                                                                    <td><%# Eval("Servicedate") %></td>
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
