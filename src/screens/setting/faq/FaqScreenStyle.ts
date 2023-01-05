import { ms,ScaledSheet } from "react-native-size-matters";
import { fonts ,colorPalates} from "theme";
import colors from "theme/colors/colors";

export default ScaledSheet.create({
    container:{
        marginLeft:ms(20),
        marginRight:ms(20),    
    },
    headerText:{
        marginTop:ms(15),
        fontFamily:fonts.primaryBoldFont,
        color:colorPalates.blackShade20,
        fontWeight:'700',
        fontSize:ms(32),
    },
    searchBar:{
        marginTop:ms(20),
    },
    buttonStyle:{
        marginTop:ms(20),
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:ms(32),
    },
    greyButton: {
        backgroundColor: colorPalates.grayShadeCC,
        height: ms(32),
        alignItems: 'center',
        borderRadius: ms(5),
        justifyContent:'center',
        paddingVertical:ms(5.5),
        paddingHorizontal:ms(10),
    },
    greyButtonText:{
       fontSize: ms(16),
    },
    greenButton:{
        height:ms(32),
    },
    collapseHeaderView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    collapseHeaderText:{
        marginVertical:ms(16),
        fontFamily:fonts.primaryBoldFont,
        color:colorPalates.blackShade20,
        fontSize:ms(16),
        fontWeight:"700",
    },
    collapseBodyText:{
        marginTop:ms(16),
        fontFamily:fonts.primaryLightFont,
        color:colorPalates.blackShade20,
        fontSize:ms(16),
        fontWeight:"400",
    },
    
});