<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="Contactlist.aspx.cs" Inherits="MYPROJECT.Admin.Contactlist" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
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

                                            <div class="col-sm-12 col-md-12 col-lg-12 mobile-inputs">
                                                <h4 class="sub-title">Contacts Lists</h4>

                                                <div class="card-block table-border-style">
                                                    <div class="table-responsive">
                                                        <asp:Repeater ID="rContacts" runat="server" OnItemCommand="rContacts_ItemCommand" >
                                                            <HeaderTemplate>
                                                                <table class="table table-bordered table-hover" id="table_id">
                                                                    <thead>
                                                                        <tr>
                                                                            <th class="table-plus">SrNo</th>
                                                                            <th>Name</th>
                                                                            <th>Email</th>
                                                                            <th>Subject</th>
                                                                            <th>Message</th>
                                                                            <th>Date</th>
                                                                            <th class="dataTable-nonsort">Delete</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                            </HeaderTemplate>
                                                            <ItemTemplate>
                                                                <tr>
                                                                    <td><%# Eval("SrNo") %></td>
                                                                    <td><%# Eval("Name") %></td>
                                                                    <td><%# Eval("Email") %></td>
                                                                    <td><%# Eval("Subject") %></td>
                                                                    <td><%# Eval("Message") %></td>
                                                                    <td><%# Eval("CreatedDate") %></td>
                                                                    <td>
                                                                        <asp:LinkButton ID="lnkDelete" runat="server" Text="Delete" CssClass="badge badge-primary" CommandArgument='<%# Eval("ContactId")  %>' CommandName="delete" OnClientClick="return confirm('Do you want to delete this User?');"><i class="ti-trash"></i></asp:LinkButton>
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
