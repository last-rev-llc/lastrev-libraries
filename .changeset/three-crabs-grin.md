---
'@last-rev/cli': patch
---

Updated dependencies to address security vulnerabilities:

- Updated chalk to v4.1.2
- Updated axios to v1.7.9 to address:
  - CSRF vulnerability (CVE-2023-45857)
  - ReDoS vulnerability (SNYK-JS-AXIOS-6124857)
  - XSS vulnerability (SNYK-JS-AXIOS-6671926)
- Added package resolutions to enforce secure versions of:
  - micromatch@4.0.8 (fixes CVE-2024-4067)
  - braces@3.0.3 (fixes CVE-2024-4068)
  - ansi-regex@5.0.1 (fixes CVE-2021-3807)
  - unset-value@2.0.1 (fixes prototype pollution)
