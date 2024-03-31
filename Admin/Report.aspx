<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="Report.aspx.cs" Inherits="MYPROJECT.Admin.Report" %>
<%@ Import Namespace="MYPROJECT" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <div>
        <center>
            <h1>Report</h1>
            <hr />
            Start Date: <asp:TextBox ID="txtStart" runat="server"></asp:TextBox>
            End Date: <asp:TextBox ID="txtEnd" runat="server"></asp:TextBox>
            <asp:Button ID="btnSeacrh" runat="server" Text="Search" OnClick="btnSeacrh_Click" />
            <hr />
            <asp:GridView ID="GridView1" runat="server"></asp:GridView>
        </center>
    </div>
</asp:Content>
