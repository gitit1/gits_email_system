import updateObject from '../utils/updateObject';
import {SCREEN_SIZE} from '../actions/screen';

const initialState = {
    smallSize: false
};

const screenReducer = (state = initialState, action) => {
    switch (action.type) {
      case SCREEN_SIZE:
        return updateObject( state, {
            smallSize: action.smallSize
      } );
      default:
        return state;
    }
  };

export default screenReducer