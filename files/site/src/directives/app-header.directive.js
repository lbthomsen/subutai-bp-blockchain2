/*
 * Directive app-header
 */
(function() {

    var module = angular.module("app-header-directive", []);

    module.directive("appHeader", [
        function() {
            return {
                restrict: "E", 
                replace: true, 
                templateUrl: "views/app-header.html"
            }
        }
    ]);

})();
/*
 * vim: ts=4 et nowrap autoindent
 */