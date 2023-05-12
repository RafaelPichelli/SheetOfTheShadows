import {db} from "./SQLite"


export function criaTabelaGerais(){
    db.transaction(transaction => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " +
            "Gerais " +
            "( nome TEXT PRIMARY KEY, texto TETX);", [] , () => {
        }, (transaction, error) => {
            console.log("Erro ao criar tabela Gerais:" + error.message);
        })
    })
}

export function criaGerais() {
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Gerais (nome,texto) VALUES ('nomeDoPersonagem', 'Nome do Personagem');");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Gerais (nome,texto) VALUES ('nivelDoPersonagem', '0');");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Gerais (nome,texto) VALUES ('ancesDoPersonagem', 'ancestralidade');");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Gerais (nome,texto) VALUES ('classeDoPersonagem', 'Classe');");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Gerais (nome,texto) VALUES ('Sorte', '0');");
        })
        resolve("Gerais Criadoos");
    })
}

export async function buscaGeral(nome){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("SELECT * FROM Gerais WHERE nome = ?;",
                [nome],
                (transaction, resultado)  => {
                    resolve(resultado.rows._array);
                })
        })
    })
}

export async function buscaGerais(){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("SELECT * FROM Gerais;", [],(transaction, resultado)  => {
                resolve(resultado.rows._array);
            })
        })
    })
}

export async function atualizaGeral(geral){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("UPDATE Gerais SET texto = ? WHERE nome = ?;",
                [geral.texto, geral.nome], ()  => {
                    resolve("Geral atualizado com sucesso");
                })
        })
    })
}

export async function dropTableGerais(){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("DROP TABLE Gerais;",
                [], ()  => {
                    resolve("Tabela Excluida");
                })
        })
    })
}
