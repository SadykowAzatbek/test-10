import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  styled,
  Typography
} from '@mui/material';
import {useEffect} from 'react';
import {selectIsLoading, selectNews} from '../store/postsSlice.ts';
import {useAppDispatch, useAppSelector} from '../../App/hooks.ts';
import {getNews} from '../store/newsThunk.ts';
import {Link} from 'react-router-dom';

const Posts = () => {
  const dispatch = useAppDispatch();

  const news = useAppSelector(selectNews);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    const fetchUrl = async () => {
      await dispatch(getNews());
    };

    void fetchUrl();
  }, [dispatch]);

  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
  })

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Typography variant="h6" align="left">Posts</Typography>
        </Grid>
        <Grid item xs={4} textAlign="right">
          <Link to="/newpost">Add new post</Link>
        </Grid>
        <Grid item xs={12}>
          {!isLoading ? news.map((items) => (
            <Grid item xs={12} sm={12} md={6} lg={4} mb={3} mt={3} key={items.id}>
              <Card sx={{height: '100%'}}>
                <Typography variant="h6">{items.title}{items.date}</Typography>
                {items.image !== null ? <ImageCardMedia image={'http://localhost:8000' + '/' + items.image}/> : <span></span>}
                <CardContent>
                  {items.description}
                </CardContent>
              </Card>
            </Grid>
          )) : <CircularProgress />}
        </Grid>
      </Grid>
    </>
  );
};

export default Posts;