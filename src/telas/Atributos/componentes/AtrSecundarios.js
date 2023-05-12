import Texto from "../../../componentes/Texto";
import {StyleSheet, View} from "react-native";
import Atributo from "./Atributo";
import {buscaAtributo} from "../../../servicos/atributosDB";
import {useEffect, useState} from "react";


export default function AtrSecundarios({listaAtr, setAtrSelecionado}){
    const titulo = "Atributos Secundarios";
    const percepcao = listaAtr[8]
    const deslocamento = listaAtr[9]
    const insanidade = listaAtr[10]
    const corrupcao = listaAtr [11]

    return (
        <View style={estilos.cartao}>
            <Texto style={estilos.titulo}>{titulo}</Texto>
            <View style={estilos.container}>
                <Atributo {...percepcao} setAtrSelecionado = {setAtrSelecionado}/>
                <Atributo {...deslocamento} setAtrSelecionado = {setAtrSelecionado}/>
                <Atributo {...insanidade} setAtrSelecionado = {setAtrSelecionado}/>
                <Atributo {...corrupcao} setAtrSelecionado = {setAtrSelecionado}/>
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
