import {
  FlatList,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import colors from '../../../../theme/colors/colors';
import images from '../../../../theme/images/images';
import fonts from '../../../../theme/fonts/fonts';
import moment from 'moment';
import {getHostnameFromRegex} from '../../../../utils/helper/helper';
import GestureRecognizer from 'react-native-swipe-gestures';
import colorPalates from '../../../../theme/colors/colorPalates';

const OverviewTab = ({
  data,
  onSwipe = () => {},
  onPressDirections = () => {},
}) => {
  // const route = useRoute();
  // const {data} = route?.params;

  const isOpen = data?.opening_hours?.open_now;
  const closeHours = moment(
    data?.opening_hours?.periods[0]?.close?.time,
  ).format('hh A');
  const openHours = moment(data?.opening_hours?.periods[0]?.open?.time).format(
    'hh A',
  );
  const webSite = data?.website;
  const shortWebSite = getHostnameFromRegex(webSite);

  const [visisble, setVisisble] = useState(false);
  const weekData = data?.opening_hours?.weekday_text;

  const openLink = () => {
    Linking.openURL(webSite);
  };

  const renderSeperator = () => {
    return <View style={styles.seprator} />;
  };

  const renderItemTextSeperator = () => {
    return <View style={styles.dotView} />;
  };

  return (
    <GestureRecognizer style={styles.container} onSwipeLeft={onSwipe}>
      <TouchableOpacity onPress={onPressDirections} style={styles.rowContainer}>
        <Image
          style={styles.image}
          source={images.locationMakr}
          resizeMode="contain"
        />
        <Text style={styles.addressText}>{data?.formatted_address}</Text>
      </TouchableOpacity>
      {renderSeperator()}
      <View>
        <TouchableOpacity
          style={styles.rowContainer}
          onPress={() => setVisisble(!visisble)}
        >
          <Image
            style={styles.image}
            source={images.clockMark}
            resizeMode="contain"
          />
          <View style={styles.rowContainer2}>
            <Text
              style={[
                styles.addressText,
                {flex: 0},
              ]}
            >
              {'Hours'}
            </Text>
            {weekData?.length !== 0 && (
              <Image
                source={visisble ? images.up : images.down}
                style={[styles.downArrow]}
                resizeMode="contain"
              />
            )}
          </View>
        </TouchableOpacity>
        {visisble && (
          <FlatList
            data={weekData}
            contentContainerStyle={styles.listdata}
            extraData={data}
            renderItem={({item}) => {
              return (
                <Text style={[styles.addressText, styles.spaceText]}>
                  {item}
                </Text>
              );
            }}
          />
        )}
      </View>
      {renderSeperator()}

      {!!shortWebSite && (
        <TouchableOpacity style={styles.rowContainer} onPress={openLink}>
          <Image
            style={styles.image}
            source={images.web}
            resizeMode="contain"
          />
          <Text style={styles.addressText} numberOfLines={1}>
            {shortWebSite}
          </Text>
        </TouchableOpacity>
      )}
      {!!shortWebSite && renderSeperator()}
    </GestureRecognizer>
  );
};

export default OverviewTab;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  seprator: {
    width: '100%',
    height: vs(1),
    backgroundColor: colors.grayShadeC8,
    marginTop: s(10),
  },
  image: {
    width: vs(20),
    height: vs(20),
    tintColor: colorPalates.AppTheme.primary,
  },
  downArrow: {
    width: vs(20),
    height: vs(20),
    tintColor: colors.blackShade02,
    marginLeft: s(5),
  },
  rowContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: s(20),
    marginTop: s(10),
  },
  addressText: {
    color: colors.blackShade02,
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(13),
    marginLeft: s(25),
    flex: 1,
  },
  rowContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotView: {
    width: vs(2),
    height: vs(2),
    marginHorizontal: s(3),
    backgroundColor: colors.grayShade80,
    borderRadius: ms(300),
    alignSelf: 'center',
  },
  opencloseText: {
    color: colors.blackShade02,
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(13),
  },
  listdata: {
    marginRight: s(20),
    width: '100%',
    paddingStart: s(38),
    marginVertical: s(5),
  },
  spaceText: {
    marginVertical: s(3),
  },
});
