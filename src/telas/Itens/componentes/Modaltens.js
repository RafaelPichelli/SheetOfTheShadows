import React, { useEffect, useState } from "react";
import { Modal, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import Texto from "../../../componentes/Texto";
import {adicionaItem, atualizaItem, removeItem} from "../../../servicos/itensDB";
import {Checkbox} from "expo-checkbox";
export default function ModalItens({selecionado, setSelecionado, setItens}) {
    useEffect(() =>{
        if (selecionado[0] != ""){
            preencheModal()
            setItemParaAtualizar(true)
            setModalVisivel(true)
            return
        }
        setItemParaAtualizar(false)
    },[selecionado])

    const [nome,setNome] = useState("")
    const [quantidade, setQuantidade] = useState("1")
    const [temUsos,setTemUsos] = useState(false)
    const [usosRestantes,setUsosRestantes] = useState("0")
    const [modalVisivel, setModalVisivel] = useState(false)
    const [itemParaAtualizar, setItemParaAtualizar] = useState(false)
    async function salvaItem(){
        const item = {
            nome: nome,
            quantidade: quantidade,
            temUsos: temUsos,
            usosRestantes: usosRestantes
        }
        await adicionaItem(item);
        setItens();
        fechaModal();
    }

    async function modificaItem() {
        const item = {
            id: selecionado[0],
            nome: nome,
            quantidade: quantidade,
            temUsos: Boolean(temUsos),
            usosRestantes: usosRestantes
        };
        await atualizaItem(item);
        setItens();
        fechaModal();
    }

    async function deletaItem(){
        await removeItem(selecionado[0]);
        setItens();
        fechaModal();
    }

    function preencheModal(){
        setNome(selecionado[1])
        setQuantidade(selecionado[2].toString())
        setTemUsos(Boolean(selecionado[3]));
        setUsosRestantes(selecionado[4].toString())
    }

    function fechaModal(){
        setNome("");
        setQuantidade("");
        setTemUsos(false);
        setUsosRestantes("");
        setSelecionado(["","","","",""])
        setModalVisivel(false)
    }

    function subtraiValor(valor, setValor){
        let novoValor = valor - 1;

        if (!(novoValor > 0)){
            setValor("0");
        }else{
            setValor(novoValor.toString());
        }
    }
    function somaValor(valor,setValor){
        let novoValor = parseInt(valor) + 1;

        if (!(novoValor > 0)){
            setValor("1");
        }else{
            setValor(novoValor.toString());
        }
    }


    return(
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisivel}
                onRequestClose={() => {fechaModal()}}
            >
                <View style={estilos.centralizaModal}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={estilos.modal}>
                            { itemParaAtualizar ?
                                <Texto style={estilos.modalTitulo}>Editar Item</Texto>
                                : <Texto style={estilos.modalTitulo}>Criar novo Item</Texto>
                            }
                            <Texto style={estilos.modalSubTitulo}>Nome do Item</Texto>
                            <TextInput
                                style={estilos.modalInput}
                                onChangeText={novoNome => setNome(novoNome)}
                                placeholder="Digite um nome para o Item"
                                value={nome}/>
                            <Texto style={estilos.modalSubTituloCentral}>Quantidade</Texto>
                            <View style={estilos.modalBotoes}>
                                <TouchableOpacity style={estilos.modalBotaoMenos} onPress={() => {subtraiValor(quantidade,setQuantidade)}}>
                                    <Texto style={estilos.modalBotaoTextoSomaSub}>-</Texto>
                                </TouchableOpacity>
                            <TextInput
                                style={estilos.modalInput}
                                onChangeText={novaQuantidade => novaQuantidade > 0  ? setQuantidade(novaQuantidade.replaceAll(".","").trim()): setQuantidade(quantidade)}
                                inputMode={"numeric"}
                                value={quantidade}/>
                                <TouchableOpacity style={estilos.modalBotaoMais} onPress={() => {somaValor(quantidade,setQuantidade)}}>
                                    <Texto style={estilos.modalBotaoTextoSomaSub}>+</Texto>
                                </TouchableOpacity>
                            </View>
                            <Texto style={estilos.modalSubTituloCentral}>Tem Usos?</Texto>
                            <Checkbox
                                style={estilos.checkbox}
                                value={temUsos}
                                onValueChange={setTemUsos}
                                color={temUsos ? '#ad0606' : undefined}
                            />
                            { temUsos ? <>
                                    <Texto style={estilos.modalSubTituloCentral}>Quantidade de usos restantes</Texto>
                                    <View style={estilos.modalBotoes}>
                                        <TouchableOpacity style={estilos.modalBotaoMenos} onPress={() => {subtraiValor(usosRestantes,setUsosRestantes)}}>
                                            <Texto style={estilos.modalBotaoTextoSomaSub}>-</Texto>
                                        </TouchableOpacity>
                                        <TextInput
                                            style={estilos.modalInput}
                                            onChangeText={novoUso => novoUso > 0  ? setUsosRestantes(novoUso.replaceAll(".","").trim()): setUsosRestantes(usosRestantes)}
                                            inputMode={"numeric"}
                                            value={usosRestantes}/>
                                        <TouchableOpacity style={estilos.modalBotaoMais} onPress={() => {somaValor(usosRestantes,setUsosRestantes)}}>
                                            <Texto style={estilos.modalBotaoTextoSomaSub}>+</Texto>
                                        </TouchableOpacity>
                                    </View>
                                </>
                                : <></>
                            }
                            <View style={estilos.modalBotoes}>
                                <TouchableOpacity style={estilos.modalBotaoSalvar} onPress={() => {
                                    itemParaAtualizar ? modificaItem() : salvaItem()}}>
                                    <Texto style={estilos.modalBotaoTexto}>Salvar</Texto>
                                </TouchableOpacity>
                                { itemParaAtualizar ?
                                    <TouchableOpacity style={estilos.modalBotaoDeletar} onPress={() => {deletaItem()}}>
                                        <Texto style={estilos.modalBotaoTexto}>Deletar</Texto>
                                    </TouchableOpacity> : <></>
                                }
                                <TouchableOpacity style={estilos.modalBotaoCancelar} onPress={() => {fechaModal()}}>
                                    <Texto style={estilos.modalBotaoTexto}>Cancelar</Texto>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
            <View style={estilos.viewNovoTalento}>
                <TouchableOpacity style={estilos.botaoNovoTalento} onPress={() => {setModalVisivel(true)}}>
                    <Texto style={estilos.textoNovoTalento}>Criar novo item</Texto>
                </TouchableOpacity>
            </View>
        </>
    )
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
        fontSize: 28,
        marginBottom: 18,
        color: "#000",
    },
    modalInput: {
        fontSize: 18,
        marginBottom: 12,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#ad0606',
    },
    modalSubTitulo: {
        fontSize: 22,
        marginBottom: 8,
        fontWeight: "600",
        color: "#000",
    },
    modalSubTituloCentral: {
        fontSize: 22,
        marginBottom: 8,
        fontWeight: "600",
        color: "#000",
        textAlign: "center"
    },
    modalBotoes: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 6
    },
    modalBotaoSalvar: {
        backgroundColor: "#2ea805",
        borderRadius: 5,
        padding: 8,
        width: 80,
        alignItems: "center",
    },
    modalBotaoDeletar: {
        backgroundColor: "#d62a18",
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
    modalBotaoTexto: {
        color: "#FFFFFF",
    },
    viewNovoTalento: {
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom:12,
    },
    botaoNovoTalento: {
        backgroundColor: '#ad0606',
        borderRadius: 5,
        padding: 8,
        alignItems: "center",
    },
    textoNovoTalento: {
        color: '#000',
        fontSize:21,
    },
    modalPicker: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#FCFBDDFF',
        marginBottom: 12,
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
    modalBotaoTextoSomaSub: {
        color: '#000',
        fontSize: 36,
    },
    checkbox: {
        margin: 8,
        alignSelf:"center"
    },
});
