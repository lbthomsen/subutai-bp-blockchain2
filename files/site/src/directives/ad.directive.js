/*
 * Directive ad
 */
(function() {

    var module = angular.module("ad-directive", []);
    
    module.controller("AdController", ["$log", "$scope", "$window", 
        function($log, $scope, $window) {
            $log.debug("AdController: starting - scope = %o", $scope);
            
            (adsbygoogle = $window.adsbygoogle || []).push({});
            
        }
    ]);

    module.directive("ad", [
        function() {
            return {
                restrict: "E", 
                replace: true, 
                scope: {
                    foo: "@", 
                    adClient: "@", 
                    adSlot: "@", 
                    adFormat: "@", 
                    fullWidthResponsive: "@"
                }, 
                controller: "AdController", 
                controllerAs: "adCtrl",
                template: '<ins class="adsbygoogle" style="display:block" data-add-client="{{adClient}} data-ad-slot="{{adSlot}}" data-ad-format="{{adFormat}}" data-full-width-responsive="{{fullWidthResponsive}}"></ins>'
            };
        }
    ]);

})();
/*
 * vim: ts=4 et nowrap autoindent
 */