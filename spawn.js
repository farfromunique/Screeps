/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn');
 * mod.thing == 'a thing'; // true
 */
const generalWorker = [WORK, CARRY, MOVE];
const meleeFighter = [MOVE,MOVE,TOUGH,ATTACK];
const rangedFigher = [MOVE,MOVE,RANGED_ATTACK];

const harvesterCount =	_.filter(Game.creeps, function(creep) {return creep.memory.role == 'harvester';}	).length;
const builderCount =	_.filter(Game.creeps, function(creep) {return creep.memory.role == 'builder';}		).length;
const upgraderCount =	_.filter(Game.creeps, function(creep) {return creep.memory.role == 'upgrader';}		).length;

var creepMinimums = {
    'Miner':    4,
    'Builder':  2,
    'Upgrader': 1,
    
};

module.exports = function (spawn) {
    if ( !spawn.memory.bootstrap) {
		let construction = spawn.room.find(FIND_CONSTRUCTION_SITES);
		let roads = spawn.room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_ROAD }});
		if (construction.length == 0 && roads.length == 0) {
			spawn.memory.bootstrap = false;
			let nearE = spawn.pos.findClosestByPath(FIND_SOURCES);
			let path = spawn.room.findPath(spawn.pos,nearE,{ignoreCreeps: true});
			spawn.memory.nearestEnergypath = path;
			spawn.memory.nearestEnergyid = nearE.id;
			path.forEach(function(cell) {
				spawn.room.createConstructionSite(cell.x,cell.y,STRUCTURE_ROAD);
			});
			spawn.memory.bootstrap = true;
		}
	}
	
	if (spawn.room.controller.level >= 3 && !spawn.memory.hasTower) {
	    let result = spawn.room.createConstructionSite(spawn.pos.x+1,spawn.pos.y+1,STRUCTURE_TOWER);
	    console.log(result);
	    spawn.memory.hasTower = true;
	}
	
	if(spawn.spawning) { 
        let spawningCreep = Game.creeps[spawn.spawning.name];
        spawn.room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            spawn.pos.x + 1, 
            spawn.pos.y, 
            {align: 'left', opacity: 0.8}
		);
    }
	
	if ((harvesterCount < creepMinimums.Miner) && spawn.canCreateCreep(generalWorker,undefined) == OK) {
        console.log('Backfilling Harvester...');
        spawn.createHarvesterCreep(spawn.name);
    } else if ((builderCount < creepMinimums.Builder) && spawn.canCreateCreep(generalWorker,undefined) == OK) {
        console.log('Backfilling Builder...');
        spawn.createBuilderCreep(spawn.name);
	} else if ((upgraderCount < creepMinimums.Upgrader) && spawn.canCreateCreep(generalWorker,undefined) == OK) {
	    console.log('Backfilling Upgrader...');
        spawn.createUpgraderCreep(spawn.name);
	}
};

module.exports.nearEnergyPath = function(spawn) {
    return spawn.memory.nearerstEnergy.path;
}