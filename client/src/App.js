import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import JobList from './pages/JobList';
import PostJob from './pages/PostJob';
import ProtectedRoute from './components/ProtectedRoute';
import JobDetails from './pages/JobDetails';

function App() {
  return (
    

    <Router>
      {/* <h1 className="text-4xl font-bold text-red-600">Tailwind is working!</h1> */}

      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path = "/jobs/:id" element = {<JobDetails/>}/>
        <Route path="/post-job" element={
          <ProtectedRoute role="recruiter">
            <PostJob/>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
