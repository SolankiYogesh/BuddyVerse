import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {ms, s} from 'react-native-size-matters';
import colorPalates from '../../theme/colors/colorPalates';
import MoreMenu from '../more-menu/moreMenu';
import _ from 'lodash';
import {Emmiter} from '../../utils/helper/helper';
import {SvgXml} from 'react-native-svg';
import svg from '../../theme/images/svg';
const ToggleBottomBar = ({state, descriptors, navigation}) => {
  const [menuToggled, setMenuToggled] = useState(false);
  const [isGreen, setIsGreen] = useState(false);
  const GreenTalk = _.find(state.routes, i => i.name === 'GreenTalk');

  return (
    <SafeAreaView
      style={styles.container}
      key={`items${Math.random() + state.index}`}
    >
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const isF =
          state?.routes[state.index].name === 'GreenTalk' ||
          state?.routes[state.index].name === 'FeedList' ||
          state.routes[state.index].name === 'ProfileScreen';

        const isFocused = state.index === index;

        const onPress = () => {
          const mainData = state.routes[state.index];
          // global.isGreenTalk = mainData.name === 'name';

          if (route.name === 'moreMenu') {
            setMenuToggled(!menuToggled);
          } else if (
            route.name === 'FeedList' &&
            mainData.name !== GreenTalk.name
          ) {
            Emmiter.emit('isGreenTalk', true);
            setIsGreen(true);
            navigation.navigate({name: GreenTalk.name, merge: true});
          } else if (
            mainData.name === GreenTalk.name &&
            route.name === GreenTalk.name
          ) {
            Emmiter.emit('isGreenTalk', false);
            setIsGreen(false);

            navigation.navigate({name: 'FeedList', merge: true});
          } else {
            if (route.name !== 'CreateFeedScreen') {
              Emmiter.emit('isGreenTalk', false);
              setIsGreen(false);
            }

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const renderIcon = r => {
          switch (r) {
            case 'FeedList':
              return !isGreen ? (
                <SvgXml
                  key={`items${Math.random()}`}
                  xml={
                    isF && !menuToggled
                      ? svg.greenTalkGreen
                      : svg.greenTalkblack
                  }
                  width={ms(24)}
                  height={ms(24)}
                />
              ) : (
                <SvgXml
                  key={`items${Math.random()}`}
                  xml={
                    isF && !menuToggled
                      ? svg.finalJointGreen
                      : svg.finalJointblack
                  }
                  width={ms(24)}
                  height={ms(24)}
                />
              );

            case 'CreateFeedScreen':
              return (
                <SvgXml
                  key={`items${Math.random()}`}
                  xml={
                    isFocused && !menuToggled ? svg.postGreen : svg.postBlack
                  }
                  width={ms(24)}
                  height={ms(24)}
                />
              );
            case 'moreMenu':
              return (
                <SvgXml
                  key={`items${Math.random()}`}
                  xml={menuToggled ? svg.homeGreen : svg.homeBlack}
                  width={ms(24)}
                  height={ms(24)}
                />
              );

            default:
              return null;
          }
        };

        if (route?.name === 'GreenTalk' || route?.name === 'ProfileScreen') {
          return null;
        }

        return (
          <>
            <MoreMenu
              key={`items${Math.random()}`}
              menuToggled={menuToggled}
              setMenuToggled={b => setMenuToggled(b)}
              isGreenTalk={isGreen}
              navigation={navigation}
              onchangeGreenTalk={resp => {
                Emmiter.emit('isGreenTalk', resp);
                setIsGreen(resp);
              }}
            />
            <TouchableOpacity
              key={`items${Math.random()}`}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.toucableView}
            >
              {renderIcon(route?.name)}
            </TouchableOpacity>
          </>
        );
      })}
    </SafeAreaView>
  );
};

export default ToggleBottomBar;

const styles = StyleSheet.create({
  icon: {
    width: ms(24),
    height: ms(24),
    tintColor: colorPalates.grayShade80,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    backgroundColor: colorPalates.white,
    paddingBottom: s(10),
  },
  toucableView: {
    flex: 1,
    padding: s(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
