import { call, delay, takeLatest, put } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { DELETE_USER_API_SAGA, EDIT_USER_API_SAGA, GET_LIST_USER_API, GET_LIST_USER_API_SAGA, GET_USER_API, GET_USER_API_SAGA, USER_SIGNIN_API, USER_SIGNUP_API, USLOGIN } from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { STATUS_CODE, TOKEN, USER_LOGIN } from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import { userService } from "../../../services/UserService";
import { GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA } from "../../constants/Cyberbugs/UserConstatnts";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs.js";

//Quản lý các action saga
// ---------------------------- user saga ----------------------------
function* signupSaga(action) {
   yield put({
      type: DISPLAY_LOADING,
   });
   yield delay(500);
   //Gọi api
   try {
      const { status } = yield call(() => cyberbugsService.signupCyberBugs(action.userSignup));
      if (status === STATUS_CODE.SUCCESS) {
         notifiFunction("success", "Sign Up Success!");
         history.push("/login");
      }
   } catch (err) {
      console.log(err.response.data);
      notifiFunction("error", "Sign Up fail !");
   }
   yield put({
      type: HIDE_LOADING,
   });
}
export function* theoDoiSignUpSaga() {
   yield takeLatest(USER_SIGNUP_API, signupSaga);
}

function* signinSaga(action) {
   yield put({
      type: DISPLAY_LOADING,
   });
   yield delay(500);
   //Gọi api
   try {
      const { data } = yield call(() => cyberbugsService.signinCyberBugs(action.userLogin));
      //Lưu vào localstorage khi đăng nhập thành công
      localStorage.setItem(TOKEN, data.content.accessToken);
      localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
      yield put({
         type: USLOGIN,
         userLogin: data.content,
      });
      history.push("/projectmanagement");
   } catch (err) {
      console.log(err.response.data);
   }
   yield put({
      type: HIDE_LOADING,
   });
}
export function* theoDoiSignin() {
   yield takeLatest(USER_SIGNIN_API, signinSaga);
}

function* getListUserSaga(action) {
   //Gọi api
   try {
      const { data } = yield call(() => userService.getListUser());
      yield put({
         type: GET_LIST_USER_API,
         listUser: data.content,
      });
   } catch (err) {
      console.log(err.response.data);
   }
}
export function* theoDoiGetListUser() {
   yield takeLatest(GET_LIST_USER_API_SAGA, getListUserSaga);
}

function* editUserSaga(action) {
   try {
      const { status } = yield call(() => userService.editUser(action.userEdit));
      if (status === STATUS_CODE.SUCCESS) {
         notifiFunction("success", "Edit user success!");
         yield put({
            type: GET_LIST_USER_API_SAGA,
         });
      }
   } catch (err) {
      notifiFunction("error", "Edit user fail!");
      console.log(err.response.data);
   }
}
export function* theoDoiEditUser() {
   yield takeLatest(EDIT_USER_API_SAGA, editUserSaga);
}

function* deleteUserSaga(action) {
   try {
      const { status } = yield call(() => userService.deleteUser(action.userId));
      if (status === STATUS_CODE.SUCCESS) {
         notifiFunction("success", "Delete user success!");
         yield put({
            type: GET_LIST_USER_API_SAGA,
         });
      }
   } catch (err) {
      notifiFunction("error", "Delete user fail!");
      console.log(err.response.data);
   }
}
export function* theoDoiDeleteUser() {
   yield takeLatest(DELETE_USER_API_SAGA, deleteUserSaga);
}

function* getUserSaga(action) {
   //Gọi api
   try {
      if (action.keyword) {
         const { data } = yield call(() => userService.getUser(action.keyword));
         yield put({
            type: GET_USER_API,
            lstUserSearch: data.content,
         });
         yield put({
            type: GET_LIST_USER_API,
            listUser: data.content,
         });
      } else {
         const { data } = yield call(() => userService.getListUser());
         yield put({
            type: GET_LIST_USER_API,
            listUser: data.content,
         });
      }
   } catch (err) {
      console.log(err.response.data);
   }
}
export function* theoDoiGetUser() {
   yield takeLatest(GET_USER_API_SAGA, getUserSaga);
}

function* addUserProjectSaga(action) {
   try {
      yield call(() => userService.assignUserProject(action.userProject));
      yield put({
         type: "GET_LIST_PROJECT_SAGA",
      });
   } catch (err) {
      console.log(err.response.data);
   }
}
export function* theoDoiAddUserProject() {
   yield takeLatest("ADD_USER_PROJECT_API", addUserProjectSaga);
}

function* removeUserProjectSaga(action) {
   try {
      yield call(() => userService.deleteUserFromProject(action.userProject));
      yield put({
         type: "GET_LIST_PROJECT_SAGA",
      });
   } catch (err) {
      console.log(err.response.data);
   }
}
export function* theoDoiRemoveUserProject() {
   yield takeLatest("REMOVE_USER_PROJECT_API", removeUserProjectSaga);
}

function* getUserByProjectIdSaga(action) {
   try {
      const { data, status } = yield call(() => userService.getUserByProjectId(action.idProject));
      if (status === STATUS_CODE.SUCCESS) {
         yield put({
            type: GET_USER_BY_PROJECT_ID,
            arrUser: data.content,
         });
      }
   } catch (err) {
      console.log(err);
      console.log(err.response?.data);
      if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
         yield put({
            type: GET_USER_BY_PROJECT_ID,
            arrUser: [],
         });
      }
   }
}
export function* theoDoiGetUserByProjectIdSaga() {
   yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}
