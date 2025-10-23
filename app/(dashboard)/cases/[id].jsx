import { StyleSheet, Text } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { useCase } from "../../../hooks/useCase"
import { Colors } from "../../../constants/Colors"

// themed components
import ThemedText from "../../../components/ThemedText"
import ThemedButton from "../../../components/ThemedButton"
import ThemedView from "../../../components/ThemedView"
import Spacer from "../../../components/Spacer"
import ThemedCard from "../../../components/ThemedCard"
import ThemedLoader from "../../../components/ThemedCard"


const CaseDetails = () => {

  const [ caseDetail, setCaseDetail ] = useState(null)

  const { id } = useLocalSearchParams()
  const { fetchCaseById, deleteCase } = useCase()
  const router = useRouter()

  const handleDelete = async () => {
    await deleteCase(id)
    setCaseDetail(null)
    router.replace('/cases')
  }

  useEffect(() => {
    async function loadCase() {
      const caseData = await fetchCaseById(id)
      setCaseDetail(caseData)
    }

    loadCase()

    return () => setCaseDetail(null)
  }, [id])

  if (!caseDetail) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    )
  }

  return (
    <ThemedView safe={true} style={styles.container}>

      <ThemedCard style={styles.card}>

        <ThemedText style={styles.title}>{caseDetail.title}</ThemedText>

        <Spacer />

        <ThemedText title={true}>Case description:</ThemedText>

        <Spacer height={10} />

        <ThemedText>{caseDetail.description}</ThemedText>

      </ThemedCard>

      <Spacer />

      
      <FlatList
        data={cases}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable onPress={() => {
                setSelectedCase(item)
                router.push(`/cases/${item.$id}`)
              }}>
            <ThemedCard style={styles.card}>
              <ThemedText style={styles.title}>{item.title}</ThemedText>
            </ThemedCard>
          </Pressable>
        )}
      />

      <Spacer height={10} />
      
      <ThemedButton onPress={() => router.push('/createNode')} style={{alignSelf: "center"}}>
        <Text style={{ color: '#f2f2f2' }}>Add a New Node</Text>
      </ThemedButton>

      <Spacer height={20} />

      <ThemedButton onPress={() => router.push('/createLink')} style={{alignSelf: "center"}}>
        <Text style={{ color: '#f2f2f2' }}>Add a New Link</Text>
      </ThemedButton>


      <ThemedButton onPress={handleDelete} style={styles.delete}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Delete Case</Text>
      </ThemedButton>

    </ThemedView>
  )
}

export default CaseDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  card: {
    margin: 20
  },
  delete: {
    marginTop: 40,
    backgroundColor: Colors.warning,
    width: 200,
    alignSelf: "center",
  },
})