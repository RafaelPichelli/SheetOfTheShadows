import React, {useEffect, useState} from "react";
import {Modal, View, TextInput, TouchableOpacity, StyleSheet, ScrollView} from "react-native"
import Texto from "../../../componentes/Texto";
import {Checkbox} from "expo-checkbox";
import {Picker} from "@react-native-picker/picker";
import {adicionaAtaque, atualizaAtaque, removeAtaque} from "../../../servicos/ataquesDB";

export default function ModalAtaques({selecionado, setSelecionado, modalVisivel, setModalVisivel, setAtaques}) {

    useEffect(() => {
        if(modalVisivel){
            if (selecionado.id) {
                preencheModal()
                setItemParaAtualizar(true)
                return
            }
            setItemParaAtualizar(false)
        }
    }, [modalVisivel])

    const [nome, setNome] = useState("")
    const [distancia, setDistancia] = useState("Corpo a corpo")
    const [atributo, setAtributo] = useState("Força")
    const [vanDesv, setVanDesv] = useState("")
    const [dano, setDano] = useState("")
    const [critico, setCritico] = useState("")
    const [efeito, setEfeito] = useState("")
    const [itemParaAtualizar, setItemParaAtualizar] = useState(false)
    const [temCritico, setTemCritico] = useState(false);
    const [temEfeito, setTemEfeito] = useState(false);
    const [temVanDesv, setTemVanDesv] = useState(false);

    async function salvaAtaque() {
        let ataque = {
            nome: nome,
            distancia: distancia,
            atributo: atributo,
            vanDesv: vanDesv,
            dano: dano,
            critico: critico,
            efeito: efeito,
        }
        await adicionaAtaque(ataque);

        setAtaques();
        fechaModal();
    }

    async function modificaAtaque() {
        let ataque = {
            id: selecionado.id,
            nome: nome,
            distancia: distancia,
            atributo: atributo,
            vanDesv: vanDesv,
            dano: dano,
            critico: critico,
            efeito: efeito,
        }

        await atualizaAtaque(ataque);

        setAtaques();
        fechaModal();
    }

    async function deletaAtaque() {
        await removeAtaque(selecionado.id);

        setAtaques();
        fechaModal();
    }

    function preencheModal() {
        setNome(selecionado.nome);
        setDistancia(selecionado.distancia);
        setAtributo(selecionado.atributo);
        setVanDesv(selecionado.vanDesv);
        setDano(selecionado.dano);
        setCritico(selecionado.critico);
        setEfeito(selecionado.efeito);


        if (selecionado.vanDesv != ""){
            setTemVanDesv(true);
        }
        if (selecionado.critico != "") {
            setTemCritico(true);
        }
        if (selecionado.efeito != "") {
            setTemEfeito(true);
        }
    }


    function fechaModal() {
        setNome("");
        setDistancia("Corpo a corpo");
        setAtributo("");
        setVanDesv("");
        setDano("");
        setCritico("");
        setEfeito("");
        setTemCritico(false);
        setTemEfeito(false);
        setTemVanDesv(false);
        setSelecionado([]);
        setModalVisivel(false);
    }


    return (
        <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisivel}
            onRequestClose={() => {
                fechaModal()
            }}
        >
            <View style={estilos.centralizaModal}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={estilos.modal}>
                        {itemParaAtualizar ?
                            <Texto style={estilos.modalTitulo}>{selecionado.nome}</Texto>
                            : <Texto style={estilos.modalTitulo}>Criar novo ataque</Texto>
                        }
                        <Texto style={estilos.modalSubTitulo}>Nome do ataque</Texto>
                        <TextInput
                            style={estilos.modalInput}
                            onChangeText={novoNome => setNome(novoNome)}
                            placeholder="Digite um nome para o ataque"
                            value={nome}/>

                        <Texto style={estilos.modalSubTitulo}>Distancia do ataque</Texto>
                        <View style={estilos.modalPicker}>
                            <Picker
                                selectedValue={distancia}
                                onValueChange={novaDistancia => setDistancia(novaDistancia)}>
                                <Picker.Item label="Corpo a corpo" value="Corpo a corpo"/>
                                <Picker.Item label="Curta (5 m)" value="Curta (5 m)"/>
                                <Picker.Item label="Media (20 m)" value="Media (20 m)"/>
                                <Picker.Item label="Longa (100 m)" value="Longa (100 m)"/>
                            </Picker>
                        </View>

                        <Texto style={estilos.modalSubTitulo}>Atributo utilizado</Texto>
                        <View style={estilos.modalPicker}>
                            <Picker
                                selectedValue={atributo}
                                onValueChange={novoAtributo => setAtributo(novoAtributo)}>
                                <Picker.Item label="Força" value="Força"/>
                                <Picker.Item label="Agilidade" value="Agilidade"/>
                            </Picker>
                        </View>

                        <Texto style={estilos.modalSubTitulo}>Tem dadiva ou perdição?</Texto>
                        <Checkbox
                            style={estilos.checkbox}
                            value={temVanDesv}
                            onValueChange={setTemVanDesv}
                            color={temVanDesv ? '#ad0606' : undefined}
                        />
                        {
                            temVanDesv ?
                                <>
                                <Texto style={estilos.modalSubTitulo}>Dadiva(s) ou perdição(ões)</Texto>
                                <TextInput
                                    style={estilos.modalInput}
                                    onChangeText={novaDadPerd => setVanDesv(novaDadPerd)}
                                    placeholder="Digite um nome para o ataque"
                                    value={vanDesv}/>
                                </>
                                    : <></>
                        }

                        <Texto style={estilos.modalSubTitulo}>Dano</Texto>
                        <TextInput
                            style={estilos.modalInput}
                            onChangeText={novoDano => setDano(novoDano)}
                            placeholder="Digite um nome para o ataque"
                            value={dano}/>

                        <Texto style={estilos.modalSubTitulo}>Tem 20+?</Texto>
                        <Checkbox
                            style={estilos.checkbox}
                            value={temCritico}
                            onValueChange={setTemCritico}
                            color={temCritico ? '#ad0606' : undefined}
                        />
                        {
                            temCritico ?
                                <>
                                    <Texto style={estilos.modalSubTitulo}>20+</Texto>
                                    <TextInput
                                        style={estilos.modalInput}
                                        onChangeText={novoCritico => setCritico(novoCritico)}
                                        placeholder="Digite um nome para o ataque"
                                        value={critico}/>
                                </>
                                : <></>
                        }

                        <Texto style={estilos.modalSubTitulo}>Tem efeito?</Texto>
                        <Checkbox
                            style={estilos.checkbox}
                            value={temEfeito}
                            onValueChange={setTemEfeito}
                            color={temEfeito ? '#ad0606' : undefined}
                        />
                        {
                            temEfeito ?
                                <>
                                    <Texto style={estilos.modalSubTitulo}>Efeito</Texto>
                                    <TextInput
                                        style={estilos.modalInput}
                                        onChangeText={novoEfeito => setEfeito(novoEfeito)}
                                        placeholder="Digite um nome para o ataque"
                                        value={efeito}/>
                                </>
                                : <></>
                        }

                    <View style={estilos.modalBotoes}>
                        <TouchableOpacity style={estilos.modalBotaoSalvar} onPress={() => {
                            itemParaAtualizar ? modificaAtaque() : salvaAtaque()
                        }}>
                            <Texto style={estilos.modalBotaoTexto}>Salvar</Texto>
                        </TouchableOpacity>
                        {itemParaAtualizar ?
                            <TouchableOpacity style={estilos.modalBotaoDeletar} onPress={() => {
                                deletaAtaque()
                            }}>
                                <Texto style={estilos.modalBotaoTexto}>Deletar</Texto>
                            </TouchableOpacity> : <></>
                        }
                        <TouchableOpacity style={estilos.modalBotaoCancelar} onPress={() => {
                            fechaModal()
                        }}>
                            <Texto style={estilos.modalBotaoTexto}>Cancelar</Texto>
                        </TouchableOpacity>
                    </View>
            </View>
        </ScrollView>
        </View>
</Modal>
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
        paddingBottom: 12,
    },
    botaoNovoTalento: {
        backgroundColor: '#ad0606',
        borderRadius: 5,
        padding: 8,
        alignItems: "center",
    },
    textoNovoTalento: {
        color: '#000',
        fontSize: 21,
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
        alignSelf: "center"
    },
});
