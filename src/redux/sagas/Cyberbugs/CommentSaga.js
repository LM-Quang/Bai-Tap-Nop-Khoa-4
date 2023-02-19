import { call, put, takeLatest } from "redux-saga/effects";
import { commentService } from "../../../services/CommentService.js";
import { STATUS_CODE } from "../../../util/constants/settingSystem.js";
import { DELETE_COMMENT_SAGA, GET_ALL_COMMENT, GET_ALL_COMMENT_SAGA, INSERT_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from "../../constants/Cyberbugs/CommentConst.js";

function* getAllCommentSaga(action) {
   try {
      const { data, status } = yield call(() => commentService.getAllComment(action.taskId));
      if (status === STATUS_CODE.SUCCESS) {
         yield put({
            type: GET_ALL_COMMENT,
            listComment: data.content,
         });
      }
   } catch (err) {
      console.log(err);
   }
}
export function* theoDoiGetAllCommentSaga() {
   yield takeLatest(GET_ALL_COMMENT_SAGA, getAllCommentSaga);
}

function* insertCommentSaga(action) {
   try {
      const { status } = yield call(() => commentService.insertComment(action.comment));
      if (status === STATUS_CODE.SUCCESS) {
         yield put({
            type: GET_ALL_COMMENT_SAGA,
            taskId: action.comment.taskId,
         });
      }
   } catch (err) {
      console.log(err);
   }
}
export function* theoDoiInsertCommentSaga() {
   yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga);
}

function* updateCommentSaga(action) {
   try {
      const { status } = yield call(() => commentService.updateComment(action.id, action.contentComment));
      if (status === STATUS_CODE.SUCCESS) {
         yield put({
            type: GET_ALL_COMMENT_SAGA,
            taskId: action.taskId,
         });
      }
   } catch (err) {
      console.log(err);
   }
}
export function* theoDoiUpdateCommentSaga() {
   yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga);
}

function* deleteCommentSaga(action) {
   try {
      const { status } = yield call(() => commentService.deleteComment(action.idComment));
      if (status === STATUS_CODE.SUCCESS) {
         yield put({
            type: GET_ALL_COMMENT_SAGA,
            taskId: action.taskId,
         });
      }
   } catch (err) {
      console.log(err);
   }
}
export function* theoDoiDeleteCommentSaga() {
   yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}
