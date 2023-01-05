import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates, fonts} from 'theme';

export default ScaledSheet.create({
  container: {flex: 1, backgroundColor: colorPalates.AppTheme.background},
  postContainer: {
    overflow: 'hidden',
    borderRadius: 8,
    margin: ms(8),
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    // backgroundColor: colorPalates.white,
    paddingVertical: 4,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1.33,
    borderRadius: ms(8),
    marginTop: ms(8),
  },
  postTitle: {
    fontFamily: fonts.primaryRegularFont,
    fontSize: ms(12),
    color: colorPalates.AppTheme.text,
  },
  postHeaderContainer: {marginHorizontal: ms(8)},
  postListContainer: {
    marginHorizontal: ms(8),
    flexGrow: 1,
    backgroundColor: colorPalates.AppTheme.background,
  },
});
