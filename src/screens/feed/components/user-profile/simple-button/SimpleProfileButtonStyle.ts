import { ms, ScaledSheet } from 'react-native-size-matters';
import { colorPalates } from 'theme';

export default ScaledSheet.create({
    container: { flex: 1 },
    header: { fontSize: ms(16) },
    settingButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginEnd: ms(16),
        color: colorPalates.blackShade02,
    },
    buttonTitle: {
        color: colorPalates.blackShade02,
        fontSize: ms(16),
        //padding: ms(16),
        flexDirection:'row',
        justifyContent:'space-between',
        
    },
    rightCornerIcon: {
        flexDirection: 'row',
        alignSelf: 'center',
        color: colorPalates.grayShade80,
        padding: ms(16),
        
    },
});
