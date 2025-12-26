import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import socket from '../socket/socket'
import { addChannel, getChannels, setCurrentChannel, renameChannel } from '../slices/channelsSlice'
import { logOut } from '../slices/authSlice'
import { setMessages, addMessage, setSending, setError } from '../slices/messagesSlice'

import Header from './Header'
import routes from '../routes'

import ChannelList from './chat/ChannelList'
import ChatHeader from './chat/ChatHeader'
import MessageList from './chat/MessageList'
import MessageInput from './chat/MessageInput'

const MainPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [showAddChannelModal, setShowAddChannelModal] = useState(false)
  const [messageBody, setMessageBody] = useState('')

  const inputEl = useRef()

  const token = useSelector(state => state.auth.token)
  const username = useSelector(state => state.auth.username)
  const channels = useSelector(state => state.channels.items)
  const currentChannelId = useSelector(state => state.channels.currentChannelId)
  const messages = useSelector(state => state.messages.items)
  const sending = useSelector(state => state.messages.sending)

  const existingChannelNames = channels.map(channel => channel.name)
  const messageCount = messages.filter(msg => msg.channelId === currentChannelId).length

  useEffect(() => {
    inputEl.current?.focus()
  }, [])

  useEffect(() => {
    if (!token) return
    const fetchChannels = async () => {
      try {
        const res = await axios.get('/api/v1/channels', { headers: { Authorization: `Bearer ${token}` } })
        dispatch(getChannels(res.data))
      }
      catch (err) {
        console.error('Ошибка загрузки каналов:', err)
      }
    }
    fetchChannels()
  }, [token, dispatch])

  useEffect(() => {
    if (!currentChannelId || !token) return
    const fetchMessages = async () => {
      dispatch(setMessages([]))
      try {
        const res = await axios.get('/api/v1/messages', { headers: { Authorization: `Bearer ${token}` } })
        dispatch(setMessages(res.data))
      }
      catch (err) {
        console.error('Ошибка загрузки сообщений:', err)
      }
    }
    fetchMessages()
  }, [currentChannelId, token, dispatch])

  useEffect(() => {
    const handleNewMessage = (msg) => {
      dispatch(addMessage(msg))
    }
    socket.on('newMessage', handleNewMessage)
    return () => socket.off('newMessage', handleNewMessage)
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logOut())
    navigate(routes.loginPage(), { replace: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = messageBody.trim()
    if (!body || !currentChannelId) return

    dispatch(setSending(true))
    try {
      await axios.post('/api/v1/messages', {
        body,
        channelId: currentChannelId,
        username,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      })
    }
    catch (err) {
      dispatch(setError(err))
    }
    finally {
      dispatch(setSending(false))
      setMessageBody('')
      inputEl.current?.focus()
    }
  }

  const handleAddChannel = async (values) => {
    try {
      const res = await axios.post('/api/v1/channels', values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch(addChannel(res.data))
      dispatch(setCurrentChannel(res.data.id))
      setShowAddChannelModal(false)
    }
    catch (err) {
      console.error('Не удалось создать канал', err)
    }
  }

  const handleRenameChannel = async (channelId, newName) => {
    try {
      const response = await axios.patch(
        `/api/v1/channels/${channelId}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      dispatch(renameChannel(response.data))
    }
    catch (err) {
      console.error('Ошибка переименования канала:', err)
    }
  }

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Header>
            <button type="button" className="btn btn-primary" onClick={handleLogout}>
              {t('title.logOut')}
            </button>
          </Header>

          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
              <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                <ChannelList
                  channels={channels}
                  currentChannelId={currentChannelId}
                  showAddChannelModal={showAddChannelModal}
                  onOpenModal={() => setShowAddChannelModal(true)}
                  onCloseModal={() => setShowAddChannelModal(false)}
                  onAddChannel={handleAddChannel}
                  existingChannelNames={existingChannelNames}
                  onRenameChannel={handleRenameChannel}
                />
              </div>
              <div className="col p-0 h-100">
                <div className="d-flex flex-column h-100">
                  <ChatHeader
                    channels={channels}
                    currentChannelId={currentChannelId}
                    messageCount={messageCount}
                  />
                  <MessageList
                    messages={messages}
                    currentChannelId={currentChannelId}
                    username={username}
                  />
                  <MessageInput
                    messageBody={messageBody}
                    onChange={e => setMessageBody(e.target.value)}
                    onSubmit={handleSubmit}
                    sending={sending}
                    inputRef={inputEl}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Toastify"></div>
    </div>
  )
}

export default MainPage
