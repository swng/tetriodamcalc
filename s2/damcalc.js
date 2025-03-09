function AutoRound(e) {
    switch (gameState.setoptions.roundmode) {
        case "down":
            return Math.floor(e);
        // case "rng": {
        //     const n = Math.floor(e);
        //     if (n === e) return e;
        //     const s = e - n;
        //     return n + (t.rngex.nextFloat() < s ? 1 : 0);
        // }
    }
    return 0;
}

export function damcalc(linesCleared, isAllClear, isGarbageClear, isSpin, isMiniSpin) {
    let backToBackBonus = 0;

    let surge = 0;

    // Update statistics
    window.gameState.stats.lines += linesCleared;

    // Add bonus for all clear
    if (isAllClear) {
        backToBackBonus += gameState.setoptions.allclear_b2b;
    }

    // Check for spins
    // const isSpin = gameEngine.fm.IsSpin();
    // const isMiniSpin = gameEngine.fm.IsSpinMini();
    // const isAnySpinType = isSpin || (gameState.falling.type !== "t" && isMiniSpin);

    // Handle zenith all-spin mode
    if ((linesCleared || isSpin) && gameState.setoptions.zenith_allspin) {
        const clearType = `${linesCleared}:${isSpin ? gameState.falling.type : "-"}:${(isMiniSpin ? "Mini" : "Spin") || "none"}`;

        gameState.zenith.lastclearwasdupe = gameState.zenith.lastclear === clearType;
        gameState.zenith.lastclear = clearType;
    }

    // Handle line clears
    if (linesCleared) {
        // Handle combo
        if (gameState.setoptions.combotable !== "none") {
            gameState.stats.combo++;
            gameState.stats.topcombo = Math.max(gameState.stats.combo, gameState.stats.topcombo);
        }

        // Handle quad lines or spin
        if (linesCleared >= 4) {
            backToBackBonus++;
        } else if (isSpin) {
            backToBackBonus++;
        }

        // Handle all clear B2B interactions
        if (isAllClear && !gameState.setoptions.allclear_b2b_dupes) {
            backToBackBonus = Math.max(gameState.setoptions.allclear_b2b, backToBackBonus - gameState.setoptions.allclear_b2b);
        }

        if (gameState.setoptions.allclear_charges && isAllClear) {
            backToBackBonus = Math.max(backToBackBonus, gameState.setoptions.b2bcharge_at + 1 - gameState.stats.btb);
        }

        // Apply back-to-back bonuses if there are any
        if (backToBackBonus > 0) {
            gameState.stats.btb += backToBackBonus;
            gameState.stats.topbtb = Math.max(gameState.stats.btb, gameState.stats.topbtb);
        } else {
            // Handle back-to-back surge
            if (gameState.setoptions.b2bcharging && gameState.stats.btb > gameState.setoptions.b2bcharge_at) {
                surge = Math.floor((gameState.stats.btb - gameState.setoptions.b2bcharge_at + gameState.setoptions.b2bcharge_base) * gameState.setoptions.garbagemultiplier);
            }

            // Reset back-to-back counter
            gameState.stats.btb = 0;
        }
    } else {
        // No lines cleared

        gameState.stats.combo = 0;
        gameState.stats.combopower = 0;
    }

    // Handle T-spin effects
    if (isSpin) {
        gameState.stats.tspins++;
    }

    // Calculate score and garbage values
    let scoreValue = 0;
    let garbageValue = 0;

    // Determine base score and garbage based on clear type
    switch (linesCleared) {
        case 0:
            if (isMiniSpin) {
                scoreValue = constants.scoring.TSPIN_MINI;
                garbageValue = constants.garbage.TSPIN_MINI;
                gameState.stats.clears.minitspins++;
            } else if (isSpin) {
                scoreValue = constants.scoring.TSPIN;
                garbageValue = constants.garbage.TSPIN;
                gameState.stats.clears.realtspins++;
            }
            break;

        case 1:
            if (isMiniSpin) {
                scoreValue = constants.scoring.TSPIN_MINI_SINGLE;
                garbageValue = constants.garbage.TSPIN_MINI_SINGLE;
                gameState.stats.clears.minitspinsingles++;
            } else if (isSpin) {
                scoreValue = constants.scoring.TSPIN_SINGLE;
                garbageValue = constants.garbage.TSPIN_SINGLE;
                gameState.stats.clears.tspinsingles++;
            } else {
                scoreValue = constants.scoring.SINGLE;
                garbageValue = constants.garbage.SINGLE;
                gameState.stats.clears.singles++;

                if (gameState.setoptions.zenith && !gameState.setoptions.zenith_expert && gameState.stats.combo === 1) {
                    garbageValue++;
                }
            }
            break;

        case 2:
            if (isMiniSpin) {
                scoreValue = constants.scoring.TSPIN_MINI_DOUBLE;
                garbageValue = constants.garbage.TSPIN_MINI_DOUBLE;
                gameState.stats.clears.minitspindoubles++;
            } else if (isSpin) {
                scoreValue = constants.scoring.TSPIN_DOUBLE;
                garbageValue = constants.garbage.TSPIN_DOUBLE;
                gameState.stats.clears.tspindoubles++;
            } else {
                scoreValue = constants.scoring.DOUBLE;
                garbageValue = constants.garbage.DOUBLE;
                gameState.stats.clears.doubles++;
            }
            break;

        case 3:
            if (isMiniSpin) {
                scoreValue = constants.scoring.TSPIN_MINI_TRIPLE;
                garbageValue = constants.garbage.TSPIN_MINI_TRIPLE;
                gameState.stats.clears.minitspintriples++;
            } else if (isSpin) {
                scoreValue = constants.scoring.TSPIN_TRIPLE;
                garbageValue = constants.garbage.TSPIN_TRIPLE;
                gameState.stats.clears.tspintriples++;
            } else {
                scoreValue = constants.scoring.TRIPLE;
                garbageValue = constants.garbage.TRIPLE;
                gameState.stats.clears.triples++;
            }
            break;

        case 4:
            if (isMiniSpin) {
                scoreValue = constants.scoring.TSPIN_MINI_QUAD;
                garbageValue = constants.garbage.TSPIN_MINI_QUAD;
                gameState.stats.clears.minitspinquads++;
            } else if (isSpin) {
                scoreValue = constants.scoring.TSPIN_QUAD;
                garbageValue = constants.garbage.TSPIN_QUAD;
                gameState.stats.clears.tspinquads++;
            } else {
                scoreValue = constants.scoring.QUAD;
                garbageValue = constants.garbage.QUAD;
                gameState.stats.clears.quads++;
            }

            break;

        case 5:
            if (isSpin) {
                scoreValue = constants.scoring.TSPIN_PENTA;
                garbageValue = constants.garbage.TSPIN_PENTA;
                gameState.stats.clears.tspinpentas++;
            } else {
                scoreValue = constants.scoring.PENTA;
                garbageValue = constants.garbage.PENTA;
                gameState.stats.clears.pentas++;
            }
            break;

        default:
            const extraLines = linesCleared - 5;

            if (isSpin) {
                scoreValue = constants.scoring.TSPIN_PENTA + 600 * extraLines;
                garbageValue = constants.garbage.TSPIN_PENTA + 2 * extraLines;
            } else {
                scoreValue = constants.scoring.PENTA + 400 * extraLines;
                garbageValue = constants.garbage.PENTA + extraLines;
            }
            break;
    }

    // Reduce garbage for non-T spins if in handheld mode
    if (isSpin && gameState.setoptions.spinbonuses === "handheld" && gameState.falling.type !== "t") {
        garbageValue /= 2;
    }

    // Check if all clear bonus should affect garbage
    const shouldApplyAllClearToGarbage = gameState.setoptions.allclear_b2b_sends || !(gameState.setoptions.allclear_b2b === backToBackBonus && isAllClear);

    // console.log(garbageValue);
    // console.log(gameState.stats.btb);

    // Apply back-to-back bonuses
    if (linesCleared && gameState.stats.btb > 1) {
        // Apply score multiplier for back-to-back
        if (shouldApplyAllClearToGarbage) {
            scoreValue *= constants.scoring.BACKTOBACK_MULTIPLIER;
        }

        // Handle b2b chaining
        if (gameState.setoptions.b2bchaining) {
            const b2bChainBonus =
                constants.garbage.BACKTOBACK_BONUS *
                (Math.floor(1 + Math.log1p((gameState.stats.btb - 1) * constants.garbage.BACKTOBACK_BONUS_LOG)) +
                    (gameState.stats.btb - 1 === 1 ? 0 : (1 + (Math.log1p((gameState.stats.btb - 1) * constants.garbage.BACKTOBACK_BONUS_LOG) % 1)) / 3));
            // Apply b2b bonus to garbage
            if (shouldApplyAllClearToGarbage) {
                garbageValue += b2bChainBonus;
            }
        } else if (shouldApplyAllClearToGarbage) {
            // Apply simpler b2b bonus for non-chaining mode
            let b2bBonusMultiplier = 1;

            if (gameState.setoptions.b2bextras && (linesCleared === 4 || (linesCleared >= 2 && isSpin))) {
                b2bBonusMultiplier = 2;
            }

            garbageValue += constants.garbage.BACKTOBACK_BONUS * b2bBonusMultiplier;
        }
    } else if (linesCleared && gameState.stats.btb <= 1) {
        // Reset btb power on first clear in a b2b chain
        gameState.stats.btbpower = 0;
    }

    // console.log(garbageValue);

    // Apply combo bonuses
    if (gameState.stats.combo > 1) {
        // Add combo score bonus
        scoreValue += constants.scoring.COMBO * (gameState.stats.combo - 1);

        // Apply combo garbage bonus
        if (gameState.setoptions.combotable === "multiplier") {
            // Multiplier combo table
            garbageValue *= 1 + constants.garbage.COMBO_BONUS * (gameState.stats.combo - 1);

            if (gameState.stats.combo > 2) {
                garbageValue = Math.max(Math.log1p(constants.garbage.COMBO_MINIFIER * (gameState.stats.combo - 1) * constants.garbage.COMBO_MINIFIER_LOG), garbageValue);
            }
        } else {
            // Fixed combo table
            const comboTable = constants.garbage.combotable[gameState.setoptions.combotable] || [0];
            garbageValue += comboTable[Math.max(0, Math.min(gameState.stats.combo - 2, comboTable.length - 1))];
        }
    }

    // Apply garbage target bonus for multiplayer
    if (linesCleared && gameState.setoptions.garbagetargetbonus !== "none") {
        let targetBonus = 0;

        // switch (gameState.enemies.length) {
        //     case 0:
        //     case 1:
        //         break;
        //     case 2:
        //         targetBonus += 1;
        //         break;
        //     case 3:
        //         targetBonus += 3;
        //         break;
        //     case 4:
        //         targetBonus += 5;
        //         break;
        //     case 5:
        //         targetBonus += 7;
        //         break;
        //     default:
        //         targetBonus += 9;
        // }

        if (gameState.setoptions.garbagetargetbonus === "offensive") {
            garbageValue += targetBonus;
        } else {
            gameState.garbagebonus = targetBonus * gameState.setoptions.garbagemultiplier;
        }
    }

    // Calculate final garbage value with multiplier
    let finalGarbageValue = AutoRound(garbageValue * gameState.setoptions.garbagemultiplier);

    // Add extra garbage for garbage clears
    if (gameState.setoptions.garbagespecialbonus && isGarbageClear && (linesCleared === 4 || isSpin)) {
        finalGarbageValue++;
    }

    // Apply garbage attack cap if set
    if (gameState.setoptions.garbageattackcap) {
        finalGarbageValue = Math.floor(Math.min(gameState.setoptions.garbageattackcap, finalGarbageValue));
    }

    // Update combo power
    if (gameState.stats.combo > 2) {
        gameState.stats.combopower = Math.min(Math.max(gameState.stats.combopower, finalGarbageValue), 7);
    }

    // Apply level multiplier to score
    scoreValue *= gameState.stats.level;

    // Add to total score
    gameState.stats.score += scoreValue;

    // Update zen progress if enabled
    // if (gameState.setoptions.zenlevels) {
    //     gameState.stats.zenprogress += gameEngine.znm.ScoreToZenProgress(scoreValue, gameState.stats.zenlevel);
    // }

    // Handle garbage based on blocking mode
    // switch (gameState.setoptions.garbageblocking) {
    //     case "combo blocking":
    //         if (linesCleared) {
    //             gameEngine.atm.FightLines(finalGarbageValue);
    //         }
    //         return linesCleared > 0;

    //     case "limited blocking":
    //         if (linesCleared) {
    //             gameEngine.atm.FightLines(finalGarbageValue);
    //         }
    //         return false;

    //     case "none":
    //         gameState.stats.garbage.attack += finalGarbageValue;
    //         gameEngine.atm.Offence(finalGarbageValue);
    //         return false;

    //     default:
    //         // Default behavior - perform standard garbage blocking
    //         return false;
    // }

    return finalGarbageValue + surge;
}
