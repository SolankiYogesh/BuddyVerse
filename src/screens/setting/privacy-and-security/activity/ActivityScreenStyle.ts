import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  container: {flex: 1},
  blockCommentButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(24),
    marginHorizontal: ms(20),
  },
  blockCommentButtonTitle: {
    fontSize: ms(16),
    color: colorPalates.AppTheme.text,
  },
  blockCommentRightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  switchContainer: {
    marginTop: ms(16),
    paddingLeft: ms(3),
    paddingTop: ms(18),
    paddingBottom: ms(16),
  },
  switchButtonText: {
    marginLeft: ms(16),
    paddingRight: ms(72),
    fontSize: ms(14),
  },
  inputTextContainer: {
    marginHorizontal: ms(16),
    marginTop: ms(9),
    paddingLeft: ms(16),
    borderColor: colorPalates.grayShadeCC,
    borderWidth: 1,
    fontSize: ms(14),
    height:ms(56)
  },
  radioButton: {
    marginVertical: ms(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: ms(16),
    // height: ms(56),
  },
  radioButtonTitle: {
    fontSize: ms(16),
    color: colorPalates.blackShade02,
  },
});
