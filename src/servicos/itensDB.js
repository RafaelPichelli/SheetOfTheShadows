import {db} from "./SQLite"


export function criaTabelaItens(){
    db.transaction(transaction => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " +
            "Itens" +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, quantidade INTEGER , temUsos BOOLEAN, usosRestantes INTEGER );", [] , () => {
        }, (transaction, error) => {
            console.log("Erro ao criar tabela itens:" + error.message);
        })
    })
}


export function criaDinheiro() {
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Itens (id,nome,quantidade,temUsos,usosRestantes) VALUES (1,'Ma',0,false,0);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Itens (id,nome,quantidade,temUsos,usosRestantes) VALUES (2,'Cc',0,false,0);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Itens (id,nome,quantidade,temUsos,usosRestantes) VALUES (3,'Xp',0,false,0);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Itens (id,nome,quantidade,temUsos,usosRestantes) VALUES (4,'Co',0,false,0);");
        })
        resolve("Itens Criadoos");
    })
}

export async function buscaDinheiro(){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("SELECT * FROM Itens WHERE id < 5;", [],(transaction, resultado)  => {
                resolve(resultado.rows._array);
            })
        })
    })
}
export async function buscaItens(){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("SELECT * FROM Itens WHERE id > 4;", [],(transaction, resultado)  => {
                resolve(resultado.rows._array);
            })
        })
    })
}

export async function adicionaItem(item){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Itens (nome, quantidade, temUsos, usosRestantes) VALUES (?, ?, ?,?);",
                [item.nome, item.quantidade, item.temUsos, item.usosRestantes], ()  => {
                    resolve("Item adicionado com sucesso");
                })
        })
    })
}

export async function atualizaMoeda(moeda){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("UPDATE Itens SET  quantidade = ? WHERE id = ?;",
                [moeda.quantidade, moeda.id], ()  => {
                    resolve("Moeda atualizado com sucesso");
                })
        })
    })
}
export async function atualizaItem(item){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("UPDATE Itens SET nome = ?, quantidade = ?, temUsos = ?, usosRestantes = ? WHERE id = ?;",
                [item.nome, item.quantidade,item.temUsos,item.usosRestantes, item.id], ()  => {
                    resolve("Item atualizado com sucesso");
                })
        })
    })
}

export async function removeItem(idItem){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("DELETE FROM Itens WHERE id = ?;",
                [idItem], ()  => {
                    resolve("Item removido com sucesso");
                })
        })
    })
}

export async function dropTableItens(){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("DROP TABLE Itens;",
                [], ()  => {
                    resolve("Tabela Excluida");
                })
        })
    })
}


