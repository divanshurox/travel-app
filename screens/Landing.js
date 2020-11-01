import React, { Component } from "react";
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
import ScrollCard from "../components/ScrollCard";
import Recommended from "../components/Recommended";

const Landing = ({ navigation }) => {
  navigation.setOptions({
    header: () => (
      <View style={[styles.flex, styles.row, styles.header]}>
        <View>
          <Text style={{ color: "#ccc" }}>Search for place</Text>
          <Text style={{ fontSize: 20 }}>Destination</Text>
        </View>
        <View>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/32.jpg" }}
            style={styles.avatar}
          />
        </View>
      </View>
    ),
  });
  return (
    <ScrollView>
      <ScrollCard navigation={navigation} />
      <Recommended navigation={navigation} />
    </ScrollView>
  );
};

export default Landing;

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
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});
