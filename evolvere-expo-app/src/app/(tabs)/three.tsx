// app/(tabs)/_layout.tsx
import { StyleSheet, TextInput, FlatList, TouchableOpacity, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<any>([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const todosCollection = collection(db, 'todos');

  useEffect(() => {
    fetchTodos();
  }, [user]);

  // ------ Fetch entries from Firestore ------
  const fetchTodos = async () => {
    if(user){
      // only get enties belonging to current user
        const q = query(todosCollection, where("userId", "==", user.uid));
        const data = await getDocs(q);
        setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } else {
        console.log("No user logged in");
    }
  };

  {/* Add Journal Entry */}
  const addTodo = async () => {
    if (user){
        await addDoc(todosCollection, { task, createdAt: new Date(), userId: user.uid })
        // clear input after adding
        setTask('');

        // refresh list
        fetchTodos();
    } else {
        console.log("No user logged in");
    }
  };
  
  {/* Delete Journal Entry */}
  const deleteTodo = async (id: string) => {
    const todoDoc = doc(db, 'todos', id);
    await deleteDoc(todoDoc);

    // refresh list after deletion
    fetchTodos();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Gratitude Journal</Text>
        <View style={styles.inputContainer}>
          {/* Text Input */}
          <TextInput
            placeholder="Write something you're grateful for..."
            value={task}
            onChangeText={(text) => setTask(text)}
            multiline
            style={[styles.input, { height: 80 }]}
            
          />
          <TouchableOpacity style={styles.addButton} onPress={addTodo}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* List of journal entries */}
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <View style={styles.todoContainer}>
              <Text style={{ textDecorationLine:  'none', flex: 1 }}>{item.task}</Text>
              <Text style={{ fontSize: 12, opacity: 0.5 }}>
                {item.createdAt?.toDate?.().toLocaleDateString()}
              </Text>
              <TouchableOpacity style={styles.button} onPress={() => deleteTodo(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEF0FF'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#EEF0FF'
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 50, 
    color: '#333', 
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    flex: 1, 
    marginRight: 10, 
  },
  addButton: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5C6BC0', 
    shadowColor: '#616ba1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  button: {
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5C6BC0',
    shadowColor: '#5C6BC0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    marginLeft: 10,
  },
});