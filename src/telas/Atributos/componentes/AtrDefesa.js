import Texto from "../../../componentes/Texto";
import {StyleSheet, View} from "react-native";
import Atributo from "./Atributo";
import {buscaAtributo} from "../../../servicos/atributosDB";
import {useEffect, useState} from "react";


export default function AtrDefesa({listaAtr, setAtrSelecionado}){
    const titulo = "Defesa";
    const defesa = listaAtr[7]

    return (
        <View style={estilos.cartao}>
            <Texto style={estilos.titulo}>{titulo}</Texto>
            <View style={estilos.container}>
                <Atributo {...defesa} setAtrSelecionado = {setAtrSelecionado}/>
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
