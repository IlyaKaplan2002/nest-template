import { encrypt } from 'src/helpers/encryption';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', {
    unique: true,
    nullable: true,
  })
  username!: string | null;

  @Column('varchar', {
    nullable: true,
    unique: true,
    transformer: encrypt,
  })
  email!: string | null;

  @Column('varchar', {
    unique: false,
    nullable: true,
  })
  password!: string | null;
}
