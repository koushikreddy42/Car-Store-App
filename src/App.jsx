import User from "./Components/Dashboard/User.jsx";
import Edit from "./Components/Dashboard/edit.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
