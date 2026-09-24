# Fraud First-Aid | Official Ideathon Presentation & Defense Guide
**Basecamp Ideathon 2026** • **Team Alpha Analysts**  
*(S. Ravi Kiran [Team Lead] — DVR & Dr. HS MIC College of Technology, H. Sai Yugesh — NRI Institute of Technology, A. Muzeeb — DIET College)*

---

## ⏱️ 90-Second Live Demonstration Workflow (For Judges)

| Time | Action on Screen | What to Say |
|---|---|---|
| **0:00 - 0:15** | Open `http://localhost:5173/`. Point to **Sticky 1930 bar** & **Golden Hour Timer**. | *"Good afternoon. We are Team Alpha Analysts from MIC, NRI, DIET Colleges. When an online financial scam occurs, the first 60 minutes matter most. Fraud First-Aid is a guided emergency assistant that turns panic into structured action before the money leaves the banking grid."* |
| **0:15 - 0:30** | Switch language to **`తెలుగు`**. Move cursor over cards to demonstrate **Telugu Voice**. | *"Unlike existing English-first portals, we provide real-time voice guidance in authentic, conversational Andhra Telugu, making it accessible to students and families in tier-2 and tier-3 towns."* |
| **0:30 - 0:50** | Click **`Demo 1 (Fake Job Telegram Scam)`** in the top black bar. | *"Our dynamic scenario engine adapts instantly. For this job scam, it asks only for Telegram recruiter handles and 12-digit UPI UTR—zero irrelevant questions, zero wasted time."* |
| **0:50 - 1:10** | Advance to **Step 3 (Actions)** and **Step 4 (Report)**. Click **"Download Official PDF"**. | *"In under 60 seconds, the victim receives a prioritized emergency checklist and a standardized incident report docket, ready to share via WhatsApp, submit to cybercrime.gov.in, or hand over to their bank branch manager."* |
| **1:10 - 1:30** | Advance to **Step 5 (Readiness Score)**. Show score gauge. | *"Instead of a fake recovery promise, we calculate a transparent Response Readiness Score (0–100) reflecting completed security steps. We guide; official institutions investigate and act."* |

---

## 🎯 Top 5 Questions Judges Will Ask & Perfect Winning Answers

### Q1: *"Why shouldn't victims just call 1930 or use cybercrime.gov.in directly?"*
> **Your Answer:**  
> *"1930 and cybercrime.gov.in are essential official reporting channels, but they assume the victim is calm and knows what evidence to provide. In reality, victims panic, don't know what a 12-digit UTR is, and often contact the wrong bank desk first. Fraud First-Aid is the missing **guided first-response layer** that prepares the victim with the exact details required by 1930 before they dial, making the official reporting faster and more effective."*

---

### Q2: *"Does your application guarantee that the victim will recover their lost money?"*
> **Your Answer:**  
> *"No, and we explicitly make that clear in our system design. Recovery depends on external banking settlements, police freeze orders, and mule account withdrawals. Fabricating a '95% recovery probability' is deceptive and irresponsible. Instead, we measure an explainable **Response Readiness Score (0–100)** based on concrete actions taken, such as capturing the UTR, alerting the bank, and preserving digital evidence."*

---

### Q3: *"How does the app protect sensitive financial and personal data?"*
> **Your Answer:**  
> *"Fraud First-Aid operates on a **100% Client-Side Privacy Architecture**. Form inputs and evidence screenshot previews are held solely in the browser's local memory and are never uploaded to any remote server or third-party database. When the user finishes or closes the tab, all sensitive data is cleared."*

---

### Q4: *"Why focus on Telugu voice guidance and cities like Vijayawada?"*
> **Your Answer:**  
> *"A significant volume of financial scams—such as fake part-time YouTube rating tasks and electricity bill disconnection threats—target students, job seekers, and middle-class families in towns like Vijayawada, Guntur, and Visakhapatnam. When in panic, technical English forms increase hesitation. Authentic Andhra Telugu audio guidance de-escalates panic and ensures immediate comprehension."*

---

### Q5: *"What is the feasibility and future scalability of this prototype?"*
> **Your Answer:**  
> *"Our MVP is built on lightweight, high-performance web standards (React + Vite + TypeScript) and runs with zero infrastructure costs. Our roadmap includes integrating official NPCI/bank grievance escalation deep-links, WhatsApp chatbot first-aid flows, and multi-language expansion across Hindi and southern regional languages."*

---

## 🚀 Quick Execution Commands

```powershell
# 1. Start Dev Server (Currently active)
npm run dev

# 2. Test Telugu Audio Proxy
npm run check:tts

# 3. Create Production Bundle
npm run build
```
