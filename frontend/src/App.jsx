import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from  './components/PageNotFound'
import LoginPage from './components/LoginPage'
import './i18n'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
