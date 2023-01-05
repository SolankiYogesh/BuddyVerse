import {View, Text, Linking} from 'react-native';
import React from 'react';
import SimpleMessageStyle from './SimpleMessageStyle';
import moment from 'moment';
import RenderChatItemStyle from '../render-chat-item/RenderChatItemStyle';
import Hyperlink from 'react-native-hyperlink';
const SimpleMessage = (props: any) => {
  const {item, isYou} = props;
  const time = moment.unix(item?.sentAt || item?.createdAt).format('hh:mm');
  const t = item?.text.split(' ');

  return (
    <View>
      {!isYou && (
        <Text style={RenderChatItemStyle.nameText}>
          {item?.author?.displayName}
        </Text>
      )}
      {!!item?.text && (
        <Hyperlink
          linkStyle={RenderChatItemStyle.urlFeedDescription}
          onPress={url => {
            Linking.openURL(url).then(() => {});
          }}
        >
          <Text style={SimpleMessageStyle.WithoutMentionStyle}>
            <Text>
              {t.map((text: string) => {
                if (text.startsWith('@')) {
                  const mentionText = text?.substring(text?.indexOf('@'));
                  return (
                    <Text style={SimpleMessageStyle.mentionStyle}>
                      {mentionText}
                    </Text>
                  );
                }

                return (
                  <Text style={SimpleMessageStyle.WithoutMentionStyle}>
                    {text}{' '}
                  </Text>
                );
              })}
            </Text>
          </Text>
        </Hyperlink>
      )}

      <View style={SimpleMessageStyle.timeReadView}>
        <Text style={SimpleMessageStyle.timeText}>{time}</Text>
        {/* {isYou && <View style={SimpleMessageStyle.dotView} />} */}
        {/* {isYou && <Text style={SimpleMessageStyle.timeText}>Read</Text>} */}
      </View>
    </View>
  );
};

export default SimpleMessage;
