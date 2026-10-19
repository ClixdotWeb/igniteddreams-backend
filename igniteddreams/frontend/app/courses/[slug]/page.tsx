import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  Clock,
  ArrowRight,
  Video,
  Download,
  ShieldCheck,
  CheckCircle2,
  User,
  Users,
  Camera,
  FileCheck,
  Award,
  Sparkles,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const courseDataMap: Record<
    string,
    {
      title: string;
      code: string;
      duration: string;
      category: string;
      fee: string;
      marketFee: string;
      description: string;
      modules: { name: string; hours: string; topics: string }[];
      instructor: { name: string; title: string; experience: string };
      batches: { name: string; time: string; status: string }[];
    }
  > = {
    "transportation-logistics-sap": {
      title: "Transportation & Logistics Management Course with SAP (ERP)",
      code: "ID-TLM-SAP-101",
      duration: "6 Months Intensive (3 Hours/Day, 5 Days/Week)",
      category: "Transportation & Logistics",
      fee: "₹25,000 (Tax Included)",
      marketFee: "₹1,25,000 + GST",
      description:
        "Comprehensive 6-month industry skill training covering multimodal freight, container logistics, port terminal flow, customs clearance, and practical SAP S/4HANA Logistics Execution (VL01N, PGI, transfer orders). Includes English soft skills and viva preparation at running cost.",
      modules: [
        {
          name: "Multimodal Logistics Network, IncoTerms & Freight Forwarding",
          hours: "40 Hours",
          topics: "Multimodal transport acts, Container Freight Stations (CFS), Inland Container Depots (ICD), IncoTerms 2020, and Bill of Lading (B/L) verification.",
        },
        {
          name: "SAP S/4HANA Logistics Execution & Material Management (MM/SD)",
          hours: "60 Hours",
          topics: "Hands-on SAP ERP portal practice: Outbound delivery (VL01N), Transfer Orders, Goods Receipt (MIGO), Goods Issue (MB1A), and inventory reconciliation.",
        },
        {
          name: "Customs Clearing, ICEGATE Portal & EXIM Documentation",
          hours: "35 Hours",
          topics: "Customs Act 1962, ICEGATE portal filing, Shipping Bills, Bills of Entry, bonded warehouses, and Duty Drawback compliance.",
        },
        {
          name: "Professional Business English & Viva Interview Board",
          hours: "25 Hours",
          topics: "Corporate communication modules sourced from leading Indian providers, mock viva interview panels, client freight negotiation, and speech presentations.",
        },
      ],
      instructor: {
        name: "Justin Burnard Dias",
        title: "Project Coordinator & Lead Faculty",
        experience: "16 Years Logistics & Aviation Experience • Corporate Strategy Lead",
      },
      batches: [
        { name: "Cohort Alpha (50 Students - Morning)", time: "09:00 - 12:00 IST (Mon-Fri)", status: "Enrollment Open (Launching Oct 20)" },
        { name: "Cohort Bravo (50 Students - Evening)", time: "18:00 - 21:00 IST (Mon-Fri)", status: "Seats Filling Fast" },
      ],
    },
    "aviation-management-airport-operations": {
      title: "Aviation Management & Airport Ground Operations",
      code: "ID-AVM-201",
      duration: "6 Months Intensive (3 Hours/Day, 5 Days/Week)",
      category: "Aviation Management",
      fee: "₹25,000 (Tax Included)",
      marketFee: "₹1,30,000 + GST",
      description:
        "Career-focused operational training covering airport ground handling, ramp safety, baggage sorting systems, air cargo operations, airline customer service, and ticketing management.",
      modules: [
        {
          name: "Airport Terminal Operations & Passenger Customer Service",
          hours: "40 Hours",
          topics: "Check-in counter management, boarding gate protocols, baggage reconciliation (BRS), and airline reservation systems.",
        },
        {
          name: "Ramp Handling, Marshalling & Apron Safety Envelopes",
          hours: "40 Hours",
          topics: "Ground Support Equipment (GSE), aircraft turnaround coordination, pushback procedures, and FOD prevention.",
        },
        {
          name: "Air Cargo Handling, Unit Load Devices (ULD) & Documentation",
          hours: "45 Hours",
          topics: "Airway Bills (AWB), cargo manifest preparation, dangerous goods acceptance, and customs air cargo clearance.",
        },
        {
          name: "Airline Soft Skills & Professional Viva Board",
          hours: "25 Hours",
          topics: "Aviation phonetic alphabet, crisis communication, passenger dispute handling, and corporate viva board preparation.",
        },
      ],
      instructor: {
        name: "Justin Burnard Dias",
        title: "16 Years Logistics & Aviation Specialist",
        experience: "Travel, Tourism & Aviation Operations Expert",
      },
      batches: [
        { name: "Airport Ground Batch 1 (50 Students)", time: "10:00 - 13:00 IST (Mon-Fri)", status: "Enrollment Open" },
      ],
    },
    "supply-chain-freight-forwarding": {
      title: "Global Supply Chain & Freight Forwarding with ERP",
      code: "ID-SCM-301",
      duration: "6 Months Intensive (3 Hours/Day, 5 Days/Week)",
      category: "Transportation & Logistics",
      fee: "₹25,000 (Tax Included)",
      marketFee: "₹1,20,000 + GST",
      description:
        "End-to-end global supply chain management training integrating shipping line coordination, port terminal operations, EXIM regulations, and warehouse management systems (WMS).",
      modules: [
        {
          name: "International Trade Operations & Shipping Lines",
          hours: "40 Hours",
          topics: "Ocean freight chartering, container leasing, demurrage & detention rules, and transshipment hubs.",
        },
        {
          name: "Warehouse Management Systems (WMS) & Inventory Math",
          hours: "45 Hours",
          topics: "ABC analysis, economic order quantity (EOQ), cross-docking, and RFID pallet scanning.",
        },
        {
          name: "Supply Chain Financials & Trade Finance",
          hours: "35 Hours",
          topics: "Letter of Credit (LC), bank guarantees, export credit insurance (ECGC), and freight invoicing.",
        },
        {
          name: "Corporate English & Weekly Project Presentations",
          hours: "20 Hours",
          topics: "Freight contract negotiation, vendor communications, and weekend project report evaluations.",
        },
      ],
      instructor: {
        name: "Justin Burnard Dias & Trainers",
        title: "Lead Faculty & Specialized Trainers",
        experience: "3PL & Freight Operations Specialist",
      },
      batches: [
        { name: "Supply Chain Cohort A (50 Students)", time: "14:00 - 17:00 IST (Mon-Fri)", status: "Enrollment Open" },
      ],
    },
    "air-cargo-logistics-dgr": {
      title: "Air Cargo Operations, ULD Handling & Dangerous Goods (DGR)",
      code: "ID-CARGO-401",
      duration: "6 Months Intensive (3 Hours/Day, 5 Days/Week)",
      category: "Aviation Management",
      fee: "₹25,000 (Tax Included)",
      marketFee: "₹1,25,000 + GST",
      description:
        "Specialized training for air cargo freight forwarders, pharma cold-chain handlers, and airport cargo terminal supervisors adhering strictly to IATA standards.",
      modules: [
        {
          name: "Air Cargo Logistics Flow & AWB Rating",
          hours: "40 Hours",
          topics: "Chargeable weight calculations, volume weight ratios, Master & House Air Waybills.",
        },
        {
          name: "IATA Dangerous Goods Regulations (DGR) Handling",
          hours: "45 Hours",
          topics: "9 classes of dangerous goods, packaging codes, hazard labels, and shipper's declaration verification.",
        },
        {
          name: "Temperature-Controlled Pharma & Perishables Cargo",
          hours: "35 Hours",
          topics: "Cold-chain air freight, active/passive cooling containers, and pharma time-sensitive handling.",
        },
        {
          name: "Viva Examination Preparation & Interactive Viva Board",
          hours: "20 Hours",
          topics: "IATA compliance scenarios, emergency response procedures, and viva interviews.",
        },
      ],
      instructor: {
        name: "Justin Burnard Dias",
        title: "Aviation Ground & Cargo Lead",
        experience: "16 Years Industry Experience",
      },
      batches: [
        { name: "Air Cargo Batch 1 (50 Students)", time: "18:00 - 21:00 IST (Mon-Fri)", status: "Enrollment Open" },
      ],
    },
    "fmcg-production-supply-chain": {
      title: "FMCG Micro-Manufacturing & Supply Chain Distribution",
      code: "ID-FMCG-501",
      duration: "6 Months Intensive (3 Hours/Day, 5 Days/Week)",
      category: "Integrated Projects",
      fee: "₹25,000 (Tax Included)",
      marketFee: "₹1,15,000 + GST",
      description:
        "Master the creation and operations of self-dependent micro-manufacturing units (toffees, chocolates, confectionery, and FMCG foods) paired with direct cooperative distribution and supply chain logistics.",
      modules: [
        {
          name: "Confectionery & FMCG Production Technology",
          hours: "45 Hours",
          topics: "Machinery sourcing, batch recipe standardization, food safety, and hygienic packaging.",
        },
        {
          name: "FSSAI, GST & Regulatory Setup for Micro-Units",
          hours: "30 Hours",
          topics: "Food licensing, legal weights & measures, Udyam MSME registration, and compliance filings.",
        },
        {
          name: "Co-operative Logistics, Collection & Retail Linkage",
          hours: "40 Hours",
          topics: "Transport scheduling, 10%–20% operational sustainability model, and supermarket distribution channels.",
        },
        {
          name: "Entrepreneurship Viva & Weekly Project Submissions",
          hours: "25 Hours",
          topics: "Unit cost calculation, break-even analysis, and weekly business progress presentations.",
        },
      ],
      instructor: {
        name: "Justin Burnard Dias",
        title: "Project Coordinator • ID Integrated",
        experience: "16 Years Logistics & 4 Years Business Strategy Design",
      },
      batches: [
        { name: "FMCG Entrepreneur Cohort (50 Students)", time: "09:00 - 12:00 IST (Mon-Fri)", status: "Enrollment Open" },
      ],
    },
    "business-operations-management": {
      title: "Executive Business Operations & Corporate Administration",
      code: "ID-BOM-601",
      duration: "6 Months Intensive (3 Hours/Day, 5 Days/Week)",
      category: "Business & Management",
      fee: "₹25,000 (Tax Included)",
      marketFee: "₹1,20,000 + GST",
      description:
        "Comprehensive training for corporate administration readiness covering enterprise ERP workflows, procurement administration, business communication, and multinational client service protocols.",
      modules: [
        {
          name: "Enterprise Business Operations & ERP Systems",
          hours: "40 Hours",
          topics: "Purchase orders (PO), vendor management, invoicing reconciliations, and digital workflow systems.",
        },
        {
          name: "Corporate Communication & Executive Administration",
          hours: "40 Hours",
          topics: "Business writing, board minutes, multinational client handling, and conflict resolution.",
        },
        {
          name: "Supply Chain Financial Accounting & Budgeting",
          hours: "35 Hours",
          topics: "Cost center analysis, operational budgets, GST input reconciliations, and expense management.",
        },
        {
          name: "Interactive English Viva & Presentation Board",
          hours: "25 Hours",
          topics: "Weekly speech and project submissions, executive body language, and formal viva exams.",
        },
      ],
      instructor: {
        name: "Justin Burnard Dias & Faculty",
        title: "Corporate Strategy Team",
        experience: "Executive Strategy & Corporate Operations",
      },
      batches: [
        { name: "Corporate Admin Cohort (50 Students)", time: "18:00 - 21:00 IST (Mon-Fri)", status: "Enrollment Open" },
      ],
    },
  };

  const defaultCourse = courseDataMap["transportation-logistics-sap"];
  const courseData = courseDataMap[slug] || defaultCourse;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Header - Clean Light Mode */}
      <section className="py-12 sm:py-16 bg-[#FBFBFA] border-b border-slate-200 relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-50/50 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-2">
              <Badge variant="yellow" size="sm" className="bg-[#F5C400] text-[#0e271d] font-bold">
                {courseData.category}
              </Badge>
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                {courseData.code}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-heading leading-tight text-[#0e271d]">
              {courseData.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {courseData.description}
            </p>

            {/* Academic Highlights Banner */}
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200/70 flex items-center justify-center text-amber-700 shrink-0 shadow-xs">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Cohort Training Standard</span>
                  <span className="text-sm sm:text-base font-black text-[#0e271d]">50 Cadets Strict Limit • 1 Mentor + 2 Trainers</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Live Classroom + 7-Day Replay
                </span>
              </div>
            </div>

            {/* Metadata Chips */}
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-700 font-semibold pt-1">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{courseData.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-600 shrink-0" />
                <span>1 Mentor + 2 Trainers per 50 Students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Download className="w-4 h-4 text-amber-600 shrink-0" />
                <span>7-Day Replay + 2-Year Vault</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content Grid */}
      <section className="py-16 bg-slate-50 flex-1">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Content: Syllabus (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 font-heading mb-4">
                  Curriculum & Hands-on Practical Modules
                </h2>
                <div className="space-y-4">
                  {courseData.modules.map((m, idx) => (
                    <Card key={idx} padding="md" variant="default" className="border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-bold text-slate-900 font-heading">
                          Module {idx + 1}: {m.name}
                        </h3>
                        <span className="text-xs font-mono font-bold text-amber-800 px-2 py-0.5 rounded bg-amber-100">
                          {m.hours}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{m.topics}</p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Classroom Discipline & Monitoring Policy */}
              <Card variant="accent" padding="md" className="border border-amber-300 bg-amber-50/60">
                <h3 className="text-base font-bold text-amber-950 font-heading mb-2 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-amber-700" />
                  Live Virtual Classroom & Monitoring Guidelines
                </h3>
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                  <li>
                    <strong>Hosted Directly on Website:</strong> Students and mentors meet for daily live sessions directly inside <code>www.igniteddreams.com</code>.
                  </li>
                  <li>
                    <strong>Daily 3-Hour Rhythm:</strong> 2 Hours Live Instruction + 1 Hour Dedicated Doubt Clearing (5 days a week).
                  </li>
                  <li>
                    <strong>Strict Proctoring:</strong> Both students and trainers are continuously monitored via webcams during class hours to ensure academic integrity.
                  </li>
                  <li>
                    <strong>7-Day Revision + 2-Year Vault:</strong> Sessions are recorded and available for 7 days on the student dashboard. On the 7th day, they are downloaded and securely vaulted on ID servers for 2 years.
                  </li>
                  <li>
                    <strong>Weekly Weekend Projects:</strong> Students submit a project every weekend (written report or speech presentation).
                  </li>
                  <li>
                    <strong>Final Exit Examinations:</strong> Online written exam for SAP ERP; VIVA mode (Oral Examination) for Logistics & English soft-skills.
                  </li>
                </ul>
              </Card>
            </div>

            {/* Right Sidebar: Batches & Online Fee Payment (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              <Card variant="default" padding="lg" className="border-2 border-aviation-border shadow-md bg-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    Batch Allocation
                  </span>
                  <span className="text-xs font-bold text-emerald-700">50 Seats Strict Limit</span>
                </div>

                <div className="space-y-3 mb-6">
                  {courseData.batches.map((b, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-sm text-slate-900">{b.name}</div>
                      <div className="text-xs font-mono text-slate-500 mt-1">{b.time}</div>
                      <Badge variant="yellow" size="sm" className="mt-2">
                        {b.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                {/* Faculty Card - Clean Light Mode */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#F5C400] text-[#0e271d] font-black flex items-center justify-center text-sm shrink-0 shadow-xs border border-amber-300">
                    ID
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{courseData.instructor.name}</div>
                    <div className="text-[11px] font-semibold text-amber-800">{courseData.instructor.title}</div>
                    <div className="text-[10px] text-slate-500">{courseData.instructor.experience}</div>
                  </div>
                </div>

                {/* Direct Enrollment & Check-In Button */}
                <div className="space-y-3">
                  <Link href={`/checkout?course=${slug}`} className="block">
                    <Button
                      variant="primary"
                      className="w-full font-bold shadow-md text-sm py-3 bg-[#F5C400] hover:bg-[#e0b400] text-[#0e271d]"
                      size="lg"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Enroll & Check In Online
                    </Button>
                  </Link>

                  <div className="text-center text-[11px] text-slate-500 font-medium">
                    Instant Admission Pass • Live Virtual Classroom • 2-Year Vault
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
