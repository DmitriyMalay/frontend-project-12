import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation()


return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {t('title.hexlet_chat')}
        </a>
      </div>
    </nav>
  );
}

export default Header

