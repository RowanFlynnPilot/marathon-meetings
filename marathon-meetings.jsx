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
    id: "2FnP-HTQAL4", source: "wausau",
    title: "Plan Commission",
    date: "March 9, 2026", shortDate: "MAR 9",
    committee: "Plan Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=2FnP-HTQAL4",
    docUrl: null,
    badge: "new",
    overview: "The Weston Plan Commission meeting was expected to cover two rezoning public hearings, three sign special exception permit requests, a final plat approval, and review of annual reports from Planning and Code Enforcement departments. This agenda reflects routine land use decisions and administrative reviews typical of municipal planning operations.",
    agenda: [
      { time:"N\/A", item:"Open public comment period for items not on agenda as public hearings" },
      { time:"N\/A", item:"Written Communications, Disclosures and Recusals" },
      { time:"N\/A", item:"Minutes from February 9, 2026, Plan Commission Meeting" },
      { time:"N\/A", item:"Public Hearing – Project #20260032, rezone 8905 Birch Street from RR-5 to SF-S" },
      { time:"N\/A", item:"Public Hearing – Project #20260056, rezone 7105 Christiansen Avenue from SF-L to SF-S" },
      { time:"N\/A", item:"Sign Special Exception – Project #20260061, Macco's Floor Covering, 3111 Schofield Avenue" },
      { time:"N\/A", item:"Sign Special Exception – Project #20260062, Weston Psychiatric, 6307 Schofield Avenue" },
      { time:"N\/A", item:"Sign Special Exception – Project #20260067, Burger King, 6003 Business Highway 51" },
      { time:"N\/A", item:"Final Plat Approval - Project #20260017, Hinner Springs Second Addition" },
      { time:"N\/A", item:"Discussion of Parks and Recreation Impact Fee Review" },
      { time:"N\/A", item:"2025 Code Enforcement Annual Report" },
      { time:"N\/A", item:"2025 Planning & Development Annual Report" },
      { time:"N\/A", item:"February 2026 Staff-Approved Certified Survey Maps and Site Plans" },
      { time:"N\/A", item:"February 2026 Building Permits" },
      { time:"N\/A", item:"Planning & Development Department Monthly Project Update Report" },
      { time:"N\/A", item:"Announcements & Commissioner Remarks" },
      { time:"N\/A", item:"Future Agenda Items or Staff Referrals" },
    ],
    discussions: [
      { item:"Public Hearing – Project #20260032, 8905 Birch Street Rezoning", body:"A request to rezone a portion of property at 8905 Birch Street from RR-5 (Rural Residential-5 Acre) to SF-S (Single Family Residential-Small Lot). The Plan Commission will hold a public hearing and make a recommendation to the Board of Trustees." },
      { item:"Public Hearing – Project #20260056, 7105 Christiansen Avenue Rezoning", body:"A request to rezone a portion of property at 7105 Christiansen Avenue from SF-L (Single Family Residential-Large Lot) to SF-S (Single Family Residential-Small Lot). The Plan Commission will hold a public hearing and make a recommendation to the Board of Trustees." },
      { item:"Sign Special Exception – Macco's Floor Covering", body:"A request for a Special Exception Sign Permit for Macco's Floor Covering located at 3111 Schofield Avenue." },
      { item:"Sign Special Exception – Weston Psychiatric", body:"A request for a Special Exception Sign Permit for Weston Psychiatric located at 6307 Schofield Avenue." },
      { item:"Sign Special Exception – Burger King", body:"A request for a Special Exception Sign Permit for Burger King located at 6003 Business Highway 51." },
      { item:"Final Plat Approval - Hinner Springs Second Addition", body:"Review and approval of the Final Plat of Hinner Springs Second Addition, submitted by Timber Ridge Builders\/Riverside Land Surveying." },
      { item:"Discussion of Parks and Recreation Impact Fee Review", body:"The Commission will discuss the review of Parks and Recreation impact fees, which are typically assessed on new development to fund park improvements." },
      { item:"2025 Code Enforcement Annual Report", body:"Presentation and review of the 2025 annual report from the Code Enforcement division summarizing enforcement activities over the past year." },
      { item:"2025 Planning & Development Annual Report", body:"Presentation and review of the 2025 annual report from the Planning & Development department summarizing departmental activities and accomplishments." },
    ],
    publicComment: "Public comment period was on the agenda for items not appearing as public hearings, with instructions provided for in-person and Zoom participation.",
    actionItems: [
      "Recommendation to Board of Trustees on rezoning Project #20260032 (8905 Birch Street)",
      "Recommendation to Board of Trustees on rezoning Project #20260056 (7105 Christiansen Avenue)",
      "Action on Sign Special Exception Project #20260061 (Macco's Floor Covering)",
      "Action on Sign Special Exception Project #20260062 (Weston Psychiatric)",
      "Action on Sign Special Exception Project #20260067 (Burger King)",
      "Final Plat Approval for Hinner Springs Second Addition",
    ],
  },
  {
    id: "QPlBGzKEh38", source: "wausau",
    title: "Public Works Committee",
    date: "March 9, 2026", shortDate: "MAR 9",
    committee: "Plan Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=QPlBGzKEh38",
    docUrl: null,
    badge: "new",
    overview: "The Weston Plan Commission meeting agenda includes two public hearings for residential rezoning requests, three sign special exception permits for local businesses, a final plat approval, and review of annual department reports. This meeting addresses land use decisions that will shape residential and commercial development in the village. Note: this summary is based on the agenda, not a transcript.",
    agenda: [
      { time:"N\/A", item:"Open public comment period for items not on agenda as public hearings" },
      { time:"N\/A", item:"Written Communications, Disclosures and Recusals" },
      { time:"N\/A", item:"Minutes from February 9, 2026, Plan Commission Meeting" },
      { time:"N\/A", item:"Public Hearing – Project #20260032, rezoning request at 8905 Birch Street from RR-5 to SF-S" },
      { time:"N\/A", item:"Public Hearing – Project #20260056, rezoning request at 7105 Christiansen Avenue from SF-L to SF-S" },
      { time:"N\/A", item:"Sign Special Exception – Project #20260061, Macco's Floor Covering, 3111 Schofield Avenue" },
      { time:"N\/A", item:"Sign Special Exception – Project #20260062, Weston Psychiatric, 6307 Schofield Avenue" },
      { time:"N\/A", item:"Sign Special Exception – Project #20260067, Burger King, 6003 Business Highway 51" },
      { time:"N\/A", item:"Final Plat Approval - Project #20260017, Hinner Springs Second Addition" },
      { time:"N\/A", item:"Discussion of Parks and Recreation Impact Fee Review" },
      { time:"N\/A", item:"2025 Code Enforcement Annual Report" },
      { time:"N\/A", item:"2025 Planning & Development Annual Report" },
      { time:"N\/A", item:"February 2026 Staff-Approved Certified Survey Maps and Site Plans" },
      { time:"N\/A", item:"February 2026 Building Permits" },
      { time:"N\/A", item:"Planning & Development Department Monthly Project Update Report" },
      { time:"N\/A", item:"Announcements & Commissioner Remarks" },
      { time:"N\/A", item:"Future Agenda Items or Staff Referrals" },
    ],
    discussions: [
      { item:"Public Hearing – Project #20260032, 8905 Birch Street Rezoning", body:"A request to rezone a portion of property at 8905 Birch Street from RR-5 (Rural Residential-5 Acre) to SF-S (Single Family Residential-Small Lot). The Plan Commission will hold a public hearing and make a recommendation to the Board of Trustees." },
      { item:"Public Hearing – Project #20260056, 7105 Christiansen Avenue Rezoning", body:"A request to rezone a portion of property at 7105 Christiansen Avenue from SF-L (Single Family Residential-Large Lot) to SF-S (Single Family Residential-Small Lot). The Plan Commission will hold a public hearing and make a recommendation to the Board of Trustees." },
      { item:"Sign Special Exception – Macco's Floor Covering", body:"A request for a Special Exception Sign Permit for Macco's Floor Covering located at 3111 Schofield Avenue." },
      { item:"Sign Special Exception – Weston Psychiatric", body:"A request for a Special Exception Sign Permit for Weston Psychiatric located at 6307 Schofield Avenue." },
      { item:"Sign Special Exception – Burger King", body:"A request for a Special Exception Sign Permit for Burger King located at 6003 Business Highway 51." },
      { item:"Final Plat Approval - Hinner Springs Second Addition", body:"Final plat approval for Hinner Springs Second Addition, submitted by Timber Ridge Builders\/Riverside Land Surveying. This represents the final step in subdivision approval before lots can be sold or developed." },
      { item:"Discussion of Parks and Recreation Impact Fee Review", body:"The commission will discuss the review of parks and recreation impact fees, which are assessed on new development to fund park improvements." },
      { item:"2025 Code Enforcement Annual Report", body:"Presentation of the annual code enforcement report summarizing enforcement activities and outcomes for 2025." },
      { item:"2025 Planning & Development Annual Report", body:"Presentation of the Planning & Development Department's annual report covering departmental activities and accomplishments for 2025." },
    ],
    publicComment: "Public comment period is included on the agenda for items not appearing as public hearings. Public hearings for rezoning requests include designated public comment periods.",
    actionItems: [
      "Recommendation to Board of Trustees on rezoning Project #20260032 at 8905 Birch Street",
      "Recommendation to Board of Trustees on rezoning Project #20260056 at 7105 Christiansen Avenue",
      "Action on Sign Special Exception for Macco's Floor Covering",
      "Action on Sign Special Exception for Weston Psychiatric",
      "Action on Sign Special Exception for Burger King",
      "Final Plat Approval for Hinner Springs Second Addition",
    ],
  },
  {
    id: "D7R7a0G0WTA", source: "weston",
    title: "Parks Committee",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=D7R7a0G0WTA",
    docUrl: null,
    badge: "new",
    overview: "The Village of Weston Board of Trustees was scheduled to meet on March 23, 2026 to consider multiple rezoning ordinances, a subdivision plat approval, parking restrictions, park-related fees and agreements, infrastructure projects, and various policy updates. Note: This agenda is for the Board of Trustees, not the Parks Committee as indicated in the meeting title provided. This summary is based on the agenda, not a transcript.",
    agenda: [
      { time:"6:00 p.m.", item:"Public Comments" },
      { time:"N\/A", item:"Approval of February 16, 2026, Board of Trustees Meeting" },
      { time:"N\/A", item:"Acknowledge Reports\/Minutes from Boards, Committees, Commissions" },
      { time:"N\/A", item:"Acknowledge Reports from Departments" },
      { time:"N\/A", item:"Work Product Transmittals including Building Permits, Budget Status, Code Enforcement Reports" },
      { time:"N\/A", item:"Consent Agenda including Vouchers and Agent Change for Reliance Fuel LLC" },
      { time:"N\/A", item:"Ordinance No. 26-004: Rezoning of 8905 Birch Street from RR-5 to SF-S" },
      { time:"N\/A", item:"Ordinance No. 26-005: Rezoning of 7105 Christiansen Avenue from SF-L to SF-S" },
      { time:"N\/A", item:"Ordinance No. 26-006: Amending Speed Limits in Municipal Code" },
      { time:"N\/A", item:"Resolution No. 2026-008: Final Plat of Hinner Springs Second Addition Subdivision" },
      { time:"N\/A", item:"April 2026 Referendum Informational Sessions Update" },
      { time:"N\/A", item:"Proposed E-Bicycle and E-Moto Ordinance Dialogue" },
      { time:"N\/A", item:"Removal of No Parking restrictions on Alta Verde St and Alderson Street along Kennedy Park" },
      { time:"N\/A", item:"Intersection signage at Community Center Drive and Birch St" },
      { time:"N\/A", item:"Baseball\/Softball Field Maintenance and User Agreement" },
      { time:"N\/A", item:"Purchase of Commercial Rotary Mower" },
      { time:"N\/A", item:"Park Shelter Fees and Field Rental Costs" },
      { time:"N\/A", item:"Eagle Scout Project at Machmueller Park" },
      { time:"N\/A", item:"Review of Elected and Appointed Officials' Handbook Remote Meeting Attendance Policy" },
      { time:"N\/A", item:"Use of Microsoft Teams for Communication" },
      { time:"N\/A", item:"Military Road Utility Engineering Services Contract" },
      { time:"N\/A", item:"Bus 51 Storm Pond Engineering Services Contract Amendment" },
      { time:"N\/A", item:"Sewer Televising Software Contract" },
      { time:"N\/A", item:"2026 Annual Street Maintenance Plan and Budget" },
      { time:"N\/A", item:"Hospital Area Repaving Change Order #4" },
      { time:"N\/A", item:"Well 2 Rehabilitation" },
      { time:"N\/A", item:"Sign Encroachment Agreement with 7th Floor Investments, LLC (Macco's Floor Covering)" },
    ],
    discussions: [
      { item:"Ordinance No. 26-004: Rezoning of 8905 Birch Street", body:"The Board was to consider rezoning a portion of property at 8905 Birch Street from Rural Residential-5 Acre (RR-5) to Single Family Residential-Small Lot (SF-S) zoning district." },
      { item:"Ordinance No. 26-005: Rezoning of 7105 Christiansen Avenue", body:"The Board was to consider rezoning a portion of property at 7105 Christiansen Avenue from Single Family Residential-Large Lot (SF-L) to Single Family Residential-Small Lot (SF-S) zoning district." },
      { item:"Ordinance No. 26-006: Speed Limits Amendment", body:"The Board was to consider an ordinance amending Chapter 82.600 regarding speed limits in the Village's Municipal Code." },
      { item:"Resolution No. 2026-008: Hinner Springs Second Addition Subdivision", body:"The Board was to consider approval of the final plat for the Hinner Springs Second Addition Subdivision development." },
      { item:"April 2026 Referendum Informational Sessions Update", body:"Discussion-only item regarding updates on informational sessions planned for an April 2026 referendum." },
      { item:"Proposed E-Bicycle and E-Moto Ordinance", body:"The Board was to discuss and potentially act on dialogue regarding a proposed ordinance regulating e-bicycles and e-motos, referred from the Community Life and Public Safety Committee." },
      { item:"Removal of No Parking Restrictions", body:"The Board was to consider removing no parking restrictions on Alta Verde Street south of Jelinek Avenue and on Alderson Street along Kennedy Park." },
      { item:"Intersection Signage at Community Center Drive and Birch St", body:"The Board was to discuss and potentially act on signage at the intersection of Community Center Drive and Birch Street." },
      { item:"Baseball\/Softball Field Maintenance and User Agreement", body:"The Board was to consider a maintenance and user agreement for baseball and softball fields in the Village." },
      { item:"Purchase of Commercial Rotary Mower", body:"The Board was to discuss and potentially authorize the purchase of a commercial rotary mower for Village operations." },
      { item:"Park Shelter Fees and Field Rental Costs", body:"The Board was to review and potentially adjust fees for park shelter rentals and field rental costs." },
      { item:"Eagle Scout Project at Machmueller Park", body:"The Board was to consider an Eagle Scout project proposed for Machmueller Park." },
      { item:"Remote Meeting Attendance Policy", body:"The Board was to review the Elected and Appointed Officials' Handbook policy regarding remote meeting attendance." },
      { item:"Microsoft Teams for Communication", body:"The Board was to discuss and potentially act on using Microsoft Teams as a communication platform." },
      { item:"Military Road Utility Engineering Services Contract", body:"The Board was to consider an engineering services contract for utility work on Military Road." },
      { item:"Bus 51 Storm Pond Engineering Services Contract Amendment", body:"The Board was to consider an amendment to the engineering services contract for the Bus 51 storm pond project." },
      { item:"Sewer Televising Software Contract", body:"The Board was to consider a contract for sewer televising software for infrastructure inspection." },
      { item:"2026 Annual Street Maintenance Plan and Budget", body:"The Board was to review and potentially approve the annual street maintenance plan and associated budget for 2026." },
      { item:"Hospital Area Repaving Change Order #4", body:"The Board was to consider the fourth change order for the hospital area repaving project." },
      { item:"Well 2 Rehabilitation", body:"The Board was to discuss and potentially act on rehabilitation work for the Village's Well 2 water supply infrastructure." },
      { item:"Sign Encroachment Agreement with 7th Floor Investments, LLC", body:"The Board was to consider a sign encroachment agreement with 7th Floor Investments, LLC for Macco's Floor Covering at 3111 Schofield Avenue." },
    ],
    publicComment: "Public comment was on the agenda, allowing persons to address the Board for up to three minutes regarding non-agenda items, with time extensions at the Chief Presiding Officer's discretion.",
    actionItems: [
      "Consider approval of three rezoning ordinances (26-004, 26-005, 26-006)",
      "Consider approval of Resolution 2026-008 for Hinner Springs Second Addition Subdivision final plat",
      "Consider removal of no parking restrictions near Kennedy Park",
      "Consider baseball\/softball field maintenance and user agreement",
      "Consider purchase of commercial rotary mower",
      "Consider park shelter fees and field rental cost adjustments",
      "Consider Eagle Scout project at Machmueller Park",
      "Review remote meeting attendance policy",
      "Consider Microsoft Teams for communication",
      "Consider Military Road utility engineering services contract",
      "Consider Bus 51 storm pond engineering contract amendment",
      "Consider sewer televising software contract",
      "Consider 2026 annual street maintenance plan and budget",
      "Consider Hospital Area repaving change order #4",
      "Consider Well 2 rehabilitation",
      "Consider sign encroachment agreement with 7th Floor Investments, LLC",
    ],
  },
  {
    id: "aUG3K0hxNsU", source: "weston",
    title: "Finance and Human Resources Committee",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=aUG3K0hxNsU",
    docUrl: null,
    badge: "new",
    overview: "This is an agenda for a Village of Weston Board of Trustees meeting, not the Finance and Human Resources Committee meeting indicated in the title. The March 23, 2026 meeting covers a wide range of village business including rezoning ordinances, subdivision approval, infrastructure projects, parks issues, and policy discussions. Note: This summary is based on the agenda document only, not a meeting transcript.",
    agenda: [
      { time:"N\/A", item:"Public Comments" },
      { time:"N\/A", item:"Approval of February 16, 2026, Board of Trustees Meeting Minutes" },
      { time:"N\/A", item:"Acknowledge Reports\/Minutes from Boards, Committees, Commissions" },
      { time:"N\/A", item:"Acknowledge Reports from Departments" },
      { time:"N\/A", item:"Acknowledge February Building Permits" },
      { time:"N\/A", item:"Acknowledge February Budget Status" },
      { time:"N\/A", item:"Acknowledge February Code Enforcement Report" },
      { time:"N\/A", item:"Acknowledge 2025 Code Enforcement Annual Report" },
      { time:"N\/A", item:"Approve Vouchers" },
      { time:"N\/A", item:"Appointment of Agent Change for Reliance Fuel LLC" },
      { time:"N\/A", item:"Ordinance No. 26-004: Rezoning of 8905 Birch Street from RR-5 to SF-S" },
      { time:"N\/A", item:"Ordinance No. 26-005: Rezoning of 7105 Christiansen Avenue from SF-L to SF-S" },
      { time:"N\/A", item:"Ordinance No. 26-006: Amending Speed Limits in Municipal Code" },
      { time:"N\/A", item:"Resolution No. 2026-008: Final Plat of Hinner Springs Second Addition Subdivision" },
      { time:"N\/A", item:"April 2026 Referendum Informational Sessions Update" },
      { time:"N\/A", item:"Proposed E-Bicycle and E-Moto Ordinance Dialogue" },
      { time:"N\/A", item:"Removal of No Parking restrictions on Alta Verde St and Alderson Street" },
      { time:"N\/A", item:"Intersection signage at Community Center Drive and Birch St" },
      { time:"N\/A", item:"Baseball\/Softball Field Maintenance and User Agreement" },
      { time:"N\/A", item:"Purchase of Commercial Rotary Mower" },
      { time:"N\/A", item:"Park Shelter Fees and Field Rental Costs" },
      { time:"N\/A", item:"Eagle Scout Project at Machmueller Park" },
      { time:"N\/A", item:"Review of Elected and Appointed Officials' Handbook Remote Meeting Attendance Policy" },
      { time:"N\/A", item:"Use of Microsoft Teams for Communication" },
      { time:"N\/A", item:"Military Road Utility Engineering Services Contract" },
      { time:"N\/A", item:"Bus 51 Storm Pond Engineering Services Contract Amendment" },
      { time:"N\/A", item:"Sewer Televising Software Contract" },
      { time:"N\/A", item:"2026 Annual Street Maintenance Plan and Budget" },
      { time:"N\/A", item:"Hospital Area Repaving Change Order #4" },
      { time:"N\/A", item:"Well 2 Rehabilitation" },
      { time:"N\/A", item:"Sign Encroachment Agreement with 7th Floor Investments, LLC (Macco's Floor Covering)" },
    ],
    discussions: [
      { item:"Ordinance No. 26-004: Rezoning of 8905 Birch Street", body:"This ordinance would approve rezoning a portion of property at 8905 Birch Street from Rural Residential-5 Acre (RR-5) to Single Family Residential-Small Lot (SF-S) zoning district." },
      { item:"Ordinance No. 26-005: Rezoning of 7105 Christiansen Avenue", body:"This ordinance would approve rezoning a portion of property at 7105 Christiansen Avenue from Single Family Residential-Large Lot (SF-L) to Single Family Residential-Small Lot (SF-S) zoning district." },
      { item:"Ordinance No. 26-006: Speed Limits Amendment", body:"This ordinance would amend Chapter 82.600 of the Municipal Code regarding speed limits in the Village of Weston." },
      { item:"Resolution No. 2026-008: Hinner Springs Second Addition Subdivision", body:"This resolution would approve the final plat for the Hinner Springs Second Addition Subdivision development." },
      { item:"April 2026 Referendum Informational Sessions Update", body:"Discussion-only item regarding updates on informational sessions planned for an April 2026 referendum. This is listed under unfinished business." },
      { item:"E-Bicycle and E-Moto Ordinance", body:"Discussion regarding a proposed ordinance addressing e-bicycles and e-motos, to be referred to the Community Life and Public Safety Committee for dialogue." },
      { item:"Removal of No Parking restrictions", body:"Discussion on potentially removing no parking restrictions on Alta Verde Street south of Jelinek Avenue and on Alderson Street along Kennedy Park." },
      { item:"Baseball\/Softball Field Maintenance and User Agreement", body:"Discussion and potential action on agreements regarding maintenance responsibilities and usage terms for village baseball and softball fields." },
      { item:"Park Shelter Fees and Field Rental Costs", body:"Discussion and potential action on fee structures for park shelter rentals and field usage costs." },
      { item:"Eagle Scout Project at Machmueller Park", body:"Discussion and potential action on an Eagle Scout community service project proposed for Machmueller Park." },
      { item:"Remote Meeting Attendance Policy", body:"Review of the Elected and Appointed Officials' Handbook policy regarding remote meeting attendance for officials." },
      { item:"Microsoft Teams for Communication", body:"Discussion on implementing or expanding use of Microsoft Teams as a communication platform for village operations." },
      { item:"Military Road Utility Engineering Services Contract", body:"Discussion and potential action on an engineering services contract for utility work on Military Road." },
      { item:"Bus 51 Storm Pond Engineering Services Contract Amendment", body:"Discussion and potential action on amending the engineering services contract for the Bus 51 storm pond project." },
      { item:"Sewer Televising Software Contract", body:"Discussion and potential action on a contract for software used in sewer line inspection via televising equipment." },
      { item:"2026 Annual Street Maintenance Plan and Budget", body:"Discussion and potential action on the village's annual plan and budget allocation for street maintenance activities in 2026." },
      { item:"Hospital Area Repaving Change Order #4", body:"Discussion and potential action on the fourth change order for the hospital area repaving project." },
      { item:"Well 2 Rehabilitation", body:"Discussion and potential action on rehabilitation work needed for the village's Well 2 water supply infrastructure." },
      { item:"Sign Encroachment Agreement with Macco's Floor Covering", body:"Discussion and potential action on a sign encroachment agreement with 7th Floor Investments, LLC for Macco's Floor Covering at 3111 Schofield Avenue." },
    ],
    publicComment: "Public comment period was on the agenda, allowing persons to address the Board for up to three minutes on non-agenda items.",
    actionItems: [
      "Vote on approval of February 16, 2026 meeting minutes",
      "Vote on voucher payments (check numbers 66279-66316, 66322-66380, 66396-66429, 90240-90243)",
      "Vote on agent change appointment for Reliance Fuel LLC",
      "Vote on Ordinance No. 26-004 (Birch Street rezoning)",
      "Vote on Ordinance No. 26-005 (Christiansen Avenue rezoning)",
      "Vote on Ordinance No. 26-006 (speed limits amendment)",
      "Vote on Resolution No. 2026-008 (Hinner Springs Second Addition final plat)",
      "Potential action on e-bicycle and e-moto ordinance referral",
      "Potential action on parking restriction removals",
      "Potential action on intersection signage at Community Center Drive and Birch St",
      "Potential action on baseball\/softball field maintenance agreement",
      "Potential action on commercial rotary mower purchase",
      "Potential action on park shelter fees and field rental costs",
      "Potential action on Eagle Scout project at Machmueller Park",
      "Potential action on remote meeting attendance policy",
      "Potential action on Microsoft Teams implementation",
      "Potential action on Military Road utility engineering contract",
      "Potential action on Bus 51 storm pond contract amendment",
      "Potential action on sewer televising software contract",
      "Potential action on 2026 street maintenance plan and budget",
      "Potential action on Hospital Area Repaving Change Order #4",
      "Potential action on Well 2 rehabilitation",
      "Potential action on sign encroachment agreement with Macco's Floor Covering",
    ],
  },
  {
    id: "Izfp0CD_Da0", source: "weston",
    title: "Board of Trustees",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=Izfp0CD_Da0",
    docUrl: null,
    badge: "new",
    overview: "This Village of Weston Board of Trustees meeting was expected to address multiple rezoning ordinances, a subdivision plat approval, infrastructure projects including street maintenance and utility work, and various policy discussions including e-bicycle regulations and park fees. Based on the agenda, not a transcript.",
    agenda: [
      { time:"6:00 p.m.", item:"Public Comments - up to three minutes for non-agenda items" },
      { time:"N\/A", item:"Approval of February 16, 2026 Board of Trustees Meeting Minutes" },
      { time:"N\/A", item:"Acknowledge Reports\/Minutes from Boards, Committees, Commissions" },
      { time:"N\/A", item:"Acknowledge Reports from Departments" },
      { time:"N\/A", item:"Acknowledge February Building Permits" },
      { time:"N\/A", item:"Acknowledge February Budget Status" },
      { time:"N\/A", item:"Acknowledge February Code Enforcement Report" },
      { time:"N\/A", item:"Acknowledge 2025 Code Enforcement Annual Report" },
      { time:"N\/A", item:"Approve Vouchers" },
      { time:"N\/A", item:"Appointment of Agent Change for Reliance Fuel LLC" },
      { time:"N\/A", item:"Ordinance No. 26-004: Rezoning of 8905 Birch Street from RR-5 to SF-S" },
      { time:"N\/A", item:"Ordinance No. 26-005: Rezoning of 7105 Christiansen Avenue from SF-L to SF-S" },
      { time:"N\/A", item:"Ordinance No. 26-006: Amending Speed Limits in Municipal Code" },
      { time:"N\/A", item:"Resolution No. 2026-008: Final Plat of Hinner Springs Second Addition Subdivision" },
      { time:"N\/A", item:"April 2026 Referendum Informational Sessions Update" },
      { time:"N\/A", item:"Proposed E-Bicycle and E-Moto Ordinance Dialogue" },
      { time:"N\/A", item:"Removal of No Parking restrictions on Alta Verde St and Alderson Street" },
      { time:"N\/A", item:"Intersection signage at Community Center Drive and Birch St" },
      { time:"N\/A", item:"Baseball\/Softball Field Maintenance and User Agreement" },
      { time:"N\/A", item:"Purchase of Commercial Rotary Mower" },
      { time:"N\/A", item:"Park Shelter Fees and Field Rental Costs" },
      { time:"N\/A", item:"Eagle Scout Project at Machmueller Park" },
      { time:"N\/A", item:"Review of Elected and Appointed Officials' Handbook Remote Meeting Attendance Policy" },
      { time:"N\/A", item:"Use of Microsoft Teams for Communication" },
      { time:"N\/A", item:"Military Road Utility Engineering Services Contract" },
      { time:"N\/A", item:"Bus 51 Storm Pond Engineering Services Contract Amendment" },
      { time:"N\/A", item:"Sewer Televising Software Contract" },
      { time:"N\/A", item:"2026 Annual Street Maintenance Plan and Budget" },
      { time:"N\/A", item:"Hospital Area Repaving Change Order #4" },
      { time:"N\/A", item:"Well 2 Rehabilitation" },
      { time:"N\/A", item:"Sign Encroachment Agreement with 7th Floor Investments, LLC (Macco's Floor Covering)" },
    ],
    discussions: [
      { item:"Ordinance No. 26-004: Rezoning of 8905 Birch Street", body:"This ordinance would rezone a portion of property at 8905 Birch Street from RR-5 (Rural Residential-5 Acre) to SF-S (Single Family Residential-Small Lot) zoning district, potentially allowing for higher density residential development." },
      { item:"Ordinance No. 26-005: Rezoning of 7105 Christiansen Avenue", body:"This ordinance would rezone a portion of property at 7105 Christiansen Avenue from SF-L (Single Family Residential-Large Lot) to SF-S (Single Family Residential-Small Lot) zoning district, allowing for smaller lot residential development." },
      { item:"Ordinance No. 26-006: Speed Limits Amendment", body:"This ordinance would amend Chapter 82.600 of the Municipal Code regarding speed limits within the Village of Weston." },
      { item:"Resolution No. 2026-008: Hinner Springs Second Addition Subdivision", body:"This resolution would approve the final plat for the Hinner Springs Second Addition Subdivision, advancing a residential development project." },
      { item:"April 2026 Referendum Informational Sessions Update", body:"Discussion-only item to provide an update on informational sessions being held regarding an upcoming April 2026 referendum." },
      { item:"Proposed E-Bicycle and E-Moto Ordinance Dialogue", body:"The Board would discuss a potential ordinance regulating e-bicycles and e-motos, with the matter being reviewed at the Community Life and Public Safety Committee." },
      { item:"Removal of No Parking Restrictions", body:"Discussion on removing no parking restrictions on Alta Verde St south of Jelinek Avenue and Alderson Street along Kennedy Park." },
      { item:"Intersection Signage at Community Center Drive and Birch St", body:"Discussion regarding signage needs at the intersection of Community Center Drive and Birch Street." },
      { item:"Baseball\/Softball Field Maintenance and User Agreement", body:"The Board would review and potentially take action on maintenance responsibilities and user agreements for baseball and softball fields." },
      { item:"Purchase of Commercial Rotary Mower", body:"Discussion and potential action on acquiring a commercial rotary mower for Village maintenance operations." },
      { item:"Park Shelter Fees and Field Rental Costs", body:"Review of fee structures for park shelter rentals and field rental costs within Village parks." },
      { item:"Eagle Scout Project at Machmueller Park", body:"Discussion of a proposed Eagle Scout project to be completed at Machmueller Park." },
      { item:"Remote Meeting Attendance Policy Review", body:"Review of the Elected and Appointed Officials' Handbook section regarding remote meeting attendance policy." },
      { item:"Use of Microsoft Teams for Communication", body:"Discussion on implementing or expanding use of Microsoft Teams as a communication tool for Village operations." },
      { item:"Military Road Utility Engineering Services Contract", body:"Discussion and potential action on an engineering services contract for utility work on Military Road." },
      { item:"Bus 51 Storm Pond Engineering Services Contract Amendment", body:"The Board would consider an amendment to the engineering services contract for the Bus 51 Storm Pond project." },
      { item:"Sewer Televising Software Contract", body:"Discussion and potential action on a contract for sewer televising software used in infrastructure inspection." },
      { item:"2026 Annual Street Maintenance Plan and Budget", body:"Review and potential approval of the Village's annual street maintenance plan and associated budget for 2026." },
      { item:"Hospital Area Repaving Change Order #4", body:"The Board would consider the fourth change order for the Hospital Area repaving project." },
      { item:"Well 2 Rehabilitation", body:"Discussion and potential action on rehabilitation work for Well 2 in the Village's water system." },
      { item:"Sign Encroachment Agreement with Macco's Floor Covering", body:"The Board would consider a sign encroachment agreement with 7th Floor Investments, LLC (Macco's Floor Covering) at 3111 Schofield Avenue." },
    ],
    publicComment: "Public comment period was included on the agenda, allowing up to three minutes per person for non-agenda items, with time extensions at the Chief Presiding Officer's discretion.",
    actionItems: [
      "Vote on Ordinance No. 26-004 rezoning 8905 Birch Street",
      "Vote on Ordinance No. 26-005 rezoning 7105 Christiansen Avenue",
      "Vote on Ordinance No. 26-006 amending speed limits",
      "Vote on Resolution No. 2026-008 approving Hinner Springs Second Addition final plat",
      "Approve vouchers check numbers 66279-66316, 66322-66380, 66396-66429 and 90240-90243",
      "Approve agent change for Reliance Fuel LLC",
      "Action on E-Bicycle and E-Moto ordinance referral to CLPS Committee",
      "Action on parking restriction removals",
      "Action on intersection signage",
      "Action on baseball\/softball field agreement",
      "Action on commercial rotary mower purchase",
      "Action on park shelter fees and field rental costs",
      "Action on Eagle Scout project",
      "Action on remote meeting attendance policy",
      "Action on Microsoft Teams implementation",
      "Action on Military Road utility engineering contract",
      "Action on Bus 51 storm pond contract amendment",
      "Action on sewer televising software contract",
      "Action on 2026 street maintenance plan and budget",
      "Action on Hospital Area repaving change order",
      "Action on Well 2 rehabilitation",
      "Action on sign encroachment agreement",
    ],
  },
  {
    id: "vzy4_Ehx43M", source: "marathon",
    title: "Marathon County Board November 15th 2018",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=vzy4_Ehx43M",
    docUrl: null,
    badge: "new",
    overview: "This agenda document for the Marathon County Board meeting on November 15th, 2018 does not contain the actual agenda items, only providing a link to an external PDF document. Based on the source information, this was a regular meeting of the Marathon County Board of Supervisors, but specific agenda contents cannot be determined from the provided text.",
    agenda: [
      { time:"N\/A", item:"Agenda items not available - external PDF link provided" },
    ],
    discussions: [
      { item:"Agenda contents unavailable", body:"The agenda document only contains a link to an external PDF file hosted on the Marathon County website. Without access to the actual PDF content, specific discussion items cannot be identified." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Unable to determine action items - full agenda not available in provided text",
    ],
  },
  {
    id: "h2SPM8ztYK8", source: "marathon",
    title: "Marathon County Board Regular Meeting - 12-18-18",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=h2SPM8ztYK8",
    docUrl: null,
    badge: "new",
    overview: "This was a regular meeting of the Marathon County Board scheduled for December 18, 2018. Based on the limited agenda information available, the specific items to be covered are contained in the linked agenda packet. This appears to be a year-end regular meeting of the full county board.",
    agenda: [
      { time:"N\/A", item:"Regular meeting agenda items contained in linked packet" },
    ],
    discussions: [
      { item:"Agenda Packet Items", body:"The full agenda and supporting materials were made available via the linked packet document. Specific discussion items would be detailed in that external document." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Review full agenda packet at provided link for complete list of action items",
    ],
  },
  {
    id: "tD9KZ48HTdE", source: "marathon",
    title: "Marathon County Board Educational Meeting - 1-17-19",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=tD9KZ48HTdE",
    docUrl: null,
    badge: "new",
    overview: "This was an educational meeting of the Marathon County Board scheduled for January 17, 2019. Based on the limited agenda information available, this appears to have been a board educational session, though specific topics were not detailed in the provided agenda text.",
    agenda: [
      { time:"N\/A", item:"Educational Meeting Session" },
    ],
    discussions: [
      { item:"Educational Meeting Session", body:"This was scheduled as an educational meeting for the Marathon County Board. The specific educational topics and presentations were contained in the referenced meeting packet but not detailed in the agenda text provided." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Review meeting packet materials available at the referenced URL",
    ],
  },
  {
    id: "G1Xgr4AkOW0", source: "marathon",
    title: "Marathon County Public Safety Committee Meeting",
    date: "March 10, 2026", shortDate: "MAR 10",
    committee: "Public Safety", duration: "~1h",
    url: "https://www.youtube.com/watch?v=G1Xgr4AkOW0",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18036/639084087050970000",
    badge: "new",
    overview: "This Marathon County Public Safety Committee meeting was scheduled for March 10, 2026. Based on the limited information available from the agenda source, the meeting was expected to address matters related to public safety in Marathon County. Note: Full agenda details were not available in the provided text.",
    agenda: [
      { time:"N\/A", item:"Public Safety Committee business items (specific items not detailed in provided agenda text)" },
    ],
    discussions: [
      { item:"Public Safety Committee business", body:"The specific discussion items for this meeting were not detailed in the provided agenda text. The full agenda packet is available via the Marathon County website link." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Review full agenda packet at marathoncounty.gov for complete meeting details",
    ],
  },
  {
    id: "lvYNMGnVL6s", source: "marathon",
    title: "Marathon County Executive Committee Meeting",
    date: "March 12, 2026", shortDate: "MAR 12",
    committee: "Executive Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=lvYNMGnVL6s",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18014/639088419907254276",
    badge: "new",
    overview: "The Marathon County Executive Committee was scheduled to meet on March 12, 2026. Based on the limited agenda information available, the specific items to be discussed cannot be determined from the provided text. The full agenda packet is available through the county's website.",
    agenda: [
      { time:"N\/A", item:"Agenda details not provided in source text - full packet available at county website" },
    ],
    discussions: [
      { item:"Meeting agenda contents", body:"The specific agenda items for this Executive Committee meeting were not included in the provided text. The full agenda and packet are available through the Marathon County website link provided." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Review full agenda packet at marathoncounty.gov for complete meeting details",
    ],
  },
  {
    id: "eIjwnwe6aBE", source: "marathon",
    title: "Marathon County Board Education Meeting Pt.2",
    date: "March 19, 2026", shortDate: "MAR 19",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=eIjwnwe6aBE",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18076/639089973815830000",
    badge: "new",
    overview: "This is Part 2 of a Marathon County Board Education Meeting scheduled for March 19, 2026. Based on the limited agenda information available, this appears to be a continuation of an educational session for county board members. The specific topics to be covered are not detailed in the provided agenda text.",
    agenda: [
      { time:"N\/A", item:"Education Meeting Part 2 - Continuation of board education session" },
    ],
    discussions: [
      { item:"Board Education Session Part 2", body:"This agenda indicates a continuation of an educational meeting for Marathon County Board members. The specific educational topics and presentations are not detailed in the available agenda document." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Review full agenda packet at provided Marathon County link for complete meeting details",
    ],
  },
  {
    id: "bb_719202", source: "school_board",
    title: "Audit of the Bills Committee Meeting - 2025-11-24",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Audit of the Bills Committee Meeting", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_719202",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=719202",
    badge: "new",
    overview: "This Audit of the Bills Committee meeting focused on reviewing and approving the district's financial expenditures for November 2025. The committee examined bills requiring payment authorization as part of standard fiscal oversight responsibilities for the Wausau School District.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Audit of the Bills" },
      { time:"0:07", item:"Adjourn" },
    ],
    discussions: [
      { item:"Audit of the Bills", body:"The committee reviewed the November 2025 audit of bills document, which details district expenditures requiring approval. This attachment was uploaded on November 18, 2025 and contains financial obligations the district needs to pay." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Approval of November 2025 bills for payment",
    ],
  },
  {
    id: "bb_719203", source: "school_board",
    title: "Education\/Operations Committee Meeting - 2025-11-24",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Education\/Operations Committee Meeting", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_719203",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=719203",
    badge: "new",
    overview: "The Wausau School District Education\/Operations Committee meeting covered the renewal of 4K program partnerships with community sites, presented an annual safety update including lockdown and evacuation drill results, and reviewed 43 Neola policy updates. The meeting also featured an Excellence in Action presentation from John Marshall Elementary.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Approve the Minutes" },
      { time:"0:05", item:"Public and Student Comment" },
      { time:"0:15", item:"Excellence in Action: John Marshall Elementary" },
      { time:"0:25", item:"4K Program Agreement (Action Requested)" },
      { time:"0:30", item:"Annual Safety Update \/ Drill Debrief" },
      { time:"0:50", item:"Neola Policies Update (Action Requested)" },
      { time:"1:10", item:"Adjourn" },
    ],
    discussions: [
      { item:"4K Program Agreement", body:"The district's four-year-old kindergarten program is seeking approval to renew program agreements with six community collaboration sites for the 2026-2027 school year, including Wausau Child Care, Mountain View Montessori, Woodson YMCA, Newman Catholic Schools, and Marathon County Head Start. These partnerships have been in place since 2002, and the 4K Principal and Director of Elementary Education will review the agreement terms." },
      { item:"Annual Safety Update \/ Drill Debrief", body:"The district is implementing the I Love U Guys Standard Response Protocol (SRP) with standardized vocabulary including HOLD, SECURE, LOCKDOWN, EVACUATE, and SHELTER for consistent emergency responses. Security highlights include secure building entrances, Visitor Aware System, security cameras, and locked exterior doors, with district-wide LOCKDOWN drills conducted in September and EVACUATION drills in October in partnership with Wausau Police Department and School Resource Officers." },
      { item:"Neola Policies Update", body:"The committee will review proposed changes to 43 district policies covering a wide range of topics including board member conduct, employment of substitutes, student entrance age, third grade retention, academic honesty, drug possession, drone use, school safety, wellness, and religious activities. The policies include both Volume 34 Number 2 updates and technical corrections to existing policies." },
    ],
    publicComment: "A public and student comment period was included on the agenda.",
    actionItems: [
      "Approve 4K Program Agreement with six community partner sites for 2026-2027 school year",
      "Approve Neola Policies Update including Volume 34 Number 2 changes and technical corrections",
      "Approve the Minutes from October 27, 2025 meeting",
    ],
  },
  {
    id: "bb_719210", source: "school_board",
    title: "Special Meeting - 2025-11-24",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Special Meeting", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_719210",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=719210",
    badge: "new",
    overview: "This special meeting of the Wausau School District Board of Education focused primarily on closed session discussions regarding real estate negotiations and the evaluation of the Superintendent of Schools. The meeting addressed confidential matters that required private deliberation under Wisconsin state statutes.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Request for Closed Session Pursuant to State Statutes" },
      { time:"0:04", item:"Discussion regarding the Competitive Negotiations of a Purchase\/Sale of Real Estate s. 19.85 (1)(e)" },
      { time:"0:24", item:"Evaluation of Superintendent of Schools s. 19.85 (1)(c)" },
      { time:"0:44", item:"Reconvene in Open Session, and if Necessary, Take Action as a Result of the Closed Session" },
      { time:"0:49", item:"Adjourn" },
    ],
    discussions: [
      { item:"Discussion regarding the Competitive Negotiations of a Purchase\/Sale of Real Estate", body:"The board entered closed session under Wisconsin statute 19.85(1)(e) to discuss competitive negotiations related to the purchase or sale of real estate. This exemption allows boards to deliberate privately on property transactions to protect the district's negotiating position." },
      { item:"Evaluation of Superintendent of Schools", body:"The board conducted a closed session evaluation of the Superintendent of Schools under Wisconsin statute 19.85(1)(c). This statute permits private discussion of employee performance evaluations to protect personnel privacy while allowing candid board assessment." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Potential action as a result of closed session discussions regarding real estate negotiations",
      "Potential action as a result of closed session discussions regarding Superintendent evaluation",
    ],
  },
  {
    id: "bb_720719", source: "school_board",
    title: "Regular Meeting - 2025-12-08",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Regular Meeting", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_720719",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=720719",
    badge: "new",
    overview: "The Wausau School District Board of Education held a regular meeting covering referendum construction updates for elementary schools, a Red Granite Charter School status update, 4K program agreements, annual safety updates, and numerous policy revisions. Key actions included approving a resolution of commendation for Rob Hughes and reviewing 50% completion designs for John Marshall, Rib Mountain, Franklin Elementaries, and Lincoln Early Learning Academy.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Roll Call" },
      { time:"0:04", item:"Pledge of Allegiance: Jim Bouché, President" },
      { time:"0:06", item:"Reading of the Mission Statement" },
      { time:"0:08", item:"Resolution of Commendation: Rob Hughes (Action Requested)" },
      { time:"0:13", item:"Public and Student Comment" },
      { time:"0:23", item:"Approve Consent Agenda (Action Requested)" },
      { time:"0:28", item:"Old\/Recurring Business - 50% Updates for Elementary Referendum Construction" },
      { time:"0:43", item:"Old\/Recurring Business - Education\/Operations Committee Meeting" },
      { time:"0:48", item:"New Business - Red Granite Update (Action Requested)" },
      { time:"0:53", item:"New Business - Education\/Operations Committee Meeting - 4K Program Agreement (Action Requested)" },
      { time:"0:55", item:"New Business - Annual Safety Update \/ Drill Debrief" },
      { time:"0:57", item:"New Business - Neola Policies Update (Action Requested)" },
      { time:"1:02", item:"Open Forum - Board Member Professional Growth & Development Report" },
      { time:"1:07", item:"Open Forum - Legislative Liaison" },
      { time:"1:12", item:"Open Forum - Superintendent Commentary" },
      { time:"1:17", item:"Open Forum - Presiding Officer Commentary" },
      { time:"1:22", item:"Adjourn" },
    ],
    discussions: [
      { item:"50% Updates for Elementary Referendum Construction", body:"As referendum-funded improvement plans develop for each facility, the Board received updates when designs reach 50% completion. Current plans for John Marshall, Rib Mountain, Franklin Elementaries, and Lincoln Early Learning Academy were shared with the Board during this 15-minute presentation." },
      { item:"Red Granite Update", body:"Red Granite Principal Maud Mangin and Red Granite Governance Board President Amanda Molin shared an update on the status of the Red Granite Charter School. This 5-minute presentation required board action." },
      { item:"4K Program Agreement", body:"The Wausau School District four-year-old kindergarten program sought approval to enter into agreements with community collaboration partner sites for the 2026-2027 school year, including Wausau Child Care, Mountain View Montessori, Woodson YMCA Wausau Branch, Newman Catholic Schools, and Marathon County Child Development Agency Head Start Program - Barrington Center." },
      { item:"Annual Safety Update \/ Drill Debrief", body:"At the November Education\/Operations Committee Meeting, Andy Grimm and members of the Wausau Police Department shared the annual safety update. They also shared information about the partnership between the Wausau Police Department and the district, especially with School Resource Officers." },
      { item:"Neola Policies Update", body:"At the November Education\/Operations Committee meeting, proposed changes to 43 attached policies were reviewed. The policies cover a wide range of topics including board member conduct, employment practices, student policies, school safety, food service, and wellness." },
    ],
    publicComment: "A public and student comment period was included on the agenda.",
    actionItems: [
      "Resolution of Commendation for Rob Hughes",
      "Approve Consent Agenda including appointments, separations, leaves of absence, retirements, meeting minutes, payment of bills, and donations",
      "Red Granite Update approval",
      "4K Program Agreement with partner sites for 2026-2027 school year",
      "Neola Policies Update approval",
    ],
  },
  {
    id: "bb_720900", source: "school_board",
    title: "Audit of the Bills Committee Meeting - 2025-12-15",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Audit of the Bills Committee Meeting", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_720900",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=720900",
    badge: "new",
    overview: "The Audit of the Bills Committee met to review and approve the district's financial obligations for December 2025. This routine meeting ensures proper oversight of Wausau School District expenditures before payments are processed.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Audit of the Bills" },
      { time:"0:07", item:"Adjourn" },
    ],
    discussions: [
      { item:"Audit of the Bills", body:"Committee members reviewed the December 2025 bills for the district, documented in an attachment dated December 9, 2025. This review ensures all expenditures are appropriate and properly documented before authorization for payment." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Review and approval of December 2025 bills",
    ],
  },
  {
    id: "bb_720918", source: "school_board",
    title: "Special Meeting - 2025-12-15",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Special Meeting", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_720918",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=720918",
    badge: "new",
    overview: "This special meeting of the Wausau School District Board of Education focused primarily on closed session matters including administrator contracts, staff performance discussions, and real estate negotiations. The board also planned to recognize Ellie Mason with a Resolution of Commendation.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Request for Closed Session Pursuant to State Statutes" },
      { time:"0:04", item:"Approve Administrator Contracts and Discuss Performance and Employment of a Staff Member s. 19.85 (1)(c)" },
      { time:"0:20", item:"Discussion regarding the Competitive Negotiations of a Purchase\/Sale of Real Estate s. 19.85 (1)(e)" },
      { time:"0:35", item:"Reconvene in Open Session, to take further action if necessary and appropriate" },
      { time:"0:40", item:"Resolution of Commendation: Ellie Mason (Action Requested)" },
      { time:"0:45", item:"Adjourn" },
    ],
    discussions: [
      { item:"Approve Administrator Contracts and Discuss Performance and Employment of a Staff Member", body:"The board entered closed session under Wisconsin Statute 19.85(1)(c) to discuss administrator contracts and matters related to the performance and employment of staff members. This statute permits closed sessions for considering employment, promotion, compensation, or performance evaluation data of public employees." },
      { item:"Discussion regarding the Competitive Negotiations of a Purchase\/Sale of Real Estate", body:"The board discussed competitive negotiations related to the purchase or sale of real estate in closed session under Wisconsin Statute 19.85(1)(e). This provision allows closed deliberation when competitive or bargaining reasons require confidentiality regarding property transactions." },
      { item:"Resolution of Commendation: Ellie Mason", body:"The board considered a formal resolution of commendation recognizing Ellie Mason. An attachment with the resolution details was included in the meeting packet dated 12\/12\/2025." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Approve Administrator Contracts",
      "Take action on matters discussed in closed session if necessary",
      "Approve Resolution of Commendation for Ellie Mason",
    ],
  },
  {
    id: "bb_720901", source: "school_board",
    title: "Education\/Operations Committee Meeting - 2025-12-15",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Education\/Operations Committee Meeting", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_720901",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=720901",
    badge: "new",
    overview: "The Education\/Operations Committee meeting focused on open enrollment space availability for 2026-2027, snow day communication procedures, and renewal of several athletic co-op agreements with neighboring schools. The meeting also featured a performance and excellence recognition for John Muir Middle School, followed by a tour of recent school updates.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"John Muir Pop Jazz Performance" },
      { time:"0:10", item:"Approve the Minutes" },
      { time:"0:12", item:"Excellence in Action: John Muir Middle School" },
      { time:"0:20", item:"Public and Student Comment" },
      { time:"0:30", item:"Open Enrollment Seat Availability (Action Requested)" },
      { time:"0:35", item:"Snow Day Communication & Procedures" },
      { time:"0:40", item:"Approve Co-Ops (Action Requested)" },
      { time:"0:45", item:"Adjourn" },
    ],
    discussions: [
      { item:"Open Enrollment Seat Availability", body:"Wendy Cartledge presented the Open Enrollment Space Determinations for the 2026-2027 school year. This determines how many seats will be available for students from outside the district to enroll in Wausau schools." },
      { item:"Snow Day Communication & Procedures", body:"Diana White and Dr. Katie Colwell presented information on communications and procedures for snow days. The presentation addressed what happens beyond the first three snow days during the school year." },
      { item:"Approve Co-Ops", body:"Athletic directors BJ Brandt and Darci Mick Beversdorf presented information on multiple athletic co-op renewals for 2026-2028, including boys hockey with East\/Merrill\/Newman Catholic, girls lacrosse with East\/West\/DCE\/Mosinee, and girls STORM hockey with East\/West\/DCE\/Mosinee plus the addition of Merrill and Stratford." },
    ],
    publicComment: "A public and student comment period was included on the agenda.",
    actionItems: [
      "Approve Open Enrollment Space Determinations for 2026-2027",
      "Approve Co-Op renewal for boys hockey East\/Merrill\/Newman Catholic for 26-27 and 27-28 school years",
      "Approve Co-Op renewal for girls lacrosse East\/West\/DCE\/Mosinee for 26-27 and 27-28 school years",
      "Approve Co-Op renewal for girls STORM hockey with addition of Merrill and Stratford for 26-27 and 27-28 school years",
      "Approve the Minutes",
    ],
  },
  {
    id: "bb_724381", source: "school_board",
    title: "Special Meeting - 2026-01-05",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Special Meeting", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_724381",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=724381",
    badge: "new",
    overview: "This special meeting of the Wausau School District Board of Education focuses primarily on personnel matters, including routine staff appointments and separations, as well as two closed sessions to address employee discipline and administrator contracts. The meeting includes a quasi-judicial hearing regarding allegations of employee conduct and potential termination.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Approve Consent Agenda (Action Requested)" },
      { time:"0:07", item:"Request for Closed Session Pursuant to State Statutes - Employee Conduct Hearing" },
      { time:"0:10", item:"Reconvene in Open Session" },
      { time:"0:12", item:"Request for Closed Session Pursuant to State Statutes - Administrator Contracts" },
      { time:"0:15", item:"Reconvene in Open Session" },
      { time:"0:17", item:"Adjourn" },
    ],
    discussions: [
      { item:"Consent Agenda", body:"The consent agenda includes personnel actions covering appointments of additional and replacement staff, contract increases, separations including resignations, contract decreases and terminations, leaves of absence, and retirements." },
      { item:"Closed Session - Employee Conduct Hearing", body:"The board will convene in closed session to receive evidence concerning allegations regarding employee conduct and an administrative recommendation for termination. The board will deliberate on evidence received during a quasi-judicial hearing and may also consider an employee resignation agreement." },
      { item:"Closed Session - Administrator Contracts", body:"The board will meet in closed session to approve administrator contracts and discuss the performance and employment of staff members pursuant to Wisconsin Statute 19.85(1)(c)." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Approve Consent Agenda including staff appointments, separations, leaves of absence, and retirements",
      "Take action regarding employee conduct and potential termination following closed session deliberation",
      "Approve administrator contracts following closed session discussion",
    ],
  },
  {
    id: "bb_722755", source: "school_board",
    title: "Regular Meeting - 2026-01-12",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Regular Meeting", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_722755",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=722755",
    badge: "new",
    overview: "This regular meeting of the Wausau School District Board of Education covered the approval of the 2024-25 audit report, WASB delegate voting directions, a Wausau West chiller replacement discussion, and various cooperative sports agreements. The board also addressed open enrollment seat availability for 2026-27 and conducted closed session discussions regarding potential litigation and superintendent evaluation.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Roll Call" },
      { time:"0:04", item:"Pledge of Allegiance" },
      { time:"0:06", item:"Reading of the Mission Statement" },
      { time:"0:08", item:"Public and Student Comment" },
      { time:"0:18", item:"Approve Consent Agenda" },
      { time:"0:23", item:"Old\/Recurring Business - Education\/Operations Committee Meeting" },
      { time:"0:28", item:"New Business - Approve the 2024-25 Audit Report" },
      { time:"0:43", item:"New Business - WASB Resolutions" },
      { time:"0:53", item:"New Business - Wausau West Chiller Discussion" },
      { time:"1:08", item:"New Business - Resolution Authorizing Entry into Intergovernmental Cooperation Agreement for Wisconsin Investment Series Cooperative" },
      { time:"1:13", item:"New Business - Education\/Operations Committee Meeting - Open Enrollment Seat Availability" },
      { time:"1:14", item:"New Business - Education\/Operations Committee Meeting - Approve Co-Ops" },
      { time:"1:19", item:"Open Forum - Board Member Professional Growth & Development Report" },
      { time:"1:24", item:"Open Forum - Legislative Liaison" },
      { time:"1:29", item:"Open Forum - Superintendent Commentary" },
      { time:"1:34", item:"Open Forum - Presiding Officer Commentary" },
      { time:"1:39", item:"Request for Closed Session - Preliminary Discussion Regarding Potential Litigation" },
      { time:"1:44", item:"Request for Closed Session - Evaluation of Superintendent of Schools" },
      { time:"1:49", item:"Reconvene in Open Session" },
      { time:"1:54", item:"Adjourn" },
    ],
    discussions: [
      { item:"Approve the 2024-25 Audit Report", body:"Amber Ebert from Hawkins Ash CPAs will present the results of the Wausau School District's June 30, 2025 Audited Financial Statements to the Board. This presentation is estimated to take 15 minutes." },
      { item:"WASB Resolutions", body:"The Board will review the proposed Wisconsin Association of School Boards Resolutions and direct the WASB Delegate on how to vote on behalf of the District. A late addition resolution regarding proposed amendments to WASB bylaws was included." },
      { item:"Wausau West Chiller Discussion", body:"Elizabeth Channel, Interim Assistant Superintendent of Operations, and Ryan Urmanski, Director of Buildings and Grounds, will present a request to solicit bids for the replacement of the chiller system at Wausau West High School." },
      { item:"Resolution Authorizing Entry into Intergovernmental Cooperation Agreement for Wisconsin Investment Series Cooperative", body:"Elizabeth Channel is presenting a resolution to allow the District to continue its membership in the Wisconsin Investment Series Cooperative. The District has been a member for many years, and this resolution updates authorization that is over ten years old." },
      { item:"Open Enrollment Seat Availability", body:"At the December Education\/Operations Committee Meeting, Wendy Cartledge presented the Open Enrollment Space Determinations for the 2026-2027 school year." },
      { item:"Approve Co-Ops", body:"The Board will consider co-op renewals for boys hockey (East\/Merrill\/Newman Catholic), girls lacrosse (East\/West\/DCE\/Mosinee), and girls STORM hockey (East\/West\/DCE\/Mosinee with addition of Merrill and Stratford) for the 26-27 and 27-28 school years." },
    ],
    publicComment: "A public and student comment period was included on the agenda.",
    actionItems: [
      "Approve Consent Agenda including appointments, separations, leaves, retirements, meeting minutes, payment of bills, and donations",
      "Approve the 2024-25 Audit Report",
      "Direct WASB Delegate voting on proposed resolutions",
      "Possible action on Wausau West Chiller replacement bid solicitation",
      "Approve Resolution for Wisconsin Investment Series Cooperative membership",
      "Approve Open Enrollment Seat Availability for 2026-27",
      "Approve Co-Op renewals for boys hockey, girls lacrosse, and girls STORM hockey",
    ],
  },
  {
    id: "bb_726407", source: "school_board",
    title: "Audit of the Bills Committee Meeting - 2026-01-26",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Audit of the Bills Committee Meeting", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_726407",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=726407",
    badge: "new",
    overview: "The Audit of the Bills Committee met to review and approve the district's financial expenditures for the billing period. This routine fiscal oversight meeting ensures proper authorization of Wausau School District payments.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Audit of the Bills" },
      { time:"0:07", item:"Adjourn" },
    ],
    discussions: [
      { item:"Audit of the Bills", body:"Committee members reviewed the January 26 audit of bills document containing district expenditures requiring approval. The attachment was prepared and uploaded on January 22, 2026 for committee review prior to the meeting." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Approve the audit of bills for January 26, 2026",
    ],
  },
  {
    id: "bb_726408", source: "school_board",
    title: "Education\/Operations Committee Meeting - 2026-01-26",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Education\/Operations Committee Meeting", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_726408",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=726408",
    badge: "new",
    overview: "The Education\/Operations Committee meeting focused on referendum project designs for four elementary schools reaching 95% completion, financial planning assumptions, and student demographics. The committee also addressed the 2026-2027 school calendar approval and potential changes to board governance structure.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Approve the Minutes" },
      { time:"0:05", item:"Excellence in Action: G.D. Jones Elementary" },
      { time:"0:10", item:"Excellence in Action: Rib Mountain Elementary" },
      { time:"0:15", item:"Public and Student Comment" },
      { time:"0:25", item:"Franklin, Rib Mountain, Lincoln & John Marshall 95% Design (Action Requested)" },
      { time:"0:35", item:"Legal Expenses for 2nd Quarter of 2025-2026" },
      { time:"0:40", item:"Approve 2026-2027 District Calendar (Action Requested)" },
      { time:"0:45", item:"Presentation of Financial Projection Model Assumptions" },
      { time:"1:00", item:"2025-2026 Student Demographic Report" },
      { time:"1:10", item:"Governance Model Option (Possible Action)" },
      { time:"1:20", item:"ADJOURN" },
    ],
    discussions: [
      { item:"Franklin, Rib Mountain, Lincoln & John Marshall 95% Design", body:"As referendum projects for these four elementary schools reach the end of the design phase at 95% completion, the Board reviewed the designs and budgets. The Committee was asked to approve these plans to be issued for competitive bidding." },
      { item:"Legal Expenses for 2nd Quarter of 2025-2026", body:"Interim Assistant Superintendent of Operations Elizabeth Channel presented a summary report of all legal counsel expenses incurred during the second quarter of 2025-2026. The report was broken down by law firm and type of legal advice sought, requiring no action." },
      { item:"Approve 2026-2027 District Calendar", body:"Diana White presented a draft of the 2026-2027 school year calendar for School Board review. The committee was asked to consider approval of the calendar." },
      { item:"Presentation of Financial Projection Model Assumptions", body:"Interim Assistant Superintendent Elizabeth Channel shared key variables contributing to the District's multi-year financial projection model. The model represents a baseline using current information from the 2025-2026 budget with percentages and dollar amounts projected forward, with the full projection model to be presented at a later date." },
      { item:"2025-2026 Student Demographic Report", body:"Director of Technology Ralph Williams presented the Demographics Report for the 2025-2026 school year. The report provided data on student demographics across the district." },
      { item:"Governance Model Option", body:"The Board continued discussion about potentially changing the Audit of the Bills Committee and clarifying the purpose of the Education\/Operations Committee with a potential rename of the meeting." },
    ],
    publicComment: "A Public and Student Comment period was included on the agenda.",
    actionItems: [
      "Approve the Minutes from December 15, 2025",
      "Approve Franklin, Rib Mountain, Lincoln & John Marshall 95% Design for competitive bidding",
      "Approve 2026-2027 District Calendar",
      "Consider changes to Governance Model regarding Audit of Bills Committee and Education\/Operations Committee",
    ],
  },
  {
    id: "bb_727610", source: "school_board",
    title: "Special Meeting - 2026-01-26",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Special Meeting", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_727610",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=727610",
    badge: "new",
    overview: "This special meeting of the Wausau School District Board of Education focused on personnel matters through the consent agenda, approval of the 2026-2027 school year calendar, and a closed session for the evaluation of the Superintendent of Schools. The meeting addressed routine staffing changes and set the academic calendar for the upcoming school year.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Approve Consent Agenda (Action Requested) - Appointments, Separations, Leaves of Absence, Retirements" },
      { time:"0:07", item:"Approve 2026-2027 District Calendar (Action Requested)" },
      { time:"0:10", item:"Request for Closed Session Pursuant to State Statutes - Evaluation of Superintendent of Schools" },
      { time:"0:12", item:"Reconvene in Open Session, and if Necessary, Take Action as a Result of the Closed Session" },
      { time:"0:15", item:"Adjourn" },
    ],
    discussions: [
      { item:"Approve 2026-2027 District Calendar", body:"Diana White previously presented a draft of the 2026-2027 school year calendar for School Board review. The board was asked to approve the calendar at this meeting, with an estimated presentation time of 1 minute." },
      { item:"Evaluation of Superintendent of Schools", body:"The board entered closed session pursuant to Wisconsin State Statute s. 19.85 (1)(c) to conduct an evaluation of the Superintendent of Schools. This is a personnel matter that requires confidential discussion under state law." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Approve Consent Agenda including appointments, separations, leaves of absence, and retirements",
      "Approve 2026-2027 District Calendar",
      "Potential action following closed session regarding Superintendent evaluation",
    ],
  },
  {
    id: "bb_728873", source: "school_board",
    title: "Regular Meeting - 2026-02-09",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Regular Meeting", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_728873",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=728873",
    badge: "new",
    overview: "This Regular Meeting of the Wausau School District Board of Education covered referendum-related school design approvals, a chiller system replacement at Wausau West, and an update on the Wausau East hockey program following the disbandment of a co-op agreement. The board also addressed financial projections, governance model changes, and recognized School Bus Driver Appreciation Week.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Roll Call" },
      { time:"0:04", item:"Pledge of Allegiance" },
      { time:"0:06", item:"Reading of the Mission Statement" },
      { time:"0:08", item:"Proclamation: School Bus Driver Appreciation Week" },
      { time:"0:13", item:"Excellence in Action: 4K & EC Programs" },
      { time:"0:23", item:"Public and Student Comment" },
      { time:"0:38", item:"Approve Consent Agenda" },
      { time:"0:43", item:"Old\/Recurring Business - Education\/Operations Committee Meeting" },
      { time:"0:45", item:"Franklin, Rib Mountain, Lincoln & John Marshall 95% Design" },
      { time:"0:47", item:"Legal Expenses for 2nd Quarter of 2025-2026" },
      { time:"0:49", item:"2025-2026 Student Demographic Report" },
      { time:"0:51", item:"New Business - Wausau West Chiller System" },
      { time:"1:01", item:"Wausau East Hockey Update" },
      { time:"1:16", item:"Presentation of Financial Projection Model Assumptions" },
      { time:"1:18", item:"Governance Model Option" },
      { time:"1:20", item:"Open Forum - Board Member Professional Growth & Development Report" },
      { time:"1:25", item:"Legislative Liaison" },
      { time:"1:30", item:"Superintendent Commentary" },
      { time:"1:35", item:"Presiding Officer Commentary" },
      { time:"1:40", item:"Request for Closed Session - Competitive Negotiations of Purchase\/Sale of Real Estate" },
      { time:"1:45", item:"Reconvene in Open Session" },
      { time:"1:50", item:"Adjourn" },
    ],
    discussions: [
      { item:"Franklin, Rib Mountain, Lincoln & John Marshall 95% Design", body:"As referendum projects reach the end of the design phase at 95% completion, the Board reviewed designs and budgets for four elementary schools. The Board was asked to approve these plans to be issued for competitive bidding." },
      { item:"Legal Expenses for 2nd Quarter of 2025-2026", body:"Interim Assistant Superintendent Elizabeth Channel presented a summary report of all legal counsel expenses incurred during the second quarter of 2025-2026. The report was broken down by law firm and type of legal advice sought, requiring no action." },
      { item:"2025-2026 Student Demographic Report", body:"Director of Technology Ralph Williams presented the Demographics Report for the 2025-2026 school year at the January Education\/Operations Committee Meeting." },
      { item:"Wausau West Chiller System", body:"Interim Assistant Superintendent Elizabeth Channel and Director of Buildings and Grounds Ryan Urmanski presented a request to approve the bid for replacement of the chiller system at Wausau West High School." },
      { item:"Wausau East Hockey Update", body:"An informational presentation was provided on the disbandment of the East\/Merrill Boys Hockey Co-Op and potential options for the district, Wausau East, and East Hockey players going forward." },
      { item:"Presentation of Financial Projection Model Assumptions", body:"Interim Assistant Superintendent Elizabeth Channel shared key variables contributing to the District's multi-year financial projection model. The model uses 2025-2026 budget numbers with percentages and dollar amounts projected forward, with the full projection model to be presented at a later date." },
      { item:"Governance Model Option", body:"Discussion centered on potentially changing the Audit of the Bills Committee and clarifying the purpose of the Education\/Operations Committee with a potential rename of the meeting." },
    ],
    publicComment: "A public and student comment period was included on the agenda.",
    actionItems: [
      "Approve Consent Agenda including appointments, separations, leaves of absence, retirements, minutes, payment of bills, and donations",
      "Approve Franklin, Rib Mountain, Lincoln & John Marshall 95% Design for bidding",
      "Approve Wausau West Chiller System bid",
      "Consider action on Governance Model Option",
      "Potential action following closed session on real estate negotiations",
    ],
  },
  {
    id: "bb_733411", source: "school_board",
    title: "Special Meeting - 2026-02-23",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Special Meeting", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_733411",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=733411",
    badge: "new",
    overview: "This special meeting of the Wausau School District Board of Education focused primarily on personnel matters through the consent agenda and a closed session regarding potential litigation. The meeting addressed staffing changes including appointments, separations, leaves of absence, and retirements.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Approve Consent Agenda (Action Requested) - Appointments, Separations, Leaves of Absence, Retirements" },
      { time:"0:07", item:"Request for Closed Session Pursuant to State Statutes - Preliminary Discussion Regarding Potential Litigation" },
      { time:"0:12", item:"Reconvene in Open Session" },
      { time:"0:14", item:"Adjourn" },
    ],
    discussions: [
      { item:"Approve Consent Agenda", body:"The consent agenda included personnel matters covering appointments of additional and replacement staff with contract increases, separations including resignations, contract decreases and terminations, leaves of absence, and retirements. An addendum was added to the consent agenda on 2\/23\/2026 at 2:22 PM." },
      { item:"Preliminary Discussion Regarding Potential Litigation", body:"The board entered closed session under Wisconsin Statute 19.85(g) for preliminary discussion regarding potential litigation. This statute allows closed sessions for conferring with legal counsel concerning strategy related to litigation matters." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Approve Consent Agenda including appointments, separations, leaves of absence, and retirements",
      "Vote on entering closed session for potential litigation discussion",
      "Take further action if necessary following closed session",
    ],
  },
  {
    id: "bb_732366", source: "school_board",
    title: "Committee of the Whole Meeting - 2026-02-23",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Committee of the Whole", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_732366",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=732366",
    badge: "new",
    overview: "The Wausau School District Board Committee of the Whole meeting focused on financial planning with a five-year fiscal forecast presentation, mid-year AGR school performance reports, and an extensive policy update review. The meeting also featured recognition of the district planetarium and Wausau West High School, along with a referendum budget update for ongoing facility improvements.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Approve the Minutes" },
      { time:"0:05", item:"Audit of the Bills" },
      { time:"0:10", item:"Excellence in Action: Wausau School District Planetarium" },
      { time:"0:20", item:"Excellence in Action: Wausau West High School" },
      { time:"0:30", item:"Public and Student Comment" },
      { time:"0:45", item:"Five Year Fiscal Forecast" },
      { time:"1:00", item:"AGR Annual Report" },
      { time:"1:10", item:"NEOLA UPDATE (Action Requested)" },
      { time:"1:30", item:"Referendum Budget Update" },
      { time:"1:40", item:"Adjourn" },
    ],
    discussions: [
      { item:"Five Year Fiscal Forecast", body:"The Board received a five-year fiscal forecast model for the District that will be used during the next three months to aid in constructing the 2026-27 budget reconciliation plan. Administration noted that projections are based on many variables that change periodically and will update the Board as significant changes occur." },
      { item:"AGR Annual Report", body:"This mid-year update presented AGR student outcome scores required by DPI, featuring screening results and work being done at the three AGR schools to strengthen organizational systems. The report demonstrated how these schools are evolving their practices to improve student achievement." },
      { item:"NEOLA UPDATE", body:"The Committee reviewed proposed changes to numerous district policies, with some involving technical corrections and others being more substantial. Policy areas covered include board member conduct, student supervision, cell phones, homeless students, third grade promotion, debt management, purchasing, and school support organizations." },
      { item:"Referendum Budget Update", body:"As the April 2022 referendum funded facility improvements continue to develop, construction and budget updates were presented as part of routine reporting until projects are completed." },
    ],
    publicComment: "Public and Student Comment period was included on the agenda.",
    actionItems: [
      "NEOLA Policy Updates approval including policies on definitions, board member behavior, student supervision, reading instruction, cell phones, third grade promotion, debt management, purchasing, school support organizations, and technical corrections",
    ],
  },
  {
    id: "bb_732346", source: "school_board",
    title: "Special Meeting - 2026-02-24",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Special Meeting", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_732346",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=732346",
    badge: "new",
    overview: "This special meeting of the Wausau School District Board of Education was convened to conduct a student expulsion hearing in closed session. The Board met pursuant to Wisconsin Statutes to hear the case, deliberate, and potentially take action on the expulsion matter.",
    agenda: [
      { time:"0:00", item:"Call To Order" },
      { time:"0:02", item:"Motion to convene in closed session for pupil expulsion hearing pursuant to Wisconsin Statutes s. 19.85(1)(a), (f), and (g), and s. 118.125" },
      { time:"0:05", item:"Adjournment" },
    ],
    discussions: [
      { item:"Closed Session - Pupil Expulsion Hearing", body:"The Board convened in closed session to hold a pupil expulsion hearing under Wisconsin Statutes governing student records confidentiality and closed meeting provisions. The Board was authorized to deliberate privately and take action in closed session if necessary, with the possibility of reconvening in open session for further action." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Motion to convene in closed session for expulsion hearing",
      "Potential action on pupil expulsion in closed or open session",
      "Motion to reconvene into open session",
      "Motion to adjourn",
    ],
  },
  {
    id: "bb_727607", source: "school_board",
    title: "Public Meeting - 2026-02-25",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Public Meeting", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_727607",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=727607",
    badge: "new",
    overview: "This public meeting brought together the Elementary Task Force one year after the elementary school consolidation to reflect on the process and outcomes. The session focused on summarizing the consolidation effort and gathering reflections from task force members, though no formal Board action was taken.",
    agenda: [
      { time:"0:00", item:"Elementary Task Force Reunion" },
      { time:"0:02", item:"Summary of Elementary Consolidation" },
      { time:"0:12", item:"Task Force Member Reflectives: One Year Later" },
      { time:"0:27", item:"Adjourn" },
    ],
    discussions: [
      { item:"Summary of Elementary Consolidation", body:"This item provided an overview and summary of the elementary school consolidation process that was implemented by the Wausau School District. The presentation likely covered the timeline, decisions made, and outcomes of the consolidation effort." },
      { item:"Task Force Member Reflectives: One Year Later", body:"Task force members who were involved in the elementary consolidation planning shared their reflections and perspectives one year after implementation. This provided an opportunity to assess how the consolidation has impacted schools, students, and the community." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [

    ],
  },
  {
    id: "bb_731357", source: "school_board",
    title: "Public Meeting - 2026-03-04",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Special Meeting - Candidate Meet & Greet", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_731357",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=731357",
    badge: "new",
    overview: "This meeting was a WEA-sponsored event where Wausau School District Board of Education candidates met with the public. While a quorum of board members may have been present, no official board action was taken at this informal event.",
    agenda: [
      { time:"0:00", item:"WEA Sponsored WSD School Board Candidates Meet & Greet Event" },
    ],
    discussions: [
      { item:"WEA Sponsored WSD School Board Candidates Meet & Greet Event", body:"This was a community event sponsored by the Wausau Education Association allowing school board candidates to meet with the public ahead of upcoming elections. A quorum of current board members may have attended, but the agenda explicitly noted that no board action would be taken during this informal gathering." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [

    ],
  },
  {
    id: "bb_734561", source: "school_board",
    title: "Regular Meeting - 2026-03-09",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Regular Meeting", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_734561",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=734561",
    badge: "new",
    overview: "The Wausau School District Board of Education held a regular meeting covering a proposed switch from Chromebooks to iPads at middle schools, updates on the 2022 referendum construction budget, and a five-year fiscal forecast. The meeting also included reports on Achievement Gap Reduction (AGR) schools and routine consent agenda items including personnel changes and bill payments.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Roll Call" },
      { time:"0:04", item:"Pledge of Allegiance: Jim Bouché, President" },
      { time:"0:06", item:"Reading of the Mission Statement" },
      { time:"0:08", item:"Excellence in Action: EEA" },
      { time:"0:15", item:"Public and Student Comment" },
      { time:"0:25", item:"Approve Consent Agenda (Action Requested)" },
      { time:"0:30", item:"Old\/Recurring Business - Committee of the Whole Meeting: Referendum Budget Update" },
      { time:"0:32", item:"New Business - iPads Presentation (Action Requested)" },
      { time:"0:52", item:"New Business - Committee of the Whole Meeting: Five Year Fiscal Forecast" },
      { time:"0:54", item:"New Business - Committee of the Whole Meeting: AGR Annual Report" },
      { time:"0:56", item:"Open Forum - Board Member Professional Growth & Development Report" },
      { time:"0:58", item:"Open Forum - Legislative Liaison" },
      { time:"1:00", item:"Open Forum - Superintendent Commentary" },
      { time:"1:02", item:"Open Forum - Presiding Officer Commentary" },
      { time:"1:04", item:"Adjourn" },
    ],
    discussions: [
      { item:"Referendum Budget Update", body:"As the April 2022 referendum-funded facility improvements continue to develop, the construction and budget updates are routinely presented until projects are completed. The attached presentation was shared at the February Committee of the Whole Meeting." },
      { item:"iPads Presentation", body:"Information on switching one-to-one devices at the middle school from Chromebooks to iPads was presented. This presentation was estimated to take 20 minutes and requested board action." },
      { item:"Five Year Fiscal Forecast", body:"The Committee was presented with a five-year fiscal forecast model for the District at the February Committee of the Whole meeting. The projection model will continue to be applied during the next three months to aid in constructing the 2026-27 budget reconciliation plan, with administration noting that projections result from many variables that change periodically." },
      { item:"AGR Annual Report", body:"The Committee was presented with the mid-year AGR student outcome scores required by the DPI at the February Committee of the Whole Meeting. The report featured screening results and work being done in each of the three AGR schools to strengthen organizational systems and improve student achievement." },
    ],
    publicComment: "A public and student comment period was included on the agenda.",
    actionItems: [
      "Approve Consent Agenda including appointments, separations, leaves of absence, retirements, meeting minutes, payment of bills\/budget status, CESA 9 Shared Services Contract, and donations",
      "Approve iPads proposal for middle school one-to-one device switch from Chromebooks",
    ],
  },
  {
    id: "bb_734863", source: "school_board",
    title: "Committee of the Whole Meeting - 2026-03-23",
    date: "March 25, 2026", shortDate: "MAR 25",
    committee: "Committee of the Whole", duration: "~1h",
    url: "https://www.youtube.com/watch?v=bb_734863",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=734863",
    badge: "new",
    overview: "The Wausau School District Board of Education Committee of the Whole meeting addressed operational matters including facility fee amendments for artificial fields, a referendum budget update, and an extensive NEOLA policy review covering over 60 district policies. The meeting also featured recognition of Stettin Elementary and action on the Wisconsin School Nutrition Purchasing Cooperative membership.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Approve the Minutes" },
      { time:"0:05", item:"Audit of the Bills" },
      { time:"0:08", item:"Excellence in Action: Stettin Elementary" },
      { time:"0:18", item:"Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP) (Action Requested)" },
      { time:"0:23", item:"Facility Fees (Action Requested)" },
      { time:"0:33", item:"Referendum Budget Update" },
      { time:"0:43", item:"NEOLA UPDATE (Action Requested)" },
      { time:"1:03", item:"Adjourn" },
    ],
    discussions: [
      { item:"Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP)", body:"The Wausau School District Nutrition Service Department currently belongs to the Wisconsin School Nutrition Purchasing Cooperative. The WiSNP Co-op is requesting member districts to present the resolution to their respective School Boards for approval of continued membership for the 2026-2027 school year." },
      { item:"Facility Fees", body:"Ryan Urmanski, Director of Buildings and Grounds, presented information to amend the current Wausau School District Facility Use Fee Schedule to reflect the cost for use of artificial fields and field lighting for requested events. If approved, the board would add the fee schedule immediately." },
      { item:"Referendum Budget Update", body:"Elizabeth Channel, Interim Assistant Superintendent of Operations, shared an update on the status of the Referendum Budget. A memo summarizing the referendum budget was included in the meeting materials." },
      { item:"NEOLA UPDATE", body:"The Committee reviewed proposed changes to numerous district policies, ranging from technical corrections to more substantial revisions. Policy updates covered areas including board member conduct, reading instruction goals, cell phones, academic honesty, homeless students, third grade promotion, artificial intelligence, student fundraising, school support organizations, and Act 57 related policies on child abuse and neglect." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Approve continued membership in Wisconsin School Nutrition Purchasing Cooperative (WiSNP) for 2026-2027 school year",
      "Approve amended Facility Use Fee Schedule for artificial fields and field lighting",
      "Approve NEOLA policy updates including policies on definitions, board orientation, board member behavior, anti-harassment, committees, district administrator relationship, reading instruction, parent engagement, athletics, advanced learning, job expenses, termination, academic honesty, homeless students, entrance age, cell phones, third grade promotion, motor vehicles, intoxicants, student employment, electronic fund transfers, debt management, returned checks, fee waivers, fund balance, purchasing, accounting systems, personal property disposition, digital accessibility, and artificial intelligence",
      "Approve school support organization related policies on fundraising, crowdfunding, accountability, student activity accounts, gifts and bequests, and advertising",
      "Approve technical corrections to various policies",
      "Approve Act 57 related policies on student supervision and welfare and child abuse and neglect",
    ],
  },
];

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
        {meeting.badge && (
          <span style={{
            background: "#FFE566", color: "#111",
            fontSize: "9px", fontWeight: 900,
            letterSpacing: "0.12em", padding: "1px 5px", borderRadius: "1px",
          }}>NEW</span>
        )}
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
          </div>

          
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
            <a href={meeting.url} target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              background: src.accent, color: "#fff",
              fontFamily: "'Bebas Neue', sans-serif", fontSize: "11px", letterSpacing: "0.14em",
              padding: "7px 14px", textDecoration: "none", transition: "opacity 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity="0.8"}
            onMouseLeave={e => e.currentTarget.style.opacity="1"}
            >> WATCH ON YOUTUBE</a>
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
              const ytUrl = `https://www.youtube.com/watch?v=${vid}&t=${toSec(entry.time)}s`;
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "11px 0", borderBottom: `1px solid ${RULE}` }}>
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
                    }}>{item.name}</span>
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
];

const SCHOOL_BOARD_UPCOMING = [
  { date:"2026-04-13", time:"5:00 PM", name:"Regular Board Meeting", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-04-27", time:"5:00 PM", name:"Education & Operations Committee", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-05-11", time:"5:00 PM", name:"Regular Board Meeting", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
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
];

const WESTON_UPCOMING = [
  { date:"2026-03-26", time:"", name:"Public Works Committee", url:"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_03262026-1889", source:"weston" },
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
              width: isMobile ? "100%" : "320px",
              minWidth: isMobile ? "unset" : "320px",
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
