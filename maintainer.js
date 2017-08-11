module.exports = function (creep) {
    var structs = _.filter(creep.room.find(FIND_MY_STRUCTURES), function(site) {return site.hits < site.hitsMax});
    var nearest = creep.pos.findClosestByRange(structs);
    
    if (creep.repair(nearest) != OK) {
        if (Game.spawns.First.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns.First);
        }
    }
        
}