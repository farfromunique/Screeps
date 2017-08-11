var nearest = require('findNearest');
module.exports = function (creep) {
    var dropoffs = _.filter(creep.room.find(FIND_MY_STRUCTURES), function(site) {return site.energy < site.energyCapacity});
    var dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
	var sources = creep.pos.findClosestByRange(FIND_SOURCES);
	
	if(creep.carry.energy < creep.carryCapacity) {
	    if (dropped) {
		    if (creep.pickup() == ERR_NOT_IN_RANGE) {
		        creep.moveTo(nearest(creep,dropped),{reusePath: 30});
		    }
		} else if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
			creep.moveTo(sources,{reusePath: 30});
		}			
	} else {
		if (dropoffs.length > 0) {
			dropoffs.forEach(target => {
				if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target,{reusePath: 30});
				}
			})
		}
	}
}