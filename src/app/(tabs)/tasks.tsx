import { Input } from '@/components/ui/input';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { AdvancedCheckbox } from 'react-native-advanced-checkbox';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
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
  onLongPress: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onSaveEdit: (id: number, newName: string) => void;
  onCancelEdit: () => void;
  selectedTodoId: number | null;
  editingId: number | null;
}

const Item = ({
  id,
  name,
  isDone,
  onToggle,
  onLongPress,
  onEdit,
  onDelete,
  onSaveEdit,
  onCancelEdit,
  selectedTodoId,
  editingId
}: ItemProps) => {
  const [editText, setEditText] = useState(name);
  const textInputRef = useRef<TextInput>(null);
  
  // Animated values for scale effect
  const scale = useSharedValue(1);
  const isSelected = selectedTodoId === id;
  const isEditing = editingId === id;

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && textInputRef.current) {
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 100);
    }
  }, [isEditing]);

  // Reset edit text when name changes
  useEffect(() => {
    setEditText(name);
  }, [name]);

  // Create long press gesture with proper error handling
  const longPressGesture = Gesture.LongPress()
    .minDuration(500)
    .onStart(() => {
      // Scale down effect when long press starts
      scale.value = withSpring(0.95);
    })
    .onEnd((event, success) => {
      // Scale back to normal
      scale.value = withSpring(1);

      if (success && !isEditing) {
        // Use runOnJS to safely call the callback
        runOnJS(onLongPress)(id);
      }
    })
    .onFinalize(() => {
      // Ensure scale returns to normal even if gesture is cancelled
      scale.value = withSpring(1);
    });

  // Animated style for the scale effect
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleSave = () => {
    if (editText.trim() === '') {
      Alert.alert('Error', 'Task name cannot be empty');
      return;
    }
    onSaveEdit(id, editText.trim());
  };

  const handleCancel = () => {
    setEditText(name); // Reset to original text
    onCancelEdit();
  };

  const handleKeyPress = (event: any) => {
    if (event.nativeEvent.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <GestureDetector gesture={longPressGesture}>
      <Animated.View
        style={animatedStyle}
        className={`px-4 py-2 border mb-4 rounded-lg ${
          isEditing ? 'border-blue-500 border-2' : 'border-gray-400'
        }`}
      >
        <View className='flex flex-row justify-between items-center'>
          {isEditing ? (
            // Editing mode - show TextInput
            <View className="flex-1 flex-row items-center gap-3">
              <TextInput
                ref={textInputRef}
                className="flex-1 text-base py-1 px-2 border border-gray-300 rounded"
                value={editText}
                onChangeText={setEditText}
                onKeyPress={handleKeyPress}
                // Remove onBlur to prevent canceling when tapping save button
                autoFocus
                selectTextOnFocus
                placeholder="Edit task name"
              />
              <View className="flex-row gap-2">
                
                <MaterialIcons 
                  onPress={handleCancel} 
                  name="close" 
                  size={22} 
                  color="red" 
                />
                <MaterialIcons 
                  onPress={handleSave} 
                  name="check" 
                  size={22} 
                  color="green" 
                />
              </View>
            </View>
          ) : (
            // Normal mode - show checkbox
            <>
              <AdvancedCheckbox
                labelStyle={{ 
                  fontSize: 15, 
                  fontWeight: "400",
                  textDecorationLine: isDone ? 'line-through' : 'none',
                  color: isDone ? '#999' : '#000'
                }}
                value={isDone}
                onValueChange={() => onToggle(id)}
                label={name}
                checkedColor="#007AFF"
                uncheckedColor="#ccc"
                size={18}
              />
              
              {isSelected && (
                <View className="flex-row gap-3">
                  <MaterialIcons 
                    onPress={() => onEdit(id)} 
                    name="edit" 
                    size={22} 
                    color="#007AFF" 
                  />
                  <MaterialIcons 
                    onPress={() => onDelete(id)} 
                    name="delete" 
                    size={24} 
                    color="#ff4444" 
                  />
                </View>
              )}
            </>
          )}
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const Tasks = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, name: 'Clean house', isDone: true },
    { id: 2, name: 'Setup the auth in Redef Ai', isDone: false },
    { id: 3, name: 'Meditate', isDone: false },
  ]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Function to sort todos - incomplete first, then completed
  const sortTodos = (todos: Todo[]): Todo[] => {
    return [...todos].sort((a, b) => {
      // If completion status is different, put incomplete (false) first
      if (a.isDone !== b.isDone) {
        return a.isDone ? 1 : -1;
      }
      // If both have same completion status, maintain original order (by id)
      return a.id - b.id;
    });
  };

  // Get sorted todos for rendering
  const sortedTodos = sortTodos(todos);

  const handleLongPress = (id: number) => {
    console.log('Long press detected for todo:', id);
    if (editingId === null) {
      setSelectedTodoId(prevId => prevId === id ? null : id);
    }
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setSelectedTodoId(null);
  };

  const handleSaveEdit = (id: number, newName: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, name: newName } : todo
      )
    );
    setEditingId(null);
    console.log('Todo updated:', id, newName); // Debug log
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setTodos(prev => prev.filter(t => t.id !== id));
            setSelectedTodoId(null);
          }
        }
      ]
    );
  };

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
    if (editingId === null) { // Don't allow toggle while editing
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        )
      );
      // Clear selection when toggling
      setSelectedTodoId(null);
    }
  };

  // Handle tap outside to deselect
  const handleContainerPress = () => {
    if (editingId === null) {
      setSelectedTodoId(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-6 py-6">
      <Pressable className="flex-1" onPress={handleContainerPress}>
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
          className="mt-10"
          contentContainerStyle={{ paddingTop: 2, paddingBottom: 50 }}
          data={sortedTodos} // Use sorted todos instead of original todos
          renderItem={({ item }) => (
            <Item
              id={item.id}
              name={item.name}
              isDone={item.isDone}
              onToggle={toggleTodo}
              onLongPress={handleLongPress}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              selectedTodoId={selectedTodoId}
              editingId={editingId}
            />
          )}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={editingId === null} // Disable scroll while editing
        />
      </Pressable>
    </SafeAreaView>
  );
};

export default Tasks;