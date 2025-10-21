import { StyleSheet, Text, View, PanResponder } from 'react-native'
import React, { useRef } from 'react'
import { useGraph } from '../hooks/useGraph'


const Node = ( { node }) => {

    const { updateNodePosition } = useGraph()
    const pos = useRef({ x: node.x, y: node.y})

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gesture) => {
                const newX = pos.current.x + gesture.dx
                const newY = pos.current.y + gesture.dy
                updateNodePosition(node.id, newX, newY)
            },
            onPanResponderRelease: (_, gesture) => {
                pos.current.x += gesture.dx
                pos.current.y += gesture.dy
            },
        })
    ).current 


    return (
        <View
            { ...panResponder.panHandlers}
            style={[ styles.node,
                     { left: node.x, top: node.y},
                ]}
        >
            <Text style={styles.label}>{node.label}</Text>
        </View>
    )
}

export default Node

const styles = StyleSheet.create({
  node: {
    position: "absolute",
    backgroundColor: "#00897b",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#004d40",
    elevation: 4,
  },
  label: {
    color: "white",
    fontWeight: "bold",
  },
});