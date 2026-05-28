import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import { auth } from "../firebase/config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { router } from 'expo-router';

const index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      if (user) router.replace('/(tabs)');
    } catch (error: any) {
      console.log(error)
      alert('Sign in failed: ' + error.message);
    }
  }

  // Function to handle user sign-up
  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)

      // If account creation is successful, navigate to tabs screen
      if (user) router.replace('/(tabs)');
    } catch (error: any) {
      console.log(error)
      // Show error message
      alert('Sign in failed: ' + error.message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Sign in to your account to continue</Text>

      {/* Email and password input fields */}
      <TextInput style={styles.textInput} placeholder="email@example.com" value={email} onChangeText={setEmail} />
      <TextInput style={styles.textInput} placeholder="password" value={password} onChangeText={setPassword} secureTextEntry/>


      <TouchableOpacity style={styles.signInButton} onPress={signIn}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.text2}>Make Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default index

{/* Styling */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF0FF', 
  },
  title: {
    fontSize: 35, 
    fontWeight: '800', 
    marginBottom: 40, 
    color: '#1A237E', 
  },

  // input field styling
  textInput: {
    height: 50, 
    width: '90%', 
    backgroundColor: '#FFFFFF', 
    borderColor: '#E8EAF6', 
    borderWidth: 2,
    borderRadius: 15, 
    marginVertical: 15,
    paddingHorizontal: 25, 
    fontSize: 16, 
    color: '#3C4858', 
    shadowColor: '#9E9E9E', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, 
  },

  // Sign up button styling
  button: {
    width: '90%',
    marginVertical: 15,
    borderColor: '#DDE1F0',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15, 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5C6BC0', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },

// Sign in button styling
  signInButton: {
    width: '90%',
    marginVertical: 15,
    backgroundColor: '#5C6BC0', 
    padding: 20,
    borderRadius: 15, 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5C6BC0', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    color: '#FFFFFF', 
    fontSize: 18,
    fontWeight: '600', 
  },
  text2: {
    color: '#5C6BC0', 
    fontSize: 18, 
    fontWeight: '600', 
  },
  subtitle: {
    fontSize: 20,
    color: '#888',
    marginBottom: 36,
    textAlign: 'center',
  },
});