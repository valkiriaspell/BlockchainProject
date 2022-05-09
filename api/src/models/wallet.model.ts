import { BelongsTo, BelongsToMany, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";

@Table
export class Wallet extends Model {
    @Column({primaryKey: true, allowNull: false})
    address: string;   

    @ForeignKey(() => User)
    @Column
    email: string

    @BelongsTo(() => User)
    user: User
}