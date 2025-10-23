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

const CreateCase = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const { createCase, loading, setLoading } = useCase()
  const router = useRouter()

  async function handleSubmit() {
    if (!title.trim() || !description.trim()) return

    setLoading(true)
    
    // create the book
    await createCase({ title, description })

    // reset fields
    setTitle("")
    setDescription("")

    // redirect
    router.replace("/cases")

    // reset loading state
    setLoading(false) 
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
      <ThemedView style={styles.container}>

        <ThemedText title={true} style={styles.heading}>
          Add a New Case
        </ThemedText>

        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Case Title"
          value={title}
          onChangeText={setTitle}
        />
        <Spacer />


        <ThemedTextInput
          style={styles.multiline}
          placeholder="Case Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />
        <Spacer />

        <ThemedButton onPress={handleSubmit} disabled={loading}>
          <Text style={{ color: '#fff' }}>
            {loading ? "Saving..." : "Create Case"}
          </Text>
        </ThemedButton>

      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default CreateCase

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