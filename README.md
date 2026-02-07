# AI Study Planner for Engineering Students 🎓

An AI-powered study planning web application designed specifically for engineering students to help them study **smarter, not harder**.

This tool generates a **personalized, adaptive weekly study plan** based on subject difficulty, credits, confidence level, strong/weak topics, and available study time.

---

## 🚀 Problem Statement

Engineering students face a uniquely demanding academic environment:
- Multiple technically intensive subjects
- Different cognitive loads per subject
- Strong prerequisite dependencies
- Constantly shifting deadlines and priorities

Traditional planners (calendars, to-do lists) fail to adapt to these challenges, leading to:
- Inefficient time allocation
- Over-studying strong topics
- Neglecting weak foundational areas
- Last-minute cramming and stress

---

## 💡 Solution Overview

**AI Study Planner** acts as a smart study mentor by:
- Analyzing subjects, credits, confidence levels, and topic strengths/weaknesses
- Balancing cognitive load across the week
- Generating a **visual weekly study calendar**
- Providing **actionable study guidance**, not just a timetable
- Allowing users to revisit and edit inputs dynamically

---
## 🌐 Live Demo

👉 


## ✨ Key Features

### 🔹 Customizable Inputs
- Weekday & weekend study hours
- Any number of subjects
- Subject credits
- Self-rated confidence level (1–5)
- Strong topics (less time allocation)
- Weak topics (priority focus)

### 🔹 Intelligent Planning Logic
- Higher credits & lower confidence → more time
- Weak topics prioritized earlier
- Strong topics lightly revised (avoids over-studying)
- Automatic cognitive load tagging (High / Medium / Low)

### 🔹 Visual Weekly Calendar
- Full-screen weekly view (Monday–Sunday)
- Learning / Practice / Revision split
- Color-coded cognitive load
- Easy to scan and practical for daily use

### 🔹 Guided Study Strategy
- Subject-wise explanations (“why this plan?”)
- Week-by-week focus suggestions
- Actionable next steps
- Expected outcomes summary

### 🔹 User-Friendly UX
- Clean Tailwind CSS UI
- Clear labels and helper text
- Ability to go back and edit inputs anytime

---

## 🖥️ Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Logic:** Rule-based AI-style scheduling (JavaScript)
- **Deployment:** Vercel (static frontend)

---

## 🧪 Sample Input (Used in Demo)

**Study Availability**
- Weekdays: 3 hours/day
- Weekends: 6 hours/day

**Subjects**
1. **Data Structures**
   - Credits: 4
   - Confidence: 3
   - Weak Topics: Trees, Graph Traversals, Dynamic Programming
   - Strong Topics: Arrays, Linked Lists

2. **Operating Systems**
   - Credits: 3
   - Confidence: 2
   - Weak Topics: Deadlocks, Virtual Memory
   - Strong Topics: Processes, Threads

3. **DBMS**
   - Credits: 3
   - Confidence: 4
   - Weak Topics: Indexing
   - Strong Topics: SQL, Normalization

---

## 📊 Output Highlights

- Total weekly study hours calculated automatically
- Subject-wise time allocation with justification
- Learning / Practice / Revision breakdown
- Visual weekly calendar with cognitive load awareness
- Clear next-step guidance

---
