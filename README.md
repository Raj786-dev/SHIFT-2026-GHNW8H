# 🌿 EcoDispose: Smart EV Battery Disposal & Recycling System

> **Team:** CodeXtra  
> **Theme:** Smart EV Battery Disposal and Recycling with Connectivity Focus  
> **Repository:** Standalone Responsive Web Application  

---

## 📌 1. Project Overview & Motivation

Electric Vehicles (EVs) are growing exponentially, but **end-of-life battery management remains fragmented and dangerous**. 
Currently:
1. **EV Battery Owners** have no visibility into the true electrochemical state of health (SOH) of their packs or fair resale value.
2. **Reusable packs get scrapped prematurely** or dumped into informal sectors, causing toxic landfill pollution and hazardous thermal fires.
3. **Repair shops, 2nd-life energy storage buyers (BESS), and certified recyclers** lack a connected pipeline to procure batteries transparently.
4. **Lack of traceable custody** leaves regulatory authorities blind to hazardous informal battery disposal.

### 💡 The EcoDispose Solution
**EcoDispose** is a unified digital lifecycle platform connecting **Battery Owners**, **Repair Workshops**, **Stationary Storage Buyers**, and **Certified Recyclers** under an auditable, rule-based system.

```
Battery Owner ──▶ Platform Health Score & Triage ──┬──▶ Repair / Repack  (Vehicle Reuse)
                                                   ├──▶ Storage 2nd-Life (Solar, Microgrid, UPS)
                                                   ├──▶ Certified Recycler (Hazardous / Scrap)
                                                   └──▶ Interactive Vendor Map (Quote System)
```

---

## 🚀 2. System Architecture & Step-by-Step Flow

| Step | Action | Platform Response |
| :--- | :--- | :--- |
| **1. Collect** | Owner registers battery specifications (Age, Cycles, Voltage, Temp, Physical damage). | Inputs are validated with real-time dynamic slider feedback. |
| **2. Assess** | Transparent diagnostic rules calculate an auditable Health Score (0–100). | Itemized breakdown displays exact point deductions for age, cycles, voltage drop, and heat. |
| **3. Decide** | Algorithm routes battery to one of three lifecycle paths. | **≥70**: Vehicle Repair \| **40–69**: 2nd-Life BESS \| **<40 or Damaged**: Certified Recycler. |
| **4. Connect** | Owner selects nearest partner on the interactive map and requests a quote. | Vendor Portal receives telemetry, submits price quote, and owner accepts to confirm booking. |
| **5. Track** | Battery advances through: `Registered` ➔ `Collected` ➔ `Tested` ➔ `Done`. | Both owner and vendor share the immutable custody timeline. |
| **6. Close** | Completed journeys log avoided carbon emissions and issue EPR compliance certificates. | CO₂ avoided counter increments dynamically (e.g. +420 kg for repair, +310 kg for storage, +160 kg for recycling). |

---

## 🧮 3. Health Scoring Mathematical Engine

The health score starts at **100 points** and applies transparent deductions:

$$S = 100 - (D_{\text{age}} + D_{\text{cycles}} + D_{\text{voltage}} + D_{\text{temp}} + D_{\text{damage}})$$

### Deduction Matrix:

| Factor | Formula | Max Deduction | Real-World Engineering Rationale |
| :--- | :--- | :---: | :--- |
| **Calendar Age** | $4 \text{ pts} \times \text{Years}$ | **32 pts** | SEI layer growth and electrolyte decomposition over time. |
| **Charge Cycles** | $\frac{\text{Cycles}}{40} \times 1 \text{ pt}$ | **35 pts** | Active cathode/anode degradation per charge-discharge throughput. |
| **Voltage Drop** | $1.5 \text{ pts} \times \left(\frac{V_{\text{rated}} - V_{\text{measured}}}{V_{\text{rated}}} \times 100\right)$ | **30 pts** | Internal resistance surge (IR) and cell capacity fade. |
| **Peak Temperature** | $1.5 \text{ pts} \times (T_{\text{peak}} - 45^\circ\text{C})$ if $T > 45$ | **15 pts** | Thermal stress threshold accelerating separator breakdown. |
| **Physical Damage** | Immediate **40 pts** | **40 pts** | Casing rupture, swelling, or liquid electrolyte leakage. |

### Triage Decision Tree:
- **Health Score $\ge$ 70**: 🟢 **Repair or Repack** (Return to EV road duty; module balancing).
- **Health Score 40 to 69**: 🟡 **Second-Life Storage** (Stationary solar microgrid, inverter backup).
- **Health Score $<$ 40 OR Physical Damage**: 🔴 **Certified Hazmat Recycler** (Closed-loop hydrometallurgical lithium/cobalt extraction).

---

## 💻 4. Project File Structure

```
ecodispose/
├── index.html                  # Main application UI and dashboard
├── ecodispose-dashboard.html   # Standalone duplicate with sample seed data
├── styles.css                  # Modern Eco-Tech design system (Dark & Light modes)
├── app.js                      # Diagnostic engine, routing, map, role views, and storage
├── server.py                   # Local development server with auto-browser launch
└── README.md                   # Full documentation & project presentation guide
```

---

## ⚡ 5. How to Run the Project

### Option A: Direct Browser Launch (No Installation Required!)
Simply double-click `index.html` or `ecodispose-dashboard.html` to open it in Chrome, Edge, Brave, or Firefox.

### Option B: Local Python Web Server
Open terminal in the project directory:
```bash
python server.py
```
This automatically starts a local server at `http://localhost:3000` and opens your browser.

---

## 🎬 6. Interactive Demo Walkthrough (For Presentations & Judges)

The application includes a **Top Walkthrough Banner** with 6 automated 1-click demo steps:

1. **Step 1: Inspect Hazardous EB-103**  
   - Selects battery `EB-103` (MG ZS EV).  
   - Shows the **RED health score (0/100)** due to 54°C thermal stress and physical pouch swelling.  
   - Demonstrates safety alerts blocking informal sales and auto-routing to certified recyclers.

2. **Step 2: Request Quote for EB-101**  
   - Selects healthy battery `EB-101` (Tata Nexon EV Max, score 84/100).  
   - Opens the vendor map and launches a quote request modal to **AutoVolt Solutions**.

3. **Step 3: Vendor Portal: Send Quote**  
   - Switches to the **Vendor Portal view**.  
   - Shows the vendor inspecting the owner's attached telemetry and submitting a ₹18,500 quote.

4. **Step 4: Owner View: Accept Quote**  
   - Switches back to the **Owner view**.  
   - Navigates to "My Requests" and clicks **Accept Quote**, confirming logistics booking.

5. **Step 5: Advance Lifecycle (CO₂ Meter Growth)**  
   - Clicks **Simulate Next Status** to step through: `Registered` ➔ `Collected` ➔ `Tested` ➔ `Done`.  
   - Reaching "Done" immediately increases the **Estimated CO₂ Avoided** metric!

6. **Step 6: Certified Recycler View**  
   - Switches to the **Recycler view**, filtering exclusively for hazardous packs.  
   - Demonstrates the EPR Compliance certificate generator.

7. **Bonus: Register a Custom Battery**  
   - Click **+ Register Battery** in the top bar.  
   - Move the age, cycles, and temperature sliders to watch the **Live Score Preview** recalculate in real time!

---

## 🌍 7. Real-World Environmental & Circular Impact

- **CO₂ Avoidance Multipliers:**
  - Vehicle Repair & Repack: **~420 kg CO₂** avoided per pack (offsets new manufacturing).
  - 2nd-Life BESS Storage: **~310 kg CO₂** avoided per pack (replaces diesel generators & coal peaking).
  - Closed-Loop Recycling: **~160 kg CO₂** avoided per pack (offsets virgin mining of lithium and cobalt).
- **Regulatory Alignment:**
  - Aligns with **India Battery Waste Management Rules (BWMR) 2022** and **EU Battery Regulation 2023/1542** for Extended Producer Responsibility (EPR) traceability.

---

## 👥 Credits
- **Project Name:** EcoDispose
- **Team Name:** CodeXtra
