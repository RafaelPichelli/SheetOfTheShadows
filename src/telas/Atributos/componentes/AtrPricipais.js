import Texto from "../../../componentes/Texto";
import {StyleSheet, View} from "react-native";
import Atributo from "./Atributo";


export default function AtrPricipais({listaAtr, setAtrSelecionado}){
    const titulo = "Atributos Principais";
    const forca = listaAtr[0];
    const agilidade = listaAtr[1];
    const intelecto = listaAtr[2];
    const vontade = listaAtr[3];


    return (
        <View style={estilos.cartao}>
            <Texto style={estilos.titulo}>{titulo}</Texto>
            <View style={estilos.container}>
                <Atributo {...forca} setAtrSelecionado = {setAtrSelecionado}/>
                <Atributo {...agilidade} setAtrSelecionado = {setAtrSelecionado}/>
                <Atributo {...intelecto} setAtrSelecionado = {setAtrSelecionado}/>
                <Atributo {...vontade} setAtrSelecionado = {setAtrSelecionado}/>
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
