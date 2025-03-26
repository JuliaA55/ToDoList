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
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { Ionicons } from "@expo/vector-icons";
import { getTasks, addTask } from "./taskService";
import {setupDatabase} from "./db"

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
    async function loadTasks() {
      await setupDatabase();
      const storedTasks = await getTasks();
      setTasks(storedTasks);
      setLoading(false);
    }
    loadTasks();
  }, []);

  const handleAddTask = async (newTask: { todo: string }) => {
    await addTask(newTask.todo);
    const updatedTasks = await getTasks();
    setTasks(updatedTasks);
    setIsFormVisible(false);
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
            <TaskForm onAddTask={handleAddTask} onCancel={() => setIsFormVisible(false)} />
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

