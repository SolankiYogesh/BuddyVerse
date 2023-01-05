import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import SettingHeader from '../components/SettingHeader';
import FaqScreenStyle from './FaqScreenStyle';
import { Searchbar } from 'react-native-paper';
import ThemeButton from 'components/theme-button/ThemeButton';
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { ms } from 'react-native-size-matters';
import { colorPalates, fonts } from 'theme';

const FaqScreen = () => {
  const searchIcon=()=>{
    return(
      <IconAntDesign name='search1' size={24}/>
    );
    
  }
  return (
    <ScrollView style={{marginBottom:ms(16)}}>
      <SettingHeader title="FAQ"/>
        <View style={FaqScreenStyle.container}>
          <View>
            <Text style={FaqScreenStyle.headerText}>
              How can we help you?
            </Text>
          </View>

          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          
            <Searchbar
            style={FaqScreenStyle.searchBar} 
            placeholder={'Search something'}
            icon={searchIcon}
            
            value='' />
          </View>
          
          <View style={FaqScreenStyle.buttonStyle}>

            <ThemeButton 
            containerStyle={FaqScreenStyle.greenButton}
            onPress={()=>console.log('all')}
            title="All"/>

            <TouchableOpacity
            style={FaqScreenStyle.greyButton}
            onPress={()=>console.log('Person')}>
            <Text style={FaqScreenStyle.greyButtonText}>Person</Text>
          </TouchableOpacity>

            <TouchableOpacity
            style={FaqScreenStyle.greyButton}
            onPress={()=>console.log('SweetBee')}>
            <Text style={FaqScreenStyle.greyButtonText}>SweetBee</Text>
          </TouchableOpacity>

            <TouchableOpacity
            style={FaqScreenStyle.greyButton}
            onPress={()=>console.log('Verification')}>
            <Text style={FaqScreenStyle.greyButtonText}>Verification</Text>
          </TouchableOpacity>

          </View>

          <View style={{marginTop:ms(32)}}>
              <Collapse>
                <CollapseHeader>
                  <View style={FaqScreenStyle.collapseHeaderView}>
                    <Text style={FaqScreenStyle.collapseHeaderText}>Lorem ipsum dolor sit amet?</Text>
                    <IconAntDesign name='right' size={16} />
                  </View>
                </CollapseHeader>
                <CollapseBody>
                  <Text style={FaqScreenStyle.collapseBodyText}>Morbi in laoret orci, ac auctor mauris. Nam sed lorem eget ipsum cursus porta id eu nunc. Integer et felis est. Integer convallis quam et nunc aliquet laoreet. Duis luctus ligula diam, sit amet bibendum libero tristique id. Duis eu a nulla maximus luctus.</Text>
                </CollapseBody>
              </Collapse>
              <Collapse>
                <CollapseHeader>
                  <View style={FaqScreenStyle.collapseHeaderView}>
                    <Text style={FaqScreenStyle.collapseHeaderText}>Lorem ipsum dolor sit amet?</Text>
                    <IconAntDesign name='right' size={16} />
                  </View>
                </CollapseHeader>
                <CollapseBody>
                  <Text style={FaqScreenStyle.collapseBodyText}>Morbi in laoret orci, ac auctor mauris. Nam sed lorem eget ipsum cursus porta id eu nunc. Integer et felis est. Integer convallis quam et nunc aliquet laoreet. Duis luctus ligula diam, sit amet bibendum libero tristique id. Duis eu a nulla maximus luctus.</Text>
                </CollapseBody>
              </Collapse>
              <Collapse>
                <CollapseHeader>
                  <View style={FaqScreenStyle.collapseHeaderView}>
                    <Text style={FaqScreenStyle.collapseHeaderText}>Lorem ipsum dolor sit amet?</Text>
                    <IconAntDesign name='right' size={16} />
                  </View>
                </CollapseHeader>
                <CollapseBody>
                  <Text style={FaqScreenStyle.collapseBodyText}>Morbi in laoret orci, ac auctor mauris. Nam sed lorem eget ipsum cursus porta id eu nunc. Integer et felis est. Integer convallis quam et nunc aliquet laoreet. Duis luctus ligula diam, sit amet bibendum libero tristique id. Duis eu a nulla maximus luctus.</Text>
                </CollapseBody>
              </Collapse>
              <Collapse>
                <CollapseHeader>
                  <View style={FaqScreenStyle.collapseHeaderView}>
                    <Text style={FaqScreenStyle.collapseHeaderText}>Lorem ipsum dolor sit amet?</Text>
                    <IconAntDesign name='right' size={16} />
                  </View>
                </CollapseHeader>
                <CollapseBody>
                  <Text style={FaqScreenStyle.collapseBodyText}>Morbi in laoret orci, ac auctor mauris. Nam sed lorem eget ipsum cursus porta id eu nunc. Integer et felis est. Integer convallis quam et nunc aliquet laoreet. Duis luctus ligula diam, sit amet bibendum libero tristique id. Duis eu a nulla maximus luctus.</Text>
                </CollapseBody>
              </Collapse>
          </View>

        </View>
    </ScrollView>
  );
};
export default FaqScreen;
