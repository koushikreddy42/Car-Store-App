import ElectricIndex from "./pages/ElectricIndex"
import GasIndex from "./pages/GasIndex";
import Login from "./pages/Login"
import Home from "./pages/Home"
import AdminLog from "./pages/AdminLog";
import AdminHome from "./pages/AdminHome";
import GasForm from "./pages/GasForm";
import EvsForm from "./pages/EvsForm";
import ElectricList from "./pages/ElectricList";
import GasList from "./pages/GasList";
import WishList from "./pages/WishList";
import BookNow from "./pages/BookNow";
import EvsBooking from "./pages/EvsBooking"
import GasBooking from "./pages/GasBooking"
import React,{useState,createContext} from 'react'
import BuyerDetails from "./pages/Buyer";
import User from "./pages/User";
import Buyers from "./pages/Adminboard";

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
          <Route exact path="/electric-form" element={<EvsForm/>}/>
          <Route exact path="/gas-form" element={<GasForm/>}/>
          <Route exact path="/admin-sign" element={<AdminLog/>}/>
          <Route exact path="/admin-home" element={<AdminHome/>}/>
          <Route exact path="/electric-list" element={<ElectricList/>}/>
          <Route exact path="/gas-list" element={<GasList/>}/>
          <Route exact path="/wishlist" element={<WishList/>}/>
          <Route exact path="/book-now/:param1/:param2" element={<BookNow/>}/>
          <Route exact path="/electric-booking/:param1/:param2/:param3" element={<EvsBooking/>}/>
          <Route exact path="/gas-booking/:param1/:param2/:param3" element={<GasBooking/>}/>
          <Route exact path="/dashboard-buyer" element={<BuyerDetails/>}/>
          <Route exact path="/dashboard" element={<User/>}/>
          <Route exact path="/dashboard-admin" element={<Buyers/>}/>
        </Routes>
    </Router>
    </store.Provider>
    </div>
  )
}

export default App
