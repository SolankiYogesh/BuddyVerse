import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {RootSiblingParent} from 'react-native-root-siblings';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from 'redux-wrapper/store/store';
import {Appearance, Platform, StatusBar} from 'react-native';
import IntialNotification from './IntialNotification';
import {enableScreens} from 'react-native-screens';
import UpdateModal from './components/updateModal/UpdateModal';
import VersionCheck from 'react-native-version-check';

enableScreens();
const App = () => {
  const colorScheme = Appearance.getColorScheme();
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    checkUpdateNeeded();
  }, []);

  const checkUpdateNeeded = async () => {
    let updateNeeded = await VersionCheck.needUpdate();
    console.log(updateNeeded);

    if (updateNeeded?.isNeeded) {
      setIsUpdate(true);
    }
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <StatusBar
            animated={true}
            barStyle={
              Platform.OS == 'ios'
                ? colorScheme == 'dark'
                  ? 'dark-content'
                  : null
                : null
            }
          />

          <IntialNotification />
        </RootSiblingParent>
      </PersistGate>

      <UpdateModal isVisible={false} onClose={() => setIsUpdate(false)} />
    </Provider>
  );
};

export default App;
