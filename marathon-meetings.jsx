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
    date: "April 28, 2026", shortDate: "APR 28",
    committee: "City Council", duration: "~1h",
    url: "https://www.youtube.com/watch?v=rQcjCEY36e4",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Common Council approved a $10+ million development agreement for 11 Scott Street (Waterside Place) by a 6-3 vote, which will convert a vacant 100,000 square foot building into 52 mid-priced apartment units. The council also recognized city public works crews for their response to a record 30.9-inch snowfall and presented the 2026 Sustainability Award to Colby and Colby Millwork.",
    agenda: [
      { time:"2:49", item:"Call to order and Pledge of Allegiance" },
      { time:"3:30", item:"Roll call" },
      { time:"4:00", item:"Proclamation - Sarah Rafi Day (March 31st)" },
      { time:"7:00", item:"Mayoral citation for Public Works snow removal crews" },
      { time:"15:00", item:"Sustainability Award presentation to Colby and Colby Millwork" },
      { time:"20:30", item:"Approval of March 10, 2026 meeting minutes" },
      { time:"21:00", item:"Public comment period" },
      { time:"23:30", item:"Consent agenda" },
      { time:"24:00", item:"Development agreement for 11 Scott Street\/Waterside Place" },
      { time:"36:00", item:"Various resolutions including solid waste agreement and budget modifications" },
      { time:"42:00", item:"Settlement resolution for David Holes vs City of Wausau" },
      { time:"46:00", item:"Announcements from Mayor and Alders" },
    ],
    discussions: [
      { item:"Development Agreement for 11 Scott Street\/Waterside Place", body:"The council debated the joint resolution approving a development agreement and parking agreement with 11 Scott Street LLC. Alder Rasmusson spoke in support, noting it would return a vacant building to taxable status and reclaim parking spaces for public use. Alder Neil detailed benefits including $55,000 annual parking revenue, TID 8 closure goals, and downtown housing needs. Alder Larson dissented, arguing the city should not discount its parking assets. Alder Tierney questioned the city's obligation to provide 150 parking spaces within 300 yards if the ramp closes, with Economic Development Director Randy Feifer explaining this reduced an existing obligation from 480 to 150 spaces. The motion passed 6-3." },
      { item:"Mayoral Citation for Public Works", body:"Mayor Denny presented a citation recognizing DPW plow crews and municipal fleet staff for their response to a record 30.9-inch snowfall from March 14-16, 2026. Street Supervisor Kevin Kester accepted the award, praising the plow operators and mechanics, stating 'you kicked its ass' and noting the fleet technicians worked 12 straight days without a day off. Several crew members were present including Dustin, Josh (street supervisor), and Mitch Harris (storeroom manager who drove a plow)." },
      { item:"Sustainability Award to Colby and Colby Millwork", body:"Christine Daniels from the Sustainability, Energy and Environment Committee presented the 2026 City of Wausau Sustainability Award to Colby and Colby Millwork. Mike Thompson and Keith Kaning accepted, describing their 2,000+ solar panel installation that became operational in July (generating enough power for 120 homes), LED lighting upgrades, and comprehensive recycling programs for wood, aluminum, glass, and vinyl manufacturing materials." },
      { item:"Sarah Rafi Day Proclamation", body:"Mayor Denny paraphrased a proclamation previously read into the record, honoring attorney Sarah Rafi who was diagnosed with stage four brain cancer (glioblastoma) in July. The proclamation recognized her 30-year legal career, her book 'Be Happy in Both Worlds,' and her podcast. March 31st was proclaimed Sarah Rafi Day. Mayor Denny also noted Brad Gessel, an Elk Lodge member, recently passed from the same disease." },
      { item:"Settlement Resolution - David Holes vs City of Wausau", body:"Assistant City Attorney Vincent Bonito explained a 2022 bus accident case where Transit Mutual insurance paid the claim, then the individual who hit the bus filed a personal injury claim. The city filed counterclaims and the insurer agreed to pay damages for the bus. The resolution releases the city's counterclaim. Alder Neil clarified this is separate from any ongoing personal injury claim. Motion passed 8-1 with no closed session needed." },
      { item:"Residential Solid Waste and Recycling Agreement", body:"The council approved a seven-year agreement with Harter's Fox Valley Disposal, correcting an earlier mix-up between seven and ten-year terms. Passed 9-0." },
    ],
    publicComment: "Two speakers addressed the council regarding the 11 Scott Street project. Raleigh Lray briefly asked for support for the green sustainable project converting a vacant building to mid-priced apartments. Mark Craig (3246 North 8th Street) emphasized the project is over $10 million with the residential component at $8.3 million, noting it's challenging and 'without your help, it won't happen.'",
    actionItems: [
      "Development agreement and parking agreement for 11 Scott Street\/Waterside Place approved 6-3",
      "Seven-year solid waste agreement with Harter's Fox Valley Disposal approved 9-0",
      "Airspace obstruction removal agreements approved for 724\/732 Ridgeland Avenue and 11 Ridgeland Avenue in Schofield",
      "2026 budget modification approved for Police Department to purchase Red Dot Optics using Thompson submachine gun sale proceeds",
      "Paid duty time approved for out-of-country training for Wausau Police Department officers",
      "Community outreach professional shelter operations duty premium differential approved",
      "Settlement release approved for David Holes vs City of Wausau case 8-1",
      "Municipal Code Chapter 6.44 solid waste disposal repealed and recreated to align with state code",
      "Mayor's appointments to Plan Commission, Affordable Housing Task Force, and Business Improvement District Board confirmed",
    ],
  },
  {
    id: "knWZO4dON-8", source: "wausau",
    title: "knWZO4dON-8",
    date: "April 28, 2026", shortDate: "APR 28",
    committee: "Plan Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=knWZO4dON-8",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Plan Commission approved a conditional use permit for a 70-unit, 7-story apartment building at 731 North First Street for Beacon Resources LLC, and approved a transportation project plat for Grand Avenue signal replacements. A public hearing was held regarding a proposed personal storage facility at 218 South Fourth Street, with applicants citing growing downtown residential population as justification.",
    agenda: [
      { time:"0:00", item:"Call to order and election of vice chair (skipped until April)" },
      { time:"0:15", item:"Public comment on agenda items" },
      { time:"0:45", item:"Consideration of minutes from February 18th" },
      { time:"1:00", item:"Public hearing on conditional use permit for 218 South Fourth Street (personal storage facility)" },
      { time:"3:15", item:"Discussion and possible action on conditional use permit for 731 North First Street (70-unit apartment building)" },
      { time:"5:00", item:"Discussion and possible action on transportation project plat for Grand Avenue signal replacements" },
      { time:"5:30", item:"Announcements and next meeting date" },
      { time:"5:45", item:"Adjournment" },
    ],
    discussions: [
      { item:"Minutes from February 18th", body:"Motion to approve made by Bugamman, seconded by Balkan. Minutes passed unanimously with no discussion." },
      { item:"Public hearing on conditional use permit for 218 South Fourth Street (personal storage facility)", body:"Jason Dunwy and Melinda Dunwy spoke in favor of the storage facility, noting that downtown Wausau has added over 400 new apartment units including the 153-unit Foundry on Third and 102-unit Evergreen Landing project. They argued apartment living provides limited storage and there are no convenient downtown storage options, so this would keep residents' spending within Wausau rather than surrounding areas like Kronenwetter. The public hearing was closed but no action was taken on this item during the meeting." },
      { item:"Conditional use permit for 731 North First Street (70-unit apartment building)", body:"Motion to approve made by Bornman, seconded by Bugamin. No questions or discussion from commissioners. The conditional use permit for Beacon Resources LLC to build a 70-unit, 7-story apartment building passed unanimously." },
      { item:"Transportation project plat for Grand Avenue signal replacements at Sturgeon and Townline Road", body:"Motion to approve made by Bugamin, seconded by Balkan. No discussion. The transportation project plat (Project 370-40-40) passed unanimously." },
    ],
    publicComment: "One written public comment was submitted by Linda Lawrence on March 12th supporting the Beacon Resources apartment proposal, stating housing of this capacity would be good for downtown small businesses and expressing confidence in the developer's track record. Jason Dunwy and Melinda Dunwy spoke in person during the public hearing regarding the storage facility at 218 South Fourth Street.",
    actionItems: [
      "Conditional use permit approved for 70-unit, 7-story apartment building at 731 North First Street for Beacon Resources LLC",
      "Transportation project plat approved for Grand Avenue signal replacements at Sturgeon and Townline Road",
      "Vice chair election postponed until April session",
      "Next meeting tentatively scheduled for April 21st at 5:00 PM, may be moved due to election and council meeting conflicts",
    ],
  },
  {
    id: "hNOP07iJjNY", source: "marathon",
    title: "hNOP07iJjNY",
    date: "April 28, 2026", shortDate: "APR 28",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=hNOP07iJjNY",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board of Supervisors held an educational meeting featuring presentations on PFAS contamination litigation opportunities and renewable energy regulation authority. The board heard from attorneys about joining a multi-district litigation against PFAS chemical manufacturers and received guidance on county options for regulating wind and solar energy projects, including negotiating joint development agreements. No votes were taken as this was an educational session.",
    agenda: [
      { time:"0:00", item:"Call to order and pledge of allegiance" },
      { time:"1:15", item:"Reading of the notice" },
      { time:"2:00", item:"Roll call" },
      { time:"2:30", item:"Public comment period (15 minutes, 5 speakers)" },
      { time:"15:01", item:"Presentation on PFAS multi-district litigation opportunity" },
      { time:"50:02", item:"Questions and discussion on PFAS litigation" },
      { time:"1:01:30", item:"Presentation on renewable energy regulatory authority" },
      { time:"1:05:00", item:"Overview of proposed wind projects in Marathon County" },
      { time:"1:20:02", item:"Discussion of county options for renewable energy regulation" },
      { time:"1:40:00", item:"Joint Development Agreement considerations and options" },
    ],
    discussions: [
      { item:"PFAS Multi-District Litigation Presentation", body:"Attorney Carrie McDougall from Baron and Bud Law Firm explained via WebEx that his firm serves as co-lead counsel in the largest toxic tort settlement in U.S. history, with 3M paying approximately $12-13 billion and DuPont paying $3-5 billion to settle water contamination claims. He explained Marathon County could file claims related to airport soil contamination, wastewater, and landfill issues on a contingency fee basis (25% of recovery). Supervisor Robinson asked about including land spreading impacts, and Attorney Andy Phillips clarified claims must be unique to Marathon County's injuries. Vice Chair Dickinson noted the airport has no known current PFAS contamination." },
      { item:"Public Comment on Wind Turbines", body:"Cindy Nielsen of Stratford reported going door-to-door to 200 houses and found unanimous opposition to wind turbine projects, stating residents don't want turbines, substations, or anything related to the projects near their homes. Wendy Rowski from Green Valley urged the board to vote no on advancing the comprehensive plan, objecting to the use of the term 'wind farm' instead of 'industrial wind energy development.' Heidi Pesky from McMillan argued that joint development agreements are not required and listed numerous concerns about JDAs, including that they lock counties into outdated standards for 30-50 years." },
      { item:"Public Comment on Rib Mountain Speed Limit", body:"Barb Newton and Cindy Hogan from the Village of Rib Mountain spoke in support of reducing the speed limit on Double End road and making it a no-passing zone. Newton reported 75 residents signed a petition supporting the change, citing safety concerns including near head-on collisions when vehicles pass others turning at the ski hill. Hogan thanked the infrastructure committee for forwarding the recommendation to the county board." },
      { item:"Renewable Energy Regulatory Authority Presentation", body:"Attorney Rebecca Roker from Atollis Law explained that counties have limited authority to regulate renewable energy projects over 100 megawatts, as jurisdiction lies with the Public Service Commission (PSC). She noted PSC has approved 33 solar projects without denying any, demonstrating projects typically proceed regardless of local opposition. She outlined four county options: do nothing, negotiate a Joint Development Agreement (JDA), intervene in PSC proceedings, or litigate. Roker strongly recommended JDAs as the most effective tool for protecting county interests regarding liability, environmental impacts, roads, decommissioning, and emergency response training." },
      { item:"Wind Project Status in Marathon County", body:"Rebecca Roker reported that the Hub City Wind Project from Alliant Energy has no engineering plans filed with PSC yet, giving the county time to prepare. She noted the EDP Renewables Marathon Wind LLC project, which was the subject of the Town of Brighton lawsuit, has been purchased as part of the Hub City project, explaining why that litigation was dismissed. The Stormark Wind Energy Center also has many unknowns regarding footprint and timeline." },
    ],
    publicComment: "Five speakers addressed the board during a 15-minute public comment period. Cindy Nielsen (Stratford\/Oplane Township) reported visiting 200 homes and finding no support for wind turbine projects. Wendy Rowski (Green Valley) urged voting no on the comprehensive plan due to misleading terminology calling industrial energy facilities 'farms.' Barb Newton (Rib Mountain) supported speed reduction and no-passing zone on Double End road, noting 75 petition signatures and near-collision incidents. Heidi Pesky (McMillan) argued against joint development agreements, listing concerns about county liability and restrictions. Cindy Hogan (Rib Mountain) supported the speed reduction petition.",
    actionItems: [
      "Board to consider PFAS litigation resolution at next week's meeting",
      "Board to vote on comprehensive plan advancement at next week's meeting",
      "Board to consider Rib Mountain speed limit and no-passing zone recommendation",
      "County to evaluate options for engaging with proposed wind energy projects including potential Joint Development Agreement negotiations",
    ],
  },
  {
    id: "gugcMAm6DFA", source: "wausau",
    title: "gugcMAm6DFA",
    date: "April 28, 2026", shortDate: "APR 28",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=gugcMAm6DFA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Board of Public Works held a brief meeting to open bids for the 2026 asphalt paving project. RC Pavers was awarded the contract with the low bid of $824,146.34, beating American's bid of $849,872.10.",
    agenda: [
      { time:"0:00", item:"Call to order" },
      { time:"0:08", item:"Open bids and make recommendation for the 2026 asphalt paving project" },
      { time:"0:50", item:"Adjournment" },
    ],
    discussions: [
      { item:"2026 Asphalt Paving Project Bids", body:"Two bids were opened for the asphalt paving project. RC Pavers submitted the low bid at $824,146.34, while American bid $849,872.10. A motion was made to approve RC Pavers as the contractor. The motion was seconded and passed with unanimous approval." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "RC Pavers awarded the 2026 asphalt paving project contract at $824,146.34",
    ],
  },
  {
    id: "f1fZvkxedNY", source: "wausau",
    title: "f1fZvkxedNY",
    date: "April 28, 2026", shortDate: "APR 28",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=f1fZvkxedNY",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Board of Public Works approved contractor bids for the 26th Street construction project, approved a change order for the Randolph Street\/Cherry Street project addressing unexpected site conditions, and approved a pay estimate and concrete license. All items passed unanimously with minimal discussion.",
    agenda: [
      { time:"0:01", item:"Call to order" },
      { time:"0:01", item:"Consideration of March 10th regular Board of Public Works minutes" },
      { time:"0:23", item:"Open bids - 26th Street construction project" },
      { time:"1:25", item:"Open bids - North 8th Avenue (postponed)" },
      { time:"1:35", item:"2025 street construction project A - Randolph Street, Cherry Street Change Order 1" },
      { time:"5:01", item:"2025 street construction project A - Pay Estimate #9" },
      { time:"5:30", item:"Portland cement concrete license - KSK Incorporated" },
      { time:"6:00", item:"Adjournment" },
    ],
    discussions: [
      { item:"March 10th Board of Public Works Minutes", body:"Minutes were approved with a motion and second. Passed unanimously with no discussion." },
      { item:"26th Street Construction Project Bid Opening", body:"Seven bids were opened and read aloud. Switlick submitted the lowest bid at $1,279,089.75, narrowly beating Hos at $1,280,877.96. Other bidders included A1 ($1,374,600), Francis Melvin ($1,385,383), Steen ($1,489,126), James Peterson ($1,570,698.56), and Earth ($1,686,078.75). A member noted the 'tight bids' between the top two. Motion to approve Switlick as the contractor passed unanimously." },
      { item:"North 8th Avenue Bid Opening", body:"This item was postponed as the bid opening deadline was extended. Will return at a future meeting." },
      { item:"Randolph Street\/Cherry Street Change Order 1", body:"Staff presented four items totaling $14,436.50 for unexpected field conditions: an inside drop manhole ($4,856) for an unrecorded large diameter sanitary service, water main tie-in modifications ($2,317.50) due to finding 6-inch instead of 8-inch main, miscellaneous storm sewer work ($5,016) for private tie-ins, and geogrid installation ($2,247) for poor soils near Thomas Jefferson Elementary. Change Order 2 regarding liquidated damages was deferred pending further discussion. Approved unanimously." },
      { item:"Randolph Street\/Cherry Street Pay Estimate #9", body:"Pay estimate for work completed through end of year totaling $535,114.42 from Haw Suns Incorporated was recommended and approved unanimously." },
      { item:"Portland Cement Concrete License - KSK Incorporated", body:"Vinnie confirmed he reviewed the application and everything was in order. License approved unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Switlick awarded 26th Street construction project contract at $1,279,089.75",
      "Change Order 1 for Randolph\/Cherry Street project approved for $14,436.50",
      "Pay Estimate #9 for Haw Suns approved for $535,114.42",
      "Portland cement concrete license issued to KSK Incorporated",
      "North 8th Avenue bid opening to return at future meeting",
      "Change Order 2 with liquidated damages discussion to return at future meeting",
    ],
  },
  {
    id: "aUG3K0hxNsU", source: "weston",
    title: "aUG3K0hxNsU",
    date: "April 28, 2026", shortDate: "APR 28",
    committee: "Finance and Human Resource Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=aUG3K0hxNsU",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Finance and Human Resource Committee debated employee clothing allowances after canceling a Cintas uniform contract, ultimately recommending a compromise of $400 for 2026 and $500 annually starting 2027, plus a washer and dryer for staff. The committee also received an extensive educational presentation on public works operations and budget, showing the department operates below average costs compared to peer communities.",
    agenda: [
      { time:"0:01", item:"Call to order and Pledge of Allegiance" },
      { time:"0:30", item:"Roll call" },
      { time:"0:45", item:"Public comments" },
      { time:"3:15", item:"Approval of minutes from February 16, 2026" },
      { time:"3:45", item:"Acknowledge February 2026 financial reports" },
      { time:"4:15", item:"Acknowledge T1 and T2 detail reports for February" },
      { time:"4:45", item:"Acknowledge legal details for February" },
      { time:"5:00", item:"Educational presentation on public works operations and budget" },
      { time:"40:03", item:"Discussion and action on clothing and equipment allowance amendments" },
      { time:"1:12:00", item:"Staff and committee remarks, future agenda items" },
      { time:"1:15:45", item:"Adjournment" },
    ],
    discussions: [
      { item:"Approval of minutes from February 16, 2026", body:"Steve made a motion to approve the minutes, seconded by Stephanie. The motion passed unanimously with all members voting aye." },
      { item:"February 2026 financial reports and work products", body:"The committee acknowledged the February 2026 financial reports for all funds, T1 and T2 detail reports, and legal details. All acknowledgment motions passed unanimously." },
      { item:"Public Works operations and budget presentation", body:"Public Works Director Michael presented an extensive overview of department operations, noting the 2026 budget decreased by $26,000 (1.1%) compared to 2025. He highlighted that the village manages 119.5 centerline miles of road with 10 full-time staff (one fewer than in 2010). Michael emphasized the department spends approximately $9,700 less per mile than the average central Wisconsin community, making Weston the second lowest per capita and third lowest per mile in the region. He discussed the recent major snow event where employees worked up to 17.5 hours straight, with estimated costs of $50,000 for that single storm event. The county is pursuing disaster relief funding with the state." },
      { item:"Clothing and equipment allowance amendments", body:"Extensive debate occurred over increasing employee clothing stipends from $300 to $600 after canceling the Cintas uniform contract. Michael argued the change maintains existing benefits in a different format and saves on contract fees. Committee member [Daniels] opposed the increase, citing fiscal responsibility and the upcoming fire department referendum. The initial motion for $600 failed (2 yes - Daniels, one other; 3 no - Armain\/Love, Olsson, and chair abstained). A motion for $400 also failed 2-3. A motion for $500 with washer\/dryer failed. Finally, a motion for $400 remainder of 2026, $500 annually starting 2027, plus one-time washer\/dryer purchase passed with majority approval." },
    ],
    publicComment: "Lisa Beck of 1808 Cortez Lane offered public comment. She praised Public Works Director Mike for the department's work following the recent major storm. She also questioned the proposed clothing allowance increase, suggesting the village should consider a lesser amount rather than the highest proposed amount to save money, noting she doesn't know any other company that offers such benefits.",
    actionItems: [
      "Recommend to village board: Clothing allowance of $400 for remainder of 2026, $500 annually starting 2027, plus one-time purchase of washer and dryer for staff",
      "New public works employee starting Wednesday to bring street staff back to 10 members",
      "Marathon County pursuing state disaster relief funds for February storm event - village to submit detailed costs",
      "Salt order placed with state cooperative for 1,500 tons with seasonal fill option starting December",
      "Next meeting scheduled for Tuesday, April 21st at 5:00 PM due to new board member swearing-in",
    ],
  },
  {
    id: "_hS5GDGVL1c", source: "wausau",
    title: "_hS5GDGVL1c",
    date: "April 28, 2026", shortDate: "APR 28",
    committee: "Public Health & Safety", duration: "~1h",
    url: "https://www.youtube.com/watch?v=_hS5GDGVL1c",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Public Health and Safety Committee approved a parklet permit for Westider Diner and Lounge after the owner presented detailed plans, deferred one bartender license denial pending police chief review of rehabilitation evidence, and approved multiple other licenses and event permits. The committee also received updates on the fire department's 2025 operations and the upcoming transition of the homeless shelter from WMC to Bridge Street Mission.",
    agenda: [
      { time:"0:00", item:"Call to order and excused absences (Alders Molini and Lucans)" },
      { time:"0:30", item:"Public comment on agenda items" },
      { time:"1:00", item:"Approval of February 16th, 2026 meeting minutes" },
      { time:"1:30", item:"License applications - Westider Diner parklet permit" },
      { time:"10:00", item:"License denial recommendations - Theodore Davis and Joanna Gregory" },
      { time:"18:30", item:"Batch approval of licenses and event permits" },
      { time:"20:01", item:"Repealing and recreating solid waste disposal code Chapter 6.44" },
      { time:"22:00", item:"Repealing handheld mobile phone ordinance section 10.01.012" },
      { time:"25:01", item:"MREA solar program memorandum of understanding" },
      { time:"27:00", item:"Fire Department 2025 annual report" },
      { time:"33:00", item:"Tavern activities report February 2026" },
      { time:"37:00", item:"Community outreach update and homeless shelter transition" },
    ],
    discussions: [
      { item:"Westider Diner and Lounge Parklet Permit", body:"Owner Tyler Vote presented detailed plans for a parklet extending 4 feet into the street and 4 feet on the sidewalk at 628 North Third Avenue. He explained it would provide sunny seating for breakfast customers and be similar to the previous parklet at Malarkey's Pub. Alder Larson noted initial skepticism but said seeing the layout changed his mind. The permit was approved unanimously with Watson making the motion and Larson seconding, with Vote asked to return in November to report on how it went." },
      { item:"Theodore Davis Bartender License Denial", body:"Davis appeared to address a denial recommendation for his bartender license related to an offense from 20 years ago when he was a minor. He stated he completed registry requirements and is in ongoing therapy. His boyfriend Matthew Prieb also spoke, emphasizing Davis's rehabilitation and character. Deputy Chief Baiton indicated Chief Barnes had received rehabilitation evidence but hadn't reviewed it yet. The committee voted to hold the item for the next meeting pending the chief's review of the rehabilitation documents." },
      { item:"Joanna Gregory Bartender License Denial", body:"Gregory did not appear at the meeting. The denial was included in the batch motion for licenses as recommended by staff." },
      { item:"Batch License and Event Approvals", body:"The committee approved licenses as recommended including three establishments reviewed by the liquor license subcommittee (Oasis Arcade, rebranded Whiskey River Bar and Grill, and new owner for Hayawa), plus summer events including Wings over Wasau, Concerts on the Square, Chalkfest, Memorial Day parade, Hope on the Block, and Jazz on the River. Motion by Larson, seconded by Watson, passed unanimously." },
      { item:"Solid Waste Disposal Code Update", body:"The committee approved repealing and recreating Chapter 6.44 to comply with state-level changes. Assistant City Attorney Vinnie Bonino was available for questions but none were asked. Motion by Larson, seconded by Watson, passed unanimously." },
      { item:"Repeal of Handheld Mobile Phone Ordinance", body:"The committee repealed the local cell phone ban ordinance as state traffic laws have since caught up to regulate cell phone usage, making the local ordinance redundant. Attorney Bonino confirmed the inattentive driving statute now regulates this more narrowly. Motion by Watson, seconded by Larson, passed unanimously." },
      { item:"MREA Solar Program Partnership", body:"Carrie from the planning department explained the partnership with Midwest Renewable Energy for a group solar purchasing program. The sustainability committee had unanimously recommended it on March 5th. Alder Sarah, who has solar on her house, praised the partnership with MREA as experts. Motion by Watson, seconded by Larson, passed unanimously." },
      { item:"Fire Department 2025 Annual Report", body:"Fire Chief reported the department handled over 7,200 calls (averaging 20 per day) in 2025, setting a new record. He announced that as of Friday, Wausau regained ISO Class 2 status for the next four years. The chief mentioned three upcoming public information sessions on March 31st, April 1st, and April 3rd regarding the April 7th referendum. The report was placed on file." },
      { item:"Homeless Shelter Transition Update", body:"Tracy Durante reported 415 unduplicated guests served since the WMC shelter opened and over 740 volunteer hours in February. James Torensson, new Director of Homeless Services at Bridge Street Mission, explained the shelter transition would occur around April 20th, with WMC extending its contract through April 19th to ensure no gap in service. The committee expressed interest in touring the new facility, possibly at the ribbon cutting ceremony." },
    ],
    publicComment: "One public comment was offered at the end of the meeting by Carrie Mor Everest of 1025 Everest Boulevard, who has volunteered at the shelter for 10 months. She expressed concerns about how unhoused individuals are treated during emergency 911 responses at the shelter, stating they are treated differently than other community members. She indicated frustration that complaints over 10 months had not been addressed and was directed to bring concerns to the Police and Fire Commission.",
    actionItems: [
      "Parklet permit approved for Westider Diner and Lounge at 628 North Third Avenue for summer 2026; owner to report back in November",
      "Theodore Davis bartender license decision held pending Chief Barnes' review of rehabilitation evidence",
      "Joanna Gregory bartender license denied as recommended",
      "Multiple summer event permits approved including Wings over Wasau, Concerts on the Square, Chalkfest, Memorial Day parade",
      "Chapter 6.44 solid waste disposal code repealed and recreated",
      "Section 10.01.012 handheld mobile phone ordinance repealed",
      "MREA solar program memorandum of understanding approved",
      "Committee to schedule tour of Bridge Street Mission shelter at ribbon cutting ceremony",
      "Staff to verify tavern report point totals for Days establishment and check on Trace Armanos status",
    ],
  },
  {
    id: "Izfp0CD_Da0", source: "weston",
    title: "Izfp0CD_Da0",
    date: "April 28, 2026", shortDate: "APR 28",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=Izfp0CD_Da0",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Board of Trustees approved multiple ordinances including rezoning requests and a modified speed limit ordinance for Weston Avenue, rejected the original proposal to lower speeds to 35 mph from Von Kennel to Highway J (keeping it at 45 mph instead). The board also approved a 10-year baseball\/softball field maintenance agreement, park fee changes, and various infrastructure contracts while deferring action on the remote meeting attendance policy until the new board is seated.",
    agenda: [
      { time:"0:01", item:"Call to order and Pledge of Allegiance" },
      { time:"0:01", item:"Roll call" },
      { time:"1:15", item:"Public comments" },
      { time:"5:01", item:"Minutes from previous meeting" },
      { time:"5:30", item:"Acknowledge reports from boards, committees, and commissions" },
      { time:"7:00", item:"Department reports (Administrator, Clerk, Finance, Fire\/EMS, Parks, Planning, Police, Public Works, Technology)" },
      { time:"20:02", item:"Ordinances - Rezoning and speed limit changes" },
      { time:"30:01", item:"Resolution - Hinter Springs Second Edition subdivision final plat" },
      { time:"32:00", item:"Referendum informational sessions update" },
      { time:"35:02", item:"E-bike and euro ordinance discussion" },
      { time:"40:00", item:"Intersection signage at Community Center Drive and Birch Street" },
      { time:"45:01", item:"Baseball\/softball field maintenance agreement and park fees" },
      { time:"55:02", item:"Infrastructure contracts and change orders" },
    ],
    discussions: [
      { item:"Public Comments - Fire Department Funding", body:"Jim Pensel of 5002 Aerrol Street spoke passionately about SAFER fire department staffing concerns after attending the citizen academy. He criticized the board's approach of using a referendum rather than prioritizing the budget, stating 'We don't have a revenue problem here in Weston. We have a priority problem.' He urged the board to fund fire\/EMS over amenities like artificial turf and the aquatic center." },
      { item:"Finance Director Response to Public Comment", body:"Finance Director Jessica responded that the village cannot borrow for additional firefighters - only for capital projects like the Kennedy Park turf. She noted the village is 'the cheapest' and most efficient but cannot fund more staff. She mentioned the public works challenges during the recent blizzard due to understaffing and expressed frustration with criticism of staff, suggesting her position might be open in a couple months." },
      { item:"Speed Limit Ordinance 26-006", body:"The original motion to approve the speed limit changes failed 4-3 with Maloney, Jordan, and the president voting no. Trustee Maloney objected to reducing Weston Avenue from Von Kennel to Ryan to 35 mph, stating 'I've driven that probably 20 times...comparing that 35 mph stretch to Scoffield Avenue or Ross Avenue...I just can't vote for that.' A second motion was made by Maloney to keep Von Kennel to Highway J at 45 mph while reducing Camp Phillips to Von Kennel to 35 mph, which passed with Trustee Kern as the only no vote." },
      { item:"Removal of No Parking Restrictions at Kennedy Park", body:"The board approved removing no parking restrictions on the west side of Alderson Street along Kennedy Park. Michael explained the original restrictions were from when the high school used the fields for soccer. The change accommodates the farmers market, events at Kennedy Park, and anticipated traffic changes during the upcoming roundabout construction. Approved unanimously." },
      { item:"Intersection Signage at Community Center Drive and Birch Street", body:"The board approved changing the stop sign to a yield sign with a friendly amendment to add a stop sign for bicyclists coming off the pedestrian bridge. Trustee Huang raised safety concerns about cyclists exiting the bridge at 15-20 mph into traffic, stating 'You can't expect him because we don't think of the same.' The amended motion passed unanimously." },
      { item:"Baseball\/Softball Field Maintenance Agreement", body:"The board approved a 10-year agreement with youth baseball and softball organizations. The committee chose 10 years to protect the village's investment at Kennedy Park in case organizations pull out. Two highlighted additions were the 10-year term and that the village determines when fields can be used. Approved unanimously." },
      { item:"Remote Meeting Attendance Policy", body:"Trustee Lewis recommended postponing this item until the next meeting so the new sitting board makes the decision. The motion to defer passed unanimously." },
      { item:"Microsoft Teams for Communication", body:"The board approved using Microsoft Teams for trustee communications starting with the next term. Discussion included how to access multiple Teams accounts and that a training session will be held for the new board. Approved unanimously." },
    ],
    publicComment: "Jim Pensel of 5002 Aerrol Street spoke for approximately 4 minutes about fire department funding concerns. He praised SAFER staff after attending the citizen academy but criticized the board's referendum approach, arguing the village has a 'priority problem' not a revenue problem. He called for cutting amenities like artificial turf and the aquatic center to fund essential services.",
    actionItems: [
      "Approved minutes from February 16th board meeting",
      "Approved rezoning of portion of 8905 Bert Street from RR5 to SFS",
      "Approved rezoning of portion of 7105 Christensen Avenue from SL to SFS",
      "Approved modified speed limit ordinance: Camp Phillips to Von Kennel at 35 mph, Von Kennel to Highway J remains at 45 mph",
      "Approved final plat of Hinter Springs Second Edition subdivision",
      "Tabled e-bike\/euro ordinance pending county finalization",
      "Approved removal of no parking restrictions on west side of Alderson Street along Kennedy Park",
      "Approved changing stop sign to yield sign at Community Center Drive\/Birch Street with added bicycle stop sign on path",
      "Approved 10-year baseball\/softball field maintenance agreement",
      "Approved commercial rotary mower purchase",
      "Approved park shelter fees and field rental costs",
      "Approved Eagle Scout project at McKiller Park funded from park operations",
      "Deferred remote meeting attendance policy to next meeting for new board decision",
      "Approved Microsoft Teams for trustee communication",
      "Approved Military Road utility engineering service contract",
      "Approved Business 51 storm pond engineering service contract amendment ($13,500)",
      "Approved sewer televising software contract",
      "Approved 2026 annual stream maintenance plan budget",
      "Approved hospital area repaving change order number four",
      "Approved well rehabilitation",
      "Approved sign encroachment agreement with Seventh Floor Investments LLC",
      "Next meeting scheduled for Tuesday, April 21st at 6 PM with new board members",
    ],
  },
  {
    id: "HwjjV4oIneA", source: "marathon",
    title: "HwjjV4oIneA",
    date: "April 28, 2026", shortDate: "APR 28",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=HwjjV4oIneA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board of Supervisors adopted the County Comprehensive Plan 2026 after approving 9 of 10 proposed amendments addressing renewable energy terminology, data centers, AI technology, and energy policy. The board also approved salaries for elected officials, authorized phase 2 design for a new highway facility, approved PFAS litigation engagement, and ratified a local emergency declaration for the recent blizzard.",
    agenda: [
      { time:"0:12", item:"Call to order, pledge of allegiance, moment of reflection" },
      { time:"1:30", item:"Roll call and welcome of visitors" },
      { time:"2:15", item:"Consent agenda items C8 through C13 B2" },
      { time:"2:45", item:"D14 - Adopting Marathon County Comprehensive Plan 2026 (Ordinance 0-13-26)" },
      { time:"1:20:01", item:"E15 - Establishing salaries for elected officials (Resolution 12-26)" },
      { time:"1:21:00", item:"E16 - Phase 2 design services for new highway facility (Resolution 13-26)" },
      { time:"1:23:30", item:"E17 - PFAS litigation outside counsel engagement (Resolution 14-26)" },
      { time:"1:28:00", item:"E18 - Carry forwards and budget amendments (Resolution R-20-26)" },
      { time:"1:29:30", item:"E19 - Capital asset threshold resolution (Resolution 21-26)" },
      { time:"1:30:01", item:"F20 - Law enforcement drug trafficking response grant" },
      { time:"1:31:00", item:"G21 - Ratification of local state of emergency declaration (Resolution 22-26)" },
      { time:"1:35:00", item:"H22 - County Administrator performance evaluation" },
      { time:"1:38:30", item:"Announcements and recognition of departing supervisors" },
    ],
    discussions: [
      { item:"Comprehensive Plan 2026 (Ordinance 0-13-26)", body:"Administrator Leonard presented 10 proposed amendments compiled from supervisor feedback. Amendments 1-9 were adopted; Amendment 1 (livability factors) passed unanimously; Amendments 2-4 (changing 'renewable energy' to 'energy systems' language) passed but not unanimously after Supervisor Crawl requested they be voted separately; Amendment 5 (data centers\/battery storage background) passed not unanimously with Supervisor Leur voting no citing ideological concerns; Amendment 6 (radon and lead references) passed unanimously; Amendment 7 (regulate energy projects when allowed by law) passed not unanimously; Amendment 8 (AI and automation language) passed unanimously after Supervisor Leur explained her intent for transparency in AI decision-making; Amendment 9 (energy policy) was amended by Supervisor Boots to read 'promote coal and natural gas until a long-term sustainable and reliable energy source can be found that does not adversely affect agricultural land' - this passed not unanimously after debate about clean coal viability. A late amendment by Supervisor Sundulski regarding utility-scale wind\/solar as industrial uses was defeated after discussion about PSC authority and concerns it wasn't ready. The final comprehensive plan as amended passed but not unanimously." },
      { item:"Establishing salaries for elected officials (Resolution 12-26)", body:"Resolution establishing salaries for clerk of courts, sheriff, and elected department heads for the upcoming term. Motion by Supervisor Conway, second by Supervisor Rosenberg. Passed with no discussion." },
      { item:"Highway facility phase 2 design (Resolution 13-26)", body:"Supervisor Soyber requested future information about plans for the old facility. Chair Gibbs noted this would be addressed by HR Finance and Property Committee in the future. Supervisor Sundulski asked about the $53 million cost figure but was told that wasn't part of this vote. Resolution passed unanimously." },
      { item:"PFAS litigation engagement (Resolution 14-26)", body:"Two amendments were adopted: Supervisor Robinson's amendment directing the county administrator to evaluate past and present practices that may have resulted in PFAS release or exposure to determine risk passed unanimously. Vice Chair Dickinson's amendment modifying airport-related language to reference county property passed unanimously. The resolution as amended passed unanimously." },
      { item:"Local emergency declaration ratification (Resolution 22-26)", body:"Administrator Leonard explained the ratification preserves the county's opportunity for reimbursement after the governor's emergency declaration expired during the blizzard. He praised staff across facilities, parks, highway, sheriff's office, and airport for working 12-16 hour shifts during the storm, with over 600 hours of call-in time in 24 hours. Supervisor Fifer echoed thanks as infrastructure committee chair. Passed unanimously." },
      { item:"County Administrator performance evaluation", body:"Chair Gibbs explained the executive committee had completed the administrator's evaluation using board input summarized at the previous meeting, with no wording changes. Supervisor Robinson moved to accept the executive committee's recommendation on salary and performance evaluation without going into closed session. Passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Comprehensive Plan 2026 adopted with 9 amendments as Ordinance 0-13-26",
      "Salaries established for clerk of courts, sheriff, and elected department heads for upcoming term",
      "Phase 2 design services authorized for new highway facility",
      "Outside counsel engaged on contingency basis for PFAS litigation; administrator directed to evaluate county PFAS exposure risks",
      "Carry forwards and budget amendments approved (Resolution R-20-26)",
      "Capital asset threshold set at $10,000 for general assets and $50,000 for infrastructure",
      "Law enforcement drug trafficking response grant accepted with budget amendment",
      "Local state of emergency declaration ratified for blizzard response",
      "County Administrator evaluation and salary placement finalized",
      "Departing supervisors recognized: Crawl, Fifick, Marshall, Rosenberg, Hardinger, V, and Reynolds",
    ],
  },
  {
    id: "D7R7a0G0WTA", source: "weston",
    title: "D7R7a0G0WTA",
    date: "April 28, 2026", shortDate: "APR 28",
    committee: "Parks and Recreation Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=D7R7a0G0WTA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Parks and Recreation Committee approved minutes, selected Rettler Corporation as the consultant for Mosinee Park's master plan, and discussed increasing park impact fees to be more in line with neighboring communities. The committee also reviewed Yellow Banks kayak launch expenses showing significant grant funding success, and discussed operations of the Kennedy Park ice rink.",
    agenda: [
      { time:"0:05", item:"Call to order and Pledge of Allegiance" },
      { time:"0:30", item:"Roll call" },
      { time:"0:45", item:"Approval of minutes from February 23rd, 2026" },
      { time:"1:00", item:"Public comments" },
      { time:"5:45", item:"Review of parks and recreation impact fee discussion" },
      { time:"25:30", item:"Request for proposals for graphic master plan and budget estimates for Mosinee Park" },
      { time:"32:00", item:"Review of Yellow Banks kayak launch expenses" },
      { time:"38:00", item:"Discussion on components of operations for the ice rink at Kennedy Park" },
      { time:"50:00", item:"Future items and possible next meeting date" },
      { time:"52:30", item:"Remarks from staff and committee members and adjournment" },
    ],
    discussions: [
      { item:"Approval of minutes from February 23rd, 2026", body:"Motion to accept the minutes was made and seconded. No discussion. Motion carried unanimously with all present voting in favor." },
      { item:"Parks and Recreation Impact Fee Discussion", body:"Jennifer presented information on park impact fees, noting the village currently charges $300 for single family homes while neighboring communities charge $600-$900. The 2020 study allowed fees up to $761 but the village only raised them from $244 to $300 in 2022. Committee members expressed support for a moderate increase to align with neighboring communities like Kronenwetter ($603) and Rib Mountain ($650). Katrina stated she supports the moderate increase bracket, and the committee consensus was to keep fees consistent with neighbors. No formal action taken; information will go back to Plan Commission." },
      { item:"Request for Proposals for Mosinee Park Master Plan", body:"Seven proposals were received for the park master plan, reviewed by four staff members. The two lowest bidders were JSD and Rettler Corporation, both with village experience. Roger made a motion to select Rettler Corporation, Katrina seconded. Motion carried unanimously. Staff noted Rettler has done the village's CORP update and most recent master plans including Kennedy Park." },
      { item:"Review of Yellow Banks Kayak Launch Expenses", body:"Jessica prepared a detailed expense report showing all project costs including unforeseen expenses like subgrade work and an abandoned well casing. Grants were secured by Jessica and Dan Hagenbotham, with Marathon County Transportation covering the full ADA accessibility expense. Committee members praised the transparency and grant work, with Katrina noting this was a 'huge success' in reducing out-of-pocket costs. Lisa Beck in public comment also praised the RFC as 'super well written.' No formal action required; informational item only." },
      { item:"Ice Rink Operations at Kennedy Park", body:"Staff presented information requested by committee member Katrina. The warming house has been unattended since 2020 due to COVID and subsequent staffing shortages. Everest Youth Hockey remains interested in improvements including a covered structure. Staff noted Marathon Park changes may increase demand for ice facilities. Katrina emphasized not wanting hockey to be forgotten amid baseball focus at Kennedy Park. Committee requested additional information for next month including historical attendance figures from 2018-2019 and user feedback." },
    ],
    publicComment: "Jim Pinsel expressed frustration about receiving no response to his three-page document submitted at the previous meeting regarding playground equipment installation, Kennedy Park fundraising updates, and ice rink costs. He argued the true cost of operating the ice rink is $20,000-$30,000 when factoring in labor hours, not just the $1,320.98 stated. Lisa Beck praised Michael for handling the blizzard weekend and commended Sean and Jessica for the well-written Yellow Banks RFC. A written response to Jim Pinsel's previous email was also submitted and will be included in the minutes.",
    actionItems: [
      "Rettler Corporation selected as consultant for Mosinee Park master plan",
      "Jennifer to present neighboring community impact fee comparisons to Plan Commission next month",
      "Staff to bring back historical ice rink attendance figures from 2018-2019 seasons",
      "Staff to gather user feedback on Kennedy Park ice rink for future meeting",
      "Quarterly Kennedy Park project update scheduled for April board meeting",
      "Next Parks and Recreation Committee meeting scheduled for April 27th, 2026",
    ],
  },
  {
    id: "8rRo1cm2YJ0", source: "wausau",
    title: "8rRo1cm2YJ0",
    date: "April 28, 2026", shortDate: "APR 28",
    committee: "Finance", duration: "~1h",
    url: "https://www.youtube.com/watch?v=8rRo1cm2YJ0",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Finance Committee approved several routine items including airport ground leases and budget carryovers, but postponed decisions on participating in a national opioid settlement and funding a lead service line replacement project shortfall until more information could be gathered. The committee also approved transfers to cover shortfalls in recycling, airport, and parking funds, and endorsed a borrowing calendar for 2026 capital improvements.",
    agenda: [
      { time:"2:01", item:"Call to order and public comment" },
      { time:"2:30", item:"Approval of March 10, 2026 minutes" },
      { time:"3:00", item:"Alleged claim for recovery of unlawful tax - Green Acres at Greenwood Hills LLC" },
      { time:"3:45", item:"Consent to transfer title at 939 Woods Place" },
      { time:"4:15", item:"Terminating airport ground lease with Win O. Jones" },
      { time:"4:35", item:"Approving airport ground lease with Owen Jones" },
      { time:"5:00", item:"Approving airport ground lease with Cole Lundberg" },
      { time:"5:20", item:"National opioid settlement agreement participation" },
      { time:"12:00", item:"Budget amendment for lead service line replacement project" },
      { time:"27:03", item:"Budget amendment for carryover funds from 2025 to 2026" },
      { time:"29:00", item:"Review of 2025 motorpool fund financial results" },
      { time:"37:00", item:"Review of 2025 general fund financial results and related transfers" },
      { time:"47:00", item:"Approving 2026 general obligation promissory note calendar" },
    ],
    discussions: [
      { item:"March 10, 2026 Minutes", body:"Watson moved to approve, Griner seconded. Passed unanimously with no discussion." },
      { item:"Green Acres at Greenwood Hills LLC Tax Claim", body:"This claim is part of ongoing litigation with Greenwood Hills. The chair explained that a yes vote would approve the claim and a no vote would deny it. Watson moved to approve, Griner seconded. The motion failed when members voted no, effectively denying the claim." },
      { item:"Airport Ground Lease Transfers - 939 Woods Place", body:"Three related items handled the transfer of a hangar from Win O. Jones to Owen Jones. All three motions (consent to transfer title, terminating old lease, approving new lease) passed unanimously with Watson, Griner, and Tierney making various motions and seconds." },
      { item:"Airport Ground Lease with Cole Lundberg", body:"Griner moved to approve, Watson seconded. Passed unanimously without discussion." },
      { item:"National Opioid Settlement Agreement", body:"Committee members expressed concerns about joining without more information. Alder Malini asked where the proposal came from, noting the committee had never discussed opioids. Assistant City Attorney Vincent explained that law firms leading class actions solicit potential plaintiffs. Watson noted concerns about signing away future legal remedies. The deadline to participate is May 4th. Griner moved to postpone to the next meeting, Tierney seconded. Passed unanimously." },
      { item:"Lead Service Line Replacement Budget Amendment", body:"Eric from Public Works explained that the DNR changed their funding formula, leaving $709,672 in costs unfunded by the subsidized loan. The shortfall breaks down to $283,868 for homeowner-side work and $425,803 for water utility work. Finance Director Marian outlined options including borrowing, using general fund reserves, or using PFAS settlement money. Tierney stated opposition to adding more debt given current debt levels. Watson moved to postpone to allow determination of funding sources. Griner seconded. Passed unanimously." },
      { item:"Budget Amendment for Carryover Funds", body:"Finance Director explained the large carryover number includes $10 million for transit buses funded by VW mitigation grants. Other projects include airport grant-funded items and contracts let but not yet completed. Unstarted projects include city hall chimney liner, public safety roof, and DPW fence replacement. Watson moved to approve, Griner seconded. Passed unanimously." },
      { item:"2025 Motorpool Fund Financial Results", body:"Finance Director reported motorpool struggles with cash flow. After transferring $191,000 in GMT money, the fund shows $150,000 profit. However, with outstanding purchase orders for equipment ordered as far back as 2023, there's a projected $177,000 cash shortfall. Solomon from Motorpool explained two dump trucks from 2023 are waiting for spreader upfits and are now second and third in line. ARPA savings may cover the shortfall. This was informational only - no action required." },
      { item:"2025 General Fund Financial Results", body:"The general fund showed a $1.2 million surplus driven by strong building permits, GMT money, and investment income. After motorpool charges and proposed transfers to recycling, airport, and parking funds, surplus would be $540,000. CCITC was over budget by $194,000 due to communication issues including unbudgeted website costs ($91,000), Office 365 upgrade ($65,000), and a duplicate 95% personnel budget adjustment ($70,000). Tierney moved to approve transfers, Watson seconded. Passed unanimously." },
      { item:"2026 General Obligation Promissory Note Calendar", body:"Finance Director presented the borrowing calendar for 2026 capital improvements totaling approximately $10 million against $12 million in retiring debt. Watson noted debt utilization will decrease slightly. Watson moved to approve the calendar, the chair seconded after no initial second. Discussion noted most 2026 projects have already been bid and contracts signed. Passed unanimously. Phil Cawson from Ehlers will present parameters resolution at next meeting." },
      { item:"Consideration of Purchasing Properties for DPW", body:"Properties at 108, 112, 112½ Adolf Street and 233 Myron Street were scheduled for closed session discussion. Due to time constraints with council starting at 6:30 and needing to relocate to the boardroom, Watson moved to postpone to next meeting. Eric confirmed time is not of the essence. Tierney seconded. Passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Denied tax recovery claim for Green Acres at Greenwood Hills LLC",
      "Approved transfer of hangar ownership and ground lease from Win O. Jones to Owen Jones at 939 Woods Place",
      "Approved airport ground lease with Cole Lundberg",
      "Postponed opioid settlement participation decision to next meeting - staff to provide more information",
      "Postponed lead service line funding decision to next meeting - committee to determine funding source options",
      "Approved budget amendment for 2025-2026 carryover funds",
      "Approved transfers from general fund to recycling, airport, and parking funds",
      "Approved 2026 borrowing calendar - parameters resolution to come at next meeting with Ehlers representative",
      "Postponed closed session discussion on DPW property purchases to next meeting",
    ],
  },
  {
    id: "47UbKS2Jqo4", source: "marathon",
    title: "47UbKS2Jqo4",
    date: "April 28, 2026", shortDate: "APR 28",
    committee: "Executive Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=47UbKS2Jqo4",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Executive Committee met briefly before voting unanimously to enter closed session to discuss the performance review of the county administrator. The committee was considering feedback received from the board the previous Thursday to finalize the administrator's evaluation.",
    agenda: [
      { time:"0:00", item:"Call to order" },
      { time:"0:05", item:"Pledge of Allegiance" },
      { time:"0:25", item:"Performance review of the administrator (Item 3A1)" },
    ],
    discussions: [
      { item:"Performance review of the administrator", body:"The chair explained this was an opportunity to go into closed session to finalize the administrator's review based on board feedback received the previous Thursday. The committee had rated the administrator on various questions using three criteria: needs improvement, successful, and exceptional, with scores averaged on a 0-5 scale. Corporation counsel began to provide a summary of the appraisal before a motion was made to enter closed session." },
      { item:"Motion to enter closed session", body:"A motion was made and seconded to enter closed session for the administrator evaluation. The roll call vote was unanimous with all members voting aye: Gibbs, Dickinson, Arstead, Boots, Drebeck, Fifick, Mask, Ritter, Morash, and Robinson. The committee then entered closed session." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Committee entered closed session to discuss and finalize the county administrator's performance evaluation",
    ],
  },
  {
    id: "0pfKykvicdA", source: "marathon",
    title: "0pfKykvicdA",
    date: "April 28, 2026", shortDate: "APR 28",
    committee: "Marathon County Human Resources and Finance Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=0pfKykvicdA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County HR & Finance Committee approved several routine items including a claim disallowance, revised property values for public auction, carry forward funds resolution, and a capital assets threshold policy amendment. The committee also received an introduction from new healthcare consultants National Insurance Services and heard detailed fiscal updates for 2025 year-end and 2026 year-to-date.",
    agenda: [
      { time:"0:00", item:"Claim disallowance - Mercedes Holmes" },
      { time:"2:41", item:"Revised property values for public auction parcels" },
      { time:"5:00", item:"Resolution to approve carry forward funds" },
      { time:"11:31", item:"Resolution to amend capital assets threshold policy" },
      { time:"12:30", item:"Introduction of healthcare consultants - National Insurance Services" },
      { time:"37:07", item:"Audited 2025 year-end fiscal update" },
      { time:"55:03", item:"2026 year-to-date fiscal update" },
      { time:"58:14", item:"Finance Department quarterly update" },
      { time:"1:07:57", item:"County Treasurer update" },
      { time:"1:36:20", item:"Announcements and adjournment" },
    ],
    discussions: [
      { item:"Claim disallowance - Mercedes Holmes", body:"Corporation Counsel presented a claim received December 5th from Mercedes Holmes relating to the death of her 3-year-old child Zalen Bernett, who was placed in a treatment foster care home licensed through another agency in Dunn County. The death was determined to be natural causes with no wrongdoing found through law enforcement and social service investigations. Outside counsel and the insurance carrier recommended disallowance. Chair Gibbs moved to disallow the claim, seconded by Supervisor Lumer. Motion carried." },
      { item:"Revised property values for public auction", body:"Staff reported that two parcels listed on Wisconsin Surplus twice failed to sell at appraised values. Staff requested re-evaluation with new minimum prices: 529 Mullen Street at $9,000 and 738 South 3rd Avenue at $7,500. Chair Gibbs moved to approve the revised prices, seconded by Supervisor Lumer. Motion carried unanimously. The chair inquired about bidders who failed to pay, and staff confirmed they are marked as non-pay and banned from future auctions." },
      { item:"Resolution to approve carry forward funds", body:"Finance Director Sam presented Resolution R20-2026 for program revenues and restricted funds to carry over to 2026, including veterans relief fund replenishment and $142,731.39 for administration special projects (including $75,000 for homelessness contract). Vice Chair Marshall asked about redacted records funds for Register of Deeds; staff agreed to research this further. Chair Gibbs moved to approve, seconded by Supervisor Hart. Motion carried." },
      { item:"Resolution to amend capital assets threshold policy", body:"Finance Director Sam explained the proposal to increase the capitalization threshold from $5,000 to $10,000 for general assets, following GFOA guidance. This change was considered in 2022 but not completed. Supervisor Hart moved to approve and move to full county board, seconded by Chair Gibbs. Motion carried unanimously." },
      { item:"Introduction of healthcare consultants - National Insurance Services", body:"HR Director Candace introduced NIS representatives following the RFP award. Account executive with 28 years experience and account manager Jordan Stanley presented their team structure and approach. They discussed evaluating the near-site ATA clinic, exploring fully insured vs. self-insured vs. level funded models, and increasing transparency with the committee. Vice Chair Marshall asked about per-member costs compared to other employers and strategies for reducing emergency room misuse. Chair Gibbs inquired about evaluation processes for insurance models and risk tolerance considerations." },
      { item:"2025 year-end fiscal update", body:"Finance Director Sam provided detailed department-by-department review of unaudited 2025 financials. Key items included: $257,238 TID closure check from City of Wausau, $222,752 unclaimed property from state, sales tax transfers to debt service, opioid fund balance of $2.2 million with $3.49 million in future settlements expected. ARPA funds are nearly exhausted. Sam noted various reconciling entries and reclassifications still in process." },
      { item:"Finance Department quarterly update", body:"Finance Director Sam reported the department is fully staffed since mid-December. Initiatives include quarterly closeouts with departments, countywide training on reports and budget, random cash audits (all successful), and upcoming policy updates for accounts receivable collection, fixed assets procedures, and consolidated financial policies. First quarter 2026 will close May 31st with monthly closeouts thereafter. Administrator Lance recognized Sam and her team for exceptional work on W-2s, the 'big beautiful bill' overtime calculations, and year-end processes." },
      { item:"County Treasurer update", body:"Treasurer Connie reported on tax collection activities including processing 1,582 delinquent tax notices (down from 1,786 last year), attending eviction hearings, year-end procedures, and working with DOR on lottery credit issues. She noted ongoing challenges with municipal treasurer receiving errors. Discussion addressed resources for struggling taxpayers, payment agreement policies (discontinued due to defaults), and efforts to educate municipal treasurers on proper procedures." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Disallowed claim of Mercedes Holmes per insurance carrier recommendation",
      "Set revised minimum sale prices for two parcels: 529 Mullen Street at $9,000 and 738 South 3rd Avenue at $7,500",
      "Approved Resolution R20-2026 for carry forward funds to 2026",
      "Approved capital assets threshold policy amendment increasing threshold from $5,000 to $10,000 - forwarded to full county board",
      "NIS healthcare consultants to provide quarterly or semi-annual updates and data before budget assumption development",
      "Finance to research Register of Deeds redacted records fund history and potential repurposing",
      "Finance to bring recommendation to increase Social Services reserve account above current $400,000",
      "Next meeting scheduled for April 8th",
    ],
  },
  {
    id: "EnyAF7yRQ7c", source: "weston",
    title: "Tourism Commission",
    date: "April 21, 2026", shortDate: "APR 21",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=EnyAF7yRQ7c",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04212026-1908",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, the Village of Weston Board of Trustees was scheduled to address multiple infrastructure projects, license renewals, and park development matters at this meeting. Key items included preliminary assessments for street reconstruction projects, consideration of increased park impact fees, and review of various street maintenance and utility rehabilitation bids.",
    agenda: [
      { time:"N\/A", item:"Approval of March 16, 2026, Board of Trustees Meeting minutes" },
      { time:"N\/A", item:"Acknowledge reports\/minutes from various boards, committees, and commissions" },
      { time:"N\/A", item:"Acknowledge reports from Village departments including 2025 Annual Report and Police Quarterly Report" },
      { time:"N\/A", item:"Work product transmittals including building permits, budget status, and financial statements" },
      { time:"N\/A", item:"Consent agenda including vouchers and license renewals for 2026-2027 term" },
      { time:"N\/A", item:"Ordinance 26-008 Amending Chapter 66 Solid Waste" },
      { time:"N\/A", item:"Resolution 26-010 Preliminary Assessment Resolution for Jelinek and Alderson Reconstruction" },
      { time:"N\/A", item:"Resolution 26-011 Preliminary Assessment Resolution for Bloedel Ave Reconstruction" },
      { time:"N\/A", item:"Resolution 26-012 Preliminary Assessment Resolution for Concord Ave and Bayberry St Reconstruction" },
      { time:"N\/A", item:"Quarterly Update on Kennedy Park Renovation and Capital Campaign" },
      { time:"N\/A", item:"Review of Elected and Appointed Officials' Handbook Remote Meeting Attendance Policy" },
      { time:"N\/A", item:"President's Appointments to Committees and\/or Commissions" },
      { time:"N\/A", item:"Proclamation 2026-001 Arbor Day Observance" },
      { time:"N\/A", item:"Graphic Master Plan for Machmueller Park" },
      { time:"N\/A", item:"Termination of Development Agreement – ABC Weston, LLC" },
      { time:"N\/A", item:"Consideration of Increasing Park and Recreation Impact Fees" },
      { time:"N\/A", item:"2026 Street Maintenance Bid Results" },
      { time:"N\/A", item:"Replacement Plow Trucks #9 and #10" },
      { time:"N\/A", item:"Well #1 Rehabilitation" },
      { time:"N\/A", item:"Sanitary Sewer Inflow and Infiltration Study" },
      { time:"N\/A", item:"Bloedel Ave Reconstruction Bid Results" },
      { time:"N\/A", item:"Alderson St and Jelinek Ave Intersection Project Bid Results" },
      { time:"N\/A", item:"Closed session regarding Notice of Claim for Rescission and Recovery of Unlawful Taxes – Ascent Funeral Home" },
      { time:"N\/A", item:"Closed session regarding appraisals and right-of-way purchases for Alderson St and Jelinek Ave project" },
    ],
    discussions: [
      { item:"Preliminary Assessment Resolutions for Street Reconstruction", body:"The Board was scheduled to consider three preliminary assessment resolutions for major street reconstruction projects: Jelinek and Alderson, Bloedel Ave, and Concord Ave\/Bayberry St. These resolutions were expected to initiate the special assessment process for property owners affected by the infrastructure improvements." },
      { item:"Kennedy Park Renovation and Capital Campaign Update", body:"The Board was set to receive a quarterly update on the ongoing Kennedy Park renovation project and associated capital campaign. This discussion-only item was expected to provide trustees with current status information on the park improvement initiative." },
      { item:"Graphic Master Plan for Machmueller Park", body:"The Board was scheduled to discuss and potentially take action on a graphic master plan for Machmueller Park. This item was expected to address future development and amenity planning for the park facility." },
      { item:"Park and Recreation Impact Fees Increase", body:"The Board was set to consider increasing park and recreation impact fees as recommended by both the Plan Commission and Parks & Recreation Committee. This item could affect fees charged to new development to fund park improvements." },
      { item:"2026 Street Maintenance Bid Results", body:"The Board was scheduled to review and potentially act on bid results for multiple street maintenance services including crack sealing, gilsonite sealing, chip sealing, asphalt overlays, and concrete repairs. These contracts were expected to cover the Village's 2026 road maintenance program." },
      { item:"Infrastructure Equipment and Rehabilitation Projects", body:"The Board was set to consider action on replacement plow trucks, Well #1 rehabilitation, and a sanitary sewer inflow and infiltration study. These items were expected to address critical infrastructure and equipment needs for Village operations." },
      { item:"License Renewals for 2026-2027 Term", body:"The consent agenda was scheduled to include multiple license renewals including weights and measures, commercial animal establishments, cigarette and tobacco, lodging, salvage, kennel, and various alcohol licenses. These renewals were expected to authorize continued business operations in the Village." },
      { item:"Termination of Development Agreement – ABC Weston, LLC", body:"The Board was scheduled to consider Resolution 2026-013 authorizing termination of a development agreement with ABC Weston, LLC for property at 3200 Schofield Avenue. This action was expected to formally end the second building development agreement with this developer." },
    ],
    publicComment: "Public comment period was included on the agenda, allowing persons to address the Board for up to three minutes on non-agenda items, with options to submit comments in advance or participate live via Zoom.",
    actionItems: [
      "Scheduled to vote on approval of March 16, 2026 meeting minutes",
      "Expected to consider Ordinance 26-008 amending solid waste regulations",
      "Scheduled to vote on three preliminary assessment resolutions for street reconstruction projects",
      "Expected to consider approval of Arbor Day Proclamation 2026-001",
      "Scheduled to consider Machmueller Park graphic master plan",
      "Expected to vote on Resolution 2026-013 terminating ABC Weston development agreement",
      "Scheduled to consider increasing park and recreation impact fees",
      "Expected to act on 2026 street maintenance bid awards",
      "Scheduled to consider purchase of replacement plow trucks",
      "Expected to act on Well #1 rehabilitation project",
      "Scheduled to consider sanitary sewer study authorization",
      "Expected to act on Bloedel Ave and Alderson\/Jelinek intersection reconstruction bids",
      "Scheduled to consider consent agenda items including vouchers and license renewals",
      "Expected to take possible action following closed session on tax claim and right-of-way purchases",
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
    overview: "Based on the published agenda, the Village of Weston Board of Trustees was scheduled to meet on April 21, 2026 to address multiple infrastructure projects including street reconstructions and assessments, consider increasing park impact fees, review street maintenance and plow truck replacement bids, and conduct closed session discussions regarding litigation and property acquisitions for road projects.",
    agenda: [
      { time:"N\/A", item:"Approval of March 16, 2026, Board of Trustees Meeting" },
      { time:"N\/A", item:"Acknowledge Reports\/Minutes from Boards, Committees, Commissions" },
      { time:"N\/A", item:"Acknowledge Reports from Departments including 2025 Annual Report and Police Quarterly Report" },
      { time:"N\/A", item:"Work Product Transmittals including Building Permits, Budget Status, DRAFT 2025 Financial Statements, Code Enforcement Report, and New Housing Fee Report" },
      { time:"N\/A", item:"Consent Agenda including Vouchers, License Renewals, MS4 Report, and Surplus Auction Results" },
      { time:"N\/A", item:"Ordinance 26-008 Amending Chapter 66 Solid Waste" },
      { time:"N\/A", item:"Resolution 26-010 Preliminary Assessment Resolution for Jelinek and Alderson Reconstruction" },
      { time:"N\/A", item:"Resolution 26-011 Preliminary Assessment Resolution for Bloedel Ave Reconstruction" },
      { time:"N\/A", item:"Resolution 26-012 Preliminary Assessment Resolution for Concord Ave and Bayberry St Reconstruction" },
      { time:"N\/A", item:"Quarterly Update on Kennedy Park Renovation and Capital Campaign" },
      { time:"N\/A", item:"Review of Elected and Appointed Officials' Handbook Remote Meeting Attendance Policy" },
      { time:"N\/A", item:"President's Appointments to Committees and\/or Commissions" },
      { time:"N\/A", item:"Proclamation 2026-001 Arbor Day Observance" },
      { time:"N\/A", item:"Graphic Master Plan for Machmueller Park" },
      { time:"N\/A", item:"Termination of Development Agreement – ABC Weston, LLC" },
      { time:"N\/A", item:"Consideration of Increasing Park and Recreation Impact Fees" },
      { time:"N\/A", item:"2026 Street Maintenance Bid Results" },
      { time:"N\/A", item:"Replacement Plow Trucks #9 and #10" },
      { time:"N\/A", item:"Well #1 Rehabilitation" },
      { time:"N\/A", item:"Sanitary Sewer Inflow and Infiltration Study" },
      { time:"N\/A", item:"Bloedel Ave Reconstruction Bid Results" },
      { time:"N\/A", item:"Alderson St and Jelinek Ave Intersection Project Bid Results" },
      { time:"N\/A", item:"Closed Session: Notice of Claim for Rescission and Recovery of Unlawful Taxes – Ascent Funeral Home" },
      { time:"N\/A", item:"Closed Session: Appraisals and Right-of-Way Purchases for Alderson St and Jelinek Ave Intersection Project" },
    ],
    discussions: [
      { item:"Ordinance 26-008 Amending Chapter 66 Solid Waste", body:"The Board was scheduled to consider an ordinance amending the Village's solid waste regulations. The specific changes to Chapter 66 were expected to be detailed in accompanying materials." },
      { item:"Preliminary Assessment Resolutions for Street Reconstructions", body:"The Board was set to review three preliminary assessment resolutions for major street reconstruction projects: Jelinek and Alderson, Bloedel Ave, and Concord Ave with Bayberry St. These resolutions were expected to establish the framework for special assessments to property owners benefiting from the improvements." },
      { item:"Kennedy Park Renovation and Capital Campaign Update", body:"The Board was scheduled to receive a quarterly discussion-only update on the Kennedy Park renovation project and its associated capital campaign. This item was designated for information purposes without formal action expected." },
      { item:"Termination of Development Agreement – ABC Weston, LLC", body:"The Board was expected to consider Resolution 2026-013 authorizing termination of a development agreement for a second building with ABC Weston, LLC at 3200 Schofield Avenue. The reasons for proposed termination were expected to be outlined in accompanying documentation." },
      { item:"Park and Recreation Impact Fees Increase", body:"The Board was scheduled to consider increasing park and recreation impact fees as recommended by both the Plan Commission and Parks & Recreation Committee. This could affect fees charged to new development to fund park improvements." },
      { item:"2026 Street Maintenance Bid Results", body:"The Board was set to review and potentially act on bid results for multiple street maintenance contracts including crack sealing, gilsonite sealing, chip sealing, asphalt overlays, and concrete repairs. These represent the Village's annual road maintenance program." },
      { item:"Replacement Plow Trucks #9 and #10", body:"The Board was expected to consider the purchase of replacement plow trucks for the Village's fleet. The agenda indicated this involved replacing existing vehicles numbered 9 and 10." },
      { item:"Well #1 Rehabilitation", body:"The Board was scheduled to discuss and potentially act on rehabilitation work for Well #1. This infrastructure project relates to the Village's water supply system." },
      { item:"Sanitary Sewer Inflow and Infiltration Study", body:"The Board was expected to consider a study examining inflow and infiltration issues in the Village's sanitary sewer system. Such studies typically identify areas where groundwater or stormwater enters sewer lines." },
      { item:"Bloedel Ave Reconstruction Bid Results", body:"The Board was set to review bid results for the Bloedel Avenue reconstruction project. This corresponds to one of the preliminary assessment resolutions also on the agenda." },
      { item:"Alderson St and Jelinek Ave Intersection Project Bid Results", body:"The Board was scheduled to consider bid results for the Alderson Street and Jelinek Avenue intersection project. Related closed session items involved property acquisitions needed for this project." },
      { item:"Graphic Master Plan for Machmueller Park", body:"The Board was expected to discuss and potentially act on a graphic master plan for Machmueller Park. This planning document would guide future development and improvements at the park." },
      { item:"Closed Session Items", body:"The Board was scheduled to enter closed session to confer with legal counsel regarding litigation strategy for a tax claim filed by Ascent Funeral Home and Spiritual Center, Inc., and to discuss appraisals and right-of-way purchases for the Alderson and Jelinek intersection project." },
    ],
    publicComment: "Public comment was included on the agenda, allowing up to three minutes for comments on non-agenda items, with options to submit forms in advance or participate live via Zoom.",
    actionItems: [
      "Scheduled to vote on approval of March 16, 2026 meeting minutes",
      "Expected to consider Ordinance 26-008 amending solid waste regulations",
      "Scheduled to vote on Resolution 26-010 for Jelinek and Alderson preliminary assessment",
      "Scheduled to vote on Resolution 26-011 for Bloedel Ave preliminary assessment",
      "Scheduled to vote on Resolution 26-012 for Concord Ave and Bayberry St preliminary assessment",
      "Expected to consider consent agenda including vouchers and multiple license renewals for 2026-2027",
      "Scheduled to consider Resolution 2026-013 terminating ABC Weston LLC development agreement",
      "Expected to consider increasing park and recreation impact fees",
      "Scheduled to act on 2026 street maintenance bid awards",
      "Expected to consider purchase of replacement plow trucks",
      "Scheduled to consider Well #1 rehabilitation project",
      "Expected to consider sanitary sewer inflow and infiltration study",
      "Scheduled to act on Bloedel Ave reconstruction bid results",
      "Expected to act on Alderson St and Jelinek Ave intersection project bid results",
      "Scheduled to consider possible action on closed session items regarding litigation and property acquisitions",
    ],
  },
  {
    id: "3Fv9cQDY1sU", source: "weston",
    title: "Board of Trustees",
    date: "April 21, 2026", shortDate: "APR 21",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=3Fv9cQDY1sU",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04212026-1908",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, the Village of Weston Board of Trustees was scheduled to address numerous license renewals for the 2026-2027 term, consider preliminary assessment resolutions for three street reconstruction projects, and review bid results for multiple infrastructure projects including street maintenance and well rehabilitation. The meeting also included discussion on increasing park impact fees, Kennedy Park renovation updates, and closed session items regarding litigation and property acquisitions.",
    agenda: [
      { time:"N\/A", item:"Approval of March 16, 2026, Board of Trustees Meeting" },
      { time:"N\/A", item:"Acknowledge Reports\/Minutes from Boards, Committees, Commissions" },
      { time:"N\/A", item:"Acknowledge Reports from Departments" },
      { time:"N\/A", item:"Acknowledge March Building Permits" },
      { time:"N\/A", item:"Acknowledge March Budget Status" },
      { time:"N\/A", item:"Acknowledge DRAFT 2025 Financial Statements" },
      { time:"N\/A", item:"Acknowledge March Code Enforcement Report" },
      { time:"N\/A", item:"Acknowledge 2026 New Housing Fee Report" },
      { time:"N\/A", item:"Approve Vouchers" },
      { time:"N\/A", item:"Renewal of Weights and Measures Licenses" },
      { time:"N\/A", item:"Renewal of Commercial Animal Establishment License" },
      { time:"N\/A", item:"Renewal of Cigarette, Tobacco, and Electronic Vaping Licenses" },
      { time:"N\/A", item:"Renewal of Lodging License" },
      { time:"N\/A", item:"Renewal of Salvage License" },
      { time:"N\/A", item:"Renewal of Kennel License" },
      { time:"N\/A", item:"Renewal of Alcohol Licenses" },
      { time:"N\/A", item:"Liquor License Agent Change for Reliance Fuel LLC" },
      { time:"N\/A", item:"Acknowledge 2025 MS4 Report Submittal" },
      { time:"N\/A", item:"Acknowledge March 2026 Surplus Auction Results" },
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
      { time:"N\/A", item:"Closed Session - Notice of Claim for Rescission and Recovery of Unlawful Taxes – Ascent Funeral Home" },
      { time:"N\/A", item:"Closed Session - Appraisals and Right-of-Way Purchases for Alderson St and Jelinek Ave Intersection Project" },
    ],
    discussions: [
      { item:"Ordinance 26-008 Amending Chapter 66 Solid Waste", body:"The Board was scheduled to consider an ordinance amending the Village's solid waste regulations under Chapter 66. The specific changes to solid waste collection, disposal, or recycling requirements were expected to be detailed in the ordinance." },
      { item:"Preliminary Assessment Resolutions for Street Reconstruction", body:"The Board was set to review three preliminary assessment resolutions for upcoming street reconstruction projects: Jelinek and Alderson, Bloedel Ave, and Concord Ave with Bayberry St. These resolutions were expected to establish the framework for special assessments to property owners benefiting from the improvements." },
      { item:"Kennedy Park Renovation and Capital Campaign", body:"The Board was scheduled to receive a quarterly update on the Kennedy Park renovation project and associated capital campaign. This discussion-only item was expected to provide trustees with progress information on the park improvement initiative." },
      { item:"Remote Meeting Attendance Policy", body:"The Board was set to discuss and potentially take action on reviewing the Elected and Appointed Officials' Handbook regarding remote meeting attendance policy. This represented ongoing consideration of how officials may participate in meetings virtually." },
      { item:"Graphic Master Plan for Machmueller Park", body:"The Board was scheduled to discuss and potentially approve a graphic master plan for Machmueller Park. This planning document was expected to guide future development and improvements at the park facility." },
      { item:"Termination of Development Agreement – ABC Weston, LLC", body:"The Board was expected to consider Resolution 2026-013 authorizing termination of a development agreement with ABC Weston, LLC regarding a second building at 3200 Schofield Avenue. The termination suggests the development project may not be proceeding as originally planned." },
      { item:"Park and Recreation Impact Fees", body:"The Board was scheduled to consider increasing park and recreation impact fees as recommended by the Plan Commission and Parks & Recreation Committee. Impact fees are charged to new development to fund park improvements necessitated by growth." },
      { item:"2026 Street Maintenance Bid Results", body:"The Board was set to review and potentially act on bid results for five street maintenance categories: crack sealing, gilsonite sealing, chip sealing, asphalt overlays, and concrete repairs. These maintenance activities were expected to address road preservation needs throughout the Village." },
      { item:"Replacement Plow Trucks #9 and #10", body:"The Board was scheduled to discuss and potentially approve the replacement of two plow trucks in the Village fleet. This equipment purchase was expected to maintain the Village's snow removal and road maintenance capabilities." },
      { item:"Well #1 Rehabilitation", body:"The Board was set to consider action on rehabilitation of Well #1, part of the Village's water supply infrastructure. The rehabilitation work was expected to address maintenance needs to ensure continued water system reliability." },
      { item:"Sanitary Sewer Inflow and Infiltration Study", body:"The Board was scheduled to discuss and potentially authorize a study examining inflow and infiltration in the sanitary sewer system. Such studies identify where groundwater or stormwater enters the sewer system, which can cause capacity issues." },
      { item:"Bloedel Ave Reconstruction Bid Results", body:"The Board was expected to review bid results for the Bloedel Ave reconstruction project. This was connected to the preliminary assessment resolution also on the agenda for this street improvement." },
      { item:"Alderson St and Jelinek Ave Intersection Project Bid Results", body:"The Board was scheduled to consider bid results for the Alderson St and Jelinek Ave intersection project. Related right-of-way purchases for this project were set for closed session discussion." },
      { item:"Closed Session - Ascent Funeral Home Tax Claim", body:"The Board was scheduled to enter closed session to confer with legal counsel regarding litigation strategy for a notice of claim for rescission and recovery of unlawful taxes filed by Ascent Funeral Home and Spiritual Center, Inc." },
      { item:"Closed Session - Right-of-Way Purchases", body:"The Board was expected to discuss in closed session the appraisals and right-of-way purchases needed for the Alderson St and Jelinek Ave intersection project, with competitive or bargaining reasons requiring confidentiality." },
    ],
    publicComment: "Public comment period was included on the agenda, allowing persons to address the Board for up to three minutes regarding non-agenda items, with time extensions permitted at the Chief Presiding Officer's discretion.",
    actionItems: [
      "Scheduled to vote on approval of March 16, 2026 meeting minutes",
      "Expected to consider Ordinance 26-008 amending solid waste regulations",
      "Scheduled to vote on three preliminary assessment resolutions for street reconstruction projects",
      "Expected to consider Proclamation 2026-001 for Arbor Day observance",
      "Scheduled to vote on graphic master plan for Machmueller Park",
      "Expected to consider Resolution 2026-013 terminating development agreement with ABC Weston, LLC",
      "Scheduled to vote on increasing park and recreation impact fees",
      "Expected to award contracts for 2026 street maintenance work",
      "Scheduled to vote on replacement plow trucks purchase",
      "Expected to authorize Well #1 rehabilitation work",
      "Scheduled to consider sanitary sewer inflow and infiltration study",
      "Expected to award contracts for Bloedel Ave reconstruction",
      "Scheduled to award contracts for Alderson St and Jelinek Ave intersection project",
      "Expected to take possible action on closed session items regarding tax claim litigation and right-of-way purchases",
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
    overview: "Based on the published agenda, the Marathon County Organizational Meeting on April 21, 2026 was scheduled to address the biennial reorganization of county government following the spring election. This meeting was expected to handle the swearing in of newly elected officials and the selection of county board leadership positions.",
    agenda: [
      { time:"N\/A", item:"Swearing in of County Board Supervisors" },
      { time:"N\/A", item:"Election of County Board Chair" },
      { time:"N\/A", item:"Election of First Vice Chair" },
      { time:"N\/A", item:"Election of Second Vice Chair" },
    ],
    discussions: [
      { item:"Swearing in of County Board Supervisors", body:"Newly elected and re-elected County Board Supervisors were scheduled to take their oaths of office. This ceremonial item was set to formally install supervisors for their new terms." },
      { item:"Election of County Board Chair", body:"The board was expected to conduct an election to select the County Board Chair who presides over board meetings and provides leadership for county government. Nominations and voting were scheduled to take place." },
      { item:"Election of First Vice Chair", body:"The board was set to elect a First Vice Chair who serves in the chair's absence. This position was scheduled to be filled through nomination and board vote." },
      { item:"Election of Second Vice Chair", body:"The board was scheduled to select a Second Vice Chair to serve when both the chair and first vice chair are unavailable. This leadership position was expected to be determined by board vote." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Scheduled to administer oaths of office to County Board Supervisors",
      "Expected to elect County Board Chair",
      "Expected to elect First Vice Chair",
      "Expected to elect Second Vice Chair",
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
    overview: "Based on the published agenda, the Wausau School District Board of Education's Committee of the Whole meeting was scheduled to address several action items including facility fee amendments for artificial fields, a nutrition purchasing cooperative agreement, and an extensive policy update covering over 60 NEOLA policies. The meeting was also expected to feature a referendum budget update and recognition of Stettin Elementary through the Excellence in Action program.",
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
      { item:"Excellence in Action: Stettin Elementary", body:"The board was scheduled to recognize Stettin Elementary through the Excellence in Action program, which typically highlights achievements and outstanding work within district schools." },
      { item:"Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP)", body:"During an estimated 5-minute presentation, the board was expected to consider continued membership in the Wisconsin School Nutrition Purchasing Cooperative for the 2026-2027 school year. The Wausau School District Nutrition Service Department currently belongs to the WiSNP Co-op, which was requesting member districts to approve the resolution for continued membership." },
      { item:"Facility Fees", body:"Ryan Urmanski, Director of Buildings and Grounds, was scheduled to present for approximately 10 minutes on proposed amendments to the Wausau School District Facility Use Fee Schedule. The amendments were expected to reflect costs for use of artificial fields and field lighting for requested events, with the board being asked for immediate approval if agreement was reached." },
      { item:"Referendum Budget Update", body:"Elizabeth Channel, Interim Assistant Superintendent of Operations, was scheduled to present a 10-minute update on the status of the Referendum Budget. Supporting documentation was uploaded shortly before the meeting." },
      { item:"NEOLA UPDATE", body:"The committee was expected to review proposed changes to numerous district policies during an estimated 20-minute session. The updates ranged from small technical corrections to more lengthy revisions, covering policies related to board governance, student conduct, cell phones, academic honesty, artificial intelligence, purchasing, child abuse reporting under Act 57, and school support organizations. The update included 39 attachments in the main policy section plus additional attachments for school support organization policies, technical corrections, and Act 57-related policies." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Action was requested for approval of continued membership in the Wisconsin School Nutrition Purchasing Cooperative (WiSNP) for 2026-2027",
      "Action was requested for amendments to the Facility Use Fee Schedule for artificial fields and field lighting",
      "Action was requested for approval of NEOLA policy updates covering board governance, student policies, financial policies, school support organization policies, technical corrections, and Act 57-related policies",
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
    overview: "Based on the published agenda, this meeting was scheduled to address the verification of school board election results for the Wausau School District. This procedural meeting appears to be focused solely on certifying the outcomes of the recent board elections, which is a standard step following local elections to formally confirm newly elected or re-elected board members.",
    agenda: [
      { time:"N\/A", item:"Verify School Board Election Results" },
    ],
    discussions: [
      { item:"Verify School Board Election Results", body:"The board was scheduled to review and verify the results of the school board election. This procedural item was expected to formally certify the election outcomes and confirm which candidates were elected to serve on the Wausau School District Board of Education." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Board was expected to verify and certify the school board election results",
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
    overview: "Based on the published agenda, this special meeting of the Wausau School District Board of Education was scheduled to address a pupil expulsion hearing in closed session. The board was expected to convene privately pursuant to Wisconsin Statutes regarding student confidentiality and may have taken action during or following the closed session.",
    agenda: [
      { time:"N\/A", item:"Call To Order" },
      { time:"N\/A", item:"Motion to convene in closed session for pupil expulsion hearing pursuant to s. 19.85(1)(a), (f), and (g) and s. 118.125 of Wisconsin Statutes" },
      { time:"N\/A", item:"Adjournment" },
    ],
    discussions: [
      { item:"Closed Session - Pupil Expulsion Hearing", body:"The Board of Education was scheduled to convene in closed session to hold a pupil expulsion hearing, as permitted under Wisconsin Statutes s. 19.85(1)(a), (f), and (g), as well as s. 118.125 regarding student records confidentiality. The board was expected to deliberate privately at the conclusion of the hearing and may have taken action in closed session if deemed necessary and appropriate." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Board was expected to vote on motion to convene in closed session",
      "Board was expected to deliberate and potentially take action on the pupil expulsion matter in closed session",
      "Board was expected to vote on motion to reconvene into open session",
      "Board may have taken further action in open session if necessary",
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
    overview: "Based on the published agenda, the Wausau School District Board of Education's April 13, 2026 regular meeting was scheduled to address several significant items including a 10-Year Capital Improvement Plan presentation, transfer of property sale revenue to Fund 46, multiple athletic co-op agreements, and extensive policy updates. The board was also expected to recognize excellence at WAVE and South Mountain Elementary, and to enter closed session regarding preliminary notices of non-renewal.",
    agenda: [
      { time:"N\/A", item:"Call to Order" },
      { time:"N\/A", item:"Roll Call" },
      { time:"N\/A", item:"Pledge of Allegiance: Jim Bouche, President" },
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
      { time:"N\/A", item:"New Business - East\/Newman JV Baseball Co-Op" },
      { time:"N\/A", item:"New Business - Wisconsin School Nutrition Purchasing Cooperative Agreement" },
      { time:"N\/A", item:"New Business - Facility Fees" },
      { time:"N\/A", item:"New Business - NEOLA Policy Updates" },
      { time:"N\/A", item:"Open Forum" },
      { time:"N\/A", item:"Request for Closed Session" },
      { time:"N\/A", item:"Adjourn" },
    ],
    discussions: [
      { item:"Excellence in Action: WAVE", body:"The board was scheduled to recognize WAVE as part of the Excellence in Action program, highlighting achievements within the district's alternative education program." },
      { item:"Excellence in Action: South Mountain Elementary", body:"South Mountain Elementary was scheduled to be recognized through the Excellence in Action program, showcasing accomplishments at the elementary level." },
      { item:"Referendum Budget Update", body:"Elizabeth Channel, Assistant Superintendent of Operations, was scheduled to provide a brief 1-minute update on the status of the Referendum Budget, following information shared at the March Committee of the Whole meeting." },
      { item:"Transfer Funds to Fund 46", body:"Elizabeth Channel, Assistant Superintendent of Operations, was expected to present a plan to move revenue generated from three property sales to Fund 46 for future capital improvements. This 5-minute presentation was listed as an action item for board consideration." },
      { item:"Recommendation for 2026-27 Capital Projects", body:"Ryan Urmanski, Director of Buildings and Grounds, was scheduled to present the 10-Year Capital Improvement Plan for district facilities in a 15-minute presentation. The board was expected to consider approval of the 2026-27 capital projects recommendation." },
      { item:"Boys and Girls LaCrosse Co-Op", body:"Jon Tomski, BJ Brandt, and Darci Mick Beversdorf were scheduled to present Boys and Girls LaCrosse Co-Op agreements for the board's consideration in a 5-minute presentation. Supporting documentation included signature pages for both Wausau West and East programs." },
      { item:"Alpine Ski Co-Op", body:"Jon Tomski, BJ Brandt, and Darci Mick Beversdorf were expected to present the Alpine Skiing Co-Op agreement for board consideration in a 5-minute presentation, covering the 2026-2028 period." },
      { item:"East\/Newman JV Baseball Co-Op", body:"Wausau East was scheduled to present a Co-Op agreement with Newman for JV baseball, which would allow for a full JV\/JV2 season. The agenda noted that no official action was needed for this 5-minute item." },
      { item:"Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP)", body:"The district's Nutrition Service Department was scheduled to present a resolution for continued membership in the WiSNP Co-op for the 2026-2027 school year. This 2-minute item was listed as requiring board action." },
      { item:"Facility Fees", body:"Following Ryan Urmanski's presentation at the March Committee of the Whole meeting, the board was expected to consider amending the Facility Use Fee Schedule to reflect costs for use of artificial fields and field lighting. If approved, changes would be effective immediately." },
      { item:"NEOLA Policy Updates", body:"The board was scheduled to consider extensive NEOLA policy updates in a 10-minute presentation, including changes reviewed at the March Committee of the Whole meeting. Updates covered 39 main policies including cell phone rules, AI policy, academic honesty, and student supervision, plus school support organization policies, technical corrections, and Act 57 related policies regarding child abuse and neglect reporting." },
      { item:"Closed Session - Preliminary Notice of Non-renewal", body:"The board was scheduled to enter closed session pursuant to Wisconsin Statute 19.85(1)(c) to consider contracts for preliminary notices of non-renewal, with the option to reconvene in open session to take further action if necessary." },
    ],
    publicComment: "A public and student comment period was included on the agenda as item VII, providing an opportunity for community members to address the board.",
    actionItems: [
      "Board was expected to vote on approval of the Consent Agenda including appointments, separations, leaves of absence, retirements, March 9 meeting minutes, payment of bills, board member salaries, canvassing statement, and donations",
      "Action was requested for Transfer of Funds to Fund 46 from property sales",
      "Action was requested for 2026-27 Capital Projects recommendation",
      "Action was requested for Boys and Girls LaCrosse Co-Op agreements",
      "Action was requested for Alpine Ski Co-Op agreement",
      "Action was requested for Wisconsin School Nutrition Purchasing Cooperative Agreement membership renewal",
      "Action was requested for Facility Fees schedule amendments",
      "Action was requested for NEOLA policy updates across multiple policy categories",
      "Board was expected to consider preliminary notices of non-renewal in closed session",
    ],
  },
  {
    id: "bb_742178", source: "school_board",
    title: "Special Meeting",
    date: "April 27, 2026", shortDate: "APR 27",
    committee: "Special Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=742178",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=742178",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, this Special Meeting of the Wausau School District Board of Education was scheduled to address the election of officers and appointment of board members to various committees and liaison positions. The meeting was expected to focus on organizational matters including selecting delegates for the 2027 Delegate Assembly and appointing representatives to multiple educational and community committees.",
    agenda: [
      { time:"N\/A", item:"I. Call to Order" },
      { time:"N\/A", item:"Election of Officers: Cale Bushman, Secretary Pro Tem Report from Deputy Clerk" },
      { time:"N\/A", item:"Elect Delegate and Alternate Delegate to 2027 Delegate Assembly (January 20-22, 2027) (Action Requested)" },
      { time:"N\/A", item:"Elect Board Member Representative to CESA 9 Annual Convention (August 3, 2026) (Action Requested)" },
      { time:"N\/A", item:"Appoint Board Member to the Wausau School Foundation" },
      { time:"N\/A", item:"Appoint Legislative Liaison" },
      { time:"N\/A", item:"Appoint WECAN Consortium Committee Member" },
      { time:"N\/A", item:"Appoint Union Contract Negotiating Committee" },
      { time:"N\/A", item:"Appoint Gifted and Talented Committee Member" },
      { time:"N\/A", item:"Appoint Liaison to the Marathon County Extension, Education, and Economic Development Committee" },
      { time:"N\/A", item:"Adjourn" },
    ],
    discussions: [
      { item:"Election of Officers", body:"Cale Bushman was scheduled to serve as Secretary Pro Tem, with a report expected from the Deputy Clerk regarding the election of board officers." },
      { item:"Elect Delegate and Alternate Delegate to 2027 Delegate Assembly", body:"The board was expected to elect a delegate and alternate delegate to represent the district at the 2027 Delegate Assembly scheduled for January 20-22, 2027." },
      { item:"Elect Board Member Representative to CESA 9 Annual Convention", body:"The board was expected to select a representative to attend the CESA 9 Annual Convention scheduled for August 3, 2026." },
      { item:"Appoint Union Contract Negotiating Committee", body:"The board was scheduled to appoint members to serve on the committee responsible for negotiating union contracts on behalf of the district." },
      { item:"Appoint Liaison to the Marathon County Extension, Education, and Economic Development Committee", body:"The board was expected to designate a member to serve as liaison to this county-level committee focused on extension services, education, and economic development." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Board was expected to vote on electing a delegate and alternate delegate to the 2027 Delegate Assembly",
      "Board was expected to vote on electing a representative to the CESA 9 Annual Convention",
      "Action was requested for appointing a board member to the Wausau School Foundation",
      "Action was requested for appointing a Legislative Liaison",
      "Action was requested for appointing a WECAN Consortium Committee Member",
      "Action was requested for appointing members to the Union Contract Negotiating Committee",
      "Action was requested for appointing a Gifted and Talented Committee Member",
      "Action was requested for appointing a liaison to the Marathon County Extension, Education, and Economic Development Committee",
    ],
  },
  {
    id: "bb_742168", source: "school_board",
    title: "Committee of the Whole Meeting",
    date: "April 27, 2026", shortDate: "APR 27",
    committee: "Committee of the Whole", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=742168",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=742168",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, the Wausau School District Board of Education's Committee of the Whole meeting was scheduled to address several significant items including a 2026-27 budget reconciliation plan and a charter school contract renewal for 2026-2031. The board was also expected to receive a quarterly legal expense summary and recognize Riverview Elementary through the Excellence in Action program.",
    agenda: [
      { time:"N\/A", item:"Call to Order" },
      { time:"N\/A", item:"Approve the Minutes" },
      { time:"N\/A", item:"Audit of the Bills" },
      { time:"N\/A", item:"Excellence in Action: Riverview Elementary" },
      { time:"N\/A", item:"Public and Student Comment" },
      { time:"N\/A", item:"Legal Expense Summary for 3rd Quarter" },
      { time:"N\/A", item:"2026-27 Budget Reconciliation Plan (Action Requested)" },
      { time:"N\/A", item:"Charter School Contract Renewal (Action Requested)" },
      { time:"N\/A", item:"Adjourn" },
    ],
    discussions: [
      { item:"Excellence in Action: Riverview Elementary", body:"Riverview Elementary was scheduled to be recognized through the district's Excellence in Action program, which typically highlights achievements and notable work at individual schools." },
      { item:"Legal Expense Summary for 3rd Quarter", body:"Elizabeth Channel, Assistant Superintendent of Operations, was scheduled to present a 5-minute summary report of all legal counsel expenses incurred during the third quarter of 2025-2026. The report was expected to be broken down by law firm and by type of legal advice sought, presented as a written report requiring no action." },
      { item:"2026-27 Budget Reconciliation Plan", body:"Elizabeth Channel, Assistant Superintendent of Operations, was scheduled to present a 15-minute budget reconciliation plan for budgeting purposes only. Action was requested from the board on this item." },
      { item:"Charter School Contract Renewal", body:"Elizabeth Channel, WAMCS Head of School, was scheduled to present the 2026-2031 charter contract for renewal during an estimated 10-minute presentation. The board was expected to consider approval of the five-year contract renewal for the Wausau Area Montessori Charter School." },
    ],
    publicComment: "A public and student comment period was included on the agenda.",
    actionItems: [
      "Board was expected to vote on approval of the 2026-27 Budget Reconciliation Plan",
      "Board was expected to vote on the WAMCS Charter School Contract Renewal for 2026-2031",
      "Board was expected to approve the minutes from the March 23, 2026 committee meeting",
      "Board was expected to approve the Audit of the Bills for April 2026",
    ],
  },
  {
    id: "bb_742862", source: "school_board",
    title: "Regular Meeting",
    date: "April 27, 2026", shortDate: "APR 27",
    committee: "Regular Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=742862",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=742862",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, this Wausau School District Board of Education regular meeting was scheduled to convene primarily for a closed session to discuss potential litigation matters. The brief agenda suggests the board was expected to address sensitive legal concerns requiring confidential deliberation before potentially reconvening in open session.",
    agenda: [
      { time:"N\/A", item:"Call to Order" },
      { time:"N\/A", item:"Request for Closed Session Pursuant to State Statutes" },
      { time:"N\/A", item:"Preliminary Discussion Regarding Potential Litigation 19.85 (g)" },
      { time:"N\/A", item:"Reconvene in Open Session, to take further action if necessary and appropriate" },
      { time:"N\/A", item:"Adjourn" },
    ],
    discussions: [
      { item:"Preliminary Discussion Regarding Potential Litigation 19.85 (g)", body:"The board was scheduled to enter closed session under Wisconsin State Statute 19.85(1)(g) to conduct preliminary discussions regarding potential litigation involving the district. This statutory provision allows governmental bodies to meet privately when considering matters that could result in legal action." },
      { item:"Reconvene in Open Session", body:"Following the closed session, the board was expected to reconvene in open session to take any further action deemed necessary and appropriate based on the closed session discussions." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Board was expected to vote on entering closed session pursuant to Wisconsin State Statute 19.85(1)(g)",
      "Board was expected to potentially take action following the closed session regarding litigation matters",
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
    badge: null,
    overview: "Based on the published agenda, this special meeting of the Village of Weston Board of Trustees was scheduled to address the termination of Tax Increment Financing District #1, which was created in 1998. The meeting was called specifically to meet a state-mandated April 15th deadline for submitting TIF closure resolutions to the Department of Revenue.",
    agenda: [
      { time:"5:45 p.m.", item:"Resolution No. 2026-009: A Resolution Terminating the Village of Weston Tax Increment Financing District (TID) #1" },
    ],
    discussions: [
      { item:"Resolution No. 2026-009: TIF District #1 Termination", body:"The Board was scheduled to consider terminating TIF District #1, which was created on March 30, 1998. According to agenda documents, staff confirmed sufficient funds are available to close the district after final street project costs and reserves were determined, with outstanding expenses totaling approximately $10.88 million including bond principal and interest payments, administration expenses, grant payments, and road maintenance costs." },
    ],
    publicComment: "Public comments were on the agenda, allowing persons to address the Board for up to three minutes regarding non-agenda items.",
    actionItems: [
      "Scheduled to vote on Resolution 2026-009 terminating Tax Increment Financing District #1",
      "Upon potential adoption, Village Clerk was expected to be directed to notify the Wisconsin Department of Revenue of termination and sign the required DOR Final Accounting Submission Date form",
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
    id: "NLyxmmKbH8M", source: "weston",
    title: "Public Works Committee",
    date: "April 13, 2026", shortDate: "APR 13",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=NLyxmmKbH8M",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04132026-1902",
    isAgendaOnly: true,
    badge: null,
    overview: "Based on the published agenda, this special meeting of the Village of Weston Board of Trustees was scheduled to consider terminating Tax Increment Financing District #1, which was created in 1998. The termination required action before an April 15th state deadline and would allow excess collected increment to be distributed to affected taxing districts.",
    agenda: [
      { time:"5:45 p.m.", item:"Public Comments" },
      { time:"N\/A", item:"Resolution No. 2026-009: A Resolution Terminating the Village of Weston Tax Increment Financing District (TID) #1" },
    ],
    discussions: [
      { item:"Resolution No. 2026-009: TID #1 Termination", body:"The Board was scheduled to consider terminating Tax Increment Financing District #1, which was created on March 30, 1998. The resolution notes that sufficient increment was collected as of the 2025 tax roll to cover all TID project costs totaling approximately $10.88 million, including bond payments, administration expenses, and grant payments. State statute required Department of Revenue notification by April 15th, making this special meeting necessary to meet the deadline." },
    ],
    publicComment: "Public comment was scheduled for up to three minutes per person regarding non-agenda items, with time extensions at the Chief Presiding Officer's discretion.",
    actionItems: [
      "Board was scheduled to vote on Resolution No. 2026-009 to terminate Tax Increment Financing District #1",
      "Village Clerk was expected to be authorized to notify the Wisconsin Department of Revenue of the termination and sign required DOR Final Accounting Submission Date form",
      "Village Treasurer was expected to be authorized to distribute excess increment to affected taxing districts following final audit",
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
    id: "Avkx2lxBq_s", source: "weston",
    title: "Plan Commission",
    date: "April 13, 2026", shortDate: "APR 13",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=Avkx2lxBq_s",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04132026-1902",
    isAgendaOnly: true,
    badge: null,
    overview: "Based on the published agenda, this special meeting of the Village of Weston Board of Trustees was scheduled to address the termination of Tax Increment Financing District #1, which was created in 1998. The resolution would close out the TIF district after all projects were completed and sufficient funds were collected to cover outstanding expenses totaling over $10.8 million.",
    agenda: [
      { time:"5:45 p.m.", item:"Special Board of Trustees Meeting called to order" },
      { time:"N\/A", item:"Public Comments - up to three minutes for non-agenda items" },
      { time:"N\/A", item:"Resolution No. 2026-009: A Resolution Terminating the Village of Weston Tax Increment Financing District (TID) #1" },
    ],
    discussions: [
      { item:"Resolution No. 2026-009: TID #1 Termination", body:"The Board was scheduled to consider terminating Tax Increment Financing District #1, which was created on March 30, 1998. The resolution was expected to authorize closure of the district after confirming sufficient funds to cover outstanding expenses including $9.8 million in bond principal, administration costs, grant payments, and road maintenance. State statute requires the Department of Revenue to receive the termination resolution by April 15th." },
    ],
    publicComment: "Public comment period was included on the agenda, allowing up to three minutes per person for non-agenda items, with time extensions permitted at the Chief Presiding Officer's discretion.",
    actionItems: [
      "Board was scheduled to vote on Resolution No. 2026-009 to terminate TIF District #1",
      "Village Clerk was expected to be authorized to notify Wisconsin Department of Revenue of termination and sign required DOR Final Accounting Submission Date form",
      "Village Treasurer was expected to be authorized to distribute excess increment to affected taxing districts",
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
    id: "u8VS0_4xkeg", source: "wausau",
    title: "Wausau Board of Public Works Meeting",
    date: "April 14, 2026", shortDate: "APR 14",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=u8VS0_4xkeg",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2293/overview",
    isAgendaOnly: false,
    badge: null,
    overview: "The Board of Public Works approved storm sewer material purchases from three vendors and acted on seven claims filed against the City, denying six and approving one subrogated claim for $6,266.21. The board also opened statements of qualifications for real estate services on two state highway projects.",
    agenda: [
      { time:"N\/A", item:"April 8, 2026 Regular Board of Public Works Minutes" },
      { time:"N\/A", item:"Make recommendation for Storm Sewer Materials" },
      { time:"N\/A", item:"Open Statement of Qualifications for Real Estate Services, STH 52 (East Wausau Avenue) Project ID 6999-00-23" },
      { time:"N\/A", item:"Open Statement of Qualifications for Real Estate Services, Bus. 51 (Grand Avenue) Project ID 6999-02-20" },
      { time:"N\/A", item:"Discussion and possible action regarding claims filed with City" },
    ],
    discussions: [
      { item:"April 8, 2026 Regular Board of Public Works Minutes", body:"The minutes from the April 8, 2026 meeting were approved. Vote count and movers not recorded in the official record." },
      { item:"Make recommendation for Storm Sewer Materials", body:"The board approved the purchase of storm sewer materials from three vendors: concrete items from County Materials, erosion control materials from Volm, and rings, HDPE pipe and castings from Ferguson. The motion passed; specific vote count not recorded." },
      { item:"Open Statement of Qualifications for Real Estate Services, STH 52 (East Wausau Avenue) Project ID 6999-00-23", body:"Statements of qualifications for real estate services on the STH 52 project were opened. No vote was recorded for this procedural item." },
      { item:"Open Statement of Qualifications for Real Estate Services, Bus. 51 (Grand Avenue) Project ID 6999-02-20", body:"Statements of qualifications for real estate services on the Business 51 Grand Avenue project were opened. No vote was recorded for this procedural item." },
      { item:"Claims filed with City", body:"The board acted on seven claims: approved the subrogated claim of Patricia Tikalsky for $6,266.21; denied the claims of Scott Hagen ($52.41), Michael Kittelson ($103.93), Sabrina Steppert ($301.47), Alesandra Alanis ($4,866.60), and Jackie Lucht ($781.50). All motions passed; specific vote counts not recorded." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Storm sewer materials to be purchased from County Materials (concrete), Volm (erosion control), and Ferguson (rings, HDPE pipe, castings)",
      "Patricia Tikalsky subrogated claim of $6,266.21 approved for payment",
      "Six claims denied: Scott Hagen, Michael Kittelson, Sabrina Steppert, Alesandra Alanis, and Jackie Lucht",
      "Review of qualifications for real estate services on STH 52 and Bus. 51 projects to proceed",
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
    id: "z-rkJr4znIM", source: "wausau",
    title: "Wausau Finance Committee Meeting",
    date: "April 14, 2026", shortDate: "APR 14",
    committee: "Finance Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=z-rkJr4znIM",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2003/overview",
    isAgendaOnly: false,
    badge: null,
    overview: "The Wausau Finance Committee approved authorization for up to $10,560,000 in General Obligation Promissory Notes after rejecting motions to postpone and call the question. The committee passed all budget amendments and contracts on the agenda, including participation in the National Opioid Settlement Agreement, while postponing property purchases on Adolph and Myron Streets to a joint meeting in May.",
    agenda: [
      { time:"N\/A", item:"Public comment on agenda items" },
      { time:"N\/A", item:"Consideration of the minutes of the preceding meeting(s) - March 24, 2026" },
      { time:"N\/A", item:"Approving authorization for issuance of not to exceed $10,560,000 General Obligation Promissory Notes, Series 2026A" },
      { time:"N\/A", item:"Approving budget amendment for Wausau Water Works 2025 Lead Service Line Replacement project" },
      { time:"N\/A", item:"Approving budget amendment for revised carryover of 2025 Project Funds to 2026 Budget" },
      { time:"N\/A", item:"Approving budget amendment for Wausau Metro Ride Transit Feasibility Study" },
      { time:"N\/A", item:"Approving participation in Six Remnant Defendants National Opioid Settlement Agreement" },
      { time:"N\/A", item:"Approving 2026 scope of work and budget from GHD Services, Inc. for Wausau Water Supply Superfund Site" },
      { time:"N\/A", item:"Approving Sole Source Request for REI Environmental for former MBX Property investigation" },
      { time:"N\/A", item:"Approving Fixed Price Maintenance Support Agreement with GMV Syncromatics Corp. for CAD\/AVL at Metro Ride" },
      { time:"N\/A", item:"Approving amendment to the Procurement Policy" },
      { time:"N\/A", item:"Approving 2026 Community Development Block Grant program year allocation" },
      { time:"N\/A", item:"Considering purchasing properties at 108, 112, 112-1\/2 Adolph Street and 233 Myron Street" },
      { time:"N\/A", item:"Closed Session for property purchase negotiations" },
      { time:"N\/A", item:"Update on 2026 Lead Service Line Replacement project and funding allocations" },
    ],
    discussions: [
      { item:"Minutes of March 24, 2026", body:"The minutes were approved unanimously. Sarah Watson moved and Vicki Tierney seconded the motion, which passed 10-0." },
      { item:"$10,560,000 General Obligation Promissory Notes, Series 2026A", body:"Authorization for the issuance was approved after debate. Motions to postpone consideration and to call the question both failed before the final vote to approve the authorization passed." },
      { item:"Wausau Water Works 2025 Lead Service Line Replacement budget amendment", body:"The budget amendment to cover costs not funded by the WDNR subsidized loan was approved by the committee." },
      { item:"Revised carryover of 2025 Project Funds to 2026 Budget", body:"The budget amendment for the revised carryover of 2025 project funds was approved." },
      { item:"Wausau Metro Ride Transit Feasibility Study", body:"The budget amendment for the transit feasibility study was approved. A motion to postpone consideration to the next meeting failed before the study was approved." },
      { item:"Six Remnant Defendants National Opioid Settlement Agreement", body:"The committee voted to approve the city's participation in the National Opioid Settlement Agreement." },
      { item:"GHD Services 2026 scope of work for Superfund Site", body:"The 2026 scope of work and budget from GHD Services, Inc. for the Wausau Water Supply Superfund Site was approved." },
      { item:"REI Environmental Sole Source Request for MBX Property", body:"The sole source request for REI Environmental to complete phase II investigation and ongoing site work at 201 North 1st Ave was approved." },
      { item:"GMV Syncromatics CAD\/AVL Maintenance Agreement", body:"The fixed price maintenance support agreement with GMV Syncromatics Corp. for CAD\/AVL systems at Metro Ride was approved." },
      { item:"Procurement Policy Amendment", body:"The amendment to the city's Procurement Policy was approved by the committee." },
      { item:"2026 Community Development Block Grant Allocation", body:"The 2026 CDBG program year allocation was approved." },
      { item:"Property purchases on Adolph and Myron Streets", body:"The committee voted to postpone consideration of purchasing properties at 108, 112, 112-1\/2 Adolph Street and 233 Myron Street to the second meeting in May with a joint meeting with the Infrastructure & Facilities Committee." },
      { item:"Update on 2026 Lead Service Line Replacement project", body:"This was a discussion item providing an update on the 2026 Lead Service Line Replacement project and funding allocations. No vote was taken as this was informational." },
    ],
    publicComment: "Public comment on agenda items was listed on the agenda.",
    actionItems: [
      "Authorization approved for up to $10,560,000 in General Obligation Promissory Notes, Series 2026A",
      "Budget amendments approved for Water Works Lead Service Line project, 2025 project fund carryover, and Metro Ride feasibility study",
      "City to participate in Six Remnant Defendants National Opioid Settlement Agreement",
      "GHD Services approved for 2026 Superfund Site work",
      "REI Environmental approved for MBX Property investigation via sole source",
      "GMV Syncromatics maintenance agreement approved for Metro Ride CAD\/AVL",
      "Procurement Policy amendment approved",
      "2026 CDBG program year allocation approved",
      "Property purchases on Adolph and Myron Streets postponed to joint meeting with Infrastructure & Facilities Committee in late May",
    ],
    civicItems: [
      { number:"1", name:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"2", name:"Consideration of the minutes of the preceding meeting(s).", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson", "Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson"], no:[], abstain:[] }], docs:[], children:[
      { number:"a", name:"Regular Finance Committee Minutes", votes:[], docs:[{ name:"Finance_Regular_03242026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6650)" }], children:[] },
    ] },
      { number:"3", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Approving the authorizization for the issuance and establishing parameters for the sale of not to exceed $10,560,000 General Obligation Promissory Notes, Series 2026A.", votes:[{ motion:"approve the authorization and issuance", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Sarah Watson", "Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Sarah Watson"], no:["Vicki Tierney", "Vicki Tierney"], abstain:[] }, { motion:"postpone consideration of this item to the next meeting", passed:false, initiator:"Vicki Tierney", seconder:"Becky McElhaney", yes:["Vicki Tierney", "Vicki Tierney"], no:["Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Sarah Watson", "Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Sarah Watson"], abstain:[] }, { motion:"call the question", passed:false, initiator:"", seconder:"", yes:[], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6629)" }, { name:"Pre Sale Report - Wausau Series 2026A", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6720)" }, { name:"Municipal Information Questionnaire - Wausau Series 2026A", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6752)" }, { name:"Resolution 26-0411", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6751)" }], children:[] },
      { number:"b", name:"Approving budget amendment for Wausau Water Works 2025 Lead Service Line Replacement project to cover costs not funded by the WDNR subsidized loan.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson", "Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6625)" }, { name:"WDNR LSL Funding Non-Construction Costs Determination", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6627)" }, { name:"Resolution", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6754)" }], children:[] },
      { number:"c", name:"Approving budget amendment for revised carryover of 2025 Project Funds to the 2026 Budget.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson", "Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"Resolution 25-1109B", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6742)" }, { name:"Exhibit A", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6719)" }], children:[] },
      { number:"d", name:"Approving budget amendment for Wausau Metro Ride for Wausau Area Transit Feasibility Study", votes:[{ motion:"approve the feasibility study for Wausau Metro Ride", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson", "Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson"], no:[], abstain:[] }, { motion:"postpone consideration of this item to the next meeting", passed:false, initiator:"Vicki Tierney", seconder:"Aaron Griner", yes:[], no:["Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson", "Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson"], abstain:[] }], docs:[{ name:"Metro Ride Feasibility Study Contract", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6747)" }, { name:"Resolution 26-0306", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6743)" }, { name:"Appendix A", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6744)" }, { name:"Appendix B", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6745)" }, { name:"Appendix C", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6746)" }], children:[] },
      { number:"e", name:"Approving of and participating in the Six Remnant Defendants National Opioid Settlement Agreement.", votes:[{ motion:"approve participate in the settlement agreement", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson", "Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6741)" }, { name:"Six Remnant Defendants National Opioid Settlement Overview", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6624)" }, { name:"Six Remnant Defendants National Opioid Participation and Release Form", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6622)" }, { name:"Notice of New National Opioid Settlement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6623)" }], children:[] },
      { number:"f", name:"Approving 2026 scope of work and budget from GHD Services, Inc. for the Wausau Water Supply Superfund Site.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson", "Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"GHD Services Inc. Scope of Services", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6647)" }], children:[] },
      { number:"g", name:"Approving Sole Source Request for the completion of the phase II investigation and ongoing site investigation work from REI Environmental for the former MBX Property located at 201 North 1st Ave, DNR BRRTS # 02-37-598480.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson", "Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"Sole Source Request", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6649)" }, { name:"REI Site Investigation Proposal - Wausau MBX Property 201 N. 1st Avenue Phase II  Investigation and Ongoing Site Work", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6648)" }], children:[] },
      { number:"h", name:"Approving Fixed Price Product & Services Maintenance Support Agreement with GMV Syncromatics Corp. for CAD\/AVL at Metro Ride.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson", "Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"GMV Contract Part 1", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6768)" }, { name:"GMV Contract Part 2", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6769)" }, { name:"Resolution 26-4010", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6772)" }], children:[] },
      { number:"i", name:"Approving amendment to the Procurement Policy.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson", "Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"Proposed Procurement Policy 03\/2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6738)" }, { name:"Resolution DRAFT", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6737)" }], children:[] },
      { number:"j", name:"Approving 2026 Community Development Block Grant program year allocation.", votes:[{ motion:"approve the CDBG program year allocation", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson", "Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6748)" }, { name:"2026 Community Development Block Grant Allocations", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6749)" }, { name:"Application for Federal Assistance SF-424", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6753)" }], children:[] },
      { number:"k", name:"Considering purchasing the following properties adding additional land to the Department of Public Works Streets Division:&nbsp; 108 Adolph Street, 112 Adolph Street, 112-1\/2 Adolph Street and 233 Myron Street.", votes:[{ motion:"postpone consideration of this item to the second meeting in May with a joint meeting with the Infrastructure & Facilities Committee", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson", "Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6630)" }, { name:"Infrastructure&Facilities_Regular_12112025_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6631)" }, { name:"Infrastructure&Facilities_Regular_02122026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6634)" }, { name:"233 Myron Street Phase I", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6635)" }, { name:"Site Map", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6633)" }, { name:"Considering Property Purchases by the Wausau Department of Public Works", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6632)" }], children:[] },
    ] },
      { number:"4", name:"Closed Session.", votes:[], docs:[], children:[
      { number:"a", name:"Adjourn to Closed Session&nbsp;pursuant to Wisconsin State Statute § 19.85(1)(e) for deliberating or negotiating the purchasing of public properties, the investing of public funds, or conducting other specified public business, whenever competitive or bargaining reasons require a closed session, for the purpose of purchasing the following properties adding additional land to the Department of Public Works Streets Division: 108 Adolph Street, 112 Adolph Street, 112-1\/2 Adolph Street and 233 Myron Street.", votes:[], docs:[], children:[] },
    ] },
      { number:"5", name:"Reconvene into Open Session, if necessary, to take action on Closed Session items.", votes:[], docs:[], children:[] },
      { number:"6", name:"Discussion.", votes:[], docs:[], children:[
      { number:"a", name:"Update on the 2026 Lead Service Line Replacement project and funding allocations.", votes:[], docs:[{ name:"American Water Works Association - Beyond the Replacement Era: Balancing Compounding Infrastructure Needs with Household Affordability", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6684)" }], children:[] },
    ] },
      { number:"7", name:"Adjournment.", votes:[{ motion:"adjourn", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson", "Aaron Griner", "Michael  Martens", "Becky McElhaney ", "Vicki Tierney", "Sarah Watson"], no:[], abstain:[] }], docs:[], children:[] },
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
    id: "nhvnLLNPcqI", source: "wausau",
    title: "Wausau City Council Meeting",
    date: "April 14, 2026", shortDate: "APR 14",
    committee: "City Council", duration: "~1h",
    url: "https://www.youtube.com/watch?v=nhvnLLNPcqI",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/1964/overview",
    isAgendaOnly: false,
    badge: null,
    overview: "The Wausau Common Council approved a nine-item consent agenda 10-1, including bikeshare program expansion and a Habitat for Humanity property sale. A tax claim recovery resolution failed, as did a summer hours program which was referred back to committee. The council authorized issuance of up to $10.56 million in general obligation promissory notes and approved participation in a national opioid settlement.",
    agenda: [
      { time:"N\/A", item:"Mayor's Monarch Proclamation" },
      { time:"N\/A", item:"Comments and suggestions from preregistered citizens" },
      { time:"N\/A", item:"Consent agenda including bikeshare sponsorship, mobile phone ordinance repeal, various licenses, Business 51 agreement, utility easement, solar program MOU, Grand Avenue signal project plat, airport ground leases, and Habitat for Humanity property sale" },
      { time:"N\/A", item:"Utility Easement with Beacon Resources LLC at 731 N 1st Street" },
      { time:"N\/A", item:"Confirming Appointments to Wausau Arts Commission and Airport Committee" },
      { time:"N\/A", item:"Alleged Claim for Recovery of Unlawful Tax for Green Acres at Greenwood Hills, LLC" },
      { time:"N\/A", item:"2025 Budget Modification to Transfer $494,000 to Recycling Fund, Airport Fund, and Parking Fund" },
      { time:"N\/A", item:"Suspend Rule 1(D) Transmission of Committee business to the Council" },
      { time:"N\/A", item:"2026 Budget Modification for Carryover of Funds from 2025 to 2026" },
      { time:"N\/A", item:"2025 Budget Modification for Wausau Water Works Lead Service Line Replacement Project" },
      { time:"N\/A", item:"2025 Budget Modification for Wausau Metro Ride Transit Feasibility Study" },
      { time:"N\/A", item:"Fixed Price Product & Services Maintenance Support Agreement with GMV Syncromatics Corp. for CAD\/AVL at Metro Ride" },
      { time:"N\/A", item:"Participating in Six Remnant Defendants National Opioid Settlement Agreement" },
      { time:"N\/A", item:"2026 Summer Hours Program" },
      { time:"N\/A", item:"Issuance of Not to Exceed $10,560,000 General Obligation Promissory Notes, Series 2026A" },
    ],
    discussions: [
      { item:"Consent Agenda", body:"Approved 10-1. Motion by Sarah Watson, seconded by Tom Neal. Vicki Tierney voted no. Items included bikeshare program sponsorship expansion, repeal of hand-held mobile phone ordinance, various licenses, Business 51 agreement, solar program MOU, Grand Avenue signal project plat, airport ground leases, and sale of property at 921 S. 19th Avenue to Habitat for Humanity of Wausau." },
      { item:"Utility Easement with Beacon Resources LLC at 731 N 1st Street", body:"Approved. This item was moved from the consent agenda to ordinances and resolutions. Specific vote count not recorded." },
      { item:"Confirming Appointments to Wausau Arts Commission and Airport Committee", body:"Approved. Mayor's appointments to the Wausau Arts Commission and Airport Committee were confirmed. Specific vote count not recorded." },
      { item:"Alleged Claim for Recovery of Unlawful Tax for Green Acres at Greenwood Hills, LLC - Outlot 1", body:"Failed. The Finance Committee resolution to approve the alleged claim for tax recovery was denied by the council. Specific vote count not recorded." },
      { item:"2025 Budget Modification to Transfer $494,000", body:"Approved. The budget modification transferring a combined total of $494,000 to the Recycling Fund, Airport Fund, and Parking Fund passed. Specific vote count not recorded." },
      { item:"Suspend Rule 1(D) Transmission of Committee business to the Council", body:"Approved 8-3. Motion by Sarah Watson, seconded by Michael Martens. Terry Kilian, Vicki Tierney, and Aaron Griner voted no. This allowed several Finance Committee items to proceed without standard transmission timing." },
      { item:"2026 Budget Modification for Carryover of Funds from 2025 to 2026", body:"Approved. The resolution allowing carryover of funds from 2025 to 2026 passed. Specific vote count not recorded." },
      { item:"2025 Budget Modification for Wausau Water Works Lead Service Line Replacement Project", body:"Approved. The budget modification to cover costs not funded by the WDNR subsidized loan passed. Specific vote count not recorded." },
      { item:"2025 Budget Modification for Wausau Metro Ride Transit Feasibility Study", body:"Approved. The budget modification for the transit feasibility study passed. Specific vote count not recorded." },
      { item:"Fixed Price Product & Services Maintenance Support Agreement with GMV Syncromatics Corp.", body:"Approved. The agreement for CAD\/AVL services at Metro Ride passed. Specific vote count not recorded." },
      { item:"Six Remnant Defendants National Opioid Settlement Agreement", body:"Approved. The city will participate in the national opioid settlement agreement. Specific vote count not recorded." },
      { item:"2026 Summer Hours Program", body:"Failed initially, then referred back to Human Resources Committee. The resolution approving the 2026 summer hours program did not pass, and the council voted to send it back to committee for further review." },
      { item:"Issuance of General Obligation Promissory Notes, Series 2026A", body:"The resolution authorizing issuance and establishing parameters for sale of up to $10,560,000 in general obligation promissory notes was on the agenda. Vote record is incomplete but item was considered under suspended rules." },
    ],
    publicComment: "Public comment was on the agenda with both preregistered citizen comments before the business meeting and comments from citizens present occurring both before and after the business meeting.",
    actionItems: [
      "Bikeshare program to pursue sponsorship funds for expansion",
      "Repeal of hand-held mobile phone ordinance takes effect",
      "Property at 921 S. 19th Avenue to be sold to Habitat for Humanity of Wausau",
      "City to participate in Six Remnant Defendants National Opioid Settlement Agreement",
      "Summer Hours Program referred back to Human Resources Committee for further review",
      "Budget modifications approved for Recycling Fund, Airport Fund, Parking Fund, Water Works lead service line project, and Metro Ride feasibility study",
      "General obligation promissory notes up to $10.56 million authorized for issuance",
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
  { date:"2026-06-18", time:"5:00 PM", name:"HR, Finance & Property Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-06-23", time:"5:00 PM", name:"Environmental Resources Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-06-23", time:"7:00 PM", name:"County Board Meeting", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
];

const SCHOOL_BOARD_UPCOMING = [
  { date:"2026-04-30", time:"5:00 PM", name:"Special Meeting", url:"https://meetings.boardbook.org/Public/Agenda/1360?meeting=741715", source:"school_board" },
  { date:"2026-05-11", time:"5:00 PM", name:"Regular Board Meeting", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-05-25", time:"5:00 PM", name:"Education & Operations Committee", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-06-08", time:"5:00 PM", name:"Regular Board Meeting", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-06-22", time:"5:00 PM", name:"Education & Operations Committee", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
];

const WAUSAU_UPCOMING = [
  { date:"2026-04-28", time:"10:30 AM", name:"Board of Public Works Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2334/overview", source:"wausau" },
  { date:"2026-04-28", time:"6:30 PM", name:"Common Council Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2335/overview", source:"wausau" },
  { date:"2026-04-29", time:"4:00 PM", name:"Historic Preservation Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2216/overview", source:"wausau" },
  { date:"2026-05-04", time:"5:15 PM", name:"Parks & Recreation Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2056/overview", source:"wausau" },
  { date:"2026-05-05", time:"11:00 AM", name:"Water Works Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2191/overview", source:"wausau" },
  { date:"2026-05-05", time:"2:00 PM", name:"Board of Public Works Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2331/overview", source:"wausau" },
  { date:"2026-05-05", time:"5:30 PM", name:"Economic Development Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1991/overview", source:"wausau" },
  { date:"2026-05-07", time:"5:00 PM", name:"Sustainability, Energy & Environment Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2168/overview", source:"wausau" },
  { date:"2026-05-11", time:"4:45 PM", name:"Human Resources Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2029/overview", source:"wausau" },
  { date:"2026-05-11", time:"4:45 PM", name:"Human Resources Committee", url:"https://wausauwi.portal.civicclerk.com/event/2295/overview", source:"wausau" },
  { date:"2026-05-12", time:"5:30 PM", name:"Finance Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2004/overview", source:"wausau" },
  { date:"2026-05-12", time:"6:30 PM", name:"Common Council Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1965/overview", source:"wausau" },
  { date:"2026-05-13", time:"4:00 PM", name:"Building Advisory Board Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2329/overview", source:"wausau" },
  { date:"2026-05-13", time:"6:00 PM", name:"Airport Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1952/overview", source:"wausau" },
  { date:"2026-05-14", time:"5:15 PM", name:"Infrastructure & Facilities Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2043/overview", source:"wausau" },
];

const WESTON_UPCOMING = [
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
