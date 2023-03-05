import {Router} from 'express';

import {
    list,
    create,
    destroy
} from '../controllers/inventory';

const inventoryRoutes = Router();

inventoryRoutes.get('/inventories', list);
inventoryRoutes.post('/inventories', create);
inventoryRoutes.delete('/inventories/:guid', destroy);

export default inventoryRoutes;