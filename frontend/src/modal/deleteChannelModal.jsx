import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ConfirmDeleteChannelModal = ({
  show, onClose, onConfirm, channelName,
}) => {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.body')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={onClose} className="me-2">
            {t('modals.cancel')}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {t('modals.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmDeleteChannelModal;
