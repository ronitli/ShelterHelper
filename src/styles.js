import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    width: 16,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
   // justifyContent: 'space-between',
    width: '80%',
    marginBottom: 16,
  },
  profilePicture: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
