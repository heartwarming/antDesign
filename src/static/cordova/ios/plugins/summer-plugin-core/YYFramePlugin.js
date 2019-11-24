cordova.define("summer-plugin-frame.XFrame", function(require, exports, module) {

        var exec = require('cordova/exec');

        var frame = {};

        frame.showToast = function(content, type) {
            //exec(successCallback, errorCallback, "Camera", "cleanup", []);
            exec(null, null, "XFrame", "showToast", [content,type]);
        };

        frame.openFrame = function(json,successCallback,errorCallback) {
            exec(successCallback, errorCallback, "XFrame", "openFrame", [json]);
        };

        frame.closeFrame = function(json,successCallback,errorCallback) {
            exec(successCallback, errorCallback, "XFrame", "closeFrame", [json]);
        };

//        frame.openWindow = function(successCallback,errorCallback,id,params,anim) {
//            alert("openWindow");
//            exec(successCallback, errorCallback, "XFrame", "openWindow", [id,params,anim]);
//        };
        frame.openWin = function(json, successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XFrame", "openWin", [json]);
        };
        frame.closeWin = function(json, successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XFrame", "closeWindow", [json]);
        };
        frame.closeToWin = function(json, successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XFrame", "closeToWin", [json]);
        };
//        frame.closeWindow = function() {
//            exec(null, null, "XFrame", "closeWindow", []);
//        };
        frame.cleanup = function(successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XFrame", "cleanup", []);
        };
        frame.setFrameAttr = function(json, successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XFrame", "setFrameAttr", [json]);
        };
               
        frame.setRefreshHeaderInfo = function(json, successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XFrame", "setRefreshHeaderInfo", [json]);
        };
        frame.refreshHeaderLoadDone = function(json, successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XFrame", "refreshHeaderLoadDone", [json]);
        };
               
        frame.setRefreshFooterInfo = function(json, successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XFrame", "setRefreshFooterInfo", [json]);
        };
        frame.refreshFooterLoadDone = function(json, successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XFrame", "refreshFooterLoadDone", [json]);
        };
               
        //window级别的页面参数，通过openWin打开时的页面参数
        frame.winParam = function(successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XFrame", "winParam", []);
        };
        //Frame级别页面参数，通过openFrame打开时的页面参数
        frame.frameParam = function(successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XFrame", "frameParam", []);
        };
               
        frame.execScript = function(json,successCallback, errorCallback) {
               exec(successCallback, errorCallback, "XFrame", "execScript", [json]);
        };
         //frameGroup机制
        frame.openFrameGroup = function(json,successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XFrame", "openFrameGroup", [json]);
        };
        frame.closeFrameGroup = function(json,successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XFrame", "closeFrameGroup", [json]);
        };
        frame.setFrameGroupAttr = function(json,successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XFrame", "setFrameGroupAttr", [json]);
        };
        frame.setFrameGroupIndex = function(json,successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XFrame", "setFrameGroupIndex", [json]);
        };


//        frame.closeFrame = function(id) {
//            exec(null, null, "FrameManager", "closeFrame", [id]);
//        };
        module.exports = frame;

    }
);
