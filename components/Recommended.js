import React, { useRef } from "react";
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
import destination from "../constants/data";
import { FontAwesome, Octicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Recommended = ({ navigation }) => {
  const renderStars = (rating) => {
    const stars = new Array(5).fill(0);
    return stars.map((_, i) => {
      const activeStars = Math.floor(rating) >= i + 1;
      return (
        <FontAwesome
          key={i}
          name="star"
          size={10}
          color={activeStars ? "dodgerblue" : "#ccc"}
        />
      );
    });
  };

  const renderRecom = ({ item }) => {
    return (
      <View style={[styles.flex, styles.column, styles.recommendation]}>
        <View style={[styles.flex, styles.recomHeader, styles.shadow]}>
          <Image source={{ uri: item.preview }} style={styles.recomImg} />
          <View style={[styles.flex, styles.row, styles.recommendationOptions]}>
            <Text style={{ color: "white", opacity: 0.8 }}>
              {item.temperature}℃
            </Text>
            <FontAwesome
              name={item.saved ? "bookmark" : "bookmark-o"}
              color="#FFF"
              size={15}
            />
          </View>
        </View>
        <View
          style={[
            styles.flex,
            styles.column,
            styles.shadow,
            {
              justifyContent: "space-evenly",
              padding: 18,
              backgroundColor: "#FFF",
            },
          ]}
        >
          <Text>{item.title}</Text>
          <Text>{item.location}</Text>
          <View
            style={[
              styles.row,
              {
                justifyContent: "space-between",
                marginTop: 10,
                alignItems: "center",
              },
            ]}
          >
            <View style={[styles.row]}>{renderStars(item.rating)}</View>
            <Text style={{ color: "dodgerblue" }}>{item.rating}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View
        style={[
          styles.row,
          { justifyContent: "space-between", paddingHorizontal: 36 },
        ]}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Recommended</Text>
        <Text style={{ color: "#ccc" }}>More</Text>
      </View>
      <FlatList
        horizontal
        scrollEventThrottle={16}
        style={[styles.shadow, { overflow: "visible" }]}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled
        renderItem={renderRecom}
        data={destination}
        keyExtractor={(ele) => ele.id}
      />
    </View>
  );
};

export default Recommended;

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
  shadow: {
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 10,
    shadowOpacity: 0.05,
    elevation: 8,
  },
  recommendation: {
    width: (width - 72) / 2,
    backgroundColor: "#FFF",
    marginHorizontal: 8,
    overflow: "hidden",
    borderRadius: 12,
    marginVertical: 18,
  },
  recomImg: {
    width: 170,
    height: 230,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  recomHeader: {
    overflow: "hidden",
  },
  recommendationOptions: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});
