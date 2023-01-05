import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params) {
  navigationRef.navigate(name, params);
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
