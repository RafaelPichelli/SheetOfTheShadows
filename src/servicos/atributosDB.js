import {db} from "./SQLite"


export function criaTabelaAtributos(){
    db.transaction(transaction => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " +
            "Atributos " +
            "( nome TEXT PRIMARY KEY, valor INTEGER, temModificador BOOLEAN);", [] , () => {
        }, (transaction, error) => {
            console.log("Erro ao criar tabela atributos:" + error.message);
        })
    })
}

export function criaAtributos() {
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Atributos (nome,valor,temModificador) VALUES ('Força', 10 , true);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Atributos (nome,valor,temModificador) VALUES ('Agilidade', 10 , true);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Atributos (nome,valor,temModificador) VALUES ('Intelecto', 10 , true);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Atributos (nome,valor,temModificador) VALUES ('Vontade', 10 , true);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Atributos (nome,valor,temModificador) VALUES ('Saúde', 10 , false);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Atributos (nome,valor,temModificador) VALUES ('Taxa de Cura', 5 , false);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Atributos (nome,valor,temModificador) VALUES ('Dano', 0 , false);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Atributos (nome,valor,temModificador) VALUES ('Defesa', 10 , false);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Atributos (nome,valor,temModificador) VALUES ('Percepção', 10 , true);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Atributos (nome,valor,temModificador) VALUES ('Deslocamento', 10 , false);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Atributos (nome,valor,temModificador) VALUES ('Insanidade', 0 , false);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Atributos (nome,valor,temModificador) VALUES ('Corrupção', 0 , false);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Atributos (nome,valor,temModificador) VALUES ('Poder', 0 , false);");
        })
        db.transaction(transaction => {
            transaction.executeSql("INSERT INTO Atributos (nome,valor,temModificador) VALUES ('Sorte', 0 , false);");
        })

        resolve("Atributos Criadoos");
    })
}

export async function buscaAtributo(nome){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("SELECT * FROM Atributos WHERE nome = ?;",
                [nome],
                (transaction, resultado)  => {
                resolve(resultado.rows._array);
            })
        })
    })
}

export async function buscaAtributos(){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("SELECT * FROM Atributos;", [],(transaction, resultado)  => {
                resolve(resultado.rows._array);
            })
        })
    })
}

export async function atualizaAtributo(atributo){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("UPDATE Atributos SET valor = ? WHERE nome = ?;",
                [atributo.valor, atributo.nome], ()  => {
                    resolve("Atributo atualizado com sucesso");
                })
        })
    })
}

export async function dropTableAtributos(){
    return new Promise((resolve) => {
        db.transaction(transaction => {
            transaction.executeSql("DROP TABLE Atributos;",
                [], ()  => {
                    resolve("Tabela Excluida");
                })
        })
    })
}
