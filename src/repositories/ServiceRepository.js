const _Service = require('../schemas/ServiceSchema').model,
    _BaseRepository = require('../repositories/BaseRepository');

function ServiceRepository() {
    this.model = _Service;
}

ServiceRepository.prototype = Object.create(_BaseRepository.prototype);

ServiceRepository.prototype.x = function(){
    //do something
}

module.exports = ServiceRepository;