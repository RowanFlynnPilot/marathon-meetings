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
    title: "rQcjCEY36e4",
    date: "April 12, 2026", shortDate: "APR 12",
    committee: "City Council", duration: "~1h",
    url: "https://www.youtube.com/watch?v=rQcjCEY36e4",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Common Council approved a development agreement for the 11 Scott Street\/Waterside Place project (6-3 vote), which will convert a vacant 100,000 square foot building into 52 mid-priced residential units downtown. The council also recognized city public works crews for their response to a record 30.9-inch snowfall and presented the 2026 Sustainability Award to Colby and Colby Millwork for their solar panel installation.",
    agenda: [
      { time:"2:49", item:"Call to order and Pledge of Allegiance" },
      { time:"3:30", item:"Proclamation - Sarah Rafi Day (March 31st)" },
      { time:"7:00", item:"Mayoral citation for Public Works snow removal crews" },
      { time:"15:00", item:"Sustainability Award presentation to Colby and Colby Millwork" },
      { time:"20:00", item:"Approval of March 10, 2026 meeting minutes" },
      { time:"21:00", item:"Public comment period" },
      { time:"23:30", item:"Consent agenda" },
      { time:"24:00", item:"Development agreement for 11 Scott Street\/Waterside Place" },
      { time:"36:00", item:"Mayor appointments to Plan Commission and other boards" },
      { time:"37:02", item:"Solid waste and recycling service agreement with Harter's Fox Valley" },
      { time:"42:00", item:"Settlement resolution - David Holes vs City of Wausau" },
    ],
    discussions: [
      { item:"Development agreement for 11 Scott Street\/Waterside Place", body:"The council approved the joint resolution for the development agreement and amended parking agreement with 11 Scott Street LLC by a vote of 6-3. Alder Rasmusson spoke in favor, noting the project returns parking spaces to public use and provides needed mid-priced housing. Alder Neal supported the project citing $55,000 annual parking revenue, TID 8 closure timeline, and downtown economic benefits. Alder Larson dissented, expressing concern about discounting city parking assets during budget constraints. Alder Tierney questioned how the city would provide 150 parking spaces within 300 yards if the ramp closed; Economic Development Director Randy Feifer explained this reduced an existing obligation from 480 to 150 spaces. Developers Mark Craig and Raleigh Lray spoke during public comment urging support for the $10+ million project." },
      { item:"Mayoral citation for Public Works crews", body:"Mayor Denny presented a mayoral citation recognizing the Department of Public Works plow crews and municipal fleet staff for their response to the record 30.9-inch snowfall from March 14-16, 2026. Kevin Kester, street supervisors Dustin and Josh, storeroom manager Mitch Harris, and mechanic Jieven Matah were specifically mentioned. Kester thanked the plow operators and mechanics, noting the fleet technicians worked 12 straight days and mechanics provided 24-hour breakdown support." },
      { item:"Sustainability Award to Colby and Colby Millwork", body:"Christine Daniels from the Sustainability, Energy and Environment Committee presented the 2026 City of Wausau Sustainability Award to Colby and Colby Millwork. Representatives Mike Thompson and Keith Kaning accepted, describing their 2,000+ solar panel installation that became operational in July 2025, generating enough power for approximately 120 homes and exceeding expectations. They also highlighted LED lighting upgrades, high-efficiency air compressors, and recycling initiatives for wood, aluminum, glass, vinyl, cardboard, and other materials." },
      { item:"Residential solid waste and recycling service agreement", body:"The council approved the seven-year agreement with Harter's Fox Valley disposal by a 9-0 vote. Mayor Denny noted this corrected a previous mix-up regarding whether the term was seven or ten years, confirming it aligned with what public health and safety committee had approved." },
      { item:"Settlement resolution - David Holes vs City of Wausau", body:"Assistant City Attorney Vincent Bonito explained this involved a 2022 bus accident where Transit Mutual insurance paid the city's claim, and the individual who crashed into the bus later filed a personal injury claim. The city's insurer agreed to pay damages, and the resolution releases the city's counter claim. Alder Neal clarified this is separate from the individual's ongoing injury claim. Approved 8-1 without need for closed session." },
    ],
    publicComment: "Two speakers addressed the council. Raleigh Lray and Mark Craig from 11 Scott Street LLC spoke in support of their Waterside Place development project. Craig noted it was over $10 million to bring the 100,000 square foot vacant building back to life, with $8.3 million for the 52 residential units, stating 'Without your help, it won't happen.'",
    actionItems: [
      "Development agreement and parking agreement for 11 Scott Street\/Waterside Place approved 6-3",
      "March 31st proclaimed as Sarah Rafi Day in Wausau",
      "Seven-year solid waste and recycling agreement with Harter's Fox Valley disposal approved",
      "Airspace obstruction removal agreements approved for Scofield Ridgeland properties",
      "2026 budget modification approved for Wausau Police Department to purchase Red Dot Optics from Thompson submachine gun sale proceeds",
      "Paid duty time approved for out-of-country police training",
      "Community outreach professional shelter operations duty premium differential approved",
      "Settlement approved for David Holes vs City of Wausau case",
      "Mayor appointments confirmed for Plan Commission, Affordable Housing Task Force, and Business Improvement District Board",
    ],
  },
  {
    id: "knWZO4dON-8", source: "wausau",
    title: "knWZO4dON-8",
    date: "April 12, 2026", shortDate: "APR 12",
    committee: "Plan Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=knWZO4dON-8",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Plan Commission approved two major items: a conditional use permit for a 70-unit, 7-story apartment building at 731 North First Street for Beacon Resources LLC, and a transportation project plat for Grand Avenue signal replacements. A public hearing was held on a proposed personal storage facility at 218 South Fourth Street, with applicants Jason and Melinda Dunwy speaking in support.",
    agenda: [
      { time:"0:00", item:"Call to order and election of vice chair (skipped until April)" },
      { time:"0:15", item:"Public comment on agenda items" },
      { time:"0:45", item:"Consideration of minutes from February 18th" },
      { time:"1:00", item:"Public hearing on conditional use permit for 218 South Fourth Street personal storage facility" },
      { time:"2:45", item:"Discussion and possible action on conditional use permit for 731 North First Street apartment building" },
      { time:"3:30", item:"Discussion and possible action on transportation project plat for Grand Avenue signal replacements" },
      { time:"4:30", item:"Discussion of next meeting date" },
      { time:"5:00", item:"Adjournment" },
    ],
    discussions: [
      { item:"Minutes from February 18th", body:"Motion to approve made by Bugamman, seconded by Balkan. Passed unanimously with no discussion." },
      { item:"Public hearing on conditional use permit for 218 South Fourth Street personal storage facility", body:"Jason and Melinda Dunwy spoke in favor of the storage facility, arguing that downtown Wausau has added over 400 new apartment units recently including the 153-unit Foundry on Third and 102-unit Evergreen Landing projects. They noted apartment living provides limited storage and there are currently no convenient storage options downtown, forcing residents to go to surrounding areas like Kronenwetter. The public hearing was closed but no action was taken on this item during this meeting." },
      { item:"Conditional use permit for 731 North First Street - 70-unit apartment building", body:"Motion to approve made by Bornman, seconded by Bugamin. No questions or discussion from commissioners. Passed unanimously, approving the 70-unit, 7-story apartment building for Beacon Resources LLC." },
      { item:"Transportation project plat for Grand Avenue signal replacements at Sturgeon and Townline Road", body:"Motion to approve made by Bugamin, seconded by Balkon. No discussion. Passed unanimously, approving project 370-40-40." },
      { item:"Next meeting date", body:"Staff indicated the next regular meeting would be April 21st (third Tuesday), but noted it may need to be moved due to election and council meeting conflicts. Staff will notify commissioners if a change is needed." },
    ],
    publicComment: "One email comment was submitted by Linda Lawrence on March 12th supporting a development proposal, stating housing would be good for downtown small businesses and praising the developer's track record. Jason and Melinda Dunwy spoke in person during the public hearing on the storage facility, advocating for the project to serve downtown's growing residential population.",
    actionItems: [
      "Conditional use permit approved for 731 North First Street 70-unit, 7-story apartment building for Beacon Resources LLC",
      "Transportation project plat approved for Grand Avenue signal replacements at Sturgeon and Townline Road (Project 370-40-40)",
      "Vice chair election postponed until April meeting",
      "Next meeting tentatively scheduled for April 21st at 5:00 PM, subject to change due to election\/council conflicts",
    ],
  },
  {
    id: "hNOP07iJjNY", source: "marathon",
    title: "hNOP07iJjNY",
    date: "April 12, 2026", shortDate: "APR 12",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=hNOP07iJjNY",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board of Supervisors held an educational meeting featuring presentations on PFAS litigation opportunities and renewable energy regulatory authority. No votes were taken as this was an informational session, but the board received detailed information about potentially joining multi-district litigation against PFAS chemical manufacturers and learned about options for protecting county interests regarding proposed wind energy projects in the county.",
    agenda: [
      { time:"0:00", item:"Call to order and Pledge of Allegiance" },
      { time:"1:18", item:"Reading of the notice" },
      { time:"1:52", item:"Roll call and sign-in" },
      { time:"2:30", item:"Public comment period (15 minutes, 5 speakers)" },
      { time:"15:01", item:"Presentation on PFAS multi-district litigation opportunity" },
      { time:"1:01:45", item:"Presentation on renewable energy regulatory authority" },
      { time:"1:05:00", item:"Overview of proposed wind projects in Marathon County" },
      { time:"1:20:02", item:"Discussion of county ordinances and PSC preemption" },
      { time:"1:30:01", item:"County options for addressing renewable energy projects" },
    ],
    discussions: [
      { item:"Public Comment", body:"Five residents spoke during public comment. Cindy Nelson from Stratford reported visiting 200 houses about wind turbine projects, stating no one she spoke with wanted wind turbines. Wendy Rowski from Green Valley urged the board to vote no on the comprehensive plan, objecting to the term 'wind farm' as misleading for industrial facilities. Barb Newton from Rib Mountain reiterated support for speed reduction on Double N Road with 75 petition signatures. Heidi Pesky from Town of McMillan argued joint development agreements are not required for wind project regulation and listed potential risks of such agreements. Cindy Hogan from Rib Mountain supported the Double N Road speed reduction petition." },
      { item:"PFAS Multi-District Litigation Presentation", body:"Attorney Carrie McDougall from Baron and Bud Law Firm presented via WebEx on the opportunity for Marathon County to join the PFAS litigation MDL. He explained the water settlement resulted in $12-15 billion from 3M and DuPont, and that soil-based claims including airports and landfills may be next. Supervisor Robinson asked about scope of claims and whether settlements would restrict future recovery for other exposures like landfills - McDougall indicated the water settlement specifically excluded airport, wastewater, and landfill claims. Vice Chair Dickinson clarified the airport has no known PFAS contamination currently. The litigation would be on a 25% contingency fee basis with no upfront costs to the county." },
      { item:"Renewable Energy Regulatory Authority Presentation", body:"Attorney Rebecca Roker from Atollis Law presented on county authority regarding proposed wind projects including Hub City Wind (Alliant Energy), Marathon Wind (now part of Hub City), and Stormark Wind Energy Center. She explained PSC has approved 33 solar projects with zero denials and that state law preempts local regulation for projects over 100 megawatts. She outlined four options for the county: do nothing, negotiate a joint development agreement (JDA), intervene in PSC proceedings, or litigate. Roker strongly recommended JDAs as the best protection mechanism since they can address liability, environmental impacts, roads, decommissioning, emergency response, and other concerns not otherwise protected by state law." },
    ],
    publicComment: "Five speakers addressed the board: Cindy Nelson (Stratford) opposed wind turbines after canvassing 200 homes; Wendy Rowski (Green Valley) urged rejection of the comprehensive plan over terminology for industrial energy facilities; Barb Newton (Rib Mountain) presented 75 petition signatures supporting speed reduction on Double N Road citing safety concerns; Heidi Pesky (Town of McMillan) warned against joint development agreements for wind projects; Cindy Hogan (Rib Mountain) supported the Double N Road speed reduction.",
    actionItems: [
      "Board to consider resolution on PFAS litigation participation at next week's meeting",
      "Board to consider comprehensive plan vote at next week's meeting",
      "County to evaluate PFAS testing at airport and landfill locations",
      "County to consider options for engaging with proposed wind energy projects including potential joint development agreement negotiations",
    ],
  },
  {
    id: "gugcMAm6DFA", source: "wausau",
    title: "gugcMAm6DFA",
    date: "April 12, 2026", shortDate: "APR 12",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=gugcMAm6DFA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Board of Public Works held a brief meeting to open bids and award the 2026 asphalt paving project. RC Pavers was awarded the contract with the lowest bid of $824,146.34, beating American's bid of $849,872.10.",
    agenda: [
      { time:"0:00", item:"Call to order" },
      { time:"0:07", item:"Open bids and make recommendation for the 2026 asphalt paving project" },
      { time:"0:47", item:"Motion to adjourn" },
    ],
    discussions: [
      { item:"2026 Asphalt Paving Project Bid Opening", body:"Two bids were opened for the asphalt paving project. RC Pavers submitted a bid of $824,146.34, while American submitted a bid of $849,872.10. A motion was made to approve RC Pavers as the winning bidder. The motion was seconded and passed unanimously with all members voting 'aye.'" },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "RC Pavers awarded the 2026 asphalt paving project contract at $824,146.34",
    ],
  },
  {
    id: "f1fZvkxedNY", source: "wausau",
    title: "f1fZvkxedNY",
    date: "April 12, 2026", shortDate: "APR 12",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=f1fZvkxedNY",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Board of Public Works approved contractor selection for the 26th Street construction project, approved a change order for unexpected infrastructure issues on the Randolph\/Cherry Street project, and processed a pay estimate and concrete license. All items passed unanimously with minimal discussion.",
    agenda: [
      { time:"0:01", item:"Call to order" },
      { time:"0:01", item:"Consideration of March 10th regular Board of Public Works minutes" },
      { time:"0:23", item:"Open bids for 26th Street construction project" },
      { time:"1:23", item:"North 8th Avenue bids - postponed" },
      { time:"1:33", item:"2025 Street Construction Project A - Randolph Street, Cherry Street Change Order 1" },
      { time:"5:01", item:"2025 Street Construction Project A - Pay Estimate Number 9" },
      { time:"5:30", item:"Portland cement concrete license for KSK Incorporated" },
      { time:"5:55", item:"Adjournment" },
    ],
    discussions: [
      { item:"March 10th Board of Public Works Minutes", body:"Minutes from the March 10th regular meeting were considered. A motion was made and seconded, passing unanimously with all members voting aye." },
      { item:"26th Street Construction Project Bids", body:"Seven bids were opened and read aloud. Switlick submitted the lowest bid at $1,279,089.75, narrowly beating Hos at $1,280,877.96. Other bidders included A1 ($1,374,600), Francis Melvin ($1,385,383), Steen ($1,489,126), James Peterson ($1,570,698.56), and Earth ($1,686,780.75). A board member noted it was a 'tight bid.' Motion to approve Switlick passed unanimously." },
      { item:"North 8th Avenue Bids", body:"This item was postponed as the bid opening was extended. It will return at a future meeting." },
      { item:"Randolph Street\/Cherry Street Change Order 1", body:"Staff presented four items totaling $14,436.50: an inside drop on a manhole ($4,856) due to an unrecorded large diameter sanitary service; water main tie-in adjustment ($2,317.50) after discovering 6-inch pipe instead of expected 8-inch; miscellaneous storm sewer work ($5,016) for private tie-ins at $66 per linear foot; and geogrid installation ($2,247) for approximately 750 square yards near Thomas Jefferson Elementary due to poor soil conditions. Change Order 2 regarding liquidated damages was deferred. Motion to approve passed unanimously." },
      { item:"Randolph Street\/Cherry Street Pay Estimate 9", body:"Pay estimate number nine for work completed through the end of the year was presented for $535,114.20 to Haw Suns Incorporated. Motion to approve passed unanimously." },
      { item:"Portland Cement Concrete License - KSK Incorporated", body:"Board member Vinnie confirmed he reviewed the application and everything was in order. Motion to approve the license for KSK Inc. passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Switlick awarded 26th Street construction project contract at $1,279,089.75",
      "Change Order 1 for Randolph\/Cherry Street project approved for $14,436.50",
      "Pay Estimate 9 approved for $535,114.20 to Haw Suns Incorporated",
      "Portland cement concrete license approved for KSK Incorporated",
      "North 8th Avenue bid opening rescheduled for future meeting",
      "Change Order 2 for Randolph\/Cherry Street project to return with liquidated damages resolution",
    ],
  },
  {
    id: "aUG3K0hxNsU", source: "weston",
    title: "aUG3K0hxNsU",
    date: "April 12, 2026", shortDate: "APR 12",
    committee: "Finance and Human Resource Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=aUG3K0hxNsU",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Finance and Human Resource Committee debated employee clothing allowance changes following cancellation of the Cintas uniform contract. After multiple failed motions, the committee approved $400 annually for clothing allowance plus a one-time washer\/dryer purchase. The meeting also included an educational presentation on public works operations showing the village spends less per mile on streets than neighboring communities.",
    agenda: [
      { time:"0:01", item:"Call to order and Pledge of Allegiance" },
      { time:"1:08", item:"Roll call" },
      { time:"1:30", item:"Public comments" },
      { time:"3:30", item:"Approval of minutes from February 16, 2026" },
      { time:"4:00", item:"Acknowledge February 2026 financial reports" },
      { time:"4:30", item:"Acknowledge T1 and T2 detail reports for February" },
      { time:"5:00", item:"Acknowledge legal details for February" },
      { time:"5:30", item:"Educational presentation: Public works operations and budget" },
      { time:"40:03", item:"Old business: Amendments to Chapter 5 clothing and equipment allowance" },
      { time:"1:15:01", item:"Discussion of future meeting date (April 21st)" },
    ],
    discussions: [
      { item:"Public Works Operations and Budget Presentation", body:"Public Works Director Michael presented a comprehensive overview of department operations, noting the 2026 budget decreased by $26,000 (1.1%) from 2025. He highlighted that the village manages 119.5 centerline miles of road with 10 full-time staff (one fewer than in 2010). Michael emphasized the village spends approximately $9,700 less per mile than the average central Wisconsin community, making them the third lowest spending community per mile in the region. He detailed the disaster relief application process for the recent major snow event that cost approximately $50,000 and required staff to work 16-17 hour shifts." },
      { item:"Amendments to Chapter 5 - Clothing and Equipment Allowance", body:"Extensive debate occurred over increasing the employee clothing allowance following cancellation of the Cintas uniform contract. Trustee Daniels argued against the proposed $600 increase, citing fiscal responsibility concerns and the upcoming fire department referendum. Michael defended the increase, noting employees already receive this benefit and the village provides good value compared to other communities. Initial motion for $600 failed 2-3 (Daniels yes, Armbrust no, Olsson no, My no, Satai yes). Motion for $400 failed 2-2. Motion for $500 with washer\/dryer failed. Final motion for $400 for remainder of 2026, $400 annually starting 2027, plus one-time washer\/dryer purchase passed with one opposed." },
      { item:"February Financial Reports and Work Products", body:"Committee acknowledged February 2026 financial reports for all funds, T1 and T2 detail reports, and legal details. All items passed unanimously with motions by Steve and seconds by various members." },
      { item:"Minutes Approval", body:"Minutes from February 16, 2026 meeting approved unanimously. Motion by Steve, second by Stephanie." },
    ],
    publicComment: "Lisa Beck of 1808 Cortez Lane offered public comment. She praised Mike for his work during the recent storm and expressed concern about the clothing allowance proposal, suggesting the village could save money by not implementing the highest proposed amount given that employees already receive safety apparel, shirts, hats, and $300 for boots.",
    actionItems: [
      "Recommend to village board: $400 annual clothing allowance for remainder of 2026 and going forward, plus one-time purchase of washer and dryer for staff use",
      "Next meeting scheduled for Tuesday, April 21st at 5:00 PM due to new board member seating",
      "Marathon County disaster relief application to proceed for February storm event costs",
      "New public works employee starting Wednesday to bring staff to 10 members",
    ],
  },
  {
    id: "_hS5GDGVL1c", source: "wausau",
    title: "_hS5GDGVL1c",
    date: "April 12, 2026", shortDate: "APR 12",
    committee: "Public Health & Safety", duration: "~1h",
    url: "https://www.youtube.com/watch?v=_hS5GDGVL1c",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Public Health and Safety Committee approved a parklet permit for Westside Diner and Lounge after the owner presented detailed plans, approved multiple license applications and summer events, repealed outdated municipal code sections, and received updates on the WMC shelter's transition to Bridge Street Mission. One bartender license denial was held pending police chief review of rehabilitation evidence.",
    agenda: [
      { time:"0:00", item:"Call to order and roll call" },
      { time:"0:15", item:"Public comment on agenda items" },
      { time:"0:45", item:"Approval of February 16, 2026 meeting minutes" },
      { time:"1:15", item:"License applications - Westside Diner and Lounge parklet permit" },
      { time:"10:30", item:"License denial recommendations - Theodore Davis and Joanna Gregory" },
      { time:"19:00", item:"Approval of various license applications and summer events" },
      { time:"20:01", item:"Repealing and recreating Municipal Code Chapter 6.44 - Solid Waste Disposal" },
      { time:"22:30", item:"Repealing Municipal Code section on handheld mobile phone use while driving" },
      { time:"25:01", item:"Memorandum of Understanding with Midwest Renewable Energy for solar program" },
      { time:"27:00", item:"Wausau Fire Department 2025 Annual Report" },
      { time:"33:00", item:"Tavern Activities Report - February 2026" },
      { time:"37:00", item:"Community Outreach Update and shelter transition discussion" },
    ],
    discussions: [
      { item:"Westside Diner and Lounge Parklet Permit", body:"Owner Tyler Vote presented detailed mockups of a proposed parklet extending 4 feet into the street and 4 feet onto the sidewalk at 628 North Third Avenue. He explained the parklet would serve breakfast customers seeking morning sun and would be lit with reflective materials for visibility. Larson stated he was 'really sort of against this' initially but was convinced by the layout presentation. The permit was approved unanimously as a one-year trial through October 31, 2026, with Vote asked to return in November to report on how it went." },
      { item:"Theodore Davis Bartender License Denial", body:"Davis appeared to appeal his denial recommendation, stating he made 'a really bad mistake' 20 years ago as a minor that has followed him throughout his life. His boyfriend Matthew Prieb also spoke in support, emphasizing Davis has not reoffended and is a 'genuinely good person.' Davis submitted rehabilitation evidence to Chief Barnes at a previous meeting, but Deputy Chief Baiton was unfamiliar with the review status. The committee voted to hold the matter for the next meeting pending Chief Barnes' review of the rehabilitation documents." },
      { item:"Joanna Gregory Bartender License Denial", body:"Gregory did not appear at the meeting. Her denial was included in the batch motion for license actions." },
      { item:"License Applications Batch Approval", body:"Watson moved and Larson seconded to approve all license recommendations except Theodore Davis, including summer events (Wings over Wausau, Concerts on the Square, Chalkfest, Memorial Day parade, Hope on the Block, Jazz on the River), new ownership at Oasis Arcade, Whiskey River Bar and Grill, and Hayawa - all unanimously recommended by the liquor license review subcommittee. Motion passed unanimously." },
      { item:"Municipal Code Chapter 6.44 - Solid Waste Disposal", body:"Assistant City Attorney Vinnie Bonino presented the repeal and recreation of the solid waste disposal chapter to comply with state-level changes. Larson moved, Watson seconded, and the motion passed unanimously with no discussion." },
      { item:"Handheld Mobile Phone Ordinance Repeal", body:"Bonino explained that state inattentive driving statutes have been amended to regulate cell phone usage, making the city's local ordinance redundant. Watson moved, Larson seconded, and the repeal passed unanimously." },
      { item:"Midwest Renewable Energy Solar Partnership", body:"Carrie from Planning reported the Sustainability Committee unanimously recommended this MOU on March 5th. Alder Sarah noted as someone with solar on her house that MREA's expertise is valuable given the complexity of solar installation and rebates. Watson moved, Larson seconded, and the motion passed unanimously." },
      { item:"Fire Department Annual Report", body:"Fire Chief reported over 7,200 calls in 2025, averaging 20 per day. He announced the department was notified Friday that it maintained ISO Class 2 status for the next four years. The chair promoted upcoming referendum informational sessions on March 31st at the tech center (1:00 PM), April 1st at Station 2 (5:00 PM), and April 3rd at Station 1. The report was placed on file." },
      { item:"Shelter Transition to Bridge Street Mission", body:"Tracy Durante reported 415 unduplicated guests since the WMC shelter opened, with over 740 volunteer hours in February alone. James Torensson, new Director of Homeless Services at Bridge Street Mission, announced the shelter transition is expected around April 20th, pending contractor confirmation on April 1st. Durante confirmed the WMC shelter extended its contract with First United Methodist Church through April 19th to ensure no gap in service. Watson requested the committee tour the new facility after opening." },
    ],
    publicComment: "Carrie Mor Everest of 1025 Everest Boulevard spoke during public comment at the end of the meeting, criticizing how 911 responders have treated unhoused individuals at the shelter during emergencies she witnessed while volunteering. She stated the unhoused are 'treated differently' than other citizens and that her complaints over 10 months have 'gone nowhere.' The chair noted formal complaint processes exist through the Police and Fire Commission.",
    actionItems: [
      "Parklet permit approved for Westside Diner and Lounge at 628 North Third Avenue through October 31, 2026 - owner to report back in November",
      "Theodore Davis bartender license decision held pending Chief Barnes' review of rehabilitation evidence",
      "Joanna Gregory bartender license denied (did not appear)",
      "All other license applications and summer events approved as recommended",
      "Municipal Code Chapter 6.44 repealed and recreated",
      "Municipal Code section 10.01.012 on handheld mobile phones repealed",
      "MOU with Midwest Renewable Energy for Grow Solar program approved",
      "WMC shelter to extend through April 19th; Bridge Street Mission shelter expected to open around April 20th",
      "Council tour of Bridge Street Mission shelter planned for ribbon cutting ceremony",
    ],
  },
  {
    id: "Izfp0CD_Da0", source: "weston",
    title: "Izfp0CD_Da0",
    date: "April 12, 2026", shortDate: "APR 12",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=Izfp0CD_Da0",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Board of Trustees approved multiple ordinances including rezoning requests and a modified speed limit ordinance for Weston Avenue, rejected the original speed limit proposal 4-3 before passing an amended version keeping Von Kennel to Highway J at 45 mph. The board also heard passionate public comment criticizing the upcoming fire department referendum and approved various infrastructure contracts and park-related items.",
    agenda: [
      { time:"0:01", item:"Call to order and Pledge of Allegiance" },
      { time:"0:01", item:"Roll call" },
      { time:"1:30", item:"Public comments - Jim Pensel on fire department funding" },
      { time:"5:01", item:"Minutes from February 16th meeting" },
      { time:"5:30", item:"Acknowledge reports from boards, committees, and commissions" },
      { time:"7:00", item:"Department reports (Administrator, Clerk, Finance, Fire\/EMS, Parks, Planning, Police, Public Works, Technology)" },
      { time:"20:02", item:"Ordinances - Rezoning and speed limit changes" },
      { time:"30:01", item:"Resolution - Hinter Springs Second Edition subdivision final plat" },
      { time:"31:30", item:"Discussion on April 2026 referendum informational sessions" },
      { time:"35:02", item:"E-bike and euro ordinance discussion" },
      { time:"40:00", item:"Parking restrictions removal at Kennedy Park area" },
      { time:"44:00", item:"Baseball\/softball field maintenance agreement and park fees" },
    ],
    discussions: [
      { item:"Public Comment - Fire Department Funding", body:"Jim Pensel of 5002 Aerrol Street spoke critically about the board's approach to fire department funding. He praised SAFER staff after attending their citizen academy but criticized the referendum approach, stating 'We don't have a revenue problem here in Weston. We have a priority problem.' He argued fully funding fire\/police are needs while turf fields and aquatic center are wants, urging the board to 'stop looking for the easy way out through referendums.'" },
      { item:"Finance Director Response to Public Comment", body:"Finance Director Jessica responded emotionally to the public comment, explaining the village cannot borrow for additional firefighters (only capital projects like the Kennedy Park turf). She noted the village is 'the cheapest' and most efficient but cannot do more without additional revenue. She expressed frustration with criticism, stating 'maybe in a couple months my position will be open' and noting the $150,000 salary could fund one firefighter." },
      { item:"Speed Limit Ordinance 26-006", body:"The original ordinance setting Weston Avenue from Von Kennel to Ryan at 35 mph failed 3-4, with Maloney, Jordan, and the President voting no. Trustee Maloney argued the road section from Von Kennel to J should remain 45 mph due to sparse driveways compared to other 35 mph roads. An amended motion by Maloney, seconded by Jordan, was approved keeping Von Kennel to Camp Phillips at 35 mph but Von Kennel to Highway J at 45 mph, with only Trustee Karns voting no." },
      { item:"Rezoning Ordinances", body:"Two rezoning ordinances were approved unanimously as recommended by the Planning Commission: Ordinance 26-00004 rezoning a portion of 8905 Bert Street from RR5 to SFS, and Ordinance 26-00005 rezoning a portion of 7105 Christensen Avenue from SL to SFS single family residential small lot." },
      { item:"Intersection Signage at Community Center Drive and Birch Street", body:"The board approved changing the stop sign to a yield sign with a friendly amendment adding a stop sign for bicyclists coming off the pedestrian bridge. Trustee Hooang raised safety concerns about cyclists coming off the bridge at 15-20 mph, leading to the addition of a bicycle stop sign at the bridge landing. Motion passed unanimously." },
      { item:"Baseball\/Softball Field Maintenance Agreement", body:"The board approved a 10-year maintenance and user agreement for baseball\/softball fields at Kennedy Park. The lengthy term was justified to protect village investment and provide stability for youth organizations. Two highlighted additions were the 10-year term and village authority to determine when fields can be used for safety reasons." },
      { item:"Remote Meeting Attendance Policy", body:"Trustee Lewis recommended postponing discussion until the next meeting so the newly seated board could make the decision. The motion to defer was approved unanimously." },
      { item:"E-bike and Euro Ordinance", body:"The board voted to table the proposed e-bike ordinance until Marathon County finalizes their process and the MPO completes their work. The item will return when more information is available from the county." },
    ],
    publicComment: "Jim Pensel of 5002 Aerrol Street spoke for approximately 4 minutes criticizing the board's approach to fire department funding. He praised SAFER staff after attending their inaugural citizen academy but argued the referendum approach is short-sighted, noting the $600,000 levy has no sunset date and won't keep pace with costs. He urged the board to prioritize fire and police funding over 'wants' like artificial turf and the aquatic center.",
    actionItems: [
      "Speed limit ordinance approved with amendment: Von Kennel to Camp Phillips at 35 mph, Von Kennel to Highway J at 45 mph",
      "Rezoning approved for portions of 8905 Bert Street and 7105 Christensen Avenue to SFS zoning",
      "Final plat approved for Hinter Springs Second Edition subdivision",
      "No parking restrictions removed on west side of Alderson Street along Kennedy Park",
      "Yield sign to replace stop sign at Community Center Drive\/Birch Street with bicycle stop sign added at bridge landing",
      "10-year baseball\/softball field maintenance agreement approved",
      "Commercial rotary mower purchase approved",
      "Park shelter fees and field rental costs approved",
      "Eagle Scout project at McKiller Park approved with funding from park operations",
      "Microsoft Teams approved for trustee communication starting next term",
      "Remote meeting attendance policy deferred to next meeting for new board to decide",
      "E-bike ordinance tabled pending county finalization",
      "Multiple infrastructure contracts approved: Military Road utility engineering, Business 51 storm pond amendment, sewer televising software, stream maintenance plan, hospital area repaving change order, well rehabilitation, sign encroachment agreement",
      "Next meeting scheduled for Tuesday, April 21st at 6 PM with new board members",
    ],
  },
  {
    id: "HwjjV4oIneA", source: "marathon",
    title: "HwjjV4oIneA",
    date: "April 12, 2026", shortDate: "APR 12",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=HwjjV4oIneA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board of Supervisors adopted the 2026 Comprehensive Plan with 10 amendments addressing renewable energy language, AI\/automation policy, data centers, and other topics. The board also established salaries for elected officials, authorized Phase 2 design for a new highway facility, approved engagement of outside counsel for PFAS litigation, and ratified the emergency declaration from the recent blizzard.",
    agenda: [
      { time:"0:12", item:"Call to order, pledge of allegiance, and moment of reflection" },
      { time:"1:15", item:"Reading of notice and roll call" },
      { time:"2:30", item:"Standing committee reports" },
      { time:"2:45", item:"Consent agenda items C8 through C13 B2" },
      { time:"3:15", item:"D14 - Adopting Marathon County Comprehensive Plan 2026 (Ordinance 0-13-26)" },
      { time:"1:20:01", item:"E15 - Establishing salaries for elected officials (Resolution 12-26)" },
      { time:"1:21:00", item:"E16 - Highway facility Phase 2 design services (Resolution 13-26)" },
      { time:"1:24:00", item:"E17 - PFAS litigation outside counsel (Resolution 14-26)" },
      { time:"1:29:00", item:"E18-E19 - Budget carry forwards and capital asset threshold resolutions" },
      { time:"1:30:01", item:"F20 - Law enforcement drug trafficking grant; G21 - Emergency declaration ratification" },
      { time:"1:35:00", item:"H22 - Administrator performance evaluation and salary" },
      { time:"1:38:00", item:"Announcements and adjournment" },
    ],
    discussions: [
      { item:"Consent Agenda (C8-C13 B2)", body:"Motion by Supervisor Rosenberg, second by Supervisor V. Passed unanimously with no discussion." },
      { item:"Comprehensive Plan 2026 (D14)", body:"Administrator Leonard presented 10 proposed amendments. Amendment 1 (livability standards) passed unanimously. Amendments 2, 3, and 4 (alternative energy language changes suggested by Vice Chair Dickinson) were separated after motion by Supervisor Crawl; each passed but not unanimously. Amendment 5 (data centers\/battery storage background) passed not unanimously, with Supervisor Leur voting no citing ideological concerns. Amendment 6 (radon\/lead) passed unanimously. Amendment 7 (regulate data centers when allowed by law) passed not unanimously. Amendment 8 (AI\/automation language by Supervisor Leur) passed unanimously. Amendment 9 was heavily debated - Supervisor Sindellski proposed promoting clean coal, natural gas and nuclear; Supervisor Boots offered amendment changing language to 'promote coal and natural gas until a long-term sustainable and reliable energy source can be found that does not adversely affect agricultural land'; Supervisors Robinson and Rosenberg opposed citing no such thing as clean coal; amended version passed not unanimously. Supervisor Sindellski's additional amendment on utility-scale wind\/solar as industrial uses was debated; motion to refer to ERC committee failed; amendment itself was defeated. Final comprehensive plan as amended passed not unanimously." },
      { item:"Salaries for Elected Officials (E15)", body:"Resolution 12-26 establishing salaries for clerk of courts, sheriff, and elected department heads for upcoming term. Motion by Supervisor Conway, second by Supervisor Rosenberg. Passed with no discussion." },
      { item:"Highway Facility Phase 2 Design (E16)", body:"Resolution 13-26 authorizing Phase 2 design services. Supervisor Soyber requested future information on plans for the old facility. Supervisor Sindellski asked about the $53 million cost estimate but Chair Gibbs clarified that cost approval was not part of this resolution. Passed unanimously." },
      { item:"PFAS Litigation Outside Counsel (E17)", body:"Resolution 14-26 authorizing contingency-based lawsuits for PFAS contamination. Two amendments adopted: Supervisor Robinson's amendment directing the administrator to evaluate past practices that may have resulted in PFAS exposure (passed unanimously), and Vice Chair Dickinson's amendment adjusting airport-related language (passed unanimously). Final resolution as amended passed unanimously." },
      { item:"Budget Carry Forwards (E18)", body:"Resolution R-20-26. Motion by Supervisor Morash, second by Supervisor Arstead. Passed with no discussion." },
      { item:"Capital Asset Threshold (E19)", body:"Resolution 21-26 setting $10,000 threshold for general capital assets and $50,000 for infrastructure. Motion by Supervisor Robinson, second by Supervisor Mask. Passed but not unanimously." },
      { item:"Law Enforcement Drug Trafficking Grant (F20)", body:"Resolution R-17-26 amending budget to accept grant. Motion by Supervisor Jeang, second by Supervisor P. Passed unanimously." },
      { item:"Emergency Declaration Ratification (G21)", body:"Resolution 22-26 ratifying local state of emergency for blizzard response. Administrator Leonard explained the declaration preserves reimbursement opportunities and praised staff for 600+ hours of additional work during the event, with employees working 12-16 hour shifts. Supervisor Fifer echoed thanks to staff. Passed unanimously." },
      { item:"Administrator Performance Evaluation (H22)", body:"Chair Gibbs explained the executive committee completed the evaluation based on board input. Supervisor Robinson moved to accept the executive committee's recommendation on salary and performance evaluation. Second by Supervisor Cavalli. Passed unanimously without going into closed session." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Comprehensive Plan 2026 adopted with 10 amendments as Ordinance 0-13-26",
      "Salaries established for clerk of courts, sheriff, and elected department heads for upcoming term",
      "Phase 2 design services authorized for new highway facility",
      "Outside counsel authorized on contingency basis for PFAS litigation",
      "Administrator directed to evaluate county PFAS exposure risks",
      "Budget carry forwards and capital asset thresholds approved",
      "Law enforcement drug trafficking response grant accepted",
      "Local state of emergency declaration ratified",
      "Administrator performance evaluation and salary approved",
      "Departing supervisors recognized: Crawl, Fifick, Marshall, Rosenberg, Hardinger, V, and Reynolds",
    ],
  },
  {
    id: "D7R7a0G0WTA", source: "weston",
    title: "D7R7a0G0WTA",
    date: "April 12, 2026", shortDate: "APR 12",
    committee: "Parks and Recreation Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=D7R7a0G0WTA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Parks and Recreation Committee approved the February 2026 meeting minutes, selected Rettler Corporation for the Mox Mueller Park master plan, and discussed increasing park impact fees to align with neighboring communities. The committee also reviewed Yellow Banks kayak launch expenses and ice rink operations at Kennedy Park.",
    agenda: [
      { time:"0:05", item:"Call to order and Pledge of Allegiance" },
      { time:"0:30", item:"Roll call" },
      { time:"0:45", item:"Approval of minutes from February 23rd, 2026" },
      { time:"1:00", item:"Public comments" },
      { time:"5:30", item:"Review of parks and recreation impact fee discussion" },
      { time:"25:30", item:"Discussion on requests for proposals for Mox Mueller Park master plan" },
      { time:"32:00", item:"Review of Yellow Banks kayak launch expenses" },
      { time:"38:00", item:"Discussion on ice rink operations at Kennedy Park" },
      { time:"50:00", item:"Future items and next meeting date" },
      { time:"52:30", item:"Remarks from staff and committee members and adjournment" },
    ],
    discussions: [
      { item:"Approval of minutes from February 23rd, 2026", body:"A motion to accept the minutes was made and seconded. The motion passed unanimously with no discussion." },
      { item:"Public comments", body:"Jim Pinsel expressed frustration about not receiving responses to his previous questions about playground equipment installation and Kennedy Park fundraising. He criticized the ice rink cost analysis for not including labor costs, estimating true costs at $20,000-$30,000 rather than the stated $1,320.98. Lisa Beck praised staff for snow plow work during the blizzard and complimented the Yellow Banks RFC documentation. A written response to Jim Pinsel's previous email was also submitted for the record." },
      { item:"Parks and recreation impact fee discussion", body:"Jennifer presented information on park impact fees, noting current fees of $300 for single family units are significantly below the $761 maximum allowed by the 2020 study. Neighboring communities charge $600-$900 for single family homes. The committee discussed how current fees only cover about one-third of costs for amenities like paths in new subdivisions. Committee members Katrina and Roger expressed support for a moderate increase to align with neighboring communities while remaining competitive for development. No action was taken; information will go to Plan Commission." },
      { item:"Requests for proposals for Mox Mueller Park master plan", body:"Seven proposals were received for the park master plan, reviewed by four staff members. JSD and Rettler Corporation were the two lowest bidders with similar pricing and relevant experience. Roger made a motion to select Rettler Corporation, seconded by Katrina. The motion passed unanimously." },
      { item:"Yellow Banks kayak launch expenses", body:"Jessica presented a comprehensive breakdown of kayak launch expenses and grant funding. Multiple grants from DNR, Marathon County, and other sources significantly reduced the village's out-of-pocket costs. Committee members praised Jessica and Dan Hagenbotham for their grant writing work. PGA donated labor and equipment, and MTS donated site planning. Katrina suggested formal recognition for Dan Hagenbotham. The item was informational with no action required." },
      { item:"Ice rink operations at Kennedy Park", body:"Staff presented information on Kennedy Park ice rink operations as requested by Katrina. The warming house has been unattended since 2021-22 due to staffing difficulties. Everest Youth Hockey remains interested in improvements including a roof structure, and discussions continue about potential enhancements tied to changes at Marathon Park facilities. Katrina emphasized not wanting hockey interests forgotten amid baseball focus at Kennedy Park. Committee requested historical attendance data from 2018-19 seasons and user feedback for future meetings." },
    ],
    publicComment: "Jim Pinsel (Street address) spoke for approximately 3 minutes expressing frustration about lack of response to his previous written questions regarding playground equipment installation and ice rink costs, criticizing the cost analysis as incomplete. Lisa Beck (1808 Cortez Lane) briefly thanked staff for snow plow work during the blizzard and praised the Yellow Banks RFC documentation. A written response to Jim Pinsel's previous email was also submitted for the record.",
    actionItems: [
      "Approved minutes from February 23rd, 2026 meeting",
      "Selected Rettler Corporation for Mox Mueller Park master plan and budget estimates",
      "Jennifer to present park impact fee information and neighboring community comparisons to Plan Commission next month",
      "Staff to compile historical ice rink attendance data from 2018-19 seasons for future meeting",
      "Staff to gather user feedback on ice rink operations",
      "Quarterly Kennedy Park project update scheduled for April board meeting",
      "Next meeting scheduled for April 27th, 2026",
    ],
  },
  {
    id: "8rRo1cm2YJ0", source: "wausau",
    title: "8rRo1cm2YJ0",
    date: "April 12, 2026", shortDate: "APR 12",
    committee: "Finance", duration: "~1h",
    url: "https://www.youtube.com/watch?v=8rRo1cm2YJ0",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Finance Committee denied a tax recovery claim related to ongoing Greenwood Hills litigation, approved multiple airport ground lease transfers, and postponed decisions on an opioid settlement participation and lead service line replacement funding. The committee also reviewed 2025 financial results showing a general fund surplus of approximately $540,000 after transfers.",
    agenda: [
      { time:"2:01", item:"Call to order and public comment" },
      { time:"2:25", item:"Approval of March 10, 2026 meeting minutes" },
      { time:"2:48", item:"Alleged claim for recovery of unlawful tax for Green Acres at Greenwood Hills LLC" },
      { time:"3:32", item:"Consent to transfer title to buildings at 939 Woods Place" },
      { time:"4:05", item:"Terminating airport ground lease with Win O. Jones" },
      { time:"4:25", item:"Approving airport ground lease with Owen Jones" },
      { time:"4:45", item:"Approving airport ground lease with Cole Lundberg" },
      { time:"5:05", item:"Participation in national opioid settlement agreement" },
      { time:"12:00", item:"Budget amendment for lead service line replacement project" },
      { time:"27:03", item:"Budget amendment for carryover funds from 2025 to 2026" },
      { time:"29:15", item:"Review of 2025 motorpool fund financial results" },
      { time:"37:00", item:"Review of 2025 general fund financial results" },
      { time:"47:00", item:"Approving 2026 general obligation promissory note for capital improvements" },
      { time:"52:01", item:"Considering purchase of properties for DPW Streets Division" },
    ],
    discussions: [
      { item:"Alleged claim for recovery of unlawful tax for Green Acres at Greenwood Hills LLC", body:"This claim is part of ongoing litigation with Greenwood Hills. Rick Rubble from assessments was available for questions. Alder Watson moved to approve the claim, seconded by Griner. The chair explained that a 'no' vote would deny the claim. The motion failed when members voted 'no' to deny the claim." },
      { item:"Airport ground lease transfers at 939 Woods Place", body:"Three related items were approved to transfer a hangar from Win O. Jones to Owen Jones. The committee approved consent to transfer title (Watson motion, Griner second), terminated the ground lease with Win O. Jones (Tierney motion, Watson second), and approved a new ground lease with Owen Jones (Watson motion, Tierney second). All passed unanimously. A separate ground lease with Cole Lundberg was also approved (Griner motion, Watson second)." },
      { item:"Participation in national opioid settlement agreement", body:"Assistant attorney Vincent explained this class action opportunity came via letter from law firms seeking potential plaintiffs. Alder Maloney questioned where this came from and expressed discomfort proceeding without more information. Alder Watson raised concerns about signing away future remedies. The deadline to opt in is May 4th. Griner moved to postpone to the next meeting, seconded by Tierney, which passed unanimously." },
      { item:"Budget amendment for lead service line replacement project", body:"Eric from public works explained that the DNR changed funding terms after initial agreement, making $709,000 in non-construction costs ineligible for the subsidized loan. The committee discussed options including using general fund surplus for the $283,868 private side and potentially using PFAS settlement money for the $425,803 public side. Alder Tierney opposed adding more debt. Watson moved to postpone to the next meeting, seconded by Griner, passed unanimously." },
      { item:"Budget amendment for carryover funds from 2025 to 2026", body:"Finance Director explained the carryover includes items like 10 transit buses funded by VW mitigation grants and airport projects awaiting state draw requests. Some projects like city hall chimney liner and public safety roof haven't started yet. Watson moved to approve, Griner seconded, passed unanimously." },
      { item:"Review of 2025 motorpool fund financial results", body:"The finance director reported motorpool continues to struggle with cash flow. After transferring GMT money of $191,000, the fund shows $150,000 net profit, but has a projected $177,000 cash shortfall when outstanding purchase orders are filled. ARPA savings may cover this shortfall. Solomon from Motorpool explained two dump trucks from 2023 are nearly ready (second and third in line for upfits), and a recent med unit had issues and was sent back to AEV. This was informational only." },
      { item:"Review of 2025 general fund financial results", body:"The general fund showed a surplus of approximately $1.2 million driven by strong revenues including building permits, GMT money, and investment income. Public works, fire, and police were over budget primarily due to motorpool charges. CCITC was over budget by $194,000 due to communication issues including unbudgeted website costs and Office 365 upgrade. After proposed transfers to recycling, airport, and parking funds, surplus would be $540,000. Tierney moved to approve the transfers, Watson seconded, passed unanimously." },
      { item:"Approving 2026 general obligation promissory note for capital improvements", body:"The committee reviewed the borrowing calendar for 2026 capital improvements including general street projects (10-year), motorpool (5-year), and various TID projects. Most projects have already been bid out. Watson moved to approve the calendar, chair seconded. Phil Cawson from Ehlers will present parameters resolution at next meeting. The finance director noted debt utilization will decrease by about $2 million even with new issuance. Passed unanimously." },
      { item:"Considering purchase of properties for DPW Streets Division", body:"This item regarding properties at 108, 112, 112½ Adolf Street and 233 Myron Street was scheduled for closed session. Due to time constraints before council meeting and no urgent timeline, Watson moved to postpone to next meeting, Tierney seconded, passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Denied tax recovery claim for Green Acres at Greenwood Hills LLC (related to ongoing litigation)",
      "Approved transfer of hangar at 939 Woods Place from Win O. Jones to Owen Jones (three related motions)",
      "Approved airport ground lease with Cole Lundberg",
      "Postponed opioid settlement participation decision to next meeting - need more information before May 4th deadline",
      "Postponed lead service line replacement funding decision to next meeting",
      "Approved budget amendment for 2025-2026 carryover funds",
      "Approved transfers from general fund to recycling, airport, and parking funds to cover shortfalls",
      "Approved 2026 borrowing calendar - parameters resolution to come at next meeting with Ehlers representative",
      "Postponed closed session discussion on DPW property purchases to next meeting",
    ],
  },
  {
    id: "47UbKS2Jqo4", source: "marathon",
    title: "47UbKS2Jqo4",
    date: "April 12, 2026", shortDate: "APR 12",
    committee: "Executive Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=47UbKS2Jqo4",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Executive Committee met briefly before voting unanimously to enter closed session to discuss the performance review of the county administrator. The committee was considering feedback received from the board the previous Thursday to finalize the administrator's evaluation.",
    agenda: [
      { time:"0:00", item:"Call to order" },
      { time:"0:05", item:"Pledge of Allegiance" },
      { time:"0:30", item:"Performance review of the administrator (Item 3A1)" },
      { time:"1:45", item:"Motion to enter closed session" },
    ],
    discussions: [
      { item:"Performance review of the administrator", body:"The chair explained the committee had the option to go into closed session to finalize the administrator's review, incorporating board feedback received the previous Thursday. The evaluation used a rating scale with three criteria (needs improvement, successful, exceptional) scored 0-5. Corporation counsel was asked to provide a summary of the appraisal. A motion was made and seconded to enter closed session." },
      { item:"Motion to enter closed session", body:"The committee voted by roll call to enter closed session. Members voting aye: Gibbs, Dickinson, Arstead, Boots, Drebeck, Fifick, Mask, Ritter, Morash, and Robinson. The motion passed unanimously (10-0)." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Committee entered closed session to discuss county administrator performance evaluation",
      "Corporation counsel to present summary of administrator's performance appraisal during closed session",
    ],
  },
  {
    id: "0pfKykvicdA", source: "marathon",
    title: "0pfKykvicdA",
    date: "April 12, 2026", shortDate: "APR 12",
    committee: "Marathon County Human Resources & Finance Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=0pfKykvicdA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County HR & Finance Committee approved several routine matters including a claim disallowance related to a child death case, revised property values for public auction, carry forward funds resolution, and a capital asset threshold policy change. The committee also received introductions from new healthcare consultants and detailed fiscal updates for 2025 year-end and 2026 year-to-date.",
    agenda: [
      { time:"0:00", item:"Claim disallowance - Mercedes Holmes" },
      { time:"2:41", item:"Revised property values for public auction parcels" },
      { time:"5:00", item:"Resolution to approve carry forward funds" },
      { time:"11:46", item:"Resolution to amend capital assets threshold policy" },
      { time:"12:49", item:"Introduction of healthcare consultants - National Insurance Services" },
      { time:"37:08", item:"Audited 2025 year-end fiscal update" },
      { time:"55:03", item:"2026 year-to-date fiscal update" },
      { time:"57:42", item:"Finance Department quarterly update" },
      { time:"1:07:42", item:"County Treasurer update" },
      { time:"1:37:01", item:"Announcements and adjournment" },
    ],
    discussions: [
      { item:"Claim disallowance - Mercedes Holmes", body:"The committee considered a claim filed December 5th by Mercedes Holmes relating to the death of her 3-year-old child, Zalen Bernett, who was placed in a treatment foster care home licensed through another agency in Dunn County. The death was determined to be from natural causes with no wrongdoing found through law enforcement and social services investigations. Outside counsel and the insurance carrier recommended disallowance. Chair Gibbs moved to disallow the claim, seconded by Supervisor Lur. The motion carried." },
      { item:"Revised property values for public auction", body:"Two parcels that failed to sell twice on Wisconsin Surplus were presented for revised minimum sale prices. The parcel on Mullen Street was set at $9,000 and South Third Avenue at $7,500. Chair Gibbs moved approval, Supervisor Lmer seconded. Motion carried unanimously. Discussion noted that a bidder who caused errors was marked as non-pay and barred from future auctions." },
      { item:"Resolution to approve carry forward funds", body:"Sam from Finance presented Resolution R20-2026 for program revenues and restricted funds to carry forward to 2026. Notable items included veterans relief fund replenishment (which will provide about three years of funding), special projects carryover of $142,731.39 (including $75,000 for homelessness contract), and redacted records funds for Register of Deeds. Vice Chair Marshall asked about redaction funds; staff will provide future clarification. Chair Gibbs moved approval, Supervisor Hart seconded. Motion carried." },
      { item:"Capital assets threshold policy amendment", body:"Sam presented a resolution to increase the capital asset threshold from $5,000 to $10,000, following GFOA guidance from 2006. Supervisor Hart moved approval, Chair Gibbs seconded. Motion carried unanimously." },
      { item:"Introduction of healthcare consultants", body:"National Insurance Services representatives introduced themselves as the county's new healthcare consulting firm following an RFP process. The team of five, led by a consultant with 28 years experience and account manager Jordan Stanley, specializes in public sector benefits. They outlined plans to evaluate the county's medical funding model (fully insured vs. self-insured), improve near-site clinic utilization, and provide regular reporting to the committee. Vice Chair Marshall asked about per-member costs compared to other employers and strategies for appropriate emergency room use. Chair Gibbs inquired about evaluation processes for self-insured options and risk tolerance." },
      { item:"2025 year-end fiscal update", body:"Sam provided detailed department-by-department fiscal update. Key items included: TID closure check of $257,238 from City of Wausau, unclaimed property of $222,752 from state, sales tax of approximately $2 million, opioid fund balance of $2.2 million with $3.49 million in future settlements expected. Parks fund saw increased revenue including $70,000 from ice programming. Capital projects and highway fund still need reconciliation. The final fund balance surplus will be reported at the next meeting once capital assets are reconciled." },
      { item:"Finance Department quarterly update", body:"Sam reported on department activities including welcoming a new financial analyst for payroll, quarterly closeouts with departments, countywide training on uniform practices, W-2 processing complications from the 'big beautiful bill' no-tax-on-overtime calculations, 1099 processing, random cash audits (all successful), and policy development. First quarter closeout is scheduled for May 31st, with monthly closeouts thereafter. Administrator Lance commended Sam and her team for their work on W-2s and year-end processes. Multiple committee members expressed appreciation for improved reporting and transparency." },
      { item:"County Treasurer update", body:"Connie reported on tax collections, year-end procedures, February settlements, and mailing of 1,582 delinquent tax notices (down from 1,786 last year). Discussion covered municipal treasurer errors in lottery credit processing and tax receipt procedures, with plans for education sessions with Transcendent\/Ascent Land Records. Supervisor Lur asked about poverty trends and resources for struggling taxpayers. Administrator Lance clarified that payment agreements were discontinued because they often increased debt through interest while individuals failed to keep current taxes paid, and explained the eviction process relates specifically to county tax deed proceedings, not general evictions." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Disallowed claim of Mercedes Holmes regarding child death case",
      "Set revised minimum sale prices: 529 Mullen Street at $9,000 and 738 South Third Avenue at $7,500",
      "Approved Resolution R20-2026 for carry forward funds to 2026",
      "Approved capital asset threshold policy increase from $5,000 to $10,000 to be forwarded to full county board",
      "Finance to provide Register of Deeds redaction fund clarification at future meeting",
      "Healthcare consultants to provide update before budget assumption development in early summer",
      "Administration to bring recommendation for increased social services reserve account",
      "Next meeting scheduled for April 8th",
    ],
  },
  {
    id: "mjUlHQdonMs", source: "wausau",
    title: "Wausau Economic Development Committee Meeting",
    date: "April 6, 2026", shortDate: "APR 6",
    committee: "Economic Development Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=mjUlHQdonMs",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/1990/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Economic Development Committee met to consider multiple property disposition and redevelopment matters, including survey results for 1300 Cleveland Avenue, a Habitat for Humanity purchase offer, and Thomas Street residential infill projects. No vote counts or specific outcomes are recorded in the official records for the agenda items discussed.",
    agenda: [
      { time:"N\/A", item:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement" },
      { time:"N\/A", item:"Consideration of the minutes of the preceding meeting(s) - March 3, 2026 Regular Economic Development Committee Minutes" },
      { time:"N\/A", item:"Discussion and possible action on survey results from Non-Industrial Land Use Preference Survey for 1300 Cleveland Avenue" },
      { time:"N\/A", item:"Discussion and possible action on property disposition offer to purchase from Habitat for Humanity of Wausau for 921 S. 19th Avenue" },
      { time:"N\/A", item:"Discussion and possible action on Thomas St residential infill Request for Interest (206, 212, 226, and 230 E Thomas St)" },
      { time:"N\/A", item:"Discussion and possible action on Thomas St and McCleary St vacant lots redevelopment (237, 241 and 249 E Thomas St)" },
    ],
    discussions: [
      { item:"Non-Industrial Land Use Preference Survey for 1300 Cleveland Avenue", body:"The committee discussed survey results regarding preferred non-industrial uses for the property at 1300 Cleveland Avenue. The vote record does not indicate a specific motion, vote count, or outcome for this item." },
      { item:"Habitat for Humanity offer for 921 S. 19th Avenue", body:"The committee considered a property disposition offer to purchase from Habitat for Humanity of Wausau for the property at 921 S. 19th Avenue. The vote record does not indicate a specific motion, vote count, or outcome for this item." },
      { item:"Thomas St residential infill Request for Interest (206, 212, 226, and 230 E Thomas St)", body:"The committee discussed a Request for Interest for residential infill development on four Thomas Street parcels. The vote record does not indicate a specific motion, vote count, or outcome for this item." },
      { item:"Thomas St and McCleary St vacant lots redevelopment (237, 241 and 249 E Thomas St)", body:"The committee considered redevelopment options for vacant lots on Thomas Street and McCleary Street. The vote record does not indicate a specific motion, vote count, or outcome for this item." },
    ],
    publicComment: "Public comment on agenda items was included on the agenda.",
    actionItems: [
      "Outcomes for all substantive agenda items are not recorded in the official vote records; review of meeting video or official minutes may be required to confirm decisions made",
    ],
    civicItems: [
      { number:"1", name:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"2", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"Regular Economic Develoment Committee Minutes", votes:[], docs:[{ name:"Economic Development_Regular_Minutes_03032026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6683)" }], children:[] },
    ] },
      { number:"3", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Discussion and possible action on survey results from Non-Industrial Land Use Preference Survey for 1300 Cleveland Avenue", votes:[], docs:[{ name:"Staff Memo - 1300 Cleveland Ave Survey Results", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6651)" }, { name:"1300 Cleveland Avenue Survey Results", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6503)" }, { name:"Non-Industrial Land Use Preference Survey - 1300 Cleveland Avenue", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6504)" }], children:[] },
      { number:"b", name:"Discussion and possible action on property disposition offer to purchase from Habitat for Humanity of Wausau for 921 S. 19th Avenue", votes:[], docs:[{ name:"Habitat purchase memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6568)" }, { name:"HFHW 921 S 19th Ave offer", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6569)" }], children:[] },
      { number:"c", name:"Discussion and possible action on Thomas St residential infill Request for Interest. (206, 212, 226, and 230 E Thomas St)", votes:[], docs:[], children:[] },
      { number:"d", name:"Discussion and possible action on Thomas St and McCleary St vacant lots redevelopment. (237, 241 and 249 E Thomas St)", votes:[], docs:[], children:[] },
    ] },
      { number:"4", name:"Discussion.", votes:[], docs:[], children:[] },
      { number:"5", name:"Adjournment.", votes:[], docs:[], children:[] },
    ],
  },
  {
    id: "R4U0JIOMgXk", source: "wausau",
    title: "Wausau Board of Public Works Meeting",
    date: "April 8, 2026", shortDate: "APR 8",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=R4U0JIOMgXk",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2292/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Board of Public Works approved most agenda items including contractor pay estimates and licenses, but rejected Pay Estimates #24 and #25 for lead service line replacement with Community Infrastructure Partners. The board approved $104,405 for wastewater facility screening improvements and $62,272.50 for water treatment plant demolition work.",
    agenda: [
      { time:"N\/A", item:"Consideration of March 17, 2026 and March 19, 2026 Regular Board of Public Works Minutes" },
      { time:"N\/A", item:"Open Quotations for Storm Sewer Materials" },
      { time:"N\/A", item:"Wausau Wastewater Treatment Facility Screening Improvements: J.F. Ahern Co., Pay Estimate #12" },
      { time:"N\/A", item:"Pay Estimate #24 and Pay Estimate #25 with Community Infrastructure Partners for replacement of lead service lines" },
      { time:"N\/A", item:"2025 Wausau Water Works Asbestos Abatement: Robinson Brothers Environmental, Inc., Final Payment" },
      { time:"N\/A", item:"2025 Water Treatment Plant Demo: The MRD Group, Inc., Pay Estimate #2" },
      { time:"N\/A", item:"2025 Street Construction Project A - Randolph Street\/Cherry Street: Haas Sons, Inc., Change Order #2" },
      { time:"N\/A", item:"Portland Cement Concrete Licenses: SD Ellenbecker, Inc., and Lewis Construction, Inc." },
      { time:"N\/A", item:"Bituminous Concrete Paving License: Kell Contracting" },
      { time:"N\/A", item:"Closed Session pursuant to Wisconsin State Statute §19.85(1)(g) for deliberating on claims" },
    ],
    discussions: [
      { item:"Consideration of March 17, 2026 and March 19, 2026 Minutes", body:"The board approved the minutes from the March 17, 2026 and March 19, 2026 regular meetings. The motion passed." },
      { item:"Open Quotations for Storm Sewer Materials", body:"Quotations for storm sewer materials were opened. No vote outcome was recorded for this item." },
      { item:"Wausau Wastewater Treatment Facility Screening Improvements: J.F. Ahern Co., Pay Estimate #12", body:"The board approved Pay Estimate #12 for J.F. Ahern Co. in the amount of $104,405.00 for wastewater treatment facility screening improvements. The motion passed." },
      { item:"Pay Estimate #24 and Pay Estimate #25 with Community Infrastructure Partners for lead service line replacement", body:"The board voted to reject Pay Estimates #24 and #25 with Community Infrastructure Partners for replacement of lead service lines. The motion to approve failed." },
      { item:"2025 Wausau Water Works Asbestos Abatement: Robinson Brothers Environmental, Inc., Final Payment", body:"The board approved the final payment of $1,000 to Robinson Brothers Environmental, Inc. for asbestos abatement work. The motion passed." },
      { item:"2025 Water Treatment Plant Demo: The MRD Group, Inc., Pay Estimate #2", body:"The board approved Pay Estimate #2 for The MRD Group, Inc. in the amount of $62,272.50 for water treatment plant demolition work. The motion passed." },
      { item:"2025 Street Construction Project A - Randolph Street\/Cherry Street: Haas Sons, Inc., Change Order #2", body:"The board approved contract extensions as outlined in Change Order #2 for Haas Sons, Inc. on the Randolph Street\/Cherry Street construction project. The motion passed." },
      { item:"Portland Cement Concrete Licenses: SD Ellenbecker, Inc., and Lewis Construction, Inc.", body:"The board approved Portland Cement Concrete licenses for SD Ellenbecker, Inc. and Lewis Construction, Inc. The motion passed." },
      { item:"Bituminous Concrete Paving License: Kell Contracting", body:"The board approved a Bituminous Concrete Paving license for Kell Contracting. The motion passed." },
      { item:"Closed Session for deliberating on claims", body:"The board approved convening in closed session pursuant to Wisconsin State Statute §19.85(1)(g) for the purpose of deliberating on claims. The motion passed. MaryAnne Groat moved to adjourn, seconded by Eric Lindman, passing 3-0 with Eric Lindman, MaryAnne Groat, and Vincent Bonino voting yes." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Pay Estimates #24 and #25 for Community Infrastructure Partners lead service line replacement were denied and may require further review or renegotiation",
      "J.F. Ahern Co. to receive $104,405.00 for wastewater facility screening improvements",
      "Robinson Brothers Environmental, Inc. to receive final payment of $1,000 for asbestos abatement",
      "The MRD Group, Inc. to receive $62,272.50 for water treatment plant demolition",
      "Contract extensions approved for Haas Sons, Inc. on Randolph Street\/Cherry Street project",
      "Concrete and paving licenses issued to SD Ellenbecker, Inc., Lewis Construction, Inc., and Kell Contracting",
    ],
    civicItems: [
      { number:"1", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"March 17, 2026 and March 19, 2026 Regular Board of Public Works Minutes.", votes:[{ motion:"approve", passed:true, initiator:"MaryAnne Groat", seconder:"Vincent Bonino", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"BoardofPublicWorks_Regular_MinutesDRAFT_03172026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6486)" }, { name:"BoardofPublicWorks_Regular_MinutesDRAFT_03192026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6679)" }], children:[] },
    ] },
      { number:"2", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Open Quotations for Storm Sewer Materials.", votes:[], docs:[], children:[] },
      { number:"b", name:"Wausau Wastewater Treatment Facility Screening Improvements:  J.F. Ahern Co., Pay Estimate #12.", votes:[{ motion:"approve Pay Estimate #12 in the amount of $104,405.00", passed:true, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"JF Ahern WWTF Screening Imp Pay Est 12", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6545)" }], children:[] },
      { number:"c", name:"Pay Estimate #24 and Pay Estimate #25 with Community Infrastructure Partners for replacement of lead service lines.", votes:[{ motion:"approve Pay Estimate #24 and Pay Estimate #25", passed:false, initiator:"Eric Lindman", seconder:"Vincent Bonino", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"CIP Year 3 LSL Disbursement Request Form 8700-366-CIP Request 24", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6548)" }, { name:"CIP Year 3 LSL Disbursement Request Form 8700-366-CIP Request 25", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6549)" }], children:[] },
      { number:"d", name:"2025 Wausau Water Works Asbestos Abatement:  Robinson Brothers Environmental, Inc., Final Payment.", votes:[{ motion:"approve the final payment in the amount of $1,000", passed:true, initiator:"Eric Lindman", seconder:"Vincent Bonino", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"Robinson WWW Asbestos Abatement Pay Est Final", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6636)" }], children:[] },
      { number:"e", name:"2025 Water Treatment Plant Demo:  The MRD Group, Inc., Pay Estimate #2.", votes:[{ motion:"approve Pay Estimate #2 in the amount of $62,272.50", passed:true, initiator:"Eric Lindman", seconder:"Vincent Bonino", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"MRD Group Pay Est 2", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6659)" }], children:[] },
      { number:"f", name:"2025 Street Construction Project \"A\" - Randolph Street\/Cherry Street:  Haas Sons, Inc., Change Order #2.", votes:[{ motion:"approve contract extensions as outlined in Change Order #2", passed:true, initiator:"Eric Lindman", seconder:"Vincent Bonino", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"Haas 2025 Proj A CO 2", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6690)" }], children:[] },
      { number:"g", name:"Portland Cement Concrete Licenses:  SD Ellenbecker, Inc., and Lewis Construction, Inc.", votes:[{ motion:"approve the subject licenses", passed:true, initiator:"Vincent Bonino", seconder:"Eric Lindman", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"SD Ellenbecker PCC", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6546)" }, { name:"Lewis Construction PCC", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6547)" }], children:[] },
      { number:"h", name:"Bituminous Concrete Paving License:  Kell Contracting.", votes:[{ motion:"approve subject license", passed:true, initiator:"Vincent Bonino", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"Kell Contracting BCP", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6685)" }], children:[] },
    ] },
      { number:"3", name:"Closed Session.", votes:[], docs:[], children:[
      { number:"a", name:"Closed Session&nbsp;pursuant to Wisconsin State Statute §19.85(1)(g) for the purpose of deliberating on claims.", votes:[{ motion:"approve convening in closed session", passed:true, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"Claims 040826", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6689)" }], children:[] },
    ] },
      { number:"4", name:"Adjournment.", votes:[{ motion:"approve adjournment", passed:true, initiator:"MaryAnne Groat", seconder:"Eric Lindman", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
  {
    id: "o-9fvmawK6I", source: "wausau",
    title: "Wausau Water Works Commission Meeting",
    date: "April 8, 2026", shortDate: "APR 8",
    committee: "Water Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=o-9fvmawK6I",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2190/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Water Works Commission approved the March 3, 2026 meeting minutes and received updates on multiple infrastructure projects including lead service line replacement, wastewater facility improvements, and PFAS testing. The meeting adjourned with a unanimous 5-0 vote.",
    agenda: [
      { time:"N\/A", item:"Consideration of the minutes of the preceding meeting(s) - March 3, 2026 Regular Wausau Water Works Commission Minutes" },
      { time:"N\/A", item:"Director's Reports - Capital Projects Planning and Initial Discussion" },
      { time:"N\/A", item:"Director's Reports - Wastewater Update on Headworks Screening Project, Cherry Street Lift Station Project, and Status of Class A Biosolids from WDNR" },
      { time:"N\/A", item:"Discussion and Update on LSL Replacement Project for 2026 and related news on the nationwide cost of new regulations" },
      { time:"N\/A", item:"Report for the Corrosion Control Treatment Optimization Study submitted to the WDNR" },
      { time:"N\/A", item:"Discussion and Update on Influent, Effluent and Biosolids PFAS Testing" },
    ],
    discussions: [
      { item:"March 3, 2026 Regular Wausau Water Works Commission Minutes", body:"The commission approved the minutes from the March 3, 2026 meeting. The motion passed, though specific vote count and mover\/seconder details were not recorded." },
      { item:"Capital Projects Planning and Initial Discussion", body:"The director presented information on capital projects planning. This was an informational report with no vote recorded." },
      { item:"Wastewater Update on Headworks Screening Project, Cherry Street Lift Station Project, and Status of Class A Biosolids from WDNR", body:"The commission received updates on multiple wastewater infrastructure projects including the Headworks Screening Project, Cherry Street Lift Station Project, and the status of Class A Biosolids approval from WDNR. No vote was taken on this informational item." },
      { item:"LSL Replacement Project for 2026", body:"The commission discussed the lead service line replacement project for 2026 and received information about the nationwide cost implications of new regulations. This was a discussion item with no formal vote recorded." },
      { item:"Corrosion Control Treatment Optimization Study", body:"A report on the Corrosion Control Treatment Optimization Study that was submitted to the WDNR was presented to the commission. No vote was taken on this informational item." },
      { item:"Influent, Effluent and Biosolids PFAS Testing", body:"The commission received an update on PFAS testing for influent, effluent, and biosolids. This was an informational discussion item with no vote recorded." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Next meeting scheduled for May 5, 2026 at 11:00 AM",
      "Continue monitoring progress on Headworks Screening Project and Cherry Street Lift Station Project",
      "Continue lead service line replacement project for 2026",
      "Await WDNR response on Class A Biosolids status and Corrosion Control Treatment Optimization Study",
    ],
    civicItems: [
      { number:"1", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"Regular Wausau Water Works Commission Minutes.", votes:[{ motion:"approve", passed:true, initiator:"Peter Gelhar", seconder:"Jim Force", yes:["Doug Diny", "Jim Force", "Deb Hadley", "Peter Gelhar", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"WausauWaterWorks_Regular_03032026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6570)" }], children:[] },
    ] },
      { number:"2", name:"Director's Reports.", votes:[], docs:[], children:[
      { number:"a", name:"Capital Projects Planning and Initial Discussion", votes:[], docs:[{ name:"DRAFT_Summary Project Cost- Water Division", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6692)" }, { name:"DRAFT_Summary Project Cost- Wastewater Division", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6693)" }], children:[] },
      { number:"b", name:"Wastewater — Update on Headworks Screening Project, Cherry Street Lift Station Project, and Status of Class A Biosolids from WDNR.", votes:[], docs:[], children:[] },
    ] },
      { number:"3", name:"Discussion.", votes:[], docs:[], children:[
      { number:"a", name:"Discussion and Update on LSL Replacement Project for 2026 and related news on the nationwide cost of new regulations.", votes:[], docs:[{ name:"2026 AWWA_Beyond-the-Replacement-Era", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6694)" }], children:[] },
      { number:"b", name:"Report for the Corrosion Control Treatment Optimization Study submitted to the WDNR.", votes:[], docs:[{ name:"274318_WausauCCTReport_FINAL", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6674)" }], children:[] },
      { number:"c", name:"Discussion and Update on Influent, Effluent and Biosolids PFAS Testing.", votes:[], docs:[{ name:"Wausau WWTF PFAS Spreadsheet", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6688)" }], children:[] },
    ] },
      { number:"4", name:"Adjournment.", votes:[{ motion:"approve", passed:true, initiator:"Aaron Griner", seconder:"Peter Gelhar", yes:["Doug Diny", "Jim Force", "Deb Hadley", "Peter Gelhar", "Aaron Griner"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
  {
    id: "2LBuLwS9yLU", source: "wausau",
    title: "Wausau Infrastructure & Facilities Committee Meeting",
    date: "April 9, 2026", shortDate: "APR 9",
    committee: "Infrastructure & Facilities", duration: "~1h",
    url: "https://www.youtube.com/watch?v=2LBuLwS9yLU",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2042/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Infrastructure & Facilities Committee rejected most action items on the agenda, with parking restrictions on S. 9th Ave\/S. 10th Ave\/Bopf Street, increased parking signage, snow plowing policy changes, special assessments for 2025 street projects, and the bike rack request form all failing. Only parking restrictions on N 2nd St (400, 500, 600 blocks) and the March 12 meeting minutes were approved.",
    agenda: [
      { time:"N\/A", item:"Public comment on agenda items" },
      { time:"N\/A", item:"Consideration of the minutes of the preceding meeting(s) - March 12, 2026" },
      { time:"N\/A", item:"Parking restrictions on S. 9th Ave between Thomas Street and Chellis Street, S. 10th Ave between Thomas Street and Chellis Street, and Bopf Street between S. 9th Ave and S. 10th Ave" },
      { time:"N\/A", item:"Increased parking restriction signs on S 9th Ave and\/or S 10th Ave" },
      { time:"N\/A", item:"Snow plowing policy" },
      { time:"N\/A", item:"Final Resolution to levy special assessments for the 2025 Street Construction Projects" },
      { time:"N\/A", item:"Discussion and possible action approving City bike rack request form" },
      { time:"N\/A", item:"Parking Restrictions on N 2nd St: the 400, 500, and 600 blocks" },
      { time:"N\/A", item:"Sherman Street Overlay from 3rd Ave to 8th Ave" },
    ],
    discussions: [
      { item:"March 12, 2026 Regular Infrastructure and Facilities Minutes", body:"The committee approved the minutes from the March 12, 2026 meeting. Specific vote count not recorded." },
      { item:"Parking restrictions on S. 9th Ave, S. 10th Ave, and Bopf Street", body:"Two separate motions regarding parking restrictions in this area both failed. Specific vote counts and movers were not recorded in the vote records." },
      { item:"Increased parking restriction signs on S 9th Ave and\/or S 10th Ave", body:"The motion to approve increased parking restriction signage failed. Specific vote count not recorded." },
      { item:"Snow plowing policy", body:"Three separate motions related to snow plowing policy all failed. This item saw significant debate with multiple attempts to reach consensus, but none succeeded. Specific vote counts not recorded." },
      { item:"Final Resolution to levy special assessments for the 2025 Street Construction Projects", body:"The motion to approve the final resolution for special assessments failed. Specific vote count not recorded." },
      { item:"City bike rack request form", body:"The motion to approve the City bike rack request form failed. Specific vote count not recorded." },
      { item:"Parking Restrictions on N 2nd St: the 400, 500, and 600 blocks", body:"The committee approved parking restrictions on the 400, 500, and 600 blocks of N 2nd St. Specific vote count not recorded." },
      { item:"Sherman Street Overlay from 3rd Ave to 8th Ave", body:"This item was listed for discussion only with no action taken. The committee discussed the proposed overlay project on Sherman Street." },
    ],
    publicComment: "Public comment on agenda items was on the agenda as the first item.",
    actionItems: [
      "Parking restrictions on N 2nd St (400, 500, 600 blocks) approved and will move forward",
      "Snow plowing policy remains unchanged after three failed motions",
      "Special assessments for 2025 Street Construction Projects not approved - may require further review",
      "Parking restrictions on S. 9th Ave\/S. 10th Ave\/Bopf Street area denied",
      "Bike rack request form denied - may need revisions before resubmission",
    ],
    civicItems: [
      { number:"1", name:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"2", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"March 12, 2026 Regular Infrastructure and Facilities Minutes", votes:[{ motion:"approve", passed:true, initiator:"Tom Neal", seconder:"Sarah Watson", yes:["Chad Henke", "Lou Larson", "Tom Neal", "Michael  Martens", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"Infrastructure&Facilities_DRAFT_03122026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6585)" }], children:[] },
    ] },
      { number:"3", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Parking restrictions on S. 9th Ave between Thomas Street and Chellis Street, S. 10th Ave between Thomas Street and Chellis Street, and Bopf Street between S. 9th Ave and S. 10th Ave.", votes:[{ motion:"approve", passed:false, initiator:"Tom Neal", seconder:"Sarah Watson", yes:[], no:[], abstain:[] }, { motion:"approve", passed:false, initiator:"", seconder:"", yes:["Tom Neal"], no:["Chad Henke", "Lou Larson", "Michael  Martens", "Sarah Watson"], abstain:[] }], docs:[{ name:"PARKING PETITION 9TH AVE", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6696)" }], children:[] },
      { number:"b", name:"Increased parking restriction signs on S 9th Ave and\/or S 10th Ave", votes:[{ motion:"approve", passed:false, initiator:"Lou Larson", seconder:"Tom Neal", yes:[], no:[], abstain:[] }], docs:[], children:[] },
      { number:"c", name:"Snow plowing policy", votes:[{ motion:"approve", passed:false, initiator:"Tom Neal", seconder:"Lou Larson", yes:[], no:[], abstain:[] }, { motion:"approve", passed:false, initiator:"", seconder:"", yes:[], no:[], abstain:[] }, { motion:"approve", passed:false, initiator:"", seconder:"", yes:["Chad Henke", "Lou Larson", "Tom Neal", "Michael  Martens", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"Map - Highland Park Blvd to  McIndoe St", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6703)" }, { name:"Center blvd streets plowing options", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6704)" }, { name:"plowing boulevards recommendation", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6705)" }], children:[] },
      { number:"d", name:"Final Resolution to levy special assessments for the 2025 Street Construction Projects", votes:[{ motion:"approve", passed:false, initiator:"Sarah Watson", seconder:"Michael  Martens", yes:["Chad Henke", "Lou Larson", "Tom Neal", "Michael  Martens", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"2025StreetProjects", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6567)" }], children:[] },
      { number:"e", name:"Discussion and possible action approving City bike rack request form.", votes:[{ motion:"approve", passed:false, initiator:"Tom Neal", seconder:"Sarah Watson", yes:["Chad Henke", "Lou Larson", "Tom Neal", "Michael  Martens", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"Resolution", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6593)" }, { name:"Staff Memo_Bike_Racks", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6587)" }, { name:"City of Wausau Bike Rack Request Form", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6592)" }, { name:"One pager for Packet", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6590)" }, { name:"Bike Rack Slide", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6591)" }, { name:"BPAC_20260323_Minutes_DRAFT", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6678)" }], children:[] },
      { number:"f", name:"Parking Restrictions on N 2nd St: the 400, 500, and 600 blocks.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Lou Larson", yes:["Chad Henke", "Lou Larson", "Tom Neal", "Michael  Martens", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"No parking restrictions on 2nd Street", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6700)" }], children:[] },
    ] },
      { number:"4", name:"Discussion.", votes:[], docs:[], children:[
      { number:"a", name:"Sherman Street Overlay from 3rd Ave to 8th Ave", votes:[], docs:[{ name:"2026 Asphalt Paving Project_A", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6701)" }], children:[] },
    ] },
      { number:"5", name:"Adjournment.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Tom Neal", yes:["Chad Henke", "Lou Larson", "Tom Neal", "Michael  Martens", "Sarah Watson"], no:[], abstain:[] }], docs:[], children:[] },
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
    overview: "Based on the published agenda, the Wausau School District Board of Education's Committee of the Whole meeting was scheduled to address several action items including the Wisconsin School Nutrition Purchasing Cooperative membership renewal, facility fee schedule amendments for artificial fields, and a comprehensive NEOLA policy update covering over 60 policies. The meeting was also expected to include a referendum budget update and recognition of Stettin Elementary through the Excellence in Action program.",
    agenda: [
      { time:"N\/A", item:"Call to Order" },
      { time:"N\/A", item:"Approve the Minutes" },
      { time:"N\/A", item:"Audit of the Bills" },
      { time:"N\/A", item:"Excellence in Action: Stettin Elementary" },
      { time:"N\/A", item:"Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP) (Action Requested)" },
      { time:"N\/A", item:"Facility Fees (Action Requested)" },
      { time:"N\/A", item:"Referendum Budget Update" },
      { time:"N\/A", item:"NEOLA UPDATE (Action Requested)" },
      { time:"N\/A", item:"ADJOURN" },
    ],
    discussions: [
      { item:"Excellence in Action: Stettin Elementary", body:"The Board was scheduled to recognize Stettin Elementary as part of the district's Excellence in Action program, which highlights achievements and positive developments at individual schools within the district." },
      { item:"Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP)", body:"A 5-minute presentation was scheduled regarding the Wausau School District Nutrition Service Department's continued membership in the Wisconsin School Nutrition Purchasing Cooperative. The WiSNP Co-op was requesting member districts to present the cooperative's resolution for approval of continued membership for the 2026-2027 school year." },
      { item:"Facility Fees", body:"Ryan Urmanski, Director of Buildings and Grounds, was scheduled to present a 10-minute presentation on amending the current Wausau School District Facility Use Fee Schedule. The proposed changes were expected to reflect costs for use of artificial fields and field lighting for requested events, with immediate implementation requested upon approval." },
      { item:"Referendum Budget Update", body:"Elizabeth Channel, Interim Assistant Superintendent of Operations, was scheduled to deliver a 10-minute presentation sharing an update on the status of the Referendum Budget. Supporting documentation was uploaded to the agenda the day before the meeting." },
      { item:"NEOLA UPDATE", body:"A 20-minute review of proposed policy changes was scheduled, with some suggestions described as minor technical corrections while others were noted as more lengthy revisions. The update encompassed multiple policy categories including general policies, school support organization policies, technical corrections, and Act 57 related policies covering student supervision and child abuse reporting requirements." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Action was requested for approval of the Wisconsin School Nutrition Purchasing Cooperative Agreement for the 2026-2027 school year",
      "Action was requested for approval of amended Facility Use Fee Schedule for artificial fields and field lighting with immediate implementation",
      "Action was requested for approval of NEOLA policy updates including over 30 general policies, 9 school support organization policies, 18 technical corrections, and 4 Act 57 related policies",
    ],
  },
  {
    id: "AoUiBt_A4Hc", source: "marathon",
    title: "Marathon County Environmental Resources Committee Meeting",
    date: "March 31, 2026", shortDate: "MAR 31",
    committee: "Environmental Resources", duration: "~1h",
    url: "https://www.youtube.com/watch?v=AoUiBt_A4Hc",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18132/639100479088130000",
    isAgendaOnly: true,
    badge: null,
    overview: "Based on the published agenda, the Marathon County Environmental Resources Committee was scheduled to meet on March 31, 2026. The specific agenda items were not provided in the source document, so the matters scheduled for discussion cannot be determined from the available information.",
    agenda: [
      { time:"N\/A", item:"Agenda items not available - only meeting packet link provided" },
    ],
    discussions: [
      { item:"Agenda details unavailable", body:"The specific discussion items for this meeting were not included in the provided source material. The full agenda may be available at the linked meeting packet document on the Marathon County website." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Unable to determine expected action items - full agenda document not provided",
    ],
  },
,
,
,
,
,
,
,
,
,
,
,
,
,
,
  {
    id: "5-FN0TmHLZU", source: "marathon",
    title: "Marathon County Extension, Education, and Economic Development Committee Meeting",
    date: "April 2, 2026", shortDate: "APR 2",
    committee: "Marathon County Extension, Education, and Economic Development Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=5-FN0TmHLZU",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18140/639101128463600000",
    isAgendaOnly: true,
    badge: null,
    overview: "Based on the published agenda, the Marathon County Extension, Education, and Economic Development Committee was scheduled to meet on April 2, 2026. The specific agenda items were not detailed in the provided source, but the committee typically addresses matters related to UW-Extension programming, educational initiatives, and economic development efforts in Marathon County.",
    agenda: [
      { time:"N\/A", item:"Agenda details not available in provided source - full agenda packet available at county website" },
    ],
    discussions: [
      { item:"Meeting Agenda", body:"The specific discussion items were not detailed in the provided agenda text. The full agenda packet was scheduled to be available through the Marathon County website link for committee members and the public to review prior to the meeting." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Specific action items not available - agenda packet link provided for full meeting details",
    ],
  },
,
,
,
,
,
,
,
,
,
,
,
,
,
,
  {
    id: "KUrdpt6ntZ4", source: "marathon",
    title: "Marathon County Human Resources, Finance, and Property Committee Meeting",
    date: "April 8, 2026", shortDate: "APR 8",
    committee: "Marathon County Human Resources, Finance, and Property Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=KUrdpt6ntZ4",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18191/639107264317430000",
    isAgendaOnly: true,
    badge: null,
    overview: "Based on the published agenda, the Marathon County Human Resources, Finance, and Property Committee was scheduled to meet on April 8, 2026. The specific agenda items were not provided in the source document, limiting the ability to describe the meeting's planned content and community significance.",
    agenda: [
      { time:"N\/A", item:"Agenda details not provided in source document" },
    ],
    discussions: [
      { item:"Agenda Not Available", body:"The full agenda content was not provided in the source material. Only a link to the meeting packet was included, and the actual agenda items could not be extracted for analysis." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Unable to determine expected action items - full agenda content not provided",
    ],
  },
,
,
,
,
,
,
,
,
,
,
,
,
,
,
  {
    id: "9MsG0RUdc_c", source: "marathon",
    title: "Marathon County Executive Committee Meeting",
    date: "April 9, 2026", shortDate: "APR 9",
    committee: "Executive Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=9MsG0RUdc_c",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18187/639107217429146731",
    isAgendaOnly: true,
    badge: null,
    overview: "Based on the published agenda, the Marathon County Executive Committee was scheduled to meet on April 9, 2026. The specific agenda items were not available from the provided source, as only a link to the agenda packet was included without detailed item descriptions.",
    agenda: [
      { time:"N\/A", item:"Agenda details not available - only packet link provided" },
    ],
    discussions: [
      { item:"Agenda Content Unavailable", body:"The full agenda document was referenced via an external link but the specific items were not included in the provided text. The committee was scheduled to meet, but detailed discussion items cannot be determined from the available information." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Unable to determine expected action items - agenda details not provided in source text",
    ],
  },
,
,
,
,
,
,
,
,
,
,
,
,
,
,
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
  { date:"2026-06-04", time:"5:00 PM", name:"Health & Human Services Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-06-09", time:"5:00 PM", name:"Public Safety Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-06-10", time:"5:00 PM", name:"Extension, Education & Econ Dev Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-06-11", time:"3:00 PM", name:"Executive Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-06-11", time:"5:00 PM", name:"Infrastructure Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
];

const SCHOOL_BOARD_UPCOMING = [
  { date:"2026-04-13", time:"10:00 AM", name:"Public Meeting", url:"https://meetings.boardbook.org/Public/Agenda/1360?meeting=739874", source:"school_board" },
  { date:"2026-04-13", time:"3:00 PM", name:"Special Meeting", url:"https://meetings.boardbook.org/Public/Agenda/1360?meeting=738313", source:"school_board" },
  { date:"2026-04-13", time:"5:00 PM", name:"Regular Meeting", url:"https://meetings.boardbook.org/Public/Agenda/1360?meeting=739586", source:"school_board" },
  { date:"2026-04-13", time:"5:00 PM", name:"Regular Board Meeting", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-04-27", time:"5:00 PM", name:"Education & Operations Committee", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-05-11", time:"5:00 PM", name:"Regular Board Meeting", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-05-25", time:"5:00 PM", name:"Education & Operations Committee", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-06-08", time:"5:00 PM", name:"Regular Board Meeting", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
];

const WAUSAU_UPCOMING = [
  { date:"2026-04-14", time:"10:30 AM", name:"Board of Public Works Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2293/overview", source:"wausau" },
  { date:"2026-04-14", time:"5:15 PM", name:"Finance Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2003/overview", source:"wausau" },
  { date:"2026-04-14", time:"6:30 PM", name:"Common Council Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1964/overview", source:"wausau" },
  { date:"2026-04-15", time:"8:00 AM", name:"Business Improvement District Board Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2330/overview", source:"wausau" },
  { date:"2026-04-16", time:"4:45 PM", name:"Transit Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2178/overview", source:"wausau" },
  { date:"2026-04-20", time:"5:15 PM", name:"Public Health & Safety Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2068/overview", source:"wausau" },
  { date:"2026-04-21", time:"10:30 AM", name:"Board of Public Works Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2298/overview", source:"wausau" },
  { date:"2026-04-21", time:"5:00 PM", name:"Plan Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2106/overview", source:"wausau" },
  { date:"2026-04-21", time:"6:30 PM", name:"Common Council Organizational Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2314/overview", source:"wausau" },
  { date:"2026-04-27", time:"7:30 AM", name:"Police & Fire Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2146/overview", source:"wausau" },
  { date:"2026-04-27", time:"5:00 PM", name:"Bicycle & Pedestrian Advisory Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2121/overview", source:"wausau" },
  { date:"2026-04-28", time:"8:00 AM", name:"Community Development Authority Finance Board Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2279/overview", source:"wausau" },
  { date:"2026-04-28", time:"12:00 PM", name:"Community Development Authority Board Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2263/overview", source:"wausau" },
];

const WESTON_UPCOMING = [
  { date:"2026-04-13", time:"", name:"Village Board of Trustees", url:"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04132026-1901", source:"weston" },
  { date:"2026-04-13", time:"", name:"Plan Commission", url:"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04132026-1900", source:"weston" },
  { date:"2026-04-13", time:"", name:"Public Works Committee", url:"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04132026-1902", source:"weston" },
  { date:"2026-04-14", time:"", name:"S.A.F.E.R. Board of Directors", url:"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04142026-1903", source:"weston" },
  { date:"2026-04-14", time:"", name:"S.A.F.E.R. Fire Commission", url:"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04142026-1904", source:"weston" },
  { date:"2026-04-16", time:"", name:"Mountain Bay Metropolitan Police Commission", url:"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04162026-1905", source:"weston" },
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
  { date:"2026-06-01", time:"6:00 PM", name:"Community Life & Public Safety Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-06-08", time:"6:00 PM", name:"Plan Commission", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-06-08", time:"6:00 PM", name:"Public Works Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-06-09", time:"6:00 PM", name:"S.A.F.E.R. Board of Directors", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
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
