import {db} from "./SQLite"


export function criaTabelaMagias(){
    db.transaction(transaction => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " +
            "Magias " +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, tipo TEXT, nivel INTEGER , tradicao TEXT, alvo TEXT, dano TEXT, critico TEXT, efeito TEXT, descricao TEXT, duracao TEXT, conjuracoes INTEGER);", [] , () => {
        }, (transaction, error) => {
            console.log("Erro ao criar tabela magias:" + error.message);
        })
    })
}

export async function buscaMagias(){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("SELECT * FROM Magias;", [],(transaction, resultado)  => {
                resolve(resultado.rows._array);
            })
        })
    })
}

export async function buscaMagiaPorTipo(tipo){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("SELECT * FROM Magias WHERE tipo = ?;", [tipo],(transaction, resultado)  => {
                resolve(resultado.rows._array);
            })
        })
    })
}

export async function adicionaMagia(magia){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Magias (nome, tipo, nivel, tradicao, alvo, dano, critico, efeito , descricao, duracao, conjuracoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                [magia.nome, magia.tipo, magia.nivel, magia.tradicao, magia.alvo, magia.dano, magia.critico, magia.efeito, magia.descricao, magia.duracao, magia.conjuracoes], ()  => {
                    resolve("Magia adicionada com sucesso");
                })
        })
    })
}

export async function atualizaMagia(magia){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("UPDATE Magias SET nome = ?, tipo = ?, nivel = ?, tradicao = ?, alvo = ?, dano = ?, critico = ?, efeito = ? , descricao = ?, duracao = ?, conjuracoes = ? WHERE id = ?;",
                [magia.nome, magia.tipo, magia.nivel, magia.tradicao, magia.alvo, magia.dano, magia.critico, magia.efeito, magia.descricao, magia.duracao, magia.conjuracoes, magia.id], ()  => {
                    resolve("Magia atualizada com sucesso");
                })
        })
    })
}

export async function removeMagia(idMagia){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("DELETE FROM Magias WHERE id = ?;",
                [idMagia], ()  => {
                    resolve("Magia removida com sucesso");
                })
        })
    })
}

export async function dropTableMagias(){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("DROP TABLE Magias;",
                [], ()  => {
                    resolve("Tabela Excluida");
                })
        })
    })
}


