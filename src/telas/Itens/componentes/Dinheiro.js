import Texto from "../../../componentes/Texto";
import {StyleSheet, View} from "react-native";
import Moeda from "./Moeda";


export default function Dinheiro({listaItens, setMoedaSelecionada}){
    const titulo = "Dinheiro";
    const ma = listaItens[0];
    const cc = listaItens[1];
    const xp = listaItens[2];
    const co = listaItens[3];


    return (
        <View style={estilos.cartao}>
            <Texto style={estilos.titulo}>{titulo}</Texto>
            <View style={estilos.container}>
                <Moeda {...ma} setMoedaSelecionada = {setMoedaSelecionada}/>
                <Moeda {...cc} setMoedaSelecionada = {setMoedaSelecionada}/>
                <Moeda {...xp} setMoedaSelecionada = {setMoedaSelecionada}/>
                <Moeda {...co} setMoedaSelecionada = {setMoedaSelecionada}/>
            </View>
        </View>
    );
}

const estilos = StyleSheet.create({
    titulo: {
        fontSize: 28,
        lineHeight: 32,
        marginHorizontal: 16,
        marginTop: 8,
        textAlign: "center",
        color: '#000000',
    },
    cartao: {
        backgroundColor: '#ad0606',
        marginTop:8,
        elevation:4,
        borderColor:'#000',
        borderStyle:'solid',
        borderRadius:6,
    },
    container:{
        flexDirection: "row",
        justifyContent:"space-around",
        flexWrap:"wrap",
    },
})
