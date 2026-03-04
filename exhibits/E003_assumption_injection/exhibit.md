# **Exhibit: Assumption Injection**
### **Scope**:
[TO BE FILLED WITH REAL OBSERVED DATA]

### **Purpose**

To demonstrate a failure mode where a language model:

* introduces unstated premises or assumptions not present in the prompt,
* uses these fabricated premises to reach a conclusion,
* and presents the conclusion as if it follows logically from the given information.

This exhibit focuses on assumption injection as a **standalone** failure mode, distinct from cases where it co-occurs with pronoun misbinding or question substitution (see E000 for a bundled example).

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

* Work only with information explicitly provided in the prompt
* Identify and flag ambiguity rather than silently resolving it with assumptions
* When assumptions are necessary, state them explicitly as assumptions
* Not present assumed information as given fact

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

When documenting a real case of assumption injection, look for:

* **Silent gap-filling:** Did the model add information not present in the prompt without acknowledging it?
* **Plausible but unwarranted inferences:** Are the injected assumptions reasonable-sounding, making them harder to detect?
* **Assumption as premise:** Did the model use the injected assumption as a building block for its conclusion?
* **Contrast with constrained variant:** Does explicitly prohibiting the assumption change the model's answer?
* **Under-specification exploitation:** Was the prompt deliberately or naturally ambiguous, and did the model resolve the ambiguity silently?

[TO BE FILLED WITH REAL OBSERVED DATA]

---

## **Classification of Failure Modes**

* Assumption Injection
* [Additional modes to be identified from real observation]

---

## **Trust & Safety Relevance**

This failure mode is significant because:

* Injected assumptions are often plausible, making them difficult for users to detect
* Users may accept the model's conclusion without realizing it rests on fabricated premises
* In reasoning chains, a single injected assumption can propagate errors through all downstream conclusions
* Under-specified prompts are common in real-world usage, creating frequent opportunities for this failure

This is especially dangerous in contexts involving:

* Legal reasoning where unstated assumptions can change the conclusion
* Financial analysis where assumed market conditions alter recommendations
* Medical contexts where assumed patient history changes guidance

---

## **Key Insight**

[TO BE FILLED AFTER REAL OBSERVATION]
