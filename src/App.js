import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeLayout from "./layouts/User/HomeLayout";
import LibraryLayout from "./layouts/User/LibraryLayout";

import HomePage from "./pages/Home/HomePage";
import LibraryPage from "./pages/Library/LibraryPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomeLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path='home' element={<HomePage />} />
                </Route>
                <Route path='/library' element={<LibraryLayout />}>
                    <Route index element={<LibraryPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
