import React, { useRef, useEffect } from "react";
import {
  Animated,
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import destination from "../constants/data";
import { FontAwesome, Octicons } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";
import { getPlaces } from "../store/actions/places";
import axios from "axios";
const { width, height } = Dimensions.get("window");

const ScrollCard = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const dotPosition = useRef(Animated.divide(scrollX, width)).current;
  const { places, isLoading } = useSelector((state) => state.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlaces());
  }, []);

  const renderDestinations = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Place", {
            place: item,
          });
        }}
        style={{ paddingBottom: 20, overflow: "visible" }}
        activeOpacity={0.9}
      >
        <ImageBackground
          source={{ uri: item.photo_main }}
          imageStyle={{ borderRadius: 12 }}
          style={[styles.flex, styles.destination, styles.shadow]}
        >
          <View style={[styles.row, { justifyContent: "space-between" }]}>
            <View style={{ flex: 0 }}>
              <Image
                source={{ uri: item.user.avatar }}
                style={[styles.avatar]}
              />
            </View>
            <View style={[styles.column, { flex: 2 }]}>
              <Text style={{ color: "white", opacity: 0.8, fontWeight: "400" }}>
                {item.user.name}
              </Text>
              <Text style={{ color: "white", opacity: 0.8, fontWeight: "400" }}>
                <Octicons name="location" size={10} color="white" />
                <Text> {item.location}</Text>
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "white",
                  opacity: 0.5,
                  fontWeight: "bold",
                  fontSize: 25,
                }}
              >
                {item.rating}
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={[styles.column, styles.destinationInfo, styles.shadow]}>
          <Text style={{ fontWeight: "500", fontSize: 20, paddingBottom: 7 }}>
            {item.title}
          </Text>
          <View
            style={[
              styles.row,
              { justifyContent: "space-between", alignItems: "flex-end" },
            ]}
          >
            <Text style={{ color: "#ccc", fontSize: 14 }}>
              {item.description.substring(0, 65) + "..."}
            </Text>
            <FontAwesome name="chevron-right" size={10} color="#ccc" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const dots = () => {
    return (
      <View
        style={[
          styles.row,
          styles.flex,
          {
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 20,
          },
        ]}
      >
        {destination.map((_, i) => {
          const borderWidth = dotPosition.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0, 2.5, 0],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={i}
              style={[
                styles.dots,
                styles.activeDot,
                { borderWidth: borderWidth },
              ]}
            />
          );
        })}
      </View>
    );
  };

  if (isLoading) {
    return <ActivityIndicator color="dodgerblue" size="large" />;
  }

  return (
    <View style={[styles.column, styles.destinations]}>
      <FlatList
        data={places}
        keyExtractor={(ele) => ele.id}
        renderItem={renderDestinations}
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        scrollEventThrottle={16}
        style={{ overflow: "visible", height: 280 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { listener: () => {} }
        )}
      />
      {dots()}
    </View>
  );
};

export default ScrollCard;

const styles = StyleSheet.create({
  flex: {
    flex: 0,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  header: {
    paddingHorizontal: 35,
    paddingVertical: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 10,
    marginVertical: 5,
  },
  destination: {
    width: width - 72,
    height: width * 0.8,
    marginHorizontal: 36,
    paddingHorizontal: 36,
    paddingVertical: 36 * 0.66,
    borderRadius: 12,
  },
  destinations: {
    flex: 1,
    paddingBottom: 30,
    justifyContent: "space-between",
  },
  destinationInfo: {
    position: "absolute",
    borderRadius: 12,
    paddingHorizontal: 36,
    paddingVertical: 36 / 2,
    bottom: 10,
    left: (width - 36 * 5) / (Platform.OS === "ios" ? 3.2 : 3),
    backgroundColor: "#FFF",
    width: width - 36 * 4,
  },
  shadow: {
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    shadowOpacity: 0.05,
    elevation: 5,
  },
  dots: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2.5,
    marginHorizontal: 6,
    backgroundColor: "#ccc",
    borderColor: "transparent",
  },
  activeDot: {
    width: 12.5,
    height: 12.5,
    borderRadius: 6.25,
    borderColor: "dodgerblue",
  },
});
