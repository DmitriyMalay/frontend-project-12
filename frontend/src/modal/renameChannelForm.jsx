import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import ChannelSchema from '../shemas/ChannelFormShema'
import { toast } from 'react-toastify'

const RenameChannelForm = ({
  channel,
  onSubmit,
  onCancel,
  existingChannelNames = [],
}) => {
  const { t } = useTranslation()
  const inputRef = useRef(null)

  const validationSchema = ChannelSchema(existingChannelNames)

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!channel) return

    try {
      await onSubmit(channel.id, values.name)
      toast.success(t('notifications.channel_rename_success'))
    }
    catch (err) {
      console.error('Ошибка переименования канала:', err)
      toast.error(t('notifications.channel_rename_error'))
    }
    finally {
      setSubmitting(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: channel?.name || '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  })

  useEffect(() => {
    inputRef.current.focus()
    inputRef.current.select()
  }, [channel])

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="name">Имя канала</Form.Label>
        <Form.Control
          ref={inputRef}
          type="text"
          id="name"
          name="name"
          placeholder={channel.name}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={!!formik.errors.name && formik.touched.name}
          isValid={formik.touched.name && !formik.errors.name}
          disabled={formik.isSubmitting}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.name && t(formik.errors.name)}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button
          variant="secondary"
          className="me-2"
          onClick={onCancel}
          type="button"
          disabled={formik.isSubmitting}
        >
          {t('modals.cancel')}
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={formik.isSubmitting}
        >
          {t('modals.send')}
        </Button>
      </div>
    </Form>
  )
}

export default RenameChannelForm
