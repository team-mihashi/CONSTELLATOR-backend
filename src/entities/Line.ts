import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import Constellation from './Constellation';

interface LineInterface {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  constellation?: Constellation | undefined;
}

@Entity()
class Line {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ name: 'start_x', type: 'float' })
  startX: number;

  @Column({ name: 'start_y', type: 'float' })
  startY: number;

  @Column({ name: 'end_x', type: 'float' })
  endX: number;

  @Column({ name: 'end_y', type: 'float' })
  endY: number;

  @ManyToOne(type => Constellation, constellation => constellation.lines)
  constellation?: Constellation | undefined;

  constructor(obj: LineInterface) {
    this.startX = obj && obj.startX;
    this.startY = obj && obj.startY;
    this.endX = obj && obj.endX;
    this.endY = obj && obj.endY;
    this.constellation = obj && obj.constellation;
  }
}

export default Line;
