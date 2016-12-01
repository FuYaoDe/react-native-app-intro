import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export const DoneButton = ({
  styles, onDoneBtnClick, onNextBtnClick,
  rightTextColor, isDoneBtnShow,
  doneBtnLabel, nextBtnLabel,
  allowFontScaling, fontSize
}) => {
  return (
    <View style={[styles.btnContainer, { height: 0, paddingBottom: 5 }]}>
      <TouchableOpacity style={styles.full}
        onPress={ isDoneBtnShow ? onDoneBtnClick : onNextBtnClick}
      >
       <Text allowFontScaling={allowFontScaling} style={[styles.nextButtonText, { color: rightTextColor, fontSize }]}>
         {isDoneBtnShow ? doneBtnLabel : nextBtnLabel}
       </Text>
      </TouchableOpacity>
    </View>
  )
}

export default DoneButton