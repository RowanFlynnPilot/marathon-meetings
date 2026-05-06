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
    title: "Wausau City Council Meeting - 3\/24\/2026 - 3\/24\/2026 - 3\/24\/2026",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "City Council", duration: "~1h",
    url: "https://www.youtube.com/watch?v=rQcjCEY36e4",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau City Council approved a significant $10+ million development agreement for 11 Scott Street (Wateride Place) by a 6-3 vote, which will convert a vacant 100,000 square foot building into 52 mid-priced residential units. The council also recognized city workers for their response to a record-breaking 30.9-inch snowfall and presented the 2026 Sustainability Award to Colby and Colby Millwork for their solar energy initiatives.",
    agenda: [
      { time:"2:49", item:"Call to order and Pledge of Allegiance" },
      { time:"3:30", item:"Roll call" },
      { time:"4:00", item:"Proclamation for Sarah Rafi and glioblastoma awareness" },
      { time:"7:00", item:"Mayoral citation for DPW snow response crews" },
      { time:"14:30", item:"Sustainability Award presentation to Colby and Colby Millwork" },
      { time:"20:30", item:"Approval of March 10, 2026 meeting minutes" },
      { time:"21:00", item:"Public comment period" },
      { time:"23:30", item:"Consent agenda" },
      { time:"24:00", item:"Development agreement for 11 Scott Street\/Wateride Place" },
      { time:"35:30", item:"Mayoral appointments confirmation" },
      { time:"37:00", item:"Solid waste and recycling service agreement with Harter's Fox Valley" },
      { time:"42:00", item:"Settlement resolution for David Holes vs City of Wausau" },
    ],
    discussions: [
      { item:"Proclamation for Sarah Rafi Day", body:"Mayor Denny read a proclamation honoring Sarah Rafi, a local attorney diagnosed with stage 4 glioblastoma brain cancer. Rafi is a Marquette Law graduate who has practiced law in Wausau for nearly 30 years and authored the book 'Be Happy in Both Worlds.' March 31st was proclaimed as Sarah Rafi Day in Wausau, coinciding with her birthday. The mayor noted that local Elk Lodge member Brad Gessel also recently passed from the same disease." },
      { item:"Mayoral citation for DPW snow response", body:"Mayor Denny presented a mayoral citation to Department of Public Works plow crews and fleet staff for their response to a record-shattering 30.9-inch snowfall from March 14-16, 2026. Kevin Kester, street supervisor Josh, store room manager Mitch Harris, and fleet technician Jieven Matah were specifically recognized. Kester addressed the council, praising the plow operators and mechanics, noting that by Friday the technicians will have worked 12 straight days without a day off." },
      { item:"2026 Sustainability Award to Colby and Colby Millwork", body:"Sustainability committee members Christine Daniels and Gina Brew presented the 2026 City of Wausau Sustainability Award to Colby and Colby Millwork. Representatives Mike Thompson and Keith Kaning accepted the award and described their over 2,000 solar panel installation that became operational in July 2025, generating enough power for approximately 120 homes. They also highlighted LED lighting conversion and high-energy air compressor initiatives, plus comprehensive recycling programs for wood, aluminum, glass, vinyl, and other materials." },
      { item:"Development agreement for 11 Scott Street\/Wateride Place", body:"The council approved the development agreement with 11 Scott Street LLC by a 6-3 vote. Developers Raleigh Lray and Mark Craig spoke during public comment, explaining the $10+ million project to convert a vacant 100,000 square foot building into 52 mid-priced residential units. Alder Rasmusen supported the project, noting it returns parking spaces to public use and addresses the 'missing middle' housing need. Alder Neil emphasized the project generates $55,000 in annual parking revenue and helps TID 8 reach valuation goals for potential closure in 5 years. Alder Larson dissented, objecting to discounting city assets during budget cut times. Alder Tierney questioned the city's ability to provide alternative parking within 300 yards if the ramp closes, with Economic Development Director Randy Feifer explaining the existing agreement was reduced from 480 to 150 spaces." },
      { item:"Solid waste and recycling service agreement", body:"The council approved a seven-year residential solid waste and recycling service agreement with Harter's Fox Valley Disposal unanimously 9-0. The mayor noted there had been a previous mix-up regarding whether the term was seven or ten years, which was corrected to align with the public health and safety committee's original recommendation." },
      { item:"Settlement of David Holes vs City of Wausau", body:"Assistant City Attorney Vincent Bonito explained a settlement related to a 2022 bus accident where Transit Mutual Insurance paid the city's claim and the individual who hit the bus later filed a personal injury claim. The city's counter claim and third-party complaint against the individual's insurer resulted in the insurer agreeing to pay damages for the bus. Alder Neil clarified this settlement does not affect the individual's separate ongoing injury claim. Approved 8-1." },
    ],
    publicComment: "Two speakers addressed the council. Raleigh Lray from 11 Scott Street LLC requested support for their Wateride Place project, describing it as a green sustainable repurposing of a vacant building into mid-priced apartments. Mark Craig of 3246 North 8th Street joined her, emphasizing the project exceeds $10 million, involves 100,000 square feet, and would not happen without city support, noting the previous term sheet vote was 7-4.",
    actionItems: [
      "Development agreement for 11 Scott Street\/Wateride Place approved 6-3",
      "Seven-year solid waste and recycling agreement with Harter's Fox Valley Disposal approved 9-0",
      "Mayoral appointments to Plan Commission, Affordable Housing Task Force, and BID Board confirmed 9-0",
      "Airspace obstruction removal agreements for 724\/732 Ridgeland Avenue and 11 Ridgeland Avenue in Schofield approved 9-0",
      "2026 budget modification for Police Department Red Dot Optics purchase using Thompson submachine gun sale proceeds approved 9-0",
      "Solid waste disposal municipal code chapter 6.44 update approved 9-0 to align with state code",
      "Paid duty time for out-of-country police training approved 9-0",
      "Community outreach professional shelter operations duty premium differential approved 9-0",
      "Settlement release for David Holes vs City of Wausau approved 8-1",
      "March 31st proclaimed as Sarah Rafi Day in Wausau",
      "Thomas Street Neighborhood Group meeting announced for Thursday with Police Chief Jeremy Cop discussing referendum",
    ],
  },
  {
    id: "knWZO4dON-8", source: "wausau",
    title: "Wausau Plan Commission Meeting - 3\/17\/2026 - 3\/17\/2026 - 3\/17\/2026",
    date: "March 17, 2026", shortDate: "MAR 17",
    committee: "Plan Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=knWZO4dON-8",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Plan Commission approved two major items: a conditional use permit for a 70-unit, 7-story apartment building at 731 North First Street for Beacon Resources LLC, and a transportation project plat for Grand Avenue signal replacements. A public hearing was held for a proposed personal storage facility at 218 South Fourth Street, though no action was taken on that item during this meeting.",
    agenda: [
      { time:"0:00", item:"Call to order and election of vice chair (skipped until April)" },
      { time:"0:15", item:"Public comment on agenda items" },
      { time:"0:50", item:"Consideration of minutes from February 18th meeting" },
      { time:"1:05", item:"Public hearing on conditional use permit for 218 South Fourth Street storage facility" },
      { time:"2:45", item:"Discussion and possible action on conditional use permit for 731 North First Street apartment building" },
      { time:"3:25", item:"Discussion and possible action on transportation project plat for Grand Avenue signal replacements" },
      { time:"4:15", item:"Discussion of next meeting date" },
      { time:"5:00", item:"Adjournment" },
    ],
    discussions: [
      { item:"Minutes from February 18th", body:"Motion to approve was made by Bugamman with a second from Balkan. The minutes passed unanimously with all members voting in favor." },
      { item:"Public hearing on conditional use permit for 218 South Fourth Street storage facility", body:"Jason Dunwy and Melinda Don Woody spoke in favor of allowing a personal storage facility in the light industrial district. They argued that with over 400 new apartment units approved downtown, including the 153-unit Foundry on Third and 102-unit Evergreen Landing, residents need nearby storage options rather than driving to surrounding areas like Kronenwetter. The public hearing was closed but no action was taken on this item." },
      { item:"Conditional use permit for 731 North First Street apartment building", body:"Bornman made the motion to approve with Bugamin seconding for the 70-unit, 7-story apartment building for Beacon Resources LLC. No questions or discussion were raised by commissioners. The motion passed unanimously." },
      { item:"Transportation project plat for Grand Avenue signal replacements", body:"Project 370-40-40 for signal replacements at Sturgeon and Townline Road was considered. Bugamin made the motion with Balkan seconding. The motion passed unanimously with no discussion." },
    ],
    publicComment: "One written public comment was submitted by Linda Lawrence on March 12th supporting the Beacon Resources apartment building proposal, stating housing of this capacity will benefit downtown small businesses and expressing personal willingness to live at that location. Jason Dunwy and Melinda Don Woody provided oral public comment during the storage facility public hearing, advocating for downtown storage options to serve new apartment residents.",
    actionItems: [
      "Conditional use permit approved for 70-unit, 7-story apartment building at 731 North First Street for Beacon Resources LLC",
      "Transportation project plat approved for Grand Avenue signal replacements at Sturgeon and Townline Road",
      "Vice chair election postponed until April session",
      "Next meeting tentatively scheduled for April 21st at 5:00 PM, subject to change due to election and council meeting scheduling",
    ],
  },
  {
    id: "hNOP07iJjNY", source: "marathon",
    title: "Marathon County Board Education Meeting - 3\/19\/2026 - 3\/19\/2026 - 3\/19\/2026",
    date: "March 19, 2026", shortDate: "MAR 19",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=hNOP07iJjNY",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board held an educational meeting featuring presentations on PFAS contamination litigation opportunities and renewable energy regulation. No formal votes were taken as this was an informational session, but the board received detailed briefings on joining multi-district PFAS litigation against chemical manufacturers and learned about county authority regarding large-scale wind and solar projects proposed for the area.",
    agenda: [
      { time:"0:00", item:"Call to order and Pledge of Allegiance" },
      { time:"1:15", item:"Reading of the notice" },
      { time:"2:00", item:"Roll call - seven supervisors joined by WebEx, four excused" },
      { time:"2:30", item:"Public comment period (15 minutes, five speakers signed up)" },
      { time:"15:01", item:"Presentation on PFAS multi-district litigation opportunity" },
      { time:"1:00:01", item:"Presentation on renewable energy regulatory authority" },
      { time:"1:45:00", item:"Discussion of county options regarding wind and solar projects" },
    ],
    discussions: [
      { item:"Public Comment", body:"Five residents spoke during public comment. Cindy Nelson from Stratford\/Oplane Township reported visiting 200 houses about wind turbine projects and stated no one she spoke with supports the projects. Wendy Rowski from Green Valley urged the board to vote no on advancing the comprehensive plan, objecting to the term 'wind farm' as misleading for industrial energy facilities. Barb Newton and Cindy Hogan from Rib Mountain spoke in support of speed limit reduction and no-passing zone on Double End Road, referencing a petition with 75 signatures. Heidi Pesky from Town of McMillan argued against joint development agreements for wind projects, citing concerns about county liability, road damage costs, and long-term obligations." },
      { item:"PFAS Multi-District Litigation Presentation", body:"Attorney Carrie McDougall from Baron and Budd Law Firm presented via WebEx on the nationwide PFAS litigation. He explained the firm serves as co-lead counsel in the MDL consolidated in Charleston, South Carolina before Judge Richard Gergel. The water provider settlement totaled approximately $12-13 billion from 3M and $3-5 billion from DuPont. McDougall explained Marathon County could pursue claims for airport contamination, landfill issues, and wastewater-related PFAS contamination. The arrangement is a 25% contingency fee with no upfront costs to the county. Vice Chair Dickinson noted the county airport has no known PFAS contamination currently. Supervisor Robinson asked about protecting landowners affected by biosolids spreading, and attorneys clarified claims would be specific to Marathon County's injuries, though the county could distribute settlement proceeds as it chooses." },
      { item:"Renewable Energy Regulatory Authority Presentation", body:"Attorney Rebecca Roker from Atollis Law, representing Wisconsin Counties Association, presented on county authority over wind and solar projects. She noted the Hub City Wind project from Alliant Energy has no PSC filing yet, and the Marathon Wind project was purchased as part of Hub City. She explained PSC has approved 33 solar projects with zero denials, and projects over 100 megawatts fall under PSC jurisdiction with limited local control. Roker presented four options for counties: do nothing, negotiate a Joint Development Agreement (JDA), intervene in PSC proceedings, or litigate. She strongly recommended JDAs as the most effective tool to protect county interests regarding liability, roads, decommissioning, environmental protections, and emergency response training, noting state law provides minimal protection for local interests." },
    ],
    publicComment: "Five speakers addressed the board. Cindy Nelson (Stratford\/Oplane Township) opposed wind turbines, reporting 200 households she visited were unanimously against the projects. Wendy Rowski (Green Valley) urged voting no on the comprehensive plan and requested accurate terminology for industrial energy facilities. Barb Newton and Cindy Hogan (Rib Mountain) supported speed reduction and no-passing zone on Double End Road with 75 petition signatures. Heidi Pesky (Town of McMillan) argued against joint development agreements, citing concerns about county liability and long-term obligations.",
    actionItems: [
      "Resolution regarding PFAS litigation participation scheduled for discussion and potential action at next week's meeting",
      "Board members encouraged to contact board chair, administrator, or corporation counsel with questions about PFAS litigation",
      "County to consider options for engaging with proposed wind energy projects before PSC filings occur",
      "Infrastructure committee recommendation on Double End Road speed limit forwarded to full county board for vote",
    ],
  },
  {
    id: "gugcMAm6DFA", source: "wausau",
    title: "Wausau Board of Public Works Meeting - 3\/19\/2026 - 3\/19\/2026 - 3\/19\/2026",
    date: "March 19, 2026", shortDate: "MAR 19",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=gugcMAm6DFA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Board of Public Works held a brief meeting to open bids for the 2026 asphalt paving project. RC Pavers was awarded the contract with a bid of $824,146.34, beating American's bid of $849,872.10.",
    agenda: [
      { time:"0:00", item:"Call to order" },
      { time:"0:06", item:"Open bids and make recommendation for the 2026 asphalt paving project" },
      { time:"0:42", item:"Motion to adjourn" },
    ],
    discussions: [
      { item:"2026 Asphalt Paving Project Bid Opening", body:"Two bids were opened for the 2026 asphalt paving project. RC Pavers submitted the low bid at $824,146.34, while American bid $849,872.10. A motion was made to approve RC Pavers as the winning bidder, which was seconded and passed unanimously with all members voting 'aye'." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "RC Pavers awarded the 2026 asphalt paving project contract at $824,146.34",
    ],
  },
  {
    id: "f1fZvkxedNY", source: "wausau",
    title: "Wausau Board of Public Works Meeting - 3\/17\/2026 - 3\/17\/2026 - 3\/17\/2026",
    date: "March 17, 2026", shortDate: "MAR 17",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=f1fZvkxedNY",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Board of Public Works approved contracts for the 26th Street construction project, approved a change order for the Randolph\/Cherry Street project addressing unexpected underground conditions, and approved a pay estimate and concrete license. All items passed unanimously with no opposition.",
    agenda: [
      { time:"0:01", item:"Call to order and approval of March 10th regular Board of Public Works minutes" },
      { time:"0:18", item:"Open bids for 26th Street construction project" },
      { time:"0:30", item:"Open bids for North 8th Avenue project (postponed)" },
      { time:"1:05", item:"2025 Street Construction Project A - Randolph Street, Cherry Street - Change Order 1" },
      { time:"5:01", item:"2025 Street Construction Project A - Pay Estimate Number 9" },
      { time:"5:30", item:"Portland cement concrete license for KSK Incorporated" },
      { time:"5:55", item:"Adjournment" },
    ],
    discussions: [
      { item:"March 10th Board of Public Works Minutes", body:"Minutes were approved with a motion and second. Passed unanimously with voice vote." },
      { item:"26th Street Construction Project Bids", body:"Seven bids were opened and read aloud. Switlick submitted the lowest bid at $1,279,089.75, narrowly beating Hos at $1,280,877.96. Other bidders included A1 ($1,374,600), Francis Melvin ($1,385,383), Steen ($1,489,126), James Peterson ($1,570,698.56), and Earth ($1,686,780.75). A board member noted the 'tight bids' between the top two. Motion to approve Switlick as the contractor passed unanimously." },
      { item:"North 8th Avenue Bids", body:"Staff announced this item would be postponed as the bid opening was extended. Will return at a future meeting." },
      { item:"2025 Street Construction Project A - Change Order 1", body:"Staff presented four items totaling $14,436.50: an inside drop on a manhole ($4,856) due to an unrecorded large diameter sanitary service; water main work ($2,317.50) because an existing 6-inch main was found instead of the expected 8-inch; miscellaneous storm sewer tie-ins ($5,016) negotiated down to $66 per linear foot; and geogrid installation ($2,247) for approximately 750 square yards near Thomas Jefferson Elementary due to poor soil conditions. Change Order 2 regarding liquidated damages was postponed pending further discussions. Motion to approve passed unanimously." },
      { item:"2025 Street Construction Project A - Pay Estimate Number 9", body:"Staff recommended approval of pay estimate for work completed through the end of the year in the amount of $535,114.20 from Haw Suns Incorporated. Motion to approve passed unanimously." },
      { item:"Portland Cement Concrete License - KSK Incorporated", body:"A board member named Vinnie confirmed he reviewed the application and everything was in order. Motion to approve the license passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Switlick awarded 26th Street construction project contract at $1,279,089.75",
      "North 8th Avenue bid opening postponed to future meeting",
      "Change Order 1 for Randolph\/Cherry Street project approved for $14,436.50",
      "Change Order 2 with liquidated damages to return at future meeting pending discussions",
      "Pay Estimate #9 approved for $535,114.20 to Haw Suns Incorporated",
      "Portland cement concrete license approved for KSK Incorporated",
    ],
  },
  {
    id: "aUG3K0hxNsU", source: "weston",
    title: "Finance and Human Resources Committee - 3\/23\/2026 - 3\/23\/2026 - 3\/23\/2026",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Finance & Human Resources", duration: "~1h",
    url: "https://www.youtube.com/watch?v=aUG3K0hxNsU",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_03232026-1898",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Finance and Human Resources Committee debated a proposed increase to employee clothing allowances following the cancellation of a Cintas uniform contract. After multiple failed motions, the committee voted 4-1 to recommend $400 annually for clothing allowance plus a one-time purchase of a washer and dryer for staff use. The meeting also featured a detailed presentation on public works operations and budget.",
    agenda: [
      { time:"0:01", item:"Call to order and Pledge of Allegiance" },
      { time:"1:15", item:"Roll call" },
      { time:"1:30", item:"Public comments" },
      { time:"3:15", item:"Approval of minutes from February 16, 2026" },
      { time:"3:45", item:"Acknowledge February 2026 financial reports" },
      { time:"4:15", item:"Acknowledge T1 and T2 detail reports for February" },
      { time:"4:45", item:"Acknowledge legal details for February" },
      { time:"5:00", item:"Educational presentation: Public Works operations and budget" },
      { time:"40:03", item:"Old business: Clothing and equipment allowance amendments" },
      { time:"1:13:00", item:"Remarks and future meeting scheduling" },
      { time:"1:15:30", item:"Adjournment" },
    ],
    discussions: [
      { item:"Public Works Operations and Budget Presentation", body:"Public Works Director Michael presented a comprehensive overview of department operations, noting the 2026 budget decreased by $26,000 (1.1%) compared to 2025. He highlighted that the village maintains 119.5 centerline miles of road with 10 full-time staff (down from 11 in 2010). Michael emphasized the village spends approximately $9,700 less per mile than average central Wisconsin communities. He detailed the March 2026 storm response where some employees worked 17+ hours, with estimated costs around $50,000 for that single event. The department is pursuing disaster relief funding through the county." },
      { item:"Clothing and Equipment Allowance Amendments", body:"Following cancellation of the Cintas uniform contract, staff proposed increasing the clothing allowance from $300 to $600. Committee member Brad Daniels objected, arguing savings shouldn't automatically be spent given fiscal constraints and the upcoming fire department referendum. Director Michael advocated strongly for the increase, noting employees work in harsh conditions with chemicals and that the village already pays below average compared to other municipalities. Initial motion for $600 failed 2-3 (Daniels and Stephanie Olsson yes; Armain, Satai, and one other no). A $400 motion failed 2-2. A $500 motion with washer\/dryer failed. Final motion for $400 annually with a one-time washer\/dryer purchase passed 4-1 (Olsson voting no)." },
      { item:"Approval of Previous Meeting Minutes", body:"Minutes from February 16, 2026 were approved. Motion by Steve, seconded by Stephanie. Passed unanimously." },
      { item:"Financial Reports Acknowledgment", body:"February 2026 financial reports for all funds were acknowledged unanimously. T1 and T2 detail reports and legal details for February were also acknowledged with unanimous votes." },
    ],
    publicComment: "Lisa Beck of 1808 Cortez Lane offered public comment. She praised Mike for his work during the recent storm and questioned the proposed clothing allowance increase, suggesting the village consider a lesser amount rather than the highest proposed amount to save money. She noted every employee already receives safety apparel, shirts, hats, and $300 for boots or pants.",
    actionItems: [
      "Recommend to Village Board: $400 annual clothing allowance (effective remainder of 2026 and ongoing) plus one-time purchase of washer and dryer for staff use",
      "Next meeting scheduled for Tuesday, April 21st at 5:00 PM due to new board member swearing-in",
      "County to submit disaster relief costs to state for March storm event",
      "New public works employee starting Wednesday to bring department to 10 staff members",
    ],
  },
  {
    id: "_hS5GDGVL1c", source: "wausau",
    title: "Wausau Public Health and Safety Committee Meeting - 3\/23\/2026 - 3\/23\/2026 - 3\/23\/2026",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Public Health & Safety", duration: "~1h",
    url: "https://www.youtube.com/watch?v=_hS5GDGVL1c",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Public Health and Safety Committee approved a parklet permit for Westider Diner and Lounge after the owner presented detailed plans, deferred a bartender license denial pending police chief review of rehabilitation evidence, and approved batch licenses for several events and establishments. The committee also passed ordinance updates on solid waste and repealed a redundant cell phone driving ban.",
    agenda: [
      { time:"0:00", item:"Call to order and roll call" },
      { time:"0:18", item:"Public comment on agenda items" },
      { time:"0:45", item:"Approval of February 16, 2026 meeting minutes" },
      { time:"1:15", item:"License applications - Westider Diner parklet permit" },
      { time:"10:00", item:"License denial recommendations - Theodore Davis and Joanna Gregory" },
      { time:"20:01", item:"Repealing and recreating Municipal Code Chapter 6.44 solid waste disposal" },
      { time:"20:45", item:"Repealing cell phone driving ordinance (Section 10.01.012)" },
      { time:"25:01", item:"Grow Solar Central Wisconsin partnership with MREA" },
      { time:"27:30", item:"Wausau Fire Department 2025 annual report" },
      { time:"32:00", item:"Tavern activities report - February 2026" },
      { time:"37:00", item:"Community outreach update and Bridge Street Mission transition" },
    ],
    discussions: [
      { item:"Westider Diner and Lounge Parklet Permit", body:"Owner Tyler Vote presented detailed mockups of a proposed parklet at 628 North Third Avenue, explaining it would extend 4 feet into the street and 4 feet on the sidewalk, taking up two parking spaces. He noted it would provide sunny seating for breakfast customers and referenced his successful operation of a similar parklet at Malarkey's Pub. Committee member Larson initially expressed reservations but changed position after seeing the layout. The permit was approved unanimously on a motion from Watson, seconded by Larson, with a review scheduled for November 2026." },
      { item:"Theodore Davis Bartender License Denial", body:"Davis appeared to appeal his recommended denial, stating he made a mistake 20 years ago as a minor that has followed him throughout his life. He submitted completion paperwork for registry requirements to Chief Barnes at a previous meeting. His boyfriend Matthew Prieb also spoke in support, describing Davis as a loving person who has not reoffended. Deputy Chief Baiton indicated he was unfamiliar with the additional documentation submitted. The committee voted to defer action pending Chief Barnes' review of the rehabilitation evidence." },
      { item:"Joanna Gregory Bartender License Denial", body:"Gregory did not appear for her scheduled hearing. The denial recommendation was included in the batch approval of licenses as recommended by staff." },
      { item:"Batch License Approvals", body:"The committee approved multiple licenses including summer events (Wings over Wausau, Concerts on the Square, Chalkfest, Memorial Day parade, Hope on the Block, Jazz on the River) and three establishments unanimously recommended by the liquor license review subcommittee: Oasis Arcade, rebranded Whiskey River Bar and Grill, and new ownership of Hayawa. Approved unanimously on motion from Larson, seconded by Watson." },
      { item:"Municipal Code Chapter 6.44 Solid Waste Disposal", body:"The committee approved repealing and recreating the chapter to comply with state-level changes. Assistant City Attorney Vinnie Bonino was available for questions. Approved unanimously on motion from Larson, seconded by Watson." },
      { item:"Repeal of Handheld Mobile Phone Ordinance", body:"The committee voted to repeal Section 10.01.012 regarding handheld device use while driving, as state inattentive driving statutes have been amended to regulate cell phone usage, making the local ordinance redundant. Attorney Bonino confirmed the city already adopts state traffic code. Approved unanimously on motion from Watson, seconded by Larson." },
      { item:"Grow Solar Central Wisconsin Partnership", body:"Carrie from the planning department presented a memorandum of understanding with Midwest Renewable Energy Association for a group purchasing program. The sustainability committee had unanimously recommended approval on March 5th. Committee member Sarah endorsed the program based on her personal experience with solar installation. Approved unanimously on motion from Watson, seconded by Larson." },
      { item:"Fire Department Annual Report and Referendum Information", body:"Fire Chief Cop reported the department handled over 7,200 calls in 2025, averaging 20 per day. He announced that as of the previous Friday, Wausau regained ISO Class 2 status for the next four years. Upcoming public listening sessions were announced for March 31st at 1:00 PM at the tech center, April 1st at 5:00 PM at Station 2, and April 3rd at Station 1, ahead of the April 7th referendum. The report was placed on file." },
      { item:"Community Outreach and Shelter Transition", body:"Tracy Durante reported 415 unduplicated guests have used the WMC shelter since opening, with 740 volunteer hours in February. James Torensson, new Director of Homeless Services at Bridge Street Mission, reported the transition from WMC shelter to Bridge Street Mission emergency shelter is expected around April 20th, pending contractor confirmation on April 1st. The WMC shelter contract with First United Methodist Church was extended through April 19th to ensure no gap in service. Catholic Charities reported 99 unduplicated guests at their shelter since November 1st." },
    ],
    publicComment: "One public comment was offered at the end of the meeting by Carrie Mor Everest of 1025 Everest Boulevard. She expressed concerns about how unhoused individuals are treated during 911 emergencies at the shelter, stating she has witnessed multiple incidents over 10 months of volunteering where people were not treated ethically or professionally. She noted she was recently informed complaints should go to the Police and Fire Commission. The chair acknowledged the comments and directed her to the formal complaint process through the Police and Fire Commission.",
    actionItems: [
      "Parklet permit approved for Westider Diner and Lounge at 628 North Third Avenue with review scheduled for November 2026",
      "Theodore Davis bartender license decision deferred pending Chief Barnes' review of rehabilitation documentation",
      "Joanna Gregory bartender license denied as recommended",
      "All recommended license applications approved including summer events and three establishments",
      "Municipal Code Chapter 6.44 solid waste disposal repealed and recreated",
      "Municipal Code Section 10.01.012 cell phone driving ban repealed",
      "MREA solar partnership memorandum of understanding approved",
      "Fire Department annual report and tavern activities report placed on file",
      "Council tour of Bridge Street Mission shelter planned following ribbon cutting ceremony",
    ],
  },
  {
    id: "Izfp0CD_Da0", source: "weston",
    title: "Board of Trustees - 3\/23\/2026 - 3\/23\/2026 - 3\/23\/2026",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=Izfp0CD_Da0",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_03232026-1898",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Board of Trustees approved multiple ordinances including rezoning requests and a speed limit change for Weston Avenue, though the board amended the original speed limit proposal to keep the Von Kennel to Highway J section at 45 mph rather than reducing it to 35 mph. A citizen delivered pointed criticism of the board's approach to funding the fire department through referendum rather than budget prioritization, and the finance director responded emotionally defending staff efforts and budget constraints.",
    agenda: [
      { time:"0:01", item:"Call to order and Pledge of Allegiance" },
      { time:"0:45", item:"Roll call" },
      { time:"1:05", item:"Public comments" },
      { time:"5:01", item:"Minutes approval and acknowledgment of reports from boards, committees, and commissions" },
      { time:"6:45", item:"Department reports (Administrator, Clerk, Finance, Fire\/EMS, Parks, Planning, Police, Public Works, Technology)" },
      { time:"20:02", item:"Ordinances - Rezoning and speed limit changes" },
      { time:"30:01", item:"Resolution approving Hinter Springs Second Edition subdivision final plat" },
      { time:"32:00", item:"Update on April 2026 referendum informational sessions" },
      { time:"35:02", item:"E-bike and euro ordinance discussion" },
      { time:"40:00", item:"Intersection signage at Community Center Drive and Birch Street" },
      { time:"55:02", item:"Utility and infrastructure items including sewer televising software" },
    ],
    discussions: [
      { item:"Public Comment on Fire Department Funding", body:"Jim Pensel of 5002 Aerrol Street criticized the board's approach to fire department funding, stating the department is 'severely understaffed' and the board has offered only 'band-aids.' He argued the referendum has no sunset date and won't solve long-term funding problems. He urged the board to prioritize fire\/EMS over 'wants' like artificial turf and the aquatic center. Finance Director Jessica responded emotionally, explaining the village cannot borrow for additional firefighters and defending staff efforts, noting the village is 'the cheapest' and 'most efficient' but cannot continue without more revenue." },
      { item:"Ordinance 26-006 Speed Limits on Weston Avenue", body:"The original ordinance to change speed limits failed on first vote with 4 nos (Maloney, Jordan, the presiding officer, and one other). Trustee Maloney argued the 35 mph limit from Von Kennel to Ryan made no sense given the road conditions compared to other village streets. A second motion was made by Maloney to keep Camp Phillips to Von Kennel at 35 mph but return Von Kennel to Highway J to 45 mph. This amended version passed with Jordan seconding and only Trustee Carne voting in favor of the original proposal." },
      { item:"Intersection Signage at Community Center Drive and Birch Street", body:"The board approved changing the stop sign to a yield sign, with a friendly amendment adding a stop sign for bicyclists coming off the pedestrian bridge. Trustee Hooang raised safety concerns about cyclists coming off the bridge at 15-20 mph without any signage. The amendment was accepted and the motion passed unanimously." },
      { item:"Baseball\/Softball Field Maintenance Agreement", body:"The board approved a 10-year agreement with youth baseball and softball organizations for field maintenance at Kennedy Park. The Parks and Recreation committee recommended the longer term to protect the village's investment and provide stability despite leadership changes on both sides. Passed unanimously." },
      { item:"Remote Meeting Attendance Policy", body:"Trustee Lewis recommended postponing this item until the next meeting so the newly elected board could make the decision. The board unanimously agreed to defer to the April 21st meeting." },
      { item:"Microsoft Teams for Communication", body:"The board approved using Microsoft Teams for trustee communication starting with the next term. Staff will provide training at an upcoming meeting. Passed unanimously." },
    ],
    publicComment: "Jim Pensel of 5002 Aerrol Street spoke during public comment, criticizing the board's approach to fire department funding. He attended the inaugural SAFER citizen academy and expressed appreciation for fire\/EMS staff while arguing the board should fully fund the department through budget prioritization rather than a referendum. He specifically criticized spending on Kennedy Park turf and the aquatic center as 'wants' versus the 'need' of public safety funding.",
    actionItems: [
      "Two remaining referendum informational sessions scheduled: March 31st 4:30-6:00 PM and April 2nd 12:00-1:30 PM at village building",
      "Speed limit ordinance approved with Von Kennel to Highway J remaining at 45 mph, Camp Phillips to Von Kennel at 35 mph",
      "Stop sign to be added for bicyclists at Community Center Drive bridge; vehicle stop sign changed to yield",
      "No parking restrictions removed on west side of Alderson Street along Kennedy Park",
      "10-year field maintenance agreement approved with youth baseball and softball organizations",
      "Remote meeting attendance policy deferred to April 21st meeting for new board to decide",
      "Microsoft Teams to be implemented for trustee communication with training planned",
      "Sewer televising software contract approved for automated GIS mapping integration",
      "Next meeting April 21st at 6 PM with new board members",
    ],
  },
  {
    id: "HwjjV4oIneA", source: "marathon",
    title: "Marathon County Board Regular Meeting - 3\/24\/2026 - 3\/24\/2026 - 3\/24\/2026",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=HwjjV4oIneA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board of Supervisors adopted the 2026 Comprehensive Plan with multiple amendments addressing renewable energy language, AI technology, data centers, and energy policy. The board also approved salaries for elected officials, authorized highway facility design services, and approved litigation related to PFAS contamination. Several supervisors were recognized for their final meeting as their terms conclude.",
    agenda: [
      { time:"0:12", item:"Call to order, Pledge of Allegiance, and moment of reflection" },
      { time:"1:30", item:"Roll call" },
      { time:"2:15", item:"Standing committee reports" },
      { time:"2:30", item:"Consent agenda items C8 through C13 B2" },
      { time:"3:00", item:"Adopting Marathon County Comprehensive Plan 2026 (Ordinance 0-13-26)" },
      { time:"1:20:01", item:"Establishing salaries for elected officials (Resolution 12-26)" },
      { time:"1:21:00", item:"Highway facility phase 2 design services (Resolution 13-26)" },
      { time:"1:24:00", item:"PFAS litigation authorization (Resolution 14-26)" },
      { time:"1:28:00", item:"Carry forwards and budget amendments (Resolution R-20-26)" },
      { time:"1:30:00", item:"Law enforcement drug trafficking response grant" },
      { time:"1:31:00", item:"Ratification of local state of emergency declaration" },
      { time:"1:35:00", item:"County Administrator performance evaluation" },
      { time:"1:38:00", item:"Announcements and adjournment" },
    ],
    discussions: [
      { item:"Marathon County Comprehensive Plan 2026", body:"The board considered 10 proposed amendments to the comprehensive plan. Amendment 1 (livability standards) passed unanimously. Amendments 2, 3, and 4 regarding alternative energy systems language changes (changing 'renewable energy' to 'energy projects' and 'large-scale wind and solar') were separated after a motion by Supervisor Crawl and each passed but not unanimously. Amendment 5 (data centers and battery storage background language) passed but not unanimously, with Supervisor Leur voting no citing it was 'too ideological.' Amendment 6 (radon and lead remediation) passed unanimously. Amendment 7 (regulate energy projects when allowed by law) passed but not unanimously. Amendment 8 (AI and automation language) from Supervisor Leur passed unanimously. Amendment 9 was heavily debated - Supervisor Sundowski's original language promoting clean coal, natural gas, and nuclear was amended by Supervisor Boots to remove nuclear and 'clean' from coal, reading 'promote coal and natural gas until a long-term sustainable and reliable energy source can be found that does not adversely affect agricultural land.' Supervisors Robinson and Rosenberg opposed, noting 'there is no such thing as clean coal.' A late amendment by Supervisor Sundowski regarding utility-scale wind\/solar as industrial uses was defeated after extensive debate about whether to refer it to committee. The final comprehensive plan as amended passed but not unanimously." },
      { item:"Establishing salaries for elected officials", body:"Resolution 12-26 establishing salaries for the clerk of courts, sheriff, and elected department heads for the upcoming term of office was approved. Motion by Supervisor Conway, second by Supervisor Rosenberg. The motion carried with no discussion." },
      { item:"Highway facility phase 2 design services", body:"Resolution 13-26 authorizing staff to proceed with phase 2 design services for the new highway facility passed unanimously. Supervisor Soyber requested future information about plans for the old facility. Supervisor Sundowski asked about the $53 million cost estimate but Chair Gibbs clarified that cost approval was not part of this resolution." },
      { item:"PFAS litigation authorization", body:"Resolution 14-26 authorizing outside counsel on contingency basis for PFAS lawsuits was approved unanimously with two amendments. Supervisor Robinson's amendment directing the county administrator to evaluate past and present practices that may have resulted in PFAS exposure passed unanimously. Vice Chair Dickinson's amendment modifying airport-related language to reference county property passed unanimously." },
      { item:"Ratification of local state of emergency", body:"Resolution 22-26 ratifying the declaration of local emergency related to the recent blizzard passed unanimously. Administrator Leonard explained the ratification preserves the county's opportunity for reimbursement after the governor's declaration expired. He praised staff across facilities, parks, forestry, highway, sheriff's office, and airport, noting over 600 hours of additional call-in time over 24 hours, with highway workers doing 12-16 hour shifts and sleeping on cots. Supervisor Fifer echoed thanks to all staff." },
      { item:"County Administrator performance evaluation", body:"The board accepted the executive committee's recommendation on the administrator's performance evaluation and salary placement without going into closed session. Supervisor Robinson moved to accept the recommendation, seconded by Supervisor Cavalli. The motion carried unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Comprehensive Plan 2026 adopted with amendments addressing energy language, AI technology, data centers, and promoting coal and natural gas",
      "Salaries established for clerk of courts, sheriff, and elected department heads for upcoming term",
      "Phase 2 design services for new highway facility authorized to proceed",
      "Outside counsel authorized on contingency basis for PFAS litigation; administrator directed to evaluate county PFAS exposure risks",
      "Budget carry forwards and capital asset thresholds approved",
      "Law enforcement drug trafficking response grant accepted",
      "Local state of emergency declaration ratified",
      "County administrator performance evaluation and salary placement approved",
      "Departing supervisors (Crawl, Fifick, Marshall, Rosenberg, Hardinger, V, Reynolds) recognized for service",
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
    overview: "The Village of Weston Tourism Commission approved four grant requests totaling $22,500 for local events including the Mountain Bay Cup soccer tournament ($5,000), GG's 5K Glow Fun Run ($2,500), Hmong Wausau Festival ($10,000), and Wisconsin Valley Fair ($5,000). The commission also scheduled a special meeting for May 18th to consider a late application from Taste and Glow Balloon Festival that was missed due to administrative error.",
    agenda: [
      { time:"0:07", item:"Call to order and Pledge of Allegiance" },
      { time:"0:44", item:"Roll call" },
      { time:"1:02", item:"Public comments" },
      { time:"4:06", item:"Approval of minutes from previous meeting" },
      { time:"4:24", item:"Acknowledge 2025 budget status report" },
      { time:"5:00", item:"CVB reports from Visit Wausau" },
      { time:"14:18", item:"Grant request - Mountain Bay Cup" },
      { time:"24:42", item:"Grant request - GG's 5K Glow Fun Run Walk" },
      { time:"28:13", item:"Grant request - Hmong Wausau Festival" },
      { time:"33:07", item:"Grant request - Wisconsin Valley Fair" },
      { time:"38:36", item:"Post event report - High School Bowling" },
      { time:"39:50", item:"Remarks from staff regarding Taste and Glow application" },
    ],
    discussions: [
      { item:"CVB Reports", body:"Tim White, Visit Wausau Executive Director, reported on upcoming events including the Wisconsin Bike Fed summit and Marathon County Parks film festival. He highlighted the World Horseshoe Tournament coming in July, noting registrations are ahead of last year's Salt Lake City event (already approaching 700 vs. 644 total last year), expecting 800+ participants. White addressed the public comment about hotel capacity, stating there are about 2,400 rooms in the greater Wausau area and 1,800 in the immediate area. He introduced new Director of Operations Jamie Rice Hecondorf and acknowledged missing the Taste and Glow application, taking responsibility for the error." },
      { item:"Grant Request - Mountain Bay Cup", body:"Dan Kubat, MC United Soccer Club tournament director, requested $5,000 for the May 1-3 spring soccer tournament. He reported 170 teams registered with 68.5% (116 teams) traveling from more than 90 miles away, expecting 8-10,000 people and economic impact of $700,000 to $1 million. Games will be held at Peoples, Airport Park, and Greanette Turner Center. This is a new funding request for the spring tournament; the fall tournament previously received $3,500. Renee moved to approve $5,000, seconded by Jackson. Motion passed unanimously." },
      { item:"Grant Request - GG's 5K Glow Fun Run Walk", body:"Erica (online) presented the sixth annual event at Weston YMCA, expecting 600-700 participants with many from out of state including Minnesota, Texas, and Michigan. New this year is a cornhole tournament. The event secured WAOW advertising and features their signature foam machine. Renee moved to approve $2,500, seconded by Jackson. Motion passed unanimously." },
      { item:"Grant Request - Hmong Wausau Festival", body:"Elang Jang, festival chair since 2017, requested $10,000 for the August 1-2 event. Last year drew 12,000-13,000 attendees; this year expects 14,000-15,000, making it the largest Hmong festival in Wisconsin. New this year is an under-18 volleyball and soccer tournament expected to bring 500-800 additional athletes plus families. Jang noted hotels within an hour fill completely and emphasized using local vendors. Husain moved to approve $10,000, seconded by Renee. Motion passed unanimously." },
      { item:"Grant Request - Wisconsin Valley Fair", body:"No representative present. Commission discussed that last year's request was $10,000 but only $5,000 was approved. Commissioners questioned the benefit to Weston, noting the application showed only 3-4 hotel rooms and listed hotels in Wausau and Rothschild, none in Weston. Tim White suggested the main benefit would be marketing exposure through logo placement. Husain moved to approve $5,000, seconded by Renee. Motion passed unanimously." },
      { item:"Taste and Glow Balloon Festival Application", body:"Staff explained Tim White missed forwarding the Taste and Glow application. Since the event is the second weekend of July before the July 20th regular meeting, the commission scheduled a special meeting for May 18th at 4:00 PM to consider the application so they can be included in advertising materials." },
    ],
    publicComment: "Jim Pensson of 5200 Street, Weston, commented online questioning how applicants claim up to 2,000 hotel room bookings when Weston lacks that capacity. He also asked about follow-through on after-action report commitments to coordinate with Weston restaurants and businesses, noting the application form doesn't specify how many rooms are actually in Weston.",
    actionItems: [
      "Approved $5,000 grant to MC United Soccer Club for Mountain Bay Cup (May 1-3)",
      "Approved $2,500 grant to GG's Playhouse Wausau for 5K Glow Fun Run Walk",
      "Approved $10,000 grant to Hmong American Center for Hmong Wausau Festival (August 1-2)",
      "Approved $5,000 grant to Marathon County Agricultural Society for Wisconsin Valley Fair",
      "Special meeting scheduled for May 18, 2026 at 4:00 PM to consider Taste and Glow Balloon Festival application",
      "Tim White to provide report on hotel room capacity estimates for the area",
      "Next regular meeting July 20, 2026",
    ],
  },
  {
    id: "D7R7a0G0WTA", source: "weston",
    title: "Parks Committee - 3\/23\/2026 - 3\/23\/2026 - 3\/23\/2026",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Parks and Recreation Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=D7R7a0G0WTA",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_03232026-1898",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Parks Committee reviewed park impact fees with plan commission input, selected Rettler Corporation for the Mock Mueller Park master plan, and discussed ice rink operations at Kennedy Park. The committee endorsed increasing park impact fees to align with neighboring communities and approved Rettler's $24,700 proposal unanimously.",
    agenda: [
      { time:"0:05", item:"Call to order and Pledge of Allegiance" },
      { time:"0:30", item:"Roll call" },
      { time:"1:00", item:"Approval of minutes from February 23rd, 2026" },
      { time:"1:30", item:"Public comments" },
      { time:"6:00", item:"Review of parks and recreation impact fee discussion" },
      { time:"25:30", item:"Discussion on requests for proposals for Mock Mueller Park master plan" },
      { time:"32:00", item:"Review of Yellow Banks kayak launch expenses" },
      { time:"37:30", item:"Discussion on ice rink operations at Kennedy Park" },
      { time:"50:00", item:"Future items and next meeting date" },
      { time:"52:00", item:"Staff and committee remarks and adjournment" },
    ],
    discussions: [
      { item:"Approval of minutes from February 23rd, 2026", body:"A motion to accept the minutes was made and seconded. The motion passed unanimously with no discussion." },
      { item:"Review of parks and recreation impact fee discussion", body:"Jennifer presented information on park impact fees, noting the village currently charges $300 for single family units while neighboring communities charge $600-$650. The 2020 study recommended fees of $761 for single family. Plan commission asked for parks committee input before deciding. Committee members Katrina and Roger expressed support for a moderate increase to align with neighboring communities. Jennifer noted that at current rates, the Granite Ridge subdivision (88 lots) would generate $26,400, while doubling fees would yield $52,800. No formal action was taken; feedback will be provided to plan commission." },
      { item:"Requests for proposals for Mock Mueller Park master plan", body:"Staff received seven proposals for the park master plan, which were reviewed by four staff members based on firm experience, personnel experience, similar projects, and cost. The two lowest bidders were JSD and Rettler Corporation, both with village experience. Roger made a motion to select Rettler Corporation, seconded by Katrina. The motion passed unanimously." },
      { item:"Review of Yellow Banks kayak launch expenses", body:"Jessica presented a detailed breakdown of kayak launch expenses and grant funding. The project had unforeseen costs including bad subgrade and an unknown well casing. Lisa Beck praised the RFC during public comment. Grants were secured by Jessica and Dan Higginbotham, with Marathon County Transportation covering full expense for ADA accessibility. Committee members praised staff work and discussed recognizing Dan Higginbotham's contributions. No formal action required; informational only." },
      { item:"Discussion on ice rink operations at Kennedy Park", body:"Staff presented information on Kennedy Park ice rink operations per committee request. The warming house has been unattended since 2020 due to COVID and subsequent staffing shortages. Everest Youth Hockey remains interested in improvements including a covered structure. Staff noted Marathon Park changes may increase demand for ice facilities. Katrina expressed concern about hockey being forgotten amid baseball focus at Kennedy Park. Committee requested additional information including historical attendance figures from 2018-19 and user feedback for a future meeting." },
    ],
    publicComment: "Jim Pinsel expressed frustration about not receiving responses to questions submitted at the previous meeting regarding playground equipment installation issues and Kennedy Park fundraising updates. He criticized the ice rink cost analysis as incomplete, arguing true costs including labor hours are $20,000-$30,000 rather than the stated $1,320.98. Lisa Beck thanked Michael for snow management during the recent blizzard and praised Sean and Jessica for the well-written Yellow Banks RFC. A written response to Jim Pinsel's previous email was also submitted and will be included in the minutes.",
    actionItems: [
      "Rettler Corporation selected for Mock Mueller Park master plan development",
      "Jennifer to present park impact fee comparison with neighboring communities to plan commission next month",
      "Staff to compile historical ice rink attendance figures from 2018-19 seasons for future meeting",
      "Staff to gather user feedback on ice rink operations for future discussion",
      "Quarterly Kennedy Park project update scheduled for April board meeting",
    ],
  },
  {
    id: "8rRo1cm2YJ0", source: "wausau",
    title: "Wausau Finance Committee Meeting - 3\/24\/2026 - 3\/24\/2026 - 3\/24\/2026",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "Finance", duration: "~1h",
    url: "https://www.youtube.com/watch?v=8rRo1cm2YJ0",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Finance Committee approved multiple airport ground leases, denied a tax recovery claim related to Greenwood Hills litigation, and postponed decisions on opioid settlement participation and lead service line replacement funding. The committee also approved 2025-2026 budget carryover funds and reviewed 2025 financial results showing a general fund surplus of approximately $540,000 after transfers.",
    agenda: [
      { time:"2:01", item:"Call to order and public comment" },
      { time:"2:35", item:"Consideration of minutes from March 10, 2026" },
      { time:"3:05", item:"Tax recovery claim for Green Acres at Greenwood Hills LLC" },
      { time:"3:55", item:"Transfer of title and airport ground leases at 939 Woods Place" },
      { time:"5:25", item:"Airport ground lease with Cole Lundberg" },
      { time:"5:45", item:"Six remnant defendants national opioid settlement agreement" },
      { time:"12:00", item:"Budget amendment for Wausau Waterworks lead service line replacement" },
      { time:"27:03", item:"Budget amendment for carryover funds 2025 to 2026" },
      { time:"29:15", item:"Review of 2025 motorpool fund financial results" },
      { time:"37:00", item:"Review of 2025 general fund financial results" },
      { time:"47:00", item:"2026 general obligation promissory note for capital improvements" },
      { time:"54:30", item:"Consideration of purchasing properties for DPW Streets Division" },
    ],
    discussions: [
      { item:"Minutes of March 10, 2026", body:"Watson moved to approve, Griner seconded. Motion passed unanimously with no discussion." },
      { item:"Tax recovery claim for Green Acres at Greenwood Hills LLC", body:"This claim is part of ongoing litigation with Greenwood Hills. The chair explained that a motion to approve required a 'no' vote to deny the claim. Watson moved to approve, Griner seconded. The motion failed when members voted 'no' to deny the claim." },
      { item:"Airport ground lease transfers at 939 Woods Place", body:"Three related items for transferring a hangar from Wino Jones to Owen Jones were approved. Watson moved to approve consent to transfer title, Griner seconded, passed unanimously. Tierney moved to terminate the lease with Wino Jones, Watson seconded, passed unanimously. Watson moved to approve the new lease with Owen Jones, Tierney seconded, passed unanimously." },
      { item:"Airport ground lease with Cole Lundberg", body:"Griner moved to approve, Watson seconded. Motion passed unanimously with no discussion." },
      { item:"National opioid settlement agreement", body:"Committee members expressed discomfort proceeding without more information. Alder Mallini asked where the proposal came from, and Assistant City Attorney Vincent explained law firms send notices to potential class members. Alder Tierney noted signing would waive future individual action against the six companies. The deadline to participate is May 4th. Griner moved to postpone to the next meeting, Tierney seconded. Motion to postpone passed unanimously." },
      { item:"Budget amendment for lead service line replacement", body:"Eric from Public Works explained the DNR changed terms after initial agreement, resulting in $709,672 in non-construction costs being ineligible for the subsidized 0.25% loan. Finance Director Marian outlined options including borrowing, using general fund reserves, or potentially using PFAS settlement money. Alder Tierney opposed adding more debt. Discussion included possibly splitting the $283,868 homeowner portion from general fund and $425,803 utility portion from PFAS settlement, though the committee noted PFAS spending requires broader discussion. Watson moved to postpone to the next meeting, Griner seconded. Motion passed unanimously." },
      { item:"Budget amendment for carryover funds 2025 to 2026", body:"The Finance Director noted the large carryover includes $10 million for transit buses funded by VW mitigation grants, plus airport projects awaiting state draw requests. Unstarted projects include city hall chimney liner, public safety roof, and DPW fence replacement. Watson moved to approve, Griner seconded. Motion passed unanimously." },
      { item:"2025 motorpool fund financial results", body:"The Finance Director reported the motorpool fund would show approximately $150,000 net profit after transferring GMT money. The fund faces a $177,000 cash flow shortfall due to outstanding vehicle purchases from as far back as 2023 due to supply chain issues. Solomon from Motorpool explained two dump trucks are near the front of the line for delivery and a med unit was returned to AEV for issues. The shortfall may be covered by remaining ARPA savings. This was informational with no action required." },
      { item:"2025 general fund financial results", body:"The Finance Director reported a surplus of approximately $1.2 million driven by strong building permits, GMT revenue, and investment income. After motorpool charges, departments including Public Works ($481,000 over), Fire ($527,000 over), and Police ($468,000 over) exceeded budgets primarily due to motorpool allocations. CCITC was over by $194,000 due to subscription miscommunications and Office 365 upgrade costs. After proposed transfers to recycling, airport, and parking funds, the surplus would be $539,000. Tierney moved to approve the transfers, Watson seconded. Motion passed unanimously." },
      { item:"2026 general obligation promissory note", body:"The Finance Director presented the borrowing calendar for capital improvements including street projects (10-year), motorpool (5-year), and various TID projects. The debt utilization percentage will decrease slightly even with new issuance. Watson moved to approve the calendar, the chair seconded. Motion passed unanimously. Phil Cawson from Ehlers will present parameters resolution at the next meeting." },
      { item:"Consideration of purchasing properties for DPW", body:"Properties at 108 Adolf Street, 112 Adolf Street, 112.5 Adolf Street, and 233 Myron Street were scheduled for closed session discussion. Due to council starting at 6:30 and time constraints, Watson moved to postpone to the next meeting, Tierney seconded. Motion passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Denied tax recovery claim for Green Acres at Greenwood Hills LLC",
      "Approved transfer of hangar ownership from Wino Jones to Owen Jones at 939 Woods Place",
      "Approved airport ground lease with Cole Lundberg",
      "Postponed opioid settlement participation decision pending more information from City Attorney",
      "Postponed lead service line replacement budget amendment for further discussion on funding options",
      "Approved $10+ million budget carryover from 2025 to 2026",
      "Approved transfers from general fund to recycling, airport, and parking funds",
      "Approved 2026 borrowing calendar with parameters resolution coming at next meeting",
      "Postponed closed session discussion on DPW property purchases to next meeting",
    ],
  },
  {
    id: "47UbKS2Jqo4", source: "marathon",
    title: "Marathon County Executive Committee Meeting - 3\/24\/2026 - 3\/24\/2026 - 3\/24\/2026",
    date: "March 24, 2026", shortDate: "MAR 24",
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
    ],
    discussions: [
      { item:"Performance review of the administrator", body:"The chair explained that the committee had the option to enter closed session to discuss the final performance review of the county administrator, incorporating board feedback received the previous Thursday. The chair noted that executive committee members had rated the administrator on various questions using three criteria (needs improvement, successful, exceptional) and that corporation counsel had scored these on a 0-5 scale. A motion was made and seconded to enter closed session, passing unanimously with all members voting aye: Gibbs, Dickinson, Arstead, Boots, Drebeck, Fifick, Mask, Ritter, Morash, and Robinson." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Committee entered closed session to finalize the county administrator's performance review",
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
    overview: "The Village of Weston Board of Trustees held its first meeting with three newly elected trustees, approving routine business including liquor license renewals, road reconstruction assessments, and a solid waste ordinance amendment. The board debated remote meeting attendance policy, ultimately passing a motion allowing virtual attendance with camera requirements while prohibiting remote participation in closed sessions. Significant discussion occurred regarding Kennedy Park renovation funding transparency and the president's committee appointments, which included placing former trustees on various commissions.",
    agenda: [
      { time:"0:00", item:"Call to order and Pledge of Allegiance" },
      { time:"2:18", item:"Public comments" },
      { time:"13:28", item:"Approval of March 16th, 2026 meeting minutes" },
      { time:"16:45", item:"Acknowledge reports from boards, committees and commissions" },
      { time:"17:53", item:"Department reports (Administrator, Clerk, Finance, EMS\/Fire, Parks & Rec, Planning, Police, Public Works, Technology)" },
      { time:"36:21", item:"Work product transmittals" },
      { time:"36:52", item:"Consent agenda with liquor license renewals" },
      { time:"39:24", item:"Ordinance 26-008 amending solid waste chapter" },
      { time:"39:45", item:"Preliminary assessment resolutions for road reconstructions" },
      { time:"42:15", item:"Kennedy Park renovation quarterly update discussion" },
      { time:"1:06:45", item:"Remote meeting attendance policy discussion and action" },
      { time:"1:25:52", item:"President's appointments to committees and commissions" },
    ],
    discussions: [
      { item:"Public Comments", body:"Joe Jordan (4102 Camp Phillips Road) gave an extended farewell speech as outgoing trustee, praising village staff and the 'staff recommends' process, defending the village hall construction decision, and encouraging new trustees to work through committees. Jim Pinsel (5811 Alderson Street) criticized President Maloney's appointments, stating the president 'betrayed the electorate' by appointing Luis Lopez as vice president despite Lopez not receiving votes as trustee, and by reappointing former trustees to committees after voters removed them from the board." },
      { item:"Approval of March Meeting Minutes", body:"Discussion revealed the minutes had incorrect information - the date needed to be changed to March 23rd (meeting was postponed due to snowstorm), and corrections were needed regarding who called the meeting to order since President Maloney and Vice President Cronin were both absent. Motion by Lopez Saro, second by Clark. Approved unanimously with corrections." },
      { item:"Liquor License Renewals (Item 41)", body:"Pulled from consent agenda by Trustee Herming. The Fairfield Inn and Suites had incorrectly listed their entire hotel as the premise description when it should only include lobby, locked fridges, locked storage room, and south end hallway. Motion by Herming with the correction, second by Olsen. Approved unanimously." },
      { item:"Ordinance 26-008 Solid Waste Amendment", body:"Motion to approve by [unidentified], second by Zagami. Passed unanimously with no discussion." },
      { item:"Preliminary Assessment Resolutions for Road Reconstructions", body:"Three resolutions passed for Gelick\/Alderson, Bladel Avenue, and Concord Avenue\/Bay's Street reconstructions. Trustee Beck asked about resident notification - Public Works Director Michael confirmed residents are notified at public information meetings and assessments typically cost $1,000-$1,500 for driveway approaches with 10-year payment options. All three resolutions passed unanimously." },
      { item:"Kennedy Park Renovation Quarterly Update", body:"Extensive discussion with multiple trustees expressing confusion about funding sources and fundraising progress. The Friends of Kennedy Park foundation has $84,000 including $30,000 from Mer Iron and Steel for field lights. Trustee Zagami and Clark requested more detailed information on grants applied for, fundraising activities, and a timeline of expenses. Staff confirmed approximately $851,000 came from capital funds including budget surplus and unspent pool proceeds. Trustees requested the Friends group provide more detailed updates and potentially attend a board meeting. Discussion only - no vote taken." },
      { item:"Remote Meeting Attendance Policy", body:"Extended debate on limiting virtual meeting attendance. Trustee Lopez Saro moved to restrict remote attendance to medical reasons only, with notification to clerk, administrator and chair, and prohibition on closed session attendance. Motion failed 3-4 (Lopez Saro, Zagami, Olsen in favor; Herming, Beck, Maloney, Clark opposed). A second motion by Zagami adding camera requirements also failed 3-4. Final motion by Maloney passed 6-1: allowing remote attendance on camera with notification to clerk, administrator, and chair\/president, with absolute prohibition on remote closed session attendance. Zagami was the lone no vote." },
      { item:"President's Committee Appointments", body:"President Maloney presented appointments including keeping former trustee Mark Kern on Community Development Authority, appointing former trustee Joe Jordan to Planning Commission and Public Works, and putting Steve Cronin back on Planning Commission. New trustees assigned included Katrina Clark to Mountain Bay Metro and Lisa Beck to Safer. Discussion was ongoing at transcript end." },
    ],
    publicComment: "Two speakers offered public comment. Joe Jordan (former trustee) spoke at length praising village staff, defending past decisions on village hall construction and fire department funding, and welcoming new trustees. Jim Pinsel criticized President Maloney's appointment decisions, arguing that reappointing voted-out trustees to committees and selecting an unelected vice president demonstrated 'lack of transparency and disregard for the will of the people.'",
    actionItems: [
      "Minutes from March 23, 2026 meeting approved with date and presiding officer corrections",
      "Liquor license renewals approved with Fairfield Inn premise description correction",
      "Ordinance 26-008 amending Chapter 66 solid waste approved",
      "Resolution 26-010 preliminary assessment for Gelick\/Alderson reconstruction approved",
      "Resolution 26-011 preliminary assessment for Bladel Avenue reconstruction approved",
      "Resolution 26-012 preliminary assessment for Concord Avenue\/Bay's Street reconstruction approved",
      "Remote meeting policy updated: camera required for virtual attendance, notification required to clerk\/administrator\/chair, closed session attendance prohibited remotely",
      "Staff to provide Friends of Kennedy Park with request for detailed grant applications list and fundraising updates",
      "Staff to forward SWAT analysis for Mountain Bay PD building to full board",
      "Clerk to research whether listing open records requesters by name is required or discouraged by law",
    ],
  },
  {
    id: "0pfKykvicdA", source: "marathon",
    title: "Marathon County HR, Finance, and Property Committee Meeting - 3\/24\/2026 - 3\/24\/2026 - 3\/24\/2026",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "Marathon County HR, Finance, and Property Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=0pfKykvicdA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County HR, Finance, and Property Committee approved several items including a claim disallowance related to a child death case, revised property values for public auction, carry forward funds resolution, and a capital assets threshold policy amendment. The committee also received introductions from new healthcare consultants and detailed financial updates for 2025 year-end and 2026 year-to-date.",
    agenda: [
      { time:"0:00", item:"Claim disallowance - Mercedes Holmes" },
      { time:"2:30", item:"Consideration to set revised property values for parcels for public auction" },
      { time:"5:00", item:"Resolution to approve carry forward funds" },
      { time:"11:30", item:"Resolution to amend capital assets threshold policy" },
      { time:"12:30", item:"Introduction of healthcare consultants - National Insurance Services" },
      { time:"36:45", item:"Audited 2025 year end fiscal update" },
      { time:"55:03", item:"2026 year to date fiscal update" },
      { time:"57:00", item:"Finance department quarterly update" },
      { time:"1:07:30", item:"County treasurer update" },
      { time:"1:36:30", item:"Announcements and adjournment" },
    ],
    discussions: [
      { item:"Claim disallowance - Mercedes Holmes", body:"Corporation Counsel explained that Mercedes Holmes filed a claim on December 5th related to the death of her 3-year-old child Zalen Bernett, who was placed in a treatment foster care home in Dunn County by Marathon County Department of Social Services. Investigations determined natural causes with no wrongdoing found. Outside counsel and the insurance carrier recommended disallowance due to no county liability. Chair Gibbs moved to disallow the claim in conjunction with the insurance carrier's recommendation, seconded by Supervisor Lur. The motion carried unanimously." },
      { item:"Revised property values for public auction", body:"Staff reported two parcels at 529 Mullen Street and 738 South 3rd Avenue failed to sell twice on Wisconsin Surplus with bids not reaching appraised value. Staff requested revised minimum sale prices of $9,000 and $7,500 respectively. Chair Gibbs moved to approve, seconded by Supervisor Lur. The motion carried unanimously. Chair Robinson asked about bidders who failed to pay, and staff confirmed they are marked as non-pay and banned from future Wisconsin Surplus auctions." },
      { item:"Resolution to approve carry forward funds (R20-2026)", body:"Finance Director Sam presented the resolution for program revenues and multi-year projects requiring carryover funds. Notable items included veterans relief fund replenishment (providing approximately three years of funding) and $142,731.39 for administration special projects including $75,000 for homelessness contract. Vice Chair Marshall asked about the Register of Deeds redacted records fund; Sam explained it's restricted by statute for redaction efforts only and offered to provide more information at a future meeting. Chair Gibbs moved approval, seconded by Supervisor Hart. The motion carried unanimously." },
      { item:"Capital assets threshold policy amendment", body:"Finance Director Sam explained the policy would raise the capitalization threshold from $5,000 to $10,000 for general assets, following GFOA guidance originally set in 2006. This determines whether items are expensed or capitalized and depreciated. Supervisor Hart moved to approve and forward to full county board, seconded by Chair Gibbs. The motion carried unanimously." },
      { item:"Introduction of healthcare consultants - National Insurance Services", body:"HR Director Candace introduced NIS representatives following their selection through the RFP process. Mike introduced the team including himself (28 years experience), Jordan Stanley (account management), Perry Gilfoil (plan analytics), Zack Cunningham (support), and Adam Cook (retirement income). NIS specializes in public sector clients (98-99% of clientele). They discussed evaluating the near-site ATA clinic, exploring fully insured versus self-insured options, and pharmacy benefit management. Vice Chair Marshall asked about per-member costs compared to other employers and strategies for reducing ER usage. Chair Gibbs asked about evaluation processes for insurance models. No vote was taken; this was informational." },
      { item:"2025 year-end fiscal update", body:"Finance Director Sam provided detailed department-by-department review of unaudited 2025 financials. Key items included: TID closure check of $257,238 from City of Wausau, unclaimed property from state of $222,752, opioid fund settlement receipts of $352,389 with total cash at $2.2 million, and ARPA fund interest surplus of approximately $800,000. Multiple departments require reclassing entries and reconciliation work continues. Chair Robinson asked about anticipated fund balance surplus; Sam indicated she would provide that figure at the next meeting once capital assets work is complete, stating it won't be zero." },
      { item:"2026 year-to-date fiscal update", body:"Sam reported the beginning of year is aligned with expectations. She announced first quarter closeout is scheduled for May 31st, with monthly closeouts thereafter using a two-month lag to ensure accuracy. Some reclassing entries are needed, particularly moving items from treasurer's budget to non-departmental." },
      { item:"Finance department quarterly update", body:"Finance Director Sam reported welcoming a new financial analyst for payroll, implementing quarterly closeouts with departments, providing countywide training on uniform practices, processing year-end payroll including W-2s and the 'one big beautiful bill' no tax on overtime calculations, and completing random cash audits (all successful). County Administrator Lance publicly recognized Sam and her team for extensive work on year-end processing, particularly handling the overtime tax law changes." },
      { item:"County treasurer update", body:"Treasurer Connie reported on tax collections, monitoring delinquent parcels, attending eviction hearings and sheriff sales. The office sent 1,582 delinquent tax notice letters in March (down from 1,786 last year). She noted ongoing issues with municipalities making receiving errors, particularly with lottery credits. Supervisor Lur asked about poverty trends; Connie explained resources offered to struggling taxpayers include veterans services and family assistance. Administrator Lance clarified the county discontinued payment agreements because most resulted in NSF checks or defaults, and the 18% interest rate was eroding homeowners' equity rather than helping them." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Disallowed claim of Mercedes Holmes regarding child death",
      "Approved revised minimum sale prices of $9,000 for 529 Mullen Street and $7,500 for 738 South 3rd Avenue parcels for Wisconsin Surplus auction",
      "Approved resolution R20-2026 for carry forward funds to 2026 budget",
      "Approved capital assets threshold policy amendment raising threshold from $5,000 to $10,000 for county board consideration",
      "Finance to provide fund balance surplus figure at next meeting",
      "NIS healthcare consultants to provide update before budget assumptions development in early summer",
      "Finance to research Register of Deeds redacted records fund usage and potential repurposing",
      "Treasurer's office working with DOR on lottery credit training for municipal treasurers",
      "Next committee meeting scheduled for April 8th",
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
  },
  {
    id: "WD9kixgx6oY", source: "marathon",
    title: "Marathon County Regular Meeting",
    date: "April 28, 2026", shortDate: "APR 28",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=WD9kixgx6oY",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18350/639126184295330000",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, the Marathon County Regular Meeting on 4\/28\/26 was scheduled to address county business matters. The specific agenda items were not available from the provided source, as only a link to the agenda packet was included.",
    agenda: [
      { time:"N\/A", item:"Agenda details not available - only packet link provided" },
    ],
    discussions: [
      { item:"Meeting Agenda", body:"The full agenda content was not available in the provided text. The meeting agenda and packet were scheduled to be available via the Marathon County website link. Specific items set for discussion could not be determined from the source provided." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Specific action items could not be determined - agenda content not available in provided source",
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
    overview: "Based on the published agenda, the Wausau School District Board of Education's Committee of the Whole meeting was scheduled to address several action items including facility fee amendments for artificial fields, a nutrition purchasing cooperative agreement, and an extensive NEOLA policy update covering over 60 policies. The meeting also included a referendum budget update and recognition of Stettin Elementary through the Excellence in Action program.",
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
      { item:"Excellence in Action: Stettin Elementary", body:"Stettin Elementary was scheduled to be recognized through the district's Excellence in Action program. This agenda item typically highlights achievements and notable programs at featured schools." },
      { item:"Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP)", body:"The district's Nutrition Service Department was expected to present a resolution for continued membership in the Wisconsin School Nutrition Purchasing Cooperative for the 2026-2027 school year. The presentation was estimated at 5 minutes, with action requested for Board approval of the cooperative agreement." },
      { item:"Facility Fees", body:"Ryan Urmanski, Director of Buildings and Grounds, was scheduled to present information to amend the current Wausau School District Facility Use Fee Schedule with an estimated 10-minute presentation. The proposal was expected to add costs for use of artificial fields and field lighting for requested events, with immediate implementation requested upon Board approval." },
      { item:"Referendum Budget Update", body:"Elizabeth Channel, Interim Assistant Superintendent of Operations, was scheduled to share an update on the status of the Referendum Budget during an estimated 10-minute presentation. Supporting documentation was included in the meeting packet." },
      { item:"NEOLA UPDATE", body:"The Committee was expected to review proposed changes to numerous district policies during an estimated 20-minute session, with some involving only technical corrections and others being more substantive. The policy updates were organized into four categories: general policies covering definitions, board member conduct, district administrator relationships, academics, and student matters; school support organization policies regarding fundraising and gifts; technical corrections to 18 existing policies; and Act 57 related policies addressing student supervision, welfare, and child abuse reporting." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Action was requested for approval of continued membership in the Wisconsin School Nutrition Purchasing Cooperative (WiSNP) for the 2026-2027 school year",
      "Action was requested for immediate approval of amended Facility Use Fee Schedule to include artificial fields and field lighting costs",
      "Action was requested for approval of NEOLA policy updates including over 60 policies covering board governance, student affairs, financial management, school support organizations, and Act 57 compliance",
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
    overview: "Based on the published agenda, this special meeting of the Wausau School District Board of Education was scheduled to address the verification of school board election results from the April 2026 election cycle. This procedural meeting represents an important step in formally certifying newly elected board members before they can be seated.",
    agenda: [
      { time:"N\/A", item:"Verify School Board Election Results" },
    ],
    discussions: [
      { item:"Verify School Board Election Results", body:"The board was scheduled to review and verify the results of the school board election. This procedural item was expected to confirm the official vote tallies and validate the election of board member candidates for the Wausau School District." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Board was expected to vote on verification of the school board election results",
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
    overview: "Based on the published agenda, this Special Meeting of the Wausau School District Board of Education was scheduled to convene in closed session to hold a pupil expulsion hearing. The Board was expected to deliberate privately and potentially take action on the expulsion matter, with the possibility of reconvening in open session for further action if necessary.",
    agenda: [
      { time:"N\/A", item:"Call To Order" },
      { time:"N\/A", item:"Closed Session for Pupil Expulsion Hearing pursuant to s. 19.85(1)(a), (f), and (g), and s. 118.125 of Wisconsin Statutes" },
      { time:"N\/A", item:"Adjournment" },
    ],
    discussions: [
      { item:"Closed Session for Pupil Expulsion Hearing", body:"The Board was scheduled to convene in closed session under Wisconsin Statutes s. 19.85(1)(a), (f), and (g), as well as s. 118.125 to conduct a pupil expulsion hearing. Following the hearing, the Board was expected to deliberate privately and potentially take action on the expulsion matter while in closed session. The Board was scheduled to reconvene in open session afterward if further action was necessary or appropriate." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Board was expected to vote on whether to convene in closed session",
      "Board was expected to consider action on the pupil expulsion matter during or following the closed session hearing",
      "Board was expected to vote on reconvening into open session and potential adjournment",
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
  { date:"2026-05-06", time:"9:00 AM", name:"Board of Review Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2350/overview", source:"wausau" },
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
];

const WESTON_UPCOMING = [
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
  { date:"2026-06-18", time:"6:00 PM", name:"Mountain Bay Metro Police Oversight", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
  { date:"2026-06-22", time:"6:00 PM", name:"Parks & Recreation Committee", url:"https://www.westonwi.gov/about-weston/calendar", source:"weston" },
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
