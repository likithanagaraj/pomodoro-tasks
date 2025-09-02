import { TaskItem } from "@/components/task/task-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTask } from "@/hooks/useTask";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
const Tasks = () => {
  const { tasks, addTask, deleteTask, updateTask, toggleTask } = useTask();
  const [task, setTask] = useState("");
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <SafeAreaView className="flex-1 px-6 py-8 bg-[#F8F8F8]">
      <Pressable className="flex-1 " onPress={() => setSelectedTodoId(null)}>
        <View className="mt-8 mb-8 flex-row justify-between items-center">
          <Text className="text-2xl font-InterBold leading-tight ">Tasks</Text>
          {/* <Avatar className="" alt="Appykit UI">
          <AvatarImage src="https://github.com/likithanagaraj.png" />
          <AvatarFallback>
            <Text>AP</Text>
          </AvatarFallback>
        </Avatar> */}
        </View>
        {/* Input */}
        <View className="flex flex-row justify-center items-center gap-2 w-full">
          <Input
            placeholderClassName="font-InterRegular"
            className="w-[88%] border-0 bg-[#EDEEF2] text-[#191B19]"
            placeholder="Add new task"
            value={task}
            onChangeText={setTask}
          />
          <Button size={"icon"} variant={"secondary"} onPress={() => {
            if (task.trim()) {
              addTask(task.trim());
              setTask("");
            }
          }}
            className="h-full w-12"
          >
            <AntDesign
              name="plus"
              size={22}
              // color="#191B19"
              color="#fff"
            />
          </Button>
        </View>

        {/* Todo List */}
        <FlatList
          className="mt-4"
          contentContainerStyle={{ paddingTop: 2, paddingBottom: 50 }}
          ItemSeparatorComponent={() => <View style={{ height: -10 }} />} // 👈 adds vertical spacing
          data={tasks}
          renderItem={({ item }) => (
            <TaskItem
              // TODO: this element has 

              id={item.id}
              title={item.title}
              isCompleted={item.isCompleted}
              selected={selectedTodoId === item.id}
              editing={editingId === item.id}
              onToggle={toggleTask}
              onLongPress={() => setSelectedTodoId(item.id)}
              onEdit={() => setEditingId(item.id)}
              onDelete={deleteTask}
              onSave={updateTask}
              onCancel={() => setEditingId(null)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </Pressable>
    </SafeAreaView>
  );
};

export default Tasks;
