module.exports = function (creep) {
    var upgraderCount =	_.filter(Game.creeps, function(creep) {return creep.memory.role == 'upgrader';}		).length;
    var harvesterCount =	_.filter(Game.creeps, function(creep) {return creep.memory.role == 'harvester';}	).length;
    var construction = Game.constructionSites.length;
    
    if (harvesterCount < 1) {
        creep.memory.role = 'harvester';
    } else if (upgraderCount > 2 && construction) {
        creep.memory.role = 'builder';
        return false;
    } else {
        if(creep.carry.energy == 0) {
            if(creep.withdraw(Game.spawns[creep.memory.spawner],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns[creep.memory.spawner],{reusePath: 50});
            }
        } else {
            if (creep.room.controller) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            	    creep.moveTo(creep.room.controller,{reusePath: 50});
                }
            }
        }
    }
}