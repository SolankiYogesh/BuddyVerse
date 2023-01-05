import {SafeAreaView, View, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Communities, PagingQuery} from 'getsocial-react-native-sdk';
import {styles} from './BlockUsersStyle';
import colors from '../../../../theme/colors/colors';
import BlockedUserItem from './Components/BlockedUserItem';
import LoadingContainer from '../../../../components/loading-container/LoadingContainer';
import _ from 'lodash';
import ScreenHeader from '../../../feed/components/screen-header/ScreenHeader';
import {images} from '../../../../theme';
import NoDataFound from '../../../../components/NoDataFound/NoDataFound';

const BlockUsersScreen = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [isPaginate, setPagination] = useState(false);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState('');
  useEffect(() => {
    getBlockedUsers();
  }, []);

  const getBlockedUsers = (isPagination = false) => {
    const pagingQuery = new PagingQuery();
    if (isPagination && next) {
      pagingQuery.next = next;
    }
    if (isPagination && !next) {
      return;
    }
    setLoading(!isPagination);
    setPagination(isPagination);
    Communities.getBlockedUsers(pagingQuery)
      .then(result => {
        setNext(result.next);
        const data = JSON.parse(JSON.stringify(result?.entries));
        const newData =
          blockedUsers?.length > 0 && isPagination
            ? [...blockedUsers, ...data]
            : data;
        setBlockedUsers(newData);
        setLoading(false);
        setPagination(false);
      })
      .catch(error => {
        console.log('error', error);

        setLoading(false);
        setPagination(false);
      });
  };

  const renderItem = ({item}) => {
    return <BlockedUserItem onRemoveUser={removeUser} item={item} />;
  };

  const removeUser = item => {
    const data = JSON.parse(JSON.stringify(blockedUsers));
    const flderData = _.filter(data, i => i?.userId !== item?.userId);
    setBlockedUsers(flderData);
  };

  const renderBlockedUserList = () => {
    return (
      <FlatList
        data={blockedUsers}
        renderItem={renderItem}
        keyExtractor={item => item?.userId}
        extraData={useState}
        onEndReached={() => getBlockedUsers(true)}
        ListFooterComponent={renderFooterComponent}
        keyboardShouldPersistTaps="always"
      />
    );
  };

  const renderFooterComponent = () => {
    if (isPaginate) {
      return (
        <View style={{width: '100%', marginVertical: 10}}>
          <ActivityIndicator size="large" color={colors.greenShade2A} />
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Blocked Users"
        isBackVisible
        isImage
        svgData={images.blocked}
      />
      <View style={styles.viewContainer}>
        {loading ? (
          <LoadingContainer />
        ) : blockedUsers?.length === 0 ? (
          <NoDataFound
            imageSource={images.blocked}
            NodataText={'No Blocked Users'}
            imgStyle={styles.img}
          />
        ) : (
          renderBlockedUserList()
        )}
      </View>
    </SafeAreaView>
  );
};

export default BlockUsersScreen;
