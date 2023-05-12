import Topo from "../../componentes/Topo";
import { FlatList, StyleSheet, View } from "react-native";
import React, {useEffect, useState} from "react";
import Texto from "../../componentes/Texto";
import ModalAtributos from "../../componentes/ModalAtributos";;
import {buscaAtributo} from "../../servicos/atributosDB";
import AtrAux from "./componentes/AtrAux";
import {useFocusEffect} from "@react-navigation/native";
import {adicionaMagia, buscaMagias, dropTableMagias} from "../../servicos/magiasDB";
import Magia from "./componentes/Magia";
import {buscaConjuracoes} from "../../servicos/conjuracoesDB";
import ModalMagias from "./componentes/ModalMagias";

export default function Magias(){

  const [listaMagias, setListaMagias] = useState([])
  const [magiaSelecionada, setMagiaSelecionada] = useState([])
  const [atrSelecionado, setAtrSelecionado] = useState(["","",""]);
  const [listaAtr, setListaAtr] = useState([])
  const [listaConj, setListaConj] = useState([])
  let atrPronto
  let conjuracoes
  const [pronto ,setPronto] = useState(false)

  useFocusEffect(
      React.useCallback(() => {
        let isActive = true;

        async function carregar() {
          if (isActive){
            atrPronto = carregaAtributos();
          }
        await Promise.all([atrPronto, conjuracoes]);
        }

        carregar();
        setPronto(true)
        return () => {
          isActive = false;
        };
      }, [])
  );

  useEffect( () => {
    carregaMagias();
  },[])


  useEffect( () => {
   conjuracoes = carregaConjuracoes();
  },[])

  async function carregaAtributos() {
    let todosAtributos = await buscaAtributo("Poder");
    todosAtributos.push((await buscaAtributo("Defesa"))[0]);
    todosAtributos.push((await buscaAtributo("Saúde"))[0]);
    todosAtributos.push((await buscaAtributo("Dano"))[0]);

    setListaAtr(todosAtributos)
  }

  async function carregaMagias(){
    const todasMagias = await buscaMagias();

    //console.log(todasMagias)
    setListaMagias(todasMagias);
  }

  async function carregaConjuracoes(){
    const todasConj = await buscaConjuracoes();

    setListaConj(todasConj);
  }

  const TopoLista = () => {
    return <>
      <AtrAux listaAtr={listaAtr} setAtrSelecionado={setAtrSelecionado} />
      <ModalAtributos atrSelecionado={atrSelecionado} setAtrSelecionado={setAtrSelecionado} setAtributos={carregaAtributos}/>
      <Texto style={estilos.titulo}>Magias</Texto>
      <ModalMagias selecionado={magiaSelecionada} setSelecionado={setMagiaSelecionada} setMagias={carregaMagias}/>
    </>
  }

  if (!pronto){
    return <View/>
  }

  return <FlatList
    data={listaMagias}
    renderItem={
      ({ item }) => <Magia magia={item} listaConj={listaAtr[0] != undefined ? listaConj[listaAtr[0].valor] : listaConj[0]} setMagiaSelecionada={setMagiaSelecionada}/>
    }
    keyExtractor={({ id }) => id}
    ListHeaderComponent={TopoLista}
    style={estilos.lista} />

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
  }
})
