import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import ChannelItem from './Channel'
import AddChannelModal from '../../modal/addChannelModal'
import { deleteChannelWithServer } from '../../slices/channelsSlice'
import RenameChannelModal from '../../modal/renameChannelModal'

const ChannelList = ({
  channels,
  currentChannelId,
  showAddChannelModal,
  onOpenModal,
  onCloseModal,
  onAddChannel,
  existingChannelNames,
  onRenameChannel,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [showRenameModal, setShowRenameModal] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState(null)

  const handleRename = (channel) => {
    setSelectedChannel(channel)
    setShowRenameModal(true)
  }

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          aria-label={t('channels.addChannel')}
          onClick={onOpenModal}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">{t('channels.plus')}</span>
        </button>
      </div>
      <AddChannelModal
        show={showAddChannelModal}
        handleClose={onCloseModal}
        onAddChannel={onAddChannel}
        existingChannelNames={existingChannelNames}
      />
      <RenameChannelModal
        show={showRenameModal}
        channel={selectedChannel}
        onClose={() => setShowRenameModal(false)}
        onConfirm={onRenameChannel}
        existingChannelNames={existingChannelNames}
      />
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map(channel => (
          <li key={channel.id} className="nav-item w-100">
            <ChannelItem
              channel={channel}
              currentChannelId={currentChannelId}
              onConfirmDelete={channelId => dispatch(deleteChannelWithServer(channelId))}
              onRename={handleRename}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ChannelList
