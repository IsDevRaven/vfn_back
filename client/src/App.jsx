import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUpForm from "./components/forms/SignUpForm.jsx";
import LogInForm from "./components/forms/LogInForm.jsx";
import Profile from "./components/users/Profile.jsx";
import Logout from "./components/users/Logout.jsx";

export default function App() {


    return (
        <Router>
            <Routes>
                <Route path={'/'} element={<div>Virtual Fun English</div>}/>
                <Route path={'/logout'} element={<Logout/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/login'} element={<LogInForm/>}/>
                <Route path={'/signup'} element={<SignUpForm/>}/>
            </Routes>
        </Router>
    )
}
