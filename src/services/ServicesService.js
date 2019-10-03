
function ServicesService(){
    this.repository = new (require('../repositories/ServiceRepository'))();
}

ServicesService.prototype = Object.create(require('../services/ServiceHelper').prototype);

module.exports = ServicesService;