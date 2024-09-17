import { DI_TYPES } from "@/config/di/types";
import { Task } from "@/domain/entities/Task";
import { AddTask } from "@/usecases/task/AddTask";
import { GetTasks } from "@/usecases/task/GetTasks";
import { StatusBar } from "expo-status-bar";
import { useInjection } from "inversify-react";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RemoveTask } from "@/usecases/task/RemoveTask";
import { CompleteTask } from "@/usecases/task/CompleteTask";

export default function Index() {
  const addTaskUseCase = useInjection<AddTask>(DI_TYPES.AddTask);
  const getTasksUseCase = useInjection<GetTasks>(DI_TYPES.GetTasks);
  const removeTaskUseCase = useInjection<RemoveTask>(DI_TYPES.RemoveTask);
  const completeTaskUseCase = useInjection<CompleteTask>(DI_TYPES.CompleteTask);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    const tasks = await getTasksUseCase.execute();
    setTasks([...tasks]);
  };

  const handleAddTask = async () => {
    await addTaskUseCase.execute(title.trim());
    setTitle("");
    loadTasks();
  };

  const handleRemoveTask = async (id: string) => {
    await removeTaskUseCase.execute(id);
    loadTasks();
  };

  const handleCompleteTask = async (id: string) => {
    await completeTaskUseCase.execute(id);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="dark" />
      <View className="flex-1 p-4 bg-gray-100">
        <Text className="text-gray-900 text-2xl font-bold mb-4">ToDo</Text>
        <TextInput
          placeholder="New Task"
          value={title}
          onChangeText={setTitle}
          className="border border-gray-300 rounded-md p-2 mb-4"
        />
        <Pressable
          onPress={handleAddTask}
          className="bg-blue-500 p-2 rounded-md mb-4"
        >
          <Text className="text-white text-center">Add Task</Text>
        </Pressable>

        {tasks.length === 0 ? (
          <Text className="text-center">The List is empty</Text>
        ) : null}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="p-2 bg-white rounded-md mb-2 shadow flex-row justify-between">
              <View className="flex-row items-center gap-2">
                <Pressable onPress={() => handleCompleteTask(item.id)}>
                  {item.completed ? (
                    <MaterialIcons name="check-box" size={24} color="#22c55e" />
                  ) : (
                    <MaterialIcons
                      name="check-box-outline-blank"
                      size={24}
                      color="black"
                    />
                  )}
                </Pressable>
                <Text className="text-lg text-gray-800">{item.title}</Text>
              </View>
              <Pressable onPress={() => handleRemoveTask(item.id)}>
                <MaterialCommunityIcons
                  name="delete-circle-outline"
                  size={28}
                  color="#ef4444"
                />
              </Pressable>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
