
import './App.css';
import Header from './components/Header';
import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog';
import MyBlog from './pages/MyBlog';
import CreateBlog from './pages/CreateBlog';
import BlockDetails from './pages/BlockDetails';
import {Toaster} from 'react-hot-toast'
function App() {
  return (
    <div className="App">
      <Header/>
      <Toaster/>
      <Routes>
        <Route path='/blogs' element={<Blog/>}/>
        <Route path='/my-blogs' element={<MyBlog/>}/>
        <Route path='/create-blog' element={<CreateBlog/>}/>
        <Route path='/blog-details/:id' element={<BlockDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        
      </Routes>
     
    </div>
  );
}

export default App;
