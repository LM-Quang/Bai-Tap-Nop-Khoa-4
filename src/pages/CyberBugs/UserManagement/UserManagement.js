import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Input, Table, Space } from "antd";
import { useDispatch } from "react-redux";
import { DELETE_USER_API_SAGA, GET_USER_API_SAGA, USER_EDIT } from "../../../redux/constants/Cyberbugs/Cyberbugs.js";
import UserEditFomik from "./UserInfoEdit.js";
export default function UserManagement(props) {
   const dispatch = useDispatch();
   const { userLogin, listUser } = useSelector((state) => state.UserLoginCyberBugsReducer);
   const [userSearch, setUserSearch] = useState("");
   useEffect(() => {
      dispatch({ type: GET_USER_API_SAGA, keyword: "" });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   const handleChange = (e) => {
      setUserSearch(e.target.value);
   };
   const handleClick = () => {
      dispatch({
         type: GET_USER_API_SAGA,
         keyword: userSearch,
      });
   };
   const columns = [
      {
         title: "STT",
         dataIndex: "stt",
         key: "stt",
         render: (text, record, index) => {
            return index + 1;
         },
      },
      {
         title: "Email",
         dataIndex: "email",
         key: "email",
      },
      {
         title: "Name",
         dataIndex: "name",
         key: "name",
      },
      {
         title: "Phone Number",
         dataIndex: "phoneNumber",
         key: "phoneNumber",
      },
      {
         title: "Action",
         dataIndex: "",
         key: "x",
         render: (text, record, index) => {
            return (
               <div>
                  <Space wrap>
                     <Button
                        data-toggle="modal"
                        data-target="#exampleModal"
                        type="primary"
                        onClick={() => {
                           dispatch({
                              type: USER_EDIT,
                              userEdit: record,
                           });
                        }}
                     >
                        Edit
                     </Button>
                     <Button
                        type="primary"
                        danger
                        onClick={() => {
                           dispatch({
                              type: DELETE_USER_API_SAGA,
                              userId: record.userId,
                           });
                        }}
                     >
                        Delete
                     </Button>
                  </Space>
               </div>
            );
         },
      },
   ];
   return (
      <div style={{ width: "100%" }}>
         <div className="d-flex justify-content-end align-items-center pt-3 pr-3">
            Chào!, <span className="font-weight-bold ml-2">{userLogin.name}</span>
            <img src={userLogin.avatar} alt={userLogin.name} height={50} width={50} style={{ borderRadius: "50%", marginLeft: "5px" }} />
         </div>
         <hr style={{ border: "2px solid black" }} />
         <div className="container">
            <h3>Create User</h3>
            <div className="d-flex mt-3">
               <Input style={{ width: "100%" }} name="nameSearch" size="large" placeholder="search..." onChange={handleChange} />
               <Button className="ml-3" size="large" type="primary" onClick={handleClick}>
                  Search
               </Button>
            </div>
            <div className="mt-5">
               <Table columns={columns} rowKey={"userId"} dataSource={listUser} />
            </div>
         </div>
         <div>
            <UserEditFomik />
         </div>
      </div>
   );
}
