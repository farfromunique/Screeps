/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('temp');
 * mod.thing == 'a thing'; // true
 */


Spawn.prototype.createGuardCreep = function(name) {
    return this.createCreep([MOVE,MOVE,TOUGH,ATTACK], name, {'role':'guard'});
};
Spawn.prototype.createUpgraderCreep = function(name) {
    return this.createCreep([MOVE,CARRY,CARRY,WORK], name, {'role':'upgrader'});
};
Spawn.prototype.createMaintainerCreep = function(name) {
    return this.createCreep([MOVE,CARRY,CARRY,WORK], name, {'role':'maintainer'});
};
Spawn.prototype.createArcherCreep = function(name) {
    return this.createCreep([MOVE,MOVE,RANGED_ATTACK], name, {'role':'archer'});
};
Spawn.prototype.createFighterCreep = function(name) {
    return this.createCreep([MOVE,MOVE,TOUGH,ATTACK], name, {'role':'fighter'});
};

Structure.prototype.needsRepair = function(name) {
    return this.hits < this.hitsMax / 2;
};

/* other */
if (Game.spawns.HomeSpawn.canCreateCreep([MOVE,WORK,CARRY]) === 0) {
	    createCreep([WORK, CARRY, MOVE], name, {'role':'harvester'});

	//}

	for(var name in Game.creeps) {
		var creep = Game.creeps[name];
		
		switch (creep.memory.role) {
		    case 'guard':
		        guard(creep);
                break;
            
            case 'harvester':
                harvester(creep);
                break;
            
            case 'builder':
                builder(creep);
                break;
            
            case 'upgrader':
                upgrader(creep);
        		break;
        	
        	case 'maintainer':
        	    maintainer(creep);
        	    break;
        	
		}
	}