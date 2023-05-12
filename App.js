import {StatusBar, StyleSheet, View} from 'react-native';
import { criaAtributos, criaTabelaAtributos } from "./src/servicos/atributosDB";
import {useEffect, useState} from "react";
import {useFonts} from "expo-font";
import {criaTabelaTalentos} from "./src/servicos/talentosDB";
import AppRotas from "./src/rotas/AppRotas";
import {SafeAreaView} from "react-native-safe-area-context";
import {criaDinheiro, criaTabelaItens} from "./src/servicos/itensDB";
import {criaTabelaMagias} from "./src/servicos/magiasDB";
import {criaConjuracoes, criaTabelaConjuracoes} from "./src/servicos/conjuracoesDB";
import {criaTabelaAtaques} from "./src/servicos/ataquesDB";
import {buscaGerais, criaGerais, criaTabelaGerais} from "./src/servicos/geraisDB";
import carregaGerais from "./src/componentes/Topo";
import Topo from "./src/componentes/Topo";

export default function App() {

  const [fontsLoaded] = useFonts({
    'Delicious-Handrawn': require('./assets/fonts/DeliciousHandrawn-Regular.ttf'),
  });
  const [pronto, setPronto] = useState(false)

  useEffect(() => {

    async function carregaDados() {
      try {
        criaTabelaGerais();
        criaGerais();
        criaTabelaAtributos();
        criaAtributos();
        criaTabelaTalentos();
        criaTabelaItens();
        criaDinheiro();
        criaTabelaMagias();
        criaTabelaConjuracoes();
        criaConjuracoes();
        criaTabelaAtaques();

      } catch (e){
        console.warn(e)
      }finally {
        setPronto(true)
      }
    }
    carregaDados()
  },[])


  if(!fontsLoaded || !pronto){
    return <View/>
  }

  return (<SafeAreaView style={{flex: 1}}>
    <StatusBar />
    <Topo/>
    <AppRotas/>
  </SafeAreaView>)


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
