import Texto from "../../../componentes/Texto";
import {StyleSheet, View} from "react-native";
import Atributo from "../../Atributos/componentes/Atributo";


export default function AtrAux({listaAtr, setAtrSelecionado}){
    const titulo = "Atributos";
    const poder = listaAtr[0];
    const defesa = listaAtr[1];
    const saude = listaAtr[2];
    const dano = listaAtr[3];


    return (
        <View style={estilos.cartao}>
            <Texto style={estilos.titulo}>{titulo}</Texto>
            <View style={estilos.container}>
                <Atributo {...poder} setAtrSelecionado = {setAtrSelecionado}/>
                <Atributo {...defesa} setAtrSelecionado = {setAtrSelecionado}/>
                <Atributo {...saude} setAtrSelecionado = {setAtrSelecionado}/>
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
