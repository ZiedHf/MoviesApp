import cloneDeep from 'lodash/cloneDeep';

import { INCREMENT_COUNT, SET_THEMES, CHANGE_THEMES } from '../Actions';

const defaultState = { movies: [], themes: [], count: 0, selectedTheme: 0 };

export default (state = defaultState, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...cloneDeep(state),
        count: state.count + 1,
      };
    case SET_THEMES:
      return {
        ...cloneDeep(state),
        themes: action.themes,
      };
    case CHANGE_THEMES:
      return {
        ...cloneDeep(state),
        selectedTheme: state.selectedTheme === 0 ? 1 : 0,
      };
    default:
      return state;
  }
};
