import { baseService } from "./baseService";

export class CommnentService extends baseService {
   getAllComment = (taskId) => {
      return this.get(`Comment/getAll?taskId=${taskId}`);
   };
   insertComment = (comment) => {
      return this.post(`Comment/insertComment`, comment);
   };
   updateComment = (id, contentComment) => {
      return this.put(`Comment/updateComment?id=${id}&contentComment=${contentComment}`);
   };
   deleteComment = (idComment) => {
      return this.delete(`Comment/deleteComment?idComment=${idComment}`);
   };
}

export const commentService = new CommnentService();
