# EcoDispose: Smart EV Battery Disposal & Recycling System

EcoDispose is a connected platform for the full life of an EV battery. The owner enters battery details, the platform gives a health score and decides what should happen next, and the battery is routed to the right place: repair or repack, second-life storage, or a certified recycler.

## Problem

EV battery owners, repair shops, storage buyers and recyclers have no connected channel. As a result, old batteries often end up in the informal sector or in unsafe disposal, and reusable value is lost.

## Solution

One platform that connects everyone in the battery's lifecycle:

```
Battery owner  →  Platform (health score + triage)  →  Repair or repack   (reuse in vehicle)
                         │                          →  Storage use         (solar, inverter, lights)
                         │                          →  Recycler            (unsafe or dead pack)
                         └→  Vendor map (nearest shops)
```

## How we handle the problem

The problem has four parts, and each has a specific answer in EcoDispose.

| Problem | How EcoDispose handles it |
|---|---|
| Owners do not know what condition their battery is in or what to do with it | The owner enters basic details and gets a clear **health score** with reasons, and a **triage result** that says what to do next. |
| Reusable batteries get scrapped or sold cheaply | Healthy packs go to **repair or repack**. Medium-health packs go to **second-life storage** (solar, inverter, lights). Only unsafe or dead packs go to recycling. |
| Owners cannot find trusted shops, buyers or recyclers | A **vendor map** shows the nearest shops by type, with distance and rating, and the owner can send a **quote request** in one tap. |
| Nobody can see where a battery went, so unsafe disposal goes unnoticed | Every battery has an ID and a **status timeline** (Registered → Collected → Tested → Done), and **alerts** flag unsafe packs so they reach a certified recycler. |

### Step-by-step approach

1. **Collect:** the owner registers the battery (age, charge cycles, voltage, temperature, damage).
2. **Assess:** the platform calculates the health score with transparent rules, so the result can be explained.
3. **Decide:** the platform routes the battery to repair, storage use or recycling.
4. **Connect:** the owner sends a quote request to a matching vendor. The vendor sees the health score and reasons, replies with a quote, and the owner accepts.
5. **Track:** the battery moves through each status, and the owner, vendor and recycler all see the same record.
6. **Close:** when the journey is complete, the dashboard counts the battery as reused or recycled, and updates the estimated CO₂ avoided.

### Expected impact

- **Safety:** unsafe batteries are flagged and sent to certified recyclers instead of the informal sector.
- **Less waste:** batteries with remaining life are reused before they are recycled.
- **More value for owners:** repair and second-life buyers pay for packs that would otherwise be scrapped.
- **Traceability:** a recorded journey for each battery supports battery-waste rules.

## Features

- **Summary band:** split of batteries across Repair, Storage and Recycle, plus total batteries, percent kept in use, open requests and estimated CO₂ avoided.
- **Battery list:** ID, health score (green / yellow / red), triage result and current status for every battery.
- **Battery detail:** health gauge, the reasons behind the score, and a journey timeline (Registered → Collected → Tested → Done).
- **Register battery:** form with a live preview of the health score and triage result.
- **Vendor map:** nearby repair shops, storage buyers and recyclers, filterable by type, with a "Request quote" button.
- **Role views:** separate Owner, Vendor and Recycler views.
- **Alerts:** unsafe batteries, new requests, quotes and booking confirmations.
- **Dark mode** and a mobile-friendly layout.

from Google Fonts when online and falls back to a system font when offline.

## How to use it (demo walkthrough)

1. **Owner view:** open the dashboard. The summary band shows how many batteries are headed to each path.
2. Click **EB-103** (damaged, hot, low voltage). It is marked red and sent to a recycler, and an alert is raised.
3. Click **EB-101** (healthy). Scroll to the vendor map, pick a repair shop and press **Request quote**.
4. Switch to the **Vendor** tab. The request appears with the health score attached. Press **Send quote**.
5. Switch back to **Owner**. Under "My requests", press **Accept** to confirm the booking.
6. Select a battery and press **Simulate status update** to move it through Registered → Collected → Tested → Done. The CO₂ avoided number rises when a battery completes its journey.
7. Press **Register battery**, enter your own values and watch the score and route update before you save.
8. Switch to the **Recycler** tab to see only the unsafe or dead packs waiting for pickup.

## How the health score works

The score starts at 100 and points are deducted using simple, transparent rules:

| Factor | Deduction |
|---|---|
| Age | 4 points per year, up to 32 |
| Charge cycles | 1 point per 40 cycles, up to 35 |
| Voltage below rated | 1.5 points per % below rated, up to 30 |
| Peak temperature above 45 °C | 1.5 points per °C above 45, up to 15 |
| Swelling, leaking or physical damage | 40 points |

**Triage result:**

- Score 70 or more → **Repair or repack** (reuse in vehicle)
- Score 40 to 69 → **Storage use** (solar, inverter, lights)
- Score below 40, or any physical damage → **Recycler**

These are rule-based and meant for demonstration. A real deployment should calibrate them with actual battery test data.

## How to change the data

All sample data is at the top of the `<script>` section in `ecodispose-dashboard.html`:

- `seed`: the starting list of batteries (owner, model, age, cycles, voltage, temperature, damage).
- `vendors`: shop names, type (`repair`, `storage`, `recycle`), distance and rating.
- `ROUTES`: labels and the CO₂ estimate (kg) used for each path.
- `assess()`: the health score rules. Change the numbers here to tune scoring.

Refreshing the page resets everything to this sample data, because there is no backend yet.


## Project info

- **Project name:** EcoDispose
- **Theme:** Smart EV battery disposal and recycling, with a connectivity focus
- **Team:** CodeXtra 
