import React from 'react'
import { View, Text, Image } from 'react-native'
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';
import { images } from 'theme';
import BlockUserEmptyScreenStyle from './BlockUserEmptyScreenStyle';

const BlockUserEmptyScreen = () => {
    return (
        <View style={BlockUserEmptyScreenStyle.container}>
            <ScreenHeader title='Blocked Users' isBackVisible />
            <Image
                source={images.blockUserEmpty}
                style={BlockUserEmptyScreenStyle.blockUserEmptyImage}
            />
            <Text style={BlockUserEmptyScreenStyle.noBlockPeople}>{'No blocked people'}</Text>
            <Text style={BlockUserEmptyScreenStyle.emptyBlockUserInstruction}>{'Blocked users cannot view your profile, leave comments or send you messages.'}</Text>
        </View>
    )
}

export default BlockUserEmptyScreen;