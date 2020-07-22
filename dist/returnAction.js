(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.returnAction = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var ReturnAction = /*#__PURE__*/function () {
    function ReturnAction() {
      var _this = this;

      _classCallCheck(this, ReturnAction);

      this.actions = {};
      this.stack = [];
      window.addEventListener('popstate', function () {
        var actionName = _this.stack.pop();

        var action = _this.actions[actionName];

        if (action && typeof action.popActionHandler === 'function') {
          action.popActionHandler.apply();
        }
      });
    }

    _createClass(ReturnAction, [{
      key: "registerAction",
      value: function registerAction(params) {
        var actionName = params.actionName,
            pushActionHandler = params.pushActionHandler,
            popActionHandler = params.popActionHandler;

        if (_typeof(params) !== 'object' || !actionName || typeof pushActionHandler !== 'function' || typeof popActionHandler !== 'function') {
          throw new Error('Invalid params passed in registerAction function!');
        }

        this.actions[actionName] = {
          pushActionHandler: pushActionHandler,
          popActionHandler: popActionHandler
        };

        if (location.hash.indexOf(actionName) >= 0) {
          history.replaceState(null, '', location.href.replace(actionName, ''));
        }
      }
    }, {
      key: "pushAction",
      value: function pushAction(actionName) {
        if (!actionName) {
          throw new Error('Invalid params passed in pushAction function!');
        }

        this.actions[actionName].pushActionHandler.apply();
        this.stack.push(actionName);
        var url = location.href;

        if (location.hash.indexOf(actionName) === -1) {
          if (!location.hash) {
            url += "#".concat(actionName);
          } else {
            url += "&".concat(actionName);
          }

          history.pushState({
            actionName: actionName
          }, '', url);
        }
      }
    }, {
      key: "popAction",
      value: function popAction() {
        history.back();
      }
    }]);

    return ReturnAction;
  }();

  var returnAction = new ReturnAction();

  return returnAction;

})));
