'use strict';

var InsuranceProfiling = angular.module('InsuranceProfiling', ['ngRoute','chart.js','ngMaterial','ngSanitize']);

InsuranceProfiling.config(function($routeProvider,$mdDateLocaleProvider) {

	$mdDateLocaleProvider.formatDate = function(date) {
	 return date ? moment(date).format('YYYY-MM-DD') : '';
	};

	$mdDateLocaleProvider.parseDate = function(dateString) {
	 var m = moment(dateString, 'YYYY-MM-DD', true);
	 return m.isValid() ? m.toDate() : new Date(NaN);
	};

	$routeProvider
	// route for the home page
	.when('/', {
		templateUrl : 'views/pages/about.html',
		controller  : 'aboutController'
	})

	// route for the about page
	.when('/about', {
		templateUrl : 'views/pages/about.html',
		controller  : 'aboutController'
	})

	// route for the login page
	.when('/login', {
		templateUrl : 'views/pages/login.html',
		controller  : 'loginController'
	})
	.when('/filter',
	{
		templateUrl : 'views/pages/filter.html',
		controller : 'filterController'
	})
	.when('/marketing',
	{
		templateUrl : 'views/pages/marketing.html',
		controller : 'marketingController'
	})
	.when('/lead',
	{
		templateUrl : 'views/pages/lead.html',
		controller : 'LeadController'
	})
	.when('/liveUserFeed',
	{
		templateUrl : 'views/pages/liveUserFeed.html',
		controller : 'LiveUserFeedController'
	})
	.when('/liveGraphs',
	{
		templateUrl : 'views/pages/liveGraphs.html',
		controller : 'LiveGraphController'
	})
	.when('/privacyPolicy',
	{
		templateUrl : 'views/pages/privacyPolicy.html',
		controller : 'PrivacyPolicyController'
	})
	.when('/termsOfService',
	{
		templateUrl : 'views/pages/termsOfService.html',
		controller : 'TermsOfServiceController'
	})
	.when('/signupLeadPage',
	{
		templateUrl : 'views/pages/signup.html',
		controller : 'facebook'
	})
	.when('/connect',
	{
		templateUrl : 'views/pages/connectPage.html',
		controller : 'ConnectPageController'
	})
	.when('/geochart',
	{
		templateUrl : 'views/pages/GeoChart.html',
		controller : 'geoController'
	})
  .otherwise(
  {
    redirectTo: '/'
  });
	;
});
