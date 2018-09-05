/*
 * Directive app-sidebar
 */
(function() {

    var module = angular.module("app-sidebar-directive", []);

    module.directive("appSidebar", [
        function() {
            return {
                restrict: "E", 
                replace: true, 
                templateUrl: "views/app-sidebar.html"
            }
        }
    ]);

})();
/*
 * vim: ts=4 et nowrap autoindent
 */