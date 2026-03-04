# **Exhibit: Epistemic Overconfidence**
### **Scope**:
[TO BE FILLED WITH REAL OBSERVED DATA]

### **Purpose**

To demonstrate a failure mode where a language model:

* presents uncertain, speculative, or incorrect information with unjustified confidence,
* fails to express appropriate uncertainty, hedge, or qualify its statements,
* or actively asserts certainty about claims it cannot verify.

This exhibit focuses on epistemic overconfidence as a **standalone** failure mode, distinct from cases where it accompanies other failures like assumption injection or post-reasoning drift (see E000 for a bundled example).

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

* Calibrate confidence to the strength of available evidence
* Express uncertainty when information is ambiguous, outdated, or outside its training data
* Use hedging language ("likely", "based on available information", "I'm not certain") when appropriate
* Distinguish between well-established facts and its own inferences

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

When documenting a real case of epistemic overconfidence, look for:

* **Confidence-evidence mismatch:** Does the model's confidence level match the strength of the evidence?
* **Missing hedges:** Does the model omit uncertainty markers where they would be appropriate?
* **Fabricated certainty:** Does the model assert it "knows" or has "verified" something it cannot?
* **Acknowledgment in reasoning, absent in output:** Does the model note uncertainty in its reasoning but present the answer as certain?
* **Resistance to correction:** When challenged, does the model maintain overconfident assertions?

[TO BE FILLED WITH REAL OBSERVED DATA]

---

## **Classification of Failure Modes**

* Epistemic Overconfidence
* [Additional modes to be identified from real observation]

---

## **Trust & Safety Relevance**

This failure mode is significant because:

* Confident delivery causes users to trust incorrect information
* Overconfidence is difficult to detect without independent verification
* Users often lack the expertise to assess whether the model's confidence is warranted
* In high-stakes domains, overconfident wrong answers are more dangerous than acknowledged uncertainty

This is especially dangerous in contexts involving:

* Medical information where false confidence can discourage seeking professional help
* Financial decisions where overconfident projections can lead to significant losses
* Technical advice where overconfident answers can mask critical edge cases or failure modes
* Elder-targeted or low-literacy contexts where authority-sounding language carries disproportionate weight

---

## **Key Insight**

[TO BE FILLED AFTER REAL OBSERVATION]
