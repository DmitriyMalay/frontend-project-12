import filter from 'leo-profanity';

const MessageList = ({ messages, currentChannelId }) => {
  const filteredMessages = messages.filter((msg) => msg.channelId === currentChannelId);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {filteredMessages.map((msg) => (
        <div key={msg.id} className="message">
          <strong className="message-username">
            {msg.username}
            :
          </strong>
          {' '}
          {filter.clean(msg.body)}
        </div>
      ))}
    </div>
  );
};

export default MessageList;