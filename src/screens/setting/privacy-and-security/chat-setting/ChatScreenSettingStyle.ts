import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  container: {flex: 1},
  header: {marginTop: ms(16), marginLeft: ms(16), fontSize: ms(12)},
  radioButton: {
    marginVertical: ms(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: ms(16),
    
  },
  radioButtonTitle: {
    fontSize: ms(16),
    color: colorPalates.blackShade02,
  },
  groupChatText: {
    marginTop: ms(9),
    marginLeft: ms(16),
    fontSize: ms(16),
    fontWeight: '700',
    color: colorPalates.AppTheme.text,
  },
});
