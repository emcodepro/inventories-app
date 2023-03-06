import {Router} from 'express';

import {
    list,
    create,
    destroy, generate
} from '../controllers/inventory';

const inventoryRoutes = Router();

inventoryRoutes.get('/inventories', list);
inventoryRoutes.post('/inventories', create);
inventoryRoutes.delete('/inventories/:guid', destroy);
inventoryRoutes.get('/generate', generate);

export default inventoryRoutes;