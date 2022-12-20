import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import {COLORS} from '../../constants/colors';
import {FONT_SIZE} from '../../constants/fonts';
import {scaleHeight} from '../../utils/fontConfig';
import CustomCarousel from './Components/Carousel';

const listImage = [
  'https://i.pinimg.com/564x/a2/aa/a2/a2aaa21d4caa0da425d6d7f4400b800d.jpg',
  'https://wallpaperaccess.com/full/1143632.jpg',
  'https://img.freepik.com/premium-photo/nature-wallpaper-beautiful-nature-wallpaper-4k-nature-wallpapers-hd-nature-wallpaper-green-nature_722194-174.jpg?w=900',
  'https://p4.wallpaperbetter.com/wallpaper/976/840/844/nature-landscape-wallpaper-preview.jpg',
  'https://wallpaperaccess.com/full/31189.jpg',
];

const PlaceView = ({name = 'VYN'}) => {
  let count = 5;
  const [data, setData] = useState({data: listImage});
  let data1 = listImage;

  const UpdateData = () => {
    // count = count + 1;
    // setData({data: listImage.slice(0, -1)});
    console.log('=+=======================');
    let tmp = data1.pop();
    data1 = [...[tmp], ...data1];
    setData({data: data1});
  };
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.greeting}>Hi {name},</Text>
      <Text style={styles.question}>Where do you {'\n'}wanna go?</Text>
      <CustomCarousel
        listImage={listImage}
        data={data.data}
        UpdateData={UpdateData}
        // getMoreImage={getMoreImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingTop: scaleHeight(20),
    paddingHorizontal: scaleHeight(15),
  },
  greeting: {
    color: COLORS.gray_dark,
    fontSize: FONT_SIZE.MEDIUM,
  },
  question: {
    color: COLORS.black,
    fontSize: FONT_SIZE.XX_LARGE,
    fontWeight: '700',
  },
});

export default PlaceView;
