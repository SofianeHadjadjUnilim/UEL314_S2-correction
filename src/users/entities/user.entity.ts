import { Table, Column, Model, AutoIncrement, PrimaryKey } from 'sequelize-typescript';

@Table
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  firstname: string;

  @Column
  lastname: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

}

export const usersProviders = [
    {
      provide: 'USERS_REPOSITORY',
      useValue: User,
    },
  ];