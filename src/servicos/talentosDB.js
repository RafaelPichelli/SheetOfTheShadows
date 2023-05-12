import {db} from "./SQLite"


export function criaTabelaTalentos(){
    db.transaction(transaction => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " +
            "Talentos " +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, efeito TEXT , tipo TEXT, usadoEmCombate BOOLEAN );", [] , () => {
        }, (transaction, error) => {
            console.log("Erro ao criar tabela talentos:" + error.message);
        })
    })
}

export async function buscaTalentos(){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("SELECT * FROM Talentos;", [],(transaction, resultado)  => {
                resolve(resultado.rows._array);
            })
        })
    })
}

export async function buscaTalentosPorTipo(tipo){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("SELECT * FROM Talentos WHERE tipo = ?;", [tipo],(transaction, resultado)  => {
                resolve(resultado.rows._array);
            })
        })
    })
}

export async function buscaTalentosCombate(){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("SELECT * FROM Talentos WHERE usadoEmCombate = true;", [],(transaction, resultado)  => {
                resolve(resultado.rows._array);
            })
        })
    })
}

export async function adicionaTalento(talento){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Talentos (nome, efeito, tipo, usadoEmCombate) VALUES (?, ?, ?, ?);",
                [talento.nome, talento.efeito, talento.tipo, talento.usadoEmCombate], ()  => {
                    resolve("Talento adicionado com sucesso");
                })
        })
    })
}

export async function atualizaTalento(talento){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("UPDATE Talentos SET nome = ?, efeito = ?, tipo = ?, usadoEmCombate = ? WHERE id = ?;",
                [talento.nome, talento.efeito,talento.tipo, talento.usadoEmCombate,talento.id], ()  => {
                    resolve("Talento atualizado com sucesso");
                })
        })
    })
}

export async function removeTalento(idTalento){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("DELETE FROM Talentos WHERE id = ?;",
                [idTalento], ()  => {
                    resolve("Talento removido com sucesso");
                })
        })
    })
}

export async function dropTableTalentos(){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("DROP TABLE Talentos;",
                [], ()  => {
                    resolve("Tabela Excluida");
                })
        })
    })
}


