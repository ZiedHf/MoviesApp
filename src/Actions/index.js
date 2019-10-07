import getData from '../server';

export const INCREMENT_COUNT = 'INCREMENT_COUNT';
export const SET_THEMES = 'SET_THEMES';
export const CHANGE_THEMES = 'CHANGE_THEMES';

export const incrementCount = () => ({ type: INCREMENT_COUNT });

export const setThemes = themes => ({ type: SET_THEMES, themes });

export const onChangeTheme = () => ({ type: CHANGE_THEMES });

export const getThemes = () => {
  return async dispatch => {
    try {
      // dispatch(showLoading());
      const themes = await getData('themes');
      dispatch(setThemes(themes));
    } catch (error) {
      console.error(error); // eslint-disable-line
    } finally {
      // dispatch(hideLoading());
    }
  };
};
