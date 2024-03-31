<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pdfgen.aspx.cs" Inherits="MYPROJECT.User.pdfgen" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 930px;
        }
        .auto-style2 {
            width: 588px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:Button ID="Button1" runat="server" Text="Download Invoice" OnClick="Button1_Click" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl="~/User/Default.aspx">Go to home</asp:HyperLink>
            <asp:Panel ID="Panel1" runat="server">
                <table border="1">
                    <tr>
                        <td style="text-align:center" class="auto-style1">Service Receipt&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </td>
                    </tr>
                    <tr>
                        <td class="auto-style1">
                            <br />
                            <br />
                            Service Date:<asp:Label ID="Label2" runat="server" Text="Label"></asp:Label> 
                        </td>
                    </tr>
                    <tr>
                        <td class="auto-style1">
                            <table>
                                <tr>
                                    <td class="auto-style2">
                                        Customer Address: 
                                        <asp:Label ID="Label3" runat="server" Text="Label"></asp:Label>

                                    </td>
                                    <td>
                                        &nbsp; ShowroomAddress:<br />No 666, Main Road, A/P Rani Faliya Vansda - 396580,Opposite Market Yard +912630222821<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </td>
                                </tr>
                            </table>


                        </td>
                    </tr>
                    <tr>
                        <td class="auto-style1">Name:<asp:Label ID="Label4" runat="server" Text="Label"></asp:Label></td>
                    </tr>
                    <tr>
                        <td class="auto-style1">Bike NO:<asp:Label ID="Label5" runat="server" Text="Label"></asp:Label></td>
                    </tr>
                    <tr>
                        <td class="auto-style1">Phone No:<asp:Label ID="Label6" runat="server" Text="Label"></asp:Label></td>
                    </tr>
                    <tr>
                        <td class="auto-style1">Bike Model:<asp:Label ID="Label7" runat="server" Text="Label"></asp:Label></td>
                    </tr>
                     <tr>
                        <td class="auto-style1">Service Suggesstion:<asp:Label ID="Label8" runat="server" Text="Label"></asp:Label></td>
                    </tr>
                     <tr>
                        <td align="center" style="color:red" class="auto-style1" >Show this Receipt&nbsp;at showroom for service</td>
                    </tr>
                </table>


            </asp:Panel>
        </div>
    </form>
</body>
</html>
