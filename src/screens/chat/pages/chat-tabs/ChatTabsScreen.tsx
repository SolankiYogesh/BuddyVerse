import {View} from 'react-native';
import React, {useState} from 'react';
import ChatTabsStyle from './ChatTabsStyle';
import ScreenHeader from 'screens/chat/components/screen-header/ScreenHeader';
import TopTabBar from 'screens/chat/components/top-tab-bar/TopTabBar';
import svg from '../../../../theme/images/svg';

const ChatTabsScreen = props => {
  const [route, setRoute] = useState('');
  return (
    <View style={ChatTabsStyle.containerF2}>
      <ScreenHeader
        isBackVisible={true}
        title={route}
        svgData={svg.frameIconGreen}
      />
      <TopTabBar
        {...props}
        onChange={text => {
          setRoute(text);
        }}
      />
    </View>
  );
};

export default ChatTabsScreen;
