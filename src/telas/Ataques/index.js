import {FlatList, StyleSheet, TouchableOpacity, View} from "react-native";
import Talento from "../Atributos/componentes/Talento";
import React, {useEffect, useState} from "react";
import Ataque from "./componentes/Ataque";
import Texto from "../../componentes/Texto";
import ModalAtributos from "../../componentes/ModalAtributos";
import {useFocusEffect} from "@react-navigation/native";
import {buscaAtributo} from "../../servicos/atributosDB";
import AtrAux from "../Magias/componentes/AtrAux";
import {buscaTalentosCombate} from "../../servicos/talentosDB";
import ModalTalentos from "../../componentes/ModalTalentos";
import ModalAtaques from "./componentes/ModalAtaques";
import {buscaAtaques, buscaAtaquesPorDistancia} from "../../servicos/ataquesDB";
import {Picker} from "@react-native-picker/picker";

export default function Ataques() {

    const [listaAtr, setListaAtr] = useState([]);
    const [atrSelecionado, setAtrSelecionado] = useState(["", ""]);
    const [forcaAgilidade, setForcaAgilidade] = useState([{valor: 10}, {valor: 10}]);
    const [listaTalentos, setListaTalentos] = useState([]);
    const [talentoSelecionado, setTalentoSelecionado] = useState(["", "", "", "", ""]);
    const [listaAtaques, setListaAtaques] = useState([]);
    const [ataqueSelecionado, setAtaqueSelecionado] = useState([]);
    const [filtroDist, setFiltroDist] = useState("Todos");
    const [modalTalVisivel, setModalTalVisivel] = useState(false);
    const [modalAtaVisivel, setModalAtaVisivel] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            async function carregar() {
                if (isActive) {
                    carregaAtributos();
                    carregaTalentos();
                }
            }

            carregar();
            return () => {
                isActive = false;
            };
        }, [])
    );

    useEffect(() => {
        carregaAtaques();
    }, [filtroDist])

    async function carregaAtributos() {
        let forcaAgilidade = await buscaAtributo("Força");
        forcaAgilidade.push((await buscaAtributo("Agilidade"))[0]);

        setForcaAgilidade(forcaAgilidade);

        let todosAtributos = await buscaAtributo("Defesa");
        todosAtributos.push((await buscaAtributo("Saúde"))[0]);
        todosAtributos.push((await buscaAtributo("Dano"))[0]);
        todosAtributos.push((await buscaAtributo("Taxa de Cura"))[0]);

        setListaAtr(todosAtributos)
    }

    async function carregaTalentos() {
        const todosTalentos = await buscaTalentosCombate();

        setListaTalentos(todosTalentos)
    }

    async function carregaAtaques() {
        let todosAtaques
        if (filtroDist == "Todos") {
            todosAtaques = await buscaAtaques();
        } else {
            todosAtaques = await buscaAtaquesPorDistancia(filtroDist);
        }

        setListaAtaques(todosAtaques)
    }

    const TopoListaAtaques = () => {
        return <>
            <AtrAux listaAtr={listaAtr} setAtrSelecionado={setAtrSelecionado}/>
            <ModalAtributos atrSelecionado={atrSelecionado} setAtrSelecionado={setAtrSelecionado}
                            setAtributos={carregaAtributos}/>
            <Texto style={estilos.titulo}>Ataques</Texto>

            <View style={estilos.viewNovoTalento}>
                <TouchableOpacity style={estilos.botaoNovoTalento} onPress={() => {
                    setModalAtaVisivel(true)
                }}>
                    <Texto style={estilos.textoNovoTalento}>Criar novo ataque</Texto>
                </TouchableOpacity>
            </View>

            <View style={estilos.modalPicker}>
                <Picker
                    selectedValue={filtroDist}
                    onValueChange={novoFiltroDist => setFiltroDist(novoFiltroDist)}>
                    <Picker.Item label="Todos" value="Todos"/>
                    <Picker.Item label="Corpo a corpo" value="Corpo a corpo"/>
                    <Picker.Item label="À distância" value="À distância"/>
                    <Picker.Item label="Curta (5 m)" value="Curta (5 m)"/>
                    <Picker.Item label="Media (20 m)" value="Media (20 m)"/>
                    <Picker.Item label="Longa (100 m)" value="Longa (100 m)"/>
                </Picker>
            </View>
            <ModalTalentos selecionado={talentoSelecionado} setSelecionado={setTalentoSelecionado}
                           modalVisivel={modalTalVisivel} setModalVisivel={setModalTalVisivel} setTalentos={carregaTalentos}/>

            <ModalAtaques selecionado={ataqueSelecionado} setSelecionado={setAtaqueSelecionado} modalVisivel={modalAtaVisivel} setModalVisivel={setModalAtaVisivel}
                          setAtaques={carregaAtaques}/>
        </>
    }

    const TopoListaTalentos = () => {
        return<>
            <Texto style={estilos.titulo}>Talentos usados em combate</Texto>

            <View style={estilos.viewNovoTalento}>
                <TouchableOpacity style={estilos.botaoNovoTalento} onPress={() => {
                    setModalTalVisivel(true)
                }}>
                    <Texto style={estilos.textoNovoTalento}>Criar novo talento</Texto>
                </TouchableOpacity>
            </View>
        </>

    }

    const CaudaLista = () => {

        return <>

            <FlatList
                data={listaTalentos}
                renderItem={
                    ({item}) => <Talento {...item} setSelecionado={setTalentoSelecionado} setModalVisivel={setModalTalVisivel}/>
                }
                keyExtractor={({id}) => id}
                ListHeaderComponent={TopoListaTalentos}
                style={estilos.lista}/>
        </>
    }

    return <FlatList
        data={listaAtaques}
        renderItem={
            ({item}) => <Ataque ataque={item} forcaAgilidade={forcaAgilidade}
                                setSelecionado={setAtaqueSelecionado} setModalVisivel={setModalAtaVisivel}/>
        }
        keyExtractor={({id}) => id}
        ListHeaderComponent={TopoListaAtaques}
        ListFooterComponent={CaudaLista}
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

