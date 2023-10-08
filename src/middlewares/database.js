import fs from 'node:fs/promises';

const databasePath = new URL('db.json', import.meta.url);

export class Database {
    #database = {};

    constructor() {
        this.loadData();
    }

    async loadData() {
        try {
            const data = await fs.readFile(databasePath, 'utf8');
            this.#database = JSON.parse(data);
        } catch (error) {
            this.#database = {};
        }
    }

    async #persist() {
        await fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    select(table, search) {
        let data = this.#database[table] ?? [];
        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].includes(value)
                })
            })
        }
        return data;
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }
        this.#persist();
    }

    async delete(table, id) {
        if (Array.isArray(this.#database[table])) {
            const rowIndex = this.#database[table].findIndex(row => row.id === id);
            if (rowIndex > -1) {
                this.#database[table].splice(rowIndex, 1);
                await this.#persist();
            } else {
                console.log(`ID '${id}' não encontrado na tabela '${table}'`);
            }
        } else {
            console.log(`Tabela '${table}' não encontrada no banco de dados`);
        }
    }}
