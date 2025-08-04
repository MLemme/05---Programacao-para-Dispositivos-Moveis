import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const storedNotes = await AsyncStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  };

  const deleteNote = async (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
  };

  const updateNotes = async () => {
    const storedNotes = await AsyncStorage.getItem("notes");
    setNotes(storedNotes ? JSON.parse(storedNotes) : []);
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Adicionar Nota" onPress={() => navigation.navigate("Note", { note: null, updateNotes })} />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Note", { note: item, updateNotes })}>
            <View style={{ padding: 15, marginVertical: 10, backgroundColor: "#f5f5f5", borderRadius: 5 }}>
              <Text>{item.text}</Text>
              <Button title="Excluir" onPress={() => deleteNote(item.id)} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const NoteScreen = ({ route, navigation }) => {
  const { note, updateNotes } = route.params;
  const [text, setText] = useState(note ? note.text : "");

  const saveNote = async () => {
    const storedNotes = await AsyncStorage.getItem("notes");
    let notes = storedNotes ? JSON.parse(storedNotes) : [];

    if (note) {
      notes = notes.map((n) => (n.id === note.id ? { ...n, text } : n));
    } else {
      notes.push({ id: Date.now(), text });
    }

    await AsyncStorage.setItem("notes", JSON.stringify(notes));
    updateNotes(); // Atualiza a lista na HomeScreen
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput value={text} onChangeText={setText} style={{ borderWidth: 1, padding: 10, marginBottom: 20 }} />
      <Button title="Salvar" onPress={saveNote} />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Minhas Notas" }} />
        <Stack.Screen name="Note" component={NoteScreen} options={{ title: "Editar Nota" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
