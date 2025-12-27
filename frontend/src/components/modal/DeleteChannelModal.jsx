import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const ConfirmDeleteChannelModal = ({
  show,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation()

  const handleConfirm = async () => {
    try {
      await onConfirm()

      toast.success(t('notifications.channel_delete_success'))
      onClose()
    }
    catch (error) {
      console.error('Ошибка удаления канала:', error)

      toast.error(t('notifications.channel_delete_error'))
    }
  }

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
          <Button variant="danger" onClick={handleConfirm}>
            {t('modals.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ConfirmDeleteChannelModal
