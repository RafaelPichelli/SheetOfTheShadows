import React, { useEffect, useState } from "react";
import { Modal, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import Texto from "./Texto";
import {atualizaGeral} from "../servicos/geraisDB";

export default function ModalGerais({geraisSelecionados, setGeraisSelecionados,modalVisivel ,setModalVisivel, setGerais}) {

    useEffect(() =>{
        if (modalVisivel){
            preencheModal();
            return
        }
    },[modalVisivel])

    const [nivel, setNivel] = useState("");
    const [ancestralidade, setAncestralidade] = useState("");
    const [classe, setClasse] = useState("")
    async function salvaValor(){
        const novoNivel = {
            nome: "nivelDoPersonagem",
            texto: nivel.toString()
        }
        const novaAncestralidade = {
            nome: "ancesDoPersonagem",
            texto: ancestralidade.toString()
        }
        const novaClasse = {
            nome: "classeDoPersonagem",
            texto: classe.toString()
        }
        try {
            await atualizaGeral(novoNivel);
            await atualizaGeral(novaAncestralidade);
            await atualizaGeral(novaClasse);
        }catch (e) {
            console.log(e.message);
        }

        setGerais();
        fechaModal();
    }


    function preencheModal(){
        setNivel(geraisSelecionados[0].toString())
        setAncestralidade(geraisSelecionados[1].toString())
        setClasse(geraisSelecionados[2].toString())
    }

    function fechaModal(){
        setModalVisivel(false)
        setGeraisSelecionados(["","",""])
    }

    function subtraiValor(){
        let novoValor = nivel - 1;

        if (!(novoValor > 0)){
            setNivel("0");
        }else{
            setNivel(novoValor.toString());
        }
    }
    function somaValor(){
        let novoValor = parseInt(nivel) + 1;

        if (!(novoValor > 0)){
            setNivel("1");
        }else{
            setNivel(novoValor.toString());
        }
    }

    return <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {fechaModal()}}>
        <View style={estilos.centralizaModal}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={estilos.modal}>
                    <Texto style={estilos.modalTitulo}>Editar Nivel, Ancestralidade e Classe</Texto>
                    <Texto style={estilos.modalTitulo}>Nivel</Texto>
                    <View style={estilos.modalBotoes}>
                        <TouchableOpacity style={estilos.modalBotaoMenos} onPress={() => {subtraiValor()}}>
                            <Texto style={estilos.modalBotaoTextoSomaSub}>-</Texto>
                        </TouchableOpacity>
                        <TextInput
                            style={estilos.modalInput}
                            onChangeText={novoValor => novoValor > 0  ? setValor(novoValor.replaceAll(".","").trim()): setValor(valor)}
                            inputMode={"numeric"}
                            value={nivel}/>
                        <TouchableOpacity style={estilos.modalBotaoMais} onPress={() => {somaValor()}}>
                            <Texto style={estilos.modalBotaoTextoSomaSub}>+</Texto>
                        </TouchableOpacity>
                    </View>
                    <Texto style={estilos.modalSubTitulo}>Ancestralidade</Texto>
                    <TextInput
                        style={estilos.modalInput}
                        onChangeText={novoNome => setAncestralidade(novoNome)}
                        value={ancestralidade}/>
                    <Texto style={estilos.modalSubTitulo}>Classe</Texto>
                    <TextInput
                        style={estilos.modalInput}
                        onChangeText={novoNome => setClasse(novoNome)}
                        value={classe}/>
                    <View style={estilos.modalBotoes}>
                        <TouchableOpacity style={estilos.modalBotaoSalvar} onPress={() => {salvaValor()}}>
                            <Texto style={estilos.modalBotaoTexto}>Salvar</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={estilos.modalBotaoCancelar} onPress={() => {fechaModal()}}>
                            <Texto style={estilos.modalBotaoTexto}>Cancelar</Texto>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    </Modal>
}

const estilos = StyleSheet.create({
    centralizaModal: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end"
    },
    modal: {
        backgroundColor: '#FCFBDDFF',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32,
        marginTop: 8,
        marginHorizontal: 16,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    modalTitulo: {
        fontSize: 45,
        marginBottom: 18,
        textAlign: "center",
        color: '#000'
    },
    modalSubTitulo: {
        fontSize: 22,
        marginBottom: 8,
        fontWeight: "600",
        color: "#000",
    },
    modalInput: {
        fontSize: 36,
        color:'#000',
        textAlign:"center",
        fontFamily: 'Delicious-Handrawn',
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#ad0606',
    },
    modalBotoes: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop:8,
        paddingBottom:12
    },
    modalBotaoSalvar: {
        backgroundColor: "#2ea805",
        borderRadius: 5,
        padding: 8,
        width: 80,
        alignItems: "center",
    },
    modalBotaoCancelar: {
        backgroundColor: "#057fa8",
        borderRadius: 5,
        padding: 8,
        width: 80,
        alignItems: "center",
    },
    modalBotaoMenos: {
        backgroundColor: '#ad0606',
        borderRadius: 5,
        padding: 8,
        width: 80,
        alignItems: "center",
    },
    modalBotaoMais: {
        backgroundColor: '#ad0606',
        borderRadius: 5,
        padding: 8,
        width: 80,
        alignItems: "center",
    },
    modalBotaoTexto: {
        color: "#FFFFFF",
        fontSize:21,
    },
    modalBotaoTextoSomaSub: {
        color: '#000',
        fontSize: 36,
    },
    modalBotaoTextoTxCura: {
        color: '#000',
        fontSize: 21,
    },
    modalBotaoTxCura :{
        backgroundColor: '#ad0606',
        borderRadius: 5,
        padding: 8,
        alignItems: "center",
    },
    modalBotoesTxCura: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingBottom:12
    }
});
