# PRL Embarcacions Hub - Modernized Marine Safety Interactive Platform

A high-fidelity, gamified educational platform for Occupational Health and Safety (PRL / FOL) in Recreational Boat Maintenance and Nautical Shipyards. It replaces static quizzes with dynamic interactive mechanics: a fast-paced EPI Hazard Runner, an AR Camera Inspection Scanner, an Interactive LOTO Breaker Panel, a Crisis Management Dispatch Center, and a Chemical Safe Escape Room, complete with bilingual Catalan/Spanish support and vocational grade reporting.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following core design and functional requirements have been synthesized from your responses:

- **Confirmed Language Architecture**: Catalan as the primary default language with an instant toggle for Spanish across all game modules, UI labels, and diagnostic feedback.
- **Confirmed Game Mechanics Revamp**: Full shift from static quizzes into dynamic interactive simulations:
  - **Game 1 (EPI Hazard Runner)**: Real-time shipyard walkthrough with active hazards, time pressure, and fast-reflex protective gear selection.
  - **Game 2 (AR Hazard Scanner)**: Interactive web camera scanner (with realistic simulated camera fallback) displaying AR computer-vision overlays, hazard bounding boxes, and diagnostic inspection tags.
  - **Game 3 (Escape Room: Pañol & Sentina)**: Reagent workbench with MEKP and styrene ventilation controls, lock picking, and atmospheric tester.
  - **Game 4 (Emergency Dispatch & PAS Crisis)**: Real-time radio emergency dispatcher managing incidents, triage, and rapid PAS response timers.
  - **Game 5 (LOTO Breaker & Electrical Lockout)**: Interactive 230V marine shore-power breaker board with physical padlock placement, safety tags, and digital multimeter probe testing.
- **Grading & Accreditation**: Standardized 0–10 academic grading scale, badge achievement showcase, and one-click dispatch to `jpons@centredelamar.com` with formatted student report.

---

## 1. Overview & Core Concept

- **What It Does**: Provides maritime vocational students (FP Náutica / Manteniment d'Embarcacions de Recreo) an engaging, hands-on safety training simulator that models real shipyard environments (Travelift crane lifts, polyester resin and gelcoat mixing, bilge confined space entry, 230V shore-power connections, and hazardous chemical spills).
- **Target Audience**: Vocational nautical students, apprentices, and marine technicians seeking practical, memorable safety mastery.
- **Key Value**: Replaces passive multiple-choice reading with muscle-memory procedures, speed of recognition, and procedural compliance before students enter physical drydocks and boatyards.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Onboarding & Identity**: Student enters their Full Name and Class Group (e.g. *1r MER*). Selects interface language (Catalan or Spanish).
2. **Shipyard Mission Deck**: A clean, modern control center displaying student rank (from *Aprenent de Varadero* to *Cap de Seguretat Naval*), overall proficiency grade (0–10), active session score, and 5 mission modules.
3. **Module 1: EPI Hazard Runner**: The technician walks through the workshop dock. Sudden hazards trigger (e.g., grinder sparks flying, toxic MEKP catalyst fumes, heavy keel hull overhead, high decibel sanding, electrical puddle). A high-urgency countdown timer requires picking the exact homologated PPE before impact.
4. **Module 2: AR Shipyard Scanner**: Student activates camera mode (live webcam or simulated high-res shipyard video feed). Moving crosshairs and machine-vision HUD scan for unlabeled solvent cans, missing lifelines on scaffolds, and unventilated hatches. Tapping a target reveals safety violations and neutralizes the threat.
5. **Module 3: Escape Room (Pañol i Sentina)**: Interactive multi-stage mystery. Students calibrate ATEX explosion-proof ventilation, match nitrile/butyl gloves against aggressive solvents, and solve the 3-digit drydock master code.
6. **Module 4: Incident Command & Emergency Dispatch**: Simulated radio alerts arrive with varying severity. The student executes the PAS protocol (Protect, Alert, Succor) under time limits, triaging casualties and assigning harbor resources.
7. **Module 5: LOTO Consignation & Electrical Security**: Interactive marine breaker board. Students physically isolate shore-power cables, mount safety padlocks, attach warning tags, and test voltage with interactive digital multimeter probes to confirm zero electrical energy.
8. **Evaluation & Official Submission**: Comprehensive debrief showing exact score (out of 10), accuracy percentage, regulatory justifications (INSST / IMO standards), one-click email report generation to `jpons@centredelamar.com`, and printable/copyable grade certificate.

### Visual Identity & Theme

- **Aesthetic Direction**: Marine Industrial High-Tech. Evokes high-end naval engineering, maritime safety consoles, clean shipyard drydocks, and precision tooling.
- **Color Palette (60-30-10 Rule)**:
  - *60% Neutral Canvas*: Deep maritime slate and midnight navy (`#0B132B`, `#0F172A`, `#1E293B`).
  - *30% Structural Panels*: Translucent sea-glass surfaces with subtle steel hairline borders (`#334155` / `rgba(56, 189, 248, 0.15)`), crisp neutral text (`#F8FAFC`, `#94A3B8`).
  - *10% Focal Accents*: Maritime Cyan (`#0284C7` / `#38BDF8`), Safety Amber (`#F59E0B`), Emergency Alert Crimson (`#EF4444`), and Compliant Green (`#10B981`).
- **Typography & Hierarchy**:
  - *Display / Titles*: `Plus Jakarta Sans` / `Outfit` (Bold, geometric maritime feel).
  - *Body Prose*: Clean, legible sans-serif with comfortable line height.
  - *Telemetry & Timers*: Monospace tabular numerals (`font-mono tabular-nums`) for timers, codes, and electrical multimeter readouts.
- **Anti-Slop Discipline**:
  - Zero pill-badge sandwiches; metadata uses quiet typographic separators (`·`).
  - Strict Top Bar Contract: Brand title, language switch, student badge, score counter, and navigation home button.
  - Responsive layout optimized for 1440px desktop workstations and tablet workshop kiosks.

---

## 3. Key Product Decisions & Trade-Offs

- **Interactive AR Camera Experience**:
  - *Chosen Approach*: WebRTC camera stream with dynamic canvas computer-vision HUD and interactive target overlays, backed by an instant 1-click fallback to a simulated high-definition shipyard video/image feed so devices without cameras or permissions can play seamlessly.
  - *Why*: Guarantees 100% accessibility in school labs while giving devices with webcams a real augmented reality experience.
- **Audio Synthesizer (Web Audio API)**:
  - *Chosen Approach*: Zero-asset synthesized Web Audio oscillator sounds for gear equips, buzzer alerts, multimeter beeps, and success fanfare.
  - *Why*: Eliminates external audio file dependencies that can fail or get blocked by CORS.
- **Bilingual i18n Engine**:
  - *Chosen Approach*: Lightweight client-side dictionary provider for Catalan (`ca`) and Spanish (`es`) covering all questions, scenarios, justifications, and UI elements with reactive switching.
  - *Why*: Meets the user's specific requirement while preserving the authentic Catalan maritime curriculum.

---

## 4. Technical Architecture & Data Strategy

### System Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PRL EMBARCACIONS HUB                            │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Top Navigation Bar (Brand · Language Switch · Student Profile)   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌──────────────────────┐  ┌────────────────────────────────────────┐  │
│  │ State Store          │  │ Active Screen Router                   │  │
│  │ - Student Details    │  │                                        │  │
│  │ - Language (CA / ES) │  │ ├─ Dashboard & Student Registration    │  │
│  │ - Module Progress    │  │ ├─ Game 1: EPI Hazard Runner (Action)  │  │
│  │ - Global Score & XP  │  │ ├─ Game 2: AR Shipyard Scanner (Webcam)│  │
│  │ - Answer Audit Log   │  │ ├─ Game 3: Escape Room (Chemistry Lab) │  │
│  │ - Sound Effects Gen  │  │ ├─ Game 4: PAS Emergency Command Hub   │  │
│  └──────────────────────┘  │ ├─ Game 5: LOTO Multimeter Panel       │  │
│                            │ └─ Final Results & Mailto Generator    │  │
│                            └────────────────────────────────────────┘  │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Audio Engine (Web Audio API Synthesizer) & Canvas Confetti       │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### Module Breakdown

| Module | Core Mechanic | Educational Objective |
| :--- | :--- | :--- |
| **1. EPI Runner** | Timed hazard encounters during workshop walk | Chemical vapors, eye burns, overhead lifts, and ear protection |
| **2. AR Scanner** | AR camera HUD with draggable / clickable target boxes | Identifying unlabelled chemicals, missing scaffolds, blocked exits |
| **3. Escape Room** | Solvent workbench & ventilation atmospheric gauges | Organic vapor exposure, flammable atmospheres, ATEX norms |
| **4. PAS Dispatch** | Urgent emergency call triage & sequence protocol | Protect, Alert, Succor protocol & harbor emergency contacts |
| **5. LOTO Breaker** | Interactive circuit switches, padlock drop & DMM test | Preventing 230V AC electrocution & battery bank isolation |

---

## 5. Verification Plan

- Verify successful compilation with Vite and React 19 (`compile_applet`).
- Validate all 5 interactive modules (interactive event handlers, timer state machines, audio feedback).
- Test camera permission request and fallback toggle for the AR Scanner.
- Test language switching between Catalan and Spanish on all views.
- Test student grade calculation and mailto link composition for `jpons@centredelamar.com`.
