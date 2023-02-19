import { baseService } from "./baseService";

export class TaskTypeService extends baseService {
   getAllTaskType = () => {
      return this.get("TaskType/getAll");
   };
}

export const taskTypeService = new TaskTypeService();
