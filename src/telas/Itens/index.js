import Topo from "../../componentes/Topo";
import { FlatList, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import Texto from "../../componentes/Texto";
import Item from "./componentes/Item";
import {buscaDinheiro, buscaItens, dropTableItens} from "../../servicos/itensDB";
import Dinheiro from "./componentes/Dinheiro";
import ModalDinheiro from "./componentes/ModalDinheiro";
import ModalItens from "./componentes/Modaltens";

export default function Itens() {
  const tituloInventario = "Inventario";
  const [listaItens, setListaItens] = useState([]);
  const [listaMoedas, setListaMoedas] = useState([]);
  const [moedaSelecionada, setMoedaSelecionada] = useState(["","","","",""])
  const [itemSelecionado, setItemSelecionado] = useState(["","","","",""])


  useEffect(() =>{
    carregaMoedas()
    carregaItens()

  }, [])

  async function carregaMoedas() {
    const todasMoedas = await buscaDinheiro();
    setListaMoedas(todasMoedas)
  }

  async function carregaItens() {
    const todosItens = await buscaItens();
    setListaItens(todosItens)
  }

  const TopoLista = () => {
    return <>
      <Dinheiro listaItens={listaMoedas} setMoedaSelecionada = {setMoedaSelecionada}/>
      <Texto style={estilos.titulo}>{tituloInventario}</Texto>
      <ModalDinheiro listaMoedas={listaMoedas} moedaSelecionada={moedaSelecionada} setMoedaSelecionada={setMoedaSelecionada} setMoedas={carregaMoedas}/>
      <ModalItens selecionado={itemSelecionado} setSelecionado={setItemSelecionado} setItens={carregaItens}/>
    </>
  }

  return <FlatList
      data={listaItens}
      renderItem={
        ({ item }) => <Item{...item} setSelecionado={setItemSelecionado} />
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

