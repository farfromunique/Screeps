/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('findNearest');
 * mod.thing == 'a thing'; // true
 */

module.exports = function (_me,_targets) {
    var distances = new Array;
    var closest = 0;
    for (let j = 0; j < _targets.length; j++) {
        distances.push(Math.sqrt((_me.pos.x - _targets[j].pos.x) + (_me.pos.y - _targets[j].pos.y)));
    }
    
    for (let i = 0; i < distances.length; i++) {
        if (distances[i] < distances[closest]) {
            closest = i;
        }
    }
    return _targets[closest];
};