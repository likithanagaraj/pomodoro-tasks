// src/features/tasks/components/TaskItem.tsx
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useRef, useState } from "react";
import { Alert, TextInput, View } from "react-native";
import { AdvancedCheckbox } from "react-native-advanced-checkbox";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface TaskItemProps {
  id: number;
  title: string;
  isCompleted: boolean;
  selected: boolean;
  editing: boolean;
  onToggle: (id: number) => void;
  onLongPress: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onSave: (id: number, name: string) => void;
  onCancel: () => void;
}

export function TaskItem({
  id,
  title,
  isCompleted,
  selected,
  editing,
  onToggle,
  onLongPress,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}: TaskItemProps) {
  const [editText, setEditText] = useState(title);
  const textInputRef = useRef<TextInput>(null);

  const scale = useSharedValue(1);

  useEffect(() => {
    if (editing && textInputRef.current) {
      setTimeout(() => textInputRef.current?.focus(), 100);
    }
  }, [editing]);

  useEffect(() => setEditText(title), [title]);

  const longPress = Gesture.LongPress()
    .minDuration(500)
    .onStart(() => (scale.value = withSpring(0.95)))
    .onEnd((_, success) => {
      scale.value = withSpring(1);
      if (success && !editing) runOnJS(onLongPress)(id);
    })
    .onFinalize(() => (scale.value = withSpring(1)));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const save = () => {
    if (!editText.trim())
      return Alert.alert("Error", "Task name cannot be empty");
    onSave(id, editText.trim());
  };

  return (
    <GestureDetector gesture={longPress}>
      <Animated.View
        style={animatedStyle}
        className={`px-4 py-2 border  mb-4 rounded-lg bg-white ${editing ? "border-black border-1" : "border-[#b5b5b5] border-[0.2px]"}`}
      >
        <View className="flex flex-row justify-between items-center">
          {editing ? (
            <View className="flex-1 flex-row items-center gap-2">
              <TextInput
                placeholderTextColor={"#929197"}
                ref={textInputRef}
                value={editText}
                onChangeText={setEditText}
                className="flex-1 text-base py-1 font-InterMedium  "
                placeholder="Edit task name"
              />
              <MaterialIcons
                onPress={onCancel}
                name="close"
                size={22}
                color="black"
              />
              <MaterialIcons
                onPress={save}
                name="check"
                size={22}
                color="black"
              />
            </View>
          ) : (
            <>
              <AdvancedCheckbox
                value={isCompleted}
                onValueChange={() => onToggle(id)}
                label={title}
                checkedColor="gray"
                uncheckedColor="#ccc"
                size={18}
                labelStyle={{
                  fontSize: 15,
                  fontFamily: "InterRegular",
                  textDecorationLine: isCompleted ? "line-through" : "none",
                  color: isCompleted ? "#999" : "#000",
                }}
              />
              {selected && (
                <View className="flex-row gap-3">
                  <MaterialIcons
                    onPress={() => onEdit(id)}
                    name="edit"
                    size={22}
                    color="black"
                  />
                  <MaterialIcons
                    onPress={() => onDelete(id)}
                    name="delete"
                    size={24}
                    color="black"
                  />
                </View>
              )}
            </>
          )}
        </View>
      </Animated.View>
    </GestureDetector>
  );
}
