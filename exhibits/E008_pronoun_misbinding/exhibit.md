# **Exhibit: Pronoun and Role Misbinding**
### **Scope**:
[TO BE FILLED WITH REAL OBSERVED DATA]

### **Purpose**

To demonstrate a failure mode where a language model:

* misidentifies the referent of pronouns (especially "you", "I", "they") in context,
* confuses speaker and addressee roles, answering for the wrong entity,
* or fails to maintain consistent deictic grounding across a conversation.

This exhibit focuses on pronoun misbinding as a **standalone** failure mode. E000 demonstrates this mode in combination with other failures; this exhibit isolates cases where the primary issue is incorrect pronoun resolution or role grounding.

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

* Correctly identify who "you", "I", and other pronouns refer to in context
* Maintain consistent role awareness (user vs. assistant vs. third parties)
* Answer from the correct perspective when asked about "you" (the assistant) vs. "you" (the user)
* Not conflate different referents across turns or within a single response

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

When documenting a real case of pronoun misbinding, look for:

* **Referent confusion:** Does the model answer as/about the wrong entity?
* **Role swap:** Does the model confuse user and assistant perspectives?
* **Correct reasoning, wrong output:** Does the model identify the correct referent in reasoning but answer for the wrong one?
* **Context sensitivity:** Does the misbinding depend on conversational context, prompt phrasing, or the presence of multiple entities?
* **Constraint responsiveness:** Does adding an explicit role constraint (e.g., "You are an AI assistant") fix the misbinding?

[TO BE FILLED WITH REAL OBSERVED DATA]

---

## **Classification of Failure Modes**

* Deictic / Pronoun Reference Failure
* Role Boundary Violation
* [Additional modes to be identified from real observation]

---

## **Trust & Safety Relevance**

This failure mode is significant because:

* Pronoun misbinding can cause the model to reveal information about the wrong entity
* In multi-party conversations, role confusion can lead to inappropriate disclosures
* Users may not realize the model is answering from the wrong perspective
* Combined with confident delivery, misbinding produces convincing but fundamentally wrong answers

This is especially dangerous in contexts involving:

* Privacy-sensitive conversations where role confusion could leak information
* Multi-user or multi-agent systems where entity resolution is critical
* Instructional contexts where "you should do X" might be addressed to the wrong party
* Legal or contractual contexts where party identity determines obligations

---

## **Key Insight**

[TO BE FILLED AFTER REAL OBSERVATION]
