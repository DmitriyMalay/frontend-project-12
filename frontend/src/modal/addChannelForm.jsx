import { useRef, useEffect } from 'react'
import { useFormik } from 'formik'
import { Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import ChannelSchema from '../shemas/ChannelFormShema'
import { toast } from 'react-toastify'

const AddChannelForm = ({
  channel, onSubmit, onCancel, existingChannelNames = [],
}) => {
  const { t } = useTranslation()
  const inputRef = useRef(null)

  const validationSchema = ChannelSchema(existingChannelNames)

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await onSubmit(values)
      toast.success(t('notifications.channel_added_success'))
      resetForm()
    }
    catch (err) {
      console.error('Ошибка добавления канала:', err)
      toast.error(t('notifications.channel_added_error'))
    }
    finally {
      setSubmitting(false)
    }
  }

  const formik = useFormik({
    initialValues: { name: '' },
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
          placeholder={t('modals.channel_name')}
          value={formik.values.name}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.name && formik.touched.name}
          isValid={formik.touched.name && !formik.errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.name && t(formik.errors.name)}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={onCancel} type="button">
          {t('modals.cancel')}
        </Button>
        <Button type="submit" variant="primary" disabled={formik.isSubmitting}>
          {t('modals.submit')}
        </Button>
      </div>
    </Form>
  )
}

export default AddChannelForm
