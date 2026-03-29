import { useState, useEffect } from "react";

const TEAL    = "#4aaba7";
const CREAM   = "#F7F3EC";
const INK     = "#1A1209";
const RULE    = "#E0D8CC";
const COMMITTEE_STYLES = {
  "Executive Committee":      { bg: TEAL,      text: "#fff" },
  "Public Safety":            { bg: "#1A3A5C", text: "#fff" },
  "Environmental Resources":  { bg: "#2D5A3D", text: "#fff" },
  "Regular Meeting":          { bg: "#2C5F8A", text: "#fff" },
  "Committee of the Whole":   { bg: "#1A4060", text: "#fff" },
  "Special Meeting":          { bg: "#5A3A1A", text: "#fff" },
  "Board of Trustees":        { bg: "#1A4A7A", text: "#fff" },
  "Finance & Human Resources":{ bg: "#2A3A5A", text: "#fff" },
  "Public Works":             { bg: "#3A3A2A", text: "#fff" },
  "Plan Commission":          { bg: "#2A4A3A", text: "#fff" },
  "Parks":                    { bg: "#1A5C2A", text: "#fff" },
  "Community Life & Public Safety": { bg: "#5A2A1A", text: "#fff" },
  "Public Health & Safety":   { bg: "#7B2D2D", text: "#fff" },
  "Economic Development":     { bg: "#4A3580", text: "#fff" },
  "Parks & Recreation":       { bg: "#1A5C3A", text: "#fff" },
  "Board of Public Works":    { bg: "#3A4A5C", text: "#fff" },
  "City Council":             { bg: "#5C3A1A", text: "#fff" },
  "Finance":                  { bg: "#2D4A2D", text: "#fff" },
  "Infrastructure":           { bg: "#4A4A1A", text: "#fff" },
  "Plan Commission":          { bg: "#1A4A5C", text: "#fff" },
};

const SOURCE_CONFIG = {
  marathon: {
    label:    "Marathon County",
    short:    "COUNTY",
    accent:   TEAL,
    channel:  "https://www.youtube.com/@marathoncountyboardmeetings",
    docHost:  "marathoncounty.gov",
    avatar:   "data:image/jpeg;base64,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",
  },
  wausau: {
    label:    "City of Wausau",
    short:    "CITY",
    accent:   "#C0392B",
    channel:  "https://www.youtube.com/@CityofWausauMeetings",
    docHost:  "wausauwi.portal.civicclerk.com",
    avatar:   "data:image/jpeg;base64,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",
  },
  weston: {
    label:    "Village of Weston",
    short:    "WESTON",
    accent:   "#1A4A7A",
    channel:  "https://www.youtube.com/@WestonWI",
    docHost:  "westonwi.gov",
    avatar:   "data:image/jpeg;base64,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",
  },
  school_board: {
    label:    "Wausau School Board",
    short:    "SCHOOL",
    accent:   "#2C5F8A",
    channel:  "https://www.youtube.com/@wausauschoolboard",
    docHost:  "meetings.boardbook.org",
    avatar:   "data:image/jpeg;base64,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",
  },
};

const MEETINGS = [
  {
    id: "rQcjCEY36e4", source: "wausau",
    title: "Wausau City Council Meeting",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "City Council", duration: "~1h",
    url: "https://www.youtube.com/watch?v=rQcjCEY36e4",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/1976/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau City Council approved a $10 million development agreement for 11 Scott Street (Waterside Place) by a 6-3 vote, converting a vacant 100,000 sq ft building into 52 mid-priced apartments. The council also recognized city public works crews for their response to a record-breaking 30.9-inch snowstorm and presented a sustainability award to Kolbe and Kolbe Millwork for their solar energy initiatives.",
    agenda: [
      { time:"0:00", item:"Call to order and Pledge of Allegiance" },
      { time:"0:33", item:"Roll call" },
      { time:"0:48", item:"Proclamation - Sarah Rafi Day (March 31st)" },
      { time:"4:15", item:"Mayor's Citation - Public Works snow response recognition" },
      { time:"10:45", item:"Sustainability Award presentation to Kolbe and Kolbe Millwork" },
      { time:"17:30", item:"Approval of March 10, 2026 meeting minutes" },
      { time:"18:00", item:"Public comment period" },
      { time:"20:15", item:"Consent agenda" },
      { time:"20:45", item:"11 Scott Street development agreement (moved up)" },
      { time:"35:00", item:"Mayoral appointments confirmation" },
      { time:"36:00", item:"Solid waste and recycling service agreement with Harter's Fox Valley" },
      { time:"37:30", item:"Announcements and adjournment" },
    ],
    discussions: [
      { item:"11 Scott Street Development Agreement (File 25-1011)", body:"The council approved a joint resolution from Economic Development and Infrastructure committees for a development agreement with 11 Scott Street LLC for Waterside Place. The $10+ million project will convert a vacant 100,000 sq ft building into 52 mid-priced apartment units. Alder Rasmussen supported the project noting it returns parking spaces to public use and adds downtown residents. Alder Neil highlighted the project generates $55,000 annually in parking revenue and helps TID 8 reach valuation goals for potential closure in 5 years. Alder Larson dissented, expressing concern about discounting city parking assets during budget cuts. Alder Tyranny questioned the city's obligation to provide 150 parking spaces within 300 yards if the ramp closes. Economic Development Director Randy Feifer explained the agreement reduces parking obligations from 480 to 150 spaces while generating new revenue. Motion passed 6-3." },
      { item:"Public Works Snow Response Recognition", body:"Mayor Denny presented a mayoral citation recognizing DPW plow crews, municipal fleet staff, and support team for their response to a historic 30.9-inch snowfall from March 14-16, 2026. Street Supervisor Kevin Kester accepted the award, praising the mechanics and plow operators. Kester noted four municipal fleet technicians worked 12-hour shifts for continuous 24-hour breakdown support, with two volunteering on Saturday. By Friday, these technicians will have worked 12 straight days without a day off." },
      { item:"Sustainability Award - Kolbe and Kolbe Millwork", body:"Christine Daniels from the Sustainability, Energy and Environment Committee presented the 2026 City of Wausau Sustainability Award to Kolbe and Kolbe Millwork. Representatives Keith Kaning and Mike Thompson accepted, describing their 2,000+ solar panel installation on their 11th Avenue manufacturing facility that became operational in July 2025, generating enough power for approximately 120 homes. They also highlighted LED lighting upgrades, high-energy air compressors, and comprehensive recycling programs for wood, aluminum, glass, vinyl, cardboard, and other materials." },
      { item:"Harter's Fox Valley Solid Waste Agreement (File 92-109)", body:"Council approved a seven-year residential solid waste and recycling service agreement with Harter's Fox Valley Disposal. The mayor noted a previous mix-up regarding whether the term was 7 or 10 years, confirming the agreement is for seven years as Public Health and Safety originally approved. Motion passed 9-0." },
      { item:"Settlement Resolution - David Holes vs City of Wausau (File 26-0307)", body:"Assistant City Attorney Vincent Bonito explained this resolution releases claims related to a 2022 bus accident. Transit Mutual insurance paid the initial claim, then the individual who crashed into the bus filed a personal injury claim. The city filed a counter-claim and third-party complaint against the individual's insurer, who agreed to pay damages. Alder Neil clarified this settlement is separate from any ongoing personal injury claim. No closed session was needed. Motion passed 8-1." },
    ],
    publicComment: "Two speakers addressed the council. Raleigh Lray spoke in support of the 11 Scott Street project, describing it as a green sustainable project repurposing a vacant building with mid-priced apartments. Mark Craig (3246 North 8th Street) also supported the project, noting it is over $10 million with $8.3 million for the residential component of 52 units, stating 'Without your help, it won't happen.'",
    actionItems: [
      "11 Scott Street development agreement approved 6-3 - project to convert vacant building to 52 apartments",
      "March 31st proclaimed as Sarah Rafi Day in Wausau",
      "Seven-year solid waste agreement with Harter's Fox Valley Disposal approved 9-0",
      "Airspace obstruction removal agreements approved for Scofield properties",
      "2026 budget modification approved for Police Department Red Dot Optics purchase using Thompson submachine gun sale proceeds",
      "Solid waste disposal ordinance (Chapter 6.44) repealed and recreated to align with state code",
      "Paid duty time approved for out-of-country police training",
      "Community outreach professional shelter operations duty premium differential approved",
      "Settlement approved for David Holes vs City of Wausau case 8-1",
      "Thomas Street Neighborhood Group meeting announced for Thursday with Chief Jeremy Cop discussing referendum",
    ],
    civicItems: [
      { number:"1", name:"Call to order by the presiding officer.", votes:[], docs:[], children:[] },
      { number:"2", name:"Pledge of Allegiance, and Roll Call and Proclamations.", votes:[], docs:[], children:[
      { number:"", name:"Sarah Ruffi Day (March 31, 2026)", votes:[], docs:[{ name:"Sarah Ruffi Day Proclamation", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6450)" }], children:[] },
    ] },
      { number:"3", name:"Presentations.", votes:[], docs:[], children:[
      { number:"", name:"Mayoral Citation Recognition of Exemplary Service City of Wausau Department of Public Works Plow Crews and Support Team", votes:[], docs:[{ name:"Mayoral Citation Recognition of Exemplary Service City of Wausau Department of Public Works", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6566)" }], children:[] },
      { number:"", name:"Sustainability, Energy, & Environment Committee Award to Kolbe & Kolbe Millwork Co., Inc.", votes:[], docs:[], children:[] },
    ] },
      { number:"4", name:"Consideration of the minutes of the preceding meeting, approval of the minutes if correct, and correction of mistakes if any.", votes:[{ motion:"Approve", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Michael  Martens", "Terry Kilian", "Tom Neal", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Chad Henke"], no:[], abstain:[] }], docs:[], children:[
      { number:"", name:"Regular Common Council Minutes", votes:[], docs:[{ name:"CommonCouncil_Regular_03102026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6481)" }], children:[] },
    ] },
      { number:"5", name:"Reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"6", name:"Comments and suggestions from preregistered citizens.", votes:[], docs:[], children:[] },
      { number:"7", name:"Consent agenda.", votes:[{ motion:"Approve", passed:true, initiator:"Sarah Watson", seconder:"Chad Henke", yes:["Michael  Martens", "Terry Kilian", "Tom Neal", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Chad Henke"], no:[], abstain:[] }], docs:[], children:[
      { number:"", name:"Ordinance from the Parks & Recreation Committee Amending Section 9.20.070 Fires, Fireworks, Firearms, Missiles.", votes:[], docs:[{ name:"Parks&Recreation_Regular_03022026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6441)" }], children:[] },
      { number:"", name:"Resolution from the Finance Committee Approving Renewal of Parking Lot Lease with Colonial Property 4, LLC (Grant and 3rd Streets).", votes:[], docs:[{ name:"Colonial Property 4 LLC Parking Lot Lease 2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6462)" }, { name:"Colonial Property 4 LLC Parking Lot Lease Renewal Request", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6448)" }], children:[] },
    ] },
      { number:"8", name:"Ordinances and resolutions.", votes:[], docs:[], children:[
      { number:"", name:"Confirming Appointments of the Mayor of the City of Wausau to the Plan Commission, Affordable Housing Task Force, and the Business Improvement District Board.", votes:[{ motion:"Approve", passed:true, initiator:"Tom Neal", seconder:"Sarah Watson", yes:["Michael  Martens", "Terry Kilian", "Tom Neal", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Chad Henke"], no:[], abstain:[] }], docs:[{ name:"Owen Jones Citizen Participation Form", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6477)" }, { name:"Hannah Dusso Citizen Participation Form", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6478)" }], children:[] },
      { number:"", name:"Resolution from the Finance Committee Approving Residential Solid Waste and Recycling Service Agreement with Harter’s Fox Valley Disposal LLC.", votes:[{ motion:"Approve", passed:true, initiator:"Tom Neal", seconder:"Sarah Watson", yes:["Michael  Martens", "Terry Kilian", "Tom Neal", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Chad Henke"], no:[], abstain:[] }], docs:[{ name:"Harters Solid Waste Contract - Seven Year Term 2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6459)" }, { name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6460)" }, { name:"PHSC_20250915_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6461)" }, { name:"Finance_Regular_03102026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6496)" }], children:[] },
      { number:"", name:"Resolution from the Finance Committee Approving Airspace Obstruction Removal Agreement with Schofield Ridgeland Legacy LLC – 724 and 732 Ridgeland Avenue, Schofield and Related Budget Modification.", votes:[{ motion:"Approve", passed:true, initiator:"Lou Larson", seconder:"Tom Neal", yes:["Michael  Martens", "Terry Kilian", "Tom Neal", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Chad Henke"], no:[], abstain:[] }], docs:[{ name:"Proposal for Removal of Trees Airspace Obstruction Easement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6432)" }, { name:"Schofield Ridgeland Legacy LLC Obstruction Removal Agreement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6435)" }], children:[] },
      { number:"", name:"Resolution from the Finance Committee Approving Airspace Obstruction Removal Agreement with Zachary Lange – 811 Ridgeland Avenue, Schofield and Related Budget Modification.", votes:[{ motion:"Approve", passed:true, initiator:"Sarah Watson", seconder:"Lisa Rasmussen", yes:["Michael  Martens", "Terry Kilian", "Tom Neal", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Chad Henke"], no:[], abstain:[] }], docs:[{ name:"Zachary Lange Airspace Obstruction Removal Agreement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6437)" }], children:[] },
      { number:"", name:"Resolution from the Finance Committee Adopting 2026 Budget Modification for the Wausau Police Department to Use the Proceeds of the Sale of a Thompson Sub-Machinegun to Purchase Red-Dot Optics.", votes:[{ motion:"Approve", passed:true, initiator:"Sarah Watson", seconder:"Lou Larson", yes:["Michael  Martens", "Terry Kilian", "Tom Neal", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Chad Henke"], no:[], abstain:[] }], docs:[], children:[] },
      { number:"", name:"Joint Resolution from the Economic Development Committee and the Infrastructure & Facilities Committee Approving Development Agreement and Amended and Restated Parking Agreement with 11 Scott Street, LLC for Waterside Place at 11 Scott Street.", votes:[{ motion:"Approve", passed:true, initiator:"Sarah Watson", seconder:"Lisa Rasmussen", yes:["Michael  Martens", "Tom Neal", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Chad Henke"], no:["Terry Kilian", "Becky McElhaney ", "Lou Larson"], abstain:[] }], docs:[{ name:"Wausau - 11 Scott Street - Development Agreement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6457)" }, { name:"11 Scott St Amended and Restated Parking Agreement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6456)" }, { name:"Staff Memo 11 Scott", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6458)" }], children:[] },
    ] },
      { number:"9", name:"Suspend Rule 1(D) Transmission of Committee business to the Council, 6(B) Filing, and 12(A) Referral of resolutions.", votes:[{ motion:"suspend rule 1(D) Transmission of Committee business to the Council, 6(B) Filing, and 12(A) Referral of resolutions", passed:true, initiator:"Lisa Rasmussen", seconder:"Sarah Watson", yes:["Michael  Martens", "Tom Neal", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Lou Larson", "Chad Henke"], no:["Terry Kilian", "Vicki Tierney"], abstain:[] }], docs:[], children:[
      { number:"", name:"Ordinance from the Public Health & Safety Committee Repealing and Recreating Wausau Municipal Code Chapter 6.44 Solid Waste Disposal.", votes:[{ motion:"Approve", passed:true, initiator:"Chad Henke", seconder:"Lisa Rasmussen", yes:["Michael  Martens", "Terry Kilian", "Tom Neal", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Chad Henke"], no:[], abstain:[] }], docs:[{ name:"Wausau Municipal Code Chapter 6.44 Solid Waste Disposal", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6439)" }], children:[] },
      { number:"", name:"Resolution from Common Council Approving Release of All Claims – Property Damage for Settlement of Counterclaim and Third Party Complaint – David Hoelzel v. City of Wausau (Marathon Co. Case No. 25-CV-594).", votes:[{ motion:"Approve", passed:true, initiator:"Tom Neal", seconder:"Sarah Watson", yes:["Michael  Martens", "Terry Kilian", "Tom Neal", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Chad Henke"], no:["Lou Larson"], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6287)" }, { name:"Release of All Claims", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6288)" }, { name:"Summons and Complaint", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6289)" }, { name:"Summons and Third Party Complaint", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6290)" }, { name:"Counterclaim", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6291)" }], children:[] },
      { number:"", name:"Joint Resolution from the Human Resources Committee and the Finance Committee Approving Paid Duty Time for Out of Country Training for a Wausau Police Department Officer.", votes:[{ motion:"Approve", passed:true, initiator:"Terry Kilian", seconder:"Tom Neal", yes:["Michael  Martens", "Terry Kilian", "Tom Neal", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Chad Henke"], no:[], abstain:[] }], docs:[{ name:"Germany Trip", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6498)" }], children:[] },
      { number:"", name:"Joint Resolution from the Human Resources Committee and the Finance Committee Approving Community Outreach Professional Shelter Operations Duty Premium Differential.", votes:[{ motion:"Approve", passed:true, initiator:"Lou Larson", seconder:"Chad Henke", yes:["Michael  Martens", "Terry Kilian", "Tom Neal", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Chad Henke"], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6499)" }, { name:"Shelter Duty Premium Matrix", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6501)" }], children:[] },
    ] },
      { number:"10", name:"Closed Session.", votes:[], docs:[], children:[
      { number:"", name:"Adjourn to Closed Session pursuant to Wisconsin State Statute § 19.85(1)(g) to confer with legal counsel for the governmental body who is rendering oral or written advice concerning strategy to be adopted by the body with respect to litigation in which it is or is likely to become involved, for the purpose of conferring with legal counsel regarding a settlement offer received in Marathon County Case No. 25-CV-594 (David Hoelzel).", votes:[], docs:[], children:[] },
    ] },
      { number:"11", name:"Reconvene into Open Session, if necessary, to take action on Closed Session items.", votes:[], docs:[], children:[] },
      { number:"12", name:"Announcement from Mayor and Alderpersons.", votes:[], docs:[], children:[] },
      { number:"13", name:"Comments and suggestions from citizens present during Public Comment occurring both before and after the business meeting.", votes:[], docs:[], children:[] },
      { number:"14", name:"Adjournment.", votes:[{ motion:"Adjourn", passed:true, initiator:"Vicki Tierney", seconder:"Lou Larson", yes:["Michael  Martens", "Terry Kilian", "Tom Neal", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Chad Henke"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
,
  {
    id: "f1fZvkxedNY", source: "wausau",
    title: "Wausau Board of Public Works Meeting",
    date: "March 17, 2026", shortDate: "MAR 17",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=f1fZvkxedNY",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2259/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Board of Public Works approved contracts and change orders for street construction projects, including awarding a $1.28 million contract to Switlick for the 26th Street\/North 8th Avenue project by a razor-thin margin over the next bidder. All items passed unanimously in this brief meeting.",
    agenda: [
      { time:"0:00", item:"Call to order" },
      { time:"0:08", item:"Consideration of March 10th regular Board of Public Works minutes" },
      { time:"0:24", item:"Open bids for 26th Street construction project \/ North 8th Avenue" },
      { time:"1:38", item:"2025 street construction project A - postponed bid opening" },
      { time:"1:52", item:"2025 street construction project A - Rolph Street, Cherry Street change orders" },
      { time:"4:04", item:"2025 street construction project A - Pay estimate number nine" },
      { time:"4:29", item:"Portland cement concrete license for KSK Incorporated" },
      { time:"4:54", item:"Adjournment" },
    ],
    discussions: [
      { item:"March 10th Board of Public Works minutes", body:"Minutes from the March 10th meeting were considered. A motion was made and seconded, then approved unanimously with all voting 'aye.'" },
      { item:"26th Street \/ North 8th Avenue construction project bids", body:"Seven bids were opened and read aloud. Switlick submitted the lowest bid at $1,279,089.75, barely edging out Hos at $1,280,877.96 - a difference of less than $1,800. Other bids ranged up to $1,686,780.75 from Earth. A motion to approve Switlick's bid was made and seconded, passing unanimously. A board member noted how tight the top two bids were." },
      { item:"2025 street construction project A - Change Order One (Rolph Street, Cherry Street)", body:"Staff presented change order one from Haw Suns Incorporated totaling $14,436.50 for four items: an inside drop on a manhole ($4,856) due to an unrecorded large diameter sanitary service; water main tie-in adjustments ($2,317.50) after finding 6-inch pipe instead of expected 8-inch; miscellaneous storm sewer tie-ins ($5,016) negotiated down from higher bid rates; and geogrid installation ($2,247) near Thomas Jefferson Elementary due to poor soil conditions. Change order two regarding liquidated damages was postponed pending further discussions. Motion to approve passed unanimously." },
      { item:"Pay estimate number nine - Rolph Street, Cherry Street project", body:"Staff recommended approval of pay estimate number nine from Haw Suns Incorporated for $53,511.42 for work completed through the end of the year. Motion to approve passed unanimously." },
      { item:"Portland cement concrete license - KSK Incorporated", body:"Vinnie confirmed he had reviewed the application and everything was in order. A motion to approve the Portland cement concrete license for KSK, Inc. was made and passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "26th Street\/North 8th Avenue construction project awarded to Switlick for $1,279,089.75",
      "Change order one for Rolph Street\/Cherry Street project approved for $14,436.50",
      "Change order two for liquidated damages to return at future meeting pending discussions",
      "Pay estimate nine approved for $53,511.42 to Haw Suns Incorporated",
      "Portland cement concrete license approved for KSK Incorporated",
      "Postponed bid opening for item B to be rescheduled",
    ],
    civicItems: [
      { number:"1", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"March 10, 2026 Regular Board of Public Work Minutes.", votes:[{ motion:"approve", passed:true, initiator:"MaryAnne Groat", seconder:"Eric Lindman", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"BoardofPublicWorks_Regular_MinutesDRAFT_03102026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6451)" }], children:[] },
    ] },
      { number:"2", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Open bids and make recommendation for 2026 Street Construction Project \"B\" - North 8th Avenue.", votes:[{ motion:"award the contract to Switlick & Sons, Inc., in the amount of $1,279,989.75", passed:true, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
      { number:"b", name:"Open bids and make recommendation for 2026 Asphalt Paving Project \"A\".", votes:[{ motion:"approve", passed:false, initiator:"", seconder:"", yes:[], no:[], abstain:[] }], docs:[], children:[] },
      { number:"c", name:"2025 Street Construction Project \"A\" - Randolph Street\/Cherry Street:  Haas Sons, Inc., Change Order #1 and Change Order #2.", votes:[{ motion:"approve Change Order #1 in the amount of $14,436.50", passed:true, initiator:"Eric Lindman", seconder:"Vincent Bonino", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"Change Order 1 Haas", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6443)" }, { name:"Change Order 2 Haas", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6444)" }], children:[] },
      { number:"d", name:"2025 Street Construction Project \"A\" - Randolph Street\/Cherry Street, Haas Sons, Inc.,   Pay Estimate #9.", votes:[{ motion:"approve Pay Estimate #9 in the amount of $535,011.42", passed:true, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"Haas 2025 Proj A Pay Est 9", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6442)" }], children:[] },
      { number:"e", name:"Portland Cement Concrete License:  KSK, Inc.", votes:[{ motion:"approve subject license", passed:true, initiator:"Vincent Bonino", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"KSK Inc PCC", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6392)" }], children:[] },
    ] },
      { number:"3", name:"Adjournment.", votes:[{ motion:"approve", passed:true, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
,
  {
    id: "aUG3K0hxNsU", source: "weston",
    title: "Finance and Human Resources Committee",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Finance & Human Resources", duration: "~1h",
    url: "https://www.youtube.com/watch?v=aUG3K0hxNsU",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_03232026-1898",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Finance and Human Resources Committee debated and ultimately approved a modified employee clothing allowance policy after canceling the Cintas uniform contract. After three failed votes on different amounts, the committee approved $400 for 2026 and $500 annually starting in 2027, plus a washer and dryer purchase. The committee also received a detailed educational presentation on public works operations and budget.",
    agenda: [
      { time:"0:00", item:"Call to order and Pledge of Allegiance" },
      { time:"0:30", item:"Roll call" },
      { time:"0:45", item:"Public comments" },
      { time:"2:30", item:"Approval of minutes from February 16, 2026" },
      { time:"2:55", item:"Acknowledge February financial report" },
      { time:"3:30", item:"Acknowledge T1 and T2 detail reports for February" },
      { time:"4:00", item:"Acknowledge legal details for February" },
      { time:"4:25", item:"Educational presentation: Public works operation and budget" },
      { time:"35:00", item:"Discussion and action on reimbursement for clothing and equipment amendments" },
      { time:"1:05:00", item:"Remarks from staff and committee members" },
      { time:"1:06:30", item:"Future meeting scheduling and adjournment" },
    ],
    discussions: [
      { item:"Public works operation and budget presentation", body:"Public Works Director Michael presented a comprehensive overview of department operations, covering 119.5 centerline miles of road, 114 miles of water main, 103 miles of sanitary sewer, and 70 miles of storm sewer. He noted the 2026 public works budget decreased by $26,000 (1.1%) compared to 2025. Michael highlighted that Weston spends approximately $9,700 less per mile on streets than the average central Wisconsin community. He also discussed the recent major snow event that cost approximately $50,000 and resulted in staff working 16-17 hour shifts. The committee asked questions about disaster relief funding, salt budget, and street lighting standards." },
      { item:"Reimbursement for clothing and equipment allowance amendments", body:"The committee engaged in extensive debate about increasing the employee clothing allowance from $300 to $600 after canceling the Cintas uniform contract. Committee member Stephanie Olsson argued against the full increase, citing fiscal responsibility and the upcoming fire department referendum, suggesting $400 as a compromise. Michael defended the increase, noting employees work in hazardous conditions and that taking away benefits hurts morale and retention. The initial motion for $600 failed on roll call vote (Daniels-yes, Armain-no, Olsson-no, My-no, Sober-no). A motion for $400 annually also failed 3-3. A motion for $500 annually with washer\/dryer failed. Finally, a motion for $400 for remainder of 2026, $500 annually starting 2027, plus a washer and dryer purchase passed with one opposed." },
      { item:"Approval of previous meeting minutes", body:"Motion by Steve to approve minutes of February 16, 2026. Seconded by Stephanie. Passed unanimously." },
      { item:"Financial reports acknowledgment", body:"February 2026 financial reports for all funds, T1 and T2 detail reports, and legal details were acknowledged through separate motions. All passed unanimously." },
    ],
    publicComment: "Lisa Beck of 1808 Cortez Lane spoke during public comment. She praised Mike for his work during the recent storm and expressed concern about the clothing allowance agenda item, questioning why the village couldn't save money by not increasing the allowance to the highest proposed amount after canceling the Cintas contract.",
    actionItems: [
      "Recommend to village board: Employee clothing allowance of $400 for remainder of 2026, $500 annually starting 2027, plus one-time purchase of washer and dryer",
      "Marathon County disaster relief funding application to be followed up with detailed cost documentation",
      "Next meeting scheduled for Tuesday, April 21st at 5:00 PM due to new board member swearing-in",
    ],
  },
,
  {
    id: "Izfp0CD_Da0", source: "weston",
    title: "Board of Trustees",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=Izfp0CD_Da0",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_03232026-1898",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Board of Trustees approved multiple rezoning ordinances, modified a speed limit ordinance for Weston Avenue after debate, and received updates on the April 2026 referendum for fire department funding. A resident delivered pointed criticism of budget priorities, arguing the village should fully fund the fire department rather than spending on amenities like artificial turf and the aquatic center.",
    agenda: [
      { time:"0:00", item:"Call to order and Pledge of Allegiance" },
      { time:"0:42", item:"Roll call" },
      { time:"1:05", item:"Public comments" },
      { time:"5:05", item:"Minutes from previous meeting - February 16th" },
      { time:"5:30", item:"Acknowledge reports from boards, committees, and commissions" },
      { time:"6:15", item:"Department reports (Administrator, Clerk, Finance, Fire\/EMS, Parks\/Rec, Planning, Police, Public Works, Technology)" },
      { time:"21:00", item:"Consent agenda - vouchers and agent appointment" },
      { time:"22:30", item:"Ordinances - rezoning and speed limit amendments" },
      { time:"35:00", item:"Resolution - Hinter Springs Second Edition subdivision final plat" },
      { time:"36:00", item:"Unfinished business - April 2026 referendum informational sessions update" },
      { time:"39:00", item:"New business items - ebike ordinance, parking restrictions, intersection signage, baseball field agreements, park fees, Eagle Scout project, Microsoft Teams communication" },
    ],
    discussions: [
      { item:"Public Comment - Fire Department Funding", body:"Jim Pensel of 5002 Aerrol Street praised SAFER firefighters and paramedics after attending their citizen academy, but criticized the board's approach to funding. He argued the village has 'a priority problem, not a revenue problem,' stating that fully funding fire and EMS is a need while artificial turf at Kennedy Park and the aquatic center are wants. He criticized the referendum approach as having no sunset date and urged the board to 'stop looking for the easy way out through referendums.'" },
      { item:"Finance Director Response to Public Comment", body:"Finance Director Jessica responded that the village cannot borrow for additional firefighters - the turf field was funded through approved borrowing, but operating expenses require operating revenue, hence the referendum. She noted public works is the largest general fund expenditure and staff worked 17-18 hour days during the recent blizzard but still received complaints. She stated emotionally that her position may be open in a couple months, noting that $150,000 could fund a firefighter but would leave one less person managing finances." },
      { item:"Speed Limit Ordinance 26-00006", body:"The original ordinance to set Weston Avenue at 35 mph from Von Kennel to Ryan failed 3-4, with Maloney, Jordan, and the presiding officer voting no. Trustee Maloney argued the stretch from Von Kennel to Jay should remain 45 mph given sparse driveways and better road conditions compared to Scofield Avenue. An amended motion was made to keep Camp Phillips to Von Kennel at 35 mph while returning Von Kennel to Jay to 45 mph. This amended version passed with one opposed (Trustee Kearns)." },
      { item:"Rezoning Ordinances", body:"Ordinance 26-00004 rezoning portion of 8905 Bert Street from RR5 to SFS passed unanimously per planning commission recommendation. Ordinance 26-00005 rezoning portion of 7105 Christensen Avenue from SL to SFS also passed unanimously per planning commission." },
      { item:"Intersection Signage at Community Center Drive and Birch Street", body:"The board approved changing the stop sign to a yield sign, but Trustee Huang raised concerns about cyclists coming off the pedestrian bridge at 15-20 mph with no control. The motion was amended to add a stop sign for bicyclists at the bottom of the bridge. The amended motion passed unanimously." },
      { item:"Baseball\/Softball Field Maintenance Agreement", body:"The 10-year agreement with youth baseball and softball organizations was approved. Discussion noted the long term protects the village's investment at Kennedy Park if organizations were to pull out, and formalizes arrangements that have existed informally for over 10 years." },
      { item:"Remote Meeting Attendance Policy", body:"Trustee Lewis recommended postponing this item until after the April election so the sitting board makes the decision. Motion to defer to next meeting passed unanimously." },
      { item:"Microsoft Teams for Trustee Communication", body:"The board approved using Microsoft Teams for inter-trustee communication starting next term. A training session will be held when the new board convenes. Discussion clarified trustees can still email but Teams would replace text messaging between board members." },
      { item:"April 2026 Referendum Update", body:"Administrator reported two informational presentations have been completed with recordings on the village website. Two remaining sessions on March 31st (4:30-6pm) and April 2nd (12-1:30pm) will be facilitated Q&A open houses rather than presentations." },
    ],
    publicComment: "Jim Pensel of 5002 Aerrol Street spoke for approximately 4 minutes about fire department funding, praising SAFER staff but criticizing the board's budget priorities and the referendum approach, arguing the village should cut spending on amenities to fund essential services.",
    actionItems: [
      "Approved rezoning of 8905 Bert Street from RR5 to SFS",
      "Approved rezoning of 7105 Christensen Avenue from SL to SFS",
      "Approved amended speed limit ordinance: 35 mph from Camp Phillips to Von Kennel, 45 mph from Von Kennel to Highway J",
      "Approved Hinter Springs Second Edition subdivision final plat",
      "Tabled e-bike\/euro ordinance pending completion of county process",
      "Approved removal of no parking restrictions on west side of Alderson Street along Kennedy Park",
      "Approved yield sign at Community Center Drive\/Birch Street with added stop sign for cyclists on bike path",
      "Approved 10-year baseball\/softball field maintenance agreement",
      "Approved commercial rotary mower purchase",
      "Approved park shelter fees and field rental cost changes",
      "Approved Eagle Scout project at McKiller Park funded from park operations",
      "Deferred remote meeting attendance policy to April 21st meeting",
      "Approved Microsoft Teams for trustee communication",
      "Approved Military Road utility engineering service contract",
      "Approved Business 51 storm pond engineering contract amendment ($13,500)",
      "Approved sewer televising software contract",
      "Approved 2026 annual stream maintenance plan budget",
      "Approved hospital area repaving change order #4",
      "Approved well rehabilitation",
      "Approved sign encroachment agreement with Seventh Floor Investments LLC",
      "Next meeting scheduled for Tuesday, April 21st at 6 PM with new board members",
    ],
  },
,
  {
    id: "HwjjV4oIneA", source: "marathon",
    title: "Marathon County Board Regular Meeting",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=HwjjV4oIneA",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18112/639098703974773349",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board of Supervisors adopted the 2026 Comprehensive Plan with multiple amendments addressing renewable energy terminology, AI\/automation policies, data centers, and energy infrastructure. The board also ratified a local state of emergency declaration for the recent blizzard, approved phase 2 design services for a new highway facility, and authorized litigation against PFAS polluters.",
    agenda: [
      { time:"0:00", item:"Call to order, Pledge of Allegiance, and moment of reflection" },
      { time:"1:30", item:"Roll call and welcome to visitors" },
      { time:"2:45", item:"Standing committee reports" },
      { time:"3:00", item:"Consent agenda items C8 through C13 B2" },
      { time:"3:45", item:"Adopting Marathon County Comprehensive Plan 2026 (Ordinance 0-13-26)" },
      { time:"42:00", item:"Establishing salaries for elected officials (Resolution 12-26)" },
      { time:"42:45", item:"Phase 2 design services for new highway facility (Resolution 13-26)" },
      { time:"44:30", item:"Authorizing outside counsel for PFAS litigation (Resolution 14-26)" },
      { time:"48:00", item:"Approving carry forwards and budget amendments (Resolution R-20-26)" },
      { time:"49:30", item:"Ratification of local state of emergency declaration (Resolution 22-26)" },
      { time:"53:00", item:"Administrator performance evaluation and salary" },
      { time:"55:00", item:"Announcements and adjournment" },
    ],
    discussions: [
      { item:"Consent Agenda Items C8-C13 B2", body:"Motion by Supervisor Rosenberg, second by Supervisor V. No discussion occurred. The motion carried unanimously." },
      { item:"Marathon County Comprehensive Plan 2026 (Ordinance 0-13-26)", body:"Administrator Leonard presented 10 proposed amendments compiled from supervisor feedback. Amendment 1 (livability standards) passed unanimously. Amendments 2, 3, and 4 regarding alternative energy systems terminology were separated at Supervisor Crawl's request and each passed individually but not unanimously. Amendment 5 (data centers\/battery storage background language) passed but not unanimously after Supervisor Leur expressed concern it was 'too ideological.' Amendment 6 (radon and lead remediation) passed unanimously. Amendment 7 (data centers regulation when allowed by law) passed but not unanimously. Amendment 8 (AI, automation, and data analytics language) offered by Supervisor Leur passed unanimously. Amendment 9 regarding clean coal, natural gas, and nuclear energy was extensively debated. Supervisor Sindellski offered original language but Supervisor Boots amended it to 'promote coal and natural gas until a long-term sustainable and reliable energy source can be found that does not adversely affect agricultural land.' Supervisors Robinson and Rosenberg opposed, with Rosenberg stating 'there is no such thing as clean coal.' The amended version passed but not unanimously. A late amendment by Supervisor Sindellski regarding utility-scale wind, solar, and battery storage as industrial uses was debated; Supervisor Jeang moved to refer it to the ERC committee but that motion was defeated, and the amendment itself was ultimately defeated. The full comprehensive plan as amended passed but not unanimously." },
      { item:"Establishing Salaries for Elected Officials (Resolution 12-26)", body:"Motion by Supervisor Conway, second by Supervisor Rosenberg. No discussion occurred. The motion carried." },
      { item:"Phase 2 Design Services for New Highway Facility (Resolution 13-26)", body:"Motion by Supervisor Robinson, second by Supervisor V. Supervisor Soyber requested future information about plans for the old facility. Supervisor Sindellski asked about the $53 million cost estimate; Chair Gibbs clarified that cost approval was not part of this resolution. The motion carried unanimously." },
      { item:"PFAS Litigation Authorization (Resolution 14-26)", body:"Motion by Supervisor Robinson, second by Supervisor Sefelt. Two amendments were adopted: Supervisor Robinson's amendment directing the administrator to evaluate past and present county practices that may have resulted in PFAS release or exposure passed unanimously. Vice Chair Dickinson's amendment modifying language regarding airport property passed unanimously. The resolution as amended passed unanimously." },
      { item:"Capital Asset Threshold Resolution (Resolution 21-26)", body:"Motion by Supervisor Robinson, second by Supervisor Mask. No discussion occurred. The motion carried but was not unanimous." },
      { item:"Law Enforcement Drug Trafficking Response Grant (Resolution R-17-26)", body:"Motion by Supervisor Jeang, second by Supervisor P. No discussion occurred. The motion carried unanimously." },
      { item:"Ratification of Local State of Emergency (Resolution 22-26)", body:"Motion by Supervisor Sefeld, second by Supervisor Arstead. Administrator Leonard explained the ratification preserves opportunities for reimbursement and praised county staff response to the blizzard, noting over 600 hours of additional call-in time for facilities and parks staff alone, with highway workers doing 12-16 hour shifts. Supervisor Fifer echoed thanks to staff. The motion carried unanimously." },
      { item:"Administrator Performance Evaluation", body:"Chair Gibbs explained the executive committee completed the administrator's evaluation using board input gathered previously. Supervisor Robinson moved to accept the executive committee's recommendation on salary and performance evaluation. Motion by Supervisor Robinson, second by Supervisor Cavalli. The motion carried unanimously without going into closed session." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Marathon County Comprehensive Plan 2026 adopted with amendments addressing energy terminology, AI\/automation, data centers, and energy sources",
      "Salaries established for clerk of courts, sheriff, and elected department heads for upcoming term",
      "Phase 2 design services authorized for new highway facility",
      "Outside counsel authorized on contingency basis for PFAS litigation; administrator directed to evaluate county PFAS exposure risks",
      "Capital asset thresholds set at $10,000 for general assets and $50,000 for infrastructure",
      "Law enforcement drug trafficking response grant accepted with budget amendment",
      "Local state of emergency declaration ratified for blizzard response",
      "Administrator performance evaluation and salary placement accepted",
      "Recognition of departing supervisors: Crawl, Fifick, Marshall, Rosenberg, Hardinger, V, and Reynolds",
    ],
  },
,
  {
    id: "D7R7a0G0WTA", source: "weston",
    title: "Parks Committee",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Parks and Recreation Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=D7R7a0G0WTA",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_03232026-1898",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Parks Committee approved Rettler Corporation to develop a master plan for Mock Mueller Park, discussed increasing park and recreation impact fees to be more in line with neighboring communities, and reviewed the successful Yellow Banks kayak launch project which came in significantly under budget due to grant funding. The committee also discussed ice rink operations at Kennedy Park and potential future hockey facility improvements.",
    agenda: [
      { time:"0:00", item:"Call to order and Pledge of Allegiance" },
      { time:"0:35", item:"Roll call" },
      { time:"1:00", item:"Approval of minutes from February 23rd, 2026" },
      { time:"1:30", item:"Public comments" },
      { time:"6:45", item:"Review of parks and recreation impact fee discussion" },
      { time:"22:30", item:"Request for proposals for Mock Mueller Park master plan and budget estimates" },
      { time:"29:00", item:"Review of Yellow Banks kayak launch expenses" },
      { time:"35:30", item:"Components of operations for the ice rink at Kennedy Park" },
      { time:"48:30", item:"Future items and next meeting date" },
      { time:"52:00", item:"Adjournment" },
    ],
    discussions: [
      { item:"Approval of minutes from February 23rd, 2026", body:"A motion to accept the minutes was made and seconded. The motion passed unanimously with no discussion." },
      { item:"Review of parks and recreation impact fee discussion", body:"Jennifer presented information on park impact fees, noting the village currently charges $300 for single family homes while neighboring communities charge $600-$650. The 2020 study recommended $761 but the village only raised fees by $50 from $250 to $300. Plan Commission asked for Parks Committee input before making a decision. Committee members expressed support for a moderate increase to be consistent with neighboring communities. Katrina stated she would be 'more in the moderate increase bracket instead of the maximum.' Using Granite Ridge subdivision as an example, current fees would collect $26,400 while doubled fees would collect $52,800. No formal action was taken; information will go back to Plan Commission." },
      { item:"Request for proposals for Mock Mueller Park master plan", body:"Staff received seven proposals for the master plan, which were reviewed by four staff members based on firm experience, personnel, project scope understanding, and cost. The two lowest bids were from JSD and Rettler Corporation, both with village experience. Roger made a motion to select Rettler Corporation, seconded by Katrina. The motion passed unanimously." },
      { item:"Review of Yellow Banks kayak launch expenses", body:"Jessica presented a detailed breakdown of the kayak launch project expenses and grant funding. The project received grants from DNR and Marathon County Transportation, with Marathon County covering the full expense for the ADA-accessible dock. Lisa Beck praised the RFC as 'awesome' and 'super well written' during public comment. Committee members commended staff, particularly Jessica and Dan Hagenbotham, for grant writing efforts. PGA donated labor and equipment, MTS donated site planning, and Dan Hagenbotham contributed without charge. The committee discussed giving formal recognition to Dan Hagenbotham. No formal action was required; item was informational." },
      { item:"Ice rink operations at Kennedy Park", body:"Staff presented information requested by Katrina on ice rink operations. The warming house has been unattended since 2021-22 due to inability to recruit staff. Everest Youth Hockey has expressed interest in improvements including a covered rink structure and has provided cost estimates. Sean noted discussions about Marathon Park hockey facilities may increase demand for ice. Katrina emphasized not wanting hockey to be forgotten while baseball gets attention at Kennedy Park. Committee requested additional information including historical attendance figures from 2018-19 seasons, labor hour costs, and user feedback for future meetings. No formal action was taken." },
    ],
    publicComment: "Two speakers offered public comment in person. Jim Pinsel (Street address not fully stated) expressed frustration about receiving no response to his previous three-page submission regarding playground equipment installation concerns, Kennedy Park fundraising transparency, ice rink costs, and requested full cost accounting including labor hours. He argued the true cost of the ice rink is $20,000-$30,000 when factoring in staff hours, not the stated $1,320.98. Lisa Beck (1808 Cortez Lane) thanked Michael for snow removal work during the recent blizzard and praised Sean and Jessica for the well-written Yellow Banks kayak launch RFC. A written response to Jim Benson's previous email was submitted and will be included in the minutes.",
    actionItems: [
      "Rettler Corporation selected to develop Mock Mueller Park master plan",
      "Jennifer to present neighboring community impact fee comparisons to Plan Commission next month",
      "Staff to compile historical ice rink attendance data from 2018-19 seasons for future meeting",
      "Staff to gather user feedback on ice rink operations",
      "Quarterly Kennedy Park project update scheduled for April board meeting",
      "Next Parks Committee meeting scheduled for April 27th, 2026",
    ],
  },
,
  {
    id: "0pfKykvicdA", source: "marathon",
    title: "Marathon County HR, Finance, and Property Committee Meeting",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "Marathon County HR, Finance, and Property Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=0pfKykvicdA",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18116/639096091432830000",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County HR, Finance, and Property Committee approved several key items including a claim disallowance related to a child's death, revised property values for public auction, carry forward funds resolution, and a capital assets threshold policy change. The committee also received introductions from new healthcare consultants and detailed fiscal updates for 2025 and 2026.",
    agenda: [
      { time:"0:00", item:"Call to order and roll call" },
      { time:"0:15", item:"Claim disallowance - Mercedes Holmes" },
      { time:"2:05", item:"Revised property values for public auction" },
      { time:"4:15", item:"Resolution to approve carry forward funds" },
      { time:"9:45", item:"Resolution to amend capital assets threshold policy" },
      { time:"11:00", item:"Introduction of healthcare consultants - National Insurance Services" },
      { time:"30:45", item:"Audited 2025 year end fiscal update" },
      { time:"52:30", item:"2026 year to date fiscal update" },
      { time:"55:00", item:"Finance department quarterly update" },
      { time:"1:05:00", item:"County Treasurer update" },
      { time:"1:25:00", item:"Announcements and adjournment" },
    ],
    discussions: [
      { item:"Claim disallowance - Mercedes Holmes", body:"The committee considered a claim filed December 5th by Mercedes Holmes related to the death of her 3-year-old child Zalen Bernett, who was placed in a treatment foster care home licensed through another agency in Dunn County. Staff reported law enforcement and social services investigations found no wrongdoing and the death was determined to be natural causes. Outside counsel and insurance carrier Wimik recommended disallowance. Chair Gibbs moved to disallow the claim per the insurance carrier's recommendation. The motion passed unanimously." },
      { item:"Revised property values for public auction", body:"Two parcels at 529 Mullen Street and 738 South 3rd Avenue failed to sell twice on Wisconsin Surplus with bids not reaching appraised values. Staff requested revised minimum sale prices of $9,000 and $7,500 respectively. Chair Gibbs moved to approve the revised prices, seconded by Supervisor Lumer. The motion passed unanimously. Staff noted one bidder was marked as non-pay and banned from future auctions." },
      { item:"Resolution to approve carry forward funds", body:"Finance Director Sam presented Resolution R20-2026 for carrying forward restricted program revenues and multi-year project funds. Notable items included replenishing veterans relief funds using 2025 budget excess (providing approximately 3 years of funding), and $142,731 for administration special projects including $75,000 for homelessness contract. Vice Chair Marshall asked about Register of Deeds redaction funds; staff agreed to provide future information on that legacy fund's usage. Chair Gibbs moved approval, seconded by Supervisor Hart. Motion passed unanimously." },
      { item:"Resolution to amend capital assets threshold policy", body:"Finance Director Sam explained the proposal to increase the capitalization threshold from $5,000 to $10,000, following GFOA guidance from 2006. This determines whether items are expensed or depreciated as capital assets. The change was considered in 2022 but not completed. Supervisor Hart moved to approve and forward to county board, seconded by Chair Gibbs. Motion passed unanimously." },
      { item:"Introduction of healthcare consultants - National Insurance Services", body:"HR Director Candace introduced NIS representatives following completion of the healthcare consulting RFP. Representative with 28 years experience and Jordan Stanley (2 years with NIS, background in public sector HR) presented their team structure and approach. They discussed evaluating fully insured vs self-insured options, near-site ATA clinic utilization, and developing long-term healthcare strategy. Vice Chair Marshall asked about comparison costs and emergency room utilization strategies. Chair Gibbs questioned evaluation methodology for insurance models. NIS emphasized data-driven approach and collaborative work with county administration." },
      { item:"Audited 2025 year end fiscal update", body:"Finance Director Sam provided comprehensive department-by-department review of 2025 fiscal status. Key items included: TID closure check of $257,238 from City of Wausau, unclaimed property of $222,752 from state, opioid fund received $352,389 in settlements with total cash of $2.2 million, parks fund ice revenue up $70,000. Year-end closing processes continue with capital assets reconciliation pending. Administrator Lance recognized Sam and her team for extensive work on W-2s and year-end closeout amid federal tax law changes." },
      { item:"County Treasurer update", body:"Treasurer Connie reported on tax collection activities including 1,582 delinquent tax notices mailed (down from 1,786 last year), processing of lottery credits, and ongoing work with municipalities on receiving errors. She discussed challenges with municipal treasurers' understanding of processes and errors in tax payment receipting. Supervisor Lumer asked about poverty trends; Connie explained payment agreements were discontinued due to high default rates. Administrator Lance clarified the eviction process relates to county tax delinquent parcel proceedings, not general evictions." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Claim of Mercedes Holmes disallowed per insurance carrier recommendation",
      "Revised minimum sale prices set for two parcels: $9,000 for 529 Mullen Street and $7,500 for 738 South 3rd Avenue",
      "Resolution R20-2026 approved for carry forward funds to 2026 budget",
      "Capital assets threshold policy amendment approved and forwarded to county board",
      "Finance department to provide information on Register of Deeds redaction fund usage and potential repurposing at future meeting",
      "Healthcare consultants to provide update prior to budget assumption development in early summer",
      "Staff to consider recommendation to increase Social Services reserve account above current $400,000",
      "Next committee meeting scheduled for April 8th",
    ],
  },
,
  {
    id: "47UbKS2Jqo4", source: "marathon",
    title: "Marathon County Executive Committee Meeting",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "Executive Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=47UbKS2Jqo4",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18106",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Executive Committee approved moving County Administrator Lance Leonhard to year six of the administrator pay scale (retroactive to January) following a closed session performance review. The committee also ratified the declaration of a local state of emergency related to a recent snow emergency to preserve eligibility for state reimbursement funds.",
    agenda: [
      { time:"0:00", item:"Call to order and Pledge of Allegiance" },
      { time:"0:30", item:"Performance review of the administrator (closed session consideration)" },
      { time:"1:45", item:"Closed session for administrator evaluation" },
      { time:"2:30", item:"Return to open session - administrator pay scale and evaluation approval" },
      { time:"3:15", item:"Ratification of declaration of state and local emergency" },
      { time:"5:30", item:"Rules review recommendations (educational\/informational)" },
      { time:"7:30", item:"Adjournment" },
    ],
    discussions: [
      { item:"Performance review of the administrator", body:"The committee voted unanimously to go into closed session to discuss the administrator's performance evaluation. Roll call vote included Supervisors Gibbs, Dickinson, Arstead, Boots, Drebeck, Fifick, Mask, Ritter, Morash, and Robinson, all voting aye. Upon returning to open session, Supervisor Mask moved to approve the pay scale for six years service for the administrator and approve the evaluation, seconded by Supervisor Arstead. The motion was amended to make the pay scale change retroactive to January, consistent with county implementation. Motion passed unanimously by voice vote." },
      { item:"Ratification of declaration of state and local emergency", body:"The administrator explained that following the governor's emergency declaration for a recent snow emergency, the county declared a local state of emergency. He noted that parks, recreation, forestry, facilities, capital management, and highway staff worked hundreds of extra hours over approximately 24 hours, with some employees sleeping on cots and working 12-16 hour shifts. Kevin Lang from the highway department was specifically mentioned. The ratification preserves the county's ability to request reimbursement through available emergency funds under Chapter 323 of state statutes. Supervisor Robinson moved to ratify, seconded by Supervisor Fifick. Motion passed unanimously by voice vote." },
      { item:"Rules review recommendations", body:"The vice chair provided an overview of the rules review committee's work, noting 68 items were submitted with 31 approvals, 31 rejections, and 3 parking lot items. Key changes include clarifications of existing practices, changes to chair and vice chair appointment processes, expense reimbursement approvals allowing more freedom for WCA professional development, restructuring of the forestry recreation committee, and sunsetting of the TIF and broadband task forces. The committee decided to retain two meetings rather than consolidating to one. No action was taken; further discussion scheduled for April 9, 2026." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "County Administrator placed on year six of administrator pay scale, retroactive to January",
      "Administrator's performance evaluation approved",
      "Declaration of local state of emergency ratified and forwarded to full board",
      "County to compile information and submit request for emergency reimbursement funds",
      "Rules review recommendations to be discussed further at April 9, 2026 executive committee meeting",
    ],
  },
,
  {
    id: "hNOP07iJjNY", source: "marathon",
    title: "Marathon County Board Education Meeting",
    date: "March 19, 2026", shortDate: "MAR 19",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=hNOP07iJjNY",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18076/639089973815830000",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board held an educational meeting featuring presentations on PFAS litigation opportunities and renewable energy regulatory authority. No votes were taken as this was an informational session, but the board heard from attorneys about potentially joining multi-district litigation against PFAS manufacturers and learned about county options for addressing proposed wind energy projects.",
    agenda: [
      { time:"0:00", item:"Call to order and Pledge of Allegiance" },
      { time:"0:45", item:"Reading of meeting notice" },
      { time:"1:15", item:"Roll call - seven supervisors joined by WebEx, four excused" },
      { time:"2:00", item:"Public comment period (15 minutes, 5 speakers signed up)" },
      { time:"12:30", item:"Presentation on PFAS multi-district litigation opportunity" },
      { time:"45:00", item:"Questions from board members on PFAS litigation" },
      { time:"1:05:00", item:"Presentation on renewable energy regulatory authority" },
      { time:"1:20:00", item:"Discussion of Hub City Wind Project and other proposed projects" },
      { time:"1:35:00", item:"County options for addressing renewable energy projects" },
    ],
    discussions: [
      { item:"Public Comment", body:"Five residents spoke during public comment. Cindy Nielsen from Stratford\/Oplane Township reported visiting 200 homes and finding universal opposition to wind turbines, stating 'nobody wants the wind turbines' and residents don't want the county board making decisions without information. Wendy Rowski from Green Valley urged the board to vote no on the comprehensive plan next week, requesting stronger language about industrial energy facilities and replacing 'wind farm' terminology with 'industrial wind energy development.' Barb Newton and Sydney Hogan from Rib Mountain spoke in support of reducing speed limits on Double N road, noting 75 residents signed a petition. Heidi Pesky from Town of McMillan argued against Joint Development Agreements for wind projects, listing concerns about liability, road damage, and transparency." },
      { item:"PFAS Multi-District Litigation Presentation", body:"Attorney Andy Phillips from Atollis Law and Carrie McDougall from Baron and Budd Law Firm (appearing virtually) presented on opportunities for Marathon County to join nationwide litigation against PFAS chemical manufacturers. McDougall explained the MDL has resulted in $12-13 billion in settlements from 3M and $3-5 billion from DuPont for water providers, calling it 'the largest settlement in the history of toxic torts.' He noted the water settlement specifically excluded claims for airports, wastewater, and landfills, meaning Marathon County could potentially pursue claims related to those sources. The attorneys operate on a 25% contingency fee basis with no upfront costs to the county." },
      { item:"Board Questions on PFAS Litigation", body:"Supervisor Robinson asked multiple questions about scope of potential claims, including whether settlements would restrict future recovery and whether the county could include claims for areas affected by land-spreading of contaminated sludge. Attorney Phillips clarified claims must be unique to Marathon County's injuries, not on behalf of others. Vice Chair Dickinson, as airport board chair, stated the airport has 'no known contamination currently' and one spill during foam transition showed no issues. Supervisor Mash asked about the contingency fee structure, which McDougall confirmed is 25% plus reimbursement of advanced expenses only if there is recovery. Supervisor Soberts asked about sludge spreading impacts, which McDougall acknowledged he wasn't prepared to fully address." },
      { item:"Renewable Energy Regulatory Authority Presentation", body:"Attorney Rebecca Roker from Atollis Law, representing Wisconsin Counties Association, presented on county authority regarding renewable energy projects. She explained that PSC has jurisdiction over projects over 100 megawatts and noted PSC has a 33-0 record approving solar projects. She discussed the Hub City Wind Project from Alliant Energy (no PSC filing yet), the Marathon Wind project purchased as part of Hub City, and the Stormark Wind Energy Center with many unknowns. Roker outlined four options for counties: do nothing, negotiate a Joint Development Agreement, intervene in PSC proceedings, or litigate. She strongly recommended JDAs as the most effective tool, stating 'a JDA is the best way that we can protect a county' since it can address liability, roads, decommissioning, emergency response, and environmental protections not otherwise available under state law." },
    ],
    publicComment: "Five speakers addressed the board: Cindy Nielsen (Stratford) opposed wind turbines citing conversations with 200 residents; Wendy Rowski (Green Valley) urged rejection of comprehensive plan and accurate terminology for industrial energy facilities; Barb Newton (Rib Mountain) supported speed reduction on Double N road with 75 petition signatures; Heidi Pesky (Town of McMillan) spoke against Joint Development Agreements listing numerous concerns; Sydney Hogan (Rib Mountain) supported the Double N speed reduction.",
    actionItems: [
      "Board to consider resolution on joining PFAS multi-district litigation at future meeting",
      "Comprehensive plan vote scheduled for next week's meeting",
      "Double N road speed reduction recommendation forwarded from infrastructure committee to county board for vote",
      "County to consider options for addressing Hub City Wind Project before PSC application is filed",
    ],
  },
,
  {
    id: "knWZO4dON-8", source: "wausau",
    title: "Wausau Plan Commission Meeting",
    date: "March 17, 2026", shortDate: "MAR 17",
    committee: "Plan Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=knWZO4dON-8",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2133/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Plan Commission approved a Conditional Use Permit for a 70-unit, 7-story apartment building at 731 N 1st Street proposed by Beacon Resources, LLC. The commission also approved a Transportation Project Plat for Grand Avenue signal replacements and held a public hearing on a personal storage facility proposal at 218 South 4th Street.",
    agenda: [
      { time:"N\/A", item:"Election of a Vice Chair" },
      { time:"N\/A", item:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement" },
      { time:"N\/A", item:"Consideration of the minutes of the preceding meeting(s) - February 18, 2026 Regular Plan Commission Minutes" },
      { time:"N\/A", item:"Public Hearing: Discussion on approving a Conditional Use Permit for 218 South 4th Street to authorize and allow construction of a Personal Storage Facility use in the Light Industrial (LI) Zoning District (Dunwoody Storage)" },
      { time:"N\/A", item:"Discussion and possible action on approving a Conditional Use Permit for 731 N 1st Street to allow for a 70 unit, 7-story apartment building (Beacon Resources, LLC)" },
      { time:"N\/A", item:"Discussion and possible action approving the Transportation Project Plat for Project 370-40-40, Grand Avenue signal replacements, Sturgeon Eddy Road and Townline Rd" },
    ],
    discussions: [
      { item:"Election of a Vice Chair", body:"The election of a Vice Chair was on the agenda. No vote outcome is recorded in the official records." },
      { item:"February 18, 2026 Regular Plan Commission Minutes", body:"The minutes from the February 18, 2026 Regular Plan Commission meeting were approved. The motion passed, though specific vote count and movers were not recorded." },
      { item:"Public Hearing: Conditional Use Permit for 218 South 4th Street (Dunwoody Storage)", body:"A public hearing was held regarding a Conditional Use Permit to authorize construction of a Personal Storage Facility in the Light Industrial Zoning District. This was a hearing item; no final vote was recorded for this meeting." },
      { item:"Conditional Use Permit for 731 N 1st Street (Beacon Resources, LLC)", body:"The commission approved a Conditional Use Permit for a 70-unit, 7-story apartment building at 731 N 1st Street proposed by Beacon Resources, LLC. The motion passed, though specific vote count and movers were not recorded." },
      { item:"Transportation Project Plat for Project 370-40-40, Grand Avenue signal replacements", body:"The commission approved the Transportation Project Plat for Grand Avenue signal replacements at Sturgeon Eddy Road and Townline Road. The motion passed, though specific vote count and movers were not recorded." },
    ],
    publicComment: "Public comment on agenda items was included on the agenda, along with reading of the City of Wausau Public Comment Statement.",
    actionItems: [
      "Conditional Use Permit approved for 70-unit apartment building at 731 N 1st Street by Beacon Resources, LLC",
      "Transportation Project Plat approved for Grand Avenue signal replacements at Sturgeon Eddy Road and Townline Road",
      "Public hearing held on Conditional Use Permit for personal storage facility at 218 South 4th Street - further action may follow",
    ],
    civicItems: [
      { number:"1", name:"Election of a Vice Chair", votes:[], docs:[], children:[] },
      { number:"2", name:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"3", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"Regular Plan Commission Minutes", votes:[{ motion:"approve", passed:true, initiator:"Andrew Brueggeman", seconder:"Bruce Bohlken", yes:["Doug Diny", "Eric Lindman", "Sarah Watson", "George Bornemann", "Andrew Brueggeman", "Bruce Bohlken"], no:[], abstain:[] }], docs:[{ name:"PlanCommission_Regular_Minutes_02182026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6401)" }], children:[] },
    ] },
      { number:"4", name:"Public Hearing:", votes:[], docs:[], children:[
      { number:"a", name:"Discussion on approving a Conditional Use Permit for 218 South 4th Street to authorize and allow construction of a Personal Storage Facility use in the Light Industrial (LI) Zoning District. (Dunwoody Storage)", votes:[], docs:[{ name:"Staff Report 218 S 4th St Conditional Use Permit", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6305)" }, { name:"Dunwoody Storage - CUP Application", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6371)" }, { name:"CUP Review Plans-11x17", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6278)" }, { name:"Dunwoody Storage - Site Plan", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6275)" }, { name:"Dunwoody Storage - Elevations", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6274)" }, { name:"Dunwoody Storage_Renderings", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6276)" }, { name:"Landscape Requirements", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6277)" }], children:[] },
    ] },
      { number:"5", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Discussion and possible action on approving a Conditional Use Permit for 731 N 1st  Street to allow for a 70 unit, 7-story apartment building. (Beacon Resources, LLC)", votes:[{ motion:"approve", passed:true, initiator:"George Bornemann", seconder:"Andrew Brueggeman", yes:["Doug Diny", "Eric Lindman", "Sarah Watson", "George Bornemann", "Andrew Brueggeman", "Bruce Bohlken"], no:[], abstain:[] }], docs:[{ name:"Staff Report and Street Findings 731 N 1st St CUP", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6402)" }, { name:"Front Facade Rendering 731 N 1st St", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6405)" }, { name:"Elevations 731 N 1st St", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6403)" }, { name:"Floor Plan 731 N 1st St", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6404)" }, { name:"Excerpt from City of Wausau Comp Plan", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6406)" }], children:[] },
      { number:"b", name:"Discussion and possible action approving the Transportation Project Plat for Project 370-40-40, Grand Avenue signal replacements, Sturgeon Eddy Road and Townline Rd.", votes:[{ motion:"approve", passed:true, initiator:"Andrew Brueggeman", seconder:"Bruce Bohlken", yes:["Doug Diny", "Eric Lindman", "Sarah Watson", "George Bornemann", "Andrew Brueggeman", "Bruce Bohlken"], no:[], abstain:[] }], docs:[{ name:"3700-40-40_0401 03042026 preliminary plat", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6407)" }], children:[] },
    ] },
      { number:"6", name:"Discussion.", votes:[], docs:[], children:[] },
      { number:"7", name:"Adjournment.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Bruce Bohlken", yes:["Doug Diny", "Eric Lindman", "Sarah Watson", "George Bornemann", "Andrew Brueggeman", "Bruce Bohlken"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
,
  {
    id: "gugcMAm6DFA", source: "wausau",
    title: "Wausau Board of Public Works Meeting",
    date: "March 19, 2026", shortDate: "MAR 19",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=gugcMAm6DFA",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2297/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Board of Public Works awarded the 2026 Asphalt Paving Project 'A' contract to RC Pavers, LLC for $824,146.34. The meeting concluded with a 2-0 vote to adjourn.",
    agenda: [
      { time:"N\/A", item:"Open bids and make recommendation for 2026 Asphalt Paving Project 'A'" },
    ],
    discussions: [
      { item:"2026 Asphalt Paving Project 'A' Contract Award", body:"The board opened bids and voted to award the contract for the 2026 Asphalt Paving Project 'A' to RC Pavers, LLC in the amount of $824,146.34. The motion passed." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Contract for 2026 Asphalt Paving Project 'A' awarded to RC Pavers, LLC for $824,146.34",
    ],
    civicItems: [
      { number:"1", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Open bids and make recommendation for 2026 Asphalt Paving Project \"A\".", votes:[{ motion:"award contract to RC Pavers, LLC in the amount of $824,146.34", passed:true, initiator:"Eric Lindman", seconder:"Vincent Bonino", yes:["Eric Lindman", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
    ] },
      { number:"2", name:"Adjournment.", votes:[{ motion:"approve", passed:true, initiator:"Vincent Bonino", seconder:"Eric Lindman", yes:["Eric Lindman", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
,
  {
    id: "_hS5GDGVL1c", source: "wausau",
    title: "Wausau Public Health and Safety Committee Meeting",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Public Health & Safety", duration: "~1h",
    url: "https://www.youtube.com/watch?v=_hS5GDGVL1c",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2311/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Public Health & Safety Committee approved all action items including various license applications, a rewritten solid waste disposal ordinance, repeal of the cell phone while driving ordinance, and a solar energy partnership with MREA. The committee also received discussion reports from the Fire Department, tavern activities, and community outreach.",
    agenda: [
      { time:"N\/A", item:"Approval or denial of various license applications" },
      { time:"N\/A", item:"Repealing and recreating Wausau Municipal Code Chapter 6.44 Solid Waste Disposal" },
      { time:"N\/A", item:"Repealing Wausau Municipal Code Section 10.01.012 Use of Hand-Held Mobile Telephones and Mobile Electronic Devices While Driving Prohibited" },
      { time:"N\/A", item:"Approving Memorandum of Understanding between the City of Wausau and the Midwest Renewable Energy Association (MREA) to partner in the operation of the Grow Solar Central Wisconsin Group Buy Program" },
      { time:"N\/A", item:"Wausau Fire Department 2025 Annual Report" },
      { time:"N\/A", item:"Tavern Activities Report from February 2026" },
      { time:"N\/A", item:"Community Outreach Update" },
    ],
    discussions: [
      { item:"Approval or denial of various license applications", body:"The committee approved a parklet permit and approved licenses as indicated by staff with the exception of Theodore Davis. Both motions passed." },
      { item:"Repealing and recreating Wausau Municipal Code Chapter 6.44 Solid Waste Disposal", body:"The committee approved the new solid waste disposal provision, which repeals and recreates the existing municipal code chapter. The motion passed." },
      { item:"Repealing Wausau Municipal Code Section 10.01.012 Use of Hand-Held Mobile Telephones and Mobile Electronic Devices While Driving Prohibited", body:"The committee voted to repeal the local ordinance prohibiting hand-held mobile phone use while driving. The motion to repeal passed." },
      { item:"Approving Memorandum of Understanding with MREA for Grow Solar Central Wisconsin Group Buy Program", body:"The committee approved the MOU partnering the City of Wausau with the Midwest Renewable Energy Association to operate the Grow Solar Central Wisconsin Group Buy Program. The motion passed." },
      { item:"Wausau Fire Department 2025 Annual Report", body:"The Fire Department's 2025 annual report was presented as a discussion item. No vote was required." },
      { item:"Tavern Activities Report from February 2026", body:"The February 2026 tavern activities report was presented as a discussion item. No vote was required." },
      { item:"Community Outreach Update", body:"A community outreach update was presented as a discussion item. No vote was required." },
    ],
    publicComment: "Public comment on agenda items was listed as the first item on the agenda.",
    actionItems: [
      "Parklet permit approved",
      "License applications approved as recommended by staff, with exception of Theodore Davis",
      "New Wausau Municipal Code Chapter 6.44 Solid Waste Disposal to be implemented",
      "Wausau Municipal Code Section 10.01.012 on hand-held mobile devices while driving repealed",
      "MOU with Midwest Renewable Energy Association for Grow Solar Central Wisconsin Group Buy Program approved",
    ],
    civicItems: [
      { number:"1", name:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"2", name:"Consideration of the minutes of the preceding meeting(s).", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Lou Larson", yes:["Lisa Rasmussen", "Lou Larson", "Sarah Watson"], no:[], abstain:[] }], docs:[], children:[
      { number:"a", name:"​Regular Public Health &amp; Safety Committee Minutes", votes:[], docs:[{ name:"PublicHealth&Safety_Regular_02162026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6507)" }], children:[] },
    ] },
      { number:"3", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Approval or denial of various license applications.", votes:[{ motion:"approve the parklet permit", passed:true, initiator:"Sarah Watson", seconder:"Lou Larson", yes:["Lisa Rasmussen", "Lou Larson", "Sarah Watson"], no:[], abstain:[] }, { motion:"approve or deny licenses as indicated by staff with the exception of Theodore Davis", passed:true, initiator:"Lou Larson", seconder:"Sarah Watson", yes:["Lisa Rasmussen", "Lou Larson", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"Licenses List", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6554)" }], children:[] },
      { number:"b", name:"Repealing and recreating Wausau Municipal Code Chapter 6.44 Solid Waste Disposal.", votes:[{ motion:"approve the new provision", passed:true, initiator:"Lou Larson", seconder:"Sarah Watson", yes:["Lisa Rasmussen", "Lou Larson", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"repealing and recreating Chapter 6.44 ord.", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6528)" }, { name:"current ch. 6.44", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6529)" }], children:[] },
      { number:"c", name:"Repealing Wausau Municipal Code Section 10.01.012 Use of Hand-Held Mobile Telephones and Mobile Electronic Devices While Driving Prohibited.", votes:[{ motion:"repeal that code section", passed:true, initiator:"Sarah Watson", seconder:"Lou Larson", yes:["Lisa Rasmussen", "Lou Larson", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"repeal 10.01.012 staff memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6535)" }, { name:"repeal 10.01.012 cell phones ord", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6536)" }, { name:"wmc 10.01.012", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6537)" }], children:[] },
      { number:"d", name:"Approving Memorandum of Understanding between the City of Wausau and the Midwest Renewable Energy Association (MREA) to partner in the operation of the Grow Solar Central Wisconsin Group Buy Program.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Lou Larson", yes:["Lisa Rasmussen", "Lou Larson", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"Staff Memo - Grow Solar", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6538)" }, { name:"MREA Sponsorship Agreement_Wausau", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6540)" }, { name:"midwest renewable energy mou seec mins 3.5.26", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6541)" }], children:[] },
    ] },
      { number:"4", name:"Discussion.", votes:[], docs:[], children:[
      { number:"a", name:"Wausau Fire Department 2025 Annual Report.", votes:[], docs:[{ name:"2025 Annual Report", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6542)" }], children:[] },
      { number:"b", name:"Tavern Activities Report from February 2026.", votes:[], docs:[{ name:"Tavern Activity Report February 2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6543)" }], children:[] },
      { number:"c", name:"Community Outreach Update.", votes:[], docs:[{ name:"March Outreach Update", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6544)" }], children:[] },
    ] },
      { number:"5", name:"Adjournment.", votes:[{ motion:"adjourn", passed:true, initiator:"Sarah Watson", seconder:"Lou Larson", yes:["Lisa Rasmussen", "Lou Larson", "Sarah Watson"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
,
  {
    id: "8rRo1cm2YJ0", source: "wausau",
    title: "Wausau Finance Committee Meeting",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "Finance Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=8rRo1cm2YJ0",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2016/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Finance Committee approved multiple airport ground lease transfers and a budget carryover amendment while denying a tax recovery claim for Green Acres at Greenwood Hills. Two significant items—the National Opioid Settlement participation and Lead Service Line Replacement budget amendment—were postponed to the next meeting, along with consideration of property purchases for the Public Works Streets Division.",
    agenda: [
      { time:"N\/A", item:"Public comment on agenda items" },
      { time:"N\/A", item:"Consideration of minutes from March 10, 2026 Regular Finance Committee Meeting" },
      { time:"N\/A", item:"Approving Alleged Claim for Recovery of Unlawful Tax for Green Acres at Greenwood Hills, LLC - Outlot 1" },
      { time:"N\/A", item:"Approving consent to transfer title to buildings and improvements and waiver of first right of refusal at 939 Woods Place" },
      { time:"N\/A", item:"Terminating Airport Ground Lease with Wynn O. Jones at 939 Woods Place" },
      { time:"N\/A", item:"Approving Airport Ground Lease with Owen Jones at 939 Woods Place" },
      { time:"N\/A", item:"Approving Airport Ground Lease with Cole Lundberg" },
      { time:"N\/A", item:"Approving participation in Six Remnant Defendants National Opioid Settlement Agreement" },
      { time:"N\/A", item:"Approving budget amendment for Wausau Water Works 2025 Lead Service Line Replacement project" },
      { time:"N\/A", item:"Approving budget amendment for carryover of funds from 2025 to 2026" },
      { time:"N\/A", item:"Review of 2025 Motor Pool Fund financial results and related budget amendment" },
      { time:"N\/A", item:"Approving 2026 General Obligation Promissory Note for Capital Improvements" },
      { time:"N\/A", item:"Review of 2025 General Fund Financial Results" },
      { time:"N\/A", item:"Considering purchasing properties at 108 Adolph Street, 112 Adolph Street, 112-1\/2 Adolph Street and 233 Myron Street for Public Works Streets Division" },
      { time:"N\/A", item:"Closed Session for property purchase negotiations" },
    ],
    discussions: [
      { item:"March 10, 2026 Regular Finance Committee Minutes", body:"The minutes from the March 10, 2026 meeting were approved 4-0. Motion was made by Sarah Watson and seconded by Aaron Griner." },
      { item:"Alleged Claim for Recovery of Unlawful Tax for Green Acres at Greenwood Hills, LLC - Outlot 1", body:"The committee voted to deny approval of the tax recovery claim. The motion to approve the claim failed." },
      { item:"Consent to transfer title at 939 Woods Place", body:"The committee approved the consent to transfer title to buildings and improvements and waiver of first right of refusal to purchase at 939 Woods Place. The motion passed." },
      { item:"Terminating Airport Ground Lease with Wynn O. Jones", body:"The committee approved termination of the airport ground lease with Wynn O. Jones at 939 Woods Place. The motion passed." },
      { item:"Airport Ground Lease with Owen Jones", body:"The committee approved a new airport ground lease with Owen Jones at 939 Woods Place. The motion passed." },
      { item:"Airport Ground Lease with Cole Lundberg", body:"The committee approved an airport ground lease with Cole Lundberg. The motion passed." },
      { item:"Six Remnant Defendants National Opioid Settlement Agreement", body:"The committee voted to postpone consideration of participating in the National Opioid Settlement Agreement to the next scheduled meeting. The motion to postpone passed." },
      { item:"Budget amendment for Lead Service Line Replacement", body:"The committee voted to postpone consideration of the budget amendment for the Wausau Water Works 2025 Lead Service Line Replacement project to the next meeting. The motion to postpone passed." },
      { item:"Budget amendment for carryover of funds from 2025 to 2026", body:"The committee approved the budget amendment for carryover of funds from 2025 to 2026. The motion passed." },
      { item:"2025 Motor Pool Fund financial results", body:"The committee reviewed the 2025 Motor Pool Fund financial results and related budget amendment. No vote outcome was recorded for this review item." },
      { item:"2026 General Obligation Promissory Note for Capital Improvements", body:"The committee approved forwarding the 2026 General Obligation Promissory Note for Capital Improvements to the calendar. The motion passed." },
      { item:"2025 General Fund Financial Results", body:"The committee reviewed the 2025 General Fund Financial Results and approved the transfer of funds. The motion passed." },
      { item:"Properties for Public Works Streets Division", body:"The committee voted to postpone consideration of purchasing properties at 108 Adolph Street, 112 Adolph Street, 112-1\/2 Adolph Street and 233 Myron Street until the next meeting. The motion to postpone passed." },
    ],
    publicComment: "Public comment on agenda items was included on the agenda.",
    actionItems: [
      "Tax recovery claim for Green Acres at Greenwood Hills, LLC - Outlot 1 denied",
      "Three airport ground lease actions approved: termination of Wynn O. Jones lease, new leases with Owen Jones and Cole Lundberg at 939 Woods Place",
      "2026 General Obligation Promissory Note for Capital Improvements forwarded to calendar for approval",
      "Budget carryover from 2025 to 2026 approved",
      "National Opioid Settlement participation postponed to next meeting",
      "Lead Service Line Replacement budget amendment postponed to next meeting",
      "Property purchases at Adolph Street and Myron Street postponed to next meeting",
    ],
    civicItems: [
      { number:"1", name:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"2", name:"Consideration of the minutes of the preceding meeting(s).", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Michael  Martens", "Vicki Tierney", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[], children:[
      { number:"a", name:"Regular Finance Committee Minutes", votes:[], docs:[{ name:"Finance_Regular_03102026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6495)" }], children:[] },
    ] },
      { number:"3", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Approving Alleged Claim for Recovery of Unlawful Tax for Green Acres at Greenwood Hills, LLC - Outlot 1.", votes:[{ motion:"approve the claim for recovery", passed:false, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:[], no:["Michael  Martens", "Vicki Tierney", "Sarah Watson", "Aaron Griner"], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6430)" }, { name:"Green Acres Claim for Recovery of Unlawful Tax", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6292)" }], children:[] },
      { number:"b", name:"Approving consent to transfer title to buildings and improvements and waiver of first right of refusal to purchase the buildings and improvements at 939 Woods Place.", votes:[{ motion:"approve the consent to transfer title to buildings", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Wynn O. Jones Airport Ground Lease", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6310)" }, { name:"Offer to Purchase", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6311)" }], children:[] },
      { number:"c", name:"Terminating Airport Ground Lease with Wynn O. Jones at 939 Woods Place.", votes:[{ motion:"approve", passed:true, initiator:"Vicki Tierney", seconder:"Sarah Watson", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Jones Termination of airport Ground Lease", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6454)" }], children:[] },
      { number:"d", name:"Approving Airport Ground Lease with Owen Jones at 939 Woods Place.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Owen Jones Airport Ground Lease", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6455)" }], children:[] },
      { number:"e", name:"Approving Airport Ground Lease with Cole Lundberg.", votes:[{ motion:"approve", passed:true, initiator:"Aaron Griner", seconder:"Sarah Watson", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Lundberg Ground Lease", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6488)" }, { name:"Lundberg Hangar Map", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6489)" }], children:[] },
      { number:"f", name:"Approving of and participating in the Six Remnant Defendants National Opioid Settlement Agreement.", votes:[{ motion:"postpone  to the next scheduled meeting", passed:true, initiator:"Aaron Griner", seconder:"Vicki Tierney", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Participation and Release Form", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6463)" }, { name:"Notice of New National Opioid Settlement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6464)" }, { name:"Opioid Settlement Overview", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6465)" }], children:[] },
      { number:"g", name:"Approving budget amendment for the Wausau Water Works for 2025 Lead Service Line Replacement project to cover costs not funded by the WDNR subsidized loan.", votes:[{ motion:"postpone consideration of this item to the next meeting", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6473)" }, { name:"WDNR LSL Funding Non-Construction Costs Determination", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6470)" }], children:[] },
      { number:"h", name:"Approving budget amendment for the carryover of funds from 2025 to 2026.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Carryover Funds for 2025 to 2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6565)" }], children:[] },
      { number:"i", name:"Review of 2025 Motor Pool Fund financial results and related budget amendment.", votes:[], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6560)" }, { name:"Motor Pool Income Statement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6561)" }], children:[] },
      { number:"j", name:"Approving 2026 General Obligation Promissory Note for Capital Improvements.", votes:[{ motion:"approve to the calendar", passed:true, initiator:"Sarah Watson", seconder:"Michael  Martens", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6564)" }], children:[] },
      { number:"k", name:"Review of 2025 General Fund Financial Results.", votes:[{ motion:"approve to transfer the funds", passed:true, initiator:"Vicki Tierney", seconder:"Sarah Watson", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6562)" }, { name:"General Fund Income Statement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6563)" }], children:[] },
      { number:"l", name:"Considering purchasing the following properties adding additional land to the Department of Public Works Streets Division:  108 Adolph Street, 112 Adolph Street, 112-1\/2 Adolph Street and 233 Myron Street.", votes:[{ motion:"postpone consideration the purchase of those properties until next meeting", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"lindman staff memo 12.11.25", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6490)" }, { name:"I&F mins 12.11.25", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6491)" }, { name:"Considering property purchases by DPW", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6493)" }, { name:"OwnerActivelySelling_DPWsite_Feb2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6494)" }, { name:"I&F mins 2.12.26", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6492)" }, { name:"233 Myron Street Phase I", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6466)" }], children:[] },
    ] },
      { number:"4", name:"Closed Session.", votes:[], docs:[], children:[
      { number:"a", name:"Adjourn to Closed Session pursuant to Wisconsin State Statute § 19.85(1)(e) for deliberating or negotiating the purchasing of public properties, the investing of public funds, or conducting other specified public business, whenever competitive or bargaining reasons require a closed session, for the purpose of purchasing the following properties adding additional land to the Department of Public Works Streets Division: 108 Adolph Street, 112 Adolph Street, 112-1\/2 Adolph Street and 233 Myron Street.", votes:[], docs:[], children:[] },
    ] },
      { number:"5", name:"Reconvene into Open Session, if necessary, to take action on Closed Session items.", votes:[], docs:[], children:[] },
      { number:"6", name:"Adjournment.", votes:[{ motion:"adjourn", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
,
  {
    id: "bb_734863", source: "school_board",
    title: "Committee of the Whole Meeting",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Committee of the Whole", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=734863",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=734863",
    isAgendaOnly: true,
    badge: "new",
    overview: "The Wausau School District Board of Education Committee of the Whole meeting covered facility fee updates for artificial fields, a referendum budget update, and an extensive policy review through NEOLA. The meeting included action items on the Wisconsin School Nutrition Purchasing Cooperative agreement and multiple policy revisions including new artificial intelligence and cell phone policies.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Approve the Minutes" },
      { time:"0:05", item:"Audit of the Bills" },
      { time:"0:08", item:"Excellence in Action: Stettin Elementary" },
      { time:"0:18", item:"Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP) (Action Requested)" },
      { time:"0:23", item:"Facility Fees (Action Requested)" },
      { time:"0:33", item:"Referendum Budget Update" },
      { time:"0:43", item:"NEOLA UPDATE (Action Requested)" },
      { time:"1:03", item:"ADJOURN" },
    ],
    discussions: [
      { item:"Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP)", body:"The Wausau School District Nutrition Service Department currently belongs to the Wisconsin School Nutrition Purchasing Cooperative. The WiSNP Co-op is requesting member districts to present the resolution to their respective School Boards for approval of continued membership for the 2026-2027 school year." },
      { item:"Facility Fees", body:"Ryan Urmanski, Director of Buildings and Grounds, will present information to amend the current Wausau School District Facility Use Fee Schedule to reflect the cost for use of artificial fields and field lighting for requested events. The Board is looking for approval to add the fee schedule immediately if agreed upon." },
      { item:"Referendum Budget Update", body:"Elizabeth Channel, Interim Assistant Superintendent of Operations, will share an update on the status of the Referendum Budget. This presentation is estimated to take 10 minutes." },
      { item:"NEOLA UPDATE", body:"The Committee will review proposed changes to numerous district policies, including some with technical corrections and others with more substantial changes. Key policies under review include those related to cell phones, artificial intelligence, reading instruction, student supervision and welfare under Act 57, and school support organizations." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Approve Wisconsin School Nutrition Purchasing Cooperative Agreement for 2026-2027 school year",
      "Approve amended Facility Fee Schedule for artificial fields and field lighting",
      "Review and approve NEOLA policy updates including definitions, board member conduct, reading instruction, cell phones, artificial intelligence, and Act 57 related policies",
      "Review and approve school support organization related policies",
      "Review and approve technical corrections to multiple policies",
    ],
  }
];
// END_MEETINGS_ARRAY — do not modify below this line programmatically

function useIsMobile() {
  const [m, setM] = useState(window.innerWidth < 700);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 700);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return m;
}

function getCommitteeStyle(committee) {
  return COMMITTEE_STYLES[committee] || { bg: "#555", text: "#fff" };
}

function MeetingCard({ meeting, onClick, active }) {
  const cs  = getCommitteeStyle(meeting.committee);
  const src = SOURCE_CONFIG[meeting.source];
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={() => onClick(meeting)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "block", width: "100%", textAlign: "left",
        background: active ? "#fffdf8" : hov ? `${src.accent}12` : "#fff",
        border: "none", cursor: "pointer",
        borderBottom: `1px solid ${RULE}`,
        borderLeft: active ? `4px solid ${src.accent}` : hov ? `4px solid ${src.accent}88` : "4px solid transparent",
        padding: 0, transition: "all 0.18s ease",
        transform: hov && !active ? "translateX(2px)" : "translateX(0)",
      }}
    >
      
      <div style={{
        background: cs.bg, padding: "4px 14px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          
          <span style={{
            fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif",
            fontSize: "9px", letterSpacing: "0.16em",
            background: "rgba(255,255,255,0.18)", color: "#fff",
            padding: "1px 5px", borderRadius: "1px",
          }}>{src.short}</span>
          <span style={{
            fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif",
            fontSize: "10px", letterSpacing: "0.16em", color: "rgba(255,255,255,0.85)",
          }}>{meeting.committee.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {meeting.isAgendaOnly && (
            <span style={{
              background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)",
              fontSize: "8px", fontWeight: 700,
              letterSpacing: "0.1em", padding: "1px 4px", borderRadius: "1px",
              border: "1px solid rgba(255,255,255,0.2)",
            }}>AGENDA ONLY</span>
          )}
          {meeting.badge && (
            <span style={{
              background: "#FFE566", color: "#111",
              fontSize: "9px", fontWeight: 900,
              letterSpacing: "0.12em", padding: "1px 5px", borderRadius: "1px",
            }}>NEW</span>
          )}
        </div>
      </div>

      
      <div style={{ padding: "10px 14px 12px", display: "flex", gap: "11px", alignItems: "flex-start" }}>

        
        <div style={{
          flexShrink: 0, width: "42px",
          border: `1px solid ${RULE}`,
          borderRadius: "4px",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
        }}>
          <div style={{
            background: src.accent,
            padding: "2px 0",
            textAlign: "center",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "9px", letterSpacing: "0.14em", color: "#fff",
          }}>{meeting.shortDate.split(" ")[0]}</div>
          <div style={{
            background: "#fff",
            padding: "3px 0 4px",
            textAlign: "center",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "22px", lineHeight: 1, color: INK, letterSpacing: "0.02em",
          }}>{meeting.shortDate.split(" ")[1]}</div>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "5px" }}>
            <div style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "13px", fontWeight: 700, color: INK,
              lineHeight: 1.25, flex: 1, minWidth: 0,
            }}>{meeting.title}</div>
            <img
              src={src.avatar}
              alt={src.label}
              style={{
                width: "22px", height: "22px",
                borderRadius: "50%",
                objectFit: "cover",
                flexShrink: 0,
                border: `1.5px solid ${src.accent}`,
                opacity: active || hov ? 1 : 0.75,
                transition: "opacity 0.15s",
              }}
            />
          </div>
          <div style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "11px", color: "#999" }}>
            > {meeting.duration}
          </div>
        </div>
      </div>
    </button>
  );
}

// ── Shared sub-components ────────────────────────────────────────────────────

function ColHead({ children, dark, accent }) {
  return (
    <div style={{
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "13px", letterSpacing: "0.2em",
      color: "#fff",
      background: dark ? "#1A1209" : (accent || "#4aaba7"),
      padding: "12px 14px",
      textAlign: "center",
    }}>{children}</div>
  );
}

function DocChips({ docs, accent }) {
  if (!docs || !docs.length) return null;
  const items = docs.map((doc, di) => {
    const docName = typeof doc === "string" ? doc : doc.name;
    const docUrl  = typeof doc === "string" ? null : doc.url;
    const chipStyle = {
      fontFamily: "'Bebas Neue', sans-serif", fontSize: "9px",
      letterSpacing: "0.1em", padding: "2px 7px",
      background: docUrl ? "#fff" : "#F7F3EC",
      color: docUrl ? (accent || "#4aaba7") : "#999",
      border: "1px solid " + (docUrl ? (accent || "#4aaba7") : "#E0D8CC"),
      display: "inline-block",
    };
    const chip = <span style={chipStyle}>{docName}</span>;
    if (docUrl) {
      return <a key={di} href={docUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>{chip}</a>;
    }
    return <span key={di}>{chip}</span>;
  });
  return <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "7px" }}>{items}</div>;
}

function VoteChip({ passed }) {
  return (
    <span style={{
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "10px", letterSpacing: "0.12em",
      padding: "2px 8px",
      background: passed ? "#1e5c2a" : "#7B2D2D",
      color: "#fff", flexShrink: 0,
    }}>{passed ? "PASSED" : "FAILED"}</span>
  );
}

function SummaryDetail({ meeting, onBack, isMobile }) {
  const [tab, setTab] = useState("summary");
  const cs  = getCommitteeStyle(meeting.committee);
  const src = SOURCE_CONFIG[meeting.source];

  const hasCivic = !!(meeting.civicItems && meeting.civicItems.length);

  const voteTab = hasCivic ? [{ id: "votes", label: "Votes" }] : [];
  const tabs = [
    { id: "summary",    label: "Summary"    },
    { id: "agenda",     label: "Agenda"     },
    { id: "discussion", label: "Discussion" },
    { id: "actions",    label: "Actions"    },
    ...voteTab,
    { id: "documents",  label: "Documents"  },
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>

      
      <div style={{ background: "#fff", position: "relative", overflow: "hidden", flexShrink: 0, borderBottom: `1px solid ${RULE}` }}>
        <div style={{ background: src.accent, height: "4px" }} />

        
        <div style={{
          position: "absolute", right: "-10px", bottom: "-18px",
          fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif",
          fontSize: isMobile ? "68px" : "90px",
          color: "rgba(0,0,0,0.04)", letterSpacing: "0.05em",
          whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none", lineHeight: 1,
        }}>{meeting.committee.toUpperCase()}</div>

        <div style={{ padding: isMobile ? "14px 18px 18px" : "20px 32px 22px", position: "relative" }}>
          {isMobile && (
            <button onClick={onBack} style={{
              background: "none", border: "none", cursor: "pointer",
              color: src.accent, fontFamily: "'Lora', Georgia, serif",
              fontSize: "12px", fontWeight: 600, padding: "0 0 12px",
            }}>{"<- All Meetings"}</button>
          )}

          
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", flexWrap: "wrap" }}>
            <span style={{
              background: src.accent,
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "10px", letterSpacing: "0.16em",
              color: "#fff", padding: "3px 8px",
            }}>{src.label.toUpperCase()}</span>
            <span style={{
              background: cs.bg,
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "10px", letterSpacing: "0.16em",
              color: "#fff", padding: "3px 8px",
            }}>{meeting.committee.toUpperCase()}</span>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "10px", letterSpacing: "0.12em", color: "#999",
            }}>{meeting.date.toUpperCase()}</span>
            <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "11px", color: "#999" }}>
              > {meeting.duration}
            </span>
            {meeting.badge && (
              <span style={{
                background: "#FFE566", color: "#111",
                fontSize: "9px", fontWeight: 900, letterSpacing: "0.12em", padding: "2px 6px",
              }}>NEW</span>
            )}
            {meeting.isAgendaOnly && (
              <span style={{
                background: "#F5E6C8", color: "#8B6914",
                fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", padding: "2px 6px",
                borderRadius: "1px",
              }}>AGENDA ONLY</span>
            )}
          </div>

          {meeting.isAgendaOnly && (
            <div style={{
              background: "#FFF8E7", borderLeft: "3px solid #D4A017",
              padding: "8px 12px", marginBottom: "10px",
              fontFamily: "'Source Sans 3', 'Source Sans Pro', sans-serif",
              fontSize: "12px", color: "#6B5A1E", lineHeight: 1.4,
            }}>
              This summary is based on the published agenda, not a recording of the meeting.
              It shows what was scheduled to be discussed, not necessarily what occurred or how votes were cast.
            </div>
          )}


          <a
            href={src.channel}
            target="_blank"
            rel="noreferrer"
            title={`${src.label} on YouTube`}
            style={{
              position: "absolute",
              top: isMobile ? "12px" : "16px",
              right: isMobile ? "14px" : "24px",
              lineHeight: 0, display: "block", zIndex: 2,
            }}
          >
            <img
              src={src.avatar}
              alt={src.label}
              style={{
                width: isMobile ? "56px" : "80px",
                height: isMobile ? "56px" : "80px",
                borderRadius: "50%",
                border: `2px solid ${src.accent}`,
                objectFit: "cover",
                display: "block",
                boxShadow: `0 0 0 3px #fff, 0 0 0 5px ${src.accent}`,
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={e => { e.target.style.transform="scale(1.08)"; e.target.style.boxShadow=`0 0 0 3px #fff, 0 0 0 6px ${src.accent}`; }}
              onMouseLeave={e => { e.target.style.transform="scale(1)";    e.target.style.boxShadow=`0 0 0 3px #fff, 0 0 0 5px ${src.accent}`; }}
              onError={e => { e.target.parentElement.style.display = "none"; }}
            />
          </a>

          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: isMobile ? "19px" : "24px",
            fontWeight: 700, color: INK,
            margin: "0 0 14px",
            lineHeight: 1.2,
            paddingRight: isMobile ? "56px" : "80px", // keep text clear of avatar
          }}>{meeting.title}</h2>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {meeting.url.includes("youtube.com") || meeting.url.includes("youtu.be") ? (
              <a href={meeting.url} target="_blank" rel="noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                background: src.accent, color: "#fff",
                fontFamily: "'Bebas Neue', sans-serif", fontSize: "11px", letterSpacing: "0.14em",
                padding: "7px 14px", textDecoration: "none", transition: "opacity 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity="0.8"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}
              > WATCH ON YOUTUBE</a>
            ) : (
              <a href={meeting.url} target="_blank" rel="noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                background: src.accent, color: "#fff",
                fontFamily: "'Bebas Neue', sans-serif", fontSize: "11px", letterSpacing: "0.14em",
                padding: "7px 14px", textDecoration: "none", transition: "opacity 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity="0.8"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}
              > VIEW AGENDA</a>
            )}
            {meeting.docUrl && (
              <a href={meeting.docUrl} target="_blank" rel="noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                border: `1px solid ${RULE}`, color: "#666",
                background: "#f5f3ef",
                fontFamily: "'Bebas Neue', sans-serif", fontSize: "11px", letterSpacing: "0.14em",
                padding: "7px 14px", textDecoration: "none", transition: "all 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="#999"; e.currentTarget.style.color=INK; e.currentTarget.style.background="#eee"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=RULE; e.currentTarget.style.color="#666"; e.currentTarget.style.background="#f5f3ef"; }}
              > AGENDA & PACKET</a>
            )}
          </div>
        </div>
      </div>

      
      <div style={{
        display: "flex", background: CREAM, borderBottom: `2px solid ${RULE}`,
        overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", flexShrink: 0,
        padding: "10px 12px 0", gap: "4px",
      }}>
        {tabs.map(t => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              onMouseEnter={e => {
                if (!active) {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.color = src.accent;
                  e.currentTarget.style.borderColor = src.accent;
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#999";
                  e.currentTarget.style.borderColor = RULE;
                }
              }}
              style={{
                cursor: "pointer",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.14em",
                padding: isMobile ? "7px 11px" : "8px 16px",
                whiteSpace: "nowrap",
                transition: "all 0.15s",
                background:   active ? src.accent : "transparent",
                color:        active ? "#fff" : "#999",
                border:       `1px solid ${active ? src.accent : RULE}`,
                borderBottom: active ? `1px solid ${src.accent}` : `1px solid ${RULE}`,
                marginBottom: active ? "-2px" : "0",
                position: "relative",
              }}
            >{t.label.toUpperCase()}</button>
          );
        })}
      </div>

      
      <div style={{
        flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch",
        background: CREAM, padding: isMobile ? "20px 18px 40px" : "26px 32px 40px",
      }}>

        {tab === "summary" && <>
          <div style={{ borderLeft: `4px solid ${src.accent}`, paddingLeft: "20px", marginBottom: "26px" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "10px", letterSpacing: "0.18em", color: src.accent, marginBottom: "8px" }}>MEETING OVERVIEW</div>
            <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "15px", lineHeight: 1.8, color: INK, margin: 0, fontStyle: "italic" }}>{meeting.overview}</p>
              {meeting.isAgendaOnly && (
                <div style={{
                  background: "#fffbea", border: "1px solid #e8d87a",
                  padding: "8px 14px", marginTop: "16px",
                  fontFamily: "'Source Sans 3', sans-serif", fontSize: "12px",
                  color: "#7a6a00", letterSpacing: "0.03em",
                }}>
                  <strong>AGENDA PREVIEW ONLY</strong> - This summary reflects the published agenda. Actual votes, decisions, and discussion outcomes may differ. A full transcript-based summary will be available once video captions are processed.
                </div>
              )}
          </div>
          <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: "22px" }}>
            <div style={labelStyle}>Public Comment</div>
            <p style={bodyStyle}>{meeting.publicComment}</p>
          </div>
        </>}

        {tab === "agenda" && <>
          <div style={labelStyle}>Agenda Items</div>
          <div style={{ marginTop: "4px" }}>
            {meeting.agenda.map((entry, i) => {
              const toSec = t => { const p = t.split(":").map(Number); return p.length === 3 ? p[0]*3600+p[1]*60+p[2] : p[0]*60+p[1]; };
              const vid = meeting.url.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{11})/)?.[1];
              const hasTimestamp = entry.time && entry.time !== "N/A" && vid;
              const ytUrl = hasTimestamp ? `https://www.youtube.com/watch?v=${vid}&t=${toSec(entry.time)}s` : null;
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "11px 0", borderBottom: `1px solid ${RULE}` }}>
                  {hasTimestamp ? (
                    <a href={ytUrl} target="_blank" rel="noreferrer" title={`Watch at ${entry.time}`}
                      style={{
                        fontFamily: "monospace", fontSize: "11px", fontWeight: 700,
                        color: src.accent, minWidth: "50px", textAlign: "right",
                        flexShrink: 0, textDecoration: "none",
                        borderBottom: `1px dashed ${src.accent}`,
                        lineHeight: 1, paddingTop: "3px", transition: "opacity 0.15s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity="0.6"}
                      onMouseLeave={e => e.currentTarget.style.opacity="1"}
                    >{entry.time}</a>
                  ) : (
                    <span style={{
                      fontFamily: "monospace", fontSize: "11px",
                      color: "#ccc", minWidth: "50px", textAlign: "right",
                      flexShrink: 0, lineHeight: 1, paddingTop: "3px",
                    }}>--:--</span>
                  )}
                  <div style={{ width: "6px", height: "6px", minWidth: "6px", borderRadius: "50%", background: src.accent, marginTop: "5px", flexShrink: 0 }} />
                  <span style={bodyStyle}>{entry.item}</span>
                </div>
              );
            })}
          </div>
        </>}

        {tab === "discussion" && meeting.discussions.map((d, i) => (
          <div key={i} style={{ marginBottom: "26px" }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "15px", fontWeight: 700, color: INK, margin: "0 0 10px", paddingBottom: "7px", borderBottom: `2px solid ${RULE}` }}>{d.item}</div>
            <p style={bodyStyle}>{d.body}</p>
          </div>
        ))}

        {tab === "actions" && (() => {
          const topics = meeting.civicItems
            ? meeting.civicItems
                .filter(it => it.number !== "1" && !it.name.toLowerCase().startsWith("adjournment"))
                .flatMap(it => it.children && it.children.length ? it.children : [it])
                .filter(it => !it.name.toLowerCase().includes("minutes of the preceding") && !it.name.toLowerCase().startsWith("adjournment"))
            : meeting.discussions.map((d, i) => ({ number: String(i + 1), name: d.item, docs: [] }));

          const actions = meeting.actionItems;

          return (
            <div style={{ border: `1px solid ${RULE}`, overflow: "hidden" }}>

              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <ColHead accent={src.accent}>Topics Discussed</ColHead>
                <div style={{ borderLeft: `1px solid #333` }}>
                  <ColHead dark accent={src.accent}>{"Actions & Next Steps"}</ColHead>
                </div>
              </div>

              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: `1px solid ${RULE}` }}>

                
                <div style={{ borderRight: `1px solid ${RULE}` }}>
                  {topics.map((topic, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "12px 14px",
                        borderBottom: i < topics.length - 1 ? `1px solid ${RULE}` : "none",
                        background: i % 2 === 0 ? "#fff" : CREAM,
                        cursor: "default",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = `${src.accent}18`}
                      onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#fff" : CREAM}
                    >
                      <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                        <span style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: "10px", letterSpacing: "0.08em",
                          color: src.accent, flexShrink: 0,
                          paddingTop: "2px", minWidth: "20px",
                        }}>{topic.number}</span>
                        <span style={{
                          fontFamily: "'Lora', Georgia, serif",
                          fontSize: "13px", lineHeight: 1.6, color: INK,
                        }}>{topic.name}</span>
                      </div>
                      <DocChips docs={topic.docs} accent={src.accent} />
                    </div>
                  ))}
                </div>

                
                <div>
                  {actions.map((action, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "12px 14px",
                        borderBottom: i < actions.length - 1 ? `1px solid ${RULE}` : "none",
                        background: i % 2 === 0 ? "#fff" : CREAM,
                        cursor: "default",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = `${src.accent}18`}
                      onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#fff" : CREAM}
                    >
                      <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          width: "18px", height: "18px", minWidth: "18px",
                          background: src.accent, color: "#fff", borderRadius: "50%",
                          fontFamily: "'Bebas Neue', sans-serif", fontSize: "10px",
                          marginTop: "2px", flexShrink: 0,
                        }}>{i + 1}</span>
                        <span style={{
                          fontFamily: "'Lora', Georgia, serif",
                          fontSize: "13px", lineHeight: 1.6, color: INK,
                        }}>{action}</span>
                      </div>
                    </div>
                  ))}
                  {actions.length === 0 && (
                    <div style={{ padding: "16px 14px", fontFamily: "'Lora', Georgia, serif", fontSize: "13px", color: "#bbb", fontStyle: "italic" }}>
                      No formal actions recorded.
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })()}

        {tab === "votes" && hasCivic && (() => {
          const VoteBar = ({ votes, label, color }) => {
            if (!votes.length) return null;
            return (
              <div style={{ flex: 1 }}>
                <div style={{
                  background: color, padding: "5px 10px", marginBottom: "6px",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "11px", letterSpacing: "0.12em", color: "#fff",
                  textAlign: "center",
                }}>{label}</div>
                <div style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "28px", fontWeight: 700, textAlign: "center",
                  color: INK, lineHeight: 1,
                }}>{votes.length}</div>
                <div style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "10px", color: "#888", marginTop: "8px", lineHeight: 1.6,
                  textAlign: "center",
                }}>
                  {votes.map((n, i) => <div key={i}>{n.trim()}</div>)}
                </div>
              </div>
            );
          };

          const isPublicCommentItem = (item) =>
            item.name.toLowerCase().startsWith("public comment");

          const renderItem = (item, depth = 0) => {
            const hasVotes    = item.votes && item.votes.length > 0;
            const hasDocs     = item.docs  && item.docs.length  > 0;
            const hasChildren = item.children && item.children.length > 0;
            const isPublicComment = isPublicCommentItem(item);
            const isEmpty = !hasVotes && !hasDocs && !hasChildren && !isPublicComment;

            return (
              <div key={item.number} style={{ marginBottom: depth === 0 ? "20px" : "14px" }}>
                
                <div style={{
                  display: "flex", alignItems: "flex-start", gap: "10px",
                  padding: depth === 0 ? "10px 0 8px" : "6px 0 4px",
                  borderTop: depth === 0 ? `2px solid ${RULE}` : "none",
                }}>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "12px", letterSpacing: "0.1em",
                    color: src.accent, flexShrink: 0, minWidth: "24px",
                    paddingTop: "1px",
                  }}>{item.number}</span>
                  <div style={{ flex: 1 }}>
                    <span style={{
                      fontFamily: depth === 0 ? "'Playfair Display', Georgia, serif" : "'Lora', Georgia, serif",
                      fontSize: depth === 0 ? "14px" : "13px",
                      fontWeight: depth === 0 ? 700 : 400,
                      color: isEmpty ? "#ccc" : INK,
                      fontStyle: "normal",
                      lineHeight: 1.4,
                    }}>{item.name ? item.name.replace(/<[^>]*>/g, "") : ""}</span>
                  </div>
                </div>

                
                {isPublicComment && meeting.publicComment && (
                  <div style={{
                    marginLeft: "28px", marginBottom: "10px",
                    padding: "12px 16px",
                    background: "#fff",
                    border: `1px solid ${RULE}`,
                    borderLeft: `4px solid ${src.accent}`,
                  }}>
                    <div style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "9px", letterSpacing: "0.16em",
                      color: src.accent, marginBottom: "7px",
                    }}>PUBLIC COMMENT</div>
                    <p style={{
                      fontFamily: "'Lora', Georgia, serif",
                      fontSize: "13px", lineHeight: 1.75,
                      color: INK, margin: 0,
                    }}>{meeting.publicComment}</p>
                  </div>
                )}

                
                {item.votes.map((v, vi) => (
                  <div key={vi} style={{
                    marginLeft: depth === 0 ? "0" : "28px",
                    marginBottom: "12px",
                    background: "#fff",
                    border: `1px solid ${RULE}`,
                    borderLeft: `4px solid ${v.passed ? "#1e5c2a" : "#7B2D2D"}`,
                  }}>
                    
                    <div style={{
                      padding: "10px 14px 8px",
                      borderBottom: `1px solid ${RULE}`,
                      display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap",
                    }}>
                      <VoteChip passed={v.passed} />
                      <span style={{
                        fontFamily: "'Lora', Georgia, serif",
                        fontSize: "13px", fontWeight: 600, color: INK,
                        fontStyle: "italic", flex: 1,
                      }}>Motion: {v.motion}</span>
                    </div>
                    
                    <div style={{
                      padding: "7px 14px 8px",
                      borderBottom: `1px solid ${RULE}`,
                      fontFamily: "'Lora', Georgia, serif",
                      fontSize: "12px", color: "#666",
                    }}>
                      Initiated by <strong style={{color: INK}}>{v.initiator}</strong>
                      {v.seconder && <>, seconded by <strong style={{color: INK}}>{v.seconder}</strong></>}
                    </div>
                    
                    <div style={{ display: "flex", gap: "1px", padding: "12px 14px" }}>
                      <VoteBar votes={v.yes}     label="Yes"     color="#2D5A3D" />
                      {(v.no.length > 0 || v.yes.length > 0) && (
                        <VoteBar votes={v.no.length ? v.no : []} label="No" color="#7B2D2D" />
                      )}
                      {v.abstain && v.abstain.length > 0 && (
                        <VoteBar votes={v.abstain} label="Abstain" color="#8a7a2a" />
                      )}
                      {v.no.length === 0 && (
                        <div style={{ flex: 1, textAlign: "center" }}>
                          <div style={{ background: "#7B2D2D", padding: "5px 10px", marginBottom: "6px", fontFamily: "'Bebas Neue', sans-serif", fontSize: "11px", letterSpacing: "0.12em", color: "#fff" }}>No</div>
                          <div style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "28px", fontWeight: 700, color: "#ccc" }}>0</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                
                {hasDocs && (
                  <div style={{
                    marginLeft: depth === 0 ? "0" : "28px",
                    marginBottom: "8px",
                    display: "flex", flexWrap: "wrap", gap: "6px",
                  }}>
                    {item.docs.map((doc, di) => {
                      const docName = typeof doc === "string" ? doc : doc.name;
                      const docUrl  = typeof doc === "string" ? null : doc.url;
                      const chip = (
                        <span style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: "9px", letterSpacing: "0.1em",
                          background: docUrl ? "#fff" : CREAM,
                          color: docUrl ? src.accent : "#888",
                          border: `1px solid ${docUrl ? src.accent : RULE}`,
                          padding: "3px 8px",
                          display: "inline-flex", alignItems: "center", gap: "4px",
                          transition: "all 0.15s",
                        }}>
                           {docName}
                        </span>
                      );
                      return docUrl ? (
                        <a key={di} href={docUrl} target="_blank" rel="noreferrer"
                          style={{ textDecoration: "none" }}
                          onMouseEnter={e => e.currentTarget.querySelector("span").style.background = "#fef0ee"}
                          onMouseLeave={e => e.currentTarget.querySelector("span").style.background = "#fff"}
                        >{chip}</a>
                      ) : (
                        <span key={di}>{chip}</span>
                      );
                    })}
                  </div>
                )}

                
                {hasChildren && (
                  <div style={{ marginLeft: depth === 0 ? "14px" : "28px" }}>
                    {item.children.map(child => renderItem(child, depth + 1))}
                  </div>
                )}
              </div>
            );
          };

          return (
            <>
              <div style={{ ...labelStyle, marginBottom: "16px" }}>
                Motions & Votes - Sourced from{" "}
                <a href="https://wausauwi.portal.civicclerk.com" target="_blank" rel="noreferrer"
                  style={{ color: src.accent, textDecoration: "none", fontWeight: 600 }}>
                  CivicClerk
                </a>
              </div>
              {meeting.civicItems.map(item => renderItem(item, 0))}
            </>
          );
        })()}

                {tab === "documents" && <>
          <div style={labelStyle}>Official Documents</div>
          <p style={{ ...bodyStyle, color: "#777", marginBottom: "18px", marginTop: "4px" }}>
            Published by {SOURCE_CONFIG[meeting.source].label} and linked from the meeting's YouTube description.
          </p>
          {meeting.docUrl ? (
            <a href={meeting.docUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "16px",
                padding: "16px 18px", background: "#fff",
                border: `1px solid ${RULE}`, borderLeft: `4px solid ${src.accent}`,
                transition: "box-shadow 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.08)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow="none"}
              >
                <span style={{ fontSize: "26px", lineHeight: 1 }}></span>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "14px", fontWeight: 700, color: INK, marginBottom: "3px" }}>{"Meeting Agenda & Packet"}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "10px", letterSpacing: "0.12em", color: src.accent }}>
                    {SOURCE_CONFIG[meeting.source].docHost.toUpperCase()} -> VIEW PDF >
                  </div>
                </div>
              </div>
            </a>
          ) : (
            <p style={{ ...bodyStyle, color: "#aaa", fontStyle: "italic" }}>No documents linked for this meeting.</p>
          )}
        </>}
      </div>
    </div>
  );
}

const labelStyle = { fontFamily: "'Bebas Neue', sans-serif", fontSize: "10px", letterSpacing: "0.18em", color: "#999", marginBottom: "12px", paddingBottom: "5px", borderBottom: `1px solid ${RULE}` };
const bodyStyle  = { fontFamily: "'Lora', Georgia, serif", fontSize: "14px", lineHeight: 1.8, color: "#2A2015", margin: 0 };

const MARATHON_UPCOMING = [
  { date:"2026-04-02", time:"5:00 PM", name:"Health & Human Services Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-04-08", time:"5:00 PM", name:"Extension, Education & Econ Dev Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-04-09", time:"3:00 PM", name:"Executive Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-04-09", time:"5:00 PM", name:"Infrastructure Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-04-14", time:"5:00 PM", name:"Public Safety Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-04-16", time:"5:00 PM", name:"HR, Finance & Property Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-04-28", time:"5:00 PM", name:"Environmental Resources Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-04-28", time:"7:00 PM", name:"County Board Meeting", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-05-07", time:"5:00 PM", name:"Health & Human Services Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-05-12", time:"5:00 PM", name:"Public Safety Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-05-13", time:"5:00 PM", name:"Extension, Education & Econ Dev Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-05-14", time:"3:00 PM", name:"Executive Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-05-14", time:"5:00 PM", name:"Infrastructure Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-05-21", time:"5:00 PM", name:"HR, Finance & Property Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-05-26", time:"5:00 PM", name:"Environmental Resources Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-05-26", time:"7:00 PM", name:"County Board Meeting", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
];

const SCHOOL_BOARD_UPCOMING = [
  { date:"2026-04-13", time:"3:00 PM", name:"Special Meeting", url:"https://meetings.boardbook.org/Public/Agenda/1360?meeting=738313", source:"school_board" },
  { date:"2026-04-13", time:"5:00 PM", name:"Regular Board Meeting", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-04-27", time:"5:00 PM", name:"Education & Operations Committee", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-05-11", time:"5:00 PM", name:"Regular Board Meeting", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-05-25", time:"5:00 PM", name:"Education & Operations Committee", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
];

const WAUSAU_UPCOMING = [
  { date:"2026-04-02", time:"5:00 PM", name:"Sustainability, Energy & Environment Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2167/overview", source:"wausau" },
  { date:"2026-04-06", time:"5:45 PM", name:"Economic Development Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1990/overview", source:"wausau" },
  { date:"2026-04-08", time:"10:00 AM", name:"Board of Public Works Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2292/overview", source:"wausau" },
  { date:"2026-04-08", time:"11:00 AM", name:"Water Works Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2190/overview", source:"wausau" },
  { date:"2026-04-08", time:"6:00 PM", name:"Airport Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1951/overview", source:"wausau" },
  { date:"2026-04-09", time:"5:15 PM", name:"Infrastructure & Facilities Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2042/overview", source:"wausau" },
  { date:"2026-04-13", time:"4:45 PM", name:"Human Resources Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2028/overview", source:"wausau" },
  { date:"2026-04-13", time:"4:45 PM", name:"One Time Event", url:"https://wausauwi.portal.civicclerk.com/event/2294/overview", source:"wausau" },
  { date:"2026-04-14", time:"10:30 AM", name:"Board of Public Works Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2293/overview", source:"wausau" },
  { date:"2026-04-14", time:"5:15 PM", name:"Finance Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2003/overview", source:"wausau" },
  { date:"2026-04-14", time:"6:30 PM", name:"Common Council Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1964/overview", source:"wausau" },
];

const WESTON_UPCOMING = [
  { date:"2026-04-06", time:"6:00 PM", name:"Community Life & Public Safety Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-04-13", time:"6:00 PM", name:"Plan Commission", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-04-13", time:"6:00 PM", name:"Public Works Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-04-14", time:"6:00 PM", name:"S.A.F.E.R. Board of Directors", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-04-16", time:"6:00 PM", name:"Mountain Bay Metro Police Oversight", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-04-20", time:"5:30 PM", name:"Finance & Human Resources Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-04-20", time:"6:00 PM", name:"Board of Trustees", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-04-27", time:"6:00 PM", name:"Parks & Recreation Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-05-04", time:"6:00 PM", name:"Community Life & Public Safety Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-05-11", time:"6:00 PM", name:"Plan Commission", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-05-11", time:"6:00 PM", name:"Public Works Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-05-12", time:"6:00 PM", name:"S.A.F.E.R. Board of Directors", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-05-18", time:"5:30 PM", name:"Finance & Human Resources Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-05-18", time:"6:00 PM", name:"Board of Trustees", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-05-21", time:"6:00 PM", name:"Mountain Bay Metro Police Oversight", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-05-25", time:"6:00 PM", name:"Parks & Recreation Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
];

function UpcomingMeetings({ isMobile }) {
  const [upFilter, setUpFilter]       = useState("all");
  const [calOpen,  setCalOpen]        = useState(null);  // ev key with open dropdown
  const today = new Date().toISOString().split("T")[0];

  const allUpcoming = [
    ...(upFilter === "all" || upFilter === "marathon"     ? MARATHON_UPCOMING     : []),
    ...(upFilter === "all" || upFilter === "wausau"       ? WAUSAU_UPCOMING       : []),
    ...(upFilter === "all" || upFilter === "weston"       ? WESTON_UPCOMING       : []),
    ...(upFilter === "all" || upFilter === "school_board" ? SCHOOL_BOARD_UPCOMING : []),
  ]
    .filter(e => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  const loading = false;
  const fetchError = false;
  const grouped = allUpcoming.reduce((acc, ev) => {
    const key = ev.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(ev);
    return acc;
  }, {});

  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const dateLabel = (dateStr) => {
    if (dateStr === today) return "TODAY";
    if (dateStr === tomorrow) return "TOMORROW";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }).toUpperCase();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>

      
      <div style={{ padding: "12px 14px 10px", borderBottom: `2px solid ${RULE}`, background: CREAM }}>

        
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "10px" }}>
          {[
            { key: "all",          label: "All Sources",     color: INK,                              avatar: null },
            { key: "marathon",     label: "Marathon County", color: SOURCE_CONFIG.marathon.accent,     avatar: SOURCE_CONFIG.marathon.avatar     },
            { key: "wausau",       label: "Wausau",          color: SOURCE_CONFIG.wausau.accent,       avatar: SOURCE_CONFIG.wausau.avatar       },
            { key: "weston",       label: "Weston",          color: SOURCE_CONFIG.weston.accent,       avatar: SOURCE_CONFIG.weston.avatar       },
            { key: "school_board", label: "School Board",    color: SOURCE_CONFIG.school_board.accent, avatar: SOURCE_CONFIG.school_board.avatar },
          ].map(({ key, label, color, avatar }) => {
            const active = upFilter === key;
            return (
              <button
                key={key}
                onClick={() => setUpFilter(key)}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = `${color}15`; e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#d0ccc4"; e.currentTarget.style.color = "#888"; }}}
                style={{
                  background:    active ? color : "transparent",
                  border:        `1.5px solid ${active ? color : "#d0ccc4"}`,
                  color:         active ? "#fff" : "#888",
                  fontFamily:    "'Bebas Neue', sans-serif",
                  fontSize:      "12px",
                  letterSpacing: "0.12em",
                  padding:       "6px 13px",
                  cursor:        "pointer",
                  transition:    "all 0.15s",
                  display:       "flex", alignItems: "center", gap: "7px",
                  whiteSpace:    "nowrap",
                }}
              >
                {avatar && (
                  <img
                    src={avatar}
                    alt={label}
                    style={{
                      width: "18px", height: "18px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      flexShrink: 0,
                      opacity: active ? 1 : 0.7,
                      border: active ? "1.5px solid rgba(255,255,255,0.5)" : "1.5px solid transparent",
                      transition: "opacity 0.15s",
                    }}
                  />
                )}
                {label}
              </button>
            );
          })}
        </div>

        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "10px", letterSpacing: "0.12em",
            color: "#aaa", display: "flex", alignItems: "center", gap: "6px",
          }}>
            <span style={{ color: TEAL, fontSize: "11px" }}></span>
            {allUpcoming.length} MEETINGS SCHEDULED
          </div>
          <a href="https://www.marathoncounty.gov/about-us/county-calendar" target="_blank" rel="noreferrer"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "10px", letterSpacing: "0.12em",
              color: TEAL, textDecoration: "none",
              display: "flex", alignItems: "center", gap: "4px",
            }}>
            FULL CALENDARS <span style={{ fontSize: "11px" }}>></span>
          </a>
        </div>
      </div>

      
      <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }} onClick={e => { if (calOpen) setCalOpen(null); }}>
        {Object.entries(grouped).slice(0, 12).map(([date, events]) => {
          const isToday    = date === today;
          const isTomorrow = date === tomorrow;
          const isImminent = isToday || isTomorrow;

          return (
            <div key={date}>
              
              <div style={{
                padding: "14px 14px 10px",
                background: CREAM,
                position: "relative",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                
                <div style={{
                  position: "absolute", left: "14px", right: "14px",
                  top: "50%", height: "1px",
                  background: isImminent ? INK : "#ccc",
                }} />
                
                <span style={{
                  position: "relative",
                  fontFamily:    "'Bebas Neue', sans-serif",
                  fontSize:      isImminent ? "13px" : "12px",
                  letterSpacing: "0.2em",
                  color:         isImminent ? "#fff" : INK,
                  background:    isImminent ? INK : CREAM,
                  padding:       "3px 12px",
                }}>{dateLabel(date)}</span>
              </div>

              
              {events.map((ev, i) => {
                const src = SOURCE_CONFIG[ev.source];
                const evKey  = `${ev.date}-${i}`;
                const isOpen = calOpen === evKey;
                const evSrc  = SOURCE_CONFIG[ev.source];
                const evName = encodeURIComponent(ev.name);
                const evOrg  = evSrc ? evSrc.label : "";
                const evDesc = encodeURIComponent(ev.name + " - " + evOrg);
                const calcUrls = () => {
                  let h = 0; let m = 0;
                  if (ev.time) {
                    const tp = ev.time.split(":");
                    h = parseInt(tp[0], 10);
                    const ms = tp[1] ? tp[1].split(" ") : ["00","AM"];
                    m = parseInt(ms[0], 10);
                    const ap = (ms[1] || (ev.time.indexOf("PM") > -1 ? "PM" : "AM")).toUpperCase();
                    if (ap === "PM" && h !== 12) h += 12;
                    if (ap === "AM" && h === 12) h = 0;
                  }
                  const et = h * 60 + m + 90;
                  const eh = Math.floor(et / 60);
                  const em = et % 60;
                  const pad = (n) => (n < 10 ? "0" : "") + n;
                  const dd = ev.date.split("-").join("");
                  if (!ev.time) {
                    return {
                      google:  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + evName + "&dates=" + dd + "/" + dd + "&details=" + evDesc,
                      outlook: "https://outlook.live.com/calendar/0/addevent?subject=" + evName + "&startdt=" + ev.date + "&enddt=" + ev.date + "&body=" + evDesc + "&allday=true",
                    };
                  }
                  const gS = dd + "T" + pad(h) + pad(m) + "00";
                  const gE = dd + "T" + pad(eh) + pad(em) + "00";
                  const oS = ev.date + "T" + pad(h) + ":" + pad(m) + ":00";
                  const oE = ev.date + "T" + pad(eh) + ":" + pad(em) + ":00";
                  return {
                    google:  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + evName + "&dates=" + gS + "/" + gE + "&details=" + evDesc,
                    outlook: "https://outlook.live.com/calendar/0/addevent?subject=" + evName + "&startdt=" + oS + "&enddt=" + oE + "&body=" + evDesc,
                  };
                };
                const urls = calcUrls();
                return (
                      <div key={i} style={{ position: "relative" }}>
                        
                        <a href={ev.url} target="_blank" rel="noreferrer"
                          style={{ textDecoration: "none", display: "block" }}>
                          <div
                            style={{
                              padding: "10px 14px",
                              borderBottom: `1px solid ${RULE}`,
                              background: isOpen ? `${src.accent}12` : "#fff",
                              display: "flex", alignItems: "center", gap: "10px",
                              transition: "background 0.12s",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = `${src.accent}12`; }}
                            onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = "#fff"; }}
                          >
                            
                            <img
                              src={src.avatar}
                              alt={src.label}
                              style={{
                                width: "28px", height: "28px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                flexShrink: 0,
                                border: `1.5px solid ${src.accent}`,
                              }}
                            />

                            
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontSize: "13px", fontWeight: 600,
                                color: INK, lineHeight: 1.3,
                                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                              }}>{ev.name}</div>
                              <div style={{
                                display: "flex", alignItems: "center", gap: "6px", marginTop: "3px",
                              }}>
                                {ev.time && (
                                  <span style={{
                                    fontFamily: "'Bebas Neue', sans-serif",
                                    fontSize: "10px", letterSpacing: "0.1em", color: "#999",
                                  }}> {ev.time}</span>
                                )}
                                <span style={{
                                  fontFamily: "'Bebas Neue', sans-serif",
                                  fontSize: "10px", letterSpacing: "0.1em",
                                  color: src.accent, fontWeight: 600,
                                }}>{src.label}</span>
                              </div>
                            </div>

                            
                            <span style={{ color: "#ccc", fontSize: "14px", flexShrink: 0 }}>></span>
                          </div>
                        </a>

                        
                        <button
                          onClick={e => { e.stopPropagation(); setCalOpen(isOpen ? null : evKey); }}
                          style={{
                            position: "absolute",
                            right: "32px", top: "50%", transform: "translateY(-50%)",
                            background: isOpen ? src.accent : "transparent",
                            border: `1px solid ${isOpen ? src.accent : "#ddd"}`,
                            color: isOpen ? "#fff" : "#aaa",
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: "9px", letterSpacing: "0.1em",
                            padding: "3px 7px",
                            cursor: "pointer",
                            transition: "all 0.15s",
                            zIndex: 2,
                            display: "flex", alignItems: "center", gap: "4px",
                          }}
                          onMouseEnter={e => { if (!isOpen) { e.currentTarget.style.borderColor = src.accent; e.currentTarget.style.color = src.accent; }}}
                          onMouseLeave={e => { if (!isOpen) { e.currentTarget.style.borderColor = "#ddd"; e.currentTarget.style.color = "#aaa"; }}}
                          title="Add to calendar"
                        >
                          
                        </button>

                        
                        {isOpen && (
                          <div style={{
                            position: "absolute",
                            right: "14px", top: "calc(100% - 1px)",
                            background: "#fff",
                            border: `1px solid ${RULE}`,
                            borderTop: `2px solid ${src.accent}`,
                            zIndex: 100,
                            minWidth: "160px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}>
                            <div style={{
                              fontFamily: "'Bebas Neue', sans-serif",
                              fontSize: "9px", letterSpacing: "0.14em",
                              color: "#aaa", padding: "7px 12px 5px",
                              borderBottom: `1px solid ${RULE}`,
                            }}>ADD TO CALENDAR</div>
                            {[
                              { label: "Google Calendar",      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAqFBMVEVHcEz7+/v+/v709PX////7+/v09fX4+Pj////8/Pz7+/v////z+PP29vf09PX////+/v7///////////83qlfrQzPsTkFHiPUlpkszf/RAhfX6uwD8wBLW4vyQs/j96N3/+vPh8eR8wJiHrfjylpBhuXftX0rR6Nb608j0qKNwofBKsGWzy/rzn5n0o57uc2/94J78zFb3u7es1rC6z/rHuTCVsC08ooagt3gtAAAAE3RSTlMA08Eb4kVwOqb5kV7jkn8NfnFw9v5R3wAAAVtJREFUOI2dU9lywjAMTIAchgmljU3sJBRycRZoocf//1ltyZ4cpi/dl0jeHWllxY7TxVPgecGT8weCkMQAEgaP6EncwcSShPEAYZ+fDHlZ5BG/P9T1YW8rRnhyYRoXzEeGn0G6XrKlBmNrOJppAVZnmpNftt1gDeSfVbhhwNa3W83Y1hh9aR1eFX/G43N/kjEYyCR/sGcdG4vvWb692jzYnKrgI88znL96RVQrlU3NJWdSgM5FihBv5sKHggSR9gW5FKx1BSGUSHwawQI8ZHl2B8FK4ZgmAjwspMDDKb4obc2nsgIEnrnpzTeltDF8lSbpsb1r2OWdS8Vpp8KiVAWgA+4TesSNFFBOm+bE+U8iqraD47gqJidVQ4NjA1eve4ydS6PgvGw3AfAxL0oOKAvM/fafi4z/YrcrTBx1/9q5vcj54N2QPk3sx+V3JMS3aKgSuUTCjR49zf/jF+G2OgtU1MugAAAAAElFTkSuQmCC",  href: urls.google  },
                              { label: "Outlook / Office 365", icon: "data:image/png;base64,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", href: urls.outlook },
                            ].map(opt => (
                              <a
                                key={opt.label}
                                href={opt.href}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => setCalOpen(null)}
                                style={{
                                  display: "flex", alignItems: "center", gap: "8px",
                                  padding: "9px 12px",
                                  textDecoration: "none",
                                  borderBottom: `1px solid ${RULE}`,
                                  transition: "background 0.1s",
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = CREAM}
                                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                              >
                                <img src={opt.icon} alt={opt.label} style={{ width: "16px", height: "16px", flexShrink: 0 }} />
                                <span style={{
                                  fontFamily: "'Bebas Neue', sans-serif",
                                  fontSize: "10px", letterSpacing: "0.1em",
                                  color: INK,
                                }}>{opt.label}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const isMobile = useIsMobile();
  const [selected,    setSelected]    = useState(null);
  const [search,      setSearch]      = useState("");
  const [sourceFilter, setSourceFilter] = useState("all"); // "all" | "marathon" | "wausau"
  const [panelTab,     setPanelTab]     = useState("recent"); // "recent" | "upcoming"

  useEffect(() => {
    if (!isMobile && !selected) setSelected(MEETINGS[0]);
  }, [isMobile]);

  const parseDate = (d) => new Date(d);

  const filtered = MEETINGS
    .filter(m => {
      const matchSource = sourceFilter === "all" || m.source === sourceFilter;
      const matchSearch = [m.title, m.committee, m.date]
        .some(s => s.toLowerCase().includes(search.toLowerCase()));
      return matchSource && matchSearch;
    })
    .sort((a, b) => parseDate(b.date) - parseDate(a.date));

  const showList   = !isMobile || !selected;
  const showDetail = !isMobile || !!selected;
  const newCount   = MEETINGS.filter(m => m.badge).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:wght@700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
        body { background: ${CREAM}; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 2px; }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>

        
        <div style={{ background: TEAL, flexShrink: 0, borderBottom: `3px solid #1a5c57` }}>
          <div style={{
            padding: isMobile ? "10px 16px 10px" : "12px 24px 12px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
          }}>
            <a href="https://wausaupilotandreview.com" target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "14px", textDecoration: "none" }}>
              
              <img
                src="data:image/jpeg;base64,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"
                alt="Wausau Pilot & Review"
                style={{
                  width: isMobile ? "38px" : "52px",
                  height: isMobile ? "38px" : "52px",
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "block",
                }}
              />
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                <span style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: isMobile ? "17px" : "24px",
                  fontWeight: 800, color: "#fff",
                  letterSpacing: "-0.01em", whiteSpace: "nowrap",
                  lineHeight: 1.1,
                }}>
                  <span style={{ color: "#b2ede8" }}>Wausau</span> Pilot & Review
                </span>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: isMobile ? "9px" : "10px",
                  letterSpacing: "0.14em",
                  color: "rgba(255,255,255,0.5)",
                  whiteSpace: "nowrap",
                }}>MORE NEWS. LESS FLUFF. ALL LOCAL.</span>
              </div>
            </a>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>
                {new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}).toUpperCase()}
              </div>
            </div>
          </div>

          <div style={{ padding: isMobile ? "7px 16px 10px" : "7px 24px 12px", display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? "20px" : "28px", color: "#fff", letterSpacing: "0.08em", lineHeight: 1 }}>CENTRAL WISCONSIN</span>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? "20px" : "28px", color: "#b2ede8", letterSpacing: "0.08em", lineHeight: 1 }}>MEETING TRACKER</span>
          </div>
        </div>

        
        <div style={{ display: "flex", flex: 1, overflow: "hidden", flexDirection: isMobile ? "column" : "row" }}>

          
          {showList && (
            <div style={{
              width: isMobile ? "100%" : "420px",
              minWidth: isMobile ? "unset" : "420px",
              background: "#fff",
              borderRight: isMobile ? "none" : `1px solid ${RULE}`,
              display: "flex", flexDirection: "column",
              flex: isMobile ? 1 : "unset", overflow: "hidden",
            }}>
              
              <div style={{ display: "flex", borderBottom: `2px solid #000`, flexShrink: 0, background: INK }}>
                {[
                  { key: "recent",   label: "Recent Meetings"    },
                  { key: "upcoming", label: "Upcoming Meetings"  },
                ].map(({ key, label }) => {
                  const active = panelTab === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setPanelTab(key)}
                      style={{
                        flex: 1, border: "none", cursor: "pointer",
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "12px", letterSpacing: "0.16em",
                        padding: "11px 0",
                        background: active ? "rgba(255,255,255,0.18)" : "transparent",
                        color: active ? "#fff" : "rgba(255,255,255,0.45)",
                        borderBottom: active ? "3px solid #fff" : "3px solid transparent",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
                      onMouseLeave={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
                    >{label.toUpperCase()}</button>
                  );
                })}
              </div>

              {panelTab === "recent" && <>
              
              <div style={{ padding: "12px 14px 10px", borderBottom: `2px solid ${RULE}`, background: CREAM }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "10px", letterSpacing: "0.18em", color: "#999", marginBottom: "10px" }}>RECENT MEETINGS</div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {[
                    { key: "all",          label: "All Sources",     color: INK,                              avatar: null },
                    { key: "marathon",     label: "Marathon County", color: SOURCE_CONFIG.marathon.accent,     avatar: SOURCE_CONFIG.marathon.avatar     },
                    { key: "wausau",       label: "Wausau",          color: SOURCE_CONFIG.wausau.accent,       avatar: SOURCE_CONFIG.wausau.avatar       },
                    { key: "weston",       label: "Weston",          color: SOURCE_CONFIG.weston.accent,       avatar: SOURCE_CONFIG.weston.avatar       },
                    { key: "school_board", label: "School Board",    color: SOURCE_CONFIG.school_board.accent, avatar: SOURCE_CONFIG.school_board.avatar },
                  ].map(({ key, label, color, avatar }) => {
                    const active = sourceFilter === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSourceFilter(key)}
                        onMouseEnter={e => { if (!active) { e.currentTarget.style.background = color + "15"; e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; }}}
                        onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#d0ccc4"; e.currentTarget.style.color = "#888"; }}}
                        style={{
                          background:    active ? color : "transparent",
                          border:        "1.5px solid " + (active ? color : "#d0ccc4"),
                          color:         active ? "#fff" : "#888",
                          fontFamily:    "'Bebas Neue', sans-serif",
                          fontSize:      "11px", letterSpacing: "0.12em",
                          padding:       "5px 12px",
                          cursor:        "pointer",
                          transition:    "all 0.15s",
                          display:       "flex", alignItems: "center", gap: "6px",
                          whiteSpace:    "nowrap",
                        }}
                      >
                        {avatar && (
                          <img
                            src={avatar}
                            alt={label}
                            style={{
                              width: "16px", height: "16px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              flexShrink: 0,
                              opacity: active ? 1 : 0.75,
                              border: active ? "1px solid rgba(255,255,255,0.5)" : "1px solid transparent",
                              transition: "opacity 0.15s",
                            }}
                          />
                        )}
                        {label}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="text" placeholder="Search meetings..."
                  value={search} onChange={e => setSearch(e.target.value)}
                  style={{
                    width: "100%", padding: "8px 12px",
                    border: `1px solid ${RULE}`,
                    fontFamily: "'Lora', Georgia, serif",
                    fontSize: "16px", color: INK,
                    background: "#fff", outline: "none",
                  }}
                  onFocus={e => e.target.style.borderColor=TEAL}
                  onBlur={e => e.target.style.borderColor=RULE}
                />
              </div>

              
              <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch", minHeight: 0 }}>
                {filtered.length === 0
                  ? <div style={{ padding: "24px 14px", color: "#999", fontFamily: "'Lora', Georgia, serif", fontSize: "13px", fontStyle: "italic" }}>No meetings match.</div>
                  : filtered.map(m => (
                    <MeetingCard key={m.id} meeting={m} onClick={setSelected} active={!isMobile && selected?.id === m.id} />
                  ))
                }
              </div>

              </>}

              {panelTab === "upcoming" && (
                <UpcomingMeetings isMobile={isMobile} />
              )}

              
              <div style={{ padding: "10px 14px 12px", borderTop: `1px solid ${RULE}`, background: CREAM }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "9px", letterSpacing: "0.12em", color: "#aaa", marginBottom: "5px" }}>
                  {newCount} NEW . {MEETINGS.length} TOTAL
                </div>
                <div style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "10px", color: "#bbb", lineHeight: 1.55 }}>
                  Scraped from{" "}
                  <a href={SOURCE_CONFIG.marathon.channel} target="_blank" rel="noreferrer" style={{ color: TEAL, textDecoration: "none", fontWeight: 600 }}>Marathon County</a>
                  {", "}
                  <a href={SOURCE_CONFIG.wausau.channel} target="_blank" rel="noreferrer" style={{ color: SOURCE_CONFIG.wausau.accent, textDecoration: "none", fontWeight: 600 }}>City of Wausau</a>
                  {", and "}
                  <a href={SOURCE_CONFIG.weston.channel} target="_blank" rel="noreferrer" style={{ color: SOURCE_CONFIG.weston.accent, textDecoration: "none", fontWeight: 600 }}>Village of Weston</a>
{", and "}<a href={SOURCE_CONFIG.school_board.channel} target="_blank" rel="noreferrer" style={{ color: SOURCE_CONFIG.school_board.accent, textDecoration: "none", fontWeight: 600 }}>Wausau School Board</a>{" "}YouTube channels via Python.
                </div>
              </div>
            </div>
          )}

          
          {showDetail && (
            <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {selected
                ? <SummaryDetail meeting={selected} onBack={() => setSelected(null)} isMobile={isMobile} />
                : (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: CREAM, gap: "10px" }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "42px", letterSpacing: "0.08em", color: RULE, lineHeight: 1 }}>SELECT A MEETING</div>
                    <div style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "14px", color: "#bbb", fontStyle: "italic" }}>Choose a meeting from the list to view its summary</div>
                  </div>
                )
              }
            </div>
          )}
        </div>
      </div>
    </>
  );
}
