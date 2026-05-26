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
    id: "j64Gj2ean2k", source: "weston",
    title: "Public Works Committee",
    date: "May 26, 2026", shortDate: "MAY 26",
    committee: "Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=j64Gj2ean2k",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_05262026-1920",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Public Works Committee approved several infrastructure items including a state transportation funding resolution, awarded a recycled asphalt crushing contract to King Gravel for $126,900, and directed staff to develop enforcement language for sewer discharge violations. The committee also approved construction agreements for the Military Road project and construction services for upcoming road projects.",
    agenda: [
      { time:"0:09", item:"Call to order" },
      { time:"0:27", item:"Pledge of allegiance" },
      { time:"0:55", item:"Roll call" },
      { time:"1:09", item:"Public comment" },
      { time:"1:15", item:"Approval of April 13, 2026 meeting minutes" },
      { time:"1:30", item:"Acknowledge April 2026 water and sewer permits" },
      { time:"1:45", item:"CIP update" },
      { time:"20:00", item:"Street operations update" },
      { time:"30:01", item:"Utility operations update" },
      { time:"45:01", item:"2025 Water Utility PSC annual report review" },
      { time:"50:00", item:"Resolution 2026-014 transportation funding" },
      { time:"55:04", item:"Recycled asphalt crushing contract award" },
      { time:"1:00:01", item:"Sanitary sewer discharge violation discussion" },
    ],
    discussions: [
      { item:"CIP Update", body:"Michael reported the village received a Local Road Improvement Grant for Birch Street reconstruction between Schofield Avenue and Community Center Drive, originally a 2029 project now likely moving to 2028. The grant covers over 50% of the estimated $1.5 million project cost. Michael noted the village has received over $9 million in grant funding over the past 4-5 years. Discussion also covered Weston Avenue repairs by Integrity Grading and Excavating for road settlement issues over the sanitary sewer trench, with understanding that repairs may need to continue if settlement recurs." },
      { item:"Street Operations Update", body:"Staff reported on spring activities including removal of road limits on April 29th with Marathon County, mailbox and sign repairs, dewatering operations near Weston Avenue tributary for about a week due to flooding, spring curb line sweeping, hot mix patching, and storm damage cleanup from a tornado that damaged trees near East Nick. Jones Street culverts failed requiring installation of a third 18-inch culvert. Equipment maintenance included removing plow equipment, servicing mowers, and preparing vehicles for summer operations." },
      { item:"Utility Operations Update", body:"Josh reported on water service repair at Caribou Coffee, ongoing well work, and significant clear water infiltration issues in the sanitary sewer system. In April, 37 million gallons entered the water distribution system but 53-54 million gallons were treated at the wastewater plant, indicating approximately 15 million gallons of clear water infiltration. Staff identified residents discharging sump pumps into sanitary sewers, including one house on Kathleen that was causing a small lift station to run almost continuously. In-pipe technologies will conduct an infiltration study in the annexed area." },
      { item:"2025 Water Utility PSC Annual Report", body:"Michael reviewed the annual report showing operating revenues of approximately $3 million, net operating income of $482,911 (similar to 2024's $490,000), and water loss at 6%. The utility value increased to nearly $34 million with $6.7 million in infrastructure placed in service including wells 7 and 8 and PFAS-related work. The utility serves 6,100 customers total with 5,250 in Weston and 830 in Rothschild. Motion to acknowledge passed unanimously." },
      { item:"Resolution 2026-014 Transportation Funding", body:"Michael explained this League of Wisconsin Municipalities sample resolution supports long-term transportation funding solutions at the state level. Current state funding doesn't cover local transportation needs for street maintenance and snow plowing, requiring general tax subsidies. Wisconsin remains affordable compared to neighboring states for automobile ownership costs. Motion to recommend village board adoption passed unanimously." },
      { item:"Recycled Asphalt Crushing Contract", body:"Michael presented quotes for crushing recycled concrete and asphalt at the Ryan Street site. King Gravel was low bidder at $4.23\/ton versus $4.25\/ton from the next bidder. Estimated 30,000 tons equals $126,900 total cost. Michael demonstrated savings of approximately $11\/cubic yard compared to City of Wausau costs, saving about $130,000 across this year's projects. Motion to award to King Gravel passed unanimously." },
      { item:"Sanitary Sewer Discharge Violations", body:"Committee discussed enforcement of sewer ordinance violations for residents discharging clear water (primarily sump pumps) into sanitary sewers. Current code allows fines of $100-$1,000 per day per violation. Committee discussed distinguishing between unknowing and willful violations. Staff will wait for in-pipe technologies study results, then send notices giving 30-60 days to correct issues. Committee directed staff to create enforcement language with fines not to exceed $100 per day for first offenses. Motion passed unanimously." },
      { item:"Radkey Avenue Water\/Sewer Connection Agreement", body:"A builder wants to construct a duplex on lot 1 at 2230 Radkey Avenue. Current water\/sewer mains dead-end at the west end of Radkey. Committee approved temporary long lateral services until Radkey Avenue reconstruction, when the owner will pay assessment for main extension. Committee amended the agreement to specify reconstruction no later than 2029. Motion passed unanimously." },
      { item:"Military Road Construction Agreement", body:"Committee approved intergovernmental agreement with Village of Rothschild for Military Road construction from Wolfman Street to Helin Street. Rothschild holds contract with Steam Construction and is responsible for street and storm items; Weston responsible for water and sewer at estimated cost of $94,860 ($6,156 sanitary sewer, $88,704 water main). Water main relocation needed due to storm sewer conflicts. Motion passed unanimously." },
      { item:"Construction Services for Alderson\/Jelinek and Bladel Projects", body:"Michael presented proposals for construction inspection services since the engineering tech position remains vacant. For Alderson\/Jelinek intersection (roundabout), MSA proposed $37,315 versus Clark Dietz at $48,910; staff recommended MSA. For Bladel Avenue, MSA proposed $70,400 (using summer intern) versus Clark Dietz at $73,730 (full-time staff); staff recommended Clark Dietz for the extra experience at similar cost. Motion to approve both recommendations passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Staff to finalize Radkey Avenue connection agreement with reconstruction deadline of no later than 2029",
      "Staff to create enforcement language for sanitary sewer discharge violations with fines not to exceed $100 per day",
      "Award 2026 recycled asphalt crushing contract to King Gravel at $4.23\/ton (estimated $126,900)",
      "Forward Resolution 2026-014 supporting state transportation funding to village board",
      "Approve intergovernmental agreement with Rothschild for Military Road project at estimated village cost of $94,860",
      "Approve MSA for Alderson\/Jelinek construction services ($37,315) and Clark Dietz for Bladel Avenue construction services ($73,730)",
      "Special assessment meeting scheduled for Thursday, May 28, 2026 at 6:00 PM for Bladel Avenue project",
      "Staff to provide cost analysis of clear water infiltration impact on wastewater treatment costs",
      "Norcon to begin Schofield Avenue concrete repairs in eastbound lanes starting Wednesday\/Thursday",
    ],
  },
  {
    id: "eX7VOuywzb8", source: "weston",
    title: "Plan Commission",
    date: "May 26, 2026", shortDate: "MAY 26",
    committee: "Plan Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=eX7VOuywzb8",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_05262026-1920",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Plan Commission approved site plans for the new Mountain Bay Metropolitan Police Department and Municipal Court facility at 3600 Community Center Drive, and adopted a new salt storage shed inspection program for wellhead protection areas. The meeting also addressed coordination challenges with a gas pipeline on the police department site and scheduled the first steering committee meeting for the comprehensive plan update.",
    agenda: [
      { time:"0:01", item:"Call to order and roll call" },
      { time:"1:18", item:"Open public comment period" },
      { time:"4:38", item:"Disclosure and recusal" },
      { time:"4:50", item:"Approval of April 13, 2026 meeting minutes" },
      { time:"5:22", item:"Site plan review - Mountain Bay Metro Police Department and Municipal Court facility at 3600 Community Center Drive" },
      { time:"19:24", item:"Creation of salt storage shed inspection program for wellhead protection district" },
      { time:"28:05", item:"April 2026 staff approved certified survey maps and site plans" },
      { time:"28:18", item:"April 2026 building permits" },
      { time:"28:32", item:"Planning and development department monthly project update report" },
      { time:"30:25", item:"Commissioner remarks" },
      { time:"31:02", item:"Future agenda items and staff comments" },
      { time:"34:29", item:"Adjournment" },
    ],
    discussions: [
      { item:"Site plan review - Mountain Bay Metro Police Department and Municipal Court facility", body:"Staff presented the site plan for the new police department and municipal court at 3600 Community Center Drive. The building was rotated to address challenges with a 36-inch gas pipeline running through the property - the building is now oriented with parking over the pipeline (acceptable to the gas company) while the building sits on higher ground to minimize fill costs. Police Chief Jeremy explained the facility will accommodate 50-60 officers (current staffing is 40 officers and 4 clerical staff) with expansion possible to the north. Discussion addressed an optional storage shed for evidence overflow, with commissioners suggesting it be placed further north to allow future building expansion. Motion to approve was made and passed unanimously with conditions 2-5 as listed in staff recommendations." },
      { item:"Salt storage shed inspection program for wellhead protection district", body:"Staff presented a new inspection program requiring two annual inspections of salt storage facilities within wellhead protection areas - a warm weather inspection focused on structural integrity and a winter operational inspection focused on material handling and containment. Jennifer noted at least one existing facility near Sternberg has never gone through the wellhead protection conditional use process and is closest to the village well. Commissioners agreed staff should reach out to that facility about compliance. Commissioner noted the village wells are shallow (90-110 feet) in sandy soil making them susceptible to contamination. Motion to approve the program with reporting back to both Plan Commission and Public Works passed unanimously." },
      { item:"April 2026 meeting minutes", body:"Motion to approve the April 13, 2026 meeting minutes as presented was made and seconded. Approved unanimously without discussion." },
      { item:"Monthly project update and comprehensive plan steering committee", body:"Jennifer announced the first meeting of the joint Plan Commission-Village Board steering committee for the comprehensive plan update is scheduled for Monday, June 1st at 5:00 p.m. Staff will send email notification and calendar invites." },
      { item:"Future agenda items", body:"Electric vehicle charging stations will be a future agenda item, likely in the fall. A commissioner asked about potential residential TIF districts for workforce housing development. Staff indicated Ehlers has prepared a presentation on residential TIF qualifications that could be shared with the commission, possibly incorporated into the comprehensive plan process." },
    ],
    publicComment: "Jim Pensel of 5002 Arrow Street, Weston, spoke via remote connection. He asked the Plan Commission to exercise common sense regarding landscaping requirements for the police department project, referencing previous flexibility shown with the Greenheck Turner building, to avoid unnecessary taxpayer expense. He also requested that the salt storage shed inspection program include annual reporting back to the commission on inspection results, noting some zoning complaints have gone unresolved for years.",
    actionItems: [
      "Site plan for Mountain Bay Metro Police Department and Municipal Court facility at 3600 Community Center Drive approved with staff conditions",
      "Salt storage shed inspection program adopted for wellhead protection district with twice-annual inspections",
      "Staff to report inspection findings to both Plan Commission and Public Works committee annually",
      "Staff to reach out to existing salt storage facility near Sternberg about wellhead protection compliance",
      "First comprehensive plan steering committee meeting scheduled for June 1st at 5:00 p.m.",
      "Staff to send email and calendar invites for steering committee meeting",
      "Electric vehicle charging station regulations to be addressed in fall agenda",
    ],
  },
  {
    id: "ZzEeG1Z64pg", source: "marathon",
    title: "Marathon County Health & Human Services Committee Meeting",
    date: "May 26, 2026", shortDate: "MAY 26",
    committee: "Health & Human Services", duration: "~1h",
    url: "https://www.youtube.com/watch?v=ZzEeG1Z64pg",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18402/639132213564100000",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Health & Human Services Committee held an orientation meeting for new board members, featuring educational presentations from department heads on the Health Department, Social Services, Veteran Services, and the Aging Disability Resource Center. The committee approved the April 1st meeting minutes unanimously and received detailed overviews of each department's mission, budget structure, and current initiatives.",
    agenda: [
      { time:"0:00", item:"Call to order and verification of remote participation" },
      { time:"0:30", item:"Pledge of Allegiance" },
      { time:"1:00", item:"Approval of April 1st committee meeting minutes" },
      { time:"1:45", item:"Review of operational functions required by statute" },
      { time:"3:00", item:"Review of standing committee ordinance, missions, duties and responsibilities" },
      { time:"10:00", item:"Health Department educational presentation" },
      { time:"25:00", item:"Social Services Department overview" },
      { time:"50:00", item:"Veteran Service Department presentation" },
      { time:"1:15:00", item:"Aging Disability Resource Center presentation" },
      { time:"1:30:00", item:"Next meeting scheduling and adjournment" },
    ],
    discussions: [
      { item:"Approval of April 1st meeting minutes", body:"Supervisor Cavelli made a motion to approve the minutes, seconded by Vice Chair Rosenberg. The motion carried unanimously with all members voting in favor." },
      { item:"Standing committee ordinance and structure review", body:"Administrator Lance Leonard explained the committee's jurisdiction over the Health Department, Social Services, Veteran Services, North Central Health Care, and the Aging Disability Resource Center. He outlined statutory relationships with boards including the Social Services Board, Veteran Service Commission, Transportation Coordinating Committee, and Board of Health. Chair Boots noted the committee will focus on strategic plan development through December 2025." },
      { item:"Health Department presentation", body:"Health Officer Caitlyn Suginaka presented an overview of the department's four divisions: environmental health, nursing, community health improvement, and administration. She highlighted 37.6 FTE positions, oversight of 1,200+ licenses, a new homeless system response position, and public health vending machines stocked with free resources including tick kits. Administrator Leonard noted approximately half of the department's $5 million budget comes from tax levy, with the remainder from grants and fees." },
      { item:"Social Services Department overview", body:"Administrator Leonard presented on behalf of Director Christa, explaining the department's approximately 140 FTE positions and $22 million budget with about $7 million from tax levy. He highlighted the successful Family Keys housing stability pilot program conducted with state funding, noting the program addressed root causes of housing instability for families involved in child welfare and youth justice systems." },
      { item:"Veteran Service Department presentation", body:"Veteran Service Officer Aaron Galindo reported his 3.0 FTE office had 8,149 interactions in 2025, up significantly from previous years. He noted $44 million annually flows to local veterans through benefits, with $2.6 million in retroactive payments in 2025 alone. Key initiatives include pursuing surviving spouse benefits under the PACT Act, housing stability partnerships with the Center for Veterans Issues, and suicide prevention efforts following 7 veteran suicides among 30 total county suicides in 2025." },
      { item:"Aging Disability Resource Center presentation", body:"Executive Director Mike Ray explained the ADRC serves four counties (Marathon, Lincoln, Langlade, and Wood) with approximately 60 FTE and 385-400 volunteers. He noted significant financial challenges with nutrition program costs rising 40-45% over four years while federal funding remained flat. Marathon County's contribution is $413,135, with only 11% of the ADRC budget coming from county levy." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "April 1st meeting minutes approved",
      "North Central Healthcare to be scheduled for a separate full presentation before the committee",
      "ADRC Executive Director to provide full annual report presentation to county board",
      "Strategic plan development to be a focus for the committee through December 2025",
      "Next meeting scheduled for Tuesday, June 3rd at 3:00 PM (corrected from initially stated May 29th)",
    ],
  },
  {
    id: "WD9kixgx6oY", source: "marathon",
    title: "Marathon County Regular Meeting",
    date: "May 26, 2026", shortDate: "MAY 26",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=WD9kixgx6oY",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18350/639126184295330000",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board of Supervisors held an adjourned organizational meeting where they approved committee appointments, elected Supervisors Hapa and Arstead to the Executive Committee, and unanimously approved a resolution modifying landfill tipping fees to provide relief for residents affected by recent severe weather and tornado damage in the Ringle area.",
    agenda: [
      { time:"0:00", item:"Pledge of Allegiance and moment of reflection" },
      { time:"2:00", item:"Roll call and sign-in" },
      { time:"5:01", item:"Committee appointments presentation and vote" },
      { time:"10:01", item:"Election of at-large Executive Committee members" },
      { time:"20:00", item:"Consent agenda items C10-C14A" },
      { time:"20:45", item:"Resolution 24-26: Out of home placement reserve increase" },
      { time:"21:30", item:"Resolution 25-26: Amend social services budget" },
      { time:"22:00", item:"Resolution 26-26: Modification to landfill tipping fees" },
      { time:"1:10:02", item:"Vote on landfill tipping fee resolution" },
      { time:"1:12:00", item:"Announcements and adjournment" },
    ],
    discussions: [
      { item:"Committee Appointments", body:"Chair Gibbs presented committee appointments developed with Vice Chair Boots, emphasizing goals of increasing diverse perspectives, developing leadership among newer supervisors (34% in first or second term), and honoring supervisor preferences. The motion was made by Supervisor Cavelli, seconded by Supervisor Crims. The motion carried but was not unanimous." },
      { item:"Election of At-Large Executive Committee Members", body:"Three supervisors were nominated: Supervisor Hapa (nominated by Supervisor Mask), Supervisor Leur (nominated by Supervisor Rosenberg, who cited her advocacy for 'smallest children and oldest elders'), and Supervisor Arstead (nominated by Vice Chair Boots). Paper ballots were distributed for supervisors to select two candidates. Supervisors Hapa and Arstead were elected to the Executive Committee." },
      { item:"Resolution 26-26: Modification to Landfill Tipping Fees", body:"Administrator Leonard and Solid Waste Director Hagen Busher presented a proposal to reduce landfill tipping fees for storm debris following severe weather that caused significant damage in Ringle and surrounding areas. The state waived $13.10 per ton, Ringle waived $2.33, and the county proposed reducing fees to $36.94 (covering operational costs). Two residents, Jessica Toasty and Matt Haybeck, were granted special dispensation to speak, requesting the county waive fees entirely and extend the relief period to six months. After extensive discussion about costs, precedent, and insurance considerations, the board unanimously approved suspending rules to consider the resolution, then unanimously approved the modified tipping fee structure." },
    ],
    publicComment: "Two residents were granted special dispensation to speak on the landfill tipping fee resolution. Jessica Toasty asked the county to waive fees entirely for six months, noting the state, DNR, and Ringle are all waiving their portions and that private businesses have donated significant resources. Matt Haybeck spoke on behalf of approximately 44 affected homeowners, requesting fee relief for underinsured residents still waiting for insurance adjusters.",
    actionItems: [
      "Committee appointments approved as presented by Chair Gibbs and Vice Chair Boots",
      "Supervisors Hapa and Arstead elected to at-large Executive Committee positions",
      "Resolution 24-26 (out of home placement reserve increase) approved, not unanimous",
      "Resolution 25-26 (social services budget amendment) approved, not unanimous",
      "Resolution 26-26 (landfill tipping fee modification) approved unanimously - reduced fees for storm debris through June 17, 2025",
      "Administrator to work with Community Foundation on potential reimbursement mechanism for unreimbursed debris disposal costs",
      "Solid Waste Management Board to develop long-term policy on disaster-related tipping fee relief within six months",
    ],
  },
  {
    id: "OLzrpSp3Dfg", source: "marathon",
    title: "Marathon County Environmental Resources Committee Meeting",
    date: "May 26, 2026", shortDate: "MAY 26",
    committee: "Environmental Resources", duration: "~1h",
    url: "https://www.youtube.com/watch?v=OLzrpSp3Dfg",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18384/639131339701200000",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Environmental Resources Committee approved two rezoning petitions unanimously and voted to forward a modified fee waiver resolution to the county board that will only waive reconnect fees for septic systems on properties damaged by the April 17, 2026 tornado. The committee also received educational presentations from Solid Waste, Parks Recreation and Forestry, and Conservation Planning and Zoning departments.",
    agenda: [
      { time:"0:00", item:"Call to order and Pledge of Allegiance" },
      { time:"0:35", item:"Public comment" },
      { time:"0:45", item:"Approval of March 31st, 2026 committee minutes" },
      { time:"1:05", item:"Public hearing - Tim Veland rezoning petition (urban residential\/general agriculture to rural residential, Town of Green Valley)" },
      { time:"13:05", item:"Public hearing - Jeffrey and Cynthia Schmidtz rezoning petition (conservancy recreation to general agriculture, Town of McMillan)" },
      { time:"19:30", item:"Consideration of fee waiver for properties impacted by April 17, 2026 severe weather" },
      { time:"55:02", item:"Educational presentation - Solid Waste Department overview" },
      { time:"1:20:00", item:"Educational presentation - Parks, Recreation and Forestry Department overview" },
      { time:"1:35:02", item:"Educational presentation - Conservation Planning and Zoning Department overview" },
    ],
    discussions: [
      { item:"Approval of March 31st, 2026 committee minutes", body:"Supervisor Sefeld made a motion to approve the minutes, seconded by Supervisor Drebeck. The motion carried unanimously with no discussion." },
      { item:"Tim Veland rezoning petition - Town of Green Valley", body:"Land Use Specialist Garrett Pogle presented the staff report for rezoning from urban residential and general agriculture to rural residential for a proposed land division. The Town of Green Valley recommended approval on March 10, 2026. No public testimony was offered for, against, or as interested. Supervisor Drebeck moved to approve based on findings of fact and the town's approval, seconded by Supervisor Kurt. Motion carried unanimously." },
      { item:"Jeffrey and Cynthia Schmidtz rezoning petition - Town of McMillan", body:"Garrett Pogle presented the petition to rezone from conservancy recreation to general agriculture. Supervisor Leur asked about the conservancy nature of the property; Pogle explained the property contains a home and horse riding stable, and the rezone would make these conforming uses rather than non-conforming. The Town of McMillan recommended approval on April 20, 2026. No public testimony was offered. Supervisor Sefeld moved to approve and forward to county board, seconded by Supervisor Drew. Motion carried unanimously." },
      { item:"Fee waiver for tornado-damaged properties", body:"Director Lori Mskimmons presented a proposal to waive county zoning and septic system fees for properties damaged by the April 17, 2026 tornado, triggered by the governor's emergency declaration. Significant debate ensued. Supervisor Drew questioned where to draw the line for future events. Supervisor Drebeck expressed concern about fairness to property owners hit by disasters in non-declared areas. Supervisor Leur asked about tracking costs and potential levy impacts. Administrator Lance Pliml clarified this would not require a budget amendment. Supervisor Sefeld moved to approve the full resolution; Supervisor Leur seconded. Supervisor Drebeck then moved to amend the resolution to only waive reconnect fees for septic systems (county portion of $160), not other zoning or pouts fees. Supervisor Kurt seconded the amendment. The amendment passed. The amended motion to forward to county board then passed, though not unanimously." },
      { item:"Solid Waste Department presentation", body:"Director David Hagenbusher provided an overview of the department, explaining the landfill's history since 1980, the $13.10 per ton state fee, the renewable natural gas partnership with Vidi Energy generating royalties for the county, and the significant challenge of leachate treatment with new state requirements by 2032. He noted upcoming capital projects totaling millions of dollars and highlighted the clean chemicals collection program and recreational trails on the property." },
      { item:"Parks, Recreation and Forestry Department presentation", body:"County Forest Administrator Tom Lovelin presented on behalf of Director Jamie, covering the department's 44 full-time and 120 seasonal employees serving both city and county. He noted Nine Mile County Forest generates $3.25 million annually from out-of-town visitors. Supervisor Sefeld announced Tom Lovelin is retiring June 1st after nearly 30 years of service, with Joe Tucker selected as the new county forest administrator." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Rezoning for James Offer and David Tract property (urban residential\/general agriculture to rural residential) approved and forwarded to county board",
      "Rezoning for Jeffrey and Cynthia Schmidtz property (conservancy recreation to general agriculture) approved and forwarded to county board",
      "Modified fee waiver resolution (waiving only septic reconnect fees for tornado-damaged properties) forwarded to county board for consideration",
      "CPZ staff to track costs and requests related to fee waiver program",
      "Joe Tucker to assume County Forest Administrator role upon Tom Lovelin's June 1st retirement",
    ],
  },
  {
    id: "Ay3CNwxe6g4", source: "weston",
    title: "Community Life and Public Safety",
    date: "May 26, 2026", shortDate: "MAY 26",
    committee: "Community Life & Public Safety", duration: "~1h",
    url: "https://www.youtube.com/watch?v=Ay3CNwxe6g4",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_05262026-1920",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Community Life and Public Safety Committee took action on several ordinances including recommending approval of nuisance code amendments and e-bike regulations (with addition of emoto restrictions), approved fire inspection requirements for mobile food vendors, authorized a raze order for an abandoned structure, and tabled overnight parking regulation changes for further staff analysis. One resident raised concerns about the new farmers market location and code enforcement accountability.",
    agenda: [
      { time:"0:15", item:"Call to order and Pledge of Allegiance" },
      { time:"0:45", item:"Roll call" },
      { time:"1:00", item:"Public comments" },
      { time:"5:15", item:"Approval of minutes from previous meeting" },
      { time:"5:30", item:"Written communications" },
      { time:"6:00", item:"Department reports - Code Enforcement, Fire\/EMS, Police" },
      { time:"11:30", item:"Proposed amendments to Chapter 50 Nuisances" },
      { time:"13:00", item:"E-bicycle ordinance amendments Chapter 82" },
      { time:"33:30", item:"Overnight parking regulations October 31-May 1" },
      { time:"53:00", item:"Crosswalk request on Alderson Street" },
      { time:"1:01:00", item:"Mobile food vendors fire inspection requirements" },
      { time:"1:10:30", item:"Address corrections for E911 compliance" },
      { time:"1:15:30", item:"Raze order for 4104 Shore Avenue" },
    ],
    discussions: [
      { item:"Department Reports", body:"Code enforcement reported that 3020 Mountain View Avenue will be removed from the enforcement role after property sale and new owner submitted repair permits. Police Chief Hunt reported 2,394 calls in March (77 per day), 410 traffic stops, and 281 citations issued. The department has hired its 40th officer, with the 38th starting recently, 39th in May, and 40th around January. Two SROs work with zoning during summer months. Motion to acknowledge reports 5, 6, and 7 passed unanimously." },
      { item:"Proposed amendments to Chapter 50 Nuisances", body:"Committee confirmed tree limb heights over streets and walkways were corrected to 14 and 10 feet as discussed previously. Language was added requiring compliance with jurisdiction that has authority if different. Motion by Olsen, seconded by Compi, to recommend approval to the Board of Trustees passed unanimously." },
      { item:"E-bicycle ordinance amendments", body:"Chief Hunt strongly advocated prohibiting emotos (electric motorcycles\/dirt bikes) from roadways and sidewalks, comparing them to unlicensed dirt bikes. Committee discussed whether electric scooters should be treated differently, with Trustee Tolson expressing concern about over-regulation affecting middle school kids using scooters. Committee ultimately decided to add emoto restrictions while leaving officer discretion for smaller scooters. Motion by Olsen, seconded by Chwanka, to recommend approval with emotos prohibited from roadways, sidewalks, trails, and public property passed unanimously." },
      { item:"Overnight parking regulations", body:"Trustee Tolson presented research showing Weston's 12-hour parking restriction (4am-4pm) is significantly longer than surrounding municipalities (most use 5-hour windows). Public Works Director Michael Wodalski suggested eliminating overnight parking restrictions and instead signing specific problem areas (6-8 spots with apartment complexes). Chief Hunt opposed elimination, preferring overnight restrictions to allow officers time to clear cars before morning plowing. Committee decided to table the issue for Michael to identify specific exception areas and return in July\/August." },
      { item:"Crosswalk request on Alderson Street", body:"Mount Olive Church requested a crosswalk between their property and DC Everest school parking lot where parishioners park on Sundays. Public Works estimated $2,000-3,000 for basic crosswalk, $25,000-30,000 for lighted system. Committee discussed that no accidents have occurred at the location. Motion by Olsen, seconded by Chwanka, to recommend approval contingent on Mount Olive covering the installation cost passed unanimously. Michael Wodalski will contact Mount Olive about cost sharing." },
      { item:"Mobile food vendors fire inspection requirements", body:"Fire Chief explained a regional partnership with Wisconsin Rapids, Marshfield, Stevens Point, Plover, Rib Mountain, and Weston for mutual food truck inspections. One sticker from any participating department is valid for all municipalities. A recent inspection failed a food truck due to improper LP gas piping and unsecured propane containers. Wausau opted out preferring their own inspections. Motion by Chwanka, seconded by Compi, to approve Ordinance 26-8 passed unanimously." },
      { item:"Address corrections for E911 compliance", body:"Staff presented three addressing errors: 5915 Delicoski Street (duplex needing split addresses), Ross Avenue properties out of sequence near an apartment building, and 2211 Radkey Avenue near a new duplex. Chief Hunt noted an additional issue with Weston Villa Apartments having eight separate addresses for one structure. Motion passed unanimously to recommend corrections to Board of Trustees." },
      { item:"Raze order for 4104 Shore Avenue", body:"Staff requested authorization to begin raze proceedings on an abandoned structure. The property has been abandoned since 2010-2011 and was previously considered for fire department training burn but deemed too unsafe. Owners once housed chickens inside during winter. Current owners are up to date on taxes and preferred the raze route. Demolition costs will be placed on tax roll. Motion by Olsen, seconded by Compi, passed unanimously." },
    ],
    publicComment: "Jim Senalt spoke regarding multiple agenda items. He criticized the new farmers market location at the park, predicting grass damage and questioning ADA compliance of handicap parking on grass instead of asphalt. He questioned the origin of new fire inspection requirements for food trucks, asked about food truck regulations on public property versus private, and criticized the code enforcement list for having cases that are years old with no visible progress on at least three properties he personally knows about.",
    actionItems: [
      "Recommend approval of Chapter 50 nuisance amendments to Board of Trustees",
      "Recommend approval of e-bike ordinance with emoto prohibition on roadways, sidewalks, trails, and public property to Board of Trustees",
      "Public Works Director to identify specific areas needing even\/odd parking restrictions and return to committee in July\/August",
      "Public Works Director to contact Mount Olive Church regarding cost sharing for crosswalk installation",
      "Recommend approval of Ordinance 26-8 for mobile food vendor fire inspections to Board",
      "Recommend address corrections to Board of Trustees and notify affected property owners",
      "Staff to begin raze order proceedings for 4104 Shore Avenue",
      "Staff to investigate property at Sternberg and South Timber with furniture and dumpster in yard",
    ],
  },
  {
    id: "ee6clAtgrYw", source: "weston",
    title: "Tourism Commission",
    date: "May 18, 2026", shortDate: "MAY 18",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=ee6clAtgrYw",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_05182026-1918",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, this Village of Weston Board of Trustees meeting was scheduled to address a significant increase to park and recreation impact fees through a public hearing, along with numerous license renewals, multiple ordinance amendments, and several infrastructure construction projects. The meeting also included the Board of Review being adjourned to a future date and consideration of a new police department and municipal court facility site plan.",
    agenda: [
      { time:"N\/A", item:"Public Hearing and Consideration of Ordinance No. 26-010 and Resolution 2026-015 to Amend Park and Recreation Impact Fees" },
      { time:"N\/A", item:"Approval of April 13, 2026, Special Board of Trustees Meeting Minutes" },
      { time:"N\/A", item:"Approval of April 21, 2026, Board of Trustees Meeting Minutes" },
      { time:"N\/A", item:"Acknowledge Reports\/Minutes from Boards, Committees, Commissions" },
      { time:"N\/A", item:"Acknowledge Reports from Departments" },
      { time:"N\/A", item:"Work Product Transmittals including April Building Permits, Budget Status, Code Enforcement Report, and Water Utility PSC Annual Report" },
      { time:"N\/A", item:"Consent Agenda including Vouchers, Adult Establishment License, Weights and Measures Licenses, Cigarette\/Tobacco\/Vaping Licenses, Lodging License, Liquor Licenses, and Salvage License renewals" },
      { time:"N\/A", item:"Ordinance No. 26-008: Amending Mobile Food Vendors License" },
      { time:"N\/A", item:"Ordinance No. 26-009: Amending Standing Committees" },
      { time:"N\/A", item:"Ordinance No. 26-011: Amending Chapter 50 Nuisances" },
      { time:"N\/A", item:"Ordinance No. 26-012: Amending Bicycles regulations" },
      { time:"N\/A", item:"Resolution 2026-014: Support for Long-Term Transportation Fund Solution" },
      { time:"N\/A", item:"Amendments to Remote Meeting Attendance Policy" },
      { time:"N\/A", item:"President's Appointments to Committees and\/or Commissions" },
      { time:"N\/A", item:"Approval of Secondhand Article and Jewelry Dealer License for Schofield Coin & Hobby LLC" },
      { time:"N\/A", item:"Compliance Assurance Plan (CAP) Policy" },
      { time:"N\/A", item:"Feedback on Farmers Market Location at Kennedy Park" },
      { time:"N\/A", item:"Site Plan Review for Mountain Bay Metro Police Department & Municipal Court Facility" },
      { time:"N\/A", item:"Address Corrections for E911 Compliance" },
      { time:"N\/A", item:"Raze Order Request for 4104 Shorey Avenue" },
      { time:"N\/A", item:"CliftonStrengths assessments and training for Board of Trustees" },
      { time:"N\/A", item:"Amendments to Employee Personnel Policies regarding Clothing\/Equipment Allowance and Appearance" },
      { time:"N\/A", item:"Recycled Asphalt Base Course Production Quotes" },
      { time:"N\/A", item:"Sanitary Sewer Discharge Violation Fees" },
      { time:"N\/A", item:"Water and Sewer Connection Agreement for 2230 Radtke Avenue" },
      { time:"N\/A", item:"Intergovernmental Agreement for Military Road Construction" },
      { time:"N\/A", item:"Construction Services Proposals for Alderson and Jelinek Intersection Project" },
      { time:"N\/A", item:"Construction Services Proposals for Bloedel Ave Reconstruction Project" },
    ],
    discussions: [
      { item:"Park and Recreation Impact Fees Public Hearing", body:"The Board was scheduled to hold a public hearing on proposed increases to park and recreation impact fees for new residential development. The proposed changes would raise single-family fees from $300 to $761, duplex fees from $250 to $563 per unit, and multi-family fees from $250 to $495 per unit, based on the Village's 2022 Public Facilities Needs Assessment." },
      { item:"Mountain Bay Metro Police Department & Municipal Court Facility Site Plan", body:"The Board was set to review and consider action on the site plan for a new Mountain Bay Metro Police Department and Municipal Court Facility at 3600 Community Center Drive. This represents a significant public safety infrastructure project for the Village." },
      { item:"Farmers Market Location at Kennedy Park", body:"The Board was expected to discuss feedback regarding the Farmers Market location at Kennedy Park and recommended follow-up actions. This item was designated for discussion only, with no formal action scheduled." },
      { item:"Resolution 2026-014 Transportation Fund", body:"The Board was scheduled to consider a resolution expressing support for a long-term, sustainable funding solution to the State's Transportation Fund. This resolution would position the Village in ongoing state-level discussions about transportation infrastructure funding." },
      { item:"Military Road Construction Intergovernmental Agreement", body:"The Board was set to consider an intergovernmental agreement for Military Road construction, which would formalize cooperation between governmental entities on this roadway project." },
      { item:"Raze Order Request for 4104 Shorey Avenue", body:"The Board was expected to consider a raze order request for a property at 4104 Shorey Avenue, which would require demolition of a structure deemed unfit for habitation or use." },
      { item:"Mobile Food Vendors License Ordinance Amendment", body:"The Board was scheduled to consider Ordinance No. 26-008, which would amend Chapter 18 Business regulations regarding mobile food vendor licensing requirements." },
      { item:"License Renewals for 2026-2027", body:"The Board was set to consider renewal of numerous business licenses for the 2026-2027 licensing term, including adult establishment, weights and measures, cigarette\/tobacco\/vaping, lodging, various liquor licenses, and salvage licenses." },
    ],
    publicComment: "Public comment was included on the agenda, allowing any person to address the Board for up to three minutes regarding non-agenda items. Additionally, a formal public comment period was scheduled as part of the public hearing on park and recreation impact fees.",
    actionItems: [
      "Scheduled to vote on Ordinance No. 26-010 amending park and recreation impact fees",
      "Scheduled to vote on Resolution 2026-015 amending the Village fee schedule",
      "Expected to consider approval of meeting minutes from April 13 and April 21, 2026",
      "Scheduled to vote on consent agenda including vouchers and multiple license renewals",
      "Expected to consider four ordinance amendments regarding mobile food vendors, standing committees, nuisances, and bicycle regulations",
      "Scheduled to vote on Resolution 2026-014 supporting state transportation fund solutions",
      "Expected to consider site plan approval for Mountain Bay Metro Police Department & Municipal Court Facility",
      "Scheduled to consider intergovernmental agreement for Military Road construction",
      "Expected to consider construction services proposals for Alderson\/Jelinek Intersection and Bloedel Ave Reconstruction projects",
      "Scheduled to consider raze order request for 4104 Shorey Avenue",
    ],
  },
  {
    id: "KaLahH4JieQ", source: "weston",
    title: "Finance and Human Resources Committee",
    date: "May 18, 2026", shortDate: "MAY 18",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=KaLahH4JieQ",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_05182026-1918",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, the Village of Weston Board of Trustees was scheduled to meet on May 18, 2026, to conduct a public hearing on proposed park and recreation impact fee increases, consider multiple ordinance amendments affecting mobile food vendors, committee structures, nuisances, and bicycle regulations, and address various infrastructure projects including the Mountain Bay Metro Police Department facility and road construction agreements.",
    agenda: [
      { time:"6:00 p.m.", item:"Board of Review called to order and adjourned to June 15, 2026" },
      { time:"N\/A", item:"Public Hearing on Ordinance No. 26-010 and Resolution 2026-015 to Amend Park and Recreation Impact Fees" },
      { time:"N\/A", item:"Approval of previous meeting minutes from April 13 and April 21, 2026" },
      { time:"N\/A", item:"Acknowledge reports from boards, committees, commissions, and departments" },
      { time:"N\/A", item:"Work Product Transmittals including building permits, budget status, and code enforcement" },
      { time:"N\/A", item:"Consent Agenda including vouchers and various license renewals" },
      { time:"N\/A", item:"Ordinance No. 26-008 amending Mobile Food Vendors License regulations" },
      { time:"N\/A", item:"Ordinance No. 26-009 amending Standing Committees" },
      { time:"N\/A", item:"Ordinance No. 26-011 amending Nuisances chapter" },
      { time:"N\/A", item:"Ordinance No. 26-012 amending Bicycles regulations" },
      { time:"N\/A", item:"Resolution 2026-014 supporting sustainable transportation funding" },
      { time:"N\/A", item:"Remote Meeting Attendance Policy amendments" },
      { time:"N\/A", item:"President's Appointments to Committees and Commissions" },
      { time:"N\/A", item:"Secondhand Article Dealer License for Schofield Coin & Hobby LLC" },
      { time:"N\/A", item:"Compliance Assurance Plan Policy" },
      { time:"N\/A", item:"Farmers Market Location at Kennedy Park feedback" },
      { time:"N\/A", item:"Site Plan Review for Mountain Bay Metro Police Department & Municipal Court Facility" },
      { time:"N\/A", item:"Address Corrections for E911 Compliance" },
      { time:"N\/A", item:"Raze Order Request for 4104 Shorey Avenue" },
      { time:"N\/A", item:"CliftonStrengths assessments and training for Trustees" },
      { time:"N\/A", item:"Employee Personnel Policies amendments regarding Cintas Uniform Contract" },
      { time:"N\/A", item:"Recycled Asphalt Base Course Production Quotes" },
      { time:"N\/A", item:"Sanitary Sewer Discharge Violation Fees" },
      { time:"N\/A", item:"Water and Sewer Connection Agreement for 2230 Radtke Avenue" },
      { time:"N\/A", item:"Intergovernmental Agreement for Military Road Construction" },
      { time:"N\/A", item:"Construction Services Proposals for Alderson and Jelinek Intersection Project" },
      { time:"N\/A", item:"Construction Services Proposals for Bloedel Ave Reconstruction Project" },
    ],
    discussions: [
      { item:"Public Hearing on Park and Recreation Impact Fees", body:"The Board was scheduled to hold a public hearing on proposed significant increases to park and recreation impact fees for new residential development. Single-family fees were set to increase from $300 to $761, duplex fees from $250 to $563 per unit, and multi-family fees from $250 to $495 per unit, based on the 2022 Public Facilities Needs Assessment." },
      { item:"Ordinance No. 26-008 Mobile Food Vendors License", body:"The Board was expected to consider amendments to Chapter 18 Business regulations regarding mobile food vendor licensing requirements. The specific changes to the licensing framework were set for trustee review and potential action." },
      { item:"Ordinance No. 26-009 Standing Committees", body:"The Board was scheduled to review proposed amendments to the administrative code regarding the structure and organization of standing committees within Village government." },
      { item:"Ordinance No. 26-011 Nuisances", body:"The Board was set to consider amendments to Chapter 50 of the municipal code governing nuisance regulations within the Village." },
      { item:"Ordinance No. 26-012 Bicycles", body:"The Board was expected to review proposed changes to traffic and vehicle regulations specifically related to bicycle use under Article III of Chapter 82." },
      { item:"Resolution 2026-014 Transportation Funding", body:"The Board was scheduled to consider a resolution expressing support for long-term, sustainable funding solutions to address Wisconsin's transportation fund challenges at the state level." },
      { item:"Remote Meeting Attendance Policy", body:"As unfinished business, the Board was set to continue discussion on proposed amendments to Section 1.08 of the Elected and Appointed Village Officials Handbook regarding policies for remote participation in meetings." },
      { item:"Site Plan Review for Mountain Bay Metro Police Department Facility", body:"The Board was scheduled to review and potentially act on the site plan for a new Mountain Bay Metro Police Department and Municipal Court Facility at 3600 Community Center Drive, representing a significant public safety infrastructure project." },
      { item:"Farmers Market Location at Kennedy Park", body:"The Board was set to discuss feedback regarding the Farmers Market location at Kennedy Park and consider recommended follow-up actions, though this item was designated for discussion only without formal action." },
      { item:"Raze Order Request for 4104 Shorey Avenue", body:"The Board was expected to consider a raze order request for a property at 4104 Shorey Avenue, which would require demolition of an existing structure." },
      { item:"Intergovernmental Agreement for Military Road Construction", body:"The Board was scheduled to consider an intergovernmental agreement related to Military Road construction, involving coordination with other governmental entities on road infrastructure." },
      { item:"Construction Services Proposals for Alderson and Jelinek Intersection Project", body:"The Board was set to review and potentially select construction services proposals for improvements to the Alderson and Jelinek intersection." },
      { item:"Construction Services Proposals for Bloedel Ave Reconstruction Project", body:"The Board was expected to consider construction services proposals for the reconstruction of Bloedel Avenue, a significant road infrastructure project." },
      { item:"License Renewals Consent Agenda", body:"The Board was scheduled to consider renewal of multiple business licenses for the 2026-2027 term, including adult establishment, tobacco, lodging, alcohol, and salvage licenses through the consent agenda process." },
    ],
    publicComment: "Public comment was scheduled for non-agenda items with a three-minute limit per speaker. Additional public comment opportunity was included as part of the public hearing on park and recreation impact fees.",
    actionItems: [
      "Scheduled to vote on Ordinance No. 26-010 amending park and recreation impact fees",
      "Scheduled to vote on Resolution 2026-015 amending the Village Fee Schedule",
      "Expected to consider Ordinance No. 26-008 on mobile food vendors licensing",
      "Expected to consider Ordinance No. 26-009 on standing committees structure",
      "Expected to consider Ordinance No. 26-011 on nuisance regulations",
      "Expected to consider Ordinance No. 26-012 on bicycle regulations",
      "Scheduled to vote on Resolution 2026-014 supporting state transportation funding",
      "Expected to consider site plan approval for Mountain Bay Metro Police Department facility",
      "Scheduled to vote on intergovernmental agreement for Military Road construction",
      "Expected to select construction services for Alderson and Jelinek Intersection Project",
      "Expected to select construction services for Bloedel Ave Reconstruction Project",
      "Scheduled to consider raze order for 4104 Shorey Avenue",
      "Expected to act on consent agenda including vouchers and license renewals",
    ],
  },
  {
    id: "YQ-B8Dd3ltU", source: "weston",
    title: "Board of Trustees",
    date: "May 18, 2026", shortDate: "MAY 18",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=YQ-B8Dd3ltU",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_05182026-1918",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, the Village of Weston Board of Trustees was scheduled to meet on May 18, 2026, to consider significant changes to park and recreation impact fees following a public hearing, review numerous license renewals for the 2026-2027 term, and address multiple infrastructure projects including construction proposals for intersection and road reconstruction projects.",
    agenda: [
      { time:"N\/A", item:"Public Hearing and Consideration of Ordinance No. 26-010 and Resolution 2026-015 to Amend Park and Recreation Impact Fees" },
      { time:"N\/A", item:"Approval of April 13, 2026, Special Board of Trustees Meeting Minutes" },
      { time:"N\/A", item:"Approval of April 21, 2026, Board of Trustees Meeting Minutes" },
      { time:"N\/A", item:"Acknowledge Reports\/Minutes from Boards, Committees, Commissions" },
      { time:"N\/A", item:"Acknowledge Reports from Departments" },
      { time:"N\/A", item:"Acknowledge April Building Permits" },
      { time:"N\/A", item:"Acknowledge April Budget Status" },
      { time:"N\/A", item:"Acknowledge April Code Enforcement Report" },
      { time:"N\/A", item:"Acknowledge 2026 Weston Water Utility PSC Annual Report" },
      { time:"N\/A", item:"Approve Vouchers – check numbers 66598-66740 and 90248-90251" },
      { time:"N\/A", item:"Renewal of Adult Establishment License for 2026-2027 Licensing Term" },
      { time:"N\/A", item:"Renewal of Weights and Measures Licenses for 2026-2027 Licensing Term" },
      { time:"N\/A", item:"Renewal of Cigarette, Tobacco, and Electronic Vaping Licenses for 2026-2027 Licensing Term" },
      { time:"N\/A", item:"Renewal of Lodging License for 2026-2027 Licensing Term" },
      { time:"N\/A", item:"Renewal of Alcohol Licenses for 2026-2027 Licensing Term" },
      { time:"N\/A", item:"Renewal of Salvage License for 2026-2027 Licensing Term" },
      { time:"N\/A", item:"Ordinance No. 26-008: Amending Mobile Food Vendors License" },
      { time:"N\/A", item:"Ordinance No. 26-009: Amending Standing Committees" },
      { time:"N\/A", item:"Ordinance No. 26-011: Amending Chapter 50 Nuisances" },
      { time:"N\/A", item:"Ordinance No. 26-012: Amending Bicycles Regulations" },
      { time:"N\/A", item:"Resolution 2026-014: Support for Long-Term State Transportation Fund Solution" },
      { time:"N\/A", item:"Amendments to Remote Meeting Attendance Policy" },
      { time:"N\/A", item:"President's Appointments to Committees and\/or Commissions" },
      { time:"N\/A", item:"Approval of Secondhand Article Dealer License for Schofield Coin & Hobby LLC" },
      { time:"N\/A", item:"Compliance Assurance Plan (CAP) Policy" },
      { time:"N\/A", item:"Feedback on Farmers Market Location at Kennedy Park" },
      { time:"N\/A", item:"Site Plan Review for Mountain Bay Metro Police Department & Municipal Court Facility" },
      { time:"N\/A", item:"Address Corrections for E911 Compliance" },
      { time:"N\/A", item:"Raze Order Request for 4104 Shorey Avenue" },
      { time:"N\/A", item:"CliftonStrengths Assessments and Training for Board of Trustees" },
      { time:"N\/A", item:"Amendments to Employee Personnel Policies regarding Clothing and Appearance" },
      { time:"N\/A", item:"Recycled Asphalt Base Course Production Quotes" },
      { time:"N\/A", item:"Sanitary Sewer Discharge Violation Fees" },
      { time:"N\/A", item:"Water and Sewer Connection Agreement for 2230 Radtke Avenue" },
      { time:"N\/A", item:"Intergovernmental Agreement for Military Road Construction" },
      { time:"N\/A", item:"Construction Services Proposals for Alderson and Jelinek Intersection Project" },
      { time:"N\/A", item:"Construction Services Proposals for Bloedel Ave Reconstruction Project" },
    ],
    discussions: [
      { item:"Park and Recreation Impact Fees Public Hearing", body:"The Board was scheduled to hold a public hearing on proposed significant increases to park and recreation impact fees for new residential development. The proposed changes would raise single-family fees from $300 to $761, duplex fees from $250 to $563 per unit, and multi-family fees from $250 to $495 per unit, based on the Village's 2022 Public Facilities Needs Assessment." },
      { item:"Resolution 2026-014 State Transportation Funding", body:"The Board was expected to consider a resolution expressing support for a long-term, sustainable funding solution to Wisconsin's Transportation Fund. This resolution was set to address state-level transportation infrastructure funding concerns." },
      { item:"Site Plan Review for Mountain Bay Metro Police Department & Municipal Court Facility", body:"The Board was scheduled to review and potentially act on the site plan for a new Mountain Bay Metro Police Department and Municipal Court Facility at 3600 Community Center Drive. This represents a significant public safety infrastructure project for the community." },
      { item:"Farmers Market Location at Kennedy Park", body:"The Board was set to discuss feedback on the Farmers Market location at Kennedy Park and recommended follow-up actions. This item was designated for discussion only with no action expected." },
      { item:"Raze Order Request for 4104 Shorey Avenue", body:"The Board was expected to consider a raze order request for the property at 4104 Shorey Avenue. Raze orders typically require demolition of structures deemed unsafe or in violation of building codes." },
      { item:"Mobile Food Vendors License Ordinance", body:"The Board was scheduled to consider Ordinance No. 26-008 amending Chapter 18 Business regulations regarding Mobile Food Vendors License requirements. This was set to update licensing procedures for food truck and mobile vendor operations." },
      { item:"Construction Services for Road Projects", body:"The Board was expected to review and act on construction services proposals for two major infrastructure projects: the Alderson and Jelinek Intersection Project and the Bloedel Ave Reconstruction Project." },
      { item:"Intergovernmental Agreement for Military Road Construction", body:"The Board was scheduled to consider an intergovernmental agreement related to Military Road construction, which typically involves coordination with neighboring municipalities or county government on shared roadway projects." },
      { item:"CliftonStrengths Assessments and Training", body:"The Board was set to discuss potential interest in completing CliftonStrengths assessments and training, a professional development tool designed to help identify individual strengths and improve team dynamics." },
    ],
    publicComment: "Public comment was included on the agenda, allowing persons to address the Board for up to three minutes regarding non-agenda items, with time extensions permitted at the Chief Presiding Officer's discretion. Additional public comment opportunity was scheduled during the Park and Recreation Impact Fees public hearing.",
    actionItems: [
      "Scheduled to vote on Ordinance No. 26-010 and Resolution 2026-015 amending park and recreation impact fees following public hearing",
      "Expected to consider approval of multiple license renewals for 2026-2027 licensing term including alcohol, tobacco, lodging, and adult establishment licenses",
      "Scheduled to vote on Resolution 2026-014 supporting state transportation fund solutions",
      "Expected to consider site plan approval for Mountain Bay Metro Police Department and Municipal Court Facility",
      "Scheduled to vote on construction services proposals for Alderson\/Jelinek intersection and Bloedel Ave reconstruction projects",
      "Expected to consider intergovernmental agreement for Military Road construction",
      "Scheduled to vote on raze order request for 4104 Shorey Avenue",
      "Expected to consider ordinance amendments regarding mobile food vendors, nuisances, bicycles, and standing committees",
    ],
  },
  {
    id: "bb_744162", source: "school_board",
    title: "Committee of the Whole Meeting",
    date: "May 18, 2026", shortDate: "MAY 18",
    committee: "Committee of the Whole", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=744162",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=744162",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, the Wausau School District Board of Education's Committee of the Whole meeting on May 18, 2026 was scheduled to address multiple action items including the preliminary 2026-27 budget, employee handbook updates, meal price changes, and policy revisions. The board was also expected to consider approval of the Riverview HVAC and roofing project and updates to the activities and athletics code.",
    agenda: [
      { time:"N\/A", item:"Call to Order" },
      { time:"N\/A", item:"Approve the Minutes" },
      { time:"N\/A", item:"Audit of the Bills" },
      { time:"N\/A", item:"Excellence in Action: Thomas Jefferson Elementary" },
      { time:"N\/A", item:"Public and Student Comment" },
      { time:"N\/A", item:"Employee Handbook Updates for 2026-27 (Action Requested)" },
      { time:"N\/A", item:"Recommendation for Preliminary 2026-27 Budget (Action Requested)" },
      { time:"N\/A", item:"2026-2027 Paid Meal Price Update (Action Requested)" },
      { time:"N\/A", item:"Activities & Athletics Code (Action Requested)" },
      { time:"N\/A", item:"Policy 9270 - Home-Based, Private, or Tribal Schooling (Action Requested)" },
      { time:"N\/A", item:"Policy 2431.01 - High School Activities Code (Action Requested)" },
      { time:"N\/A", item:"Riverview RFP Approval (Action Requested)" },
      { time:"N\/A", item:"Adjourn" },
    ],
    discussions: [
      { item:"Excellence in Action: Thomas Jefferson Elementary", body:"The board was scheduled to recognize Thomas Jefferson Elementary as part of the Excellence in Action program. No additional details or presenter information were provided in the agenda." },
      { item:"Employee Handbook Updates for 2026-27", body:"Tabatha Gundrum was scheduled to present the Employee Handbook updates for the 2026-27 school year in an estimated 5 minutes. The board was expected to review and consider approval of the updated handbook." },
      { item:"Recommendation for Preliminary 2026-27 Budget", body:"Elizabeth Channel, Assistant Superintendent of Operations, was scheduled to present the preliminary budget for 2026-27 in an estimated 10 minutes. The board was expected to consider the initial budget recommendation for the upcoming school year." },
      { item:"2026-2027 Paid Meal Price Update", body:"Karen Fochs was scheduled to present proposed changes to the 2026-2027 paid meal prices in an estimated 5 minutes. Supporting documentation included a meal price action sheet and PLE tool." },
      { item:"Activities & Athletics Code", body:"Dr. Jon Tomski and BJ Brandt were scheduled to present suggested changes to the Athletic and Activities Code in an estimated 10 minutes. The board was expected to consider approval of the 2026-2027 Code of Conduct updates." },
      { item:"Policy 9270 - Home-Based, Private, or Tribal Schooling", body:"Dr. Jon Tomski was scheduled to present a proposed change to Policy 9270 regarding Home-Based, Private, or Tribal Schooling in an estimated 5 minutes. Action was requested for this policy update." },
      { item:"Policy 2431.01 - High School Activities Code", body:"Dr. Jon Tomski was scheduled to present proposed changes to Policy 2431.01 - High School Activities Code in an estimated 5 minutes. The board was expected to consider approval of these policy revisions." },
      { item:"Riverview RFP Approval", body:"Ryan Urmanski, Director of Buildings and Grounds, was scheduled to present the Riverview HVAC and roofing project in an estimated 10 minutes. The board was expected to consider approval of the RFP for this facility improvement project." },
    ],
    publicComment: "A public and student comment period was included on the agenda.",
    actionItems: [
      "Board was expected to vote on Employee Handbook Updates for 2026-27",
      "Board was expected to vote on the Preliminary 2026-27 Budget recommendation",
      "Board was expected to vote on 2026-2027 Paid Meal Price Update",
      "Board was expected to vote on Activities & Athletics Code changes",
      "Board was expected to vote on Policy 9270 - Home-Based, Private, or Tribal Schooling revisions",
      "Board was expected to vote on Policy 2431.01 - High School Activities Code changes",
      "Board was expected to vote on Riverview RFP Approval for HVAC and roofing project",
    ],
  },
  {
    id: "bb_746488", source: "school_board",
    title: "Special Meeting",
    date: "May 18, 2026", shortDate: "MAY 18",
    committee: "Special Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=746488",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=746488",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, this Special Meeting of the Wausau School District Board of Education was scheduled to address potential litigation in closed session under Wisconsin State Statute 19.85(g). The board was expected to hold preliminary discussions regarding a legal matter before potentially reconvening in open session to take any necessary action.",
    agenda: [
      { time:"N\/A", item:"Call to Order" },
      { time:"N\/A", item:"Request for Closed Session Pursuant to State Statutes" },
      { time:"N\/A", item:"Preliminary Discussion Regarding Potential Litigation 19.85 (g)" },
      { time:"N\/A", item:"Reconvene in Open Session, to take further action if necessary and appropriate" },
      { time:"N\/A", item:"Adjourn" },
    ],
    discussions: [
      { item:"Preliminary Discussion Regarding Potential Litigation 19.85 (g)", body:"The board was scheduled to enter closed session to hold preliminary discussions regarding potential litigation, as permitted under Wisconsin State Statute 19.85(g). This statute allows governmental bodies to convene in closed session when considering matters that could result in legal action against or on behalf of the district." },
      { item:"Reconvene in Open Session", body:"Following the closed session discussion, the board was expected to reconvene in open session to take any further action deemed necessary and appropriate based on the closed session deliberations." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Board was expected to potentially take action following the closed session discussion regarding potential litigation",
    ],
  },
  {
    id: "bb_744112", source: "school_board",
    title: "Regular Meeting",
    date: "May 11, 2026", shortDate: "MAY 11",
    committee: "Regular Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=744112",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=744112",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, the Wausau School District Board of Education was scheduled to address several significant action items at their May 11, 2026 regular meeting, including approval of the 2026-27 budget reconciliation plan, teacher contract renewals, and wage increases for non-teaching staff. The board was also expected to consider renewal of the WAMCS charter school contract for 2026-2031 and enter closed session regarding personnel matters including non-renewal notices and contract evaluations.",
    agenda: [
      { time:"N\/A", item:"Call to Order" },
      { time:"N\/A", item:"Roll Call" },
      { time:"N\/A", item:"Pledge of Allegiance: Jim Bouche, President" },
      { time:"N\/A", item:"Reading of the Mission Statement" },
      { time:"N\/A", item:"Excellence in Action: Maine Elementary" },
      { time:"N\/A", item:"Public and Student Comment" },
      { time:"N\/A", item:"Approve Consent Agenda (Action Requested)" },
      { time:"N\/A", item:"Old\/Recurring Business" },
      { time:"N\/A", item:"New Business" },
      { time:"N\/A", item:"Open Forum" },
      { time:"N\/A", item:"Request for Closed Session Pursuant to State Statutes" },
      { time:"N\/A", item:"Adjourn" },
    ],
    discussions: [
      { item:"Excellence in Action: Maine Elementary", body:"The board was scheduled to recognize Maine Elementary as part of the district's Excellence in Action program, which typically highlights achievements and initiatives at individual schools." },
      { item:"Legal Expense Summary for 3rd Quarter", body:"Elizabeth Channel, Assistant Superintendent of Operations, was expected to present a summary report of all legal counsel expenses incurred during the third quarter of 2025-2026. The report was described as broken down by law firm and by type of legal advice sought, requiring no action as a written report with an estimated 2-minute presentation time." },
      { item:"2026-27 Budget Reconciliation Plan", body:"Elizabeth Channel, Assistant Superintendent of Operations, was scheduled to present the budget reconciliation plan for budgeting purposes, previously introduced at the April Committee of the Whole meeting. The presentation was estimated at 3 minutes with action requested from the board." },
      { item:"2026-27 Teacher Contract Approvals", body:"Tabatha Gundrum was scheduled to present a list of teacher contracts for approval for the 2026-27 school year. The presentation was estimated at 5 minutes with action requested from the board." },
      { item:"Various Group Wage\/Salary Increase", body:"Tabatha Gundrum was expected to present a recommendation for a 2.63% wage adjustment for all employee groups in the District except teachers, in accordance with the budget reconciliation plan. The agenda noted that teacher negotiations would commence soon with a separate action at a later date, with this presentation estimated at 5 minutes." },
      { item:"Charter School Contract Renewal", body:"Elizabeth Channel, WAMCS Head of School, was scheduled to present the 2026-2031 contract renewal for the Wausau Area Montessori Charter School, previously introduced at the April Committee of the Whole meeting. The presentation was estimated at 2 minutes with action requested." },
      { item:"Closed Session", body:"The board was scheduled to enter closed session pursuant to Wisconsin Statutes sections 19.85(1)(c), (e), and (g) to discuss final notice of non-renewal and contract evaluation matters, with plans to reconvene in open session to take further action if necessary." },
    ],
    publicComment: "A public and student comment period was included on the agenda.",
    actionItems: [
      "Board was expected to vote on approval of the Consent Agenda including appointments, separations, leaves of absence, retirements, meeting minutes, payment of bills, and donations",
      "Action was requested for the 2026-27 Budget Reconciliation Plan",
      "Board was expected to vote on 2026-27 Teacher Contract Approvals",
      "Action was requested for Various Group Wage\/Salary Increase of 2.63% for non-teaching staff",
      "Board was expected to vote on WAMCS Charter School Contract Renewal for 2026-2031",
      "Board was expected to potentially take action following closed session regarding non-renewal notices and contract evaluations",
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
    id: "bb_741715", source: "school_board",
    title: "Special Meeting",
    date: "April 30, 2026", shortDate: "APR 30",
    committee: "Special Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=741715",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=741715",
    isAgendaOnly: true,
    badge: "new",
    overview: "Based on the published agenda, this special meeting of the Wausau School District Board of Education was scheduled to convene in closed session to hold a pupil expulsion hearing. The board was expected to deliberate privately and potentially take action regarding the student expulsion matter, with the possibility of reconvening in open session for further action if necessary.",
    agenda: [
      { time:"N\/A", item:"Call To Order" },
      { time:"N\/A", item:"Closed Session - Pupil Expulsion Hearing pursuant to s. 19.85(1)(a), (f), and (g), and s. 118.125 of Wisconsin Statutes" },
      { time:"N\/A", item:"Adjournment" },
    ],
    discussions: [
      { item:"Closed Session - Pupil Expulsion Hearing", body:"The Board of Education was scheduled to convene in closed session under Wisconsin Statutes sections 19.85(1)(a), (f), and (g), as well as section 118.125, to conduct a pupil expulsion hearing. The board was expected to deliberate privately at the conclusion of the hearing and potentially take action in closed session if necessary and appropriate. Following the closed session, the board was scheduled to potentially reconvene into open session for further action." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Board was expected to consider action on a pupil expulsion matter during or following the closed session hearing",
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
    badge: null,
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
    id: "CIhVYLRBgok", source: "wausau",
    title: "Wausau City Council Meeting",
    date: "April 28, 2026", shortDate: "APR 28",
    committee: "City Council", duration: "~1h",
    url: "https://www.youtube.com/watch?v=CIhVYLRBgok",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2335/overview",
    isAgendaOnly: false,
    badge: null,
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
  { date:"2026-07-08", time:"5:00 PM", name:"Extension, Education & Econ Dev Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-07-09", time:"3:00 PM", name:"Executive Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-07-09", time:"5:00 PM", name:"Infrastructure Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-07-14", time:"5:00 PM", name:"Public Safety Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
  { date:"2026-07-16", time:"5:00 PM", name:"HR, Finance & Property Committee", url:"https://www.marathoncounty.gov/about-us/county-calendar", source:"marathon" },
];

const SCHOOL_BOARD_UPCOMING = [
  { date:"2026-06-08", time:"5:00 PM", name:"Regular Board Meeting", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-06-22", time:"5:00 PM", name:"Education & Operations Committee", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-07-13", time:"5:00 PM", name:"Regular Board Meeting", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
];

const WAUSAU_UPCOMING = [
  { date:"2026-05-26", time:"10:30 AM", name:"Board of Public Works Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2346/overview", source:"wausau" },
  { date:"2026-05-26", time:"12:00 PM", name:"Community Development Authority Board Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2360/overview", source:"wausau" },
  { date:"2026-05-26", time:"5:15 PM", name:"Joint Finance Committee and the Infrastructure & Facilities Committee", url:"https://wausauwi.portal.civicclerk.com/event/2357/overview", source:"wausau" },
  { date:"2026-05-26", time:"6:15 PM", name:"Committee of the Whole  Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2358/overview", source:"wausau" },
  { date:"2026-05-26", time:"6:30 PM", name:"Common Council Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1978/overview", source:"wausau" },
  { date:"2026-05-27", time:"4:00 PM", name:"Historic Preservation Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2217/overview", source:"wausau" },
  { date:"2026-06-01", time:"5:15 PM", name:"Parks & Recreation Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2057/overview", source:"wausau" },
  { date:"2026-06-02", time:"11:30 AM", name:"Water Works Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2192/overview", source:"wausau" },
  { date:"2026-06-02", time:"5:30 PM", name:"Economic Development Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1992/overview", source:"wausau" },
  { date:"2026-06-04", time:"5:00 PM", name:"Sustainability, Energy & Environment Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2169/overview", source:"wausau" },
  { date:"2026-06-08", time:"4:45 PM", name:"Human Resources Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2030/overview", source:"wausau" },
  { date:"2026-06-09", time:"5:30 PM", name:"Finance Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2005/overview", source:"wausau" },
  { date:"2026-06-09", time:"6:30 PM", name:"Common Council Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1966/overview", source:"wausau" },
  { date:"2026-06-10", time:"6:00 PM", name:"Airport Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1953/overview", source:"wausau" },
  { date:"2026-06-11", time:"5:15 PM", name:"Infrastructure & Facilities Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2044/overview", source:"wausau" },
];

const WESTON_UPCOMING = [
  { date:"2026-05-26", time:"", name:"Park and Recreation Committee", url:"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_05262026-1920", source:"weston" },
  { date:"2026-05-28", time:"", name:"Public Works Committee", url:"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_05282026-1921", source:"weston" },
  { date:"2026-06-01", time:"6:00 PM", name:"Community Life & Public Safety Committee", url:"https://www.westonwi.gov/agendacenter", source:"weston" },
  { date:"2026-06-08", time:"6:00 PM", name:"Plan Commission", url:"https://www.westonwi.gov/agendacenter", source:"weston" },
  { date:"2026-06-08", time:"6:00 PM", name:"Public Works Committee", url:"https://www.westonwi.gov/agendacenter", source:"weston" },
  { date:"2026-06-09", time:"6:00 PM", name:"S.A.F.E.R. Board of Directors", url:"https://www.westonwi.gov/agendacenter", source:"weston" },
  { date:"2026-06-15", time:"5:30 PM", name:"Finance & Human Resources Committee", url:"https://www.westonwi.gov/agendacenter", source:"weston" },
  { date:"2026-06-15", time:"6:00 PM", name:"Board of Trustees", url:"https://www.westonwi.gov/agendacenter", source:"weston" },
  { date:"2026-06-18", time:"6:00 PM", name:"Mountain Bay Metro Police Oversight", url:"https://www.westonwi.gov/agendacenter", source:"weston" },
  { date:"2026-06-22", time:"6:00 PM", name:"Parks & Recreation Committee", url:"https://www.westonwi.gov/agendacenter", source:"weston" },
  { date:"2026-07-06", time:"6:00 PM", name:"Community Life & Public Safety Committee", url:"https://www.westonwi.gov/agendacenter", source:"weston" },
  { date:"2026-07-13", time:"6:00 PM", name:"Plan Commission", url:"https://www.westonwi.gov/agendacenter", source:"weston" },
  { date:"2026-07-13", time:"6:00 PM", name:"Public Works Committee", url:"https://www.westonwi.gov/agendacenter", source:"weston" },
  { date:"2026-07-14", time:"6:00 PM", name:"S.A.F.E.R. Board of Directors", url:"https://www.westonwi.gov/agendacenter", source:"weston" },
  { date:"2026-07-16", time:"6:00 PM", name:"Mountain Bay Metro Police Oversight", url:"https://www.westonwi.gov/agendacenter", source:"weston" },
  { date:"2026-07-20", time:"5:30 PM", name:"Finance & Human Resources Committee", url:"https://www.westonwi.gov/agendacenter", source:"weston" },
  { date:"2026-07-20", time:"6:00 PM", name:"Board of Trustees", url:"https://www.westonwi.gov/agendacenter", source:"weston" },
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
