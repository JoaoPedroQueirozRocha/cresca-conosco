const components = {
    schemas: {
        Animal: {
            type: "object",
            properties: {
                nome: { type: "string" },
                crias: { type: "number" },
                num_insem: { type: "number" },
                dias_parida: { type: "number" },
                lactante: { type: "boolean" },
                primeira_ia: { type: "date" }
            },
            required: ["nome", "crias", "num_insem", "dias_parida", "lactante", "primeira_ia"],
            example: {
                nome: "Mumuzinha",
                crias: 2,
                num_insem: 1,
                dias_parida: 10,
                lactante: true,
                primeira_ia: "2024-02-09"
            }
        },
        Gestacao: {
            type: "object",
            properties: {
                animal_id: { type: "number" },
                status: { type: "string", enum: ["pendente", "confirmada", "concluida", "falhou"] },
                prev_parto: { type: "date" },
                touro: { type: "string", enum: ["5/8", "gir", "boi"] },
                data_insem: { type: "date" },
                data_conclusao: { type: "date" }
            },
            required: ["animal_id", "status", "touro", "data_insem"],
            example: {
                animal_id: 30,
                status: "pendente",
                prev_parto: "2024-02-09",
                semem: "5/8",
                data_insem: "2024-02-09",
                data_conclusao: "2024-10-09"
            }
        },
        Despesa: {
            type: "object",
            properties: {
                id: { type: "string" },
                valor: { type: "number" },
                descricao: { type: "string" },
                tipo: {
                    type: "string",
                    enum: ["compras", "despesas trabalhistas", "diverso"]
                },
                data_despesa: { type: "date" }
            },
            required: ["valor", "descricao", "tipo"],
            example: {
                valor: 150.0,
                descricao: "Compra de equipamentos",
                tipo: "compras",
                data_despesa: "2024-02-09"
            }
        },
        Receita: {
            type: "object",
            properties: {
                id: { type: "string" },
                valor: { type: "number" },
                descricao: { type: "string" },
                tipo: {
                    type: "string",
                    enum: ["leite", "venda", "diverso"]
                },
                data_receita: { type: "date" }
            },
            required: ["valor", "descricao", "tipo"],
            example: {
                valor: 400.0,
                descricao: "Entrega de leite",
                tipo: "leite",
                data_receita: "2024-02-09"
            }
        },
        Mao_de_obra: {
            type: "object",
            properties: {
                nome: { type: "string" },
                salario: { type: "number" },
                descricao: { type: "string" }
            },
            required: ["nome", "salario"],
            example: {
                nome: "João",
                salario: 1500.0,
                descricao: "Trabalha na fazenda"
            }
        },

    },
};

export default components;

