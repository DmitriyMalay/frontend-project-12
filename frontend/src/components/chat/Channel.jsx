import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setCurrentChannel } from '../../slices/channelsSlice'
import ConfirmDeleteChannelModal from '../../modal/deleteChannelModal'
import filter from 'leo-profanity'

const ChannelItem = ({
  channel,
  currentChannelId,
  onConfirmDelete,
  onRename,
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const isActive = currentChannelId === channel.id
  const btnClass = isActive ? 'btn-secondary' : 'btn-light'

  const handleChannelClick = () => {
    dispatch(setCurrentChannel(channel.id))
  }

  const handleRenameClick = () => {
    if (onRename) {
      onRename(channel)
    }
  }

  const handleDeleteClick = () => {
    setShowConfirmModal(true)
  }

  const handleConfirmDelete = () => {
    onConfirmDelete(channel.id)
    setShowConfirmModal(false)
  }

  return (
    <>
      <div className="btn-group w-100" role="group">
        <button
          type="button"
          className={`btn w-100 rounded-0 text-start ${btnClass} text-truncate`}
          onClick={handleChannelClick}
        >
          <span className="me-1">#</span>
          {filter.clean(channel.name)}
        </button>

        {channel.removable && (
          <>
            <button
              type="button"
              className={`btn ${btnClass} dropdown-toggle dropdown-toggle-split`}
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={e => e.stopPropagation()}
            >
              <span className="visually-hidden">{t('channels.manageChannel')}</span>
            </button>

            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" type="button" onClick={handleRenameClick}>
                  {t('channels.rename')}
                </button>
              </li>
              <li>
                <button className="dropdown-item" type="button" onClick={handleDeleteClick}>
                  {t('channels.delete')}
                </button>
              </li>
            </ul>
          </>
        )}
      </div>

      {channel.removable && (
        <ConfirmDeleteChannelModal
          show={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmDelete}
          channelName={channel.name}
        />
      )}
    </>
  )
}

export default ChannelItem
