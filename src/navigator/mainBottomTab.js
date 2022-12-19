import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SCREEN_NAME} from '../constants/screenName';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../constants/colors';
import {ICONS} from '../constants/icons';
import {windowWidth} from '../constants/sizeScreen';
import AccountContainer from '../screens/account/account.container';
import CategoriesContainer from '../screens/categories/categories.container';
import FilterContainer from '../screens/filter/filter.container';
import HomeContainer from '../screens/home/home.container';
import ProductGalleryContainer from '../screens/productGallery/productGallery.container';
import ProductDetailContainer from '../screens/product_detail/productDetail.container';
import {scaleHeight} from '../utils/fontConfig';

const TabButton = props => {
  const {icon, onPress, accessibilityState} = props;
  const insets = useSafeAreaInsets();
  const focused = accessibilityState.selected;
  const iconAnimation = useSharedValue(1);
  const iconAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: iconAnimation.value}],
    };
  });

  useEffect(() => {
    if (focused) {
      iconAnimation.value = withTiming(1.25);
    } else {
      iconAnimation.value = withTiming(1);
    }
  }, [focused, iconAnimation]);

  return (
    <View style={styles.containerTabButton(insets.bottom)}>
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <View style={styles.viewTabButton}>
          <Animated.Image
            source={icon}
            style={[
              {
                height: scaleHeight(24),
                aspectRatio: 1,
                tintColor: focused ? COLORS.primary : COLORS.gray_dark,
              },
              iconAnimationStyle,
            ]}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const StackHome = createNativeStackNavigator();
const StackHomeNavigation = () => {
  return (
    <StackHome.Navigator
      screenOptions={{headerShown: false, animationEnabled: false}}>
      <StackHome.Screen
        name={SCREEN_NAME.STACK_HOME_SCREEN}
        component={HomeContainer}
        options={{
          headerShown: false,
        }}
      />

      <StackHome.Screen
        name={SCREEN_NAME.GALLERY_SCREEN}
        component={ProductGalleryContainer}
        options={{
          headerShown: false,
        }}
      />
      <StackHome.Screen
        name={SCREEN_NAME.PRODUCT_DETAIL_SCREEN}
        component={ProductDetailContainer}
        options={{
          headerShown: false,
        }}
      />
      <StackHome.Screen
        name={SCREEN_NAME.FILTER_SCREEN}
        component={FilterContainer}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </StackHome.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();
const MainBottomTab = () => {
  const insets = useSafeAreaInsets();
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        keyboardHidesTabBar: true,
        showLabel: false,
        tabBarStyle: styles.tabBarStyle(insets.bottom),
      }}>
      <BottomTab.Screen
        name={SCREEN_NAME.HOME_SCREEN}
        component={StackHomeNavigation}
        options={{
          tabBarShowLabel: false,
          tabBarButton: props => <TabButton icon={ICONS.HOME} {...props} />,
        }}
      />
      <BottomTab.Screen
        name={SCREEN_NAME.CATEGORIES_SCREEN}
        component={CategoriesContainer}
        options={{
          tabBarShowLabel: false,
          tabBarButton: props => <TabButton icon={ICONS.CATEGORY} {...props} />,
        }}
      />
      <BottomTab.Screen
        name={SCREEN_NAME.ACCOUNT_SCREEN}
        component={AccountContainer}
        options={{
          tabBarShowLabel: false,
          tabBarButton: props => <TabButton icon={ICONS.ACCOUNT} {...props} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  containerTabButton: insetsBottom => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? scaleHeight(15) : 0,
  }),
  viewTabButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.15,
    borderColor: 'transparent',
  },
  tabBarStyle: insetsBottom => ({
    paddingBottom: insetsBottom,
    shadowColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  }),
});

export default MainBottomTab;
