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
    date: "April 18, 2026", shortDate: "APR 18",
    committee: "City Council", duration: "~1h",
    url: "https://www.youtube.com/watch?v=rQcjCEY36e4",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Common Council approved a development agreement for 11 Scott Street (Waterside Place) by a 6-3 vote, recognizing city employees for their response to a record 30.9-inch snowfall, and presented a sustainability award to Colby and Colby Millwork. The council also approved multiple routine resolutions including a solid waste service agreement and budget modifications.",
    agenda: [
      { time:"2:49", item:"Call to order and Pledge of Allegiance" },
      { time:"3:30", item:"Roll call" },
      { time:"4:00", item:"Proclamation - Sarah Rafi Day" },
      { time:"7:00", item:"Mayoral citation for Public Works snow response" },
      { time:"14:30", item:"Sustainability Award presentation to Colby and Colby" },
      { time:"20:00", item:"Consideration of minutes from March 10, 2026" },
      { time:"20:30", item:"Public comment period" },
      { time:"23:30", item:"Consent agenda" },
      { time:"24:00", item:"Development agreement for 11 Scott Street LLC" },
      { time:"37:00", item:"Solid waste and recycling service agreement with Harter's Fox Valley" },
      { time:"42:00", item:"Settlement resolution - David Holes vs City of Wausau" },
    ],
    discussions: [
      { item:"Development agreement for 11 Scott Street (Waterside Place)", body:"Developers Raleigh Lray and Mark Craig spoke during public comment asking for council support for their $10+ million project to convert a vacant 100,000 square foot building into 52 mid-priced residential units. Alder Rasmusson supported the project citing the need to replace downtown workers with residents and fill the missing middle housing gap. Alder Neil outlined benefits including $55,000 annual parking revenue and potential TID 8 closure in 5 years. Alder Larson dissented, arguing the city should not discount its parking assets. Alder Tyranny questioned how the city would provide 150 alternative parking spaces if the Jefferson ramp closed. Economic Development Director Randy Feifer explained this replaced an existing agreement that required 480 spaces, reducing it to 150 paid spaces. Motion passed 6-3." },
      { item:"Mayoral citation for Public Works snow response", body:"Mayor Denny presented a citation recognizing the Department of Public Works plow crews, municipal fleet staff, and support team for their response to the historic March 14-16, 2026 storm that delivered a record 30.9 inches of snow. Kevin Kester, street supervisors Dustin and Josh, and storeroom manager Mitch Harris were specifically recognized. Kester addressed the council, praising the plow operators and mechanics, noting the fleet technicians worked 12 straight days without a day off." },
      { item:"Sustainability Award to Colby and Colby Millwork", body:"Christine Daniels from the Sustainability, Energy and Environment Committee presented the 2026 City of Wausau Sustainability Award to Colby and Colby Millwork. Representatives Mike Thompson and Keith Kaning accepted, describing their 2,000+ solar panel installation that became operational in July 2025, generating enough power for about 120 homes. They also highlighted LED lighting upgrades, high-efficiency air compressors, and recycling initiatives for wood, aluminum, glass, vinyl, cardboard, and other materials." },
      { item:"Solid waste and recycling service agreement", body:"Resolution approving a seven-year residential solid waste and recycling service agreement with Harter's Fox Valley Disposal was approved. The mayor noted a previous mix-up regarding whether the term was seven or ten years, confirming the corrected seven-year term. Passed unanimously 9-0." },
      { item:"Settlement resolution - David Holes vs City of Wausau", body:"Assistant City Attorney Vincent Bonito explained this resolution involves a 2022 bus accident where Transit Mutual Insurance paid the city's claim. The individual who crashed into the bus later filed a personal injury claim. The city filed a counter claim, and the individual's insurer agreed to pay damages to the city's insurance company. Alder Neil clarified this settlement is separate from any ongoing personal injury claim. Passed 8-1." },
    ],
    publicComment: "Two speakers addressed the council. Raleigh Lray from 11 Scott Street LLC asked for support for their building conversion project, emphasizing it as a green sustainable project adding mid-priced apartments downtown. Mark Craig (3246 North 8th Street) joined, noting the $10+ million project requires council support to move forward and mentioned a previous 7-4 term sheet vote.",
    actionItems: [
      "Development agreement and amended parking agreement with 11 Scott Street LLC approved 6-3",
      "March 31st, 2026 proclaimed as Sarah Rafi Day in Wausau",
      "Seven-year solid waste and recycling agreement with Harter's Fox Valley Disposal approved",
      "Airspace obstruction removal agreements approved for 724\/732 Ridgeland Avenue and 11 Ridgeland Avenue in Schofield",
      "Budget modification approved for Police Department to purchase Red Dot Optics using Thompson submachine gun sale proceeds",
      "Paid duty time approved for out-of-country training for Police Department officers",
      "Community outreach professional shelter operations duty premium differential approved",
      "Settlement release approved for David Holes vs City of Wausau case",
      "Municipal Code Chapter 6.44 solid waste disposal repealed and recreated to align with state code",
    ],
  },
  {
    id: "knWZO4dON-8", source: "wausau",
    title: "knWZO4dON-8",
    date: "April 18, 2026", shortDate: "APR 18",
    committee: "Plan Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=knWZO4dON-8",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Plan Commission approved a conditional use permit for a 70-unit, 7-story apartment building at 731 North First Street for Beacon Resources LLC, and approved a transportation project plat for Grand Avenue signal replacements. A public hearing was held regarding a proposed personal storage facility at 218 South Fourth Street, though no action was taken on that item during this meeting.",
    agenda: [
      { time:"0:00", item:"Call to order and election of vice chair (skipped until April)" },
      { time:"0:15", item:"Public comment on agenda items" },
      { time:"0:54", item:"Consideration of minutes for February 18th" },
      { time:"1:10", item:"Public hearing on conditional use permit for 218 South Fourth Street (personal storage facility)" },
      { time:"3:10", item:"Discussion and possible action on conditional use permit for 731 North First Street (70-unit apartment building)" },
      { time:"5:00", item:"Discussion and possible action on transportation project plat for Grand Avenue signal replacements" },
      { time:"5:30", item:"Discussion of next meeting date" },
      { time:"5:55", item:"Adjournment" },
    ],
    discussions: [
      { item:"Consideration of minutes for February 18th", body:"Motion to approve was made by Bugamman with a second from Balkan. The minutes passed unanimously with all members voting in favor." },
      { item:"Public hearing on conditional use permit for 218 South Fourth Street (personal storage facility)", body:"Jason Dunwy and Melinda Don Woody spoke in favor of the storage facility proposal. They argued that with over 400 new apartment units recently approved downtown, including 153 units at Foundry on Third and 102 units at Evergreen Landing, residents need convenient storage options. They noted apartment living provides limited storage and currently there are no downtown storage options, forcing residents to go to surrounding areas. The public hearing was closed but no action was taken on this item." },
      { item:"Conditional use permit for 731 North First Street (70-unit apartment building)", body:"Motion to approve was made by Bornman with a second from Bugamin. There was no discussion or questions from commissioners. The motion passed unanimously, approving Beacon Resources LLC to construct a 70-unit, 7-story apartment building." },
      { item:"Transportation project plat for Grand Avenue signal replacements at Sturgeon and Townline Road", body:"Motion to approve was made by Bugamin with a second from Balkan. With no discussion, the motion passed unanimously." },
    ],
    publicComment: "One email comment was submitted by Linda Lawrence on March 12th supporting the Beacon Resources apartment development at 731 North First Street, stating it would benefit downtown small businesses and expressing confidence in the developer's track record. Jason Dunwy and Melinda Don Woody appeared in person during the public hearing for the storage facility at 218 South Fourth Street, speaking in favor of allowing downtown storage to serve the growing apartment population.",
    actionItems: [
      "Conditional use permit approved for 731 North First Street for 70-unit, 7-story apartment building (Beacon Resources LLC)",
      "Transportation project plat approved for Grand Avenue signal replacements at Sturgeon and Townline Road (Project 370-40-40)",
      "Vice chair election postponed until April session",
      "Next meeting tentatively scheduled for April 21st at 5:00 PM, may be moved due to election and council meeting conflicts",
    ],
  },
  {
    id: "hNOP07iJjNY", source: "marathon",
    title: "hNOP07iJjNY",
    date: "April 18, 2026", shortDate: "APR 18",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=hNOP07iJjNY",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board of Supervisors held an educational meeting focused on two major presentations: an opportunity to join multi-district litigation regarding PFAS (forever chemicals) contamination, and information about county regulatory authority over renewable energy projects. No formal votes were taken as this was an educational session, but the board received detailed information on legal options for pursuing PFAS cleanup costs and navigating wind\/solar energy project regulations.",
    agenda: [
      { time:"0:00", item:"Call to order, Pledge of Allegiance, and silent moment of reflection" },
      { time:"1:15", item:"Reading of meeting notice" },
      { time:"2:00", item:"Roll call and sign-in" },
      { time:"2:30", item:"Public comment period (15 minutes, 5 speakers)" },
      { time:"15:01", item:"Presentation on PFAS multi-district litigation opportunity" },
      { time:"50:02", item:"Questions from board members on PFAS litigation" },
      { time:"1:01:00", item:"Presentation on renewable energy regulatory authority" },
      { time:"1:05:00", item:"Overview of proposed wind projects in Marathon County" },
      { time:"1:20:02", item:"Discussion of county options for renewable energy regulation" },
      { time:"1:40:00", item:"Joint development agreement considerations" },
    ],
    discussions: [
      { item:"Public Comment", body:"Five residents spoke during public comment. Cindy Nelson from Stratford\/Oplane Township reported speaking to 200 households about wind turbine projects, stating none supported them and urged better public information. Wendy Rowski from Green Valley requested the comprehensive plan be revised to change terminology from 'wind farm' to 'industrial wind energy development.' Barb Newton and Cindy Hogan from Rib Mountain spoke in support of reducing speed limits and creating a no-passing zone on Double N Road, referencing a petition signed by 75 residents. Heidi Pesky from Town of McMillan argued against joint development agreements for wind projects, citing concerns about county liability and transparency." },
      { item:"PFAS Multi-District Litigation Presentation", body:"Attorney Carrie McDougall from Baron and Budd Law Firm presented via WebEx on the nationwide PFAS litigation. He explained that a $12-13 billion settlement was reached with 3M and $3-5 billion with DuPont for water contamination claims, and that soil-based claims including airports and landfills are expected to be next. The litigation operates on a 25% contingency fee basis with no upfront costs to the county. Supervisor Robinson asked multiple questions about scope of claims including landfill exposure and land-spreading impacts. Vice Chair Dickinson noted the airport has no known PFAS contamination currently. Supervisor Mash asked about compensation structure, confirming the contingency arrangement. A resolution for discussion is on the agenda with potential action next week." },
      { item:"Renewable Energy Regulatory Authority Presentation", body:"Attorney Rebecca Roker from Atollis Law, representing Wisconsin Counties Association, presented on county authority to regulate wind and solar projects. She explained that projects over 100 megawatts fall under Public Service Commission jurisdiction, limiting local control. She noted PSC has approved 33 solar projects with zero denials. Roker outlined four options for the county: do nothing, negotiate a joint development agreement (JDA), intervene in PSC proceedings, or litigate. She strongly recommended JDAs as the most effective tool to protect county interests on issues like road damage, decommissioning, emergency response training, and liability. She discussed the Hub City Wind project from Alliant Energy and the Stormark Wind Energy Center as proposed projects for Marathon County." },
    ],
    publicComment: "Five speakers addressed the board. Cindy Nelson (Stratford\/Oplane Township) opposed wind turbines, reporting unanimous opposition from 200 residents she contacted. Wendy Rowski (Green Valley) requested changing 'wind farm' terminology to 'industrial wind energy development' in the comprehensive plan. Barb Newton (Rib Mountain) supported speed reduction and no-passing zone on Double N Road, citing near-collisions. Heidi Pesky (Town of McMillan) spoke against joint development agreements for wind projects, listing 12 concerns about county liability and transparency. Cindy Hogan (Rib Mountain) supported the Double N Road safety petition signed by 75 residents.",
    actionItems: [
      "Board to consider resolution on joining PFAS multi-district litigation at next week's meeting",
      "County to conduct PFAS testing at airport and landfill sites before any litigation claim is filed",
      "County leadership to consider options for engaging with proposed wind energy projects including Hub City Wind and Stormark Wind Energy Center",
      "Infrastructure committee recommendation on Double N Road speed reduction to come before county board for vote",
    ],
  },
  {
    id: "gugcMAm6DFA", source: "wausau",
    title: "gugcMAm6DFA",
    date: "April 18, 2026", shortDate: "APR 18",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=gugcMAm6DFA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Board of Public Works held a brief meeting to open bids for the 2026 asphalt paving project. RC Pavers was awarded the contract with a bid of $824,146.34, the lower of two bids received.",
    agenda: [
      { time:"0:00", item:"Call to order" },
      { time:"0:07", item:"Open bids and make recommendation for the 2026 asphalt paving project" },
      { time:"0:48", item:"Adjournment" },
    ],
    discussions: [
      { item:"2026 Asphalt Paving Project Bids", body:"Two bids were opened for the asphalt paving project. RC Pavers submitted a bid of $824,146.34 and American submitted a bid of $849,872.10. A motion was made to approve RC Pavers as the winning bidder. The motion was seconded and passed with unanimous 'aye' votes." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "RC Pavers awarded the 2026 asphalt paving project contract at $824,146.34",
    ],
  },
  {
    id: "f1fZvkxedNY", source: "wausau",
    title: "f1fZvkxedNY",
    date: "April 18, 2026", shortDate: "APR 18",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=f1fZvkxedNY",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Board of Public Works approved contractor bids for the 26th Street construction project, approved a change order for the Randolph Street\/Cherry Street project to address unexpected site conditions, and approved a pay estimate and concrete license. All items passed unanimously with no opposition.",
    agenda: [
      { time:"0:01", item:"Call to order" },
      { time:"0:01", item:"Consideration of March 10th Board of Public Works minutes" },
      { time:"0:18", item:"Open bids for 26th Street construction project" },
      { time:"0:18", item:"Open bids for North 8th Avenue project (postponed)" },
      { time:"1:15", item:"2025 Street Construction Project A - Randolph Street\/Cherry Street Change Order 1" },
      { time:"5:01", item:"2025 Street Construction Project A - Pay Estimate Number 9" },
      { time:"5:25", item:"Portland cement concrete license for KSK Incorporated" },
      { time:"5:45", item:"Adjournment" },
    ],
    discussions: [
      { item:"March 10th Board of Public Works Minutes", body:"Minutes from the March 10th meeting were considered. A motion was made and seconded, passing unanimously with all members voting aye." },
      { item:"26th Street Construction Project Bids", body:"Seven bids were opened and read aloud. Switlick submitted the lowest bid at $1,279,089.75, narrowly beating Hos at $1,280,877.96. Other bidders included A1 ($1,374,600), Francis Melvin ($1,385,383), Steen ($1,489,126), James Peterson ($1,570,698.56), and Earth ($1,686,780.75). A member remarked on the tight bidding. Motion to approve Switlick passed unanimously." },
      { item:"North 8th Avenue Project Bids", body:"This item was postponed as the bid opening was extended. Will return at a future meeting." },
      { item:"Randolph Street\/Cherry Street Change Order 1", body:"Staff presented four items totaling $14,436.50: an inside drop on a manhole ($4,856) due to an undocumented large diameter sanitary service; water main tie-in modifications ($2,317.50) after discovering 6-inch instead of 8-inch main; miscellaneous storm sewer connections ($5,016) at $66 per lineal foot; and geogrid installation ($2,247) for approximately 750 square yards near Thomas Jefferson Elementary due to poor soil conditions. Change Order 2 regarding liquidated damages was postponed pending further discussions. Motion to approve Change Order 1 passed unanimously." },
      { item:"Randolph Street\/Cherry Street Pay Estimate Number 9", body:"Pay estimate for work completed through end of year was presented for $535,114.02 from Haw Suns Incorporated. Motion to approve passed unanimously." },
      { item:"Portland Cement Concrete License - KSK Incorporated", body:"A member named Vinnie confirmed he reviewed the application and everything was in order. Motion to approve the license for KSK Inc. passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Switlick awarded 26th Street construction project contract at $1,279,089.75",
      "Change Order 1 for Randolph Street\/Cherry Street project approved for $14,436.50",
      "Pay Estimate #9 for Randolph Street\/Cherry Street project approved for $535,114.02",
      "Portland cement concrete license approved for KSK Incorporated",
      "North 8th Avenue project bids to return at future meeting",
      "Change Order 2 regarding liquidated damages to return at future meeting",
    ],
  },
  {
    id: "aUG3K0hxNsU", source: "weston",
    title: "aUG3K0hxNsU",
    date: "April 18, 2026", shortDate: "APR 18",
    committee: "Finance and Human Resource Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=aUG3K0hxNsU",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Finance and Human Resource Committee approved a modified employee clothing and equipment allowance after extended debate, settling on $400 for the remainder of 2026 and $500 annually starting in 2027, plus a one-time washer and dryer purchase. The meeting also featured a detailed presentation from Public Works Director Michael on department operations and budget, highlighting that Weston spends less per mile on streets than most central Wisconsin communities.",
    agenda: [
      { time:"0:01", item:"Call to Order and Pledge of Allegiance" },
      { time:"0:30", item:"Roll Call" },
      { time:"0:45", item:"Public Comments" },
      { time:"3:15", item:"Approval of Minutes from February 16, 2026" },
      { time:"3:45", item:"Acknowledge February Financial Report" },
      { time:"4:15", item:"Acknowledge T1 and T2 Detail Reports for February" },
      { time:"4:45", item:"Acknowledge Legal Details for February" },
      { time:"5:00", item:"Educational Presentation: Public Works Operations and Budget" },
      { time:"40:03", item:"Discussion and Action on Clothing and Equipment Reimbursement Amendments" },
      { time:"1:15:01", item:"Remarks and Future Meeting Planning" },
      { time:"1:16:00", item:"Adjournment" },
    ],
    discussions: [
      { item:"Public Works Operations and Budget Presentation", body:"Public Works Director Michael delivered an extensive presentation on department operations, covering 119.5 centerline miles of roads, 114 miles of water main, 103 miles of sanitary sewer, and 70 miles of storm sewer. He noted the 2026 public works budget decreased by $26,000 (1.1%) compared to 2025. Michael emphasized Weston spends approximately $9,700 less per mile than the average central Wisconsin community on street maintenance. He discussed the recent major snow event where employees worked up to 17.5 hours, with estimated costs of $50,000, and the county is pursuing disaster relief funds. Michael noted the department has 10 full-time members (with one starting Wednesday) compared to 11 when he was hired in 2010." },
      { item:"Clothing and Equipment Reimbursement Policy Amendments", body:"The committee engaged in extended debate over proposed changes to employee clothing allowances following cancellation of the Cintas uniform contract. Initial motion for $600 annual allowance failed on roll call vote (Daniels-yes, Armain\/Love-no, My-no, Olsson-no). Motion for $400 annually also failed 2-3. Motion for $500 annually with washer\/dryer from Brad Daniels failed. Final motion by Stephanie for $400 remainder of 2026, $500 annually starting 2027, plus one-time washer\/dryer purchase passed with one opposed. Trustee candidate Beck questioned the increase, arguing the village needs to be fiscally objective given the upcoming fire department referendum. Michael defended the proposal, noting employees provide valuable cost-saving work and the change merely shifts how existing benefits are delivered." },
      { item:"February Financial Reports and Minutes", body:"The committee approved minutes from February 16, 2026 meeting unanimously on motion by Steve, seconded by Stephanie. February financial reports for all funds were acknowledged unanimously. T1 and T2 detail reports and legal details for February were also acknowledged unanimously." },
    ],
    publicComment: "Lisa Beck of 1808 Cortez Lane offered public comment. She praised Michael for public works efforts during the recent storm. She also questioned the proposed clothing allowance increase, suggesting the village should not automatically spend savings from canceling the Cintas contract and asking whether a lesser amount could be provided instead of the highest proposed amount.",
    actionItems: [
      "Recommend to village board: $400 clothing allowance for remainder of 2026, $500 annually starting 2027, plus one-time washer\/dryer purchase for public works staff",
      "New public works employee starting Wednesday to bring department to 10 full-time members",
      "County pursuing disaster relief funds for February snow event - follow-up documentation of costs needed",
      "Next meeting scheduled for Tuesday, April 21st at 5:00 PM due to new board member swearing-in",
    ],
  },
  {
    id: "_hS5GDGVL1c", source: "wausau",
    title: "_hS5GDGVL1c",
    date: "April 18, 2026", shortDate: "APR 18",
    committee: "Public Health & Safety", duration: "~1h",
    url: "https://www.youtube.com/watch?v=_hS5GDGVL1c",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Public Health and Safety Committee approved a parklet permit for West Cider Diner and Lounge, approved multiple license applications and summer event permits, and updated municipal code provisions regarding solid waste disposal and cell phone use while driving. The committee also received updates on the fire department's annual report, the homeless shelter's upcoming transition from WMC to Bridge Street Mission, and heard public comment regarding emergency response treatment of unhoused individuals.",
    agenda: [
      { time:"0:00", item:"Call to order and roll call" },
      { time:"0:15", item:"Public comment on agenda items" },
      { time:"0:45", item:"Approval of February 16th, 2026 meeting minutes" },
      { time:"1:15", item:"License applications - West Cider Diner parklet permit discussion" },
      { time:"10:00", item:"License denial recommendations - Theodore Davis and Joanna Gregory" },
      { time:"20:01", item:"Repealing and recreating solid waste disposal ordinance (Chapter 6.44)" },
      { time:"22:00", item:"Repealing handheld mobile phone ordinance (Section 10.01.012)" },
      { time:"25:01", item:"MREA solar group buy program memorandum of understanding" },
      { time:"27:00", item:"Wausau Fire Department 2025 annual report discussion" },
      { time:"35:01", item:"Tavern activities report - February 2026" },
      { time:"38:00", item:"Community outreach update and shelter transition discussion" },
      { time:"45:00", item:"Public comment and adjournment" },
    ],
    discussions: [
      { item:"West Cider Diner and Lounge Parklet Permit", body:"Owner Tyler Vote presented detailed mockups of a proposed parklet at 628 North Third Avenue that would extend 4 feet into the street and 4 feet onto the sidewalk. The parklet would provide sunny seating for breakfast customers and utilize the same fiberglass panel construction as his previous Malarkey's Pub parklet. Committee members discussed visibility concerns and safety features. Alder Larson noted initial skepticism but was satisfied with the layout presentation. The permit was approved unanimously with Watson making the motion and Larson seconding, with a review scheduled for November 2026." },
      { item:"License Denial Recommendations - Theodore Davis", body:"Theodore Davis appeared before the committee regarding denial of his bartender\/operator license application related to an offense from 20 years ago when he was a minor. Davis stated he had submitted completion paperwork for registry requirements to Chief Barnes. His boyfriend Matthew Prieb also spoke in support, emphasizing Davis has not reoffended and is a good person. Deputy Chief Baiton was unfamiliar with the submitted materials. The committee held the item for the next meeting pending Chief Barnes' review of the rehabilitation evidence." },
      { item:"License Denial Recommendations - Joanna Gregory", body:"Joanna Gregory did not appear at the meeting. Her denial was included in the batch of license actions approved by the committee." },
      { item:"Batch License Approvals", body:"The committee approved licenses as recommended by staff including summer events (Wings over Wausau, Concerts on the Square, Chalkfest, Memorial Day parade, Hope on the Block, Jazz on the River), liquor license subcommittee recommendations for Oasis Arcade, Whiskey River Bar and Grill (new ownership), and Hayawa (new owner), plus Class A retailers. Motion by Larson, second by Watson, passed unanimously." },
      { item:"Solid Waste Disposal Ordinance Update", body:"The committee repealed and recreated Municipal Code Chapter 6.44 to comply with evolved state-level requirements. Assistant City Attorney Vinnie Bonino was available for questions. Motion by Larson, second by Watson, passed unanimously." },
      { item:"Handheld Mobile Phone Ordinance Repeal", body:"The committee repealed Section 10.01.012 regarding handheld mobile device use while driving, as state inattentive driving statutes have been amended to cover this issue, making the local ordinance redundant. Assistant City Attorney Bonino confirmed the rationale. Motion by Watson, second by Larson, passed unanimously." },
      { item:"MREA Solar Group Buy Program Partnership", body:"The committee approved a memorandum of understanding with Midwest Renewable Energy (MREA) for the Grow Solar Central Wisconsin program. Carrie from Planning noted the sustainability committee unanimously recommended approval on March 5th. Alder Sarah endorsed the program based on her personal experience with solar installation. Motion by Watson, second by Larson, passed unanimously." },
      { item:"Fire Department Annual Report", body:"Fire Chief Cop presented the 2025 annual report showing over 7,200 calls averaging 20 per day. He announced the department achieved ISO Class 2 status as of Friday after a year-long review process. The chief mentioned upcoming referendum informational sessions on March 31st, April 1st, and April 3rd at various stations. The report was placed on file." },
      { item:"Homeless Shelter Transition Update", body:"Tracy Durante reported 415 unduplicated guests served since opening and 740+ volunteer hours in February. James Torensson, new Director of Homeless Services at Bridge Street Mission, discussed the upcoming transition from WMC shelter. The shelter contract with First United Methodist Church was extended through April 19th, with Bridge Street Mission expected to open around April 20th pending contractor confirmation on April 1st. Committee expressed interest in touring the new facility at the ribbon cutting ceremony." },
    ],
    publicComment: "Carrie Mor Everest of 1025 Everest Boulevard spoke during public comment at the end of the meeting regarding her experiences volunteering at the homeless shelter. She expressed concerns about how unhoused individuals are treated by emergency responders during 911 calls, stating she has witnessed multiple instances where people were not treated ethically or professionally. She noted she has filed complaints over 10 months that have not been addressed and was told to bring concerns to the Police and Fire Commission. The chair acknowledged her remarks and directed her to the formal complaint process through the Police and Fire Commission.",
    actionItems: [
      "Parklet permit approved for West Cider Diner at 628 North Third Avenue with review scheduled for November 2026",
      "Theodore Davis license application held pending Chief Barnes' review of rehabilitation evidence for next meeting",
      "Joanna Gregory bartender license denied",
      "Summer event permits approved for Wings over Wausau, Concerts on the Square, Chalkfest, Memorial Day parade, Hope on the Block, and Jazz on the River",
      "Municipal Code Chapter 6.44 (solid waste disposal) repealed and recreated",
      "Municipal Code Section 10.01.012 (cell phone ban) repealed",
      "MREA solar group buy program MOU approved",
      "Staff to check on Trace Armanos restaurant status",
      "Staff to verify Days Tavern deer points tracking in tavern report",
      "Council tour of Bridge Street Mission shelter to be scheduled around ribbon cutting ceremony",
    ],
  },
  {
    id: "Izfp0CD_Da0", source: "weston",
    title: "Izfp0CD_Da0",
    date: "April 18, 2026", shortDate: "APR 18",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=Izfp0CD_Da0",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Board of Trustees approved multiple ordinances including rezonings and a modified speed limit ordinance for Weston Avenue, with the board rejecting the proposed 35 mph limit from Von Kennel to Highway J in favor of keeping it at 45 mph. The board also received an impassioned public comment criticizing the upcoming fire department referendum and heard updates on storm response efforts following a historic blizzard.",
    agenda: [
      { time:"0:01", item:"Call to order and Pledge of Allegiance" },
      { time:"0:01", item:"Roll call" },
      { time:"1:15", item:"Public comments" },
      { time:"5:01", item:"Minutes from previous meeting - February 16th" },
      { time:"5:30", item:"Acknowledge reports from boards, committees, and commissions" },
      { time:"6:30", item:"Department reports (Administrator, Clerk, Finance, Fire\/EMS, Parks\/Rec, Planning, Police, Public Works, Technology)" },
      { time:"20:02", item:"Ordinances - Rezonings and speed limit amendments" },
      { time:"30:01", item:"Resolution approving Hinter Springs Second Edition subdivision final plat" },
      { time:"32:00", item:"Discussion on April 2026 referendum informational sessions update" },
      { time:"35:02", item:"E-bike and e-uro ordinance discussion" },
      { time:"37:00", item:"Parking restrictions removal on Altaverie Street and Alderson Street" },
      { time:"40:00", item:"Intersection signage at Community Center Drive and Birch Street" },
      { time:"44:00", item:"Baseball\/softball field maintenance agreement and other park items" },
    ],
    discussions: [
      { item:"Public Comment", body:"Jim Pensel of 5002 Aerrol Street spoke passionately about the fire department staffing crisis after attending SAFER's inaugural citizen academy. He criticized the board's approach to funding through a referendum, calling it 'kicking the can down the road' since the $600,000 levy has no sunset date. He urged the board to prioritize fire\/EMS funding over 'wants' like artificial turf and the aquatic center, stating 'We have the money. You just need to have the courage to spend it where it actually matters.'" },
      { item:"Finance Director Response", body:"Finance Director Jessica responded to the public comment, explaining that the village cannot borrow for additional firefighters - only for capital projects like the Kennedy Park turf. She noted the village is 'the cheapest' and 'most efficient' but cannot fund more staff. She expressed frustration with criticism, noting public works received complaints about snow removal despite 17-18 hour days, and suggested her position might be open soon, saying '$150,000 you can fund a firefighter.'" },
      { item:"Speed Limit Ordinance 26-006", body:"The original ordinance to set Weston Avenue speeds at 35 mph from Camp Phillips to Ryan Street failed with four no votes (Maloney, Jordan, President, and one other). Trustee Maloney argued the stretch from Von Kennel to Ryan has 'sparse driveways and intersections' and shouldn't be compared to Scofield or Ross Avenues. A revised motion passed keeping Von Kennel to Highway J at 45 mph while setting Camp Phillips to Von Kennel at 35 mph, preserving other speed limit changes in the ordinance." },
      { item:"Rezoning Ordinances", body:"Two rezoning ordinances were approved unanimously as recommended by the Planning Commission: Ordinance 26-00004 rezoning a portion of 8905 Bert Street from RR5 to SFS, and Ordinance 26-00005 rezoning a portion of 7105 Christensen Avenue from SL to SFS single family residential small lot." },
      { item:"Intersection Signage at Community Center Drive and Birch Street", body:"The board approved changing the stop sign to a yield sign at Community Center Drive and Birch Street. Trustee Hooang raised concerns about bicyclists coming off the pedestrian bridge at 15-20 mph with no signage. The motion was amended to add a stop sign for bicyclists at the bottom of the bridge. The amended motion passed unanimously." },
      { item:"Baseball\/Softball Field Maintenance Agreement", body:"The board approved a 10-year maintenance and user agreement for baseball\/softball fields. The committee recommended the longer term to protect the village's investment at Kennedy Park if youth organizations pulled out early. Two highlighted additions included the 10-year term and that the village determines when fields can be used based on safety conditions." },
      { item:"Remote Meeting Attendance Policy", body:"Trustee Lewis recommended postponing this item until the next meeting so the newly seated board can make the decision. The board unanimously voted to defer to the April 21st meeting." },
      { item:"Microsoft Teams for Communication", body:"The board approved using Microsoft Teams for trustee communications starting with the next term, eliminating text messaging between trustees. A training session will be held when the new board is seated." },
    ],
    publicComment: "Jim Pensel of 5002 Aerrol Street was the only public commenter. He praised SAFER department staff after attending their citizen academy but criticized the board's referendum approach to funding, arguing the board should prioritize essential services over amenities like artificial turf and the aquatic center.",
    actionItems: [
      "February 16th meeting minutes approved",
      "Ordinance 26-00004 rezoning 8905 Bert Street approved",
      "Ordinance 26-00005 rezoning 7105 Christensen Avenue approved",
      "Speed limit ordinance approved with amendment keeping Von Kennel to Highway J at 45 mph",
      "Hinter Springs Second Edition subdivision final plat approved",
      "E-bike\/e-uro ordinance tabled pending county finalization",
      "Parking restrictions removed on west side of Alderson Street along Kennedy Park",
      "Yield sign to replace stop sign at Community Center Drive\/Birch Street with stop sign added for bicyclists on path",
      "10-year baseball\/softball field maintenance agreement approved",
      "Commercial rotary mower purchase approved",
      "Park shelter fees and field rental costs approved",
      "Eagle Scout project at McKiller Park approved with funding from park operations",
      "Remote meeting attendance policy deferred to April 21st meeting",
      "Microsoft Teams approved for trustee communications",
      "Military Road utility engineering service contract approved",
      "Business 51 storm pond engineering contract amendment ($13,500) approved",
      "Sewer televising software contract approved",
      "2026 annual stream maintenance plan budget approved",
      "Hospital area repaving change order #4 approved",
      "Well rehabilitation approved",
      "Sign encroachment agreement with Seventh Floor Investments LLC approved",
      "Two more referendum informational sessions scheduled: March 31st 4:30-6pm and April 2nd 12-1:30pm",
      "Next meeting April 21st at 6pm with new board members",
    ],
  },
  {
    id: "HwjjV4oIneA", source: "marathon",
    title: "HwjjV4oIneA",
    date: "April 18, 2026", shortDate: "APR 18",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=HwjjV4oIneA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board of Supervisors adopted the 2026 Comprehensive Plan with multiple amendments addressing renewable energy language, AI technology, data centers, and energy policy. The board also approved salaries for elected officials, authorized phase 2 design for a new highway facility, engaged outside counsel for PFAS litigation, and ratified an emergency declaration for the recent blizzard.",
    agenda: [
      { time:"0:12", item:"Call to order, pledge of allegiance, and moment of reflection" },
      { time:"1:15", item:"Reading of meeting notice and roll call" },
      { time:"2:30", item:"Standing committee reports" },
      { time:"2:45", item:"Consent agenda items C8 through C13 B2" },
      { time:"3:15", item:"D14 - Adopting Marathon County Comprehensive Plan 2026" },
      { time:"1:20:01", item:"E15 - Establishing salaries for elected officials" },
      { time:"1:21:00", item:"E16 - Highway facility phase 2 design services" },
      { time:"1:23:30", item:"E17 - Authorizing PFAS litigation counsel" },
      { time:"1:28:00", item:"E18-E19 - Budget amendments and capital asset thresholds" },
      { time:"1:30:01", item:"G21 - Ratification of local state of emergency declaration" },
    ],
    discussions: [
      { item:"Consent Agenda Items C8-C13 B2", body:"Motion by Supervisor Rosenberg, seconded by Supervisor V. Passed unanimously with no discussion." },
      { item:"Adopting Marathon County Comprehensive Plan 2026", body:"Administrator Leonard presented 10 proposed amendments compiled from supervisor feedback. The board voted on each amendment separately after Supervisor Crawl's motion to separate amendments 2, 3, and 4 passed. Amendment 1 (livability standards) passed unanimously. Amendments 2, 3, and 4 (alternative energy systems language changes suggested by Vice Chair Dickinson) passed but not unanimously, with Supervisor Crawl voting no. Amendment 5 (data centers\/battery storage) passed not unanimously after Supervisor Leur expressed the language was 'too ideological.' Amendment 6 (radon and lead reference) passed unanimously. Amendment 7 (regulate energy projects when allowed by law) passed not unanimously. Amendment 8 (AI and automation language from Supervisor Leur) passed unanimously. Amendment 9 was heavily debated - Supervisor Sindellski proposed promoting clean coal, natural gas, and nuclear energy. Supervisor Robinson and Rosenberg opposed, with Rosenberg stating 'there is no such thing as clean coal.' Supervisor Boots offered an amendment to the amendment changing the language to 'promote coal and natural gas until a long-term sustainable and reliable energy source can be found that does not adversely affect agricultural land,' which passed not unanimously. A late amendment from Supervisor Sindellski regarding utility-scale wind, solar, and battery facilities as industrial uses was debated at length; Supervisor Jeang moved to refer to committee but ultimately the amendment was defeated. The comprehensive plan as amended passed not unanimously." },
      { item:"Establishing salaries for elected officials", body:"Resolution 12-26 establishing salaries for clerk of courts, sheriff, and elected department heads for the upcoming term. Motion by Supervisor Conway, seconded by Supervisor Rosenberg. Passed with no discussion." },
      { item:"Highway facility phase 2 design services", body:"Resolution 13-26 authorizing staff to proceed with phase 2 design. Motion by Supervisor Robinson, seconded by Supervisor V. Supervisor Soyber requested future information about plans for the old facility. Supervisor Sindellski asked about the $53 million cost estimate, and Chair Gibbs clarified that amount was not part of this vote. Passed unanimously." },
      { item:"PFAS litigation authorization", body:"Resolution 14-26 authorizing engagement of outside counsel on contingency basis for PFAS lawsuits. Two amendments were adopted: Supervisor Robinson's amendment directing the county administrator to evaluate past and present practices that may have resulted in PFAS exposure passed unanimously. Vice Chair Dickinson's amendment modifying airport-related language passed unanimously. The resolution as amended passed unanimously." },
      { item:"Ratification of emergency declaration", body:"Resolution 22-26 ratifying the local state of emergency for the blizzard event. Administrator Leonard explained the declaration was needed to preserve opportunities for state reimbursement after the governor's declaration expired. Leonard praised staff across facilities, parks, highway, sheriff's office, and airport for working 12-16 hour shifts during the storm. Supervisor Fifer echoed thanks to staff. Passed unanimously." },
      { item:"Administrator performance evaluation", body:"Chair Gibbs explained the executive committee had finalized the administrator's evaluation based on board input from the previous Thursday meeting. Supervisor Robinson moved to accept the executive committee's recommendation on salary and performance evaluation. Passed unanimously without going into closed session." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Marathon County Comprehensive Plan 2026 adopted with 9 amendments as Ordinance 0-13-26",
      "Salaries established for clerk of courts, sheriff, and elected department heads for upcoming term",
      "Phase 2 design services authorized for new highway facility",
      "Outside counsel engaged on contingency basis for PFAS litigation; administrator directed to evaluate county PFAS exposure risks",
      "Budget carry forwards and amendments approved",
      "Capital asset thresholds set at $10,000 for general assets and $50,000 for infrastructure",
      "Law enforcement drug trafficking response grant accepted with budget amendment",
      "Local state of emergency declaration ratified for blizzard response",
      "Administrator's performance evaluation and salary placement finalized",
      "Departing supervisors recognized: Crawl, Fifick, Marshall, Rosenberg, Hardinger, V, and Reynolds",
    ],
  },
  {
    id: "D7R7a0G0WTA", source: "weston",
    title: "D7R7a0G0WTA",
    date: "April 18, 2026", shortDate: "APR 18",
    committee: "Parks and Recreation Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=D7R7a0G0WTA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Weston Parks and Recreation Committee approved minutes, selected Rettler Corporation for the Mock Mueller Park master plan, and reviewed Yellow Banks kayak launch expenses showing significant grant funding success. The committee also discussed increasing park impact fees to align with neighboring communities and received updates on Kennedy Park ice rink operations.",
    agenda: [
      { time:"0:05", item:"Call to order and Pledge of Allegiance" },
      { time:"0:30", item:"Roll call" },
      { time:"0:45", item:"Approval of minutes from February 23rd, 2026" },
      { time:"1:15", item:"Public comments" },
      { time:"5:45", item:"Review of parks and recreation impact fee discussion" },
      { time:"25:30", item:"Request for proposals for Mock Mueller Park master plan" },
      { time:"32:00", item:"Review of Yellow Banks kayak launch expenses" },
      { time:"38:30", item:"Components of operations for ice rink at Kennedy Park" },
      { time:"50:15", item:"Future items and remarks" },
      { time:"53:00", item:"Adjournment" },
    ],
    discussions: [
      { item:"Approval of minutes from February 23rd, 2026", body:"A motion to accept the minutes was made and seconded. The motion passed unanimously with all present members voting in favor." },
      { item:"Parks and Recreation Impact Fee Discussion", body:"Jennifer presented information on park impact fees, noting the village currently charges $300 for single-family units while neighboring communities charge $600-900. The 2020 study recommended fees up to $761 but the village only increased from $244 to $300 in 2022. Committee members expressed support for a moderate increase to align with neighbors like Kronenwetter ($603) and Rib Mountain ($650). Katrina stated she would support the moderate increase bracket. The committee provided feedback to take to the Plan Commission but took no formal action." },
      { item:"Request for Proposals for Mock Mueller Park Master Plan", body:"Staff reported receiving seven proposals for the park master plan, reviewed by four staff members. The two lowest bidders were JSD and Rettler Corporation, both with village experience. Rettler was noted for their park-specific expertise and local knowledge. Roger made a motion to select Rettler Corporation, seconded by Katrina. The motion passed unanimously." },
      { item:"Review of Yellow Banks Kayak Launch Expenses", body:"Jessica presented a comprehensive breakdown of the kayak launch project expenses and grant funding. The project faced unforeseen costs including poor subgrade and an unknown well casing. Grants were secured from DNR, Marathon County Transportation (covering full ADA accessibility costs), and others. Dan Hagenbotham and MTS donated site planning work, and PGA provided favorable pricing. Lisa Beck praised the RFC during public comment. Committee members commended Jessica and staff for the grant work and transparency, noting the significant reduction in out-of-pocket costs." },
      { item:"Ice Rink Operations at Kennedy Park", body:"Staff presented information on ice rink operations at Katrina's request. The warming house has been unstaffed since 2020 due to COVID and subsequent staffing challenges. Sean noted Everest Youth Hockey remains interested in improvements including a covered rink structure and has provided cost estimates. Discussion touched on potential impacts from Marathon Park changes. Committee members requested additional historical attendance data from 2018-19 seasons, labor hour costs, and user feedback for future meetings. No action was taken." },
    ],
    publicComment: "Jim Pencil expressed frustration about not receiving responses to his previous three-page submission of questions regarding playground equipment installation issues, Kennedy Park fundraising updates, hockey facilities, and ice rink costs. He argued the true cost of the ice rink is $20,000-30,000 when factoring in staff hours, not the $1,320.98 presented. Lisa Beck thanked Michael for snow removal work during the recent blizzard and praised Sean and Jessica for the well-written Yellow Banks RFC. A written response to Jim Pencil's previous email was noted for inclusion in the minutes.",
    actionItems: [
      "Rettler Corporation selected for Mock Mueller Park master plan and budget estimates",
      "Jennifer to present park impact fee comparisons with neighboring communities to Plan Commission next month",
      "Staff to compile historical ice rink attendance data from 2018-19 seasons for future meeting",
      "Staff to provide labor hour costs for ice rink operations",
      "Kennedy Park quarterly update scheduled for April board meeting",
      "Dan Hagenbotham expected to return to committee regarding Great Pineries Heritage Waterway signage",
    ],
  },
  {
    id: "8rRo1cm2YJ0", source: "wausau",
    title: "8rRo1cm2YJ0",
    date: "April 18, 2026", shortDate: "APR 18",
    committee: "Finance", duration: "~1h",
    url: "https://www.youtube.com/watch?v=8rRo1cm2YJ0",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Finance Committee approved multiple airport ground leases, denied an unlawful tax recovery claim related to ongoing litigation, and postponed decisions on joining a national opioid settlement and funding lead service line replacement costs not covered by state loans. The committee also approved 2025 budget carryover funds and transfers to cover shortfalls in recycling, airport, and parking funds.",
    agenda: [
      { time:"2:01", item:"Call to order and public comment" },
      { time:"2:30", item:"Approval of March 10, 2026 minutes" },
      { time:"2:55", item:"Alleged claim for recovery of unlawful tax - Green Acres at Greenwood Hills LLC" },
      { time:"3:45", item:"Consent to transfer title to buildings at 939 Woods Place" },
      { time:"4:15", item:"Terminating airport ground lease with Win O. Jones" },
      { time:"4:35", item:"Approving airport ground lease with Owen Jones" },
      { time:"5:00", item:"Approving airport ground lease with Cole Lundberg" },
      { time:"5:20", item:"National opioid settlement agreement participation" },
      { time:"12:00", item:"Budget amendment for lead service line replacement project" },
      { time:"27:03", item:"Budget amendment for 2025-2026 carryover funds" },
      { time:"29:15", item:"Review of 2025 motorpool fund financial results" },
      { time:"37:00", item:"Review of 2025 general fund financial results" },
      { time:"47:00", item:"2026 general obligation promissory note for capital improvements" },
      { time:"54:30", item:"Consideration of purchasing properties for DPW Streets Division" },
    ],
    discussions: [
      { item:"Minutes approval", body:"Motion from Watson, second from Griner to approve March 10, 2026 minutes. Passed unanimously." },
      { item:"Green Acres unlawful tax claim", body:"This assessment is part of ongoing litigation with Greenwood Hills. Watson moved to approve the claim, Griner seconded. The chair explained a no vote would deny the claim. The motion failed with opposition votes, effectively denying the tax recovery claim." },
      { item:"Airport ground lease transfers - 939 Woods Place", body:"Three related items handled the transfer of a hangar from Win O. Jones to Owen Jones. All three motions (consent to transfer title, terminating old lease, approving new lease) passed unanimously with motions from Watson and Tierney." },
      { item:"Airport ground lease with Cole Lundberg", body:"Motion from Griner, second from Watson to approve the ground lease. Passed unanimously." },
      { item:"National opioid settlement participation", body:"Committee members expressed concerns about lack of information. Alder Malini questioned where this came from, noting 'it almost dropped from heaven.' Assistant Attorney Vincent explained law firms send notices to potential class members. Watson noted concerns about signing away future legal action. Griner moved to postpone to the next meeting, Tierney seconded. Postponement passed unanimously. Deadline to opt in is May 4th." },
      { item:"Lead service line replacement budget amendment", body:"Eric from staff explained the DNR changed funding terms after initial agreement, resulting in $709,000 in non-construction costs not covered by the subsidized loan. Finance Director Marian Olsen outlined options including borrowing, using general fund reserves, or PFAS settlement money. Committee discussed splitting costs between homeowner side ($283,868) and water utility side ($425,803). Watson moved to postpone, Griner seconded. Postponement passed unanimously pending more information on PFAS settlement disbursements." },
      { item:"2025-2026 carryover funds", body:"Finance Director noted large carryover includes 10 transit buses funded by VW mitigation grant money and various airport projects awaiting grant draws. Some projects like city hall chimney liner and DPW fence replacement haven't started yet. Watson moved to approve, Griner seconded. Passed unanimously." },
      { item:"Motorpool fund financial results", body:"Informational item. Finance Director reported motorpool fund struggles with cash flow. After transferring GMT money ($191,000), fund shows $150,000 profit. However, pending capital purchases will create $177,000 cash shortfall. Staff indicated ARPA savings and sale proceeds could cover the shortfall. Solomon from MotorPool explained two dump trucks from 2023 are nearly ready (moved from 15th to 2nd\/3rd in line for spreader upfits)." },
      { item:"General fund financial results", body:"Finance Director reported $1.2 million surplus driven by strong building permits, investment income, and GMT money. Several departments over budget due to motorpool charges - Public Works ($481K over), Fire ($527K over), Police ($468K over). CCITC was $194K over due to communication issues including double-counting a 95% personnel vacancy adjustment and unbudgeted Office 365 upgrade ($65K). After proposed transfers to recycling, airport, and parking funds, surplus would be $540,000. Tierney moved to approve transfers, Watson seconded. Passed unanimously." },
      { item:"2026 general obligation promissory note", body:"Finance Director presented borrowing calendar for 2026 capital improvements including street projects (10-year), motorpool (5-year), and various TID projects. Watson moved to approve the calendar, chair seconded. Discussion noted debt utilization will decrease by about $2 million even with new issuance. Passed unanimously. Phil Cawson from Ehlers will present parameters resolution at next meeting." },
      { item:"DPW property purchases consideration", body:"Item was scheduled for closed session discussion. Watson moved to postpone to next meeting since council starts at 6:30 and time was not of the essence. Tierney seconded. Postponement passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Denied Green Acres at Greenwood Hills LLC claim for recovery of unlawful tax",
      "Approved transfer of hangar ownership and ground leases from Win O. Jones to Owen Jones at 939 Woods Place",
      "Approved airport ground lease with Cole Lundberg",
      "Postponed opioid settlement participation decision to next meeting - staff to provide more information",
      "Postponed lead service line budget amendment to next meeting pending PFAS settlement timing information",
      "Approved budget amendment for 2025-2026 carryover funds",
      "Approved transfers from general fund to recycling, airport, and parking funds to cover shortfalls",
      "Approved 2026 borrowing calendar - parameters resolution to come at next meeting",
      "Postponed closed session discussion on DPW property purchases to next meeting",
    ],
  },
  {
    id: "47UbKS2Jqo4", source: "marathon",
    title: "47UbKS2Jqo4",
    date: "April 18, 2026", shortDate: "APR 18",
    committee: "Executive Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=47UbKS2Jqo4",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Executive Committee met briefly before going into closed session to conduct the performance review of the county administrator. The committee voted unanimously to enter closed session to finalize the administrator's evaluation based on board feedback received the previous Thursday.",
    agenda: [
      { time:"0:00", item:"Call to order" },
      { time:"0:05", item:"Pledge of Allegiance" },
      { time:"0:30", item:"Performance review of the administrator (closed session)" },
    ],
    discussions: [
      { item:"Performance review of the administrator", body:"The chair explained that the committee had the option to go into closed session to discuss the final review of the county administrator, taking into consideration board feedback received the previous Thursday. The chair noted that executive committee members had rated the administrator on various questions using three criteria: needs improvement, successful, and exceptional, with scores averaged on a scale of 0 to 5. Corporation counsel was asked to provide a summary of the appraisal. A motion was made and seconded to go into closed session, which passed unanimously with all members voting aye: Gibbs, Dickinson, Arstead, Boots, Drebeck, Fifick, Mask, Ritter, Morash, and Robinson." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Committee entered closed session to finalize the county administrator's performance review",
    ],
  },
  {
    id: "0pfKykvicdA", source: "marathon",
    title: "0pfKykvicdA",
    date: "April 18, 2026", shortDate: "APR 18",
    committee: "Marathon County Human Resources and Finance Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=0pfKykvicdA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County HR and Finance Committee approved several routine items including a claim disallowance, revised property values for public auction, carry forward funds resolution, and a capital assets threshold policy amendment. The committee also received introductions from new healthcare consultants National Insurance Services and heard detailed financial updates on 2025 year-end closing and 2026 operations.",
    agenda: [
      { time:"0:00", item:"Claim disallowance - Mercedes Holmes" },
      { time:"2:43", item:"Revised property values for parcels for public auction" },
      { time:"5:00", item:"Resolution to approve carry forward funds" },
      { time:"11:15", item:"Resolution to amend capital assets threshold policy" },
      { time:"12:15", item:"Introduction of healthcare consultants - National Insurance Services" },
      { time:"37:10", item:"Audited 2025 year-end fiscal update" },
      { time:"55:03", item:"2026 year-to-date budget update" },
      { time:"57:30", item:"Finance Department quarterly update" },
      { time:"1:07:45", item:"County Treasurer update" },
      { time:"1:37:00", item:"Announcements and adjournment" },
    ],
    discussions: [
      { item:"Claim disallowance - Mercedes Holmes", body:"Corporation Counsel presented a claim received December 5th from Mercedes Holmes relating to the death of her 3-year-old child Zalen Bernett, who was placed in a treatment foster care home licensed through another agency in Dunn County. Law enforcement and social service investigations found no wrongdoing and determined death was from natural causes. Outside counsel and insurance carrier WMIK recommended disallowance. Chair Gibbs moved to disallow the claim, seconded by Supervisor Lemer. Motion carried unanimously." },
      { item:"Revised property values for public auction", body:"Staff reported two parcels on Mullen Street and South Third Avenue failed to sell twice on Wisconsin Surplus auctions because bids didn't reach appraised values. Staff requested revised minimum sale prices of $9,000 for 529 Mullen Street and $7,500 for 738 South 3rd Avenue. Chair Gibbs moved to approve the revised prices, seconded by Supervisor Lemer. Motion carried unanimously. Committee Chair Robinson asked about bidders who don't pay, and staff confirmed they are marked as non-pay and banned from future auctions." },
      { item:"Resolution to approve carry forward funds", body:"Finance Director Sam presented Resolution R20-2026 for program revenues and multi-year project funds to carry forward to 2026, including veterans relief fund replenishment which would provide approximately three years of funding. Discussion addressed the veterans service commission process and redacted records funds for the Register of Deeds. Vice Chair Marshall and Chair Robinson requested future information on the redaction fund's purpose and potential repurposing. The carryover includes $142,731 for administration special projects, of which $75,000 was already budgeted for homelessness contract. Chair Gibbs moved to approve, seconded by Supervisor Hart. Motion carried unanimously." },
      { item:"Resolution to amend capital assets threshold policy", body:"Finance Director Sam explained the proposal to increase the capitalization threshold from $5,000 to $10,000 for general assets, following GFOA guidance from 2006. This was considered in 2022 but never completed. Supervisor Hart moved to approve and forward to full county board, seconded by Chair Gibbs. Motion carried unanimously." },
      { item:"Introduction of healthcare consultants - National Insurance Services", body:"HR Director Candace introduced National Insurance Services representatives following their selection through RFP process. NIS team members presented their specialization in public sector clients and their five-person team serving Marathon County. They discussed their focus on evaluating the near-site ATA clinic, medical funding models (fully insured vs. self-insured), and transparent reporting to the committee. Vice Chair Marshall asked about per member costs compared to other employers and emergency room utilization strategies. Chair Gibbs inquired about evaluation processes for insurance models and risk tolerance considerations." },
      { item:"2025 year-end fiscal update", body:"Finance Director Sam provided comprehensive department-by-department review of unaudited 2025 financials, noting year-end closing processes are ongoing. Key items included: transfers to debt service of $647,229 and CIP of $6,863,934; county treasurer received TID closure check of $257,238 from City of Wausau and unclaimed property of $222,752; opioid fund received $352,389 in settlement funds with total cash of approximately $2.2 million. Parks fund saw ice revenue increase of $70,000. Capital improvements projects still need reconciliation and carryover requests for multi-year projects." },
      { item:"Finance Department quarterly update", body:"Finance Director Sam reported the department recently welcomed a new financial analyst for payroll and is now fully staffed. Accomplishments include quarterly closeouts with departments, countywide training on budget reports, W-2 processing addressing the 'big beautiful bill' overtime tax changes, 1099 processing, random cash audits (all successful), and continued budget meetings with larger departments. Upcoming work includes payroll budget preparation, policy updates for accounts receivable and fixed assets, and first quarter closeout by May 31st with monthly closeouts thereafter. County Administrator Lance publicly thanked Sam and her team for extensive work on year-end processing." },
      { item:"County Treasurer update", body:"Treasurer Connie reported on tax collections monitoring, attendance at eviction hearings and sheriff sales, year-end procedures closing 2024 tax year, and distribution of February settlement payments. 1,582 delinquent tax notice letters were mailed in March, down from 1,786 last year. Significant discussion addressed lottery credit processing issues with municipalities, receiving errors by municipal treasurers, and plans for training with Transcendent (Ascent Land Records). Vice Chair Marshall asked about resources for struggling taxpayers; Connie noted they direct veterans to veteran services, suggest family assistance or loans, and no longer offer payment agreements due to high default rates. Administrator Lance clarified evictions discussed are county tax deed process evictions, not general evictions." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Disallowed claim from Mercedes Holmes regarding child death",
      "Set revised minimum sale prices for two parcels: $9,000 for 529 Mullen Street and $7,500 for 738 South 3rd Avenue",
      "Approved Resolution R20-2026 for carry forward funds to 2026 budget",
      "Approved resolution to amend capital assets threshold from $5,000 to $10,000 for county board consideration",
      "Finance to provide Register of Deeds redaction fund history and potential repurposing options at future meeting",
      "National Insurance Services to provide healthcare cost update prior to budget assumptions development",
      "Finance to bring recommendation to increase social services reserve account above current $400,000",
      "County Treasurer to work with DOR and Transcendent on municipal treasurer training for lottery credits and tax receiving",
      "Next committee meeting scheduled for April 8th",
    ],
  },
  {
    id: "SmPTqfCDN1M", source: "weston",
    title: "Special Board of Trustees Meeting",
    date: "April 13, 2026", shortDate: "APR 13",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=SmPTqfCDN1M",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04132026-1902",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, this special meeting of the Village of Weston Board of Trustees was scheduled to address a single time-sensitive matter: the termination of Tax Increment Financing District #1, which was created in 1998. The resolution needed consideration before the April 15th state deadline for notifying the Department of Revenue about TIF closures.",
    agenda: [
      { time:"N\/A", item:"Resolution No. 2026-009: A Resolution Terminating the Village of Weston Tax Increment Financing District (TID) #1" },
    ],
    discussions: [
      { item:"Resolution No. 2026-009: TID #1 Termination", body:"The Board was scheduled to consider terminating Tax Increment Financing District #1, which was originally created on March 30, 1998. According to the supporting documentation, staff confirmed sufficient funds were available to close the TIF after final costs for large street projects were determined, with outstanding expenses totaling approximately $10.9 million including bond payments, administration costs, grant payments, and road maintenance. The resolution was expected to authorize the Village Clerk to notify the Wisconsin Department of Revenue and the Village Treasurer to distribute any excess increment to affected taxing districts." },
    ],
    publicComment: "Public comment period was included on the agenda, allowing up to three minutes per person for non-agenda items.",
    actionItems: [
      "Scheduled to vote on Resolution No. 2026-009 terminating TIF District #1",
      "Expected to authorize notification to the Wisconsin Department of Revenue regarding TIF termination",
      "Expected to authorize distribution of excess increment to affected taxing districts",
    ],
  },
  {
    id: "NLyxmmKbH8M", source: "weston",
    title: "Public Works Committee",
    date: "April 13, 2026", shortDate: "APR 13",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=NLyxmmKbH8M",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04132026-1902",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, this special meeting of the Village of Weston Board of Trustees was scheduled to address the termination of Tax Increment Financing District #1, which was created in 1998. This action was time-sensitive due to a state-mandated April 15th deadline for notifying the Department of Revenue about TIF closures.",
    agenda: [
      { time:"5:45 p.m.", item:"Public Comments - opportunity for residents to address the Board on non-agenda items for up to three minutes" },
      { time:"N\/A", item:"Resolution No. 2026-009: A Resolution Terminating the Village of Weston Tax Increment Financing District (TID) #1" },
    ],
    discussions: [
      { item:"Resolution No. 2026-009: TID #1 Termination", body:"The Board was scheduled to consider terminating Tax Increment Financing District #1, which was originally created on March 30, 1998. According to the agenda materials, staff confirmed sufficient funds are available to close the district, with outstanding expenses including $9,828,000 in principal payment on a 2017A Lease Revenue Bond, $367,933 in grant payments, $300,000 for Business Park road maintenance, and administrative costs. The resolution was expected to authorize the Village Clerk to notify the Wisconsin Department of Revenue and the Village Treasurer to distribute any excess increment to affected taxing districts." },
    ],
    publicComment: "Public comment period was scheduled on the agenda, allowing residents up to three minutes to address non-agenda items.",
    actionItems: [
      "Scheduled to vote on Resolution No. 2026-009 terminating TIF District #1",
      "If approved, Village Clerk was expected to be authorized to notify the Wisconsin Department of Revenue and sign the required Final Accounting Submission Date form",
      "If approved, Village Treasurer was expected to be authorized to distribute excess increment to affected taxing districts",
    ],
  },
  {
    id: "Avkx2lxBq_s", source: "weston",
    title: "Plan Commission",
    date: "April 13, 2026", shortDate: "APR 13",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=Avkx2lxBq_s",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04132026-1902",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, this special meeting of the Village of Weston Board of Trustees was scheduled to address the termination of Tax Increment Financing District #1, which was created in 1998. This action was required to meet a state-mandated April 15th deadline for notifying the Department of Revenue about TIF closures.",
    agenda: [
      { time:"5:45 p.m.", item:"Public Comments - opportunity for residents to address the Board on non-agenda items for up to three minutes" },
      { time:"N\/A", item:"Resolution No. 2026-009: A Resolution Terminating the Village of Weston Tax Increment Financing District (TID) #1" },
    ],
    discussions: [
      { item:"Resolution No. 2026-009: TID #1 Termination", body:"The Board was scheduled to consider terminating Tax Increment Financing District #1, which was created on March 30, 1998. According to the agenda materials, sufficient increment was collected to cover outstanding TID project costs totaling approximately $10.88 million, including administration expenses, grant payments, Business Park road maintenance, and bond payments. The resolution was expected to authorize the Village Clerk to notify the Wisconsin Department of Revenue and distribute any excess increment to affected taxing districts." },
    ],
    publicComment: "Public comment period was included on the agenda, allowing residents to address the Board for up to three minutes on non-agenda items.",
    actionItems: [
      "Board was scheduled to vote on Resolution No. 2026-009 to terminate TIF District #1",
      "If approved, Village Clerk was expected to notify the Wisconsin Department of Revenue of the TID termination",
      "Village Clerk was expected to sign the DOR Final Accounting Submission Date form (PE-223)",
      "Village Treasurer was expected to distribute any excess increment to affected taxing districts",
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
    overview: "The Wausau Economic Development Committee met to consider survey results for 1300 Cleveland Avenue land use, a Habitat for Humanity property offer, and two Thomas Street residential development proposals. Vote records do not include specific outcomes, so actual decisions on these agenda items are not confirmed in the official record.",
    agenda: [
      { time:"5:45 PM", item:"Public comment on agenda items" },
      { time:"N\/A", item:"Consideration of March 3, 2026 Regular Economic Development Committee Minutes" },
      { time:"N\/A", item:"Discussion and possible action on survey results from Non-Industrial Land Use Preference Survey for 1300 Cleveland Avenue" },
      { time:"N\/A", item:"Discussion and possible action on property disposition offer to purchase from Habitat for Humanity of Wausau for 921 S. 19th Avenue" },
      { time:"N\/A", item:"Discussion and possible action on Thomas St residential infill Request for Interest (206, 212, 226, and 230 E Thomas St)" },
      { time:"N\/A", item:"Discussion and possible action on Thomas St and McCleary St vacant lots redevelopment (237, 241 and 249 E Thomas St)" },
    ],
    discussions: [
      { item:"Non-Industrial Land Use Preference Survey for 1300 Cleveland Avenue", body:"The committee discussed survey results regarding preferred land uses for the city-owned property at 1300 Cleveland Avenue. Specific vote outcomes are not recorded in the official vote records." },
      { item:"Habitat for Humanity property offer for 921 S. 19th Avenue", body:"The committee considered a property disposition offer to purchase from Habitat for Humanity of Wausau for the property at 921 S. 19th Avenue. Specific vote outcomes are not recorded in the official vote records." },
      { item:"Thomas St residential infill Request for Interest", body:"The committee discussed a Request for Interest for residential infill development at 206, 212, 226, and 230 E Thomas St. Specific vote outcomes are not recorded in the official vote records." },
      { item:"Thomas St and McCleary St vacant lots redevelopment", body:"The committee considered redevelopment proposals for vacant lots at 237, 241 and 249 E Thomas St. Specific vote outcomes are not recorded in the official vote records." },
    ],
    publicComment: "Public comment was on the agenda as the first item, with reading of the City of Wausau Public Comment Statement.",
    actionItems: [
      "Review of 1300 Cleveland Avenue survey results discussed; final action not confirmed in records",
      "Habitat for Humanity offer for 921 S. 19th Avenue under consideration; outcome not confirmed in records",
      "Thomas Street residential infill and vacant lot redevelopment proposals reviewed; outcomes not confirmed in records",
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
    overview: "The Wausau Board of Public Works approved most agenda items including pay estimates totaling over $167,000 for wastewater facility improvements and water treatment plant demolition, but notably failed to approve Pay Estimates #24 and #25 for lead service line replacement with Community Infrastructure Partners. The board also approved contractor licenses and convened in closed session to deliberate on claims.",
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
      { item:"Consideration of Minutes", body:"The board approved the minutes from the March 17, 2026 and March 19, 2026 Regular Board of Public Works meetings. The motion passed." },
      { item:"Open Quotations for Storm Sewer Materials", body:"The board opened quotations for storm sewer materials. No vote was recorded for this item as it was a quotation opening process." },
      { item:"Wausau Wastewater Treatment Facility Screening Improvements: J.F. Ahern Co., Pay Estimate #12", body:"The board approved Pay Estimate #12 for J.F. Ahern Co. in the amount of $104,405.00 for wastewater treatment facility screening improvements. The motion passed." },
      { item:"Pay Estimate #24 and Pay Estimate #25 with Community Infrastructure Partners for lead service line replacement", body:"The board voted to deny Pay Estimates #24 and #25 with Community Infrastructure Partners for the replacement of lead service lines. The motion to approve failed." },
      { item:"2025 Wausau Water Works Asbestos Abatement: Robinson Brothers Environmental, Inc., Final Payment", body:"The board approved the final payment to Robinson Brothers Environmental, Inc. in the amount of $1,000 for asbestos abatement work. The motion passed." },
      { item:"2025 Water Treatment Plant Demo: The MRD Group, Inc., Pay Estimate #2", body:"The board approved Pay Estimate #2 for The MRD Group, Inc. in the amount of $62,272.50 for water treatment plant demolition work. The motion passed." },
      { item:"2025 Street Construction Project A - Randolph Street\/Cherry Street: Haas Sons, Inc., Change Order #2", body:"The board approved contract extensions as outlined in Change Order #2 for Haas Sons, Inc. for the Randolph Street\/Cherry Street construction project. The motion passed." },
      { item:"Portland Cement Concrete Licenses: SD Ellenbecker, Inc., and Lewis Construction, Inc.", body:"The board approved Portland Cement Concrete licenses for SD Ellenbecker, Inc. and Lewis Construction, Inc. The motion passed." },
      { item:"Bituminous Concrete Paving License: Kell Contracting", body:"The board approved a Bituminous Concrete Paving license for Kell Contracting. The motion passed." },
      { item:"Closed Session for Claims Deliberation", body:"The board approved convening in closed session pursuant to Wisconsin State Statute §19.85(1)(g) for the purpose of deliberating on claims. The motion passed." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Pay Estimate #12 of $104,405.00 approved for J.F. Ahern Co. for wastewater facility screening improvements",
      "Pay Estimates #24 and #25 for Community Infrastructure Partners lead service line replacement denied - requires further action",
      "Final payment of $1,000 approved to Robinson Brothers Environmental, Inc. for asbestos abatement",
      "Pay Estimate #2 of $62,272.50 approved for The MRD Group, Inc. for water treatment plant demolition",
      "Change Order #2 contract extensions approved for Haas Sons, Inc. on Randolph Street\/Cherry Street project",
      "Portland Cement Concrete licenses issued to SD Ellenbecker, Inc. and Lewis Construction, Inc.",
      "Bituminous Concrete Paving license issued to Kell Contracting",
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
      { item:"March 3, 2026 Regular Wausau Water Works Commission Minutes", body:"The commission approved the minutes from the March 3, 2026 meeting. The motion passed, though specific vote count and movers were not recorded." },
      { item:"Capital Projects Planning and Initial Discussion", body:"The director presented capital projects planning information for initial discussion. This was a report item with no vote required." },
      { item:"Wastewater Update on Headworks Screening Project, Cherry Street Lift Station Project, and Status of Class A Biosolids from WDNR", body:"The commission received updates on three wastewater-related matters: the Headworks Screening Project, Cherry Street Lift Station Project, and the status of Class A Biosolids from the Wisconsin Department of Natural Resources. No vote was required for this report item." },
      { item:"LSL Replacement Project for 2026", body:"The commission discussed the lead service line replacement project for 2026 and received information on the nationwide cost implications of new regulations. This was a discussion item with no vote recorded." },
      { item:"Corrosion Control Treatment Optimization Study", body:"The commission received a report on the Corrosion Control Treatment Optimization Study that was submitted to the Wisconsin DNR. No vote was required for this informational item." },
      { item:"Influent, Effluent and Biosolids PFAS Testing", body:"The commission discussed updates on PFAS testing for influent, effluent, and biosolids. This was a discussion item with no vote recorded." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Minutes from March 3, 2026 meeting approved",
      "Next meeting scheduled for May 5, 2026 at 11:00 AM",
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
    overview: "The Infrastructure & Facilities Committee approved increased parking restriction signs on S 9th Ave\/S 10th Ave and parking restrictions on N 2nd St (400-600 blocks), while rejecting proposals for broader parking restrictions on S. 9th\/10th Ave area, snow plowing policy changes, special assessments for 2025 street construction, and the city bike rack request form.",
    agenda: [
      { time:"N\/A", item:"Public comment on agenda items" },
      { time:"N\/A", item:"Consideration of March 12, 2026 Regular Infrastructure and Facilities Minutes" },
      { time:"N\/A", item:"Parking restrictions on S. 9th Ave between Thomas Street and Chellis Street, S. 10th Ave between Thomas Street and Chellis Street, and Bopf Street between S. 9th Ave and S. 10th Ave" },
      { time:"N\/A", item:"Increased parking restriction signs on S 9th Ave and\/or S 10th Ave" },
      { time:"N\/A", item:"Snow plowing policy" },
      { time:"N\/A", item:"Final Resolution to levy special assessments for the 2025 Street Construction Projects" },
      { time:"N\/A", item:"Discussion and possible action approving City bike rack request form" },
      { time:"N\/A", item:"Parking Restrictions on N 2nd St: the 400, 500, and 600 blocks" },
      { time:"N\/A", item:"Sherman Street Overlay from 3rd Ave to 8th Ave" },
    ],
    discussions: [
      { item:"March 12, 2026 Regular Infrastructure and Facilities Minutes", body:"The committee approved the minutes from the March 12, 2026 meeting. The motion passed." },
      { item:"Parking restrictions on S. 9th Ave, S. 10th Ave, and Bopf Street area", body:"The committee rejected the proposed parking restrictions on S. 9th Ave between Thomas Street and Chellis Street, S. 10th Ave between Thomas Street and Chellis Street, and Bopf Street between S. 9th Ave and S. 10th Ave. The motion to approve failed." },
      { item:"Increased parking restriction signs on S 9th Ave and\/or S 10th Ave", body:"The committee approved increased parking restriction signage on S 9th Ave and\/or S 10th Ave. The motion passed." },
      { item:"Snow plowing policy", body:"The committee rejected proposed changes to the snow plowing policy. The motion to approve failed." },
      { item:"Final Resolution to levy special assessments for the 2025 Street Construction Projects", body:"The committee rejected the final resolution to levy special assessments for the 2025 Street Construction Projects. The motion to approve failed." },
      { item:"City bike rack request form", body:"The committee rejected the proposed city bike rack request form. The motion to approve failed." },
      { item:"Parking Restrictions on N 2nd St: the 400, 500, and 600 blocks", body:"The committee approved parking restrictions on the 400, 500, and 600 blocks of N 2nd St. The motion passed." },
      { item:"Sherman Street Overlay from 3rd Ave to 8th Ave", body:"This item was a discussion-only item with no action taken. No vote was recorded." },
    ],
    publicComment: "Public comment on agenda items was on the agenda as the first item.",
    actionItems: [
      "Implement increased parking restriction signs on S 9th Ave and\/or S 10th Ave",
      "Implement parking restrictions on N 2nd St in the 400, 500, and 600 blocks",
      "Minutes from March 12, 2026 meeting approved as official record",
    ],
    civicItems: [
      { number:"1", name:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"2", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"March 12, 2026 Regular Infrastructure and Facilities Minutes", votes:[{ motion:"approve", passed:true, initiator:"Tom Neal", seconder:"Sarah Watson", yes:["Chad Henke", "Lou Larson", "Tom Neal", "Michael  Martens", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"Infrastructure&Facilities_DRAFT_03122026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6585)" }], children:[] },
    ] },
      { number:"3", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Parking restrictions on S. 9th Ave between Thomas Street and Chellis Street, S. 10th Ave between Thomas Street and Chellis Street, and Bopf Street between S. 9th Ave and S. 10th Ave.", votes:[{ motion:"approve", passed:false, initiator:"Tom Neal", seconder:"Sarah Watson", yes:["Tom Neal"], no:["Chad Henke", "Lou Larson", "Michael  Martens", "Sarah Watson"], abstain:[] }], docs:[{ name:"PARKING PETITION 9TH AVE", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6696)" }], children:[] },
      { number:"b", name:"Increased parking restriction signs on S 9th Ave and\/or S 10th Ave", votes:[{ motion:"approve", passed:true, initiator:"Lou Larson", seconder:"Tom Neal", yes:["Chad Henke", "Lou Larson", "Tom Neal", "Michael  Martens", "Sarah Watson"], no:[], abstain:[] }], docs:[], children:[] },
      { number:"c", name:"Snow plowing policy", votes:[{ motion:"approve", passed:false, initiator:"Tom Neal", seconder:"Michael  Martens", yes:["Chad Henke", "Lou Larson", "Tom Neal", "Michael  Martens", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"Map - Highland Park Blvd to  McIndoe St", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6703)" }, { name:"Center blvd streets plowing options", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6704)" }, { name:"plowing boulevards recommendation", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6705)" }], children:[] },
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
    id: "u8VS0_4xkeg", source: "wausau",
    title: "Wausau Board of Public Works Meeting",
    date: "April 14, 2026", shortDate: "APR 14",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=u8VS0_4xkeg",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2293/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Board of Public Works approved storm sewer material purchases from three vendors and acted on seven claims filed against the City, denying six and approving one subrogated claim for $6,266.21. The board also opened statements of qualifications for real estate services on two state highway projects.",
    agenda: [
      { time:"N\/A", item:"April 8, 2026 Regular Board of Public Works Minutes" },
      { time:"N\/A", item:"Make recommendation for Storm Sewer Materials" },
      { time:"N\/A", item:"Open Statement of Qualifications for Real Estate Services, STH 52 (East Wausau Avenue) Project ID 6999-00-23" },
      { time:"N\/A", item:"Open Statement of Qualifications for Real Estate Services, Bus. 51 (Grand Avenue) Project ID 6999-02-20" },
      { time:"N\/A", item:"Discussion and possible action regarding claims filed with City" },
    ],
    discussions: [
      { item:"April 8, 2026 Regular Board of Public Works Minutes", body:"The board approved the minutes from the April 8, 2026 regular meeting. The motion passed." },
      { item:"Make recommendation for Storm Sewer Materials", body:"The board approved the purchase of storm sewer materials from three vendors: concrete items from County Materials, erosion control materials from Volm, and rings, HDPE pipe and castings from Ferguson. The motion passed." },
      { item:"Open Statement of Qualifications for Real Estate Services, STH 52 (East Wausau Avenue) Project ID 6999-00-23", body:"The board opened statements of qualifications for real estate services related to the STH 52 project. No vote was recorded for this procedural item." },
      { item:"Open Statement of Qualifications for Real Estate Services, Bus. 51 (Grand Avenue) Project ID 6999-02-20", body:"The board opened statements of qualifications for real estate services related to the Business 51 Grand Avenue project. No vote was recorded for this procedural item." },
      { item:"Claims filed with City", body:"The board acted on seven claims. One subrogated claim from Patricia Tikalsky for $6,266.21 was approved. Six claims were denied: Scott Hagen ($52.41), Michael Kittelson ($103.93), Sabrina Steppert ($301.47), Alesandra Alanis ($4,866.60), and Jackie Lucht ($781.50). All motions passed." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Purchase concrete items from County Materials for storm sewer project",
      "Purchase erosion control materials from Volm",
      "Purchase rings, HDPE pipe and castings from Ferguson",
      "Process approved subrogated claim payment of $6,266.21 to Patricia Tikalsky",
      "Notify denied claimants of board decisions",
      "Review submitted statements of qualifications for STH 52 and Bus. 51 real estate services",
    ],
    civicItems: [
      { number:"1", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"April 8, 2026 Regular Board of Public Works Minutes.", votes:[{ motion:"approve", passed:true, initiator:"Vincent Bonino", seconder:"Eric Lindman", yes:["Eric Lindman", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"BoardofPublicWorks_Regular_MinutesDRAFT_04082026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6766)" }], children:[] },
    ] },
      { number:"2", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Make recommendation for Storm Sewer Materials.  (Quotations were opened April 8, 2026.)", votes:[{ motion:"approve purchase of concrete items from County Materials, approve purchase of erosion control materials from Volm, and approve purchase of rings, HDPE pipe and castings from Ferguson", passed:true, initiator:"Eric Lindman", seconder:"Vincent Bonino", yes:["Eric Lindman", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
      { number:"b", name:"Open Statement of Qualifications for Real Estate Services, STH 52 (East Wausau Avenue) Project ID 6999-00-23.", votes:[], docs:[], children:[] },
      { number:"c", name:"Open Statement of Qualifications for Real Estate Services, Bus. 51  (Grand  Avenue) Project ID 6999-02-20.", votes:[], docs:[], children:[] },
      { number:"d", name:"Discussion and possible action regarding claims filed with City.", votes:[{ motion:"deny the claim of Scott Hagen in the amount of $52.41", passed:true, initiator:"Vincent Bonino", seconder:"Eric Lindman", yes:["Eric Lindman", "Vincent Bonino"], no:[], abstain:[] }, { motion:"approve the subrogated claim of Patricia Tikalsky in the amount of $6,266.21", passed:true, initiator:"Vincent Bonino", seconder:"Eric Lindman", yes:["Eric Lindman", "Vincent Bonino"], no:[], abstain:[] }, { motion:"deny the claim of Michael Kittelson in the amount of $103.93", passed:true, initiator:"Vincent Bonino", seconder:"Eric Lindman", yes:["Eric Lindman", "Vincent Bonino"], no:[], abstain:[] }, { motion:"deny the claim of Sabrina Steppert in the amount of $301.47", passed:true, initiator:"Vincent Bonino", seconder:"Eric Lindman", yes:["Eric Lindman", "Vincent Bonino"], no:[], abstain:[] }, { motion:"deny the claim of Alesandra Alanis in the amount of $4,866.60", passed:true, initiator:"Vincent Bonino", seconder:"Eric Lindman", yes:["Eric Lindman", "Vincent Bonino"], no:[], abstain:[] }, { motion:"deny the claim of Jackie Lucht in the amount of $781.50", passed:true, initiator:"Vincent Bonino", seconder:"Eric Lindman", yes:["Eric Lindman", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"Claims 040826", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6755)" }], children:[] },
    ] },
      { number:"3", name:"Adjournment.", votes:[{ motion:"approve", passed:true, initiator:"Eric Lindman", seconder:"Vincent Bonino", yes:["Eric Lindman", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
  {
    id: "z-rkJr4znIM", source: "wausau",
    title: "Wausau Finance Committee Meeting",
    date: "April 14, 2026", shortDate: "APR 14",
    committee: "Finance Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=z-rkJr4znIM",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2003/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Finance Committee approved the issuance of up to $10,560,000 in General Obligation Promissory Notes after defeating motions to postpone. The committee also approved multiple budget amendments, participation in the National Opioid Settlement Agreement, and postponed property purchases on Adolph and Myron Streets to a joint meeting in May.",
    agenda: [
      { time:"N\/A", item:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement" },
      { time:"N\/A", item:"Consideration of the minutes of the preceding meeting(s) - March 24, 2026 Regular Finance Committee Minutes" },
      { time:"N\/A", item:"Approving the authorization for the issuance and establishing parameters for the sale of not to exceed $10,560,000 General Obligation Promissory Notes, Series 2026A" },
      { time:"N\/A", item:"Approving budget amendment for Wausau Water Works 2025 Lead Service Line Replacement project to cover costs not funded by the WDNR subsidized loan" },
      { time:"N\/A", item:"Approving budget amendment for revised carryover of 2025 Project Funds to the 2026 Budget" },
      { time:"N\/A", item:"Approving budget amendment for Wausau Metro Ride for Wausau Area Transit Feasibility Study" },
      { time:"N\/A", item:"Approving of and participating in the Six Remnant Defendants National Opioid Settlement Agreement" },
      { time:"N\/A", item:"Approving 2026 scope of work and budget from GHD Services, Inc. for the Wausau Water Supply Superfund Site" },
      { time:"N\/A", item:"Approving Sole Source Request for the completion of the phase II investigation and ongoing site investigation work from REI Environmental for the former MBX Property located at 201 North 1st Ave" },
      { time:"N\/A", item:"Approving Fixed Price Product & Services Maintenance Support Agreement with GMV Syncromatics Corp. for CAD\/AVL at Metro Ride" },
      { time:"N\/A", item:"Approving amendment to the Procurement Policy" },
      { time:"N\/A", item:"Approving 2026 Community Development Block Grant program year allocation" },
      { time:"N\/A", item:"Considering purchasing properties at 108 Adolph Street, 112 Adolph Street, 112-1\/2 Adolph Street and 233 Myron Street for Public Works Streets Division" },
      { time:"N\/A", item:"Closed Session for deliberating property purchases" },
      { time:"N\/A", item:"Update on the 2026 Lead Service Line Replacement project and funding allocations" },
    ],
    discussions: [
      { item:"March 24, 2026 Regular Finance Committee Minutes", body:"The minutes were approved 5-0. Sarah Watson moved and Vicki Tierney seconded the motion." },
      { item:"General Obligation Promissory Notes, Series 2026A", body:"The committee approved the authorization for issuance of up to $10,560,000 in General Obligation Promissory Notes after a contentious discussion. A motion to postpone consideration to the next meeting failed, as did a motion to call the question, before the authorization ultimately passed." },
      { item:"Wausau Water Works 2025 Lead Service Line Replacement budget amendment", body:"The budget amendment to cover costs not funded by the WDNR subsidized loan was approved." },
      { item:"Revised carryover of 2025 Project Funds to 2026 Budget", body:"The budget amendment for revised carryover of 2025 project funds was approved." },
      { item:"Wausau Metro Ride Transit Feasibility Study", body:"The budget amendment for the Wausau Area Transit Feasibility Study was approved after a motion to postpone to the next meeting failed." },
      { item:"Six Remnant Defendants National Opioid Settlement Agreement", body:"The committee approved participation in the National Opioid Settlement Agreement." },
      { item:"GHD Services 2026 scope of work for Wausau Water Supply Superfund Site", body:"The 2026 scope of work and budget from GHD Services, Inc. for the Superfund Site was approved." },
      { item:"REI Environmental Sole Source Request for former MBX Property", body:"The sole source request for REI Environmental to complete phase II investigation and ongoing site investigation work at 201 North 1st Ave was approved." },
      { item:"GMV Syncromatics Corp. Maintenance Support Agreement", body:"The Fixed Price Product & Services Maintenance Support Agreement for CAD\/AVL at Metro Ride was approved." },
      { item:"Procurement Policy amendment", body:"The amendment to the Procurement Policy was approved." },
      { item:"2026 Community Development Block Grant allocation", body:"The 2026 CDBG program year allocation was approved." },
      { item:"Property purchases on Adolph Street and Myron Street", body:"The committee voted to postpone consideration of purchasing properties at 108 Adolph Street, 112 Adolph Street, 112-1\/2 Adolph Street and 233 Myron Street to the second meeting in May as a joint meeting with the Infrastructure & Facilities Committee." },
      { item:"Update on 2026 Lead Service Line Replacement project", body:"This was a discussion item providing an update on the 2026 Lead Service Line Replacement project and funding allocations. No vote was taken as this was informational." },
    ],
    publicComment: "Public comment on agenda items was on the agenda as the first item.",
    actionItems: [
      "Authorization granted for issuance of up to $10,560,000 General Obligation Promissory Notes, Series 2026A",
      "Budget amendment approved for Wausau Water Works 2025 Lead Service Line Replacement project",
      "Budget amendment approved for 2025 Project Funds carryover to 2026",
      "Budget amendment approved for Wausau Metro Ride Transit Feasibility Study",
      "City to participate in Six Remnant Defendants National Opioid Settlement Agreement",
      "GHD Services 2026 scope of work and budget approved for Superfund Site",
      "REI Environmental sole source request approved for former MBX Property investigation",
      "GMV Syncromatics maintenance support agreement approved for Metro Ride CAD\/AVL",
      "Procurement Policy amendment approved",
      "2026 Community Development Block Grant allocation approved",
      "Property purchases on Adolph and Myron Streets postponed to joint meeting with Infrastructure & Facilities Committee in second meeting of May",
    ],
    civicItems: [
      { number:"1", name:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"2", name:"Consideration of the minutes of the preceding meeting(s).", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[], children:[
      { number:"a", name:"Regular Finance Committee Minutes", votes:[], docs:[{ name:"Finance_Regular_03242026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6650)" }], children:[] },
    ] },
      { number:"3", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Approving the authorizization for the issuance and establishing parameters for the sale of not to exceed $10,560,000 General Obligation Promissory Notes, Series 2026A.", votes:[{ motion:"approve the authorization and issuance", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Michael  Martens", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:["Vicki Tierney"], abstain:[] }, { motion:"postpone consideration of this item to the next meeting", passed:false, initiator:"Vicki Tierney", seconder:"Becky McElhaney", yes:["Vicki Tierney"], no:["Michael  Martens", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], abstain:[] }, { motion:"call the question", passed:false, initiator:"", seconder:"", yes:[], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6629)" }, { name:"Pre Sale Report - Wausau Series 2026A", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6720)" }, { name:"Municipal Information Questionnaire - Wausau Series 2026A", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6752)" }, { name:"Resolution 26-0411", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6751)" }], children:[] },
      { number:"b", name:"Approving budget amendment for Wausau Water Works 2025 Lead Service Line Replacement project to cover costs not funded by the WDNR subsidized loan.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6625)" }, { name:"WDNR LSL Funding Non-Construction Costs Determination", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6627)" }, { name:"Resolution", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6754)" }], children:[] },
      { number:"c", name:"Approving budget amendment for revised carryover of 2025 Project Funds to the 2026 Budget.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Resolution 25-1109B", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6742)" }, { name:"Exhibit A", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6719)" }], children:[] },
      { number:"d", name:"Approving budget amendment for Wausau Metro Ride for Wausau Area Transit Feasibility Study", votes:[{ motion:"approve the feasibility study for Wausau Metro Ride", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }, { motion:"postpone consideration of this item to the next meeting", passed:false, initiator:"Vicki Tierney", seconder:"Aaron Griner", yes:[], no:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], abstain:[] }], docs:[{ name:"Metro Ride Feasibility Study Contract", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6747)" }, { name:"Resolution 26-0306", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6743)" }, { name:"Appendix A", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6744)" }, { name:"Appendix B", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6745)" }, { name:"Appendix C", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6746)" }], children:[] },
      { number:"e", name:"Approving of and participating in the Six Remnant Defendants National Opioid Settlement Agreement.", votes:[{ motion:"approve participate in the settlement agreement", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6741)" }, { name:"Six Remnant Defendants National Opioid Settlement Overview", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6624)" }, { name:"Six Remnant Defendants National Opioid Participation and Release Form", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6622)" }, { name:"Notice of New National Opioid Settlement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6623)" }], children:[] },
      { number:"f", name:"Approving 2026 scope of work and budget from GHD Services, Inc. for the Wausau Water Supply Superfund Site.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"GHD Services Inc. Scope of Services", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6647)" }], children:[] },
      { number:"g", name:"Approving Sole Source Request for the completion of the phase II investigation and ongoing site investigation work from REI Environmental for the former MBX Property located at 201 North 1st Ave, DNR BRRTS # 02-37-598480.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Sole Source Request", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6649)" }, { name:"REI Site Investigation Proposal - Wausau MBX Property 201 N. 1st Avenue Phase II  Investigation and Ongoing Site Work", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6648)" }], children:[] },
      { number:"h", name:"Approving Fixed Price Product & Services Maintenance Support Agreement with GMV Syncromatics Corp. for CAD\/AVL at Metro Ride.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"GMV Contract Part 1", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6768)" }, { name:"GMV Contract Part 2", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6769)" }, { name:"Resolution 26-4010", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6772)" }], children:[] },
      { number:"i", name:"Approving amendment to the Procurement Policy.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Proposed Procurement Policy 03\/2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6738)" }, { name:"Resolution DRAFT", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6737)" }], children:[] },
      { number:"j", name:"Approving 2026 Community Development Block Grant program year allocation.", votes:[{ motion:"approve the CDBG program year allocation", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6748)" }, { name:"2026 Community Development Block Grant Allocations", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6749)" }, { name:"Application for Federal Assistance SF-424", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6753)" }], children:[] },
      { number:"k", name:"Considering purchasing the following properties adding additional land to the Department of Public Works Streets Division:&nbsp; 108 Adolph Street, 112 Adolph Street, 112-1\/2 Adolph Street and 233 Myron Street.", votes:[{ motion:"postpone consideration of this item to the second meeting in May with a joint meeting with the Infrastructure & Facilities Committee", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6630)" }, { name:"Infrastructure&Facilities_Regular_12112025_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6631)" }, { name:"Infrastructure&Facilities_Regular_02122026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6634)" }, { name:"233 Myron Street Phase I", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6635)" }, { name:"Site Map", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6633)" }, { name:"Considering Property Purchases by the Wausau Department of Public Works", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6632)" }], children:[] },
    ] },
      { number:"4", name:"Closed Session.", votes:[], docs:[], children:[
      { number:"a", name:"Adjourn to Closed Session&nbsp;pursuant to Wisconsin State Statute § 19.85(1)(e) for deliberating or negotiating the purchasing of public properties, the investing of public funds, or conducting other specified public business, whenever competitive or bargaining reasons require a closed session, for the purpose of purchasing the following properties adding additional land to the Department of Public Works Streets Division: 108 Adolph Street, 112 Adolph Street, 112-1\/2 Adolph Street and 233 Myron Street.", votes:[], docs:[], children:[] },
    ] },
      { number:"5", name:"Reconvene into Open Session, if necessary, to take action on Closed Session items.", votes:[], docs:[], children:[] },
      { number:"6", name:"Discussion.", votes:[], docs:[], children:[
      { number:"a", name:"Update on the 2026 Lead Service Line Replacement project and funding allocations.", votes:[], docs:[{ name:"American Water Works Association - Beyond the Replacement Era: Balancing Compounding Infrastructure Needs with Household Affordability", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6684)" }], children:[] },
    ] },
      { number:"7", name:"Adjournment.", votes:[{ motion:"adjourn", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
  {
    id: "nhvnLLNPcqI", source: "wausau",
    title: "Wausau City Council Meeting",
    date: "April 14, 2026", shortDate: "APR 14",
    committee: "City Council", duration: "~1h",
    url: "https://www.youtube.com/watch?v=nhvnLLNPcqI",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/1964/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Common Council approved a consent agenda 10-1 containing multiple resolutions including bikeshare program expansion, a solar group buy partnership, and property sale to Habitat for Humanity. A resolution for an unlawful tax claim recovery failed, and the 2026 Summer Hours Program was referred back to the Human Resources Committee after failing its initial vote.",
    agenda: [
      { time:"N\/A", item:"Mayor's Monarch Proclamation" },
      { time:"N\/A", item:"Comments and suggestions from preregistered citizens" },
      { time:"N\/A", item:"Consent agenda including Bikeshare Program expansion, repeal of hand-held mobile device ordinance, various licenses, State\/Municipal Financial Agreement for Business 51, Grow Solar Central Wisconsin MOU, Grand Avenue Signal Replacements project plat, airport ground leases, and Habitat for Humanity property sale" },
      { time:"N\/A", item:"Resolution Approving Utility Easement with Beacon Resources LLC at 731 N 1st Street" },
      { time:"N\/A", item:"Confirming Appointments to Wausau Arts Commission and Airport Committee" },
      { time:"N\/A", item:"Resolution Approving Alleged Claim for Recovery of Unlawful Tax for Green Acres at Greenwood Hills, LLC - Outlot 1" },
      { time:"N\/A", item:"Resolution Adopting 2025 Budget Modification to Transfer $494,000 to Recycling Fund, Airport Fund, and Parking Fund" },
      { time:"N\/A", item:"Suspend Rule 1(D) Transmission of Committee business to the Council" },
      { time:"N\/A", item:"Resolution Adopting 2026 Budget Modification for Carryover of Funds from 2025 to 2026" },
      { time:"N\/A", item:"Resolution Adopting 2025 Budget Modification for Wausau Water Works Lead Service Line Replacement Project" },
      { time:"N\/A", item:"Resolution Adopting 2025 Budget Modification for Wausau Metro Ride Transit Feasibility Study" },
      { time:"N\/A", item:"Resolution Approving Maintenance Support Agreement with GMV Syncromatics Corp. for CAD\/AVL at Metro Ride" },
      { time:"N\/A", item:"Resolution Approving Participation in Six Remnant Defendants National Opioid Settlement Agreement" },
      { time:"N\/A", item:"Resolution Approving 2026 Summer Hours Program" },
      { time:"N\/A", item:"Resolution Authorizing Issuance of Not to Exceed $10,560,000 General Obligation Promissory Notes, Series 2026A" },
    ],
    discussions: [
      { item:"Consent Agenda", body:"Approved 10-1, moved by Sarah Watson and seconded by Tom Neal. Vicki Tierney cast the sole dissenting vote. The consent agenda included resolutions for bikeshare program sponsorship, repealing the hand-held mobile device driving ordinance, the Grow Solar Central Wisconsin partnership with MREA, Grand Avenue signal replacement project plat, airport ground leases, and sale of city property at 921 S. 19th Avenue to Habitat for Humanity." },
      { item:"Utility Easement with Beacon Resources LLC at 731 N 1st Street", body:"Approved by the Council. Specific vote count was not recorded in the official records." },
      { item:"Confirming Appointments to Wausau Arts Commission and Airport Committee", body:"Approved by the Council. Specific vote count was not recorded in the official records." },
      { item:"Alleged Claim for Recovery of Unlawful Tax for Green Acres at Greenwood Hills, LLC - Outlot 1", body:"Failed. The resolution from the Finance Committee was rejected by the Council. Specific vote count was not recorded." },
      { item:"2025 Budget Modification to Transfer $494,000 to Recycling Fund, Airport Fund, and Parking Fund", body:"Approved by the Council. Specific vote count was not recorded in the official records." },
      { item:"Suspend Rule 1(D) Transmission of Committee business to the Council", body:"Approved 8-3, moved by Sarah Watson and seconded by Michael Martens. Terry Kilian, Vicki Tierney, and Aaron Griner voted against the motion." },
      { item:"2026 Budget Modification for Carryover of Funds from 2025 to 2026", body:"Approved by the Council. Specific vote count was not recorded in the official records." },
      { item:"2025 Budget Modification for Wausau Water Works Lead Service Line Replacement Project", body:"Approved by the Council to cover costs not funded by the WDNR subsidized loan. Specific vote count was not recorded." },
      { item:"2025 Budget Modification for Wausau Metro Ride Transit Feasibility Study", body:"Approved by the Council. Specific vote count was not recorded in the official records." },
      { item:"Maintenance Support Agreement with GMV Syncromatics Corp. for CAD\/AVL at Metro Ride", body:"Approved by the Council for the fixed price product and services agreement. Specific vote count was not recorded." },
      { item:"Six Remnant Defendants National Opioid Settlement Agreement", body:"Approved by the Council, allowing the city to participate in the national opioid settlement. Specific vote count was not recorded." },
      { item:"2026 Summer Hours Program", body:"The initial vote to approve failed. A subsequent motion to refer the resolution back to the Human Resources Committee passed." },
      { item:"General Obligation Promissory Notes, Series 2026A", body:"On the agenda authorizing issuance of up to $10,560,000 in notes. Vote outcome was not recorded in the official records." },
    ],
    publicComment: "Public comment was on the agenda both before the business meeting (preregistered citizens) and after the business meeting.",
    actionItems: [
      "Bikeshare program expansion to proceed with securing sponsorship funds",
      "Wausau Municipal Code Section 10.01.012 on hand-held mobile devices while driving repealed",
      "MOU with Midwest Renewable Energy Association for Grow Solar Central Wisconsin Group Buy Program approved",
      "State\/Municipal Financial Agreement for Business 51 Stewart Avenue to County Highway U approved",
      "Property at 921 S. 19th Avenue to be sold to Habitat for Humanity of Wausau",
      "2025 budget modifications approved for Water Works lead service line replacement and Metro Ride transit feasibility study",
      "City to participate in Six Remnant Defendants National Opioid Settlement Agreement",
      "2026 Summer Hours Program referred back to Human Resources Committee for further review",
      "Airport ground leases approved for Wynn O Jones and Cole Lundberg",
    ],
    civicItems: [
      { number:"1", name:"Call to order by the presiding officer.", votes:[], docs:[], children:[] },
      { number:"2", name:"Pledge of Allegiance, and Roll Call and Proclamations.", votes:[], docs:[], children:[
      { number:"", name:"Mayor's Monarch Proclamation", votes:[], docs:[{ name:"Mayors Monarch Proclamation", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6730)" }], children:[] },
    ] },
      { number:"3", name:"Reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"4", name:"Comments and suggestions from preregistered citizens.", votes:[], docs:[], children:[] },
      { number:"5", name:"Consent agenda.", votes:[{ motion:"Approve", passed:true, initiator:"Sarah Watson", seconder:"Tom Neal", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Sarah Watson", "Lou Larson", "Aaron Griner", "Lisa Rasmussen", "Becky McElhaney ", "Chad Henke"], no:["Vicki Tierney"], abstain:[] }], docs:[], children:[
      { number:"", name:"Joint Resolution from the Infrastructure & Facilities Committee and the Bicycle & Pedestrian Advisory Committee to Approve Securing Sponsorship Funds for the Wausau Bikeshare Program to Expand the Program.", votes:[], docs:[{ name:"Infrastructures&Facilities_Regular_Minutes_02122026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6583)" }, { name:"BPAC_20260126_Minutes_FINAL", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6582)" }, { name:"2026 Wausau Bikeshare Sponsorship Ask", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6580)" }, { name:"Bikeshare Expansion Report", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6577)" }, { name:"Existing and Potential Bike Share Locations - Wausau", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6579)" }, { name:"Rentals Active Users: Wausau Rides 2025", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6578)" }], children:[] },
      { number:"", name:"Ordinance from the Public Health and Safety Committee Repealing Wausau Municipal Code Section 10.01.012 Use of Hand-Held Mobile Telephones and Mobile Electronic Devices While Driving Prohibited.", votes:[], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6642)" }, { name:"Wausau Municipal Code 10.01.012", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6644)" }], children:[] },
      { number:"", name:"Resolution from the Public Health & Safety Committee Approving or Denying Various Licenses as Indicated.", votes:[], docs:[{ name:"License List", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6621)" }], children:[] },
      { number:"", name:"Resolution from the Infrastructure & Facilities Committee Approving the State\/Municipal Financial Agreement for Business 51 Stewart Avenue to County Highway U.", votes:[], docs:[{ name:"State\/Municipal Financial Agreement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6571)" }, { name:"Infrastructure&Facilities_Regular_02122026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6734)" }, { name:"Bus 51 Map", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6572)" }], children:[] },
      { number:"", name:"Joint Resolution from the Public Health & Safety Committee and the Sustainability, Energy, & Environment Committee for a Memorandum of Understanding between the City of Wausau and the Midwest Renewable Energy Association (MREA) to Partner in the Operation of the Grow Solar Central Wisconsin Group Buy Program.", votes:[], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6575)" }, { name:"SEEC_20260305_MinutesDRAFT", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6576)" }, { name:"PublicHealth&Safety_Regular_03232026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6739)" }], children:[] },
      { number:"", name:"Joint Resolution from the Infrastructure & Facilities Committee and Plan Commission for Transportation Project Plat for Project 370-40-40, Grand Avenue Signal Replacements, Sturgeon Eddy Road and Townline Road.", votes:[], docs:[{ name:"Preliminary Transportation Project Plat 3700-40-40_0401 03042026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6586)" }, { name:"Infrastructure&Facilities_DRAFT_03122026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6735)" }], children:[] },
      { number:"", name:"Joint Resolution from the Finance Committee and Airport Committee Approving Consent to Transfer Title to Buildings and Improvements and Waiver of First Right of Refusal to Purchase the Buildings and Improvements, Terminating Airport Ground Lease with Wynn O Jones and Approving Airport Ground Lease with Wynn O Jones – 939 Woods Place.", votes:[], docs:[{ name:"Waiver of First Right of Refusal to Purchase the Building and Improvements at 939 Woods Place", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6691)" }, { name:"Termination of Airport Ground Lease with Wynn O. Jones", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6656)" }, { name:"Airport Ground Lease with Owen Jones for the property located at 939 Woods Place", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6655)" }, { name:"Offer to Purchase", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6658)" }, { name:"Wynn O. Jones Airport Ground Lease", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6657)" }], children:[] },
      { number:"", name:"Joint Resolution from the Finance Committee and Airport Committee Approving Airport Ground Lease with Cole Lundberg.", votes:[], docs:[{ name:"Ground Lease between the City of Wausau and Cole Lundberg", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6672)" }, { name:"Map of Lundberg Hangar", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6673)" }], children:[] },
      { number:"", name:"Resolution from the Economic Development Committee Approving Sale of City Owned Property located at 921 S. 19th Avenue to Habitat for Humanity of Wausau.", votes:[], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6717)" }, { name:"Property Disposition for Redevelopment Application", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6718)" }], children:[] },
    ] },
      { number:"6", name:"Ordinances and resolutions.", votes:[], docs:[], children:[
      { number:"", name:"Resolution from the Infrastructure & Facilities Committee Approving the Utility Easement with Beacon Resources LLC at 731 N 1st Street.", votes:[{ motion:"Approve", passed:true, initiator:"Chad Henke", seconder:"Sarah Watson", yes:["Carol Lukens", "Michael  Martens", "Tom Neal", "Sarah Watson", "Lou Larson", "Aaron Griner", "Lisa Rasmussen", "Becky McElhaney ", "Chad Henke"], no:["Terry Kilian", "Vicki Tierney"], abstain:[] }], docs:[{ name:"Beacon Resources Utility Easement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6695)" }, { name:"4681C Easement Exhibit", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6573)" }, { name:"Infrastructure&Facilities_Regular_02122026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6733)" }], children:[] },
      { number:"", name:"Confirming Appointments of the Mayor of the City of Wausau to the Wausau Arts Commission and the Airport Committee.", votes:[{ motion:"Approve", passed:true, initiator:"Sarah Watson", seconder:"Michael  Martens", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Aaron Griner", "Lisa Rasmussen", "Becky McElhaney ", "Chad Henke"], no:[], abstain:[] }], docs:[], children:[] },
      { number:"", name:"Resolution from the Finance Committee Approving Alleged Claim for Recovery of Unlawful Tax for Green Acres at Greenwood Hills, LLC - Outlot 1.", votes:[{ motion:"Approve", passed:false, initiator:"Michael  Martens", seconder:"Carol Lukens", yes:[], no:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Aaron Griner", "Lisa Rasmussen", "Becky McElhaney ", "Chad Henke"], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6639)" }, { name:"Green Acres Claim for Recovery of Unlawful Tax", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6640)" }], children:[] },
      { number:"", name:"Resolution from the Finance Committee Adopting 2026 Budget Modification to Transfer a Combined Total of $494,000 to the Recycling Fund, Airport Fund, and Parking Fund.", votes:[{ motion:"Approve", passed:true, initiator:"Lisa Rasmussen", seconder:"Tom Neal", yes:["Carol Lukens", "Michael  Martens", "Tom Neal", "Sarah Watson", "Lou Larson", "Aaron Griner", "Lisa Rasmussen", "Becky McElhaney ", "Chad Henke"], no:["Terry Kilian", "Vicki Tierney"], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6724)" }, { name:"General Fund Income Statement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6721)" }], children:[] },
    ] },
      { number:"7", name:"Suspend Rule 1(D) Transmission of Committee business to the Council.", votes:[{ motion:"Approve", passed:true, initiator:"Sarah Watson", seconder:"Michael  Martens", yes:["Carol Lukens", "Michael  Martens", "Tom Neal", "Sarah Watson", "Lou Larson", "Lisa Rasmussen", "Becky McElhaney ", "Chad Henke"], no:["Terry Kilian", "Vicki Tierney", "Aaron Griner"], abstain:[] }], docs:[], children:[
      { number:"", name:"Resolution from the Finance Committee Adopting 2026 Budget Modification for the Carryover of Funds from 2025 to 2026.", votes:[{ motion:"Approve", passed:true, initiator:"Sarah Watson", seconder:"Lisa Rasmussen", yes:["Carol Lukens", "Michael  Martens", "Tom Neal", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Aaron Griner", "Lisa Rasmussen", "Becky McElhaney ", "Chad Henke"], no:["Terry Kilian"], abstain:[] }], docs:[{ name:"Exhibit A", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6646)" }], children:[] },
      { number:"", name:"Resolution from the Finance Committee Adopting 2026 Budget Modification for the Wausau Water Works for 2025 Lead Service Line Replacement Project to Cover Costs Not Funded by the WDNR Subsidized Loan.", votes:[{ motion:"Approve", passed:true, initiator:"Carol Lukens", seconder:"Sarah Watson", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Aaron Griner", "Lisa Rasmussen", "Becky McElhaney ", "Chad Henke"], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6726)" }, { name:"WDNR LSL Funding Non-Construction Costs Determination", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6727)" }], children:[] },
      { number:"", name:"Resolution from the Finance Committee Adopting 2026 Budget Modification for Wausau Metro Ride for Wausau Area Transit Feasibility Study.", votes:[{ motion:"Approve", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Carol Lukens", "Michael  Martens", "Tom Neal", "Sarah Watson", "Aaron Griner", "Lisa Rasmussen", "Becky McElhaney ", "Chad Henke"], no:["Terry Kilian", "Vicki Tierney", "Lou Larson"], abstain:[] }], docs:[{ name:"Metro Ride Feasibility Study Contract", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6482)" }, { name:"Appendix C", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6483)" }, { name:"Appendix B", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6484)" }, { name:"Appendix A", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6485)" }], children:[] },
      { number:"", name:"Resolution from the Finance Committee Approving Fixed Price Product & Services Maintenance Support Agreement with GMV Syncromatics Corp. for CAD\/AVL at Metro Ride.", votes:[{ motion:"Approve", passed:true, initiator:"Carol Lukens", seconder:"Chad Henke", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Aaron Griner", "Lisa Rasmussen", "Becky McElhaney ", "Chad Henke"], no:[], abstain:[] }], docs:[{ name:"GMV Contract Part 1", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6770)" }, { name:"GMV Contract Part 2", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6771)" }], children:[] },
      { number:"", name:"Resolution from the Finance Committee Approving of and Participating in the Six Remnant Defendants National Opioid Settlement Agreement.", votes:[{ motion:"Approve", passed:true, initiator:"Carol Lukens", seconder:"Sarah Watson", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Aaron Griner", "Lisa Rasmussen", "Becky McElhaney ", "Chad Henke"], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6740)" }, { name:"Six Remnant Defendants National Opioid Settlement Overview", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6699)" }, { name:"Six Remnant Defendants National Opioid Participation and Release Form", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6698)" }, { name:"Notice of New National Opioid Settlement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6697)" }], children:[] },
      { number:"", name:"Resolution from the Human Resources Committee Approving 2026 Summer Hours Program.", votes:[{ motion:"Approve", passed:false, initiator:"Sarah Watson", seconder:"Carol Lukens", yes:[], no:[], abstain:[] }, { motion:"Refer back to Human Resources Committee", passed:true, initiator:"Sarah Watson", seconder:"Lou Larson", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Aaron Griner", "Lisa Rasmussen", "Becky McElhaney ", "Chad Henke"], no:[], abstain:[] }], docs:[{ name:"2026 Summer Hours Program", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6711)" }], children:[] },
      { number:"", name:"Resolution Authorizing the Issuance and Establishing Parameters for the Sale of Not to Exceed $10,560,000 General Obligation Promissory Notes, Series 2026A.", votes:[{ motion:"Approve", passed:true, initiator:"Sarah Watson", seconder:"Michael  Martens", yes:["Carol Lukens", "Michael  Martens", "Tom Neal", "Sarah Watson", "Lou Larson", "Aaron Griner", "Lisa Rasmussen", "Becky McElhaney ", "Chad Henke"], no:["Terry Kilian", "Vicki Tierney"], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6728)" }, { name:"Pre Sale Report - Wausau  Series 2026A", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6729)" }, { name:"Municipal Information Questionnaire - Wausau Series 2026A", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6750)" }], children:[] },
    ] },
      { number:"8", name:"Announcement from Mayor and Alderpersons.", votes:[], docs:[], children:[] },
      { number:"9", name:"Comments and suggestions from citizens present during Public Comment occurring both before and after the business meeting.", votes:[], docs:[], children:[] },
      { number:"10", name:"Adjournment.", votes:[{ motion:"Adjourn", passed:true, initiator:"Chad Henke", seconder:"Lisa Rasmussen", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Aaron Griner", "Lisa Rasmussen", "Becky McElhaney ", "Chad Henke"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
  {
    id: "AoKy_Igwy1I", source: "wausau",
    title: "Wausau City Transit Commission Meeting",
    date: "April 16, 2026", shortDate: "APR 16",
    committee: "Transit Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=AoKy_Igwy1I",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2178/files/agenda/5757",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Transit Commission met to consider several transit matters including bus operator safety legislation, route changes, and a grant application. While multiple items were on the agenda for possible action, the official vote records do not indicate specific vote counts or outcomes for the items discussed.",
    agenda: [
      { time:"N\/A", item:"Public comment on agenda items" },
      { time:"N\/A", item:"Consideration of the minutes of the 2\/19\/2026 meeting" },
      { time:"N\/A", item:"ATU - Bus operator safety and security regarding H.R.6635 requiring safety doors for buses" },
      { time:"N\/A", item:"A route change" },
      { time:"N\/A", item:"I route change" },
      { time:"N\/A", item:"Summer School bus Route 4X" },
      { time:"N\/A", item:"Apply for Grant 5304" },
      { time:"N\/A", item:"Director's Reports including GMV contract update, Feasibility Study update, and WISGO Technology Demo" },
    ],
    discussions: [
      { item:"Minutes of 2\/19\/2026 meeting", body:"The minutes from the February 19, 2026 meeting were on the agenda for consideration. The vote records do not indicate the specific outcome or vote count." },
      { item:"ATU - Bus operator safety and security", body:"The Commission discussed the Amalgamated Transit Union's request to sign a letter supporting H.R.6635, federal legislation requiring safety doors on all buses built 2 years after enactment. The item was on the agenda for possible action, but specific vote outcome is not recorded." },
      { item:"A route change", body:"A route change was on the agenda for discussion and possible action. The specific details and outcome are not indicated in the vote records." },
      { item:"I route change", body:"An I route change was on the agenda for discussion and possible action. The specific details and outcome are not indicated in the vote records." },
      { item:"Summer School bus Route 4X", body:"The Summer School bus Route 4X was on the agenda for discussion and possible action. The specific outcome is not indicated in the vote records." },
      { item:"Apply for Grant 5304", body:"An application for Grant 5304 was on the agenda for discussion and possible action. The specific outcome is not indicated in the vote records." },
      { item:"Director's Reports", body:"Director's reports included updates on the GMV contract, the Feasibility Study, and announcement of a WISGO Technology Demo scheduled for May 7th. These were informational items not requiring formal action." },
    ],
    publicComment: "Public comment on agenda items was included on the agenda with reading of the City of Wausau Public Comment Statement.",
    actionItems: [
      "WISGO Technology Demo scheduled for May 7th",
      "Continued work on GMV contract and Feasibility Study as reported by Director",
    ],
    civicItems: [
      { number:"1", name:"Call to order by the presiding officer.", votes:[], docs:[], children:[] },
      { number:"2", name:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"3", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"2.19.2026 Minutes", votes:[], docs:[{ name:"TRANSIT 2.19.2026 Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6774)" }], children:[] },
    ] },
      { number:"4", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"ATU - Bus operator safety and security. ATU is asking us to sign H.R.6635, a bill to require safety doors for all buses built  2 years after enactment.looking for permission to sign a letter to congressional leaders, urging them to provide for the bus operator's safety and support the legislation.", votes:[], docs:[{ name:"LEGIS_HR6635_EmployerFlyer", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6756)" }, { name:"HR 6635 Bus Operator Safety & Security Act", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6757)" }, { name:"AROWGuard-Cockpit-Flyer", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6758)" }], children:[] },
      { number:"b", name:"A route change", votes:[], docs:[{ name:"Abel Route Change", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6759)" }, { name:"Able Route Change 1", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6760)" }], children:[] },
      { number:"c", name:"I route change", votes:[], docs:[], children:[] },
      { number:"d", name:"Summer School bus Route 4X", votes:[], docs:[], children:[] },
      { number:"e", name:"Apply for Grant 5304", votes:[], docs:[{ name:"WausauMPO_5304_grant_request_form", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6761)" }, { name:"5307 grant application", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6762)" }], children:[] },
    ] },
      { number:"5", name:"Director's Reports.", votes:[], docs:[], children:[
      { number:"a", name:"GMV contract UpdateFeasibility Study UpdateWISGO Technology Demo scheduled May 7th", votes:[], docs:[], children:[] },
    ] },
      { number:"6", name:"Adjournment.", votes:[], docs:[], children:[] },
    ],
  },
  {
    id: "KUrdpt6ntZ4", source: "marathon",
    title: "Marathon County Human Resources, Finance, and Property Committee Meeting",
    date: "April 8, 2026", shortDate: "APR 8",
    committee: "Marathon County Human Resources, Finance, and Property Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=KUrdpt6ntZ4",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18191/639107264317430000",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, the Marathon County Human Resources, Finance, and Property Committee was scheduled to meet on April 8, 2026. Specific agenda details were not provided in the source document, limiting the ability to summarize the topics scheduled for discussion.",
    agenda: [
      { time:"N\/A", item:"Agenda details not available in provided document" },
    ],
    discussions: [
      { item:"Agenda Content Unavailable", body:"The specific agenda items were not included in the provided source material. The full agenda packet is available at the Marathon County website link provided." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Specific action items not available - full agenda packet available at marathoncounty.gov",
    ],
  },
  {
    id: "9MsG0RUdc_c", source: "marathon",
    title: "Marathon County Executive Committee Meeting",
    date: "April 9, 2026", shortDate: "APR 9",
    committee: "Executive Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=9MsG0RUdc_c",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18187/639107217429146731",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, the Marathon County Executive Committee was scheduled to meet on April 9, 2026. Without access to the detailed agenda document, specific items to be addressed cannot be confirmed, but the Executive Committee typically handles administrative oversight, policy recommendations, and coordination between county departments.",
    agenda: [
      { time:"N\/A", item:"Agenda details not available - document link provided but content not accessible" },
    ],
    discussions: [
      { item:"Executive Committee Business", body:"The committee was scheduled to convene for its regular meeting. Specific discussion items were listed in the linked agenda packet but the detailed content was not provided in the source material." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Specific action items were scheduled as outlined in the full agenda packet available at the county website",
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
    overview: "Based on the published agenda, this Committee of the Whole meeting was scheduled to address several significant items including a referendum budget update, new facility fees for artificial fields, and an extensive policy review covering over 60 district policies. The Board was expected to consider action on the Wisconsin School Nutrition Purchasing Cooperative membership renewal, facility fee amendments, and comprehensive NEOLA policy updates addressing topics from artificial intelligence to child abuse reporting under Act 57.",
    agenda: [
      { time:"N\/A", item:"Call to Order" },
      { time:"N\/A", item:"Approve the Minutes" },
      { time:"N\/A", item:"Audit of the Bills" },
      { time:"N\/A", item:"Excellence in Action: Stettin Elementary" },
      { time:"N\/A", item:"Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP) (Action Requested)" },
      { time:"N\/A", item:"Facility Fees (Action Requested)" },
      { time:"N\/A", item:"Referendum Budget Update" },
      { time:"N\/A", item:"NEOLA UPDATE (Action Requested)" },
      { time:"N\/A", item:"Adjourn" },
    ],
    discussions: [
      { item:"Excellence in Action: Stettin Elementary", body:"The meeting was scheduled to include a recognition segment highlighting Stettin Elementary School as part of the district's Excellence in Action program." },
      { item:"Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP)", body:"The Wausau School District Nutrition Service Department was expected to request approval for continued membership in the Wisconsin School Nutrition Purchasing Cooperative for the 2026-2027 school year. This presentation was estimated to take 5 minutes and involved renewal of the Co-op's resolution agreement." },
      { item:"Facility Fees", body:"Ryan Urmanski, Director of Buildings and Grounds, was scheduled to present information to amend the current Wausau School District Facility Use Fee Schedule. The presentation, estimated at 10 minutes, was expected to address costs for use of artificial fields and field lighting for requested events, with immediate implementation sought if approved." },
      { item:"Referendum Budget Update", body:"Elizabeth Channel, Interim Assistant Superintendent of Operations, was scheduled to share an update on the status of the Referendum Budget. This presentation was estimated to take 10 minutes and included a memo summarizing the referendum budget status." },
      { item:"NEOLA UPDATE", body:"The Committee was scheduled to spend approximately 20 minutes reviewing proposed changes to district policies through NEOLA. The update covered a wide range of policies including definitions, board member conduct, district administrator relationships, reading instruction goals, cell phones, academic honesty, artificial intelligence, school support organizations, child abuse and neglect reporting under Act 57, and numerous technical corrections. Some suggested changes were noted as minor technical corrections while others were more substantial." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Action was requested for approval of the Wisconsin School Nutrition Purchasing Cooperative Agreement for the 2026-2027 school year",
      "Action was requested to amend the Facility Use Fee Schedule for artificial fields and field lighting with immediate implementation",
      "Action was requested for approval of NEOLA policy updates covering over 60 policies including board governance, student conduct, financial management, and Act 57 child welfare provisions",
    ],
  },
  {
    id: "bb_739874", source: "school_board",
    title: "Public Meeting",
    date: "April 13, 2026", shortDate: "APR 13",
    committee: "Public Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=739874",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=739874",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, this meeting was scheduled to address the verification of school board election results for the Wausau School District. This procedural meeting appears to have been convened specifically to formally verify the outcomes of the recent school board election, a routine but significant step in the democratic governance process for the district.",
    agenda: [
      { time:"N\/A", item:"Verify School Board Election Results" },
    ],
    discussions: [
      { item:"Verify School Board Election Results", body:"The board was scheduled to review and verify the results of the school board election. This procedural item was expected to confirm the official outcomes and ensure proper certification of the election results for incoming board members." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Board was expected to formally verify and certify the school board election results",
    ],
  },
  {
    id: "bb_738313", source: "school_board",
    title: "Special Meeting",
    date: "April 13, 2026", shortDate: "APR 13",
    committee: "Special Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=738313",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=738313",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, this special meeting of the Wausau School District Board of Education was scheduled to convene in closed session to hold a pupil expulsion hearing. The board was expected to deliberate privately and potentially take action on the expulsion matter, with the possibility of reconvening in open session for further action if necessary.",
    agenda: [
      { time:"N\/A", item:"Call To Order" },
      { time:"N\/A", item:"Closed Session - Pupil Expulsion Hearing pursuant to s. 19.85(1)(a), (f), and (g), and s. 118.125 of Wisconsin Statutes" },
      { time:"N\/A", item:"Adjournment" },
    ],
    discussions: [
      { item:"Closed Session - Pupil Expulsion Hearing", body:"The Board was scheduled to convene in closed session pursuant to Wisconsin Statutes s. 19.85(1)(a), (f), and (g), as well as s. 118.125, to hold a pupil expulsion hearing. The board was expected to deliberate privately at the conclusion of the hearing and was authorized to take action in closed session if necessary and\/or appropriate. Following the closed session, the board was scheduled to reconvene into open session and potentially take further action." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Board was expected to vote on whether to convene in closed session for the pupil expulsion hearing",
      "Board was expected to deliberate and potentially take action on the pupil expulsion matter in closed session",
      "Board was expected to vote on reconvening into open session following closed session deliberations",
    ],
  },
  {
    id: "bb_739586", source: "school_board",
    title: "Regular Meeting",
    date: "April 13, 2026", shortDate: "APR 13",
    committee: "Regular Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=739586",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=739586",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, the Wausau School District Board of Education was scheduled to address multiple action items including capital improvement plans, athletic co-op agreements, facility fee updates, and an extensive policy update covering over 60 district policies. The meeting was also expected to include recognition presentations for WAVE and South Mountain Elementary, as well as a closed session regarding contract non-renewals.",
    agenda: [
      { time:"N\/A", item:"Call to Order" },
      { time:"N\/A", item:"Roll Call" },
      { time:"N\/A", item:"Pledge of Allegiance" },
      { time:"N\/A", item:"Reading of the Mission Statement" },
      { time:"N\/A", item:"Excellence in Action: WAVE" },
      { time:"N\/A", item:"Excellence in Action: South Mountain Elementary" },
      { time:"N\/A", item:"Public and Student Comment" },
      { time:"N\/A", item:"Approve Consent Agenda" },
      { time:"N\/A", item:"Old\/Recurring Business - Committee of the Whole Meeting" },
      { time:"N\/A", item:"New Business - Transfer Funds to Fund 46" },
      { time:"N\/A", item:"New Business - Recommendation for 2026-27 Capital Projects" },
      { time:"N\/A", item:"New Business - Boys and Girls LaCrosse Co-Op" },
      { time:"N\/A", item:"New Business - Alpine Ski Co-Op" },
      { time:"N\/A", item:"New Business - East\/Newman JV Baseball Co Op" },
      { time:"N\/A", item:"New Business - Wisconsin School Nutrition Purchasing Cooperative Agreement" },
      { time:"N\/A", item:"New Business - Facility Fees" },
      { time:"N\/A", item:"New Business - NEOLA Policy Update" },
      { time:"N\/A", item:"Open Forum" },
      { time:"N\/A", item:"Closed Session - Preliminary Notice of Non-renewal" },
      { time:"N\/A", item:"Adjourn" },
    ],
    discussions: [
      { item:"Excellence in Action: WAVE", body:"The board was scheduled to recognize WAVE as part of the district's Excellence in Action series highlighting successful programs and initiatives." },
      { item:"Excellence in Action: South Mountain Elementary", body:"South Mountain Elementary was scheduled to be recognized as part of the Excellence in Action presentation series." },
      { item:"Referendum Budget Update", body:"Elizabeth Channel, Assistant Superintendent of Operations, was scheduled to provide a brief one-minute update on the status of the Referendum Budget, following up on information shared at the March Committee of the Whole meeting." },
      { item:"Transfer Funds to Fund 46", body:"Elizabeth Channel, Assistant Superintendent of Operations, was expected to present a plan to move revenue generated from three property sales to Fund 46 for future capital improvements. The presentation was estimated at five minutes." },
      { item:"Recommendation for 2026-27 Capital Projects", body:"Ryan Urmanski, Director of Buildings and Grounds, was scheduled to present the 10-Year Capital Improvement Plan for district facilities. This presentation was expected to take approximately 15 minutes." },
      { item:"Boys and Girls LaCrosse Co-Op", body:"Jon Tomski, BJ Brandt, and Darci Mick Beversdorf were scheduled to present Boys and Girls Lacrosse Co-Op agreements for board consideration, with both Wausau West and East signature pages included in the meeting materials. The presentation was estimated at five minutes." },
      { item:"Alpine Ski Co-Op", body:"Jon Tomski, BJ Brandt, and Darci Mick Beversdorf were expected to present the Alpine Skiing Co-Op agreement for the 2026-2028 period for board consideration. The presentation was estimated at five minutes." },
      { item:"East\/Newman JV Baseball Co Op", body:"The board was scheduled to hear about Wausau East's interest in entering a Co-Op agreement with Newman for JV baseball. The agenda noted that extra players would allow for a full JV\/JV2 season, and no official action was needed." },
      { item:"Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP)", body:"The district's Nutrition Service Department was seeking board approval for continued membership in the Wisconsin School Nutrition Purchasing Cooperative for the 2026-2027 school year. The presentation was estimated at two minutes." },
      { item:"Facility Fees", body:"Ryan Urmanski, Director of Buildings and Grounds, was expected to present an amendment to the Wausau School District Facility Use Fee Schedule to reflect costs for use of artificial fields and field lighting. If approved, the changes would be effective immediately." },
      { item:"NEOLA Policy Update", body:"The board was scheduled to consider an extensive policy update covering over 60 policies in four categories: general updates, school support organization policies, technical corrections, and Act 57 related policies. Topics ranged from cell phone policies and artificial intelligence to child abuse reporting, academic honesty, and fund-raising guidelines. The presentation was estimated at 10 minutes." },
      { item:"Closed Session - Contract Non-renewals", body:"The board was scheduled to enter closed session pursuant to state statutes section 19.85(1)(c) to consider contracts for preliminary notice of non-renewal, with the option to reconvene in open session to take further action if necessary." },
    ],
    publicComment: "A public and student comment period was included on the agenda.",
    actionItems: [
      "Board was expected to vote on approval of the Consent Agenda including appointments, separations, leaves of absence, retirements, minutes, budget reports, board member salaries, canvassing statement, and donations",
      "Action was requested for Transfer of Funds to Fund 46 from property sales revenue",
      "Action was requested for 2026-27 Capital Projects recommendation",
      "Action was requested for Boys and Girls LaCrosse Co-Op agreements",
      "Action was requested for Alpine Ski Co-Op agreement",
      "Action was requested for Wisconsin School Nutrition Purchasing Cooperative Agreement membership",
      "Action was requested for Facility Fee Schedule amendments",
      "Action was requested for NEOLA Policy updates covering general policies, school support organization policies, technical corrections, and Act 57 related policies",
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
  { date:"2026-04-27", time:"5:00 PM", name:"Education & Operations Committee", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-04-30", time:"5:00 PM", name:"Special Meeting", url:"https://meetings.boardbook.org/Public/Agenda/1360?meeting=741715", source:"school_board" },
  { date:"2026-05-11", time:"5:00 PM", name:"Regular Board Meeting", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-05-25", time:"5:00 PM", name:"Education & Operations Committee", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-06-08", time:"5:00 PM", name:"Regular Board Meeting", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
];

const WAUSAU_UPCOMING = [
  { date:"2026-04-20", time:"5:00 PM", name:"Liquor License Review Subcommittee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2333/overview", source:"wausau" },
  { date:"2026-04-20", time:"5:15 PM", name:"Public Health & Safety Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2068/overview", source:"wausau" },
  { date:"2026-04-21", time:"10:30 AM", name:"Board of Public Works Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2298/overview", source:"wausau" },
  { date:"2026-04-21", time:"5:00 PM", name:"Plan Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2106/overview", source:"wausau" },
  { date:"2026-04-21", time:"6:30 PM", name:"Common Council Organizational Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2314/overview", source:"wausau" },
  { date:"2026-04-27", time:"7:30 AM", name:"Police & Fire Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2146/overview", source:"wausau" },
  { date:"2026-04-27", time:"12:00 PM", name:"Community Development Authority Board Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2263/overview", source:"wausau" },
  { date:"2026-04-27", time:"5:00 PM", name:"Bicycle & Pedestrian Advisory Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2121/overview", source:"wausau" },
  { date:"2026-04-28", time:"10:30 AM", name:"Board of Public Works Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2334/overview", source:"wausau" },
  { date:"2026-04-28", time:"5:30 PM", name:"Finance Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2017/overview", source:"wausau" },
  { date:"2026-04-29", time:"4:00 PM", name:"Historic Preservation Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2216/overview", source:"wausau" },
  { date:"2026-05-04", time:"5:15 PM", name:"Parks & Recreation Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2056/overview", source:"wausau" },
  { date:"2026-05-05", time:"11:00 AM", name:"Water Works Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2191/overview", source:"wausau" },
  { date:"2026-05-05", time:"2:00 PM", name:"Board of Public Works Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2331/overview", source:"wausau" },
  { date:"2026-05-05", time:"5:30 PM", name:"Economic Development Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1991/overview", source:"wausau" },
];

const WESTON_UPCOMING = [
  { date:"2026-04-20", time:"5:30 PM", name:"Finance & Human Resources Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-04-20", time:"6:00 PM", name:"Board of Trustees", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-04-21", time:"", name:"Village Board of Trustees", url:"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04212026-1908", source:"weston" },
  { date:"2026-04-21", time:"", name:"Finance & Human Resources Committee", url:"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04212026-1907", source:"weston" },
  { date:"2026-04-21", time:"", name:"Tourism Commission", url:"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04212026-1906", source:"weston" },
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
  { date:"2026-06-15", time:"5:30 PM", name:"Finance & Human Resources Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-06-15", time:"6:00 PM", name:"Board of Trustees", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
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
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCABgAGADASIAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAABQYDBAACBwEI/8QAPBAAAQMCBAMGBAUBBwUAAAAAAQIDBAURAAYSITFBYRMUIjJRcQcVgZEWI0JDoVIzU4KSwdHwNDVEYmP/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAgEEA//EACARAQEAAgIBBQEAAAAAAAAAAAABAhESMQMEIUFCkfD/2gAMAwEAAhEDEQA/AO/4zGYD5jzHByzTDLmFa1rUG2I7SdTshw+VCE8yf44nAEJs6LTobsubIajxmk6nHXVhKUj1JOFAZwrOYvDk+jByKdhVanqZjnq2i2twdbAdcRxMszK68mu51QHltfmRaM1dbEX01D913qdgdgMG6XmBurMQpsUWpstKmkhSSlxt5KiChYv4fKRbiCLYAJKyxPVGVKzVnmelkbKRCUiAwL8ri6j9VYhjZC+H8xU1KoplrhL0ynJUt9fZq06vEVKtwIPscUWskS6hEzPDkmT3haHocGQ+s6Hm1LDrbiySVKUhR03I2Cdr3wcGWJ61VsT6jEbjVoNiU022bgBkNOBCiR5gONtuuADM5U+G7qErjRnIZUz3hpxuRIYK27ga0eIahdSdx6j1GL8bLU1DZdytnqcpKf2Zq0T2fY3stPC3m5YIxMtyES6dNVPYlP0qC5EhJSjQkqUEgrcsTvZCRYbDfpah3Co5PyHFh06CJFYMdUdyUynVoc0rX2h8JUpJcJsLcV72F8Bv+MKzl06c30YNxRsarTNT0cdVotrbHXcdcOEKdFqUNqXCkNSI7qdTbrSwpKh6gjC5lnMLcrKXzGct7sGo4fclPhISpBSVEA6j5PKdVjcb4EfJXISPxL8P1oAf/Nk0hd0MS7i5sk/2LtudgPUYDoWMwHy5mOFmamd7ia21oWWpEd5Ol2O4PMhaeRH88RgxgK86bHp0F+ZLdSzHYbU464o7JSBcnCTl6O7V5DmfK6y4k9ko0uGpNzEjWvq0/wB6sC55gWGJ83j8RZjpOUE3MVwfMKmBzjtqGhs9FuW+iTi/mSROjSo+uhO1CkIAKnISyZLDt9lpQLEpAP6TqF+GABS6/Fzc9BTRKtKjVFh0jtYAW43oUQCblIbeCTo1DcJvx23L0+lsUd4OOtIm16Qe8PoilTbJdI0l3syopbuBYq4ne2+2LMYvR4zL5beVVJhUhhuSq/Zov5lJBsmyQkqCbXO3E4NQIDcJpQClOOrOp15fmcV6n/QcANhgm226ismnS5Q1T5qwD+xFJbQPdXmV9x7Y3RQ6UgW+Xx1dVthZP1NzivmmR2GVawUPdm8mC+pBSuygQ2qxHO+Pm2mws0yY8aU5mGatl1tK9AqDyFWIuN7G32ODZjH00uhUpY/7fGSfVDYSR9RY40VT5cXxQJqyB+xKJcQfZXmT9z7Y+cX6Xmlbie71+a0m24cqTzlz76RbHfMhSlPZEoZkSS7IMJsuKW5qUo23JJ3ODOMV6zSo2Z4KqY8lcOQ2ovqhqVZqQqx0lVvOgK0quOYFxywCy+uvQqh3OHT5CUMFS6m9KXrXUJfZICrKUrwN2tpVzsAAADjoE+A3OaSlSlNuoOpp1HmbV6j/AG4EbHAGpU8V+lTYjzwgVBKBHlyGGtThZ8xCDxCVi/UXI4jAlsuqD1sIhuN/EDLC0ym9FqkxHNxNjpNiof8A0bsSDzAIw8wZsepQWJsR1LsZ9tLjTieCkkXBwp5WrUGTL7pSGpsikdmEImFhLUNCk2CUNCwKgRfcXGw33xHlC+Xcy1bKCtoqB8xpgPJhxR1tjohy/wBFDBTMpLEyt5uzEspIVNMJkqNgGo6dPHkCsrOBNPZy/mbNIcizVSH1K7eTGZqrq22lCx1IKVaHEEixTYW1E2tsCPw7ivTvhXFDEtyJIml97vCEgqQpbyzqAO1/fB+jZfOXxJfNWqE3tBqUiQWwgEb3SlCEhJPO3HAWqenvU+XPVuAoxmeiUnxH6rv/AJRgmeBGKFCQEUKDbiphKyfUqFz/ACcXzgnHol13NNGW7UaPPDqSUKjukWF0qTY6T7Kxz9VKy3FihuGrMrobSUtNInNjUEpSUpTdPNJFvbFuuRWqpXJs9Diw0/JKG9KSrVbwjgOZBtiFmGpsIZv2zZJSErbUCSk3IHhN7b9Rc72xdx9nJh6nLnZl0jjQKA4yhb6szx3Dp1NLmtlSCSdlWTsQkFR6DDtRMy0CDFptEhB9xsBEZrVZSrcAVHCY9HS6ydJSywWi7dttZOjmfKBbkTx5X5Y9gwEU+osTdTqhEdbecSUEWSDf042uR62wmM+TP1OXKTDp2/Ayop7pPiT07DUI73VCj4T9F2+ijgkhSVpC0kFKhcEcxijXEBdDnA8UsLWPcC4/kYh15dbIdcpVOpFWcqFVqkoPNulVNYdcVIuTYoEdhCgQUWKeBvfjbBPNjqY1XyfmVtKmwmamI8FCx7GSnTZXssIPvgjmDLLmYnoctmaIehH5imWgl9xJ30h8eNseunAv4iNPR/hXNU+EB+GGXgULUsAtvIIOpXiJsOJ3wUs/Co6fh3TmD54y32Fg8ih5Yw4Oo7RpaD+oEffCdks/LcxZqoKtuyn9/YHq1ITq26BYWMOmAH0JYXQoNuKWEoI9CkWP8jFXNNQVT6E8WlhMh8iOyfRa9r/QXP0xNT1d0ny4CtgVGQz1Qo+IfRd/8wxQzRGptWQzTpdVEF1Cu2FlJCiLEc9rb435ed5XDWPbnDURbfaOBpzSUAoRbytDw7AjZwW257nGKK9S09zmqSDZS22m+A8qk3UNz+rbfDGrJtIQsIVml9JKQsaloAKTtcHgeGN1ZKpaLFeZ5CQRqCitABFyOPDkftitxxY+DyT6/wB+lftHSnX8ulg+YgMt6df9Ntf9nzt64kVFdWlHZJXqS5dorATqI3Vr28ttk9Dg87lSisKUl3NUhBSAd1J3BsRbbfzDh6jEismUtC20KzLLCnUhaE+G6kkEg8Oh+2G4XweS/UxZLqAk0cxFKJdhKDXi49mRdBP+Ege4OClcWEUOcTxLC0jqSLD+TgJlym0vL7zpRWu9LlaEBLq03vuQABvvfBeoK73PiQE7jUJD3RCD4R9V2+iTib268ZlPHrLsRaR2bSEf0pA+2E/4qnV8OqmwPPJUzHSPUrdQm384cxwwl51PzLMGVaCncvVDvzw9Go6SrfoVlAxj2aZvJy7mSk5vTcRWx8vqZHKO4oFDh6Ictfoo4dS4lLZcUpIQBcqJ2A9b4hnQo9Rgvw5bSXo77am3G1DZSSLEYT8rT36BUfwVWnS4ttBVSpbn/lxx+gn+8QNiOYscAzS2hUYrE2C4nt2/zI7h8qgRulX/AKkbH02PEY2iPRKo2VrjpD7Z0OtOpBW2r0P+h4HiMVQlyjSPy0FcF5aENtNIJ7La1/Ym31OLUqA3LWmTHeVHloGlLyADcf0qHBQvyPDlY4Js1dxbMZhQF2WyALC6BsMeGHGPGO0eP6Bz44opqEuJ4Z8JZA/figuIPunzJ+x98SIrtLWNqhGSeYW4EEfQ2OByi0YkZVrx2jp4XQNv+Wx73Zi4PYt3TsDoG2Ki67S0C/zCMo+iHAsn6C5xGqoS5Y0wISwD+/KSW0D2T5lfYe+ByjacqDAbQsxG1vKVpZaQ2nWtfIJ/35Dc48itfLokibOcSZDn5j608BYbITzsBsPU3PE4xiIxBW5Llye2lFHjecsNKfRI/Sm/Iced8QkmtLTZLiIaFKStLiCgqItwB4jzAgj+cCTfvVqlznZ0LvDrKWkqJ0WVcFPr/wAuNr3wr5QJzFmWrZvVvFWPl1MJ5sNqJW4Oi3L/AESMeZpqD9fqP4KorqkOOICqrLbP/RxzxSD/AHixsByFzhwgwo9NgsQojSWo7DaW2m08EpAsBgpYwHzHlyFmamdzmBaFoUHGJDStLsdweVaFciP54YMYzAI0HNMygSW6Jnbs21rPZxaulOmNLHIL5NOeqTseRwwOU6TFUp6lOIAWouLbWSoKJHK5ta+/33wRmwYtRhuxJsdqRHdTpcadQFJUPQg4UBk+s5dOrJ9ZDUUbilVMKejjohd9bY6bjpgDqa6GClFQiuR3FKAAtqBuBvf629xjd6uUotJUpxLiSRYFPI2335bi5wB/GNXgJLeYMm1NsW3ep2mayetk2WB7pxTGffh+kKEmSGFqWVKRMgvIUCTw8SOHTAN/zSlsBeh1saCArQg8SLgbDjbFX54t+WhEGOp5pWylFJBSdQBPUWuf8OF8fETIRIMeSmU4CNKY8B11RPK1kYnGcqvPQG8v5NqbgtYPVHTCZHXxXWR7JwBv5U5NCXaq7qKSFdm2qyUEHkRY24cd9gbjACfmqZmCU5RMlFDriD2cqrqGqND9Qk8HXPRI2HM42/B9ZzEdWb6yHIp3NKpmpmOei131uDpsOmG+FBi02G1EhR2o8ZpOltppASlI6AYAflzLkLLNM7pE1uLWsuyJDqtTshw+Za1cyf44DBjGYzAf/9k="
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
