import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from  './components/PageNotFound'
import LoginPage from './components/LoginPage'
import MainPage from './components/MainPage'
import './i18n'
import routes from './routes.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import RequireAuth from './components/RequireAuth'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.loginPage()} element={<LoginPage />} />
        <Route path={routes.notFoundPage()} element={<NotFound />} />
        <Route
        path={routes.mainPage()}
        element={
          <RequireAuth>
            <MainPage />
          </RequireAuth>
        }
      />
      </Routes>
    </BrowserRouter>

  )
}

export default App
