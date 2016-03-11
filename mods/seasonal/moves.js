"use strict";

exports.BattleMovedex = {
	// Eevee General
	adminthings: {
		accuracy: 100,
		category: "Status",
		id: "adminthings",
		isNonstandard: true,
		name: "Admin Things",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		selfSwitch: true,
		boosts: {atk: -1, spa: -1},
		secondary: false,
		onHit: function (target, source) {
			target.trySetStatus('psn', source);  // Doesn't use the status property to prevent the move
			target.addVolatile('taunt', source); // from failing before executing all actions.
			this.add("c|~Eevee General|Sorry but I have to go! Please submit your request in <<adminrequests>> and we'll look at it soon.");
		},
		target: "normal",
		type: "Normal",
	},
	// awu
	ancestorsrage: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		id: "ancestorsrage",
		isNonstandard: true,
		isViable: true,
		name: "Ancestor's Rage",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fairy",
	},
	// boTTT
	automoderation: {
		accuracy: true,
		basePower: 40,
		basePowerCallback: function (pokemon, target) {
			let boosts = target.positiveBoosts();
			if (boosts) {
				this.add('-message', target.name + " was " + ['warned', 'muted', 'roombanned', 'locked', 'blacklisted', 'banned', 'permabanned'][(boosts < 8 ? boosts - 1 : 7)] + " by boTTT. (Automated moderation: spamming boosts)");
			}
			return 40 * Math.pow(1.5, boosts);
		},
		category: "Physical",
		id: "automoderation",
		isNonstandard: true,
		isViable: true,
		name: "Auto-Moderation",
		pp: 35,
		priority: 3,
		flags: {authentic: 1, mirror: 1},
		onTryHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Luster Purge", target);
		},
		ignoreDefensive: true,
		secondary: false,
		target: "normal",
		type: "Ghost",
	},
	// galbia
	dog: {
		accuracy: 80,
		basePower: 110,
		category: "Physical",
		id: "dog",
		isNonstandard: true,
		name: "(dog)",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1},
		onModifyMove: function (move) {
			if (this.isWeather('sandstorm')) move.accuracy = true;
		},
		ignoreImmunity: true,
		secondary: false,
		target: "normal",
		type: "Normal",
	},
	// Aelita
	energyfield: {
		accuracy: 100,
		basePower: 150,
		category: "Special",
		id: "energyfield",
		isNonstandard: true,
		isViable: true,
		name: "Energy Field",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove: function (move) {
			if (this.isWeather(['raindance', 'primordialsea'])) {
				move.accuracy = true;
			} else if (this.isWeather(['sunnyday', 'desolateland'])) {
				move.accuracy = 50;
			}
		},
		self: {boosts:{spa:-1, spd:-1, spe:-1}},
		secondary: {
			chance: 40,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
	},
	// bumbadadabum
	freesoftware: {
		accuracy: 95,
		basePower: 110,
		category: "Special",
		id: "freesoftware",
		isNonstandard: true,
		isViable: true,
		name: "Free Software",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {chance: 30, status: 'par'},
		onHit: function (target, source) {
			this.add('c|@bumbadadabum|I\'d just like to interject for a moment. What you\'re referring to as Linux, is in fact, GNU/Linux, or as I\'ve recently taken to calling it, GNU plus Linux. Linux is not an operating system unto itself, but rather another free component of a fully functioning GNU system made useful by the GNU corelibs, shell utilities and vital system components comprising a full OS as defined by POSIX.');
			this.add('c|@bumbadadabum|Many computer users run a modified version of the GNU system every day, without realizing it. Through a peculiar turn of events, the version of GNU which is widely used today is often called Linux, and many of its users are not aware that it is basically the GNU system, developed by the GNU Project.');
			this.add('c|@bumbadadabum|There really is a Linux, and these people are using it, but it is just a part of the system they use. Linux is the kernel: the program in the system that allocates the machine\'s resources to the other programs that you run. The kernel is an essential part of an operating system, but useless by itself; it can only function in the context of a complete operating system. Linux is normally used in combination with the GNU operating system: the whole system is basically GNU with Linux added, or GNU/Linux. All the so-called Linux distributions are really distributions of GNU/Linux!');
		},
		target: "normal",
		type: "Electric",
	},
	// Joim
	gasterblaster: {
		accuracy: 90,
		basePower: 150,
		category: "Special",
		id: "gasterblaster",
		isNonstandard: true,
		name: "Gaster Blaster",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness: function (typeMod, type, move) {
			return typeMod + this.getEffectiveness('Ice', type);
		},
		onTryHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyper Beam", target);
		},
		onAfterHit: function (target, source) {
			if (target.hp > 0) {
				source.addVolatile('mustrecharge');
			}
		},
		secondary: false,
		target: "normal",
		type: "Electric",
	},
	// xfix
	glitchdimension: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "glitchdimension",
		isNonstandard: true,
		name: "(Glitch Dimension)",
		pp: 10,
		priority: 0,
		multihit: [2, 5],
		flags: {},
		onHit: function (target, source) {
			// The PP could be increased properly, instead of this silly hack,
			// but I like this hack, so it stays. It's intentionally buggy move, after all.
			const ppData = source.getMoveData('glitchdimension');
			if (ppData && ppData.pp) {
				ppData.pp = Math.round(ppData.pp * 10 + this.random(3) + 5) / 10;
			}
			this.useMove(Object.keys(exports.BattleMovedex).sample(), target);
		},
		onTryHit: function (target, source, effect) {
			if (!source.isActive) return null;
			// This easter egg shouldn't happen too often.
			// The values here are meaningful, but I will provide the exercise in
			// figuring them out to whoever reads the code. Don't want to spoil
			// the fun in that.
			if (this.random(722) === 66) {
				this.addPseudoWeather('glitchdimension', source, effect, '[of] ' + source);
			}
		},
		effect: {
			duration: 5,
			onStart: function (target, source) {
				// Why do I make way too complex easter eggs that nobody will
				// notice? I don't know, but I did that in previous Super Staff
				// Bros., so let's continue with the tradition.
				const colors = [
					// CSS basic colors
					"black (is that even a color)", "silver", "gray", "white",
					"maroon", "red", "purple", "fuchsia", "green", "lime",
					"olive", "yellow", "navy", "blue", "teal", "aqua", "orange",
					// Pokemon Games
					"gold", "crystal", "ruby", "sapphire", "emerald", "diamond",
					"pearl", "platinum", "X", "Y",
					// PMD gummis (some don't make sense as colors, but whatever)
					"brown", "clear", "grass", "pink", "royal", "sky", "wander", "wonder",
					// Game Boy Color colors
					"strawberry", "grape", "kiwi", "dandelion", "atomic purple", "Pikachu & Pichu",
					// Game Boy Color palettes
					"dark brown", "pastel mix", "dark blue", "dark green", "reverse",
					// Why not?
					"shiny", "randomly", "'); DROP TABLE colors; --", "Ho-Oh", "blue screen",
				];
				this.add('-message', "Ho-Oh is now colored " + colors.sample(this.random(3) + 1).join(" and ") + "! As well as every other \u3069\u25C0mon.");
			},
			onEffectiveness: function () {
				return this.random(3) - 1;
			},
			onEnd: function () {
				this.add('-message', "Ho-Oh is no longer colored!");
			},
		},
		secondary: false,
		target: "self",
		type: "Normal",
	},
	goindalikelinda: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "goindalikelinda",
		isNonstandard: true,
		isViable: true,
		name: "Go Inda Like Linda",
		pp: 30,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spe: 2,
			atk: 2,
		},
		secondary: false,
		target: "self",
		type: "Flying",
	},
	// Hippopotas
	hazardpass: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "hazardpass",
		isNonstandard: true,
		isViable: true,
		name: "Hazard Pass",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, authentic: 1},
		selfSwitch: true,
		onHit: function (pokemon) {
			let hazards = ['stealthrock', 'spikes', 'toxicspikes', 'stickyweb'].randomize();
			pokemon.side.addSideCondition(hazards[0]);
			pokemon.side.addSideCondition(hazards[1]);
		},
		secondary: false,
		target: "normal",
		type: "Dark",
	},
	// qtrx
	hiddenpowernormal: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "hiddenpowernormal",
		isNonstandard: true,
		isViable: true,
		name: "Hidden Power Normal",
		pp: 65,
		priority: 0,
		flags: {snatch: 1, authentic: 1},
		onModifyMove: function (move, source) {
			if (source.template.isMega) {
				move.name = "SUPER GLITCH";
				if (this.p1.pokemon.filter(mon => !mon.fainted).length > 1 && this.p2.pokemon.filter(mon => !mon.fainted).length > 1) {
					source.addVolatile('hiddenpowernormal');
					move.forceSwitch = true;
					move.selfSwitch = true;
				}
			} else {
				move.name = "KEYBOARD SMASH";
			}
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fairy Lock", target);
			this.add('-anim', target, "Fairy Lock", target); // DRAMATIC FLASHING
		},
		onHit: function (target, source) {
			if (!source.template.isMega) {
				let gibberish = '';
				let hits = 0;
				let hps = ['hiddenpowerbug', 'hiddenpowerdark', 'hiddenpowerdragon', 'hiddenpowerelectric', 'hiddenpowerfighting', 'hiddenpowerfire', 'hiddenpowerflying', 'hiddenpowerghost', 'hiddenpowergrass', 'hiddenpowerground', 'hiddenpowerice', 'hiddenpowerpoison', 'hiddenpowerpsychic', 'hiddenpowerrock', 'hiddenpowersteel', 'hiddenpowerwater'];
				let hitcount = [3, 4, 4, 4, 4, 5, 5, 6, 6][this.random(9)];
				this.add('c|@qtrx|/me slams face into keyboard!');
				source.isDuringAttack = true; // Prevents the user from being kicked out in the middle of using Hidden Powers.
				for (let i = 0; i < hitcount; i++) {
					if (target.hp !== 0) {
						let len = 16 + this.random(35);
						gibberish = '';
						for (let j = 0; j < len; j++) gibberish += String.fromCharCode(48 + this.random(79));
						this.add('-message', gibberish);
						this.useMove(hps[this.random(16)], source, target);
						hits++;
					}
				}
				this.add('-message', 'Hit ' + hits + ' times!');
				source.isDuringAttack = false;
			} else if (source.volatiles['hiddenpowernormal']) {
				target.swapping = true;
				source.swapping = true;
			} else {
				this.useMove("explosion", source, target);
			}
		},
		effect: {
			duration: 1,
			onAfterMoveSecondarySelf: function (source, target) {
				if (source.swapping && target.swapping) {
					this.add("raw|<div class=\"broadcast-blue\"><b>" + source.side.name + " will trade " + source.name + " for " + target.side.name + "'s " + target.name + ".</b></div>");
					this.add('message', "Link standby... Please wait.");
				} else {
					this.add('message', "Trade cancelled.");
				}
			},
		},
		secondary: false,
		target: "normal",
		type: "Normal",
	},
	// Crestfall
	lightofunruin: {
		accuracy: 90,
		basePower: 140,
		category: "Special",
		id: "lightofunruin",
		isNonstandard: true,
		isViable: true,
		name: "Light of Unruin",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		isUnreleased: true,
		drain: [1, 2],
		self: {boosts: {def: -1, spd: -1}},
		secondary: false,
		target: "normal",
		type: "Fairy",
	},
	// scpinion
	lolroom: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "lolroom",
		isNonstandard: true,
		pp: 5,
		priority: 0,
		flags: {mirror: 1},
		onHit: function (target, source, effect) {
			if (this.pseudoWeather['trickroom']) {
				this.removePseudoWeather('trickroom', source, effect, '[of] ' + source);
			} else {
				this.addPseudoWeather('trickroom', source, effect, '[of] ' + source);
			}
		},
		volatileStatus: 'lolroom',
		effect: {
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'LOL! Room');
				let newatk = pokemon.stats.spd;
				let newdef = pokemon.stats.spa;
				pokemon.stats.spa = newatk;
				pokemon.stats.spd = newdef;
			},
			onCopy: function (pokemon) {
				this.add('-start', pokemon, 'LOL! Room');
				let newatk = pokemon.stats.spd;
				let newdef = pokemon.stats.spa;
				pokemon.stats.spa = newatk;
				pokemon.stats.spd = newdef;
			},
			onEnd: function (pokemon) {
				this.add('-end', pokemon, 'LOL! Room');
				let newatk = pokemon.stats.spd;
				let newdef = pokemon.stats.spa;
				pokemon.stats.spa = newatk;
				pokemon.stats.spd = newdef;
			},
			onRestart: function (pokemon) {
				pokemon.removeVolatile('LOL! Room');
			},
		},
		secondary: false,
		target: "self",
		type: "Psychic",
	},
	// gangnam style
	motherfathergentleman: {
		accuracy: 80,
		basePower: 70,
		category: "Physical",
		id: "motherfathergentleman",
		isNonstandard: true,
		name: "Mother, Father, Gentleman",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 3,
		secondary: false,
		target: "normal",
		type: "Dark",
	},
	// Level 51
	nextlevelstrats: {
		accuracy: true,
		category: "Status",
		id: "nextlevelstrats",
		isNonstandard: true,
		name: "Next Level Strats",
		pp: 5,
		noPPBoosts: true,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		boosts: {spe: 1},
		onTryHit: function (pokemon) {
			if (pokemon.level >= 200) return false;
		},
		onHit: function (pokemon) {
			pokemon.level += 10;
			if (pokemon.level > 200) pokemon.level = 200;
			this.add('-message', 'Level 51 advanced 10 levels! It is now level ' + pokemon.level + '!');
		},
		secondary: false,
		target: "self",
		type: "Normal",
	},
	// m00ns
	oh: {
		accuracy: 100,
		category: "Status",
		id: "oh",
		isNonstandard: true,
		name: "oh",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		boosts: {atk: -1, spa: -1},
		self: {boosts: {spe: 1}},
		secondary: false,
		target: "normal",
		type: "Dark",
	},
	// AM
	predator: {
		accuracy: 100,
		basePower: 40,
		basePowerCallback: function (pokemon, target) {
			if (target.beingCalledBack) {
				return 120;
			}
			return 60;
		},
		category: "Physical",
		id: "predator",
		isNonstandard: true,
		isViable: true,
		name: "Predator",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		boosts: {atk:-1, spa:-1, accuracy:-2},
		beforeTurnCallback: function (pokemon, target) {
			target.side.addSideCondition('predator', pokemon);
			if (!target.side.sideConditions['predator'].sources) {
				target.side.sideConditions['predator'].sources = [];
			}
			target.side.sideConditions['predator'].sources.push(pokemon);
		},
		onModifyMove: function (move, source, target) {
			if (target && target.beingCalledBack) move.accuracy = true;
		},
		onTryHit: function (target, pokemon) {
			target.side.removeSideCondition('predator');
		},
		effect: {
			duration: 1,
			onBeforeSwitchOut: function (pokemon) {
				this.debug('Pursuit start');
				let sources = this.effectData.sources;
				this.add('-activate', pokemon, 'move: Pursuit');
				for (let i = 0; i < sources.length; i++) {
					if (sources[i].moveThisTurn || sources[i].fainted) continue;
					this.cancelMove(sources[i]);
					// Run through each decision in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (sources[i].canMegaEvo) {
						for (let j = 0; j < this.queue.length; j++) {
							if (this.queue[j].pokemon === sources[i] && this.queue[j].choice === 'megaEvo') {
								this.runMegaEvo(sources[i]);
								break;
							}
						}
					}
					this.runMove('predator', sources[i], pokemon);
				}
			},
		},
		secondary: false,
		target: "normal",
		type: "Dark",
	},
	// Raseri
	purifysoul: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "purifysoul",
		isNonstandard: true,
		isViable: true,
		name: "Purify Soul",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		boosts: {spa:1, spd:1},
		secondary: false,
		target: "self",
		type: "Normal",
	},
	// Quite Quiet
	retreat: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		id: "retreat",
		isNonstandard: true,
		isViable: true,
		name: "Retreat",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness: function (typeMod, type, move) {
			return 1;
		},
		selfSwitch: true,
		secondary: false,
		target: "normal",
		type: "Electric",
	},
	// Jasmine
	reversetransform: {
		accuracy: true,
		category: "Status",
		id: "reversetransform",
		isNonstandard: true,
		name: "Reverse Transform",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {protect: 1, mirror: 1, authentic: 1},
		onHit: function (target, source) {
			if (!target.transformInto(source, target)) {
				return false;
			}
			target.canMegaEvo = false;
		},
		target: "nomral",
		type: "Normal",
	},
	// Trickster
	sacredspearexplosion: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "No additional effect.",
		shortDesc: "No additional effect. Hits adjacent foes.",
		id: "sacredspearexplosion",
		isNonstandard: true,
		isViable: true,
		name: "Sacred Spear Explosion",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Megahorn", target);
			this.add('-anim', target, "Explosion", source);
			this.add('-formechange', target, target.species, ''); //resets sprite after explosion
		},
		onEffectiveness: function (typeMod, type, move) {
			return typeMod + this.getEffectiveness('Steel', type);
		},
		secondary: {chance: 30, status: 'brn'},
		target: "allAdjacentFoes",
		type: "Fairy",
	},
	// f(x)
	shakethatbrass: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "shakethatbrass",
		isNonstandard: true,
		name: "shake that brass",
		pp: 20,
		priority: 0,
		onTryHit: function (target, pokemon) {
			const move = pokemon.moveset.map(x => x.id).filter(x => x !== 'shakethatbrass').sample();
			pokemon.addVolatile('shakethatbrass');
			this.useMove(move, pokemon, target);
			return null;
		},
		flags: {protect: 1, authentic: 1},
		effect: {
			duration: 1,
			onBasePowerPriority: 4,
			onBasePower: function (basePower) {
				return this.chainModify(1.5);
			},
			onAccuracy: function (accuracy) {
				return 100;
			},
		},
		secondary: false,
		target: "adjacentFoe",
		type: "Normal",
	},
	// Legitimate Username
	shellfortress: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "shellfortress",
		isNonstandard: true,
		isViable: true,
		name: "Shell Fortress",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		boosts: {def:2, spd:2, atk:-4, spa:-4, spe:-4},
		secondary: false,
		target: "self",
		type: "Normal",
	},
	// The Immortal
	sleepwalk: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "sleepwalk",
		isNonstandard: true,
		isViable: true,
		name: "Sleep Walk",
		pp: 10,
		priority: 0,
		flags: {},
		sleepUsable: true,
		onTryHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Healing Wish", target);
		},
		onHit: function (pokemon) {
			if (pokemon.status !== 'slp') {
				if (pokemon.hp >= pokemon.maxhp) return false;
				if (!pokemon.setStatus('slp')) return false;
				pokemon.statusData.time = 3;
				pokemon.statusData.startTime = 3;
				this.heal(pokemon.maxhp);
				this.add('-status', pokemon, 'slp', '[from] move: Rest');
			}
			let moves = [];
			for (let i = 0; i < pokemon.moveset.length; i++) {
				let move = pokemon.moveset[i].id;
				if (move && move !== 'sleeptalk') moves.push(move);
			}
			let move = '';
			if (moves.length) move = moves[this.random(moves.length)];
			if (!move) return false;
			this.useMove(move, pokemon);
			let activate = false;
			let boosts = {};
			for (let i in pokemon.boosts) {
				if (pokemon.boosts[i] < 0) {
					activate = true;
					boosts[i] = 0;
				}
			}
			if (activate) pokemon.setBoost(boosts);
			if (!pokemon.informed) {
				this.add('c|~The Immortal|I don\'t really sleep walk...');
				pokemon.informed = true;
			}
		},
		secondary: false,
		target: "self",
		type: "Normal",
	},
	// Bummer
	speedpaint: {
		accuracy: true,
		category: "Status",
		id: "speedpaint",
		isNonstandard: true,
		name: "Speedpaint",
		pp: 10,
		priority: 1,
		flags: {protect: 1, authentic: 1},
		onTryHit: function (target, pokemon) {
			let decision = this.willMove(target);
			if (decision) {
				let noMeFirst = {
					chatter:1, counter:1, covet:1, focuspunch:1, mefirst:1, metalburst:1, mirrorcoat:1, struggle:1, thief:1, speedpaint: 1,
				};
				let move = this.getMoveCopy(decision.move.id);
				if (!noMeFirst[move]) {
					pokemon.addVolatile('mefirst');
					this.useMove(move, pokemon, target);
					return null;
				}
			}
			return false;
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 4,
			onBasePower: function (basePower) {
				return this.chainModify(1);
			},
		},
		secondary: false,
		pressureTarget: "foeSide",
		target: "normal",
		type: "Normal",
	},
	// Lacuna
	standingfull: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		id: "standingfull",
		isNonstandard: true,
		name: "Standing Full",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onHit: function (target, source) {
			if (target.lastDamage > 0 && source.lastAttackedBy && source.lastAttackedBy.thisTurn && source.lastAttackedBy.pokemon === target) {
				if (this.random(100) < 30) {
					target.addVolatile('confusion');
				}
			} else {
				target.addVolatile('confusion');
			}
		},
		target: "normal",
		type: "Fighting",
	},
	// Solaris Fox
	wonderbark: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "wonderbark",
		isNonstandard: true,
		name: "Wonder Bark",
		pp: 1,
		noPPBoosts: true,
		priority: 3,
		flags: {reflectable: 1, sound: 1},
		volatileStatus: 'flinch',
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyper Voice", source);
		},
		onHit: function (pokemon, source) {
			this.add('-message', 'You hear a sound echo across the universe. Things seem different now.');
			let newMoves = ['hyperbeam', 'flamethrower', 'freezedry', 'thunderbolt', 'scald', 'gigadrain', 'bugbuzz',
				'darkpulse', 'psychic', 'shadowball', 'flashcannon', 'dragonpulse', 'moonblast', 'focusblast', 'aeroblast',
				'earthpower', 'sludgebomb', 'paleowave', 'bodyslam', 'flareblitz', 'iciclecrash', 'volttackle', 'waterfall',
				'leafblade', 'xscissor', 'knockoff', 'shadowforce', 'ironhead', 'outrage', 'playrough', 'closecombat',
				'bravebird', 'earthquake', 'stoneedge', 'extremespeed', 'stealthrock', 'spikes', 'stickyweb', 'quiverdance',
				'shellsmash', 'dragondance', 'recover', 'toxic', 'willowisp',
			].randomize();
			for (let i = 0; i < pokemon.moveset.length; i++) {
				let moveData = Tools.getMove(newMoves[i]);
				let moveBuffer = {
					move: moveData.name,
					id: moveData.id,
					pp: moveData.pp,
					maxpp: moveData.pp,
					target: moveData.target,
					disabled: false,
					used: false,
				};
				pokemon.moveset[i] = moveBuffer;
				pokemon.baseMoveset[i] = moveBuffer;
				pokemon.moves[i] = toId(moveData.name);
			}
			source.side.hasUsedWonderBark = true;
		},
		onAfterMove: function (pokemon) {
			pokemon.deductPP('wonderbark', 99);
		},
		secondary: false,
		target: "normal",
		type: "Dark",
	},
};
