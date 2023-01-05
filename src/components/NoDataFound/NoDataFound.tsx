import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {ms, ScaledSheet} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';
import colorPalates from '../../theme/colors/colorPalates';
import fonts from '../../theme/fonts/fonts';

interface NoDataFoundProps extends KeyboardAvoidingViewProps {
  imageSource?: ImageSourcePropType;
  svgSource?: string | null;
  NodataText?: string | null | undefined;
  style?: StyleProp<ViewStyle>;
  imgStyle?: StyleProp<ImageStyle>;
}

const NoDataFound = ({
  imageSource,
  NodataText,
  svgSource,
  style = {},
  imgStyle = {},
}: NoDataFoundProps) => {
  const isImage = !!imageSource;
  const isSVG = !!svgSource;
  return (
    <KeyboardAvoidingView style={[styles.container, style]}>
      <View style={styles.imageViewContainer}>
        {isImage ? (
          <Image
            style={[styles.imageStyle, imgStyle]}
            source={imageSource}
            resizeMode="contain"
          />
        ) : isSVG ? (
          <SvgXml xml={svgSource} height={100} width={100} />
        ) : null}
      </View>
      <View style={styles.textViewContainer}>
        <Text style={styles.noDataFoundText}>
          {NodataText || 'No Notifications Found'}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NoDataFound;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  noDataFoundText: {
    fontFamily: fonts.primarySemiBoldFont,
    fontSize: ms(24),
    color: colorPalates.AppTheme.primary,
  },
  imageViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '15%',
  },
  textViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {},
});
