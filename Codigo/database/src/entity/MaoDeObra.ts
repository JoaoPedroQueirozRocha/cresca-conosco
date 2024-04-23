import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MaoDeObra {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 280, nullable: false })
	nnome: string;

	@Column({ type: 'decimal', nullable: false })
	salario: number;

	@Column({ type: 'varchar', length: 280, nullable: true })
	descricao: string;
}
