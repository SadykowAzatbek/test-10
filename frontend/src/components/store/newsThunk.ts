import {createAsyncThunk} from '@reduxjs/toolkit';
import {News} from '../../types';
import axiosApi from '../../axiosApi';

export const getNews = createAsyncThunk<News[]>(
  'news/get',
  async () => {
    const response = await axiosApi.get<News[]>('/news');
    const items = response.data;

    if (!items) {
      return [];
    }

    return items;

  },
);

export const postNews = createAsyncThunk<void, News>(
  'news/post',
  async (data) => {

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('date', data.date);

    if (data.image) {
      formData.append('image', data.image);
    }

    await axiosApi.post<News>('/news', formData);
  }
)