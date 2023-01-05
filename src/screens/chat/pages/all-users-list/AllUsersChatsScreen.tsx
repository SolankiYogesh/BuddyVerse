import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchBar from 'screens/chat/components/search-bar/SearchBar';
import {images} from 'theme';
import AllUsersScreenStyle from './AllUsersScreenStyle';
import ChatRenderItem from 'screens/chat/components/chat-render-item/ChatRenderItem';
import {Communities, PagingQuery, UsersQuery} from 'getsocial-react-native-sdk';
import screenNameEnum from 'models/screenNameEnum';
import LoadingContainer from 'components/loading-container/LoadingContainer';
import {Emmiter} from 'utils/helper/helper';
import FastImage from 'react-native-fast-image';
import ScreenHeader from '../../components/screen-header/ScreenHeader';
import svg from '../../../../theme/images/svg';
import {ms} from 'react-native-size-matters';
import colorPalates from '../../../../theme/colors/colorPalates';
import NoDataFound from '../../../../components/NoDataFound/NoDataFound';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import useUserState from 'redux-wrapper/reducers/user-slice/userState';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../models/ModalsMessages';
import UserImage from '../../../../components/user-profile-image/UserImage';

const AllUsersChatsScreen = (props: any) => {
  const [chatUsers, setChatUsers] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isChatsList, setIsChatList] = useState(true);
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const {userData} = useUserState();
  const [error, setError] = useState(false);
  const [wait, setWait] = useState(true);

  useEffect(() => {
    getChatsUser();
    const emit = Emmiter.addListener('notification', () => {
      getChatsUser(false);
    });
    return () => {
      emit.remove();
    };
  }, []);

  useEffect(() => {
    if (!searchText) {
      setIsChatList(true);
    } else {
      setIsChatList(false);
    }
  }, [searchText]);

  useEffect(() => {
    if (!searchText) {
      getChatsUser(false);
    } else {
      onPressSearch();
    }
  }, [searchText]);

  const getChatsUser = (isLoad = true) => {
    setIsloading(isLoad);
    try {
      Communities.getChats(new PagingQuery())
        .then((r: any[]) => {
          const filter = _.filter(
            r?.entries,
            i =>
              !Number.isNaN(Number(i?.otherMember?.userId)) &&
              i?.otherMember?.userId !== userData?.id,
          );

          setChatUsers(filter);
          setWait(false);
          setIsloading(false);
        })
        .catch(() => {
          setWait(false);

          setIsloading(false);
        });
    } catch (e) {
      setIsloading(false);
      setWait(false);

      setError(true);
    }
  };

  const onPressSearch = () => {
    if (searchText) {
      // setIsloading(true);
      const query = UsersQuery.find(searchText);
      const pagingQuery = new PagingQuery(query);
      pagingQuery.limit = 50;
      try {
        Communities.getUsers(pagingQuery).then(r => {
          const filterData = _.filter(
            r?.entries,
            i => i?.userId !== userData?.id,
          );
          setUsers(filterData);
        });
      } catch (e) {
        setError(true);
      }
    }
  };

  const onPressSearchUser = item => {
    const findUser = _.find(
      chatUsers,
      i => i?.otherMember?.userId === item?.userId,
    );
    if (!!findUser) {
      navigation.navigate(screenNameEnum.AllChatsScreen, {item: item});
    } else {
      navigation.navigate(screenNameEnum.UserProfileScreen, {
        userId: item?.userId,
      });
    }
  };

  const renderItem = ({item}: any) => {
    return <ChatRenderItem item={item} {...props} />;
  };

  const renderUserItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={AllUsersScreenStyle.itemContainer}
        onPress={() => onPressSearchUser(item)}
      >
        <View style={AllUsersScreenStyle.rowItemVIew}>
          <UserImage
            Url={item?.avatarUrl}
            size={48}
            style={AllUsersScreenStyle.imageView}
          />
          <Text numberOfLines={1} style={AllUsersScreenStyle.textName}>
            {item?.displayName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={AllUsersScreenStyle.containerF2}>
        <ScreenHeader
          svgData={svg.chatMenuIconGreen}
          isBackVisible={true}
          title={'Chat'}
        />

        {isLoading || wait ? (
          <LoadingContainer />
        ) : (
          <View style={AllUsersScreenStyle.viewContainer}>
            <SearchBar
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={onPressSearch}
              onPress={onPressSearch}
              style={{marginTop: ms(20)}}
              isSearchIcon={false}
              width={'100%'}
            />

            {chatUsers.length !== 0 && isChatsList ? (
              <FlatList
                data={chatUsers}
                renderItem={renderItem}
                keyExtractor={(_, index) => `chatsUsers${index}`}
                extraData={chatUsers}
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
              />
            ) : !isChatsList ? (
              <FlatList
                data={users}
                renderItem={renderUserItem}
                keyExtractor={(_, index) => `chatsUsers${index}`}
                extraData={chatUsers}
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
              />
            ) : (
              <NoDataFound
                svgSource={svg.chatMenuIconGreen}
                NodataText={'Chat With Your Friends'}
              />
            )}
          </View>
        )}
        <AnnounceMentModal
          modalVisible={error}
          title={'Oops'}
          buttonText={'Ok'}
          messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
          onPressButton={() => setError(false)}
        />
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colorPalates.white}} />
    </>
  );
};

export default AllUsersChatsScreen;
