'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _reactRouter = require('react-router');

var _actions = require('../../actions');

var actions = _interopRequireWildcard(_actions);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _login_header = require('./login_header');

var _login_header2 = _interopRequireDefault(_login_header);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _colors = require('material-ui/styles/colors');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_Component) {
  _inherits(Login, _Component);

  function Login() {
    _classCallCheck(this, Login);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Login).apply(this, arguments));
  }

  _createClass(Login, [{
    key: 'handleFormSubmit',
    value: function handleFormSubmit(_ref) {
      var username = _ref.username;
      var password = _ref.password;


      this.props.loginUser({ username: username, password: password });
    }
  }, {
    key: 'renderErrorAlert',
    value: function renderErrorAlert() {
      if (this.props.errorMessage && this.props.errorMessage !== 'Username is in use') {
        return _react2.default.createElement(
          'div',
          { className: 'alert alert-danger' },
          _react2.default.createElement(
            'strong',
            null,
            this.props.errorMessage
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var handleSubmit = _props.handleSubmit;
      var _props$fields = _props.fields;
      var username = _props$fields.username;
      var password = _props$fields.password;

      var style = {
        height: 750
      };
      //backgroundColor: teal50
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_login_header2.default, { value: 0 }),
        _react2.default.createElement(
          _Paper2.default,
          { style: style, zDepth: 4 },
          _react2.default.createElement(
            'div',
            { className: 'centered-Login' },
            _react2.default.createElement(
              'form',
              { onSubmit: handleSubmit(this.handleFormSubmit.bind(this)) },
              _react2.default.createElement(
                'fieldset',
                { className: 'form-group' },
                _react2.default.createElement(_TextField2.default, _extends({ halfWidth: true, hintText: 'Username' }, username))
              ),
              _react2.default.createElement(
                'fieldset',
                { className: 'form-group' },
                _react2.default.createElement(_TextField2.default, _extends({ halfWidth: true, type: 'password', hintText: 'Password' }, password))
              ),
              this.renderErrorAlert(),
              _react2.default.createElement(_RaisedButton2.default, { type: 'submit', label: 'Login', primary: true }),
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/signup' },
                _react2.default.createElement(_FlatButton2.default, { label: 'Sign up', secondary: true })
              )
            )
          )
        )
      );
    }
  }]);

  return Login;
}(_react.Component);

;

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

exports.default = (0, _reduxForm.reduxForm)({
  form: 'login',
  fields: ['username', 'password']
}, mapStateToProps, actions)(Login);