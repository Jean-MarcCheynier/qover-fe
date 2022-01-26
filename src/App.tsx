import React, { Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Routes, Navigate, useLocation,
} from 'react-router-dom';
import './App.module.scss';
import { useSelector } from 'react-redux';
import Auth from './features/auth/Auth';
import { getCoverAsync } from './features/cover/coverSlice';
import { selectUser } from './features/auth/authSlice';
import CoverOptions from './features/cover/CoverOptions';
import CoverRequest from './features/cover/CoverRequest';
import { useAppDispatch } from './app/hooks';

function RequireAuth({ children }: { children: any }) {
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user && user.access_token) { dispatch(getCoverAsync()); }
  }, [user]);

  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/cover/request" />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/cover/request" element={<RequireAuth><CoverRequest /></RequireAuth>} />
            <Route path="/cover/compare-plans" element={<RequireAuth><CoverOptions /></RequireAuth>} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
