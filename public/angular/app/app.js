'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'angular-loading-bar',
  'angularCSS',
  'ui.tinymce',
  'toastr',
    'yaru22.angular-timeago',
  'rzModule',
  'myApp.home',
  'myApp.about',
  'myApp.how_it_works',
  'myApp.how_it_works_service',
  'myApp.members',
  'myApp.messages',
  'angular-cookies',
  'myApp.terms',
  'myApp.policy',
  'myApp.get_profile_verifired',
  'myApp.swipe',
  'myApp.settings',
  'myApp.myProfile',
  'myApp.main',
  'myApp.viewProfile',
  'myApp.support',
  'myApp.support_service',
  'myApp.checkout1',
  'myApp.licences',
  'myApp.cart',
  'myApp.login',
  'myApp.admin_home_controller',
  'myApp.admin-list',
  'myApp.add-admin',
  'myApp.user-list',
  'myApp.faq-list',
  'myApp.add-faq',
  'myApp.manage-pages',
  'myApp.order_admin',
  'myApp.settingsAdmin',
  'myApp.home_service',
  'myApp.policy_service',
  'myApp.terms_service',
  'myApp.cart_service',
  'myApp.checkout1_service',
  'myApp.get_profile_verifired_service',
  'myApp.licence_service',
  'myApp.member_service',
  'myApp.messages_service',
  'myApp.my_profile_service',
  'myApp.settings_service',
  'myApp.swipe_service',
  'myApp.view_profile_service',
  'myApp.add_admin_service',
  'myApp.add_faq_service',
  'myApp.admin_list_service',
  'myApp.admin_home_service',
  'myApp.faq_list_service',
  'myApp.login_service',
  'myApp.manage_pages_service',
  'myApp.order_admin_service',
  'myApp.settings_admin_service',
  'myApp.user_list_service',
  'myApp.main_service',
  'ngMask'

])

.config(['$locationProvider', '$routeProvider','$httpProvider','timeAgoSettings', function($locationProvider, $routeProvider,$httpProvider,timeAgoSettings) {

  $locationProvider.hashPrefix('!');

  $routeProvider.when('/home', {
    templateUrl: 'angular/app/home/home.html',
    controller: 'HomeCtrl'
  })
  .when('/about', {
    templateUrl: 'angular/app/about/about.html',
    controller: 'AboutCtrl'
  })
    .when('/how_it_works', {
    templateUrl: 'angular/app/how_it_works/how_it_works.html',
    controller: 'HowItWorksCtrl'
  })
    .when('/terms', {
    templateUrl: 'angular/app/terms/terms.html',
    controller: 'TermsCtrl'
  })
    .when('/policy', {
    templateUrl: 'angular/app/policy/policy.html',
    controller: 'PolicyCtrl'
  })
    .when('/user/my-profile', {
    templateUrl: 'angular/app/user/my_profile/my_profile.html',
    controller: 'MyProfileCtrl'
  })
    .when('/user/settings', {
    templateUrl: 'angular/app/user/settings/settings.html',
    controller: 'SettingsCtrl'
  })
    .when('/user/member', {
    templateUrl: 'angular/app/user/member/member.html',
    controller: 'MembersCtrl'
  })
    .when('/user/messages', {
    templateUrl: 'angular/app/user/messages/messages.html',
    controller: 'MessagesCtrl'
  })
    .when('/user/get_profile_verifired', {
    templateUrl: 'angular/app/user/get_profile_verifired/get_profile_verifired.html',
    controller: 'GetProfileVerifiredCtrl'
  })
    .when('/user/swipe', {
    templateUrl: 'angular/app/user/swipe/swipe.html',
    controller: 'SwipeCtrl'
  })
    .when('/user/view_profile/:id', {
    templateUrl: 'angular/app/user/view_profile/view_profile.html',
    controller: 'ViewProfileCtrl'
  })
    .when('/user/checkout1', {
    templateUrl: 'angular/app/user/checkout1/checkout1.html',
    css: 'angular/app/shared/css/modal.css',
    controller: 'Checkout1Ctrl'
  })
    .when('/support', {
    templateUrl: 'angular/app/support/support.html',
    controller: 'SupportCtrl'
  })
    .when('/user/licences', {
    templateUrl: 'angular/app/user/licences/licences.html',
    controller: 'LicencesCtrl'
  })
    .when('/user/cart', {
    templateUrl: 'angular/app/user/cart/cart.html',
    controller: 'CartCtrl'
  })
    .when('/admin/login', {
    templateUrl: 'angular/app/admin/login/login.html',
    css: ['angular/app/shared/admin_css/style.css','angular/shared/admin_css/custom.css','angular/app/shared/admin_css/pager.css','angular/app/shared/admin_css/styles2.css'],
    controller: 'LoginCtrl'
  })
    .when('/admin/admin_home', {
    css: ['angular/app/shared/admin_css/style.css','angular/app/shared/admin_css/custom.css'],
    templateUrl: 'angular/app/admin/admin_home/admin_home.html',
    controller: 'AdminHomeCtrl'
  })
    .when('/admin/admin-list', {
    css: ['angular/app/shared/admin_css/style.css','angular/shared/admin_css/custom.css','angular/app/shared/admin_css/pager.css','angular/app/shared/admin_css/styles2.css'],
    templateUrl: 'angular/app/admin/admin-list/admin-list.html',
    controller: 'AdminListCtrl'
  })
    .when('/admin/add-admin', {
    css: ['angular/app/shared/admin_css/style.css','angular/shared/admin_css/custom.css','angular/app/shared/admin_css/pager.css','angular/app/shared/admin_css/styles2.css'],
    templateUrl: 'angular/app/admin/add-admin/add-admin.html',
    controller: 'AddAdminCtrl'
  })
    .when('/admin/user-list', {
    css: ['angular/app/shared/admin_css/styles2.css','angular/app/shared/admin_css/icon.css','angular/app/shared/admin_css/custom.css','angular/app/shared/admin_css/style.css'],
    templateUrl: 'angular/app/admin/user-list/user-list.html',
    controller: 'UserListCtrl'
  })
    .when('/admin/faq-list', {
    css: ['angular/app/shared/admin_css/style.css','angular/shared/admin_css/custom.css','angular/app/shared/admin_css/pager.css','angular/app/shared/admin_css/styles2.css'],
    templateUrl: 'angular/app/admin/faq-list/faq-list.html',
    controller: 'FaqListCtrl'
  })
    .when('/admin/add-faq', {
    css: ['angular/app/shared/admin_css/style.css','angular/shared/admin_css/custom.css','angular/app/shared/admin_css/pager.css','angular/app/shared/admin_css/styles2.css'],
    templateUrl: 'angular/app/admin/add-faq/add-faq.html',
    controller: 'AddFaqCtrl'
  })
    .when('/admin/settings', {
    css: ['angular/app/shared/admin_css/style.css','angular/shared/admin_css/custom.css','angular/app/shared/admin_css/pager.css','angular/app/shared/admin_css/styles2.css'],
    templateUrl: 'angular/app/admin/settings/settings.html',
    controller: 'SettingsAdminCtrl'
  })
    .when('/admin/order', {
    css: ['angular/shared/admin_css/custom.css','angular/app/shared/admin_css/style.css','angular/app/shared/admin_css/pager.css','angular/app/shared/admin_css/styles2.css'],
    templateUrl: 'angular/app/admin/order/order.html',
    controller: 'OrderCtrl'
  })
    .when('/admin/manage-pages', {
    css: ['angular/app/shared/admin_css/style.css','angular/shared/admin_css/custom.css','angular/app/shared/admin_css/pager.css','angular/app/shared/admin_css/styles2.css'],
    templateUrl: 'angular/app/admin/manage-pages/manage-pages.html',
    controller: 'ManagePagesCtrl'
  });


  $routeProvider.otherwise({redirectTo: '/home'});
  var interceptor401 = ['$q', '$window', '$location', '$rootScope','$injector', function($q, $window, $location, $injector,$rootScope) {
        return {
            'responseError': function(rejection,$rootScope) {
                if (rejection.status === 401 ) {
                    Cookies.expire('currentUser');
                    Cookies.expire('allDataForUser');
                    $location.path("/home");
                }
                return $q.reject(rejection);
            }
        };
    }];
  var interceptor400 = ['$q', '$window', '$location', '$rootScope','$injector', function($q, $window, $location, $injector) {
        return {
            'responseError': function(rejection,$rootScope) {
                if (rejection.status === 400 ) {
                }
                return $q.reject(rejection);
            }
        };
    }];
    var interceptor404 = ['$q', '$window', '$location', '$rootScope','$injector', function($q, $window, $location, $injector) {
        return {
            'responseError': function(rejection,$rootScope) {
                if (rejection.status === 404 ) {
                }
                return $q.reject(rejection);
            }
        };
    }];
    $httpProvider.interceptors.push(interceptor401);
    $httpProvider.interceptors.push(interceptor400);
    $httpProvider.interceptors.push(interceptor404);

}]).run(['Cookies','$http','$rootScope','$location',function(Cookies,$http,$rootScope,$location) {

  if (Cookies.get('user')) {
      $http.defaults.headers.common.Authorization = 'Bearer ' + Cookies.get('user');
  }

  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    var publicPages = ['/about','/home','/how_it_works','/policy','/support','/terms'] ;
    var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if(Cookies.get('user') && Cookies.get('role')=="User") {
            if($location.path()=='/admin/login'){
            }else if($location.path().substring(0,6)=='/admin'){
                $location.path('/home');
            }
        }
    if(restrictedPage && !Cookies.get('user')) {
        if(Cookies.get('role')=="Admin") {
          if($location.path().substring(0,5)=='/user'){
            $location.path('/home');
          }
        }
        else if($location.path()=='/admin/login'){
          
        }
        else if($location.path().substring(0,5)=='/user'||$location.path().substring(0,6)=='/admin'){
            $location.path('/home');
        }
    }

  });
}] );

