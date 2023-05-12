import React, { useEffect, useState } from "react";
import { Modal, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import Texto from "./Texto";
import {atualizaGeral} from "../servicos/geraisDB";

export default function ModalNome({nome, modalVisivel, setModalVisivel,setNome}) {

    useEffect(() =>{
        if (modalVisivel){
            setValor(nome.toString())
            return
        }
    },[modalVisivel])

    const [valor,setValor] = useState("")

    async function salvaValor(){
        const atributo = {
            nome: "nomeDoPersonagem",
            texto: valor.toString()
        }
        try {
            await atualizaGeral(atributo);
        }catch (e) {
            console.log(e.message);
        }

        setNome();
        fechaModal();
    }

    function fechaModal(){
        setModalVisivel(false)
    }

    return <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {fechaModal()}}>
        <View style={estilos.centralizaModal}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={estilos.modal}>
                    <Texto style={estilos.modalTitulo}>Editar nome</Texto>
                    <Texto style={estilos.modalSubTitulo}>Nome do Personagem</Texto>
                    <TextInput
                        style={estilos.modalInput}
                        onChangeText={novoNome => setValor(novoNome)}
                        value={valor}/>
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
