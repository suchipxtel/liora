🌐 Liora – AI-Powered Medical Document Assistant

Liora is an advanced, AI-driven healthcare web application designed to bridge the gap between overwhelming medical paperwork and patient-friendly understanding. Hospitals often discharge patients with 50+ pages of dense, jargon-filled documents that leave people confused, anxious, and at risk of missing critical treatment details. Liora transforms these documents into clear, actionable insights with personalized guidance — empowering patients to take control of their healthcare journey.

🚑 Problem We’re Solving

Medical Jargon Overload: Patients are discharged with technical reports, acronyms, and codes that are nearly impossible to interpret without medical training.

Health Literacy Gap: Misinterpretations can lead to medication errors, skipped follow-ups, and avoidable hospital readmissions.

Financial Burden: Patients are unaware of cheaper alternatives for prescribed medications, leading to unnecessary financial strain.

Liora addresses all three challenges by combining AI medical analysis, simplified summaries, and real-time pricing intelligence into a single intuitive platform.

💡 How Liora Works
1. Upload Your Document

Patients or caregivers can securely upload discharge summaries, lab results, or prescription instructions (PDF, JPG, PNG).

HIPAA-compliant de-identification: personal identifiers like name, DOB, and address are automatically stripped.

Secure data handling: encrypted transfers, no long-term storage.

2. AI-Powered Analysis

Liora runs advanced natural language processing (NLP) pipelines to:

Extract medical terminology and simplify explanations.

Detect key findings and highlight clinical outcomes.

Provide a confidence score for transparency.

3. Simplified Insights

Easy-to-read explanations of diagnoses.

Visual illustrations (e.g., heart diagrams for cardiovascular conditions).

Highlighted treatment steps explained in plain English.

4. Personalized Guidance

Drug Price Comparison: Real-time GIS-optimized pharmacy pricing for prescribed medications.

Treatment Plan Summary: Clear breakdown of what doctors did, why, and what comes next.

Medication Tracker: List of prescribed drugs with dosage instructions.

🖥️ Tech Stack

Frontend

⚡ Vite – blazing-fast bundler and dev server.

⚛️ React (TypeScript) – modular, type-safe UI.

🎨 Tailwind CSS – utility-first styling.

🧩 shadcn-ui – prebuilt, accessible React components integrated with Tailwind.

🏥 Custom Design System (Liora Blue Palette) – professional HSL color tokens, gradients, shadows, animations designed for healthcare trust and accessibility.

Design Features

Accessibility-first (contrast modes, medical jargon highlighting).

Smooth animations (slide-up, highlight-pulse, progress-flow).

Consistent branding via reusable styles (--gradient-liora, --shadow-soft, etc.).

Architecture

Modular file structure with components/, pages/, lib/, and utils.ts.

Config-driven (vite.config.ts, tailwind.config.ts, tsconfig.json).

Scalable and maintainable for future expansions (EHR integration, multilingual support).

📸 System Flow

Upload Medical Document
→

AI-Powered Processing (text extraction + de-identification + medical NLP)
→

Simplified Summary & Insights (readable explanations + illustrations)
→

Personalized Guidance (drug price comparison, treatment breakdown, medication tracker)

🚀 Future Scope

🌍 Multilingual Support: Expanding accessibility for non-English speakers.

🤝 EHR Integration: Direct sync with hospital electronic health record systems.

📱 Mobile App: Patient-facing app for iOS/Android with push reminders.

🧠 AI-Powered Chatbot: Interactive assistant to answer patient questions in plain language.

📊 Analytics Dashboard: For doctors and caregivers to monitor adherence and literacy improvements.

🔐 Security & Compliance

HIPAA-compliant de-identification pipeline.

End-to-end encrypted document transfers.

Automatic deletion post-processing (no persistent storage).

Full audit log for access attempts.

🎯 Our Mission

Liora isn’t just about tech — it’s about restoring clarity, trust, and empowerment in healthcare. By making medical information understandable and actionable, we reduce anxiety, prevent mistakes, and help patients focus on what truly matters: recovery and well-being.
