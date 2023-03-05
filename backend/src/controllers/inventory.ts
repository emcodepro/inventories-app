import {RequestHandler} from 'express';

import {Inventory} from '../models/Inventory';


export const list: RequestHandler = async (req, res, next) => {
    const inventories: Inventory[] = await Inventory.findAll({
        order: [['created_at', 'DESC']], // Order by created_at in descending order
    });

    return res.status(200).json(inventories);
};

export const create: RequestHandler = async (req, res, next) => {
    try {
        const inventory = await Inventory.create({ ...req.body });
        return res
            .status(201)
            .json(inventory);
    } catch (error) {
        return res
            .status(400)
            .json({
                message: 'Error',
                data: error
            });
    }
};

export const destroy: RequestHandler = async (req, res, next) => {
    const { guid } = req.params;

    try {
        const inventoryToDelete = await Inventory.findByPk(guid);

        if (!inventoryToDelete) {
            return res.status(400).json({
                message: 'Inventory not found'
            });
        }

        await Inventory.destroy({ where: { guid } });

        return res.status(204).end();
    } catch (error) {
        return res
            .status(400)
            .json({
                message: 'Error',
                data: error
            });
    }
};