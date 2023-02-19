import { baseService } from "./baseService";

export class StatusService extends baseService {
   getAllStatus = () => {
      return this.get(`Status/getAll`);
   };
}

export const statusService = new StatusService();
