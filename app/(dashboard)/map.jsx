import { StyleSheet, useColorScheme } from 'react-native'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import { Colors } from '../../constants/Colors'




const Map = () => {

    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light

  return (

    <ThemedView style={styles.container} safe={true}>

      <Spacer />

      <ThemedText title={true} style={styles.heading}>
        Map for Case
      </ThemedText>

      <Spacer />

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