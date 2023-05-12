import { View, TouchableOpacity, StyleSheet} from "react-native";
import { useMemo } from "react";
import Texto from "../../../componentes/Texto";

const modificador = (valorAtr) => {

    let valorMod = valorAtr - 10;

    if (valorMod > 0) {
       return ` (+${valorMod})`;
   }else {
       return ` (${valorMod})`;
   }
}

export default function Atributo({ nome, valor, temModificador, setAtrSelecionado}) {
    const modificadorTexto = useMemo(
      () => modificador(valor),
      [valor]
    );

    if(temModificador){
        return <TouchableOpacity style={estilos.cartao} onPress={() => setAtrSelecionado([nome,valor])}>
            <View style={estilos.informacoes}>
                <View>
                    <Texto style={estilos.nome}>{ nome }</Texto>
                    <Texto style={estilos.valor}>{valor + " " + modificadorTexto }</Texto>
                </View>
            </View>
        </TouchableOpacity>
    }
    else {
        return <TouchableOpacity style={estilos.cartao} onPress={() => setAtrSelecionado([nome,valor])}>
            <View style={estilos.informacoes}>
                <View>
                    <Texto style={estilos.nome}>{ nome }</Texto>
                    <Texto style={estilos.valor}>{valor}</Texto>
                </View>
            </View>
        </TouchableOpacity>

    }
}

const estilos = StyleSheet.create({
    cartao: {
        backgroundColor: '#FCFBDDFF',
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
        textAlign: "center",
        marginLeft: 8,
        marginVertical: 16,
        marginRight: 16,
    },
    nome: {
        fontSize: 28,
        lineHeight: 30,
        color: '#000'
    },
    valor: {
        fontSize: 28,
        lineHeight: 28,
        textAlign: "center",
        color: '#000'
    }
});
