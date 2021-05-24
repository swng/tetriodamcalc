var num_rendered = 0;
var num_attacks = 9;
renderFields();

function addField() {
	num_attacks++;
	renderFields();
}
function removeField() {
	num_attacks--;
	if (num_attacks < 1) num_attacks = 1;
	renderFields();
}

function renderFields() {
	var container = document.getElementById('container');
	while (num_rendered > num_attacks) {
		for (i = 0; i < 7; i++) container.removeChild(container.lastChild);
		num_rendered--;
	}
	for (i = num_rendered; i < num_attacks; i++) {
		var attackType = document.createElement('select');
		attackType.id = 'attack type ' + i;
		var attackTypeLabel = document.createElement('label');
		attackTypeLabel.htmlFor = attackType.id;
		attackTypeLabel.innerText = 'Attack type: ';
		var PC = document.createElement('input');
		PC.id = 'PC ' + i;
		PC.type = 'checkbox';
		var PCLabel = document.createElement('label');
		PCLabel.htmlFor = PC.id;
		PCLabel.innerText = ' PC? ';

		attackType.append(new Option('None', -1));
		attackType.append(new Option('Single', 0));
		attackType.append(new Option('Double', 1));
		attackType.append(new Option('Triple', 2));
		attackType.append(new Option('Quad', 3));
		attackType.append(new Option('T-Spin Mini Single', 4));
		attackType.append(new Option('T-Spin Single', 5));
		attackType.append(new Option('T-Spin Mini Double', 6));
		attackType.append(new Option('T-Spin Double', 7));
		attackType.append(new Option('T-Spin Triple', 8));

		var damage_0 = document.createElement('span');
		damage_0.innerText = ' Damage: ';
		var damage_1 = document.createElement('span');
		damage_1.id = 'damage ' + i;
		damage_1.innerText = 0;

		container.appendChild(attackTypeLabel);
		container.appendChild(attackType);
		container.appendChild(PCLabel);
		container.appendChild(PC);
		container.appendChild(damage_0);
		container.appendChild(damage_1);

		container.appendChild(document.createElement('p'));
		num_rendered++;
	}
}

function showAttackTable() {
	console.log(AttackTable);
	alert(
		"just use console to view or edit AttackTable\nbtw it doesn't set until clicking calculate\n" +
			JSON.stringify(AttackTable)
	);
}

function B2B_level(B2B) {
	// source: osk: https://discord.com/channels/673303546107658242/674421736162197515/713419086486437960
	if (B2B < 1) return 0;
	if (B2B < 3) return 1;
	if (B2B < 8) return 2;
	if (B2B < 24) return 3;
	if (B2B < 67) return 4;
	if (B2B < 185) return 5;
	if (B2B < 504) return 6;
	if (B2B < 1370) return 7;
	return 8; // if there's a B2B level past lv 8 I don't know where it starts
}

// [0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4]

// lol hardcoded attack table. Hopefully I didn't typo when typing them out...
// osk table covers up to 20c and up to B2B level 4
var AttackTable1 = [
	// straight taken from osk's table: https://cdn.discordapp.com/attachments/674421736162197515/716081165886423110/2020-05-30_02-07-18.png
	[
		[0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3], // Single // hits 4 at... 43
		[1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6], // Double. Increments every 4 combos.
		[2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12], // Triple. Increments every 2 combos.
		[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], // Quad. Increments every combo.
		[0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3], // T-Spin Mini Single. Same as single, but gets B2B.
		[2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12], // T-Spin Single. Same as triple, but gets B2B.
		[1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6], // T-Spin Mini Double. Same as double, but gets B2B.
		[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], // T-Spin Double. Same as quad.
		[6, 7, 9, 10, 12, 13, 15, 16, 18, 19, 21, 22, 24, 25, 27, 28, 30, 31, 33, 34, 36], // T-Spin Triple. Increments every combo and by 2 every 2 combos.
	], // B2B 0
	[
		[],
		[],
		[], // single double triple
		[5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18, 20, 21, 22, 23, 25, 26, 27, 28, 30], // Quad
		[1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6], // T-Spin Mini Single
		[3, 3, 4, 5, 6, 6, 7, 8, 9, 9, 10, 11, 12, 12, 13, 14, 15, 15, 16, 17, 18], // T-Spin Single
		[2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12], // T-Spin Mini Double
		[5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18, 20, 21, 22, 23, 25, 26, 27, 28, 30], // T-Spin Double
		[7, 8, 10, 12, 14, 15, 17, 19, 21, 22, 24, 26, 28, 29, 31, 33, 35, 36, 38, 40, 42], // T-Spin Triple
	], // B2B 1
	[
		[],
		[],
		[], // single double triple
		[6, 7, 9, 10, 12, 13, 15, 16, 18, 19, 21, 22, 24, 25, 27, 28, 30, 31, 33, 34, 36], // Quad
		[2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12], // T-Spin Mini Single
		[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], // T-Spin Single
		[3, 3, 4, 5, 6, 6, 7, 8, 9, 9, 10, 11, 12, 12, 13, 14, 15, 15, 16, 17, 18], // T-Spin Mini Double
		[6, 7, 9, 10, 12, 13, 15, 16, 18, 19, 21, 22, 24, 25, 27, 28, 30, 31, 33, 34, 36], // T-Spin Double
		[8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48], // T-Spin Triple
	], // B2B 2
	[
		[],
		[],
		[], // single double triple
		[7, 8, 10, 12, 14, 15, 17, 19, 21, 22, 24, 26, 28, 29, 31, 33, 35, 36, 38, 40, 42], // Quad
		[3, 3, 4, 5, 6, 6, 7, 8, 9, 9, 10, 11, 12, 12, 13, 14, 15, 15, 16, 17, 18], // T-Spin Mini Single
		[5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18, 20, 21, 22, 23, 25, 26, 27, 28, 30], // T-Spin Single
		[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], // T-Spin Mini Double
		[7, 8, 10, 12, 14, 15, 17, 19, 21, 22, 24, 26, 28, 29, 31, 33, 35, 36, 38, 40, 42], // T-Spin Double
		[9, 11, 13, 15, 18, 20, 22, 24, 27, 29, 31, 33, 36, 38, 40, 42, 45, 47, 49, 51, 54], // T-Spin Triple
	], // B2B 3
	[
		[],
		[],
		[], // single double triple
		[8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48], // Quad
		[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], // T-Spin Mini Single
		[6, 7, 9, 10, 12, 13, 15, 16, 18, 19, 21, 22, 24, 25, 27, 28, 30, 31, 33, 34, 36], // T-Spin Single
		[5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18, 20, 21, 22, 23, 25, 26, 27, 28, 30], // T-Spin Mini Double
		[8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48], // T-Spin Double
		[10, 12, 15, 17, 20, 22, 25, 27, 30, 32, 35, 37, 40, 42, 45, 47, 50, 52, 55, 57, 60], // T-Spin Triple
	], // B2B 4
];

var AttackTable2 = [
	/*
    Notes on changes:
    Test 0: https://streamable.com/8iqg2b (from Zap): confirms Single hits 4 damage at 43 combo.
    Test 1: https://streamable.com/yiutt8
        combo 0 b2b 0: 4
        combo 1 b2b 1: 6
        combo 2 b2b 2: 8 ??
        combo 3 b2b 3: 11
        combo 4 b2b 4: 12
        combo 5 b2b 5: 14
        combo 6 b2b 6: 16
        combo 7 b2b 7: 18
        combo 8 b2b 8: 22
    Test 2: https://streamable.com/athqcp
        combo 1 b2b 0: 5
        combo 2 b2b 1: 7 ????????????? Should be equivalent to combo 2 b2b 2 since b2b 2 and b2b 1 are the same b2b level. Keeping this value as 7 and not 8 for now.
        combo 3 b2b 2: 9
        combo 4 b2b 3: 12
        combo 5 b2b 4: 14
        combo 6 b2b 5: 16
        combo 7 b2b 6: 18
        combo 8 b2b 7: 19
        combo 9 b2b 8: 23
    
    Changed B2B 2 combo 1 to 8 damage (common stickspin situation)
    Changed B2B 1 combo 1 to 4 damage (common Nosomi situation)
    Changed a couple more attacktypes to match equivalent combo scaling - e.g. B2B1 TSS had the same combo scaling as B2B2 TSMD so changes to B2B1 TSS were reflected


    */
	[
		[
			0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
			3, 3, 3, 3, 3, 3, 3, 4,
		], // Single // hits 4 at... 43
		[1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6], // Double. Increments every 4 combos.
		[2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12], // Triple. Increments every 2 combos.
		[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], // Quad. Increments every combo.
		[0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3], // T-Spin Mini Single. Same as single, but gets B2B.
		[2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12], // T-Spin Single. Same as triple, but gets B2B.
		[1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6], // T-Spin Mini Double. Same as double, but gets B2B.
		[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], // T-Spin Double. Same as quad.
		[6, 7, 9, 10, 12, 13, 15, 16, 18, 19, 21, 22, 24, 25, 27, 28, 30, 31, 33, 34, 36], // T-Spin Triple. Increments every combo and by 2 every 2 combos.
	], // B2B 0
	[
		[],
		[],
		[], // single double triple
		[5, 6, 7, 9, 10, 11, 12, 13, 15, 16, 17, 18, 20, 21, 22, 23, 25, 26, 27, 28, 30], // Quad
		[1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6], // T-Spin Mini Single
		[3, 4, 4, 5, 6, 6, 7, 8, 9, 9, 10, 11, 12, 12, 13, 14, 15, 15, 16, 17, 18], // T-Spin Single
		[2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12], // T-Spin Mini Double
		[5, 6, 7, 9, 10, 11, 12, 13, 15, 16, 17, 18, 20, 21, 22, 23, 25, 26, 27, 28, 30], // T-Spin Double
		[7, 8, 10, 12, 14, 15, 17, 19, 21, 22, 24, 26, 28, 29, 31, 33, 35, 36, 38, 40, 42], // T-Spin Triple
	], // B2B 1
	[
		[],
		[],
		[], // single double triple
		[6, 8, 9, 11, 12, 14, 16, 18, 19, 19, 21, 22, 24, 25, 27, 28, 30, 31, 33, 34, 36], // Quad
		[2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12], // T-Spin Mini Single
		[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], // T-Spin Single
		[3, 4, 4, 5, 6, 6, 7, 8, 9, 9, 10, 11, 12, 12, 13, 14, 15, 15, 16, 17, 18], // T-Spin Mini Double
		[6, 8, 9, 11, 12, 14, 16, 18, 19, 19, 21, 22, 24, 25, 27, 28, 30, 31, 33, 34, 36], // T-Spin Double
		[8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48], // T-Spin Triple
	], // B2B 2
	[
		[],
		[],
		[], // single double triple
		[7, 8, 10, 12, 14, 15, 17, 19, 22, 23, 24, 26, 28, 29, 31, 33, 35, 36, 38, 40, 42], // Quad
		[3, 4, 4, 5, 6, 6, 7, 8, 9, 9, 10, 11, 12, 12, 13, 14, 15, 15, 16, 17, 18], // T-Spin Mini Single
		[5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18, 20, 21, 22, 23, 25, 26, 27, 28, 30], // T-Spin Single
		[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], // T-Spin Mini Double
		[7, 8, 10, 12, 14, 15, 17, 19, 22, 23, 24, 26, 28, 29, 31, 33, 35, 36, 38, 40, 42], // T-Spin Double
		[9, 11, 13, 15, 18, 20, 22, 24, 27, 29, 31, 33, 36, 38, 40, 42, 45, 47, 49, 51, 54], // T-Spin Triple
	], // B2B 3
	[
		[],
		[],
		[], // single double triple
		[8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48], // Quad
		[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], // T-Spin Mini Single
		[6, 8, 9, 11, 12, 14, 16, 18, 19, 19, 21, 22, 24, 25, 27, 28, 30, 31, 33, 34, 36], // T-Spin Single
		[5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18, 20, 21, 22, 23, 25, 26, 27, 28, 30], // T-Spin Mini Double
		[8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48], // T-Spin Double
		[10, 12, 15, 17, 20, 22, 25, 27, 30, 32, 35, 37, 40, 42, 45, 47, 50, 52, 55, 57, 60], // T-Spin Triple
	], // B2B 4
];

var custom = [new Array(9).fill(new Array(20).fill(0))];

var AttackTable = AttackTable1;

function attackTable(type, combo, B2B) {
	// osk table covers up to 20c and up to B2B level 4
	// past 20c we can attempt to extrapolate patterns, and default to the 20c dammage if we can't
	// past the last B2B level mapped, we fall back to B2B level 0 values and additive B2B level math

	if (type == -1) return 0;
	if (type < 3) B2B = 0; // these two sanity checks shouldn't be necessary and are handled at the upper level but... redundancy?

	let B2B_Level = B2B_level(B2B);

	if (B2B_Level < AttackTable1.length) {
		if (combo < 21) return AttackTable[B2B_Level][type][combo]; // default behaviour: under 21c we can directly reference the table

		if (B2B_Level == 0 && (type == 0 || type == 4)) {
			// these two are nonlinear but it is known that it hits 4 damage at 43 combo
			if (combo >= 43) return 4;
			return AttackTable[B2B_Level][type][20];
		}

		LE = linear(AttackTable[B2B_Level][type]); // attempt to extrapolate linear pattern
		if (LE.length == 3) {
			return LE[0] * combo + Math.floor(combo / LE[1]) + LE[2];
		}

		return AttackTable[B2B_Level][type][20]; // default to final value in the table
		// or we can default to [B2B_0 + additive_b2b_level] math instead, would that be better??
	}

	return attackTable(type, combo, 0) + B2B_Level; // past the mapped table we fall back on the math of additive B2B level
}

function verify(list, a, b, c) {
	for (i = 1; i < list.length; i++) {
		if (a * i + Math.floor(i / b) + c != list[i]) return false;
	}
	return true;
}
let memoized_linears = {};
function linear(list) {
	if (list in memoized_linears) {
		// caching results
		return memoized_linears[list];
	}
	for (a = 0; a < 200; a++) {
		for (b = -20; b < 20; b++) {
			for (c = 0; c < 200; c++) {
				if (verify(list, a, b, c)) {
					memoized_linears[list] = [a, b, c];
					return [a, b, c];
				}
			}
		}
	}
	memoized_linears[list] = [];
	return [];
}

function calculate() {
	table_used = document.getElementById('attack table').value;
	if (table_used == 1) AttackTable = AttackTable1;
	if (table_used == 2) AttackTable = AttackTable2;
	if (table_used == 3) AttackTable = custom;

	let type_0 = document.getElementById('attack type 0').value;
	let PC_0 = document.getElementById('PC 0').checked;

	let combo_0 = document.getElementById('base combo').valueAsNumber;
	if (isNaN(combo_0)) combo_0 = -1;
	if (type_0 != -1) combo_0++;

	let B2B_0 = document.getElementById('base B2B').valueAsNumber;
	if (isNaN(B2B_0)) B2B_0 = -1;
	if (type_0 >= 3) B2B_0++;

	let damage_0 = 0;
	if (type_0 != -1) damage_0 = attackTable(type_0, combo_0, B2B_0);

	if (PC_0) {
		if (damage_0 == 0) document.getElementById('damage 0').innerHTML = 10;
		else document.getElementById('damage 0').innerHTML = damage_0.toString() + ' + 10';
		damage_0 += 10;
	} else document.getElementById('damage 0').innerHTML = damage_0;

	let types = [type_0];
	let combos = [combo_0];
	let B2Bs = [B2B_0];
	let damages = [damage_0];

	for (i = 1; i < num_attacks; i++) {
		let type = document.getElementById('attack type ' + i.toString()).value;
		let PC = document.getElementById('PC ' + i.toString()).checked;

		types.push(type);

		let combo = combos[i - 1] + 1;
		if (type == -1) combo = -1;
		combos.push(combo);

		let B2B = B2Bs[i - 1];
		if (type >= 0 && type <= 2) B2B = -1;
		if (type >= 3) B2B++;
		B2Bs.push(B2B);

		let damage = 0;
		if (type != -1) damage = attackTable(type, combo, B2B);
		if (PC) {
			if (damage == 0) document.getElementById('damage ' + i.toString()).innerHTML = 10;
			else document.getElementById('damage ' + i.toString()).innerHTML = damage.toString() + ' + 10';
			damage += 10;
		} else document.getElementById('damage ' + i.toString()).innerHTML = damage;

		damages.push(damage);
	}

	let total = damages.reduce((a, b) => a + b, 0); // sum
	console.log(damages, total); // debugging purposes. Can log the other arrays too for more info if so desired.
	document.getElementById('total damage').innerHTML = damages.reduce((a, b) => a + b, 0);
}
