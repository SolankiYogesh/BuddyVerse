/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';

import Modal from 'react-native-modal';
import ReportPostModalStyle from './ReportPostModalStyle';
import SimpleButton from 'components/button/SimpleButton';

import {ms} from 'react-native-size-matters';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colorPalates} from 'theme';
import {reportReasonProps, reportReasons} from 'models/reportReasons';
import {feedDataModel} from 'models/create-feed/feedDataModel';
import {useFeedService} from 'services/feed-service/useFeedService';

export interface ReportPostModalProps {
  reportFeed: feedDataModel;
  isShowReportModal: boolean;
  onPressReportFeed: () => void;
  onPressCancel: () => void;
  onPressBlockUser: () => void;
  title: String;
}

const ReportPostModal = ({
  reportFeed,
  isShowReportModal,
  onPressReportFeed = () => {},
  onPressCancel = () => {},
  onPressBlockUser = () => {},
  title = 'Report Post',
}: ReportPostModalProps) => {
  const [isReportPostModalVisible, setIsReportPostModalVisible] =
    useState(false);
  const [reportReasonList, setReportReasonList] = useState(reportReasons);

  const {reportPost} = useFeedService();

  useEffect(() => {
    setIsReportPostModalVisible(isShowReportModal);
    setReportReasonList(reportReasonList);
  }, []);

  const onPressCancelSelection = () => {
    setIsReportPostModalVisible(false);
    setTimeout(() => {
      onPressCancel && onPressCancel();
    }, 100);
  };

  const isReportButttonVisible =
    reportReasonList.filter(reasonData => reasonData.isSelected).length > 0;

  const onPressReport = () => {
    onPressReportFeed && onPressReportFeed();
    const selectedReportReason = reportReasonList.find(
      reason => reason.isSelected,
    );
    if (selectedReportReason) {
      reportPost(reportFeed, selectedReportReason.reason);
    }
    onPressCancelSelection();
  };

  const onPressReportReason = (reportReasonData: reportReasonProps) => () => {
    const listReason: reportReasonProps[] = JSON.parse(
      JSON.stringify(reportReasonList),
    );
    listReason.map(reason => {
      //   reason.isSelected =
      // reason.reason === reportReasonData.reason
      //   ? !reason.isSelected
      //   : reason.isSelected;
      reason.isSelected = reason.reason === reportReasonData.reason;
    });
    setReportReasonList(listReason);
  };

  const CancelButton = () => {
    return (
      <SimpleButton
        containerStyle={ReportPostModalStyle.cancelButton}
        buttonTitleStyle={[ReportPostModalStyle.cancelButtonTitle]}
        title={'Cancel'}
        onPress={onPressCancelSelection}
      />
    );
  };

  const ReportButton = () => {
    return (
      <SimpleButton
        containerStyle={ReportPostModalStyle.reportButton}
        buttonTitleStyle={[ReportPostModalStyle.reportButtonTitle]}
        title={'Report'}
        onPress={onPressReport}
      />
    );
  };

  const blockButton = () => {
    return (
      <SimpleButton
        containerStyle={ReportPostModalStyle.reportButton}
        buttonTitleStyle={[ReportPostModalStyle.reportButtonTitle]}
        title={'Block User'}
        onPress={onPressBlockUser}
      />
    );
  };

  const ModalHeader = () => {
    return <View style={ReportPostModalStyle.modalHeaderContainer} />;
  };

  const ReportPostTitleContainer = () => {
    return (
      <View style={ReportPostModalStyle.reportPostHeader}>
        <View style={ReportPostModalStyle.reportPostTitleContainer}>
          <IconEntypo
            name="warning"
            size={ms(20)}
            color={colorPalates.redShadeDF}
          />
          <Text style={ReportPostModalStyle.reportPostHeaderTitle}>
            {title}
          </Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <IconAntDesign name="up" size={ms(16)} />
        </TouchableOpacity>
      </View>
    );
  };

  const reportPostKeyExtractor = (item: reportReasonProps) => item.reason;

  const renderReportPostReson = ({item}: {item: reportReasonProps}) => {
    return (
      <TouchableOpacity
        style={ReportPostModalStyle.reportPostReasons}
        onPress={onPressReportReason(item)}
      >
        <Text style={ReportPostModalStyle.reportReasonTitle}>
          {item.reason}
        </Text>
        <IconMaterialCommunityIcons
          name={item.isSelected ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={24}
          color={
            item.isSelected
              ? colorPalates.AppTheme.primary
              : colorPalates.grayShade80
          }
        />
      </TouchableOpacity>
    );
  };

  const ReportPostWithList = () => {
    return (
      <View style={ReportPostModalStyle.reportPostContainer}>
        <ReportPostTitleContainer />
        <FlatList
          style={ReportPostModalStyle.reportPostReasonsListContainer}
          keyExtractor={reportPostKeyExtractor}
          data={reportReasonList}
          renderItem={renderReportPostReson}
        />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Modal
        testID={'modal'}
        isVisible={isReportPostModalVisible}
        style={ReportPostModalStyle.modalContainer}
        animationInTiming={300}
        animationOutTiming={1000}
        onBackButtonPress={onPressCancelSelection}
        onBackdropPress={onPressCancelSelection}
      >
        <View style={ReportPostModalStyle.container}>
          <ModalHeader />
          <ReportPostWithList />
          {isReportButttonVisible && <ReportButton />}
          {blockButton()}
          <CancelButton />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ReportPostModal;
