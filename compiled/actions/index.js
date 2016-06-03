'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AUTH_ERROR = exports.UNAUTH_USER = exports.AUTH_USER = exports.UPDATE_PENDING_POLLS = exports.UPDATE_RESULTS_POLLS = exports.ADD_CREATED_POLL = exports.DELETE_RESULTS_POLL = exports.DELETE_PENDING_POLL = exports.CREATE_POLL = exports.FETCH_POLLS = undefined;
exports.loginUser = loginUser;
exports.signupUser = signupUser;
exports.signoutUser = signoutUser;
exports.authError = authError;
exports.deletePendingPoll = deletePendingPoll;
exports.deleteResultsPoll = deleteResultsPoll;
exports.createPoll = createPoll;
exports.addCreatedPoll = addCreatedPoll;
exports.updateResultsPolls = updateResultsPolls;
exports.updatePendingPolls = updatePendingPolls;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FETCH_POLLS = exports.FETCH_POLLS = 'FETCH_POLLS';
var CREATE_POLL = exports.CREATE_POLL = 'CREATE_POLL';
var DELETE_PENDING_POLL = exports.DELETE_PENDING_POLL = 'DELETE_PENDING_POLL';
var DELETE_RESULTS_POLL = exports.DELETE_RESULTS_POLL = 'DELETE_RESULTS_POLL';
var ADD_CREATED_POLL = exports.ADD_CREATED_POLL = 'ADD_CREATED_POLL';
var UPDATE_RESULTS_POLLS = exports.UPDATE_RESULTS_POLLS = 'UPDATE_RESULTS_POLLS';
var UPDATE_PENDING_POLLS = exports.UPDATE_PENDING_POLLS = 'UPDATE_PENDING_POLLS';
var AUTH_USER = exports.AUTH_USER = 'AUTH_USER';
var UNAUTH_USER = exports.UNAUTH_USER = 'UNAUTH_USER';
var AUTH_ERROR = exports.AUTH_ERROR = 'AUTH_ERROR';

function loginUser(_ref) {
  var username = _ref.username;
  var password = _ref.password;

  return function (dispatch) {
    _axios2.default.post('/signin', { username: username, password: password }).then(function (response) {
      dispatch({ type: AUTH_USER, payload: response.data.user });
      localStorage.setItem('token', response.data.token);
      _reactRouter.browserHistory.push('/pendingpolls');
    }).catch(function () {
      dispatch(authError('Incorrect Login Information'));
      console.log(response.data);
    });
  };
}

function signupUser(_ref2) {
  var username = _ref2.username;
  var password = _ref2.password;
  var country = _ref2.country;

  return function (dispatch) {
    _axios2.default.post('/signup', { username: username, password: password, country: country }).then(function (response) {
      dispatch({ type: AUTH_USER, payload: response.data.user });
      localStorage.setItem('token', response.data.token);
      _reactRouter.browserHistory.push('/pendingpolls');
    }).catch(function (response) {
      console.log('inside .catch of signupuser', response);
      dispatch(authError(response.data.error));
      console.log(response.data);
    });
  };
}

function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
}

function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

function deletePendingPoll(info) {
  return function (dispatch) {
    _axios2.default.post('/pendingpolls', info, {
      headers: { authorization: localStorage.getItem('token') }
    }).then(function (response) {
      dispatch({
        type: DELETE_PENDING_POLL,
        payload: response.data
      });
    }).catch(function (response) {
      console.log(response.data);
    });
  };
}

function deleteResultsPoll(pollId) {
  return function (dispatch) {
    _axios2.default.post('/resultspolls', { pollId: pollId }, {
      headers: { authorization: localStorage.getItem('token') }
    }).then(function (response) {
      dispatch({
        type: DELETE_RESULTS_POLL,
        payload: response.data
      });
    }).catch(function (response) {
      console.log(response.data);
    });
  };
}

function createPoll(props) {
  console.log('props inside of action', props);
  return function (dispatch) {
    _axios2.default.post('/createpoll', props, {
      headers: { authorization: localStorage.getItem('token') }
    }).then(function (response) {
      dispatch({
        type: CREATE_POLL,
        payload: response.data
      });
    }).catch(function (response) {
      console.log(response.data);
    });
  };
}

function addCreatedPoll(data) {
  return {
    type: ADD_CREATED_POLL,
    payload: data
  };
}

function updateResultsPolls(data) {
  return {
    type: UPDATE_RESULTS_POLLS,
    payload: data
  };
}

function updatePendingPolls(data) {
  return {
    type: UPDATE_PENDING_POLLS,
    payload: data
  };
}