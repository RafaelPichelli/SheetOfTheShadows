import React, {useEffect, useState} from "react";
import {Modal, View, TextInput, TouchableOpacity, StyleSheet, ScrollView} from "react-native"
import Texto from "../../../componentes/Texto";
import {Checkbox} from "expo-checkbox";
import {adicionaMagia, atualizaMagia, removeMagia} from "../../../servicos/magiasDB";
import {Picker} from "@react-native-picker/picker";

export default function ModalMagias({selecionado, setSelecionado, setMagias}) {

    useEffect(() => {
        if (selecionado.id) {
            preencheModal()
            setItemParaAtualizar(true)
            setModalVisivel(true)
            return
        }
        setItemParaAtualizar(false)
        setEditarMagia(true);
    }, [selecionado])

    const [nome, setNome] = useState("")
    const [tipo, setTipo] = useState("Utilidade")
    const [nivel, setNivel] = useState("0")
    const [tradicao, setTradicao] = useState("")
    const [alvo, setAlvo] = useState("")
    const [dano, setDano] = useState("")
    const [critico, setCritico] = useState("")
    const [efeito, setEfeito] = useState("")
    const [descricao, setDescricao] = useState("")
    const [duracao, setDuracao] = useState("")
    const [conjuracoes, setConjuracoes] = useState("0")
    const [modalVisivel, setModalVisivel] = useState(false)
    const [itemParaAtualizar, setItemParaAtualizar] = useState(false)
    const [editarMagia, setEditarMagia] = useState();
    const [temCritico, setTemCritico] = useState(false);
    const [temEfeito, setTemEfeito] = useState(false);
    const [temDano, setTemDano] = useState(false);
    const [temDuracao, setTemDuracao] = useState(false);
    async function salvaMagia() {
        const magia = {
            nome: nome,
            tipo: tipo,
            nivel: nivel,
            tradicao: tradicao,
            alvo: alvo,
            dano: dano,
            critico: critico,
            efeito: efeito,
            descricao: descricao,
            duracao: duracao,
            conjuracoes: conjuracoes
        }
        await adicionaMagia(magia);

        setMagias();
        fechaModal();
    }

    async function modificaMagia() {
        const magia = {
            id: selecionado.id,
            nome: nome,
            tipo: tipo,
            nivel: nivel,
            tradicao: tradicao,
            alvo: alvo,
            dano: dano,
            critico: critico,
            efeito: efeito,
            descricao: descricao,
            duracao: duracao,
            conjuracoes: conjuracoes
        }

        await atualizaMagia(magia);
        setMagias();
        fechaModal();
    }

    async function deletaMagia() {
        await removeMagia(selecionado.id);

        setMagias();
        fechaModal();
    }

    function preencheModal() {
        setEditarMagia(false);
        setNome(selecionado.nome)
        setTipo(selecionado.tipo)
        setNivel(selecionado.nivel.toString())
        setTradicao(selecionado.tradicao)
        setAlvo(selecionado.alvo)
        setDano(selecionado.dano)
        setCritico(selecionado.critico)
        setEfeito(selecionado.efeito)
        setDescricao(selecionado.descricao)
        setDuracao(selecionado.duracao)
        setConjuracoes(selecionado.conjuracoes.toString())
        if (selecionado.dano != ""){
            setTemDano(true)
        }
        if (selecionado.critico != "") {
            setTemCritico(true)
        }
        if (selecionado.efeito != ""){
            setTemEfeito(true);
        }
        if (selecionado.duracao != ""){
            setTemDuracao(true);
        }
    }


    function fechaModal() {
        setNome("")
        setTipo("Utilidade")
        setNivel("0")
        setTradicao("")
        setAlvo("")
        setDano("")
        setCritico("")
        setEfeito("")
        setDescricao("")
        setDuracao("")
        setConjuracoes("0")
        setTemCritico(false);
        setTemDano(false)
        setTemDuracao(false)
        setTemEfeito(false)
        setSelecionado([]);
        setModalVisivel(false);
        setEditarMagia(false);
    }

    function subtraiValor(valor, setValor) {
        let novoValor = valor - 1;

        if (!(novoValor > 0)) {
            setValor("0");
        } else {
            setValor(novoValor.toString());
        }
    }

    function somaValor(valor, setValor) {
        let novoValor = parseInt(valor) + 1;

        if (!(novoValor > 0)) {
            setValor("1");
        } else {
            setValor(novoValor.toString());
        }
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
                                : <Texto style={estilos.modalTitulo}>Criar nova Magia</Texto>
                            }

                            <Texto style={estilos.modalSubTituloCentral}>Conjurações</Texto>
                            <View style={estilos.modalBotoes}>
                                <TouchableOpacity style={estilos.modalBotaoMenos} onPress={() => {
                                    subtraiValor(conjuracoes, setConjuracoes)
                                }}>
                                    <Texto style={estilos.modalBotaoTextoSomaSub}>-</Texto>
                                </TouchableOpacity>
                                <TextInput
                                    style={estilos.modalInput}
                                    onChangeText={novoUso => novoUso > 0 ? setConjuracoes(novoUso.replaceAll(".", "").trim()) : setConjuracoes(conjuracoes)}
                                    inputMode={"numeric"}
                                    value={conjuracoes}/>
                                <TouchableOpacity style={estilos.modalBotaoMais} onPress={() => {
                                    somaValor(conjuracoes, setConjuracoes)
                                }}>
                                    <Texto style={estilos.modalBotaoTextoSomaSub}>+</Texto>
                                </TouchableOpacity>
                            </View>
                            { itemParaAtualizar ? <>
                                <Texto style={estilos.modalSubTituloCentral}>Editar Magia ?</Texto>
                                <Checkbox
                                style={estilos.checkbox}
                                value={editarMagia}
                                onValueChange={setEditarMagia}
                                color={editarMagia ? '#ad0606' : undefined}
                                />
                                </>
                                : <></>
                            }
                            {
                            !editarMagia ? <></>
                                : <>
                                    <Texto style={estilos.modalSubTitulo}>Nome da Magia</Texto>
                                    <TextInput
                                        style={estilos.modalInput}
                                        onChangeText={novoNome => setNome(novoNome)}
                                        placeholder="Digite um nome para a Magia"
                                        value={nome}/>
                                    <Texto style={estilos.modalSubTitulo}>Selecione o tipo</Texto>
                                    <View style={estilos.modalPicker}>
                                        <Picker
                                            selectedValue={tipo}
                                            onValueChange={novoTipo => setTipo(novoTipo)}>
                                            <Picker.Item label="Utilidade" value="Utilidade"/>
                                            <Picker.Item label="Ataque" value="Ataque"/>
                                        </Picker>
                                    </View>
                                    <Texto style={estilos.modalSubTituloCentral}>Nível</Texto>
                                    <View style={estilos.modalBotoes}>
                                        <TouchableOpacity style={estilos.modalBotaoMenos} onPress={() => {
                                            subtraiValor(nivel, setNivel)
                                        }}>
                                            <Texto style={estilos.modalBotaoTextoSomaSub}>-</Texto>
                                        </TouchableOpacity>
                                        <TextInput
                                            style={estilos.modalInput}
                                            onChangeText={novaQuantidade => novaQuantidade > 0 ? setNivel(novaQuantidade.replaceAll(".", "").trim()) : setNivel(nivel)}
                                            inputMode={"numeric"}
                                            value={nivel}/>
                                        <TouchableOpacity style={estilos.modalBotaoMais} onPress={() => {
                                            somaValor(nivel, setNivel)
                                        }}>
                                            <Texto style={estilos.modalBotaoTextoSomaSub}>+</Texto>
                                        </TouchableOpacity>
                                    </View>
                                    <Texto style={estilos.modalSubTitulo}>Tradição</Texto>
                                    <TextInput
                                        style={estilos.modalInput}
                                        onChangeText={novaTradicao => setTradicao(novaTradicao)}
                                        placeholder="Digite a tradição da magia"
                                        value={tradicao}/>
                                    <Texto style={estilos.modalSubTitulo}>Alvo</Texto>
                                    <TextInput
                                        style={estilos.modalInput}
                                        onChangeText={novoAlvo => setAlvo(novoAlvo)}
                                        placeholder="Digite um alvo para magia"
                                        value={alvo}/>

                                    <Texto style={estilos.modalSubTituloCentral}>Tem Dano ?</Texto>
                                    <Checkbox
                                        style={estilos.checkbox}
                                        value={temDano}
                                        onValueChange={setTemDano}
                                        color={temDano ? '#ad0606' : undefined}
                                    />
                                    {
                                        temDano ? <>
                                            <Texto style={estilos.modalSubTitulo}>Dano</Texto>
                                            <TextInput
                                                style={estilos.modalInput}
                                                onChangeText={novoDano => setDano(novoDano)}
                                                placeholder="Digite o dano da magia"
                                                value={dano}/>
                                        </> :
                                            <></>
                                    }

                                    <Texto style={estilos.modalSubTituloCentral}>Tem 20+ ?</Texto>
                                    <Checkbox
                                        style={estilos.checkbox}
                                        value={temCritico}
                                        onValueChange={setTemCritico}
                                        color={temCritico ? '#ad0606' : undefined}
                                    />
                                    {temCritico ? <>
                                            <Texto style={estilos.modalSubTitulo}>20+</Texto>
                                            <TextInput
                                                style={estilos.modalInput}
                                                onChangeText={novoCritico => setCritico(novoCritico)}
                                                placeholder="Digite o efeito do 20+"
                                                value={critico}/>
                                        </>
                                        : <></>
                                    }

                                    <Texto style={estilos.modalSubTituloCentral}>Tem Efeito ?</Texto>
                                    <Checkbox
                                        style={estilos.checkbox}
                                        value={temEfeito}
                                        onValueChange={setTemEfeito}
                                        color={temEfeito ? '#ad0606' : undefined}
                                    />
                                    {
                                        temEfeito ? <>
                                            <Texto style={estilos.modalSubTitulo}>Efeito</Texto>
                                            <TextInput
                                                style={estilos.modalInput}
                                                onChangeText={novoEfeito => setEfeito(novoEfeito)}
                                                placeholder="Digite um efeito para magia"
                                                value={efeito}/>
                                        </> : <></>
                                    }
                                    <Texto style={estilos.modalSubTitulo}>Descrição</Texto>
                                    <TextInput
                                        style={estilos.modalInput}
                                        onChangeText={novaDescricao => setDescricao(novaDescricao)}
                                        placeholder="Digite uma descrição para a magia"
                                        value={descricao}/>

                                    <Texto style={estilos.modalSubTituloCentral}>Tem Duração ?</Texto>
                                    <Checkbox
                                        style={estilos.checkbox}
                                        value={temDuracao}
                                        onValueChange={setTemDuracao}
                                        color={temDuracao ? '#ad0606' : undefined}
                                    />
                                    {
                                        temDuracao ? <>
                                            <Texto style={estilos.modalSubTitulo}>Duração</Texto>
                                            <TextInput
                                                style={estilos.modalInput}
                                                onChangeText={novaDuracao => setDuracao(novaDuracao)}
                                                placeholder="Digite a duração da magia"
                                                value={duracao}/>
                                        </> : <></>
                                    }
                                </>
                        }
                            <View style={estilos.modalBotoes}>
                                <TouchableOpacity style={estilos.modalBotaoSalvar} onPress={() => {
                                    itemParaAtualizar ? modificaMagia() : salvaMagia()
                                }}>
                                    <Texto style={estilos.modalBotaoTexto}>Salvar</Texto>
                                </TouchableOpacity>
                                {itemParaAtualizar ?
                                    <TouchableOpacity style={estilos.modalBotaoDeletar} onPress={() => {
                                        deletaMagia()
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
            <View style={estilos.viewNovoTalento}>
                <TouchableOpacity style={estilos.botaoNovoTalento} onPress={() => {
                    setModalVisivel(true)
                }}>
                    <Texto style={estilos.textoNovoTalento}>Criar nova magia</Texto>
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
