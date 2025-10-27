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
import ThemedSelect from '../../components/ThemedSelect'


const CreateNode = () => {
  const [ label, setLabel ] = useState("")
  const [ type, setType ] = useState(null)
  const [ notes, setNotes ] = useState("")

  const { createNode, loading, setLoading, selectedCase } = useCase()
  const router = useRouter()

  const typeOptions = [
    { label: 'Person', value: 'person' },
    { label: 'Organization', value: 'organization' },
    { label: 'Event', value: 'event' },
    { label: 'Asset', value: 'asset' },
  ]

  async function handleSubmit() {

    // Check the items that are labeled as "required" by database
    if (!label.trim() || !type.trim()) return // Possibly display error message and redirect

    setLoading(true)
    
    // create the link
    await createNode({ label, type, notes })

    // reset fields
    setLabel("")
    setType(null)
    setNotes("")

    // redirect
    router.replace(`/cases/${selectedCase.$id}`)

    // reset loading state
    setLoading(false) 
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
      <ThemedView style={styles.container} safe={true}>

        <ThemedText title={true} style={styles.heading}>
          Add a New Node
        </ThemedText>

        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Label"
          value={label}
          onChangeText={setLabel}
        />

        <Spacer />

        <ThemedSelect 
          items={typeOptions}
          placeholder="Type"
          value={type}
          onValueChange={setType}
          
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
            {loading ? "Saving..." : "Create Node"}
          </Text>
        </ThemedButton>

      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default CreateNode

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