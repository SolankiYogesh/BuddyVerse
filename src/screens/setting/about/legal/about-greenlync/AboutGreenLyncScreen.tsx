import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {ms} from 'react-native-size-matters';
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';
import SettingHeader from 'screens/setting/components/SettingHeader';
import AboutGreenLyncScreenStyle from './AboutGreenLyncScreenStyle';

const UnorderedListText = () => {
  return (
    <View style={{marginTop: ms(15)}}>
      <View style={AboutGreenLyncScreenStyle.unorderedListContainer}>
        <Text style={AboutGreenLyncScreenStyle.listStyleContainer}>
          {'\u2022'}
        </Text>
        <Text style={AboutGreenLyncScreenStyle.listStyleText}>
          is already being used by someone else;
        </Text>
      </View>
      <View style={AboutGreenLyncScreenStyle.unorderedListContainer}>
        <Text style={AboutGreenLyncScreenStyle.listStyleContainer}>
          {'\u2022'}
        </Text>
        <Text style={AboutGreenLyncScreenStyle.listStyleText}>
          may impersonate another person:
        </Text>
      </View>
      <View style={AboutGreenLyncScreenStyle.unorderedListContainer}>
        <Text style={AboutGreenLyncScreenStyle.listStyleContainer}>
          {'\u2022'}
        </Text>
        <Text style={AboutGreenLyncScreenStyle.listStyleText}>
          belongs to another person;
        </Text>
      </View>
      <View style={AboutGreenLyncScreenStyle.unorderedListContainer}>
        <Text style={AboutGreenLyncScreenStyle.listStyleContainer}>
          {'\u2022'}
        </Text>
        <Text style={AboutGreenLyncScreenStyle.listStyleText}>
          violates the intellectual property or other right of any person or
          entity; or is offensive.
        </Text>
      </View>
      <View style={AboutGreenLyncScreenStyle.unorderedListContainer}>
        <Text style={AboutGreenLyncScreenStyle.listStyleContainer}>
          {'\u2022'}
        </Text>
        <Text style={AboutGreenLyncScreenStyle.listStyleText}>
          Violation of any of the above may be a basis for rejection.
        </Text>
      </View>
    </View>
  );
};

const AboutGreenLyncScreen = () => {
  return (
    <SafeAreaView style={AboutGreenLyncScreenStyle.container}>
      {/* <SettingHeader title="About GreenLync" /> */}
      <ScreenHeader isBackVisible={true} title="About GreenLync" />
      <View style={AboutGreenLyncScreenStyle.mainCOntainer}>
        <ScrollView>
          <Text style={AboutGreenLyncScreenStyle.headerTitle}>
            About GreenLync
          </Text>
          <Text style={AboutGreenLyncScreenStyle.aboutGreenLyncTextContainer}>
            Welcome to Greenlync? Take a pinch of Facebook, Instagram, Twitter,
            TikTok and Tinder; blend them with a bit of Leafly and Weedmaps, and
            then roll them into one awesome joint which gives you the best buzz
            ever! That’s Greenlync! But unlike a lot of those other big social
            media “bullies”, we won’t shadow-ban or kick you off our platform
            for talking about cannabis … because that’s exactly what we want you
            to do! On Greenlync, you can do all the cool things that the other
            big social media “tyrants” don’t let you
          </Text>
          <Text style={AboutGreenLyncScreenStyle.aboutGreenLyncTextContainer}>
            Greenlync is the only social media platform that is “cannabis
            friendly” and connects weed connoisseurs, influencers, doctors,
            brands and retailers, all in one place!
          </Text>
          <Text style={AboutGreenLyncScreenStyle.aboutGreenLyncTextContainer}>
            Happy Highs!
          </Text>
        </ScrollView>
      </View>
      {/* <UnorderedListText /> */}
    </SafeAreaView>
  );
};
export default AboutGreenLyncScreen;
