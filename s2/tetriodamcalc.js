import { damcalc } from 'damcalc.js';

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
// used for encoding

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
		for (let i = 0; i < 9; i++) container.removeChild(container.lastChild);
		num_rendered--;
	}
	for (let i = num_rendered; i < num_attacks; i++) {
		var attackType = document.createElement('select');
		attackType.id = 'attack type ' + i;
		var attackTypeLabel = document.createElement('label');
		attackTypeLabel.htmlFor = attackType.id;
		attackTypeLabel.innerText = `(${i}) Attack type: `;
		var PC = document.createElement('input');
		PC.id = 'PC ' + i;
		PC.type = 'checkbox';
		var PCLabel = document.createElement('label');
		PCLabel.htmlFor = PC.id;
		PCLabel.innerText = ' PC? ';
        var garbageClear = document.createElement('input');
		garbageClear.id = 'gc ' + i;
		garbageClear.type = 'checkbox';
		var GarbageClearLabel = document.createElement('label');
		GarbageClearLabel.htmlFor = garbageClear.id;
		GarbageClearLabel.innerText = ' Garbage Clear? ';

		attackType.append(new Option('None', -1));
		attackType.append(new Option('0) Single', 0));
		attackType.append(new Option('1) Double', 1));
		attackType.append(new Option('2) Triple', 2));
		attackType.append(new Option('3) Quad', 3));
		attackType.append(new Option('4) X-Spin Single', 4));
		attackType.append(new Option('5) T-Spin Single', 5));
		attackType.append(new Option('6) X-Spin Double', 6));
		attackType.append(new Option('7) T-Spin Double', 7));
		attackType.append(new Option('8) X-Spin Triple', 8));
        attackType.append(new Option('9) T-Spin Triple', 9));

		var damage_0 = document.createElement('span');
		damage_0.innerText = ' Damage: ';
		var damage_1 = document.createElement('span');
		damage_1.id = 'damage ' + i;
		damage_1.innerText = 0;

		container.appendChild(attackTypeLabel);
		container.appendChild(attackType);
		container.appendChild(PCLabel);
		container.appendChild(PC);
        container.appendChild(GarbageClearLabel);
		container.appendChild(garbageClear);
		container.appendChild(damage_0);
		container.appendChild(damage_1);

		container.appendChild(document.createElement('p'));
		num_rendered++;
	}
}

window.constants = {
	scoring: {
        SINGLE: 100,
        DOUBLE: 300,
        TRIPLE: 500,
        QUAD: 800,
        PENTA: 1200,
        TSPIN_MINI: 100,
        TSPIN: 400,
        TSPIN_MINI_SINGLE: 200,
        TSPIN_SINGLE: 800,
        TSPIN_MINI_DOUBLE: 400,
        TSPIN_DOUBLE: 1200,
        TSPIN_MINI_TRIPLE: 800,
        TSPIN_TRIPLE: 1600,
        TSPIN_MINI_QUAD: 1600,
        TSPIN_QUAD: 2600,
        TSPIN_PENTA: 3200,
        BACKTOBACK_MULTIPLIER: 1.5,
        COMBO: 50,
        ALL_CLEAR: 3500,
        SOFTDROP: 1,
        HARDDROP: 2,
    },
    garbage: {
        SINGLE: 0,
        DOUBLE: 1,
        TRIPLE: 2,
        QUAD: 4,
        PENTA: 5,
        TSPIN_MINI: 0,
        TSPIN: 0,
        TSPIN_MINI_SINGLE: 0,
        TSPIN_SINGLE: 2,
        TSPIN_MINI_DOUBLE: 1,
        TSPIN_DOUBLE: 4,
        TSPIN_MINI_TRIPLE: 2,
        TSPIN_TRIPLE: 6,
        TSPIN_MINI_QUAD: 4,
        TSPIN_QUAD: 10,
        TSPIN_PENTA: 12,
        BACKTOBACK_BONUS: 1,
        BACKTOBACK_BONUS_LOG: 0.8,
        COMBO_MINIFIER: 1,
        COMBO_MINIFIER_LOG: 1.25,
        COMBO_BONUS: 0.25,
        ALL_CLEAR: 10,
        combotable: { none: [0], "classic guideline": [0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5], "modern guideline": [0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4] },
    },
};

window.gameState = {
	setoptions: {
        seed_random: !0,
        allow180: !0,
        countdown: !0,
        stride: !0,
        display_zen: !0,
        slot_bar2: "progress",
        mission_type: "mission_free",
        objective_type: "none",
        song: "RANDOMcalm",
        bgmnoreset: !0,
        nosiren: !0,
        infinite_stock: !0,
        zenlevels: !0,
        can_retry: !0,
        can_undo: !0,
        nolockout: !0,
        retryisclear: !0,
        usezenconfig: !0,
        noreplay: !0,
        garbagemultiplier: 1,
        pro: !0,
        b2bcharging: !0,
        b2bcharge_at: 4,
        b2bcharge_base: 3,
        allclear_garbage: 5,
        allclear_b2b: 1,
        allclear_b2b_sends: !1,
        allclear_b2b_dupes: !1,
        allclear_charges: !1,
        b2bextras: !1,
        garbagespecialbonus: !0,
		b2bchaining: !1,
        roundmode: "down", // TL
        zenith: !1,
        zenith_expert: !1,
        combotable: "multiplier",
        allclears: !0,
        spinbonuses: "all-mini"

	},
	stats: {
        lines: 0,
        level_lines: 0,
        level_lines_needed: 1,
        inputs: 0,
        holds: 0,
        score: 0,
        zenlevel: 1,
        zenprogress: 0,
        level: 0,
        combo: 0,
        topcombo: 0,
        combopower: 0,
        btb: 0,
        topbtb: 0,
        btbpower: 0,
        tspins: 0,
        piecesplaced: 0,
        clears: {
            singles: 0,
            doubles: 0,
            triples: 0,
            quads: 0,
            pentas: 0,
            realtspins: 0,
            minitspins: 0,
            minitspinsingles: 0,
            tspinsingles: 0,
            minitspindoubles: 0,
            tspindoubles: 0,
            minitspintriples: 0,
            tspintriples: 0,
            minitspinquads: 0,
            tspinquads: 0,
            tspinpentas: 0,
            allclear: 0,
        },
        garbage: { sent: 0, sent_nomult: 0, maxspike: 0, maxspike_nomult: 0, received: 0, attack: 0, cleared: 0 },
        kills: 0,
        finesse: { combo: 0, faults: 0, perfectpieces: 0 },
        zenith: {
            altitude: 0,
            rank: 1,
            peakrank: 1,
            avgrankpts: 0,
            floor: 0,
            targetingfactor: 3,
            targetinggrace: 0,
            totalbonus: 0,
            revives: 0,
            revivesTotal: 0,
            revivesMaxOfBoth: 0,
            speedrun: !1,
            speedrun_seen: !1,
            splits: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
    },
	currentbtbchainpower: 0,
};

function link() { // generate encoded link
    let result = window.location.origin + window.location.pathname + "?";

    let combo_0 = document.getElementById('base combo').valueAsNumber;
    if (isNaN(combo_0)) combo_0 = -1;
    result += combo_0.toString() + "&";
    let B2B_0 = document.getElementById('base B2B').valueAsNumber;
    if (isNaN(B2B_0)) B2B_0 = -1;
    result += B2B_0.toString() + "&";

    for (let i = 0; i < num_attacks; i++) {
        let a = parseInt(document.getElementById('attack type ' + i.toString()).value)+1; // between 0 and 9
        console.log("a ", a)
        let b = document.getElementById('PC ' + i.toString()).checked;
        let c = document.getElementById('gc ' + i.toString()).checked;

        a *= 2;
        if (b) a++;
        // between 0 and 19 now
        a *= 2;
        if (c) a++;
        // between 0 and 39 now
        console.log(a);
        console.log(alphabet[a]);

        result += alphabet[a]; // alphabet encoding, good enough. Certainly there's more efficient ways to encode in less characters but this is good enough
    
    }
    console.log(result);
    navigator.clipboard.writeText(result);
}

// function damcalc(linesCleared, isAllClear, isGarbageClear){}


function attackTable(type, combo, B2B, PC, gc) {
    window.gameState.stats.combo = combo;

    let linesCleared = 0;
    if (type == 0 || type == 4 || type == 5) linesCleared = 1;
    if (type == 1 || type == 6 || type == 7) linesCleared = 2;
    if (type == 2 || type == 8 || type == 9) linesCleared = 3;
    if (type == 3) linesCleared = 4;

    let isSpinActive;
    let isMiniSpin;
    if (type <= 3) {isSpinActive = false; isMiniSpin = false;}
    if (type == 4 || type == 6 ||type == 8) {isSpinActive = true; isMiniSpin = true;}
    if (type == 5 || type == 7 || type == 9) {isSpinActive = true; isMiniSpin = false;}

    // console.log(linesCleared, PC, gc, isSpinActive, isMiniSpin);
    return damcalc(linesCleared, PC, gc, isSpinActive, isMiniSpin);

}





function calculate() {
	let type_0 = document.getElementById('attack type 0').value;
	let PC_0 = document.getElementById('PC 0').checked;
    let gc_0 = document.getElementById('gc 0').checked;

	let combo_0 = document.getElementById('base combo').valueAsNumber;
	if (isNaN(combo_0)) combo_0 = -1;
	if (type_0 != -1) combo_0++;

	let B2B_0 = document.getElementById('base B2B').valueAsNumber;
	if (isNaN(B2B_0)) B2B_0 = -1;
	if (type_0 >= 3) B2B_0++;

    window.gameState.stats.combo = combo_0;
    window.gameState.stats.btb = B2B_0;

	let damage_0 = 0;
	if (type_0 != -1) damage_0 = attackTable(type_0, combo_0, B2B_0, PC_0, gc_0);

	if (PC_0) {
		if (damage_0 == 0) document.getElementById('damage 0').innerHTML = window.gameState.setoptions.allclear_garbage;
		else document.getElementById('damage 0').innerHTML = damage_0.toString() + ' + ' + window.gameState.setoptions.allclear_garbage;
		damage_0 += window.gameState.setoptions.allclear_garbage;
	} else document.getElementById('damage 0').innerHTML = damage_0;

	let types = [type_0];
	let combos = [combo_0];
	let B2Bs = [B2B_0];
	let damages = [damage_0];

	for (let i = 1; i < num_attacks; i++) {
		let type = document.getElementById('attack type ' + i.toString()).value;
		let PC = document.getElementById('PC ' + i.toString()).checked;
        let gc = document.getElementById('gc ' + i.toString()).checked;

		types.push(type);

		let combo = combos[i - 1] + 1;
		if (type == -1) combo = -1;
		combos.push(combo);

		let B2B = B2Bs[i - 1];
		if (type >= 0 && type <= 2) B2B = -1;
		if (type >= 3) B2B++;
		B2Bs.push(B2B);

		let damage = 0;
		if (type != -1) damage = attackTable(type, combo, B2B, PC, gc);
		if (PC) {
			if (damage == 0) document.getElementById('damage ' + i.toString()).innerHTML = window.gameState.setoptions.allclear_garbage;
			else document.getElementById('damage ' + i.toString()).innerHTML = damage.toString() + ' + ' + window.gameState.setoptions.allclear_garbage;
			damage += window.gameState.setoptions.allclear_garbage;
		} else document.getElementById('damage ' + i.toString()).innerHTML = damage;

		damages.push(damage);

        console.log("le b2b", window.gameState.stats.btb);
	}

	let total = damages.reduce((a, b) => a + b, 0); // sum
	console.log(damages, total); // debugging purposes. Can log the other arrays too for more info if so desired.
	document.getElementById('total damage').innerHTML = damages.reduce((a, b) => a + b, 0);
}



window.calculate = calculate;
window.addField = addField;
window.removeField = removeField;
window.link = link;

let queries = window.location.search.slice(1).split("&"); // load encoded link
if (queries.length == 3) {
    let combo_0 = parseInt(queries[0]);
    if (isNaN(combo_0)) combo_0 = -1;
    document.getElementById('base combo').value = combo_0;
    let B2B_0 = parseInt(queries[1]);
    if (isNaN(B2B_0)) B2B_0 = -1;
    document.getElementById('base B2B').value = B2B_0;

    num_attacks = Math.min(Math.max(1, queries[2].length), 999);
    renderFields();
    
    for (let i = 0; i < num_attacks; i++) {
        let encoding = alphabet.indexOf(queries[2][i]);
        console.log(encoding);
        if (encoding % 2 == 1) {
            document.getElementById('gc ' + i.toString()).checked = true;
            encoding--;
        }
        encoding /= 2;
        if (encoding % 2 == 1) {
            document.getElementById('PC ' + i.toString()).checked = true;
            encoding--;
        }
        encoding /= 2;
        encoding--;
        document.getElementById('attack type ' + i.toString()).value = encoding.toString();

    }

    calculate();
}