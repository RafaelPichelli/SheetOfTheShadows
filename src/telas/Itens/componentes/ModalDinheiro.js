import React, { useEffect, useState } from "react";
import { Modal, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import Texto from "../../../componentes/Texto";
import {atualizaItem, atualizaMoeda} from "../../../servicos/itensDB";

export default function ModalDinheiro({listaMoedas, moedaSelecionada, setMoedaSelecionada, setMoedas}) {

    useEffect(() =>{
        if (moedaSelecionada[0] != ""){
            setValor(moedaSelecionada[2].toString())
            setModalVisivel(true)
            return
        }
    },[moedaSelecionada])

    const [valor,setValor] = useState("")
    const [modalVisivel, setModalVisivel] = useState(false)

    function transformaMoeda(idMoeda, val){
        let moedaAtual;
        let moedaMaior;

        if (idMoeda != 4 && val >= 10){
            moedaMaior = listaMoedas[idMoeda].quantidade + Math.trunc(val/10);
            moedaAtual = val%10;

            salvaValor(idMoeda, moedaAtual)
            transformaMoeda(idMoeda+1, moedaMaior)
        }else {
            salvaValor(idMoeda, val)
        }

    }

    async function salvaValor(idMoeda,val){
        const moeda = {
            id: idMoeda,
            quantidade: val,
        }
        try {
            await atualizaMoeda(moeda);
        }catch (e) {
            console.log(e.message);
        }

        setMoedas();
        fechaModal();
    }

    function fechaModal(){
        setMoedaSelecionada(["","","","",""])
        setModalVisivel(false)
    }
    function subtraiValor(){
        let novoValor = valor - 1;

        if (!(novoValor > 0)){
            setValor("0");
        }else{
            setValor(novoValor.toString());
        }
    }
    function somaValor(){
        let novoValor = parseInt(valor) + 1;

        if (!(novoValor > 0)){
            setValor("1");
        }else{
            setValor(novoValor.toString());
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
                    <Texto style={estilos.modalTitulo}>{moedaSelecionada[1]}</Texto>
                    <View style={estilos.modalBotoes}>
                        <TouchableOpacity style={estilos.modalBotaoMenos} onPress={() => {subtraiValor()}}>
                            <Texto style={estilos.modalBotaoTextoSomaSub}>-</Texto>
                        </TouchableOpacity>
                        <TextInput
                            style={estilos.modalInput}
                            onChangeText={novoValor => novoValor > 0  ? setValor(novoValor.replaceAll(".","").trim()): setValor(valor)}
                            inputMode={"numeric"}
                            value={valor}/>
                        <TouchableOpacity style={estilos.modalBotaoMais} onPress={() => {somaValor()}}>
                            <Texto style={estilos.modalBotaoTextoSomaSub}>+</Texto>
                        </TouchableOpacity>
                    </View>
                    <View style={estilos.modalBotoes}>
                        <TouchableOpacity style={estilos.modalBotaoSalvar} onPress={() => {transformaMoeda(moedaSelecionada[0],valor)}}>
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
