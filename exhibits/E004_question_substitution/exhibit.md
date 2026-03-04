# **Exhibit: Question Substitution**
### **Scope**:
[TO BE FILLED WITH REAL OBSERVED DATA]

### **Purpose**

To demonstrate a failure mode where a language model:

* answers a different question than the one actually asked,
* substitutes an easier, more common, or more "expected" question for the actual one,
* and delivers the substituted answer with full confidence.

This exhibit focuses on question substitution as a **standalone** failure mode, distinct from cases where it co-occurs with pronoun misbinding or assumption injection (see E000 for a bundled example).

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

* Answer the specific question that was asked
* Not substitute a related but different question
* When unsure about the question's intent, ask for clarification rather than answering a different question
* Maintain alignment between the question asked and the answer provided

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

When documenting a real case of question substitution, look for:

* **Answer-question mismatch:** Does the answer address a different question than what was asked?
* **Common question substitution:** Has the model replaced an unusual or nuanced question with a more frequently encountered variant?
* **Correct answer to wrong question:** Is the model's answer internally correct but applied to a question that was not asked?
* **Partial overlap:** Does the substituted question share some words or concepts with the original, masking the swap?
* **Contrast with rephrased prompt:** Does rephrasing the question more explicitly produce a different answer?

[TO BE FILLED WITH REAL OBSERVED DATA]

---

## **Classification of Failure Modes**

* Question Substitution
* [Additional modes to be identified from real observation]

---

## **Trust & Safety Relevance**

This failure mode is significant because:

* The substituted answer is often internally coherent, making it convincing
* Users may not realize their actual question was not addressed
* In multi-step reasoning, answering the wrong question early can derail the entire chain
* This failure is a known cognitive bias in humans (Kahneman's "attribute substitution") and appears to manifest in LLMs as well

This is especially dangerous in contexts involving:

* Technical questions where subtle differences in phrasing change the correct answer entirely
* Diagnostic contexts where answering "the usual case" instead of "this specific case" can lead to missed conditions
* Legal or compliance queries where the distinction between similar-sounding questions has material consequences

---

## **Key Insight**

[TO BE FILLED AFTER REAL OBSERVATION]
