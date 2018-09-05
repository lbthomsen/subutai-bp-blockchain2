/*
 * Main AngularJS Application
 */
(function () {

    var appName = "biab2";

    var app = angular.module(appName, [
        "ngRoute",
        "ngAnimate",
        "ngResource",
        "angularMoment",
        "angular-loading",
        "angular-head",
        "angular-inview", 
        "package-service",
        "app-header-directive",
        "app-sidebar-directive",
        "app-main-directive",
        "app-footer-directive",
        "ad-directive", 
        "inview-img-directive", 
        "static-route",
        "about-route"
    ]);

    app.config(["$logProvider", "HeadServiceProvider",
        function ($logProvider, headServiceProvider) {

            // This is where the HeadService default values are configured!
            headServiceProvider.setTitle("Lars' Subutai Site");
            headServiceProvider.setMetas({
                description: "Blockchain in a Box II",
                keywords: "subutai,cloud,p2p,blueprints,angular",
                author: "Lars Boegild Thomsen <lbthomsen@optdyn.com>",
                generator: "AngularJS"
            });

            // Fugly debug disable hack
            if (!window.location.port) {
                $logProvider.debugEnabled(false);
            }
        }
    ]);

    // Handle Google analytics - update on route change
    app.run(["$log", "$rootScope", "$location", "$window", "$timeout", "$route",
        function ($log, $rootScope, $location, $window, $timeout, $route) {
            
            $rootScope.$on("$routeChangeStart", function () {
                $rootScope.$emit("setLoading");
            });

            $rootScope.$on('$routeChangeSuccess', function () {

                $rootScope.$emit("resetLoading");

            });
        }
    ]);

})();
/*
 * vim: ts=4 et nowrap autoindent
 */
