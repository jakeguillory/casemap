import { StyleSheet, FlatList, Pressable, Text } from 'react-native'
import { useCase } from '../../hooks/useCase'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedCard from "../../components/ThemedCard"
import ThemedButton from '../../components/ThemedButton'
import { useUser } from '../../hooks/useUser'


const Cases = () => {
  const { user } = useUser()
  const { cases, setSelectedCase } = useCase()
  const router = useRouter()




  return (
    <ThemedView style={styles.container} safe={true}>

      <Spacer />
      
      <ThemedText title={true} style={styles.heading}>
        { user.email } Case List
      </ThemedText>

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

      <Spacer />

      <ThemedButton onPress={() => router.push('/createCase')} style={{alignSelf: "center"}}>
        <Text style={{ color: '#f2f2f2' }}>Add a New Case</Text>
      </ThemedButton>

    </ThemedView>
  )
}

export default Cases

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