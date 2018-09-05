/*
 * Static Routes
 */
(function () {

    var module = angular.module("static-route", []);

    module.config(["$routeProvider",
        function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/home.html"
                })
                .otherwise({
                    redirectTo: "/"
                });
        }
    ]);

})();
/*
 * vim: ts=4 et nowrap autoindent
 */
