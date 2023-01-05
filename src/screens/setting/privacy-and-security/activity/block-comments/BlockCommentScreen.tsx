import ThemeButton from 'components/theme-button/ThemeButton';
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image';
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';
import SettingSwitch from 'screens/setting/components/SettingSwitch';
import BlockCommentScreenStyle from './BlockCommentScreenStyle';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { ms } from 'react-native-size-matters';

const BlockCommentScreen = () => {
    const BlockedUsers = ({ userName, mutualFrnds }) => {
        return (
            <View style={BlockCommentScreenStyle.profile}>
                <FastImage
                    style={BlockCommentScreenStyle.profileImage}
                    source={{
                        uri: 'https://picsum.photos/200',
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <View style={BlockCommentScreenStyle.profileContainer}>
                    <View style={BlockCommentScreenStyle.profileNameContainer}>
                        <Text style={BlockCommentScreenStyle.profileName}>{userName}</Text>
                        <Text>{mutualFrnds + ' mutual friends'}</Text>
                    </View>
                </View>
                <TouchableOpacity style={BlockCommentScreenStyle.cancelIcon} onPress={() => {}}>
                    <IconAntDesign name='close' size={ms(13)} />
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={BlockCommentScreenStyle.container}>
            <ScreenHeader isBackVisible title='Block comments' />
            <View style={BlockCommentScreenStyle.switchContainer}>
                <SettingSwitch title='Block commenting for everyone' />
                <Text style={BlockCommentScreenStyle.switchText}>No one can comment on your posts.</Text>
            </View>
            <Text style={BlockCommentScreenStyle.commentsBlockText}>COMMENTS BLOCKED FROM</Text>
            <ThemeButton title='Add Person' containerStyle={BlockCommentScreenStyle.addPersonbtn} />
            <BlockedUsers userName={'Kianna Rhiel Madsen'} mutualFrnds={8} />
            <BlockedUsers userName={'Carla Kenter'} mutualFrnds={8} />
        </View>
    );
}

export default BlockCommentScreen;