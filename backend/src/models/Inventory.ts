import {Table, Column, Model, DataType} from 'sequelize-typescript';

@Table({
    tableName: 'inventories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})
export class Inventory extends Model {

    @Column({
        type: DataType.UUID,
        allowNull: false,
        defaultValue: DataType.UUIDV4,
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