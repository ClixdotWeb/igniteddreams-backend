import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const Role = {
  ADMIN: "ADMIN",
  INSTRUCTOR: "INSTRUCTOR",
  STUDENT: "STUDENT",
} as const;

const UserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED",
} as const;

const CourseStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
} as const;

const BatchStatus = {
  UPCOMING: "UPCOMING",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

const ClassStatus = {
  SCHEDULED: "SCHEDULED",
  LIVE: "LIVE",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

const RecordingStatus = {
  SCHEDULED: "SCHEDULED",
  LIVE: "LIVE",
  RECORDING: "RECORDING",
  PROCESSING: "PROCESSING",
  READY: "READY",
  EXPIRING_SOON: "EXPIRING_SOON",
  EXPIRED: "EXPIRED",
  DELETING: "DELETING",
  DELETED: "DELETED",
  FAILED: "FAILED",
} as const;

const AttendanceStatus = {
  PRESENT: "PRESENT",
  ABSENT: "ABSENT",
  PARTIAL: "PARTIAL",
} as const;

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding IgnitedDreams Skill Academy database (CA, CMA, ACCA & Professional Accounting)...");

  // 1. Initialize Platform Settings
  await prisma.setting.upsert({
    where: { key: "recordingRetentionDays" },
    update: { value: "7" },
    create: { key: "recordingRetentionDays", value: "7", description: "Default recording retention period in days" },
  });

  await prisma.setting.upsert({
    where: { key: "academyName" },
    update: { value: "IgnitedDreams Skill Academy" },
    create: { key: "academyName", value: "IgnitedDreams Skill Academy", description: "Official academy brand name" },
  });

  await prisma.setting.upsert({
    where: { key: "academyTimezone" },
    update: { value: "Asia/Kolkata" },
    create: { key: "academyTimezone", value: "Asia/Kolkata", description: "Standard academy operational timezone" },
  });

  await prisma.setting.upsert({
    where: { key: "classJoinWindowMinutes" },
    update: { value: "15" },
    create: { key: "classJoinWindowMinutes", value: "15", description: "Minutes before scheduled start time students can join" },
  });

  // Common hashed passwords
  const adminPasswordHash = await bcrypt.hash("AdminPassword2026!", 12);
  const instructorPasswordHash = await bcrypt.hash("InstructorPass2026!", 12);
  const studentPasswordHash = await bcrypt.hash("StudentPass2026!", 12);

  // 2. Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: "admin@igniteddreams.com" },
    update: { name: "Academy Director" },
    create: {
      name: "Academy Director",
      email: "admin@igniteddreams.com",
      phone: "+91 98765 43210",
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
    },
  });

  // 3. Create Instructors (CA / CMA Faculty)
  const instructor1 = await prisma.user.upsert({
    where: { email: "instructor1@igniteddreams.com" },
    update: {
      name: "CA Rajesh Varma, FCA",
    },
    create: {
      name: "CA Rajesh Varma, FCA",
      email: "instructor1@igniteddreams.com",
      phone: "+91 98765 11111",
      passwordHash: instructorPasswordHash,
      role: Role.INSTRUCTOR,
      status: UserStatus.ACTIVE,
      instructorProfile: {
        create: {
          employeeId: "INS-1001",
          specialization: "Chief Faculty — Advanced Corporate Accounting & Taxation",
          bio: "Fellow Chartered Accountant (FCA) with 15+ years of practical corporate audit, Direct Tax advisory, and CA Inter/Final mentorship.",
        },
      },
    },
  });

  await prisma.instructorProfile.upsert({
    where: { userId: instructor1.id },
    update: {
      specialization: "Chief Faculty — Advanced Corporate Accounting & Taxation",
      bio: "Fellow Chartered Accountant (FCA) with 15+ years of practical corporate audit, Direct Tax advisory, and CA Inter/Final mentorship.",
    },
    create: {
      userId: instructor1.id,
      employeeId: "INS-1001",
      specialization: "Chief Faculty — Advanced Corporate Accounting & Taxation",
      bio: "Fellow Chartered Accountant (FCA) with 15+ years of practical corporate audit, Direct Tax advisory, and CA Inter/Final mentorship.",
    },
  });

  const instructor2 = await prisma.user.upsert({
    where: { email: "instructor2@igniteddreams.com" },
    update: {
      name: "CMA Sneha Nambiar, ACMA, ACCA",
    },
    create: {
      name: "CMA Sneha Nambiar, ACMA, ACCA",
      email: "instructor2@igniteddreams.com",
      phone: "+91 98765 22222",
      passwordHash: instructorPasswordHash,
      role: Role.INSTRUCTOR,
      status: UserStatus.ACTIVE,
      instructorProfile: {
        create: {
          employeeId: "INS-1002",
          specialization: "Strategic Cost Management & Financial Reporting (IFRS)",
          bio: "Senior Cost & Management Accountant and ACCA specialist mentoring corporate finance executives and candidates.",
        },
      },
    },
  });

  await prisma.instructorProfile.upsert({
    where: { userId: instructor2.id },
    update: {
      specialization: "Strategic Cost Management & Financial Reporting (IFRS)",
      bio: "Senior Cost & Management Accountant and ACCA specialist mentoring corporate finance executives and candidates.",
    },
    create: {
      userId: instructor2.id,
      employeeId: "INS-1002",
      specialization: "Strategic Cost Management & Financial Reporting (IFRS)",
      bio: "Senior Cost & Management Accountant and ACCA specialist mentoring corporate finance executives and candidates.",
    },
  });

  // 4. Create Students / Trainees
  const student1 = await prisma.user.upsert({
    where: { email: "rahul.sharma@example.com" },
    update: { name: "Rahul Sharma" },
    create: {
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      phone: "+91 91234 56789",
      passwordHash: studentPasswordHash,
      role: Role.STUDENT,
      status: UserStatus.ACTIVE,
      studentProfile: {
        create: {
          registrationNumber: "SKILL-2026-101",
        },
      },
    },
  });

  await prisma.studentProfile.upsert({
    where: { userId: student1.id },
    update: { registrationNumber: "SKILL-2026-101" },
    create: { userId: student1.id, registrationNumber: "SKILL-2026-101" },
  });

  const student2 = await prisma.user.upsert({
    where: { email: "priya.patel@example.com" },
    update: { name: "Priya Patel" },
    create: {
      name: "Priya Patel",
      email: "priya.patel@example.com",
      phone: "+91 92345 67890",
      passwordHash: studentPasswordHash,
      role: Role.STUDENT,
      status: UserStatus.ACTIVE,
      studentProfile: {
        create: {
          registrationNumber: "SKILL-2026-102",
        },
      },
    },
  });

  await prisma.studentProfile.upsert({
    where: { userId: student2.id },
    update: { registrationNumber: "SKILL-2026-102" },
    create: { userId: student2.id, registrationNumber: "SKILL-2026-102" },
  });

  const student3 = await prisma.user.upsert({
    where: { email: "rohan.verma@example.com" },
    update: { name: "Rohan Verma" },
    create: {
      name: "Rohan Verma",
      email: "rohan.verma@example.com",
      phone: "+91 93456 78901",
      passwordHash: studentPasswordHash,
      role: Role.STUDENT,
      status: UserStatus.ACTIVE,
      studentProfile: {
        create: {
          registrationNumber: "SKILL-2026-103",
        },
      },
    },
  });

  await prisma.studentProfile.upsert({
    where: { userId: student3.id },
    update: { registrationNumber: "SKILL-2026-103" },
    create: { userId: student3.id, registrationNumber: "SKILL-2026-103" },
  });

  // 5. Create Skill Courses (CA, CMA, ACCA, Taxation)
  const courseCA = await prisma.course.upsert({
    where: { slug: "ca-intermediate-group-1" },
    update: {
      title: "CA Intermediate — Advanced Accounting & Direct Taxation",
      description: "Comprehensive exam and practical oriented ground preparation covering Accounting Standards (AS), Company Accounts, Profit/Loss Statements, and Income Tax Provisions with hands-on computation labs.",
      durationHours: 140,
    },
    create: {
      title: "CA Intermediate — Advanced Accounting & Direct Taxation",
      slug: "ca-intermediate-group-1",
      code: "CA-INT-G1",
      description: "Comprehensive exam and practical oriented ground preparation covering Accounting Standards (AS), Company Accounts, Profit/Loss Statements, and Income Tax Provisions with hands-on computation labs.",
      status: CourseStatus.PUBLISHED,
      durationHours: 140,
    },
  });

  const courseGST = await prisma.course.upsert({
    where: { slug: "practical-gst-corporate-filing" },
    update: {
      title: "Practical GST, TDS & Corporate Return Filing Mastery",
      description: "Hands-on corporate skill training covering GST portal filing (GSTR-1, 3B, 9C), TDS reconciliation with 26AS/AIS, and real-time corporate tax compliance.",
      durationHours: 65,
    },
    create: {
      title: "Practical GST, TDS & Corporate Return Filing Mastery",
      slug: "practical-gst-corporate-filing",
      code: "TAX-GST-201",
      description: "Hands-on corporate skill training covering GST portal filing (GSTR-1, 3B, 9C), TDS reconciliation with 26AS/AIS, and real-time corporate tax compliance.",
      status: CourseStatus.PUBLISHED,
      durationHours: 65,
    },
  });

  const courseFinMod = await prisma.course.upsert({
    where: { slug: "financial-modeling-valuation" },
    update: {
      title: "Financial Modeling, DCF Valuation & Advanced Excel Analytics",
      description: "Industry-grade skill program mastering financial statements forecasting, discounted cash flow (DCF) valuation models, LBO fundamentals, and executive dashboards.",
      durationHours: 50,
    },
    create: {
      title: "Financial Modeling, DCF Valuation & Advanced Excel Analytics",
      slug: "financial-modeling-valuation",
      code: "FIN-MOD-301",
      description: "Industry-grade skill program mastering financial statements forecasting, discounted cash flow (DCF) valuation models, LBO fundamentals, and executive dashboards.",
      status: CourseStatus.PUBLISHED,
      durationHours: 50,
    },
  });

  const courseACCA = await prisma.course.upsert({
    where: { slug: "acca-strategic-business-reporting" },
    update: {
      title: "ACCA Strategic Business Reporting (SBR & IFRS Standards)",
      description: "Professional global qualification module mastering international financial reporting standards (IFRS), group accounting consolidation, and ethical financial governance.",
      durationHours: 90,
    },
    create: {
      title: "ACCA Strategic Business Reporting (SBR & IFRS Standards)",
      slug: "acca-strategic-business-reporting",
      code: "ACCA-SBR-401",
      description: "Professional global qualification module mastering international financial reporting standards (IFRS), group accounting consolidation, and ethical financial governance.",
      status: CourseStatus.PUBLISHED,
      durationHours: 90,
    },
  });

  // 6. Create Batches
  const batchAlpha = await prisma.batch.upsert({
    where: { code: "CA-INT-2026-ALPHA" },
    update: {
      name: "CA Inter May 2026 - Comprehensive Skill Batch Alpha",
      courseId: courseCA.id,
      instructorId: instructor1.id,
    },
    create: {
      name: "CA Inter May 2026 - Comprehensive Skill Batch Alpha",
      code: "CA-INT-2026-ALPHA",
      courseId: courseCA.id,
      instructorId: instructor1.id,
      startDate: new Date("2026-09-01"),
      endDate: new Date("2026-12-15"),
      status: BatchStatus.ACTIVE,
    },
  });

  const batchBravo = await prisma.batch.upsert({
    where: { code: "TAX-2026-BRAVO" },
    update: {
      name: "Practical GST & Corporate Filing - Weekend Executive Cohort",
      courseId: courseGST.id,
      instructorId: instructor2.id,
    },
    create: {
      name: "Practical GST & Corporate Filing - Weekend Executive Cohort",
      code: "TAX-2026-BRAVO",
      courseId: courseGST.id,
      instructorId: instructor2.id,
      startDate: new Date("2026-09-15"),
      endDate: new Date("2026-11-30"),
      status: BatchStatus.ACTIVE,
    },
  });

  // 7. Enroll Students
  await prisma.enrollment.upsert({
    where: { studentId_batchId: { studentId: student1.id, batchId: batchAlpha.id } },
    update: { courseId: courseCA.id },
    create: {
      studentId: student1.id,
      batchId: batchAlpha.id,
      courseId: courseCA.id,
      status: "ACTIVE",
    },
  });

  await prisma.enrollment.upsert({
    where: { studentId_batchId: { studentId: student2.id, batchId: batchAlpha.id } },
    update: { courseId: courseCA.id },
    create: {
      studentId: student2.id,
      batchId: batchAlpha.id,
      courseId: courseCA.id,
      status: "ACTIVE",
    },
  });

  await prisma.enrollment.upsert({
    where: { studentId_batchId: { studentId: student3.id, batchId: batchBravo.id } },
    update: { courseId: courseGST.id },
    create: {
      studentId: student3.id,
      batchId: batchBravo.id,
      courseId: courseGST.id,
      status: "ACTIVE",
    },
  });

  // 8. Create Class Sessions & Lifecycle Recordings
  const now = new Date();

  // A) Currently LIVE class
  const liveClass = await prisma.classSession.upsert({
    where: { roomName: "ca_live_capital_gains" },
    update: {
      title: "Direct Tax: Capital Gains & Section 54 Exemption Computations",
      description: "Interactive live calculation of short & long-term capital gains, indexation benefits, and case law computations.",
      courseId: courseCA.id,
      batchId: batchAlpha.id,
      instructorId: instructor1.id,
    },
    create: {
      title: "Direct Tax: Capital Gains & Section 54 Exemption Computations",
      description: "Interactive live calculation of short & long-term capital gains, indexation benefits, and case law computations.",
      courseId: courseCA.id,
      batchId: batchAlpha.id,
      instructorId: instructor1.id,
      startTime: new Date(now.getTime() - 25 * 60 * 1000), // Started 25 mins ago
      endTime: new Date(now.getTime() + 65 * 60 * 1000), // Ends in 65 mins
      timezone: "Asia/Kolkata",
      roomName: "ca_live_capital_gains",
      status: ClassStatus.LIVE,
      recordingEnabled: true,
      recordings: {
        create: {
          provider: "LIVEKIT_EGRESS",
          storageProvider: "CLOUDFLARE_R2",
          storageKey: `recordings/${courseCA.id}/${batchAlpha.id}/live/capital-gains-live.mp4`,
          fileName: "CA_Direct_Tax_Capital_Gains_Live.mp4",
          status: RecordingStatus.RECORDING,
          durationSeconds: 1500,
        },
      },
    },
  });

  // B) Scheduled upcoming class today
  await prisma.classSession.upsert({
    where: { roomName: "gst_sched_itc_reconciliation" },
    update: {
      title: "GST Compliance: GSTR-2B Input Tax Credit Matching & 26AS Audit",
      description: "Live portal demonstration on matching supplier invoices, resolving ITC discrepancies, and drafting tax audit memos.",
      courseId: courseGST.id,
      batchId: batchBravo.id,
      instructorId: instructor2.id,
    },
    create: {
      title: "GST Compliance: GSTR-2B Input Tax Credit Matching & 26AS Audit",
      description: "Live portal demonstration on matching supplier invoices, resolving ITC discrepancies, and drafting tax audit memos.",
      courseId: courseGST.id,
      batchId: batchBravo.id,
      instructorId: instructor2.id,
      startTime: new Date(now.getTime() + 4 * 60 * 60 * 1000), // in 4 hours
      endTime: new Date(now.getTime() + 6 * 60 * 60 * 1000),
      timezone: "Asia/Kolkata",
      roomName: "gst_sched_itc_reconciliation",
      status: ClassStatus.SCHEDULED,
      recordingEnabled: true,
    },
  });

  // C) Completed class 2 days ago (READY recording - 5 days remaining before 7-day expiration)
  await prisma.classSession.upsert({
    where: { roomName: "ca_comp_2days_as3_cashflow" },
    update: {
      title: "Corporate Accounting: Cash Flow Statement (AS-3) Practical Modeling",
      description: "Operating, investing, and financing cash flows reconciliation with balance sheet notes under Companies Act 2013.",
      courseId: courseCA.id,
      batchId: batchAlpha.id,
      instructorId: instructor1.id,
    },
    create: {
      title: "Corporate Accounting: Cash Flow Statement (AS-3) Practical Modeling",
      description: "Operating, investing, and financing cash flows reconciliation with balance sheet notes under Companies Act 2013.",
      courseId: courseCA.id,
      batchId: batchAlpha.id,
      instructorId: instructor1.id,
      startTime: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() - (2 * 24 * 60 - 90) * 60 * 1000),
      timezone: "Asia/Kolkata",
      roomName: "ca_comp_2days_as3_cashflow",
      status: ClassStatus.COMPLETED,
      recordingEnabled: true,
      recordings: {
        create: {
          provider: "LIVEKIT_EGRESS",
          storageProvider: "CLOUDFLARE_R2",
          storageKey: `recordings/${courseCA.id}/${batchAlpha.id}/comp2/as3-cash-flow.mp4`,
          fileName: "CA_Cash_Flow_Statement_AS3.mp4",
          fileSize: BigInt(348120000), // ~332 MB
          durationSeconds: 5240,
          status: RecordingStatus.READY,
          availableAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
          // Available + 7 days
          expiresAt: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
          playbackEnabled: true,
          downloadEnabled: true,
        },
      },
      attendances: {
        create: [
          {
            studentId: student1.id,
            joinedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
            leftAt: new Date(now.getTime() - (2 * 24 * 60 - 90) * 60 * 1000),
            durationSeconds: 5400,
            status: AttendanceStatus.PRESENT,
          },
          {
            studentId: student2.id,
            joinedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
            leftAt: new Date(now.getTime() - (2 * 24 * 60 - 85) * 60 * 1000),
            durationSeconds: 5100,
            status: AttendanceStatus.PRESENT,
          },
        ],
      },
    },
  });

  // D) Completed class 6 days ago (EXPIRING SOON - less than 24 hours left before deletion!)
  await prisma.classSession.upsert({
    where: { roomName: "cma_comp_6days_cvp_analysis" },
    update: {
      title: "Cost Management: Break-Even & Marginal Costing Decision Lab",
      description: "Marginal revenue, limiting factor analysis, make-or-buy decisions, and profitability optimization models.",
      courseId: courseCA.id,
      batchId: batchAlpha.id,
      instructorId: instructor2.id,
    },
    create: {
      title: "Cost Management: Break-Even & Marginal Costing Decision Lab",
      description: "Marginal revenue, limiting factor analysis, make-or-buy decisions, and profitability optimization models.",
      courseId: courseCA.id,
      batchId: batchAlpha.id,
      instructorId: instructor2.id,
      startTime: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() - (6 * 24 * 60 - 80) * 60 * 1000),
      timezone: "Asia/Kolkata",
      roomName: "cma_comp_6days_cvp_analysis",
      status: ClassStatus.COMPLETED,
      recordingEnabled: true,
      recordings: {
        create: {
          provider: "LIVEKIT_EGRESS",
          storageProvider: "CLOUDFLARE_R2",
          storageKey: `recordings/${courseCA.id}/${batchAlpha.id}/comp6/marginal-costing.mp4`,
          fileName: "CMA_Marginal_Costing_Decision_Lab.mp4",
          fileSize: BigInt(295000000), // ~281 MB
          durationSeconds: 4800,
          status: RecordingStatus.EXPIRING_SOON,
          availableAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
          // Expires in ~18 hours!
          expiresAt: new Date(now.getTime() + 18 * 60 * 60 * 1000),
          playbackEnabled: true,
          downloadEnabled: true,
        },
      },
      attendances: {
        create: [
          {
            studentId: student1.id,
            joinedAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
            leftAt: new Date(now.getTime() - (6 * 24 * 60 - 80) * 60 * 1000),
            durationSeconds: 4800,
            status: AttendanceStatus.PRESENT,
          },
        ],
      },
    },
  });

  // E) Completed class 9 days ago (EXPIRED & DELETED - R2 object cleaned up, playback disabled)
  await prisma.classSession.upsert({
    where: { roomName: "ca_comp_9days_depreciation_sched2" },
    update: {
      title: "Depreciation Accounting under Companies Act 2013 & Schedule II",
      description: "Straight-line vs WDV methods, component-based accounting, and deferred tax impact under AS-22.",
      courseId: courseCA.id,
      batchId: batchAlpha.id,
      instructorId: instructor1.id,
    },
    create: {
      title: "Depreciation Accounting under Companies Act 2013 & Schedule II",
      description: "Straight-line vs WDV methods, component-based accounting, and deferred tax impact under AS-22.",
      courseId: courseCA.id,
      batchId: batchAlpha.id,
      instructorId: instructor1.id,
      startTime: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() - (9 * 24 * 60 - 75) * 60 * 1000),
      timezone: "Asia/Kolkata",
      roomName: "ca_comp_9days_depreciation_sched2",
      status: ClassStatus.COMPLETED,
      recordingEnabled: true,
      recordings: {
        create: {
          provider: "LIVEKIT_EGRESS",
          storageProvider: "CLOUDFLARE_R2",
          storageKey: `recordings/${courseCA.id}/${batchAlpha.id}/comp9/depreciation.mp4`,
          fileName: "CA_Depreciation_Accounting_Schedule2.mp4",
          fileSize: BigInt(260000000),
          durationSeconds: 4500,
          status: RecordingStatus.DELETED,
          availableAt: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000),
          expiresAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
          deletedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
          playbackEnabled: false,
          downloadEnabled: false,
        },
      },
    },
  });

  // 9. Initial Notifications
  await prisma.notification.create({
    data: {
      userId: student1.id,
      type: "CLASS_STARTING",
      title: "🔴 Masterclass LIVE: Direct Tax & Capital Gains",
      message: "CA Rajesh Varma has started the live lecture. Join the virtual classroom now.",
      link: `/classroom/${liveClass.id}`,
    },
  });

  await prisma.notification.create({
    data: {
      userId: student1.id,
      type: "RECORDING_EXPIRING",
      title: "⚠️ Recording Expires Within 24 Hours!",
      message: "The recording for 'Cost Management: Break-Even & Marginal Costing' will be deleted in 18 hours. Please review or download it now if needed.",
      link: "/student/recordings",
    },
  });

  console.log("✅ Seed completed successfully with realistic CA & Skill Academy data!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
