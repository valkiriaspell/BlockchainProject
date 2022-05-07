import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Wallet } from "./wallet.model";

@Table
export class User extends Model {
    @Column
    userName: string;

    @Column({primaryKey: true, unique: true, allowNull: false})
    email: string;   
    
    @HasMany(() => Wallet)
    wallets: Wallet[]
}