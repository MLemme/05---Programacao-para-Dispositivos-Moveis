//https://github.com/natanielpaiva/gran-aplicacao-1/tree/main
//Calculadora - está incopleta neste local, eu conclui ela

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [input, setInput] = useState(''); //valor de entrada do usuário
  const [result, setResult] = useState(''); //resultado da operação
  const [operation, setOperation] = useState(null); //operação atual

  const handleOperation = (op) =>{
     if (input == '') return;  //ignora se entrada vazia
     const number = parseFloat(input); //connverte entrada para número
     if (operation == null) {
        setResult(number);
     }else{
         switch(operation) {
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
     setOperation(op);
     setInput('');
  }
  const handleEquals = () =>{
     if (input === ''|| operation === null) return;
     const number = parseFloat(input); //connverte entrada para número
     if (operation == null) {
        setResult(number);
     }else{
         switch(operation) {
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
     setOperation(null); //reseta operação
     setInput('');
  }
  const handleClear = () => {
     setInput('');
     setResult('');
     setOperation(null);
  }
  
  return ( 
    <View style={styles.container}>
      {/* Campo de Entrada */}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="0"
        value = {input}
        onChangeText={(text) => setInput(text)}
      />
      <Text style={styles.resultText}> Resultado: {result}</Text>

      {/* Botões de Operações */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={()=> handleOperation('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=> handleOperation('-')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=> handleOperation('*')}>
          <Text style={styles.buttonText}>*</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=> handleOperation('/')}>
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
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 35,
    margin: 5,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
  },
});