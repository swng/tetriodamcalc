# tetriodamcalc
damage calculator for tetr.io

aaaaah I barely know what I'm doing

Enter individual attacks and the calculator will calculate damage sent according to the [tetr.io attack table](https://cdn.discordapp.com/attachments/674421736162197515/716081165886423110/2020-05-30_02-07-18.png). Maybe add importing custom attack tables later idk

As per the chart, your first combo or B2B is your 0th. Thus a non combo/B2B is represented with a -1. Be cognizant of that when setting base values.

Combo chains and B2B chains are assumed for consecutive inputted attacks. To break combo chain, enter a None attack; to break B2B, enter a non-Quad/T-Spin/None attack (a single/double/triple).

Disclaimer: I barely know what I'm doing. On the accuracy of the calculator's values:  
Calculator defaults to table values when B2B level <=4 and combo <=20 (when the chart has values).  
Extrapolated linear formulas for all attack types for all charted 5 B2B levels except the two nonlinear ones. When B2B level <= 4 and combo 20, calculator uses these extrapolated linear formulas.  
Single and TSSM at B2B 0 don't appear to be linear so calculator defaults to 3 damage (the final mapped value in attack table) for combo > 20c.  
For B2B level > 4, there are no mapped chart values. Calculator defaults to additive B2B level math - that is, [B2B lv 0 damage] + [B2B level]. Note that for high combos this formula is probably lower than the true in-game damage.

Final note - since official table values are known to be slightly off from in-game damage, the calculator adhering to the official table will be off in the same way.

I intend to slowly update the internal attack table (deviating from the official osk table) through testing.

Pls let me (swng#1965) know if you have any insights :3
