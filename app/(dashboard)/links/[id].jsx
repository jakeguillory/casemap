import { StyleSheet, Text, FlatList, View } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { useCase } from "../../../hooks/useCase"
import { Colors } from "../../../constants/Colors"
import { getNodeLabelFromId } from "../../../utility/utility"

// themed components
import ThemedText from "../../../components/ThemedText"
import ThemedButton from "../../../components/ThemedButton"
import ThemedView from "../../../components/ThemedView"
import Spacer from "../../../components/Spacer"
import ThemedCard from "../../../components/ThemedCard"
import ThemedLoader from "../../../components/ThemedCard"


const LinkDetails = () => {

  const [ linkDetail, setLinkDetail ] = useState(null)

  const { id } = useLocalSearchParams()
  const { deleteLink, fetchLinkById, nodes, selectedCase } = useCase()
  const router = useRouter()



  const handleDelete = async () => {
    await deleteLink(id)
    setLinkDetail(null)
    router.replace(`/cases/${selectedCase.$id}`)
  }

  useEffect(() => {
    async function loadLink() {
      const linkData = await fetchLinkById(id)
      setLinkDetail(linkData)
    }

    loadLink()

    return () => {
      setLinkDetail(null)
    }
  }, [id])

  if (!linkDetail) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    )
  }
  
  

  return (
    <ThemedView safe={true} style={styles.container}>

      <ThemedCard style={styles.card}>

        <ThemedText style={styles.title}>{linkDetail.Label}</ThemedText>

        <Spacer height={20}/>

        <ThemedText title={true}>Relationship:   {linkDetail.relationship}</ThemedText>

        <Spacer height={10} />

        <ThemedText>
          {getNodeLabelFromId(linkDetail.sourceNodeId, nodes)} ➜ 
          {getNodeLabelFromId(linkDetail.targetNodeId, nodes)}
        </ThemedText>

      </ThemedCard>

      <Spacer />

      <Spacer height={10} />

      <View style={styles.buttonContainer}>
      
      {/* ---------------- Make this the Update Functionality
        <ThemedButton onPress={() => router.push('/createLink')} style={styles.containedButton}>
          <Text style={{ color: '#f2f2f2' }}>Add a New Link</Text>
        </ThemedButton>
      */}

        <ThemedButton onPress={handleDelete} style={[styles.delete, styles.containedButton]}>
          <Text style={{ color: '#fff', textAlign: 'center' }}>Delete Link</Text>
        </ThemedButton>

      </View>

    </ThemedView>
  )
}

export default LinkDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
    alignSelf: 'center',
  },
  containedButton: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignSelf: 'center'
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  card: {
    margin: 20
  },
  delete: {
    marginTop: 10,
    backgroundColor: Colors.warning,
    alignSelf: "center",
  },
})