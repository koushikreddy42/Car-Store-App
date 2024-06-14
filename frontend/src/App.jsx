import ElectricIndex from "./pages/ElectricIndex"
import GasIndex from "./pages/GasIndex";
import Login from "./pages/Login"
import Home from "./pages/Home"
import AdminLog from "./pages/AdminLog";
import AdminHome from "./pages/AdminHome";
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
  const [adminToken,setAdminToken] = useState(null);
  return (
    <div>
    <store.Provider value={[token,setToken,adminToken,setAdminToken]}>
    <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/sign" replace />} />
          <Route exact path="/electric" element={<ElectricIndex/>}/>
          <Route exact path="/gas" element={<GasIndex/>}/>
          <Route exact path="/sign" element={<Login/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/admin-sign" element={<AdminLog/>}/>
          <Route exact path="/admin-home" element={<AdminHome/>}/>
        </Routes>
    </Router>
    </store.Provider>
    </div>
  )
}

export default App
