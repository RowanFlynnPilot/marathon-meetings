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
    date: "April 10, 2026", shortDate: "APR 10",
    committee: "City Council", duration: "~1h",
    url: "https://www.youtube.com/watch?v=rQcjCEY36e4",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Common Council approved a development agreement for the 11 Scott Street\/Wateride Place project (6-3 vote), recognized city workers for their response to a record 30.9-inch snowfall, and presented sustainability awards to Colby and Colby Millwork. The council also approved several routine items including a solid waste service agreement and budget modifications.",
    agenda: [
      { time:"2:49", item:"Call to order and Pledge of Allegiance" },
      { time:"3:30", item:"Proclamation - Sarah Rafi Day (March 31st)" },
      { time:"7:00", item:"Mayoral Citation - DPW Snow Response Team" },
      { time:"14:30", item:"Sustainability Award Presentation to Colby and Colby Millwork" },
      { time:"20:00", item:"Approval of March 10, 2026 meeting minutes" },
      { time:"20:30", item:"Public Comment" },
      { time:"23:00", item:"Consent Agenda" },
      { time:"23:30", item:"Development Agreement - 11 Scott Street LLC" },
      { time:"36:00", item:"Mayor Appointments to Commissions" },
      { time:"37:00", item:"Solid Waste and Recycling Service Agreement" },
      { time:"42:00", item:"Police Department Training and Equipment Resolutions" },
      { time:"44:00", item:"Settlement Resolution - David Holes vs City of Wausau" },
    ],
    discussions: [
      { item:"11 Scott Street Development Agreement", body:"The council approved a joint resolution for a development agreement and amended parking agreement with 11 Scott Street LLC for Wateride Place. Alder Rasmusson spoke in support, noting the project would return parking spaces to public use and add mid-priced residential units downtown. Alder Neil emphasized the project would generate $55,000 in annual parking revenue and help close TID 8. Alder Larson was the sole dissenting voice, expressing concern about discounting city parking assets. Alder Tierney questioned the city's ability to provide alternative parking within 300 yards if the ramp closes. Economic Development Director Randy Feifer explained the agreement reduces required parking spots from 480 to 150 and generates new revenue. The motion passed 6-3." },
      { item:"DPW Snow Response Recognition", body:"Mayor Denny presented a mayoral citation to the Department of Public Works plow crews and municipal fleet staff for their response to the record 30.9-inch snowfall from March 14-16, 2026. Street Supervisor Kevin Kester accepted the award and praised the plow operators and mechanics, noting the fleet technicians worked 12 straight days without a day off. Kevin stated the mechanics were essential, saying 'If it wasn't for these mechanics, we wouldn't have been on the road.'" },
      { item:"Sustainability Award - Colby and Colby Millwork", body:"Christine Daniels from the Sustainability, Energy and Environment Committee presented the 2026 City of Wausau Sustainability Award to Colby and Colby Millwork. Mike Thompson and Keith Kaning accepted on behalf of the company, describing their solar panel installation (over 2,000 panels operational since July, generating enough power for about 120 homes), LED lighting upgrades, and recycling initiatives for wood, aluminum, glass, and vinyl materials." },
      { item:"Solid Waste and Recycling Service Agreement", body:"The council approved a seven-year residential solid waste and recycling service agreement with Harter's Fox Valley Disposal. Mayor Denny noted the term was corrected from an earlier mix-up regarding whether it was seven or ten years. The motion passed 9-0." },
      { item:"Police Department Thompson Submachine Gun Sale Proceeds", body:"The council approved a budget modification for the Wausau Police Department to use proceeds from the sale of a Thompson submachine gun to purchase Red Dot Optics. Mayor Denny noted the money had been sitting in the safe for a long time. The motion passed 9-0." },
      { item:"Settlement Resolution - David Holes vs City of Wausau", body:"Assistant City Attorney Vincent Bonito explained this resolution releases claims related to a 2022 bus accident where Transit Mutual insurance paid the initial claim and the other driver's insurer agreed to pay damages. Alder Neil confirmed this settlement does not affect the individual's separate personal injury claim. The motion passed 8-1 without need for closed session." },
    ],
    publicComment: "Two speakers addressed the council regarding the 11 Scott Street project. Raleigh Lray requested support for the green sustainable project at 11 Scott Street, noting it would add mid-priced apartment units downtown. Mark Craig of 3246 North 8th Street emphasized the project is over $10 million and involves bringing a 100,000 square foot vacant building back to life with 52 residential units costing over $8.3 million, stating 'Without your help, it won't happen.'",
    actionItems: [
      "Development agreement and parking agreement with 11 Scott Street LLC approved (6-3)",
      "Meeting minutes from March 10, 2026 approved (9-0)",
      "Consent agenda approved (9-0)",
      "Mayor's appointments to Plan Commission, Affordable Housing Task Force, and BID Board confirmed (9-0)",
      "Seven-year solid waste agreement with Harter's Fox Valley Disposal approved (9-0)",
      "Airspace obstruction removal agreements for Scofield properties approved (9-0)",
      "Police Department budget modification for Red Dot Optics approved (9-0)",
      "Solid waste disposal code update (Chapter 6.44) approved (9-0)",
      "Paid duty time for out-of-country police training approved (9-0)",
      "Community outreach shelter operations duty premium approved (9-0)",
      "Settlement release for David Holes vs City of Wausau approved (8-1)",
      "March 31st proclaimed as Sarah Rafi Day in Wausau",
    ],
  },
  {
    id: "knWZO4dON-8", source: "wausau",
    title: "knWZO4dON-8",
    date: "April 10, 2026", shortDate: "APR 10",
    committee: "Plan Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=knWZO4dON-8",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Plan Commission approved a conditional use permit for a 70-unit, 7-story apartment building at 731 North First Street and a transportation project plat for signal replacements on Grand Avenue. A public hearing was held for a proposed personal storage facility at 218 South Fourth Street, though no action was taken on that item during this meeting.",
    agenda: [
      { time:"0:00", item:"Call to order and election of vice chair (skipped until April)" },
      { time:"0:15", item:"Public comment on agenda items" },
      { time:"0:45", item:"Consideration of minutes from February 18th" },
      { time:"1:00", item:"Public hearing on conditional use permit for 218 South Fourth Street (personal storage facility)" },
      { time:"2:45", item:"Discussion and possible action on conditional use permit for 731 North First Street (70-unit apartment building)" },
      { time:"3:30", item:"Discussion and possible action on transportation project plat for Grand Avenue signal replacements" },
      { time:"4:30", item:"Discussion of next meeting date" },
      { time:"5:00", item:"Adjournment" },
    ],
    discussions: [
      { item:"Minutes from February 18th", body:"Motion to approve made by Bugamin with second from Balkan. Minutes passed unanimously with voice vote." },
      { item:"Public hearing on conditional use permit for 218 South Fourth Street (personal storage facility)", body:"Jason Dunwy and Melinda Don Woody spoke in favor of the storage facility, noting that downtown Wausau has approved over 400 new apartment units including the 153-unit Foundry on Third and 102-unit Evergreen Landing project. They argued apartment residents need convenient storage options and that a downtown facility would keep spending local rather than sending residents to surrounding areas like Kronenwetter. The public hearing was closed but no action was taken on this item." },
      { item:"Conditional use permit for 731 North First Street (Beacon Resources LLC apartment building)", body:"Motion to approve made by Bornman with second by Bugamin. No questions or discussion from commissioners. The conditional use permit for a 70-unit, 7-story apartment building was approved unanimously by voice vote." },
      { item:"Transportation project plat for Grand Avenue signal replacements at Sturgeon and Townline Road", body:"Motion to approve made by Bugamin with second by Balkan. No discussion. The transportation project plat (Project 370-40-40) was approved unanimously by voice vote." },
      { item:"Next meeting date", body:"Staff indicated the next meeting would normally be April 21st (third Tuesday), but noted it may need to be moved due to the election and new council meeting. Commissioners will be notified if a change is needed." },
    ],
    publicComment: "Linda Lawrence submitted written comment via email on March 12th supporting the Beacon Resources apartment proposal at 731 North First Street, stating she would personally live at that location. Jason Dunwy and Melinda Don Woody spoke at the public hearing in support of the storage facility at 218 South Fourth Street, citing the need for storage options for new downtown apartment residents.",
    actionItems: [
      "Conditional use permit approved for 70-unit, 7-story apartment building at 731 North First Street for Beacon Resources LLC",
      "Transportation project plat approved for Grand Avenue signal replacements at Sturgeon and Townline Road (Project 370-40-40)",
      "Vice chair election postponed until April session",
      "Staff to notify commissioners if April 21st meeting needs to be rescheduled due to election\/council meeting conflicts",
    ],
  },
  {
    id: "hNOP07iJjNY", source: "marathon",
    title: "hNOP07iJjNY",
    date: "April 10, 2026", shortDate: "APR 10",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=hNOP07iJjNY",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board of Supervisors held an educational meeting featuring presentations on PFAS litigation opportunities and renewable energy regulatory authority. No votes were taken as this was an informational session; the board received detailed briefings on potentially joining multi-district PFAS litigation against chemical manufacturers and learned about county options for engaging with proposed wind energy projects in the county.",
    agenda: [
      { time:"0:00", item:"Call to order and Pledge of Allegiance" },
      { time:"1:15", item:"Reading of the notice" },
      { time:"1:45", item:"Roll call" },
      { time:"2:15", item:"Public comment period (15 minutes, 5 speakers)" },
      { time:"15:01", item:"Presentation on PFAS multi-district litigation opportunity" },
      { time:"1:01:45", item:"Presentation on renewable energy regulatory authority" },
      { time:"1:45:00", item:"Discussion of county options for wind\/solar projects" },
    ],
    discussions: [
      { item:"Public Comment", body:"Five residents spoke during public comment. Cindy Nelson from Stratford reported visiting 200 homes where no one supported wind turbines and asked the board to send more information to residents. Wendy Rowski from Green Valley urged the board to vote no on advancing the comprehensive plan, objecting to the term 'farm' for industrial energy facilities. Barb Newton from Rib Mountain reiterated support for speed reduction on Double N Road with 75 petition signatures. Heidi Pesky from Town of McMillan argued that joint development agreements are not required and outlined potential risks of such agreements. Cindy Hogan from Rib Mountain supported the Double N Road speed reduction petition." },
      { item:"PFAS Multi-District Litigation Presentation", body:"Attorney Andy Phillips from Atollis Law and Carrie McDougall from Baron and Budd Law Firm presented on PFAS litigation opportunities. McDougall explained the MDL history, noting the water settlement was the largest toxic tort settlement in U.S. history at approximately $12-13 billion from 3M and $3-5 billion from DuPont. He indicated soil-based and airport claims like Marathon County's may be next. Supervisor Robinson asked about scope of claims regarding landfills and land spreading. Vice Chair Dickinson noted the airport has no known PFAS contamination currently. Supervisor Marsh asked about costs; McDougall confirmed a 25% contingency fee with no upfront costs to the county. The presentation was informational with a resolution scheduled for potential action next week." },
      { item:"Renewable Energy Regulatory Authority Presentation", body:"Attorney Rebecca Roker from Atollis Law presented on behalf of Wisconsin Counties Association regarding county authority over wind and solar projects. She explained that PSC has jurisdiction over projects 100 megawatts or greater and has approved all 33 solar projects it has reviewed. She discussed the Hub City Wind project from Alliant Energy (no PSC filing yet), the Marathon Wind LLC project (purchased by Hub City), and the Stormark Wind Energy Center. Roker outlined four options: do nothing, negotiate a Joint Development Agreement (JDA), intervene in PSC proceedings, or litigate. She strongly recommended JDAs as the most effective tool to protect county interests regarding liability, roads, decommissioning, and emergency response, noting litigation is expensive and rarely successful at stopping projects." },
    ],
    publicComment: "Five speakers addressed the board: Cindy Nelson (Stratford\/Oplane Township) opposed wind turbines citing conversations with 200 residents; Wendy Rowski (Green Valley) urged voting no on comprehensive plan due to misleading 'farm' terminology for industrial energy facilities; Barb Newton (Rib Mountain) supported Double N Road speed reduction with 75 petition signatures citing safety concerns; Heidi Pesky (Town of McMillan) warned against Joint Development Agreements for wind projects; Cindy Hogan (Rib Mountain) supported the Double N Road speed reduction.",
    actionItems: [
      "Resolution on PFAS litigation engagement scheduled for discussion and potential action at next week's meeting",
      "Board to consider options for engaging with proposed wind energy projects including potential JDA negotiations",
      "County to identify specific concerns and potential impacts of proposed wind projects",
      "County leaders (chair, administrator, corporation counsel) to serve as point persons for any developer discussions",
    ],
  },
  {
    id: "gugcMAm6DFA", source: "wausau",
    title: "gugcMAm6DFA",
    date: "April 10, 2026", shortDate: "APR 10",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=gugcMAm6DFA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Board of Public Works held a brief meeting to open bids for the 2026 asphalt paving project. RC Pavers was awarded the contract with the lower bid of $824,146.34, beating American's bid of $849,872.10.",
    agenda: [
      { time:"0:00", item:"Call to order" },
      { time:"0:08", item:"Open bids and make recommendation for the 2026 asphalt paving project" },
      { time:"0:42", item:"Motion to adjourn" },
    ],
    discussions: [
      { item:"2026 Asphalt Paving Project Bid Opening", body:"Two bids were opened for the asphalt paving project. RC Pavers submitted a bid of $824,146.34 and American submitted a bid of $849,872.10. A motion was made to approve RC Pavers as the lower bidder, which was seconded and passed unanimously with all members voting 'aye.'" },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "RC Pavers awarded the 2026 asphalt paving project contract at $824,146.34",
    ],
  },
  {
    id: "f1fZvkxedNY", source: "wausau",
    title: "f1fZvkxedNY",
    date: "April 10, 2026", shortDate: "APR 10",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=f1fZvkxedNY",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Board of Public Works approved construction contracts and change orders for street projects, with Switlick winning a very close bid for the 26th Street construction project at $1,279,089.75, beating the second-lowest bidder by less than $1,000. The board also approved a change order and pay estimate for the Randolph\/Cherry Street project.",
    agenda: [
      { time:"0:01", item:"Call to order" },
      { time:"0:01", item:"Consideration of March 10th regular Board of Public Works minutes" },
      { time:"0:18", item:"Open bids for 26th Street construction project" },
      { time:"2:15", item:"North 8th Avenue bid opening - postponed" },
      { time:"2:25", item:"2025 Street Construction Project A (Rolph Street, Cherry Street) - Change Order 1" },
      { time:"5:01", item:"2025 Street Construction Project A - Pay Estimate #9" },
      { time:"5:30", item:"Portland cement concrete license for KSK Incorporated" },
      { time:"5:55", item:"Adjournment" },
    ],
    discussions: [
      { item:"March 10th Board of Public Works Minutes", body:"Minutes were approved with a motion and second. Passed unanimously with all voting aye." },
      { item:"26th Street Construction Project Bids", body:"Seven bids were opened and read aloud. Switlick submitted the lowest bid at $1,279,089.75, barely beating Hos at $1,280,877.96 - a difference of less than $1,000. Other bidders included A1 ($1,374,600), Francis Melvin ($1,385,383), Steen ($1,489,126), James Peterson ($1,570,698.56), and Earth ($1,686,708.75). A member noted the 'tight bids' between the top two. Motion to approve Switlick passed unanimously." },
      { item:"North 8th Avenue Bid Opening", body:"This item was postponed as the bid opening deadline was extended. Will return at a future meeting." },
      { item:"2025 Street Construction Project A - Change Order 1", body:"Staff presented four items totaling $14,436.50: an inside drop on a manhole ($4,856) due to an unrecorded large diameter sanitary service; water main work ($2,317.50) after finding 6-inch instead of expected 8-inch main; miscellaneous storm sewer tie-ins ($5,016 at $66\/lineal foot); and geogrid installation ($2,247) for 750 square yards near Thomas Jefferson Elementary due to poor soil conditions. Change Order 2 regarding liquidated damages was deferred pending further discussions. Motion to approve passed unanimously." },
      { item:"2025 Street Construction Project A - Pay Estimate #9", body:"Pay estimate for work completed through end of year from Haw Suns Incorporated in the amount of $535,114.42 was recommended for approval. Motion passed unanimously." },
      { item:"Portland Cement Concrete License - KSK Incorporated", body:"Vinnie confirmed he reviewed the application and everything was in order. Motion to approve the license passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Switlick awarded 26th Street construction project contract at $1,279,089.75",
      "North 8th Avenue bid opening postponed to future meeting",
      "Change Order 1 for Randolph\/Cherry Street project approved for $14,436.50",
      "Change Order 2 with liquidated damages to return for future consideration",
      "Pay Estimate #9 for $535,114.42 approved for Haw Suns Incorporated",
      "Portland cement concrete license approved for KSK Incorporated",
    ],
  },
  {
    id: "aUG3K0hxNsU", source: "weston",
    title: "aUG3K0hxNsU",
    date: "April 10, 2026", shortDate: "APR 10",
    committee: "Finance and Human Resource Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=aUG3K0hxNsU",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Finance and Human Resource Committee debated employee clothing allowances after canceling a Cintas uniform contract, ultimately recommending $400 for 2026 and $500 annually starting in 2027, plus a washer and dryer purchase. The meeting also featured a comprehensive presentation on public works operations showing the department operates below average costs compared to other Central Wisconsin communities.",
    agenda: [
      { time:"0:01", item:"Call to order and Pledge of Allegiance" },
      { time:"0:30", item:"Roll call" },
      { time:"0:45", item:"Public comments" },
      { time:"2:45", item:"Approval of minutes from February 16, 2026" },
      { time:"3:15", item:"Acknowledge February financial reports for all funds" },
      { time:"3:45", item:"Acknowledge T1 and T2 detail reports for February" },
      { time:"4:15", item:"Acknowledge legal details for February" },
      { time:"5:00", item:"Educational presentation: Public works operation and budget" },
      { time:"40:03", item:"Discussion and action on reimbursement for clothing and equipment allowance" },
      { time:"1:11:30", item:"Remarks from staff and committee members, future agenda items" },
    ],
    discussions: [
      { item:"Public Comments", body:"Lisa Beck of 1808 Cortez Lane offered two comments. She praised Mike for his work during the recent storm event, stating she wanted to recognize him at every meeting. She also expressed concern about the proposed employee clothing allowance increase, questioning why the village would increase spending after canceling the Cintas contract to save money, and suggested considering a lesser amount than the proposed maximum." },
      { item:"Approval of Minutes and Financial Reports", body:"Minutes from February 16, 2026 were approved unanimously on motion by Steve, seconded by Stephanie. The February financial reports, T1 and T2 detail reports, and legal details were all acknowledged unanimously through separate motions." },
      { item:"Public Works Operation and Budget Presentation", body:"Public Works Director Michael presented a comprehensive overview showing the department manages 119.5 centerline miles of road, 114 miles of water main, 103 miles of sanitary sewer, and 70 miles of storm sewer with 50 pieces of equipment. The 2026 budget decreased by $26,000 (1.1%) from 2025. Michael demonstrated the village spends approximately $9,700 less per mile than the average Central Wisconsin community, making Weston the third lowest spending community per mile in the region. He discussed the recent 17-hour snow event response costing approximately $50,000 and noted the department has one fewer frontline employee than when he started in 2010. He cautioned that transportation aid is tied to spending - when the village stopped major street reconstruction from 2012-2020, state transportation aids dropped significantly." },
      { item:"Employee Clothing and Equipment Allowance", body:"Significant debate occurred over increasing the employee clothing allowance from $300 to $600 after canceling the Cintas uniform contract. Committee member Daniels argued against the increase citing the upcoming fire department referendum and need for fiscal responsibility, suggesting $400 maximum. Michael defended the proposal, noting employees already receive this benefit in a different form and that taking it away would hurt morale and retention. The initial motion for $600 failed 2-3 (Daniels yes, Armain no, Love yes, My no, Sober no). A motion for $400 annually failed 2-3 with the same split. A motion for $400 in 2026 and $500 annually starting 2027 with washer\/dryer also failed. The final motion - $400 for remainder of 2026, $500 annually starting 2027, plus a one-time washer and dryer purchase - passed with one opposed and will be recommended to the village board." },
    ],
    publicComment: "Lisa Beck of 1808 Cortez Lane spoke during public comment. She praised Public Works employee Mike for his efforts during the recent storm and questioned the proposed increase in employee clothing allowances, suggesting the village should consider not increasing spending after canceling the Cintas contract. No online attendees offered public comment.",
    actionItems: [
      "Recommend to village board: $400 clothing allowance for remainder of 2026, $500 annually starting 2027, plus one-time purchase of washer and dryer for staff use",
      "Marathon County disaster relief application pending for recent storm event (approximately $50,000 in costs)",
      "Next meeting scheduled for Tuesday, April 21st at 5:00 PM due to new board member swearing-in schedule",
      "Salt order placed through state cooperative purchase program - 1,500 tons ordered with seasonal fill starting December",
    ],
  },
  {
    id: "_hS5GDGVL1c", source: "wausau",
    title: "_hS5GDGVL1c",
    date: "April 10, 2026", shortDate: "APR 10",
    committee: "Public Health & Safety", duration: "~1h",
    url: "https://www.youtube.com/watch?v=_hS5GDGVL1c",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Public Health and Safety Committee approved a parklet permit for Westider Diner and Lounge after the owner presented detailed plans, held a bartender license denial case pending police chief review, and approved updates to solid waste and mobile phone ordinances. The committee also received updates on the WMC shelter's transition to Bridge Street Mission, expected to complete around April 20th.",
    agenda: [
      { time:"0:00", item:"Call to order and excused absences (Alders Molini and Lucans)" },
      { time:"0:25", item:"Public comment on agenda items" },
      { time:"0:50", item:"Approval of February 16, 2026 meeting minutes" },
      { time:"1:15", item:"License applications - Westider Diner and Lounge parklet permit" },
      { time:"10:30", item:"License denial recommendations - Theodore Davis and Joanna Gregory" },
      { time:"19:15", item:"Summer event licenses and liquor license subcommittee recommendations" },
      { time:"20:01", item:"Repealing and recreating solid waste disposal ordinance (Chapter 6.44)" },
      { time:"22:00", item:"Repealing handheld mobile phone driving ordinance (Section 10.01.012)" },
      { time:"23:30", item:"MREA solar group buy program partnership" },
      { time:"26:00", item:"Fire Department 2025 annual report and ISO rating update" },
      { time:"32:30", item:"Tavern activities report for February 2026" },
      { time:"36:30", item:"Community outreach update and shelter transition to Bridge Street Mission" },
    ],
    discussions: [
      { item:"Westider Diner and Lounge Parklet Permit", body:"Owner Tyler Vote presented detailed mockups for a parklet extending 4 feet into the street and 4 feet on the 11-foot sidewalk at 628 North Third Avenue. He explained it would provide sun exposure for breakfast customers and noted it would take up less space than two parked cars. Alder Larson initially expressed reservations but changed position after seeing the layout. The permit was approved unanimously for the 2026 summer season, with Vote asked to return in November to report on how it went." },
      { item:"License Denial - Theodore Davis", body:"Theodore Davis addressed the committee regarding his bartender license denial recommendation, acknowledging his record and stating he made 'a really bad mistake' 20 years ago as a minor. His boyfriend Matthew Prieb spoke in support, emphasizing Davis has not reoffended and is a 'genuinely good person.' Deputy Chief Baiton was unfamiliar with evidence of rehabilitation Davis had submitted to Chief Barnes. The committee voted to hold the item until the next meeting pending Chief Barnes' review of the rehabilitation documentation." },
      { item:"License Denial - Joanna Gregory", body:"Joanna Gregory did not appear at the meeting. Her denial was processed with the batch of other license applications." },
      { item:"Batch License Approvals", body:"The committee approved licenses as recommended including summer events (Wings over Wasau, Concerts on the Square, Chalkfest, Memorial Day parade, Hope on the Block, Jazz on the River), and three establishments unanimously recommended by the liquor license subcommittee: Oasis Arcade, rebranded Whiskey River Bar and Grill, and new Hayawa ownership. Motion by Larson, second by Watson, passed unanimously." },
      { item:"Solid Waste Disposal Ordinance Update", body:"Assistant City Attorney Vinnie Bonino presented the repeal and recreation of Chapter 6.44 to comply with state-level changes. Motion by Larson, second by Watson, passed unanimously with no discussion." },
      { item:"Handheld Mobile Phone Ordinance Repeal", body:"Vinnie Bonino explained the city's cell phone ban has become redundant since state inattentive driving statutes now regulate cell phone usage. The city already adopts state traffic code, making the local ordinance obsolete. Motion by Watson, second by Larson, passed unanimously." },
      { item:"MREA Solar Partnership", body:"Carrie from planning presented the memorandum of understanding with Midwest Renewable Energy for a group solar buying program. The sustainability committee had unanimously approved it on March 5th. Alder Sarah, who has solar panels, praised the partnership with MREA as experts. Motion by Watson, second by Larson, passed unanimously." },
      { item:"Fire Department Annual Report", body:"Fire Chief announced the department achieved ISO Class 2 status as of the previous Friday, maintaining it for four years. The department responded to over 7,200 calls in 2025, averaging 20 per day. The chief mentioned upcoming public information sessions on March 31st at 1pm at the tech, April 1st at 5pm at Station 2, and April 3rd at Station 1 related to the April 7th referendum." },
      { item:"Shelter Transition to Bridge Street Mission", body:"Tracy Durante reported 415 unduplicated guests served since opening and 740 volunteer hours in February. James Torensson, new Director of Homeless Services at Bridge Street Mission, announced the emergency shelter transition is expected around April 20th, pending contractor confirmation on April 1st. The WMC shelter extended its contract with First United Methodist Church through April 19th to ensure no service gap. Committee expressed interest in touring the new facility at the ribbon cutting ceremony." },
    ],
    publicComment: "Carrie Mor Everest of 1025 Everest Boulevard spoke during late public comment about concerns with how unhoused individuals are treated during 911 emergencies at the shelter. She stated she has volunteered throughout the shelter's operation and witnessed multiple incidents where people were not treated ethically or professionally. She expressed frustration that her complaints over 10 months have not been addressed and only recently learned about the Police and Fire Commission citizen complaint process. The chair noted formal processes exist through the Police and Fire Commission for such complaints.",
    actionItems: [
      "Parklet permit approved for Westider Diner and Lounge at 628 North Third Avenue for summer 2026",
      "Tyler Vote to return in November to report on parklet operations",
      "Theodore Davis bartender license held pending Chief Barnes' review of rehabilitation evidence",
      "Joanna Gregory bartender license denied (did not appear)",
      "Summer event licenses and liquor licenses approved as recommended",
      "Chapter 6.44 solid waste disposal ordinance repealed and recreated",
      "Section 10.01.012 handheld mobile phone ordinance repealed",
      "MREA solar group buy program partnership approved",
      "Staff to investigate Days tavern point total question raised by citizen",
      "Staff to check on Trace Armanos establishment status",
      "Council tour of Bridge Street Mission shelter to be scheduled around ribbon cutting ceremony",
    ],
  },
  {
    id: "Izfp0CD_Da0", source: "weston",
    title: "Izfp0CD_Da0",
    date: "April 10, 2026", shortDate: "APR 10",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=Izfp0CD_Da0",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Board of Trustees approved multiple ordinances including rezonings and a modified speed limit ordinance for Weston Avenue, with the board rejecting the original 35 mph speed limit proposal for the Von Kennel to Highway J section and instead keeping it at 45 mph. The board also approved a 10-year baseball\/softball field maintenance agreement, updated park fees, and tabled discussion on remote meeting attendance policy until the new board is seated after the April election.",
    agenda: [
      { time:"0:01", item:"Call to order and Pledge of Allegiance" },
      { time:"0:01", item:"Roll call" },
      { time:"1:15", item:"Public comments" },
      { time:"5:01", item:"Minutes from February 16th board meeting" },
      { time:"5:30", item:"Acknowledge reports from boards, committees, and commissions" },
      { time:"6:00", item:"Department reports (Administrator, Clerk, Finance, Fire\/EMS, Parks\/Rec, Planning, Police, Public Works, Technology)" },
      { time:"20:02", item:"Ordinances - Rezonings and speed limit changes" },
      { time:"30:01", item:"Resolution - Hinter Springs subdivision final plat" },
      { time:"31:30", item:"Unfinished business - April 2026 referendum informational sessions update" },
      { time:"35:02", item:"New business - E-bike ordinance, parking restrictions, field agreements, park fees" },
    ],
    discussions: [
      { item:"Public Comment - Fire Department Funding", body:"Jim Pensel of 5002 Aerrol Street spoke passionately about SAFER fire department staffing concerns. He attended the department's inaugural citizen academy and witnessed staff exhaustion from being understaffed. He criticized the board's approach of using referendums rather than reprioritizing the budget, arguing that fully funding fire\/EMS is a need while items like artificial turf at Kennedy Park and the aquatic center are wants. He called on the board to 'have the courage to spend it where it actually matters.'" },
      { item:"Finance Director Response to Public Comment", body:"Finance Director Jessica responded that the village cannot borrow for additional firefighters - only for capital projects like the Kennedy Park turf. She noted the village is 'the cheapest' and most efficient but cannot do more without additional operating revenue. She expressed frustration with 'naysayers' who don't acknowledge staff efforts, referenced complaints about snow removal despite 17-18 hour days, and suggested her position might be open in a couple months, noting that $150,000 salary could fund a firefighter." },
      { item:"Speed Limit Ordinance 26-006", body:"The original ordinance setting 35 mph on Weston Avenue from Von Kennel to Ryan failed 4-3 with Maloney, Jordan, and President Barb voting no. Trustee Maloney argued the stretch from Von Kennel to J has sparse driveways and is incomparable to roads like Scoffield Avenue. A substitute motion by Maloney to keep Camp Phillips to Von Kennel at 35 mph but Von Kennel to Highway J at 45 mph passed with Trustee Kern as the only no vote." },
      { item:"Rezoning Ordinances", body:"Ordinance 26-00004 rezoning portion of 8905 Bert Street from RR5 to SFS passed unanimously per planning commission recommendation. Ordinance 26-00005 rezoning portion of 7105 Christensen Avenue from SL to SFS also passed unanimously." },
      { item:"Intersection Signage at Community Center Drive and Birch Street", body:"Motion to change stop sign to yield sign was amended after Trustee Hooang raised safety concerns about bicyclists coming off the pedestrian bridge at 15-20 mph with no signal to stop. A friendly amendment was added to install a stop sign for bicyclists on the path. Motion passed unanimously as amended." },
      { item:"Baseball\/Softball Field Maintenance Agreement", body:"The 10-year agreement with youth baseball and softball organizations was approved unanimously. The committee recommended the long term because of the significant investment at Kennedy Park and to ensure organizations couldn't pull out after one year. The agreement formalizes maintenance responsibilities in lieu of fees." },
      { item:"Remote Meeting Attendance Policy", body:"Trustee Lewis recommended postponing this item until the next meeting so the newly seated board can make the decision. Motion to defer passed unanimously." },
      { item:"Microsoft Teams for Communication", body:"The board approved using Microsoft Teams for trustee communication starting with the next term, eliminating text messaging between trustees. A training session will be held when the new board comes on. Passed unanimously." },
      { item:"Eagle Scout Project at McKiller Park", body:"Approved unanimously with funding to come from park operations budget rather than park impact fees." },
    ],
    publicComment: "Jim Pensel of 5002 Aerrol Street spoke for approximately 4 minutes criticizing the board's approach to fire department funding. He praised SAFER staff after attending their citizen academy, but argued the department is severely understaffed and the board should reprioritize the budget rather than rely on referendums. He specifically cited spending on artificial turf and the aquatic center as 'wants' versus fire\/EMS as 'needs.'",
    actionItems: [
      "Speed limit on Weston Avenue: 35 mph from Camp Phillips to Von Kennel, 45 mph from Von Kennel to Highway J",
      "Install yield sign on Community Center Drive at Birch Street and stop sign for bicyclists on adjacent path",
      "Remove no parking restrictions on west side of Alderson Street along Kennedy Park",
      "10-year baseball\/softball field maintenance agreement approved",
      "Park shelter fees and field rental costs updated as presented",
      "Eagle Scout project at McKiller Park approved with park operations funding",
      "Microsoft Teams adoption for trustee communication starting next term with training session planned",
      "Remote meeting attendance policy deferred to April 21st meeting for new board consideration",
      "E-bike\/euro ordinance tabled pending county finalization",
      "Two remaining referendum Q&A sessions: March 31st 4:30-6pm and April 2nd 12-1:30pm",
      "Next meeting April 21st at 6pm with new board members",
    ],
  },
  {
    id: "HwjjV4oIneA", source: "marathon",
    title: "HwjjV4oIneA",
    date: "April 10, 2026", shortDate: "APR 10",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=HwjjV4oIneA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board of Supervisors adopted the comprehensive plan 2026 with 10 amendments addressing renewable energy language, data centers, AI technology, and energy policy. The board also approved salaries for elected officials, authorized phase 2 design for a new highway facility, approved litigation authority for PFAS contamination, and ratified an emergency declaration related to a recent blizzard.",
    agenda: [
      { time:"0:12", item:"Call to order, pledge of allegiance, and moment of reflection" },
      { time:"1:30", item:"Roll call and welcome to visitors" },
      { time:"2:15", item:"Consent agenda items C8 through C13 B2" },
      { time:"2:45", item:"Adopting Marathon County Comprehensive Plan 2026 (Ordinance 0-13-26)" },
      { time:"1:20:01", item:"Establishing salaries for clerk of courts, sheriff, and elected department heads (Resolution 12-26)" },
      { time:"1:21:00", item:"Phase 2 design services for new highway facility (Resolution 13-26)" },
      { time:"1:23:30", item:"Authorizing outside counsel for PFAS litigation (Resolution 14-26)" },
      { time:"1:28:00", item:"Approving carry forwards and budget amendments (Resolution R-20-26)" },
      { time:"1:29:30", item:"Ratification of local state of emergency declaration (Resolution 22-26)" },
      { time:"1:35:00", item:"County Administrator performance evaluation and salary" },
    ],
    discussions: [
      { item:"Comprehensive Plan 2026 Amendments", body:"Administrator Leonard presented 10 proposed amendments compiled from supervisor feedback. Amendment 1 (livability standards) passed unanimously. Amendments 2, 3, and 4 (alternative energy systems language changes proposed by Vice Chair Dickinson) were separated at Supervisor Crawl's request and each passed but not unanimously. Amendment 5 (data centers and battery storage background) passed not unanimously after Supervisor Leur voted no citing it was 'too ideological.' Amendment 6 (radon and lead remediation) passed unanimously. Amendment 7 (regulate energy projects when allowed by law) passed not unanimously. Amendment 8 (AI and automation language proposed by Supervisor Leur) passed unanimously. Amendment 9 regarding coal, natural gas, and nuclear energy was amended by Supervisor Boots to read 'promote coal and natural gas until a long-term sustainable and reliable energy source can be found that does not adversely affect agricultural land' - the amended version passed not unanimously after debate where Supervisor Rosenberg stated 'there is no such thing as clean coal.' A late amendment by Supervisor Sundulski regarding utility-scale wind and solar as industrial uses was defeated after discussion about referring it to committee. The comprehensive plan as amended passed but was not unanimous." },
      { item:"Establishing salaries for elected officials (Resolution 12-26)", body:"Motion by Supervisor Conway, seconded by Supervisor Rosenberg to establish salaries for the clerk of courts, sheriff, and elected department heads for the upcoming term. Passed with no discussion." },
      { item:"Highway facility phase 2 design (Resolution 13-26)", body:"Motion by Supervisor Robinson, seconded by Supervisor V. Supervisor Soyber requested future information about plans for the old facility. Supervisor Sundulski asked about the $53 million cost estimate but Chair Gibbs clarified that cost approval was not part of this resolution. Passed unanimously." },
      { item:"PFAS litigation authorization (Resolution 14-26)", body:"Two amendments were adopted. Supervisor Robinson's amendment directing the administrator to evaluate past and present county practices that may have resulted in PFAS release passed unanimously. Vice Chair Dickinson's amendment modifying airport-related language passed unanimously. The resolution as amended passed unanimously." },
      { item:"Emergency declaration ratification (Resolution 22-26)", body:"Administrator Leonard explained the local emergency declaration was issued to preserve potential reimbursement opportunities after the governor's declaration expired during the blizzard. He praised county staff for over 600 hours of additional work across facilities, parks, highway, sheriff's office, and airport, with employees working 12-16 hour shifts. Supervisor Fifer echoed thanks to staff. Passed unanimously." },
      { item:"County Administrator evaluation", body:"Chair Gibbs explained the executive committee had already finalized the administrator's evaluation based on board input from the previous Thursday meeting with no wording changes. Supervisor Robinson moved to accept the executive committee's recommendation on salary and performance evaluation without going into closed session. Passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Comprehensive Plan 2026 adopted with 10 amendments effective upon passage",
      "Salaries established for clerk of courts, sheriff, and elected department heads for upcoming term",
      "Staff authorized to proceed with phase 2 design services for new highway facility",
      "Outside counsel authorized on contingency basis for PFAS litigation",
      "County administrator directed to evaluate county operations for PFAS exposure risks",
      "Carry forwards and associated budget amendments approved",
      "Capital asset thresholds set at $10,000 for general assets and $50,000 for infrastructure",
      "Law enforcement drug trafficking response grant accepted with budget amendment",
      "Local state of emergency declaration ratified",
      "County administrator evaluation and salary placement finalized",
      "Departing supervisors (Crawl, Fifick, Marshall, Rosenberg, Hardinger, V, Reynolds) recognized for service",
    ],
  },
  {
    id: "D7R7a0G0WTA", source: "weston",
    title: "D7R7a0G0WTA",
    date: "April 10, 2026", shortDate: "APR 10",
    committee: "Parks and Recreation Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=D7R7a0G0WTA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Parks and Recreation Committee approved minutes, selected Rettler Corporation for the Mock Mueller Park master plan, and reviewed Yellow Banks kayak launch expenses showing significant grant funding success. The committee also discussed potential park impact fee increases and ice rink operations at Kennedy Park.",
    agenda: [
      { time:"0:05", item:"Call to order and Pledge of Allegiance" },
      { time:"0:30", item:"Roll call" },
      { time:"0:45", item:"Approval of minutes from February 23rd, 2026" },
      { time:"1:15", item:"Public comments" },
      { time:"5:45", item:"Review of parks and recreation impact fee discussion" },
      { time:"25:30", item:"Discussion on requests for proposals for Mock Mueller Park master plan" },
      { time:"32:00", item:"Review of Yellow Banks kayak launch expenses" },
      { time:"38:30", item:"Discussion on ice rink operations at Kennedy Park" },
      { time:"50:15", item:"Future meeting topics and staff remarks" },
      { time:"52:45", item:"Adjournment" },
    ],
    discussions: [
      { item:"Approval of minutes from February 23rd, 2026", body:"A motion to accept the minutes was made and seconded. The motion passed unanimously with no discussion." },
      { item:"Parks and Recreation Impact Fee Discussion", body:"Jennifer presented information on impact fees, noting the 2020 study recommended fees of $761 for single family units but only $300 was adopted in 2022. Neighboring communities charge $600-$900 for single family homes. Committee members Katrina and others expressed support for a moderate increase to be more in line with neighboring communities. The committee provided feedback that fees should keep Weston competitive while improving parks, with the item going back to Plan Commission for final decision." },
      { item:"Mock Mueller Park Master Plan RFP Selection", body:"Sean reported seven proposals were received for the park master plan, with four staff members reviewing them based on firm experience, personnel, similar projects, and cost. JSD and Rettler Corporation were the two lowest bidders with similar pricing. Roger made a motion to select Rettler Corporation, seconded by Katrina. The motion passed unanimously." },
      { item:"Yellow Banks Kayak Launch Expenses Review", body:"Jessica prepared a comprehensive breakdown of the kayak launch project expenses and grant funding. The project received grants from DNR, Marathon County Transportation, and others. Lisa Beck praised the RFC document during public comment. Katrina commended staff for the transparency and grant writing work, noting the significant reduction in out-of-pocket costs. PGA donated labor and equipment, MTS donated site planning, and Dan Higginbotham contributed significantly. No formal action was taken; the item was informational." },
      { item:"Ice Rink Operations at Kennedy Park", body:"Staff provided information on ice rink operations per committee member Katrina's request. The warming house has been unattended since 2020 due to COVID and staffing challenges. Sean noted Everest Youth Hockey has been in discussions about improvements including a covered structure, with cost estimates already provided. Katrina stated she wants to ensure hockey is not forgotten amid Kennedy Park baseball focus. The committee requested additional information including historical attendance figures from 2018-19 seasons and user feedback for a future meeting." },
    ],
    publicComment: "Jim Pinsel expressed frustration about receiving no response to his previous three-page submission of questions, raising concerns about playground equipment installation issues, Kennedy Park fundraising transparency, ice rink operational costs (estimating $20,000-$30,000 when including labor), and lack of complete financial analysis. Lisa Beck thanked Michael for snow removal work during the recent blizzard and praised Sean and Jessica for the well-written Yellow Banks RFC document. A written response to Jim Benson's previous email was also submitted for inclusion in the minutes.",
    actionItems: [
      "Rettler Corporation selected for Mock Mueller Park graphic master plan and budget estimates",
      "Jennifer to present neighboring community impact fee comparisons to Plan Commission next month",
      "Staff to compile ice rink attendance records from 2018-19 seasons for future meeting",
      "Staff to gather user feedback on ice rink operations",
      "Quarterly Kennedy Park project update scheduled for April board meeting",
      "Dan Higginbotham to return to committee regarding Great Pineries Heritage Waterway signage at kayak launches",
    ],
  },
  {
    id: "8rRo1cm2YJ0", source: "wausau",
    title: "8rRo1cm2YJ0",
    date: "April 10, 2026", shortDate: "APR 10",
    committee: "Finance", duration: "~1h",
    url: "https://www.youtube.com/watch?v=8rRo1cm2YJ0",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Finance Committee denied a tax recovery claim related to ongoing Greenwood Hills litigation, approved multiple airport ground lease transfers, and postponed decisions on participating in a national opioid settlement and funding a lead service line replacement shortfall. The committee also approved budget amendments for 2025-2026 carryover funds and reviewed favorable 2025 financial results showing a general fund surplus.",
    agenda: [
      { time:"2:01", item:"Call to order and public comment" },
      { time:"2:25", item:"Approval of March 10, 2026 minutes" },
      { time:"2:50", item:"Tax recovery claim for Green Acres at Greenwood Hills LLC" },
      { time:"3:40", item:"Transfer of buildings at 939 Woods Place" },
      { time:"4:15", item:"Terminating airport ground lease with Win O. Jones" },
      { time:"4:35", item:"Approving airport ground lease with Owen Jones" },
      { time:"5:00", item:"Approving airport ground lease with Cole Lundberg" },
      { time:"5:25", item:"National opioid settlement agreement participation" },
      { time:"12:00", item:"Budget amendment for lead service line replacement" },
      { time:"27:03", item:"Budget amendment for 2025-2026 carryover funds" },
      { time:"37:00", item:"Review of 2025 general fund financial results and debt issuance" },
    ],
    discussions: [
      { item:"Tax recovery claim for Green Acres at Greenwood Hills LLC", body:"This claim is part of ongoing litigation with Greenwood Hills. The chair explained that a 'no' vote would deny the claim. Alder Watson moved to approve, seconded by Alder Griner. The motion failed with opposition votes, effectively denying the tax recovery claim." },
      { item:"Airport ground lease transfers at 939 Woods Place", body:"Three related items were approved to transfer a hangar from Win O. Jones to Owen Jones. The committee approved consent to transfer title (Watson motion, Griner second), termination of the lease with Win O. Jones (Tierney motion, Watson second), and a new lease with Owen Jones (Watson motion, Tierney second). All passed unanimously." },
      { item:"Airport ground lease with Cole Lundberg", body:"Alder Griner moved to approve, seconded by Watson. The motion passed unanimously with no discussion." },
      { item:"National opioid settlement agreement participation", body:"The committee discussed whether to participate in a class action settlement. Alder Tierney expressed discomfort proceeding without knowing attorney fee arrangements. Alder Watson questioned how settlement funds would be divided among participants. Alder Malini asked where the request originated, with Assistant Attorney Vincent explaining it came unsolicited from law firms seeking plaintiffs. Multiple members expressed wanting more information before deciding. Alder Griner moved to postpone to the next meeting, seconded by Tierney. Motion passed unanimously." },
      { item:"Budget amendment for lead service line replacement shortfall", body:"Finance Director Marian explained that $709,672 in non-construction costs were deemed ineligible for the WDNR subsidized loan, contrary to earlier verbal agreements with DNR. The shortfall breaks down to $283,868 for homeowner-side work and $425,803 for water utility-side. Options discussed included borrowing, using general fund reserves, or using PFAS settlement funds. Alder Tierney opposed adding more debt. Alder Griner asked about PFAS settlement timing. Watson moved to postpone to the next meeting, seconded by Griner. Motion passed unanimously." },
      { item:"Budget amendment for 2025-2026 carryover funds", body:"Finance Director noted the large carryover number includes 10 transit buses funded by VW mitigation grants. Projects awaiting completion include city hall chimney liner, public safety roof, and DPW fence replacement. Alder Watson moved to approve, seconded by Griner. Passed unanimously." },
      { item:"Review of 2025 motorpool and general fund financial results", body:"Finance Director presented that motorpool fund still struggles with cash flow despite rate adjustments. The fund shows a potential $177,000 shortfall after paying for trucks on order since 2023. Solomon from Motorpool explained supply chain delays, noting they're now second or third in line for long-delayed equipment. The general fund showed a surplus of approximately $1.2 million driven by strong building permits, GMT money, and investment income. After proposed transfers to recycling, airport, and parking funds, surplus would be $540,000. Alder Tierney moved to approve the transfers, seconded by Watson. Passed unanimously." },
      { item:"2026 general obligation promissory note for capital improvements", body:"Finance Director presented borrowing schedule including street projects (10-year amortization), motorpool (5-year), and various TID projects. Alder Watson noted the city's debt utilization percentage would decrease slightly despite new borrowing. Watson moved to approve the calendar, chair seconded. Eric from Public Works confirmed most 2026 projects have already been bid and contracts signed. Passed unanimously. Phil Cawson from Ehlers will present parameters resolution at next meeting." },
      { item:"Consideration of DPW property purchases on Adolf and Myron Streets", body:"Due to time constraints with council meeting starting at 6:30 and the Maple Room being under construction, Alder Watson moved to postpone the closed session discussion to the next meeting. Eric confirmed time was not of the essence. Motion seconded by Tierney, passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Tax recovery claim for Green Acres at Greenwood Hills LLC denied",
      "Airport ground lease transfers for 939 Woods Place approved (Win O. Jones to Owen Jones)",
      "Airport ground lease with Cole Lundberg approved",
      "National opioid settlement participation postponed pending more information",
      "Lead service line replacement funding decision postponed to next meeting",
      "2025-2026 carryover funds budget amendment approved",
      "Transfers to recycling, airport, and parking funds from 2025 surplus approved",
      "2026 borrowing calendar approved; parameters resolution to come at next meeting",
      "DPW property purchase discussion postponed to next meeting",
      "Ehlers representative Phil Cawson to present at next meeting",
    ],
  },
  {
    id: "47UbKS2Jqo4", source: "marathon",
    title: "47UbKS2Jqo4",
    date: "April 10, 2026", shortDate: "APR 10",
    committee: "Executive Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=47UbKS2Jqo4",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Executive Committee met briefly before moving into closed session to discuss the performance review of the county administrator. The committee voted unanimously to enter closed session, with all members present voting in favor.",
    agenda: [
      { time:"0:00", item:"Call to order" },
      { time:"0:05", item:"Pledge of Allegiance" },
      { time:"0:30", item:"Performance review of the administrator (closed session consideration)" },
    ],
    discussions: [
      { item:"Performance review of the administrator", body:"The chair explained the committee had the option to go into closed session to discuss the final review of the county administrator, incorporating feedback received the previous Thursday. The chair noted that executive committee members had rated the administrator on various questions using three criteria: needs improvement, successful, and exceptional, scored on a scale of 0 to 5. Corporation counsel was asked to provide a summary of the appraisal. A motion was made and seconded to enter closed session, which passed unanimously with all members voting aye." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Committee entered closed session to finalize the county administrator's performance evaluation",
      "Corporation counsel to provide summary of administrator appraisal during closed session",
    ],
  },
  {
    id: "0pfKykvicdA", source: "marathon",
    title: "0pfKykvicdA",
    date: "April 10, 2026", shortDate: "APR 10",
    committee: "Marathon County Human Resources & Finance Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=0pfKykvicdA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County HR & Finance Committee approved several items including a claim disallowance related to a child's death in foster care, revised property values for public auction, carry forward funds resolution, and a capital assets threshold policy amendment. The committee also received introductions from new healthcare consultants and detailed financial updates for 2025 year-end and 2026.",
    agenda: [
      { time:"0:00", item:"Claim disallowance - Mercedes Holmes" },
      { time:"2:32", item:"Revised property values for public auction" },
      { time:"5:00", item:"Resolution to approve carry forward funds" },
      { time:"11:31", item:"Resolution to amend capital assets threshold policy" },
      { time:"12:22", item:"Introduction of healthcare consultants - National Insurance Services" },
      { time:"37:12", item:"Audited 2025 year end fiscal update" },
      { time:"55:03", item:"2026 year to date fiscal update" },
      { time:"57:08", item:"Finance Department quarterly update" },
      { time:"1:07:30", item:"County Treasurer update" },
      { time:"1:36:30", item:"Announcements and adjournment" },
    ],
    discussions: [
      { item:"Claim disallowance - Mercedes Holmes", body:"Corporation Counsel presented a claim received December 5th from Mercedes Holmes regarding the death of her 3-year-old child Zalen Bernett, who was placed in a treatment foster care home licensed through another agency in Dunn County. The death was determined to be natural causes with no wrongdoing found through law enforcement and social services investigations. Outside counsel and insurance carrier recommended disallowance. Chair Gibbs moved to disallow the claim per the insurance carrier's recommendation. Motion carried unanimously." },
      { item:"Revised property values for public auction", body:"Staff explained that two parcels listed on Wisconsin Surplus twice failed to sell when bids didn't reach appraised values. The 529 Mullen Street parcel was recommended at $9,000 and 738 South 3rd Avenue at $7,500. Chair Gibbs moved to set the revised minimum sale prices. Motion carried unanimously. Chair Robinson asked about bidders who made errors; staff confirmed they are marked as non-pay and banned from future Wisconsin Surplus auctions." },
      { item:"Resolution to approve carry forward funds", body:"Finance Director Sam presented resolution R20-2026 for program revenues and multi-year projects. Notable items included veterans relief fund replenishment (exhausted funds to be replenished for approximately three years), redacted records funds for Register of Deeds, and $142,731.39 for administration special projects including $75,000 for homelessness contract. Vice Chair Marshall asked about the redacted records fund purpose. Chair Gibbs moved to approve; Supervisor Hart seconded. Motion carried unanimously." },
      { item:"Resolution to amend capital assets threshold policy", body:"Finance Director explained the policy would increase the capitalization threshold from $5,000 to $10,000, following GFOA guidance from 2006 that recommended minimum $5,000. This change was considered in 2022 but not completed. Supervisor Hart moved to approve and move to full county board; Chair Gibbs seconded. Motion carried unanimously." },
      { item:"Introduction of healthcare consultants - National Insurance Services", body:"HR Director Candace introduced NIS representatives who won the healthcare consulting RFP. Representatives introduced themselves: a consultant with 28 years experience and Jordan Stanley with two years at NIS plus prior public sector HR experience. They discussed evaluating the near-site ATA clinic, examining fully insured vs self-insured funding models, and increasing transparency with the committee. Vice Chair Marshall asked about per-member costs compared to other employers and strategies to reduce emergency room misuse. Chair Gibbs asked about evaluation processes for self-insured vs fully insured plans and risk tolerance considerations." },
      { item:"Audited 2025 year end fiscal update", body:"Finance Director Sam provided detailed department-by-department review of 2025 year-end finances. Notable items included: TID closure check of $257,238 from City of Wausau, unclaimed property of $222,752 from state, opioid fund received $352,389 in settlement funds with total cash of $2.2 million, and parks fund ice revenue up $70,000. Various transfers and reclassifications still pending. When asked about fund balance surplus, Sam indicated she would provide that at the next meeting pending capital assets reconciliation." },
      { item:"Finance Department quarterly update", body:"Sam reported the department is fully staffed since mid-December with a new payroll financial analyst. Key accomplishments included quarterly closeout preparations, countywide training on reporting, W-2 processing including the 'big beautiful bill' no-tax-on-overtime calculations, 1099 processing, and random cash audits. Administrator Lance publicly thanked Sam and her team for substantial work on W-2s and year-end closeout. Chair Gibbs and Vice Chair Marshall also expressed appreciation for improved reporting and transparency." },
      { item:"County Treasurer update", body:"Treasurer Connie reported on tax collections, monitoring delinquent parcels, year-end procedures, and processing 1,582 delinquent tax notices (down from 1,786 last year). She discussed ongoing issues with municipal treasurer receiving errors affecting lottery credits and first installment payments. Supervisor Lemmer asked about delinquency trends and resources for struggling taxpayers. Administrator Lance clarified that payment agreements were discontinued because they often resulted in NSF checks and defaults while increasing interest and penalties that eroded homeowner equity." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Claim of Mercedes Holmes disallowed",
      "Revised minimum sale prices set for 529 Mullen Street ($9,000) and 738 South 3rd Avenue ($7,500)",
      "Resolution R20-2026 approved for carry forward funds to 2026",
      "Capital assets threshold policy amendment approved and forwarded to full county board",
      "Finance to provide fund balance surplus information at next meeting",
      "Finance to research Register of Deeds redacted records fund purpose and potential repurposing",
      "NIS consultants to provide healthcare cost update before summer budget assumptions development",
      "Consider recommendation to increase Social Services reserve account above current $400,000",
      "Next meeting scheduled for April 8th",
    ],
  },
  {
    id: "mjUlHQdonMs", source: "wausau",
    title: "Wausau Economical Development Committee Meeting",
    date: "April 6, 2026", shortDate: "APR 6",
    committee: "Economic Development Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=mjUlHQdonMs",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/1990/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Economic Development Committee met to consider survey results for 1300 Cleveland Avenue, a Habitat for Humanity property offer, and two Thomas Street residential development proposals. No vote counts or specific outcomes are reflected in the official records.",
    agenda: [
      { time:"5:45 PM", item:"Public comment on agenda items" },
      { time:"N\/A", item:"Consideration of March 3, 2026 Regular Economic Development Committee Minutes" },
      { time:"N\/A", item:"Discussion and possible action on survey results from Non-Industrial Land Use Preference Survey for 1300 Cleveland Avenue" },
      { time:"N\/A", item:"Discussion and possible action on property disposition offer to purchase from Habitat for Humanity of Wausau for 921 S. 19th Avenue" },
      { time:"N\/A", item:"Discussion and possible action on Thomas St residential infill Request for Interest (206, 212, 226, and 230 E Thomas St)" },
      { time:"N\/A", item:"Discussion and possible action on Thomas St and McCleary St vacant lots redevelopment (237, 241 and 249 E Thomas St)" },
    ],
    discussions: [
      { item:"March 3, 2026 Regular Economic Development Committee Minutes", body:"The minutes from the March 3, 2026 meeting were on the agenda for consideration. The official vote record does not include specific motion, vote count, or outcome details." },
      { item:"Non-Industrial Land Use Preference Survey for 1300 Cleveland Avenue", body:"The committee discussed survey results regarding preferred non-industrial uses for the 1300 Cleveland Avenue property. The official vote record does not include specific motion, vote count, or outcome details." },
      { item:"Habitat for Humanity property offer for 921 S. 19th Avenue", body:"The committee considered a property disposition offer to purchase from Habitat for Humanity of Wausau for the property at 921 S. 19th Avenue. The official vote record does not include specific motion, vote count, or outcome details." },
      { item:"Thomas St residential infill Request for Interest (206, 212, 226, and 230 E Thomas St)", body:"The committee discussed a Request for Interest for residential infill development on four East Thomas Street parcels. The official vote record does not include specific motion, vote count, or outcome details." },
      { item:"Thomas St and McCleary St vacant lots redevelopment (237, 241 and 249 E Thomas St)", body:"The committee considered redevelopment proposals for vacant lots at 237, 241, and 249 E Thomas Street near McCleary Street. The official vote record does not include specific motion, vote count, or outcome details." },
    ],
    publicComment: "Public comment was on the agenda as the first item, with reading of the City of Wausau Public Comment Statement.",
    actionItems: [
      "Review video recording or meeting minutes when available for specific vote outcomes on all action items",
      "Follow up on disposition of 921 S. 19th Avenue to Habitat for Humanity",
      "Monitor progress on Thomas Street residential infill and redevelopment proposals",
      "Track next steps for 1300 Cleveland Avenue based on survey results",
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
    overview: "The Wausau Board of Public Works approved most items on the agenda, including pay estimates totaling over $167,000 for wastewater facility improvements and water treatment plant demolition. However, the board rejected pay estimates for lead service line replacement with Community Infrastructure Partners. Contractor licenses for concrete and paving work were approved.",
    agenda: [
      { time:"N\/A", item:"March 17, 2026 and March 19, 2026 Regular Board of Public Works Minutes" },
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
      { item:"March 17, 2026 and March 19, 2026 Regular Board of Public Works Minutes", body:"The board approved the minutes from the March 17 and March 19, 2026 meetings. The motion passed." },
      { item:"Open Quotations for Storm Sewer Materials", body:"Quotations for storm sewer materials were opened. No vote was recorded for this item as it was an opening of quotations." },
      { item:"Wausau Wastewater Treatment Facility Screening Improvements: J.F. Ahern Co., Pay Estimate #12", body:"The board approved Pay Estimate #12 for J.F. Ahern Co. in the amount of $104,405.00 for wastewater treatment facility screening improvements. The motion passed." },
      { item:"Pay Estimate #24 and Pay Estimate #25 with Community Infrastructure Partners for replacement of lead service lines", body:"The board rejected Pay Estimate #24 and Pay Estimate #25 for Community Infrastructure Partners related to lead service line replacement. The motion to approve failed." },
      { item:"2025 Wausau Water Works Asbestos Abatement: Robinson Brothers Environmental, Inc., Final Payment", body:"The board approved the final payment to Robinson Brothers Environmental, Inc. in the amount of $1,000 for asbestos abatement work. The motion passed." },
      { item:"2025 Water Treatment Plant Demo: The MRD Group, Inc., Pay Estimate #2", body:"The board approved Pay Estimate #2 for The MRD Group, Inc. in the amount of $62,272.50 for water treatment plant demolition work. The motion passed." },
      { item:"2025 Street Construction Project A - Randolph Street\/Cherry Street: Haas Sons, Inc., Change Order #2", body:"The board approved contract extensions as outlined in Change Order #2 for Haas Sons, Inc. related to the Randolph Street\/Cherry Street construction project. The motion passed." },
      { item:"Portland Cement Concrete Licenses: SD Ellenbecker, Inc., and Lewis Construction, Inc.", body:"The board approved Portland cement concrete licenses for SD Ellenbecker, Inc. and Lewis Construction, Inc. The motion passed." },
      { item:"Bituminous Concrete Paving License: Kell Contracting", body:"The board approved the bituminous concrete paving license for Kell Contracting. The motion passed." },
      { item:"Closed Session for deliberating on claims", body:"The board approved convening in closed session pursuant to Wisconsin State Statute §19.85(1)(g) for the purpose of deliberating on claims. The motion passed." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Pay Estimate #12 of $104,405.00 to J.F. Ahern Co. for wastewater facility screening improvements approved for payment",
      "Lead service line replacement pay estimates with Community Infrastructure Partners denied - further review or renegotiation may be required",
      "Final payment of $1,000 to Robinson Brothers Environmental for asbestos abatement approved",
      "Pay Estimate #2 of $62,272.50 to The MRD Group for water treatment plant demolition approved",
      "Contract extensions for Haas Sons, Inc. on Randolph Street\/Cherry Street project approved",
      "Portland cement concrete licenses issued to SD Ellenbecker, Inc. and Lewis Construction, Inc.",
      "Bituminous concrete paving license issued to Kell Contracting",
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
    overview: "The Wausau Water Works Commission approved meeting minutes and received updates on multiple water infrastructure projects including lead service line replacement, wastewater facility improvements, and PFAS testing. The meeting adjourned with a unanimous 5-0 vote.",
    agenda: [
      { time:"N\/A", item:"Consideration of the minutes of the preceding meeting(s) - March 3, 2026 Regular Meeting" },
      { time:"N\/A", item:"Director's Reports - Capital Projects Planning and Initial Discussion" },
      { time:"N\/A", item:"Director's Reports - Wastewater Update on Headworks Screening Project, Cherry Street Lift Station Project, and Status of Class A Biosolids from WDNR" },
      { time:"N\/A", item:"Discussion and Update on LSL Replacement Project for 2026 and related news on nationwide cost of new regulations" },
      { time:"N\/A", item:"Report for the Corrosion Control Treatment Optimization Study submitted to the WDNR" },
      { time:"N\/A", item:"Discussion and Update on Influent, Effluent and Biosolids PFAS Testing" },
    ],
    discussions: [
      { item:"Consideration of March 3, 2026 Meeting Minutes", body:"The commission approved the minutes from the March 3, 2026 regular meeting. The motion passed, though specific vote count and mover\/seconder were not recorded." },
      { item:"Capital Projects Planning and Initial Discussion", body:"The director provided a report on capital projects planning. This was an informational item with no vote required." },
      { item:"Wastewater Update on Headworks Screening Project, Cherry Street Lift Station Project, and Class A Biosolids Status", body:"The commission received updates on the Headworks Screening Project, Cherry Street Lift Station Project, and the status of Class A Biosolids from WDNR. This was an informational report with no action taken." },
      { item:"LSL Replacement Project for 2026", body:"The commission discussed the lead service line replacement project for 2026 and received information on the nationwide cost implications of new regulations. This was a discussion item with no vote taken." },
      { item:"Corrosion Control Treatment Optimization Study", body:"The commission received the report for the Corrosion Control Treatment Optimization Study that was submitted to the Wisconsin DNR. This was an informational item with no action required." },
      { item:"PFAS Testing Update", body:"The commission discussed updates on influent, effluent and biosolids PFAS testing. This was an informational discussion item with no vote taken." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "March 3, 2026 meeting minutes approved",
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
    overview: "The Infrastructure & Facilities Committee rejected most action items on the agenda, with parking restrictions on S. 9th Ave\/S. 10th Ave\/Bopf Street, increased parking signage, snow plowing policy changes, special assessments for 2025 street projects, and the bike rack request form all failing. Only parking restrictions on N 2nd St (400-600 blocks) and the March 12 meeting minutes were approved.",
    agenda: [
      { time:"N\/A", item:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement" },
      { time:"N\/A", item:"Consideration of the minutes of the preceding meeting(s) - March 12, 2026" },
      { time:"N\/A", item:"Parking restrictions on S. 9th Ave between Thomas Street and Chellis Street, S. 10th Ave between Thomas Street and Chellis Street, and Bopf Street between S. 9th Ave and S. 10th Ave" },
      { time:"N\/A", item:"Increased parking restriction signs on S 9th Ave and\/or S 10th Ave" },
      { time:"N\/A", item:"Snow plowing policy" },
      { time:"N\/A", item:"Final Resolution to levy special assessments for the 2025 Street Construction Projects" },
      { time:"N\/A", item:"Discussion and possible action approving City bike rack request form" },
      { time:"N\/A", item:"Parking Restrictions on N 2nd St: the 400, 500, and 600 blocks" },
      { time:"N\/A", item:"Sherman Street Overlay from 3rd Ave to 8th Ave (discussion only)" },
    ],
    discussions: [
      { item:"March 12, 2026 Regular Infrastructure and Facilities Minutes", body:"The committee approved the minutes from the March 12, 2026 meeting. The motion passed." },
      { item:"Parking restrictions on S. 9th Ave, S. 10th Ave, and Bopf Street", body:"The committee considered parking restrictions in the Thomas Street to Chellis Street corridor. Two separate motions were made, but both failed." },
      { item:"Increased parking restriction signs on S 9th Ave and\/or S 10th Ave", body:"A motion to approve increased parking restriction signage on S 9th Ave and\/or S 10th Ave failed." },
      { item:"Snow plowing policy", body:"The committee engaged in extensive discussion on snow plowing policy with three separate motions made. All three motions failed, leaving current policy unchanged." },
      { item:"Final Resolution to levy special assessments for the 2025 Street Construction Projects", body:"The motion to approve the final resolution for special assessments related to 2025 street construction projects failed." },
      { item:"City bike rack request form", body:"The motion to approve the City bike rack request form failed." },
      { item:"Parking Restrictions on N 2nd St: the 400, 500, and 600 blocks", body:"The committee approved parking restrictions on N 2nd St covering the 400, 500, and 600 blocks. The motion passed." },
      { item:"Sherman Street Overlay from 3rd Ave to 8th Ave", body:"This item was listed for discussion only with no action taken. No vote was recorded." },
    ],
    publicComment: "Public comment was on the agenda as the first item, with reading of the City of Wausau Public Comment Statement.",
    actionItems: [
      "Parking restrictions on N 2nd St (400-600 blocks) approved and will move forward for implementation",
      "March 12, 2026 meeting minutes approved",
      "Snow plowing policy remains unchanged after three failed motions",
      "Parking restrictions in S. 9th Ave\/S. 10th Ave\/Bopf Street area not approved",
      "Special assessments for 2025 Street Construction Projects not approved - may require further action",
      "Bike rack request form not approved - may return for future consideration",
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
    id: "AoUiBt_A4Hc", source: "marathon",
    title: "Marathon County Environmental Resources Committee Meeting",
    date: "March 31, 2026", shortDate: "MAR 31",
    committee: "Environmental Resources", duration: "~1h",
    url: "https://www.youtube.com/watch?v=AoUiBt_A4Hc",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18132/639100479088130000",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, the Marathon County Environmental Resources Committee meeting on March 31, 2026 was scheduled to address environmental resource matters for Marathon County. The specific agenda items are not available in the provided document, as only a link to the full agenda packet was included.",
    agenda: [
      { time:"N\/A", item:"Agenda items not specified in provided document - full agenda available via linked packet" },
    ],
    discussions: [
      { item:"Agenda Details Unavailable", body:"The specific discussion items were not included in the provided agenda text. The full agenda packet was scheduled to be available through the Marathon County website link provided." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Specific action items not available - agenda packet link provided but content not included in source document",
    ],
  },
  {
    id: "5-FN0TmHLZU", source: "marathon",
    title: "Marathon County Extension, Education, and Economic Development Committee Meeting",
    date: "April 2, 2026", shortDate: "APR 2",
    committee: "Marathon County Extension, Education, and Economic Development Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=5-FN0TmHLZU",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18140/639101128463600000",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, the Marathon County Extension, Education, and Economic Development Committee was scheduled to meet on April 2, 2026. Without access to the detailed agenda document, specific items planned for discussion cannot be confirmed, but this committee typically addresses matters related to UW-Extension programs, educational initiatives, and economic development efforts in Marathon County.",
    agenda: [
      { time:"N\/A", item:"Meeting agenda items not available - agenda document link provided but content not accessible" },
    ],
    discussions: [
      { item:"Committee Business", body:"The committee was scheduled to address matters related to extension services, education, and economic development in Marathon County. Specific discussion items were not available from the provided information." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Specific action items could not be determined from the available agenda information",
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
    overview: "Based on the published agenda, the Marathon County Human Resources, Finance, and Property Committee was scheduled to meet on April 8, 2026. The specific agenda items were not provided in the available document, limiting details about what matters were set to come before the committee.",
    agenda: [
      { time:"N\/A", item:"Agenda details not available - only meeting packet link provided" },
    ],
    discussions: [
      { item:"Agenda Not Available", body:"The full agenda document was not provided for review. Only a link to the meeting packet on the Marathon County website was included in the source material." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Unable to determine expected action items - full agenda not provided",
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
    overview: "Based on the published agenda, the Marathon County Executive Committee was scheduled to meet on 4\/9\/26. The specific agenda items were not provided in the source material, limiting detailed analysis of the meeting's planned content.",
    agenda: [
      { time:"N\/A", item:"Agenda details not available - only meeting packet link provided" },
    ],
    discussions: [
      { item:"Meeting Agenda", body:"The specific agenda items for this Executive Committee meeting were not included in the provided source material. The full agenda packet was scheduled to be available via the Marathon County website link." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Unable to determine scheduled action items - full agenda document not provided in source material",
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
    overview: "Based on the published agenda, the Wausau School District Board of Education Committee of the Whole was scheduled to address several action items including facility fee amendments for artificial fields, a nutrition purchasing cooperative agreement, and an extensive policy update covering over 60 district policies. The meeting was also expected to feature an update on the referendum budget status and recognition of Stettin Elementary through the Excellence in Action program.",
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
      { item:"Excellence in Action: Stettin Elementary", body:"The agenda indicated that Stettin Elementary was scheduled to be recognized through the district's Excellence in Action program. No additional details about the specific recognition or presentation were provided in the agenda materials." },
      { item:"Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP)", body:"With an estimated 5 minutes for presentation, the district's Nutrition Service Department was expected to request approval for continued membership in the Wisconsin School Nutrition Purchasing Cooperative for the 2026-2027 school year. The WiSNP Co-op was requesting member districts to present the resolution to their respective boards for approval." },
      { item:"Facility Fees", body:"Ryan Urmanski, Director of Buildings and Grounds, was scheduled to present for approximately 10 minutes on proposed amendments to the Wausau School District Facility Use Fee Schedule. The changes were expected to reflect costs for use of artificial fields and field lighting for requested events, with immediate implementation requested upon board agreement." },
      { item:"Referendum Budget Update", body:"Elizabeth Channel, Interim Assistant Superintendent of Operations, was scheduled to provide a 10-minute update on the status of the Referendum Budget. A memo summarizing the referendum budget was included in the agenda packet materials." },
      { item:"NEOLA UPDATE", body:"With an estimated 20 minutes for presentation, the Committee was scheduled to review proposed changes to a substantial number of district policies. The agenda noted that some suggestions involved only technical corrections while others were more lengthy, covering topics including board member conduct, student cell phone policies, artificial intelligence guidelines, academic honesty, fund-raising regulations, and child abuse reporting requirements under Act 57." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Action was requested for approval of continued membership in the Wisconsin School Nutrition Purchasing Cooperative (WiSNP) for the 2026-2027 school year",
      "Action was requested for approval to amend the Facility Use Fee Schedule for artificial fields and field lighting with immediate implementation",
      "Action was requested for approval of NEOLA policy updates covering over 60 policies including general policies, school support organization policies, technical corrections, and Act 57 related policies",
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
];

const SCHOOL_BOARD_UPCOMING = [
  { date:"2026-04-13", time:"10:00 AM", name:"Public Meeting", url:"https://meetings.boardbook.org/Public/Agenda/1360?meeting=739874", source:"school_board" },
  { date:"2026-04-13", time:"3:00 PM", name:"Special Meeting", url:"https://meetings.boardbook.org/Public/Agenda/1360?meeting=738313", source:"school_board" },
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
  { date:"2026-04-16", time:"4:45 PM", name:"Transit Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2178/overview", source:"wausau" },
  { date:"2026-04-20", time:"5:15 PM", name:"Public Health & Safety Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2068/overview", source:"wausau" },
  { date:"2026-04-21", time:"10:30 AM", name:"Board of Public Works Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2298/overview", source:"wausau" },
  { date:"2026-04-21", time:"5:00 PM", name:"Plan Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2106/overview", source:"wausau" },
  { date:"2026-04-21", time:"6:30 PM", name:"Common Council Organizational Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2314/overview", source:"wausau" },
  { date:"2026-04-27", time:"7:30 AM", name:"Police & Fire Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2146/overview", source:"wausau" },
  { date:"2026-04-27", time:"5:00 PM", name:"Bicycle & Pedestrian Advisory Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2121/overview", source:"wausau" },
  { date:"2026-04-28", time:"8:00 AM", name:"Community Development Authority Finance Board Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2279/overview", source:"wausau" },
  { date:"2026-04-28", time:"12:00 PM", name:"Community Development Authority Board Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2263/overview", source:"wausau" },
  { date:"2026-04-28", time:"5:30 PM", name:"Finance Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2017/overview", source:"wausau" },
  { date:"2026-04-28", time:"6:30 PM", name:"Common Council Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1977/overview", source:"wausau" },
];

const WESTON_UPCOMING = [
  { date:"2026-04-13", time:"", name:"Village Board of Trustees", url:"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04132026-1901", source:"weston" },
  { date:"2026-04-13", time:"", name:"Plan Commission", url:"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04132026-1900", source:"weston" },
  { date:"2026-04-13", time:"", name:"Public Works Committee", url:"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_04132026-1902", source:"weston" },
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
