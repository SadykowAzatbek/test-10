import './App.css';
import {AppBar, Toolbar, Typography} from '@mui/material';
import Posts from './components/Posts/Posts.tsx';
import {Route, Routes} from 'react-router-dom';
import NewsForm from './components/NewsForm/NewsForm.tsx';

function App() {

  return (
    <>
      <AppBar position="sticky" sx={{mb: 2}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            <Typography variant="h4" align="left">CompStore</Typography>
          </Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/newpost" element={<NewsForm />} />
      </Routes>
    </>
  )
}

export default App;
