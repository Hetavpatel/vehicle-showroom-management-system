<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="service.aspx.cs" Inherits="MYPROJECT.Admin.service" %>
<%@ Import Namespace="MYPROJECT" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataKeyNames="ServiceId" DataSourceID="SqlDataSource1">
    <Columns>
        <asp:BoundField DataField="ServiceId" HeaderText="ServiceId" InsertVisible="False" ReadOnly="True" SortExpression="ServiceId" />
        <asp:BoundField DataField="Name" HeaderText="Name" SortExpression="Name" />
        <asp:BoundField DataField="BikeNo" HeaderText="BikeNo" SortExpression="BikeNo" />
        <asp:BoundField DataField="PhoneNo" HeaderText="PhoneNo" SortExpression="PhoneNo" />
        <asp:BoundField DataField="Address" HeaderText="Address" SortExpression="Address" />
        <asp:BoundField DataField="BikeModel" HeaderText="BikeModel" SortExpression="BikeModel" />
        <asp:BoundField DataField="ServiceSuggestion" HeaderText="ServiceSuggestion" SortExpression="ServiceSuggestion" />
        <asp:BoundField DataField="ServiceDate" HeaderText="ServiceDate" SortExpression="ServiceDate" />
        <asp:BoundField DataField="UserId" HeaderText="UserId" SortExpression="UserId" />
    </Columns>
</asp:GridView>
<asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:cs %>" ProviderName="<%$ ConnectionStrings:cs.ProviderName %>" SelectCommand="SELECT * FROM [Servicebooking]"></asp:SqlDataSource>
</asp:Content>
