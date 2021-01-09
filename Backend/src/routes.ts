import { Router } from 'express'

import FunctionsController from './controllers/FunctionsController'
import SearchsController from './controllers/SearchsController'

const routes = Router();

// routes.get('/functions', FunctionsController.index);
routes.post('/functions', FunctionsController.store);
routes.get('/functions/:id', FunctionsController.show);
routes.delete('/functions/:id', FunctionsController.destroy);
routes.put('/functions/:id', FunctionsController.update);

routes.get('/search', SearchsController.index);

export default routes;