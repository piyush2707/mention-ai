MENTION — Website AI Readiness Scanner

Make AI notice you.

MENTION is a website analysis tool created by Welvox to help website owners understand their website's technical readiness for modern search engines and AI-powered discovery.

It analyses publicly accessible website information, identifies technical signals, provides recommendations, and helps users keep track of their website audits.

«A Welvox product»

---

Project Information

Detail| Information
Project| MENTION
Organization| Welvox
Version| V0.7.0
Project status| Development concluded
Category| Website analysis / AI readiness
Deployment| GitHub Pages
Backend| Cloudflare Workers
Authentication and database| Supabase
License| MIT

Live Project

- Website: https://piyush2707.github.io/mention-ai/
- Website Scanner: https://piyush2707.github.io/mention-ai/scanner.html
- GitHub Repository: https://github.com/piyush2707/mention-ai

---

What is MENTION?

The internet is changing as search engines and AI-powered systems become increasingly important ways for people to discover information.

MENTION was created to help website owners understand some of the technical foundations that support website discovery.

It provides a preliminary technical audit of a publicly accessible website and presents findings in a simple dashboard.

MENTION focuses on making technical website information easier to understand and act upon.

Features

1. Website Scanning

- Scan a publicly accessible website using its URL.
- Retrieve available website HTML.
- Extract page title and meta description.
- Identify the main heading.
- Detect canonical URL information.
- Generate a preliminary technical readiness score.

2. Technical Readiness Checks

The scanner checks available technical signals, including:

- Website metadata.
- Structured data presence.
- "robots.txt" availability.
- "sitemap.xml" availability.
- "llms.txt" availability.
- Other supported website signals.

The checks depend on the information the scanner can successfully retrieve.

3. Audit Dashboard

- Display scan results.
- Show the preliminary score.
- Present website information.
- Display technical checks.
- Provide recommendations for improvement.

4. User Authentication

- Account registration.
- Email verification through Supabase.
- User login.
- Authenticated access to the scanner.

5. Audit History

- Save audit records to the device.
- Store authenticated audit records in Supabase.
- Retrieve saved cloud audits.
- Open previous audit results.
- Delete individual audit records.
- Clear local audit history.

6. Audit Comparison

Compare recent website audits to understand changes in their technical readiness results.

7. PDF Reports

Generate printable audit reports that can be saved as PDF files through the browser's print functionality.

8. Responsive Interface

MENTION was designed to work across desktop and mobile screens, including a mobile-first development workflow.

---

Technology Stack

Technology| Purpose
HTML| Website structure
CSS| Interface and responsive styling
JavaScript| Frontend functionality
GitHub Pages| Website hosting
Cloudflare Workers| Website scanning API
Supabase Auth| User authentication
Supabase Database| Cloud audit storage

Architecture

The project uses a lightweight architecture:

1. The frontend is hosted through GitHub Pages.
2. Users submit a website URL through the scanner.
3. The Cloudflare Worker retrieves publicly accessible website information and performs preliminary checks.
4. The scanner displays the returned analysis.
5. Authenticated audit records can be stored in Supabase.
6. Users can review and compare saved audits.

---

Important Limitations

MENTION is a technical website-readiness scanner, not a complete AI search visibility measurement platform.

Its results should be understood as preliminary technical indicators.

MENTION does not currently establish:

- Whether ChatGPT recommends a particular brand.
- Whether Gemini cites a particular website.
- Whether Claude mentions a particular business.
- Actual AI search rankings.
- Guaranteed indexing or citation by AI systems.
- Guaranteed improvements in search performance.

A detected technical signal does not guarantee that a website will be discovered, indexed, recommended, or cited.

Results may also vary depending on website accessibility, server configuration, robots rules, and the information returned during scanning.

---

Security and Privacy Considerations

MENTION uses Supabase authentication and database access policies to protect authenticated audit records.

The scanning service retrieves publicly accessible website information. It should not be used to scan private or unauthorized resources.

The scanning backend requires appropriate security protections, including:

- Server-side URL validation.
- SSRF and DNS-rebinding protection.
- Request size and timeout limits.
- Rate limiting.
- Safe handling of untrusted website content.

The project should not be considered production-hardened or security-certified.

Users should avoid submitting sensitive or private URLs.

---

Pricing

MENTION's implemented offering was a free MVP.

No paid subscription or payment-processing system is represented as implemented in this release.

---

Project Development

MENTION was developed as a Welvox project with an emphasis on building and deploying a functional web application using accessible, mobile-friendly development tools.

The project brought together:

- A responsive website interface.
- A website scanning service.
- User authentication.
- Cloud-based audit storage.
- Historical audit management.
- Audit comparison.
- PDF report generation.

The project demonstrates how a useful web product can be developed and deployed with a lightweight architecture.

---

Project Status

Development concluded — V0.7.0 project milestone.

MENTION is preserved as a completed MVP project and a record of its development.

Ideas considered for future development included:

- Advanced technical AI-readiness analysis.
- AI-powered explanations and code fixes.
- Competitor intelligence.
- Website monitoring.
- AI brand visibility tracking.
- Agency workspaces.
- Paid subscription plans.

These were future concepts, not completed features of this release.

---

License

This project is released under the MIT License.

See the "LICENSE" file for details.

---

Created by Welvox

MENTION

Make AI notice you.

A project by Welvox.

Built to make website readiness easier to understand.
