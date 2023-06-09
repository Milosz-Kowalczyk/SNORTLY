import HomePage from './pages/HomePage';
import Page404 from './pages/Page404';
import './styles/App.scss'

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
