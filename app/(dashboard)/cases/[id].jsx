import { StyleSheet, Text, FlatList, View, Pressable } from "react-native"
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
import ToggleList from "../../../components/ToggleList"


const CaseDetails = () => {

  const [ caseDetail, setCaseDetail ] = useState(null)

  const { id } = useLocalSearchParams()
  const { fetchCaseById, deleteCase, fetchGraphData, nodes, links, setSelectedCase } = useCase()
  const router = useRouter()



  const handleDelete = async () => {
    await deleteCase(id)
    setCaseDetail(null)
    router.replace('/cases')
    setSelectedCase(null)
  }

  useEffect(() => {
    async function loadCase() {
      const caseData = await fetchCaseById(id)
      setCaseDetail(caseData)
      setSelectedCase(caseData)
    }

    loadCase()
    fetchGraphData(id)

    return () => {
      setCaseDetail(null)
    }
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

      <View>
        <ThemedCard style={styles.card}>

          <ThemedText style={styles.title}>{caseDetail.title}</ThemedText>

          <Spacer height={20}/>

          <ThemedText title={true}>Case description:</ThemedText>

          <Spacer height={10} />

          <ThemedText>{caseDetail.description}</ThemedText>

        </ThemedCard>
      </View>

      <Spacer />

      <View>
        <ToggleList nodes={nodes} links={links} />
      </View>

      <Spacer height={10} />

      <View style={styles.buttonContainer}>
      
        <ThemedButton onPress={() => router.push('/createNode')} style={styles.containedButton}>
          <Text style={{ color: '#f2f2f2' }}>New Node</Text>
        </ThemedButton>

        <ThemedButton onPress={() => router.push('/createLink')} style={styles.containedButton}>
          <Text style={{ color: '#f2f2f2' }}>New Link</Text>
        </ThemedButton>

        <ThemedButton onPress={handleDelete} style={[styles.delete, styles.containedButton]}>
          <Text style={{ color: '#fff', textAlign: 'center' }}>Delete Case</Text>
        </ThemedButton>

      </View>

    </ThemedView>
  )
}

export default CaseDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 10,
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