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
import ManageBootcamp from "./pages/ManageBootcamp";
import AddBootcamp from "./pages/AddBootcamp";
import EditBootcamp from "./pages/EditBootcamp";
import ManageCourses from "./pages/ManageCourses";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
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
        <Route exact path="/manage-bootcamp" element={
          <PrivateRoute>
            <ManageBootcamp />
          </PrivateRoute>
        } />
        <Route exact path="/add-bootcamp" element={
          <PrivateRoute>
            <AddBootcamp />
          </PrivateRoute>
        } />
        <Route exact path="/edit-bootcamp/:id" element={
          <PrivateRoute>
            <EditBootcamp />
          </PrivateRoute>
        } />
        <Route exact path="/manage-courses/:id" element={
          <PrivateRoute>
            <ManageCourses />
          </PrivateRoute>
        } />
        <Route exact path="/add-course/:id" element={
          <PrivateRoute>
            <AddCourse />
          </PrivateRoute>
        } />
        <Route exact path="/edit-course/:id" element={
          <PrivateRoute>
            <EditCourse />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
