import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [task, setTask] = useState('');
  const [tasksList, setTasksList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Carregar tarefas salvas ao iniciar o aplicativo
  useEffect(() => {
    loadTasks();
  }, []);

  // Salvar tarefas sempre que a lista for alterada
  useEffect(() => {
    saveTasks();
  }, [tasksList]);

  // Função para carregar tarefas salvas
  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('@tasks');
      if (savedTasks !== null) {
        setTasksList(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  };

  // Função para salvar tarefas
  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(tasksList));
    } catch (error) {
      console.error('Erro ao salvar tarefas:', error);
    }
  };
  
  const addTask = () => {
    if (task.trim() === '') return; // Não adiciona tarefas vazias
    if (editingIndex !== null) {
      // Editar tarefa existente
      const newTasksList = [...tasksList];
      newTasksList[editingIndex] = task;
      setTasksList(newTasksList);
      setEditingIndex(null);
    } else {
      // Adicionar nova tarefa
      setTasksList([...tasksList, task]);
    }
    setTask(''); // Limpa o campo de texto após adicionar a tarefa
  };
  
  const removeTask = (index) => {
    const newTasksList = tasksList.filter((_, i) => i !== index);
    setTasksList(newTasksList);
  };

  const editTask = (index) => {
    setTask(tasksList[index]);
    setEditingIndex(index);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma tarefa"
          value={task}
          onChangeText={setTask}
        />
        <Button title={editingIndex !== null ? "Atualizar" : "Adicionar"} onPress={addTask} /> {/*<Button title="Adicionar" onPress={addTask} />*/}
      </View>
      <FlatList
        data={tasksList}
        renderItem={({ item, index }) => ( 
          <View style={styles.taskContainer}>
            <Text style={styles.task}>{item}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => editTask(index)} style={styles.editButton}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeTask(index)} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View> {/* renderItem={({ item }) => <Text style={styles.task}>{item}</Text>}*/}
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 90
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  task: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});