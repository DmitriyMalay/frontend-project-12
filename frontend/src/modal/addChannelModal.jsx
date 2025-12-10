import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AddChannelForm from './addChannelForm';

const AddChannelModal = ({
  show, handleClose, onAddChannel, existingChannelNames,
}) => {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add_channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddChannelForm
          onSubmit={onAddChannel}
          onCancel={handleClose}
          existingChannelNames={existingChannelNames}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
