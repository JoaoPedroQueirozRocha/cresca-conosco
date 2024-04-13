const components = {
    schemas: {
        Animal: {
            type: "object",
            properties: {
                nome: { type: "string" },
                crias: { type: "number" },
                proxima_insem: { type: "date" },
                num_insem: { type: "number" },
                dias_parida: { type: "number" },
                lactante: { type: "boolean" }
            },
            required: ["nome", "crias", "num_insem", "dias_parida", "lactante"],
            example: {
                nome: "Mumuzinha",
                crias: 2,
                proxima_insem: "2024-02-09",
                num_insem: 1,
                dias_parida: 10,
                lactante: true
            }
        },
        Gestacao: {
            type: "object",
            properties: {
                nome_animal: { type: "string" },
                status: { type: "string" },
                prev_parto: { type: "date" },
                semem: { type: "string" },
                data_insem: { type: "date" },
                data_conclusao: { type: "date" }
            },
            required: ["nome_animal", "status", "semem", "data_insem"],
            example: {
                nome_animal: "Mumuzinha",
                status: "concluida",
                prev_parto: "2024-02-09",
                semem: "5/8",
                data_insem: "2024-02-09",
                data_conclusao: "2024-02-09"
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
                data: { type: "date" }
            },
            required: ["valor", "descricao", "tipo"],
            example: {
                valor: 400.0,
                descricao: "Entrega de leite",
                tipo: "leite",
                data: "2024-02-09"
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

