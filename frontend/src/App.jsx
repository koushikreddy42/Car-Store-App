import ElectricIndex from "./pages/ElectricIndex"
import GasIndex from "./pages/GasIndex";
import Login from "./pages/Login"
import Home from "./pages/Home"
import React,{useState,createContext} from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

export const store = createContext();
function App() {
  const [token,setToken] = useState(null);
  return (
    <div>
    <store.Provider value={[token,setToken]}>
    <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/sign" replace />} />
          <Route exact path="/electric" element={<ElectricIndex/>}/>
          <Route exact path="/gas" element={<GasIndex/>}/>
          <Route exact path="/sign" element={<Login/>}/>
          <Route exact path="/home" element={<Home/>}/>
        </Routes>
    </Router>
    </store.Provider>
    </div>
  )
}

export default App
