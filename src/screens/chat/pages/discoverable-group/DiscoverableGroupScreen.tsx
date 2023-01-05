import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DiscoverableGroupStyle from './DiscoverableGroupStyle';
import {
  Communities,
  PagingQuery,
  GroupsQuery,
} from 'getsocial-react-native-sdk';
import RenderGroupItem from 'screens/chat/components/render-group-item/RenderGroupItem';
import _ from 'lodash';
import LoadingContainer from 'components/loading-container/LoadingContainer';
import {useIsFocused} from '@react-navigation/native';
import useUserState from 'redux-wrapper/reducers/user-slice/userState';
import SearchBar from '../../components/search-bar/SearchBar';
import colorPalates from '../../../../theme/colors/colorPalates';
import {ms} from 'react-native-size-matters';
import {Emmiter} from '../../../../utils/helper/helper';

const DiscoverableGroupScreen = () => {
  const [publicGroups, setPublicGroups] = useState([]);
  const [privateGroups, setPrivateGroups] = useState([]);
  const [refreshing, setRefresh] = useState(false);
  const isFocus = useIsFocused();
  const {userData} = useUserState();
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    getGroups();
    if (isFocus) {
      getGroups(false);
    }
  }, [isFocus]);

  useEffect(() => {
    const emit = Emmiter.addListener('notification', item => {
      if (item?.action?.type === 'request_to_join_group_approved') {
        getGroups(false);
      }
    });

    return () => {
      emit.remove();
    };
  }, []);

  useEffect(() => {
    if (!searchText) {
      getGroups(true);
    } else {
      onPressSearch();
    }
  }, [searchText]);

  const onRefresh = () => {
    setRefresh(true);
    getGroups();
  };

  const getGroups = (load = true) => {
    const query = GroupsQuery.all();
    let pagingQuery = new PagingQuery(query);
    const publicDisc = [];
    const privateDisc = [];
    setLoading(load);
    try {
      Communities.getGroups(pagingQuery)
        .then((result: any[]) => {
          const filterSelfData = _.filter(
            result?.entries,
            i => i?.membership?.status !== 2,
          );

          _.map(filterSelfData, i => {
            if (
              i?.settings?.isDiscoverable === true &&
              i?.settings?.isPrivate === true
            ) {
              privateDisc.push(i);
            } else {
              publicDisc.push(i);
            }
          });
          setPublicGroups(publicDisc);
          setPrivateGroups(privateDisc);

          setRefresh(false);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        })
        .catch(() => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
          setRefresh(false);
        });
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const onPressSearch = () => {
    if (searchText) {
      const query = GroupsQuery.find(searchText);
      let pagingQuery = new PagingQuery(query);
      pagingQuery.limit = 50;
      setLoading(true);
      const publicDisc = [];
      const privateDisc = [];
      try {
        Communities.getGroups(pagingQuery)
          .then(result => {
            console.log('result', result);

            const filterSelfData = _.filter(
              result?.entries,
              i => i?.membership?.status !== 2,
            );

            _.map(filterSelfData, i => {
              if (
                i?.settings?.isDiscoverable === true &&
                i?.settings?.isPrivate === true
              ) {
                privateDisc.push(i);
              } else {
                publicDisc.push(i);
              }
            });
            setPublicGroups(publicDisc);
            setPrivateGroups(privateDisc);

            setRefresh(false);
            setTimeout(() => {
              setLoading(false);
            }, 500);
          })
          .catch(
            () => {
              setTimeout(() => {
                setLoading(false);
              }, 500);
              setRefresh(false);
            },
            error => {
              console.log('Failed to search for groups, error: ' + error);
              setLoading(false);
            },
          );
      } catch (e) {
        setLoading(false);
        setRefresh(false);
        setError(true);
      }
    }
  };

  const renderItem = ({item}) => {
    return (
      <RenderGroupItem
        item={item}
        isPrivate={true}
        onReload={() => getGroups(false)}
        userID={userData?.id}
      />
    );
  };

  const renderPublicItem = ({item}) => {
    return (
      <RenderGroupItem item={item} isPrivate={false} userID={userData?.id} />
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colorPalates.white}}>
      <View style={DiscoverableGroupStyle.mainViewContainer}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={onPressSearch}
          onPress={onPressSearch}
          placeHolder={'Search for Topics'}
          style={{marginTop: ms(20)}}
          isSearchIcon={false}
          width={'100%'}
        />
        {isLoading ? (
          <LoadingContainer />
        ) : publicGroups.length + privateGroups.length !== 0 ? (
          <ScrollView
            style={DiscoverableGroupStyle.mainContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={DiscoverableGroupStyle.mainContainer}>
              {publicGroups.length !== 0 && (
                <View>
                  <Text style={DiscoverableGroupStyle.publicText}>
                    Public Groups
                  </Text>
                  <FlatList
                    data={publicGroups}
                    extraData={useState}
                    keyExtractor={(_, index) => `publicgroups${index}`}
                    renderItem={renderPublicItem}
                  />
                </View>
              )}
              {privateGroups.length !== 0 && (
                <View>
                  <Text style={DiscoverableGroupStyle.publicText}>
                    Private Groups
                  </Text>
                  <FlatList
                    data={privateGroups}
                    extraData={useState}
                    keyExtractor={(_, index) => `privategroups${index}`}
                    renderItem={renderItem}
                  />
                </View>
              )}
            </View>
          </ScrollView>
        ) : (
          <View style={DiscoverableGroupStyle.container}>
            <Text style={DiscoverableGroupStyle.noGroupText}>
              No Group Found
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DiscoverableGroupScreen;
