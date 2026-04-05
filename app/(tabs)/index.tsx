import TodoItem from "@/components/TodoItem";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { getTodos, insertTodo } from "@/repository/todoRepository";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { subscribe } from "@/utils/eventBus";
import * as Crypto from "expo-crypto";

export const generateUUID = async () => {
  return await Crypto.randomUUID();
};

export default function HomeScreen() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const isOnline = useNetworkStatus();

  const loadData = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAdd = async () => {
    if (!text) return;

    const id = await generateUUID();
    await insertTodo({
      id,
      title: text,
      created_at: new Date().toISOString(),
    });

    setText("");
    loadData();
  };

  useEffect(() => {
    loadData();

    subscribe(() => {
      console.log("🔄 Refresh UI dari sync");
      loadData();
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>Offline First Todo</Text>
        {!isOnline && (
          <View
            style={{ backgroundColor: "red", padding: 8, marginBottom: 16 }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              OFFLINE MODE
            </Text>
          </View>
        )}
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
    </SafeAreaView>
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
