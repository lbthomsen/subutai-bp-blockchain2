/*
 * Directive app-main
 */
(function() {

    var module = angular.module("app-main-directive", []);

    module.directive("appMain", [
        function() {
            return {
                restrict: "E", 
                replace: true, 
                templateUrl: "views/app-main.html"
            }
        }
    ]);

})();
/*
 * vim: ts=4 et nowrap autoindent
 */