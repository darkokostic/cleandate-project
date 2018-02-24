<!DOCTYPE html>
<html lang="{{ config('app.locale') }}" ng-app="myApp">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- FAV ICON!!!!! -->
        <!-- <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
        <link rel="icon" href="favicon.ico" type="image/x-icon"> -->
        <!-- BOOTSTRAP -->
        <link rel="stylesheet" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">

        <link rel="stylesheet" href="css/roboto/roboto-fontface.css">
        <link rel="stylesheet" href="css/roboto-condensed/roboto-condensed-fontface.css">
        <link rel="stylesheet" href="css/roboto-slab/roboto-slab-fontface.css">
        <link rel="stylesheet" type="text/css" href="angular/app/bower_components/angular-toastr/dist/angular-toastr.min.css" />
        <link rel="stylesheet" type="text/css" href="angular/app/bower_components/angularjs-slider/dist/rzslider.min.css" />
        <link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css">
        
        <!-- SCRIPT -->
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/scroll.js"></script>
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <link rel="stylesheet" href="/resources/demos/style.css">
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <!-- CSS -->
        <link rel="stylesheet" type="text/css" href="angular/app/shared/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="angular/app/shared/css/style.css">
        <link rel="stylesheet" type="text/css" href="angular/app/shared/css/ui.css">
        <link rel="stylesheet" type="text/css" href="angular/app/user/licences/licences.css">
        <link rel="stylesheet" type="text/css" href="angular/app/admin/admin-list/admin-list.css">

        <link rel='stylesheet' href='angular/node_modules/angular-loading-bar/build/loading-bar.min.css' type='text/css' media='all' />
        <title>{{ config('app.name') }}</title>
    </head>
    <body ng-controller="MainCtrl" class="fixed-left widescreen">
        <div ng-cloak>
        <header ng-if="checkLocation()"> 
            <div class="container" >
                <div class="row">
                    <div class="col-sm-8">
                        <nav class="navbar navbar-inverse nav-header">
                            <div class="">
                                <a href="/#!/home" class="logo"> <img src="images/home-assets/header-logo-one.png" class="logo_header" alt="logo" ng-click="loginOnPages=true"> </a>
                                <div class="navbar-header abc">
                                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span class="icon-bar"></span><span class="icon-bar"></span> <span class="icon-bar"></span> </button>
                                </div>
                                <div class="navbar-collapse collapse" id="myNavbar">
                                    <ul class="nav navbar-nav menu-list">
                                        <li ng-class="{active: isActive('/about')}">
                                            <a href="/#!/about" ng-click="loginOnPages=true">ABOUT US</a>
                                        </li>
                                        <li ng-class="{active: isActive('/how_it_works')}">
                                            <a href="/#!/how_it_works" ng-click="loginOnPages=false">HOW IT WORKS</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div class="col-sm-4">
                        <div class="header-btn">
                            <a ng-if="loginOnPages" href="" data-toggle="modal" data-target="#myModal" class="login-btn" >LOGIN</a>
                            <a ng-if="!loginOnPages" href="" data-toggle="modal" data-target="#myModal" class="login-btn black-login-btn" >LOGIN</a>
                            <a href="" data-toggle="modal" data-target="#myModal" class="joinUs-btn">JOIN US</a>
                        </div>
                    </div>
                </div>
            </div>
                <div id="myModal" class="modal fade"> 
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                            </div>
                            <div class="modal-body">
                                <div class="login-main">
                                    <div class="middle-main">
                                        <div class="wrap">
                                            <div class="middle-sec-login">
                                                <h1>Anonymously “Like” or “Pass” on people Apex suggests </h1>
                                                <a href="/login/facebook" class="login-fb-btn">Login with Facebook</a>
                                                <h2 class="post">We don’t post anything on Facebook</h2>
                                            </div>
                                        <p class="Privacy-policy">
                                            <strong>By continuing, you agree with our 
                                                <a ng-click="goToTerms();loginOnPages=false;" data-dismiss="modal">Terms Of Service</a> and <a ng-click="goToPolicy()" data-dismiss="modal">Privacy Policy</a>
                                            </strong>
                                        </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </header>
        <!-- HOME HEADER -->
        <!-- USER HEADER -->
        <header class="chat-header" ng-if="checkLocationUser()">
            <div class="header-bottom" >
                <div class="container">
                    <div class="row">
                        <div class="col-sm-4 col-xs-4">        
                            <a  class="header-logo" href="/#!/user/member">
                            <img src="images/icons/wht-logo.png" class="chat-logo" alt=""></a>
                        </div>
                        <div class="col-sm-8 col-xs-8 text-right">
                            <div class="usr-control"> <a class="usr-data" href="">
                                <label class="user-name">@{{user.vFirstName}} <span class="last-name"></span></label>
                                <img class="usr-img" ng-src="@{{user.tImage}}"><img src="images/chat-images/drp-cio.png" alt=""> </a>
                                <div class="sub-menu-holder">
                                    <ul>
                                        <li><a href="/#!/user/my-profile">My Profile</a></li>
                                        <li><a href="/#!/user/settings">Setting</a></li>
                                        <li><a href="/#!/user/get_profile_verifired">Get Profile Verifired</a></li> 
                                        <li><a href="" ng-click="logout()">Log Out</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- ADMIN -->
        <header ng-if="checkLocationAdmin() && !checkForAdminLogin()">
            <div class="topbar">
                <div class="topbar-left">
                    <div class="topbar-left hidden-xs hidden-sm">
                        <div class="text-center"> 
                            <a href="" class="logo"><img src="images/home-assets/header-logo-one.png" style="height: 40px;"></a>
                        </div>
                    </div>
                </div>
                <div class="navbar navbar-default" role="navigation">
                    <div class="container">
                    <button id="menu-toggle" type="button" class="button-menu-mobile open-left waves-effect waves-light"> <i class="fa fa-bars" aria-hidden="true"></i> </button>
                        <div class="">
                            <ul class="nav navbar-nav navbar-right pull-right">
                                <li class="dropdown"><a href="" class="dropdown-toggle profile waves-effect waves-light" data-toggle="dropdown" aria-expanded="true"> <img src="images/chat-images/usr-img.png" alt="user-img" class="img-circle"> <span class="profile-username">admin<br>
                                    <small>Admin</small> </span> </a>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li><a href="" class="dropdown-item"> Profile</a></li>
                                        <li class="divider"></li>
                                        <li><a href="" class="dropdown-item" ng-click="logout()"> Logout</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        
        <!-- Sidebar -->
        <div id="wrapper" class="active" ng-if="checkLocationAdmin() && !checkForAdminLogin()">
        <!-- <div class="overlay"></div> -->
        <nav class="sidebar-nav" id="sidebar-wrapper" role="navigation">
            <div class="left side-menu">
            <!-- <div class="stylelimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 500px;">
            <div class="sidebar-inner slimscrollleft" style="overflow: hidden; width: auto; height: 500px;">  -->



            <div class="left side-menu wrapper" ng-if="checkLocationAdmin()">
            <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 540px;">

                <div id="sidebar-menu">
                <ul>
                    <li>
                        <a href="/#!/admin/admin_home" ng-class="{active: isActive('/admin/admin_home')}" class="waves-effect"><i class="fa fa-home" aria-hidden="true"></i><span> Dashboard</span></a>
                    </li>
                    <li>
                        <a href="/#!/admin/order" ng-class="{active: isActive('/admin/order')}" class="waves-effect "><i class="fa fa-shopping-cart"></i><span> Order</span></a>
                    </li>
                    <li>
                        <a ng-class="{active: isActive('/admin/admin-list') || isActive('/admin/add-admin')}" href="/#!/admin/admin-list" class="waves-effect collapsed" data-toggle="collapse" data-target=""><i class="fa fa-user-secret"></i> <span> Manager Admin </span> <span class="pull-right"><i class="mdi mdi-plus"></i></span>
                        </a>
                        <ul class="list-unstyled collapse navbar-collapse" id="dropdown-manager">
                             <li><a href="/#!/admin/admin-list" class="dropdown-item">Admin List</a></li>
                             <li><a href="/#!/admin/add-admin" class="dropdown-item">Add Admin</a></li>
                        </ul>
                    </li>
                    <li><a ng-class="{active: isActive('/admin/user-list')}" href="/#!/admin/user-list" class="waves-effect "><i class="fa fa-users"></i> <span> User List </span> <span class="pull-right"><i class="mdi mdi-plus"></i></span></a>
                    </li>
                    <li class="has_sub"> <a ng-class="{active: isActive('/admin/faq-list') || isActive('/admin/add-faq')}" href="/#!/admin/faq-list" class="waves-effect collapsed" data-target="#dropdown-faq"><i class="fa fa-question-circle"></i> <span> Manage FAQ's </span> <span class="pull-right"><i class="mdi mdi-plus"></i></span></a>
                        <ul class="list-unstyled collapse navbar-collapse" id="dropdown-faq">
                             <li><a href="/#!/admin/faq-list" class="dropdown-item">FAQ's List</a></li>
                             <li><a href="/#!/admin/add-faq" class="dropdown-item">Add FAQ's</a></li>
                        </ul>
                    </li>  
                    <li > <a ng-class="{active: isActive('/admin/manage-pages')}" href="/#!/admin/manage-pages" class="waves-effect "><i class="fa fa-file"></i> <span> Manage Pages </span> <span class="pull-right"><i class="mdi mdi-plus"></i></span></a>
                    </li> 
                    <li ><a ng-class="{active: isActive('/admin/settings')}" href="/#!/admin/settings" class="waves-effect"><i class=" fa fa-cogs"></i><span> Setting </span></a></li> 
                </ul>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="slimScrollBar" style="background: rgb(187, 187, 187); width: 7px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 423px; visibility: visible;"></div><div class="slimScrollRail" style="width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div>
            </div>
            
        </div>
        </nav>
        <!-- /#sidebar-wrapper -->
        <style>
            .row{
                margin-left:0px;
                margin-right:0px;
            }

            #wrapper {
                /*padding-left: 70px;*/
                transition: all .4s ease 0s;
                height: 100%
            }

            #sidebar-wrapper {
                margin-left: -311px;
                left: 70px;
                width: 150px;
                position: fixed;
                height: 100%;
                z-index: 10000;
                transition: all .4s ease 0s;
            }

            .sidebar-nav {
                display: block;
                float: left;
                width: 150px;
                list-style: none;
                margin: 0;
                padding: 0;
            }
            #page-content-wrapper {
                padding-left: 0;
                margin-left: 0;
                width: 100%;
                height: auto;
            }
            #wrapper.active {
                padding-left: 150px;
            }
            #wrapper.active #sidebar-wrapper {
                left: 311px;
            }

            #page-content-wrapper {
              width: 100%;
            }
            .sidebar_name {
                padding-top: 25px;
                color: #fff;
                opacity: .7;
            }

            .sidebar-nav li {
              line-height: 40px;
              text-indent: 20px;
            }

            .sidebar-nav li a {
              color: #999999;
              display: block;
              text-decoration: none;
            }

            .sidebar-nav li a:hover {
              color: #fff;
              background: rgba(255,255,255,0.2);
              text-decoration: none;
            }

            .sidebar-nav li a:active,
            .sidebar-nav li a:focus {
              text-decoration: none;
            }

            .sidebar-nav > .sidebar-brand {
              height: 65px;
              line-height: 60px;
              font-size: 18px;
            }

            /*.sidebar-nav > .sidebar-brand a {
              color: #999999;
            }*/

            .sidebar-nav > .sidebar-brand a:hover {
              color: #fff;
              background: none;
            }

            #main_icon
            {
                float:right;
               padding-right: 65px;
               padding-top:20px;
            }
            .sub_icon
            {
                float:right;
               padding-right: 65px;
               padding-top:10px;
            }
            .content-header {
              height: 65px;
              line-height: 65px;
            }

            .content-header h1 {
              margin: 0;
              margin-left: 20px;
              line-height: 65px;
              display: inline-block;
            }

           /* @media (max-width:767px) {
                #wrapper {
                padding-left: 70px;
                transition: all .4s ease 0s;
            }
            #sidebar-wrapper {
                left: 70px;
            }
            #wrapper.active {
                padding-left: 150px;
            }
            #wrapper.active #sidebar-wrapper {
                left: 150px;
                width: 150px;
                transition: all .4s ease 0s;
            }
            }*/
        </style>
        <script>
            $("#menu-toggle").click(function(e) {
                e.preventDefault();
                $("#wrapper").toggleClass("active");
                var marginLeft = $(".content-page").css('margin-left');
                if(marginLeft == "240px") {
                    $(".content-page").css("margin-left", "0");
                } else {
                    $(".content-page").css("margin-left", "240px");
                }
                
                // $(".topbar .topbar-left").css("display", "none");
            });
        </script>

        <!-- Page Content -->
        <div id="page-content-wrapper">
            <button type="button" class="hamburger is-closed" data-toggle="offcanvas">
                <span class="hamb-top"></span>
                <span class="hamb-middle"></span>
                <span class="hamb-bottom"></span>
            </button>
        </div>
        <!-- /#page-content-wrapper -->

    </div>
        <!-- ADMIN -->
        <!-- USER HEADER -->
        <div class="container" ng-if="checkLocationUser()" >
            <ul class="nav nav-tabs _TABS_" >
                <li ng-class="{active: isActive('/user/member')}"> 
                    <a href="/#!/user/member">
                        <span class="tab-span"><i class="fa fa-diamond" aria-hidden="true"></i>HOME</span>
                    </a> 
                </li>
                <li ng-class="{active: isActive('/user/messages')}" id="message-li"> 
                    <a href="/#!/user/messages">
                        <span class="tab-span">
                            <i class="fa fa-comment-o" aria-hidden="true"></i>MESSAGES
                            <span class="" id="message-count">
                            </span>
                        </span>
                    </a> 
                </li>
                <li ng-class="{active: isActive('/user/swipe')}"> 
                    <a href="/#!/user/swipe">
                        <span class="tab-span"><i class="fa fa-heart-o" aria-hidden="true"></i>SWIPE</span>
                    </a>
                </li>
            </ul>
            <div class="panel-group visible-xs" id="Kp6mF-accordion"></div>
        </div>

   <!-- USER HEADER -->
            <div ng-view></div>
        <div class="pop-up-match">
            </div>
                <footer ng-if="checkLocation() || checkLocationUser()">
                    <div class="container clearfix" >
                        <div class="row">
                            <div class="col-xs-12 col-sm-8">
                                <a href="" class="footer-logo"> <img src="images/home-assets/footer-logo.png" class="logo_header" alt="logo"> </a>
                                <div class="footer-list clearfix">
                                    <ul class="foot-list">
                                        
                                        <li>
                                            <a href="/#!/terms">TERMS</a>
                                        </li>
                                        <li>
                                            <a href="/#!/support">SUPPORT</a>
                                        </li>
                                    </ul>
                                    <div class="social-list">
                                        <h4> Connect with us </h4>
                                        <ul>
                                                @foreach($footer as $f)
                                            <li>
                                                <a target="_blank" href="{{$f->facebook}}"><img src="images/home-assets/facebook.png" class="footer-social" alt="social"></a>
                                            </li>
                                            <li>
                                                <a target="_blank" href="{{$f->twitter}}"><img src="images/home-assets/twitter.png" class="footer-social" alt="social"></a>
                                            </li>
                                            <li>
                                                <a target="_blank" href="{{$f->google}}"><img src="images/home-assets/google-plus.png" class="footer-social" alt="social"></a>
                                            </li>
                                            <li>
                                                <a target="_blank" href="{{$f->youtube}}"><img src="images/home-assets/youtube.png" class="footer-social" alt="social"></a>
                                            </li>
                                            <li>
                                                <a target="_blank" href="{{$f->tumbler}}"><img src="images/home-assets/tumblr.png" class="footer-social" alt="social"></a>
                                            </li>
                                                @endforeach
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <div class="footer-app">
                                    <div class="app-sec-btn">
                                        <a target="_blank" href="#"><img src="images/home-assets/app-footer.png" class="footer-app-btn" alt="social"></a> <a target="_blank" href="#"><img src="images/home-assets/google-footer.png" class="footer-app-btn" alt="social"></a>
                                    </div>
                                    <p>CleanDate.com © 2017 Privacy Terms</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
                  <!-- FOOTER FOR ADMIN -->
                <footer class="footer" ng-if="checkLocationAdmin()"> 
                © 2017 Apex-Admin - All Rights Reserved. 
                </footer>
            <div class="notification-holder scrollbox">
                <div class="noti-child-holder">
                </div>
            </div>
        </div>
    </body>
    
    <!-- BOOTSTRAP -->
    
    <script type="text/javascript" src="{{ asset('angular/app/bower_components/tinymce/tinymce.js') }}"></script>
    
    <!-- ANGULAR -->
    <script type="text/javascript" src="{{ asset('angular/app/bower_components/angular/angular.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/bower_components/angular-route/angular-route.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/node_modules/angular-css/angular-css.min.js') }}"></script>
    <script type='text/javascript' src='angular/node_modules/angular-loading-bar/build/loading-bar.min.js'></script>
    
    <script type="text/javascript" src="js/bootstrap-tabcollapse.js"></script>
    <script type="text/javascript" src="js/lazyload.js"></script>
    <script type="text/javascript" src="js/jquery-ui.js"></script>
    <script type="text/javascript" src="js/touch.js"></script>
    <script type="text/javascript" src="js/jquery.Jcrop.js"></script>
    <script type="text/javascript" src="js/myapp.js"></script>
    <script type="text/javascript" src="js/fblogin.js"></script>
    <script type="text/javascript" src="js/jquery.mCustomScrollbar.concat.min.js"></script>
    <script type="text/javascript" src="js/script.js?t=1491842542"></script>
    <script type="text/javascript" src="js/wave.js"></script>
    <script type="text/javascript" src="js/crop-script.js"></script>
    <script type="text/javascript" src="{{ asset('angular/app/bower_components/angular-ui-tinymce/src/tinymce.js') }}"></script>
    <script src="{{ asset('angular/app/bower_components/angular-cookies/cookies.js') }}"></script>
    <link rel="stylesheet" type="text/css" href="{{ asset('angular/node_modules/bootstrap-slider/dist/css/bootstrap-slider.min.css') }}">
    <script type="text/javascript" src="{{ asset('angular/node_modules/bootstrap-slider/dist/bootstrap-slider.min.js') }}"></script>
    <!-- <script src="http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false"></script> -->
    <script type="text/javascript" src="angular/app/bower_components/angular-toastr/dist/angular-toastr.tpls.min.js"></script>
    <script type="text/javascript" src="angular/app/bower_components/angularjs-slider/dist/rzslider.min.js"></script>
    <script type="text/javascript" src="angular/app/bower_components/ngMask/dist/ngMask.js"></script>
    <script type="text/javascript" src="angular/app/bower_components/ngMask/dist/ngMask.min.js"></script>
    <script type="text/javascript" src="angular/app/bower_components/angular-timeago/dist/angular-timeago.js"></script>

    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBnICk37tkvyjby446VXMfe1c0-A34AUHU&callback=initMap">
    </script>
    <script type="text/javascript" src="//cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js"></script>

    <script src="angular/app/bower_components/ng-file-upload/ng-file-upload-shim.min.js"></script> <!-- for no html5 browsers support -->
    <script src="angular/app/bower_components/ng-file-upload/ng-file-upload.min.js"></script>

    <!-- JS -->
    <!-- USER AND HOME -->
    <script type="text/javascript" src="{{ asset('angular/app/app.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/shared/controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/shared/service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/home/home.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/home/home.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/terms/terms.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/terms/terms.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/policy/policy.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/policy/policy.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/messages/messages.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/messages/messages.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/about/about.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/how_it_works/how_it_works.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/how_it_works/how_it_works.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/support/support.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/support/support.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/settings/settings.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/settings/settings.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/my_profile/my_profile.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/my_profile/my_profile.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/swipe/swipe.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/swipe/swipe.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/get_profile_verifired/get_profile_verifired.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/get_profile_verifired/get_profile_verifired.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/member/member.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/member/member.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/view_profile/view_profile.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/view_profile/view_profile.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/checkout1/checkout1.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/checkout1/checkout1.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/licences/licences.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/licences/licences.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/cart/cart.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/user/cart/cart.service.js') }}"></script>
    
    <!-- ADMIN -->
    <script type="text/javascript" src="{{ asset('angular/app/admin/login/login.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/admin/login/login.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/admin/admin_home/admin_home.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/admin/admin_home/admin_home.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/admin/admin-list/admin-list.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/admin/admin-list/admin-list.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/admin/add-admin/add-admin.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/admin/add-admin/add-admin.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/admin/user-list/user-list.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/admin/user-list/user-list.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/admin/faq-list/faq-list.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/admin/faq-list/faq-list.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/admin/add-faq/add-faq.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/admin/add-faq/add-faq.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/admin/settings/settings.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/admin/settings/settings.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/admin/manage-pages/manage-pages.controller.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/admin/manage-pages/manage-pages.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/admin/order/order.service.js') }}"></script>
    <script type="text/javascript" src="{{ asset('angular/app/admin/order/order.controller.js') }}"></script>
    

    <script type="text/javascript" src="js/lightbox-plus-jquery.min.js"></script>
    <script type="text/javascript" src="angular/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/modernizr.min.js"></script>
    <script type="text/javascript" src="js/detect.js"></script>
    <script type="text/javascript" src="js/fastclick.js"></script>
    <script type="text/javascript" src="js/jquery.slimscroll.js"></script>
    <script type="text/javascript" src="js/jquery.blockUI.js"></script>
    <script type="text/javascript" src="js/waves.js"></script>
    <script type="text/javascript" src="js/wow.min.js"></script>
    <script type="text/javascript" src="js/jquery.nicescroll.js"></script>
    <script type="text/javascript" src="js/jquery.scrollTo.min.js"></script>
    <script type="text/javascript" src="js/validate.js"></script>

    <script type="text/javascript">
        $(document).on('change', ':file', function() {
            var input = $(this),
                numFiles = input.get(0).files ? input.get(0).files.length : 1,
                label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
            input.trigger('fileselect', [numFiles, label]);
        });
    </script>

    <div class="modal fade" id="skrillModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">

        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form id="skrill-form" action="{{url('api/order-post')}}" method="POST" name="myForm">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                    </div>
                    <div class="modal-body">
                        <div   >
                            <div class="group ">
                                <label >
                                    <span >Name</span>
                                    <input id="stripe_cardholder-name"  type="text" name="cardholder-name" class="field" placeholder="Jane Doe" />
                                </label>
                                <label  >
                                    <span >Phone</span>
                                    <input class="field" placeholder="(123) 456-7890" type="number" />
                                </label>
                            </div>
                            <div class="group ">
                                <label >
                                    <span >Card</span>
                                    <div id="card-element" class="field"></div>
                                </label>
                            </div>
                            <input id="stripe_t"   type="text" name="stripe" hidden>
                            <input id="stripe_user"  type="text" name="stripe_user" hidden>

                            <div class="outcome">
                                <div class="error"></div>
                                <div class="success ">
                                    Success! Your Stripe token is <span class="token"></span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="submitBtnSkrill" type="submit" ng-disabled="myForm.$invalid">Pay $139</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="https://js.stripe.com/v3/"></script>
    <script >
        var stripe = Stripe('pk_test_RSDQV6kUOobC49jBVAkWGoiy');
        var elements = stripe.elements();

        var card = elements.create('card', {
            style: {
                base: {
                    iconColor: '#666EE8',
                    color: '#31325F',
                    lineHeight: '40px',
                    fontWeight: 300,
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSize: '15px',

                    '::placeholder': {
                        color: '#CFD7E0',
                    },
                },
            }
        });
        card.mount('#card-element');

        function setOutcome(result) {
            var successElement = document.querySelector('.success');
            var errorElement = document.querySelector('.error');
            successElement.classList.remove('visible');
            errorElement.classList.remove('visible');

            if (result.token) {
                // Use the token to create a charge or a customer
                // https://stripe.com/docs/charges
                var input = document.getElementById('stripe_t');
                input.value =  result.token.id;
                var form = document.getElementById('skrill-form');
                console.log(form);
                form.submit();
                document.getElementById("submitBtnSkrill").disabled = true;
                document.getElementById("checkoutButton").disabled = true;
//            successElement.querySelector('.token').textContent = result.token.id;
//            successElement.classList.add('visible');
            } else if (result.error) {
                errorElement.textContent = result.error.message;
                errorElement.classList.add('visible');
            }
        }

        card.on('change', function(event) {
            setOutcome(event);
        });

        document.querySelector('#skrill-form').addEventListener('submit', function(e) {
            e.preventDefault();
            var form = document.querySelector('#skrill-form');
            var extraDetails = {
                name: document.getElementById('stripe_cardholder-name').value,
            };
            stripe.createToken(card, extraDetails).then(setOutcome);
        });
    </script>

</html>
