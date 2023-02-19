import { GET_ALL_PROJECT } from "../constants/Cyberbugs/ProjectCyberBugsConstants";
const stateDefault = {
   projectList: [],
   arrProject: [], //Get allproject cho dropdown
};

export const ProjectCyberBugsReducer = (state = stateDefault, action) => {
   switch (action.type) {
      case "GET_LIST_PROJECT": {
         return { ...state, projectList: action.projectList };
      }
      case GET_ALL_PROJECT: {
         return { ...state, arrProject: action.arrProject };
      }
      default:
         return { ...state };
   }
};
