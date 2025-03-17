import React from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

type TaskFormProps = {
  onAddTask: (data: any) => void;
  onCancel: () => void;
};

export default function TaskForm({ onAddTask, onCancel }: TaskFormProps) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      id: 5,
      todo: "",
      completed: false,
      date: "",
      priority: ""
    },
  });

  const onSubmit = (data: any) => {
    onAddTask(data);
    reset();
  };

  return (
    <View style={styles.container}>
      <Text>Todo:</Text>
      <Controller
        control={control}
        name="todo"
        render={({ field: { value, onChange } }) => (
          <TextInput style={styles.input} value = {value} onChangeText={onChange} placeholder="Enter task title" />
        )}
      />

      <Text>Date:</Text>
      <Controller
        control={control}
        name="date"
        render={({ field:{value, onChange} }) => (
          <TextInput style={styles.input} value={value} onChangeText={onChange} placeholder="YYYY-MM-DD" />
        )}
      />

      <Text>Priority:</Text>
      <Controller
        control={control}
        name="priority"
        render={({ field }) => (
          <Picker selectedValue={field.value} onValueChange={field.onChange}>
            <Picker.Item label="Low" value="low" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="High" value="high" />
          </Picker>
        )}
      />

      <Button title="Add Task" onPress={handleSubmit(onSubmit)} />
      <Button title="Cancel" onPress={onCancel} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20, backgroundColor: "#fff", padding: 20, borderRadius: 10, width:200, },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
});
