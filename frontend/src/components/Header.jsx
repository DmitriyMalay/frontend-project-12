import { useTranslation } from 'react-i18next';
import routes from '../routes';

const Header = ({ children }) => {
  const { t } = useTranslation();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href={routes.mainPage()}>
          {t('title.hexletChat')}
        </a>
        {children}
      </div>
    </nav>
  );
};

export default Header;
