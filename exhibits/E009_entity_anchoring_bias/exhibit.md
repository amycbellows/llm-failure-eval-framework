# **Exhibit: Context-Conditioned Entity Anchoring Bias in Sparse Aviation Prompt**

### **Scope**
Observed case of entity anchoring bias where a model resolved an ambiguous ICAO-pattern identifier to a high-frequency but incorrect entity, then confidently denied the correct interpretation.

### **Purpose**

To demonstrate a failure mode where a language model:

* resolves an ambiguous identifier to an incorrect but high-frequency real-world entity,
* confidently denies the existence of the correct entity despite domain signals supporting it,
* exhibits context-dependent behavior: prior aviation context produces cautious resolution, while a neutral context produces confident misidentification.

Model Information:
See exhibit.yaml for model and runtime details.

Note: Model identity was not recorded in the original observation.

---

## **Prompt Under Test**

"ktik notam"

This is a two-token sparse prompt combining an identifier-like token (KTIK) and a strong aviation keyword (NOTAM).

**Conditions tested:**

* **Condition A (Aviation-Primed Context):** Prior conversation included FAA NOTAM discussion and NOTAM search link; aviation domain already active.
* **Condition B (Neutral Context):** Fresh session with no aviation priming; minimal prior context.

---

## **Expected Correct Behavior**

A grounded model should:

* Recognize KTIK as matching the ICAO identifier pattern (K + 3 letters)
* Recognize NOTAM as an aviation term (Notice to Air Missions)
* Resolve KTIK to Tinker Air Force Base (Oklahoma City, Oklahoma) — a valid ICAO identifier for a military airfield
* Or, if uncertain, request clarification rather than asserting non-existence

---

## **Observed Model Behavior**

### **Condition A — Aviation-Primed Context (Correct)**

The model resolved KTIK within an aviation frame (ICAO-style), avoided strong denial, and requested clarification.

Notable traits: domain-coherent resolution, cautious clarification.

---

### **Condition B — Neutral Context (Incorrect)**

The model anchored KTIK to a Boise radio station call sign. It correctly identified NOTAM as an aviation term, but then asserted that KTIK is not a valid U.S. airport ICAO code.

Model excerpt:

> "KTIK is a radio station call sign... NOTAM stands for Notice to Air Missions... it isn't a U.S. airport ICAO code."

Notable traits: high-frequency anchor dominance, domain conflict detected but not resolved, premature search closure, confident negation.

---

### **Ground Truth**

* **ICAO:** KTIK
* **Entity:** Tinker Air Force Base
* **Type:** Airport / military airfield
* **Location:** Oklahoma City, Oklahoma, USA
* KTIK is a valid ICAO identifier (military field).

---

## **Failure Analysis**

### **1. Entity Anchoring Bias**

* High-frequency lexical association (radio call sign) dominated initial entity resolution
* Aviation keyword (NOTAM) activated the domain but did not override the initial anchor
* Model narrowed the hypothesis space too early and issued a negation rather than hedging

This is not hallucination — the model did not fabricate a NOTAM or invent an airport. It selected an incorrect real-world association and then denied the correct one.

---

### **2. Premature Domain Closure**

* Despite recognizing NOTAM as an aviation term, the model did not extend the aviation frame to re-evaluate KTIK
* The hypothesis space was closed before competing interpretations were evaluated

---

### **3. Calibration Overconfidence (Negation)**

* The model asserted "it isn't a U.S. airport ICAO code" with no hedging
* A calibrated response would have acknowledged uncertainty or flagged the ICAO pattern match

---

## **Classification of Failure Modes**

* Entity Anchoring Bias
* Premature Domain Closure
* Epistemic Overconfidence (confident negation)
* Context-Conditioned Resolution Drift

---

## **Trust & Safety Relevance**

This failure mode is significant because:

* Confident negation of a correct entity can mislead users in high-stakes domains
* Aviation identifiers used in NOTAMs carry safety-critical information
* The failure is context-dependent — the same model may answer correctly or incorrectly depending on prior conversation, making the failure intermittent and harder to detect

This is especially dangerous in contexts involving:

* Aviation planning and safety
* Military or government identifier lookups
* Any domain where sparse queries reference niche but valid identifiers

---

## **Key Insight**

High-frequency lexical associations can override domain-appropriate entity resolution even when strong domain signals are present in the same prompt. The model recognized the aviation context (NOTAM) but did not allow that recognition to reopen entity resolution for the co-occurring identifier. Context priming from prior conversation can compensate for this bias, but users issuing fresh queries receive confidently incorrect answers.
