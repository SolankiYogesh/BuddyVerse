import {feedDataModel} from 'models/create-feed/feedDataModel';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import DeletePostModalStyle from './DeletePostModalStyle';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {colorPalates} from 'theme';
import {ms} from 'react-native-size-matters';
import SimpleButton from 'components/button/SimpleButton';
import {RemoveActivitiesQuery, Communities} from 'getsocial-react-native-sdk';
import {Emmiter} from 'utils/helper/helper';
import {useNavigation} from '@react-navigation/native';
import AnnounceMentModal from '../../../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../../../models/ModalsMessages';

export interface DeletePostModalProps {
  deletePost?: feedDataModel;
  isShowDeleteModal: boolean;
  onPressCancel: () => void;
  deleteComment?: feedDataModel;
  onDeleteComment?: () => void;
  topic?: string;
  isFromProfile?: boolean;
}

const DeletePostModel = ({
  topic = '',
  deletePost,
  isShowDeleteModal,
  onPressCancel = () => {},
  deleteComment,
  onDeleteComment = () => {},
  isFromProfile = false,
}: DeletePostModalProps) => {
  const [isDeletePostModalVisible, setIsDeletePostModalVisible] =
    useState(false);
  const navigation = useNavigation();
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsDeletePostModalVisible(isShowDeleteModal);
  }, []);

  const onPressCancelSelection = () => {
    setIsDeletePostModalVisible(false);
    setTimeout(() => {
      onPressCancel && onPressCancel();
    }, 100);
  };
  const ModalHeader = () => {
    return <View style={DeletePostModalStyle.modalHeaderContainer} />;
  };

  const onPressDeletePost = () => {
    const removeQuery = RemoveActivitiesQuery.activityIds([deletePost?.id]);

    try {
      Communities.removeActivities(removeQuery).then(async () => {
        Emmiter.emit(deletePost?.source?.id);
        Emmiter.emit('thejoint');

        setIsDeletePostModalVisible(false);
        if (isFromProfile) {
          Emmiter.emit('refressProfile');
          setTimeout(() => {
            navigation.canGoBack() && navigation.goBack();
          }, 300);
        }
      });
    } catch (e) {
      setError(true);
    }
  };
  const onPressDeleteComment = () => {
    const removeQuery = RemoveActivitiesQuery.activityIds([deleteComment?.id]);
    try {
      Communities.removeActivities(removeQuery).then(() => {
        onDeleteComment && onDeleteComment();
        setIsDeletePostModalVisible(false);
      });
    } catch (e) {
      setError(true);
    }
  };
  const DeleteButton = () => {
    return (
      <SimpleButton
        containerStyle={DeletePostModalStyle.deleteButton}
        buttonTitleStyle={[DeletePostModalStyle.deleteButtonTitle]}
        title={'Delete'}
        onPress={deletePost ? onPressDeletePost : onPressDeleteComment}
      />
    );
  };
  const CancelButton = () => {
    return (
      <SimpleButton
        containerStyle={DeletePostModalStyle.cancelButton}
        buttonTitleStyle={[DeletePostModalStyle.cancelButtonTitle]}
        title={'Cancel'}
        onPress={onPressCancelSelection}
      />
    );
  };

  return (
    <View>
      <Modal
        testID={'modal'}
        isVisible={isDeletePostModalVisible}
        style={DeletePostModalStyle.modalContainer}
        animationInTiming={300}
        animationOutTiming={1000}
        onBackButtonPress={onPressCancelSelection}
        onBackdropPress={onPressCancelSelection}
      >
        <View style={DeletePostModalStyle.container}>
          <ModalHeader />
          <View style={DeletePostModalStyle.deletePostHeader}>
            <View style={DeletePostModalStyle.deletePostTitleContainer}>
              <IconEntypo
                name="warning"
                size={ms(20)}
                color={colorPalates.redShadeDF}
              />
              <Text style={DeletePostModalStyle.deletePostHeaderTitle}>
                {topic === 'deleteComment' ? 'Delete Comment' : 'Delete Post'}
              </Text>
            </View>
          </View>
          <DeleteButton />
          <CancelButton />
        </View>
      </Modal>
      <AnnounceMentModal
        modalVisible={error}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
        onPressButton={() => setError(false)}
      />
    </View>
  );
};
export default DeletePostModel;
