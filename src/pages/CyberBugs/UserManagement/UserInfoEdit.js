import React, { useEffect } from "react";
import { Input } from "antd";
import { withFormik } from "formik";
import * as Yup from "yup";
import { EDIT_USER_API_SAGA, GET_USER_API_SAGA } from "../../../redux/constants/Cyberbugs/Cyberbugs.js";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
function UserEdit(props) {
   //Do kết nối với withformik => component có các props
   const {
      //   values,
      //   touched,
      errors,
      handleChange,
      //   handleBlur,
      handleSubmit,
      //   setValues,
      // setFieldValue,
   } = props;
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({ type: GET_USER_API_SAGA, keyword: "" });
   });
   return (
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div className="modal-dialog">
            <div className="modal-content" style={{ width: 600 }}>
               <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                     User Infomation Edit
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">x</span>
                  </button>
               </div>
               <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                     <div className="d-flex mt-3">
                        <label style={{ width: 80 }}>UserId:</label>
                        <Input style={{ width: "50%" }} name="userId" value={props.userEdit.userId} disabled />
                     </div>
                     <div className="d-flex mt-3">
                        <label style={{ width: 80 }}>Email:</label>
                        <Input style={{ width: "50%" }} name="email" value={props.userEdit.email} disabled />
                     </div>
                     <div className="d-flex mt-3">
                        <label style={{ width: 80 }}>Password:</label>
                        <Input onChange={handleChange} style={{ width: "50%" }} name="password" />
                        <div className="text-danger ml-2">{errors.password}</div>
                     </div>
                     <div className="d-flex mt-3">
                        <label style={{ width: 80 }}>Name:</label>
                        <Input onChange={handleChange} style={{ width: "50%" }} name="name" />
                        <div className="text-danger ml-2">{errors.name}</div>
                     </div>
                     <div className="d-flex mt-3">
                        <label style={{ width: 80 }}>Phone:</label>
                        <Input onChange={handleChange} style={{ width: "50%" }} name="phoneNumber" />
                        <div className="text-danger ml-2">{errors.phoneNumber}</div>
                     </div>
                  </form>
               </div>
               <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                     Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit} data-dismiss="modal">
                     Save Changes
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

const UserEditFomik = withFormik({
   enableReinitialize: true,
   mapPropsToValues: (props) => {
      const { userEdit } = props;
      return {
         id: JSON.stringify(userEdit.userId),
         email: userEdit.email,
         password: "",
         name: "",
         phoneNumber: "",
      };
   },
   validationSchema: Yup.object().shape({
      password: Yup.string().min(6, "Password must have min 6 characters").max(32, "Password  have max 32 characters"),
      name: Yup.string().required("Name is required!"),
      phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid").min(10, "Too short").max(10, "Too long"),
   }),
   handleSubmit: (values, { props, setSubmitting }) => {
      props.dispatch({ type: EDIT_USER_API_SAGA, userEdit: values });
   },
   displayName: "UserEditFomik",
})(UserEdit);
const mapStateToProps = (state) => {
   return {
      userEdit: state.UserLoginCyberBugsReducer.userEdit,
   };
};
export default connect(mapStateToProps)(UserEditFomik);
