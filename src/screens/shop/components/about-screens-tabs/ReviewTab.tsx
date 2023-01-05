import {FlatList, Text, View} from 'react-native';
import React from 'react';
import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import colors from '../../../../theme/colors/colors';
import FastImage from 'react-native-fast-image';
import StarRating from 'react-native-star-rating';
import fonts from '../../../../theme/fonts/fonts';
import GestureRecognizer from 'react-native-swipe-gestures';

const ReviewTab = ({data, onSwipe = () => {}}) => {
  // const route = useRoute();
  // const {data} = route?.params;

  const reviewList = data?.reviews;
  console.log('reviewList', reviewList);
  console.log('data', data);

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.profileCOntainer}>
          <FastImage
            source={{uri: item?.profile_photo_url}}
            resizeMode="cover"
            style={styles.profileImage}
          />
          <Text style={styles.authorName}>{item?.author_name}</Text>
        </View>
        <View style={styles.profileCOntainer}>
          <StarRating
            disabled={true}
            starSize={12}
            starStyle={{marginHorizontal: s(2)}}
            rating={Number(item?.rating)}
            fullStarColor={colors.yellowShadeFFC}
          />
          <Text style={styles.timeAgoText}>
            {item?.relative_time_description}
          </Text>
        </View>
        <Text style={styles.reviewText}>{item?.text}</Text>
      </View>
    );
  };
  return (
    <GestureRecognizer style={styles.container} onSwipeRight={onSwipe}>
      <FlatList
        data={reviewList}
        extraData={reviewList}
        renderItem={renderItem}
        keyExtractor={(_, index) => `review${index}`}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </GestureRecognizer>
  );
};

export default ReviewTab;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  itemContainer: {
    elevation: 5,
    width: '95%',
    borderRadius: ms(10),
    padding: s(10),
    marginVertical: s(5),
    alignSelf: 'center',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  profileCOntainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: s(5),
  },
  profileImage: {
    width: vs(40),
    height: vs(40),
    borderRadius: ms(300),
  },
  authorName: {
    color: colors.blackShade02,
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(14),
    marginLeft: s(10),
  },
  timeAgoText: {
    backgroundColor: `${colors.greenShade5E}80`,
    borderRadius: ms(50),
    padding: s(5),
    color: 'green',
    marginLeft: s(10),
  },
  reviewText: {
    color: colors.blackShade02,
    fontFamily: fonts.primaryLightFont,
    fontSize: ms(14),
    marginTop: s(5),
  },
  // timeAgoText: {
  //   lineHeight: 21,
  // },
});
