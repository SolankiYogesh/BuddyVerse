import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image';
import { ms } from 'react-native-size-matters';
import BlockedUserScreenStyle from './BlockedUserScreenStyle';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';

const BlockedUsers = ({ userName, mutualFrnds }) => {
    return (
        <View style={BlockedUserScreenStyle.profile}>
            <FastImage
                style={BlockedUserScreenStyle.profileImage}
                source={{
                    uri: 'https://picsum.photos/200',
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
            />
            <View style={BlockedUserScreenStyle.profileContainer}>
                <View style={BlockedUserScreenStyle.profileNameContainer}>
                    <Text style={BlockedUserScreenStyle.profileName}>{userName}</Text>
                    <Text>{mutualFrnds + ' mutual friends'}</Text>
                </View>
            </View>
            <TouchableOpacity style={BlockedUserScreenStyle.cancelIcon} activeOpacity={0.7} onPress={() => { }}>
                <IconAntDesign name='close' size={ms(13)} />
            </TouchableOpacity>
        </View>
    );
}

const BlockedUserScreen = () => {
    return (
        <>
            <ScreenHeader title='Blocked Users' isBackVisible />
            <View style={BlockedUserScreenStyle.container}>
                <BlockedUsers userName={'Kianna Rhiel Madsen'} mutualFrnds={8} />
                <BlockedUsers userName={'Carla Kenter'} mutualFrnds={8} />
                <BlockedUsers userName={'James Ekstrom Bothman'} mutualFrnds={8} />
                <BlockedUsers userName={'Adison Press'} mutualFrnds={8} />
                <BlockedUsers userName={'Jakob George'} mutualFrnds={8} />
            </View>
        </>
    );
}

export default BlockedUserScreen;