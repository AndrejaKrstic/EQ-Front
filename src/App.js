//import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import MenuBar from "./components/MenuBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import VezbanjeRoda from "./components/VezbanjeRoda";
import LevelSelect from "./components/LevelSelect";
import MojNapredak from "./components/MojNapredak";
import MainMenu from "./components/MainMenu";

function App() {
  const [level, setLevel] = useState();
  function selektujLevel(level) {
    setLevel(level);
  }
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <>
              <MenuBar /> <MainMenu />
            </>
          }
        />
        <Route
          path="/izbor-nivoa"
          element={
            <>
              <MenuBar />
              <LevelSelect selektujLevel={selektujLevel} />
            </>
          }
        />
        <Route
          path="/vezbanje-roda"
          element={
            <>
              <MenuBar />
              <VezbanjeRoda level={level} />
            </>
          }
        />
        <Route
          path="/moj-napredak"
          element={
            <>
              <MenuBar />
              <MojNapredak />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
