import { INCREMENT_COUNT } from '../Actions';

export default (state = { movies: [], themes: [], count: 0 }, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        count: state.count + 1,
      };
    default:
      return state;
  }
};
