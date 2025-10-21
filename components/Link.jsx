import React from "react";
import { View } from "react-native";

const Link = ({ source, target }) => {
  if (!source || !target) return null;

  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  return (
    <View
      style={{
        position: "absolute",
        left: source.x,
        top: source.y,
        width: length,
        height: 2,
        backgroundColor: "#66bb6a",
        transform: [{ rotate: `${angle}deg` }],
      }}
    />
  );
};

export default Link