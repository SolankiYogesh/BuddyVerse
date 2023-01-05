import { ms, ScaledSheet } from 'react-native-size-matters';
import { colorPalates, fonts } from 'theme';

export default ScaledSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colorPalates.white,
    },
    blockUserEmptyImage: {
        marginTop: ms(40),
        height: ms(161.3),
        width: ms(183.36),
        // marginBottom: ms(50),
    },
    noBlockPeople: {
        fontFamily: fonts.primarySemiBoldFont,
        fontSize: ms(24),
        marginTop: ms(50),
        color: colorPalates.AppTheme.text,
    },
    emptyBlockUserInstruction: {
        marginLeft: ms(20),
        marginRight: ms(20),
        textAlign: 'center',
        fontFamily: fonts.primaryRegularFont,
        fontSize: ms(16),
        color: colorPalates.grayShade80,
        marginTop: ms(10)
    },
})