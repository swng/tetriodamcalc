var num_attacks = 11;

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

// lol hardcoded attack table. Hopefully I didn't typo when typing them out...
// osk table covers up to 20c and up to B2B level 4
var AttackTable = [
	// straight taken from osk's table: https://cdn.discordapp.com/attachments/674421736162197515/716081165886423110/2020-05-30_02-07-18.png
	[
		[0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3], // Single
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

function attackTable(type, combo, B2B) {
	// osk table covers up to 20c and up to B2B level 4
	// past 20c we can attempt to extrapolate patterns, and default to the 20c dammage if we can't
	// past the last B2B level mapped, we fall back to B2B level 0 values and additive B2B level math

	if (type == -1) return 0;
	if (type < 3) B2B = 0; // these two sanity checks shouldn't be necessary and are handled at the upper level but... redundancy?

	var B2B_Level = B2B_level(B2B);

	if (B2B_Level == 0) {
		if (combo < 21) return AttackTable[B2B_Level][type][combo]; // default behaviour: under 21c we can directly reference the table
		// past that, we have to attempt to extrapolate patterns
		if (type == 0 || type == 4) {
			return AttackTable[B2B_Level][type][20]; // nonlinear pattern idk
		}
		if (type == 1 || type == 6) {
			return Math.floor(combo / 4) + 1;
		}
		if (type == 2 || type == 5) {
			return Math.floor(combo / 2) + 2;
		}
		if (type == 3 || type == 7) {
			return combo + 4;
		}
		if (type == 8) {
			return Math.floor((combo + 12) / 2) + combo;
		}
		return AttackTable[B2B_Level][type][20]; // default to final value in the table
	}
	if (B2B_Level == 1) {
		if (combo < 21) return AttackTable[B2B_Level][type][combo]; // default behaviour: under 21c we can directly reference the table
		// past that, we have to attempt to extrapolate patterns
		if (type == 3 || type == 7) {
			return combo + Math.floor(combo / 4) + 5;
		}
		if (type == 4) {
			return Math.floor(combo / 4) + 1;
		}
		if (type == 5) {
			return combo - Math.floor(combo / 4) + 3;
		}
		if (type == 6) {
			return Math.floor(combo / 2) + 2;
		}
		if (type == 8) {
			return 2 * combo - Math.floor(combo / 4) + 7;
		}

		return AttackTable[B2B_Level][type][20]; // or we can default to [B2B_0 + additive_b2b_level] math instead, would that be better??
	}
	if (B2B_Level == 2) {
		if (combo < 21) return AttackTable[B2B_Level][type][combo];
		if (type == 3 || type == 7) {
			return Math.floor((combo + 12) / 2) + combo;
		}
		if (type == 4) {
			return Math.floor(combo / 2) + 2;
		}
		if (type == 5) {
			return combo + 4;
		}
		if (type == 6) {
			return combo - Math.floor(combo / 4) + 3;
		}
		if (type == 8) {
			return 2 * combo + 8;
		}
		return AttackTable[B2B_Level][type][20];
	}
	if (B2B_Level == 3) {
		if (combo < 21) return AttackTable[B2B_Level][type][combo];
		if (type == 3 || type == 7) {
			return 2 * combo - Math.floor(combo / 4) + 7;
		}
		if (type == 4) {
			return combo - Math.floor(combo / 4) + 3;
		}
		if (type == 5) {
			return combo + Math.floor(combo / 4) + 5;
		}
		if (type == 6) {
			return combo + 4;
		}
		if (type == 8) {
			return 2 * combo + Math.floor(combo / 4) + 9;
		}
		return AttackTable[B2B_Level][type][20];
	}
	if (B2B_Level == 4) {
		if (combo < 21) return AttackTable[B2B_Level][type][combo];
		if (type == 3 || type == 7) {
			return 2 * combo + 8;
		}
		if (type == 4) {
			return combo + 4;
		}
		if (type == 5) {
			return Math.floor((combo + 12) / 2) + combo;
		}
		if (type == 6) {
			return combo + Math.floor(combo / 4) + 5;
		}
		if (type == 8) {
			return 2 * combo + Math.floor(combo / 2) + 10;
		}

		return AttackTable[B2B_Level][type][20];
	}

	return attackTable(type, combo, 0) + B2B_Level; // past the mapped table we fall back on the math of additive B2B level
}

/* unused functions used for debugging to extrapolate linear functions from attack table patterns:

            function verify(list, a, b, c) {
                for (i = 1; i < list.length; i++) {
                    if (a*i + Math.floor(i/b) + c != list[i]) return false;
                }
                return true;
            }

            function linear(list) {
                for (a = 0; a < 200; a++) {
                    for (b = -20; b < 20; b++) {
                        for (c = 0; c < 200; c++) {
                            if (verify(list, a, b, c)) {
                                console.log(a,b,c);
                                console.log(a.toString() + "*combo + Math.floor(combo/" + b.toString() + ") + " + c.toString() );
                                return;
                            }
                        }
                    }
                }
                console.log("rip idk");
                return;
            }
            */

function calculate() {
	var type_0 = document.getElementById('attack type 0').value;
	var PC_0 = document.getElementById('PC 0').checked;

	var combo_0 = document.getElementById('base combo').valueAsNumber;
	if (isNaN(combo_0)) combo_0 = -1;
	if (type_0 != -1) combo_0++;

	var B2B_0 = document.getElementById('base B2B').valueAsNumber;
	if (isNaN(B2B_0)) B2B_0 = -1;
	if (type_0 >= 3) B2B_0++;

	if (type_0 == -1) var damage_0 = 0;
	else var damage_0 = attackTable(type_0, combo_0, B2B_0);
	if (PC_0) damage_0 += 10; // technically PC damage comes separately and that should be indicated but whatever

	document.getElementById('damage 0').innerHTML = damage_0;

	types = [type_0];
	combos = [combo_0];
	B2Bs = [B2B_0];
	damages = [damage_0];

	for (i = 1; i < num_attacks; i++) {
		var type = document.getElementById('attack type ' + i.toString()).value;
		var PC = document.getElementById('PC ' + i.toString()).checked;

		types.push(type);

		var combo = combos[i - 1] + 1;
		if (type == -1) combo = -1;
		combos.push(combo);

		var B2B = B2Bs[i - 1];
		if (type >= 0 && type <= 2) B2B = -1;
		if (type >= 3) B2B++;
		B2Bs.push(B2B);

		if (type == -1) var damage = 0;
		else var damage = attackTable(type, combo, B2B);
		if (PC) damage += 10;

		damages.push(damage);
		document.getElementById('damage ' + i.toString()).innerHTML = damage;
	}

	var total = damages.reduce((a, b) => a + b, 0); // sum
	console.log(damages, total); // debugging purposes. Can log the other arrays too for more info if so desired.
	document.getElementById('total damage').innerHTML = damages.reduce((a, b) => a + b, 0);
}
