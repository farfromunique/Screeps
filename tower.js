/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('tower');
 * mod.thing == 'a thing'; // true
 */
var nearest = require('findNearest');
module.exports = function(tower) {
    
    var hostiles = tower.room.find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0) {
            console.log('Tower attacking!');
            tower.attack(nearest(tower,hostiles));
        } else {
    		var injured =       _.filter(tower.room.find(FIND_MY_CREEPS), function(creep) {return creep.hits < creep.hitsMax});
    		var structs =       _.filter(tower.room.find(FIND_STRUCTURES), function(struct) {return ((struct.structureType != 'constructedWall') && (struct.hits < struct.hitsMax))});
    		var walls_bare =    _.filter(tower.room.find(FIND_STRUCTURES), function(struct) {return ((struct.structureType == 'constructedWall') && (struct.hits < struct.hitsMax) && (struct.hits < 1000));});     // Less than 1,000
    		var walls_mid =     _.filter(tower.room.find(FIND_STRUCTURES), function(struct) {return ((struct.structureType == 'constructedWall') && (struct.hits < struct.hitsMax) && (struct.hits < 10000));});    // Less than 10,000
    		var walls_high =    _.filter(tower.room.find(FIND_STRUCTURES), function(struct) {return ((struct.structureType == 'constructedWall') && (struct.hits < struct.hitsMax) && (struct.hits < 1000000));});  // Less than 1,000,000
    		var walls =         _.filter(tower.room.find(FIND_STRUCTURES), function(struct) {return ((struct.structureType == 'constructedWall') && (struct.hits < struct.hitsMax));});
            
            if (injured.length > 0) {
                var healed = tower.repair(nearest(tower,injured));
            } else if (structs.length > 0) {
    			var repaired = tower.repair(nearest(tower,structs));
            } else if (walls_bare.length > 0) {
    			var repaired = tower.repair(nearest(tower,walls_bare));
            } else if (walls_mid.length > 0) {
    			var repaired = tower.repair(nearest(tower,walls_mid));
            } else if (walls_high.length > 0) {
    			var repaired = tower.repair(nearest(tower,walls_high));
            } else if (walls.length > 0) {
    			var repaired = tower.repair(nearest(tower,walls));
    		}
        }
	};