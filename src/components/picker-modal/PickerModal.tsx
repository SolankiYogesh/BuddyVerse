import {View, TouchableOpacity, Text, Image} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import PickerModalStyle from './PickerModalStyle';
import {images} from 'theme';
import ModalsMessages from '../../models/ModalsMessages';

const PickerModal = ({
  isVisible,
  onClose,
  onPressCamera,
  onPressGallery,
  isVideo,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onDismiss={onClose}
      coverScreen={true}
      style={PickerModalStyle.modalContainer}
    >
      <View style={PickerModalStyle.secondContainer}>
        <Text style={PickerModalStyle.titleText}>
          {isVideo
            ? ModalsMessages.ModalsMassages.videoMustBe
            : ModalsMessages.ModalsMassages.Select_Image}
        </Text>

        <View style={PickerModalStyle.container}>
          <TouchableOpacity
            style={PickerModalStyle.btnContainer}
            onPress={onPressCamera}
          >
            <Image
              style={PickerModalStyle.btnImage}
              source={isVideo ? images.videoCall : images.camera}
              resizeMode="contain"
            />
            <Text style={PickerModalStyle.btnText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={PickerModalStyle.btnContainer}
            onPress={onPressGallery}
          >
            <Image
              style={PickerModalStyle.btnImage}
              source={images.gallery}
              resizeMode="contain"
            />
            <Text style={PickerModalStyle.btnText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PickerModal;
