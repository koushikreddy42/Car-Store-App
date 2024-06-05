import ElectricIndex from "./pages/ElectricIndex"
import GasIndex from "./pages/GasIndex";
import Login from "./pages/Login"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/electric" element={<ElectricIndex/>}/>
          <Route exact path="/gas" element={<GasIndex/>}/>
          <Route exact path="/" element={<Login/>}/>
        </Routes>
      </div>
    </Router>
    
  )
}

export default App
