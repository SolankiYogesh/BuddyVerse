import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  container: {flex: 1},
  header: {fontSize: ms(16)},
  Button: {
    marginHorizontal: ms(16),
    borderRadius: 50,
  },
  ButtonTitle: {
    color: colorPalates.white,
    fontSize: ms(15),
  },
  greenLyncLogoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop:ms(16),
    marginBottom: ms(40),
  },
  greenLyncText: {
    color: colorPalates.white,
    fontSize: ms(40),
    marginBottom: ms(128),
  },
  welcomeTextContainer: {
    color: colorPalates.white,
    fontSize: ms(36),
    marginLeft: ms(24),
    marginBottom: ms(16),
  },
  welcomeText: {
    fontWeight: 'bold',
  },
  agePrivacyConfirmationContainer: {
    marginBottom: ms(16),
    color: colorPalates.grayShadeBD,
    marginHorizontal: ms(24),
    fontSize: ms(15),
    flexDirection:'row'
  },
});
