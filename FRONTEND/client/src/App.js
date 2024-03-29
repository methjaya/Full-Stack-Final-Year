import React from "react";
// rename browserRouter as router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import pages and components
import Home from "./pages/Home";
import History from "./pages/History";
import Exercise from "./pages/Exercise";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import Cardio from "./components/Cardio";
import Abs from "./components/Abs";
import Resistance from "./components/Resistance";
import Track from "./components/Track";
import Talk from "./pages/Talk";
import Profile from "./pages/Profile";
import EditWorkouts from "./pages/Edit-workouts";
import General from "./pages/General";
import Changepass from "./pages/Changepass";
import Updateprof from "./pages/Updateprof";
import AddStaff from "./pages/AddStaff";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/history" element={<History />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/exercise/cardio" element={<Cardio />} />
        <Route path="/exercise/abs" element={<Abs />} />
        <Route path="/exercise/strength" element={<Resistance />} />
        <Route path="/exercise/track" element={<Track />} />
        <Route path="/talk" element={<Talk />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/workouts/edit" element={<EditWorkouts />} />
        <Route path="/general" element={<General />} />
        <Route path="/changepass" element={<Changepass />} />
        <Route path="/add-staff" element={<AddStaff />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router >
  );
}

export default App;
