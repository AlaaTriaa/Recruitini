import React, { createRef, useEffect } from "react";
import { Animated, Dimensions, View, Text, StyleSheet } from "react-native";

import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const IMAGE_WIDTH = SCREEN_WIDTH * 0.8;

export default function OfferCard({
  description = "",
  title = "",
  business = "",
  place = "",
  value = "",
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
}) {
  const swipeableRef = createRef();
  useEffect(() => {
    if (swipeableRef.current !== undefined) {
      swipeableRef.current.close();
    }
  }, [description, title, business, place, value]);

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-SCREEN_WIDTH, 0],
      outputRange: [1, 0],
    });
    const radius = dragX.interpolate({
      inputRange: [-SCREEN_WIDTH, 0],
      outputRange: [400, 40],
    });
    const rotate = dragX.interpolate({
      inputRange: [-SCREEN_WIDTH, 0],
      outputRange: [1, -0.1],
    });

    return (
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          margin: 0,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          justifySelf: "center",
        }}
      >
        <Animated.View
          style={{
            width: 400,
            height: 400,
            borderRadius: radius,
            alignItems: "center",
            backgroundColor: "#1b5e20",
            justifyContent: "center",
          }}
        >
          <Feather name="check" size={150} color="#FFF" />
        </Animated.View>
      </Animated.View>
    );
  };

  const renderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, SCREEN_WIDTH],
      outputRange: [0, 1],
    });
    const radius = dragX.interpolate({
      inputRange: [0, SCREEN_WIDTH],
      outputRange: [40, 400],
    });
    const rotate = dragX.interpolate({
      inputRange: [0, SCREEN_WIDTH],
      outputRange: [1, -0.1],
    });

    return (
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          margin: 0,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          justifySelf: "center",
        }}
      >
        <Animated.View
          style={{
            width: 400,
            height: 400,
            borderRadius: radius,
            alignItems: "center",
            backgroundColor: "#b71c1c",
            justifyContent: "center",
          }}
        >
          <Feather name="x" size={150} color="#FFF" />
        </Animated.View>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      friction={1}
      overshootFriction={10}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      onSwipeableRightOpen={onSwipeRight}
      onSwipeableLeftOpen={onSwipeLeft}
      containerStyle={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <View style={classes.wrapper}>
        <Text style={classes.description}>{description}</Text>
        <View style={classes.footerWrapper}>
          <Text style={classes.title}>{title}</Text>
          <View style={classes.detailsWrapper}>
            <View>
              <Text style={classes.business}>{business}</Text>
              <Text style={classes.place}>
                <Feather name="map-pin" size={14} /> {place}
              </Text>
            </View>
            {value ? (
              <View>
                <Text style={classes.value}>
                  <FontAwesome name="euro" size={20} color="#fff" /> {value}
                </Text>
              </View>
            ) : (
              <View>
                <Text style={classes.value}>Negotiable</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Swipeable>
  );
}

const classes = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
  },
  description: {
    width: "100%",
    height: "75%",
    padding: 24,
    fontSize: 14,
  },
  footerWrapper: {
    flex: 1,
    padding: 14,
    width: "100%",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    backgroundColor: "#333",
  },
  title: {
    paddingVertical: 8,
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  detailsWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  business: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  place: {
    color: "#FFF",
    alignSelf: "flex-start",
  },
  value: {
    color: "#FFF",
    fontSize: 22,
  },
});
