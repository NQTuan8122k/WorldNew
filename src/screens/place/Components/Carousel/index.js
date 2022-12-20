import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
import {HttpImage} from '../../../../helpers/httpImage';
import {scale, scaleHeight} from '../../../../utils/fontConfig';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const CustomCarousel = ({listImage, data, UpdateData}) => {
  useEffect(() => {
    console.log('1249u1rwjiasdamgsodngdoingsdofg', data?.data);
  }, [data]);

  const swipeRight = () => {
    Animated.spring(animatedValue, {
      toValue: {
        x: windowWidth * 2,
        y: 0,
      },
      useNativeDriver: false,
    }).start(() => {
      animatedValue.setValue({x: 0, y: 0});
      setCurrentCardIndex(prevIndex => prevIndex - 1);
      listImage?.pop();
    });
  };

  const swipeLeft = () => {
    Animated.spring(animatedValue, {
      toValue: {
        x: -windowWidth * 2,
        y: 0,
      },
      useNativeDriver: false,
    }).start(() => {
      animatedValue.setValue({x: 0, y: 0});
      setCurrentCardIndex(prevIndex => prevIndex - 1);
      listImage?.pop();
    });
  };

  const resetPosition = () => {
    Animated.timing(animatedValue, {
      toValue: {
        x: 0,
        y: 0,
      },
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        animatedValue.setValue({x: gesture.dx, y: gesture.dy});
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > windowWidth * 0.25) {
          swipeRight();
        } else if (gesture.dx < -windowWidth * 0.25) {
          swipeLeft();
        } else {
          resetPosition();
        }
        animatedValue.setValue({x: 0, y: 0});
      },
    }),
  ).current;

  const animatedValue = useRef(new Animated.ValueXY()).current;

  const [currentCardIndex, setCurrentCardIndex] = useState(4);

  let len = listImage.length - 1;

  return (
    <View style={styles.container1} {...panResponder.panHandlers}>
      <Animated.FlatList
        contentContainerStyle={styles.flatListContentStyle}
        // extraData={data}
        style={{height: scaleHeight(250 + len * 7)}}
        data={data}
        renderItem={({item, index}) => {
          let cardAnimation = {};
          let childCardAnimation = {};
          if (index === currentCardIndex) {
            cardAnimation = {
              transform: [
                {
                  translateX: animatedValue.x.interpolate({
                    inputRange: [-windowWidth, 0, windowWidth],
                    outputRange: [-windowWidth * 1.25, 0, windowWidth * 1.25],
                    extrapolate: 'clamp',
                  }),
                },
              ],
              opacity: animatedValue.x.interpolate({
                inputRange: [-windowWidth * 1.5, 0, windowWidth * 1.5],
                outputRange: [0, 1, 0],
                extrapolate: 'clamp',
              }),
            };
          }

          childCardAnimation = {
            transform: [
              {
                translateY: animatedValue.x.interpolate({
                  inputRange: [-windowWidth * 0.5, 0, windowWidth * 0.5],
                  outputRange: [-7, 0, -7],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateX: animatedValue.x.interpolate({
                  inputRange: [-windowWidth * 0.5, 0, windowWidth * 0.5],
                  outputRange: [-15, 0, -15],
                  extrapolate: 'clamp',
                }),
              },
            ],
            width: animatedValue.x.interpolate({
              inputRange: [-windowWidth * 0.5, 0, windowWidth * 0.5],
              outputRange: [
                scale(345 - (currentCardIndex - index - 1) * 30),
                scale(345 - (currentCardIndex - index) * 30),
                scale(345 - (currentCardIndex - index - 1) * 30),
              ],
              extrapolate: 'clamp',
            }),
            opacity: animatedValue.x.interpolate({
              inputRange: [-windowWidth * 1.5, 0, windowWidth * 1.5],
              outputRange: [
                1 - (currentCardIndex - index + 1) / 10,
                1 - (currentCardIndex - index) / 5,
                1 - (currentCardIndex - index + 1) / 10,
              ],
              extrapolate: 'clamp',
            }),
          };

          return (
            <Animated.View
              key={index}
              style={[
                styles.itemContainer,
                {
                  top: (len - index) * 7,
                  zIndex: -index,
                  left: (len - index) * 15,
                },
                cardAnimation,
              ]}>
              <Animated.Image
                source={{
                  uri: HttpImage(item),
                }}
                resizeMode="cover"
                style={[styles.image, childCardAnimation]}
              />
            </Animated.View>
          );
        }}
        keyExtractor={(item, index) => index + item}
        // horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginTop: scaleHeight(35),
  },
  image: {
    height: scaleHeight(250),
    width: scale(345),
    borderRadius: scaleHeight(10),
  },
  itemContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  container1: {
    width: '100%',
    alignItems: 'center',
    marginTop: scaleHeight(35),
  },
  card: {
    width: '90%',
    height: '90%',
    position: 'absolute',
    backgroundColor: 'red',
  },
  image1: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  text: {
    position: 'absolute',
    top: 50,
    fontSize: 32,
    fontWeight: 'bold',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  likeText: {
    left: 20,
    color: '#32CD32',
    borderColor: '#32CD32',
  },
  nopeText: {
    right: 20,
    color: 'red',
    borderColor: 'red',
  },
  flatListContentStyle: {
    width: scale(345),
    flexGrow: 1,
    borderWidth: 1,
    borderColor: 'transparent',
  },
});
export default CustomCarousel;
