// app/(tabs)/_layout.tsx
import { StyleSheet, TextInput, FlatList, TouchableOpacity, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<any>([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const tasksCollection = collection(db, 'tasks');

  useEffect(() => {
    fetchTasks();
  }, [user]);

  // ------ Fetch tasks from Firestore ------
  const fetchTasks = async () => {
    if(user){
      // only get tasks belonging to current user
        const q = query(tasksCollection, where("userId", "==", user.uid));
        const data = await getDocs(q);
        setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } else {
        console.log("No user logged in");
    }
  };
  const addTodo = async () => {
    if (user){
        await addDoc(tasksCollection, { task, completed: false, userId: user.uid })
        // clear input
        setTask('');
        // refresh list
        fetchTasks();
    } else {
        console.log("No user logged in");
    }
  };
  const updateTodo = async (id: string, completed: any) => {
    const todoDoc = doc(db, 'tasks', id);
    await updateDoc(todoDoc, { completed: !completed });
    fetchTasks();
  };

    // Delete a task
  const deleteTodo = async (id: string) => {
    const todoDoc = doc(db, 'tasks', id);
    await deleteDoc(todoDoc);
    // refresh list after deletion
    fetchTasks();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Daily Wellness Tasks</Text>

        {/* Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="New Task"
            value={task}
            onChangeText={(text) => setTask(text)}
            style={styles.input}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTodo}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Task list */}
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <View style={styles.todoContainer}>
              <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none', flex: 1 }}>{item.task}</Text>
              <TouchableOpacity style={styles.button} onPress={() => updateTodo(item.id, item.completed)}>
                <Text style={styles.buttonText}>{item.completed ? "Undo" : "Complete"}</Text>
              </TouchableOpacity>
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
    justifyContent: 'center',
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

