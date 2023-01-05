import React from 'react';
import {View, Text, SafeAreaView, Linking, Platform} from 'react-native';
import {ms} from 'react-native-size-matters';
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';
import SupportScreenStyle from './SupportScreenStyle';

const SupportScreen = () => {
  const onPressCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:(510)4631399`;
    } else {
      phoneNumber = `telprompt:(510)4631399`;
    }

    Linking.openURL(phoneNumber);
  };

  const onPressUrl = () => {
    Linking.openURL('https://greenlync.com/');
  };

  return (
    <SafeAreaView style={SupportScreenStyle.container}>
      <ScreenHeader isBackVisible={true} title="Support" />
      <View style={SupportScreenStyle.mainContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            {/* <Text style={SupportScreenStyle.subHeaderTitle}>Contact</Text> */}
            <Text style={SupportScreenStyle.subHeaderTitle}>Email</Text>
            <Text style={SupportScreenStyle.subHeaderTitle}>Website</Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            {/* <Text
              style={SupportScreenStyle.termsOfUseTextContainer}
              onPress={onPressCall}
            >
              (510) 463-1399
            </Text> */}
            <Text
              style={SupportScreenStyle.termsOfUseTextContainer}
              onPress={() => {
                Linking.openURL('mailto:marley@greenlync.com');
              }}
            >
              marley@greenlync.com
            </Text>
            <Text
              style={SupportScreenStyle.termsOfUseTextContainer}
              onPress={onPressUrl}
            >
              https://greenlync.com/
            </Text>
          </View>
        </View>
      </View>

      {/* <View style={{flexDirection:"row"}}>
        <Text style={SupportScreenStyle.subHeaderTitle}>
              Email 
        </Text>
        <Text style={SupportScreenStyle.subHeaderTitle}>
              : 
        </Text>
        <Text style={SupportScreenStyle.subHeaderTitle}>
        info@greenlync.com
        </Text>
      </View>

      <View style={{flexDirection:"row"}}>
        <Text style={SupportScreenStyle.subHeaderTitle}>
              Website 
        </Text>
        <Text style={SupportScreenStyle.subHeaderTitle}>
              : 
        </Text>
        <Text style={SupportScreenStyle.subHeaderTitle}>
        https://greenlync.com/
        </Text>
      </View> */}
    </SafeAreaView>
  );
};
export default SupportScreen;
