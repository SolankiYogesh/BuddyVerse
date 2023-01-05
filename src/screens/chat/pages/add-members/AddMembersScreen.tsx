import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenHeader from 'screens/chat/components/screen-header/ScreenHeader';
import AddMembersScreenStyle from './AddMembersScreenStyle';
import {images} from 'theme';
import colors from 'theme/colors/colors';
import CheckBox from 'react-native-check-box';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import {Communities, PagingQuery, UsersQuery} from 'getsocial-react-native-sdk';
import ThemeButton from 'components/theme-button/ThemeButton';
import LoadingContainer from 'components/loading-container/LoadingContainer';
import SearchBar from 'screens/chat/components/search-bar/SearchBar';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from '../../../../models/screenNameEnum';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../models/ModalsMessages';
import UserImage from '../../../../components/user-profile-image/UserImage';

const AddMembersScreen = props => {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [next, setNext] = useState('');
  const [paggingLoader, setpaggingLoader] = useState(false);
  const [selectedUser, setSelectedUsers] = useState([]);
  const navigation = useNavigation();
  const [error, setError] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (!searchText) {
      getUsers(false);
    } else {
      searchUser();
    }
  }, [searchText]);

  const searchUser = () => {
    const query = UsersQuery.find(searchText);
    const pagingQuery = new PagingQuery(query);
    pagingQuery.limit = 50;
    try {
      setIsLoading(true);
      Communities.getUsers(pagingQuery)
        .then(r => {
          setIsLoading(false);

          intialSetup(r?.entries);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } catch (e) {
      setError(true);
    }
  };

  const getUsers = (isLoad = true) => {
    setIsLoading(isLoad);
    const query = UsersQuery.suggested();
    const pagingQuery = new PagingQuery(query);
    try {
      setIsLoading(true);
      Communities.getUsers(pagingQuery)
        .then(r => {
          setIsLoading(false);

          intialSetup(r?.entries);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } catch (e) {
      setIsLoading(true);
    }
  };

  const onEndReach = () => {
    if (next) {
      const query = UsersQuery.suggested();
      let pagingQuery = new PagingQuery(query);
      pagingQuery.next = next;
      setpaggingLoader(true);
      try {
        Communities.getUsers(pagingQuery)
          .then(r => {
            setNext(r?.next);

            setpaggingLoader(false);

            intialSetup(r?.entries, true);
          })
          .catch(() => {
            setpaggingLoader(false);
          });
      } catch (e) {
        setError(true);
      }
    }
  };

  const intialSetup = (items, pagination = false) => {
    const data = _.filter(items, i => i?.displayName !== '');
    for (let i = 0; i < data?.length; i++) {
      data[i].isSelected = false;

      const item = _.find(
        selectedUser,
        index => index?.userId === data[i]?.userId,
      );
      if (item) {
        data[i].isSelected = true;
      }
    }

    if (pagination) {
      setUsers([...items, ...data]);
    } else {
      setUsers(data);
    }
  };

  const onPressAddMembers = () => {
    if (selectedUser?.length === 0) {
      return;
    } else {
      props?.route?.params?.onAdd(selectedUser);
      props?.navigation.pop();
    }
  };

  const onPressSelect = item => {
    let selectedItems = JSON.parse(JSON.stringify(selectedUser));
    const members = JSON.parse(JSON.stringify(users));

    const findIndex = _.findIndex(users, i => i?.userId === item?.userId);

    if (item?.isSelected) {
      selectedItems = _.filter(selectedUser, i => i?.userId !== item?.userId);
      members[findIndex].isSelected = false;
      setUsers(members);
    } else {
      selectedItems.push(item);
      members[findIndex].isSelected = true;
      setUsers(members);
    }
    setSelectedUsers(selectedItems);
  };

  const renderSearchView = () => {
    return (
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        onPress={searchUser}
        onSubmitEditing={searchUser}
        isSearchIcon={false}
        width={'100%'}
      />
    );
  };

  const renderLoaderComponents = () => {
    if (paggingLoader) {
      return <ActivityIndicator size={'small'} color={colors.blueShade00} />;
    }
    return null;
  };

  const renderBottomButton = () => {
    return (
      <ThemeButton
        onPress={onPressAddMembers}
        loading={false}
        containerStyle={AddMembersScreenStyle.btnContainer}
        title={`Add Members (${selectedUser.length})`}
      />
    );
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={AddMembersScreenStyle.itemContainer}
        onPress={() => onPressSelect(item)}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(screenNameEnum.UserProfileScreen, {
              userId: item?.userId,
            });
          }}
          style={AddMembersScreenStyle.rowItemVIew}
        >
          <UserImage
            Url={item?.avatarUrl}
            size={48}
            style={AddMembersScreenStyle.profileView}
          />

          <Text style={AddMembersScreenStyle.textName}>
            {item?.displayName}
          </Text>
        </TouchableOpacity>
        <CheckBox
          onClick={() => {}}
          isChecked={item?.isSelected}
          uncheckedCheckBoxColor={colors.grayShade80}
          checkedCheckBoxColor={colors.greenShade2A}
        />
      </TouchableOpacity>
    );
  };

  const renderListOfUsers = () => {
    return isLoading ? (
      <LoadingContainer />
    ) : users?.length !== 0 ? (
      <FlatList
        data={users}
        extraData={useState}
        keyExtractor={(_, index) => `users${index}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReach}
        ListFooterComponent={renderLoaderComponents}
      />
    ) : (
      <View style={AddMembersScreenStyle.noUsersView}>
        <Text style={AddMembersScreenStyle.textName}>No Users Found</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={AddMembersScreenStyle.container}>
      <ScreenHeader isBackVisible={true} title={'Add Member'} />
      <View style={AddMembersScreenStyle.viewContainer}>
        {renderSearchView()}
        {renderListOfUsers()}
        {users?.length !== 0 && renderBottomButton()}
      </View>
      <AnnounceMentModal
        modalVisible={error}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
        onPressButton={() => setError(false)}
      />
    </SafeAreaView>
  );
};

export default AddMembersScreen;
