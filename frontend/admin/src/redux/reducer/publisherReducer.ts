import * as ActionTypes from '@constants/actionTypes';

const initialState = {
  articles: [],
  article: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.Publisher.SET_ARTICLES: {
      return {
        ...state,
        articles: action.payload,
      };
    }

    case ActionTypes.Publisher.SET_ARTICLE: {
      return {
        ...state,
        article: action.payload?.article,
      };
    }

    default:
      return state;
  }
};
