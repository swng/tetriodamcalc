# tetriodamcalc
damage calculator for tetr.io

aaaaah I barely know what I'm doing

Enter individual attacks and the calculator will calculate damage sent according to the [tetr.io attack table](https://cdn.discordapp.com/attachments/674421736162197515/716081165886423110/2020-05-30_02-07-18.png).
As per the chart, your first combo or B2B is your 0th. Thus a non combo/B2B is represented with a -1. Be cognizant of that when setting base values.

Combo chains and B2B chains are assumed for consecutive inputted attacks. To break combo chain, enter a None attack; to break B2B, enter a non-Quad/T-Spin/None attack (a single/double/triple).

Disclaimer: I barely know what I'm doing. On the accuracy of the calculator's values:  
osk chart is AttackTable1.  
Calculator defaults to table values when B2B level <=4 and combo <=20 (when the chart has values). Past the offiial table's bounds, the calculator does a little extrapolation logic.  
AttackTable2 is actually not a table at all but actually the damcalc function.  
The two approaches *will* contradict at some high B2B and combo levels. I advise going with the AttackTable2 function but you can use the official AttackTable1 osk chart, and the site defaults to AttackTable1.

Pls let me (swng#1965) know if something is going wrong.
