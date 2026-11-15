/*
  Project data. Edit this file to change the project cards and detail windows.

  Fields
    id               unique slug
    category         "fire", "pa", "data" or "design" (the filter buttons use the first value)
    categories       optional list when a project belongs to several filters
    title            card heading
    location         optional, shown under the title when filled in
    role             optional, shown in the detail window
    subtitle         system / project type and period
    status           "completed" or "in-progress" (badge on the card)
    images           list of images: local SVG now, replace with real photos when ready
    systems          tags (the card shows the first four)
    scope            what the project covers
    responsibilities list of your tasks (shown as bullets)
*/
window.PORTFOLIO_PROJECTS = [
  {
    id: "golden-gate",
    category: "fire",
    categories: ["fire"],
    title: "Golden Gate",
    role: "Technical and Shop Drawing Engineer",
    subtitle: "Fire Alarm System | Sep 2025 - Present | System integrator side",
    status: "in-progress",
    images: [
      { src: "assets/img/projects/fire-alarm.svg", alt: "Illustration of a fire alarm floor plan" }
    ],
    systems: ["Fire Alarm", "Shop Drawings", "Device Layouts", "Coordination"],
    scope: "Fire alarm shop drawings including device layouts, routing and system coordination, prepared from the system integrator side.",
    responsibilities: [
      "Fire alarm shop drawings with device layouts",
      "Cable and system routing",
      "System coordination with the project team"
    ]
  },
  {
    id: "movenpick-hotel",
    category: "fire",
    categories: ["fire", "pa"],
    title: "Movenpick Hotel",
    subtitle: "Fire Alarm & Public Address Interface | Mar 2026 - Present",
    status: "in-progress",
    images: [
      { src: "assets/img/projects/facp-pa-interface.svg", alt: "Illustration of a fire alarm panel to public address interface" }
    ],
    systems: ["FACP", "Public Address", "System Interface", "Engineering"],
    scope: "Interface between the public address system and the fire alarm control panel (FACP), plus disable-system works, coordinated with a major Arab contractor.",
    responsibilities: [
      "Interface between the public address system and the FACP",
      "Disable-system works",
      "Coordination with a major Arab contractor"
    ]
  },
  {
    id: "helio-square",
    category: "pa",
    categories: ["pa"],
    title: "Helio Square",
    role: "Technical Office Engineer, LC Zone",
    subtitle: "Public Address System | Dec 2025 - Apr 2026",
    status: "completed",
    images: [
      { src: "assets/img/projects/pa-zones.svg", alt: "Illustration of public address speaker zoning" }
    ],
    systems: ["Public Address", "Speaker Layouts", "Zoning", "Cable Routing"],
    scope: "Public address shop drawings including speaker layouts, zoning, cable routing and system coordination.",
    responsibilities: [
      "Speaker layouts",
      "Zoning",
      "Cable routing",
      "System coordination"
    ]
  },
  {
    id: "al-mazraa",
    category: "data",
    categories: ["data", "pa"],
    title: "Al-Mazraa",
    subtitle: "ELV Systems | May 2026 - Present",
    status: "in-progress",
    images: [
      { src: "assets/img/projects/elv-systems.svg", alt: "Illustration of ELV systems connected to a rack" }
    ],
    systems: ["Fiber Optic", "Data Networking", "Public Address & Sound", "CCTV"],
    scope: "Shop drawings for fiber optic, data networking, public address and sound, and CCTV, with layouts, routing and system coordination.",
    responsibilities: [
      "Shop drawings for fiber optic, data networking, public address and sound, and CCTV",
      "Layouts and routing",
      "System coordination"
    ]
  },
  {
    id: "r5",
    category: "data",
    categories: ["data"],
    title: "R5",
    subtitle: "Data System | May 2026 - Present",
    status: "in-progress",
    images: [
      { src: "assets/img/projects/data-riser.svg", alt: "Illustration of a data network riser diagram" }
    ],
    systems: ["Data Network", "Network Switches", "Fiber", "Quantity Takeoff"],
    scope: "Quantity takeoff, riser diagram and technical support for the contractor on the data system.",
    responsibilities: [
      "Quantity takeoff",
      "Riser diagram",
      "Technical support for the contractor"
    ]
  },
  {
    id: "arab-bank",
    category: "design",
    categories: ["design", "data"],
    title: "Arab Bank",
    subtitle: "Electrical & Low-Current Systems | Jul 2024 - Sep 2024",
    status: "completed",
    images: [
      { src: "assets/img/projects/elv-systems.svg", alt: "Illustration of ELV systems connected to a rack" }
    ],
    systems: ["Electrical", "Low Current", "Shop Drawings"],
    scope: "Design and shop drawings for electrical and low-current systems.",
    responsibilities: [
      "Design of electrical and low-current systems",
      "Preparation of shop drawings"
    ]
  },
  {
    id: "medical-center",
    category: "design",
    categories: ["design"],
    title: "Medical Center Graduation Project",
    location: "10th of Ramadan Hospital, Zagazig University (group project)",
    role: "Group member, electrical design",
    subtitle: "Electrical MEP Design | Oct 2024 - Jul 2025 | Graded Excellent",
    status: "completed",
    images: [
      { src: "assets/img/projects/electrical-design.svg", alt: "Illustration of an electrical single-line diagram" }
    ],
    systems: ["Electrical MEP", "Nurse Call", "BMS", "Fire Alarm", "CCTV", "Data", "Solar"],
    scope: "Electricity distribution systems in a medical center using smart devices and alternative power sources.",
    responsibilities: [
      "Load estimation, lighting design, small power design, panel schedules and feeding system",
      "BMS, fire alarm, CCTV, data and nurse call systems",
      "Shop drawings for all systems",
      "Solar system integration",
      "Tendering documentation"
    ]
  }
];
