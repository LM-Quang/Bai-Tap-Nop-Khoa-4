import { GET_ALL_COMMENT } from "../constants/Cyberbugs/CommentConst.js";

const initialState = {
   listComment: [],
};

export const CommentReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ALL_COMMENT:
         return { ...state, listComment: action.listComment };
      default:
         return state;
   }
};
