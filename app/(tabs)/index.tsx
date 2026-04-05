import TodoItem from "@/components/TodoItem";
import { getTodos, insertTodo } from "@/repository/todoRepository";
import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { v4 as uuidv4 } from "uuid";

export default function HomeScreen() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const loadData = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAdd = async () => {
    if (!text) return;

    await insertTodo({
      id: uuidv4(),
      title: text,
      created_at: new Date().toISOString(),
    });

    setText("");
    loadData();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Offline First Todo</Text>

      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Tambah data..."
          style={styles.input}
        />
        <Button title="Tambah" onPress={handleAdd} />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => <TodoItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f6fa",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
  },
});
