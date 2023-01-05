import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface buttonProps {
  title?: string;
  loading?: boolean;
  containerStyle: StyleProp<ViewStyle>;
  buttonTitleStyle?: StyleProp<TextStyle | ViewStyle>;
  onPress: () => void;
}
