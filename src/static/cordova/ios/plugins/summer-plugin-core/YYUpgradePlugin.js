cordova.define("summer-plugin-core.XUpgrade", function(require, exports, module) {

        var exec = require('cordova/exec');

        var service = {};
		
		//upgradeApp应用升级
		service.upgradeApp = function(json,successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XUpgrade", "upgradeApp", [json]);
        };
		//upgrade应用内升级
		service.upgrade = function(json,successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XUpgrade", "upgrade", [json]);
        };
		
        module.exports = service;

    }
);
