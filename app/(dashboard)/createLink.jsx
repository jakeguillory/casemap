import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useCase } from "../../hooks/useCase"
import { useRouter } from 'expo-router'
import { useState } from 'react'

// themed components
import ThemedView from "../../components/ThemedView"
import ThemedText from "../../components/ThemedText"
import ThemedTextInput from "../../components/ThemedTextInput"
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'


const CreateLink = () => {
  const [ sourceNodeId, setSourceNodeId ] = useState("")
  const [ targetNodeId, setTargetNodeId ] = useState("")
  const [ relationship, setRelationship ] = useState("")
  const [ notes, setNotes ] = useState("")

  const { createLink, loading, setLoading, selectedCase, setSelectedCase } = useCase()
  const router = useRouter()

  async function handleSubmit() {

    // Check the items that are labeled as "required" by database
    if (!sourceNodeId.trim() || !targetNodeId.trim()) return // Possibly display error message and redirect

    setLoading(true)
    
    // create the link
    await createLink({ sourceNodeId, targetNodeId, relationship, notes })

    // reset fields
    setSourceNodeId("")
    setTargetNodeId("")
    setRelationship("")
    setNotes("")

    // redirect
    router.replace(`/cases/${selectedCase.$id}`)

    // reset loading state
    setLoading(false) 
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
      <ThemedView style={styles.container}>

        <ThemedText title={true} style={styles.heading}>
          Add a New Link
        </ThemedText>

        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Source Node ID"
          value={sourceNodeId}
          onChangeText={setSourceNodeId}
        />

        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Target Node ID"
          value={targetNodeId}
          onChangeText={setTargetNodeId}
        />

        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Relationship"
          value={relationship}
          onChangeText={setRelationship}
        />

        <Spacer />

        <ThemedTextInput
          style={styles.multiline}
          placeholder="Notes"
          value={notes}
          onChangeText={setNotes}
          multiline={true}
        />

        <Spacer />

        <ThemedButton onPress={handleSubmit} disabled={loading}>
          <Text style={{ color: '#fff' }}>
            {loading ? "Saving..." : "Create Link"}
          </Text>
        </ThemedButton>

      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default CreateLink

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    padding: 20,
    borderRadius: 6,
    alignSelf: 'stretch',
    marginHorizontal: 40,
  },
  multiline: {
    padding: 20,
    borderRadius: 6,
    minHeight: 100,
    alignSelf: 'stretch',
    marginHorizontal: 40,
  },
})