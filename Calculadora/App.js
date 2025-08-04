
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';



export default function App() {
  const [input, setInput] = useState(''); // Valor digitado pelo usuário
  const [result, setResult] = useState(''); // Resultado da operação
  const [operation, setOperation] = useState(null); // Operação atual

  const handleOperation = (op) => {
    if (input === '') return; // Ignora se não houver valor digitado

    const number = parseFloat(input); // Converte o valor digitado para número

    if (operation === null) {
      // Se não houver operação anterior, define o resultado como o número digitado
      setResult(number);
    } else {
      // Realiza a operação matemática com base no valor atual e no resultado anterior
      switch (operation) {
        case '+':
          setResult(result + number);
          break;
        case '-':
          setResult(result - number);
          break;
        case '*':
          setResult(result * number);
          break;
        case '/':
          setResult(result / number);
          break;
        default:
          break;
      }
    }

    setOperation(op); // Define a operação atual
    setInput(''); // Limpa o campo de entrada
  };

  const handleEquals = () => {
    if (input === '' || operation === null) return; // Ignora se não houver valor ou operação

    const number = parseFloat(input); // Converte o valor digitado para número

    // Realiza a operação matemática final
    switch (operation) {
      case '+':
        setResult(result + number);
        break;
      case '-':
        setResult(result - number);
        break;
      case '*':
        setResult(result * number);
        break;
      case '/':
        setResult(result / number);
        break;
      default:
        break;
    }

    setOperation(null); // Reseta a operação
    setInput(''); // Limpa o campo de entrada
  };

  const handleClear = () => {
    setInput('');
    setResult('');
    setOperation(null);
  };

  return (
    <View style={styles.container}>
      {/* Campo de Entrada */}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="0"
        value={input}
        onChangeText={(text) => setInput(text)}
      />
      <Text style={styles.resultText}>Resultado: {result}</Text>

      {/* Botões de Operações */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('-')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('*')}>
          <Text style={styles.buttonText}>*</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation('/')}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleEquals}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 24,
    textAlign: 'right',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que os botões sejam exibidos em várias linhas
    justifyContent: 'space-between',
    width: '90%', // Aumentei a largura para 90%
  },
  button: {
    width: '22%', // Define a largura como 22% do contêiner
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 10, // Alterei para um valor menor para melhorar a aparência
    margin: 5,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
  resultText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
  },
});