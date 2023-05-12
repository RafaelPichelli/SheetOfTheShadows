import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Texto from "../../../componentes/Texto";

export default function Talento({id, nome, efeito, tipo, usadoEmCombate, setSelecionado}) {

    return <TouchableOpacity style={estilos.cartao} onPress={() => setSelecionado([id,nome,efeito,tipo,usadoEmCombate])}>
      <View style={estilos.informacoes}>
        <View>
          <Texto style={estilos.nome}>{ nome }</Texto>
          <Texto style={estilos.tipo}>{ "Tipo: " + tipo }</Texto>
          <Texto style={estilos.informacoes}>{efeito}</Texto>
        </View>
      </View>
    </TouchableOpacity>
}

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: '#ad0606',
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 6,
    flexDirection: "row",
    // Android
    elevation: 4,

    // iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  informacoes: {
    flexDirection: 'row',
    textAlign: "left",
    marginLeft: 8,
    marginVertical: 16,
    marginRight: 16,
    fontSize:24,
    color: '#000'
  },
  nome: {
    fontSize:28,
    lineHeight: 32,
    textAlign:"left",
    color: '#000'
  },
  tipo: {
    flexDirection: 'row',
    textAlign: "left",
    marginLeft: 8,
    marginRight: 16,
    fontSize:24,
    color: '#000'
  }
});
