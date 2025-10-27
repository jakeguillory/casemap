import { StyleSheet, Text, FlatList, View, Pressable } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { useCase } from "../../../hooks/useCase"
import { Colors } from "../../../constants/Colors"
import { toTitleCase, getNodeLabelFromId, filterRelevantLinks } from "../../../utility/utility"

// themed components
import ThemedText from "../../../components/ThemedText"
import ThemedButton from "../../../components/ThemedButton"
import ThemedView from "../../../components/ThemedView"
import Spacer from "../../../components/Spacer"
import ThemedCard from "../../../components/ThemedCard"
import ThemedLoader from "../../../components/ThemedCard"


const NodeDetails = () => {

  const [ nodeDetail, setNodeDetail ] = useState(null)
  const [ relevantLinks, setRelevantLinks ] = useState(null)

  const { id } = useLocalSearchParams()
  const { links, fetchNodeById, deleteNode, selectedCase, nodes, deleteLink } = useCase()
  const router = useRouter()

  const deleteLinksArr = links => links.forEach(link => deleteLink(link.$id))

  const handleDelete = async () => {
    await deleteLinksArr(relevantLinks)
    await deleteNode(id)
    setNodeDetail(null)
    router.replace(`/cases/${selectedCase.$id}`)
  }

  useEffect(() => {
    async function loadNode() {
      const nodeData = await fetchNodeById(id)
      setNodeDetail(nodeData)
    }

    loadNode()
    setRelevantLinks(filterRelevantLinks(id, links))

    return () => {
      setNodeDetail(null)
      setRelevantLinks(null)
    }
  }, [id])

  if (!nodeDetail) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    )
  }

  return (
    <ThemedView safe={true} style={styles.container}>

      <ThemedCard style={styles.card}>

        <ThemedText style={styles.title}>{nodeDetail.label}</ThemedText>

        <Spacer height={20}/>

        <ThemedText title={true}>Type:     {toTitleCase(nodeDetail.type)}</ThemedText>

        <Spacer height={10} />

        <ThemedText>{nodeDetail.notes}</ThemedText>

      </ThemedCard>

      <Spacer />

      <FlatList
        data={relevantLinks}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={{ paddingBottom: 70 }}
        style={{ flexGrow: 0 }}
        renderItem={({ item }) => {
          return (
              <Pressable onPress={() => {
                router.push(`/links/${item.$id}`)}}>
                  <ThemedCard style={styles.card}>

                          <ThemedText style={styles.title}>
                            {getNodeLabelFromId(item.sourceNodeId, nodes)} ➜ 
                            {getNodeLabelFromId(item.targetNodeId, nodes)}
                          </ThemedText>
                        
                  </ThemedCard>
              </Pressable>
            )
          }
        }
      />      

      <Spacer height={10} />

      <View style={styles.buttonContainer}>
      
        <ThemedButton onPress={() => router.push('/createLink')} style={styles.containedButton}>
          <Text style={{ color: '#f2f2f2' }}>Add a New Link</Text>
        </ThemedButton>

        <ThemedButton onPress={handleDelete} style={[styles.delete, styles.containedButton]}>
          <Text style={{ color: '#fff', textAlign: 'center' }}>Delete Node</Text>
        </ThemedButton>

      </View>

    </ThemedView>

  )
}

export default NodeDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    backgroundColor: "transparent",
  },
  containedButton: {
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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
  delete: {
    marginTop: 10,
    backgroundColor: Colors.warning,
    alignSelf: "center",
  },
})