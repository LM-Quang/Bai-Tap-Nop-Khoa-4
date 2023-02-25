import { USER_SIGNIN_API, USER_SIGNUP_API } from "../constants/Cyberbugs/Cyberbugs";

export const singinCyberbugAction = (email, password) => {
   return {
      type: USER_SIGNIN_API,
      userLogin: {
         email: email,
         password: password,
      },
   };
};
export const signupAction = (email, password, phoneNumber, name) => {
   return {
      type: USER_SIGNUP_API,
      userSignup: {
         email: email,
         passWord: password,
         name: name,
         phoneNumber: phoneNumber,
      },
   };
};
