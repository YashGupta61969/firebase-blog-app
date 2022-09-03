import {Routes, Route} from 'react-router-dom'
import Login from "./components/Login";
import Home from "./components/Home";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      
      <Routes>
          <Route index element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
