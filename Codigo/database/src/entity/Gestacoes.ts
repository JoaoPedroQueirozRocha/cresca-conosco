import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Animais } from './Animais';

export enum GestacaoStatus {
	PENDENTE = 'pendente',
	CONFIRMADA = 'confirmada',
	CONCLUIDA = 'concluida',
	FALHOU = 'falhou',
}

export enum TouroType {
	GIROLANDO = '5/8',
	GIR = 'gir',
	NELORE = 'nelore',
	TOURO = 'touro',
}

@Entity()
export class Gestacoes {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'enum', enum: GestacaoStatus })
	status: GestacaoStatus;

	@Column({ type: 'enum', enum: TouroType })
	touro: TouroType;

	@Column({ type: 'date', nullable: true })
	prev_parto: Date;

	@Column({ type: 'date', nullable: true })
	data_insem: Date;

	@Column({ type: 'date', nullable: true })
	data_finalizacao: Date;

	@ManyToOne(() => Animais, (animal) => animal.gestacoes)
	@JoinColumn({ name: 'animal_id' })
	animal: Animais;
}