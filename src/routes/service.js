const _router = require('express').Router(),
    _serviceController = new (require('../controllers/ServiceController'))();

_router.get('/', _serviceController.findAll.bind(_serviceController));
_router.post('/', _serviceController.save.bind(_serviceController));
_router.get('/:id', _serviceController.findById.bind(_serviceController));
_router.put('/:id', _serviceController.update.bind(_serviceController));
_router.delete('/:id', _serviceController.delete.bind(_serviceController));

module.exports = _router;