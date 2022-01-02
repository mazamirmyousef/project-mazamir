// // // // // // // // // // // // // // // // // // // //
// // // // // // // //ACTIONS // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // //

export const actionTypes = {
  FetchListSrl: '[FetchListSrl] Action',
  FetchFormData: '[FetchFormData] Action',
  FetchSelectData: '[FetchSelectData] Action',
  FetchSelectTax: '[FetchSelectTax] Action',
  FetchSelectTax2: '[FetchSelectTax2] Action',
  
};

// // // // // // // // // // // // // // // // // // // //
// // // // // //CREATOR ACTIONS // // // // // // // // //
// // // // // // // // // // // // // // // // // // // //

export const passIdsActions = {
  fetchListSrl: item => ({
      type: actionTypes.FetchListSrl,
      payload: item
  }),
  fetchFormData: item => ({
    type: actionTypes.FetchFormData,
    payload: item
}),
fetchSelectData: item => ({
  type: actionTypes.FetchSelectData,
  payload: item
}),
fetchSelectTax: item => ({
  type: actionTypes.FetchSelectTax,
  payload: item
}),
fetchSelectTax2: item => ({
  type: actionTypes.FetchSelectTax2,
  payload: item
}),

};

// // // // // // // // // // // // // // // // // // // //
// // // // // // // // STATE // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // //

const initialState = {
  listSrlState: (0),
  fetchFormData:[],
  selectData: [],
  selectTax: [],
  selectTax2: [],

};

// // // // // // // // // // // // // // // // // // // //
// // // // // // //REDUCER // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // //

export const reducer = (state = initialState, action) => {
  
  switch (action.type) {

      case actionTypes.FetchListSrl: {

          return { ...state, listSrlState: action.payload };
      }
      case actionTypes.FetchFormData: {

        return { ...state, fetchFormData: action.payload };
    }
    case actionTypes.FetchSelectData: {

      return { ...state, fetchSelectData: action.payload };
  }
  case actionTypes.FetchSelectTax: {

    return { ...state, fetchSelectTax: action.payload };
}
case actionTypes.FetchSelectTax2: {

  return { ...state, fetchSelectTax2: action.payload };
}
      default:
          return state;
  }
};


export const passIdsAction = {
  add: () => ({ type: actionTypes.add }),
};
