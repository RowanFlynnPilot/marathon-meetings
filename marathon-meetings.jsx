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
    title: "Wausau City Council Meeting - 3\/24\/2026 - 3\/24\/2026 - 3\/24\/2026 - 3\/24\/2026",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "City Council", duration: "~1h",
    url: "https://www.youtube.com/watch?v=rQcjCEY36e4",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau City Council approved a $10 million development agreement for 11 Scott Street (Waterside Place) by a 6-3 vote, which will convert a vacant 100,000 square foot building into 52 mid-priced residential units. The council also recognized DPW crews for their response to a record 30.9-inch snowfall and presented a sustainability award to Kolbe and Kolbe Millwork for their solar energy initiatives.",
    agenda: [
      { time:"2:49", item:"Call to order and Pledge of Allegiance" },
      { time:"3:30", item:"Proclamation - Sarah Rafi Day (March 31st)" },
      { time:"7:00", item:"Mayoral Citation - DPW Plow Crews for Record Snowfall Response" },
      { time:"14:30", item:"Sustainability Award Presentation - Kolbe and Kolbe Millwork" },
      { time:"20:00", item:"Approval of March 10, 2026 Meeting Minutes" },
      { time:"20:30", item:"Public Comment" },
      { time:"23:30", item:"Consent Agenda" },
      { time:"24:00", item:"Development Agreement for 11 Scott Street\/Waterside Place" },
      { time:"36:30", item:"Mayoral Appointments to Plan Commission and Boards" },
      { time:"37:02", item:"Residential Solid Waste Agreement with Harter's Fox Valley Disposal" },
      { time:"46:00", item:"Announcements and Adjournment" },
    ],
    discussions: [
      { item:"Development Agreement for 11 Scott Street\/Waterside Place", body:"The council debated the joint resolution from economic development and infrastructure committees to approve a development agreement with 11 Scott Street LLC. Developers Raleigh Lray and Mark Craig spoke during public comment, noting the $10+ million project would create 52 mid-priced residential units in a vacant 100,000 square foot building. Alder Rasmusson supported the project, citing the need for downtown residents and mid-priced housing. Alder Neil emphasized the project would generate $55,000 in annual parking revenue and help close TID 8 within 5 years. Alder Larson dissented, arguing against discounting city assets during budget cuts. Alder Tierney questioned the parking agreement provision requiring the city to provide alternative parking within 300 yards if the ramp closes, which Economic Development Director Randy Feifer explained was a reduction from an existing 480-space obligation to 150 paid spaces. The motion passed 6-3." },
      { item:"DPW Recognition for Record Snowfall Response", body:"Mayor Denny presented a mayoral citation to the Department of Public Works crews for their response to the historic March 14-16, 2026 snowstorm that delivered a record 30.9 inches. Kevin Kester, street supervisor Josh, Dustin, Mitch Harris (storeroom manager who operated a plow), and mechanic Jieven Matah were specifically recognized. Kester noted that four municipal fleet technicians maintained 12-hour shifts for continuous 24-hour breakdown support and would have worked 12 straight days by Friday. Kester praised the crews saying 'you kicked its ass' to applause from the council." },
      { item:"Sustainability Award - Kolbe and Kolbe Millwork", body:"Christine Daniels from the Sustainability, Energy and Environment Committee presented the 2026 City of Wausau Sustainability Award to Kolbe and Kolbe Millwork. Representatives Mike Thompson and Keith Kaning accepted, describing their solar panel installation of over 2,000 panels on their manufacturing facility that became operational in July 2025, generating enough power for about 120 homes. They also discussed LED lighting projects and recycling initiatives for wood, aluminum, glass, vinyl, cardboard, and other materials." },
      { item:"Residential Solid Waste Agreement", body:"The council approved the resolution from finance committee for a 7-year residential solid waste and recycling service agreement with Harter's Fox Valley Disposal. Mayor Denny noted there had been confusion about whether the term was 7 or 10 years, confirming it was corrected to the 7-year term that public health and safety originally approved. Motion passed 9-0." },
      { item:"Settlement Resolution - David Holes vs City of Wausau", body:"Assistant City Attorney Vincent Bonito explained a 2022 bus accident case where Transit Mutual insurance paid the initial claim, then the individual who hit the bus filed a personal injury claim. The city filed a counter claim and third-party complaint against the individual's insurer, who agreed to pay damages for the bus. The resolution releases the city's counter claim. Alder Neil clarified this does not affect the separate personal injury claim. No closed session was needed. Motion passed 8-1." },
    ],
    publicComment: "Two speakers addressed the council. Raleigh Lray (11 Scott Street project) asked for support for the green sustainable project converting a vacant building to mid-priced apartments. Mark Craig (3246 North 8th Street) emphasized the $10+ million project's challenges, noting the residential component alone costs over $8.3 million for 52 units, and stated 'Without your help, it won't happen.'",
    actionItems: [
      "Development agreement and amended parking agreement for 11 Scott Street\/Waterside Place approved 6-3",
      "March 10, 2026 meeting minutes approved 9-0",
      "Consent agenda approved 9-0",
      "Mayoral appointments to Plan Commission, Affordable Housing Task Force, and Business Improvement District Board confirmed 9-0",
      "7-year solid waste and recycling agreement with Harter's Fox Valley Disposal approved 9-0",
      "Airspace obstruction removal agreements for Schofield properties approved 9-0",
      "2026 budget modification for Police Department Red Dot Optics purchase approved 9-0",
      "Municipal Code Chapter 6.44 solid waste disposal ordinance approved 9-0",
      "Paid duty time for out-of-country police training approved 9-0",
      "Community outreach professional shelter operations duty premium approved 9-0",
      "Settlement release for David Holes case approved 8-1",
      "March 31st proclaimed as Sarah Rafi Day in Wausau",
    ],
  },
  {
    id: "knWZO4dON-8", source: "wausau",
    title: "Wausau Plan Commission Meeting - 3\/17\/2026 - 3\/17\/2026 - 3\/17\/2026 - 3\/17\/2026",
    date: "March 17, 2026", shortDate: "MAR 17",
    committee: "Plan Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=knWZO4dON-8",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Plan Commission approved two major items: a conditional use permit for a 70-unit, 7-story apartment building at 731 North First Street for Beacon Resources LLC, and a transportation project plat for Grand Avenue signal replacements. A public hearing was held regarding a proposed personal storage facility at 218 South Fourth Street, with the applicants citing growing downtown housing demand as justification.",
    agenda: [
      { time:"0:00", item:"Call to order and election of vice chair (skipped until April)" },
      { time:"0:15", item:"Public comment on agenda items" },
      { time:"0:55", item:"Consideration of minutes for February 18th" },
      { time:"1:10", item:"Public hearing on conditional use permit for 218 South Fourth Street personal storage facility" },
      { time:"3:15", item:"Discussion and possible action on conditional use permit for 731 North First Street apartment building" },
      { time:"3:55", item:"Discussion and possible action on transportation project plat for Grand Avenue signal replacements" },
      { time:"5:00", item:"Discussion of next meeting date and adjournment" },
    ],
    discussions: [
      { item:"Minutes for February 18th", body:"Motion to approve made by Bugamman, seconded by Balkan. Minutes were approved unanimously with all members voting aye." },
      { item:"Public hearing on conditional use permit for 218 South Fourth Street storage facility", body:"Jason Dunwoody and Melinda Dunwoody spoke in favor of the storage facility proposal. They argued that with over 400 new apartment units recently approved downtown, including the 153-unit Foundry on Third and 102-unit Evergreen Landing projects, residents need convenient storage options rather than traveling to surrounding areas like Kronenwetter. The public hearing was closed but no vote was taken on this item during this meeting." },
      { item:"Conditional use permit for 731 North First Street apartment building", body:"Motion to approve made by Bornman, seconded by Bugamin. The permit authorizes Beacon Resources LLC to construct a 70-unit, 7-story apartment building. No discussion or questions were raised. The motion passed unanimously." },
      { item:"Transportation project plat for Grand Avenue signal replacements", body:"Motion to approve made by Bugamin, seconded by Balkan. The project covers signal replacements at Sturgeon and Townline Road (Project 370-40-40). No discussion was held. The motion passed unanimously." },
    ],
    publicComment: "One written public comment was submitted by Linda Lawrence on March 12th supporting the Beacon Resources apartment development, stating 'Housing of this capacity will be good for downtown small businesses' and expressing personal willingness to live there. Jason Dunwoody and Melinda Dunwoody provided in-person public comment during the storage facility hearing, speaking in favor of the proposal.",
    actionItems: [
      "Conditional use permit approved for 70-unit, 7-story apartment building at 731 North First Street for Beacon Resources LLC",
      "Transportation project plat approved for Grand Avenue signal replacements at Sturgeon and Townline Road",
      "Vice chair election postponed until April session",
      "Next meeting tentatively scheduled for April 21st at 5:00 PM, may be moved due to election and council meeting conflicts",
    ],
  },
  {
    id: "hNOP07iJjNY", source: "marathon",
    title: "Marathon County Board Education Meeting - 3\/19\/2026 - 3\/19\/2026 - 3\/19\/2026 - 3\/19\/2026",
    date: "March 19, 2026", shortDate: "MAR 19",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=hNOP07iJjNY",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board held an educational meeting featuring presentations on PFAS contamination litigation opportunities and renewable energy regulation. No votes were taken as this was an informational session, but the board heard from legal counsel about potentially joining multi-district litigation to recover costs from PFAS contamination at county facilities, and received detailed guidance on the county's limited authority to regulate large-scale wind and solar projects.",
    agenda: [
      { time:"0:00", item:"Call to order and Pledge of Allegiance" },
      { time:"1:06", item:"Reading of the notice" },
      { time:"1:45", item:"Roll call and sign-in" },
      { time:"2:15", item:"Public comment period (15 minutes, 5 speakers)" },
      { time:"15:01", item:"Presentation on PFAS multi-district litigation opportunity" },
      { time:"50:02", item:"Questions and discussion on PFAS litigation" },
      { time:"1:01:30", item:"Presentation on renewable energy regulatory authority" },
      { time:"1:20:02", item:"Discussion of PSC 128 and local ordinance authority" },
      { time:"1:30:01", item:"Options for county engagement with renewable energy projects" },
      { time:"1:40:00", item:"Joint development agreement considerations" },
    ],
    discussions: [
      { item:"PFAS Multi-District Litigation Presentation", body:"Attorney Carrie McDougall from Baron and Bud Law Firm presented via WebEx on the ongoing PFAS litigation, explaining that the water system settlement was the largest toxic tort settlement in U.S. history at approximately $12-13 billion from 3M and $3-5 billion from DuPont. He explained that soil-based claims including airports, landfills, and wastewater facilities are likely next in the litigation queue. The firm works on a 25% contingency fee basis with no upfront costs to the county. Supervisor Robinson asked about land spreading impacts, and Vice Chair Dickinson clarified that the airport has no known PFAS contamination currently." },
      { item:"Renewable Energy Regulation Presentation", body:"Attorney Rebecca Roker from Atollis Law presented on county authority over wind and solar projects. She explained that projects over 100 megawatts fall under PSC jurisdiction, noting the PSC has approved 33 solar projects with zero denials. She discussed the Hub City Wind project from Alliant Energy and the Stormark Wind Energy Center being proposed for the county. Roker emphasized that Joint Development Agreements (JDAs) are the most effective tool for protecting county interests since litigation has proven ineffective, and that the Town of Brighton case, while successful at circuit court level, was dismissed on appeal when EDP Renewables purchased the Marathon Wind project." },
      { item:"Public Comment on Wind Turbines", body:"Three speakers addressed wind turbine concerns. Cindy Nielson from Stratford stated she visited 200 houses and found no support for wind turbines, expressing concern about setbacks of 1,250 feet from her home. Wendy Rowski from Green Valley urged the board to vote no on the comprehensive plan, objecting to the term 'wind farm' and requesting it be called 'industrial wind energy development.' Heidi Pesky from McMillan argued against Joint Development Agreements, citing concerns about 30-50 year commitments and inadequate decommissioning assurances." },
      { item:"Public Comment on Double NN Speed Limit", body:"Barb Newton and Cindy Hogan from the Village of Rib Mountain spoke in support of reducing the speed limit on Double NN and establishing a no-passing zone. Newton reported 75 residents signed a petition supporting the change, citing near head-on collisions and safety concerns near the ski hill and local businesses. Hogan thanked the infrastructure committee for forwarding the recommendation to the county board." },
    ],
    publicComment: "Five speakers provided public comment. Cindy Nielson (Stratford\/Oplane Township) opposed wind turbines, stating she contacted 200 households with none supporting the projects. Wendy Rowski (Green Valley) requested the comprehensive plan use 'industrial wind energy development' instead of 'wind farm.' Barb Newton (Rib Mountain) advocated for speed reduction and no-passing zone on Double NN with 75 petition signatures. Heidi Pesky (Town of McMillan) argued against Joint Development Agreements for wind projects. Cindy Hogan (Rib Mountain) supported the Double NN speed reduction.",
    actionItems: [
      "Board to consider resolution on PFAS litigation engagement at next week's meeting",
      "Legal services agreement for PFAS litigation available for review starting on page 128 of board packet",
      "County to consider options for engaging with Hub City Wind project before PSC application is filed",
      "Infrastructure committee recommendation on Double NN speed limit to come before full board for vote",
    ],
  },
  {
    id: "gugcMAm6DFA", source: "wausau",
    title: "Wausau Board of Public Works Meeting - 3\/19\/2026 - 3\/19\/2026 - 3\/19\/2026 - 3\/19\/2026",
    date: "March 19, 2026", shortDate: "MAR 19",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=gugcMAm6DFA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Board of Public Works held a brief meeting to open bids and award the 2026 asphalt paving project. RC Pavers was selected as the winning bidder at $824,146.34, the lower of two bids received.",
    agenda: [
      { time:"0:00", item:"Call to order" },
      { time:"0:08", item:"Open bids and make recommendation for the 2026 asphalt paving project" },
      { time:"0:45", item:"Motion to adjourn" },
    ],
    discussions: [
      { item:"2026 Asphalt Paving Project Bid Opening", body:"Two bids were opened for the 2026 asphalt paving project. RC Pavers submitted the low bid at $824,146.34, while American submitted a bid of $849,872.10. A motion was made to approve RC Pavers as the winning bidder, which was seconded and passed unanimously with all members voting 'aye.'" },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "RC Pavers awarded the 2026 asphalt paving project contract at $824,146.34",
    ],
  },
  {
    id: "f1fZvkxedNY", source: "wausau",
    title: "Wausau Board of Public Works Meeting - 3\/17\/2026 - 3\/17\/2026 - 3\/17\/2026 - 3\/17\/2026",
    date: "March 17, 2026", shortDate: "MAR 17",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=f1fZvkxedNY",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Board of Public Works approved several construction bids and change orders, including awarding the 26th Street construction project to Switlick as the lowest bidder at $1,279,089.75, and approving a $14,436.50 change order for the Randolph Street\/Cherry Street project due to unexpected underground conditions. All items passed unanimously.",
    agenda: [
      { time:"0:01", item:"Call to order and consideration of March 10th regular Board of Public Works minutes" },
      { time:"0:15", item:"Open bids for 26th Street construction project" },
      { time:"1:45", item:"North 8th Avenue bid opening - postponed" },
      { time:"1:55", item:"2025 Street Construction Project A - Randolph Street, Cherry Street - Change Order One" },
      { time:"5:01", item:"2025 Street Construction Project A - Pay Estimate Number Nine" },
      { time:"5:30", item:"Portland cement concrete license for KSK Incorporated" },
      { time:"5:55", item:"Adjournment" },
    ],
    discussions: [
      { item:"March 10th Board of Public Works Minutes", body:"The minutes from the March 10th regular meeting were considered. A motion was made and seconded, and the minutes were approved unanimously with all members voting aye." },
      { item:"26th Street Construction Project Bid Opening", body:"Seven bids were opened and read aloud. Switlick submitted the lowest bid at $1,279,089.75, with Haas coming in extremely close at $1,280,877.96. Other bidders included A1 ($1,374,600), Francis Melvin ($1,385,383), Steen ($1,489,126), James Peterson ($1,570,698.56), and Earth ($1,686,780.75). A motion to approve Switlick as the winning bidder passed unanimously. Board members noted how tight the top two bids were." },
      { item:"North 8th Avenue Bid Opening", body:"This item was postponed as the bid opening deadline was extended. It will return at a future meeting." },
      { item:"Randolph Street\/Cherry Street Change Order One", body:"Staff presented Change Order One totaling $14,436.50 for four items: an inside drop on a manhole ($4,856) due to an undocumented large diameter sanitary service, water main tie-in modifications ($2,317.50) because existing pipe was 6-inch instead of recorded 8-inch, miscellaneous storm sewer tie-ins ($5,016) at $66 per linear foot, and geogrid installation ($2,247) for approximately 750 square yards near Thomas Jefferson Elementary due to unexpectedly poor soil conditions. Change Order Two regarding liquidated damages was deferred pending further discussions. The motion to approve passed unanimously." },
      { item:"Randolph Street\/Cherry Street Pay Estimate Nine", body:"Pay estimate number nine from Haas Suns Incorporated for work completed through year end was presented in the amount of $535,114.20. The motion to approve passed unanimously." },
      { item:"Portland Cement Concrete License - KSK Incorporated", body:"A board member named Vinnie confirmed he reviewed the license application and everything was in order. A motion to approve the Portland cement concrete license for KSK, Inc. passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "26th Street construction project awarded to Switlick at $1,279,089.75",
      "Change Order One for Randolph\/Cherry Street project approved at $14,436.50",
      "Pay Estimate Nine for Haas Suns approved at $535,114.20",
      "Portland cement concrete license approved for KSK Incorporated",
      "North 8th Avenue bid opening to return at future meeting",
      "Change Order Two for Randolph\/Cherry Street project to return pending liquidated damages discussion",
    ],
  },
  {
    id: "aUG3K0hxNsU", source: "weston",
    title: "Finance and Human Resources Committee - 3\/23\/2026 - 3\/23\/2026 - 3\/23\/2026 - 3\/23\/2026",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Finance & Human Resources", duration: "~1h",
    url: "https://www.youtube.com/watch?v=aUG3K0hxNsU",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_03232026-1898",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Finance and Human Resources Committee heard a detailed presentation on public works operations and budget, showing the department operates below average costs compared to central Wisconsin communities. The main action item was approving a modified employee clothing allowance policy after canceling the Cintas uniform contract, ultimately settling on $400 for 2026 and $500 annually starting 2027, plus a washer and dryer purchase, after three failed motions.",
    agenda: [
      { time:"0:01", item:"Call to order and Pledge of Allegiance" },
      { time:"1:08", item:"Roll call" },
      { time:"1:20", item:"Public comments" },
      { time:"3:15", item:"Approval of minutes from February 16, 2026" },
      { time:"3:45", item:"February financial report acknowledgment" },
      { time:"4:15", item:"T1 and T2 detail reports for February" },
      { time:"4:45", item:"Legal details for February" },
      { time:"5:00", item:"Educational presentation: Public works operations and budget" },
      { time:"40:03", item:"Old business: Reimbursement for clothing and equipment amendments" },
      { time:"1:15:01", item:"Adjournment" },
    ],
    discussions: [
      { item:"Public Works Operations and Budget Presentation", body:"Public Works Director Michael delivered an extensive presentation showing the department manages 119.5 centerline miles of road, 114 miles of water main, 103 miles of sanitary sewer, and 70 miles of storm sewer with about 50 pieces of equipment. He reported the 2026 public works budget decreased by $26,000 (1.1%) from 2025. Michael emphasized the village spends approximately $9,700 less per mile than the average central Wisconsin community, making them the third lowest spending community per mile in the region. He detailed the recent major snowstorm response where employees worked 16-17 hour shifts, with estimated costs around $50,000 for that single event. The county is applying for disaster relief funds which could reimburse some costs if the state certifies the disaster." },
      { item:"Reimbursement for Clothing and Equipment Amendments", body:"After canceling the Cintas uniform contract to save costs, staff proposed increasing the employee clothing allowance from $300 to $600 annually. Committee member Daniels objected, arguing savings shouldn't automatically mean spending and citing the upcoming fire department referendum as a higher priority. Director Michael defended the proposal, noting employees work in harsh conditions with chemicals and that providing benefits helps retention. The first motion for $600 failed on roll call (Daniels-yes, Love-no, Olsson-yes, My-no, Satai-no). A second motion for $400 also failed 3-3. A third motion for $500 with washer\/dryer failed. The fourth motion for $400 in 2026, $500 annually starting 2027, plus a washer and dryer passed with one opposed." },
      { item:"Financial Reports and Minutes", body:"The committee unanimously approved the minutes from February 16, 2026, and acknowledged the February 2026 financial reports for all funds, T1 and T2 detail reports, and legal details. All motions passed with voice votes, no opposition." },
    ],
    publicComment: "Lisa Beck of 1808 Cortez Lane spoke during public comment. She praised Public Works Director Michael for the department's work during the recent storm. She also questioned the proposed clothing allowance increase, suggesting the village consider not going to the highest proposed amount since Cintas was cancelled to save money, and questioned whether employees need all the apparel being provided.",
    actionItems: [
      "Clothing allowance policy amended to $400 for remainder of 2026, $500 annually starting 2027, with one-time purchase of washer and dryer - recommended to village board",
      "Marathon County applying for state disaster relief funds for recent snowstorm - village will submit costs if state certifies disaster",
      "New public works employee starting Wednesday to bring department back to 10 full-time staff",
      "Salt order placed for 1,500 tons through state cooperative purchase program",
      "Next meeting scheduled for Tuesday, April 21st at 5:00 PM due to new board member swearing-in schedule",
    ],
  },
  {
    id: "_hS5GDGVL1c", source: "wausau",
    title: "Wausau Public Health and Safety Committee Meeting - 3\/23\/2026 - 3\/23\/2026 - 3\/23\/2026 - 3\/23\/2026",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Public Health & Safety", duration: "~1h",
    url: "https://www.youtube.com/watch?v=_hS5GDGVL1c",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Public Health and Safety Committee approved a parklet permit for West Cider Diner and Lounge after the owner presented detailed plans, deferred action on one bartender license denial pending police chief review, and approved multiple license applications and summer event permits. The committee also repealed outdated ordinances, approved a solar energy partnership, and received updates on the fire department and homeless shelter transition.",
    agenda: [
      { time:"0:00", item:"Call to order and excused absences" },
      { time:"0:20", item:"Public comment on agenda items" },
      { time:"0:45", item:"Approval of February 16, 2026 meeting minutes" },
      { time:"1:15", item:"License applications - West Cider Diner and Lounge parklet permit" },
      { time:"10:30", item:"License denial recommendations - Theodore Davis and Joanna Gregory" },
      { time:"19:15", item:"Batch approval of remaining license applications and summer events" },
      { time:"20:01", item:"Repealing and recreating Municipal Code Chapter 6.44 - Solid waste disposal" },
      { time:"21:30", item:"Repealing handheld mobile phone ordinance" },
      { time:"24:30", item:"Memorandum of understanding with Midwest Renewable Energy for solar program" },
      { time:"26:30", item:"Fire Department 2025 annual report and discussion" },
      { time:"32:00", item:"Tavern activities report for February 2026" },
      { time:"36:30", item:"Community outreach update and homeless shelter transition" },
    ],
    discussions: [
      { item:"West Cider Diner and Lounge Parklet Permit", body:"Owner Tyler Vote presented detailed mockups of a proposed parklet at 628 North Third Avenue that would extend 4 feet into the street and 4 feet on the sidewalk. He explained the parklet would provide sunny seating for breakfast customers and would be lit and decorated. Alder Watson initially expressed hesitation but changed position after seeing the layout. The permit was approved unanimously with the understanding Vote would report back in November on how the summer season went." },
      { item:"Theodore Davis Bartender License Denial", body:"Davis appeared before the committee regarding his bartender license denial recommendation. He acknowledged a mistake made 20 years ago as a minor and stated he completed registry requirements and is in ongoing therapy. His boyfriend Matthew Prieb spoke emotionally in support, emphasizing Davis has not reoffended and is a good person. The committee deferred action because evidence of rehabilitation documents submitted to Chief Barnes had not been reviewed, and Deputy Chief Baiton was unfamiliar with the materials. The item was held for the next meeting pending the chief's updated recommendation." },
      { item:"Joanna Gregory Bartender License Denial", body:"Joanna Gregory did not appear for her denial hearing. The denial was included in the batch motion that passed unanimously." },
      { item:"Batch License Approvals", body:"The committee approved summer events including Wings over Wausau, Concerts on the Square, Chalkfest, Memorial Day parade, Hope on the Block, and Jazz on the River. The liquor license review subcommittee recommended approval for Oasis Arcade, the rebranded Whiskey River Bar and Grill under new ownership, and new ownership for Hayawa. Motion by Larson, second by Watson, passed unanimously with Theodore Davis excluded pending further review." },
      { item:"Solid Waste Disposal Ordinance Update", body:"Assistant City Attorney Vinnie Bonino presented the repeal and recreation of Municipal Code Chapter 6.44 to comply with evolved state regulations. Motion by Larson, second by Watson, passed unanimously without discussion." },
      { item:"Handheld Mobile Phone Ordinance Repeal", body:"The committee repealed the local cell phone ban ordinance as state inattentive driving statutes have been amended to regulate cell phone usage, making the local ordinance redundant. Bonino confirmed the city already adopts state traffic code. Motion by Watson, second by Larson, passed unanimously." },
      { item:"Midwest Renewable Energy Solar Partnership", body:"Carrie from planning reported the sustainability committee voted unanimously on March 5th to move forward with this MOU for a group solar purchasing program. Alder Sarah spoke in support, noting her personal experience with solar installation and praising MREA's expertise. Motion by Watson, second by Larson, passed unanimously." },
      { item:"Fire Department 2025 Annual Report", body:"Fire Chief Cop reported the department responded to over 7,200 calls (averaging 20 per day), setting a new record. He announced the city regained ISO Class 2 status as of Friday, which will remain for four years. The chair encouraged public review of the annual report and noted upcoming public information sessions on March 31st, April 1st at Station 2, and April 3rd at Station 1 regarding the fire department referendum on April 7th. Report placed on file." },
      { item:"Tavern Activities Report", body:"Deputy Chief Baiton presented February 2026 as a routine month. Alder Sarah inquired about Trace Armanos restaurant's status after seeing liquor signs but the business being closed; staff will follow up with the owner. The chair noted numerous impaired driving arrests during the recent blizzard and commended patrol officers. Report placed on file." },
      { item:"Community Outreach and Homeless Shelter Transition", body:"Tracy Durante reported 415 unduplicated guests served since the WMC shelter opened and over 740 volunteer hours in February. She noted Catholic Charities saw 99 unduplicated guests since November 1st. James Torensson, new Director of Homeless Services at Bridge Street Mission, explained the transition from WMC shelter to Bridge Street Mission is expected around April 20th, pending contractor confirmation on April 1st. The WMC shelter extended its contract with First United Methodist Church through April 19th to ensure no gap in service. The committee expressed interest in touring the new facility at the ribbon cutting ceremony." },
    ],
    publicComment: "Carrie Mor Everest of 1025 Everest Boulevard spoke at the end of the meeting regarding concerns about treatment of unhoused individuals during 911 emergency responses at the shelter. She stated she has volunteered throughout the shelter's operation and witnessed multiple instances where she felt people were not treated ethically or professionally. She expressed frustration that complaints over 10 months had not been addressed and only recently learned about the Police and Fire Commission citizen complaint process. The chair noted formal complaint processes exist through the Police and Fire Commission.",
    actionItems: [
      "Approved parklet permit for West Cider Diner and Lounge at 628 North Third Avenue for summer 2026 - owner to report back in November",
      "Deferred Theodore Davis bartender license decision pending Chief Barnes' review of rehabilitation evidence - to be addressed at next meeting",
      "Denied Joanna Gregory bartender license application (did not appear)",
      "Approved all recommended license applications including Oasis Arcade, Whiskey River Bar and Grill, and Hayawa new ownership",
      "Approved summer event permits for Wings over Wausau, Concerts on the Square, Chalkfest, Memorial Day parade, Hope on the Block, and Jazz on the River",
      "Approved repeal and recreation of Municipal Code Chapter 6.44 regarding solid waste disposal",
      "Approved repeal of local handheld mobile phone ordinance (Section 10.01.012)",
      "Approved MOU with Midwest Renewable Energy for Grow Solar Central Wisconsin group buying program",
      "Fire Department to continue public information sessions on referendum (March 31, April 1, April 3)",
      "Staff to follow up with Trace Armanos owner regarding business status",
      "Staff to verify Days tavern point totals on running calendar",
      "Committee to schedule tour of Bridge Street Mission shelter at ribbon cutting ceremony",
    ],
  },
  {
    id: "Izfp0CD_Da0", source: "weston",
    title: "Board of Trustees - 3\/23\/2026 - 3\/23\/2026 - 3\/23\/2026 - 3\/23\/2026",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=Izfp0CD_Da0",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_03232026-1898",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Board of Trustees approved multiple ordinances including rezoning requests and a modified speed limit ordinance, approved a 10-year baseball\/softball field maintenance agreement, and deferred action on the remote meeting attendance policy until the new board is seated. A resident criticized the board's approach to funding the fire department through referendum rather than budget prioritization.",
    agenda: [
      { time:"0:01", item:"Call to order and Pledge of Allegiance" },
      { time:"0:01", item:"Roll call" },
      { time:"1:00", item:"Public comments" },
      { time:"5:01", item:"Minutes from previous meeting and acknowledgment of reports" },
      { time:"20:02", item:"Ordinances - Rezoning and speed limit amendments" },
      { time:"30:01", item:"Resolution approving Hinter Springs Second Edition subdivision plat" },
      { time:"31:00", item:"Referendum informational sessions update" },
      { time:"35:02", item:"E-bike and euro ordinance discussion" },
      { time:"37:00", item:"Parking restrictions removal on Altaverie and Alderson Streets" },
      { time:"40:00", item:"Intersection signage at Community Center Drive and Birch Street" },
      { time:"44:00", item:"Baseball\/softball field maintenance agreement and other park items" },
      { time:"50:00", item:"Remote meeting attendance policy and Microsoft Teams communication" },
    ],
    discussions: [
      { item:"Public Comments", body:"Jim Pensel of 5002 Aerrol Street spoke critically of the board's approach to fire department funding. He praised SAFER personnel after attending their citizen academy but criticized the referendum approach, stating 'We don't have a revenue problem here in Weston. We have a priority problem.' He argued the board should prioritize fire\/EMS funding over amenities like artificial turf and the aquatic center." },
      { item:"Finance Director Response to Public Comment", body:"Finance Director Jessica responded that the village cannot borrow for additional firefighters, only for capital projects like the Kennedy Park turf. She noted the village is 'the cheapest' and 'most efficient' but stated 'we need more money' and expressed frustration with criticism, suggesting her position might be open in a couple months." },
      { item:"Speed Limit Ordinance 26-006", body:"The original ordinance to set Weston Avenue speed limits at 35 mph from Von Kennel to Ryan failed 4-3, with Maloney, Jordan, and the presiding officer voting no. Trustee Maloney argued the 35 mph limit from Von Kennel to Ryan was unnecessary given the road conditions compared to Scoffield Avenue. An amended motion was approved setting Camp Phillips to Von Kennel at 35 mph while keeping Von Kennel to Highway J at 45 mph." },
      { item:"Rezoning Ordinances", body:"Two rezoning ordinances were approved unanimously as recommended by the Planning Commission: Ordinance 26-00004 rezoning a portion of 8905 Bert Street from RR5 to SFS, and Ordinance 26-00005 rezoning a portion of 7105 Christensen Avenue from SL to SFS." },
      { item:"Intersection Signage at Community Center Drive", body:"The board approved changing the stop sign on Community Center Drive at Birch Street to a yield sign, with an amendment adding a stop sign for bicyclists coming off the pedestrian bridge. Trustee Hooang raised concerns about cyclists traveling 15-20 mph off the bridge without any signage. Motion passed unanimously with the friendly amendment." },
      { item:"Baseball\/Softball Field Maintenance Agreement", body:"A 10-year maintenance and user agreement with youth baseball and softball organizations was approved unanimously. The committee recommended the long term to protect the village's investment at Kennedy Park and provide stability despite leadership changes in organizations." },
      { item:"Remote Meeting Attendance Policy", body:"Trustee Lewis moved to defer this item to the next meeting so the newly seated board could make the decision. Motion to defer passed unanimously." },
      { item:"Microsoft Teams for Communication", body:"The board approved using Microsoft Teams for trustee communication starting with the next term. Training will be provided when the new board is seated. Motion passed unanimously." },
      { item:"Trustee Remarks - Joe's Final Meeting", body:"The board acknowledged that Trustee Joe Zagami's term is ending. Trustees Mark Maloney and others thanked him for his service, and Zagami indicated he intends to continue serving on committees including the planning commission." },
    ],
    publicComment: "Jim Pensel of 5002 Aerrol Street, Weston, spoke for approximately 4 minutes criticizing the board's approach to fire department funding. He praised SAFER staff after attending their citizen academy, but argued the referendum approach was 'short-sighted' and that the board should reprioritize existing budget funds away from amenities like artificial turf and the aquatic center toward fully funding fire and EMS.",
    actionItems: [
      "Speed limit ordinance amended: Camp Phillips to Von Kennel at 35 mph, Von Kennel to Highway J remains at 45 mph",
      "Rezoning approved for portions of 8905 Bert Street and 7105 Christensen Avenue",
      "Hinter Springs Second Edition subdivision plat approved",
      "E-bike\/euro ordinance tabled pending county completion of process",
      "No parking restrictions removed on west side of Alderson Street along Kennedy Park",
      "Yield sign to replace stop sign at Community Center Drive\/Birch Street; stop sign added for bicyclists on pedestrian bridge",
      "10-year baseball\/softball field maintenance agreement approved",
      "Commercial rotary mower purchase approved",
      "Park shelter fees and field rental costs approved",
      "Eagle Scout project at McKiller Park approved with funding from park operations",
      "Remote meeting attendance policy deferred to April 21st meeting for new board",
      "Microsoft Teams approved for trustee communication starting next term",
      "Military Road utility engineering service contract approved",
      "Business 51 storm pond engineering service contract amendment approved for $13,500",
      "Sewer televising software contract approved",
      "2026 annual stream maintenance plan budget approved",
      "Hospital area repaving change order #4 approved",
      "Well rehabilitation approved",
      "Sign encroachment agreement with Seventh Floor Investments LLC approved",
      "Next meeting scheduled for Tuesday, April 21st at 6 PM with new board members",
    ],
  },
  {
    id: "HwjjV4oIneA", source: "marathon",
    title: "Marathon County Board Regular Meeting - 3\/24\/2026 - 3\/24\/2026 - 3\/24\/2026 - 3\/24\/2026",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=HwjjV4oIneA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board of Supervisors adopted the Marathon County Comprehensive Plan 2026 after approving nine amendments addressing topics including renewable energy terminology, data centers, radon\/lead remediation, AI technology, and energy policy. The board also approved salaries for elected officials, authorized phase 2 design for a new highway facility, approved engagement of outside counsel for PFAS litigation, and ratified a local state of emergency declaration for the recent blizzard.",
    agenda: [
      { time:"0:12", item:"Call to order, Pledge of Allegiance, and moment of reflection" },
      { time:"1:30", item:"Roll call and welcome to visitors" },
      { time:"2:15", item:"Standing committee reports" },
      { time:"2:30", item:"Consent agenda items C8 through C13 B2" },
      { time:"3:00", item:"Adopting Marathon County Comprehensive Plan 2026 (Ordinance 0-13-26)" },
      { time:"1:20:01", item:"Resolution establishing salaries for elected department heads (Resolution 12-26)" },
      { time:"1:21:00", item:"Resolution authorizing phase 2 design services for new highway facility (Resolution 13-26)" },
      { time:"1:23:30", item:"Resolution authorizing outside counsel for PFAS litigation (Resolution 14-26)" },
      { time:"1:28:00", item:"Resolutions on budget amendments and capital asset thresholds" },
      { time:"1:30:01", item:"Ratification of local state of emergency declaration (Resolution 22-26)" },
      { time:"1:35:00", item:"Administrator performance evaluation and salary" },
      { time:"1:40:00", item:"Announcements and adjournment" },
    ],
    discussions: [
      { item:"Marathon County Comprehensive Plan 2026", body:"Administrator Leonard presented 10 proposed amendments compiled from supervisor feedback. The board voted on amendments individually after Supervisor Crawl successfully moved to separate amendments 2, 3, and 4. Amendment 1 (livability standards) passed unanimously. Amendments 2, 3, and 4 (alternative energy systems terminology changes proposed by Vice Chair Dickinson) each passed but not unanimously, with Supervisor Crawl voting no. Amendment 5 (data centers and battery storage background language) passed but not unanimously, with Supervisor Leur voting no citing ideological concerns. Amendment 6 (radon and lead remediation reference) passed unanimously. Amendment 7 (regulate energy projects when allowed by law) passed but not unanimously. Amendment 8 (AI and automation language proposed by Supervisor Leur) passed unanimously. Amendment 9 was significantly debated - Supervisor Sindellski's original language promoting clean coal, natural gas, and nuclear was amended by Supervisor Boots to read 'promote coal and natural gas until a long-term sustainable and reliable energy source for use in Marathon County can be found that does not adversely affect agricultural land.' Supervisors Robinson and Rosenberg opposed the amendment, with Rosenberg stating 'there is no such thing as clean coal' from his experience working at the Weston Power Plant. The amended version passed but not unanimously. A late amendment from Supervisor Sindellski regarding utility-scale wind, solar and battery facilities being considered industrial uses was debated extensively. Supervisor Jeang moved to refer it to committee, but after discussion about process requirements, both the referral motions and the amendment itself were defeated. The final comprehensive plan as amended passed but not unanimously." },
      { item:"Salaries for Elected Department Heads (Resolution 12-26)", body:"Resolution establishing salaries for clerk of courts, sheriff, and elected department heads for the upcoming term of office. Passed with no discussion." },
      { item:"Highway Facility Phase 2 Design Services (Resolution 13-26)", body:"Resolution authorizing staff to proceed with phase 2 design services for the new highway facility. Supervisor Soyber requested information on plans for the old facility, and Chair Gibbs noted that the HR Finance and Property Committee will address this in the future. Supervisor Sundowski asked about the $53 million cost estimate but was informed that cost approval was not part of this resolution. Passed unanimously." },
      { item:"PFAS Litigation Outside Counsel (Resolution 14-26)", body:"Resolution authorizing engagement of outside counsel on contingency basis for PFAS lawsuits. Two amendments were adopted: Supervisor Robinson's amendment directing the county administrator to evaluate past and present practices that may have resulted in PFAS exposure in county operations passed unanimously. Vice Chair Dickinson's amendment modifying language regarding airport property also passed unanimously. The resolution as amended passed unanimously." },
      { item:"Ratification of Local State of Emergency (Resolution 22-26)", body:"Administrator Leonard explained the ratification was needed to preserve opportunity for reimbursement after the governor's emergency declaration expired on March 16th during the blizzard. He praised county staff extensively, noting facilities and parks staff logged over 600 hours of additional time in 24 hours, highway workers worked 12-16 hour shifts sleeping on cots, and staff ensured dispatch and corrections shift changes could occur. Supervisor Fifer echoed thanks to staff. Passed unanimously." },
      { item:"Administrator Performance Evaluation", body:"Chair Gibbs explained the executive committee had finalized the administrator's evaluation using board input summarized at the previous meeting. Supervisor Robinson moved to accept the executive committee's recommendation on salary and performance evaluation without going into closed session. Passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Marathon County Comprehensive Plan 2026 adopted with nine amendments (Ordinance 0-13-26)",
      "Salaries established for clerk of courts, sheriff, and elected department heads for upcoming term",
      "Phase 2 design services authorized for new highway facility",
      "Outside counsel authorized for PFAS litigation on contingency basis",
      "County administrator directed to evaluate PFAS exposure risks in county operations",
      "Budget carry forwards and amendments approved (Resolution R-20-26)",
      "Capital asset threshold set at $10,000 for general assets and $50,000 for infrastructure",
      "Law enforcement drug trafficking response grant accepted",
      "Local state of emergency declaration ratified",
      "Administrator salary and performance evaluation approved per executive committee recommendation",
      "Departing supervisors recognized: Crawl, Fifick, Marshall, Rosenberg, Hardinger, V, and Reynolds",
    ],
  },
  {
    id: "EnyAF7yRQ7c", source: "weston",
    title: "Tourism Commission",
    date: "April 21, 2026", shortDate: "APR 21",
    committee: "Tourism Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=EnyAF7yRQ7c",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04212026-1908",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Tourism Commission approved four grant requests totaling $22,500 for local events including the Mountain Bay Cup soccer tournament, GG's 5K Glow Fun Run, Hmong Wausau Festival, and Wisconsin Valley Fair. A special meeting was scheduled for May 18th to consider a late application from Taste and Glow Balloon Festival that was missed due to staff error.",
    agenda: [
      { time:"0:07", item:"Call to order and Pledge of Allegiance" },
      { time:"0:45", item:"Roll call" },
      { time:"1:05", item:"Public comments" },
      { time:"4:15", item:"Minutes from previous meeting" },
      { time:"4:35", item:"2025 Budget status report acknowledgment" },
      { time:"5:00", item:"CVB reports presentation by Tim White" },
      { time:"14:05", item:"Grant request - Mountain Bay Cup soccer tournament" },
      { time:"22:15", item:"Grant request - GG's 5K Glow Fun Run Walk" },
      { time:"27:30", item:"Grant request - Hmong Wausau Festival" },
      { time:"33:00", item:"Grant request - Wisconsin Valley Fair" },
      { time:"38:30", item:"Post-event report - Wisconsin High School Bowling" },
      { time:"39:30", item:"Remarks from staff - Taste and Glow application discussion" },
      { time:"44:30", item:"Remarks from commissioners and future items" },
    ],
    discussions: [
      { item:"Public comments", body:"Jim Pensson of 500 Street Weston raised concerns about grant applications claiming up to 2,000 hotel room bookings, questioning whether this exceeds actual hotel capacity in Weston and the Wausau area. He also asked about follow-through on promises to coordinate with Weston businesses and restaurants mentioned in after-action reports." },
      { item:"CVB reports", body:"Tim White, Visit Wausau Executive Director, reported on upcoming events including the Wisconsin Bike Fed summit and Marathon County Parks film festival. He provided extensive updates on the World Horseshoe Tournament coming in July, noting registrations are ahead of last year's 644 participants with expectations of 800+ participants. White introduced new Director of Operations Jamie Rice Hecondorf and acknowledged missing the Taste and Glow Balloon Festival grant application, taking responsibility for the error. He addressed the hotel room question, stating there are about 2,400 rooms in the greater Wausau area. Motion to acknowledge passed unanimously." },
      { item:"Grant request - Mountain Bay Cup", body:"Dan Kubat, MC United Soccer Club tournament director, presented the request for the May 1-3 spring tournament. He reported 170 teams registered with 68.5% (116 teams) traveling more than 90 miles. He estimated 8-10,000 attendees and economic impact of $700,000 to $1 million. This is a new grant request for the spring tournament; fall tournament was previously funded at $3,500. The tournament will use Peoples Sports Complex, overflow to Airport Park, and showcase Green Head Turner Center. Renee moved to approve $5,000, seconded by Jackson. Motion passed unanimously." },
      { item:"Grant request - GG's 5K Glow Fun Run Walk", body:"Erica presented online for GG's Playhouse sixth annual event at Weston YMCA, targeting 600-700 participants. She noted out-of-state attendance including Minnesota, Texas, Michigan, and Illinois. New this year is a cornhole tournament. She confirmed WAOW TV sponsorship is secured. The foam machine remains a signature attraction. Renee moved to approve $2,500, seconded by Jackson. Motion passed unanimously." },
      { item:"Grant request - Hmong Wausau Festival", body:"Elang Jang, festival chair since 2017, presented the request for the August 1-2 event. Last year's attendance was 12,000-13,000; this year expects 14,000-15,000 with a new under-18 volleyball and soccer tournament adding 500-800 athletes plus families. Jang noted it is the largest Hmong festival in Wisconsin and acknowledged space constraints are becoming a concern. He emphasized that hotels within an hour are typically fully booked. Husane moved to approve $10,000, seconded by Renee. Motion passed unanimously." },
      { item:"Grant request - Wisconsin Valley Fair", body:"No representative was present in person or online. Commissioners noted last year's grant was $5,000 (request was $10,000). Discussion focused on limited benefit to Weston specifically - the application listed only 3-4 hotel rooms and hotels contacted were in Wausau and Rothschild, not Weston. Commissioners questioned whether the primarily local attendance justified the request. Husane moved to approve $5,000, seconded by Renee. Motion passed unanimously." },
      { item:"Taste and Glow Balloon Festival application", body:"Staff noted that Tim White missed receiving the Taste and Glow application. Since the event is the second weekend of July, before the regular July 20th meeting, commissioners agreed to schedule a special meeting on May 18th at 4:00 PM solely to consider this application, allowing time for the organization to include the village in advertising if approved." },
    ],
    publicComment: "Jim Pensson of 500 Street, Weston, submitted comments online questioning the accuracy of hotel room estimates in grant applications (claiming 2,000 rooms when Weston capacity is much lower) and asking about follow-through on promises to coordinate with Weston businesses.",
    actionItems: [
      "Approved $5,000 grant to MC United Soccer Club for Mountain Bay Cup (May 1-3, 2026)",
      "Approved $2,500 grant to GG's Playhouse for GG's 5K Glow Fun Run Walk",
      "Approved $10,000 grant to Hmong American Center for Hmong Wausau Festival (August 1-2, 2026)",
      "Approved $5,000 grant to Marathon County Agriculture Society for Wisconsin Valley Fair",
      "Scheduled special meeting for May 18, 2026 at 4:00 PM to consider Taste and Glow Balloon Festival grant application",
      "Tim White to provide report on hotel room capacity estimates for Weston and surrounding areas",
    ],
  },
  {
    id: "D7R7a0G0WTA", source: "weston",
    title: "Parks Committee - 3\/23\/2026 - 3\/23\/2026 - 3\/23\/2026 - 3\/23\/2026",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Parks and Recreation Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=D7R7a0G0WTA",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_03232026-1898",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Parks Committee discussed park impact fees, selected Rettler Corporation as the consultant for Mead Park master planning, and reviewed Yellow Banks kayak launch expenses which came in significantly under budget due to successful grant funding. The committee also discussed ice rink operations at Kennedy Park and potential future hockey facility improvements.",
    agenda: [
      { time:"0:05", item:"Call to order and Pledge of Allegiance" },
      { time:"0:30", item:"Roll call" },
      { time:"0:45", item:"Approval of minutes from February 23rd, 2026" },
      { time:"1:05", item:"Public comments" },
      { time:"5:45", item:"Educational presentations - Review of parks and recreation impact fee discussion" },
      { time:"25:30", item:"Unfinished business - RFP for Mead Park master plan and budget estimates" },
      { time:"32:00", item:"New business - Review of Yellow Banks kayak launch expenses" },
      { time:"38:30", item:"New business - Components of operations for ice rink at Kennedy Park" },
      { time:"50:15", item:"Future items and next meeting date" },
      { time:"52:00", item:"Adjournment" },
    ],
    discussions: [
      { item:"Approval of minutes from February 23rd, 2026", body:"A motion to accept the minutes was made and seconded. The motion carried with no opposition." },
      { item:"Parks and recreation impact fee discussion", body:"Jennifer presented information on park impact fees, noting the village currently charges $300 for single family homes while neighboring communities charge $600-$900. The 2020 study recommended fees of $761 for single family but only modest increases were adopted. Committee members expressed support for a moderate increase to be more in line with neighboring communities while remaining competitive. Katrina stated she would support the moderate increase bracket. The matter will go to Plan Commission for final decision." },
      { item:"RFP for Mead Park master plan", body:"Staff received seven proposals for the Mead Park master planning project. Four staff members reviewed and rated proposals based on firm experience, personnel experience, similar projects, scope understanding, and cost. JSD and Rettler Corporation were the two lowest bids and most qualified based on reviews. Roger made a motion to select Rettler Corporation, seconded by Katrina. The motion carried unanimously." },
      { item:"Yellow Banks kayak launch expenses", body:"Jessica presented a detailed breakdown of the kayak launch project expenses and grant funding. The project included some unforeseen costs including subgrade issues and an unknown well casing. Multiple grants were secured by Jessica and Dan Hagenbotham, with Marathon County Transportation covering the full expense for ADA accessibility components. Katrina praised the RFC as 'awesome' and 'super well written,' commending the transparency and successful grant work that significantly reduced out-of-pocket costs for the village." },
      { item:"Ice rink operations at Kennedy Park", body:"Staff presented information on ice rink operations as requested by committee member Katrina. The warming house has been unattended since 2020 due to COVID and subsequent staffing challenges. Everest Youth Hockey has expressed interest in improvements including a covered structure to extend ice season. Staff noted ongoing discussions about Marathon Park's hockey facilities may increase need for ice facilities. Katrina stated she wants to ensure hockey users are not forgotten amid baseball-focused Kennedy Park discussions. Staff will bring back historical attendance numbers from 2018-19 seasons at the next meeting." },
    ],
    publicComment: "Jim Pencil (Street not specified) expressed frustration about receiving no response to his three pages of comments and questions submitted prior to the February meeting. He raised concerns about playground equipment installed negligently in 2024, lack of Kennedy Park fundraising updates, hockey facilities being forgotten, and criticized the ice rink cost analysis as incomplete, arguing true costs are closer to $20,000-$30,000 when staff hours are included rather than the stated $1,320.98. Lisa Beck (1808 Cortez Lane) thanked Michael for snow removal during the blizzard and praised Sean and Jessica for the well-written Yellow Banks kayak launch RFC. A written response to Jim Pencil's previous email was submitted and will be included in the minutes.",
    actionItems: [
      "Rettler Corporation selected as consultant for Mead Park master plan",
      "Jennifer to present neighboring community impact fee comparisons to Plan Commission next month",
      "Staff to bring historical ice rink attendance data from 2018-19 seasons to next meeting",
      "Staff to compile user feedback on ice rink operations",
      "Kennedy Park quarterly update scheduled for April board meeting",
      "Next Parks Committee meeting scheduled for April 27th, 2026",
    ],
  },
  {
    id: "8rRo1cm2YJ0", source: "wausau",
    title: "Wausau Finance Committee Meeting - 3\/24\/2026 - 3\/24\/2026 - 3\/24\/2026 - 3\/24\/2026",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "Finance", duration: "~1h",
    url: "https://www.youtube.com/watch?v=8rRo1cm2YJ0",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Finance Committee approved several routine items including airport ground leases and budget carryovers, but postponed action on joining a national opioid settlement and a budget amendment for lead service line replacement costs. The committee also approved transfers to cover shortfalls in recycling, airport, and parking funds, and advanced the 2026 borrowing calendar showing the city's debt utilization will decrease slightly despite new issuances.",
    agenda: [
      { time:"2:01", item:"Call to order and public comment" },
      { time:"2:35", item:"Approval of March 10, 2026 meeting minutes" },
      { time:"3:05", item:"Green Acres at Greenwood Hills LLC unlawful tax claim" },
      { time:"3:55", item:"Consent to transfer title at 939 Woods Place" },
      { time:"4:25", item:"Terminating airport ground lease with Win O. Jones" },
      { time:"4:45", item:"Approving airport ground lease with Owen Jones" },
      { time:"5:05", item:"Approving airport ground lease with Cole Lundberg" },
      { time:"5:25", item:"National opioid settlement participation" },
      { time:"12:00", item:"Budget amendment for lead service line replacement" },
      { time:"27:03", item:"Budget amendment for 2025-2026 carryover funds" },
      { time:"29:30", item:"Review of 2025 motorpool fund financial results" },
    ],
    discussions: [
      { item:"Minutes approval", body:"Alder Watson moved to approve the March 10, 2026 minutes, seconded by Alder Griner. Motion passed unanimously with voice vote." },
      { item:"Green Acres at Greenwood Hills LLC tax claim", body:"This claim relates to ongoing litigation with Greenwood Hills. Alder Watson moved to approve the claim for recovery of unlawful tax, seconded by Griner. The chair explained a 'no' vote would deny the claim. The motion failed when members voted 'no' to deny the claim." },
      { item:"Airport ground leases - 939 Woods Place", body:"Three related items handled the transfer of a hangar from Win O. Jones to Owen Jones. All three motions (consent to transfer, termination of old lease, approval of new lease) passed unanimously with voice votes. Motions made by Watson and Tierney, seconded by Griner and Watson." },
      { item:"Airport ground lease with Cole Lundberg", body:"Alder Griner moved to approve, seconded by Watson. Passed unanimously." },
      { item:"National opioid settlement participation", body:"Committee members expressed discomfort proceeding without more information. Alder Malini asked where this came from, and Assistant Attorney Vincent explained a law firm sent notice that the city may qualify for the class action. Alder Tierney and Watson expressed concerns about signing away future legal action without knowing details. Alder Griner moved to postpone to the next meeting, seconded by Tierney. Motion to postpone passed unanimously. Deadline to opt in is May 4th." },
      { item:"Lead service line replacement budget amendment", body:"Eric from Public Works explained the DNR changed funding terms, leaving $709,000 in costs not covered by the subsidized loan - $284,000 for homeowner side and $426,000 for water utility side. Finance Director Marian outlined options including using general fund reserves, PFAS settlement money, or adding to borrowing. Alder Tierney opposed adding more debt. Alder Watson moved to postpone to allow time to determine funding sources including potential PFAS settlement use. Motion to postpone passed unanimously." },
      { item:"2025-2026 carryover funds", body:"Finance Director explained the large carryover amount includes grant-funded items like 10 transit buses from VW mitigation program. Several projects including city hall chimney liner and DPW fence replacement haven't started yet. Alder Watson moved to approve, seconded by Griner. Passed unanimously." },
      { item:"2025 motorpool fund results", body:"Finance Director reported the motorpool fund shows a $41,373 loss before GMT transfer, but with the $191,000 GMT transfer would show $150,000 profit. There's a $177,000 cash flow shortfall expected, but ARPA savings and equipment sale proceeds should cover it. Solomon from MotorPool explained delays on dump trucks and ambulances ordered in 2023, noting supply chain issues but equipment should arrive soon. This was informational only; no action taken." },
      { item:"2025 general fund results", body:"Finance Director reported $1.2 million surplus driven by strong building permits, GMT money, and investment income. Public works, fire, and police are over budget primarily due to motorpool charges. CCITC overage of $194,000 was attributed to communication problems including double-counting a 95% personnel budget adjustment and unbudgeted Office 365 upgrade ($65,000). After proposed transfers to recycling, airport, and parking funds, surplus would be $540,000. Alder Tierney moved to approve the transfers, seconded by Watson. Passed unanimously." },
      { item:"2026 general obligation promissory note", body:"Finance Director presented borrowing calendar showing $10 million in new borrowing against $12 million in retired debt, reducing debt utilization slightly. Projects include street improvements (10-year), motorpool (5-year), and various TID district projects. Alder Watson moved to approve the calendar, the chair seconded. Passed unanimously. Phil Cawson from Ehlers will present parameters resolution at next meeting." },
      { item:"Potential property purchases for DPW expansion", body:"Properties at 108, 112, 112½ Adolf Street and 233 Myron Street were scheduled for closed session discussion. Due to time constraints with council meeting starting at 6:30, Alder Watson moved to postpone to next meeting, seconded by Tierney. Passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Bring opioid settlement back to next meeting with more detailed information from city attorney",
      "Determine funding approach for $709,000 lead service line shortfall and bring back to next meeting",
      "Transfer GMT revenues to motorpool, recycling, airport, and parking funds per approved budget amendment",
      "Phil Cawson from Ehlers to present borrowing parameters resolution at next finance meeting",
      "Schedule closed session for DPW property purchases at next meeting",
      "Review and close ARPA projects to identify savings for motorpool fund shortfall",
    ],
  },
  {
    id: "47UbKS2Jqo4", source: "marathon",
    title: "Marathon County Executive Committee Meeting - 3\/24\/2026 - 3\/24\/2026 - 3\/24\/2026 - 3\/24\/2026",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "Executive Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=47UbKS2Jqo4",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Executive Committee met briefly before entering closed session to conduct a performance review of the county administrator. The committee voted unanimously to go into closed session, with all members voting in favor.",
    agenda: [
      { time:"0:00", item:"Call to order" },
      { time:"0:05", item:"Pledge of Allegiance" },
      { time:"0:35", item:"Performance review of the administrator (3A1)" },
      { time:"1:45", item:"Motion to enter closed session" },
    ],
    discussions: [
      { item:"Performance review of the administrator", body:"The chair explained that the committee had the opportunity to go into closed session to finalize the administrator's review, incorporating board feedback received the previous Thursday. The chair noted that the executive committee had rated the administrator on three criteria: needs improvement, successful, and exceptional, with scores averaged on a scale of 0 to 5. Corporation counsel was asked to provide a summary of the appraisal. A motion was made and seconded to enter closed session for the evaluation." },
      { item:"Vote to enter closed session", body:"The committee voted unanimously to enter closed session. Roll call vote: Gibbs - aye, Dickinson - aye, Arstead - aye, Boots - aye, Drebeck - aye, Fifick - aye, Mask - aye, Ritter - aye, Morash - aye, Robinson - aye. Motion passed with all ayes." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Committee entered closed session to conduct performance evaluation of the county administrator",
      "Corporation counsel to present summary of administrator evaluation scores",
    ],
  },
  {
    id: "3Fv9cQDY1sU", source: "weston",
    title: "Board of Trustees",
    date: "April 21, 2026", shortDate: "APR 21",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=3Fv9cQDY1sU",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04212026-1908",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Board of Trustees held its first meeting with three newly elected trustees, approving liquor license renewals, preliminary assessment resolutions for three street reconstruction projects, and a solid waste ordinance amendment. The board debated remote meeting attendance policy, ultimately voting 6-1 to allow remote attendance with camera requirements while prohibiting remote participation in closed sessions. Significant discussion occurred regarding Kennedy Park renovation funding transparency.",
    agenda: [
      { time:"0:00", item:"Call to order and Pledge of Allegiance" },
      { time:"2:06", item:"Public comments" },
      { time:"13:40", item:"Approval of March 16th, 2026 meeting minutes" },
      { time:"16:52", item:"Acknowledge reports from boards, committees, and commissions" },
      { time:"18:34", item:"Department reports (Administrator, Clerk, Finance, EMS\/Fire, Parks & Rec, Planning & Development, Police, Public Works, Technology)" },
      { time:"36:26", item:"Work product transmittals" },
      { time:"37:03", item:"Consent agenda with liquor license renewals" },
      { time:"39:10", item:"Ordinance 26-008 amending solid waste chapter" },
      { time:"39:30", item:"Preliminary assessment resolutions for street reconstructions" },
      { time:"41:55", item:"Kennedy Park renovation quarterly update discussion" },
      { time:"1:05:55", item:"Remote meeting attendance policy discussion" },
      { time:"1:25:50", item:"President's appointments to committees and commissions" },
    ],
    discussions: [
      { item:"Public Comments", body:"Joe Jordan (4102 Camp Phillips Road) gave extended remarks welcoming new trustees and praising village staff, noting the village 'is not broke' and 'management isn't broken.' He reflected on his service, the fire department staffing needs, and defended the decision not to hold a referendum on the village hall building. Jim Pinsel criticized President Maloney's appointment of Louise Lopez as vice president despite Lopez not receiving any votes in the election, and objected to former trustees being reappointed to committees, calling it 'lack of transparency and disregard for the will of the people.'" },
      { item:"Approval of March Meeting Minutes", body:"The board identified corrections needed to the March 16, 2026 minutes, including that the meeting actually occurred on March 23rd due to a snowstorm postponement, and that Trustee Cronin was marked excused but listed as calling the meeting to order. Motion by Lopez Saro, second by Clark to approve with corrections. Passed unanimously." },
      { item:"Consent Agenda and Liquor License Renewals", body:"Item 41 was pulled from consent agenda. Trustee Barb Oling made motion to approve liquor license renewals with a correction to Fairfield Inn and Suites' premise description to include only 'lobby, locked fridges, and locked storage room along with the south end hallway' rather than the entire hotel. Second by Olsen. Passed unanimously." },
      { item:"Ordinance 26-008 Solid Waste Amendment", body:"Motion to approve by unidentified trustee, second by Zagami. Passed unanimously with no discussion." },
      { item:"Preliminary Assessment Resolutions for Street Reconstructions", body:"Three resolutions passed for Gelick\/Alderson, Bladel Avenue, and Concord Avenue\/Bay's Street reconstructions. Director Michael explained assessments only cover driveway approaches (approximately $1,000-$1,500 per property) payable over 10 years. All three resolutions passed unanimously." },
      { item:"Kennedy Park Renovation Quarterly Update", body:"Extensive discussion occurred with trustees seeking clarity on funding sources. The Friends of Kennedy Park foundation account has $84,000, not including glow tournament proceeds. Trustee Beck and Trustee Zagami pressed for more transparency on fundraising efforts and grant applications. Director Stankevich explained the $851,000 in capital funds included unspent park project allocations over 20 years and budget surplus funds. Trustees expressed concern about public confusion regarding funding, with Zagami noting Kennedy Park was 'one of the biggest hot button issues' during the election. Staff agreed to provide more detailed information at the next meeting." },
      { item:"Remote Meeting Attendance Policy", body:"Trustee Lopez Saro moved to restrict virtual attendance to medical reasons only, requiring notification to clerk\/administrator\/chair, with camera requirements and prohibition on closed session remote attendance. Second by Zagami. Failed 3-4 (Lopez Saro, Zagami, Olsen in favor; Hushen, Beck, Maloney, Clark opposed). A second motion by Zagami with similar restrictions also failed. President Maloney then moved to allow remote attendance on camera with proper notification, prohibiting closed session remote attendance. Second by Olsen. Passed 6-1 with one opposed (Lopez Saro)." },
      { item:"President's Appointments to Committees", body:"President Maloney presented committee appointments, noting Mark Kern remains on Community Development Authority, Joe Jordan was placed on Planning Commission and Public Works, and Steve Cronin was returned to Planning Commission replacing Travis Hoffman. New trustees were assigned: Katrina Clark to Mountain Bay Metro, Lisa Beck to SAFER, Barb Oling and Hushen Zagami to Everest Metro Joint Finance. Discussion was ongoing at transcript end." },
    ],
    publicComment: "Two speakers offered public comment. Joe Jordan (4102 Camp Phillips Road) spoke at length welcoming new trustees, praising staff, and defending village decisions including the building construction and fire department funding approaches. Jim Pinsel criticized President Maloney's appointment of Louise Lopez as vice president and the reappointment of former trustees to committees, calling it favoritism and stating 'the residents overwhelmingly rejected the current policies and directions of the former board members.'",
    actionItems: [
      "Approved March 23, 2026 meeting minutes with date and attendance corrections",
      "Approved liquor license renewals for 2026-2027 with corrected premise description for Fairfield Inn and Suites",
      "Approved Ordinance 26-008 amending Chapter 66 solid waste",
      "Approved Resolution 26-010 preliminary assessment for Gelick and Alderson reconstruction",
      "Approved Resolution 26-011 preliminary assessment for Bladel Avenue reconstruction",
      "Approved Resolution 26-012 preliminary assessment for Concord Avenue and Bay's Street reconstruction",
      "Approved remote meeting attendance policy allowing virtual attendance on camera with notification to clerk, administrator, and chair; closed sessions require in-person attendance",
      "Staff to provide detailed Kennedy Park funding timeline and Friends of Kennedy Park grant application history at next meeting",
      "Clerk to research whether open records requestors should be listed by name in reports",
      "Chief Hunt to forward SWAT analysis for new building to full board",
    ],
  },
  {
    id: "0pfKykvicdA", source: "marathon",
    title: "Marathon County HR, Finance, and Property Committee Meeting - 3\/24\/2026 - 3\/24\/2026 - 3\/24\/2026 - 3\/24\/2026",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "Marathon County HR, Finance, and Property Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=0pfKykvicdA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County HR, Finance, and Property Committee approved several routine items including a claim disallowance related to a child's death in foster care, revised property sale prices for two parcels, carryforward funds resolution, and a capital assets threshold policy amendment. The committee also received presentations from new healthcare consultants National Insurance Services and comprehensive fiscal updates from the Finance Director.",
    agenda: [
      { time:"0:00", item:"Claim disallowance - Mercedes Holmes" },
      { time:"2:15", item:"Consideration to set revised property values for public auction" },
      { time:"5:00", item:"Resolution to approve carry forward funds" },
      { time:"10:02", item:"Resolution to amend capital assets threshold policy" },
      { time:"12:30", item:"Introduction of healthcare consultants - National Insurance Services" },
      { time:"37:00", item:"Audited 2025 year end fiscal update" },
      { time:"55:03", item:"2026 year to date fiscal update" },
      { time:"58:30", item:"Finance department quarterly update" },
      { time:"1:10:02", item:"County Treasurer update" },
      { time:"1:37:00", item:"Announcements and adjournment" },
    ],
    discussions: [
      { item:"Claim disallowance - Mercedes Holmes", body:"Corporation Counsel presented a claim received December 5th from Mercedes Holmes relating to the death of her 3-year-old child Zalen Bernett, who was placed in a treatment foster care home licensed through another agency in Dunn County. Law enforcement and social service investigations found no wrongdoing and the death was determined natural causes. Outside counsel and the insurance carrier recommended formal disallowance. Chair Gibbs moved to disallow the claim, seconded by Supervisor Lur. Motion carried." },
      { item:"Revised property values for public auction", body:"Staff reported two parcels on Wisconsin Surplus failed to sell twice, with bids not reaching appraised value. The parcel on Mullen Street was recommended for $9,000 minimum and South Third Avenue for $7,500. Chair Gibbs moved to approve the revised prices, seconded by Supervisor Lur. Motion carried unanimously. Committee Chair Robinson asked about bidders marked as non-pay and was informed they are banned from future auctions, though staff said this occurrence was rare." },
      { item:"Resolution to approve carry forward funds (R20-2026)", body:"Finance Director Sam presented carryforward funds including program revenues for multi-year projects and veterans relief fund replenishment. Vice Chair Marshall questioned the redacted records fund for Register of Deeds; Sam explained it's restricted by statute for redaction efforts. The committee requested future information on potential repurposing of legacy funds. Chair Gibbs moved to approve, seconded by Supervisor Hart. Motion carried." },
      { item:"Capital assets threshold policy amendment", body:"Finance Director Sam explained the policy change would increase the capitalization threshold from $5,000 to $10,000, following GFOA guidance from 2006. This determines whether items are expensed or depreciated as capital assets. Supervisor Hart moved to approve and forward to full county board, seconded by Chair Gibbs. Motion carried unanimously." },
      { item:"Introduction of healthcare consultants - National Insurance Services", body:"HR Director Candace introduced NIS representatives following the RFP award. Consultant with 28 years experience and account manager Jordan Stanley presented their team and approach. They're evaluating the near-site ATA clinic, exploring fully insured vs self-insured options, and pharmacy benefit management. Vice Chair Marshall asked about comparative employer costs and ER utilization strategies. Chair Gibbs questioned the evaluation process for insurance models. The consultants emphasized they're data-driven with no predetermined outcomes and will provide regular updates to the committee." },
      { item:"2025 year end fiscal update", body:"Finance Director Sam provided detailed department-by-department review of unaudited year-end figures. Notable items included: TID closure check of $257,238 from City of Wausau, unclaimed property from state of $222,752, opioid fund with $2.2 million cash and $3.5 million in future settlements expected, and interest of $800,000 earned on ARPA fund investments. Chair Gibbs asked about tax deed property accounting. Sam indicated fund balance surplus figures would be available next meeting after capital asset reconciliation." },
      { item:"Finance department quarterly update", body:"Sam reported the department is fully staffed since mid-December with a new payroll analyst. They've implemented quarterly closeouts, countywide finance training, and random cash audits. Administrator Lance praised Sam and her team for handling W-2 complexities including the 'big beautiful bill' no-tax-on-overtime calculations. Chair Gibbs and Vice Chair Marshall thanked Sam for improved reporting and transparency. The first quarter will close May 31st with monthly closeouts thereafter." },
      { item:"County Treasurer update", body:"Treasurer Connie reported 1,582 delinquent tax notices sent in March (down from 1,786 last year). She detailed issues with municipal treasurers' receiving errors affecting lottery credits and tax payments. Supervisor Lur asked about poverty trends and resources for struggling taxpayers. Administrator Lance explained that payment agreements were discontinued because they increased interest burden and were frequently defaulted. The eviction process through the county's tax delinquent parcel program was described as collaborative rather than adversarial, with courts inquiring about repurchase options and relocation timeframes." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Claim of Mercedes Holmes formally disallowed",
      "Revised minimum sale prices set for 529 Mullen Street ($9,000) and 738 South 3rd Avenue ($7,500) for Wisconsin Surplus auction",
      "Resolution R20-2026 approved for carryforward funds to 2026 budget",
      "Capital assets threshold policy amendment approved and forwarded to full county board",
      "Register of Deeds to provide future briefing on redacted records fund usage and potential repurposing",
      "NIS healthcare consultants to provide update before summer budget assumptions development",
      "Finance to bring fund balance surplus figures to next meeting after capital asset reconciliation",
      "Recommendation forthcoming to increase Social Services reserve account above current $400,000",
      "Next meeting scheduled for April 8th",
    ],
  },
  {
    id: "I31JGv7tRq4", source: "wausau",
    title: "Wausau Water Works Commission Meeting",
    date: "May 5, 2026", shortDate: "MAY 5",
    committee: "Water Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=I31JGv7tRq4",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2191/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Water Works Commission approved the 2027-2031 Capital Improvement Projects Budget for Drinking Water and Wastewater Utility, along with two sole source agreements for cross connection control services and polymer chemicals. The commission also received updates on lead service line replacements and wastewater projects.",
    agenda: [
      { time:"N\/A", item:"Consideration of the minutes of the preceding meeting(s) - April 8, 2026 Regular Wausau Water Works Commission Minutes" },
      { time:"N\/A", item:"Director's Reports - Update on Lead Service Line Replacements" },
      { time:"N\/A", item:"Director's Reports - Wastewater Project Updates: Headworks Screening Project, Cherry Street Lift Station and Lift Station Assessment w\/ Clark Dietz" },
      { time:"N\/A", item:"Approving the 2027 through 2031 Capital Improvement Projects (CIP) Budget for the Drinking Water and Wastewater Utility" },
      { time:"N\/A", item:"Approving the Sole Source Renewal Agreement for HydroCorp Non-Residential Cross Connection Control (CCC) Program" },
      { time:"N\/A", item:"Approving the Sole Source Request for MCEP9 and K144L-NA Polymers used to thicken solids in the Belt Filter Presses and Gravity Belt Thickeners" },
      { time:"N\/A", item:"Discussion regarding the Wastewater - Final WPDES Permit Issued with a permit term of five years" },
    ],
    discussions: [
      { item:"April 8, 2026 Regular Meeting Minutes", body:"The commission approved the minutes from the April 8, 2026 regular meeting. The motion passed." },
      { item:"Update on Lead Service Line Replacements", body:"The director provided an update on lead service line replacements. This was an informational report with no action required." },
      { item:"Wastewater Project Updates", body:"The director reported on wastewater projects including the Headworks Screening Project, Cherry Street Lift Station, and Lift Station Assessment with Clark Dietz. This was an informational report with no action required." },
      { item:"2027-2031 Capital Improvement Projects Budget", body:"The commission approved the 2027 through 2031 Capital Improvement Projects Budget for the Drinking Water and Wastewater Utility. The motion passed." },
      { item:"Sole Source Renewal Agreement for HydroCorp Cross Connection Control Program", body:"The commission approved the sole source renewal agreement for HydroCorp Non-Residential Cross Connection Control Program. The motion passed." },
      { item:"Sole Source Request for MCEP9 and K144L-NA Polymers", body:"The commission approved the sole source request for MCEP9 and K144L-NA polymers used to thicken solids in the Belt Filter Presses and Gravity Belt Thickeners. The motion passed." },
      { item:"Wastewater Final WPDES Permit", body:"The commission discussed the final WPDES permit issued with a five-year term. This was a discussion item with no formal action taken." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Implement 2027-2031 Capital Improvement Projects Budget for Drinking Water and Wastewater Utility",
      "Execute sole source renewal agreement with HydroCorp for Non-Residential Cross Connection Control Program",
      "Proceed with sole source procurement of MCEP9 and K144L-NA polymers for wastewater treatment",
      "Next meeting scheduled for June 2, 2026 at 11:00 AM",
    ],
    civicItems: [
      { number:"1", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"Regular Wausau Water Works Commission Minutes", votes:[{ motion:"Motion to Approve Minutes of April 8, 2026.", passed:true, initiator:"Deb Hadley", seconder:"Peter Gelhar", yes:["Doug Diny", "Deb Hadley", "Peter Gelhar", "Michael  Martens"], no:[], abstain:[] }], docs:[{ name:"WausauWaterWorks_Regular_04082026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6815)" }], children:[] },
    ] },
      { number:"2", name:"Director's Reports.", votes:[], docs:[], children:[
      { number:"a", name:"Update on Lead Service Line Replacements.", votes:[], docs:[{ name:"Memo - WDNR LSL Update_2024-2026_May2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6940)" }], children:[] },
      { number:"b", name:"Wastewater Project Updates- Headworks Screening Project, Cherry Street Lift Station and Lift Station Assessment w\/ Clark Dietz.", votes:[], docs:[], children:[] },
    ] },
      { number:"3", name:"Discussion and Possible Action.", votes:[], docs:[], children:[
      { number:"a", name:"Approving the 2027 through 2031 Capital Improvement Projects (CIP) Budget for the Drinking Water and Wastewater Utility.", votes:[{ motion:"Approve the 2027- 2031 Capital Improvement Projects (CIP) Budget for the Drinking Water and Wastewater Utility.", passed:true, initiator:"Peter Gelhar", seconder:"Deb Hadley", yes:["Doug Diny", "Deb Hadley", "Peter Gelhar", "Michael  Martens"], no:[], abstain:[] }], docs:[{ name:"Memo - 2027-2031 Water Capital Budget_May2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6939)" }, { name:"Memo - 2027-2031 WW Capital Budget_May2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6942)" }], children:[] },
      { number:"b", name:"Approving the Sole Source Renewal Agreement for HydroCorp Non-Residential Cross Connection Control (CCC) Program.", votes:[{ motion:"Approve the Sole Source Renewal Agreement for HydroCrop Non-Residential Cross Connection Control (CCC) Program.", passed:true, initiator:"Deb Hadley", seconder:"Peter Gelhar", yes:["Doug Diny", "Deb Hadley", "Peter Gelhar", "Michael  Martens"], no:[], abstain:[] }], docs:[{ name:"HydroCorp Non-Residential CCC Program Renewal Agreement_2026-04-27 Redline", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6919)" }], children:[] },
      { number:"c", name:"Approving the Sole Source Request for MCEP9 and K144L-NA Polymers used to thicken solids in the Belt Filter Presses and Gravity Belt Thickeners.", votes:[{ motion:"Approve the Sole Source Request for MCEP9 and K144L-NA Polymers to thicken solids in Belt Filter Presses and Gravity Belt Thickners.", passed:true, initiator:"Peter Gelhar", seconder:"Michael  Martens", yes:["Doug Diny", "Deb Hadley", "Peter Gelhar", "Michael  Martens"], no:[], abstain:[] }], docs:[{ name:"Quote - Wausau Water Works - polymer 04-15-26", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6817)" }, { name:"2026-BFP&GBT-Polymer_Sole Source Purchasing Form", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6816)" }], children:[] },
    ] },
      { number:"4", name:"Discussion.", votes:[], docs:[], children:[
      { number:"a", name:"Regarding the Wastewater - Final WPDES Permit Issued with a permit term of five years.", votes:[], docs:[{ name:"WPDES Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6934)" }, { name:"Signed Wausau Permit", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6935)" }, { name:"Final Wausau FS", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6936)" }, { name:"Signed Wausau CL", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6937)" }, { name:"Wausau NFD", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6938)" }], children:[] },
    ] },
      { number:"5", name:"Adjournment.", votes:[], docs:[], children:[] },
    ],
  },
  {
    id: "6QSQOUqDnhM", source: "wausau",
    title: "Wausau Economic Development Committee Meeting",
    date: "May 5, 2026", shortDate: "MAY 5",
    committee: "Economic Development Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=6QSQOUqDnhM",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/1991/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Economic Development Committee held its organizational meeting for the 2026-2028 term, with elections for chairperson and vice chairperson and establishment of a regular meeting schedule. The committee also considered deed restriction changes for 725 S. 84th Avenue and received an overview of the Community Development Department.",
    agenda: [
      { time:"N\/A", item:"Elect Chairperson and Vice Chairperson for the 2026-2028 term" },
      { time:"N\/A", item:"Establish regular meeting date and time for the 2026-2028 term" },
      { time:"N\/A", item:"Public comment on agenda items" },
      { time:"N\/A", item:"Consideration of April 6, 2026 Regular Economic Development Committee Minutes" },
      { time:"N\/A", item:"Approving Consent to Transfer, Waiver of Right of First Refusal, Termination of Deed Restrictions and Approval of New Deed Restrictions for 725 S. 84th Avenue" },
      { time:"N\/A", item:"Overview of Community Development Department" },
    ],
    discussions: [
      { item:"Elect Chairperson and Vice Chairperson for the 2026-2028 term", body:"The committee held elections for leadership positions for the new 2026-2028 term. Specific vote counts and election results are not recorded in the official vote records." },
      { item:"Establish regular meeting date and time for the 2026-2028 term", body:"The committee established its regular meeting schedule for the 2026-2028 term. The specific date and time selected and any vote count are not recorded in the official vote records." },
      { item:"Consideration of April 6, 2026 Minutes", body:"The committee considered the minutes from the April 6, 2026 Regular Economic Development Committee meeting. The outcome of any approval vote is not recorded in the official vote records." },
      { item:"Approving Consent to Transfer, Waiver of Right of First Refusal, Termination of Deed Restrictions and Approval of New Deed Restrictions for 725 S. 84th Avenue", body:"The committee considered approving consent to transfer, waiver of right of first refusal, termination of existing deed restrictions, and approval of new deed restrictions for the property at 725 S. 84th Avenue. The vote outcome is not recorded in the official vote records." },
      { item:"Overview of Community Development Department", body:"The committee received a discussion item providing an overview of the Community Development Department. This was an informational item with no action required." },
    ],
    publicComment: "Public comment was on the agenda, with reading of the City of Wausau Public Comment Statement.",
    actionItems: [
      "Leadership elections for 2026-2028 term were conducted",
      "Regular meeting schedule for 2026-2028 term was established",
      "Deed restriction changes for 725 S. 84th Avenue were considered",
    ],
    civicItems: [
      { number:"1", name:"Call to Order by the Clerk.", votes:[], docs:[], children:[] },
      { number:"2", name:"Elect Chairperson and Vice Chairperson for the 2026-2028 term of the Economic Development Committee.", votes:[], docs:[], children:[] },
      { number:"3", name:"Establish regular meeting date and time for the 2026-2028 term of the Economic Development Committee.", votes:[], docs:[], children:[] },
      { number:"4", name:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"5", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"Regular Economic Development Committee Minutes", votes:[], docs:[{ name:"Economic Development_Regular_Minutes_04062026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6943)" }], children:[] },
    ] },
      { number:"6", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Approving Consent to Transfer, Waiver of Right of First Refusal, Termination of Deed Restrictions and Approval of New Deed Restrictions for 725 S. 84th Avenue", votes:[], docs:[{ name:"termination and deed restrictions 725 s 84th ave bennett to diverse", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6944)" }, { name:"725 s 84th ave request of city", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6896)" }, { name:"725 s 84th ave offer to purchase", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6897)" }, { name:"725 S 84th Ave deed", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6898)" }], children:[] },
    ] },
      { number:"7", name:"Discussion.", votes:[], docs:[], children:[
      { number:"a", name:"Overview of Community Development Department", votes:[], docs:[{ name:"2026 CDD Overview and Welcome", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6956)" }], children:[] },
    ] },
      { number:"8", name:"Adjournment.", votes:[], docs:[], children:[] },
    ],
  },
  {
    id: "OLzrpSp3Dfg", source: "marathon",
    title: "Marathon County Environmental Resources Committee Meeting",
    date: "May 5, 2026", shortDate: "MAY 5",
    committee: "Environmental Resources", duration: "~1h",
    url: "https://www.youtube.com/watch?v=OLzrpSp3Dfg",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18384/639131339701200000",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, the Marathon County Environmental Resources Committee was scheduled to meet on 5\/5\/26. The specific agenda items were not provided in the source document, only a link to the full meeting packet was available.",
    agenda: [
      { time:"N\/A", item:"Agenda details not provided in source document - see linked meeting packet" },
    ],
    discussions: [
      { item:"Meeting Packet", body:"The full agenda and supporting documents were scheduled to be available via the Marathon County website. Specific discussion items were not detailed in the provided source material." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Specific action items not available - see linked meeting packet for details",
    ],
  },
  {
    id: "ZzEeG1Z64pg", source: "marathon",
    title: "Marathon County Health & Human Services Committee Meeting",
    date: "May 6, 2026", shortDate: "MAY 6",
    committee: "Health & Human Services", duration: "~1h",
    url: "https://www.youtube.com/watch?v=ZzEeG1Z64pg",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18402/639132213564100000",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, the Marathon County Health & Human Services Committee was scheduled to meet on 5\/6\/26. The specific agenda items were not provided in the source document, which only contained a link to the full meeting agenda and packet.",
    agenda: [
      { time:"N\/A", item:"Agenda details not available - only packet link provided" },
    ],
    discussions: [
      { item:"Agenda Not Provided", body:"The full agenda text was not included in the source material. Only a link to the Marathon County meeting agenda and packet was provided, preventing detailed analysis of scheduled discussion items." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Unable to determine expected action items - full agenda text not provided in source material",
    ],
  },
  {
    id: "IQOsRT5TTEc", source: "weston",
    title: "Finance and HR Committee",
    date: "April 21, 2026", shortDate: "APR 21",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=IQOsRT5TTEc",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04212026-1908",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, the Village of Weston Board of Trustees was scheduled to meet on April 21, 2026 to address multiple infrastructure projects including street reconstruction assessments, bid results for road maintenance and utility work, and various license renewals. The meeting also included consideration of park impact fee increases and legal matters requiring closed session discussion.",
    agenda: [
      { time:"N\/A", item:"Approval of March 16, 2026, Board of Trustees Meeting" },
      { time:"N\/A", item:"Acknowledge Reports\/Minutes from Boards, Committees, Commissions" },
      { time:"N\/A", item:"Acknowledge Reports from Departments" },
      { time:"N\/A", item:"Acknowledge March Building Permits" },
      { time:"N\/A", item:"Acknowledge March Budget Status" },
      { time:"N\/A", item:"Acknowledge DRAFT 2025 Financial Statements" },
      { time:"N\/A", item:"Approve Vouchers" },
      { time:"N\/A", item:"Renewal of Various Licenses for 2026-2027 Licensing Term" },
      { time:"N\/A", item:"Liquor License Agent Change for Reliance Fuel LLC" },
      { time:"N\/A", item:"Acknowledge 2025 MS4 Report Submittal" },
      { time:"N\/A", item:"Ordinance 26-008 Amending Chapter 66 Solid Waste" },
      { time:"N\/A", item:"Resolution 26-010 Preliminary Assessment Resolution for Jelinek and Alderson Reconstruction" },
      { time:"N\/A", item:"Resolution 26-011 Preliminary Assessment Resolution for Bloedel Ave Reconstruction" },
      { time:"N\/A", item:"Resolution 26-012 Preliminary Assessment Resolution for Concord Ave and Bayberry St Reconstruction" },
      { time:"N\/A", item:"Quarterly Update on Kennedy Park Renovation and Capital Campaign" },
      { time:"N\/A", item:"Review of Elected and Appointed Officials' Handbook Remote Meeting Attendance Policy" },
      { time:"N\/A", item:"President's Appointments to Committees and\/or Commissions" },
      { time:"N\/A", item:"Approval of Proclamation 2026-001 Arbor Day Observance" },
      { time:"N\/A", item:"Graphic Master Plan for Machmueller Park" },
      { time:"N\/A", item:"Termination of Development Agreement – ABC Weston, LLC" },
      { time:"N\/A", item:"Consideration of Increasing Park and Recreation Impact Fees" },
      { time:"N\/A", item:"2026 Street Maintenance Bid Results" },
      { time:"N\/A", item:"Replacement Plow Trucks #9 and #10" },
      { time:"N\/A", item:"Well #1 Rehabilitation" },
      { time:"N\/A", item:"Sanitary Sewer Inflow and Infiltration Study" },
      { time:"N\/A", item:"Bloedel Ave Reconstruction Bid Results" },
      { time:"N\/A", item:"Alderson St and Jelinek Ave Intersection Project Bid Results" },
      { time:"N\/A", item:"Closed Session - Legal Strategy regarding Ascent Funeral Home Tax Claim" },
      { time:"N\/A", item:"Closed Session - Appraisals and Right-of-Way Purchases for Alderson St and Jelinek Ave Project" },
    ],
    discussions: [
      { item:"Preliminary Assessment Resolutions for Street Reconstruction", body:"The Board was scheduled to consider three preliminary assessment resolutions for infrastructure projects: Jelinek and Alderson Reconstruction, Bloedel Ave Reconstruction, and Concord Ave and Bayberry St Reconstruction. These resolutions were expected to initiate the formal assessment process for property owners affected by these road improvement projects." },
      { item:"Kennedy Park Renovation and Capital Campaign Update", body:"The Board was set to receive a quarterly update on the Kennedy Park renovation project and associated capital campaign. This was listed as a discussion-only item with no action expected." },
      { item:"Park and Recreation Impact Fees Increase", body:"The Board was expected to consider increasing park and recreation impact fees as recommended by both the Plan Commission and Parks & Recreation Committee. This item could affect future development costs in the Village." },
      { item:"2026 Street Maintenance Bid Results", body:"The Board was scheduled to review and potentially act on bid results for multiple street maintenance activities including crack sealing, gilsonite sealing, chip sealing, asphalt overlays, and concrete repairs. These represent the Village's annual road maintenance program." },
      { item:"Replacement Plow Trucks #9 and #10", body:"The Board was set to discuss and potentially authorize the purchase of two replacement plow trucks for the Village's fleet. This represents a capital equipment decision for public works operations." },
      { item:"Well #1 Rehabilitation", body:"The Board was expected to consider action on rehabilitation work for Well #1, which is part of the Village's water supply infrastructure. This item involves maintenance of critical utility infrastructure." },
      { item:"Sanitary Sewer Inflow and Infiltration Study", body:"The Board was scheduled to discuss and potentially authorize a study examining inflow and infiltration issues in the sanitary sewer system. Such studies typically identify where groundwater or stormwater is entering sewer lines." },
      { item:"Termination of Development Agreement – ABC Weston, LLC", body:"The Board was expected to consider Resolution 2026-013 authorizing termination of a development agreement for a second building with ABC Weston, LLC at 3200 Schofield Avenue. This action would end the Village's development arrangement with this property." },
      { item:"Graphic Master Plan for Machmueller Park", body:"The Board was scheduled to discuss and potentially act on a graphic master plan for Machmueller Park. This planning document would guide future development and improvements at the park." },
      { item:"License Renewals for 2026-2027 Term", body:"The Board was set to consider multiple license renewals including weights and measures, commercial animal establishments, cigarette and tobacco sales, lodging, salvage, kennel, and various alcohol licenses. These are annual administrative renewals required for businesses operating in the Village." },
      { item:"Closed Session - Ascent Funeral Home Tax Claim", body:"The Board was scheduled to enter closed session to confer with legal counsel regarding litigation strategy related to a Notice of Claim for Rescission and Recovery of Unlawful Taxes filed by Ascent Funeral Home and Spiritual Center, Inc." },
      { item:"Closed Session - Right-of-Way Purchases", body:"The Board was expected to discuss appraisals and right-of-way purchases for the Alderson St and Jelinek Ave Intersection Project in closed session due to competitive or bargaining reasons." },
    ],
    publicComment: "Public comment period was included on the agenda, allowing up to three minutes per person for non-agenda items, with options to submit comments in advance or participate live via Zoom.",
    actionItems: [
      "Scheduled to vote on approval of March 16, 2026 meeting minutes",
      "Scheduled to vote on vouchers check numbers 66430-66511, 66517-66577, and 90244-90247",
      "Expected to consider multiple license renewals for 2026-2027 term",
      "Scheduled to vote on Ordinance 26-008 amending solid waste regulations",
      "Expected to consider Resolution 26-010 for Jelinek and Alderson Reconstruction preliminary assessment",
      "Expected to consider Resolution 26-011 for Bloedel Ave Reconstruction preliminary assessment",
      "Expected to consider Resolution 26-012 for Concord Ave and Bayberry St Reconstruction preliminary assessment",
      "Scheduled to consider Resolution 2026-013 terminating ABC Weston LLC development agreement",
      "Expected to consider increasing park and recreation impact fees",
      "Scheduled to act on 2026 street maintenance bid results",
      "Expected to consider replacement plow truck purchases",
      "Scheduled to consider Well #1 rehabilitation",
      "Expected to consider sanitary sewer inflow and infiltration study",
      "Scheduled to act on Bloedel Ave Reconstruction bid results",
      "Expected to act on Alderson St and Jelinek Ave Intersection Project bid results",
      "Possible action on closed session items following reconvening to open session",
    ],
  },
  {
    id: "hAwi9yZ3doA", source: "weston",
    title: "Parks Committee",
    date: "April 27, 2026", shortDate: "APR 27",
    committee: "Parks and Recreation Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=hAwi9yZ3doA",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04272026-1910",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, the Parks and Recreation Committee was scheduled to receive updates on Kennedy Park, playground improvements, and the Aquatic Center, while also considering action on ice rink operations and user agreements. The meeting was set to address ongoing park development projects significant to Weston residents' recreational facilities.",
    agenda: [
      { time:"4:00 p.m.", item:"Approval of minutes from the previous meeting: March 23, 2026" },
      { time:"N\/A", item:"Public Comments" },
      { time:"N\/A", item:"Written Comments" },
      { time:"N\/A", item:"Kennedy Update" },
      { time:"N\/A", item:"Playground Update" },
      { time:"N\/A", item:"Aquatic Center Update" },
      { time:"N\/A", item:"Discussion and\/or possible action on the components of operations for the ice rink at Kennedy Park" },
      { time:"N\/A", item:"Discussion and\/or possible action on the User Agreements" },
      { time:"N\/A", item:"Possible next meeting date" },
      { time:"N\/A", item:"Topics for future meetings" },
    ],
    discussions: [
      { item:"Kennedy Update", body:"The committee was scheduled to receive an educational presentation and report on Kennedy Park. This was expected to provide updates on the ongoing Kennedy Park renovation project." },
      { item:"Playground Update", body:"Staff was set to present an update on playground improvements across Village parks. This report was expected to address the status of playground equipment and any recent developments." },
      { item:"Aquatic Center Update", body:"The committee was scheduled to receive information on the Aquatic Center. This presentation was expected to cover operational updates or planning for the facility." },
      { item:"Ice Rink Operations at Kennedy Park", body:"The committee was scheduled to discuss and potentially take action on operational components for the ice rink at Kennedy Park. This item follows previous committee discussions about ice rink attendance and operation costs." },
      { item:"User Agreements", body:"The committee was set to review and potentially take action on user agreements. These agreements likely govern use of park facilities by outside organizations or groups." },
    ],
    publicComment: "Public Comments and Written Comments were both included as agenda items, indicating opportunities for public input were scheduled.",
    actionItems: [
      "Scheduled to consider approval of March 23, 2026 meeting minutes",
      "Scheduled to potentially take action on ice rink operations at Kennedy Park",
      "Scheduled to potentially take action on User Agreements",
    ],
  },
  {
    id: "wDB0GrN754U", source: "wausau",
    title: "Wausau Board of Public Works Meeting Pt.1",
    date: "April 21, 2026", shortDate: "APR 21",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=wDB0GrN754U",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2298/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Board of Public Works approved all items on the agenda, including recommendations for real estate services qualifications for two state highway projects, a pay estimate for lead service line replacement, and contractor licenses. The board also approved a $2,338.87 subrogated insurance claim for American Family Insurance on behalf of Kara Blank following closed session deliberation.",
    agenda: [
      { time:"N\/A", item:"April 14, 2026 Regular Board of Public Works Minutes" },
      { time:"N\/A", item:"Make recommendation for Statement of Qualifications for Real Estate Services, STH 52 (East Wausau Avenue) Project ID 6999-00-23" },
      { time:"N\/A", item:"Make recommendation for Statement of Qualifications for Real Estate Services, Bus. 51 (Grand Avenue) Project ID 6999-02-20" },
      { time:"N\/A", item:"Pay Estimate #26 with Community Infrastructure Partners for replacement of lead service lines" },
      { time:"N\/A", item:"Portland Cement Concrete License: Potrykus Construction, LLC and Miron Construction Co., Inc." },
      { time:"N\/A", item:"Bituminous Concrete Paving License: Miron Construction Co., Inc." },
      { time:"N\/A", item:"Closed Session pursuant to Wisconsin State Statute §19.85(1)(g) for deliberating on claims" },
      { time:"N\/A", item:"Reconvene into Open Session to take action on Closed Session items" },
    ],
    discussions: [
      { item:"April 14, 2026 Regular Board of Public Works Minutes", body:"Approved. The board passed the minutes from the previous meeting." },
      { item:"Statement of Qualifications for Real Estate Services, STH 52 (East Wausau Avenue) Project ID 6999-00-23", body:"Approved. The board recommended approval of the statement of qualifications for real estate services for this state highway project. Qualifications were opened on April 14, 2026." },
      { item:"Statement of Qualifications for Real Estate Services, Bus. 51 (Grand Avenue) Project ID 6999-02-20", body:"Approved. The board recommended approval of the statement of qualifications for real estate services for the Business 51 Grand Avenue project. Qualifications were opened on April 14, 2026." },
      { item:"Pay Estimate #26 with Community Infrastructure Partners for replacement of lead service lines", body:"Approved. The board approved the pay estimate for ongoing lead service line replacement work with Community Infrastructure Partners." },
      { item:"Portland Cement Concrete License: Potrykus Construction, LLC and Miron Construction Co., Inc.", body:"Approved. The board granted Portland Cement Concrete licenses to both Potrykus Construction, LLC and Miron Construction Co., Inc." },
      { item:"Bituminous Concrete Paving License: Miron Construction Co., Inc.", body:"Approved. The board granted a Bituminous Concrete Paving license to Miron Construction Co., Inc." },
      { item:"Closed Session for deliberating on claims", body:"Approved. The board entered closed session pursuant to Wisconsin State Statute §19.85(1)(g) to deliberate on claims." },
      { item:"Reconvene into Open Session and action on Closed Session items", body:"Approved 3-0. The board reconvened into open session and approved the American Family Insurance subrogated claim on behalf of Kara Blank in the amount of $2,338.87. Motion moved by Vincent Bonino, seconded by MaryAnne Groat. Eric Lindman, MaryAnne Groat, and Vincent Bonino all voted yes." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Recommendation for real estate services qualifications for STH 52 project forwarded for approval",
      "Recommendation for real estate services qualifications for Bus. 51 project forwarded for approval",
      "Pay Estimate #26 for lead service line replacement approved for payment",
      "Portland Cement Concrete licenses issued to Potrykus Construction, LLC and Miron Construction Co., Inc.",
      "Bituminous Concrete Paving license issued to Miron Construction Co., Inc.",
      "American Family Insurance subrogated claim of $2,338.87 on behalf of Kara Blank approved for payment",
    ],
    civicItems: [
      { number:"1", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"April 14, 2026 Regular Board of Public Works Minutes.", votes:[{ motion:"approve", passed:true, initiator:"Vincent Bonino", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"BoardofPublicWorks_Regular_MinutesDRAFT_04142026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6808)" }], children:[] },
    ] },
      { number:"2", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Make recommendation for Statement of Qualifications for Real Estate Services, STH 52 (East Wausau Avenue)  Project ID 6999-00-23. (Qualifications were opened April 14, 2026.)", votes:[{ motion:"approve", passed:true, initiator:"Eric Lindman", seconder:"Vincent Bonino", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
      { number:"b", name:"Make recommendation for Statement of Qualifications for Real Estate Services, Bus. 51 (Grand Avenue) Project ID 6999-02-20. (Qualifications were opened April 14, 2026.)", votes:[{ motion:"approve", passed:true, initiator:"Eric Lindman", seconder:"Vincent Bonino", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
      { number:"c", name:"Pay Estimate #26 with Community Infrastructure Partners for replacement of lead service lines.", votes:[{ motion:"approve", passed:true, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"CIP Year 3 LSL Disbursement Request Form 8700-366-CIP Request 26", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6814)" }], children:[] },
      { number:"d", name:"Portland Cement Concrete License:  Potrykus Construction, LLC and Miron Construction Co., Inc.", votes:[{ motion:"approve", passed:true, initiator:"Vincent Bonino", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"Potrykus PCC", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6810)" }, { name:"Miron PCC", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6811)" }], children:[] },
      { number:"e", name:"Bituminous Concrete Paving License:  Miron Construction Co., Inc.", votes:[{ motion:"approve", passed:true, initiator:"Vincent Bonino", seconder:"Eric Lindman", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"Miron BCP", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6812)" }], children:[] },
    ] },
      { number:"3", name:"Closed Session.", votes:[], docs:[], children:[
      { number:"a", name:"Closed Session&nbsp;pursuant to Wisconsin State Statute §19.85(1)(g) for the purpose of deliberating on claims.", votes:[{ motion:"approve", passed:true, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"Claims 042126", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6809)" }], children:[] },
    ] },
      { number:"4", name:"Reconvene into Open Session, if necessary, to take action on Closed Session items.", votes:[{ motion:"approve the American Family Insurance  subrogated claim on behalf of Kara Blank in the amount of $2,338.87", passed:true, initiator:"Vincent Bonino", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }, { motion:"reconvene into open session", passed:true, initiator:"Vincent Bonino", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
      { number:"5", name:"Adjournment.", votes:[{ motion:"approve", passed:true, initiator:"Eric Lindman", seconder:"Vincent Bonino", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
  {
    id: "x2IB7RgEXB4", source: "wausau",
    title: "Wausau Board of Public Works Meeting Pt.2",
    date: "April 21, 2026", shortDate: "APR 21",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=x2IB7RgEXB4",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2298/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Board of Public Works approved all agenda items unanimously, including recommendations for real estate services on two state highway projects, a pay estimate for lead service line replacement, and multiple construction licenses. The board also approved a $2,338.87 insurance subrogation claim following closed session deliberations.",
    agenda: [
      { time:"N\/A", item:"Consideration of April 14, 2026 Regular Board of Public Works Minutes" },
      { time:"N\/A", item:"Make recommendation for Statement of Qualifications for Real Estate Services, STH 52 (East Wausau Avenue) Project ID 6999-00-23" },
      { time:"N\/A", item:"Make recommendation for Statement of Qualifications for Real Estate Services, Bus. 51 (Grand Avenue) Project ID 6999-02-20" },
      { time:"N\/A", item:"Pay Estimate #26 with Community Infrastructure Partners for replacement of lead service lines" },
      { time:"N\/A", item:"Portland Cement Concrete License: Potrykus Construction, LLC and Miron Construction Co., Inc." },
      { time:"N\/A", item:"Bituminous Concrete Paving License: Miron Construction Co., Inc." },
      { time:"N\/A", item:"Closed Session pursuant to Wisconsin State Statute §19.85(1)(g) for deliberating on claims" },
      { time:"N\/A", item:"Reconvene into Open Session to take action on Closed Session items" },
    ],
    discussions: [
      { item:"April 14, 2026 Regular Board of Public Works Minutes", body:"The board approved the minutes from the April 14, 2026 meeting. The motion passed." },
      { item:"Statement of Qualifications for Real Estate Services, STH 52 (East Wausau Avenue) Project ID 6999-00-23", body:"The board approved the recommendation for real estate services qualifications for the State Highway 52 project. Qualifications had been opened on April 14, 2026. The motion passed." },
      { item:"Statement of Qualifications for Real Estate Services, Bus. 51 (Grand Avenue) Project ID 6999-02-20", body:"The board approved the recommendation for real estate services qualifications for the Business 51 (Grand Avenue) project. Qualifications had been opened on April 14, 2026. The motion passed." },
      { item:"Pay Estimate #26 with Community Infrastructure Partners for replacement of lead service lines", body:"The board approved Pay Estimate #26 for the ongoing lead service line replacement program with Community Infrastructure Partners. The motion passed." },
      { item:"Portland Cement Concrete License: Potrykus Construction, LLC and Miron Construction Co., Inc.", body:"The board approved Portland Cement Concrete licenses for both Potrykus Construction, LLC and Miron Construction Co., Inc. The motion passed." },
      { item:"Bituminous Concrete Paving License: Miron Construction Co., Inc.", body:"The board approved a Bituminous Concrete Paving license for Miron Construction Co., Inc. The motion passed." },
      { item:"American Family Insurance Subrogation Claim", body:"Following closed session deliberations, the board approved the American Family Insurance subrogated claim on behalf of Kara Blank in the amount of $2,338.87. The motion passed 3-0, moved by Vincent Bonino and seconded by MaryAnne Groat. Eric Lindman, MaryAnne Groat, and Vincent Bonino all voted yes." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Proceed with real estate services selection process for STH 52 (East Wausau Avenue) Project ID 6999-00-23",
      "Proceed with real estate services selection process for Bus. 51 (Grand Avenue) Project ID 6999-02-20",
      "Process Pay Estimate #26 payment to Community Infrastructure Partners for lead service line replacement",
      "Issue Portland Cement Concrete licenses to Potrykus Construction, LLC and Miron Construction Co., Inc.",
      "Issue Bituminous Concrete Paving license to Miron Construction Co., Inc.",
      "Process payment of $2,338.87 for American Family Insurance subrogated claim on behalf of Kara Blank",
    ],
    civicItems: [
      { number:"1", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"April 14, 2026 Regular Board of Public Works Minutes.", votes:[{ motion:"approve", passed:true, initiator:"Vincent Bonino", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"BoardofPublicWorks_Regular_MinutesDRAFT_04142026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6808)" }], children:[] },
    ] },
      { number:"2", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Make recommendation for Statement of Qualifications for Real Estate Services, STH 52 (East Wausau Avenue)  Project ID 6999-00-23. (Qualifications were opened April 14, 2026.)", votes:[{ motion:"approve", passed:true, initiator:"Eric Lindman", seconder:"Vincent Bonino", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
      { number:"b", name:"Make recommendation for Statement of Qualifications for Real Estate Services, Bus. 51 (Grand Avenue) Project ID 6999-02-20. (Qualifications were opened April 14, 2026.)", votes:[{ motion:"approve", passed:true, initiator:"Eric Lindman", seconder:"Vincent Bonino", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
      { number:"c", name:"Pay Estimate #26 with Community Infrastructure Partners for replacement of lead service lines.", votes:[{ motion:"approve", passed:true, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"CIP Year 3 LSL Disbursement Request Form 8700-366-CIP Request 26", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6814)" }], children:[] },
      { number:"d", name:"Portland Cement Concrete License:  Potrykus Construction, LLC and Miron Construction Co., Inc.", votes:[{ motion:"approve", passed:true, initiator:"Vincent Bonino", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"Potrykus PCC", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6810)" }, { name:"Miron PCC", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6811)" }], children:[] },
      { number:"e", name:"Bituminous Concrete Paving License:  Miron Construction Co., Inc.", votes:[{ motion:"approve", passed:true, initiator:"Vincent Bonino", seconder:"Eric Lindman", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"Miron BCP", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6812)" }], children:[] },
    ] },
      { number:"3", name:"Closed Session.", votes:[], docs:[], children:[
      { number:"a", name:"Closed Session&nbsp;pursuant to Wisconsin State Statute §19.85(1)(g) for the purpose of deliberating on claims.", votes:[{ motion:"approve", passed:true, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"Claims 042126", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6809)" }], children:[] },
    ] },
      { number:"4", name:"Reconvene into Open Session, if necessary, to take action on Closed Session items.", votes:[{ motion:"approve the American Family Insurance  subrogated claim on behalf of Kara Blank in the amount of $2,338.87", passed:true, initiator:"Vincent Bonino", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }, { motion:"reconvene into open session", passed:true, initiator:"Vincent Bonino", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
      { number:"5", name:"Adjournment.", votes:[{ motion:"approve", passed:true, initiator:"Eric Lindman", seconder:"Vincent Bonino", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
  {
    id: "WhyeLsSdJ7M", source: "wausau",
    title: "Wausau Plan Commission Meeting",
    date: "April 21, 2026", shortDate: "APR 21",
    committee: "Plan Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=WhyeLsSdJ7M",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2106/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Plan Commission approved all action items on the agenda, including a rezoning request for 230 E Thomas Street from Neighborhood Mixed-Use to Two-Flat Residential, a Conditional Use Permit for a personal storage facility at 218 South 4th Street, and the 2027 Comprehensive Plan Public Participation Plan Draft (as amended). The commission also held a preliminary discussion on data center code amendments.",
    agenda: [
      { time:"N\/A", item:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement" },
      { time:"N\/A", item:"Consideration of the minutes of the preceding meeting(s) - March 17, 2026 Regular Plan Commission Minutes" },
      { time:"N\/A", item:"Public Hearing: Discussion on rezoning 230 E Thomas Street from NMU to TF-10 zoning district" },
      { time:"N\/A", item:"Discussion and possible action on rezoning 230 E Thomas Street from NMU to TF-10 zoning district" },
      { time:"N\/A", item:"Discussion and possible action on approving a Conditional Use Permit for 218 South 4th Street for Personal Storage Facility in Light Industrial Zoning District" },
      { time:"N\/A", item:"Discussion and possible action approving the City of Wausau 2027 Comprehensive Plan Public Participation Plan Draft" },
      { time:"N\/A", item:"Preliminary code amendment discussion - data centers" },
    ],
    discussions: [
      { item:"March 17, 2026 Regular Plan Commission Minutes", body:"The minutes from the March 17, 2026 meeting were approved. Specific vote count and mover\/seconder not recorded." },
      { item:"Rezoning 230 E Thomas Street from NMU to TF-10", body:"A public hearing was held on the rezoning request. The commission subsequently approved the rezoning of 230 E Thomas Street from Neighborhood Mixed-Use to Two-Flat Residential zoning district. Specific vote count and mover\/seconder not recorded." },
      { item:"Conditional Use Permit for 218 South 4th Street - Personal Storage Facility", body:"The commission approved the Conditional Use Permit for Dunwoody Storage to construct a Personal Storage Facility at 218 South 4th Street in the Light Industrial Zoning District. Specific vote count and mover\/seconder not recorded." },
      { item:"City of Wausau 2027 Comprehensive Plan Public Participation Plan Draft", body:"The commission approved the 2027 Comprehensive Plan Public Participation Plan Draft as amended. Two votes were recorded indicating initial approval and then approval with amendments. Specific vote counts and mover\/seconder not recorded." },
      { item:"Preliminary code amendment discussion - data centers", body:"The commission held a preliminary discussion regarding potential code amendments related to data centers. This was a discussion item only with no action taken." },
    ],
    publicComment: "Public comment on agenda items was on the agenda as the first item, along with reading of the City of Wausau Public Comment Statement.",
    actionItems: [
      "Rezoning of 230 E Thomas Street from NMU to TF-10 approved - to be forwarded to City Council",
      "Conditional Use Permit for personal storage facility at 218 South 4th Street approved for Dunwoody Storage",
      "2027 Comprehensive Plan Public Participation Plan Draft approved as amended",
      "Data center code amendments to continue in future discussions",
    ],
    civicItems: [
      { number:"1", name:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"2", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"Regular Plan Commission Minutes", votes:[{ motion:"approve", passed:true, initiator:"Lou Larson", seconder:"Bruce Bohlken", yes:["Doug Diny", "Eric Lindman", "Lou Larson", "Sarah Watson", "George Bornemann", "Andrew Brueggeman", "Bruce Bohlken"], no:[], abstain:[] }], docs:[{ name:"Draft_PlanCommission_Regular_Minutes_03172026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6813)" }], children:[] },
    ] },
      { number:"3", name:"Public Hearing.", votes:[], docs:[], children:[
      { number:"a", name:"Discussion on rezoning 230 E Thomas Street from a (NMU) Neighborhood Mixed-Use zoning district to a (TF-10) Two-Flat Residential zoning district. (City of Wausau Development Department)", votes:[], docs:[{ name:"Staff Report 230 E Thomas St Rezone", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6787)" }, { name:"230 E Thomas Narrative", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6790)" }, { name:"230 E Thomas Map", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6789)" }, { name:"230 E Thomas Rezone Application", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6788)" }], children:[] },
    ] },
      { number:"4", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Discussion and possible action on rezoning 230 E Thomas Street from a (NMU) Neighborhood Mixed-Use zoning district to a (TF-10) Two-Flat Residential zoning district. (City of Wausau Development Department)", votes:[{ motion:"approve", passed:true, initiator:"George Bornemann", seconder:"Andrew Brueggeman", yes:["Doug Diny", "Eric Lindman", "Lou Larson", "Sarah Watson", "George Bornemann", "Andrew Brueggeman", "Bruce Bohlken"], no:[], abstain:[] }], docs:[], children:[] },
      { number:"b", name:"Discussion and possible action on approving a Conditional Use Permit for 218 South 4th Street to authorize and allow construction of a Personal Storage Facility use in the Light Industrial (LI) Zoning District. (Dunwoody Storage)", votes:[{ motion:"approve", passed:true, initiator:"Andrew Brueggeman", seconder:"George Bornemann", yes:["Doug Diny", "Lou Larson", "Sarah Watson", "George Bornemann", "Andrew Brueggeman", "Bruce Bohlken"], no:["Eric Lindman"], abstain:[] }], docs:[{ name:"PC_CUP_218_S_4th_St._2nd_Mtg", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6775)" }, { name:"Dunwoody Storage - CUP Application", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6662)" }, { name:"CUP Review Plans-11x17", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6663)" }, { name:"Dunwoody Storage - Site Plan", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6664)" }, { name:"Dunwoody Storage - Elevations", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6665)" }, { name:"Dunwoody Storage_Renderings", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6666)" }, { name:"Landscape Requirements", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6667)" }], children:[] },
      { number:"c", name:"Discussion and possible action approving the City of Wausau 2027 Comprehensive Plan Public Participation Plan (PPP) Draft.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Andrew Brueggeman", yes:["Doug Diny", "Eric Lindman", "Lou Larson", "Sarah Watson", "George Bornemann", "Andrew Brueggeman", "Bruce Bohlken"], no:[], abstain:[] }, { motion:"approve as amended", passed:true, initiator:"Andrew Brueggeman", seconder:"George Bornemann", yes:["Doug Diny", "Eric Lindman", "Lou Larson", "Sarah Watson", "George Bornemann", "Andrew Brueggeman", "Bruce Bohlken"], no:[], abstain:[] }], docs:[{ name:"C. Wausau PPP Final", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6676)" }], children:[] },
    ] },
      { number:"5", name:"Discussion.", votes:[], docs:[], children:[
      { number:"a", name:"​Preliminary code amendment ​discussion - data centers", votes:[], docs:[{ name:"Staff Memo - Code Amendment Data Centers", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6776)" }], children:[] },
    ] },
      { number:"6", name:"Adjournment.", votes:[{ motion:"approve", passed:true, initiator:"Bruce Bohlken", seconder:"George Bornemann", yes:["Doug Diny", "Eric Lindman", "Lou Larson", "Sarah Watson", "George Bornemann", "Andrew Brueggeman", "Bruce Bohlken"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
  {
    id: "Qbd9FzAcuIA", source: "wausau",
    title: "Wausau City Council Meeting",
    date: "April 21, 2026", shortDate: "APR 21",
    committee: "City Council", duration: "~1h",
    url: "https://www.youtube.com/watch?v=Qbd9FzAcuIA",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2314/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Common Council held its organizational meeting for the 2026-2028 term, swearing in elected officials and conducting council elections for leadership positions. The council unanimously approved suspending procedural rules to confirm mayoral appointments to boards and commissions, and a motion to postpone committee appointments to the following week failed.",
    agenda: [
      { time:"N\/A", item:"Council Elect seated by Wausau Police and Fire Department Honor Guard, Posting of Colors, Oath of Office for Elected Officials" },
      { time:"N\/A", item:"Common Council Elections: President, Plan Commission Member, Water Works Commission Member" },
      { time:"N\/A", item:"Resolution Adopting Robert's Rules of Order and Standing Rules for 2026-2028" },
      { time:"N\/A", item:"Suspend Rule 6(B) Filing and 12(A) Referral of resolutions" },
      { time:"N\/A", item:"Confirming Appointments of the Mayor to Boards, Commissions, and Committees" },
      { time:"N\/A", item:"Resolution Designating Official Newspaper" },
      { time:"N\/A", item:"Mayor's Appointments to Standing Committees for 2026-2028 Term" },
      { time:"N\/A", item:"Announcements from Mayor and Alderpersons" },
    ],
    discussions: [
      { item:"Common Council Elections", body:"The council conducted elections for Common Council President, Plan Commission member, and Water Works Commission member. Specific vote outcomes for these elections are not recorded in the official vote records." },
      { item:"Resolution Adopting Robert's Rules of Order and Standing Rules for 2026-2028", body:"This resolution was on the agenda to establish procedural rules for the new council term. The specific vote outcome is not recorded in the official records." },
      { item:"Suspend Rule 6(B) Filing and 12(A) Referral of resolutions", body:"Approved 11-0. Sarah Watson moved and Bruce Trueblood seconded the motion to suspend procedural rules, allowing immediate action on subsequent items without standard filing and referral requirements." },
      { item:"Confirming Appointments of the Mayor to Boards, Commissions, and Committees", body:"Approved by the council. This item confirmed Mayor Doug Diny's appointments to various city boards, commissions, and committees. Specific vote count not recorded." },
      { item:"Resolution Designating Official Newspaper", body:"Approved by the council. The resolution designated the official newspaper for city notices and publications. Specific vote count not recorded." },
      { item:"Mayor's Appointments to Standing Committees for 2026-2028 Term", body:"A motion to suspend rules and postpone committee appointments to the following week failed. The standing committee appointments for the new council term proceeded as scheduled." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Robert's Rules of Order and Standing Rules adopted for 2026-2028 council term",
      "Mayor's appointments to boards, commissions, and committees confirmed",
      "Official newspaper designated for city publications",
      "Standing committee appointments for 2026-2028 term finalized",
    ],
    civicItems: [
      { number:"1", name:"Call to Order by the Presiding Officer.", votes:[], docs:[], children:[
      { number:"", name:"Council Elect are seated by the Wausau Police and Fire Department Honor Guard.", votes:[], docs:[], children:[] },
      { number:"", name:"Posting of the Colors by the Wausau Police and Fire Department Honor Guard.", votes:[], docs:[], children:[] },
      { number:"", name:"Oath of Office for Elected Officials by Acting City Clerk.", votes:[], docs:[], children:[] },
    ] },
      { number:"2", name:"Pledge of Allegiance and Roll Call.", votes:[], docs:[], children:[] },
      { number:"3", name:"Common Council Elections.", votes:[], docs:[], children:[
      { number:"", name:"Wausau Common Council President.", votes:[], docs:[], children:[] },
      { number:"", name:"Common Council Member of the Plan Commission.", votes:[], docs:[], children:[] },
      { number:"", name:"Common Council Member of the Wausau Water Works Commission", votes:[], docs:[], children:[] },
    ] },
      { number:"4", name:"Ordinances and resolutions.", votes:[], docs:[], children:[
      { number:"", name:"Resolution from the Common Council Adopting Robert’s Rules of Order and the Standing Rules of the Common Council for 2026 – 2028.", votes:[], docs:[{ name:"Standing Rules of the Wausau Common Council", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6822)" }], children:[] },
    ] },
      { number:"5", name:"Suspend Rule  6(B) Filing and 12(A) Referral of resolutions.", votes:[{ motion:"Approve", passed:true, initiator:"Sarah Watson", seconder:"Bruce Trueblood", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Andrew Wiskowski", "Kristin Slonski", "Matt Hoenecke", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Bruce Trueblood"], no:[], abstain:[] }], docs:[], children:[
      { number:"", name:"Confirming Appointments of the Mayor of the City of Wausau to Boards, Commissions, and Committees as Indicated.", votes:[{ motion:"Approve", passed:true, initiator:"Terry Kilian", seconder:"Sarah Watson", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Andrew Wiskowski", "Kristin Slonski", "Matt Hoenecke", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Bruce Trueblood"], no:[], abstain:[] }], docs:[], children:[] },
      { number:"", name:"Resolution from the Common Council Designating Official Newspaper.", votes:[{ motion:"Approve", passed:true, initiator:"Sarah Watson", seconder:"Kristin Slonski", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Andrew Wiskowski", "Kristin Slonski", "Matt Hoenecke", "Sarah Watson", "Vicki Tierney", "Lou Larson"], no:["Bruce Trueblood"], abstain:[] }], docs:[], children:[] },
    ] },
      { number:"6", name:"Communications, recommendations from the Mayor.", votes:[], docs:[], children:[
      { number:"", name:"Mayor's Appointments to Standing Committees for the 2026 - 2028 Common Council Term.", votes:[{ motion:"Motion to suspend rules 13 (A) to postpone committee appointments to next week", passed:false, initiator:"Carol Lukens", seconder:"Tom Neal", yes:["Terry Kilian", "Andrew Wiskowski", "Kristin Slonski", "Matt Hoenecke", "Vicki Tierney", "Bruce Trueblood"], no:["Carol Lukens", "Michael  Martens", "Tom Neal", "Sarah Watson", "Lou Larson"], abstain:[] }], docs:[], children:[] },
    ] },
      { number:"7", name:"Announcement from Mayor and Alderpersons.", votes:[], docs:[], children:[] },
      { number:"8", name:"Adjournment.", votes:[{ motion:"adjourn", passed:true, initiator:"Tom Neal", seconder:"Terry Kilian", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Andrew Wiskowski", "Kristin Slonski", "Matt Hoenecke", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Bruce Trueblood"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
  {
    id: "jUU4ub0UhuU", source: "wausau",
    title: "Wausau Police & Fire Commission Meeting",
    date: "April 27, 2026", shortDate: "APR 27",
    committee: "Police & Fire Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=jUU4ub0UhuU",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2146/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Police & Fire Commission held a regular meeting featuring quarterly operational updates from both the Fire and Police departments. The Fire Department presented a report on policy changes regarding controlled substances along with their 1st Quarter Report, while the Police Department provided their 1st Quarter Report on department activities.",
    agenda: [
      { time:"7:30 AM", item:"Consideration of the minutes of the March 23, 2026 Regular Police and Fire Commission Meeting" },
      { time:"N\/A", item:"Open for General Agenda Items" },
      { time:"N\/A", item:"Monthly Fire Department Operations Update including current activities, controlled substances policy changes, and 1st Quarter Report" },
      { time:"N\/A", item:"Monthly Police Department Operations Update including current activities and 1st Quarter Report" },
    ],
    discussions: [
      { item:"March 23, 2026 Regular Police and Fire Commission Minutes", body:"The minutes from the preceding meeting were on the agenda for consideration. No vote record was provided indicating the specific outcome of approval." },
      { item:"Open for General Agenda Items", body:"The agenda included an open discussion period for general agenda items. No specific actions or votes were recorded for this item." },
      { item:"Monthly Fire Department Operations Update", body:"The Fire Department presented their monthly operations update including current activities, a report on policy changes regarding controlled substances, and the 1st Quarter Report. This was a presentation item with no vote required." },
      { item:"Monthly Police Department Operations Update", body:"The Police Department presented their monthly operations update covering current department activities and the 1st Quarter Report. This was a presentation item with no vote required." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Fire Department policy changes regarding controlled substances were reported to the Commission",
      "Next Police & Fire Commission meeting scheduled for May 18, 2026",
    ],
    civicItems: [
      { number:"1", name:"Call to order by the presiding officer.", votes:[], docs:[], children:[
      { number:"I", name:"Roll Call", votes:[], docs:[], children:[] },
    ] },
      { number:"2", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"I", name:"Regular Police and Fire Commission Minutes", votes:[], docs:[], children:[] },
    ] },
      { number:"3", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"I", name:"Open for General Agenda Items", votes:[], docs:[], children:[] },
    ] },
      { number:"4", name:"Presentations.", votes:[], docs:[], children:[
      { number:"I", name:"Monthly Fire Department Operations Update:•    Presentation of current Fire Department activities•    Report on subsequent policy changes regarding controlled substances•    1st Quarter Report", votes:[], docs:[{ name:"Q1 Fire Department Report", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6839)" }], children:[] },
      { number:"II", name:"Monthly Police Department Operations Update:•    Presentation of current Police Department activities•   1st Quarter Report", votes:[], docs:[{ name:"Q1 Police Department Report", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6818)" }], children:[] },
    ] },
      { number:"5", name:"Adjournment.", votes:[], docs:[], children:[
      { number:"I", name:"Next Meeting: May 18, 2026", votes:[], docs:[], children:[] },
    ] },
    ],
  },
  {
    id: "P8bqUIJo6yI", source: "wausau",
    title: "Wausau Room Tax Commission Meeting",
    date: "April 27, 2026", shortDate: "APR 27",
    committee: "Room Tax Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=P8bqUIJo6yI",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2336/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Room Tax Commission approved six tourism grants totaling over $95,000 for local events and projects, including $20,000 each for Taste N' Glow Balloon Fest, Hmong Wausau Festival, and Big Bull Falls Blues Fest, plus $25,000 for Sylvan Hill Bike Trail Maintenance. The City of Wausau's request for portable security bollards was approved at 50% of the requested amount.",
    agenda: [
      { time:"N\/A", item:"Update from the Wausau\/Central Wisconsin Convention & Visitors Bureau" },
      { time:"N\/A", item:"Consideration of the minutes of the February 9, 2026 Regular Room Tax Commission Meeting" },
      { time:"N\/A", item:"Tourism Grant request from Taste N' Glow Balloon Fest for Taste N Glow Fest" },
      { time:"N\/A", item:"Tourism Grant request from Hmong American Center for Hmong Wausau Festival" },
      { time:"N\/A", item:"Tourism Grant request from EAA Chapter 640 for AirVenture Cup Race" },
      { time:"N\/A", item:"Tourism Grant request from Wausau Events for Big Bull Falls Blues Fest" },
      { time:"N\/A", item:"Tourism Grant request from Central Wisconsin Offroad Cycling Coalition (CWOCC) for Sylvan Hill Bike Trail Maintenance" },
      { time:"N\/A", item:"Tourism Grant request from the City of Wausau for event portable security bollards" },
      { time:"N\/A", item:"2026 Financial Projection" },
    ],
    discussions: [
      { item:"Update from the Wausau\/Central Wisconsin Convention & Visitors Bureau", body:"The Convention & Visitors Bureau provided an update to the commission. No vote was required for this informational item." },
      { item:"Consideration of the minutes of the February 9, 2026 Meeting", body:"Approved 4-0. Motion moved by Lindsey Lewitzke and seconded by Tim VanDeYacht. All members present voted yes: Michael Martens, Tim VanDeYacht, Lindsey Lewitzke, and Tom Neal." },
      { item:"Tourism Grant request from Taste N' Glow Balloon Fest", body:"Approved for $20,000. The grant will support the Taste N Glow Fest event. Detailed vote count not recorded." },
      { item:"Tourism Grant request from Hmong American Center for Hmong Wausau Festival", body:"Approved for $20,000. The grant will support the Hmong Wausau Festival. Detailed vote count not recorded." },
      { item:"Tourism Grant request from EAA Chapter 640 for AirVenture Cup Race", body:"Approved for $10,000. The grant will support the AirVenture Cup Race. Detailed vote count not recorded." },
      { item:"Tourism Grant request from Wausau Events for Big Bull Falls Blues Fest", body:"Approved for $20,000. The grant will support the Big Bull Falls Blues Fest. Detailed vote count not recorded." },
      { item:"Tourism Grant request from CWOCC for Sylvan Hill Bike Trail Maintenance", body:"Approved for $25,000. The grant will fund maintenance of the Sylvan Hill Bike Trail. Detailed vote count not recorded." },
      { item:"Tourism Grant request from City of Wausau for portable security bollards", body:"Approved at 50% of the requested monetary amount. The commission reduced the grant to half of what was originally requested. Detailed vote count not recorded." },
      { item:"2026 Financial Projection", body:"The 2026 financial projection was on the agenda. No vote action was recorded for this item." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Disburse $20,000 tourism grant to Taste N' Glow Balloon Fest",
      "Disburse $20,000 tourism grant to Hmong American Center for Hmong Wausau Festival",
      "Disburse $10,000 tourism grant to EAA Chapter 640 for AirVenture Cup Race",
      "Disburse $20,000 tourism grant to Wausau Events for Big Bull Falls Blues Fest",
      "Disburse $25,000 tourism grant to CWOCC for Sylvan Hill Bike Trail Maintenance",
      "Disburse grant to City of Wausau for portable security bollards at 50% of requested amount",
    ],
    civicItems: [
      { number:"1", name:"Update from the Wausau\/Central Wisconsin Convention & Visitors Bureau.", votes:[], docs:[], children:[] },
      { number:"2", name:"Consideration of the minutes of the preceding meeting(s).", votes:[{ motion:"approve", passed:true, initiator:"Lindsey Lewitzke", seconder:"Tim VanDeYacht", yes:["Michael  Martens", "Tim VanDeYacht", "Lindsey Lewitzke", "Tom Neal"], no:[], abstain:[] }], docs:[], children:[
      { number:"a", name:"Regular Room Tax Commission Minutes", votes:[], docs:[{ name:"RoomTax_Regular_02092026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6878)" }], children:[] },
    ] },
      { number:"3", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Tourism Grant request from Taste N' Glow Balloon Fest for Taste N Glow Fest.", votes:[{ motion:"approve the grant amount of $20,000", passed:true, initiator:"Tim VanDeYacht", seconder:"Tom Neal", yes:["Michael  Martens", "Tim VanDeYacht", "Lindsey Lewitzke", "Tom Neal"], no:[], abstain:[] }], docs:[{ name:"Tourism Grant Application", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6863)" }, { name:"Taste N Glow - 2026 Budget", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6864)" }], children:[] },
      { number:"b", name:"Tourism Grant request from Hmong American Center for Hmong Wausau Festival.", votes:[{ motion:"approve the grant amount of $20,000", passed:true, initiator:"Tom Neal", seconder:"Lindsey Lewitzke", yes:["Michael  Martens", "Tim VanDeYacht", "Lindsey Lewitzke", "Tom Neal"], no:[], abstain:[] }], docs:[{ name:"Tourism Grant Application", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6866)" }, { name:"Hmong American Center, Inc. Board of Director", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6867)" }, { name:"Hmong Wausau Festival 2026 Operations Budget", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6868)" }, { name:"Statement of Financial Position 2025", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6869)" }, { name:"Year-end Financial Statements Justification", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6870)" }], children:[] },
      { number:"c", name:"Tourism Grant request from EAA Chapter 640 for AirVenture Cup Race.", votes:[{ motion:"approve the grant amount of $10,000", passed:true, initiator:"Tom Neal", seconder:"Tim VanDeYacht", yes:["Michael  Martens", "Tim VanDeYacht", "Lindsey Lewitzke", "Tom Neal"], no:[], abstain:[] }], docs:[{ name:"Tourism Grant Application", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6872)" }, { name:"AirVenture Cup Race – Project\/Event Budget", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6874)" }, { name:"EAA Chapter 640 – Year-End Financial Statement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6873)" }, { name:"EAA Chapter 640 – 2026 Organizational Budget", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6875)" }, { name:"EAA Chapter 640 Board of Directors", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6876)" }], children:[] },
      { number:"d", name:"Tourism Grant request from Wausau Events for Big Bull Falls Blues Fest.", votes:[{ motion:"approve the grant amount of $20,000", passed:true, initiator:"Tom Neal", seconder:"Tim VanDeYacht", yes:["Michael  Martens", "Tim VanDeYacht", "Lindsey Lewitzke", "Tom Neal"], no:[], abstain:[] }], docs:[{ name:"Tourism Grant Application", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6889)" }, { name:"Big Bull Falls Blues Fest Marketing Plan 2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6891)" }, { name:"2026 Big Bull Falls Blues Fest Budget", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6893)" }, { name:"Blues Fest Ticket Sales Map (2025)", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6890)" }, { name:"Big Bull Falls Blues Fest 2025 Sales Reach by State", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6892)" }, { name:"2026 Events Budget - Wausau Events", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6894)" }, { name:"WE 2026 Board of Directors", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6895)" }], children:[] },
      { number:"e", name:"Tourism Grant request from Central Wisconsin Offroad Cycling Coalition (CWOCC) for Sylvan Hill Bike Trail Maintenance.", votes:[{ motion:"approve the amount of $25,000", passed:true, initiator:"Tim VanDeYacht", seconder:"Lindsey Lewitzke", yes:["Michael  Martens", "Tim VanDeYacht", "Lindsey Lewitzke", "Tom Neal"], no:[], abstain:[] }], docs:[{ name:"CWOCC Sylvan Trail Maintenance Tourism Grant Narrative", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6879)" }, { name:"Gmail - Room tax grant application - CWOCC", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6880)" }], children:[] },
      { number:"f", name:"Tourism Grant request from the City of Wausau for event portable security bollards.", votes:[{ motion:"to approve the amount at 50% of the monitary ask", passed:true, initiator:"Tom Neal", seconder:"", yes:["Michael  Martens", "Tim VanDeYacht", "Lindsey Lewitzke", "Tom Neal"], no:[], abstain:[] }], docs:[{ name:"Wausau Shindig Event - Street Closures", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6882)" }, { name:"RAF Quote for Event Portable Security Bollards.", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6885)" }, { name:"Yodock-2001M-PI-Sheet-10-6-22", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6883)" }, { name:"Yodock-2001MB-PI-Sheet-10-5-22", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6884)" }], children:[] },
      { number:"g", name:"2026 Financial Projection", votes:[], docs:[{ name:"2026 Financial Projection Updated", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6888)" }], children:[] },
    ] },
      { number:"4", name:"Adjournment.", votes:[{ motion:"adjourn", passed:true, initiator:"Tom Neal", seconder:"Tim VanDeYacht", yes:["Michael  Martens", "Tim VanDeYacht", "Lindsey Lewitzke", "Tom Neal"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
  {
    id: "QM1mHief1xs", source: "wausau",
    title: "Wausau Board of Public Works Meeting",
    date: "April 28, 2026", shortDate: "APR 28",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=QM1mHief1xs",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2334/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Board of Public Works approved minutes from the previous meeting but the proposal for Hand Labor Mowing Services for 2026-2030 failed. The adjournment motion also failed on a 2-0 vote moved by Vincent Bonino and seconded by Eric Lindman.",
    agenda: [
      { time:"N\/A", item:"April 21, 2026 Regular Board of Public Works Minutes" },
      { time:"N\/A", item:"Open proposals for Hand Labor Mowing Services for years 2026 through 2030" },
    ],
    discussions: [
      { item:"April 21, 2026 Regular Board of Public Works Minutes", body:"The minutes from the April 21, 2026 Regular Board of Public Works meeting were approved. Vote count and movers not specified in the records." },
      { item:"Open proposals for Hand Labor Mowing Services for years 2026 through 2030", body:"The board opened proposals for Hand Labor Mowing Services covering years 2026 through 2030. The motion to approve failed. Specific vote count and movers not recorded." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Hand Labor Mowing Services proposals for 2026-2030 were not approved; item may require further action at a future meeting",
    ],
    civicItems: [
      { number:"1", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"April 21, 2026 Regular Board of Public Works Minutes.", votes:[{ motion:"approve", passed:true, initiator:"Vincent Bonino", seconder:"Eric Lindman", yes:["Eric Lindman", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"BoardofPublicWorks_Regular_MinutesDRAFT_04212026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6856)" }], children:[] },
    ] },
      { number:"2", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Open proposals for Hand Labor Mowing Services for years 2026 through 2030.", votes:[{ motion:"approve", passed:false, initiator:"", seconder:"", yes:[], no:[], abstain:[] }], docs:[], children:[] },
    ] },
      { number:"3", name:"Adjournment.", votes:[{ motion:"approve", passed:false, initiator:"Vincent Bonino", seconder:"Eric Lindman", yes:["Eric Lindman", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
  {
    id: "CIhVYLRBgok", source: "wausau",
    title: "Wausau City Council Meeting",
    date: "April 28, 2026", shortDate: "APR 28",
    committee: "City Council", duration: "~1h",
    url: "https://www.youtube.com/watch?v=CIhVYLRBgok",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2335/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Common Council approved mayoral appointments to multiple boards and commissions, passed a consent agenda including bike rack request procedures and special assessments for street construction, but saw contentious debate over proposed amendments to council standing rules with multiple failed motions. The council voted 11-0 on consent items while rule suspension votes were divided, with one failing 5-6.",
    agenda: [
      { time:"N\/A", item:"Arbor Day Proclamation" },
      { time:"N\/A", item:"Week of the Young Child Proclamation" },
      { time:"N\/A", item:"National Preservation Month Proclamation" },
      { time:"N\/A", item:"Workers Memorial Day Proclamation" },
      { time:"N\/A", item:"March 24, 2026 Regular Common Council Minutes" },
      { time:"N\/A", item:"April 14, 2026 Regular Common Council Minutes" },
      { time:"N\/A", item:"Joint Resolution from the Bicycle & Pedestrian Advisory Committee and the Infrastructure & Facilities Committee Approving the Bike Rack Request Form" },
      { time:"N\/A", item:"Resolution from the Infrastructure & Facilities Committee Levying Special Assessments for the 2025 Street Construction Projects" },
      { time:"N\/A", item:"Ordinance from the Common Council to Amend Wausau Municipal Code Ch. 2.16, Standing Rules of the Common Council" },
      { time:"N\/A", item:"Confirming Appointments of the Mayor of the City of Wausau to the Historic Preservation Commission, Sustainability, Energy & Environment Committee, Business Improvement District Board, Community Development Authority Board and Ethics Board" },
    ],
    discussions: [
      { item:"Meeting Minutes Approval", body:"The council approved minutes from both the March 24, 2026 and April 14, 2026 regular meetings. The motion passed unanimously 11-0, moved by Sarah Watson and seconded by Tom Neal." },
      { item:"Consent Agenda", body:"The consent agenda was approved 11-0, moved by Sarah Watson and seconded by Bruce Trueblood. This included the Joint Resolution Approving the Bike Rack Request Form from the Bicycle & Pedestrian Advisory Committee and Infrastructure & Facilities Committee, as well as the Resolution Levying Special Assessments for the 2025 Street Construction Projects." },
      { item:"Suspension of Council Rules", body:"The council voted to suspend Rule 11(A) regarding referral of ordinances, passing 8-3 with Matt Hoenecke, Lou Larson, and Bruce Trueblood voting no. However, the motion to suspend Rule 21 regarding amending of the rules failed 5-6, with Carol Lukens, Michael Martens, Andrew Wiskowski, Kristin Slonski, Sarah Watson, and Lou Larson voting against." },
      { item:"Ordinance to Amend Wausau Municipal Code Ch. 2.16, Standing Rules of the Common Council", body:"This item saw extensive procedural debate with multiple votes. A motion to approve as amended failed, as did a motion to refer back to the Rules Review Committee. An amendment by Alder Watson subject to attorney review passed, as did a subsequent amendment by Alder Tierney. An amendment proposed by Alder Neal failed." },
      { item:"Confirming Mayoral Appointments", body:"The council approved the Mayor's appointments to the Historic Preservation Commission, Sustainability, Energy & Environment Committee, Business Improvement District Board, Community Development Authority Board, and Ethics Board. The motion passed." },
    ],
    publicComment: "Public comment was included on the agenda both before the business meeting (preregistered citizens) and after the business meeting.",
    actionItems: [
      "Bike Rack Request Form approved for implementation by Bicycle & Pedestrian Advisory Committee",
      "Special assessments levied for 2025 Street Construction Projects",
      "Mayoral appointments confirmed to Historic Preservation Commission, Sustainability Energy & Environment Committee, Business Improvement District Board, Community Development Authority Board, and Ethics Board",
      "Amendments to Ordinance 02-0432 as stated by Alder Watson and Alder Tierney to be reviewed by City Attorney",
    ],
    civicItems: [
      { number:"1", name:"Call to order by the presiding officer.", votes:[], docs:[], children:[] },
      { number:"2", name:"Pledge of Allegiance, and Roll Call and Proclamations.", votes:[], docs:[], children:[
      { number:"", name:"Arbor Day Proclamation", votes:[], docs:[{ name:"Arbor Day Proclamation", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6835)" }], children:[] },
      { number:"", name:"Week of the Young Child Proclamation", votes:[], docs:[{ name:"Week of the Young Child Proclamation", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6834)" }], children:[] },
      { number:"", name:"National Preservation Month Proclamation", votes:[], docs:[{ name:"Preservation Month Proclamation", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6841)" }], children:[] },
      { number:"", name:"Workers Memorial Day Proclamation", votes:[], docs:[{ name:"Workers Memorial Day Proclamation", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6861)" }], children:[] },
    ] },
      { number:"3", name:"Consideration of the minutes of the preceding meeting, approval of the minutes if correct, and correction of mistakes if any.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Tom Neal", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Andrew Wiskowski", "Kristin Slonski", "Matt Hoenecke", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Bruce Trueblood"], no:[], abstain:[] }], docs:[], children:[
      { number:"", name:"Regular Common Council Minutes", votes:[], docs:[{ name:"CommonCouncil_Regular_03242026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6862)" }], children:[] },
      { number:"", name:"Regular Common Council Minutes", votes:[], docs:[{ name:"CommonCouncil_Regular_04142026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6860)" }], children:[] },
    ] },
      { number:"4", name:"Reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"5", name:"Comments and suggestions from preregistered citizens.", votes:[], docs:[], children:[] },
      { number:"6", name:"Consent agenda.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Bruce Trueblood", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Andrew Wiskowski", "Kristin Slonski", "Matt Hoenecke", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Bruce Trueblood"], no:[], abstain:[] }], docs:[], children:[
      { number:"", name:"Joint Resolution from the Bicycle & Pedestrian Advisory Committee and the Infrastructure & Facilities Committee Approving the Bike Rack Request Form.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Tom Neal", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Andrew Wiskowski", "Kristin Slonski", "Matt Hoenecke", "Sarah Watson", "Vicki Tierney", "Lou Larson"], no:["Bruce Trueblood"], abstain:[] }], docs:[{ name:"Economic Development Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6825)" }, { name:"BPAC_20260323_Minutes_DRAFT", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6831)" }, { name:"City of Wausau Bike Rack Request Form", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6828)" }, { name:"Bike Rack Fabrication Overview – NTC Welding", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6829)" }, { name:"Possible Design for New Racks", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6830)" }], children:[] },
      { number:"", name:"Resolution from the Infrastructure & Facilities Committee Levying Special Assessments for the 2025 Street Construction Projects.", votes:[], docs:[{ name:"2025 Street Projects", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6833)" }, { name:"Infrastructure&Facilities_DRAFT_04092026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6881)" }], children:[] },
    ] },
      { number:"7", name:"Ordinances and resolutions.", votes:[], docs:[], children:[] },
      { number:"8", name:"Suspend Rule 11(A) Referral of ordinances, 6(B) Filing, and 21 Amending of the Rules.", votes:[{ motion:"suspend rule 11(A) Referral of ordinances", passed:true, initiator:"Sarah Watson", seconder:"Michael  Martens", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Andrew Wiskowski", "Kristin Slonski", "Sarah Watson", "Vicki Tierney"], no:["Matt Hoenecke", "Lou Larson", "Bruce Trueblood"], abstain:[] }, { motion:"suspend rule 21 Amending of the Rules", passed:false, initiator:"Matt Hoenecke", seconder:"Terry Kilian", yes:["Terry Kilian", "Tom Neal", "Matt Hoenecke", "Vicki Tierney", "Bruce Trueblood"], no:["Carol Lukens", "Michael  Martens", "Andrew Wiskowski", "Kristin Slonski", "Sarah Watson", "Lou Larson"], abstain:[] }], docs:[], children:[
      { number:"", name:"Ordinance from the Common Council to Amend Wausau Municipal Code Ch. 2.16, Standing Rules of the Common Council.", votes:[{ motion:"Approve as Amended", passed:false, initiator:"Matt Hoenecke", seconder:"Vicki Tierney", yes:["Terry Kilian", "Andrew Wiskowski", "Kristin Slonski", "Matt Hoenecke", "Vicki Tierney", "Bruce Trueblood"], no:["Carol Lukens", "Michael  Martens", "Tom Neal", "Sarah Watson", "Lou Larson"], abstain:[] }, { motion:"Refer item back to the Rules Review Committee", passed:false, initiator:"Lou Larson", seconder:"Tom Neal", yes:["Sarah Watson", "Lou Larson"], no:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Andrew Wiskowski", "Kristin Slonski", "Matt Hoenecke", "Vicki Tierney", "Bruce Trueblood"], abstain:[] }, { motion:"Amend Ordinance 02-0432 as stated by Alder Watson subject to Attorney Review", passed:true, initiator:"Sarah Watson", seconder:"Tom Neal", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Andrew Wiskowski", "Kristin Slonski", "Matt Hoenecke", "Sarah Watson", "Vicki Tierney"], no:["Lou Larson", "Bruce Trueblood"], abstain:[] }, { motion:"Amend the Motion to the amendment as stated by Alder Tierney", passed:true, initiator:"Vicki Tierney", seconder:"Matt Hoenecke", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Andrew Wiskowski", "Kristin Slonski", "Matt Hoenecke", "Sarah Watson", "Vicki Tierney", "Bruce Trueblood"], no:["Lou Larson"], abstain:[] }, { motion:"Amend Ordinance 02-0432 as stated by Alder Neal subject to Attorney Review", passed:false, initiator:"Tom Neal", seconder:"Lou Larson", yes:["Carol Lukens", "Michael  Martens", "Tom Neal", "Sarah Watson", "Lou Larson"], no:["Terry Kilian", "Andrew Wiskowski", "Kristin Slonski", "Matt Hoenecke", "Vicki Tierney", "Bruce Trueblood"], abstain:[] }], docs:[{ name:"Standing Rules of the Wausau Common Council", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6857)" }], children:[] },
      { number:"", name:"Confirming Appointments of the Mayor of the City of Wausau to the Historic Preservation Commission, Sustainability, Energy & Environment Committee, Business Improvement District Board,Community Development Authority Board and Ethics Board.", votes:[{ motion:"approve", passed:true, initiator:"Matt Hoenecke", seconder:"Carol Lukens", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Andrew Wiskowski", "Kristin Slonski", "Matt Hoenecke", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Bruce Trueblood"], no:[], abstain:[] }], docs:[{ name:"Vylius Leskys Citizen Participation Form", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6886)" }, { name:"Leskys, Vylius - Resume", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6887)" }], children:[] },
    ] },
      { number:"9", name:"Announcement from Mayor and Alderpersons.", votes:[], docs:[], children:[] },
      { number:"10", name:"Comments and suggestions from citizens present during Public Comment occurring both before and after the business meeting.", votes:[], docs:[], children:[] },
      { number:"11", name:"Adjournment.", votes:[{ motion:"Approve", passed:true, initiator:"Terry Kilian", seconder:"Kristin Slonski", yes:[], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
  {
    id: "eyveOHPR78Q", source: "marathon",
    title: "Marathon County Organizational Meeting",
    date: "April 21, 2026", shortDate: "APR 21",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=eyveOHPR78Q",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18308/639122770275200000",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, this Marathon County Organizational Meeting was scheduled for April 21, 2026. The specific agenda items were not detailed in the available document, but organizational meetings typically address committee appointments, officer elections, and structural matters for county governance.",
    agenda: [
      { time:"N\/A", item:"Organizational meeting business" },
    ],
    discussions: [
      { item:"Organizational Meeting Business", body:"The county board was scheduled to conduct organizational business. Specific agenda items were not available in the provided document, but such meetings typically involve officer elections, committee assignments, and administrative matters for the new board term." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Organizational matters were scheduled to be addressed as part of the county board's regular organizational process",
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

        {tab === "agenda" && (() => {
          const vid = meeting.url.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{11})/)?.[1];
          const toSec = t => { const p = t.split(":").map(Number); return p.length === 3 ? p[0]*3600+p[1]*60+p[2] : p[0]*60+p[1]; };
          // Determine if ANY agenda item has a real timestamp
          const anyHasTimestamp = vid && meeting.agenda.some(e => e.time && e.time !== "N/A" && /^\d/.test(e.time));
          return (
            <>
              <div style={labelStyle}>Agenda Items</div>
              <div style={{ marginTop: "4px" }}>
                {meeting.agenda.map((entry, i) => {
                  const hasTimestamp = anyHasTimestamp && entry.time && entry.time !== "N/A" && /^\d/.test(entry.time);
                  const ytUrl = hasTimestamp ? `https://www.youtube.com/watch?v=${vid}&t=${toSec(entry.time)}s` : null;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "11px 0", borderBottom: `1px solid ${RULE}` }}>
                      {anyHasTimestamp && (
                        hasTimestamp ? (
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
                        )
                      )}
                      <div style={{ width: "6px", height: "6px", minWidth: "6px", borderRadius: "50%", background: src.accent, marginTop: "5px", flexShrink: 0 }} />
                      <span style={bodyStyle}>{entry.item}</span>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })()}

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
                    color: depth === 0 ? src.accent : "#999",
                    flexShrink: 0, minWidth: "24px",
                    paddingTop: "1px",
                  }}>{item.number || (depth > 0 ? "•" : "")}</span>
                  <div style={{ flex: 1 }}>
                    <span style={{
                      fontFamily: depth === 0 ? "'Playfair Display', Georgia, serif" : "'Lora', Georgia, serif",
                      fontSize: depth === 0 ? "14px" : "13px",
                      fontWeight: depth === 0 ? 700 : (isEmpty ? 400 : 600),
                      color: isEmpty ? "#666" : INK,
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
  { date:"2026-06-18", time:"5:00 PM", name:"HR, Finance & Property Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-06-23", time:"5:00 PM", name:"Environmental Resources Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-06-23", time:"7:00 PM", name:"County Board Meeting", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-07-02", time:"5:00 PM", name:"Health & Human Services Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
];

const SCHOOL_BOARD_UPCOMING = [
  { date:"2026-05-11", time:"5:00 PM", name:"Regular Board Meeting", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-05-25", time:"5:00 PM", name:"Education & Operations Committee", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-06-08", time:"5:00 PM", name:"Regular Board Meeting", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-06-22", time:"5:00 PM", name:"Education & Operations Committee", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
];

const WAUSAU_UPCOMING = [
  { date:"2026-05-07", time:"8:00 AM", name:"Community Development Authority Finance Committee", url:"https://wausauwi.portal.civicclerk.com/event/2347/overview", source:"wausau" },
  { date:"2026-05-07", time:"9:00 AM", name:"Community Development Authority Board Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2349/overview", source:"wausau" },
  { date:"2026-05-07", time:"5:00 PM", name:"Sustainability, Energy & Environment Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2168/overview", source:"wausau" },
  { date:"2026-05-11", time:"7:30 AM", name:"Police & Fire Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2147/overview", source:"wausau" },
  { date:"2026-05-11", time:"4:45 PM", name:"Human Resources Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2295/overview", source:"wausau" },
  { date:"2026-05-12", time:"5:30 PM", name:"Finance Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2004/overview", source:"wausau" },
  { date:"2026-05-12", time:"6:30 PM", name:"Common Council Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1965/overview", source:"wausau" },
  { date:"2026-05-13", time:"4:00 PM", name:"Building Advisory Board Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2329/overview", source:"wausau" },
  { date:"2026-05-13", time:"6:00 PM", name:"Airport Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1952/overview", source:"wausau" },
  { date:"2026-05-14", time:"5:15 PM", name:"Infrastructure & Facilities Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2043/overview", source:"wausau" },
  { date:"2026-05-18", time:"5:15 PM", name:"Public Health & Safety Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2069/overview", source:"wausau" },
  { date:"2026-05-19", time:"10:30 AM", name:"Board of Public Works Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2345/overview", source:"wausau" },
  { date:"2026-05-19", time:"5:00 PM", name:"Plan Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2135/overview", source:"wausau" },
  { date:"2026-05-21", time:"4:45 PM", name:"Transit Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2179/overview", source:"wausau" },
];

const WESTON_UPCOMING = [
  { date:"2026-05-11", time:"", name:"Plan Commission", url:"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_05112026-1913", source:"weston" },
  { date:"2026-05-11", time:"", name:"Public Works Committee", url:"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_05112026-1914", source:"weston" },
  { date:"2026-05-12", time:"6:00 PM", name:"S.A.F.E.R. Board of Directors", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-05-18", time:"5:30 PM", name:"Finance & Human Resources Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-05-18", time:"6:00 PM", name:"Board of Trustees", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-05-21", time:"6:00 PM", name:"Mountain Bay Metro Police Oversight", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-05-25", time:"6:00 PM", name:"Parks & Recreation Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-06-01", time:"6:00 PM", name:"Community Life & Public Safety Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-06-08", time:"6:00 PM", name:"Plan Commission", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-06-08", time:"6:00 PM", name:"Public Works Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-06-09", time:"6:00 PM", name:"S.A.F.E.R. Board of Directors", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-06-15", time:"5:30 PM", name:"Finance & Human Resources Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-06-15", time:"6:00 PM", name:"Board of Trustees", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-06-18", time:"6:00 PM", name:"Mountain Bay Metro Police Oversight", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-06-22", time:"6:00 PM", name:"Parks & Recreation Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-07-06", time:"6:00 PM", name:"Community Life & Public Safety Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
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
