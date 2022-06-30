import * as ActionTypes from '@constants/actionTypes';

const initialState = {
  articles: [],
  errors: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.Article.SET_ARTICLE: {
      return {
        ...state,
        articles: action.payload,
      };
    }

    case ActionTypes.Article.SET_ERRORS: {
      return {
        ...state,
        errors: action.payload,
      };
    }

    default:
      return state;
  }
};
