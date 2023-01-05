import {
  Communities,
  ActivityContent,
  PostActivityTarget,
  MediaAttachment,
} from 'getsocial-react-native-sdk';
import {createFeedDataModel} from 'models/create-feed/createFeedDataModel';
import {useNavigationServices} from 'navigation/useNavigationServices';
import {debugLogs} from 'utils/logs/logs';
import useUserState from 'redux-wrapper/reducers/user-slice/userState';
import _ from 'lodash';
import {Storage} from 'aws-amplify';
import {Image, Video} from 'react-native-compressor';
import {Platform} from 'react-native';

export const useCreateFeedService = () => {
  const {resetFeedStack} = useNavigationServices();
  const activityContent = new ActivityContent();
  const {userData} = useUserState();

  const createSimpleFeed = ({
    feedText = '',
    feedTarget,
  }: createFeedDataModel) => {
    activityContent.text = feedText;
    const target = PostActivityTarget.topic(feedTarget);
    return Communities.postActivity(activityContent, target);
  };

  const createFeedWithLocalMedia = ({
    feedText = '',
    feedTarget,
    feedMedia,
    mediaTypeOfFeed = 'image',
    width,
    height,
    videoSize,
    imageSize,
  }: createFeedDataModel) => {
    return new Promise(async resolve => {
      const h = imageSize?.height || videoSize?.height;
      const w = imageSize?.width || videoSize?.width;
      const isLandScape = !!imageSize?.isLandScape || !!videoSize?.isLandScape;
      activityContent.text = feedText;
      let mediaAttachments: any = [];
      activityContent.properties.height = h?.toString();
      activityContent.properties.width = w?.toString();
      activityContent.properties.isLandScape = isLandScape?.toString();

      if (_.includes(mediaTypeOfFeed, 'video')) {
        const outputImg = await Video.compress(
          feedMedia,
          {
            compressionMethod: 'auto',
          },
          progress => {
            console.log('Compression Progress: ', progress);
          },
        );
        const finalUrl =
          Platform.OS === 'android' ? 'file://' + outputImg : outputImg;
        const media = await fetch(finalUrl);
        const videoExtension = 'mp4';
        const blob = await media.blob();
        const file_name = `${feedTarget}-${
          userData.id
        }-${new Date().getTime()}`;

        Storage.put(`${file_name}.${videoExtension}`, blob, {
          level: 'public',
          contentType: `video/${videoExtension}`,
          useAccelerateEndpoint: true,
          // progressCallback(progress) {
          //   const percentage = Math.round(
          //     (progress.loaded * 100) / progress.total,
          //   ).toFixed(0);
          //   console.log('percentage', percentage);

          //   // }
          // },
        })
          .then(() => {
            const videoUrl = `https://d3ffo1rad4rm2t.cloudfront.net/${file_name}${width}x${height}.m3u8?width=${width}&height=${height}&mediafilename=${file_name}.${videoExtension}`;
            const videoFiles = MediaAttachment.withVideoUrl(videoUrl);
            mediaAttachments = [videoFiles];
            if (mediaAttachments.length > 0) {
              activityContent.attachments = mediaAttachments;
            }
            const target = PostActivityTarget.topic(feedTarget);
            Communities.postActivity(activityContent, target).then(
              result => {
                debugLogs('Posted media activity: ', result);

                resolve(true);
              },
              error => {
                debugLogs('Failed to post media activity, error: ', error);

                resolve(false);
              },
            );
          })
          .catch(e => {
            console.log(e);

            resolve(false);
          });
      } else {
        const outputImg = await Image.compress(feedMedia, {
          compressionMethod: 'manual',
          quality: 0.8,
          output: 'jpg',
        });
        const media = await fetch(outputImg);
        const blob = await media.blob();
        const file_name = `${feedTarget}-${
          userData?.id
        }-${new Date().getTime()}.jpg`;

        Storage.put(file_name, blob, {
          level: 'public',
          contentType: 'image/jpg',
          useAccelerateEndpoint: true,
          // progressCallback(progress) {
          //   const percentage = Math.round(
          //     (progress.loaded * 100) / progress.total,
          //   ).toFixed(0);

          //   // if (percentage === 'percentage') {

          //   // }
          // },
        })
          .then(() => {
            const imageFiles = MediaAttachment.withImageUrl(
              `https://d1wd77iqpfpytn.cloudfront.net/public/${file_name}`,
            );
            mediaAttachments = [imageFiles];

            if (mediaAttachments.length > 0) {
              activityContent.attachments = mediaAttachments;
            }

            const target = PostActivityTarget.topic(feedTarget);

            Communities.postActivity(activityContent, target).then(
              (result: any) => {
                debugLogs('Posted media activity: ', result);
                resolve(true);
              },
              error => {
                debugLogs('Failed to post media activity, error: ', error);
                resolve(false);
              },
            );
          })
          .catch(() => {
            resolve(false);
          });
      }
    });
  };

  const createFeedWithMedia = ({
    feedText,
    feedTarget,
    feedMedia,
    mediaTypeOfFeed = 'image',
  }: createFeedDataModel) => {
    activityContent.text = feedText;
    activityContent.attachments.push(MediaAttachment.withImageUrl(feedMedia));
    if (mediaTypeOfFeed === 'video') {
      activityContent.attachments.push(MediaAttachment.withVideoUrl(feedMedia));
    }
    const target = PostActivityTarget.topic(feedTarget);
    Communities.postActivity(activityContent, target).then(
      result => {
        debugLogs('Posted media activity: ', result);

        resetFeedStack();
      },
      error => {
        debugLogs('Failed to post media activity, error: ', error);
      },
    );
  };

  return {createSimpleFeed, createFeedWithMedia, createFeedWithLocalMedia};
};
