import React from "react";

import './App.css';
import "./assets/css/style.css";
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import PublicRoute from "./routing/PublicRoute";

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Bootcamps from './pages/Bootcamps';
import Bootcamp from './pages/Bootcamp';
import Spinner from "./components/Spinner";

import { ToastContainer } from "react-toastify";

import Logout from "./components/Logout";

import useAuth from "./hooks/useAuth";

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Spinner />
  }

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route exact path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route exact path="/logout" element={
          <PrivateRoute>
            <Logout />
          </PrivateRoute>
        } />
        <Route exact path="/bootcamps" element={
          <PrivateRoute>
            <Bootcamps />
          </PrivateRoute>
        } />
        <Route exact path="/bootcamps/:id" element={
          <PrivateRoute>
            <Bootcamp />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
