import {Table, Column, Model, DataType} from 'sequelize-typescript';

@Table({
    tableName: 'inventories',
    timestamps: false
})
export class Inventory extends Model {

    @Column({
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,
    })
    guid!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    place!: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    price!: string;
}