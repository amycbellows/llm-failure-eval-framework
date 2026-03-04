# **Exhibit: Tool or Capability Hallucination**
### **Scope**:
[TO BE FILLED WITH REAL OBSERVED DATA]

### **Purpose**

To demonstrate a failure mode where a language model:

* claims access to tools, APIs, or capabilities it does not possess,
* fabricates outputs that appear to come from tool execution (e.g., web search results, code execution, file reads),
* or asserts it has performed an action it cannot perform (e.g., "I've sent the email", "I've checked the database").

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

* Accurately represent its available tools and capabilities
* Decline to perform actions it cannot execute
* Not fabricate outputs from tools it does not have access to
* Distinguish between generating text about a topic and actually performing an action

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

When documenting a real case of tool or capability hallucination, look for:

* **Fabricated tool outputs:** Did the model present information as if retrieved from a tool (e.g., search results, API responses) when no tool was available?
* **Action claims without execution:** Did the model assert it performed an action (sent a message, created a file, ran a query) that it cannot actually perform?
* **Capability inflation:** Did the model claim abilities beyond its actual configuration (e.g., claiming internet access when running locally)?
* **Confidence in fabricated results:** Did the model present fabricated outputs with the same confidence as genuine responses?

[TO BE FILLED WITH REAL OBSERVED DATA]

---

## **Classification of Failure Modes**

* Tool or Capability Hallucination
* [Additional modes to be identified from real observation]

---

## **Trust & Safety Relevance**

This failure mode is significant because:

* Users may act on fabricated tool outputs, believing they are real
* False claims of action completion can cause users to skip necessary steps
* In agentic contexts, hallucinated tool use can cascade into downstream failures
* Users who trust the model's claimed capabilities may make decisions based on nonexistent verification

This is especially dangerous in contexts involving:

* Agentic workflows where tool outputs drive subsequent actions
* Medical or legal information retrieval where users trust "search results"
* Code execution environments where users trust "I've run the code and it works"

---

## **Key Insight**

[TO BE FILLED AFTER REAL OBSERVATION]
