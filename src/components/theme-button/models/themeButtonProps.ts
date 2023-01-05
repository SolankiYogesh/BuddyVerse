import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export interface themeButtonProps extends TouchableOpacityProps {
  title?: string;
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle | ViewStyle>;
  onPress: () => void;
}
