import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeLayout from "./layouts/User/Home/HomeLayout";
import AuthLayout from "./layouts/User/Auth/AuthLayout";
import BookLayout from "./layouts/User/Book/BookLayout";

import HomePage from "./pages/Home/HomePage";
import AboutPage from "./pages/About/AboutPage";
import HelpPage from "./pages/Help/HelpPage";
import UploadPage from "./pages/Upload/UploadPage";
import RequestPage from "./pages/Request/RequestPage";
import IntroductionPage from "./pages/Introduction/IntroductionPage";

import LoginPage from "./pages/Auth/Login/LoginPage";
import ForgotPage from "./pages/Auth/Forgot/ForgotPage";

import LibraryPage from "./pages/Library/LibraryPage";
import BookPage from "./pages/Book/BookPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomeLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path='home' element={<HomePage />} />
                    <Route path='about' element={<AboutPage />} />
                    <Route path='help' element={<HelpPage />} />
                    <Route path='upload' element={<UploadPage />} />
                    <Route path='request' element={<RequestPage />} />
                    <Route path='library' element={<LibraryPage />} />
                    <Route
                        path='introductions'
                        element={<IntroductionPage />}
                    />
                </Route>
                <Route path='/auth/' element={<AuthLayout />}>
                    <Route index element={<LoginPage />} />
                    <Route path='login' element={<LoginPage />} />
                    <Route path='forgot' element={<ForgotPage />} />
                </Route>
                <Route path='/book/' element={<BookLayout />}>
                    <Route path=':id' element={<BookPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
