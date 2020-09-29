module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/BarcodeScanTorch.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/BarcodeScanTorch.tsx":
/*!**********************************!*\
  !*** ./src/BarcodeScanTorch.tsx ***!
  \**********************************/
/*! exports provided: BarcodeScanTorch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarcodeScanTorch", function() { return BarcodeScanTorch; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-native */ "react-native");
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_native__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_native_camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-native-camera */ "react-native-camera");
/* harmony import */ var react_native_camera__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_native_camera__WEBPACK_IMPORTED_MODULE_2__);



;
class BarcodeScanTorch extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(props) {
        super(props);
        this.onBarCodeReadHandler = this.onBarCodeRead.bind(this);
        this.manualBarcodeHandler = this.manualBarcode.bind(this);
        this.toggleTorch = this.toggleTorch.bind(this);
        this.toggleAutoDetect = this.toggleAutoDetect.bind(this);
        this.state = {
            torchON: false,
            autoDetect: true,
            textboxValue: '',
        };
    }
    toggleTorch() {
        this.setState({ torchON: !this.state.torchON });
    }
    toggleAutoDetect() {
        this.setState({ autoDetect: !this.state.autoDetect });
    }
    render() {
        return (Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_1__["View"], { style: localStyle.container },
            Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react_native_camera__WEBPACK_IMPORTED_MODULE_2__["RNCamera"], { style: localStyle.preview, captureAudio: false, onBarCodeRead: this.onBarCodeReadHandler, flashMode: this.state.torchON ? react_native_camera__WEBPACK_IMPORTED_MODULE_2__["RNCamera"].Constants.FlashMode.torch : react_native_camera__WEBPACK_IMPORTED_MODULE_2__["RNCamera"].Constants.FlashMode.off }),
            Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_1__["View"], { style: localStyle.bottom },
                Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_1__["TouchableOpacity"], { onPress: this.toggleTorch, style: this.state.torchON ? localStyle.switchOn : localStyle.switchOff },
                    Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_1__["Text"], { style: this.state.torchON ? localStyle.textOn : localStyle.textOff },
                        "\u21AF Lamp ",
                        this.state.torchON ? "aan" : "uit")),
                Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_1__["TouchableOpacity"], { onPress: this.toggleAutoDetect, style: this.state.autoDetect ? localStyle.switchOn : localStyle.switchOff },
                    Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_1__["Text"], { style: this.state.autoDetect ? localStyle.textOn : localStyle.textOff },
                        "\u2551\u2588\u2551 Detectie ",
                        this.state.autoDetect ? "aan" : "uit")),
                this.state.autoDetect ? Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_1__["View"], null) :
                    Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_1__["View"], { style: localStyle.textBox },
                        Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_1__["Text"], { style: localStyle.textBarcode }, "Barcode: "),
                        Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_1__["TextInput"], { style: localStyle.textInput, placeholder: "Scan of vul handmatig", value: this.state.textboxValue, onChangeText: (text) => this.setState({ textboxValue: text }) }),
                        Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_1__["TouchableOpacity"], { onPress: this.manualBarcodeHandler, style: localStyle.switchOn },
                            Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react_native__WEBPACK_IMPORTED_MODULE_1__["Text"], { style: localStyle.textOn }, "Naar machine"))))));
    }
    onBarCodeRead(event) {
        if (this.state.autoDetect) {
            if (this.props.barcode.status !== "available" || event.data === this.props.barcode.value) {
                return;
            }
            this.props.barcode.setValue(event.data);
            if (this.props.onDetect && this.props.onDetect.canExecute) {
                react_native__WEBPACK_IMPORTED_MODULE_1__["Vibration"].vibrate(400);
                this.props.onDetect.execute();
            }
        }
        else {
            if (this.state.textboxValue !== event.data) {
                react_native__WEBPACK_IMPORTED_MODULE_1__["Vibration"].vibrate(400);
                this.setState({ textboxValue: event.data });
                return;
            }
        }
    }
    manualBarcode() {
        var _a;
        this.props.barcode.setValue(this.state.textboxValue);
        (_a = this.props.onDetect) === null || _a === void 0 ? void 0 : _a.execute();
    }
}
const localStyle = react_native__WEBPACK_IMPORTED_MODULE_1__["StyleSheet"].create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        alignItems: 'center',
    },
    bottom: {
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    textBox: {
        backgroundColor: 'white',
        alignItems: 'center',
    },
    textInput: {
        height: 45,
        margin: 5,
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: '#ec7404',
    },
    switchOn: {
        height: 45,
        margin: 5,
        borderRadius: 30,
        backgroundColor: '#ec7404',
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
    },
    switchOff: {
        height: 45,
        margin: 5,
        borderRadius: 30,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ec7404',
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
    },
    textOn: {
        color: 'white',
        fontSize: 16,
        margin: 50,
        fontWeight: 'bold',
    },
    textOff: {
        color: '#ec7404',
        fontSize: 16,
        margin: 50,
        fontWeight: 'bold',
    },
    textBarcode: {
        color: '#ec7404',
        fontSize: 16,
        fontWeight: 'bold',
    }
});


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-native":
/*!*******************************!*\
  !*** external "react-native" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-native");

/***/ }),

/***/ "react-native-camera":
/*!**************************************!*\
  !*** external "react-native-camera" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-native-camera");

/***/ })

/******/ });
//# sourceMappingURL=BarcodeScanTorch.js.map