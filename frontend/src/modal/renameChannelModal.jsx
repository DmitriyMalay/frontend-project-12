import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import RenameChannelForm from './renameChannelForm';

const RenameChannelModal = ({
  show,
  channel,
  onClose,
  onConfirm,
  existingChannelNames = [],
}) => {
  const { t } = useTranslation();

  const handleSubmit = (channelId, newName) => {
    onConfirm(channelId, newName);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RenameChannelForm
          channel={channel}
          onSubmit={handleSubmit}
          onCancel={onClose}
          existingChannelNames={existingChannelNames}
        />
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
