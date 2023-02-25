import React from "react";
import { NavLink } from "react-router-dom";

export default function Home(props) {
   return (
      <div>
         Vui lòng
         <NavLink className="mx-2" to="/login">
            Login
         </NavLink>
         để vào hệ thống hoặc
         <NavLink className="mx-2" to="/signup">
            Sign Up
         </NavLink>
         nếu chưa có tài khoản
      </div>
   );
}
