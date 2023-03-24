
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
import PublicRoutes from './PublicRoutes';
import ProtectedRoute from './ProtectedRoute'


function App() {
  return (
    <div className="App">
      <Header/>
      <Toaster/>
      <Routes>
        <Route path='/blogs' element={<ProtectedRoute><Blog/></ProtectedRoute>}/>
        <Route path='/my-blogs' element={<ProtectedRoute><MyBlog/></ProtectedRoute>}/>
        <Route path='/create-blog' element={<ProtectedRoute><CreateBlog/></ProtectedRoute>}/>
        <Route path='/blog-details/:id' element={<ProtectedRoute><BlockDetails/></ProtectedRoute>}/>
        <Route path='/login' element={<PublicRoutes><Login/></PublicRoutes>}/>
        <Route path='/register' element={<PublicRoutes><Register/></PublicRoutes>}/>
      </Routes>
     
    </div>
  );
}

export default App;
