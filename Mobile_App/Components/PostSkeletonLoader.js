import React from "react";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { View, StyleSheet } from "react-native";

const Styling = () => {
  return (
    <>
      <View style={styles.avatarContainer}>
        <ShimmerPlaceholder style={styles.avatar} />
        <ShimmerPlaceholder style={styles.avatarLine} />
      </View>
      <View style={styles.postContainer}>
        <ShimmerPlaceholder style={styles.postLine} />
        <ShimmerPlaceholder style={styles.postLine} />
        <ShimmerPlaceholder style={styles.postLineLast} />
      </View>
      <View style={styles.iconContainer}>
        <ShimmerPlaceholder style={styles.icon} />
        <ShimmerPlaceholder style={styles.icon} />
      </View>
    </>
  );
};

const StylingVideo = () => {
  return (
    <>
      <View style={styles.avatarContainer}>
        <ShimmerPlaceholder style={styles.avatar} />
        <ShimmerPlaceholder style={styles.avatarLine} />
      </View>
      <View style={styles.postContainer}>
        <ShimmerPlaceholder style={styles.postLine} />
        <ShimmerPlaceholder style={styles.postImage} />
      </View>
      <View style={styles.iconContainer}>
        <ShimmerPlaceholder style={styles.icon} />
        <ShimmerPlaceholder style={styles.icon} />
      </View>
    </>
  );
};

const PostSkeletonLoader = () => {
  return (
    <View
      style={{
        padding: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 1
      }}
    >
      <Styling />
      <StylingVideo />
      <Styling />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: "row",
    display: "flex",
    width: "100%",
    padding: 20
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50
  },
  avatarLine: {
    width: "80%",
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 20,
    height: 12,
    marginTop: 20
  },
  postContainer: {
    flexDirection: "column",
    display: "flex",
    width: "100%",
    padding: 20,
    marginTop: -40
  },
  postLine: {
    width: "100%",
    marginLeft: 10,
    borderRadius: 20,
    height: 12,
    marginTop: 10
  },
  postLineLast: {
    width: "70%",
    marginLeft: 10,
    borderRadius: 20,
    height: 12,
    marginTop: 10
  },
  iconContainer: {
    flexDirection: "row",
    display: "flex",
    width: "100%",
    padding: 20,
    marginTop: -27
  },
  icon: {
    height: 30,
    width: 45,
    borderRadius: 20,
    marginLeft: 5
  },
  postImage: {
    height: 200,
    width: "100%",
    marginTop: 10,
    borderRadius: 5
  }
});

export default PostSkeletonLoader;
