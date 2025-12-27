import { useTranslation } from 'react-i18next'
import MessageInputIcon from '../../images/icons/MessageInputIcon'

const MessageInput = ({
  messageBody,
  onChange,
  onSubmit,
  sending,
  inputRef,
}) => {
  const { t } = useTranslation()

  return (
    <div className="mt-auto px-5 py-3">
      <form noValidate className="py-1 border rounded-2" onSubmit={onSubmit}>
        <div className="input-group has-validation">
          <input
            name="body"
            aria-label={t('chat.new_message')}
            placeholder={t('chat.placeholder')}
            className="border-0 p-0 ps-2 form-control"
            ref={inputRef}
            value={messageBody}
            onChange={onChange}
          />
          <button
            type="submit"
            disabled={!messageBody.trim() || sending}
            className="btn btn-group-vertical"
          >
            <MessageInputIcon />
            <span className="visually-hidden">{t('chat.send')}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default MessageInput
