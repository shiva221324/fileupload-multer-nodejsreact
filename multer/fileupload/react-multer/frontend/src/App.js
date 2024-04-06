import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Single from "./pages/Single";
import Multiple from "./pages/Multiple";
import Showall from "./pages/Showall";
const App = () => {
  return (
    <BrowserRouter>
      <div>
        <button>
          <NavLink to="/singlefile">Upload Single</NavLink>
        </button>
        <button>
          <NavLink to="/multiplefiles">Upload Multiple</NavLink>
        </button>
        <button>
          <NavLink to="/showall">Showall</NavLink>
        </button>
      </div>
      <Routes>
        <Route path="/singlefile" element={<Single />}></Route>
        <Route path="/multiplefiles" element={<Multiple />}></Route>
        <Route path="/showall" element={<Showall />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
