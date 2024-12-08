import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { pdfjs } from "react-pdf";

import "./App.css";
import HomeLayout from "./layouts/User/Home/HomeLayout";
import AuthLayout from "./layouts/User/Auth/AuthLayout";
import BookLayout from "./layouts/User/Book/BookLayout";
import AdminLayout from "./layouts/Admin/AdminLayout";

import HomePage from "./pages/Home/HomePage";
import AboutPage from "./pages/About/AboutPage";
import HelpPage from "./pages/Help/HelpPage";
import UploadPage from "./pages/Upload/UploadPage";
import RequestPage from "./pages/Request/RequestPage";
import IntroductionPage from "./pages/Introduction/IntroductionPage";
import IntroductionDetailPage from "./pages/Introduction/IntroductionDetailPage";
import ProfilePage from "./pages/Profile/ProfilePage";

import LoginPage from "./pages/Auth/Login/LoginPage";
import ForgotPage from "./pages/Auth/Forgot/ForgotPage";
import VertifyPage from "./pages/Auth/Vertify/VertifyPage";

import LibraryPage from "./pages/Library/LibraryPage";
import BookPage from "./pages/Book/BookPage";

import AdminUserPage from "./pages/Admin/User/AdminUserPage";
import AdminBookPage from "./pages/Admin/Book/AdminBookPage";
import AdminCatePage from "./pages/Admin/Category/AdminCatePage";
import AdminHistoryPage from "./pages/Admin/History/AdminHistoryPage";
import AdminIntroPage from "./pages/Admin/Introduction/AdminIntroPage";
import AdminRequestPage from "./pages/Admin/Request/AdminRequestPage";
import AdminReviewPage from "./pages/Admin/Review/AdminReviewPage";
import AdminSupportPage from "./pages/Admin/Support/AdminSupportPage";
import AdminUploadPage from "./pages/Admin/Upload/AdminUploadPage";

// Cấu hình đường dẫn worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
                    <Route
                        path='introductions/:id'
                        element={<IntroductionDetailPage />}
                    />
                    <Route path='profile' element={<ProfilePage />} />
                    <Route path='profile/bookshelf' element={<ProfilePage />} />
                    <Route path='profile/request' element={<ProfilePage />} />
                    <Route
                        path='profile/changePassword'
                        element={<ProfilePage />}
                    />
                </Route>
                <Route path='/auth/' element={<AuthLayout />}>
                    <Route index element={<LoginPage />} />
                    <Route path='login' element={<LoginPage />} />
                    <Route path='forgot' element={<ForgotPage />} />
                    <Route path='vertify' element={<VertifyPage />} />
                </Route>
                <Route path='/book/' element={<BookLayout />}>
                    <Route path=':id' element={<BookPage />} />
                </Route>
                {/* Admin route */}
                <Route path='/admin/' element={<AdminLayout />}>
                    <Route path='' element={<AdminUserPage />} />
                    <Route path='user' element={<AdminUserPage />} />
                    <Route path='book' element={<AdminBookPage />} />
                    <Route path='category' element={<AdminCatePage />} />
                    <Route path='history' element={<AdminHistoryPage />} />
                    <Route path='introduction' element={<AdminIntroPage />} />
                    <Route path='request' element={<AdminRequestPage />} />
                    <Route path='review' element={<AdminReviewPage />} />
                    <Route path='support' element={<AdminSupportPage />} />
                    <Route path='upload' element={<AdminUploadPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
