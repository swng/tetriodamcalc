# tetriodamcalc
damage calculator for tetr.io

aaaaah I barely know what I'm doing

Enter individual attacks and the calculator will calculate damage sent according to the [tetr.io attack table](https://cdn.discordapp.com/attachments/674421736162197515/716081165886423110/2020-05-30_02-07-18.png). Maybe add importing custom attack tables later idk

As per the chart, your first combo or B2B is your 0th. Thus a non combo/B2B is represented with a -1. Be cognizant of that when setting base values.

Damage may be inaccurate past 20combo. Check the code for the specifics on my jank implementation.

Disclaimer: the additive math used for B2Bs here actually doesn't seem to perfectly line up with the chart from osk for some values. I'm not confident which is actually correct. Pls let me (swng#1965) know if you have any insights :3 
Disclaimer 2: I also barely know what I'm doing.
Combo chains and B2B chains are assumed for consecutive inputted attacks. To break combo chain, enter a None attack; to break B2B, enter a non-Quad/T-Spin/None attack (a single/double/triple).
