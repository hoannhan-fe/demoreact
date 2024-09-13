import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VideoDetailAndSub } from '../../types';
import { videoPlayerService } from '../../services';

interface VideoSubtitleState {
  code: number;
  data: VideoDetailAndSub;
  success: boolean;
  error?: string;
  status: string;
}
const initialState: VideoSubtitleState = {
  code: 204,
  data: {} as VideoDetailAndSub,
  success: true,
  error: '',
  status: '',
};
export const getOptionVideoSlice = createAsyncThunk(
  'post/getVideoOption',
  async ({ idYtb }: { idYtb: string }) => {
    const res = await videoPlayerService.getVideoSubtitles(idYtb);
    if (res?.code != 200) {
      throw new Error('Error: ' + res.code);
    }
    return res.data ?? {};
  },
);

const videoOptionSlice = createSlice({
  name: 'video_option',
  initialState: initialState,
  reducers: {
    get: (state, action) => {
      state.data = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOptionVideoSlice.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getOptionVideoSlice.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = 'succeeded';
      state.success = true;
      state.error = '';
    });
    builder.addCase(getOptionVideoSlice.rejected, (state, { error }) => {
      state.status = 'failed';
      state.success = false;
      state.error = error.message;
    });
  },
});
export const { get } = videoOptionSlice.actions;
export default videoOptionSlice.reducer;
