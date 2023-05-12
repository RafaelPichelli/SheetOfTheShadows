import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Texto from "./Texto";
import {buscaGerais, buscaGeral, dropTableGerais} from "../servicos/geraisDB";
import Sorte from "./Sorte";
import ModalSorte from "./ModalSorte";


export default function Topo() {
    const [gerais, setGerais] = useState([{texto: ""}, {texto: ""}, {texto: ""}, {texto: ""}])
    const [sorte, setSorte] = useState("0")
    const [sorteSelecionada,setSorteSelecionada] = useState("");
    const [modalVisivel, setModalVisivel] = useState(false)
    useState(() => {
        carregaGerais();
        carregaSorte();
    }, [])

    async function carregaGerais() {
        const todasGerais = await buscaGerais()
        setGerais(todasGerais)
    }

    async function carregaSorte() {
        const sorte = await buscaGeral('Sorte');

        setSorte(sorte[0].texto)
    }


    const nomePersonagem = gerais[0].texto;
    const nivelPersonagem = gerais[1].texto;
    const racaPersonagem = gerais[2].texto;
    const classePersonagem = gerais[3].texto;

    return <>
    <View style={estilos.topo}>
            <Texto style={estilos.nomePersonagem}>{nomePersonagem}</Texto>
            <Texto style={estilos.detalhesPersonagem}>{` Niv.: ${nivelPersonagem}, ` + racaPersonagem + ", " + classePersonagem}</Texto>
            <Sorte sorte={sorte} modalSorteVisivel={setModalVisivel}/>
            </View>
        <ModalSorte sorte={sorte} modalVisivel={modalVisivel} setModalVisivel={setModalVisivel} setSorte={carregaSorte}/>
    </>
}


const estilos = StyleSheet.create({
    topo: {
        backgroundColor: '#ad0606',
        padding: 16,
    },
    nomePersonagem: {
        fontSize: 48,
        lineHeight: 52,
        color: '#000000'
    },
    detalhesPersonagem: {
        paddingTop: 8,
        fontSize: 26,
        lineHeight: 28,
        color: '#000000',
    },
    sortePersonagem: {
        fontSize: 32,
        lineHeight: 34,
        color: '#000000',
        textAlign: "center"
    },
    cartao: {
        textAlign: "center",
        backgroundColor: '#FCFBDDFF',
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 6,
        // Android
        elevation: 4,

        // iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    },
    informacoes: {
        flexDirection: 'row',
        textAlign: "center",
        marginLeft: 8,
        marginVertical: 16,
        marginRight: 16,
    },
});
