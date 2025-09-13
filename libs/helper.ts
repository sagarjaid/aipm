export const tickets = [
  {
    type: "Story",
    key: "ATRE-117",
    assignee: { name: "Unassigned", avatar: "👤" },
    priority: "Medium",
    status: "OPEN",
    summary: "BUGFIX",
    description:
      "General bug fixes and improvements for the current sprint. This includes various minor issues that need to be addressed across the application.",
    labels: ["bugfix", "general"],
    sprint: "ATRE Sprint 3",
    fixVersion: "RV2.76",
    created: "15 Jun 2025",
    updated: "20 Jun 2025",
    comments: [
      {
        author: "Sagar Jaid",
        text: "Please review and assign this ticket to the appropriate team member.",
      },
    ],
  },
  {
    type: "Epic",
    key: "ATRE-101",
    assignee: { name: "Unassigned", avatar: "👤" },
    priority: "Medium",
    status: "OPEN",
    summary: "[PLD][UI] – New Workflow Builder",
    description:
      "Implement a new workflow builder interface for the PLD module. This epic includes designing and developing a drag-and-drop interface for creating custom workflows.",
    labels: ["epic", "ui", "pld", "workflow"],
    sprint: "ATRE Sprint 2",
    fixVersion: "RV2.77",
    created: "10 Jun 2025",
    updated: "18 Jun 2025",
    comments: [
      {
        author: "Product Manager",
        text: "This is a major feature that will require careful planning and design review.",
      },
      {
        author: "UX Designer",
        text: "Wireframes are ready for review. Please schedule a design review meeting.",
      },
    ],
  },
  {
    type: "Task",
    key: "ATRE-90",
    assignee: { name: "Joaquín Pérez", avatar: "JP", color: "#2563eb" },
    priority: "Medium",
    status: "OPEN",
    summary: "RV2.75.1 and RV2.75.2 - Product review pending",
    description:
      "Complete product review for versions RV2.75.1 and RV2.75.2. This includes testing all new features and ensuring quality standards are met before release.",
    labels: ["review", "quality", "release"],
    sprint: "ATRE Sprint 1",
    fixVersion: "RV2.75.2",
    created: "22 Jun 2025",
    updated: "24 Jun 2025",
    comments: [
      {
        author: "Joaquín Pérez",
        text: "Started the review process. Will complete by end of week.",
      },
      {
        author: "QA Lead",
        text: "Test cases have been prepared and are ready for execution.",
      },
    ],
  },
  {
    type: "Task",
    key: "ATRE-70",
    assignee: { name: "Ross I", avatar: "RI", color: "#059669" },
    priority: "Medium",
    status: "OPEN",
    summary: "DevOps Team Efforts",
    description:
      "Ongoing DevOps tasks including infrastructure improvements, deployment pipeline optimization, and monitoring setup.",
    labels: ["devops", "infrastructure", "deployment"],
    sprint: "ATRE Sprint 2",
    fixVersion: "RV2.76",
    created: "18 Jun 2025",
    updated: "23 Jun 2025",
    comments: [
      {
        author: "Ross I",
        text: "Working on CI/CD pipeline improvements. Expected completion: next week.",
      },
      {
        author: "DevOps Manager",
        text: "Please prioritize the monitoring setup for production environment.",
      },
    ],
  },
  {
    type: "Story",
    key: "ATRE-56",
    assignee: { name: "Sagar Jaid", avatar: "SJ", color: "#f59e42" },
    priority: "Medium",
    status: "OPEN",
    summary: "Agile Efforts - ATRE team - Sagar Jaid",
    description:
      "Track and manage agile development efforts for the ATRE team. This includes sprint planning, retrospectives, and process improvements.",
    labels: ["agile", "process", "team"],
    sprint: "ATRE Sprint 1",
    fixVersion: "RV2.75",
    created: "20 Jun 2025",
    updated: "25 Jun 2025",
    comments: [
      {
        author: "Sagar Jaid",
        text: "Sprint planning completed. Team velocity is improving.",
      },
      {
        author: "Scrum Master",
        text: "Great work on the retrospective improvements!",
      },
    ],
  },
  {
    type: "Task",
    key: "ATRE-42",
    assignee: { name: "Devika Patel", avatar: "DP", color: "#a21caf" },
    priority: "Medium",
    status: "OPEN",
    summary: "QA Team Efforts",
    description:
      "Quality assurance activities including test case creation, automated testing, and bug verification for the current release cycle.",
    labels: ["qa", "testing", "quality"],
    sprint: "ATRE Sprint 1",
    fixVersion: "RV2.75.1",
    created: "19 Jun 2025",
    updated: "24 Jun 2025",
    comments: [
      {
        author: "Devika Patel",
        text: "Automated test suite is 85% complete. Manual testing in progress.",
      },
      {
        author: "QA Manager",
        text: "Please focus on critical path testing for the upcoming release.",
      },
    ],
  },
  {
    type: "Bug",
    key: "ATRE-40",
    assignee: { name: "Divyesh Bhalala", avatar: "DB", color: "#0ea5e9" },
    priority: "Medium",
    status: "OPEN",
    summary: "HOTFIX",
    description:
      "Critical bug fix required for production environment. This is a high-priority issue that needs immediate attention.",
    labels: ["hotfix", "critical", "production"],
    sprint: "ATRE Sprint 1",
    fixVersion: "RV2.75.1",
    created: "24 Jun 2025",
    updated: "25 Jun 2025",
    comments: [
      {
        author: "Divyesh Bhalala",
        text: "Investigating the root cause. Will provide update within 2 hours.",
      },
      {
        author: "Sagar Jaid",
        text: "This needs to be resolved before the next deployment.",
      },
    ],
  },
  {
    type: "Task",
    key: "ATRE-39",
    assignee: { name: "Giuseppe Di Franco", avatar: "GF", color: "#10b981" },
    priority: "Medium",
    status: "OPEN",
    summary: "Analytics [PLD]",
    description:
      "Implement analytics tracking for the PLD module. This includes setting up event tracking, dashboards, and reporting capabilities.",
    labels: ["analytics", "pld", "tracking"],
    sprint: "ATRE Sprint 2",
    fixVersion: "RV2.76",
    created: "17 Jun 2025",
    updated: "22 Jun 2025",
    comments: [
      {
        author: "Giuseppe Di Franco",
        text: "Analytics implementation is 60% complete. Dashboard design in progress.",
      },
      {
        author: "Product Manager",
        text: "Please ensure we track user engagement metrics for the new features.",
      },
    ],
  },
  {
    type: "Story",
    key: "ATRE-5",
    assignee: { name: "Joaquín Pérez", avatar: "JP", color: "#2563eb" },
    priority: "Highest",
    status: "OPEN",
    summary: "RV2.75.2",
    description:
      "Release version 2.75.2 preparation and deployment. This includes final testing, documentation updates, and release notes preparation.",
    labels: ["release", "highest", "deployment"],
    sprint: "ATRE Sprint 1",
    fixVersion: "RV2.75.2",
    created: "21 Jun 2025",
    updated: "25 Jun 2025",
    comments: [
      {
        author: "Joaquín Pérez",
        text: "Release candidate is ready for final testing.",
      },
      {
        author: "Release Manager",
        text: "Deployment scheduled for tomorrow at 2 AM EST.",
      },
    ],
  },
  {
    type: "Subtask",
    key: "ATRE-20",
    assignee: { name: "Joaquín Pérez", avatar: "JP", color: "#2563eb" },
    priority: "Medium",
    status: "OPEN",
    summary: "RV2.76",
    description:
      "Subtask for RV2.76 release preparation. This includes specific components that need to be completed as part of the larger release.",
    labels: ["subtask", "release", "rv2.76"],
    sprint: "ATRE Sprint 2",
    fixVersion: "RV2.76",
    created: "16 Jun 2025",
    updated: "23 Jun 2025",
    comments: [
      {
        author: "Joaquín Pérez",
        text: "Component testing completed. Ready for integration testing.",
      },
    ],
  },
  {
    type: "Task",
    key: "ATRE-91",
    assignee: { name: "Joaquín Pérez", avatar: "JP", color: "#2563eb" },
    priority: "Medium",
    status: "OPEN",
    summary: "V2 - RV2.75.1",
    description:
      "Version 2 implementation for RV2.75.1. This includes new features and improvements that are part of the version 2 roadmap.",
    labels: ["v2", "features", "roadmap"],
    sprint: "ATRE Sprint 1",
    fixVersion: "RV2.75.1",
    created: "20 Jun 2025",
    updated: "24 Jun 2025",
    comments: [
      {
        author: "Joaquín Pérez",
        text: "V2 features are 75% complete. Integration testing in progress.",
      },
      {
        author: "Product Owner",
        text: "Please ensure backward compatibility is maintained.",
      },
    ],
  },
  {
    type: "Bug",
    key: "ATRE-41",
    assignee: { name: "Joaquín Pérez", avatar: "JP", color: "#2563eb" },
    reporter: { name: "Sagar Jaid", avatar: "SJ", color: "#f59e42" },
    priority: "Highest",
    status: "Done",
    summary:
      "[HOTFIX][RV2.75.1] The first promoter API for the lead may be called twice",
    description: `Can you check something your morning quickly in stage (and PROD) in our code base ... looks like maybe when we sign up a customer for free trial the first promoter API for the lead may be called twice so when someone signed up for a free trial first looks like we may be calling twice. Maybe we introduced a bug when we made recent changes to pay first? Please have a look thank you.\n\nSlack: https://repurpose-team.slack.com/archives/CU9PHL4TL/p/1750263361216339`,
    labels: ["HOTFIX"],
    sprint: "ATRE Sprint 1",
    fixVersion: "RV2.75",
    created: "23 Jun 2025",
    updated: "25 Jun 2025",
    comments: [
      {
        author: "Sagar Jaid",
        text: "Hi @Joaquín Pérez , Please validate and close the issue.",
      },
      {
        author: "Dharmesh Dakhra",
        text: "For this ticket, we have tested all scenarios and concluded that the issue is not on our end. The duplicate leads are being created by the FirstPromoter API without a UID. Therefore, no code changes are required from our side.",
      },
      {
        author: "Dharmesh Dakhra",
        text: `@Sagar Jaid I noticed in the Stripe dashboard that the 'invoice.payment_succeeded' event shows FirstPromoter as connected. At this point, we don't have the UID available, so FirstPromoter doesn't receive the 'uid' when it's triggered. Also, as you can see in the screenshot, this event is delivered twice by Stripe itself, which could be causing the duplicated lead issue — something we can't handle from our end.\n\n[Screenshot]\n\nMy question is: **do we actually need FirstPromoter to be connected to Stripe?** I'm not sure why this integration was set up, but it's causing problems in this case.\n\nFrom our code, we're assigning leads to FirstPromoter only after the checkout session is completed — when we do have the UID — which seems to be the correct and controlled point for that logic.`,
      },
    ],
  },
];
