var nearest = require('findNearest');
var spawnControl = require('spawn');
var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');
var upgrader = require('upgrader');
var maintainer = require('maintainer');
var towerControl = require('tower');

   
var creepMinimums = {
    'Miner':    4,
    'Builder':  2,
    'Upgrader': 1,
    
};

var generalWorker = [WORK, CARRY, MOVE];
var meleeFighter = [MOVE,MOVE,TOUGH,ATTACK];
var rangedFigher = [MOVE,MOVE,RANGED_ATTACK];

Spawn.prototype.createHarvesterCreep = function(spawner) {
    if (this.canCreateCreep(generalWorker, undefined) == OK) {
        let name = this.createCreep(generalWorker, undefined);
        var creep = Game.creeps[name];
        creep.memory.role = 'harvester';
        creep.memory.spawner = spawner;
        return true;
    } else {
        return false;
    }
};


Spawn.prototype.createBuilderCreep = function(spawner) {
    if (this.canCreateCreep(generalWorker, undefined) == OK) {
        let name = this.createCreep(generalWorker, undefined);
        var creep = Game.creeps[name];
        creep.memory.role = 'builder';
        creep.memory.spawner = spawner;
        return true;
    } else {
        return false;
    }
};

var construction = Game.constructionSites.length;

Spawn.prototype.createUpgraderCreep = function(spawner) {
    var err = this.canCreateCreep(generalWorker, undefined);
    if (err == OK) {
        let name = this.createCreep(generalWorker, undefined);
        var creep = Game.creeps[name];
        creep.memory.role = 'upgrader';
        creep.memory.spawner = spawner;
        return true;
    } else {
        return false;
    }
};



Spawn.prototype.createMeleeCreep = function(spawner) {
    var err = this.canCreateCreep(meleeFighter, undefined);
    
    if (err == OK) {
        name = this.createCreep(meleeFighter, undefined);
        var creep = Game.creeps[name];
        creep.memory.role = 'guard';
        creep.memory.spawner = spawner;
        return true;
    } else {
        return false;
    }
};
var guardCount = _.filter(Game.creeps, function(creep) {return creep.memory.role == 'builder';}).length;

Spawn.prototype.createRangedCreep = function(spawner) {
    var err = this.canCreateCreep(rangedFigher, undefined);
    
    if (err == OK) {
        name = this.createCreep(rangedFigher, undefined);
        var creep = Game.creeps[name];
        creep.memory.role = 'archer';
        creep.memory.spawner = spawner;
        return true;
    } else {
        return false;
    }
};
var guardCount = _.filter(Game.creeps, function(creep) {return creep.memory.role == 'builder';}).length;

module.exports.loop = function () {

    /* Memory Clear */
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    for(var name in Game.spawns) {
        let spawn = Game.spawns[name];
        spawnControl(spawn);
    }
    
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
    for (var name in Game.structures) {
        if (Game.structures[name].structureType == STRUCTURE_TOWER) {
            var tower = Game.structures[name];
            towerControl(tower);
        }
    }
    
	
}