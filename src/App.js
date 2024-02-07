import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import RequireAuth from "./components/requireAuth";

const App = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element ={<Login/>}  />
                <Route path='/signup' element = {<Signup />} />
                <Route path="/" element = {<RequireAuth> <Home /> </RequireAuth>} />

            </Routes>
        </BrowserRouter>
    )
}

export default App;