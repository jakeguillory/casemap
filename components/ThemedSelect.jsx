import { View, StyleSheet, useColorScheme } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Colors } from '../constants/Colors'

export default function ThemedSelect({ items, value, onValueChange, placeholder }) {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.uiBackground},
      ]}
    >
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        dropdownIconColor={theme.text}
        style={[styles.picker, { color: theme.text }]}
      >
        {placeholder && (
          <Picker.Item
            label={placeholder.label}
            value={placeholder.value}
            color={theme.text + '88'} // lighter color
          />
        )}
        {items.map((item) => (
          <Picker.Item
            key={item.value}
            label={item.label}
            value={item.value}
            color={theme.text}
          />
        ))}
      </Picker>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    alignSelf: 'stretch',
    marginHorizontal: 40,
    overflow: 'hidden',


  },
  picker: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
})
