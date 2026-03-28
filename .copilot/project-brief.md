# Project Brief

> Fill this out before starting development. The more detail you provide,
> the better your agent will perform. Delete any sections that don't apply.

---

## Overview

<!-- What is this project? Describe it in 2-3 sentences as if explaining to a new developer. -->

- This project is intended to parse images of league of legends post game screen using the game ID and visualize player stats

## Problem Being Solved

<!-- What pain point or need does this address? Why does it need to exist? -->

- This needed to automate the process of storing the results of the league game in a local database and creating custom visual breakdowns.

## Target Users

<!-- Who will use this? What is their technical level? -->

- League of legends players will use this. They do not have a lot of technical skill

## References

<!-- Where are the files that the agent will need to see your vision? -->

- Review all data in .copilot/references

## Core Features

<!-- List the must-have features for v1. Be specific. -->

- Create a front end web UI that allows users to maintain a list of Game IDs
- Use game IDs with Riot API to pull game data for the 10 players in the game. Each player should get an entry and it should include username, win/loss, champion, kills, deaths, assists, banned champion

## Out of Scope (for now)

<!-- What are you explicitly NOT building in this version? -->

-

## Tech Stack (if blank, decide yourself)

<!-- Fill in what's decided. Leave blank if not yet chosen. -->

- Frontend: Vite, React, Typescript
- Backend:
- Database:
- Auth:
- Hosting:
- Key libraries:
- API: Riot API

## Architecture Notes

<!-- Any patterns, structures, or decisions the agent should follow.
     e.g. "use the repository pattern", "all API calls go through a service layer" -->

-

## Data Models

<!-- Describe the main entities and their key fields. Can be rough. -->

-

## API / Integration Requirements

<!-- Any external APIs, services, or integrations needed -->

-

## Non-Functional Requirements

<!-- Performance, security, accessibility, browser support, etc. -->

-

## Success Criteria

<!-- How do you know when this project is "done"? What does working look like? -->

-

## Open Questions

<!-- Things you haven't decided yet. The agent can help you think through these. -->

- ***

<!-- Once you fill it out for a new project, pass your agent your initial-prompt.md -->
