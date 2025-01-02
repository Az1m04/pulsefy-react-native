import {Platform, StyleSheet, TextStyle, Text} from 'react-native';
import {Colors, Fonts} from '../../utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';

interface CustomTextProps {
  variants?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'h7'
    | 'h8'
    | 'h9'
    | 'body';
  fontFamily?: Fonts;
  fontSize?: number;
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
  numberOfLines?: number;
  onLayout?: (event: any) => void;
}

const CustomText: React.FC<CustomTextProps> = ({
  variants,
  fontFamily = 'Satoshi-Regular',
  fontSize,
  children,
  style,
  numberOfLines,
  onLayout,
  ...props
}) => {
  let computedFontSize: number =
    Platform.OS === 'android'
      ? RFValue(fontSize || 12)
      : RFValue(fontSize || 10);
  switch (variants) {
    case 'h1':
      computedFontSize =
        Platform.OS === 'android'
          ? RFValue(fontSize || 24)
          : RFValue(fontSize || 22);
      break;
    case 'h2':
      computedFontSize =
        Platform.OS === 'android'
          ? RFValue(fontSize || 20)
          : RFValue(fontSize || 18);
      break;
    case 'h3':
      computedFontSize =
        Platform.OS === 'android'
          ? RFValue(fontSize || 18)
          : RFValue(fontSize || 16);
      break;
    case 'h4':
      computedFontSize =
        Platform.OS === 'android'
          ? RFValue(fontSize || 16)
          : RFValue(fontSize || 14);
      break;
    case 'h5':
      computedFontSize =
        Platform.OS === 'android'
          ? RFValue(fontSize || 14)
          : RFValue(fontSize || 12);
      break;
    case 'h6':
      computedFontSize =
        Platform.OS === 'android'
          ? RFValue(fontSize || 12)
          : RFValue(fontSize || 10);
      break;
    case 'h7':
      computedFontSize =
        Platform.OS === 'android'
          ? RFValue(fontSize || 10)
          : RFValue(fontSize || 9);
      break;
  }
  return (
    <Text
      numberOfLines={numberOfLines === undefined ? undefined : numberOfLines}
      onLayout={onLayout}
      style={[
        styles.text,
        {color: Colors.text, fontSize: computedFontSize},
        {fontFamily},
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'red',
    textAlign: 'left',
  },
});
export default CustomText;
 