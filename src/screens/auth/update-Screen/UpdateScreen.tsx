import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {styles} from './UpdateScreenStyle';
import images from '../../../theme/images/images';
import CodePush from 'react-native-code-push';
import * as Progress from 'react-native-progress';
import ThemeButton from '../../../components/theme-button/ThemeButton';
import {vs} from 'react-native-size-matters';
import colorPalates from '../../../theme/colors/colorPalates';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
const UpdateScreen = ({onUpdateDone}) => {
  const [isButtonOut, setIsButtonOut] = useState(false);
  const [progress, setProgress] = useState(0);

  const onPressUpdate = () => {
    setIsButtonOut(true);
    updateApp();
  };

  const updateApp = () => {
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.IMMEDIATE,
      },
      data => {
        if (data === CodePush.SyncStatus.UPDATE_INSTALLED) {
          onUpdateDone();
        }
      },
      ({receivedBytes, totalBytes}) => {
        setProgress(Math.floor((receivedBytes / totalBytes) * 100) / 100);
      },
      () => {},
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Image
          style={styles.imageBack}
          source={images.updateImage}
          resizeMode="cover"
        />
        <View style={styles.absoluteView}>
          <Text style={styles.bitTetx}>We're getting better!</Text>
          <Text style={styles.smallText}>
            {`Yay! We're back with another update \n Thank You for your feedback!\n Keep them coming \\0o0//
          `}
          </Text>
          {isButtonOut ? (
            <Progress.Bar
              progress={progress}
              color={colorPalates.AppTheme.primary}
              animated={false}
              style={styles.progressBar}
              width={null}
              height={vs(5)}
            />
          ) : (
            <TouchableOpacity style={styles.btnView} onPress={onPressUpdate}>
              <LinearGradient
                start={{x: 0.0, y: 0.5}}
                end={{x: 1, y: 1}}
                locations={[0, 1]}
                colors={[colorPalates.redShadeED, colorPalates.redShade93]}
                style={styles.gradientContainer}
              >
                <Text style={styles.updateText}>Update Now</Text>
              </LinearGradient>
            </TouchableOpacity>
            // <ThemeButton
            //   onPress={onPressUpdate}
            //   title="Update Now"
            //   containerStyle={styles.btnStyle}
            //   titleStyle={styles.btnTitleText}
            // />
          )}
        </View>
      </View>
      <View style={styles.obsoluteView}>
        {/* <RemoveFeedMediaButton onPressRemoveFeedMediaButton={onUpdateDone} /> */}
        {/* </View> */}
        <TouchableOpacity onPress={onUpdateDone}>
          <IconIonicons
            name="ios-close-circle"
            size={35}
            color={colorPalates.white}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UpdateScreen;
