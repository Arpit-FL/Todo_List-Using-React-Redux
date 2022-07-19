const Initial_state = {
  User_data: [],
};

//Add DAta Reducer
export const todoreducers = (state = Initial_state, action) => {
  //Add DAta..
  switch (action.type) {
    case "ADD_DATA":
      return {
        ...state,
        User_data: [...state.User_data, action.payload],
      };
    //...................................................................................
    //Remove Data..
    case "RMV_DATA":
      const dltdata = state.User_data.filter(
        (ele) => ele?.id !== action.payload
      );
      return {
        ...state,
        User_data: dltdata,
      };

    //uPDATE DATA.........................................

    case "UPDATE_DATA":
      const updatedata = state.User_data.map((ele) =>
        ele?.id === action.d ? action.payload : ele
      );
      return {
        ...state,
        User_data: updatedata,
      };

    default:
      return state;
  }
};
