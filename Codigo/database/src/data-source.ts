import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Usuarios } from './entity/Usuarios';
import { Animais } from './entity/Animais';
import { Gestacoes } from './entity/Gestacoes';
import { MaoDeObra } from './entity/MaoDeObra';
import { Notificacoes } from './entity/Notificacoes';
import { Receita } from './entity/Receita';
import { Despesa } from './entity/Despesa';
import 'dotenv/config';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.POSTGRES_HOST,
	port: 5432,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DATABASE,
	synchronize: true,
	logging: false,
	entities: [Animais, Despesa, Gestacoes, MaoDeObra, Notificacoes, Receita, Usuarios],
	migrations: [],
	subscribers: [],
	ssl: true,
});
