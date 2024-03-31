<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="MYPROJECT.Admin.Dashboard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"/>
    <style>
        .card{
            background-color:#00ff00;
            border-radius: 10px;
            border:1px;
            position:relative;
            margin-bottom:30px;
            box-shadow:0 0.46875rem 2.1875rem rgba(90, 97, 105, 0.1), 0 0.9375rem 1.40625rem rgba(90, 97, 105, 0.1), 0 0.25rem rgba(90, 97, 105, 0.1), 0.0.125rem 0.1875rem rgba(90, 97, 105, 0.1);
        }

        .l-bg-cherry{
            background: linear-gradient(to right, #ffa500,  #ffa500) !important;
            color: 	#000000;
        }

        .l-bg-blue-dark{
            background: linear-gradient(to right, 	#0000ff, #ffa500) !important;
            color: 	#000000;
        }

        .l-bg-green-dark{
            background: linear-gradient(to right, #ffa500, 	#0000ff) !important;
            color: #00ff00;
        }

        .l-bg-orange-dark{
            background: linear-gradient(to right, 	#0000ff, #ffa500) !important;
            color: #00ff00;
        }

        .card .card-statistic-3 .card-icon-large .fas, .card .card-statistic-3 .card-icon-large .far, .card .card-statistic-3 .card-icon-large .fab, .card .card-statistic-3 .card-icon-large .fal{
            font-size:110px;
        }

        .card .card-statistic-3 .card-icon {
            text-align:center;
            line-height:50px;
            margin-left:15px;
            color:#000;
            position:absolute;
            right:-5px;
            top:20px;
            opacity:0.1;
        }

        .l-bg-cyan{
            background: linear-gradient(135deg, #289cf5, #84c0ec) !important;
            color:#fff;
        }

        .l-bg-green{
            background: linear-gradient(135deg, #23bdb8 0%, #43e794 100%) !important;
            color:#fff;
        }

        .l-bg-orange{
            background: linear-gradient(to right, #f9900e, #ffba56) !important;
            color:#fff;
        }

        .l-bg-cyan{
            background: linear-gradient(135deg, #289cf5, #84c0ec) !important;
            color:#fff;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 <div class="container pt-4">
       <div class="row">
           <div class="col-12 pb-3">
               <h2 class="text-center">Dashboard</h2>
           </div>
           
           <div class="col-md-10 mx-auto">
               <div class="row">
                   
                      <div class="col-xl-3 col-lg-6">
                       <div class="card l-bg-cherry">
                           <div class="card-statistic-3 p-4">
                               <div class="card-icon card-icon-large">
                                   <i class="fas fa-categories pr-2"></i>
                               </div>
                               <div class="mb-4">
                                   <h5 class="card-title mb-0">Categories</h5>
                               </div>
                               <div class="row-align-items-center mb-2 d-flex">
                                   <div class="col-8">
                                       <h2 class="d-flex align-items-center mb-0"></h2>
                                       <% Response.Write(Session["Categories"]); %>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>

                      <div class="col-xl-3 col-lg-6">
                       <div class="card l-bg-cherry">
                           <div class="card-statistic-3 p-4">
                               <div class="card-icon card-icon-large">
                                   <i class="fas fa-products pr-2"></i>
                               </div>
                               <div class="mb-4">
                                   <h5 class="card-title mb-0">Products</h5>
                               </div>
                               <div class="row-align-items-center mb-2 d-flex">
                                   <div class="col-8">
                                       <h2 class="d-flex align-items-center mb-0"></h2>
                                       <% Response.Write(Session["Products"]); %>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>

                      <div class="col-xl-3 col-lg-6">
                       <div class="card l-bg-cherry">
                           <div class="card-statistic-3 p-4">
                               <div class="card-icon card-icon-large">
                                   <i class="fas fa-orders pr-2"></i>
                               </div>
                               <div class="mb-4">
                                   <h5 class="card-title mb-0">Orders</h5>
                               </div>
                               <div class="row-align-items-center mb-2 d-flex">
                                   <div class="col-8">
                                       <h2 class="d-flex align-items-center mb-0"></h2>
                                       <% Response.Write(Session["Orders"]); %>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>

                   <div class="col-xl-3 col-lg-6">
                       <div class="card l-bg-cherry">
                           <div class="card-statistic-3 p-4">
                               <div class="card-icon card-icon-large">
                                   <i class="fas fa-users pr-2"></i>
                               </div>
                               <div class="mb-4">
                                   <h5 class="card-title mb-0">Users</h5>
                               </div>
                               <div class="row-align-items-center mb-2 d-flex">
                                   <div class="col-8">
                                       <h2 class="d-flex align-items-center mb-0"></h2>
                                       <% Response.Write(Session["Users"]); %>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>

                   <div class="col-xl-3 col-lg-6">
                       <div class="card l-bg-cherry">
                           <div class="card-statistic-3 p-4">
                               <div class="card-icon card-icon-large">
                                   <i class="fas fa-amounts pr-2"></i>
                               </div>
                               <div class="mb-4">
                                   <h5 class="card-title mb-0">Sold Amount</h5>
                               </div>
                               <div class="row-align-items-center mb-2 d-flex">
                                   <div class="col-8">
                                       <h2 class="d-flex align-items-center mb-0"></h2>
                                       ₹0
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>

                   <div class="col-xl-3 col-lg-6">
                       <div class="card l-bg-cherry">
                           <div class="card-statistic-3 p-4">
                               <div class="card-icon card-icon-large">
                                   <i class="fas fa-comments pr-2"></i>
                               </div>
                               <div class="mb-4">
                                   <h5 class="card-title mb-0">Contacts</h5>
                               </div>
                               <div class="row-align-items-center mb-2 d-flex">
                                   <div class="col-8">
                                       <h2 class="d-flex align-items-center mb-0"></h2>
                                       <% Response.Write(Session["Contact"]); %>
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
