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
    overview: "The Wausau City Council approved a major development agreement for 11 Scott Street (Waterside Place) by a 6-3 vote, which will convert a vacant 100,000 square foot building into 52 mid-priced residential units. The council also recognized city employees for their response to a record 30.9-inch snowfall and presented the 2026 Sustainability Award to Colby and Colby Millwork for their solar panel installation and recycling initiatives.",
    agenda: [
      { time:"2:49", item:"Call to order and Pledge of Allegiance" },
      { time:"3:30", item:"Proclamation for Sarah Rafi Day (March 31st)" },
      { time:"7:00", item:"Mayoral citation for DPW snow response crews" },
      { time:"14:45", item:"Sustainability Award presentation to Colby and Colby Millwork" },
      { time:"20:15", item:"Approval of March 10, 2026 meeting minutes" },
      { time:"20:45", item:"Public comment period" },
      { time:"23:30", item:"Consent agenda" },
      { time:"24:00", item:"Development agreement for 11 Scott Street\/Waterside Place" },
      { time:"36:15", item:"Mayoral appointments to Plan Commission, Affordable Housing Task Force, and BID Board" },
      { time:"36:45", item:"Residential solid waste and recycling service agreement with Harter's Fox Valley Disposal" },
    ],
    discussions: [
      { item:"11 Scott Street Development Agreement and Parking Agreement", body:"The council approved the development agreement and amended parking agreement for 11 Scott Street LLC (Waterside Place) by a 6-3 vote. Economic Development Director Randy Feifer explained the project reduces parking spaces from 480 to 150, with the developer paying for spaces over two years, generating approximately $55,000 in annual parking revenue. Alder Rasmusson supported the project noting it returns parking spaces to public use and adds needed mid-priced housing. Alder Neil emphasized the project helps TID 8 reach valuation goals for potential closure in 5 years. Alder Larson dissented, expressing concern about discounting city assets during budget cuts. Alder Tyranny questioned how the city could provide 150 alternative parking spaces within 300 yards if the ramp closes, but Feifer noted this obligation already existed in the prior agreement and was reduced from 480 spaces." },
      { item:"DPW Snow Response Recognition", body:"Mayor Denny presented a mayoral citation to the Department of Public Works plow crews and municipal fleet staff for their response to the historic March 14-16, 2026 storm that delivered a record 30.9 inches of snow. The citation specifically honored four municipal fleet technicians who worked 12-hour shifts providing 24-hour breakdown support, with two volunteering on Saturday. By Friday, these technicians will have worked 12 straight days without a day off. Street supervisor Kevin Kester accepted the award and praised the plow operators and mechanics, stating 'you kicked its ass' to applause from the audience." },
      { item:"Sustainability Award to Colby and Colby Millwork", body:"Sustainability Committee member Christine Daniels presented the 2026 City of Wausau Sustainability Award to Colby and Colby Millwork. Representatives Mike Thompson and Keith Kaning accepted the award, explaining they installed over 2,000 solar panels on their manufacturing facility off 11th Avenue, which became operational in July 2025. The system generates enough power for approximately 120 homes and has exceeded expectations. The company also highlighted their LED lighting upgrades, high-efficiency air compressors, and recycling programs for wood, aluminum, glass, vinyl, cardboard, and other materials." },
      { item:"Meeting Minutes and Consent Agenda", body:"The March 10, 2026 meeting minutes were approved 9-0 on motion from Watson, second from Tyranny. The consent agenda was also approved 9-0 on motion from Watson, second from Hanky." },
      { item:"Mayoral Appointments", body:"Resolution confirming mayoral appointments to the Plan Commission, Affordable Housing Task Force, and Business Improvement District Board was approved 9-0 on motion from Neil, second from Watson." },
      { item:"Harter's Solid Waste Agreement", body:"Resolution approving a 7-year residential solid waste and recycling service agreement with Harter's Fox Valley Disposal was approved 9-0. The mayor noted there had been confusion about whether the term was 7 or 10 years, but the agreement was corrected to 7 years as approved by Public Health and Safety Committee." },
      { item:"Airspace Obstruction Removal Agreements", body:"Two resolutions approving airspace obstruction removal agreements in Schofield were approved 9-0 each: one with Schofield Ridgeland Legacy LLC for 724 and 732 Ridgeland Avenue, and one with Zachary Lang for 11 Ridgeland Avenue." },
      { item:"Police Department Thompson Submachine Gun Sale Proceeds", body:"Resolution approving use of proceeds from the sale of a Thompson submachine gun to purchase Red Dot Optics for the Police Department was approved 9-0. The mayor noted the money had been sitting in the safe for a long time." },
      { item:"Solid Waste Disposal Code Update", body:"Ordinance repealing and recreating Wausau Municipal Code Chapter 6.44 on solid waste disposal to align with state code was approved 9-0. This came from Public Health and Safety Committee with a 3-0 recommendation." },
      { item:"Police Department Out-of-Country Training", body:"Resolution approving paid duty time for out-of-country training for Wausau Police Department officers was approved 9-0, with 5-0 recommendations from both Human Resources and Finance committees." },
      { item:"Shelter Operations Duty Premium", body:"Resolution approving community outreach professional shelter operations duty premium differential was approved 9-0, with 5-0 recommendations from both Human Resources and Finance committees." },
      { item:"Bus Accident Settlement", body:"Resolution approving release of claims for settlement of counter claim in David Holes versus City of Wausau was approved 8-1. Assistant City Attorney Vincent Bonito explained this relates to a 2022 bus accident where the city's insurer paid the claim, and the individual who caused the accident later filed a personal injury claim. The city filed a counter claim and the other party's insurer agreed to pay damages for the bus. Alder Neil confirmed this settlement does not affect the separate ongoing personal injury claim." },
    ],
    publicComment: "Two speakers addressed the council regarding the 11 Scott Street project. Raleigh [last name unclear] spoke in support of the project, describing it as a green sustainable repurposing of a vacant building that will add mid-priced apartments downtown. Mark Craig of 3246 North 8th Street also spoke in support, noting the project is over $10 million to bring 100,000 square feet back to life, with the residential component costing over $8.3 million for 52 units. Craig acknowledged the previous term sheet vote was 7-4 and requested council support.",
    actionItems: [
      "Development agreement and amended parking agreement for 11 Scott Street\/Waterside Place approved 6-3",
      "March 31st proclaimed as Sarah Rafi Day in Wausau",
      "7-year solid waste and recycling agreement with Harter's Fox Valley Disposal approved",
      "Two airspace obstruction removal agreements in Schofield approved with related budget modifications",
      "Police Department authorized to use Thompson submachine gun sale proceeds for Red Dot Optics",
      "Municipal Code Chapter 6.44 on solid waste disposal updated to align with state code",
      "Paid duty time for out-of-country police training approved",
      "Shelter operations duty premium differential approved",
      "Settlement release for bus accident counter claim approved 8-1",
      "City Clerk Caitlyn Bernardi's departure acknowledged - last meeting will be April 14th",
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
  {
    id: "knWZO4dON-8", source: "wausau",
    title: "Wausau Plan Commission Meeting",
    date: "March 17, 2026", shortDate: "MAR 17",
    committee: "Plan Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=knWZO4dON-8",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2133/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Plan Commission approved two major items: a conditional use permit for a 70-unit, 7-story apartment building at 731 North First Street for Beacon Resources LLC, and a transportation project plat for signal replacements at Grand Avenue, Sturgeon, and Townline Road. The commission also heard public comment supporting downtown storage facilities and received written comment supporting the Beacon Resources apartment project.",
    agenda: [
      { time:"0:00", item:"Call to order and election of vice chair (skipped until April)" },
      { time:"0:17", item:"Public comment on agenda items" },
      { time:"0:58", item:"Consideration of minutes from February 18th" },
      { time:"1:15", item:"Public hearing on conditional use permit for 218 South Fourth Street (Done Storage personal storage facility)" },
      { time:"3:15", item:"Discussion and possible action on conditional use permit for 731 North First Street (70-unit apartment building)" },
      { time:"4:03", item:"Discussion and possible action on transportation project plat for Grand Avenue signal replacements" },
      { time:"4:40", item:"General discussion" },
      { time:"4:50", item:"Next meeting announcement and adjournment" },
    ],
    discussions: [
      { item:"Minutes from February 18th", body:"Motion to approve made by Bugamin, seconded by Balkan. Passed unanimously with all members saying 'I' in favor." },
      { item:"Public hearing on conditional use permit for 218 South Fourth Street (Done Storage)", body:"Jason and Melinda Don Woody spoke in favor of the storage facility proposal, noting that downtown Wausau has added over 400 new apartment units including the 153-unit Foundry on Third and 102-unit Evergreen Landing projects. They argued that apartment living provides limited storage and there are no convenient storage options downtown currently. The public hearing was closed but no action was taken on this item during the meeting." },
      { item:"Conditional use permit for 731 North First Street (Beacon Resources 70-unit apartment)", body:"Motion to approve made by Bornman, seconded by Bugamin. No questions or discussion from commissioners. The motion passed unanimously. This approval allows Beacon Resources LLC to construct a 70-unit, 7-story apartment building at the location." },
      { item:"Transportation project plat for Grand Avenue signal replacements at Sturgeon and Townline Road", body:"Motion to approve made by Bugamin, seconded by Balkan. No discussion. Passed unanimously. This approves project 370-40-40 for signal replacements." },
    ],
    publicComment: "Written public comment was submitted by Linda Lawrence on March 12th supporting the Beacon Resources apartment proposal, stating housing of this capacity will be good for downtown small businesses and expressing confidence in the developer's track record. In-person public comment was provided by Jason and Melinda Don Woody supporting the Done Storage facility at 218 South Fourth Street.",
    actionItems: [
      "Conditional use permit approved for 731 North First Street 70-unit, 7-story apartment building (Beacon Resources LLC)",
      "Transportation project plat approved for Grand Avenue signal replacements at Sturgeon and Townline Road",
      "Vice chair election postponed until April meeting",
      "Next meeting tentatively scheduled for April 21st at 5:00 PM, subject to change due to election and council meeting conflicts",
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
  {
    id: "hNOP07iJjNY", source: "marathon",
    title: "Marathon County Board Education Meeting Pt.1",
    date: "March 19, 2026", shortDate: "MAR 19",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=hNOP07iJjNY",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18076/639089973815830000",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board held an educational meeting featuring presentations on PFAS litigation opportunities and renewable energy regulation. No votes were taken as this was an informational session, but the board heard from legal counsel about potentially joining multi-district litigation against PFAS chemical manufacturers and learned about options for addressing proposed wind energy projects in the county.",
    agenda: [
      { time:"0:00", item:"Call to order and Pledge of Allegiance" },
      { time:"1:15", item:"Reading of the notice" },
      { time:"2:00", item:"Roll call and sign-in" },
      { time:"2:45", item:"Public comment period (15 minutes, 5 speakers)" },
      { time:"15:01", item:"Presentation on PFAS multi-district litigation opportunity" },
      { time:"50:02", item:"Discussion of PFAS testing and damage assessment" },
      { time:"1:01:00", item:"Presentation on renewable energy regulatory authority" },
      { time:"1:10:01", item:"Discussion of PSC process and county authority" },
      { time:"1:25:03", item:"County options for addressing wind\/solar projects" },
      { time:"1:40:00", item:"Joint Development Agreement considerations" },
    ],
    discussions: [
      { item:"Public Comment", body:"Five residents spoke during public comment. Cindy Nelson from Stratford reported going door-to-door to 200 houses and finding no support for wind turbines in the area. Wendy Rowski from Green Valley urged the board to vote no on advancing the comprehensive plan, objecting to the term 'wind farm' as misleading for industrial-scale energy facilities. Barb Newton and Cindy Hogan from Rib Mountain supported reducing speed limits and adding no-passing zones on Double N road, noting 75 residents signed a petition. Heidi Pesky from Town of McMillan argued against joint development agreements, listing concerns about county liability, road damage costs, and restrictions on future boards." },
      { item:"PFAS Multi-District Litigation Presentation", body:"Attorney Carrie McDougall from Baron and Budd Law Firm presented via WebEx on the ongoing PFAS litigation. He explained that the water provider settlement totaled approximately $12-13 billion from 3M and $3-5 billion from DuPont - the largest toxic tort settlement in U.S. history. McDougall noted that soil-based claims including airports, landfills, and wastewater were specifically excluded from the water settlement, meaning Marathon County could still pursue claims. The legal services would be on a 25% contingency fee basis with no upfront costs to the county. Vice Chair Dickinson clarified that the county airport has no known PFAS contamination currently." },
      { item:"PFAS Litigation County Questions", body:"Supervisor Robinson asked multiple questions about claim scope, noting Wausau had all six municipal wells impacted by PFAS. Attorney Andy Phillips clarified that claims would be against original chemical manufacturers, not entities that spread contaminated materials. Supervisor Mash asked about costs, and McDougall confirmed the 25% contingency fee means the county pays nothing unless there's a recovery. Supervisor Seubert asked about wastewater sludge spreading impacts, and attorneys acknowledged this is an emerging issue not yet at the forefront of litigation." },
      { item:"Renewable Energy Regulation Presentation", body:"Attorney Rebecca Roker from Atollis Law, representing Wisconsin Counties Association, presented on county authority over wind and solar projects. She explained that PSC (Public Service Commission) has jurisdiction over projects over 100 megawatts, and noted PSC has a 33-0 record approving solar projects. She discussed the Hub City Wind project from Alliant Energy, noting no engineering plans have been filed with PSC yet. The Town of Brighton case was mentioned as the only successful local challenge, but that project is still proceeding after being purchased as part of Hub City. Roker outlined four options: do nothing, negotiate a Joint Development Agreement, intervene in PSC proceedings, or litigate - recommending JDAs as the most effective tool for protecting county interests." },
      { item:"Joint Development Agreement Options", body:"Roker explained that JDAs can address liability protection, environmental concerns, noise, setbacks, road use, decommissioning requirements, and emergency response training - protections not otherwise available under state law. She noted that PSC 128 provides minimum standards for wind projects that JDAs can exceed through negotiation. She emphasized that JDAs are not endorsements of projects but mechanisms to protect county interests since projects will likely be approved regardless. The presentation was cut off before completion due to transcript ending." },
    ],
    publicComment: "Five residents spoke. Cindy Nelson (Stratford\/Oplane Township) reported canvassing 200 houses finding unanimous opposition to wind turbines. Wendy Rowski (Green Valley) urged voting no on the comprehensive plan draft, objecting to 'wind farm' terminology for industrial facilities. Barb Newton (Rib Mountain) supported speed reduction and no-passing zone on Double N road, citing near-collisions. Heidi Pesky (Town of McMillan) listed numerous concerns about Joint Development Agreements including liability, road costs, and restrictions on future boards. Cindy Hogan (Rib Mountain) supported the Double N road safety petition signed by 75 residents.",
    actionItems: [
      "Board to consider resolution on joining PFAS multi-district litigation at next week's meeting",
      "Board to vote on comprehensive plan advancement at next week's meeting",
      "Infrastructure committee recommendation on Double N road speed reduction forwarded to full board for vote",
      "County to consider options regarding Hub City Wind project before PSC application filing",
      "Closed session scheduled regarding county administrator",
    ],
  },
  {
    id: "gugcMAm6DFA", source: "wausau",
    title: "Wausau Board of Public Works Meeting",
    date: "March 19, 2026", shortDate: "MAR 19",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=gugcMAm6DFA",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2297/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Board of Public Works opened bids for the 2026 asphalt paving project and awarded the contract to RC Pavers, the lowest bidder at $824,146.34. The meeting was brief, lasting only a few minutes with unanimous approval.",
    agenda: [
      { time:"0:00", item:"Call to order" },
      { time:"0:08", item:"Open bids and make recommendation for the 2026 asphalt paving project" },
      { time:"0:45", item:"Motion to adjourn" },
    ],
    discussions: [
      { item:"2026 Asphalt Paving Project Bid Opening", body:"Two bids were opened and read aloud: RC Pavers at $824,146.34 and American at $849,872.10. A motion was made to approve RC Pavers as the lowest bidder. The motion was seconded and passed unanimously with all members voting 'aye.'" },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "RC Pavers awarded the 2026 asphalt paving project contract at $824,146.34",
    ],
    civicItems: [
      { number:"1", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Open bids and make recommendation for 2026 Asphalt Paving Project \"A\".", votes:[{ motion:"award contract to RC Pavers, LLC in the amount of $824,146.34", passed:true, initiator:"Eric Lindman", seconder:"Vincent Bonino", yes:["Eric Lindman", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
    ] },
      { number:"2", name:"Adjournment.", votes:[{ motion:"approve", passed:true, initiator:"Vincent Bonino", seconder:"Eric Lindman", yes:["Eric Lindman", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
  {
    id: "f1fZvkxedNY", source: "wausau",
    title: "Wausau Board of Public Works Meeting",
    date: "March 17, 2026", shortDate: "MAR 17",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=f1fZvkxedNY",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2259/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Board of Public Works approved a street construction contract to Switlick for $1,279,289.75 for the 26th Street\/North 8th Avenue project, beating six other bidders by less than $800. The board also approved a $14,436.50 change order for unexpected underground conditions on the Rolph Street\/Cherry Street project.",
    agenda: [
      { time:"0:01", item:"Call to order" },
      { time:"0:01", item:"Consideration of March 10th regular Board of Public Works minutes" },
      { time:"0:15", item:"Open bids - 26th Street construction project \/ North 8th Avenue" },
      { time:"2:15", item:"2025 street construction project A - Rolph Street\/Cherry Street - Change Order 1" },
      { time:"5:01", item:"2025 street construction project A - Pay estimate number nine" },
      { time:"5:30", item:"Portland cement concrete license - KSK Incorporated" },
      { time:"6:00", item:"Adjournment" },
    ],
    discussions: [
      { item:"March 10th Board of Public Works Minutes", body:"Minutes from the March 10th meeting were considered. A motion was made and seconded, then approved unanimously with all voting 'aye'." },
      { item:"26th Street\/North 8th Avenue Construction Bids", body:"Seven bids were opened for the project. Switlick submitted the low bid at $1,279,289.75, narrowly beating Hos at $1,280,877.96 by less than $800. Other bidders included A1 ($1,374,600), Francis Melvin ($1,385,383), Steen ($1,489,126), James Peterson ($1,570,698.56), and Earth ($1,686,780.75). A member noted 'tight bids' regarding the close competition. Motion to approve Switlick passed unanimously. Item B (another bid opening) was postponed as the bid opening was extended." },
      { item:"Rolph Street\/Cherry Street - Change Order 1", body:"Staff presented four items totaling $14,436.50 for unexpected conditions: an inside drop on a manhole due to an unrecorded large sanitary service ($4,856), tying into a 6-inch water main instead of the expected 8-inch ($2,317.50), miscellaneous storm sewer tie-ins ($5,016), and geogrid for poor soils near Thomas Jefferson Elementary ($2,247 for 750 square yards). Change Order 2 regarding liquidated damages was deferred pending ongoing discussions. Motion to approve passed unanimously." },
      { item:"Rolph Street\/Cherry Street - Pay Estimate #9", body:"Pay estimate number nine from Haw Suns Incorporated for work completed through year-end was presented for $535,114.20. Motion to approve passed unanimously." },
      { item:"Portland Cement Concrete License - KSK Incorporated", body:"A member named Vinnie confirmed the license application was in order. Motion to approve the concrete license for KSK Inc. passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Switlick awarded 26th Street\/North 8th Avenue construction contract at $1,279,289.75",
      "Change Order 1 approved for Rolph Street\/Cherry Street project ($14,436.50)",
      "Pay estimate #9 approved for Haw Suns Inc. ($535,114.20)",
      "Portland cement concrete license approved for KSK Incorporated",
      "Change Order 2 with liquidated damages to return at future meeting",
      "Postponed bid opening (Item B) to return at future meeting",
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
  {
    id: "aUG3K0hxNsU", source: "weston",
    title: "Finance and Human Resources Committee",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Finance & Human Resources", duration: "~1h",
    url: "https://www.youtube.com/watch?v=aUG3K0hxNsU",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_03232026-1898",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Finance and Human Resources Committee approved a $400 annual clothing allowance for employees (with $500 starting in 2027) plus a washer and dryer purchase, replacing the cancelled Centas uniform contract. The committee also received an extensive presentation on public works operations and budget, highlighting that the department decreased its 2026 budget by 1.1% while maintaining services.",
    agenda: [
      { time:"0:01", item:"Call to order and Pledge of Allegiance" },
      { time:"1:08", item:"Public comments" },
      { time:"3:15", item:"Approval of minutes from February 16, 2026" },
      { time:"3:45", item:"February 2026 financial report acknowledgment" },
      { time:"4:15", item:"T1 and T2 detail reports for February" },
      { time:"4:45", item:"Legal details for February" },
      { time:"5:00", item:"Educational presentation: Public Works operations and budget" },
      { time:"40:03", item:"Old business: Reimbursement for clothing and equipment allowance" },
      { time:"1:12:30", item:"Remarks from staff and committee members" },
      { time:"1:15:01", item:"Future meeting scheduling and adjournment" },
    ],
    discussions: [
      { item:"Public Works Operations and Budget Presentation", body:"Public Works Director Michael presented an extensive overview of department operations, noting the 2026 budget decreased by $26,000 (1.1%) compared to 2025. He highlighted that Weston spends approximately $9,700 less per mile than the average central Wisconsin community on street maintenance, making them the third lowest spending community per mile in the region. Michael emphasized staff efforts during the recent 17-hour snow event and explained that the department operates with 10 frontline employees (down from 11 in 2010) to maintain 119.5 centerline miles of road. He cautioned the committee about the relationship between street spending and transportation aids, noting that when street spending decreased from 2012-2020, state transportation aid payments also dropped significantly." },
      { item:"Clothing and Equipment Allowance Policy Amendment", body:"The committee debated whether to increase the employee clothing stipend from $300 to $600 following cancellation of the Centas uniform contract. Committee member Manel argued against the $600 increase, citing fiscal responsibility and the upcoming fire department referendum needs. Michael defended the increase, noting employees work in hazardous conditions and that maintaining employee benefits supports retention. The initial motion for $600 annually failed on a roll call vote. A motion for $400 annually also failed 3-3. A motion for $500 with washer\/dryer also failed. Finally, a motion for $400 for remainder of 2026, $500 annually starting 2027, plus a one-time washer and dryer purchase passed with one opposing vote." },
      { item:"Consent Items - Financial Reports and Minutes", body:"The committee approved minutes from February 16, 2026, and acknowledged the February 2026 financial reports, T1 and T2 detail reports, and legal details. All items passed unanimously on voice votes." },
    ],
    publicComment: "Lisa Beck of 1808 Cortez Lane offered public comment. She praised Michael from public works for handling the recent storm event and questioned the proposed clothing allowance increase, suggesting the village consider a lesser amount rather than the highest proposed option given budget concerns.",
    actionItems: [
      "Recommend to village board: $400 clothing allowance for remainder of 2026, $500 annually starting 2027, plus one-time purchase of washer and dryer for staff use",
      "Public Works to submit disaster relief documentation to county\/state for March snow event costs (estimated $50,000)",
      "Next meeting scheduled for Tuesday, April 21st at 5:00 PM due to new board member swearing-in timing",
    ],
  },
  {
    id: "_hS5GDGVL1c", source: "wausau",
    title: "Wausau Public Health and Safety Committee Meeting",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Public Health & Safety", duration: "~1h",
    url: "https://www.youtube.com/watch?v=_hS5GDGVL1c",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2311/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Public Health and Safety Committee approved a parklet permit for Westider Diner and Lounge after the owner presented detailed plans, deferred action on one bartender license denial pending police chief review, and approved multiple other licenses and summer event permits. The committee also repealed outdated ordinances on solid waste disposal and cell phone use while driving, and received updates on the fire department's record-setting call volume and the upcoming transition of homeless shelter operations to Bridge Street Mission.",
    agenda: [
      { time:"0:00", item:"Call to order and roll call" },
      { time:"0:15", item:"Public comment on agenda items" },
      { time:"0:45", item:"Approval of minutes from February 16th, 2026" },
      { time:"1:15", item:"License applications - Westider Diner parklet permit" },
      { time:"10:45", item:"License denial recommendations - Theodore Davis and Joanna Gregory" },
      { time:"19:15", item:"Approval of remaining license applications and summer events" },
      { time:"20:01", item:"Repealing and recreating solid waste disposal ordinance (Chapter 6.44)" },
      { time:"22:00", item:"Repealing mobile phone while driving ordinance (Section 10.01.012)" },
      { time:"25:01", item:"MOU with Midwest Renewable Energy for Grow Solar program" },
      { time:"27:00", item:"Wausau Fire Department 2025 annual report" },
      { time:"36:30", item:"Tavern activities report for February 2026" },
      { time:"38:30", item:"Community outreach update and homeless shelter transition" },
    ],
    discussions: [
      { item:"Westider Diner and Lounge Parklet Permit", body:"Owner Tyler Voight presented detailed mockups of the proposed parklet at 628 North Third Avenue, explaining it would extend 4 feet into the street and 4 feet on the sidewalk, taking up two parking spots. He stated the purpose is to provide sunny seating for the breakfast crowd. Larson initially expressed hesitation but changed position after seeing the layout. Watson moved to approve, Larson seconded. The permit was approved unanimously as a one-year trial through October 31st, with Voight asked to report back in November." },
      { item:"Bartender License Denial - Theodore Davis", body:"Davis addressed the committee regarding his denial recommendation, stating he made a 'really bad mistake' 20 years ago that has followed him throughout his life. He expressed desire to work at Emerald Nightclub and noted he has completed therapy requirements. His boyfriend Matthew Prieb spoke in support, emphasizing Davis has not reoffended and is a good person. The committee deferred action because Deputy Chief Baiton was unfamiliar with evidence of rehabilitation documents submitted to Chief Barnes, and the committee wanted the chief's updated recommendation before deciding." },
      { item:"Bartender License Denial - Joanna Gregory", body:"Gregory did not appear at the meeting. Her application remained on the denial recommendation list to be processed with the batch of other licenses." },
      { item:"Batch License Approvals", body:"The committee approved multiple items including summer events (Wings over Wausau, Concerts on the Square, Chalkfest, Memorial Day parade, Hope on the Block, Jazz on the River), three applications from the liquor license review subcommittee (Oasis Arcade, new ownership of Whiskey River Bar and Grill, and new owner for Hayawa), and Class A retailers. Motion by Larson, second by Watson, passed unanimously." },
      { item:"Solid Waste Disposal Ordinance Update", body:"Assistant City Attorney Vinnie Bonino explained the ordinance repeals and recreates Chapter 6.44 to comply with state-level changes. Motion by Larson, second by Watson, passed unanimously with no discussion." },
      { item:"Repeal of Cell Phone Ban Ordinance", body:"Bonino explained that state inattentive driving statutes have been amended to regulate cell phone usage more narrowly, making Wausau's local ordinance redundant since the city already adopts state traffic code. Motion by Watson, second by Larson, passed unanimously." },
      { item:"Grow Solar Central Wisconsin MOU", body:"Carrie from the planning department noted the sustainability committee unanimously approved this on March 5th. Alderperson Sarah spoke in favor, sharing her personal experience with solar installation and praising the partnership with MREA. Motion by Watson, second by Larson, passed unanimously." },
      { item:"Fire Department Annual Report", body:"Fire Chief reported the department set a new record with over 7,200 calls in 2025, averaging 20 per day. He announced on Friday the city was confirmed to maintain ISO Class 2 status for the next four years. The committee discussed upcoming referendum informational sessions scheduled for March 31st at the tech, April 1st at station two, and April 3rd at station one. The chief mentioned doing two radio shows and a podcast to inform the public." },
      { item:"Homeless Shelter Transition Update", body:"Tracy Durante reported 415 unduplicated guests have used the WMC shelter since opening, with over 740 volunteer hours in February. She noted Catholic Charities reported 99 unduplicated guests since November 1st. James Torensson, new director of homeless services at Bridge Street Mission, explained the shelter transition is expected around late April, with the WMC contract extended through April 19th. The committee expressed interest in touring the new facility, potentially at the ribbon cutting ceremony." },
    ],
    publicComment: "At the beginning, no public comment was offered on agenda items other than license renewals. At the end of the meeting, Carrie Mor Everest of 1025 Everest Boulevard spoke about concerns regarding treatment of unhoused individuals during emergency responses at the shelter, stating she has witnessed multiple incidents over 10 months where 911 responders did not treat homeless individuals ethically or professionally. She expressed frustration that her complaints have not been addressed and was directed to the Police and Fire Commission for formal complaints.",
    actionItems: [
      "Parklet permit approved for Westider Diner and Lounge through October 31st, with owner to report back in November",
      "Theodore Davis bartender license decision deferred pending Chief Barnes' review of rehabilitation evidence",
      "Joanna Gregory bartender license denied (applicant did not appear)",
      "All other license applications and summer event permits approved as recommended",
      "Chapter 6.44 solid waste disposal ordinance repealed and recreated",
      "Section 10.01.012 cell phone ban ordinance repealed",
      "MOU with Midwest Renewable Energy for Grow Solar program approved",
      "Staff to investigate if Days tavern points were omitted from report or expired",
      "Staff to check on status of Trace Armanos restaurant",
      "Committee to schedule tour of Bridge Street Mission shelter at ribbon cutting ceremony",
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
  {
    id: "Izfp0CD_Da0", source: "weston",
    title: "Board of Trustees",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=Izfp0CD_Da0",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_03232026-1898",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Board of Trustees approved multiple ordinances including rezonings and a modified speed limit ordinance for Weston Avenue, approved a 10-year baseball\/softball field maintenance agreement, and received updates on the April 2026 referendum for fire department funding. A resident spoke critically about fire department funding priorities, and the board deferred action on the remote meeting attendance policy until after the April election.",
    agenda: [
      { time:"0:01", item:"Call to order and Pledge of Allegiance" },
      { time:"0:01", item:"Roll call" },
      { time:"0:45", item:"Public comments" },
      { time:"5:01", item:"Minutes from February 16th meeting and acknowledgment of reports" },
      { time:"20:02", item:"Ordinance 26-00004 - Rezoning of 8905 Bert Street" },
      { time:"20:02", item:"Ordinance 26-00005 - Rezoning of 7105 Christensen Avenue" },
      { time:"21:30", item:"Ordinance 26-00006 - Speed limits amendment for Weston Avenue" },
      { time:"30:01", item:"Resolution 2026-008 - Final plat of Hinter Springs Second Edition" },
      { time:"35:02", item:"E-bike and euro ordinance discussion" },
      { time:"40:00", item:"Intersection signage at Community Center Drive and Birch Street" },
      { time:"45:01", item:"Baseball\/softball field maintenance agreement" },
      { time:"50:00", item:"Remote meeting attendance policy discussion" },
    ],
    discussions: [
      { item:"Public Comment - Fire Department Funding", body:"Jim Pensel of 5002 Aerrol Street spoke critically about fire department funding, stating he attended the inaugural Safer Citizen Academy and witnessed staff exhaustion due to severe understaffing. He criticized the board for using 'band-aids' like grants and referendums rather than prioritizing fire department funding over 'wants' like artificial turf and the aquatic center. Finance Director Jessica responded that the village cannot borrow for firefighter positions, explaining why a referendum is needed for operating revenue." },
      { item:"Ordinance 26-00006 - Speed Limits on Weston Avenue", body:"The original ordinance to set 35 mph from Von Kennel to Ryan Street failed with four no votes (Maloney, Jordan, Sagami, and the presiding officer). Trustee Maloney argued the road section was too sparse to justify 35 mph compared to other village roads. An amended motion was then approved to keep Camp Phillips to Von Kennel at 35 mph while maintaining Von Kennel to Highway J at 45 mph, with all other speed limit changes in the ordinance remaining intact. The amended motion passed." },
      { item:"Intersection Signage at Community Center Drive and Birch Street", body:"The board approved changing the stop sign on Community Center Drive at Birch Street to a yield sign. Trustee Huang raised concerns about bicyclists coming off the pedestrian bridge at high speeds without any stop requirement. The motion was amended to add a stop sign for bicyclists at the bridge landing. The amended motion passed unanimously." },
      { item:"Baseball\/Softball Field Maintenance Agreement", body:"The board approved a 10-year agreement with youth baseball and softball organizations for field maintenance at Kennedy Park. The committee recommended the long term to protect the village's investment and provide stability despite leadership changes in the organizations. The agreement was approved unanimously." },
      { item:"Remote Meeting Attendance Policy", body:"Trustee Lewis recommended postponing this item until the next meeting so the newly seated board could make the decision. The board voted unanimously to defer the item to the April 21st meeting when new board members will be present." },
      { item:"E-bike and Euro Ordinance", body:"The board received an update on the draft e-bike ordinance being developed with the MPO. Trustee Huang moved to table the item until the county finalizes their process, which was seconded by Maloney and passed unanimously." },
    ],
    publicComment: "Jim Pensel of 5002 Aerrol Street spoke for approximately 4 minutes criticizing the board's approach to fire department funding. He praised Safer staff after attending the citizen academy but argued the board should prioritize fire and EMS funding over projects like artificial turf at Kennedy Park and the aquatic center, calling the referendum approach 'short-sighted' since it lacks a sunset date and costs will increase beyond the $600,000 levy.",
    actionItems: [
      "Speed limit ordinance approved with modification: Camp Phillips to Von Kennel at 35 mph, Von Kennel to Highway J remains at 45 mph",
      "Rezoning of 8905 Bert Street from RR5 to SFS approved per planning commission",
      "Rezoning of 7105 Christensen Avenue from SL to SFS approved per planning commission",
      "Final plat of Hinter Springs Second Edition subdivision approved",
      "Yield sign to replace stop sign at Community Center Drive and Birch Street, with stop sign added for bicyclists at bridge landing",
      "10-year baseball\/softball field maintenance agreement approved",
      "Commercial rotary mower purchase approved",
      "Park shelter fees and field rental costs approved",
      "Eagle Scout project at McKiller Park approved with funding from park operations",
      "Remote meeting attendance policy deferred to April 21st meeting",
      "Microsoft Teams approved for trustee communication starting next term",
      "Military Road utility engineering service contract approved",
      "Business 51 storm pond engineering service contract amendment approved for $13,500",
      "Sewer televising software contract approved",
      "2026 annual stream maintenance plan budget approved",
      "Hospital area repaving change order number four approved",
      "Well rehabilitation approved",
      "Sign encroachment agreement with Seventh Floor Investments LLC approved",
      "Two remaining referendum informational sessions scheduled: March 31st 4:30-6:00 PM and April 2nd 12:00-1:30 PM",
      "Next meeting scheduled for April 21st at 6 PM with new board members",
    ],
  },
  {
    id: "HwjjV4oIneA", source: "marathon",
    title: "Marathon County Board Regular Meeting",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=HwjjV4oIneA",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18112/639098703974773349",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board of Supervisors adopted the 2026 Comprehensive Plan with multiple amendments addressing renewable energy terminology, data centers, AI technology, and energy policy. The board also approved salaries for elected officials, authorized phase 2 design for a new highway facility, approved PFAS litigation engagement, and ratified the emergency declaration for the recent blizzard response.",
    agenda: [
      { time:"0:12", item:"Call to order, Pledge of Allegiance, and moment of reflection" },
      { time:"1:36", item:"Roll call" },
      { time:"2:18", item:"Standing committee reports" },
      { time:"2:30", item:"Consent agenda items C8 through C13 B2" },
      { time:"3:00", item:"Adopting Marathon County Comprehensive Plan 2026 (Ordinance 0-13-26)" },
      { time:"1:20:01", item:"Establishing salaries for elected department heads (Resolution 12-26)" },
      { time:"1:21:00", item:"Authorizing phase 2 design services for new highway facility (Resolution 13-26)" },
      { time:"1:23:30", item:"Authorizing PFAS litigation engagement (Resolution 14-26)" },
      { time:"1:28:30", item:"Resolution approving carry forwards and budget amendments (Resolution R-20-26)" },
      { time:"1:31:00", item:"Ratification of local state of emergency declaration (Resolution 22-26)" },
      { time:"1:35:00", item:"County Administrator performance evaluation" },
    ],
    discussions: [
      { item:"Adopting Marathon County Comprehensive Plan 2026", body:"The board considered 10 proposed amendments to the comprehensive plan. Amendment 1 on livability standards passed unanimously. Amendments 2, 3, and 4 on alternative energy terminology were separated for individual votes after Supervisor Crawl's motion; all three passed but were not unanimous. Amendment 5 on data centers and battery storage passed but was not unanimous, with Supervisor Leur voting no citing ideological concerns. Amendment 6 on radon and lead remediation passed unanimously. Amendment 7 on regulating energy projects when allowed by law passed but not unanimously. Amendment 8 on AI and automation technology, offered by Supervisor Leur, passed unanimously. Amendment 9 on promoting coal and natural gas was amended by Supervisor Boots to read 'promote coal and natural gas until a long-term sustainable and reliable energy source can be found that does not adversely affect agricultural land,' passing but not unanimously after extensive debate. A late amendment by Supervisor Sindellski on classifying utility-scale wind and solar as industrial uses was debated; Supervisor Jeang moved to refer it to the ERC committee for July review, but that motion was defeated, and the amendment itself was defeated. The comprehensive plan as amended passed but was not unanimous." },
      { item:"Establishing salaries for elected department heads (Resolution 12-26)", body:"Resolution establishing salaries for the clerk of courts, sheriff, and elected department heads for the upcoming term. Motion by Supervisor Conway, second by Supervisor Rosenberg. Passed with the motion carried." },
      { item:"Authorizing phase 2 design services for new highway facility (Resolution 13-26)", body:"Motion by Supervisor Robinson, second by Supervisor V. Supervisor Soyber requested future information on plans for the old facility. Supervisor Sindellski asked about the $53 million cost estimate but Chair Gibbs clarified that cost approval was not part of this vote. Passed unanimously." },
      { item:"Authorizing PFAS litigation engagement (Resolution 14-26)", body:"Resolution authorizing outside counsel on contingency basis for PFAS lawsuits. Two amendments were adopted: Supervisor Robinson's amendment directing the county administrator to evaluate past and present practices that may have resulted in PFAS exposure passed unanimously. Vice Chair Dickinson's amendment modifying language regarding airport property also passed unanimously. The resolution as amended passed unanimously." },
      { item:"Ratification of emergency declaration (Resolution 22-26)", body:"Administrator Leonard explained the local emergency declaration was needed to preserve eligibility for state reimbursement after the governor's declaration expired during the blizzard. He praised county staff including facilities, parks, highway, sheriff's office, and airport for working 12-16 hour shifts and sleeping on cots during the event. Supervisor Fifer echoed appreciation for staff efforts. Passed unanimously." },
      { item:"County Administrator performance evaluation", body:"Chair Gibbs explained the executive committee had finalized the administrator's evaluation based on board input reviewed the previous Thursday, with no wording changes. Supervisor Robinson moved to accept the executive committee's recommendation on salary and performance evaluation. Passed unanimously without going into closed session." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Marathon County Comprehensive Plan 2026 adopted as amended with Ordinance 0-13-26",
      "Salaries established for clerk of courts, sheriff, and elected department heads for upcoming term",
      "Phase 2 design services authorized for new highway facility",
      "Outside counsel authorized on contingency basis for PFAS litigation",
      "County administrator directed to evaluate past and present PFAS exposure risks in county operations",
      "Capital asset thresholds approved at $10,000 for general assets and $50,000 for infrastructure",
      "Law enforcement drug trafficking response grant accepted with budget amendment",
      "Local state of emergency declaration ratified for blizzard response",
      "County administrator performance evaluation and salary placement approved",
      "Departing supervisors recognized: Crawl, Fifick, Marshall, Rosenberg, Hardinger, V, and Reynolds",
    ],
  },
  {
    id: "D7R7a0G0WTA", source: "weston",
    title: "Parks Committee",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Parks and Recreation Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=D7R7a0G0WTA",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_03232026-1898",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Parks Committee approved selection of Rettler Corporation to develop a master plan for Mock Mueller Park, reviewed Yellow Banks kayak launch expenses showing significant grant funding success, and discussed park impact fees and ice rink operations at Kennedy Park. The committee provided input supporting moderate increases to park impact fees to align with neighboring communities.",
    agenda: [
      { time:"0:05", item:"Call to order and Pledge of Allegiance" },
      { time:"0:30", item:"Roll call" },
      { time:"0:45", item:"Approval of minutes from February 23rd, 2026" },
      { time:"1:00", item:"Public comments" },
      { time:"5:45", item:"Review of parks and recreation impact fee discussion" },
      { time:"25:30", item:"Request for proposals for Mock Mueller Park graphic master plan and budget estimates" },
      { time:"32:00", item:"Review of Yellow Banks kayak launch expenses" },
      { time:"38:00", item:"Discussion on components of operations for ice rink at Kennedy Park" },
      { time:"50:15", item:"Future items and possible next meeting date" },
      { time:"52:30", item:"Adjournment" },
    ],
    discussions: [
      { item:"Approval of minutes from February 23rd, 2026", body:"A motion to accept the minutes was made and seconded. The motion passed unanimously with no discussion." },
      { item:"Review of parks and recreation impact fee discussion", body:"Jennifer presented information on park impact fees, noting the village currently charges $300 per single-family unit while neighboring communities charge $600-$900. The 2020 study recommended $761 per single-family unit. Committee members expressed support for a moderate increase to align with neighboring communities. Roger stated 'we need to get... we want to keep our parks nice.' Katrina supported the moderate increase bracket, noting 'realistically to provide the amenities that we want... I do think we need to increase the costs.' Michael explained the Granite Ridge subdivision's 88 lots would generate $26,400 at current rates versus $52,800 at doubled rates. The discussion was informational with no formal action taken; Jennifer will present comparative data to Plan Commission next month." },
      { item:"Request for proposals for Mock Mueller Park master plan", body:"Seven proposals were received for the park master plan, reviewed by four staff members based on firm experience, personnel, understanding of scope, and cost. The two lowest bidders were JSD and Rettler Corporation. Sean noted Rettler has done recent master plans including Kennedy Park and the comprehensive outdoor recreation plan. Roger made a motion to select Rettler Corporation, seconded by Katrina. The motion passed unanimously." },
      { item:"Review of Yellow Banks kayak launch expenses", body:"Jessica presented a detailed breakdown of the kayak launch project expenses and grant funding. The project received grants from DNR and Marathon County Transportation, with Marathon County covering full ADA accessibility expenses. Lisa Beck praised the RFC during public comment as 'super well written.' Committee members commended staff, particularly Jessica and Dan Hagenbotham, for securing grants that significantly reduced out-of-pocket costs. Dan Hagenbotham and MTS donated site planning work, and PGA provided favorable pricing. The item was informational with no formal action required." },
      { item:"Discussion on ice rink operations at Kennedy Park", body:"Staff presented information on the Kennedy Park ice rink operations per committee request. The warming house has been unattended since 2020 due to COVID and subsequent staffing shortages. Sean noted the rink is well-used and is the only full-size outdoor hockey rink in the area. Everest Youth Hockey has expressed interest in improvements including a covered structure to extend the ice season. Katrina, who requested the discussion, stated she wanted to ensure hockey isn't forgotten amid baseball-focused Kennedy Park discussions. Sean mentioned potential impacts from Marathon Park's hockey facility changes. The committee requested historical attendance figures from 2018-19 and user feedback for a future meeting. No action was taken." },
    ],
    publicComment: "Jim Pinsel of Pinsel Street expressed frustration about not receiving responses to his previous three-page submission of questions regarding playground equipment installation and Kennedy Park updates. He criticized the ice rink cost analysis, arguing actual costs including staff hours are closer to $20,000-$30,000 rather than the stated $1,320.98. Lisa Beck of 1808 Cortez Lane thanked Michael for snow removal during the recent blizzard and praised Sean and Jessica for the well-written Yellow Banks RFC. A written response to Jim Pinsel's previous comments was noted for inclusion in the minutes.",
    actionItems: [
      "Rettler Corporation selected to develop Mock Mueller Park master plan",
      "Jennifer to present park impact fee comparison data to Plan Commission at next month's meeting",
      "Staff to compile historical ice rink attendance figures from 2018-19 seasons for future discussion",
      "Staff to gather user feedback on ice rink operations",
      "Kennedy Park quarterly update scheduled for April board meeting including Glow Games financial information",
      "Next Parks Committee meeting scheduled for April 27th, 2026",
    ],
  },
  {
    id: "8rRo1cm2YJ0", source: "wausau",
    title: "Wausau Finance Committee Meeting",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "Finance", duration: "~1h",
    url: "https://www.youtube.com/watch?v=8rRo1cm2YJ0",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2016/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Finance Committee approved several airport ground leases, denied a tax recovery claim related to ongoing Greenwood Hills litigation, and postponed decisions on joining a national opioid settlement and funding a lead service line project shortfall. The committee also approved budget carryover funds and reviewed 2025 financial results showing a $540,000 surplus after transfers.",
    agenda: [
      { time:"2:01", item:"Call to order and public comment" },
      { time:"2:30", item:"Approval of March 10, 2026 meeting minutes" },
      { time:"3:00", item:"Alleged claim for recovery of unlawful tax for Green Acres at Greenwood Hills LLC" },
      { time:"3:45", item:"Consent to transfer title to buildings at 939 Woods Place" },
      { time:"4:15", item:"Terminating airport ground lease with Win O. Jones at 939 Woods Place" },
      { time:"4:35", item:"Approving airport ground lease with Owen Jones at 939 Woods Place" },
      { time:"4:55", item:"Approving airport ground lease with Cole Lundberg" },
      { time:"5:20", item:"National opioid settlement agreement participation" },
      { time:"12:00", item:"Budget amendment for lead service line replacement project" },
      { time:"27:03", item:"Budget amendment for carryover funds from 2025 to 2026" },
      { time:"37:00", item:"Review of 2025 general fund financial results and debt issuance" },
    ],
    discussions: [
      { item:"March 10, 2026 meeting minutes", body:"Watson moved to approve, Griner seconded. The minutes were approved unanimously with no discussion." },
      { item:"Alleged claim for recovery of unlawful tax for Green Acres at Greenwood Hills LLC", body:"This claim is part of ongoing litigation with Greenwood Hills. Rick Rubble from assessments was present for questions. Watson moved to approve the claim, Griner seconded. The chair explained that a 'no' vote would deny the claim. The motion failed, effectively denying the tax recovery claim." },
      { item:"Airport ground leases and title transfer for 939 Woods Place", body:"Three related items transferred a hangar from Win O. Jones to Owen Jones. Watson moved to approve the consent to transfer title, Griner seconded, passed unanimously. Tierney moved to terminate the lease with Win O. Jones, Watson seconded, passed unanimously. Watson moved to approve the new lease with Owen Jones, Tierney seconded, passed unanimously." },
      { item:"Airport ground lease with Cole Lundberg", body:"Griner moved to approve, Watson seconded. The lease was approved unanimously with no discussion." },
      { item:"National opioid settlement agreement participation", body:"The city received notice it may qualify for a class action settlement involving six defendants and approximately $97 million total. Alder Malini questioned where this came from and expressed discomfort proceeding without more information. Assistant Attorney Vincent explained the city attorney's office received the notice and has until May 4th to decide. Watson noted concerns about signing away future legal remedies. Griner moved to postpone to the next meeting, Tierney seconded. Motion to postpone passed unanimously." },
      { item:"Budget amendment for lead service line replacement project", body:"Eric from Public Works explained that $709,000 in non-construction costs were deemed ineligible for the DNR subsidized loan after the state changed its interpretation. The shortfall breaks down to $284,000 for the homeowner side and $426,000 for the water utility side. Finance Director Marian outlined options including GO borrowing, using general fund reserves, or using PFAS settlement money. Tierney stated opposition to adding more debt given current debt levels. Discussion included potentially using PFAS settlement funds, but the chair noted that would require broader policy discussion. Watson moved to postpone to the next meeting, Griner seconded. Motion to postpone passed unanimously." },
      { item:"Budget amendment for carryover funds from 2025 to 2026", body:"The carryover includes funds for 10 transit buses funded by VW mitigation grants, airport projects awaiting state funding, and unstarted projects including city hall chimney liner, public safety roof, and DPW fence replacement. Watson moved to approve, Griner seconded. Approved unanimously." },
      { item:"Review of 2025 motorpool fund financial results", body:"The finance director reported the motorpool fund shows a net loss of $41,373 before GMT transfer, but a $150,000 profit after. There's a projected cash flow shortfall of $177,000 which may be covered by ARPA savings. Solomon from MotorPool explained two dump trucks ordered in 2023 are still awaiting spreader upfits but are now second in line. This was informational only with no action taken." },
      { item:"Review of 2025 general fund financial results", body:"The general fund showed a surplus of approximately $1.2 million driven by strong building permits, GMT revenue, and investment income. After full motorpool charges, the surplus is $125,000. After proposed transfers to recycling, airport, and parking funds to cover shortfalls, the surplus would be $540,000. Public works, fire, and police departments are over budget primarily due to motorpool charges. Tierney moved to approve the transfers, Watson seconded. Approved unanimously." },
      { item:"2026 general obligation promissory note for capital improvements", body:"The proposed borrowing totals approximately $10 million with $12 million in debt retiring, reducing debt utilization. Projects include street improvements (10-year), motorpool (5-year), and various TID projects with 5-10 year terms. Watson moved to approve the calendar\/schedule, the chair seconded. The committee approved the calendar unanimously, with the parameters resolution to come at the next meeting with Phil Cawson from Ehlers." },
      { item:"Considering purchase of properties for DPW Streets Division", body:"Properties at 108 Adolf Street, 112 Adolf Street, 112.5 Adolf Street, and 233 Myron Street were on the agenda for closed session discussion. Given time constraints before council meeting at 6:30, Watson moved to postpone to the next meeting. Tierney seconded. Motion to postpone passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Denied tax recovery claim for Green Acres at Greenwood Hills LLC",
      "Approved transfer of hangar title and ground leases from Win O. Jones to Owen Jones at 939 Woods Place",
      "Approved airport ground lease with Cole Lundberg",
      "Postponed opioid settlement participation decision to next meeting pending more information from city attorney",
      "Postponed lead service line budget amendment decision to next meeting",
      "Approved budget amendment for 2025-2026 carryover funds",
      "Approved transfers from general fund to recycling, airport, and parking funds",
      "Approved 2026 borrowing calendar with parameters resolution to come at next meeting",
      "Postponed closed session discussion on DPW property purchases to next meeting",
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
  {
    id: "47UbKS2Jqo4", source: "marathon",
    title: "Marathon County Executive Committee Meeting Pt.1",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "Executive Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=47UbKS2Jqo4",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18106",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Executive Committee met briefly before going into closed session to discuss the performance review of the county administrator. All 11 members present voted unanimously to enter closed session, and the public portion of the meeting was very brief.",
    agenda: [
      { time:"0:00", item:"Call to order and Pledge of Allegiance" },
      { time:"0:30", item:"Operational functions required by statute, ordinance, resolution, or policy" },
      { time:"0:35", item:"Performance review of the administrator (Item 3A1)" },
      { time:"2:15", item:"Motion to enter closed session" },
    ],
    discussions: [
      { item:"Performance review of the administrator", body:"The chair explained the committee had the option to go into closed session to discuss the final review of the county administrator, incorporating feedback received from the board the previous Thursday. The chair noted that executive committee members had rated the administrator on various questions using three criteria: needs improvement, successful, and exceptional. Corp counsel was asked to provide a summary with scores averaged on a scale of 0 to 5. A motion was made and seconded to go into closed session. Roll call vote was taken with all 11 members voting aye: Gibbs, Dickinson, Arstead, Boots, Drebeck, Fifick, Mask, Ritter, Morash, and Robinson. The committee then entered closed session." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Committee entered closed session to finalize the county administrator's performance review",
      "Corp counsel to provide summary evaluation scoring of the administrator",
    ],
  },
  {
    id: "0pfKykvicdA", source: "marathon",
    title: "Marathon County HR, Finance, and Property Committee Meeting",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "Marathon County HR, Finance, and Property Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=0pfKykvicdA",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18116/639096091432830000",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County HR, Finance, and Property Committee approved several routine items including a claim disallowance, revised property values for auction, carry forward funds resolution, and a capital assets threshold policy change. The committee also received introductions from new healthcare consultants National Insurance Services and heard detailed financial updates on 2025 year-end closing and 2026 budget status.",
    agenda: [
      { time:"0:00", item:"Claim disallowance - Mercedes Holmes" },
      { time:"2:15", item:"Set revised property values for parcels for public auction" },
      { time:"5:00", item:"Resolution to approve carry forward funds (R20-2026)" },
      { time:"11:45", item:"Resolution to amend capital assets threshold policy" },
      { time:"13:00", item:"Introduction of healthcare consultants - National Insurance Services" },
      { time:"37:15", item:"Audited 2025 year-end fiscal update" },
      { time:"55:00", item:"2026 year-to-date budget update" },
      { time:"57:30", item:"Finance Department quarterly update" },
      { time:"1:07:30", item:"County Treasurer quarterly update" },
      { time:"1:36:45", item:"Announcements and adjournment" },
    ],
    discussions: [
      { item:"Claim disallowance - Mercedes Holmes", body:"Corporation Counsel presented a claim received December 5th from Mercedes Holmes related to the death of her 3-year-old child Zalen Bernett, who was in a treatment foster care home licensed through another agency in Dunn County. Law enforcement and social services investigations found no wrongdoing and the death was determined to be natural causes. Outside counsel recommended formal disallowance. Chair Gibbs moved to disallow the claim per the insurance carrier's recommendation, seconded by Supervisor Lur. Motion carried." },
      { item:"Revised property values for public auction", body:"Staff explained two parcels at 529 Mullen Street and 738 South 3rd Avenue had failed to sell twice on Wisconsin Surplus because bids didn't reach appraised values. Staff requested revised minimum sale prices of $9,000 and $7,500 respectively. Chair Gibbs moved approval, seconded by Supervisor Lur. Motion carried unanimously. Committee Chair Robinson asked about bidders who made errors being marked as non-pay and banned from future auctions." },
      { item:"Resolution to approve carry forward funds", body:"Finance Director Sam presented Resolution R20-2026 for program revenues and multi-year projects. Notable items included replenishing the veterans relief fund with 2025 budget excess (providing approximately 3 years of funding), and $142,731 for administration special projects including $75,000 for homelessness contract. Vice Chair Marshall asked about the register of deeds redacted records fund; staff agreed to research its purpose and potential repurposing. Chair Gibbs moved approval, seconded by Supervisor Hart. Motion carried." },
      { item:"Capital assets threshold policy amendment", body:"Finance Director Sam explained the policy would raise the capitalization threshold from $5,000 to $10,000 for general assets, following GFOA guidance from 2006. This determines whether items are expensed or depreciated as capital assets. Supervisor Hart moved approval, seconded by Chair Gibbs. Motion carried unanimously to forward to full county board." },
      { item:"Introduction of healthcare consultants - National Insurance Services", body:"HR Director Candace introduced NIS representatives following their successful RFP award. Account Executive introduced the team including himself (28 years experience), Jordan Stanley (account manager with public sector HR background), Perry Gilfoil (analytics), Zack Cunningham (support), and Adam Cook (retirement division). They discussed evaluating near-site clinic utilization, exploring self-insured vs. fully insured funding models, and improving transparency with the committee. Vice Chair Marshall asked about cost comparisons with other employers and strategies to reduce ER usage. Chair Gibbs asked about evaluation processes for insurance models and risk tolerance considerations." },
      { item:"2025 year-end fiscal update", body:"Finance Director Sam provided detailed department-by-department review of unaudited 2025 figures. Key items included: county treasurer received $257,238 TID closure payment and $222,752 unclaimed property from the state; opioid fund has $2.2 million in cash with $3.49 million in future settlement payments expected; parks fund saw ice revenue increase $70,000; ARPA funds nearly exhausted with $800,000 interest to be moved. Sam noted capital assets reconciliation still ongoing before final fund balance surplus can be determined." },
      { item:"2026 year-to-date budget update", body:"Sam reported beginning of year figures are aligned with expectations. First quarter closes May 31st, then monthly closeouts thereafter with two-month lag to ensure accuracy. Some reclassification entries needed from 2025 carryover coding." },
      { item:"Finance Department quarterly update", body:"Sam reported the department welcomed a new system financial analyst for payroll and is fully staffed since mid-December. Accomplishments include quarterly closeouts with departments, countywide training on reports and uniform practices, W-2 processing with 'big beautiful bill' overtime calculations, 1099s, random cash audits (all successful), and balance sheet reconciliations. Upcoming work includes payroll budget preparation, policy updates, and continued first quarter closeout. County Administrator Lance commended Sam's team for extensive W-2 work and noted plans to increase the $400,000 social services reserve due to rising correctional care placement costs." },
      { item:"County Treasurer quarterly update", body:"Treasurer Connie reported on tax collections, monitoring of 1,582 delinquent parcels (down from 1,786 last year), eviction hearings, year-end procedures, and processing of February settlements. Staff is working on lottery credit education for municipalities due to numerous errors. Discussion addressed payment agreements (no longer offered due to high default rates), resources for struggling taxpayers, and municipal treasurer training needs. Committee Chair Robinson praised the accelerated tax deed process that helps protect homeowner equity." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Claim of Mercedes Holmes disallowed per insurance carrier recommendation",
      "Revised minimum sale prices set at $9,000 for 529 Mullen Street and $7,500 for 738 South 3rd Avenue for Wisconsin Surplus auction",
      "Resolution R20-2026 approved for carry forward funds to 2026 budget",
      "Capital assets threshold policy amendment forwarded to full county board for approval",
      "Staff to research register of deeds redacted records fund purpose and potential repurposing",
      "Healthcare consultants NIS to provide updates before budget assumptions are developed in early summer",
      "Finance to bring recommendation to increase social services reserve account above current $400,000",
      "Consider improving county website resources for municipal treasurers on tax procedures",
      "Next committee meeting scheduled for April 8th",
    ],
  },
  {
    id: "bb_734863", source: "school_board",
    title: "Committee of the Whole Meeting",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Committee of the Whole", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=734863",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=734863",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, the Wausau School District Board of Education Committee of the Whole was scheduled to address several action items including facility fee amendments for artificial fields, a nutrition purchasing cooperative agreement, and an extensive policy update covering over 60 policies. The meeting was also expected to feature a referendum budget update and recognition of Stettin Elementary through the Excellence in Action segment.",
    agenda: [
      { time:"N\/A", item:"Call to Order" },
      { time:"N\/A", item:"Approve the Minutes" },
      { time:"N\/A", item:"Audit of the Bills" },
      { time:"N\/A", item:"Excellence in Action: Stettin Elementary" },
      { time:"N\/A", item:"Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP) (Action Requested)" },
      { time:"N\/A", item:"Facility Fees (Action Requested)" },
      { time:"N\/A", item:"Referendum Budget Update" },
      { time:"N\/A", item:"NEOLA UPDATE (Action Requested)" },
      { time:"N\/A", item:"NEOLA UPDATE - Policies" },
      { time:"N\/A", item:"NEOLA UPDATE - School Support Organization Related Policies" },
      { time:"N\/A", item:"NEOLA UPDATE - Technical Corrections" },
      { time:"N\/A", item:"NEOLA UPDATE - Act 57 Related Policies" },
      { time:"N\/A", item:"Adjourn" },
    ],
    discussions: [
      { item:"Excellence in Action: Stettin Elementary", body:"The board was scheduled to recognize Stettin Elementary through the district's Excellence in Action program. No additional details or presenter information were provided in the agenda." },
      { item:"Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP)", body:"With an estimated presentation time of 5 minutes, the district's Nutrition Service Department was expected to request approval for continued membership in the Wisconsin School Nutrition Purchasing Cooperative for the 2026-2027 school year. The cooperative requires member districts to present a resolution to their respective boards for approval." },
      { item:"Facility Fees", body:"Ryan Urmanski, Director of Buildings and Grounds, was scheduled to present for approximately 10 minutes on amendments to the Wausau School District Facility Use Fee Schedule. The changes were expected to address costs for use of artificial fields and field lighting for requested events, with the board potentially approving immediate implementation." },
      { item:"Referendum Budget Update", body:"Elizabeth Channel, Interim Assistant Superintendent of Operations, was scheduled to present a 10-minute update on the status of the Referendum Budget. The presentation was expected to provide the committee with current information on referendum-related expenditures and planning." },
      { item:"NEOLA UPDATE", body:"The committee was scheduled to review proposed changes to numerous policies over an estimated 20 minutes. The agenda indicated some suggestions involve only small technical corrections while others are more lengthy and substantive." },
      { item:"NEOLA UPDATE - Policies", body:"The committee was expected to review over 30 policies including those related to definitions, board member behavior, district administrator relationships, reading instructional goals, parent engagement in Title I programs, interscholastic athletics, cell phones and personal communication devices, student drug use policies, third grade promotion, artificial intelligence, and various financial and purchasing policies." },
      { item:"NEOLA UPDATE - School Support Organization Related Policies", body:"Nine policies related to school support organizations were scheduled for review, including student fund-raising, crowdfunding, accountability and oversight, gifts and bequests, district-supported organizations, and advertising and commercial activities." },
      { item:"NEOLA UPDATE - Technical Corrections", body:"Eighteen policies were scheduled for technical corrections, covering topics such as board member qualifications, employment of support staff, medication administration, suspension and expulsion, student activism, video surveillance, crisis intervention, school safety, and threats of violence." },
      { item:"NEOLA UPDATE - Act 57 Related Policies", body:"Four policies related to Act 57 were scheduled for review, including student supervision and welfare policies for administrators, professional staff, and support staff, as well as the child abuse and neglect policy." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Action was requested for continued membership in the Wisconsin School Nutrition Purchasing Cooperative (WiSNP) for the 2026-2027 school year",
      "Action was requested to amend the Facility Use Fee Schedule for artificial fields and field lighting with immediate implementation",
      "Action was requested for approval of NEOLA policy updates covering over 60 policies including substantive changes, school support organization policies, technical corrections, and Act 57 related policies",
    ],
  },
  {
    id: "eIjwnwe6aBE", source: "marathon",
    title: "Marathon County Board Education Meeting Pt.2",
    date: "March 19, 2026", shortDate: "MAR 19",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=eIjwnwe6aBE",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18076/639089973815830000",
    isAgendaOnly: false,
    badge: null,
    overview: "Part 2 of the Marathon County Board Education Meeting on March 19, 2026 continued the board's training and orientation session covering county governance structure, financial management, and policy frameworks. The session focused on equipping board members with the knowledge needed to fulfill their oversight responsibilities.",
    agenda: [
      { time:"N\/A", item:"Continuation from Part 1 - County Financial Systems Overview" },
      { time:"N\/A", item:"Budget Process and Timeline" },
      { time:"N\/A", item:"Levy Limits and State Aid Formulas" },
      { time:"N\/A", item:"Capital Improvement Planning" },
      { time:"N\/A", item:"County Board Rules and Procedures" },
      { time:"N\/A", item:"Ethics and Open Meetings Law Review" },
      { time:"N\/A", item:"Q&A Session with Department Heads" },
    ],
    discussions: [
      { item:"County Financial Systems", body:"Finance Director presented an overview of Marathon County's financial management structure, including the fund accounting system, internal controls, and audit processes. Board members received guidance on reading financial reports and understanding budget-to-actual comparisons." },
      { item:"Budget Process and Levy Limits", body:"The session covered Wisconsin's levy limit law and how it constrains year-over-year property tax increases for the county. Staff walked board members through the annual budget development calendar, from departmental requests through final adoption in November." },
      { item:"Ethics and Open Meetings Law", body:"County Corporation Counsel provided a review of Wisconsin's open meetings law, public records requirements, and ethics rules applicable to county board supervisors. Board members were advised on conflicts of interest, recusal procedures, and proper handling of constituent communications." },
    ],
    publicComment: "Not indicated on agenda - educational session for board members.",
    actionItems: [
      "Board members to complete required ethics training certification",
      "Review county financial reports distributed during session",
      "Submit questions for follow-up to County Administrator",
    ],
  },
,

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
          <div key={i} style={{
            padding: "16px 18px", marginBottom: "0",
            background: i % 2 === 0 ? "#fff" : CREAM,
            borderBottom: `1px solid ${RULE}`,
            cursor: "default", transition: "background 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = `${src.accent}18`}
          onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#fff" : CREAM}
          >
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
