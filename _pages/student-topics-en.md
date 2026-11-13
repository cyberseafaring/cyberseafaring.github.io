---
title: "Student Research Topics"
permalink: /en/student-topics/
lang: en
alternate: /student-topics/
excerpt: "Ten research directions in intelligent navigation for undergraduate and master's students, with prior work, open questions, and ways to test new ideas."
---

[简体中文]({{ '/student-topics/' | relative_url }}) · [Home]({{ '/en/' | relative_url }})

These ten directions can be developed into individual projects. Undergraduates can reproduce a baseline or build a demonstrable component. Master's students can design a comparative study around one research question. The scope depends on data permissions, equipment, and time.

- [Non-cooperative target sensing in restricted visibility](#maritime-vision)
- [Multimodal maritime situational awareness](#multimodal-awareness)
- [Accident causation and navigational risk](#accident-causation)
- [Traffic state graphs and monitoring](#traffic-state-graphs)
- [Safe decision-making for autonomous ships](#collision-avoidance)
- [Maritime VHF speech recognition](#vhf-speech)
- [Smart buoys and proactive navigation services](#smart-buoys)
- [Voyage event recognition and replay](#voyage-event-analysis)
- [S-100 navigation assistance](#electronic-charts)
- [Multi-agent maritime simulation training](#maritime-training)

## Non-cooperative target sensing in restricted visibility
{: #maritime-vision}

**Established findings and research basis.** Published studies developed methods for detecting distant and small vessels and evaluated them on the imagery and video used in the studies. Work on real-time detection in adverse weather provides a basis for comparing visual methods across conditions. [Long-range small-target detection](https://doi.org/10.1016/j.oceaneng.2025.121447) · [Ship detection in adverse weather](https://doi.org/10.1007/s11804-026-00926-2) · [Waterway monitoring in restricted visibility]({{ '/en/research/low-visibility/' | relative_url }})

**Open question.** When a vessel has no usable Automatic Identification System (AIS) reports, fog, backlighting, or darkness can degrade camera observations. Under what combinations of range and occlusion can video, radar, and synthetic aperture radar (SAR) jointly establish the vessel's position and class?

**Ideas to test.** Weight each sensor according to its availability and observation quality. Report a position interval or flag the target for confirmation when observations are sparse. Compare single-source and multimodal methods on public, authorised, or simulated samples using recall by range, false alarm rate, and calibration error.

## Multimodal maritime situational awareness
{: #multimodal-awareness}

**Established findings and research basis.** Previous work studied regional matching and cross-modal target association, and used temporal observations to model maritime situations. [Fine-grained traffic perception](https://doi.org/10.1080/20464177.2025.2578910) · [Temporal multimodal situational understanding](https://doi.org/10.1016/j.oceaneng.2026.125265)

**Open question.** Vessel motion, asynchronous sensors, and positioning errors make it difficult to match targets across onboard video, AIS, and an Electronic Navigational Chart (ENC). Association errors can propagate into estimates of distance and time to closest point of approach (DCPA and TCPA).

**Ideas to test.** Register observations in a common bird's-eye coordinate frame, compensate for vessel motion with GNSS and inertial measurement data, and use AIS trajectories as motion priors. Compare a fixed matching window with dynamic spatiotemporal constraints. Measure localisation error, association accuracy, and errors in DCPA and TCPA.

## Accident causation and navigational risk
{: #accident-causation}

**Established findings and research basis.** Research on navigational risk provides encounter scenarios and behavioural measures. Public marine investigation reports offer source material for a corpus. Causal extraction and transfer across scenarios are research tasks for this direction. [Autonomous navigation and collision avoidance]({{ '/en/research/autonomy/' | relative_url }})

**Open question.** Investigation agencies differ in terminology, level of detail, and report structure. How can a method extract events and causal relationships supported by the source text, then determine which historical accident patterns apply to a current navigation scenario?

**Ideas to test.** Annotate reports for one accident type and use a large language model to extract events, timing, participants, and supporting passages. Represent the findings in a searchable causal graph. Use expert review to assess extraction accuracy, hold out reports by agency or time period, and test whether transferred patterns improve risk recognition in simulated encounters.

<a id="ais-resilience"></a>

## Traffic state graphs and monitoring
{: #traffic-state-graphs}

**Established findings and research basis.** Previous research constructed time-varying shipping networks from AIS data to measure regional disruption and recovery. Related work examined ship monitoring and services from a remote operations centre. [Shipping network resilience](https://doi.org/10.3390/su18157917) · [Remote operations centre research](https://doi.org/10.1186/s41072-026-00243-5)

**Open question.** How can a system track ships, channel segments, encounters, and temporary restrictions as conditions change, while keeping each risk judgement traceable to an observation or applicable rule?

**Ideas to test.** Select a channel segment in Qingdao Port and combine AIS, ENC, and Vessel Traffic Service (VTS) records as available. Use the tracks and encounter relationships in the graph to ground explanations generated by a large language model. Compare historical or simulated events against a rule-based baseline using risk recognition, warning lead time, and accuracy of cited evidence.

## Safe decision-making for autonomous ships
{: #collision-avoidance}

**Established findings and research basis.** Previous work used time series to represent reinforcement learning states and evaluated decisions in its autonomous navigation scenarios. Related research incorporated ENC topology and the International Regulations for Preventing Collisions at Sea (COLREGs) into ship interaction and trajectory prediction. [Temporal reinforcement learning](https://doi.org/10.3390/jmse13030514) · [Vessel trajectory prediction](https://doi.org/10.1016/j.joes.2026.07.011)

**Open question.** Prediction errors can grow over the planning horizon when a world model forecasts interactions among multiple vessels. How can decisions account for collision regulations, manoeuvring limits, and uncertainty in those forecasts?

**Ideas to test.** Build a simulation model that predicts multi-ship traffic states, then study differentiable rule constraints or safe reinforcement learning. Use crossing, head-on, overtaking, and confined-water multi-ship encounters to compare minimum separation, rule compliance, and manoeuvre feasibility against a rule-based baseline.

## Maritime VHF speech recognition
{: #vhf-speech}

**Established findings and research basis.** A conference study implemented VHF enhancement, recognition, understanding and synthesis on a Jetson Orin Nano smart-buoy prototype and evaluated speech quality and interaction latency in its experiments. [VHF ship–shore interaction paper](https://doi.org/10.1007/978-981-95-9366-8_3)

**Open question.** Noise, accent variation, and short transmissions can cause errors in vessel names, call signs, and numbers. How can a model preserve these entities and request human confirmation when confidence is low?

**Ideas to test.** Annotate authorised or simulated very high frequency (VHF) speech. Constrain decoding with a vessel name and call sign vocabulary and check intent and parameters against the Standard Marine Communication Phrases (SMCP). Compare entity error rate, intent accuracy, and on-device latency against a general automatic speech recognition (ASR) baseline.

## Smart buoys and proactive navigation services
{: #smart-buoys}

**Established findings and research basis.** A case study aligned buoy video and AIS at the edge and fused them into local tracks. Related work studied buoy camera detection and tracking as well as estimation of mooring conditions. [Buoy edge fusion](https://doi.org/10.3390/jmse13020220) · [Detection and tracking with buoy cameras](https://doi.org/10.1080/17445302.2026.2717423) · [Buoy condition research]({{ '/en/research/smart-aids/' | relative_url }})

**Open question.** During outages, observation gaps, or changes in buoy condition, which decisions can be made on the buoy and which require shore-side aggregation and review?

**Ideas to test.** Replay AIS, video, weather, and hydrological records on an edge device. Compare event-triggered and periodic uploads under outages, delays, and missing observations. Measure track completeness, alert latency, data volume, and recovery time. Extend the study to buoy maintenance or VHF interaction when suitable data are available.

## Voyage event recognition and replay
{: #voyage-event-analysis}

**Established findings and research basis.** The ship–shore collaboration prototype supports observation replay, AIS and video fusion, and shore-side display. Temporal multimodal perception research offers methods to study alignment and event recognition during replay. [Ship–shore prototype]({{ '/en/research/remotebridge/' | relative_url }}) · [Temporal multimodal situational understanding](https://doi.org/10.1016/j.oceaneng.2026.125265)

**Open question.** Voyage Data Recorder (VDR) streams can contain gaps and timing offsets across bridge audio, radar, Electronic Chart Display and Information System (ECDIS) records, and vessel motion data. How can events such as sighting a target, giving an order, or initiating a manoeuvre be linked to reviewable source segments?

**Ideas to test.** Start with simulator logs or authorised voyage records. Align the data streams, annotate typical events, and build a timeline with links to source segments. Compare event recognition accuracy, timing error, and retrieval accuracy with manual review.

## S-100 navigation assistance
{: #electronic-charts}

**Established findings and research basis.** Previous work investigated augmented reality displays for waterway traffic using sparse spatiotemporal data. Work on S-100 uses electronic charts, bathymetry, water levels, surface currents, and navigational warnings to prototype route review and ship–shore data services. [Augmented reality for waterway traffic](https://doi.org/10.3390/app15041710) · [S-100 ship–shore research]({{ '/en/research/s100/' | relative_url }})

**Open question.** How can the system assess shallow water, navigational warnings, or traffic conflicts along a route when chart updates, vertical datums, and sensor timestamps differ?

**Ideas to test.** Choose one route segment and relate chart features to AIS, radar, or camera targets. Use scenarios with known answers to check alert location, data freshness, and depth assessment. Compare results from a chart-only baseline and a system using multiple inputs.

## Multi-agent maritime simulation training
{: #maritime-training}

**Established findings and research basis.** Maritime education research has examined curriculum and seafarer competency requirements in the context of artificial intelligence. A 3D bridge and simulated radar and ECDIS tasks provide a setting for training scenarios and action logging. [Maritime education and seafarer development]({{ '/en/research/education/' | relative_url }})

**Open question.** How can agents that generate scenarios, operate equipment, play roles, guide trainees, and assess performance share a consistent exercise state and adapt later tasks to trainee actions?

**Ideas to test.** Start with one exercise, such as target detection in fog or a confined-water encounter. Ground prompts and scores in simulator state and event logs. Compare a fixed script with adaptive assistance using prompt accuracy, task completion, and agreement with a human scoring rubric. Follow university ethics and data procedures for studies involving trainees.

## Discuss a project

Email [zhangruolan@dlmu.edu.cn](mailto:zhangruolan@dlmu.edu.cn) with your year of study, degree programme, and relevant coursework or projects. You can name one or two topics that interest you, suggest a question to test, and describe the data or simulation scenario you would use to get started.
