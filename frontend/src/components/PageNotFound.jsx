import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Header from './Header'
import imageNotfount from '../images/error-404.png'

const NotFoundPage = () => {
  const { t } = useTranslation()
  return (
    <div>
      <Header />
      <div className="text-center pt-5">
        <img
          src={imageNotfount}
          alt="notFound"
          className="rounded-circle"
          style={{ width: '300px' }}
        />
        <h1 className="h4 text-muted mt-3">{t('texts.pageNotFound')}</h1>
        <p className="text-muted">
          {t('texts.youCanGo')}
          {' '}
          <Link to="/login">{t('texts.toMainPage')}</Link>
        </p>

      </div>
    </div>
  )
}

export default NotFoundPage
