import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

const CurrencyInput = ({ currency, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.currency}>{currency}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={value}
        onChangeText={onChangeText}
        placeholder="0,00"
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  currency: {
    fontSize: 18,
    marginRight: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
});

export default CurrencyInput;