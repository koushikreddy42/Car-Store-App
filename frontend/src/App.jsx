import ElectricIndex from "./components/ElectricIndex/ElectricIndex"
import Login from "./components/Login/Login"
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
          <Route exact path="/" element={<ElectricIndex/>}/>
          <Route exact path="/login" element={<Login/>}/>
        </Routes>
      </div>
    </Router>
    
  )
}

export default App
