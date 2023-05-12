import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Texto from "../../../componentes/Texto";


export default function Magia({magia, listaConj, setMagiaSelecionada}) {

  return <TouchableOpacity style={estilos.cartao} onPress={() => {setMagiaSelecionada(magia)}}>
    <View style={estilos.informacoes}>

      <View style={{flexDirection:"row"}}>
          <Texto style={estilos.nome}>{magia.nome}</Texto>
          <Texto style={estilos.conjuração}>{`${magia.conjuracoes}/${listaConj[`nivel_${magia.nivel}`]}`}</Texto>
      </View>

      <View style={{flexDirection:"row"}}>
        <Texto style={estilos.descritores}>{ `Tradição/Tipo/Nivel: `}</Texto>
        <Texto style={estilos.detalhes}>{ `${magia.tradicao}, ${magia.tipo}, ${magia.nivel}`}</Texto>
      </View>

      <View style={{flexDirection:"row"}}>
        <Texto style={estilos.descritores}>{ `Alvo: `}</Texto>
        <Texto style={estilos.detalhes}>{magia.alvo}</Texto>
      </View>
      { magia.dano != "" ?
      <View style={{flexDirection:"row"}}>
        <Texto style={estilos.descritores}>{ `Dano: `}</Texto>
        <Texto style={estilos.detalhes}>{ magia.dano}</Texto>
      </View>
      : <></>
      }
      { magia.critico != "" ?
      <View style={{flexDirection:"row"}}>
        <Texto style={estilos.descritores}>{`20+: `}</Texto>
        <Texto style={estilos.detalhes}>{ magia.critico}</Texto>
      </View>
          : <></>
      }
      { magia.duracao != "" ?
      <View style={{flexDirection:"row"}}>
        <Texto style={estilos.descritores}>{ `Duração: `}</Texto>
        <Texto style={estilos.detalhes}>{ magia.duracao}</Texto>
      </View>
          : <></>
      }
      { magia.efeito != "" ?
      <View style={{flexDirection:"row"}}>
        <Texto style={estilos.descritores}>{`Efeito: `}</Texto>
        <Texto style={estilos.detalhes}>{ magia.efeito}</Texto>
      </View>
          : <></>
      }
      <View style={{flexDirection:"row"}}>
        <Texto style={estilos.descritores}>{ `Descrição: `}</Texto>
        <Texto style={estilos.detalhes}>{ magia.descricao}</Texto>
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
  conjuração: {
    paddingBottom:6,
    fontSize: 30,
    lineHeight: 34,
    paddingRight:8,
    textAlign: "right",
    color: '#000',
  },
  descritores: {
    fontSize: 28,
    lineHeight: 28,
    color: '#000',
  },
  detalhes:{
    fontSize: 24,
    lineHeight: 26,
    flex:1,
    color: '#000',
  }
});
