import {StyleSheet, Platform} from 'react-native';
import {colors} from './Colors';

export const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 10,
    // For using Platform module: 25 is to  clear the stuts bar
    paddingTop: Platform.OS == 'android' ? 25 : 0,
  },
  title: {
      fontSize: 20,
      textAlign: "center"
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 15,
  },
  buttonView: {
    paddingHorizontal: 10,
  },
  button: {
    padding: 15,
    backgroundColor: colors.primary,
    marginVertical: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonDisabled: {
    padding: 10,
    backgroundColor: colors.primaryDisabled,
    marginVertical: 10,
  },
  listView: {
      flex: 1,
  },
}) 