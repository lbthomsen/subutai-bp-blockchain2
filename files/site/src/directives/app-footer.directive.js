/*
 * Directive app-footer
 */
(function() {

    var module = angular.module("app-footer-directive", []);

    module.controller("FooterController", ["$log", "PackageService",
        function ($log, packageService) {
            $log.debug("FooterController: starting");

            var that = this;
            that.package = {};

            packageService.getPackage(null, function (package) {
                angular.copy(package, that.package);
            })

        }
    ]);    

    module.directive("appFooter", [
        function() {
            return {
                restrict: "E", 
                replace: true, 
                templateUrl: "views/app-footer.html", 
                controller: "FooterController", 
                controllerAs: "footerCtrl"
            }
        }
    ]);

})();
/*
 * vim: ts=4 et nowrap autoindent
 */