import {StyleSheet} from 'react-native';
import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates, fonts} from 'theme';

export default ScaledSheet.create({
  modalContainer: {
    margin: 0,
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    maxHeight: '30%',
    backgroundColor: colorPalates.AppTheme.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderTopEndRadius: ms(24),
    borderTopStartRadius: ms(24),
    flex: 1,
  },
  modalHeaderContainer: {
    width: ms(32),
    height: 6,
    backgroundColor: colorPalates.grayShadeCC,
    borderRadius: 100,
  },
  cancelButton: {
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    height: ms(48),
    backgroundColor: colorPalates.grayShadeCC,
  },
  cancelButtonTitle: {
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(16),
    color: colorPalates.AppTheme.text,
  },
  deleteButton: {
    width: '100%',
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colorPalates.AppTheme.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    height: ms(48),
  },
  deleteButtonTitle: {
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(16),
    color: colorPalates.AppTheme.secondary,
  },
  deletePostHeader: {
    flexDirection: 'row',
    padding: ms(16),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colorPalates.grayShadeE9,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  deletePostTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  deletePostHeaderTitle: {
    marginLeft: ms(8),
    fontSize: ms(16),
    color: colorPalates.AppTheme.text,
    fontFamily: fonts.primaryMediumFont,
  },
});
