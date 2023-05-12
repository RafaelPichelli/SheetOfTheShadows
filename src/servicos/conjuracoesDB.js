import {db} from "./SQLite"


export function criaTabelaConjuracoes(){
    db.transaction(transaction => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " +
            "Conjuracoes " +
            "(poder INTEGER PRIMARY KEY, nivel_0 INTEGER, nivel_1 INTEGER, nivel_2 INTEGER, nivel_3 INTEGER, nivel_4 INTEGER, nivel_5 INTEGER, nivel_6 INTEGER, nivel_7 INTEGER, nivel_8 INTEGER, nivel_9 INTEGER, nivel_10 INTEGER);", [] , () => {
        }, (transaction, error) => {
            console.log("Erro ao criar tabela conjuracoes:" + error.message);
        })
    })
}

export function criaConjuracoes() {
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Conjuracoes (poder,nivel_0,nivel_1,nivel_2,nivel_3,nivel_4,nivel_5,nivel_6,nivel_7,nivel_8,nivel_9,nivel_10) VALUES (0,1,0,0,0,0,0,0,0,0,0,0);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Conjuracoes (poder,nivel_0,nivel_1,nivel_2,nivel_3,nivel_4,nivel_5,nivel_6,nivel_7,nivel_8,nivel_9,nivel_10) VALUES (1,2,1,0,0,0,0,0,0,0,0,0);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Conjuracoes (poder,nivel_0,nivel_1,nivel_2,nivel_3,nivel_4,nivel_5,nivel_6,nivel_7,nivel_8,nivel_9,nivel_10) VALUES (2,3,2,1,0,0,0,0,0,0,0,0);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Conjuracoes (poder,nivel_0,nivel_1,nivel_2,nivel_3,nivel_4,nivel_5,nivel_6,nivel_7,nivel_8,nivel_9,nivel_10) VALUES (3,4,2,1,1,0,0,0,0,0,0,0);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Conjuracoes (poder,nivel_0,nivel_1,nivel_2,nivel_3,nivel_4,nivel_5,nivel_6,nivel_7,nivel_8,nivel_9,nivel_10) VALUES (4,5,2,2,1,1,0,0,0,0,0,0);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Conjuracoes (poder,nivel_0,nivel_1,nivel_2,nivel_3,nivel_4,nivel_5,nivel_6,nivel_7,nivel_8,nivel_9,nivel_10) VALUES (5,6,3,2,2,1,1,0,0,0,0,0);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Conjuracoes (poder,nivel_0,nivel_1,nivel_2,nivel_3,nivel_4,nivel_5,nivel_6,nivel_7,nivel_8,nivel_9,nivel_10) VALUES (6,7,3,2,2,2,1,1,0,0,0,0);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Conjuracoes (poder,nivel_0,nivel_1,nivel_2,nivel_3,nivel_4,nivel_5,nivel_6,nivel_7,nivel_8,nivel_9,nivel_10) VALUES (7,8,3,2,2,2,1,1,1,0,0,0);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Conjuracoes (poder,nivel_0,nivel_1,nivel_2,nivel_3,nivel_4,nivel_5,nivel_6,nivel_7,nivel_8,nivel_9,nivel_10) VALUES (8,9,3,3,2,2,2,1,1,1,0,0);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Conjuracoes (poder,nivel_0,nivel_1,nivel_2,nivel_3,nivel_4,nivel_5,nivel_6,nivel_7,nivel_8,nivel_9,nivel_10) VALUES (9,10,3,3,3,2,2,1,1,1,1,0);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Conjuracoes (poder,nivel_0,nivel_1,nivel_2,nivel_3,nivel_4,nivel_5,nivel_6,nivel_7,nivel_8,nivel_9,nivel_10) VALUES (10,11,3,3,3,3,2,1,1,1,1,1);");
        })
        resolve("Conjuracoes Criadas");
    })
}

export async function buscaConjuracoes(){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("SELECT * FROM Conjuracoes;", [],(transaction, resultado)  => {
                resolve(resultado.rows._array);
            })
        })
    })
}

export async function dropTableConjuracoes(){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("DROP TABLE Conjuracoes;",
                [], ()  => {
                    resolve("Tabela Excluida");
                })
        })
    })
}


