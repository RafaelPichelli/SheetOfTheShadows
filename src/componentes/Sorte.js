import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Texto from "./Texto";

export default function Sorte({sorte, modalSorteVisivel}) {

    return <TouchableOpacity style={estilos.cartao} onPress={() => modalSorteVisivel(true)}>
        <View style={estilos.informacoes}>
            <View>
                <Texto style={estilos.valor}>{`Sorte: ${sorte}`}</Texto>
            </View>
        </View>
    </TouchableOpacity>


}

const estilos = StyleSheet.create({
    cartao: {
        alignSelf: "center",
        backgroundColor: '#FCFBDDFF',
        marginVertical: 6,
        marginHorizontal: 10,
        borderRadius: 6,
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
        textAlign: "center",
        flexDirection:"row",
        marginLeft: 8,
        marginVertical: 16,
        marginRight: 8,
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
