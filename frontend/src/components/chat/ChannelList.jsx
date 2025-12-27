import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import ChannelItem from './Channel'
import AddChannelModal from '../../modal/addChannelModal'
import { deleteChannelWithServer } from '../../slices/channelsSlice'
import RenameChannelModal from '../../modal/RenameChannelModal'
import PlusIcon from '../../images/icons/Plus'

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
          <PlusIcon />
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
