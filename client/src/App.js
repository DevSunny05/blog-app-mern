
import './App.css';
import Header from './components/Header';
import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog';
import MyBlog from './pages/MyBlog';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/blogs' element={<Blog/>}/>
        <Route path='/my-blogs' element={<MyBlog/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
