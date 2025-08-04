import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CurrencyInput from '../components/CurrencyInput';
import { getExchangeRates } from '../services/api';

const HomeScreen = () => {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState('1');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('USD');

  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const numericValue = parseFloat(amount);
      if (isNaN(numericValue)) {
        setConvertedAmount('');
        return;
      }
      const fromRate = rates[fromCurrency];
      const toRate = rates[toCurrency];
      const converted = ((numericValue / fromRate) * toRate).toFixed(2);
      setConvertedAmount(converted);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  useEffect(() => {
    const fetchRates = async () => {
      const rates = await getExchangeRates();
      if (rates) {
        setRates(rates);
      }
    };

    fetchRates();
  }, []);

  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const fromRate = rates[fromCurrency];
      const toRate = rates[toCurrency];
      const converted = ((parseFloat(amount) / fromRate) * toRate).toFixed(2);
      setConvertedAmount(converted);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  // Função para inverter as moedas
  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversor de Moedas</Text>

      <View style={styles.card}>
        {/* Moeda de origem */}
        <Text style={styles.label}>De:</Text>
        <Picker
          selectedValue={fromCurrency}
          onValueChange={(itemValue) => setFromCurrency(itemValue)}
          style={styles.picker}
        >
          {Object.keys(rates).map((currency) => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>

        {/* Botão de inverter moedas */}
        <TouchableOpacity style={styles.swapButton} onPress={swapCurrencies}>
          <Text style={styles.swapButtonText}>↕️</Text>
        </TouchableOpacity>

        {/* Moeda de destino */}
        <Text style={styles.label}>Para:</Text>
        <Picker
          selectedValue={toCurrency}
          onValueChange={(itemValue) => setToCurrency(itemValue)}
          style={styles.picker}
        >
          {Object.keys(rates).map((currency) => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>

        {/* Entrada de valor */}
        <CurrencyInput
          currency={fromCurrency}
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      {/* Resultado da conversão */}
      <Text style={styles.resultText}>
        {convertedAmount !== ''
          ? `${toCurrency} ${parseFloat(convertedAmount).toLocaleString('pt-BR', {
            style: 'currency',
            currency: toCurrency,
          })}`
          : 'Digite um valor'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  swapButton: {
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#6200ee',
    borderRadius: 50,
  },
  swapButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  resultText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    color: '#333',
  },
  errorText: {
    fontSize: 16,
    color: '#ff4444',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default HomeScreen;