import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useMemo} from "react";
import Texto from "../../../componentes/Texto";

const formatMod = (atr, forAgi) => {
    let valorMod;
    if (atr == "Força") {
        valorMod =  forAgi[0].valor - 10;
    } else if (atr == "Agilidade") {
        valorMod = forAgi[1].valor - 10;
    }

    if (valorMod > 0) {
        return ` (+${valorMod})`;
    } else {
        return ` (${valorMod})`;
    }
}

export default function Ataque({ataque, forcaAgilidade, setSelecionado}) {
    const modificadorTexto = useMemo(
        () => formatMod(ataque.atributo, forcaAgilidade),
        [forcaAgilidade]
    );

    return <TouchableOpacity style={estilos.cartao} onPress ={() => setSelecionado(ataque)}>
        <View style={estilos.informacoes}>
            <Texto style={estilos.nome}>{`${ataque.nome}`}</Texto>

            <View style={{flexDirection: "row"}}>
                <Texto style={estilos.descritores}>{`Distancia: `}</Texto>
                <Texto style={estilos.detalhes}>{`${ataque.distancia}`}</Texto>
            </View>

            <View style={{flexDirection: "row"}}>
                <Texto style={estilos.descritores}>{`Atributo: `}</Texto>
                <Texto style={estilos.detalhes}>{`${ataque.atributo} ${modificadorTexto}`}</Texto>
            </View>

            {ataque.vanDesv != "" ?
                <View style={{flexDirection: "row"}}>
                    <Texto style={estilos.descritores}>{`Dadivas/Perdições: `}</Texto>
                    <Texto style={estilos.detalhes}>{`${ataque.vanDesv}`}</Texto>
                </View>
                : <></>
            }
            <View style={{flexDirection: "row"}}>
                <Texto style={estilos.descritores}>{`Dano: `}</Texto>
                <Texto style={estilos.detalhes}>{`${ataque.dano}`}</Texto>
            </View>

            {ataque.critico != "" ?
                <View style={{flexDirection: "row"}}>
                    <Texto style={estilos.descritores}>{`20+: `}</Texto>
                    <Texto style={estilos.detalhes}>{`${ataque.critico}`}</Texto>
                </View>
                : <></>
            }
            {ataque.efeito != "" ?
                <View style={{flexDirection: "row"}}>
                    <Texto style={estilos.descritores}>{`Efeito: `}</Texto>
                    <Texto style={estilos.detalhes}>{`${ataque.efeito}`}</Texto>
                </View>
                : <></>
            }
        </View>
    </TouchableOpacity>
}

const estilos = StyleSheet.create({
    cartao: {
        backgroundColor: '#ad0606',
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 6,
        flexDirection: "row",
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
        marginLeft: 8,
        marginVertical: 16,
        flex: 1,
    },
    nome: {
        fontSize: 32,
        lineHeight: 34,
        textAlign: "center",
        color: '#000',
    },
    descritores: {
        fontSize: 28,
        lineHeight: 28,
        color: '#000',
    },
    detalhes: {
        fontSize: 24,
        lineHeight: 26,
        flex: 1,
        color: '#000',
    }
});
