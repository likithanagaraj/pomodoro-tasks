import { Input } from '@/components/ui/input';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { AdvancedCheckbox } from 'react-native-advanced-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Todo {
  id: number;
  name: string;
  isDone: boolean;
}

interface ItemProps {
  id: number;
  name: string;
  isDone: boolean;
  onToggle: (id: number) => void;
}

const Item = ({ id, name, isDone, onToggle }: ItemProps) => {
  return (
    <View className="px-4 py-2 border border-gray-400 mb-4 rounded-lg ">

      <AdvancedCheckbox
      labelStyle={{fontSize:15,fontWeight:"400"}}
        value={isDone}
        onValueChange={() => onToggle(id)}
        label={name}
        checkedColor="#007AFF"
        uncheckedColor="#ccc"
        size={18}
      />
    </View>
  );
};

const Tasks = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, name: 'Clean house', isDone: true },
    { id: 2, name: 'Setup the auth in Redef Ai', isDone: false },
    { id: 3, name: 'Meditate', isDone: false },
  ]);

  const onChangeText = (text: string) => {
    setTask(text);
  };

  const handleTaskSubmit = () => {
    if (task.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now(),
      name: task,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    setTask('');
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <SafeAreaView className="flex-1 px-6 py-6">
      <View>
        <Text className="font-semibold text-xl text-center mb-8">Tasks</Text>

        {/* Input */}
        <View className="flex flex-row justify-center items-end gap-4">
          <Input
            className="w-80 bg-transparent border-0 border-b text-black"
            placeholder="Add new task"
            value={task}
            onChangeText={onChangeText}
          />
          <AntDesign
            onPress={handleTaskSubmit}
            name="plussquare"
            size={26}
            color="gray"
          />
        </View>

        {/* Todo List */}
        <FlatList
          className="mt-10 "
          contentContainerStyle={{ paddingTop:2, paddingBottom: 50 }}
          data={todos}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              name={item.name}
              isDone={item.isDone}
              onToggle={toggleTodo}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Tasks;
