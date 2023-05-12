import {db} from "./SQLite"


export function criaTabelaAtaques() {
    db.transaction(transaction => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " +
            "Ataques " +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, distancia TEXT, atributo TEXT, vanDesv TEXT, dano TEXT, critico TEXT, efeito TEXT);", [], () => {
        }, (transaction, error) => {
            console.log("Erro ao criar tabela Ataques:" + error.message);
        })
    })
}

export async function buscaAtaques() {
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("SELECT * FROM Ataques;", [], (transaction, resultado) => {
                resolve(resultado.rows._array);
            })
        })
    })
}

export async function buscaAtaquesPorDistancia(distancia) {
    if (distancia == "À distância") {
        return new Promise((resolve) => {
            db.transaction(transaction => {
                transaction.executeSql("SELECT * FROM Ataques WHERE distancia != 'Corpo a corpo';", [],(transaction, resultado)  => {
                    resolve(resultado.rows._array);
                })
            })
        })
    } else {
        return new Promise((resolve) => {
            db.transaction(transaction => {
                transaction.executeSql("SELECT * FROM Ataques WHERE distancia = ?;", [distancia], (transaction, resultado) => {
                    resolve(resultado.rows._array);
                })
            })
        })
    }
}

export async function adicionaAtaque(ataque) {
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Ataques (nome, distancia, atributo, vanDesv, dano, critico, efeito) VALUES (?,?,?,?,?,?,?);",
                [ataque.nome,ataque.distancia,ataque.atributo,ataque.vanDesv,ataque.dano,ataque.critico,ataque.efeito], () => {
                    resolve("Ataque adicionado com sucesso");
                })
        })
    })
}

export async function atualizaAtaque(ataque) {
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("UPDATE Ataques SET nome = ?, distancia = ?, atributo = ?, vanDesv = ?, dano = ?, critico = ?, efeito = ? WHERE id = ?;",
                [ataque.nome,ataque.distancia,ataque.atributo,ataque.vanDesv,ataque.dano,ataque.critico,ataque.efeito, ataque.id], () => {
                    resolve("Ataque atualizado com sucesso");
                })
        })
    })
}

export async function removeAtaque(idAtaque) {
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("DELETE FROM Ataques WHERE id = ?;",
                [idAtaque], () => {
                    resolve("Ataque removido com sucesso");
                })
        })
    })
}

export async function dropTableAtaques() {
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("DROP TABLE Ataques;",
                [], () => {
                    resolve("Tabela Excluida");
                })
        })
    })
}


