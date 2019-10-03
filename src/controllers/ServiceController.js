const _controllerHelper = require('../controllers/ControllerHelper'),
    _service = require('../services/ServicesService');

function ServiceController() {
    this.service = _service;
}

ServiceController.prototype = Object.create(_controllerHelper.prototype);

module.exports = ServiceController;