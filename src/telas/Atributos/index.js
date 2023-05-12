import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet, View, ScrollView, TouchableOpacity} from "react-native";
import {buscaAtributos} from "../../servicos/atributosDB";
import Texto from "../../componentes/Texto";
import Talento from "./componentes/Talento";
import ModalAtributos from "../../componentes/ModalAtributos";
import {buscaTalentos, buscaTalentosPorTipo, dropTableTalentos} from "../../servicos/talentosDB";
import ModalTalentos from "../../componentes/ModalTalentos";
import AtrPricipais from "./componentes/AtrPricipais";
import AtrSauDan from "./componentes/AtrSauDan";
import AtrDefesa from "./componentes/AtrDefesa";
import AtrSecundarios from "./componentes/AtrSecundarios";
import {Picker} from "@react-native-picker/picker";
import {useFocusEffect} from "@react-navigation/native";

export default function Atributos() {
    const tituloTalentos = "Talentos";

    const [listaAtr, setListaAtr] = useState([]);
    const [atrSelecionado, setAtrSelecionado] = useState(["", ""]);
    const [listaTalentos, setListaTalentos] = useState([]);
    const [talentoSelecionado, setTalentoSelecionado] = useState(["", "", "", "", ""]);
    const [tipo, setTipo] = useState("Todos");

    const [modalVisivel, setModalVisivel] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            if (isActive) {
                carregaAtr();
            }

            return () => {
                isActive = false;
            };
        }, [])
    );

    useEffect(() => {
        carregaTalentos(tipo)
    }, [tipo])

    async function carregaAtr() {
        const todosAtributos = await buscaAtributos()

        setListaAtr(todosAtributos)
    }

    async function carregaTalentos(tipo) {
        let todosTalentos

        if (tipo != "Utilidade" && tipo != "Ataque") {
            todosTalentos = await buscaTalentos();
        } else {
            todosTalentos = await buscaTalentosPorTipo(tipo);
        }

        setListaTalentos(todosTalentos)
    }

    const TopoLista = () => {
        return <View>
            <AtrPricipais listaAtr={listaAtr} setAtrSelecionado={setAtrSelecionado}/>
            <AtrSecundarios listaAtr={listaAtr} setAtrSelecionado={setAtrSelecionado}/>
            <AtrSauDan listaAtr={listaAtr} setAtrSelecionado={setAtrSelecionado}/>
            <AtrDefesa listaAtr={listaAtr} setAtrSelecionado={setAtrSelecionado}/>
            <Texto style={estilos.titulo}>{tituloTalentos}</Texto>

            <View style={estilos.viewNovoTalento}>
                <TouchableOpacity style={estilos.botaoNovoTalento} onPress={() => {
                    setModalVisivel(true)
                }}>
                    <Texto style={estilos.textoNovoTalento}>Criar novo talento</Texto>
                </TouchableOpacity>
            </View>

            <View style={estilos.modalPicker}>
                <Picker
                    selectedValue={tipo}
                    onValueChange={novoTipo => setTipo(novoTipo)}>
                    <Picker.Item label="Todos" value="Todos"/>
                    <Picker.Item label="Utilidade" value="Utilidade"/>
                    <Picker.Item label="Ataque" value="Ataque"/>
                </Picker>

            </View>
            <ModalAtributos atrSelecionado={atrSelecionado} setAtrSelecionado={setAtrSelecionado}
                            setAtributos={carregaAtr}/>
            <ModalTalentos selecionado={talentoSelecionado} setSelecionado={setTalentoSelecionado}
                           modalVisivel={modalVisivel} setModalVisivel={setModalVisivel} setTalentos={carregaTalentos}/>
        </View>
    }

    return <FlatList
        data={listaTalentos}
        renderItem={
            ({item}) => <Talento {...item} setSelecionado={setTalentoSelecionado} setModalVisivel={setModalVisivel}/>
        }
        keyExtractor={({id}) => id}
        ListHeaderComponent={TopoLista}
        style={estilos.lista}/>
}

const estilos = StyleSheet.create({
    lista: {
        backgroundColor: '#FCFBDDFF',
    },
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
        marginTop: 8,
        elevation: 4,
        borderColor: '#000',
        borderStyle: 'solid',
        borderRadius: 6,
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },
    modalPicker: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#FCFBDDFF',
        marginBottom: 12,
    },
    viewNovoTalento: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop:6,
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
    }
})
