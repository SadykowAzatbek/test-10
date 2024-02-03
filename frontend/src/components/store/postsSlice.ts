import {News} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {getNews} from './newsThunk.ts';
import {RootState} from '../../App/store.ts';

export interface Posts {
  news: News[];
  isLoading: boolean;
}

const initialState: Posts = {
  news: [],
  isLoading: false,
};

export const postsSlice = createSlice({
  name: 'posts/slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNews.fulfilled, (state, {payload: items}) => {
      state.isLoading = false;
      state.news = items;
    });
    builder.addCase(getNews.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const NewsReducer = postsSlice.reducer;

export const selectNews = (state: RootState) => state.news.news;
export const selectIsLoading = (state: RootState) => state.news.isLoading;
