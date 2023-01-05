import {useNavigation} from '@react-navigation/core';

export const useNavigationServices = () => {
  const navigation = useNavigation();
  const resetFeedStack = () => {
    if (
      navigation &&
      navigation.getState().routes &&
      navigation.getState().routes.length > 0
    ) {
      let routeList = [...navigation.getState().routes];
      routeList = routeList.slice(0, 1);
      navigation.reset({index: 0, routes: [...routeList]});
    }
  };
  return {resetFeedStack};
};
