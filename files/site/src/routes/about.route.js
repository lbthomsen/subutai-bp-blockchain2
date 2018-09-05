/*
 * About Route
 */
(function () {

    var module = angular.module("about-route", []);

    module.controller("AboutController", ["$log", "PackageService",
        function ($log, packageService) {
            $log.debug("AboutController: starting");

            var that = this;
            that.package = {};
            that.packages = [];

            packageService.getPackage(null, function (package) {
                angular.copy(package, that.package);

                Object.keys(package.dependencies).forEach(function (key) {
                    packageService.getPackage(key, function (package) {
                        that.packages.push(package);
                    });
                });

            })

        }
    ]);

    module.config(["$routeProvider",
        function ($routeProvider) {
            $routeProvider
                .when("/about", {
                    templateUrl: "views/about.html",
                    controller: "AboutController",
                    controllerAs: "aboutCtrl"
                })
        }
    ]);

})();
/*
 * vim: ts=4 et nowrap autoindent
 */