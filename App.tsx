import * as React from 'react';
import {
  View,
  Button,
  Image,
  Text,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Animated, {withTiming, SharedTransition} from 'react-native-reanimated';
import {FlashList} from '@shopify/flash-list';

import {useNavigation, useRoute} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const DATA = [
  {
    title: 'Hello',
  },
  {
    title: 'Hello2',
  },
  {
    title: 'Hello3',
  },
];

const Box = ({
  id = 'default-id',
  width = 100,
  height = 100,
  title = 'Default title',
  bg = 'red',
  rounded = false,
  align = 'center',
  margin = true,
}) => {
  return (
    <Animated.View
      sharedTransitionTag={id}
      style={{
        width: width,
        height: height,
        backgroundColor: bg,
        margin: margin ? 20 : 0,
        borderRadius: rounded ? 20 : 0,
        justifyContent: 'center',
        alignItems: align,
      }}>
      <Animated.Text sharedTransitionTag={`text-${id}`} style={{fontSize: 30}}>
        {id}
      </Animated.Text>
    </Animated.View>
  );
};

function Screen1() {
  const navigation = useNavigation();
  return (
    <FlashList
      data={DATA}
      ListHeaderComponent={() => (
        <Text style={{fontSize: 20}}>This is a FlashList</Text>
      )}
      renderItem={({item}) => (
        <Pressable
          onPress={() => navigation.navigate('Screen2', {id: item.title})}>
          <Box
            title={item.title}
            width={150}
            height={150}
            id={item.title}
            rounded
            align="center"
          />
        </Pressable>
      )}
      estimatedItemSize={200}
    />
  );
}

function Screen2() {
  const navigation = useNavigation();
  const route = useRoute();
  const {width} = useWindowDimensions();
  return (
    <View style={{flex: 1}}>
      <Box
        title="Hello"
        width={width}
        height={300}
        bg="red"
        id={route.params?.id}
        align="flex-start"
        margin={false}
      />
    </View>
  );
}

export default function SharedElementExample() {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="Screen1" component={Screen1} />
      <Stack.Screen
        name="Screen2"
        component={Screen2}
        options={{presentation: 'modal', headerShown: true}}
      />
    </Stack.Navigator>
  );
}
