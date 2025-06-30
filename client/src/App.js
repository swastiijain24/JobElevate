import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import JobList from './pages/JobList';
import PostJob from './pages/PostJob';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post-job" element={<PostJob />} />
      </Routes>
    </Router>
  );
}

export default App;
