import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';

export const SkipButton = ({
  styles, onSkipBtnClick, isSkipBtnShow,
  leftTextColor,
  skipBtnLabel,
  skipFadeOpacity,
  allowFontScaling,
  fontSize
}) => {
  return (
    <View style={[styles.btnContainer, {
        paddingBottom: 5,
        opacity: isSkipBtnShow ? 1 : 0,
      }]}>
      <TouchableOpacity
        style={styles.full}
        onPress={isSkipBtnShow ? () => onSkipBtnClick() : null}>
        <Text allowFontScaling={allowFontScaling} style={[styles.controllText, { color: leftTextColor, fontSize }]}>
          {skipBtnLabel}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default SkipButton
