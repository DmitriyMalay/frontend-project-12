import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/PageNotFound';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import RegistrationForm from './components/RegistrationPage.jsx';
import './i18n';
import routes from './routes.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import RequireAuth from './components/RequireAuth';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react';
import rollbarConfig from './rollbar/rollbarConfig.js';

const AppData = () => (
  <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <Routes>
      <Route path={routes.loginPage()} element={<LoginPage />} />
      <Route path={routes.notFoundPage()} element={<NotFound />} />
      <Route path={routes.signUpPage()} element={<RegistrationForm />} />
      <Route
        path={routes.mainPage()}
        element={(
          <RequireAuth>
            <MainPage />
          </RequireAuth>
        )}
      />
    </Routes>
  </>
);

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <BrowserRouter>
        <AppData />
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>
);

export default App;