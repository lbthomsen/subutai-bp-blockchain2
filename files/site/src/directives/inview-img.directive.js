/*
 * Directive inview-img
 */
(function() {

    var module = angular.module("inview-img-directive", []);
    
    module.controller("InviewImgController", ["$log", "$scope", "$window", 
        function($log, $scope, $window) {
            $log.debug("InviewImgController: starting - scope = %o", $scope);
            
            var that = this;
            that.imgSrc="img/camera.png";
            
            that.isInView = function(inView) {
                $log.debug("InviewImgController: isInView %o", inView);
                
                that.imgSrc = $scope.imgSrc;
            };
            
        }
    ]);

    module.directive("inviewImg", [
        function() {
            return {
                restrict: "E", 
                replace: true, 
                scope: {
                    imgSrc: "@"
                }, 
                controller: "InviewImgController", 
                controllerAs: "inviewImgCtrl",
                template: '<img ng-src="{{inviewImgCtrl.imgSrc}}" in-view="$inview && inviewImgCtrl.isInView($inview)" />'
            };
        }
    ]);

})();
/*
 * vim: ts=4 et nowrap autoindent
 */