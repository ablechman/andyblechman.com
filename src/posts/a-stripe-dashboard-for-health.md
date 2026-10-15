---
title: "A Stripe Dashboard for Health"
date: 2025-02-24
excerpt: "I’ve always admired the Stripe dashboard. We leaned heavily on the dashboard as our ultimate source of truth at Bottle. Whether I needed to know about cash…"
---

I’ve always admired the Stripe dashboard. We leaned heavily on the dashboard as our ultimate source of truth at [Bottle](https://www.bottle.com/). Whether I needed to know about cash balances, monthly GMV, or customer data, I could reliably find it in the dashboard. What’s impressive is how Stripe takes a web of complex data and interactions and presents them in an easily digestible format to understand business health.

I want the same thing for my physical fitness and wellness. I wear a Whoop and love the data it provides. I weigh myself most mornings on an analog scale (Whoop has a [Withings](https://www.withings.com/) partnership but I haven’t bought the scale). Occasionally, I’ll test my body fat as a benchmark for overall health, a better metric than weight or BMI.

[The data](https://pmc.ncbi.nlm.nih.gov/articles/PMC11054424/#:~:text=The%20current%20research%20literature%20on,%2C%20and%20overall%20well%2Dbeing%29) support that placing wellness data in one dashboard could be helpful for large scale behavior change.

At a high level, I’d want to track key markers like heart rate, heart rate variability, macros consumed etc. Here's an example of a baseline dashboard:

| Weekly Average Metric | 1/27/24 | 2/3/24 | 2/10/24 | 2/17/24 | 2/24/24 |
| --- | --- | --- | --- | --- | --- |
| **Body Metrics** |  |  |  |  |  |
| Weight |  |  |  |  |  |
| HRV |  |  |  |  |  |
| HR (Resting) |  |  |  |  |  |
| VO2 Max (annually) |  |  |  |  |  |
| **Sleep** |  |  |  |  |  |
| Time in Bed |  |  |  |  |  |
| Sleep Duration |  |  |  |  |  |
| **Activity** |  |  |  |  |  |
| Calories Burned |  |  |  |  |  |
| Cardio Minutes |  |  |  |  |  |
| Strength Minutes |  |  |  |  |  |
| **Calories Consumed** |  |  |  |  |  |
| Protein (g) |  |  |  |  |  |
| Carbs (g) |  |  |  |  |  |
| Fat (g) |  |  |  |  |  |

In terms of biomarkers, I like what [Function Health](https://www.functionhealth.com/) has built. They are tracking 100+ biomarkers, displaying them in a simple to use dashboard and accompanied with actionable suggestions for food and supplements. Curated supplementation, and nutrition suggestions are something I’ve been interested in for a while.

## A Playing Card For Health

One way to take health and wellness data and make it fun and actionable is to combine it into a playing card style format. Some data would be private, while other data could be shared as determined by the user. Ultimately, humans love competition and allowing people to use health and biomarker data in a way that is fun, playful, and built around community will be valuable. I imagine this to exist in three tiers:

1. Sports data: Stats and other fun metrics from any sport you play. Including Strava data, Peloton, and sports you might play.
2. Wellness data: HR, HRV etc.
3. In depth biomarkers: i.e. the Function health dashboard.

Lastly, this all needs to be automated. API integrators like [Terra](https://tryterra.co/) and [Apple HealthKIt](https://developer.apple.com/documentation/healthkit/) exist to ingest data from wearables and lab tests. The next phase will be to use agentic AI to easily put together summaries from data and provide coaching. The AI could be supplemented by a care team as well.

Ultimately, I imagine in the near future each human will have a virtual, AI powered health coach that knows what you ate, the activities you performed, your blood work levels, and your supplements to help achieve peak health.
