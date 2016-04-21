import React, {
  StyleSheet,
  Text,
  View,
  PropTypes,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dotStyle: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 13,
    height: 13,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 7,
    marginBottom: 7,
  },
  activeDotStyle: {
    backgroundColor: '#fff',
    width: 13,
    height: 13,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 7,
    marginBottom: 7,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dotContainer: {
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  nextButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  full: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function AppIntro(props) {

  function onSkipBtnClick(){
    Alert.alert("!!!!!!!!!!!!");
  }

  function renderPagination(index, total, context) {
    console.log("!!!!", index, total, context);
    const ActiveDot = (
      <View
        style={[styles.activeDotStyle, { backgroundColor: props.activeDotColor }]}
      />
    );
    const Dot = <View style={[styles.dotStyle, { backgroundColor: props.dotColor }]} />;
    let dots = [];
    for (let i = 0; i < total; i++) {
      dots.push(i === index ?
        React.cloneElement(ActiveDot, { key: i })
        :
        React.cloneElement(Dot, { key: i })
      );
    }
    let doneBtn;
    let skipBtn;
    const nextBtn = <Text style={[styles.nextButtonText, { color: props.rightTextColor }]}>›</Text>;
    if (index === total - 1) {
      doneBtn = <Text style={[styles.text, { color: props.rightTextColor }]}>Done</Text>;
    } else {
      skipBtn = (
        <TouchableOpacity style={styles.full} onPress={onSkipBtnClick}>
          <Text style={[styles.text, { color: props.rightTextColor }]}>Skip</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.paginationContainer}>
        <View style={styles.btnContainer}>
          {skipBtn}
        </View>
        <View style={styles.dotContainer}>
          {dots}
        </View>
        <TouchableOpacity style={styles.btnContainer}>
          {doneBtn || nextBtn}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Swiper style={styles.wrapper}
      loop={false}
      renderPagination={renderPagination}
    >
      <View style={styles.slide1}>
        <Text style={styles.text}>Hello Swiper</Text>
      </View>
      <View style={styles.slide2} showsPagination={false}>
        <Text style={styles.text}>Beautiful</Text>
      </View>
      <View style={styles.slide3}>
        <Text style={styles.text}>And simple</Text>
      </View>
    </Swiper>
  );
}

AppIntro.propTypes = {
  dotColor: PropTypes.string,
  activeDotColor: PropTypes.string,
  rightTextColor: PropTypes.string,
  leftTextColor: PropTypes.string,
};

AppIntro.defaultProps = {
  dotColor: 'rgba(255,255,255,.3)',
  activeDotColor: '#fff',
  rightTextColor: '#fff',
  leftTextColor: '#fff',
};
