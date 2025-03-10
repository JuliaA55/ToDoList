import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TaskItemProps {
  task: { id: number; todo: string; completed: boolean };
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <View style={styles.item}>
      <Ionicons
        name={task.completed ? "checkmark-circle" : "ellipse-outline"}
        size={20}
        color={task.completed ? "green" : "gray"}
        style={styles.icon}
      />
      <Text style={[styles.text, task.completed && styles.completed]}>
        {task.todo}
      </Text>
      <Text style={styles.time}>12 pm</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    flex: 1,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  time: {
    fontSize: 14,
    color: "gray",
  },
});

export default TaskItem;
