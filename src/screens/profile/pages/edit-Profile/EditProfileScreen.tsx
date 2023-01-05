import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  AboutTextInput,
  EditProfileTextInput,
  styles,
} from './EditProfileScreenStyle';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import SimpleButton from '../../../../components/button/SimpleButton';
import {useNavigation} from '@react-navigation/native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import commonStyle from '../../../../utils/common-style/commonStyle';
import FastImage from 'react-native-fast-image';
import {GetSocial, UserUpdate} from 'getsocial-react-native-sdk';
import colorPalates from '../../../../theme/colors/colorPalates';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {themeSliceActions} from '../../../../redux-wrapper/reducers/theme-slice/themeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Switch} from 'react-native-switch';
import DatePicker from 'react-native-date-picker';
import _ from 'lodash';
import {ms} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  deleteGetsocialUser,
  generateRandomName,
  getUploadMediaUrl,
  ManualModerationTool,
  showToast,
  SpaceWordModeration,
} from '../../../../utils/helper/helper';
import Permission from '../../../../models/Permission';
import ProfileImageBottomSheet from '../../../feed/components/edit-profile-modal/ProfileImageBottomSheet';
import PickerModal from '../../../../components/picker-modal/PickerModal';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../models/ModalsMessages';
import {openSettings} from 'react-native-permissions';
import {
  CANNABIS,
  IMData,
  MyPassions,
} from '../../../../utils/helper/ConstantArray';
import moment from 'moment';
import {Auth, Storage} from 'aws-amplify';
import OverlayLoader from '../../../../components/overlay-loader/OverlayLoader';
import {userAction, useUserState} from '../../../../redux-wrapper/reducers';
import screenNameEnum from '../../../../models/screenNameEnum';
import LoadingContainer from '../../../../components/loading-container/LoadingContainer';

interface XYProps {
  X: number;
  Y: number;
}

const EditProfileScreen = props => {
  const {userData} = useUserState();
  const navigation = useNavigation();
  const [profilePhoto, setProfilePhoto] = useState('');
  const [imageLoader, setImageLoader] = useState(false);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [date, setDate] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [gender, setGender] = useState('m');
  const [website, setWebsite] = useState('');
  const [open, setOpen] = useState(false);
  const [permissionModal, setPermissionModel] = useState(false);
  const [type, setType] = useState('');
  const [textInputActive, setTextInputActive] = useState(false);
  const [aboutTextActive, setAboutTextActive] = useState(false);
  const [aboutLength, setAboutLength] = useState(0);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const [oopsMessage, setOopsMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const [error, setError] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useDispatch();
  const isDark = useSelector((state: any) => state?.theme?.isDark);
  const [aboutMe, setAboutMe] = useState('');
  const [height, setHeight] = useState(0);
  const [imData, setIMData] = useState([]);
  const [myPassionsData, setMyPassionsData] = useState<any>([]);
  const [cannabisCategory, setCanabisCategory] = useState<any>([]);
  const sheetRef = useRef<BottomSheet>();
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState<any>(false);
  const [profileXY, setProfileXY] = useState<XYProps>({X: 0, Y: 0});
  const [birthdateXY, setBirthdateXY] = useState<XYProps>({X: 0, Y: 0});
  const [nameXY, setNameXY] = useState<XYProps>({X: 0, Y: 0});
  const [usernameXY, setUsernameXY] = useState<XYProps>({X: 0, Y: 0});
  const isNotVerified = !!props?.route?.params?.isNotVerified;
  const scrollRef = useRef<KeyboardAwareScrollView>();
  const [userLoader, setUserLoad] = useState(false);
  const [imLikeXY, setImLikeXY] = useState<XYProps>({X: 0, Y: 0});
  const [selectedLength, setSelectedLength] = useState(0);

  // const [isPassionsError, setPassionsError] = useState(true);

  useEffect(() => {
    setupScreen();
  }, []);

  // useEffect(() => {
  //   const selectedLength = _.filter(myPassionsData, i => !!i?.selected)?.length;

  //   setPassionsError(selectedLength < 3);
  // }, [myPassionsData]);
  useEffect(() => {
    const sl = _.filter(imData, i => !!i?.selected)?.length || 0;
    setSelectedLength(sl);
  }, [imData]);

  const setupScreen = async () => {
    setUserLoad(true);
    try {
      const authUser = await Auth.currentUserInfo();
      const randomeName = generateRandomName();
      const randomeNumber = Math.floor(1000 + Math.random() * 9000);

      if (!!userData) {
        let nameHide = userData?.publicProperties?.name_hide;

        let data = userData?.publicProperties?.aboutData
          ? JSON.parse(userData?.publicProperties?.aboutData)
          : '';
        let labeldata = userData?.publicProperties?.labelsData
          ? JSON.parse(userData?.publicProperties?.labelsData)
          : '';

        if (_.includes(userData?.displayName, 'User')) {
          const emailname = authUser?.attributes?.email?.match(/^.*(?=@)/g);
          if (!!emailname) {
            setUsername(emailname + randomeNumber);
          } else {
            setUsername(randomeName + randomeNumber);
          }
        } else {
          setUsername(userData?.displayName);
        }

        setFullname(userData?.publicProperties?.full_name);
        setDate(userData?.privateProperties?.dob || '');
        setGender(userData?.privateProperties?.gender);
        setProfilePhoto(userData?.avatarUrl);
        setAboutMe(userData?.publicProperties?.about || data?.aboutText);
        setIsEnabled(nameHide === '0' ? false : true || true);
        setWebsite(userData?.publicProperties?.website || data?.website);
        setAboutLength(data?.aboutText?.length || 0);

        if (labeldata?.iamData) {
          let data = !!labeldata?.iamData ? JSON.parse(labeldata?.iamData) : [];

          if (!Number.isNaN(data[0]) && typeof data[0] !== 'object') {
            const tempData = !!labeldata?.iamData
              ? JSON.parse(labeldata?.iamData)
              : [];
            data = _.map(IMData, i => {
              return !!_.find(tempData, it => i?.id === it) ? i : null;
            });
          }

          const newdata = _.map(IMData, i => {
            return {
              selected: !!_.find(data, x => x?.name === i?.name),
              ...i,
            };
          });

          setIMData(newdata);
        } else {
          const newdata = _.map(IMData, i => {
            return {selected: false, ...i};
          });

          setIMData(newdata);
        }
        if (labeldata?.myPassionsData) {
          let data = !!labeldata?.myPassionsData
            ? JSON.parse(labeldata?.myPassionsData).flat()
            : [];
          if (!Number.isNaN(data[0]) && typeof data[0] !== 'object') {
            const tempData = !!labeldata?.myPassionsData
              ? JSON.parse(labeldata?.myPassionsData).flat()
              : [];
            data = _.map(MyPassions, i => {
              return !!_.find(tempData, it => i?.id === it) ? i : null;
            });
          }

          const newdata = _.map(MyPassions, i => {
            return {
              selected: !!_.find(data, x => x?.name === i?.name),
              ...i,
            };
          });
          setMyPassionsData(newdata);
        } else {
          const newdata = _.map(MyPassions, i => {
            return {
              selected: false,
              ...i,
            };
          });
          setMyPassionsData(newdata);
        }
        if (labeldata?.canabisData) {
          let data = !!labeldata?.canabisData
            ? JSON.parse(labeldata?.canabisData)
            : [];
          if (!Number.isNaN(data[0]) && typeof data[0] !== 'object') {
            const tempData = !!labeldata?.canabisData
              ? JSON.parse(labeldata?.canabisData)
              : [];
            data = _.map(CANNABIS, i => {
              return !!_.find(tempData, it => i?.id === it) ? i : null;
            });
          }
          const newdata = _.map(CANNABIS, i => {
            return {
              selected: !!_.find(data, x => x?.name === i.name),
              ...i,
            };
          });
          setCanabisCategory(newdata);
        } else {
          const newdata = _.map(CANNABIS, i => {
            return {
              selected: false,
              ...i,
            };
          });
          setCanabisCategory(newdata);
        }
      } else {
        setUserLoad(false);
      }
    } catch (error) {
      setUserLoad(false);
    }
    setUserLoad(false);
  };

  const getGroupImageProfileUrl = imageUri => {
    return new Promise(async resolve => {
      try {
        const media = await fetch(imageUri);
        const blob = await media.blob();

        const file_name = `GPROFILE-${
          userData?.id
        }_${new Date().getTime()}.jpg`;
        Storage.put(file_name, blob, {
          level: 'public',
          contentType: 'image/jpg',
          useAccelerateEndpoint: true,
        })
          .then(() => {
            resolve(
              `https://d1c70unjid1vm2.cloudfront.net/public/${file_name?.replace(
                '.jpg',
                '',
              )}-profile.jpg`,
            );
          })
          .catch(() => {
            resolve('');
          });
      } catch (e) {
        console.log(e, 'eeeeeeeeeeeeeeeeeeeee');
        resolve('');
        setError(true);
      }
    });
  };

  useEffect(() => {
    GetSocial.getCurrentUser().then(user => {
      if (
        user?.publicProperties?.about ||
        user?.publicProperties?.imData ||
        user?.publicProperties?.website ||
        user?.publicProperties?.Passions ||
        user?.publicProperties?.likeIDS
      ) {
        var batchUpdate = new UserUpdate();
        batchUpdate = {...user};
        batchUpdate.publicProperties.Passions = '';
        batchUpdate.publicProperties.imData = '';
        batchUpdate.publicProperties.cannabisData = '';
        batchUpdate.publicProperties.likeIDS = '';
        batchUpdate.publicProperties.about = '';

        user.updateDetails(batchUpdate).then(() => {});
      }
    });
  }, []);

  const onPressSave = async (isProfile = true) => {
    const filterImData = _.filter(imData, (i: any) => i?.selected)?.map(
      i => i?.id,
    );
    const filterCannabisData = _.filter(
      cannabisCategory,
      i => i?.selected,
    )?.map(i => i?.id);
    const filterMyPassionData = _.filter(myPassionsData, i => i?.selected)?.map(
      i => i?.id,
    );

    const imDataString = JSON.stringify(filterImData);
    const MyPassionDataString = JSON.stringify(filterMyPassionData);
    const CannabisDataString = JSON.stringify(filterCannabisData);

    let aboutData = '';

    if (!!aboutMe) {
      let aboutText = aboutMe?.replace(/(?:(?:\r\n|\r|\n)\s*){2}/gm, '\n');
      const isSafeName = ManualModerationTool(fullname);
      const advIsSafeName = isSafeName && SpaceWordModeration(fullname);
      const isAboutSafe = ManualModerationTool(aboutText);
      const advIsSafeAbout = isAboutSafe && SpaceWordModeration(aboutText);

      const renderAboutData = {aboutText: aboutText, website: website};

      aboutData = JSON.stringify(renderAboutData);
      if (!(advIsSafeName && advIsSafeAbout)) {
        setIsPopUp(true);
        return;
      }
    }

    const renderLabelsData = {
      iamData: imDataString,
      myPassionsData: MyPassionDataString,
      canabisData: CannabisDataString,
    };

    const aboutLabelsData = JSON.stringify(renderLabelsData);

    if (!profilePhoto) {
      scrollRef.current?.scrollToPosition(profileXY.X, profileXY.Y, true);
      showToast(ModalsMessages.ModalsMassages.emptyFileds);
      return;
    }
    if (!fullname) {
      scrollRef.current?.scrollToPosition(nameXY.X, nameXY.Y, true);
      showToast(ModalsMessages.ModalsMassages.emptyFileds);
      return;
    }
    if (!username) {
      scrollRef.current?.scrollToPosition(usernameXY.X, usernameXY.Y, true);
      showToast(ModalsMessages.ModalsMassages.emptyFileds);
      return;
    }
    if (!date) {
      scrollRef.current?.scrollToPosition(birthdateXY.X, birthdateXY.Y, true);
      showToast(ModalsMessages.ModalsMassages.emptyFileds);
      return;
    }
    if (filterImData?.length > 3 || filterImData?.length <= 0) {
      scrollRef.current?.scrollToPosition(imLikeXY.X, imLikeXY.Y, true);
      showToast(ModalsMessages.ModalsMassages.emptyFileds);
      return;
    }
    // if (filterMyPassionData?.length < 3) {
    //   scrollRef.current?.scrollToPosition(passionsXY.X, passionsXY.Y, true);
    //   showToast(ModalsMessages.ModalsMassages.emptyFileds);
    //   return;
    // }

    setIsLoading(true);

    const userResp = await GetSocial.getCurrentUser();
    var batchUpdate = new UserUpdate();
    const isLink = profilePhoto?.includes('http');
    if (!isProfile) {
      batchUpdate.avatarUrl = '';
    } else if (!isLink) {
      const imageUrl = await getGroupImageProfileUrl(profilePhoto);
      batchUpdate.avatarUrl = imageUrl;
    } else {
      batchUpdate.avatarUrl = profilePhoto;
    }
    batchUpdate.displayName = username;
    batchUpdate.publicProperties.aboutData = aboutData;

    batchUpdate.publicProperties.labelsData = aboutLabelsData;

    batchUpdate.publicProperties.full_name = fullname;
    batchUpdate.privateProperties.dob = date ? date : '';
    batchUpdate.privateProperties.gender = gender;
    batchUpdate.publicProperties.name_hide = isEnabled ? '1' : '0';

    let data = !!aboutData ? JSON.parse(aboutData) : [];
    let labelsData = !!aboutLabelsData ? JSON.parse(aboutLabelsData) : [];

    let count = 0;
    if (batchUpdate?.avatarUrl) {
      count = count + 1;
    }
    if (batchUpdate?.displayName) {
      count = count + 1;
    }
    if (batchUpdate?.publicProperties?.full_name) {
      count = count + 1;
    }
    if (batchUpdate?.privateProperties?.dob) {
      count = count + 1;
    }
    if (batchUpdate?.privateProperties?.gender) {
      count = count + 1;
    }
    if (data?.aboutText) {
      count = count + 1;
    }

    if (data?.website) {
      count = count + 1;
    }
    if (labelsData?.iamData) {
      count = count + 1;
    }
    if (labelsData?.myPassionsData) {
      count = count + 1;
    }
    if (labelsData?.canabisData) {
      count = count + 1;
    }
    batchUpdate.publicProperties['profileComplete'] = (count * 10).toString();
    const updateUser = {
      id: userResp?.id,
      ...batchUpdate,
    };

    dispatch(userAction.setUserData({user: updateUser}));
    setIsLoading(true);
    const currentUser = await GetSocial.getCurrentUser();

    if (username.length <= 30 && username.length >= 3) {
      try {
        currentUser
          .updateDetails(updateUser)

          .then(() => {
            setSuccess(true);
            setIsLoading(false);
            if (isNotVerified) {
              navigation?.replace(screenNameEnum.TabStack);
            } else {
              navigation.goBack();
            }
          })
          .catch(e => {
            setOopsMessage(true);
            setIsLoading(false);
          });
      } catch (e) {
        setError(true);
        setIsLoading(false);
      }
    } else {
      setErrorMessage(true);
      setIsLoading(false);
    }
  };

  const isValiddate = (d: string) => {
    const dt = Date.parse(d);
    return !Number.isNaN(dt);
  };

  console.log(isValiddate(date));

  const onPressCamera = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 1,
      videoQuality: 'high',
      presentationStyle: 'fullScreen',
    })
      .then((cameraResponse: any) => {
        if (cameraResponse.didCancel) {
          return;
        }
        if (cameraResponse.errorCode) {
          return;
        }
        if (cameraResponse.errorMessage) {
          return;
        }

        const resp = {
          uri: cameraResponse?.assets[0].uri,
          fileSize: cameraResponse?.assets[0].fileSize,
          filename: cameraResponse.assets[0].fileName,
          height: cameraResponse.assets[0].height,
          width: cameraResponse.assets[0].width,
          timestamp: cameraResponse.assets[0].timestamp,
          type: cameraResponse.assets[0].type,
        };
        onSelectImage(resp);

        // setIsVideoModal(false);
      })
      .catch(() => {
        // setIsVideoModal(false);
      });
  };

  const onPressGallery = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
      includeExtra: true,
      presentationStyle: 'fullScreen',
    }).then(async (cameraResponse: any) => {
      if (cameraResponse.didCancel) {
        return;
      }
      if (cameraResponse.errorCode) {
        return;
      }
      if (cameraResponse.errorMessage) {
        return;
      }

      const resp = {
        uri: cameraResponse?.assets[0].uri,
        fileSize: cameraResponse?.assets[0].fileSize,
        filename: cameraResponse.assets[0].fileName,
        height: cameraResponse.assets[0].height,
        width: cameraResponse.assets[0].width,
        timestamp: cameraResponse.assets[0].timestamp,
        type: cameraResponse.assets[0].type,
      };
      onSelectImage(resp);
    });
  };

  const onPressRemove = () => {
    setProfilePhoto('');
    onPressSave(false);
  };

  const onSelectImage = async selectedImagesList => {
    if (selectedImagesList) {
      setImageLoader(true);
      const path = await getUploadMediaUrl(selectedImagesList);
      setProfilePhoto(path);
      setImageLoader(false);
    }
  };

  const onPressMyPassionsRenderItem = element => {
    let data = JSON.parse(JSON.stringify(myPassionsData));
    const index = _.findIndex(data, (i: any) => i?.name === element?.name);
    data[index].selected = !data[index].selected;
    setMyPassionsData(data);
  };

  const onPressIamARenderItem = element => {
    let data = JSON.parse(JSON.stringify(imData));
    const index = _.findIndex(data, (i: any) => i?.name === element?.name);
    data[index].selected = !data[index].selected;
    setIMData(data);
  };

  const onPressCannabisCategoriesRenderItem = element => {
    let data = JSON.parse(JSON.stringify(cannabisCategory));
    const index = _.findIndex(data, (i: any) => i?.name === element?.name);
    data[index].selected = !data[index].selected;
    setCanabisCategory(data);
  };

  const openCameraModel = async () => {
    const mic = await Permission.getMicPermission();
    const camera = await Permission.getCameraPermission();
    const storage = await Permission.getStoragePermission();
    if (mic && camera && storage) {
      sheetRef.current?.show();
    } else {
      setPermissionModel(true);
    }
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerButtonContainer}>
        <SimpleButton
          title={'Cancel'}
          onPress={() => {
            if (isNotVerified) {
              showToast(ModalsMessages.ModalsMassages.emptyFileds);
            } else {
              navigation.goBack();
            }
          }}
        />

        <Text style={styles.editProfileText}>My Profile</Text>

        <SimpleButton title={'Save'} onPress={onPressSave} />
      </View>
    );
  };

  const renderThemeButton = () => {
    return (
      <View style={styles.themeContainer}>
        <View style={styles.rowThemeView}>
          <Switch
            value={isDark}
            onValueChange={() => {
              dispatch(themeSliceActions?.isDark(!isDark));
            }}
            switchWidthMultiplier={3}
            activeText={'Dark'}
            inActiveText={'Light'}
            switchLeftPx={2.5}
            switchRightPx={2.5}
            backgroundActive={colorPalates.AppTheme.primary}
          />
          <Text style={[styles.chatCommentText, styles.chatCommentTextStyle]}>
            Mode
          </Text>
          <Text style={styles.chatCommentText}>{'(Chat & Comments only)'}</Text>
        </View>
      </View>
    );
  };

  const renderProfileView = () => {
    return (
      <>
        <View
          style={styles.marginTop28}
          onLayout={e => {
            e.nativeEvent.layout.x;
            setProfileXY({
              X: e.nativeEvent.layout.x,
              Y: e.nativeEvent.layout.y,
            });
          }}
        >
          <FastImage
            style={styles.profileImage}
            source={{
              uri: profilePhoto,
            }}
            resizeMode={FastImage.resizeMode.cover}
            onLoadStart={() => setImageLoader(true)}
            onLoadEnd={() => setImageLoader(false)}
          >
            {imageLoader ? (
              <View style={styles.loaderView}>
                <ActivityIndicator
                  size={'small'}
                  color={colorPalates.AppTheme.primary}
                />
              </View>
            ) : (
              <TouchableOpacity onPress={openCameraModel}>
                <IconFontAwesome name="camera" size={32} color="white" />
              </TouchableOpacity>
            )}
          </FastImage>
          <Text style={!profilePhoto ? styles.redText : styles.nonRedText}>
            Profile pic / Avatar <Text style={styles.redDotText}> *</Text>{' '}
          </Text>
        </View>

        {renderThemeButton()}
      </>
    );
  };

  const renderBasicInfoView = () => {
    return (
      <View style={commonStyle.flexOne}>
        <View style={styles.textInputView}>
          <Text style={styles.textInputText}>Basic Info</Text>

          <Text style={styles.usernameTxtStyle}>
            {' '}
            Name
            <Text style={styles.redDotText}> *</Text>
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              // justifyContent: 'space-between',
            }}
          >
            <TextInput
              value={fullname}
              onChangeText={val => setFullname(val)}
              placeholder="Full Name"
              placeholderTextColor={colorPalates.grayShadeAB}
              style={[
                type === 'name'
                  ? EditProfileTextInput(textInputActive)
                  : styles.textInputContainer,
                !fullname && {borderColor: colorPalates.red},

                styles.inputMergeStyle,
              ]}
              onLayout={e => {
                setNameXY({
                  X: e?.nativeEvent?.layout?.x,
                  Y: e?.nativeEvent?.layout?.y,
                });
              }}
              maxLength={24}
              onFocus={() => {
                setType('name');
                setTextInputActive(true);
              }}
              onBlur={() => {
                setType('');
                setTextInputActive(false);
              }}
            />
            <Switch
              value={isEnabled}
              onValueChange={() => setIsEnabled(!isEnabled)}
              activeText={'Show'}
              inActiveText={'Hide'}
              circleActiveColor={colorPalates.grayShadef4}
              circleInActiveColor={colorPalates.grayShadef4}
              switchLeftPx={10}
              switchRightPx={10}
              activeTextStyle={styles.lableStyle}
              inactiveTextStyle={styles.inActivelableStyle}
            />
          </View>

          <Text style={styles.usernameTxtStyle}>
            {' '}
            User Name
            <Text style={styles.redDotText}> *</Text>
          </Text>
          <TextInput
            value={username}
            onChangeText={val => setUsername(val)}
            placeholder="User Name"
            placeholderTextColor={colorPalates.grayShadeAB}
            style={[
              type === 'username'
                ? EditProfileTextInput(textInputActive)
                : styles.textInputContainer,
              !username && {borderColor: colorPalates.red},
            ]}
            onLayout={e => {
              setUsernameXY({
                X: e?.nativeEvent?.layout?.x,
                Y: e?.nativeEvent?.layout?.y,
              });
            }}
            maxLength={30}
            onFocus={() => {
              setType('username');
              setTextInputActive(true);
            }}
            onBlur={() => {
              setType('');
              setTextInputActive(true);
            }}
          />
          <Text style={styles.usernameTxtStyle}>
            Birthday <Text style={styles.redDotText}> *</Text>
          </Text>
          <DatePicker
            modal
            open={open}
            date={isValiddate(date) ? new Date(date) : new Date()}
            mode="date"
            confirmText="Set"
            onConfirm={d => {
              setDate(d);
              setOpen(false);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <TouchableOpacity
            style={[
              styles.btnDateView,
              {
                borderColor: open
                  ? colorPalates.AppTheme.primary
                  : colorPalates.grayShadeE6,
              },
              !date && {borderColor: colorPalates.red},
            ]}
            onPress={() => {
              setOpen(true);
            }}
            onLayout={e => {
              setBirthdateXY({
                X: e?.nativeEvent?.layout?.x,
                Y: e?.nativeEvent?.layout?.y,
              });
            }}
          >
            <Text style={styles.dateText}>
              {moment(date).format('MM/DD/YYYY') || 'select'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.usernameTxtStyle}> Website/Link</Text>
          <TextInput
            value={website}
            onChangeText={setWebsite}
            placeholder="Your website, blog, social media…"
            placeholderTextColor={colorPalates.grayShadeAB}
            style={
              type === 'website'
                ? EditProfileTextInput(textInputActive)
                : styles.textInputContainer
            }
            maxLength={30}
            onFocus={() => {
              setType('website');
              setTextInputActive(true);
            }}
            onBlur={() => {
              setType('');
              setTextInputActive(false);
            }}
          />
        </View>
        <View style={styles.textInputView}>
          <Text style={styles.textInputText}>Gender</Text>
          <View style={styles.genederViewstyle}>
            <TouchableOpacity
              onPress={() => setGender('m')}
              style={
                gender === 'm'
                  ? styles.selectedMaleButton
                  : styles.unSelectedMaleButton
              }
            >
              <Text
                style={
                  gender === 'm'
                    ? styles.selectedGenderText
                    : styles.unSelectedGenderText
                }
              >
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender('f')}
              style={
                gender === 'f'
                  ? styles.selectedFemaleButton
                  : styles.unSelectedFemaleButton
              }
            >
              <Text
                style={
                  gender === 'f'
                    ? styles.selectedGenderText
                    : styles.unSelectedGenderText
                }
              >
                Female
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender('n')}
              style={
                gender === 'n'
                  ? styles.selectedNonBinaryButton
                  : styles.unSelectedNonBinaryButton
              }
            >
              <Text
                style={
                  gender === 'n'
                    ? styles.selectedGenderText
                    : styles.unSelectedGenderText
                }
              >
                Non-Binary
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.textInputView}>
          <Text style={styles.usernameTxtStyle}> About Me</Text>
          <TextInput
            value={aboutMe}
            numberOfLines={height}
            onChangeText={text => {
              setAboutMe(text);
              setAboutLength(text.length);
            }}
            onContentSizeChange={e => {
              setHeight(e.nativeEvent.contentSize.height);
            }}
            placeholder="“NO! A blank “About Me” is not mysterious and doesn’t create intrigue!
            Say something cool about yourself here and meet engaging and interesting people, like you!😊"
            placeholderTextColor={colorPalates.grayShadeAB}
            style={[
              type === 'aboutme'
                ? AboutTextInput(aboutTextActive)
                : styles.textInputContainer,
              styles.aboutViewStyle,
            ]}
            multiline={true}
            maxLength={500}
            textAlignVertical="top"
            onFocus={() => {
              setType('aboutme');
              setAboutTextActive(true);
            }}
            onBlur={() => {
              setAboutTextActive(false);
            }}
          />
          <Text style={styles.aboutLength}>{`${
            500 - aboutLength
          } characters remaining`}</Text>
        </View>
      </View>
    );
  };

  const renderImDataView = () => {
    return (
      <View
        style={styles.renderImDataView}
        // onLayout={e => {
        //   setimDataXY({
        //     X: e?.nativeEvent?.layout?.x,
        //     Y: e?.nativeEvent?.layout?.y,
        //   });
        // }}
      >
        <View
          style={styles.renderImDataSubView}
          onLayout={e => {
            setImLikeXY({
              X: e.nativeEvent.layout.x,
              Y: e.nativeEvent.layout.y,
            });
          }}
        >
          <Text
            style={[
              styles.imTextStyle,
              {
                color:
                  selectedLength > 3 || selectedLength <= 0
                    ? colorPalates.red
                    : colorPalates.AppTheme.text,
              },
            ]}
          >
            I'm a <Text style={styles.redDotText}> *</Text>
          </Text>
          <Text style={styles.selectMaxText}>
            (Please select at least one and a max of 3)
          </Text>
          <Text style={styles.selectMaxText}>
            {'selected: ' + selectedLength + '/' + 3}
          </Text>
        </View>
        <View style={styles.imDataList}>
          {_.map(imData, i => {
            return renderIamARenderItem(i);
          })}
        </View>
      </View>
    );
  };

  const renderIamARenderItem = element => {
    return (
      <TouchableOpacity
        onPress={() => onPressIamARenderItem(element)}
        disabled={selectedLength >= 3 && !element?.selected}
      >
        <View
          style={[
            styles.imDataItem,
            {
              backgroundColor: element?.selected
                ? colorPalates.AppTheme.primary
                : colorPalates.white,
            },
          ]}
        >
          <SvgXml
            xml={element?.selected ? element?.white : element.green}
            height={ms(20)}
            width={ms(20)}
          />
          <Text
            style={[
              styles.imDataItemText,
              {
                color: element?.selected
                  ? colorPalates.white
                  : colorPalates.AppTheme.primary,
              },
            ]}
          >
            {element?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderInterestedView = () => {
    return (
      <View
        style={styles.renderImDataView}
        // onLayout={e => {
        //   setPassionsXY({
        //     X: e?.nativeEvent?.layout?.x,
        //     Y: e?.nativeEvent?.layout?.y,
        //   });
        // }}
      >
        <View style={styles.renderImDataSubView}>
          <Text
            style={[
              styles.imTextStyle,
              {
                color: colorPalates.AppTheme.text,
              },
            ]}
          >
            I'm interested in
          </Text>
          <Text style={styles.selectMaxText}>
            (Please select all that apply)
          </Text>
        </View>

        <View style={styles.imDataList}>
          {_.map(myPassionsData, i => {
            return renderMyPassionsRenderItem(i);
          })}
        </View>
      </View>
    );
  };

  const renderMyPassionsRenderItem = element => {
    return (
      <TouchableOpacity onPress={() => onPressMyPassionsRenderItem(element)}>
        <View
          style={[
            styles.imDataItem,
            {
              backgroundColor: element?.selected
                ? colorPalates.AppTheme.primary
                : colorPalates.white,
            },
          ]}
        >
          <SvgXml
            xml={element?.selected ? element?.white : element?.green}
            height={ms(20)}
            width={ms(20)}
          />
          <Text
            style={[
              styles.imDataItemText,
              {
                color: element?.selected
                  ? colorPalates.white
                  : colorPalates.AppTheme.primary,
              },
            ]}
          >
            {element?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderILikeView = () => {
    return (
      <View style={styles.renderImDataView}>
        <View style={styles.renderImDataSubView}>
          <Text style={styles.imTextStyle}>I Like</Text>
          <Text style={styles.selectMaxText}>
            (Please select all that apply)
          </Text>
        </View>
        <View style={styles.imDataList}>
          {_.map(cannabisCategory, i => {
            return renderCategoriesRenderItem(i);
          })}
        </View>
      </View>
    );
  };

  const renderCategoriesRenderItem = element => {
    return (
      <TouchableOpacity
        onPress={() => onPressCannabisCategoriesRenderItem(element)}
      >
        <View
          style={[
            styles.imDataItem,
            {
              backgroundColor: element?.selected
                ? colorPalates.AppTheme.primary
                : colorPalates.white,
            },
          ]}
        >
          <SvgXml
            xml={element?.selected ? element?.white : element?.green}
            height={ms(20)}
            width={ms(20)}
          />
          <Text
            style={[
              styles.imDataItemText,
              {
                color: element?.selected
                  ? colorPalates.white
                  : colorPalates.AppTheme.primary,
              },
            ]}
          >
            {element?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDeleteButton = () => {
    return (
      <View style={styles.deleteViewstyle}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            setIsShow(true);
          }}
        >
          <IconAntDesign
            size={24}
            name="deleteuser"
            color={colorPalates.redShadeDF}
          />
          <Text style={styles.logoutButtonTitle}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {userLoader ? (
        <LoadingContainer />
      ) : (
        <KeyboardAwareScrollView style={commonStyle.flexOne} ref={scrollRef}>
          {renderProfileView()}
          {renderBasicInfoView()}
          {renderImDataView()}
          {renderInterestedView()}
          {renderILikeView()}
          {!isNotVerified && renderDeleteButton()}
        </KeyboardAwareScrollView>
      )}

      <ProfileImageBottomSheet
        uri={profilePhoto}
        ref={sheetRef}
        onPressChange={() => {
          sheetRef.current?.close();
          setTimeout(() => {
            setIsVisibleCameraModal(true);
          }, 1000);
        }}
        onRemoveImage={() => {
          sheetRef.current?.close();
          setTimeout(() => {
            onPressRemove();
          }, 1000);
        }}
      />
      <PickerModal
        isVideo={false}
        isVisible={isVisibleCameraModal}
        onClose={() => setIsVisibleCameraModal(false)}
        onPressCamera={() => {
          setIsVisibleCameraModal(false);
          setTimeout(() => {
            onPressCamera();
          }, 1000);
        }}
        onPressGallery={() => {
          setIsVisibleCameraModal(false);
          // onPressGallery();
          setTimeout(() => {
            onPressGallery();
          }, 1000);
        }}
      />
      <AnnounceMentModal
        modalVisible={permissionModal}
        buttonText="Setting"
        secondButton
        secondButtonText="Cancel"
        onPressSecondButton={() => {
          setPermissionModel(false);
        }}
        messageText={ModalsMessages.ModalsMassages.thisFeatureRequired}
        onPressButton={() => {
          openSettings().then(() => {
            setPermissionModel(false);
          });
        }}
      />
      <AnnounceMentModal
        modalVisible={success}
        onPressButton={() => setSuccess(false)}
        title={ModalsMessages.ModalsTitles.success}
        buttonText={'ok'}
        messageText={ModalsMessages.ModalsMassages.profileUpdate}
      />
      <AnnounceMentModal
        modalVisible={error}
        onPressButton={() => setError(false)}
        title={ModalsMessages.ModalsTitles.somethingWentWrong}
        buttonText={'ok'}
        messageText={ModalsMessages.ModalsMassages.pleaseTryANother}
      />
      <AnnounceMentModal
        modalVisible={errorImage}
        onPressButton={() => setErrorImage(false)}
        title={ModalsMessages.ModalsTitles.somethingWentWrong}
        buttonText={'Try Again'}
        messageText={ModalsMessages.ModalsMassages.pleaseTryANother}
      />
      <AnnounceMentModal
        modalVisible={isPopUp}
        title={''}
        buttonText={'ok'}
        messageText={ModalsMessages.ModalsMassages.offensiveWord}
        onPressButton={() => setIsPopUp(false)}
      />
      <AnnounceMentModal
        modalVisible={oopsMessage}
        onPressButton={() => setOopsMessage(false)}
        title={ModalsMessages.ModalsTitles.oops}
        buttonText={'OK'}
        messageText={ModalsMessages.ModalsMassages.somethingWentWrongPlease}
      />
      <AnnounceMentModal
        modalVisible={errorMessage}
        onPressButton={() => setErrorMessage(false)}
        title={ModalsMessages.ModalsTitles.Fill_Profile_info}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.nameofUsername}
      />
      <AnnounceMentModal
        modalVisible={isShow}
        title={'Delete'}
        buttonText={'Cancel'}
        buttonStyle={{width: '40%'}}
        messageText={
          'Are you sure? All of your data will be permanently deleted.'
        }
        onPressButton={() => {
          setIsShow(false);
        }}
        secondButton={true}
        secondButtonText={'Delete'}
        secondButtonStyle={{width: '40%'}}
        onPressSecondButton={async () => {
          setIsShow(false);
          setTimeout(async () => {
            await Auth.deleteUser();
            await deleteGetsocialUser();
            await Auth.signOut();
            await GetSocial.resetUser();
            dispatch(userAction.clearUser());
          }, 1000);
        }}
      />
      {isLoading && <OverlayLoader />}
    </SafeAreaView>
  );
};

export default EditProfileScreen;
