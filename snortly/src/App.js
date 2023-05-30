import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import SignInPage from './pages/SignInPage';
import './styles/App.scss'

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
