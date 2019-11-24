cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [{
        "id": "cordova-plugin-console.console",
        "file": "plugins/cordova-plugin-console/www/console-via-logger.js",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "console"
        ]
    }, {
        "id": "cordova-plugin-console.logger",
        "file": "plugins/cordova-plugin-console/www/logger.js",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "cordova.logger"
        ]
    }, {
        "file": "plugins/summer-plugin-core/YYFramePlugin.js",
        "id": "summer-plugin-frame.XFrame",
        "pluginId": "summer-plugin-frame",
        "clobbers": [
        	"XFrame"
        ]
    }, {
        "file": "plugins/summer-plugin-core/YYUpgradePlugin.js",
        "id": "summer-plugin-core.XUpgrade",
        "pluginId": "summer-plugin-upgrade",
        "clobbers": ["XUpgrade"]
    }, {
        "file": "plugins/summer-plugin-core/YYServicePlugin.js",
        "id": "summer-plugin-service.XService",
        "pluginId": "summer-plugin-service",
        "clobbers": [
        	"YYServicePlugin"
        ]
    }, {
        "id": "cordova-plugin-wkwebview-engine.ios-wkwebview-exec",
        "file": "plugins/cordova-plugin-wkwebview-engine/src/www/ios/ios-wkwebview-exec.js",
        "pluginId": "cordova-plugin-wkwebview-engine",
        "clobbers": [
            "cordova.exec"
        ]
    }
    // Optional Plugins
    ,{"file":"plugins/cordova-plugin-http/www/cordovaHTTP.js","pluginId":"cordova-plugin-http","id":"cordova-plugin-http.CordovaHttpPlugin","clobbers":["CordovaHttpPlugin"]},{"file":"plugins/cordova-plugin-camera/www/CameraConstants.js","pluginId":"cordova-plugin-camera","id":"cordova-plugin-camera.Camera","clobbers":["Camera"]},{"file":"plugins/cordova-plugin-camera/www/CameraPopoverOptions.js","pluginId":"cordova-plugin-camera","id":"cordova-plugin-camera.CameraPopoverOptions","clobbers":["CameraPopoverOptions"]},{"file":"plugins/cordova-plugin-camera/www/Camera.js","pluginId":"cordova-plugin-camera","id":"cordova-plugin-camera.camera","clobbers":["navigator.camera"]},{"file":"plugins/cordova-plugin-file/www/DirectoryEntry.js","pluginId":"cordova-plugin-file","id":"cordova-plugin-file.DirectoryEntry","clobbers":["window.DirectoryEntry"]},{"file":"plugins/cordova-plugin-file/www/DirectoryReader.js","pluginId":"cordova-plugin-file","id":"cordova-plugin-file.DirectoryReader","clobbers":["window.DirectoryReader"]},{"file":"plugins/cordova-plugin-file/www/Entry.js","pluginId":"cordova-plugin-file","id":"cordova-plugin-file.Entry","clobbers":["window.Entry"]},{"file":"plugins/cordova-plugin-file/www/File.js","pluginId":"cordova-plugin-file","id":"cordova-plugin-file.File","clobbers":["window.File"]},{"file":"plugins/cordova-plugin-file/www/FileEntry.js","pluginId":"cordova-plugin-file","id":"cordova-plugin-file.FileEntry","clobbers":["window.FileEntry"]},{"file":"plugins/cordova-plugin-file/www/FileError.js","pluginId":"cordova-plugin-file","id":"cordova-plugin-file.FileError","clobbers":["window.FileError"]},{"file":"plugins/cordova-plugin-file/www/FileReader.js","pluginId":"cordova-plugin-file","id":"cordova-plugin-file.FileReader","clobbers":["window.FileReader"]},{"file":"plugins/cordova-plugin-file/www/FileSystem.js","pluginId":"cordova-plugin-file","id":"cordova-plugin-file.FileSystem","clobbers":["window.FileSystem"]},{"file":"plugins/cordova-plugin-file/www/FileUploadOptions.js","pluginId":"cordova-plugin-file","id":"cordova-plugin-file.FileUploadOptions","clobbers":["window.FileUploadOptions"]},{"file":"plugins/cordova-plugin-file/www/FileUploadResult.js","pluginId":"cordova-plugin-file","id":"cordova-plugin-file.FileUploadResult","clobbers":["window.FileUploadResult"]},{"file":"plugins/cordova-plugin-file/www/FileWriter.js","pluginId":"cordova-plugin-file","id":"cordova-plugin-file.FileWriter","clobbers":["window.FileWriter"]},{"file":"plugins/cordova-plugin-file/www/Flags.js","pluginId":"cordova-plugin-file","id":"cordova-plugin-file.Flags","clobbers":["window.Flags"]},{"file":"plugins/cordova-plugin-file/www/LocalFileSystem.js","pluginId":"cordova-plugin-file","id":"cordova-plugin-file.LocalFileSystem","clobbers":["window.LocalFileSystem"],"merges":["window"]},{"file":"plugins/cordova-plugin-file/www/Metadata.js","pluginId":"cordova-plugin-file","id":"cordova-plugin-file.Metadata","clobbers":["window.Metadata"]},{"file":"plugins/cordova-plugin-file/www/ProgressEvent.js","pluginId":"cordova-plugin-file","id":"cordova-plugin-file.ProgressEvent","clobbers":["window.ProgressEvent"]},{"file":"plugins/cordova-plugin-file/www/fileSystems.js","pluginId":"cordova-plugin-file","id":"cordova-plugin-file.fileSystems"},{"file":"plugins/cordova-plugin-file/www/requestFileSystem.js","pluginId":"cordova-plugin-file","id":"cordova-plugin-file.requestFileSystem","clobbers":["window.requestFileSystem"]},{"file":"plugins/cordova-plugin-file/www/resolveLocalFileSystemURI.js","pluginId":"cordova-plugin-file","id":"cordova-plugin-file.resolveLocalFileSystemURI","merges":["window"]},{"file":"plugins/cordova-plugin-file/www/browser/isChrome.js","pluginId":"cordova-plugin-file","id":"cordova-plugin-file.isChrome"}
    ];
    module.exports.metadata =
        // TOP OF METADATA
        {
            "cordova-plugin-whitelist": "1.3.0",
            "cordova-plugin-compat": "1.1.0",
            "cordova-plugin-console": "1.0.4",
            "cordova-plugin-wkwebview-engine": "1.1.0"     
        };
    // BOTTOM OF METADATA
});