import { filterData } from "../actions/ApiActions";

const initialState = {
    // Initial state properties
    jobData:[],
    filteredData: [],
  };

const ApiReducer = (state = initialState, action) => {
    switch (action?.type) {
        // Handle different action types here
        
        case "SAVE_DATA":
          //console.log('updated data',action);
        return {
          jobData: [...state.jobData, ...action?.payload ]
         
        };
  
        case "FILTER_DATA":
          //console.log('updated data',action);
        return {
  
          filteredData: [...state.filteredData, action?.payload?.length >0 ? action?.payload : [] ]
         
        };
  
        default:
          return state;
      }
}

export default ApiReducer