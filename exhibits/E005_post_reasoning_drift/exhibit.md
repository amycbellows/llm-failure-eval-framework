# **Exhibit: Post-Reasoning Drift**
### **Scope**:
[TO BE FILLED WITH REAL OBSERVED DATA]

### **Purpose**

To demonstrate a failure mode where a language model:

* arrives at a correct conclusion during internal reasoning or chain-of-thought,
* but produces a final answer that contradicts or degrades the correct reasoning,
* effectively "drifting" from its own correct analysis during answer generation.

This exhibit focuses on post-reasoning drift as a **standalone** failure mode. E000 demonstrates this mode in combination with other failures; this exhibit isolates cases where the primary issue is the disconnect between reasoning and output.

Model Information:
See exhibit.yaml for model and runtime details.

---

## **Prompt Under Test**

"[TO BE FILLED WITH REAL OBSERVED DATA]"

**Variant with explicit constraint:**

"[TO BE FILLED WITH REAL OBSERVED DATA]"

---

## **Expected Correct Behavior**

A grounded model should:

* Produce a final answer that is consistent with its own internal reasoning
* Not revert to heuristic or pattern-matched answers after correct deliberation
* Maintain the conclusions reached during reasoning through to the final output

---

## **Observed Model Behavior**

### **Internal Reasoning (Correct/Incorrect)**

[TO BE FILLED WITH REAL OBSERVED DATA]

---

### **Final Answer (Correct/Incorrect)**

[TO BE FILLED WITH REAL OBSERVED DATA]

---

## **Failure Analysis**

### **Investigative Guidance**

When documenting a real case of post-reasoning drift, look for:

* **Reasoning-answer contradiction:** Does the model's final answer contradict its own chain-of-thought?
* **Heuristic reversion:** Does the final answer match a common pattern or "expected" answer rather than the reasoned conclusion?
* **Confidence despite contradiction:** Does the model present the drifted answer with the same confidence as if it followed from the reasoning?
* **Reasoning quality:** Was the internal reasoning genuinely correct, or merely closer to correct?
* **Trigger identification:** What appears to cause the drift — answer formatting, common patterns, prompt structure?

[TO BE FILLED WITH REAL OBSERVED DATA]

---

## **Classification of Failure Modes**

* Post-Deliberation Semantic Regression
* [Additional modes to be identified from real observation]

---

## **Trust & Safety Relevance**

This failure mode is significant because:

* Users who see only the final answer receive incorrect information despite the model "knowing" the right answer
* In systems that expose chain-of-thought, the correct reasoning can create false confidence that the answer is also correct
* This failure suggests a structural disconnect between reasoning and answer generation stages
* It undermines the reliability of chain-of-thought as a safety or verification mechanism

This is especially dangerous in contexts involving:

* Mathematical or logical reasoning where the final answer is used directly
* Decision support where users rely on the conclusion, not the reasoning trace
* Automated pipelines that consume model outputs without human review

---

## **Key Insight**

[TO BE FILLED AFTER REAL OBSERVATION]
