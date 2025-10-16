import { useTranslation } from 'react-i18next'

const Header = ({ children }) => {
  const { t } = useTranslation()

return (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <a className="navbar-brand" href="/">
        {t('title.hexletChat')}
      </a>
      {children}
    </div>
  </nav>
  );
}

export default Header

