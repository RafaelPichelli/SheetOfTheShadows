import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Texto({ children, style }) {
  let estilo = estilos.texto;

  return <Text style={[style, estilo]}>{ children }</Text>
}

const estilos = StyleSheet.create({
  texto: {
    fontFamily: 'Delicious-Handrawn',
  },
});
