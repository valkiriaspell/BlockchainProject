import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";

@Table
export class Wallet extends Model {
    @Column({primaryKey: true, unique: true, allowNull: false})
    address: string;   

    @ForeignKey(() => User)
    @Column
    userEmail: string

    @BelongsTo(() => User)
    user: User
}