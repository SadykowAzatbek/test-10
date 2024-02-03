import {Button, Grid, TextField} from '@mui/material';
import FileInput from '../FileInput.tsx';
import React, {useState} from 'react';
import {News} from '../../types';
import {useAppDispatch} from '../../App/hooks.ts';
import {postNews} from '../store/newsThunk.ts';

const NewsForm = () => {
  const dispatch = useAppDispatch();

  const [post, setPost] = useState<News>({
    id: '',
    title: '',
    description: '',
    image: '',
    date: '',
  });

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(postNews(post));
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fileOnChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setPost((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <Grid container direction="column" spacing="2">
          <Grid item xs>
            <TextField
              required
              id="title" name="title" label="title"
              value={post.title}
              onChange={onChangeInput}
            />
          </Grid>
          <Grid item xs>
            <TextField
              required
              id="description" name="description" label="description"
              value={post.description}
              onChange={onChangeInput}
            />
          </Grid>
          <Grid item xs>
            <FileInput
              name="image"
              label="Product image"
              onChange={fileOnChangeInputHandler}
            />
          </Grid>
          <Grid item>
            <Button type="submit">Create</Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default NewsForm;