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
    avatar:   "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABQAFADASIAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAABAYABQIDBwj/xAA8EAABAwMDAAUICAUFAAAAAAABAgMEAAURBhIhBxMxQXEUIjJRYXSBkSM1NjehsbLBFXPC4fAWM0NS8f/EABoBAAIDAQEAAAAAAAAAAAAAAAAEAQIDBQb/xAAwEQACAQIDBAcJAQAAAAAAAAABAgADEQQSIRMxQaFRYXGBsbLBBTJCUnKCkaLR8f/aAAwDAQACEQMRAD8A9U0HdZnkcUqb2KfUQlptR9NR7uOa23B1TECS83je20pac9mQCaS4l2DE4ISiU/IACFSHNqs8ZOCScDPcBWNWqE06YRwtcwTYaHDtDo811APoL70nPIouqe529S0SZaJC2pAbJQ42NpGOQFYPnD2GrKE6XobDq8BS0JUcesjNXUncYTdUoeROiRl7JEphpeM7VuBJx4GsY9xhyXOrjymHF4ztQsE1bML2vCFVKGk3CHGKhIlMNKSNxC3ACB4Vpg3WNMKkje0sAK2PDaopPoqA9R/9xUZlva8IfUqVKtCVd08skqkQorbIbWxguOlXarcMDA7sZ+NEx7fGZwQ0kq7yRS/c50pvpCtMNt9xMV2OtS2gfNURu5PyFD2W4zHrzqxp2S4tuMfoUk8N8K7PkKW2i5tRxtyvJji62l1pbas7VApOPUarm7SUIQj+ITihCQlI6xKcAeCRS7pq+SUaGZmynVyJbi1NoUs5JVuOM+FWlpkTIVzFvuTxfU8gONueo96fwNYtjaRdUIOtteAvuB7ZsuHZkLj/AG2/8S2hQGopdUlS3FuK3KW6rco8AdvgKymQmZfVF3elTZKkKbWUEEjB5HsNcp0zf7tI030ivv3CQ49BffTFWpXLICVYCfDAqvuWpr4ro/0Ghm6yGZV4lBiTMTgulO4jgkY7x8qdqAU0JI0lMNTOJqCmul/Sdki26NHLhSkrW4dylOqK1HjHafYKzlQossESY7TmRtypAJArmWmJd4s3Sy7pqXe5l1grt/lO6YElSV57ikCmR+6XB9Ui7RXMQIrgb6g/8iR6RPt5H+CsRVW26a1sMaTAXuCAQe2XiLfNjNluLcVdWn/bS82F447CeCR+Nbor83ywMy2mQhTZWFtFRAIIGDke38KX79dH/wDUOmBDkOIjS1KK0DgLHGM/OttrnSnOkC7w3H3FRWo6FIaJ81JO3JHzNRtFDWHTbleLwa7/AHn2T3Vf9dC2D6+1r4/sqirv959k91X/AF0JYPr7Wvj+yqw+P7j5YQGx/d5bvez+pVNc/wC2Nt/kq/qpTsuT0d2/BwfKjz8VUx9Q+xq23pkylSVFtRCigJwMHjiuSzEVQLcaWvfOpRA2IN+D+E5vpL7KdKfvEn9Kqqbi4hrQnRU46tKG0TwpS1HASAvJJPdVtpL7KdKfvEn9KqadBWyzXjoo07C1AxFkMLbyhuQQMr3qxt5znnu9demxC50Kic72fWFGursLgA/yN1vGnrleHLpbl22XckN9UuQwtDjiUf8AUkHgVQwPsRdP5qvzTSnYLNb9P9PaoNmiohxDaSstNk4JJGScn2CmGJHkK0tcHkS1IjpcUFMbAQrkc57R/akmcnhrrHMRSFNlysSCARfwmdz+uNEeH7Jo6z/ebfPdm/yTQFz+uNEeH7Jo+z/ebfPdm/yTWY98fUPLETvmOtkSbdfrTfY0dyUGQphxpCSTgg4PHifwqlVHvVgYdujrK5Tl1aWJTKEEllw5KDgdwBwfl6q6Dco7kpxpoLUhvkqKTih3YsmS0hl1xSQ0k5Uk8rPdWr0LsSCertkRbbtT1u0Ra4qkLU8HUuLSEklJVkkfDOKvJzazq63rCFFAaUCoA4Hb30a/vRbEKeKgWhlZHbgd9DKu0VbwkNrcW2gEYSntOQPzUKWfCLnvf5P1MaSvlQL1NznHYsp7T0LX1ouFrupl3OQ+YxZhrcQoKCgk7gMYORW2/WW5wNAdHbz9tlrNrlofltNMlxxpJVu5SOf710ZTTb5nOSVTlPLO5ogqSATt2pxnt85PFZSpCX7XBYclP5aAcfAJClIwo8/BKviK6WIdXQreY4F9hWWoeF+cUdMvvai6Z3r9Dt9wZtjds6hTsuMpnz89g3dtNEFh0aLubZacDinVYSUHJ5T3UXEcj225dcl2Q3FW1gtOlSjuwpXee3CFf4avG2FiC6jcrco5Bzz3UuiXB6decYxNcVGGXcAAO6Jt+afjO6TnmNIcYij6bqmytSeB2gc91F6WLk7Wt3ujcaS1DdYQhKn2i2SobeMHwNMkmKt7yRsqX1afTAURmsoUVUea9tUvqSkYClE8/GgUTnvwv6WiZMPqVKlNyJrktB+O60TgLSU58RiqOJp8w4RYZeQrIWPpE5B3bMg+zzT86YKlUZFY3MJSptkxKCkSW1DDajuSSVLTs5Jz2eYfbzWsWFYcbeD6A+hot52ZScpUOQe0ZOfn66vqlRslhF+Rp8yYIYdfAO1ICkg+aQlYGMnu3D4CmAdlSpVlQLuhJUqVKtCf/9k=",
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
    date: "April 29, 2026", shortDate: "APR 29",
    committee: "City Council", duration: "~1h",
    url: "https://www.youtube.com/watch?v=rQcjCEY36e4",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau City Council approved several key items including a development agreement for 11 Scott Street (6-3 vote), a 7-year solid waste agreement with Harter's Fox Valley Disposal, and recognized city employees for their response to a record 30.9-inch snowfall. The council also presented a sustainability award to Kolbe and Kolbe Millwork and acknowledged departing City Clerk Caitlyn.",
    agenda: [
      { time:"2:49", item:"Call to order and Pledge of Allegiance" },
      { time:"3:30", item:"Roll call" },
      { time:"4:00", item:"Proclamation - Sarah Rafi Day" },
      { time:"7:00", item:"Mayoral citation for Public Works storm response" },
      { time:"15:00", item:"Sustainability Award presentation to Kolbe and Kolbe" },
      { time:"20:00", item:"Approval of March 10, 2026 meeting minutes" },
      { time:"21:00", item:"Public comment period" },
      { time:"23:30", item:"Consent agenda" },
      { time:"24:00", item:"11 Scott Street development agreement" },
      { time:"36:00", item:"Mayoral appointments to Plan Commission and other boards" },
      { time:"37:00", item:"Solid waste and recycling service agreement" },
      { time:"45:00", item:"Announcements and adjournment" },
    ],
    discussions: [
      { item:"11 Scott Street Development Agreement", body:"The council considered a joint resolution approving a development agreement and amended parking agreement with 11 Scott Street LLC for Waterside Place. Developer representatives Raleigh Lray and Mark Craig spoke during public comment, noting the $10+ million project would create 52 mid-priced residential units. Alder Rasmusson supported the project, citing the need to replace downtown workers with residents and return parking spaces to public use. Alder Neil outlined benefits including $55,000 annual parking revenue and TID 8 valuation goals. Alder Larson dissented, expressing concerns about discounting city assets. Alder Tyranny questioned provisions requiring the city to provide alternative parking within 300 yards if the ramp closes. Economic Development Director Randy Feifer explained the agreement reduces obligated parking from 480 to 150 spaces from an existing 2062 agreement. Motion passed 6-3." },
      { item:"Mayoral Citation for Public Works Storm Response", body:"Mayor Denny presented a citation recognizing the Department of Public Works plow crews and municipal fleet staff for their response to a historic 30.9-inch snowfall from March 14-16, 2026, which set a new single-storm record. Kevin Kester, Dustin, Josh, and Mitch Harris were among those recognized. Kester addressed the council, praising the plow operators and mechanics, stating 'you kicked its ass' and noting the mechanics worked 12 straight days without a day off." },
      { item:"Sustainability Award to Kolbe and Kolbe", body:"Sustainability committee member Christine Daniels presented the 2026 City of Wausau Sustainability Award to Kolbe and Kolbe Millwork. Representatives Mike Thompson and Keith Kaning accepted, describing their 2,000+ solar panel installation that became operational in July 2025, generating enough power for approximately 120 homes. They also highlighted LED lighting upgrades, high-energy air compressors, and comprehensive recycling programs for wood, aluminum, glass, and vinyl manufacturing materials." },
      { item:"Solid Waste and Recycling Service Agreement", body:"The council approved a resolution from finance committee for a residential solid waste and recycling service agreement with Harter's Fox Valley Disposal. The Mayor noted the term was corrected to 7 years as originally approved by public health and safety committee. Motion passed 9-0." },
      { item:"Settlement of Claims - David Holes vs City of Wausau", body:"Assistant City Attorney Vincent Bonito explained a 2022 bus accident case where Transit Mutual insurance paid the initial claim, then the individual who crashed into the bus filed a personal injury claim. The city filed a counter claim and the insurer agreed to pay damages for the bus. The resolution releases the city's counter claim and third-party complaint. Alder Neil clarified this does not affect the individual's separate injury claim. Motion passed 8-1 without need for closed session." },
    ],
    publicComment: "Two speakers addressed the council during public comment. Raleigh Lray spoke in support of the 11 Scott Street project, describing it as a green sustainable project repurposing a vacant building to add mid-priced apartments downtown. Mark Craig of 3246 North 8th Street also spoke in support, noting the $10+ million project to create 52 residential units would not happen without council support, and referenced the previous 7-4 term sheet vote.",
    actionItems: [
      "Development agreement and amended parking agreement approved for 11 Scott Street LLC (6-3 vote)",
      "7-year solid waste and recycling agreement with Harter's Fox Valley Disposal approved (9-0)",
      "Mayoral appointments to Plan Commission, Affordable Housing Task Force, and BID Board confirmed (9-0)",
      "Airspace obstruction removal agreements approved for 724\/732 Ridgeland Avenue and 11 Ridgeland Avenue in Schofield (9-0)",
      "2026 budget modification approved for Police Department to purchase Red Dot Optics using Thompson submachine gun sale proceeds (9-0)",
      "Municipal Code Chapter 6.44 on solid waste disposal repealed and recreated to align with state code (9-0)",
      "Paid duty time approved for out-of-country training for Police Department officers (9-0)",
      "Community outreach professional shelter operations duty premium differential approved (9-0)",
      "Settlement release approved for David Holes vs City of Wausau case (8-1)",
      "March 31st proclaimed as Sarah Rafi Day in Wausau",
    ],
  },
  {
    id: "knWZO4dON-8", source: "wausau",
    title: "Wausau Plan Commission Meeting",
    date: "April 29, 2026", shortDate: "APR 29",
    committee: "Plan Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=knWZO4dON-8",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Plan Commission approved two significant development items: a conditional use permit for a 70-unit, 7-story apartment building at 731 North First Street, and a transportation project plat for signal replacements on Grand Avenue. Both items passed unanimously with minimal discussion.",
    agenda: [
      { time:"0:00", item:"Call to order and election of vice chair (skipped until April)" },
      { time:"0:18", item:"Public comment on agenda items" },
      { time:"0:56", item:"Consideration of minutes from February 18th" },
      { time:"1:10", item:"Public hearing on conditional use permit for 218 South Fourth Street (personal storage facility)" },
      { time:"3:04", item:"Discussion and possible action on conditional use permit for 731 North First Street (70-unit apartment building)" },
      { time:"3:45", item:"Discussion and possible action on transportation project plat for Grand Avenue signal replacements" },
      { time:"5:00", item:"Discussion of next meeting date and adjournment" },
    ],
    discussions: [
      { item:"Minutes from February 18th", body:"Motion to approve made by Bugamman, seconded by Balkan. Passed unanimously with no discussion." },
      { item:"Public hearing on conditional use permit for 218 South Fourth Street (personal storage facility)", body:"Jason Dunwy and Melinda Dunwy spoke in support of the storage facility proposal. They noted that downtown Wausau has approved over 400 new apartment units including 153 units at Foundry on Third and 102 units at Evergreen Landing, and that apartment residents have limited storage options locally. They argued the storage facility would keep resident spending in Wausau rather than surrounding areas like Kronenwetter. The public hearing was closed but no vote was taken on this item during this meeting." },
      { item:"Conditional use permit for 731 North First Street (70-unit, 7-story apartment building)", body:"Motion to approve made by Bornman, seconded by Bugamin. No questions or discussion from commissioners despite developers being present to answer questions. Passed unanimously." },
      { item:"Transportation project plat for Grand Avenue signal replacements at Sturgeon and Townline Road", body:"Motion to approve made by Bugamin, seconded by Balkon. No discussion. Passed unanimously." },
      { item:"Next meeting date", body:"Staff indicated the next meeting would normally be April 21st (third Tuesday), but may need to be moved due to election and council meeting conflicts. Staff will notify commissioners if the date changes." },
    ],
    publicComment: "One email comment was submitted by Linda Lawrence on March 12th supporting the Beacon Resources apartment development, stating housing of this capacity would be good for downtown small businesses and expressing confidence in the developer's track record. Jason Dunwy and Melinda Dunwy spoke in person during the public hearing for the storage facility item, advocating for the need for downtown storage options to serve new apartment residents.",
    actionItems: [
      "Conditional use permit approved for 731 North First Street for 70-unit, 7-story apartment building (Beacon Resources LLC)",
      "Transportation project plat approved for Grand Avenue signal replacements at Sturgeon and Townline Road",
      "Vice chair election postponed until April session",
      "Staff to confirm April meeting date (tentatively April 21st, may change due to election\/council scheduling)",
    ],
  },
  {
    id: "hNOP07iJjNY", source: "marathon",
    title: "Marathon County Board Education Meeting",
    date: "April 29, 2026", shortDate: "APR 29",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=hNOP07iJjNY",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board held an educational meeting featuring presentations on PFAS contamination litigation opportunities and county regulatory authority over renewable energy projects. No formal votes were taken as this was an informational session, but the board received detailed briefings on joining multi-district litigation against PFAS chemical manufacturers and options for responding to proposed wind energy projects in the county.",
    agenda: [
      { time:"0:00", item:"Call to order and Pledge of Allegiance" },
      { time:"1:08", item:"Reading of the notice" },
      { time:"1:45", item:"Roll call and sign-in" },
      { time:"2:15", item:"Public comment period (15 minutes, 5 speakers)" },
      { time:"15:01", item:"Presentation on PFAS multi-district litigation opportunity" },
      { time:"50:02", item:"Discussion of PFAS litigation legal services agreement" },
      { time:"1:01:00", item:"Presentation on renewable energy regulatory authority" },
      { time:"1:10:01", item:"Discussion of PSC process for wind\/solar projects" },
      { time:"1:25:03", item:"County options for responding to renewable energy projects" },
      { time:"1:40:00", item:"Joint development agreement considerations" },
    ],
    discussions: [
      { item:"Public Comment", body:"Five residents spoke during public comment. Cindy Nelson from Stratford reported visiting 200 houses and finding no support for wind turbines, stating residents don't want the county board making decisions without providing information. Wendy Rowski from Green Valley urged the board to vote no on the comprehensive plan next week, requesting that 'wind farm' terminology be replaced with 'industrial wind energy development.' Barb Newton and Sydney Hogan from Rib Mountain spoke in support of reducing speed limits on Double N road, noting 75 residents signed a petition. Heidi Pesky from Town of McMillan argued against joint development agreements, citing concerns about county liability and restrictions on future policy updates." },
      { item:"PFAS Multi-District Litigation Presentation", body:"Attorney Carrie McDougall from Baron and Bud Law Firm presented via WebEx on the opportunity for Marathon County to join nationwide litigation against PFAS chemical manufacturers including 3M and DuPont. He explained the water provider cases resulted in a settlement of approximately $12-13 billion from 3M and $3-5 billion from DuPont. The litigation operates on a 25% contingency fee basis with no upfront costs to the county. Supervisor Robinson asked about claim scope, and McDougall confirmed claims could include airport, wastewater, and landfill contamination. Vice Chair Dickinson noted the airport currently has no known PFAS contamination. Attorney Andy Phillips emphasized this is about recovering costs from manufacturers, not local entities who may have spread contaminated materials." },
      { item:"Renewable Energy Regulatory Authority Presentation", body:"Attorney Rebecca Roker from Atollis Law presented on county authority regarding wind and solar projects, explaining that projects over 100 megawatts fall under Public Service Commission jurisdiction, limiting local control. She noted the PSC has approved 33 solar projects with zero denials. Roker outlined four options for the county: do nothing, negotiate a joint development agreement, intervene in PSC proceedings, or litigate. She strongly recommended joint development agreements as the most effective tool to protect county interests, addressing liability, road damage, decommissioning, and emergency response training. She noted the Hub City Wind project from Alliant Energy has no PSC filing yet, giving the county time to prepare." },
    ],
    publicComment: "Five speakers addressed the board. Cindy Nelson (Stratford\/Oplane Township) reported speaking with 200 residents who unanimously oppose wind turbines. Wendy Rowski (Green Valley) requested the board reject the comprehensive plan and change terminology from 'wind farm' to 'industrial wind energy development.' Barb Newton and Sydney Hogan (Rib Mountain) advocated for speed reduction and no-passing zone on Double N road, referencing 75 petition signatures. Heidi Pesky (Town of McMillan) presented 12 concerns about joint development agreements, arguing counties don't need JDAs to regulate wind projects.",
    actionItems: [
      "Board to consider resolution on PFAS litigation engagement at next week's meeting",
      "Board to vote on comprehensive plan advancement next week",
      "County to conduct PFAS testing at airport and other potential contamination sites before filing any claims",
      "County to identify potential PFAS exposure sources including airport, landfill, and wastewater facilities",
      "County to consider options for engaging with proposed wind energy projects before PSC applications are filed",
    ],
  },
  {
    id: "gugcMAm6DFA", source: "wausau",
    title: "Wausau Board of Public Works Meeting",
    date: "April 29, 2026", shortDate: "APR 29",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=gugcMAm6DFA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Board of Public Works held a brief meeting to open bids and award the 2026 asphalt paving project. RC Pavers was selected as the winning bidder at $824,146.34, beating out American's higher bid.",
    agenda: [
      { time:"0:00", item:"Call to order" },
      { time:"0:08", item:"Open bids and make recommendation for 2026 asphalt paving project" },
      { time:"0:42", item:"Motion to adjourn" },
    ],
    discussions: [
      { item:"2026 Asphalt Paving Project Bid Award", body:"Two bids were opened for the 2026 asphalt paving project. RC Pavers submitted the low bid at $824,146.34, while American submitted a bid of $849,872.10. A motion was made to approve RC Pavers as the winning bidder, which was seconded. The motion passed unanimously with all members voting 'aye.'" },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "RC Pavers awarded the 2026 asphalt paving project contract at $824,146.34",
    ],
  },
  {
    id: "f1fZvkxedNY", source: "wausau",
    title: "Wausau Board of Public Works Meeting",
    date: "April 29, 2026", shortDate: "APR 29",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=f1fZvkxedNY",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Board of Public Works held a brief meeting to open bids and award the 2026 asphalt paving project. RC Pavers was selected as the winning bidder at $824,146.34, beating out American's higher bid.",
    agenda: [
      { time:"0:00", item:"Call to order" },
      { time:"0:08", item:"Open bids and make recommendation for 2026 asphalt paving project" },
      { time:"0:42", item:"Motion to adjourn" },
    ],
    discussions: [
      { item:"2026 Asphalt Paving Project Bid Award", body:"Two bids were opened for the 2026 asphalt paving project. RC Pavers submitted the low bid at $824,146.34, while American submitted a bid of $849,872.10. A motion was made to approve RC Pavers as the winning bidder, which was seconded. The motion passed unanimously with all members voting 'aye.'" },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "RC Pavers awarded the 2026 asphalt paving project contract at $824,146.34",
    ],
  },
  {
    id: "aUG3K0hxNsU", source: "weston",
    title: "Finance and Human Resources Committee",
    date: "April 29, 2026", shortDate: "APR 29",
    committee: "Finance & Human Resources", duration: "~1h",
    url: "https://www.youtube.com/watch?v=aUG3K0hxNsU",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_03232026-1898",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Finance and Human Resources Committee debated and ultimately approved a modified employee clothing allowance policy after canceling the Cintas uniform contract. After three failed motions, the committee approved $400 annually (starting remainder of 2026) plus a one-time washer\/dryer purchase for staff use. The committee also received a detailed presentation on public works operations showing the department operates below average costs compared to peer communities.",
    agenda: [
      { time:"0:01", item:"Call to order and Pledge of Allegiance" },
      { time:"0:30", item:"Roll call" },
      { time:"0:45", item:"Public comments" },
      { time:"2:30", item:"Approval of minutes from February 16, 2026" },
      { time:"3:00", item:"Acknowledge February financial reports" },
      { time:"3:45", item:"Acknowledge T1 and T2 detail reports for February" },
      { time:"4:15", item:"Acknowledge legal details for February" },
      { time:"5:00", item:"Educational presentation: Public works operations and budget" },
      { time:"40:03", item:"Discussion and action on reimbursement for clothing and equipment allowance" },
      { time:"1:15:01", item:"Future meeting scheduling and adjournment" },
    ],
    discussions: [
      { item:"Public Works Operations and Budget Presentation", body:"Public Works Director Michael delivered an extensive presentation on department operations and budget. He reported the 2026 public works budget decreased by $26,000 (1.1% reduction) from 2025. The department maintains 119.5 centerline miles of road with 10 full-time employees (down from 11 in 2010). Michael noted the village spends about $9,700 less per mile than the average central Wisconsin community, ranking as third lowest in the region. He detailed the recent major snow event where employees worked 16-17 hour shifts, with estimated costs of $50,000 for that single storm. The county is pursuing disaster relief funds from the state." },
      { item:"Clothing and Equipment Allowance Policy", body:"This item generated significant debate. Lisa Beck spoke during public comment questioning the proposed $600 allowance increase. Committee member Daniels opposed the $600 amount, citing fiscal responsibility concerns given the upcoming fire department referendum. She suggested $400 as a compromise. Director Michael advocated strongly for maintaining employee benefits, noting staff worked 17-hour shifts during the recent storm and that the village already pays below average. The first motion for $600 failed 3-2 (Daniels, Olsson, Sober voting no; Love and My voting yes). A $400 motion failed 3-3. A $500 motion with washer\/dryer also failed. Finally, a motion for $400 annually plus a one-time washer\/dryer purchase passed with one opposed." },
      { item:"February Financial Reports and Minutes", body:"The committee unanimously approved the minutes from February 16, 2026, and acknowledged the February financial reports for all funds, T1 and T2 detail reports, and legal details. All motions passed without discussion." },
    ],
    publicComment: "Lisa Beck of 1808 Cortez Lane offered public comment. She praised Public Works Director Michael for the department's work during the recent major storm. She also questioned the proposed clothing allowance increase, suggesting the village consider a lesser amount rather than the highest proposed option, noting she didn't know other companies offering such benefits.",
    actionItems: [
      "Approved employee clothing allowance of $400 annually (effective remainder of 2026 and continuing) plus one-time purchase of washer and dryer for staff use - recommendation to village board",
      "Next meeting scheduled for Tuesday, April 21st at 5:00 PM due to new board member swearing-in",
      "County pursuing disaster relief funds from state for snow event costs - follow-up expected in coming weeks",
    ],
  },
  {
    id: "_hS5GDGVL1c", source: "wausau",
    title: "Wausau Public Health and Safety Committee Meeting",
    date: "April 29, 2026", shortDate: "APR 29",
    committee: "Public Health & Safety", duration: "~1h",
    url: "https://www.youtube.com/watch?v=_hS5GDGVL1c",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Public Health and Safety Committee approved a parklet permit for West Cider Diner and Lounge after the owner presented detailed plans, approved multiple license applications and summer events, and repealed outdated ordinances on solid waste disposal and cell phone use while driving. The committee also heard updates on the WMC shelter's transition to Bridge Street Mission and deferred action on one bartender license denial pending police chief review.",
    agenda: [
      { time:"0:00", item:"Call to order and roll call" },
      { time:"0:15", item:"Public comment on agenda items" },
      { time:"0:45", item:"Approval of February 16, 2026 meeting minutes" },
      { time:"1:15", item:"License applications - West Cider Diner parklet permit discussion" },
      { time:"10:00", item:"License denial recommendations - Theodore Davis and Joanna Gregory" },
      { time:"20:01", item:"Repealing and recreating solid waste disposal ordinance (Chapter 6.44)" },
      { time:"22:00", item:"Repealing handheld mobile phone ordinance (Section 10.01.012)" },
      { time:"25:01", item:"Memorandum of understanding with Midwest Renewable Energy for solar program" },
      { time:"27:00", item:"Wausau Fire Department 2025 annual report" },
      { time:"35:01", item:"Tavern activities report for February 2026" },
      { time:"37:30", item:"Community outreach update and shelter transition discussion" },
    ],
    discussions: [
      { item:"West Cider Diner Parklet Permit", body:"Owner Tyler Vote presented detailed mockups for a parklet extending 4 feet into the street and 4 feet on the sidewalk at 628 North Third Ave. He explained the parklet would provide sunny seating for breakfast customers and would be similar to one he previously operated at Malarkey's Pub. Committee member Larson noted he was initially against the proposal but changed his position after seeing the layout. The permit was approved unanimously with a motion from Watson and second from Larson, with Vote asked to report back in November on how the summer trial went." },
      { item:"License Denial - Theodore Davis", body:"Theodore Davis appeared regarding his bartender license denial recommendation, stating he made a mistake 20 years ago as a minor that has followed him throughout his life. He indicated he has completed therapy and registry requirements and submitted rehabilitation evidence to Chief Barnes. His boyfriend Matthew Prieb also spoke in support, emphasizing Davis has not reoffended and is a good person. Deputy Chief Baiton stated he was unfamiliar with what information the chief received. The committee decided to hold action pending review by Chief Barnes of the rehabilitation evidence." },
      { item:"License Denial - Joanna Gregory", body:"Joanna Gregory did not appear for her denial hearing. Her denial will proceed with the batch of license actions." },
      { item:"Batch License Approvals", body:"The committee approved multiple items including summer events (Wings over Wausau, Concerts on the Square, Chalkfest, Memorial Day parade, Hope on the Block, Jazz on the River) and liquor license applications for Oasis Arcade, Whiskey River Bar and Grill (new ownership), and Hayawa (new owner), all unanimously recommended by the subcommittee. Motion from Larson, second from Watson, passed unanimously." },
      { item:"Solid Waste Disposal Ordinance", body:"The committee approved repealing and recreating Chapter 6.44 to comply with state-level changes. Motion from Larson, second from Watson, passed unanimously with no discussion." },
      { item:"Handheld Mobile Phone Ordinance Repeal", body:"Assistant City Attorney Vinnie Bonino explained that state inattentive driving statutes have been amended to regulate cell phone usage, making the local ordinance redundant. Motion from Watson, second from Larson, passed unanimously to repeal Section 10.01.012." },
      { item:"MREA Solar Partnership", body:"Carrie from planning reported the Sustainability Committee unanimously recommended the memorandum of understanding on March 5th. Committee member Sarah, who has solar on her house, praised the partnership with MREA as experts who can help with the complex installation process. Motion from Watson, second from Larson, passed unanimously." },
      { item:"Fire Department Annual Report", body:"Fire Chief reported over 7,200 calls in 2025, averaging 20 per day, setting new records. He announced that as of Friday, the city regained ISO Class 2 status for the next four years. The chief mentioned upcoming public information sessions on March 31st at 1:00 PM at the tech, April 1st at 5:00 PM at Station 2, and April 3rd at Station 1 regarding the April 7th referendum. Report placed on file." },
      { item:"Community Outreach and Shelter Transition", body:"Tracy Durante reported 415 unduplicated guests served since the shelter opened and over 740 volunteer hours in February. James Torensson, new Director of Homeless Services at Bridge Street Mission, explained the transition from WMC shelter is expected around late April, with the contract extended through April 19th at First United Methodist Church. Bridge Street Mission will also operate a day center from 9 AM to 3 PM. Committee expressed interest in touring the new facility at the ribbon cutting ceremony." },
    ],
    publicComment: "Carrie Mor Everest of 1025 Everest Boulevard spoke during end-of-meeting public comment about concerns with how 911 responders have treated unhoused individuals at the shelter over 10 months of volunteering. She stated people are treated differently based on housing status and expressed frustration that her previous complaints went nowhere. The chair noted that such complaints should go through the Police and Fire Commission's formal processes.",
    actionItems: [
      "Parklet permit approved for West Cider Diner at 628 North Third Ave for summer 2026 trial; owner to report back in November",
      "Theodore Davis bartender license decision held pending Chief Barnes' review of rehabilitation evidence",
      "Joanna Gregory bartender license denied (did not appear)",
      "All recommended license applications and summer event permits approved",
      "Chapter 6.44 solid waste disposal ordinance repealed and recreated",
      "Section 10.01.012 handheld mobile phone ordinance repealed",
      "MREA solar partnership memorandum of understanding approved",
      "Committee to tour Bridge Street Mission shelter at ribbon cutting ceremony",
      "Staff to investigate possible missing demerit points on tavern report and check on Trace Armanos status",
    ],
  },
  {
    id: "Izfp0CD_Da0", source: "weston",
    title: "Board of Trustees",
    date: "April 29, 2026", shortDate: "APR 29",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=Izfp0CD_Da0",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_03232026-1898",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Board of Trustees approved multiple ordinances including rezonings and a modified speed limit ordinance for Weston Avenue, rejected the original speed limit proposal 4-3 before passing an amended version keeping Von Kennel to Highway J at 45 mph. The board also approved a 10-year baseball\/softball field maintenance agreement, park shelter fee changes, and deferred action on the remote meeting attendance policy until the new board is seated.",
    agenda: [
      { time:"0:01", item:"Call to order and Pledge of Allegiance" },
      { time:"0:45", item:"Roll call" },
      { time:"1:05", item:"Public comments" },
      { time:"5:01", item:"Minutes from previous meeting and acknowledgment of reports" },
      { time:"20:02", item:"Ordinances - Rezonings and speed limit amendments" },
      { time:"30:01", item:"Resolution approving Hinter Springs Second Edition subdivision final plat" },
      { time:"31:30", item:"April 2026 referendum informational sessions update" },
      { time:"35:02", item:"E-bike and euro ordinance discussion" },
      { time:"37:00", item:"Removal of no parking restrictions on Altaverie Street and Alderson Street" },
      { time:"40:00", item:"Intersection signage at Community Center Drive and Birch Street" },
      { time:"45:01", item:"Baseball\/softball field maintenance agreement and park fees" },
    ],
    discussions: [
      { item:"Public Comment - Fire Department Funding", body:"Jim Pensel of 5002 Aerrol Street praised SAFER fire department staff after attending their citizen academy, but criticized the board's approach to funding. He argued the village has 'a priority problem, not a revenue problem' and urged the board to fully fund the fire department instead of spending on 'wants' like artificial turf and the aquatic center. Finance Director Jessica responded that the village cannot borrow for firefighter positions, noting the turf at Kennedy Park was funded through approved borrowing, and that additional operating revenue through referendum is necessary." },
      { item:"Speed Limit Ordinance 26-006", body:"The original ordinance to set Weston Avenue speed limits at 35 mph from Von Kennel to Ryan failed 3-4, with Maloney, Jordan, and the presiding officer voting no. Trustee Maloney argued the 35 mph limit was excessive for the sparse area compared to Scofield Avenue. An amended motion by Maloney, seconded by Jordan, was then approved to keep Von Kennel to Camp Phillips at 35 mph while maintaining Von Kennel to Highway J at 45 mph, with all other speed limit changes intact." },
      { item:"Rezoning Ordinances", body:"Two rezoning ordinances were approved unanimously as recommended by the Planning Commission: Ordinance 26-00004 rezoning a portion of 8905 Bert Street from RR5 to SFS, and Ordinance 26-00005 rezoning a portion of 7105 Christensen Avenue from SL to SFS single family residential small lot." },
      { item:"Intersection Signage at Community Center Drive and Birch Street", body:"The board approved changing the stop sign to a yield sign with a friendly amendment adding a stop sign for bicyclists coming off the pedestrian bridge. Trustee Hooang raised safety concerns about cyclists traveling 15-20 mph exiting the bridge with no signage, leading to the addition of a bicycle stop sign at the bridge landing." },
      { item:"Baseball\/Softball Field Maintenance Agreement", body:"The board approved a 10-year agreement with youth baseball and softball organizations for field maintenance at Kennedy Park. The lengthy term was justified to protect the village's investment and provide stability given annual leadership changes on organizational boards. Two items were highlighted as additions from Park and Rec: the 10-year term and village authority to determine when fields can be used." },
      { item:"Remote Meeting Attendance Policy", body:"Trustee Lewis recommended deferring this item until the next meeting so the newly seated board could make the decision. The motion to defer passed unanimously." },
      { item:"E-bike and Euro Ordinance", body:"The board voted to table the proposed e-bike ordinance until Marathon County finalizes their process and the ordinance can be brought back from the MPO subcommittee. Motion passed unanimously." },
      { item:"Microsoft Teams for Communication", body:"The board approved using Microsoft Teams for trustee communication starting with the next term, replacing text messaging between trustees. Staff will provide training for the new board." },
    ],
    publicComment: "Jim Pensel of 5002 Aerrol Street spoke about fire department funding, praising SAFER staff while criticizing the board's referendum approach. He attended the SAFER citizen academy and urged the board to prioritize fire department funding over amenities like artificial turf and the aquatic center, calling for the board to 'stop looking for the easy way out through referendums and start making the hard choices.'",
    actionItems: [
      "Minutes from February 16th meeting approved",
      "Ordinance 26-00004 rezoning 8905 Bert Street approved",
      "Ordinance 26-00005 rezoning 7105 Christensen Avenue approved",
      "Speed limit ordinance 26-006 approved as amended - Von Kennel to Camp Phillips at 35 mph, Von Kennel to Highway J at 45 mph",
      "Resolution 2026-008 approving Hinter Springs Second Edition subdivision final plat approved",
      "E-bike ordinance tabled pending county process completion",
      "No parking restrictions removed on west side of Alderson Street along Kennedy Park",
      "Yield sign to replace stop sign at Community Center Drive\/Birch Street with bicycle stop sign added at bridge",
      "10-year baseball\/softball field maintenance agreement approved",
      "Commercial rotary mower purchase approved",
      "Park shelter fees and field rental costs approved",
      "Eagle Scout project at McKiller Park approved with funding from park operations",
      "Remote meeting attendance policy deferred to April 21st meeting",
      "Microsoft Teams approved for trustee communication",
      "Military Road utility engineering service contract approved",
      "Business 51 storm pond engineering service contract amendment ($13,500) approved",
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
    title: "Marathon County Board Regular Meeting",
    date: "April 29, 2026", shortDate: "APR 29",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=HwjjV4oIneA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board of Supervisors adopted the 2026 Comprehensive Plan with 10 amendments addressing renewable energy language, AI\/automation, data centers, battery storage facilities, and energy policy. The board also approved salaries for elected officials, authorized highway facility design services, engaged outside counsel for PFAS litigation, ratified a snow emergency declaration, and approved the county administrator's performance evaluation.",
    agenda: [
      { time:"0:12", item:"Call to order, Pledge of Allegiance, moment of reflection" },
      { time:"1:30", item:"Roll call and welcome to visitors" },
      { time:"2:15", item:"Standing committee reports" },
      { time:"2:30", item:"Consent agenda items C8 through C13 B2" },
      { time:"3:00", item:"Adopting Marathon County Comprehensive Plan 2026 (Ordinance 0-13-26)" },
      { time:"1:20:01", item:"Establishing salaries for elected officials (Resolution 12-26)" },
      { time:"1:21:00", item:"Highway facility phase 2 design services (Resolution 13-26)" },
      { time:"1:24:00", item:"Engaging outside counsel for PFAS litigation (Resolution 14-26)" },
      { time:"1:29:00", item:"Approving carry forwards and budget amendments (Resolution R-20-26)" },
      { time:"1:30:01", item:"Ratification of local state of emergency declaration (Resolution 22-26)" },
      { time:"1:35:00", item:"County Administrator performance evaluation" },
      { time:"1:40:00", item:"Announcements and adjournment" },
    ],
    discussions: [
      { item:"Marathon County Comprehensive Plan 2026", body:"Administrator Leonard presented 10 proposed amendments compiled from supervisor feedback. Amendments were taken individually with extensive debate. Amendment 1 (livability standards) passed unanimously. Amendments 2, 3, and 4 (alternative energy language changes proposed by Vice Chair Dickinson) passed but not unanimously after Supervisor Crawl requested they be separated. Amendment 5 (data centers\/battery storage background) passed but not unanimously, with Supervisor Leur voting no calling it 'too ideological.' Amendment 6 (radon and lead references) passed unanimously. Amendment 7 (regulate energy projects when allowed by law) passed but not unanimously. Amendment 8 (AI\/automation language proposed by Supervisor Leur) passed unanimously. Amendment 9 was heavily debated - Supervisor Sindellski's original proposal promoting clean coal, natural gas, and nuclear was amended by Supervisor Boots to read 'promote coal and natural gas until a long-term sustainable and reliable energy source can be found that does not adversely affect agricultural land.' Supervisors Robinson and Rosenberg opposed, with Rosenberg stating 'there is no such thing as clean coal.' The amended version passed but not unanimously. A late amendment by Supervisor Sindellski regarding utility-scale wind, solar, and battery facilities as industrial uses generated debate about whether to refer to committee; Supervisor Jeang's motion to refer was defeated, and the amendment itself was defeated. The full Comprehensive Plan as amended was approved but not unanimously." },
      { item:"Establishing salaries for elected officials", body:"Resolution 12-26 establishing salaries for clerk of courts, sheriff, and elected department heads for the upcoming term was approved. The motion passed with the vote carried." },
      { item:"Highway facility phase 2 design services", body:"Resolution 13-26 authorizing phase 2 design services for the new highway facility passed unanimously. Supervisor Soyber requested future information about plans for the old facility. Supervisor Sindellski asked about the $53 million cost estimate but Chair Gibbs clarified that amount was not part of this resolution." },
      { item:"PFAS litigation outside counsel", body:"Resolution 14-26 authorizing contingency-based outside counsel for PFAS lawsuits was amended twice. Supervisor Robinson's amendment directing the county administrator to evaluate past and present practices that may have resulted in PFAS exposure passed unanimously. Vice Chair Dickinson's amendment modifying airport-related language passed unanimously. The resolution as amended passed unanimously." },
      { item:"Local state of emergency ratification", body:"Resolution 22-26 ratifying the declaration of local emergency related to the blizzard was approved unanimously. Administrator Leonard explained the ratification preserves the county's opportunity for reimbursement and praised staff across facilities, parks, forestry, highway, sheriff's office, and airport for working 12-16 hour shifts during the storm. Supervisor Fifer echoed thanks to staff for their 'unprecedented' response." },
      { item:"County Administrator performance evaluation", body:"Chair Gibbs explained the executive committee completed the administrator's evaluation based on board input summarized at the previous meeting. Supervisor Robinson moved to accept the executive committee's recommendation on salary and performance evaluation. The motion passed unanimously without going into closed session." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Comprehensive Plan 2026 adopted with 10 amendments effective",
      "Salaries established for clerk of courts, sheriff, and elected department heads for upcoming term",
      "Phase 2 design services for new highway facility authorized to proceed",
      "Outside counsel engaged on contingency basis for PFAS litigation",
      "County administrator directed to evaluate past and present PFAS exposure risks in county operations",
      "Carry forwards and budget amendments approved",
      "Capital asset threshold set at $10,000 for general assets and $50,000 for infrastructure",
      "Law enforcement drug trafficking response grant accepted with budget amendment",
      "Local state of emergency declaration ratified",
      "County Administrator performance evaluation and salary placement approved",
      "Supervisors leaving the board (Crawl, Fifick, Marshall, Rosenberg, Hardinger, V, Reynolds) to turn in iPads after final meetings",
    ],
  },
  {
    id: "D7R7a0G0WTA", source: "weston",
    title: "Parks Committee",
    date: "April 29, 2026", shortDate: "APR 29",
    committee: "Parks and Recreation Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=D7R7a0G0WTA",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_03232026-1898",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Parks Committee approved minutes, selected Rettler Corporation for the Mock Mueller Park master plan, and discussed park impact fees and ice rink operations. The committee reviewed Yellow Banks kayak launch expenses showing significant grant funding success, and provided feedback supporting moderate increases to park impact fees to align with neighboring communities.",
    agenda: [
      { time:"0:05", item:"Call to order and Pledge of Allegiance" },
      { time:"0:30", item:"Roll call" },
      { time:"0:50", item:"Approval of minutes from February 23rd, 2026" },
      { time:"1:15", item:"Public comments" },
      { time:"6:00", item:"Educational presentations - Review of parks and recreation impact fee discussion" },
      { time:"25:45", item:"Discussion and possible action on RFP for Mock Mueller Park master plan" },
      { time:"32:00", item:"Discussion and possible action on Yellow Banks kayak launch expenses" },
      { time:"38:30", item:"Discussion on ice rink operations at Kennedy Park" },
      { time:"50:15", item:"Future items and next meeting date" },
      { time:"52:30", item:"Adjournment" },
    ],
    discussions: [
      { item:"Approval of minutes from February 23rd, 2026", body:"A motion to accept the minutes was made and seconded. The motion passed unanimously with all present voting in favor." },
      { item:"Parks and Recreation Impact Fee Discussion", body:"Jennifer presented information on park impact fees, noting the current single-family fee of $300 is well below what a 2020 study recommended ($761) and below neighboring communities (Kronenwetter at $603, Rib Mountain at $650). Committee members expressed support for a moderate increase to align with neighboring communities. Katrina stated she would be 'more in the moderate increase bracket instead of the maximum.' The committee agreed fees should help fund amenities like paths and boardwalks in new subdivisions. Jennifer will present comparative data to Plan Commission next month for their decision." },
      { item:"RFP Selection for Mock Mueller Park Master Plan", body:"Staff received seven proposals for the park master plan, which were reviewed by four staff members. The two lowest bidders were JSD and Rettler Corporation. Roger made a motion to select Rettler Corporation, seconded by Katrina. The motion passed unanimously. Staff noted Rettler has done previous master plans for Kennedy Park and other village projects." },
      { item:"Yellow Banks Kayak Launch Expenses Review", body:"Jessica presented a comprehensive breakdown of the kayak launch project expenses and grant funding. The project encountered unforeseen costs including poor subgrade and an unknown well casing. Lisa Beck praised the RFC as 'awesome' and 'super well written' during public comment. Katrina commended Jessica and Dan Hagenbotham for grant writing work, noting the project was 'a huge success' with out-of-pocket costs significantly reduced through grants. Marathon County Transportation covered the full expense for the ADA accessible features. No formal action was taken; the item was informational." },
      { item:"Ice Rink Operations at Kennedy Park", body:"Staff provided information requested by committee member Katrina regarding the ice rink. The warming house has been unattended since 2020 due to COVID and subsequent staffing recruitment challenges. Everest Youth Hockey remains interested in improvements including a covered structure. Staff noted ongoing discussions about Marathon Park changes may increase demand for ice facilities. Katrina expressed concern about not losing sight of hockey amid baseball-focused Kennedy Park discussions. Staff will bring back attendance figures from 2018-19 seasons and user feedback to a future meeting." },
    ],
    publicComment: "Jim Pencil expressed frustration about not receiving responses to questions submitted at the previous meeting regarding playground equipment installation, Kennedy Park fundraising updates, and ice rink costs. He argued the $1,320.98 stated ice rink cost is misleading and actual costs are closer to $20,000-$30,000 when factoring in labor hours. Lisa Beck thanked Michael for snow removal work during the blizzard weekend and praised Sean and Jessica for the well-written Yellow Banks kayak launch RFC. A written response to Jim Pencil's previous email was also submitted and will be included in the minutes.",
    actionItems: [
      "Rettler Corporation selected for Mock Mueller Park master plan project",
      "Jennifer to present park impact fee comparison data to Plan Commission next month",
      "Staff to bring back ice rink attendance figures from 2018-19 seasons to future meeting",
      "Staff to gather user feedback on ice rink for future discussion",
      "Dan Hagenbotham to return to committee regarding Great Pineries Heritage Waterway signage at kayak launches",
      "Next meeting scheduled for April 27th, 2026",
    ],
  },
  {
    id: "8rRo1cm2YJ0", source: "wausau",
    title: "Wausau Finance Committee Meeting",
    date: "April 29, 2026", shortDate: "APR 29",
    committee: "Finance", duration: "~1h",
    url: "https://www.youtube.com/watch?v=8rRo1cm2YJ0",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Finance Committee approved several routine items including airport ground leases and budget carryovers, while postponing decisions on a national opioid settlement and lead service line project funding to gather more information. The committee denied a tax recovery claim related to ongoing Greenwood Hills litigation and approved transfers to cover shortfalls in recycling, airport, and parking funds.",
    agenda: [
      { time:"2:01", item:"Call to order and public comment" },
      { time:"2:30", item:"Approval of March 10, 2026 minutes" },
      { time:"3:00", item:"Green Acres at Greenwood Hills LLC tax recovery claim" },
      { time:"4:00", item:"Transfer of buildings at 939 Woods Place (Win O. Jones to Owen Jones)" },
      { time:"5:15", item:"Airport ground lease with Cole Lundberg" },
      { time:"5:45", item:"National opioid settlement agreement participation" },
      { time:"12:00", item:"Budget amendment for lead service line replacement project" },
      { time:"27:03", item:"Budget amendment for 2025 to 2026 carryover funds" },
      { time:"29:30", item:"Review of 2025 motorpool fund financial results" },
      { time:"37:00", item:"Review of 2025 general fund financial results and borrowing calendar" },
    ],
    discussions: [
      { item:"March 10, 2026 Minutes", body:"Alder Watson moved to approve the minutes, seconded by Alder Griner. The motion passed unanimously with no discussion." },
      { item:"Green Acres at Greenwood Hills LLC Tax Recovery Claim", body:"This claim is part of ongoing litigation with Greenwood Hills. The chair explained that a 'no' vote would deny the claim. Alder Watson moved to approve, seconded by Griner. The motion failed when members voted 'no,' effectively denying the tax recovery claim." },
      { item:"939 Woods Place Building Transfer and Ground Leases", body:"Three related items facilitated transferring a hangar from Win O. Jones to Owen Jones. The committee approved consent to transfer title (Watson motion, Griner second), terminated the ground lease with Win O. Jones (Tierney motion, Watson second), and approved a new ground lease with Owen Jones (Watson motion, Tierney second). All three motions passed unanimously." },
      { item:"Airport Ground Lease with Cole Lundberg", body:"Alder Griner moved to approve the airport ground lease with Cole Lundberg, seconded by Watson. Motion passed unanimously." },
      { item:"National Opioid Settlement Agreement", body:"Significant discussion ensued about joining a class action settlement involving six defendants with $97 million potential payout. Alder Malini questioned where this came from, and Assistant City Attorney Vincent explained the city received a letter identifying them as potential class members. Multiple alderpersons expressed discomfort proceeding without more information, noting they would waive future legal action by joining. Alder Griner moved to postpone to the next meeting, seconded by Tierney. Motion passed unanimously." },
      { item:"Lead Service Line Replacement Budget Amendment", body:"Public Works Director Eric explained that WDNR changed their funding formula, resulting in $709,000 in non-construction costs being ineligible for the subsidized 0.25% loan. Discussion covered funding options including general fund reserves, general obligation borrowing, or PFAS settlement money. The committee discussed splitting the $283,868 private side (potential GO bond or reserves) from the $425,803 public side (potential PFAS settlement funds). Alder Tierney opposed adding more debt. Watson moved to postpone to the next meeting, seconded by Griner. Motion passed unanimously." },
      { item:"2025-2026 Carryover Funds Budget Amendment", body:"Finance Director explained the large carryover amount includes $10 million for transit buses funded by VW mitigation grants. Other carryovers include airport projects awaiting grant draws and equipment deliveries. Watson moved to approve, seconded by Griner. Motion passed unanimously." },
      { item:"2025 Motorpool Fund Financial Results", body:"Finance Director reported the motorpool fund shows a net change loss of $41,373 before GMT transfer. After transferring $191,000 in GMT money, the fund would show $150,000 profit. However, $177,000 cash flow shortfall exists due to delayed vehicle deliveries from 2023. Solomon from Motorpool explained two dump trucks are nearly ready (moved from 15th to 2nd\/3rd in queue) and a med unit was sent back for repairs. ARPA savings may cover the shortfall. This was informational only; no action taken." },
      { item:"2025 General Fund Financial Results", body:"The general fund showed a $1.2 million surplus driven by strong building permits, investment income, and EMS runs. After full motorpool charges, surplus is $125,000. Public Works, Fire, and Police are over budget primarily due to motorpool charges that couldn't be fully budgeted due to levy limits. CCITC overage of $194,000 was attributed to communication problems and an Office 365 upgrade. After proposed transfers to recycling, airport, and parking funds, surplus would be $540,000. Alder Tierney moved to approve the transfers, seconded by Watson. Motion passed unanimously." },
      { item:"2026 General Obligation Promissory Note Calendar", body:"Finance Director presented the borrowing calendar for 2026 capital improvements including street projects (10-year), motorpool (5-year), and various TID projects. Watson noted debt utilization will decrease even with new issuance. Watson moved to approve the calendar, the chair provided the second. Motion passed unanimously. Phil Cawson from Ehlers will present parameters resolution at next meeting." },
      { item:"Potential Property Purchases for DPW Streets Division", body:"Properties at 108, 112, 112½ Adolf Street and 233 Myron Street were scheduled for closed session discussion. Given time constraints before council meeting, Watson moved to postpone to next meeting, seconded by Tierney. Motion passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Denied Green Acres at Greenwood Hills LLC tax recovery claim",
      "Approved building transfer and ground lease changes for 939 Woods Place (Win O. Jones to Owen Jones)",
      "Approved airport ground lease with Cole Lundberg",
      "Postponed opioid settlement participation decision pending more information from City Attorney",
      "Postponed lead service line budget amendment decision to determine funding source",
      "Approved 2025-2026 budget carryover amendment",
      "Approved transfers from general fund to recycling, airport, and parking funds",
      "Approved 2026 borrowing calendar; parameters resolution to come at next meeting",
      "Postponed closed session discussion on DPW property purchases",
    ],
  },
  {
    id: "47UbKS2Jqo4", source: "marathon",
    title: "Marathon County Executive Committee Meeting",
    date: "April 29, 2026", shortDate: "APR 29",
    committee: "Executive Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=47UbKS2Jqo4",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Executive Committee met briefly before voting unanimously to enter closed session to discuss the performance review of the county administrator. The committee was considering finalizing the administrator's evaluation based on board feedback received the previous Thursday.",
    agenda: [
      { time:"0:00", item:"Call to order" },
      { time:"0:05", item:"Pledge of Allegiance" },
      { time:"0:30", item:"Performance review of the administrator (closed session consideration)" },
    ],
    discussions: [
      { item:"Performance review of the administrator", body:"The chair explained that the committee had the option to enter closed session to finalize the administrator's performance review, incorporating feedback received from the board the previous Thursday. The evaluation used a rating scale with three criteria: needs improvement, successful, and exceptional, scored on a 0-5 scale. Corporation counsel was asked to provide a summary of the appraisal. A motion was made and seconded to go into closed session, which passed unanimously with all members (Gibbs, Dickinson, Arstead, Boots, Drebeck, Fifick, Mask, Ritter, Morash, and Robinson) voting aye." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Committee entered closed session to discuss and finalize the county administrator's performance evaluation",
    ],
  },
  {
    id: "0pfKykvicdA", source: "marathon",
    title: "Marathon County HR, Finance, and Property Committee Meeting",
    date: "April 29, 2026", shortDate: "APR 29",
    committee: "Marathon County HR, Finance, and Property Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=0pfKykvicdA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County HR, Finance, and Property Committee approved several routine items including a claim disallowance, revised property values for public auction, carry forward funds resolution, and a capital assets threshold policy amendment. The committee also received introductions from new healthcare consultants National Insurance Services and heard detailed financial updates on 2025 year-end closeout and 2026 budget status.",
    agenda: [
      { time:"0:00", item:"Claim disallowance - Mercedes Holmes" },
      { time:"2:18", item:"Revised property values for parcels for public auction" },
      { time:"5:00", item:"Resolution to approve carry forward funds (R20-2026)" },
      { time:"11:25", item:"Resolution to amend capital assets threshold policy" },
      { time:"12:30", item:"Introduction of healthcare consultants - National Insurance Services" },
      { time:"37:07", item:"Audited 2025 year-end fiscal update" },
      { time:"55:03", item:"2026 year-to-date budget update" },
      { time:"57:30", item:"Finance Department quarterly update" },
      { time:"1:07:30", item:"County Treasurer quarterly update" },
      { time:"1:36:30", item:"Announcements and adjournment" },
    ],
    discussions: [
      { item:"Claim disallowance - Mercedes Holmes", body:"Corporation Counsel presented a claim received December 5th from Mercedes Holmes relating to the death of her 3-year-old child Zalen Bernett, who was placed in a treatment foster care home licensed through another agency in Dunn County. Law enforcement and social service investigations found no wrongdoing and death was determined natural causes. Outside counsel and insurance carrier WIMIK recommended disallowance. Chair Gibbs moved to disallow the claim per the insurance carrier's recommendation. Motion passed unanimously." },
      { item:"Revised property values for public auction", body:"Two parcels at 529 Mullen Street and 738 South Third Avenue had failed to sell twice on Wisconsin Surplus with bids not reaching appraised value. Staff requested revised minimum sale prices of $9,000 and $7,500 respectively. Chair Gibbs moved to approve the revised prices. Motion passed unanimously. Staff noted that one bidder who failed to pay has been marked as non-pay and banned from future Wisconsin Surplus auctions." },
      { item:"Resolution to approve carry forward funds", body:"Finance Director Sam presented Resolution R20-2026 for program revenues and multi-year projects. Notable items included veterans relief fund replenishment using 2025 budget excess to provide approximately three years of funding. Vice Chair Marshall asked about redacted records fund for Register of Deeds, which staff explained has statutory restrictions. Administration special projects carryover of $142,731 includes $75,000 previously approved for homelessness contract. Chair Gibbs moved to approve; Supervisor Hart seconded. Motion passed unanimously." },
      { item:"Capital assets threshold policy amendment", body:"Finance Director Sam explained the policy would raise the capitalization threshold from $5,000 to $10,000, following GFOA guidance originally implemented in 2006. Supervisor Hart moved to approve and send to full county board; Chair Gibbs seconded. Motion passed unanimously." },
      { item:"Introduction of National Insurance Services", body:"HR Director Candace introduced NIS representatives who won the healthcare consulting RFP. Rob introduced himself with 28 years experience and Jordan Stanley with public sector HR background. They outlined their team of five and focus areas including near-site ATA clinic evaluation, medical insurance funding model assessment (fully insured vs self-insured vs level funded), and pharmacy benefit management. Vice Chair Marshall asked about per-member costs compared to other employers and strategies for reducing emergency room overuse. Chair Gibbs questioned the evaluation process for self-insurance, noting risk tolerance concerns with reinsurance and lasers. NIS committed to quarterly or biannual updates and providing data before budget assumption development." },
      { item:"2025 year-end fiscal update", body:"Finance Director Sam provided detailed department-by-department review of unaudited 2025 year-end status. Key items included: $257,238 TID closure check from City of Wausau, $222,752 unclaimed property from state (one-time revenue), opioid fund cash at $2.2 million with $3.49 million in future settlement payments expected. Multiple transfers and reclassifications still pending. Sam noted capital assets reconciliation must be completed before providing final fund balance surplus figure but confirmed it 'won't be zero.'" },
      { item:"Finance Department quarterly update", body:"Sam reported welcoming a new systems financial analyst for payroll, achieving full staffing since mid-December. Department conducted W2 processing including 'big beautiful bill' overtime tax calculations, 1099s, random cash audits (all successful), and quarterly closeout preparations. First quarter 2026 will close May 31st with monthly closeouts thereafter. Administrator Lance publicly recognized Sam and her team for exceptional work on year-end close, W2 processing challenges, and improved reporting." },
      { item:"County Treasurer update", body:"Treasurer Connie reported 1,582 delinquent tax notices sent (down from 1,786 last year), active monitoring of tax delinquent parcels, attendance at eviction hearings, processing of lottery credit corrections, and February settlements. Significant discussion on municipal treasurer errors in receipting and lottery credit processing. Vice Chair Marshall asked about poverty trends; Connie noted people are still struggling but numbers slightly decreased. Administrator Lance clarified evictions referenced are county tax deed process evictions, not general evictions, and emphasized the accelerated process protects homeowner equity." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Disallow Mercedes Holmes claim - approved unanimously",
      "Set revised minimum sale prices for two parcels ($9,000 and $7,500) - approved unanimously",
      "Approve Resolution R20-2026 for carry forward funds - approved unanimously",
      "Approve capital assets threshold policy amendment to $10,000 and send to county board - approved unanimously",
      "NIS to provide healthcare cost update before summer budget assumption development",
      "Finance to bring final fund balance figure at next meeting after capital assets reconciliation",
      "Consider increasing Social Services reserve account above current $400,000 level",
      "Register of Deeds to provide update on redacted records fund usage and potential repurposing",
      "Next meeting scheduled April 8th",
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
    overview: "Based on the published agenda, the Village of Weston Board of Trustees was scheduled to meet on April 21, 2026 to address numerous licensing renewals, infrastructure reconstruction projects with preliminary assessments, street maintenance bids, and various capital improvements including park renovations and utility repairs. The meeting was also set to include closed session discussions regarding litigation strategy and property purchases for a road intersection project.",
    agenda: [
      { time:"N\/A", item:"Approval of March 16, 2026, Board of Trustees Meeting" },
      { time:"N\/A", item:"Acknowledge Reports\/Minutes from Boards, Committees, Commissions" },
      { time:"N\/A", item:"Acknowledge Reports from Departments including 2025 Annual Report and Fourth Quarter Police Report" },
      { time:"N\/A", item:"Work Product Transmittals including Building Permits, Budget Status, Draft 2025 Financial Statements, Code Enforcement Report, and New Housing Fee Report" },
      { time:"N\/A", item:"Consent Agenda including vouchers, various license renewals, MS4 Report, and surplus auction results" },
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
      { time:"N\/A", item:"Closed Session regarding litigation strategy for Ascent Funeral Home tax claim and property purchases for intersection project" },
    ],
    discussions: [
      { item:"Ordinance 26-008 Amending Chapter 66 Solid Waste", body:"The Board was scheduled to consider amendments to the Village's solid waste regulations under Chapter 66 of the municipal code. The specific changes were set for review and potential adoption." },
      { item:"Preliminary Assessment Resolutions for Street Reconstruction Projects", body:"The Board was expected to consider three resolutions establishing preliminary assessments for major road reconstruction projects on Jelinek and Alderson, Bloedel Ave, and Concord Ave with Bayberry St. These assessments were set to determine how costs would be allocated for these infrastructure improvements." },
      { item:"Kennedy Park Renovation and Capital Campaign Update", body:"The Board was scheduled to receive a quarterly discussion-only update on the ongoing Kennedy Park renovation project and its associated capital fundraising campaign. No action was expected on this item." },
      { item:"Remote Meeting Attendance Policy Review", body:"The Board was set to review and potentially take action on the Remote Meeting Attendance Policy contained in the Elected and Appointed Officials' Handbook. This was listed as unfinished business from previous meetings." },
      { item:"Graphic Master Plan for Machmueller Park", body:"The Board was scheduled to discuss and potentially take action on a graphic master plan for Machmueller Park, outlining future development and improvements for this village park facility." },
      { item:"Termination of Development Agreement – ABC Weston, LLC", body:"The Board was expected to consider Resolution 2026-013 authorizing termination of a development agreement with ABC Weston, LLC for a second building at 3200 Schofield Avenue. The resolution was set to formally end the existing development arrangement." },
      { item:"Park and Recreation Impact Fees Increase", body:"The Board was scheduled to consider increasing park and recreation impact fees as recommended by both the Plan Commission and Parks & Recreation Committee. This would affect fees charged for new development to fund park improvements." },
      { item:"2026 Street Maintenance Bid Results", body:"The Board was set to review and take action on bid results for multiple street maintenance activities including crack sealing, gilsonite sealing, chip sealing, asphalt overlays, and concrete repairs for the 2026 season." },
      { item:"Replacement Plow Trucks #9 and #10", body:"The Board was scheduled to consider the purchase of two replacement plow trucks for the Village's public works fleet. This equipment acquisition was expected to maintain the Village's winter road maintenance capabilities." },
      { item:"Well #1 Rehabilitation", body:"The Board was set to discuss and potentially authorize rehabilitation work on Well #1, part of the Village's municipal water supply infrastructure." },
      { item:"Sanitary Sewer Inflow and Infiltration Study", body:"The Board was expected to consider a study examining inflow and infiltration issues in the Village's sanitary sewer system, which can impact wastewater treatment capacity and costs." },
      { item:"Bloedel Ave Reconstruction Bid Results", body:"The Board was scheduled to review and take action on bid results for the Bloedel Avenue reconstruction project, a major road infrastructure improvement." },
      { item:"Alderson St and Jelinek Ave Intersection Project Bid Results", body:"The Board was set to consider bid results for the Alderson Street and Jelinek Avenue intersection reconstruction project, with related property acquisition matters to be discussed in closed session." },
      { item:"Consent Agenda License Renewals", body:"The Board was scheduled to consider renewal of numerous business licenses for the 2026-2027 licensing term including weights and measures, commercial animal establishments, cigarette and tobacco sales, lodging, salvage, kennel, and various alcohol licenses." },
      { item:"Closed Session - Litigation Strategy", body:"The Board was scheduled to meet in closed session to confer with legal counsel regarding strategy for litigation involving a Notice of Claim for Rescission and Recovery of Unlawful Taxes filed by Ascent Funeral Home and Spiritual Center, Inc." },
      { item:"Closed Session - Property Purchases", body:"The Board was set to deliberate in closed session on appraisals and right-of-way purchases needed for the Alderson St and Jelinek Ave Intersection Project, where competitive or bargaining reasons required confidentiality." },
    ],
    publicComment: "Public comment was included on the agenda, allowing any person to address the Board for up to three minutes regarding non-agenda items, with time extensions permitted at the Board President's discretion. Comments could be submitted via advance form or live via Zoom.",
    actionItems: [
      "Scheduled to vote on approval of March 16, 2026 meeting minutes",
      "Expected to acknowledge reports from various boards, committees, commissions and departments",
      "Scheduled to consider consent agenda items including vouchers and multiple license renewals",
      "Expected to vote on Ordinance 26-008 amending solid waste regulations",
      "Scheduled to vote on three preliminary assessment resolutions for street reconstruction projects",
      "Expected to consider President's appointments to committees and commissions",
      "Scheduled to vote on Arbor Day Proclamation 2026-001",
      "Expected to consider graphic master plan for Machmueller Park",
      "Scheduled to vote on Resolution 2026-013 terminating ABC Weston LLC development agreement",
      "Expected to consider increasing park and recreation impact fees",
      "Scheduled to take action on 2026 street maintenance bid results",
      "Expected to consider purchase of replacement plow trucks",
      "Scheduled to consider Well #1 rehabilitation",
      "Expected to take action on sanitary sewer study",
      "Scheduled to consider bid results for Bloedel Ave and Alderson\/Jelinek intersection projects",
      "Expected to take possible action following closed session on litigation and property purchase matters",
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
    overview: "Based on the published agenda, the Village of Weston Board of Trustees was scheduled to address multiple infrastructure projects including street reconstruction assessments and maintenance bids, consider increasing park and recreation impact fees, and review numerous license renewals for the 2026-2027 term. The meeting was also set to include closed session discussions regarding legal strategy for a tax-related claim and right-of-way purchases for a road intersection project.",
    agenda: [
      { time:"N\/A", item:"Approval of March 16, 2026, Board of Trustees Meeting" },
      { time:"N\/A", item:"Acknowledge Reports\/Minutes from Boards, Committees, Commissions" },
      { time:"N\/A", item:"Acknowledge Reports from Departments" },
      { time:"N\/A", item:"Work Product Transmittals including Building Permits, Budget Status, DRAFT 2025 Financial Statements" },
      { time:"N\/A", item:"Consent Agenda including Vouchers, License Renewals, MS4 Report, Surplus Auction Results" },
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
      { time:"N\/A", item:"Closed Session: Legal Strategy for Ascent Funeral Home Tax Claim" },
      { time:"N\/A", item:"Closed Session: Right-of-Way Purchases for Alderson St and Jelinek Ave Project" },
    ],
    discussions: [
      { item:"Ordinance 26-008 Amending Chapter 66 Solid Waste", body:"The Board was scheduled to consider an ordinance amending Chapter 66 regarding solid waste regulations in the Village. The specific changes to solid waste policies were set for review and potential adoption." },
      { item:"Preliminary Assessment Resolutions for Street Reconstructions", body:"The Board was expected to consider three preliminary assessment resolutions for infrastructure projects: Jelinek and Alderson Reconstruction, Bloedel Ave Reconstruction, and Concord Ave and Bayberry St Reconstruction. These resolutions were set to establish the framework for special assessments to property owners benefiting from road improvements." },
      { item:"Kennedy Park Renovation and Capital Campaign Update", body:"The Board was scheduled to receive a quarterly update on the ongoing Kennedy Park renovation project and associated capital campaign. This discussion-only item was expected to provide status information on the park improvement efforts." },
      { item:"Park and Recreation Impact Fees Increase", body:"The Board was set to consider increasing park and recreation impact fees as recommended by both the Plan Commission and Parks & Recreation Committee. This item was expected to address funding mechanisms for park facilities as development occurs in the Village." },
      { item:"2026 Street Maintenance Bid Results", body:"The Board was scheduled to review and potentially act on bid results for multiple street maintenance activities including crack sealing, gilsonite sealing, chip sealing, asphalt overlays, and concrete repairs. These maintenance activities were set to address ongoing road preservation needs throughout the Village." },
      { item:"Replacement Plow Trucks #9 and #10", body:"The Board was expected to consider action on replacing two plow trucks in the Village fleet. This item was set to address public works equipment needs for winter maintenance operations." },
      { item:"Well #1 Rehabilitation", body:"The Board was scheduled to consider action on rehabilitation work for Well #1 in the Village water system. This infrastructure maintenance item was expected to address municipal water supply reliability." },
      { item:"Sanitary Sewer Inflow and Infiltration Study", body:"The Board was set to consider action on a study examining inflow and infiltration in the Village's sanitary sewer system. This study was expected to identify areas where groundwater or stormwater enters the sewer system, affecting treatment costs." },
      { item:"Termination of Development Agreement – ABC Weston, LLC", body:"The Board was scheduled to consider Resolution 2026-013 authorizing termination of a development agreement with ABC Weston, LLC for property at 3200 Schofield Avenue. The agreement pertained to a second building that was expected to be formally ended." },
      { item:"Graphic Master Plan for Machmueller Park", body:"The Board was set to discuss and potentially act on a graphic master plan for Machmueller Park. This planning item was expected to establish a vision for future park development and improvements." },
      { item:"Closed Session: Ascent Funeral Home Tax Claim", body:"The Board was scheduled to meet in closed session with legal counsel regarding strategy for litigation involving a Notice of Claim for Rescission and Recovery of Unlawful Taxes from Ascent Funeral Home and Spiritual Center, Inc. Possible action was expected following the closed session." },
      { item:"Closed Session: Alderson St and Jelinek Ave Right-of-Way Purchases", body:"The Board was set to deliberate in closed session on appraisals and right-of-way purchases needed for the Alderson St and Jelinek Ave Intersection Project. This item was expected to address property acquisition needs for the road improvement project." },
    ],
    publicComment: "Public comment period was on the agenda, allowing up to three minutes per speaker for non-agenda items, with time extensions at the Chief Presiding Officer's discretion. Participants could submit comments in advance or participate live via Zoom.",
    actionItems: [
      "Scheduled to vote on approval of March 16, 2026 meeting minutes",
      "Expected to consider Ordinance 26-008 amending solid waste regulations",
      "Scheduled to vote on preliminary assessment resolutions for three street reconstruction projects",
      "Expected to consider consent agenda including vouchers and multiple license renewals for 2026-2027",
      "Scheduled to consider increasing park and recreation impact fees",
      "Expected to act on 2026 street maintenance bid results for multiple categories",
      "Scheduled to consider purchase of replacement plow trucks",
      "Expected to consider Well #1 rehabilitation project",
      "Scheduled to consider sanitary sewer inflow and infiltration study",
      "Expected to act on Bloedel Ave reconstruction bid results",
      "Scheduled to act on Alderson St and Jelinek Ave intersection project bid results",
      "Expected to consider termination of ABC Weston LLC development agreement",
      "Scheduled for possible action following closed session on tax claim litigation strategy",
      "Expected for possible action following closed session on right-of-way purchases",
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
    overview: "Based on the published agenda, the Village of Weston Board of Trustees was scheduled to address multiple infrastructure projects including street reconstruction assessments, consider increases to park impact fees, review 2026 street maintenance bids, and act on numerous license renewals for the 2026-2027 term. The meeting also included closed session items regarding litigation with Ascent Funeral Home and right-of-way purchases for a road intersection project.",
    agenda: [
      { time:"N\/A", item:"Public Comments" },
      { time:"N\/A", item:"Approval of March 16, 2026, Board of Trustees Meeting" },
      { time:"N\/A", item:"Acknowledge Reports\/Minutes from Boards, Committees, Commissions" },
      { time:"N\/A", item:"Acknowledge Reports from Departments" },
      { time:"N\/A", item:"Work Product Transmittals including Building Permits, Budget Status, DRAFT 2025 Financial Statements, Code Enforcement Report, 2026 New Housing Fee Report" },
      { time:"N\/A", item:"Consent Agenda including Vouchers, License Renewals, MS4 Report, Surplus Auction Results" },
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
      { time:"N\/A", item:"Closed Session: Ascent Funeral Home Notice of Claim and Right-of-Way Purchases" },
    ],
    discussions: [
      { item:"Ordinance 26-008 Amending Chapter 66 Solid Waste", body:"The Board was scheduled to consider amendments to the Village's solid waste ordinance. The specific changes to be addressed were not detailed in the agenda." },
      { item:"Preliminary Assessment Resolutions for Street Reconstructions", body:"The Board was expected to consider three separate preliminary assessment resolutions for major road reconstruction projects on Jelinek and Alderson, Bloedel Ave, and Concord Ave with Bayberry St. These assessments would determine how property owners may share in the costs of infrastructure improvements." },
      { item:"Kennedy Park Renovation and Capital Campaign", body:"The Board was set to receive a quarterly update on the Kennedy Park renovation project and its associated capital campaign. This was designated as a discussion-only item with no action expected." },
      { item:"Remote Meeting Attendance Policy", body:"The Board was scheduled to review the Elected and Appointed Officials' Handbook policy regarding remote meeting attendance. This appears to be a continuation of unfinished business from previous meetings." },
      { item:"Graphic Master Plan for Machmueller Park", body:"The Board was expected to consider a graphic master plan for Machmueller Park, which would outline future development and improvements for the park facility." },
      { item:"Termination of Development Agreement – ABC Weston, LLC", body:"The Board was scheduled to consider Resolution 2026-013 authorizing termination of a development agreement with ABC Weston, LLC regarding a second building at 3200 Schofield Avenue." },
      { item:"Park and Recreation Impact Fees Increase", body:"The Board was expected to consider increasing park and recreation impact fees as recommended by both the Plan Commission and Parks & Recreation Committee. These fees are typically charged to new development to fund park improvements." },
      { item:"2026 Street Maintenance Bid Results", body:"The Board was scheduled to review and potentially act on bid results for multiple street maintenance projects including crack sealing, gilsonite sealing, chip sealing, asphalt overlays, and concrete repairs." },
      { item:"Replacement Plow Trucks #9 and #10", body:"The Board was expected to consider the purchase of two replacement plow trucks for the Village's public works fleet. Details on costs or vendors were not specified in the agenda." },
      { item:"Well #1 Rehabilitation", body:"The Board was scheduled to discuss and potentially act on rehabilitation work for Well #1, which serves the Village's municipal water system." },
      { item:"Sanitary Sewer Inflow and Infiltration Study", body:"The Board was expected to consider a study examining inflow and infiltration issues in the Village's sanitary sewer system, which can lead to capacity problems and treatment costs." },
      { item:"Bloedel Ave Reconstruction Bid Results", body:"The Board was scheduled to review bid results for the Bloedel Avenue reconstruction project. This item relates to the preliminary assessment resolution also on the agenda." },
      { item:"Alderson St and Jelinek Ave Intersection Project Bid Results", body:"The Board was expected to consider bid results for the Alderson Street and Jelinek Avenue intersection improvement project, with related closed session discussion on right-of-way purchases." },
      { item:"Closed Session Items", body:"The Board was scheduled to enter closed session to receive legal counsel advice regarding a notice of claim from Ascent Funeral Home concerning alleged unlawful taxes, and to discuss appraisals and right-of-way purchases for the Alderson and Jelinek intersection project." },
    ],
    publicComment: "Public comment was scheduled at the beginning of the meeting for non-agenda items, with speakers limited to three minutes. Comments could be submitted in advance via a public comment form or made live via Zoom.",
    actionItems: [
      "Scheduled to vote on approval of March 16, 2026 meeting minutes",
      "Expected to consider Ordinance 26-008 amending solid waste regulations",
      "Scheduled to vote on Resolution 26-010 for Jelinek and Alderson reconstruction preliminary assessment",
      "Scheduled to vote on Resolution 26-011 for Bloedel Ave reconstruction preliminary assessment",
      "Scheduled to vote on Resolution 26-012 for Concord Ave and Bayberry St reconstruction preliminary assessment",
      "Expected to consider consent agenda including vouchers and multiple license renewals for 2026-2027 term",
      "Scheduled to vote on Proclamation 2026-001 for Arbor Day observance",
      "Expected to consider graphic master plan for Machmueller Park",
      "Scheduled to vote on Resolution 2026-013 terminating ABC Weston, LLC development agreement",
      "Expected to consider increasing park and recreation impact fees",
      "Scheduled to act on 2026 street maintenance bid results",
      "Expected to consider purchase of replacement plow trucks",
      "Scheduled to act on Well #1 rehabilitation",
      "Expected to consider sanitary sewer inflow and infiltration study",
      "Scheduled to act on Bloedel Ave reconstruction bid results",
      "Scheduled to act on Alderson St and Jelinek Ave intersection project bid results",
      "Expected to take possible action on closed session items following reconvening",
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
    overview: "The Wausau Transit Commission met to consider several route changes and a request to sign a letter supporting federal bus operator safety legislation H.R.6635. The agenda included discussion of A route and I route changes, Summer School bus Route 4X, and a Grant 5304 application, though specific vote outcomes were not recorded in the official records.",
    agenda: [
      { time:"N\/A", item:"Public comment on agenda items" },
      { time:"N\/A", item:"Consideration of the minutes of the February 19, 2026 meeting" },
      { time:"N\/A", item:"ATU - Bus operator safety and security, H.R.6635 letter of support" },
      { time:"N\/A", item:"A route change" },
      { time:"N\/A", item:"I route change" },
      { time:"N\/A", item:"Summer School bus Route 4X" },
      { time:"N\/A", item:"Apply for Grant 5304" },
      { time:"N\/A", item:"Director's Reports: GMV contract update, Feasibility Study update, WISGO Technology Demo" },
    ],
    discussions: [
      { item:"Minutes of February 19, 2026", body:"The commission considered approval of the minutes from the February 19, 2026 meeting. No vote count was recorded in the official records." },
      { item:"ATU - Bus operator safety and security", body:"The commission discussed ATU's request to sign a letter supporting H.R.6635, federal legislation requiring safety doors on all buses built two years after enactment. The item sought permission to send a letter to congressional leaders urging support for bus operator safety. No vote count was recorded in the official records." },
      { item:"A route change", body:"The commission discussed a proposed change to the A route. No vote count was recorded in the official records." },
      { item:"I route change", body:"The commission discussed a proposed change to the I route. No vote count was recorded in the official records." },
      { item:"Summer School bus Route 4X", body:"The commission discussed the Summer School bus Route 4X. No vote count was recorded in the official records." },
      { item:"Apply for Grant 5304", body:"The commission discussed applying for Grant 5304. No vote count was recorded in the official records." },
      { item:"Director's Reports", body:"The Director provided updates on the GMV contract, the Feasibility Study, and announced a WISGO Technology Demo scheduled for May 7th. This was an informational item with no action required." },
    ],
    publicComment: "Public comment was on the agenda with reading of the City of Wausau Public Comment Statement.",
    actionItems: [
      "WISGO Technology Demo scheduled for May 7th",
      "Continued work on GMV contract and Feasibility Study",
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
    id: "xy5kzZNqLEI", source: "wausau",
    title: "Wausau Public Health & Safety Committee Meeting",
    date: "April 16, 2026", shortDate: "APR 16",
    committee: "Public Health & Safety", duration: "~1h",
    url: "https://www.youtube.com/watch?v=xy5kzZNqLEI",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2068/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Public Health & Safety Committee approved all license applications including a Class I Special Event License for Wausau Summer Shindig with a recommendation for $16,000 in road-blocking equipment funding. The committee also received quarterly reports from the Police Department, reviewed tavern activities, and heard from the Community Outreach Specialist.",
    agenda: [
      { time:"N\/A", item:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement" },
      { time:"N\/A", item:"Consideration of the minutes of the preceding meeting(s) - March 23, 2026 Regular Public Health & Safety Committee Minutes" },
      { time:"N\/A", item:"Approval or denial of various license applications" },
      { time:"N\/A", item:"Wausau Police Department Quarter 1 2026 Report" },
      { time:"N\/A", item:"Tavern Activities Report from March 2026" },
      { time:"N\/A", item:"Community Outreach Specialist Report" },
    ],
    discussions: [
      { item:"March 23, 2026 Regular Public Health & Safety Committee Minutes", body:"Approved 5-0. Motion moved by Sarah Watson and seconded by Carol Lukens. All five committee members voted in favor." },
      { item:"Approval or denial of various license applications", body:"The committee took three separate votes on license applications. First, they approved licenses as indicated by staff with exceptions for Theodore Davis and Wausau Summer Shindig. Then they separately approved Theodore Davis for a New Bartender\/Operator License. Finally, they approved the Wausau Summer Shindig application for a Class I Special Event License with a recommendation to the Finance Committee to fund approximately $16,000 in road-blocking equipment." },
      { item:"Wausau Police Department Quarter 1 2026 Report", body:"Discussion item presented to the committee. No vote was taken as this was an informational report." },
      { item:"Tavern Activities Report from March 2026", body:"Discussion item presented to the committee. No vote was taken as this was an informational report." },
      { item:"Community Outreach Specialist Report", body:"Discussion item presented to the committee. No vote was taken as this was an informational report." },
    ],
    publicComment: "Public comment on agenda items was listed on the agenda along with reading of the City of Wausau Public Comment Statement.",
    actionItems: [
      "All license applications approved as indicated by staff",
      "Theodore Davis approved for New Bartender\/Operator License",
      "Wausau Summer Shindig approved for Class I Special Event License",
      "Recommendation sent to Finance Committee to fund approximately $16,000 for road-blocking equipment for Summer Shindig event",
      "Chair Lisa Rasmussen thanked for her leadership",
    ],
    civicItems: [
      { number:"1", name:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"2", name:"Consideration of the minutes of the preceding meeting(s).", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Carol Lukens", yes:["Lisa Rasmussen", "Lou Larson", "Becky McElhaney ", "Sarah Watson", "Carol Lukens"], no:[], abstain:[] }], docs:[], children:[
      { number:"a", name:"Regular Public Health & Safety Committee Minutes", votes:[], docs:[{ name:"PublicHealth&Safety_Regular_03232026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6778)" }], children:[] },
    ] },
      { number:"3", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Approval or denial of various license applications.", votes:[{ motion:"approve or deny licenses as indicated by staff with the exception of Theodore Davis and the Wausau Summer Shindig", passed:true, initiator:"Carol Lukens", seconder:"Sarah Watson", yes:["Lisa Rasmussen", "Lou Larson", "Becky McElhaney ", "Sarah Watson", "Carol Lukens"], no:[], abstain:[] }, { motion:"approve the license of Theodore Davis for New Bartender\/Operator License", passed:true, initiator:"Sarah Watson", seconder:"Lou Larson", yes:["Lisa Rasmussen", "Lou Larson", "Becky McElhaney ", "Sarah Watson", "Carol Lukens"], no:[], abstain:[] }, { motion:"approve the license of the Wausau Summer Shindig application for a Class I Special Event License with the recommendation to the Finance Committee to fund equipment to  block off roads with equipment at a cost of approximately $16,000", passed:true, initiator:"Lou Larson", seconder:"Sarah Watson", yes:["Lisa Rasmussen", "Lou Larson", "Sarah Watson", "Carol Lukens"], no:["Becky McElhaney "], abstain:[] }], docs:[{ name:"License List", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6805)" }], children:[] },
    ] },
      { number:"4", name:"Discussion.", votes:[], docs:[], children:[
      { number:"a", name:"Wausau Police Department Quarter 1 2026 Report.", votes:[], docs:[{ name:"Police Department Report Q1 2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6821)" }], children:[] },
      { number:"b", name:"Tavern Activities Report from ​March 2026.", votes:[], docs:[{ name:"March 2026 Tavern Report", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6722)" }], children:[] },
      { number:"c", name:"Community Outreach Specialist Report", votes:[], docs:[{ name:"April Public Health & Safety Committee Report", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6773)" }], children:[] },
    ] },
      { number:"5", name:"Adjournment.", votes:[{ motion:"thank Lisa Rasmussen for her leadership and adjourn", passed:true, initiator:"Sarah Watson", seconder:"Carol Lukens", yes:["Lisa Rasmussen", "Lou Larson", "Becky McElhaney ", "Sarah Watson", "Carol Lukens"], no:[], abstain:[] }], docs:[], children:[] },
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
    overview: "The Wausau Board of Public Works approved all agenda items at its April 21, 2026 meeting, including recommendations for real estate services qualifications for two state highway projects and a $2,338.87 insurance subrogation claim for Kara Blank. The board also approved Pay Estimate #26 for lead service line replacement and issued concrete and paving licenses to local contractors.",
    agenda: [
      { time:"N\/A", item:"April 14, 2026 Regular Board of Public Works Minutes" },
      { time:"N\/A", item:"Statement of Qualifications for Real Estate Services, STH 52 (East Wausau Avenue) Project ID 6999-00-23" },
      { time:"N\/A", item:"Statement of Qualifications for Real Estate Services, Bus. 51 (Grand Avenue) Project ID 6999-02-20" },
      { time:"N\/A", item:"Pay Estimate #26 with Community Infrastructure Partners for replacement of lead service lines" },
      { time:"N\/A", item:"Portland Cement Concrete License: Potrykus Construction, LLC and Miron Construction Co., Inc." },
      { time:"N\/A", item:"Bituminous Concrete Paving License: Miron Construction Co., Inc." },
      { time:"N\/A", item:"Closed Session for deliberating on claims" },
      { time:"N\/A", item:"Reconvene into Open Session to take action on Closed Session items" },
    ],
    discussions: [
      { item:"April 14, 2026 Regular Board of Public Works Minutes", body:"The minutes from the April 14, 2026 meeting were approved. No vote count details were recorded for this item." },
      { item:"Statement of Qualifications for Real Estate Services, STH 52 (East Wausau Avenue) Project ID 6999-00-23", body:"The board approved a recommendation for real estate services qualifications for the STH 52 project. Qualifications were opened on April 14, 2026." },
      { item:"Statement of Qualifications for Real Estate Services, Bus. 51 (Grand Avenue) Project ID 6999-02-20", body:"The board approved a recommendation for real estate services qualifications for the Business 51 Grand Avenue project. Qualifications were opened on April 14, 2026." },
      { item:"Pay Estimate #26 with Community Infrastructure Partners for replacement of lead service lines", body:"The board approved Pay Estimate #26 for ongoing lead service line replacement work with Community Infrastructure Partners." },
      { item:"Portland Cement Concrete License: Potrykus Construction, LLC and Miron Construction Co., Inc.", body:"Portland cement concrete licenses were approved for both Potrykus Construction, LLC and Miron Construction Co., Inc." },
      { item:"Bituminous Concrete Paving License: Miron Construction Co., Inc.", body:"A bituminous concrete paving license was approved for Miron Construction Co., Inc." },
      { item:"American Family Insurance subrogated claim", body:"Following closed session deliberations, the board approved the American Family Insurance subrogated claim on behalf of Kara Blank in the amount of $2,338.87. The motion passed 3-0, moved by Vincent Bonino and seconded by MaryAnne Groat, with Eric Lindman, MaryAnne Groat, and Vincent Bonino voting yes." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Real estate services qualifications recommendations for STH 52 and Bus. 51 projects to proceed",
      "Pay Estimate #26 for lead service line replacement approved for payment",
      "Portland cement concrete licenses issued to Potrykus Construction, LLC and Miron Construction Co., Inc.",
      "Bituminous concrete paving license issued to Miron Construction Co., Inc.",
      "American Family Insurance subrogated claim of $2,338.87 for Kara Blank approved for payment",
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
    overview: "The Wausau Board of Public Works approved all agenda items unanimously, including recommendations for real estate services qualifications for two state highway projects and a $2,338.87 insurance subrogation claim following closed session deliberations. The board also approved Pay Estimate #26 for lead service line replacement and issued construction licenses to Potrykus Construction, LLC and Miron Construction Co., Inc.",
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
      { item:"April 14, 2026 Regular Board of Public Works Minutes", body:"The minutes from the April 14, 2026 meeting were approved. Vote details for mover and seconder were not recorded." },
      { item:"Statement of Qualifications for Real Estate Services, STH 52 (East Wausau Avenue) Project ID 6999-00-23", body:"The board approved the recommendation for real estate services qualifications for the STH 52 project. Qualifications had been opened at the April 14 meeting. Vote details for mover and seconder were not recorded." },
      { item:"Statement of Qualifications for Real Estate Services, Bus. 51 (Grand Avenue) Project ID 6999-02-20", body:"The board approved the recommendation for real estate services qualifications for the Bus. 51 project. Qualifications had been opened at the April 14 meeting. Vote details for mover and seconder were not recorded." },
      { item:"Pay Estimate #26 with Community Infrastructure Partners for replacement of lead service lines", body:"The board approved Pay Estimate #26 for the ongoing lead service line replacement work with Community Infrastructure Partners. Vote details for mover and seconder were not recorded." },
      { item:"Portland Cement Concrete License: Potrykus Construction, LLC and Miron Construction Co., Inc.", body:"The board approved Portland Cement Concrete Licenses for both Potrykus Construction, LLC and Miron Construction Co., Inc. Vote details for mover and seconder were not recorded." },
      { item:"Bituminous Concrete Paving License: Miron Construction Co., Inc.", body:"The board approved a Bituminous Concrete Paving License for Miron Construction Co., Inc. Vote details for mover and seconder were not recorded." },
      { item:"Closed Session and Reconvene into Open Session", body:"Following closed session deliberations on claims, the board reconvened into open session and approved the American Family Insurance subrogated claim on behalf of Kara Blank in the amount of $2,338.87. Approved 3-0, moved by Vincent Bonino, seconded by MaryAnne Groat. Eric Lindman, MaryAnne Groat, and Vincent Bonino voted yes." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Recommendation for real estate services qualifications for STH 52 project forwarded for approval",
      "Recommendation for real estate services qualifications for Bus. 51 project forwarded for approval",
      "Pay Estimate #26 approved for Community Infrastructure Partners lead service line replacement",
      "Portland Cement Concrete Licenses issued to Potrykus Construction, LLC and Miron Construction Co., Inc.",
      "Bituminous Concrete Paving License issued to Miron Construction Co., Inc.",
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
    id: "WhyeLsSdJ7M", source: "wausau",
    title: "Wausau Plan Commission Meeting",
    date: "April 21, 2026", shortDate: "APR 21",
    committee: "Plan Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=WhyeLsSdJ7M",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2106/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Plan Commission approved all action items on the agenda, including a rezoning request for 230 E Thomas Street from Neighborhood Mixed-Use to Two-Flat Residential, a Conditional Use Permit for a personal storage facility at 218 South 4th Street, and the 2027 Comprehensive Plan Public Participation Plan Draft. The commission also held a preliminary discussion on potential code amendments regarding data centers.",
    agenda: [
      { time:"N\/A", item:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement" },
      { time:"N\/A", item:"Consideration of the minutes of the preceding meeting(s) - March 17, 2026 Regular Plan Commission Minutes" },
      { time:"N\/A", item:"Public Hearing: Discussion on rezoning 230 E Thomas Street from NMU to TF-10 zoning district" },
      { time:"N\/A", item:"Discussion and possible action on rezoning 230 E Thomas Street from NMU to TF-10 zoning district" },
      { time:"N\/A", item:"Discussion and possible action on approving a Conditional Use Permit for 218 South 4th Street for a Personal Storage Facility in Light Industrial Zoning District" },
      { time:"N\/A", item:"Discussion and possible action approving the City of Wausau 2027 Comprehensive Plan Public Participation Plan Draft" },
      { time:"N\/A", item:"Preliminary code amendment discussion - data centers" },
    ],
    discussions: [
      { item:"March 17, 2026 Regular Plan Commission Minutes", body:"The commission approved the minutes from the March 17, 2026 meeting. The motion passed." },
      { item:"Rezoning 230 E Thomas Street from NMU to TF-10", body:"Following a public hearing, the commission took action on rezoning 230 E Thomas Street from Neighborhood Mixed-Use to Two-Flat Residential zoning district. The rezoning request was approved." },
      { item:"Conditional Use Permit for 218 South 4th Street - Personal Storage Facility", body:"The commission approved a Conditional Use Permit for Dunwoody Storage to construct a Personal Storage Facility at 218 South 4th Street in the Light Industrial zoning district. The motion passed." },
      { item:"City of Wausau 2027 Comprehensive Plan Public Participation Plan Draft", body:"The commission considered the Public Participation Plan Draft for the 2027 Comprehensive Plan. The item received two passing votes, with the final approval being for the plan as amended." },
      { item:"Preliminary code amendment discussion - data centers", body:"The commission held a preliminary discussion regarding potential code amendments related to data centers. This was a discussion item only with no action taken." },
    ],
    publicComment: "Public comment on agenda items was listed as the first item on the agenda.",
    actionItems: [
      "Rezoning of 230 E Thomas Street from NMU to TF-10 approved - forward to City Council for final action",
      "Conditional Use Permit for personal storage facility at 218 South 4th Street approved for Dunwoody Storage",
      "2027 Comprehensive Plan Public Participation Plan Draft approved as amended",
      "Staff to continue developing code amendment proposals for data centers following preliminary discussion",
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
    overview: "The Wausau Common Council held its organizational meeting for the 2026-2028 term, swearing in elected officials and conducting council elections. The council unanimously approved suspending procedural rules to confirm mayoral appointments and designate the official newspaper, while a motion to postpone committee appointments to the following week failed.",
    agenda: [
      { time:"N\/A", item:"Council Elect seated by Honor Guard, Posting of Colors, Oath of Office for Elected Officials" },
      { time:"N\/A", item:"Common Council Elections: Council President, Plan Commission Member, Water Works Commission Member" },
      { time:"N\/A", item:"Resolution Adopting Robert's Rules of Order and Standing Rules for 2026-2028" },
      { time:"N\/A", item:"Suspend Rule 6(B) Filing and 12(A) Referral of resolutions" },
      { time:"N\/A", item:"Confirming Appointments of the Mayor to Boards, Commissions, and Committees" },
      { time:"N\/A", item:"Resolution Designating Official Newspaper" },
      { time:"N\/A", item:"Mayor's Appointments to Standing Committees for 2026-2028 Term" },
      { time:"N\/A", item:"Announcements from Mayor and Alderpersons" },
    ],
    discussions: [
      { item:"Common Council Elections", body:"The council conducted elections for Council President, Plan Commission member, and Water Works Commission member. Specific vote counts and outcomes for these elections were not recorded in the official vote records." },
      { item:"Resolution Adopting Robert's Rules of Order and Standing Rules for 2026-2028", body:"This resolution was on the agenda but the specific vote outcome was not recorded in the official records." },
      { item:"Suspend Rule 6(B) Filing and 12(A) Referral of resolutions", body:"Approved 11-0. Sarah Watson moved and Bruce Trueblood seconded the motion to suspend procedural rules, allowing immediate consideration of mayoral appointments and the official newspaper designation." },
      { item:"Confirming Appointments of the Mayor to Boards, Commissions, and Committees", body:"Approved by the council. The motion passed confirming Mayor Doug Diny's appointments to various city boards, commissions, and committees." },
      { item:"Resolution Designating Official Newspaper", body:"Approved by the council. The resolution passed designating the official newspaper for city notices." },
      { item:"Mayor's Appointments to Standing Committees for 2026-2028 Term", body:"A motion to suspend Rule 13(A) to postpone committee appointments to the following week failed. The standing committee appointments proceeded as scheduled." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Newly elected council members sworn in and seated for 2026-2028 term",
      "Council President and commission members elected for new term",
      "Robert's Rules of Order and Standing Rules adopted for 2026-2028",
      "Mayoral appointments to boards, commissions, and committees confirmed",
      "Official newspaper designated for city notices",
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
    overview: "The Wausau Police & Fire Commission held its regular meeting with presentations on quarterly operations from both departments, including a Fire Department report on policy changes regarding controlled substances. No formal votes were recorded in the official records for this meeting.",
    agenda: [
      { time:"7:30 AM", item:"Consideration of the minutes of the preceding meeting(s) - March 23, 2026 Regular Police and Fire Commission Minutes" },
      { time:"N\/A", item:"Open for General Agenda Items" },
      { time:"N\/A", item:"Monthly Fire Department Operations Update: Presentation of current Fire Department activities, Report on subsequent policy changes regarding controlled substances, 1st Quarter Report" },
      { time:"N\/A", item:"Monthly Police Department Operations Update: Presentation of current Police Department activities, 1st Quarter Report" },
    ],
    discussions: [
      { item:"March 23, 2026 Regular Police and Fire Commission Minutes", body:"The minutes from the March 23, 2026 meeting were on the agenda for consideration. No vote count or motion details were recorded in the official vote records." },
      { item:"Open for General Agenda Items", body:"The commission opened discussion for general agenda items. No specific actions or votes were recorded in the official records." },
      { item:"Monthly Fire Department Operations Update", body:"The Fire Department presented its 1st Quarter Report, including current department activities and a report on subsequent policy changes regarding controlled substances. This was a presentation item with no recorded vote." },
      { item:"Monthly Police Department Operations Update", body:"The Police Department presented its 1st Quarter Report covering current department activities. This was a presentation item with no recorded vote." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Next meeting scheduled for May 18, 2026",
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
    overview: "The Wausau Room Tax Commission approved six tourism grants totaling over $95,000 for local events and projects, including $20,000 each for Taste N' Glow Balloon Fest, Hmong Wausau Festival, and Big Bull Falls Blues Fest. The commission also approved $25,000 for Sylvan Hill Bike Trail Maintenance and $10,000 for the AirVenture Cup Race, while the City of Wausau's request for portable security bollards was approved at 50% of the requested amount.",
    agenda: [
      { time:"N\/A", item:"Update from the Wausau\/Central Wisconsin Convention & Visitors Bureau" },
      { time:"N\/A", item:"Consideration of the minutes of the preceding meeting(s) - February 9, 2026" },
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
      { item:"Consideration of the minutes of the preceding meeting(s)", body:"The February 9, 2026 Regular Room Tax Commission Minutes were approved 4-0. Motion was moved by Lindsey Lewitzke and seconded by Tim VanDeYacht." },
      { item:"Tourism Grant request from Taste N' Glow Balloon Fest", body:"The commission approved a tourism grant of $20,000 for the Taste N' Glow Fest. The motion passed." },
      { item:"Tourism Grant request from Hmong American Center for Hmong Wausau Festival", body:"The commission approved a tourism grant of $20,000 for the Hmong Wausau Festival. The motion passed." },
      { item:"Tourism Grant request from EAA Chapter 640 for AirVenture Cup Race", body:"The commission approved a tourism grant of $10,000 for the AirVenture Cup Race. The motion passed." },
      { item:"Tourism Grant request from Wausau Events for Big Bull Falls Blues Fest", body:"The commission approved a tourism grant of $20,000 for the Big Bull Falls Blues Fest. The motion passed." },
      { item:"Tourism Grant request from CWOCC for Sylvan Hill Bike Trail Maintenance", body:"The commission approved a tourism grant of $25,000 for Sylvan Hill Bike Trail Maintenance. The motion passed." },
      { item:"Tourism Grant request from City of Wausau for portable security bollards", body:"The commission approved funding at 50% of the monetary request for event portable security bollards. The motion passed." },
      { item:"2026 Financial Projection", body:"The 2026 Financial Projection was discussed by the commission. No vote record was indicated for this item." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Disburse $20,000 tourism grant to Taste N' Glow Balloon Fest",
      "Disburse $20,000 tourism grant to Hmong American Center for Hmong Wausau Festival",
      "Disburse $10,000 tourism grant to EAA Chapter 640 for AirVenture Cup Race",
      "Disburse $20,000 tourism grant to Wausau Events for Big Bull Falls Blues Fest",
      "Disburse $25,000 tourism grant to CWOCC for Sylvan Hill Bike Trail Maintenance",
      "Disburse approved amount (50% of request) to City of Wausau for portable security bollards",
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
    overview: "The Board of Public Works approved the previous meeting minutes but the proposal opening for Hand Labor Mowing Services for years 2026 through 2030 failed to pass. The meeting had an unusual adjournment vote record showing a 2-0 failed motion.",
    agenda: [
      { time:"N\/A", item:"April 21, 2026 Regular Board of Public Works Minutes" },
      { time:"N\/A", item:"Open proposals for Hand Labor Mowing Services for years 2026 through 2030" },
    ],
    discussions: [
      { item:"April 21, 2026 Regular Board of Public Works Minutes", body:"The minutes from the April 21, 2026 Regular Board of Public Works meeting were approved. Vote details including mover and seconder were not recorded." },
      { item:"Open proposals for Hand Labor Mowing Services for years 2026 through 2030", body:"The motion to open proposals for Hand Labor Mowing Services for years 2026 through 2030 failed. Specific vote count and names of mover\/seconder were not recorded in the vote records." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Hand Labor Mowing Services proposal opening did not advance - item may need to be reconsidered at future meeting",
      "Previous meeting minutes from April 21, 2026 officially approved",
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
    overview: "The Wausau Common Council approved mayoral appointments to multiple city boards and passed a consent agenda including bike rack request forms and special assessments for 2025 street projects, all by unanimous 11-0 votes. An ordinance to amend the Standing Rules of the Common Council saw contentious debate with multiple failed motions, though amendments proposed by Alder Watson and Alder Tierney passed.",
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
      { time:"N\/A", item:"Confirming Appointments of the Mayor to the Historic Preservation Commission, Sustainability, Energy & Environment Committee, Business Improvement District Board, Community Development Authority Board and Ethics Board" },
    ],
    discussions: [
      { item:"Meeting Minutes", body:"Minutes from March 24, 2026 and April 14, 2026 Regular Common Council meetings were approved 11-0. Sarah Watson moved and Tom Neal seconded the motion." },
      { item:"Consent Agenda - Bike Rack Request Form and Special Assessments", body:"The consent agenda passed unanimously 11-0, approving the Joint Resolution for the Bike Rack Request Form and the Resolution Levying Special Assessments for 2025 Street Construction Projects. Sarah Watson moved and Bruce Trueblood seconded." },
      { item:"Ordinance to Amend Standing Rules of the Common Council", body:"This item saw extensive procedural debate. The motion to suspend Rule 11(A) Referral of ordinances passed 8-3, but the motion to suspend Rule 21 Amending of the Rules failed 5-6. The motion to approve the ordinance as amended failed, as did a motion to refer it back to the Rules Review Committee. Amendments proposed by Alder Watson and Alder Tierney passed, while an amendment proposed by Alder Neal failed." },
      { item:"Confirming Mayoral Appointments", body:"The Council approved the Mayor's appointments to the Historic Preservation Commission, Sustainability, Energy & Environment Committee, Business Improvement District Board, Community Development Authority Board, and Ethics Board. The motion passed." },
    ],
    publicComment: "Public comment was on the agenda both before the business meeting (preregistered citizens) and after the business meeting.",
    actionItems: [
      "Bike Rack Request Form approved for use by Bicycle & Pedestrian Advisory Committee",
      "Special assessments levied for 2025 street construction projects",
      "Mayoral appointments to Historic Preservation Commission, Sustainability, Energy & Environment Committee, Business Improvement District Board, Community Development Authority Board, and Ethics Board confirmed",
      "Amendments to Ordinance 02-0432 regarding Standing Rules subject to attorney review per Alder Watson and Alder Tierney amendments",
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
    overview: "Based on the published agenda, this Marathon County Organizational Meeting was scheduled for April 21, 2026. The specific agenda items were not provided in the source document, so details about what the meeting was set to address cannot be determined from the available information.",
    agenda: [
      { time:"N\/A", item:"Organizational meeting items - specific agenda not provided in source document" },
    ],
    discussions: [
      { item:"Organizational Meeting Business", body:"The meeting was scheduled as an organizational meeting for Marathon County. Specific items to be discussed could not be determined as the detailed agenda content was not provided in the source material." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Organizational meeting business was scheduled - specific action items could not be determined from available information",
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
    overview: "Based on the published agenda, the Marathon County Regular Meeting on April 28, 2026 was scheduled to address routine county business. The specific agenda items are not available from the provided information, as only the meeting packet link was included without detailed agenda content.",
    agenda: [
      { time:"N\/A", item:"Meeting agenda details not available - only packet link provided" },
    ],
    discussions: [
      { item:"County Business", body:"The meeting was scheduled to address regular Marathon County business matters. Specific discussion items were not detailed in the provided agenda information. The full meeting packet was made available through the county website." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Specific action items not available from provided agenda information",
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
    overview: "Based on the published agenda, the Wausau School District Board of Education's Committee of the Whole was scheduled to address several action items including facility fee amendments for artificial fields, a nutrition purchasing cooperative agreement, and a comprehensive NEOLA policy update covering over 60 policies. The meeting was also expected to feature a referendum budget update and recognition of Stettin Elementary through the Excellence in Action program.",
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
      { item:"Excellence in Action: Stettin Elementary", body:"The board was scheduled to recognize Stettin Elementary through the district's Excellence in Action program. This recognition segment typically highlights achievements and best practices at featured schools." },
      { item:"Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP)", body:"With an estimated 5-minute presentation, the board was expected to consider approval of continued membership in the Wisconsin School Nutrition Purchasing Cooperative for the 2026-2027 school year. The WiSNP Co-op requested member districts to present the resolution to their respective boards for approval." },
      { item:"Facility Fees", body:"Ryan Urmanski, Director of Buildings and Grounds, was scheduled to present for approximately 10 minutes on amending the current Wausau School District Facility Use Fee Schedule. The proposed amendment was expected to add costs for use of artificial fields and field lighting for requested events, with immediate implementation if approved." },
      { item:"Referendum Budget Update", body:"Elizabeth Channel, Interim Assistant Superintendent of Operations, was scheduled to present a 10-minute update on the status of the Referendum Budget. This update was expected to provide the board with current financial information related to the district's referendum projects." },
      { item:"NEOLA UPDATE", body:"The committee was scheduled to review proposed changes to numerous district policies during an estimated 20-minute session. The policy updates ranged from technical corrections to more substantive changes across categories including board governance, student policies (cell phones, academic honesty, third grade promotion), financial policies, school support organization policies, and new policies addressing artificial intelligence and Act 57 related to child abuse and neglect reporting." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Board was expected to vote on approval of the February 23, 2026 committee minutes",
      "Action was requested for continued membership in the Wisconsin School Nutrition Purchasing Cooperative (WiSNP) for 2026-2027",
      "Action was requested to amend the Facility Use Fee Schedule to include artificial field and lighting costs",
      "Action was requested on proposed NEOLA policy updates covering board governance, student policies, financial policies, school support organization policies, and technical corrections",
      "Action was requested on Act 57 related policies addressing student supervision and welfare and child abuse and neglect",
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
    overview: "Based on the published agenda, this meeting was scheduled to address the verification of school board election results for the Wausau School District. This procedural meeting appears to have been focused solely on confirming the outcomes of the recent board elections, which is a routine but essential step in the democratic governance of the district.",
    agenda: [
      { time:"N\/A", item:"VERIFY SCHOOL BOARD ELECTION RESULTS" },
    ],
    discussions: [
      { item:"VERIFY SCHOOL BOARD ELECTION RESULTS", body:"The board was scheduled to verify the results of the school board election. This procedural item was expected to formally confirm the election outcomes and certify the winners who would serve on the Wausau School District Board of Education." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Board was expected to verify and certify the school board election results",
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
  { date:"2026-04-29", time:"4:00 PM", name:"Historic Preservation Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2216/overview", source:"wausau" },
  { date:"2026-05-04", time:"5:15 PM", name:"Parks & Recreation Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2056/overview", source:"wausau" },
  { date:"2026-05-05", time:"11:00 AM", name:"Water Works Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2191/overview", source:"wausau" },
  { date:"2026-05-05", time:"2:00 PM", name:"Board of Public Works Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2331/overview", source:"wausau" },
  { date:"2026-05-05", time:"5:30 PM", name:"Economic Development Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1991/overview", source:"wausau" },
  { date:"2026-05-07", time:"5:00 PM", name:"Sustainability, Energy & Environment Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2168/overview", source:"wausau" },
  { date:"2026-05-11", time:"7:30 AM", name:"Police & Fire Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2147/overview", source:"wausau" },
  { date:"2026-05-11", time:"4:45 PM", name:"Human Resources Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2029/overview", source:"wausau" },
  { date:"2026-05-11", time:"4:45 PM", name:"Human Resources Committee", url:"https://wausauwi.portal.civicclerk.com/event/2295/overview", source:"wausau" },
  { date:"2026-05-12", time:"5:30 PM", name:"Finance Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2004/overview", source:"wausau" },
  { date:"2026-05-12", time:"6:30 PM", name:"Common Council Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1965/overview", source:"wausau" },
  { date:"2026-05-13", time:"4:00 PM", name:"Building Advisory Board Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2329/overview", source:"wausau" },
  { date:"2026-05-13", time:"6:00 PM", name:"Airport Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1952/overview", source:"wausau" },
  { date:"2026-05-14", time:"5:15 PM", name:"Infrastructure & Facilities Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2043/overview", source:"wausau" },
  { date:"2026-05-18", time:"5:15 PM", name:"Public Health & Safety Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2069/overview", source:"wausau" },
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
