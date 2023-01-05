import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNameEnum from 'models/screenNameEnum';
import AllChatsScreen from 'screens/chat/pages/all-chats-list/AllChatsScreen';
import ChatTabsScreen from 'screens/chat/pages/chat-tabs/ChatTabsScreen';
import CreateGroupScreen from 'screens/chat/pages/create-group/CreateGroupScreen';
import AddMembersScreen from 'screens/chat/pages/add-members/AddMembersScreen';
import EditGroupScreen from 'screens/chat/pages/edit-group/EditGroupScreen';
import GroupChatsScreen from 'screens/chat/pages/group-chats/GroupChatsScreen';
import VideoPlayScreen from 'screens/chat/pages/video-play/VideoPlayScreen';

const ChatStack = createNativeStackNavigator();
const ChatNavigation = props => {
  const isNavRoute = props?.route?.params?.isNavRoute;
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name={screenNameEnum.ChatTabsScreen}
        component={ChatTabsScreen}
        options={{
          headerShown: false,
        }}
        initialParams={{isNavRoute}}
      />
      <ChatStack.Screen
        name={screenNameEnum.AllChatsScreen}
        component={AllChatsScreen}
        options={{
          headerShown: false,
        }}
      />
      <ChatStack.Screen
        name={screenNameEnum.CreateGroupScreen}
        component={CreateGroupScreen}
        options={{
          headerShown: false,
        }}
      />
      <ChatStack.Screen
        name={screenNameEnum.AddMembersScreen}
        component={AddMembersScreen}
        options={{
          headerShown: false,
        }}
      />
      <ChatStack.Screen
        name={screenNameEnum.EditGroupScreen}
        component={EditGroupScreen}
        options={{
          headerShown: false,
        }}
      />
      <ChatStack.Screen
        name={screenNameEnum.GroupChatsScreen}
        component={GroupChatsScreen}
        options={{
          headerShown: false,
        }}
      />
      <ChatStack.Screen
        name={screenNameEnum.VideoPlayScreen}
        component={VideoPlayScreen}
        options={{
          headerShown: false,
        }}
      />
    </ChatStack.Navigator>
  );
};

export default ChatNavigation;
