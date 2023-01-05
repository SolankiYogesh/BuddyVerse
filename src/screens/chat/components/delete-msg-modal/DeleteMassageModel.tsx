import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {styles} from './DeleteMassageModalStyle';

const DeleteMassageModel = props => {
  const {visible, onClose, onDelete} = props;
  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      coverScreen={true}
      isVisible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnContainer} onPress={onDelete}>
          <Text style={styles.btnText}>Delete Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer} onPress={onClose}>
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

DeleteMassageModel.defaultProps = {
  onDelete: () => {},
  onClose: () => {},
  visible: false,
};

export default DeleteMassageModel;
