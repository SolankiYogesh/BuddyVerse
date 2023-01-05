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
    maxHeight: '90%',
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
    borderRadius: 50,
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
  reportButton: {
    width: '100%',
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colorPalates.AppTheme.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    height: ms(48),
  },
  reportButtonTitle: {
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(16),
    color: colorPalates.AppTheme.secondary,
  },
  reportPostContainer: {width: '100%', flex: 1},
  reportPostHeader: {
    flexDirection: 'row',
    padding: ms(16),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colorPalates.grayShadeE9,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  reportPostTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  reportPostHeaderTitle: {
    marginLeft: ms(8),
    fontSize: ms(16),
    color: colorPalates.AppTheme.text,
    fontFamily: fonts.primaryMediumFont,
  },
  reportPostReasonsListContainer: {marginVertical: 16},
  reportPostReasons: {
    marginHorizontal: ms(16),
    paddingVertical: ms(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: colorPalates.grayShadeE9,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  reportReasonTitle: {
    fontSize: ms(16),
    fontFamily: fonts.primaryMediumFont,
    color: colorPalates.AppTheme.text,
  },
});
