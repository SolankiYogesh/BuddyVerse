import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MyGroupStyle from './MyGroupStyle';
import {
  Communities,
  PagingQuery,
  GroupsQuery,
  UserId,
} from 'getsocial-react-native-sdk';
import RenderMyGroupItem from 'screens/chat/components/render-mygroup-item/RenderMyGroupItem';
import LinearGradient from 'react-native-linear-gradient';
import {colorPalates, images} from 'theme';
import LoadingContainer from 'components/loading-container/LoadingContainer';
import screenNameEnum from 'models/screenNameEnum';
import {useIsFocused} from '@react-navigation/native';
import _ from 'lodash';
import useUserState from 'redux-wrapper/reducers/user-slice/userState';
import SearchBar from '../../components/search-bar/SearchBar';
import {ms} from 'react-native-size-matters';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../models/ModalsMessages';
const MyGroupScreen = props => {
  const [myGroups, setMyGroups] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const isFocus = useIsFocused();
  const {userData} = useUserState();
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!searchText) {
      getGroups();
    } else {
      serchGroup();
    }
  }, [searchText]);

  useEffect(() => {
    getGroups();

    if (isFocus) {
      getGroups(false);
    }
  }, [isFocus]);

  const onPressPlusIcon = () => {
    props?.navigation?.navigate(screenNameEnum.CreateGroupScreen);
  };

  const getGroups = (load = true) => {
    setLoading(load);
    const query = GroupsQuery.all().withMember(UserId.create(userData?.id));
    let pagingQuery = new PagingQuery(query);

    try {
      Communities.getGroups(pagingQuery)
        .then((result: any[]) => {
          const newData = _.filter(
            result?.entries,
            i => i?.membership?.status === 2,
          );

          setMyGroups(newData);

          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } catch (e) {
      setError(true);
    }
  };

  const serchGroup = () => {
    if (searchText) {
      const query = GroupsQuery.find(searchText).withMember(
        UserId.create(userData?.id),
      );
      let pagingQuery = new PagingQuery(query);

      try {
        Communities.getGroups(pagingQuery)
          .then((result: any[]) => {
            const newData = _.filter(
              result?.entries,
              i => i?.membership?.status === 2,
            );

            setMyGroups(newData);

            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      } catch (e) {
        setError(true);
      }
    }
  };

  const renderItem = ({item}) => {
    return <RenderMyGroupItem item={item} />;
  };

  return (
    <SafeAreaView style={MyGroupStyle.safeareaViewContainer}>
      <View style={MyGroupStyle.mainContainer}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={serchGroup}
          onPress={serchGroup}
          placeHolder={'Search for Topics'}
          style={{marginTop: ms(20)}}
          isSearchIcon={false}
          width={'100%'}
        />
        {isLoading ? (
          <LoadingContainer />
        ) : myGroups?.length !== 0 ? (
          <FlatList
            data={myGroups}
            extraData={useState}
            keyExtractor={(_, index) => `myGroups${index}`}
            renderItem={renderItem}
            keyboardShouldPersistTaps='always'
            keyboardDismissMode='on-drag'
          />
        ) : (
          <View style={MyGroupStyle.onGroupsView}>
            <Text style={MyGroupStyle.onGroupsText}>
              Click + icon to Create Group
            </Text>
          </View>
        )}
        {
          <TouchableOpacity
            style={MyGroupStyle.plusBtnContainer}
            onPress={onPressPlusIcon}
          >
            <LinearGradient
              colors={[colorPalates.greenShade7E, colorPalates.blueShade25]}
              style={MyGroupStyle.plusContainer}
            >
              <Image
                style={MyGroupStyle.plusIcon}
                source={images.plus}
                resizeMode="contain"
              />
            </LinearGradient>
          </TouchableOpacity>
        }
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

export default MyGroupScreen;
