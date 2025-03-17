import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from "react-native";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { Ionicons } from "@expo/vector-icons";
interface Task {
  id: number;
  todo: string;
  completed: boolean;
}
export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  
  useEffect(() => {
    axios
      .get("https://dummyjson.com/todos")
      .then((response) => {
        setTasks(response.data.todos);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const addTask = (newTask: any) => {
    fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({

        todo: newTask.todo,
        completed: false,
        userId: 5,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const taskWithDefaults = {
          ...newTask,
          id: data.id,
          status: "to-do",
        };
        setTasks([...tasks, taskWithDefaults]);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsFormVisible(false));
  };
  return (
    <ImageBackground  source={require('./assets/background.webp')} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>ODOT List</Text>
        <Text style={styles.date}>4th March 2018</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <TaskList tasks={tasks} />
        )}

        <TouchableOpacity style={styles.addButton}  onPress={() => setIsFormVisible(true)}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>

        <Modal visible={isFormVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <TaskForm onAddTask={addTask} onCancel={() => setIsFormVisible(false)} />
          </View>
        </Modal>
      </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    color: "#000",
  },
  date: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
    marginBottom: 10,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#4A90E2",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

