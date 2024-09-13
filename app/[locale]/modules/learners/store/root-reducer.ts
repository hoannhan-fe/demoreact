import { combineReducers } from '@reduxjs/toolkit';
import videoOptionSlice from './slice/video-option';

const rootReducer = combineReducers({
  videoOptionSlice: videoOptionSlice,
});

export default rootReducer;
