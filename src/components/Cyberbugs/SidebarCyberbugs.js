import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { BarsOutlined, SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import FormCreateTask from "../Forms/FormCreateTask/FormCreateTask";

const { Sider } = Layout;
const items = [
   {
      label: "Create Task",
      key: "1",
      icon: <PlusOutlined style={{ fontSize: 20 }} />,
   },
   {
      label: "Search",
      key: "2",
      icon: <SearchOutlined style={{ fontSize: 20 }} />,
   },
];

export default function SidebarCyberbugs() {
   const dispatch = useDispatch();
   const [state, setState] = useState({
      collapsed: false,
   });
   const [current, setCurrent] = useState("1");
   const toggle = () => {
      setState({
         collapsed: !state.collapsed,
      });
   };
   const onClick = (e) => {
      dispatch({
         type: "OPEN_FORM_CREATE_TASK",
         Component: <FormCreateTask />,
         title: "Create task",
      });
      setCurrent(e.key);
   };
   return (
      <div>
         <Sider trigger={null} collapsible collapsed={state.collapsed} style={{ height: "100%" }}>
            <div className="text-right pr-2" onClick={toggle}>
               <BarsOutlined style={{ cursor: "pointer", color: "#fff", fontSize: 25 }} />
            </div>
            {/* <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<PlusOutlined style={{ fontSize: 20 }} />} onClick={()=>{
                        dispatch({
                            type:'OPEN_FORM_CREATE_TASK',
                            Component:<FormCreateTask />,
                            title:'Create task'
                        })
                    }}>
                        <span className="mb-2">Create task</span>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<SearchOutlined style={{ fontSize: 20 }} />}>
                        Search
                     </Menu.Item>
                </Menu> */}
            <Menu onClick={onClick} theme="dark" mode="inline" selectedKeys={[current]} items={items} />
         </Sider>
      </div>
   );
}
