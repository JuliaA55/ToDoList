import React from "react";
import { FlatList } from "react-native";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: { id: number; todo: string; completed: boolean }[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TaskItem task={item} />}
    />
  );
};

export default TaskList;

