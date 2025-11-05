import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../slices/authSlice';
import routes from '../routes';
import Header from './Header';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getChannels, setCurrentChannel } from '../slices/channelsSlice';
import { setMessages, addMessage, setSending, setError } from '../slices/messagesSlice';
import socket from '../socket/socket';



const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const token = useSelector((state) => state.auth.token);

  const channels = useSelector((state) => state.channels.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages.items);
  const sending = useSelector((state) => state.messages.sending);
  
  const formRef = useRef();
  const inputEl = useRef()
  const username = useSelector((state) => state.auth.username)
  
  const [messageBody, setMessageBody] = useState('');

  useEffect(() => {
    inputEl.current?.focus();
  },[])

  useEffect(() => {
    if (!token) return;

    const fetchChannels = async () => {
      try {
        const response = await axios.get('/api/v1/channels', {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(getChannels(response.data));
      } catch (error) {
        console.error('Ошибка загрузки каналов:', error);
      }
    };

    fetchChannels();
  }, [token, dispatch])

  useEffect(() => {
    if (!currentChannelId || !token) return;

    const fetchMessages = async () => {
      dispatch(setMessages([]));
      try {
        const response = await axios.get('/api/v1/messages', 
        { headers: { Authorization: `Bearer ${token}` } })
        dispatch(setMessages(response.data));
      } catch (error) {
        console.error('Ошибка загрузки сообщений:', error);
      }
    };
    fetchMessages();
  }, [currentChannelId, token, dispatch]);

  useEffect(() => {
    const handleNewMessage = (message) => {
      dispatch(addMessage(message));
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, []);


  const handleLogout = () => {  
    dispatch(logOut());
    navigate(routes.loginPage(), { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = messageBody.trim();
    if (!body || !currentChannelId) return;

    dispatch(setSending(true));

    const newMessage = {
      body,
      channelId: currentChannelId,
    };

    try {
      const response = await axios.post('/api/v1/messages', newMessage, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      dispatch(setError(err));
    } finally {
      dispatch(setSending(false));
      setMessageBody('');
      inputEl.current?.focus();
  }
}

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Header>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleLogout}
            >
              {t('title.logOut')}
            </button>
          </Header>
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
              <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                  <b>{t('chanels.chanels')}</b>
                  <button
                    type="button"
                    className="p-0 text-primary btn btn-group-vertical"
                    aria-label="Добавить канал"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-plus-square"
                    >
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                  </button>
                </div>
                <ul
                  id="channels-box"
                  className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
                >
                  {channels.map((channel) => (
                    <li key={channel.id} className="nav-item w-100">
                      <button
                        type="button"
                        className={`w-100 rounded-0 text-start btn ${currentChannelId === channel.id ? 'btn-secondary' : ''}`}
                        onClick={() => dispatch(setCurrentChannel(channel.id))}
                      >
                        <span className="me-1">#</span>
                        {channel.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col p-0 h-100">
                <div className="d-flex flex-column h-100">
                  <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0">
                      <b># general</b>
                    </p>
                    <span className="text-muted">0 сообщений</span>
                  </div>
                  <div id="messages-box" className="chat-messages overflow-auto px-5">
                  {messages
                    .filter(msg => msg.channelId === currentChannelId)
                    .map((msg) => (
                      <div key={msg.id}>
                        <strong>{username}:</strong> {msg.body}
                      </div>
                  ))}
                  </div>
                  <div className="mt-auto px-5 py-3">
                    <form 
                    noValidate 
                    className="py-1 border rounded-2"
                    ref={formRef}
                    onSubmit={handleSubmit} 
                    >
                      <div className="input-group has-validation">
                        <input
                          name="body"
                          aria-label="Новое сообщение"
                          placeholder="Введите сообщение..."
                          className="border-0 p-0 ps-2 form-control"
                          ref={inputEl}
                          value={messageBody}
                          onChange={(e) => setMessageBody(e.target.value)}                   
                        />
                        <button 
                          type="submit"
                          disabled={!messageBody.trim() || sending} 
                          className="btn btn-group-vertical"
                         >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-arrow-right-square"
                          >
                            <path
                              fillRule="evenodd"
                              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                            />
                          </svg>
                          <span className="visually-hidden">Отправить</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Toastify"></div>
    </div>
  );
};


export default ChatPage;