module.exports = function (creep) {
	let nearestSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    
	if(creep.carry.energy == 0) {
		if(creep.withdraw(Game.spawns[creep.memory.spawner],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(Game.spawns[creep.memory.spawner],{reusePath: 50});
		}
	} else if (nearestSite) {
		if(creep.build(nearestSite) == ERR_NOT_IN_RANGE) {
			creep.moveTo(nearestSite,{reusePath: 50});					
		}
	} else {
	    creep.memory.role = 'upgrader';
	}
}