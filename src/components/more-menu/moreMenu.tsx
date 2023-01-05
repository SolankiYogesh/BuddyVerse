import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Easing,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './moreMenuStyle';
import screenNameEnum from 'models/screenNameEnum';
import {Emmiter} from 'utils/helper/helper';
import images from '../../theme/images/images';
import {SvgXml} from 'react-native-svg';
import svg from '../../theme/images/svg';
import {ms} from 'react-native-size-matters';

interface ToggleMenuProps {
  isGreenTalk?: boolean;
  setMenuToggled?: (b: boolean) => void;
  menuToggled?: boolean;
  navigation?: object;
  onchangeGreenTalk?: (b: boolean) => void;
}

const MoreMenu = ({
  isGreenTalk = false,
  setMenuToggled,
  menuToggled,
  navigation,
  onchangeGreenTalk,
}: ToggleMenuProps) => {
  const [height, setHeight] = useState(0);
  const formHeight = new Animated.Value(0);
  const [rotation, setRotation] = useState('20deg');
  const spinValue = new Animated.Value(0);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!menuToggled) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }, [menuToggled]);

  useEffect(() => {
    const emit = Emmiter.addListener('tabBtnPress', () => {
      setMenuToggled(false);
    });

    return () => {
      emit.remove();
    };
  }, []);

  useEffect(() => {
    if (menuToggled) {
      Animated.timing(formHeight, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
      setHeight(
        formHeight.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 80],
        }),
      );
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.circle,
        useNativeDriver: true,
      }).start();
      setRotation(
        spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['90deg', '0deg'],
        }),
      );
    }
    if (!menuToggled) {
      Animated.timing(formHeight, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
      setHeight(
        formHeight.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      );
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
      setRotation(
        spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '90deg'],
        }),
      );
    }
  }, [menuToggled]);

  const onPressHandler = routeName => {
    setMenuToggled(false);

    if (routeName === 'GreenTalk') {
      onchangeGreenTalk(true);
    } else if (routeName === 'FeedList') {
      onchangeGreenTalk(false);
    }

    navigation.navigate(routeName);
  };
  return (
    <>
      {showMenu && (
        <>
          <Animated.View
            style={[styles.absoluteBackground, {transform: [{scaleY: height}]}]}
          >
            <TouchableOpacity
              onPressIn={() => {
                setMenuToggled(false);
              }}
              style={styles.flex}
            />
          </Animated.View>

          <Animated.View
            style={[styles.outerContainer, {transform: [{rotate: rotation}]}]}
          >
            <TouchableOpacity
              onPressIn={() => {
                setMenuToggled(false);
              }}
              style={styles.container}
            >
              <View
                style={[styles.circlesContainer, {top: '70%', left: '10%'}]}
              >
                <TouchableOpacity
                  style={styles.circles}
                  onPress={() =>
                    onPressHandler(
                      isGreenTalk
                        ? screenNameEnum.FeedList
                        : screenNameEnum.GreenTalk,
                    )
                  }
                >
                  {isGreenTalk ? (
                    <SvgXml
                      xml={svg.finalJointWhite}
                      height={ms(24)}
                      width={ms(24)}
                    />
                  ) : (
                    <SvgXml
                      xml={svg.greenTalkWhite}
                      height={ms(24)}
                      width={ms(24)}
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.titleName}>
                  {isGreenTalk ? 'TheJoint' : 'GreenTalk'}
                </Text>
              </View>
              <View
                style={[styles.circlesContainer, {top: '40%', left: '-5%'}]}
              >
                <TouchableOpacity
                  style={styles.circles}
                  onPress={() =>
                    onPressHandler(screenNameEnum.AllUsersChatsScreen)
                  }
                >
                  <SvgXml
                    xml={svg.chatMenuIcon}
                    height={ms(24)}
                    width={ms(24)}
                  />
                </TouchableOpacity>
                <Text style={styles.titleName}>Chat</Text>
              </View>
              <View
                style={[styles.circlesContainer, {top: '15%', left: '-5%'}]}
              >
                <TouchableOpacity
                  style={styles.circles}
                  onPress={() => onPressHandler(screenNameEnum.ChatStack)}
                >
                  <SvgXml xml={svg.frameIcon} height={ms(24)} width={ms(24)} />
                </TouchableOpacity>
                <Text style={styles.titleName}>Groups</Text>
              </View>
              <View style={[styles.circlesContainer, {top: '5%', left: '0%'}]}>
                <TouchableOpacity
                  style={styles.circles}
                  onPress={() => onPressHandler(screenNameEnum.ShopStack)}
                >
                  <Image source={images.searchButton} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.titleName}>Search</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </>
  );
};

export default MoreMenu;
