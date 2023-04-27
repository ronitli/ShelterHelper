import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCEFEF',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#A0522D',
    marginBottom: 50,
   // fontFamily: 'Nunito-Bold',
  },
  input: {
    width: '80%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
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
    color: '#6F4E37',
  },
  loginButton: {
    backgroundColor: '#E59C8A',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#B08975',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
