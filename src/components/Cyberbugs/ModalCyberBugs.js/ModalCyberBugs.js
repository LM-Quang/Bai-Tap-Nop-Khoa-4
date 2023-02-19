import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { GET_ALL_STATUS_SAGA } from "../../../redux/constants/Cyberbugs/StatusConstant";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/constants/Cyberbugs/PriorityConstants";
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGN } from "../../../redux/constants/Cyberbugs/TaskConstants";
import { GET_ALL_TASK_TYPE_SAGA } from "../../../redux/constants/Cyberbugs/TaskTypeConstants";
import { Editor } from "@tinymce/tinymce-react";
import { Select } from "antd";
import { DELETE_COMMENT_SAGA, INSERT_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from "../../../redux/constants/Cyberbugs/CommentConst.js";

export default function ModalCyberBugs(props) {
   const { taskDetailModal } = useSelector((state) => state.TaskReducer);
   const { arrStatus } = useSelector((state) => state.StatusReducer);
   const { arrPriority } = useSelector((state) => state.PriorityReducer);
   const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
   const { projectDetail } = useSelector((state) => state.ProjectReducer);
   const { listComment } = useSelector((state) => state.CommentReducer);
   const [visibleEditor, setVisibleEditor] = useState(false);
   const [visibleComment, setVisibleComment] = useState(false);
   const [commentUpdate, setCommentUpdate] = useState(false);
   const [commentId, setCommentId] = useState(0);
   const [historyContent, setHistoryContent] = useState(taskDetailModal.description);
   const [content, setContent] = useState(taskDetailModal.description);
   const [contentComment, setContentComment] = useState("");
   const [contentCommentUpdate, setContentCommentUpdate] = useState("");
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({ type: GET_ALL_STATUS_SAGA });
      dispatch({ type: GET_ALL_PRIORITY_SAGA });
      dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const renderDescription = () => {
      const jsxDescription = ReactHtmlParser(taskDetailModal.description);
      return (
         <div style={{ cursor: "pointer" }}>
            {visibleEditor ? (
               <div>
                  <Editor
                     name="description"
                     initialValue={taskDetailModal.description}
                     init={{
                        selector: "textarea#myDescription",
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
                        setContent(content);
                     }}
                  />
                  <button
                     className="btn btn-success m-2"
                     onClick={() => {
                        dispatch({
                           type: HANDLE_CHANGE_POST_API_SAGA,
                           actionType: CHANGE_TASK_MODAL,
                           name: "description",
                           value: content,
                        });
                        setVisibleEditor(false);
                     }}
                  >
                     Save
                  </button>
                  <button
                     className="btn btn-secondary m-2"
                     onClick={() => {
                        dispatch({
                           type: HANDLE_CHANGE_POST_API_SAGA,
                           actionType: CHANGE_TASK_MODAL,
                           name: "description",
                           value: historyContent,
                        });
                        //    dispatch({
                        //         type: CHANGE_TASK_MODAL,
                        //         name: 'description',
                        //         value: historyContent
                        //     })
                        setVisibleEditor(false);
                     }}
                  >
                     Close
                  </button>
               </div>
            ) : (
               <div
                  onClick={() => {
                     setHistoryContent(taskDetailModal.description);
                     setVisibleEditor(!visibleEditor);
                  }}
               >
                  {jsxDescription}
               </div>
            )}
         </div>
      );
   };
   const handleChange = (e) => {
      const { name, value } = e.target;
      dispatch({
         type: HANDLE_CHANGE_POST_API_SAGA,
         actionType: CHANGE_TASK_MODAL,
         name,
         value,
      });
      // dispatch({
      //     type: CHANGE_TASK_MODAL,
      //     name,
      //     value
      // });
   };
   const renderTimeTracking = () => {
      const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;
      const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
      const percent = Math.round((Number(timeTrackingSpent) / max) * 100);

      return (
         <div>
            <div style={{ display: "flex" }}>
               <i className="fa fa-clock" />
               <div style={{ width: "100%" }}>
                  <div className="progress">
                     <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                     <p className="logged">{Number(timeTrackingRemaining)}h logged</p>
                     <p className="estimate-time">{Number(timeTrackingRemaining)}h remaining</p>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-6">
                  <input className="form-control" name="timeTrackingSpent" onChange={handleChange} />
               </div>
               <div className="col-6">
                  <input className="form-control" name="timeTrackingRemaining" onChange={handleChange} />
               </div>
            </div>
         </div>
      );
   };
   return (
      <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
         <div className="modal-dialog modal-info">
            <div className="modal-content">
               <div className="modal-header">
                  <div className="task-title">
                     <i className="fa fa-bookmark" />
                     <select name="typeId" value={taskDetailModal.typeId} onChange={handleChange}>
                        {arrTaskType.map((tp, index) => {
                           return (
                              <option key={index} value={tp.id}>
                                 {tp.taskType}
                              </option>
                           );
                        })}
                     </select>
                     <span>{taskDetailModal.taskName}</span>
                  </div>
                  <div style={{ display: "flex" }} className="task-click">
                     <div>
                        <i className="fab fa-telegram-plane" />
                        <span style={{ paddingRight: 20 }}>Give feedback</span>
                     </div>
                     <div>
                        <i className="fa fa-link" />
                        <span style={{ paddingRight: 20 }}>Copy link</span>
                     </div>
                     <i className="fa fa-trash-alt='xyz'" style={{ cursor: "pointer" }} />
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                     </button>
                  </div>
               </div>
               <div className="modal-body">
                  <div className="container-fluid">
                     <div className="row">
                        <div className="col-8">
                           <p className="issue">This is an issue of type: Task.</p>
                           <div className="description">
                              <p>Description</p>
                              {renderDescription()}
                           </div>
                           {/* ---------------------------------------- Comment Section ------------------------------------------ */}
                           <div className="comment">
                              <h6>Comment</h6>
                              <div className="block-comment" style={{ display: "flex" }}>
                                 <div className="avatar">
                                    <img src={require("../../../assets/img/download (1).jfif")} alt="xyz" />
                                 </div>
                                 <div className="input-comment">
                                    {visibleComment ? (
                                       <div>
                                          <Editor
                                             name="comment"
                                             initialValue={contentCommentUpdate}
                                             init={{
                                                selector: "textarea#myComment",
                                                height: 150,
                                                menubar: false,
                                                plugins: [
                                                   "advlist autolink lists link image charmap print preview anchor",
                                                   "searchreplace visualblocks code fullscreen",
                                                   "insertdatetime media table paste code help wordcount",
                                                ],
                                                toolbar:
                                                   // eslint-disable-next-line no-multi-str
                                                   "undo redo | formatselect | bold italic backcolor | \
                                             alignleft aligncenter alignright alignjustify | \
                                             bullist numlist outdent indent | removeformat | help",
                                             }}
                                             onEditorChange={(content, editor) => {
                                                setContentComment(content);
                                             }}
                                          />
                                          <button
                                             className="btn btn-success m-2"
                                             onClick={() => {
                                                if (commentUpdate) {
                                                   dispatch({
                                                      type: UPDATE_COMMENT_SAGA,
                                                      id: commentId,
                                                      contentComment: contentComment,
                                                      taskId: taskDetailModal.taskId,
                                                   });
                                                   setCommentUpdate(false);
                                                   setContentCommentUpdate("");
                                                } else {
                                                   dispatch({
                                                      type: INSERT_COMMENT_SAGA,
                                                      comment: {
                                                         taskId: taskDetailModal.taskId,
                                                         contentComment: contentComment,
                                                      },
                                                   });
                                                }
                                                setVisibleComment(!visibleComment);
                                             }}
                                          >
                                             Save
                                          </button>
                                          <button
                                             className="btn btn-secondary m-2"
                                             onClick={() => {
                                                setVisibleComment(!visibleComment);
                                             }}
                                          >
                                             Cancel
                                          </button>
                                       </div>
                                    ) : (
                                       <div
                                          style={{ padding: "5px", border: "1px solid black", cursor: "pointer" }}
                                          onClick={() => {
                                             setVisibleComment(!visibleComment);
                                          }}
                                       >
                                          Click here to comment
                                       </div>
                                    )}
                                 </div>
                              </div>
                              <div className="lastest-comment">
                                 {listComment?.map((comment, index) => {
                                    return (
                                       <div key={index} className="comment-item mt-2">
                                          <div className="display-comment" style={{ display: "flex" }}>
                                             <div className="avatar">
                                                <img src={comment.user.avatar} alt="xyz" />
                                             </div>
                                             <div>
                                                <p style={{ marginBottom: 5, fontWeight: "bold" }}>
                                                   {comment.user.name} <span style={{ fontWeight: "normal" }}>a month ago</span>
                                                </p>
                                                {ReactHtmlParser(comment.contentComment)}
                                                <div>
                                                   <span
                                                      style={{ color: "#929398", cursor: "pointer" }}
                                                      onClick={() => {
                                                         setContentCommentUpdate(comment.contentComment);
                                                         setVisibleComment(!visibleComment);
                                                         setCommentUpdate(true);
                                                         setCommentId(comment.id);
                                                      }}
                                                   >
                                                      Edit
                                                   </span>
                                                   •{" "}
                                                   <span
                                                      style={{ color: "#929398", cursor: "pointer" }}
                                                      onClick={() => {
                                                         dispatch({
                                                            type: DELETE_COMMENT_SAGA,
                                                            idComment: comment.id,
                                                            taskId: taskDetailModal.taskId,
                                                         });
                                                      }}
                                                   >
                                                      Delete
                                                   </span>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    );
                                 })}
                              </div>
                           </div>
                           {/* ---------------------------------------- End Comment Section ------------------------------------------ */}
                        </div>
                        <div className="col-4">
                           <div className="status">
                              <h6>STATUS</h6>
                              <select
                                 name="statusId"
                                 className="custom-select"
                                 value={taskDetailModal.statusId}
                                 onChange={(e) => {
                                    handleChange(e);
                                    // const action = {
                                    //     type:UPDATE_STATUS_TASK_SAGA,
                                    //     taskUpdateStatus: {
                                    //         taskId:taskDetailModal.taskId,
                                    //         statusId:e.target.value,
                                    //         projectId:taskDetailModal.projectId

                                    //     }
                                    // }
                                    // dispatch(action)
                                 }}
                              >
                                 {arrStatus.map((status, index) => {
                                    return (
                                       <option value={status.statusId} key={index}>
                                          {status.statusName}
                                       </option>
                                    );
                                 })}
                              </select>
                           </div>
                           <div className="assignees">
                              <h6>ASSIGNEES</h6>
                              <div className="row">
                                 {taskDetailModal.assigness?.map((user, index) => {
                                    return (
                                       <div className="col-6  mt-2 mb-2" key={index}>
                                          <div key={index} style={{ display: "flex" }} className="item">
                                             <div className="avatar">
                                                <img src={user.avatar} alt={user.avatar} />
                                             </div>
                                             <p className="name mt-1 ml-1">
                                                {user.name}
                                                <i
                                                   className="fa fa-times"
                                                   style={{ marginLeft: 5, cursor: "pointer" }}
                                                   onClick={() => {
                                                      dispatch({
                                                         type: HANDLE_CHANGE_POST_API_SAGA,
                                                         actionType: REMOVE_USER_ASSIGN,
                                                         userId: user.id,
                                                      });
                                                      // dispatch({
                                                      //     type:REMOVE_USER_ASSIGN,
                                                      //     userId:user.id
                                                      // })
                                                   }}
                                                />
                                             </p>
                                          </div>
                                       </div>
                                    );
                                 })}
                                 <div className="col-6  mt-2 mb-2">
                                    <Select
                                       options={projectDetail.members
                                          ?.filter((mem) => {
                                             let index = taskDetailModal.assigness?.findIndex((us) => us.id === mem.userId);
                                             if (index !== -1) {
                                                return false;
                                             }
                                             return true;
                                          })
                                          .map((mem, index) => {
                                             return { value: mem.userId, label: mem.name };
                                          })}
                                       optionFilterProp="label"
                                       style={{ width: "100%" }}
                                       name="lstUser"
                                       value="+ Add more"
                                       className="form-control"
                                       onSelect={(value) => {
                                          if (value === "0") {
                                             return;
                                          }
                                          let userSelected = projectDetail.members.find((mem) => mem.userId === value);
                                          userSelected = { ...userSelected, id: userSelected.userId };

                                          dispatch({
                                             type: HANDLE_CHANGE_POST_API_SAGA,
                                             actionType: CHANGE_ASSIGNESS,
                                             userSelected,
                                          });
                                          //dispatchReducer
                                          // dispatch({
                                          //     type: CHANGE_ASSIGNESS,
                                          //     userSelected
                                          // })
                                       }}
                                    ></Select>
                                 </div>
                              </div>
                           </div>
                           <div className="priority" style={{ marginBottom: 20 }}>
                              <h6>PRIORITY</h6>
                              <select
                                 name="priorityId"
                                 className="form-control"
                                 value={taskDetailModal.priorityId}
                                 onChange={(e) => {
                                    handleChange(e);
                                 }}
                              >
                                 {arrPriority.map((item, index) => {
                                    return (
                                       <option key={index} value={item.priorityId}>
                                          {item.priority}
                                       </option>
                                    );
                                 })}
                              </select>
                           </div>
                           <div className="estimate">
                              <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                              <input
                                 name="originalEstimate"
                                 type="text"
                                 className="estimate-hours"
                                 value={taskDetailModal.originalEstimate}
                                 onChange={(e) => {
                                    handleChange(e);
                                 }}
                              />
                           </div>
                           <div className="time-tracking">
                              <h6>TIME TRACKING</h6>
                              {renderTimeTracking()}
                           </div>
                           <div style={{ color: "#929398" }}>Create at a month ago</div>
                           <div style={{ color: "#929398" }}>Update at a few seconds ago</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
