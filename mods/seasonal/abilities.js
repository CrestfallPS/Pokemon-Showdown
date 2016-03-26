﻿"use strict";

exports.BattleAbilities = {
	// Frysinger
	funhouse: {
		onStart: function (source) {
			this.useMove('Topsy-Turvy', source);
		},
		id: "funhouse",
		name: "Funhouse",
		rating: 3.5,
	},
	// MattL
	gravitationalfield: {
		shortDesc: "On switch-in, this Pokemon causes the effects of Gravity to occur.",
		onStart: function (source) {
			this.addPseudoWeather('gravity', source);
		},
		id: "gravitationalfield",
		name: "Gravitational Field",
		rating: 4,
	},
	// Snowy
	holyhail: {
		onStart: function () {
			this.setWeather('hail');
		},
		onAnySetWeather: function (target, source, weather) {
			if (weather.id !== 'hail') {
				this.add('message', 'The Holy Hail resisted the attempt to change the weather!');
				return false;
			}
		},
		onImmunity: function (type) {
			if (type === 'hail') return false;
		},
		onModifySpe: function () {
			if (this.isWeather(['hail'])) {
				return this.chainModify(2);
			}
		},
		onWeather: function (target, source, effect) {
			if (effect.id === 'hail') {
				this.heal(target.maxhp / 16);
			}
		},
		id: "holyhail",
		name: "Holy Hail",
		rating: 5,
	},
	// Sunfished	
	killjoy: {
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Killjoy');
			this.addPseudoWeather('killjoy', pokemon, "Killjoy");
		},
		onEnd: function (pokemon) {
			const foes = pokemon.side.foe.active;
			if (this.pseudoWeather['killjoy'] && !(foes.length && foes[0].hasAbility('killjoy'))) {
				this.removePseudoWeather('killjoy', pokemon);
			}
		},
		effect: {
			onStart: function () {
				this.add('message', 'All status moves will gain priority and cause recharge in the user!');
			},
			onModifyPriority: function (priority, pokemon, target, move) {
				if (move && move.category === 'Status') return priority + 1;
			},
			onModifyMove: function (move) {
				if (move.category === 'Status') {
					move.flags.recharge = 1;
					move.onAfterMove = function (source) {
						source.addVolatile('mustrecharge', source);
					};
				}
			},
			onEnd: function () {
				this.add('message', 'The priority of status moves have returned to normal.');
			},
		},
		id: "killjoy",
		name: "Killjoy",
		rating: 2,
	},
	// Golui
	specialsnowflake: {
		onStart: function (source) {
			this.add('-ability', source, 'Special Snowflake');
			this.add('message', 'All moves that target a Special Snowflake will become Special!');
		},
		onTryHit: function (target, source, move) {
			if (move.category !== 'Status') {
				move.category = 'Special';
			}
		},
		id: "specialsnowflake",
		name: "Special Snowflake",
		rating: 3,
	},
};
