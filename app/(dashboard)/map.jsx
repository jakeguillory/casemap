import { StyleSheet } from 'react-native'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import { Colors } from '../../constants/Colors'
import Graph from '../../components/Graph'
import { useEffect, useState } from 'react'
import { useCase } from '../../hooks/useCase'
import ThemedSelect from '../../components/ThemedSelect'
import { makeCaseOptions } from '../../utility/utility'




const Map = () => {

  const [ caseOptions, setCaseOptions ] = useState([])
  const [graphCase, setGraphCase ] = useState(null)

  const { fetchCases, cases, fetchGraphData, nodes, links } = useCase()

  // Fetch initial cases on mount
  useEffect(() => {
    const loadCases = async () => {
      await fetchCases()
    }
    loadCases()
  }, [  ])

  // Update caseOptions and default graphCase when cases change
  useEffect(() => {
    if (cases?.length) {
      const options = makeCaseOptions(cases)
      setCaseOptions(options)
      setGraphCase(cases[0])
    }
  }, [ cases ])

  // Fetch graph data when graphCase changes
  useEffect(() => {

    console.log('graphCase: ', graphCase)
    if (graphCase?.$id) fetchGraphData(graphCase.$id)

  }, [ graphCase ])

  useEffect(() => {

    console.log("Updated Nodes: ", nodes)
    console.log("Updated links: ", links)

  }, [ nodes, links ])

  

  return (

    <ThemedView style={styles.container} safe={true}>

      <Spacer />

      <ThemedText title={true} style={styles.heading}>
        Map for Case: 
      </ThemedText>

      <Spacer height={20}/>

      <ThemedSelect 
        items={caseOptions}
        placeholder="Select Case"
        value={graphCase}
        onValueChange={setGraphCase}
      />

      <Spacer height={10}/>

      <Graph />

    </ThemedView>
  )

}



export default Map

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
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
})