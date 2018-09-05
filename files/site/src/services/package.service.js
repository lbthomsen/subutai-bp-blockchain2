/*                                                                                                                                                                                             
 * Package Service                                                                                                                                                                             
 */
(function () {

    var module = angular.module("package-service", []);

    module.factory("PackageResource", ["$log", "$resource",
        function ($log, $resource) {
            return $resource("json/package.json");
        }
    ]);

    module.factory("ModulePackageResource", ["$log", "$resource",
        function ($log, $resource) {
            return $resource("json/node_modules/:module/package.json");
        }
    ]);

    module.factory("PackageService", ["$log", "$rootScope", "PackageResource", "ModulePackageResource",
        function ($log, $rootScope, packageResource, modulePackageResource) {
            $log.debug("PackageService: starting");

            var me = {
                getPackage: function (module, successCb, errorCb) {
                    if (module) {
                        modulePackageResource.get({ module: module }).$promise.then(function (package) {
                            successCb(package);
                        }, function (error) {
                            (errorCb || angular.noop)(error.data);
                        });
                    } else {
                        packageResource.get({}).$promise.then(function (package) {
                            successCb(package);
                        }, function (error) {
                            (errorCb || angular.noop)(error.data);
                        });
                    }
                }
            };

            return me;
        }
    ]);

})();
/*
 * vim: ts=4 et nowrap autoindent
 */