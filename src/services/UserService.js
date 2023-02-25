import { baseService } from "./baseService";

export class UserService extends baseService {
   getUser = (keyword) => {
      return this.get(`Users/getUser?keyword=${keyword}`);
   };
   getListUser = () => {
      return this.get(`Users/getUser?keyword=${""}`);
   };
   editUser = (userEdit) => {
      return this.put(`Users/editUser`, userEdit);
   };
   deleteUser = (userId) => {
      return this.delete(`Users/deleteUser?id=${userId}`);
   };
   assignUserProject = (userProject) => {
      return this.post(`Project/assignUserProject`, userProject);
   };

   deleteUserFromProject = (userProject) => {
      return this.post(`Project/removeUserFromProject`, userProject);
   };

   getUserByProjectId = (idProject) => {
      return this.get(`Users/getUserByProjectId?idProject=${idProject}`);
   };
}

export const userService = new UserService();
