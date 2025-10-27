import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, useColorScheme, Pressable } from "react-native";
import { Colors } from '../constants/Colors'
import ThemedCard from "./ThemedCard";
import ThemedText from "./ThemedText";
import { useRouter } from "expo-router";

export default function ToggleList({ nodes, links }) {
  const [showNodes, setShowNodes] = useState(true);

  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  const router = useRouter()

  const data = showNodes ? nodes : links;

  return (
    <>
      {/* Toggle Switch */}
      <View style={[styles.toggleContainer, { backgroundColor: theme.uiBackground}]}>
        <TouchableOpacity
          style={[styles.toggleButton, showNodes && styles.activeButton]}
          onPress={() => setShowNodes(true)}
        >
          <Text style={[styles.toggleText, showNodes && styles.activeText]}>
            Nodes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, !showNodes && styles.activeButton]}
          onPress={() => setShowNodes(false)}
        >
          <Text style={[styles.toggleText, !showNodes && styles.activeText]}>
            Links
          </Text>
        </TouchableOpacity>
      </View>

      {/* FlatList */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={{ paddingBottom: 70 }}
        style={{ flexGrow: 0 }}
        renderItem={({ item }) => (
            <Pressable onPress={() => 
              { router.push(`/${showNodes ? 'nodes' : 'links'}/${item.$id}`)}}>
                <ThemedCard style={styles.card}>
                    { showNodes ? (
                        <ThemedText style={styles.title}>{item.label}</ThemedText>
                      ) : (
                        <ThemedText style={styles.title}>
                          {item.sourceNodeId} ➜ {item.targetNodeId}
                        </ThemedText>
                      ) 
                    }
                </ThemedCard>
            </Pressable>
          )
        }
      />
    </>
  );
}

const styles = StyleSheet.create({

  toggleContainer: {
    flexDirection: "row",
    borderRadius: 20,
    marginBottom: 20,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 16,
  },
  activeButton: {
    backgroundColor: Colors.primary,
  },
  toggleText: {
    color: "#888",
    fontWeight: "600",
  },
  activeText: {
    color: "#fff",
  },
  item: {
    color: "#fff",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  list: {
    marginTop: 40
  },
  card: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 10,
    paddingLeft: 14,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 4
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

});
