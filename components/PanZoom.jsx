import { View, StyleSheet, PanResponder } from 'react-native'
import React, { useState, useRef } from 'react'


const PanZoom = ({ children }) => {
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const lastDist = useRef(null);
  const lastTranslate = useRef({ x: 0, y: 0 });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gestureState) => {
        // Detect multi-touch (pinch zoom)
        if (gestureState.numberActiveTouches === 2 && gestureState.touchHistory) {
          const touches = gestureState.touchHistory.touchBank.filter(
            (t) => t.touchActive
          );
          if (touches.length === 2) {
            const [a, b] = touches;
            const dx = a.currentPageX - b.currentPageX;
            const dy = a.currentPageY - b.currentPageY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (lastDist.current) {
              const zoomFactor = dist / lastDist.current;
              setScale((prev) => Math.min(Math.max(prev * zoomFactor, 0.5), 3));
            }
            lastDist.current = dist;
          }
        } else if (gestureState.numberActiveTouches === 1) {
          setTranslate({
            x: lastTranslate.current.x + gestureState.dx,
            y: lastTranslate.current.y + gestureState.dy,
          });
        }
      },

      onPanResponderRelease: () => {
        lastTranslate.current = translate;
        lastDist.current = null;
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View
        style={{
          transform: [
            { translateX: translate.x },
            { translateY: translate.y },
            { scale },
          ],
        }}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1b1b",
  },
});

export default PanZoom