"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function humanize(str) {
    var i, frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
}
exports.default = humanize;