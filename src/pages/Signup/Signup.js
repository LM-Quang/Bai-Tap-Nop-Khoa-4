import React from "react";
import { Button, Input } from "antd";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { signupAction } from "../../redux/actions/CyberBugsActions.js";
function Signup(props) {
   const {
      //   values,
      //   touched,
      errors,
      handleChange,
      //   handleBlur,
      handleSubmit,
   } = props;
   return (
      <form onSubmit={handleSubmit} className="container" style={{ height: window.innerHeight }}>
         <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: window.innerHeight }}>
            <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>
               Sign Up
            </h3>
            <div className="d-flex mt-3">
               <Input onChange={handleChange} style={{ width: "100%", minWidth: 300 }} name="email" size="large" placeholder="email" />
            </div>
            <div className="text-danger">{errors.email}</div>
            <div className="d-flex mt-3">
               <Input onChange={handleChange} style={{ width: "100%", minWidth: 300 }} type="password" name="password" size="large" placeholder="password" />
            </div>
            <div className="text-danger">{errors.password}</div>
            <div className="d-flex mt-3">
               <Input onChange={handleChange} style={{ width: "100%", minWidth: 300 }} type="number" name="phoneNumber" size="large" placeholder="Phone number" />
            </div>
            <div className="text-danger">{errors.phoneNumber}</div>
            <div className="d-flex mt-3">
               <Input onChange={handleChange} style={{ width: "100%", minWidth: 300 }} type="text" name="name" size="large" placeholder="Name" />
            </div>
            <div className="text-danger">{errors.name}</div>
            <div className="d-flex">
               <Button htmlType="submit" size="large" style={{ minWidth: 100, backgroundColor: "rgb(102,117,223)", color: "#fff" }} className="mt-5 mr-5">
                  Sign Up
               </Button>
               <Button htmlType="submit" size="large" style={{ minWidth: 100, backgroundColor: "rgb(102,117,223)", color: "#fff" }} className="mt-5">
                  Register
               </Button>
            </div>
         </div>
      </form>
   );
}
const SignupWithFormik = withFormik({
   mapPropsToValues: () => ({
      email: "",
      password: "",
      phoneNumber: "",
      name: "",
   }),
   validationSchema: Yup.object().shape({
      email: Yup.string().required("Email is required!").email("email is invalid!"),
      password: Yup.string().min(6, "password must have min 6 characters").max(32, "password  have max 32 characters"),
      phoneNumber: Yup.string().required("Requied a 10-digit number").min(9, "too short").max(9, "too long"),
      name: Yup.string().required("Name is required"),
   }),
   handleSubmit: ({ email, password, phoneNumber, name }, { props, setSubmitting }) => {
      setSubmitting(true);
      props.dispatch(signupAction(email, password, phoneNumber, name));
   },
   displayName: "Signup",
})(Signup);

export default connect()(SignupWithFormik);
