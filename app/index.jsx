import { StyleSheet } from 'react-native'
import { Link } from 'expo-router'

import ThemedView from "../components/ThemedView"
import ThemedText from "../components/ThemedText"
import ThemedLogo from "../components/ThemedLogo"
import Spacer from "../components/Spacer"

const Home = () => {

  return (

    <ThemedView style={styles.container}>

      <ThemedLogo  style={styles.img}/>

      <Spacer height={5}/>

      <ThemedText style={styles.title} title={true}>
        The Effortlessly Simple
      </ThemedText>

      <ThemedText style={{ marginTop: 10, marginBottom: 30 }}>
        Evidence Board App
      </ThemedText>

      <Link href="/login" style={styles.link}>
        <ThemedText>Login</ThemedText>
      </Link>

      <Link href="/register" style={styles.link}>
        <ThemedText>Register</ThemedText>
      </Link>

      <Link href="/profile" style={styles.link}>
        <ThemedText>Profile</ThemedText>
      </Link>

    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
    marginVertical: 1,

  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1
  },
})