import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useState } from "react";
import { Select, Slider } from "antd";
import { useSelector, useDispatch, connect } from "react-redux";
import { GET_ALL_PROJECT_SAGA } from "../../../redux/constants/Cyberbugs/ProjectCyberBugsConstants";
import { GET_ALL_TASK_TYPE_SAGA } from "../../../redux/constants/Cyberbugs/TaskTypeConstants";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/constants/Cyberbugs/PriorityConstants";
import { withFormik } from "formik";
import * as Yup from "yup";
import { GET_ALL_STATUS_SAGA } from "../../../redux/constants/Cyberbugs/StatusConstant";
import { GET_USER_BY_PROJECT_ID_SAGA } from "../../../redux/constants/Cyberbugs/UserConstatnts";
import { GET_USER_API_SAGA } from "../../../redux/constants/Cyberbugs/Cyberbugs.js";

function FormCreateTask(props) {
   //Lấy dữ liệu từ redux
   const { arrProject } = useSelector((state) => state.ProjectCyberBugsReducer);
   const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
   const { arrPriority } = useSelector((state) => state.PriorityReducer);
   const { arrUser } = useSelector((state) => state.UserLoginCyberBugsReducer);
   const { arrStatus } = useSelector((state) => state.StatusReducer);
   //Hàm biến đổi options cho thẻ select
   const userOptions = arrUser.map((item, index) => {
      return { value: item.userId, label: item.name };
   });
   //Do kết nối với withformik => component có các props
   const {
      //   values,
      //   touched,
      //   errors,
      handleChange,
      //   handleBlur,
      handleSubmit,
      //   setValues,
      setFieldValue,
   } = props;
   const dispatch = useDispatch();
   const [timeTracking, setTimetracking] = useState({
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
   });
   //hook
   useEffect(() => {
      dispatch({ type: GET_ALL_PROJECT_SAGA });
      dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
      dispatch({ type: GET_ALL_PRIORITY_SAGA });
      dispatch({ type: GET_ALL_STATUS_SAGA });
      //Đưa hàm handle submit lên drawer reducer để cập nhật lại sự kiện cho nút submitt
      dispatch({ type: "SET_SUBMIT_CREATE_TASK", submitFunction: handleSubmit });
      dispatch({ type: GET_USER_API_SAGA, keyWord: "" });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return (
      <form className="container" onSubmit={handleSubmit}>
         <div className="form-group">
            <p>Project</p>
            <select
               name="projectId"
               className="form-control"
               onChange={(e) => {
                  //dispatch giá trị làm thay đổi arrUser
                  let { value } = e.target;
                  dispatch({
                     type: GET_USER_BY_PROJECT_ID_SAGA,
                     idProject: value,
                  });
                  //Cập nhật giá trị cho project Id
                  setFieldValue("projectId", e.target.value);
               }}
            >
               {arrProject.map((project, index) => {
                  return (
                     <option key={index} value={project.id}>
                        {project.projectName}
                     </option>
                  );
               })}
            </select>
         </div>
         <div className="form-group">
            <p>Task name</p>
            <input name="taskName" className="form-control" onChange={handleChange} />
         </div>
         <div className="form-group">
            <p>Status</p>
            <select name="statusId" className="form-control" onChange={handleChange}>
               {arrStatus.map((statusItem, index) => {
                  return (
                     <option key={index} value={statusItem.statusId}>
                        {statusItem.statusName}
                     </option>
                  );
               })}
            </select>
         </div>
         <div className="form-group">
            <div className="row">
               <div className="col-6">
                  <p>Priority</p>
                  <select name="priorityId" className="form-control" onChange={handleChange}>
                     {arrPriority.map((priority, index) => {
                        return (
                           <option key={index} value={priority.priorityId}>
                              {priority.priority}
                           </option>
                        );
                     })}
                  </select>
               </div>
               <div className="col-6">
                  <p>Task type</p>
                  <select className="form-control" name="typeId" onChange={handleChange}>
                     {arrTaskType.map((taskType, index) => {
                        return (
                           <option key={index} value={taskType.id}>
                              {taskType.taskType}
                           </option>
                        );
                     })}
                  </select>
               </div>
            </div>
         </div>
         <div className="form-group">
            <div className="row">
               <div className="col-6">
                  <p>Assignees</p>
                  <Select
                     mode="multiple"
                     options={userOptions}
                     placeholder="Please select"
                     optionFilterProp="label"
                     onChange={(values) => {
                        //set lại giá trị cho lstUserAsign
                        setFieldValue("listUserAsign", values);
                     }}
                     style={{ width: "100%" }}
                  />
                  <div className="row mt-3">
                     <div className="col-12">
                        <p>Original Estimate</p>
                        <input type="number" min="0" name="originalEstimate" defaultValue="0" className="form-control" height="30" onChange={handleChange} />
                     </div>
                  </div>
               </div>
               <div className="col-6">
                  <p>Time tracking</p>
                  <Slider defaultValue={30} value={timeTracking.timeTrackingSpent} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                  <div className="row">
                     <div className="col-6 text-left font-weight-bold">{timeTracking.timeTrackingSpent}h logged</div>
                     <div className="col-6 text-right font-weight-bold">{timeTracking.timeTrackingRemaining}h remaining</div>
                  </div>
                  <div className="row" style={{ marginTop: 5 }}>
                     <div className="col-6">
                        <p>Time spent</p>
                        <input
                           type="number"
                           defaultValue="0"
                           min="0"
                           className="form-control"
                           name="timeTrackingSpent"
                           onChange={(e) => {
                              setTimetracking({
                                 ...timeTracking,
                                 timeTrackingSpent: e.target.value,
                              });
                              setFieldValue("timeTrackingSpent", e.target.value);
                           }}
                        />
                     </div>
                     <div className="col-6">
                        <p>Time remaining</p>
                        <input
                           type="number"
                           defaultValue="0"
                           min="0"
                           className="form-control"
                           name="timeTrackingRemaining"
                           onChange={(e) => {
                              setTimetracking({
                                 ...timeTracking,
                                 timeTrackingRemaining: e.target.value,
                              });
                              setFieldValue("timeTrackingRemaining", e.target.value);
                           }}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="form-group">
            <p>Description</p>
            <Editor
               name="description"
               init={{
                  selector: "textarea#myTextArea",
                  height: 500,
                  menubar: false,
                  plugins: ["advlist autolink lists link image charmap print preview anchor", "searchreplace visualblocks code fullscreen", "insertdatetime media table paste code help wordcount"],
                  toolbar:
                     // eslint-disable-next-line no-multi-str
                     "undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help",
               }}
               onEditorChange={(content, editor) => {
                  setFieldValue("description", content);
               }}
            />
         </div>
      </form>
   );
}

const frmCreateTask = withFormik({
   enableReinitialize: true,
   mapPropsToValues: (props) => {
      const { arrProject, arrTaskType, arrPriority, arrStatus } = props;
      return {
         taskName: "",
         description: "",
         statusId: arrStatus[0]?.statusId,
         originalEstimate: 0,
         timeTrackingSpent: 0,
         timeTrackingRemaining: 0,
         projectId: arrProject[0]?.id,
         typeId: arrTaskType[0]?.id,
         priorityId: arrPriority[0]?.priorityId,
         listUserAsign: [],
      };
   },
   validationSchema: Yup.object().shape({}),
   handleSubmit: (values, { props, setSubmitting }) => {
      props.dispatch({ type: "CREATE_TASK_SAGA", taskObject: values });
   },
   displayName: "createTaskForm",
})(FormCreateTask);
const mapStateToProps = (state) => {
   return {
      arrProject: state.ProjectCyberBugsReducer.arrProject,
      arrTaskType: state.TaskTypeReducer.arrTaskType,
      arrPriority: state.PriorityReducer.arrPriority,
      arrStatus: state.StatusReducer.arrStatus,
   };
};

export default connect(mapStateToProps)(frmCreateTask);
