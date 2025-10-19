import { StyleSheet, Text, View } from 'react-native'


const Home = () => {
  return (
    <View style={styles.container}>
      <Text>This is my newly made Home Page</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
    }

})