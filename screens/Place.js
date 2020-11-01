import React, { useState, useRef } from "react";
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
} from "react-native";
import mocks from "../constants/data";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { render } from "react-dom";

const { width } = Dimensions.get("window");

const Place = ({ navigation, route }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const dotPosition = useRef(Animated.divide(scrollX, width)).current;
  const article = route.params.place;
  const renderDots = () => {
    return (
      <View
        style={[
          styles.flex,
          styles.row,
          {
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 20,
            position: "absolute",
            bottom: 36,
            right: 0,
            left: 0,
          },
        ]}
      >
        {article.images.map((_, i) => {
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

  const renderStars = (rating) => {
    const stars = new Array(5).fill(0);
    return stars.map((_, i) => {
      const activeStars = Math.floor(rating) >= i + 1;
      return (
        <FontAwesome
          name="star"
          size={10}
          color={activeStars ? "dodgerblue" : "#ccc"}
        />
      );
    });
  };

  navigation.setOptions({
    header: () => (
      <View style={[styles.flex, styles.row, styles.header]}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <FontAwesome name="chevron-left" color="#FFF" size={10} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <MaterialIcons name="more-horiz" color="#FFF" size={20} />
        </TouchableOpacity>
      </View>
    ),
    headerTransparent: true,
  });
  return (
    <View>
      <View>
        <ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEnabled
          snapToAlignment="center"
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } },
          ])}
        >
          {article.images.map((ele, i) => {
            return (
              <Image
                source={{ uri: ele }}
                key={i}
                resizeMode="cover"
                style={{ width, height: width }}
              />
            );
          })}
        </ScrollView>
        {renderDots()}
      </View>
      <View style={[styles.flex, styles.content]}>
        <View style={[styles.flex, styles.contentHeader]}>
          <Image
            source={{ uri: article.user.avatar }}
            style={[styles.avatar, styles.shadow]}
          />
          <Text style={{ fontWeight: "bold", fontSize: 30 }}>
            {article.title}
          </Text>
          <View style={[styles.row]}>
            {renderStars(article.rating)}
            <Text style={{ color: "dodgerblue" }}>{article.rating}</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: "#ccc", lineHeight: 25 }}>
              {article.description}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Place;

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
    paddingHorizontal: 36,
    paddingTop: 50,
    paddingBottom: 30,
    justifyContent: "space-between",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
  },
  avatar: {
    position: "absolute",
    top: -36,
    right: 36,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  shadow: {
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    shadowOpacity: 0.05,
  },
  back: {
    justifyContent: "center",
    alignItems: "flex-start",
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
  contentHeader: {
    padding: 36,
    backgroundColor: "#FFF",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    marginTop: -18,
  },
});
