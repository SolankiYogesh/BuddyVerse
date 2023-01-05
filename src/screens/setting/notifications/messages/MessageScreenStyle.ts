import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates, fonts} from 'theme';

export default ScaledSheet.create({
  container: {flex: 1},
  switchContainer: {
    height: ms(56),
  },
  videoChatsContainer: {
    marginTop: ms(16),
    marginLeft: ms(16),
  },
  videoChatTitle: {
    color: colorPalates.blackShade02,
    fontSize: ms(12),
    fontFamily: fonts.primarySemiBoldFont,
    marginBottom: ms(9),
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: ms(16),
    height: ms(56),
  },
  radioButtonTitle: {
    fontSize: ms(16),
    color: colorPalates.blackShade02,
  },
});
