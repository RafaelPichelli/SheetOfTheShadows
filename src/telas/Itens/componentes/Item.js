import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Texto from "../../../componentes/Texto";

export default function Item({id, nome,quantidade, temUsos, usosRestantes, setSelecionado }) {

  if(temUsos){
    return <TouchableOpacity style={estilos.cartao} onPress={() => setSelecionado([id,nome,quantidade,temUsos,usosRestantes])}>
      <View style={estilos.informacoes}>

        <View style={{flexDirection:"row"}}>
          <Texto style={estilos.nome}>{ `${nome}` }</Texto>
          <Texto style={estilos.descritores}>{ `${quantidade}x`}</Texto>
        </View>
        <View style={{flexDirection:"row"}}>
          <Texto style={estilos.usos}>{ `Usos Restantes: `}</Texto>
          <Texto style={estilos.detalhes}>{ usosRestantes }</Texto>
        </View>

      </View>
    </TouchableOpacity>
  }else {
    return <TouchableOpacity style={estilos.cartao} onPress={() => setSelecionado([id,nome,quantidade,temUsos,usosRestantes])}>
      <View style={estilos.informacoes}>

        <View style={{flexDirection:"row"}}>
          <Texto style={estilos.nome}>{ `${nome}` }</Texto>
          <Texto style={estilos.descritores}>{ `${quantidade}x`}</Texto>
        </View>

      </View>
    </TouchableOpacity>
  }
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
    marginLeft: 8,
    marginVertical: 16,
    flex: 1,
  },
  nome: {
    flex:1,
    fontSize: 32,
    lineHeight: 34,
    paddingBottom:6,
    textAlign: "left",
    color: '#000',
  },
  descritores: {
    fontSize: 30,
    lineHeight: 32,
    marginRight:8,
    color: '#000',
  },
  detalhes:{
    fontSize: 24,
    lineHeight: 26,
    flex:1,
    color: '#000',
  },
  usos:{
    fontSize: 24,
    lineHeight: 28,
    marginRight:8,
    color: '#000',
  }
});
