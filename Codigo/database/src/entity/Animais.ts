import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Gestacoes } from "./Gestacoes";

@Entity()
export class Animais {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", length: 280 })
	nome: string;

	@Column({ type: "int", nullable: true })
	crias: number;

	@Column({ type: "boolean" })
	lactante: boolean;

	@Column({ type: "int", nullable: true })
	num_insem: number;

	@Column({ type: "date", nullable: true })
	primeira_ia: Date;

	@OneToMany(() => Gestacoes, (gestacao) => gestacao.animal)
	gestacoes: Gestacoes[];
}
