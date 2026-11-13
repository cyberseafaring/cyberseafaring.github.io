---
title: "Student Research Topics"
permalink: /en/student-topics/
lang: en
alternate: /student-topics/
excerpt: "Undergraduate and master's research topics in maritime perception, collision avoidance, waterway monitoring, electronic charts, and maritime training."
---

[简体中文]({{ '/student-topics/' | relative_url }}) · [Home]({{ '/en/' | relative_url }})

Undergraduates can start with a short video, one waterway segment, or a single type of ship encounter and produce a reproducible analysis or prototype. Master's students can extend the same question with comparative experiments across waterways, vessel types, or operating conditions. These topics are starting points for capstone projects, research placements, and master's theses. The scope depends on data access and the time available.

- [Visual perception in restricted visibility](#maritime-vision)
- [Ship encounter risk and autonomous collision avoidance](#collision-avoidance)
- [Smart buoys and ship–shore sensing](#smart-buoys)
- [AIS trajectory analysis and shipping network resilience](#ais-resilience)
- [Electronic charts and route safety checks](#electronic-charts)
- [Navigation simulator training and competency assessment](#maritime-training)

## Visual perception in restricted visibility
{: #maritime-vision}

**Research question.** Which targets are missed in fog, backlighting, or at long range? Under what conditions do image enhancement and multi-frame tracking help?

- **Undergraduate project.** Group publicly available maritime images or videos by lighting and target size. Run a baseline detector and compare recall and inference latency across groups. Review representative false positives and missed targets.
- **Master's project.** Study one problem in image enhancement, lightweight detection, or multi-frame tracking. Split the training and test data by scene or voyage and compare performance across conditions.
- **Expected outputs.** A documented data split, a detection or tracking demo, results by condition, and examples of errors.

## Ship encounter risk and autonomous collision avoidance
{: #collision-avoidance}

**Research question.** How can a vessel retain enough room for a feasible manoeuvre while following collision regulations in crossing, head-on, and overtaking situations?

- **Undergraduate project.** Simulate the three encounter types, calculate distance and time to closest point of approach, and implement a rule-based course or speed change.
- **Master's project.** Study multi-ship encounters, observation delays, or manoeuvring constraints. Compare a rule-based baseline with trajectory optimisation or reinforcement learning using minimum separation, compliance with encounter rules, and changes in control actions.
- **Expected outputs.** Replayable encounter scenarios, decision logs, and a comparative experiment report.

## Smart buoys and ship–shore sensing
{: #smart-buoys}

**Research question.** How reliably can a shore system match Automatic Identification System (AIS) messages with buoy camera observations of the same vessel when the records differ in timing or position, or contain gaps?

- **Undergraduate project.** Use public examples or simulated records to align timestamps, plot trajectories, and match observations. Show how the prototype flags an uncertain association.
- **Master's project.** Compare association methods based on time, position, and track continuity. Simulate delays, packet loss, and occlusion to assess match accuracy, alert latency, and data volume.
- **Expected outputs.** A replay and fusion prototype, a set of failure cases, and an analysis of bandwidth and latency.

## AIS trajectory analysis and shipping network resilience
{: #ais-resilience}

**Research question.** How do navigation restrictions, congestion, and diversions affect traffic volumes, anchorage waiting, and recovery? How sensitive are the estimates to sampling frequency and the analysis window?

- **Undergraduate project.** Select one port or waterway. Clean, segment, and visualise trajectories from open or authorised AIS records. Plot traffic volumes and anchorage activity over time.
- **Master's project.** Build a time-varying shipping network from AIS trajectories. Compare traffic, diversions, and recovery times around a disruption. Test how the baseline window and indicator weights affect the results.
- **Expected outputs.** Data processing scripts, traffic maps, indicator definitions, and a reproducible case study.

## Electronic charts and route safety checks
{: #electronic-charts}

**Research question.** How can charted depth, changing water levels, and vessel draught inform route review, and how should a prototype report gaps in those inputs?

- **Undergraduate project.** Build an interactive route prototype with chart samples licensed for public use or synthetic data. Mark shallow water, restricted areas, and route segments that trigger an alert.
- **Master's project.** Choose one problem in route sampling, vertical datum alignment, or time matching using S-101 Electronic Navigational Charts, S-102 Bathymetric Surface, or S-104 Water Level Information under the IHO S-100 framework. Test the checks on scenarios with known expected results.
- **Expected outputs.** A route-checking prototype, test scenarios with expected results, and documentation of the data and decision rules.

## Navigation simulator training and competency assessment
{: #maritime-training}

**Research question.** How can a simulator record when a trainee detects a hazard, what action they take, and how that action affects the encounter?

- **Undergraduate project.** Design a bridge exercise around target detection in fog or a crossing encounter in a confined waterway. Implement state logging, event replay, and a scoring rubric.
- **Master's project.** Design an evaluation comparing replay of trainee actions with event-based feedback. Consider time to recognise a hazard, choice of manoeuvre, and the trainee's explanation during debriefing. Follow university procedures for ethics review and data use when involving participants.
- **Expected outputs.** A runnable training scenario, an event log, a scoring rubric, and an evaluation protocol.

## Discuss a project

Email [zhangruolan@dlmu.edu.cn](mailto:zhangruolan@dlmu.edu.cn) with your year of study, degree programme, and relevant coursework or projects. You can name one or two topics that interest you and suggest a question to test, along with the data or simulated scenario you would use to get started.
