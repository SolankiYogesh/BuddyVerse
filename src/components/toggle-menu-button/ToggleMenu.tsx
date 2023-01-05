import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {ms, s} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import colorPalates from '../../theme/colors/colorPalates';
import MoreMenu from '../more-menu/moreMenu';
import images from '../../theme/images/images';


interface ToggleMenuProps {
  isGreenTalk?: boolean;
}

const ToggleMenu = ({isGreenTalk = false}: ToggleMenuProps) => {
  const [menuToggled, setMenuToggled] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setMenuToggled(!menuToggled);
        }}
        style={styles.absolute}
      >
        <LinearGradient
          start={{x: 0.0, y: 2.5}}
          end={{x: 1.5, y: 2.5}}
          locations={[0, 0.5]}
          colors={[colorPalates.greenShade60, colorPalates.AppTheme.primary]}
          style={styles.linearGradientContainer}
        >
          <Image
            source={images.greenLyncLogo}
            style={{
              height: ms(26),
              width: ms(26),
              tintColor: colorPalates.white,
            }}
            resizeMode="contain"
          />
        </LinearGradient>
      </TouchableOpacity>

      <MoreMenu
        menuToggled={menuToggled}
        setMenuToggled={b => setMenuToggled(b)}
        isGreenTalk={isGreenTalk}
      />
    </>
  );
};

export default ToggleMenu;

const styles = StyleSheet.create({
  linearGradientContainer: {
    borderRadius: 100,
    borderColor: colorPalates.AppTheme.background,
    height: ms(45),
    width: ms(45),
    alignItems: 'center',
    justifyContent: 'center',
    padding: s(5),
    position: 'absolute',
    bottom: '20%',
    right: '15%',
  },
  absolute: {
    position: 'absolute',
    bottom: '15%',
    right: '10%',
  },
});
