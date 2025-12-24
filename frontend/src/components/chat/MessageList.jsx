import filter from 'leo-profanity';

const MessageList = ({ messages, currentChannelId, username }) => {
  const filteredMessages = messages.filter((msg) => msg.channelId === currentChannelId);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {filteredMessages.map((msg) => (
        <div key={msg.id}>
          <strong>
            {username}
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
