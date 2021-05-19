# tetriodamcalc
damage calculator for tetr.io

aaaaah I barely know what I'm doing

Enter individual attacks and the calculator will calculate damage sent according to the [tetr.io attack table](https://cdn.discordapp.com/attachments/674421736162197515/716081165886423110/2020-05-30_02-07-18.png). Maybe add importing custom attack tables later idk

As per the chart, your first combo or B2B is your 0th. Thus a non combo/B2B is represented with a -1. Be cognizant of that when setting base values.

Combo chains and B2B chains are assumed for consecutive inputted attacks. To break combo chain, enter a None attack; to break B2B, enter a non-Quad/T-Spin/None attack (a single/double/triple).

Disclaimer: I barely know what I'm doing. On the accuracy of the calculator's values:  
osk chart is AttackTable1.  
Calculator defaults to table values when B2B level <=4 and combo <=20 (when the chart has values).  
When B2B level <= 4 and combo > 20, calculator extrapolates a linear pattern from chart.  
Single and TSSM at B2B 0 don't appear to be linear so this is manually handled.
For B2B level > 4, there are no mapped chart values. Calculator defaults to additive B2B level math - that is, [B2B lv 0 damage] + [B2B level]. Note that for high combos this formula is probably lower than the true in-game damage.

Final note - since official table values are known to be slightly off from in-game damage in some places, the calculator adhering to the official table will be off in the same way.

AttackTable2 is currently the exact same as osk chart but I intend to slowly test in-game and correct values (deviating from the official osk table). This will fix individual values but probably break linearity so extrapolation to high combos will likely fail.

Pls let me (swng#1965) know if you have any insights :3
