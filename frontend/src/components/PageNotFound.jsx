import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import imageNotfount from '../images/error-404.png';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Header />
      <div className="text-center">
        <h1 className="h4 text-muted mt-3">{t('texts.page_not_found')}</h1>
        <p className="text-muted">
          {t('texts.you_can_go')}
          {' '}
          <Link to="/login">{t('texts.to_main_page')}</Link>
        </p>
        <img
          src={imageNotfount}
          alt="notFound"
          className="img-fluid not-found-image"
        />
      </div>
    </div>
  );
};

export default NotFoundPage;