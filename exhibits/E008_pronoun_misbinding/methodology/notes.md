The files in this folder are used to test a framework's ability to reason given different system instructions.
Here, we compare the reasoning of gpt-oss-20b using different system prompts and levels of reasoning. The problem 
involves a simple task: answer 
how 
many apples the model has after the user gives four apples to a third party (Jenny).

There are two sets of outputs - indicated by the filenames.

Initial findings:
The 'Condescending' prompt seems to have elicited the most accurate reasoning, probably because it was instructed to 
be condescending and explain everything thoroughly. 

The blank system prompt interestingly had less accurate reasoning, ending with pronoun misbinding in two of the 
three reasoning levels. 

The prompts were run locally in LM Studio