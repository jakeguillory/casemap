import { StyleSheet, Text, View } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { useCase } from "../../../hooks/useCase"
import { Colors } from "../../../constants/Colors"


// Themed components
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
    setSelectedCase(null)
    router.replace('/cases')
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
      {/* Header section (non-scrollable) */}
      <View style={styles.headerSection}>
        <ThemedCard style={styles.card}>
          <ThemedText style={styles.title}>{caseDetail.title}</ThemedText>
          <Spacer height={20} />
          <ThemedText title={true}>Case description:</ThemedText>
          <Spacer height={10} />
          <ThemedText>{caseDetail.description}</ThemedText>
        </ThemedCard>

        <Spacer height={10} />
        <ToggleList nodes={nodes} links={links} />
      </View>

      {/* Fixed footer */}
      <View style={styles.footer}>
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
  },
  headerSection: {
    flex: 1,
  },
  footer: {
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
  delete: {
    backgroundColor: Colors.warning,
  },
  card: {
    margin: 20,
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
})