the files in this folder are destined for exhibit E006_epistemic_overconfidence

This is a demonstration of epistemic overconfidence, using local gpt-oss-20b on LM-Studio.

Findings: The low-reasoning run produces an incorrect claim that cheese (as a whole) would sublimate in the vacuum
of space. This is a part-whole referent collapse: the model correctly knows vacuum causes sublimation but attributes
that property to cheese-as-a-whole rather than to its water content. The CoT for the low-reasoning run is a single
line ("Need to respond with humor, explain myth.") with no compositional analysis of cheese.

The medium-reasoning run correctly identifies that it is the water/moisture in cheese that sublimes, leaving a dry
protein/fat residue. The CoT explicitly states: "Cheese contains water and fat. In vacuum, water would boil off or
sublimate."

The high-reasoning run did not introduce the sublimation claim at all and was not probed with Turn 3, as it
voluntarily provided correct physical behavior in its first response.

NOTE: An earlier version of these notes incorrectly attributed the false sublimation claim to the high-reasoning run.
The false claim was made by the LOW-reasoning run only.