import React, { useEffect, useState } from "react";
import { Modal, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import Texto from "./Texto";
import {Picker} from "@react-native-picker/picker";
import {adicionaTalento, atualizaTalento, removeTalento} from "../servicos/talentosDB";
import {Checkbox} from "expo-checkbox";
export default function ModalTalentos({selecionado, setSelecionado, setTalentos}) {
  useEffect(() =>{
    if (selecionado[0] != ""){
      preencheModal()
      setTalentoParaAtualizar(true)
      setModalVisivel(true)
      return
    }
    setTalentoParaAtualizar(false)
  },[selecionado])

  const [nome,setNome] = useState("")
  const [efeito, setEfeito] = useState("")
  const [tipo,setTipo] = useState("Utilidade")
  const [usadoCombate, setUsadoCombate] = useState(false)
  const [modalVisivel, setModalVisivel] = useState(false)
  const [talentoParaAtualizar, setTalentoParaAtualizar] = useState(false)
  async function salvaTalento(){
    const talento = {
      nome: nome,
      efeito: efeito,
      tipo: tipo,
      usadoEmCombate: usadoCombate
    }
    await adicionaTalento(talento);
    setTalentos();
    fechaModal();
  }

  async function modificaTalento() {
    const talento = {
      nome: nome,
      efeito: efeito,
      tipo: tipo,
      usadoEmCombate: usadoCombate,
      id: selecionado[0]
    };
    await atualizaTalento(talento);
    setTalentos();
    fechaModal();
  }

  async function deletaTalento(){
    await removeTalento(selecionado[0]);
    setTalentos();
    fechaModal();
  }

  function preencheModal(){
    setNome(selecionado[1])
    setEfeito(selecionado[2])
    setTipo(selecionado[3])
    setUsadoCombate(selecionado[4])
  }

  function fechaModal(){
    setNome("")
    setEfeito("")
    setTipo("Utilidade");
    setUsadoCombate(false)
    setSelecionado(["","","","",""])
    setModalVisivel(false)
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
              { talentoParaAtualizar ?
                <Texto style={estilos.modalTitulo}>Editar Talento</Texto>
                  : <Texto style={estilos.modalTitulo}>Criar novo talento</Texto>
              }
              <Texto style={estilos.modalSubTitulo}>Nome do Talento</Texto>
              <TextInput
                style={estilos.modalInput}
                onChangeText={novoNome => setNome(novoNome)}
                placeholder="Digite um nome para o talento"
                value={nome}/>
              <Texto style={estilos.modalSubTitulo}>Efeito do talento</Texto>
              <TextInput
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={3}
                onChangeText={novoEfeito => setEfeito(novoEfeito)}
                placeholder="Digite o efeito do talento"
                value={efeito}/>
              <Texto style={estilos.modalSubTitulo}>Selecione o tipo</Texto>
              <View style={estilos.modalPicker}>
                <Picker
                    selectedValue={tipo}
                    onValueChange={novoTipo => setTipo(novoTipo)}>
                  <Picker.Item label= "Utilidade" value="Utilidade"/>
                  <Picker.Item label= "Ataque" value="Ataque"/>
                </Picker>
              </View>
              <Texto style={estilos.modalSubTituloCentral}>Aparece na aba combate ?</Texto>
              <Checkbox
                  style={estilos.checkbox}
                  value={usadoCombate}
                  onValueChange={setUsadoCombate}
                  color={usadoCombate ? '#ad0606' : undefined}
              />
              <View style={estilos.modalBotoes}>
                <TouchableOpacity style={estilos.modalBotaoSalvar} onPress={() => {
                  talentoParaAtualizar ? modificaTalento() : salvaTalento()}}>
                  <Texto style={estilos.modalBotaoTexto}>Salvar</Texto>
                </TouchableOpacity>
                { talentoParaAtualizar ?
                  <TouchableOpacity style={estilos.modalBotaoDeletar} onPress={() => {deletaTalento()}}>
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
          <Texto style={estilos.textoNovoTalento}>Criar novo talento</Texto>
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
  modalBotoes: {
    flexDirection: "row",
    justifyContent: "space-between"
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
  modalSubTituloCentral: {
    fontSize: 22,
    marginBottom: 8,
    fontWeight: "600",
    color: "#000",
    textAlign: "center"
  },
  checkbox: {
    margin: 8,
    alignSelf:"center"
  },
});
