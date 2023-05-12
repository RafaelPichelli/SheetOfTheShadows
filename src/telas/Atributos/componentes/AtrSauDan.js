import Texto from "../../../componentes/Texto"
import {StyleSheet, View} from "react-native";
import Atributo from "./Atributo";


export default function AtrSauDan({listaAtr,setAtrSelecionado}){
    const titulo = "Saude, Dano e Tx de Cura";
    const saude = listaAtr[4]
    const dano = listaAtr[5]
    const txCura = listaAtr[6]

    return (
        <View style={estilos.cartao}>
            <Texto style={estilos.titulo}>{titulo}</Texto>
            <View style={estilos.container}>
                <Atributo {...saude} setAtrSelecionado = {setAtrSelecionado}/>
                <Atributo {...txCura} setAtrSelecionado = {setAtrSelecionado}/>
                <Atributo {...dano} setAtrSelecionado = {setAtrSelecionado}/>
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
