import React from 'react';
import { useTranslation } from 'react-i18next';

const ChatHeader = ({ channels, currentChannelId, messageCount }) => {
  const { t } = useTranslation();

  const currentChannel = channels.find((ch) => ch.id === currentChannelId);
  const channelName = currentChannel ? currentChannel.name : '';

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {channelName}
        </b>
      </p>
      <span className="text-muted">
        {t('chat.messages', { count: messageCount })}
      </span>
    </div>
  );
};

export default ChatHeader;
