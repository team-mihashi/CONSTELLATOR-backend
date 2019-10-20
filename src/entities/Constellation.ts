import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Length } from 'class-validator';

import Line from './Line';

interface ConstellationInterface {
  name: string;
  description: string;
  lines: Line[] | undefined;
}

@Entity()
class Constellation {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ name: 'name', type: 'varchar' })
  @Length(2, 20)
  name: string;

  @Column({ name: 'description', type: 'varchar' })
  @Length(2, 100)
  description: string;

  @Column({ name: 'created_at' })
  @CreateDateColumn()
  readonly createdAt!: Date;

  @OneToMany(type => Line, line => line.constellation, { cascade: true })
  @JoinTable()
  lines?: Line[];

  constructor(obj?: ConstellationInterface) {
    this.name = (obj && obj.name) || '';
    this.description = (obj && obj.description) || '';
    this.lines = (obj && obj.lines) || undefined;
  }
}

export default Constellation;
