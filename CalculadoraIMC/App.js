import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [imc, setImc] = useState(null);

  const calculateIMC = () => {
    const weightNumber = parseFloat(weight);
    const heightNumber = parseFloat(height);

    if (isNaN(weightNumber) || isNaN(heightNumber) || heightNumber === 0) {
      Alert.alert('Erro', 'Por favor, insira valores válidos para peso e altura.');
      return;
    }

    const heightInMeters = heightNumber / 100; // Convertendo altura de cm para m
    const imcValue = (weightNumber / (heightInMeters * heightInMeters)).toFixed(2);
    setImc(imcValue);
  };

  const getIMCStatus = (imc) => {
    if (imc < 18.5) {
      return {
        color: '#FFD700',
        message: 'Magreza',
        description: 'Você está abaixo do peso ideal. Consulte um nutricionista para uma dieta balanceada.',
      };
    } else if (imc < 24.9) {
      return {
        color: '#32CD32',
        message: 'Normal',
        description: 'Seu peso está dentro da faixa considerada saudável. Parabéns!',
      };
    } else if (imc < 29.9) {
      return {
        color: '#FFA500',
        message: 'Sobrepeso',
        description: 'Você está acima do peso ideal. Considere adotar hábitos mais saudáveis.',
      };
    } else {
      return {
        color: '#FF0000',
        message: 'Obesidade',
        description: 'Você está na faixa de obesidade. Procure um médico para orientações.',
      };
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Altura (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
      
      <Button title="Calcular IMC" onPress={calculateIMC} />
      
      {imc && (
        <View style={[styles.resultContainer, { backgroundColor: getIMCStatus(imc).color }]}>
          <Text style={styles.resultText}>Seu IMC é: {imc}</Text>
          <Text style={styles.resultText}>Classificação: {getIMCStatus(imc).message}</Text>
          <Text style={styles.descriptionText}>{getIMCStatus(imc).description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  descriptionText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    color: '#000',
  },
});