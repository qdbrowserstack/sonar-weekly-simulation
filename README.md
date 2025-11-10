# Sonar Weekly Simulation

This repository simulates an active project so SonarQube (or SonarCloud) shows realistic metrics instead of 0%.

What this repo includes:

- Source code under `app/` with several functions exercising complexity and branches.
- Duplication: `app/strings.py` and `app/legacy.py` contain duplicated logic.
- Intentional issues: unused variables, nested ifs, and some code smells to increase technical debt metrics.
- Tests under `tests/` that produce coverage information (coverage.xml).
- A scheduled GitHub Actions workflow `.github/workflows/weekly.yml` that runs weekly and commits a timestamp to `generated/weekly.txt` to simulate ongoing activity.

How it helps Sonar:

- `pytest --cov=app --cov-report=xml:coverage.xml` produces `coverage.xml` which Sonar can consume for line/branch coverage.
- The code contains complexity, duplication, and issues which Sonar will surface as technical debt and code smells.
- The scheduled workflow commits weekly so Sonar's "new code" metrics can update regularly.

Optional Sonar setup
--------------------

If you want the workflow to run Sonar scans automatically, add repository secrets:

- `SONAR_HOST_URL` — your SonarQube/Cloud instance URL
- `SONAR_TOKEN` — scanner token

Then modify the workflow step `Optional: run SonarQube analysis` to install and run the appropriate scanner (for SonarCloud you can use the official action; for on-prem SonarQube install `sonar-scanner` and call it with `-Dsonar.login=$SONAR_TOKEN -Dsonar.host.url=$SONAR_HOST_URL` and proper `sonar.projectKey`/`sonar.projectName`).

Quick local run
# Sonar Weekly Simulation

This repository simulates an active JavaScript project so SonarQube (or SonarCloud) shows realistic metrics instead of 0%.

What this repo includes:

- JavaScript source in `src/` with several functions exercising complexity and branches.
- Duplication: `src/legacy.js` contains duplicated logic from `src/*` to trigger duplication metrics.
- Intentional issues: unused variables, nested ifs, and some code smells to increase technical debt metrics.
- Tests under `tests/` using Jest that produce coverage information (coverage/lcov.info).
- A scheduled GitHub Actions workflow `.github/workflows/weekly.yml` that runs weekly, runs tests, and commits a timestamp to `generated/weekly.txt` to simulate ongoing activity.

How it helps Sonar:

- `npm test` (Jest) produces `coverage/lcov.info` which Sonar can consume for line/branch coverage when configured (`sonar.javascript.lcov.reportPaths=coverage/lcov.info`).
- The code contains complexity, duplication, and issues which Sonar will surface as technical debt and code smells.
- The scheduled workflow commits weekly so Sonar's "new code" metrics can update regularly.

Optional Sonar setup
--------------------

If you want the workflow to run Sonar scans automatically, add repository secrets:

- `SONAR_HOST_URL` — your SonarQube/Cloud instance URL
- `SONAR_TOKEN` — scanner token

Then modify the workflow step `Optional: run SonarQube analysis` to install and run the appropriate scanner (for SonarCloud you can use the official action; for on-prem SonarQube install `sonar-scanner` and call it with `-Dsonar.login=$SONAR_TOKEN -Dsonar.host.url=$SONAR_HOST_URL` and proper `sonar.projectKey`/`sonar.projectName`).

Quick local run
---------------

Install dependencies and run tests locally:

```bash
npm install
npm test
```

This will create `coverage/lcov.info` and a coverage summary. The workflow will run weekly and commit a timestamped file to keep the project active.

Next steps
----------

- (Optional) Configure Sonar secrets and enable scanner in the workflow.
- (Optional) Extend the codebase with more modules and tests to further vary metrics.
