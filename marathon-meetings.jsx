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
    avatar:   "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABQAFADASIAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAAAAYEBQIDBwEI/8QAMRAAAQMEAQIFAwMDBQAAAAAAAQIDBAAFBhEhEjEHEyJBYRRRcRYykRWBoSNCYnLw/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAMEAQUC/8QAJhEAAQMDAgYDAQAAAAAAAAAAAQACEQMhMQRBEhMiUYGRBeHwof/aAAwDAQACEQMRAD8A+qaKKKEIooqN/UIn1whfUtfVlJV5XUOrX4rCQMrQCcKTRSj4iZBNsUaEbf5QU8tQUpaerQAHA/moXh7lFwvdwlRrh5KkoaDiVIR0kHetd/mkHUsFTlbrE90VrXIZQ8lpbiEuKGwknk1sp4IOFsEIooorViKKK8VvpOiAfbdCFWG722ZPlWhm4Ni4IRpbaF6cRsdx8je+O1KON4ROhX1M2XLSEMOFSSglSnvk77bB571As/h+67lyLpci30Nu/VB6I7tuQvex6T6kHfJ0SD24q5yDPkQs0gYvabe9crk6UqlKQSERGzz1K0Ds651x3HPIqMN5vVWEQbLpkcqaemdxSL4t3v8Avau8sxxnIojLTr62FMr60rSAe40QQajYliTOOyJDyJTkhx1IR6khISAd+1YRbrkLyZIVaG21obBaCidOKKgDyTwANnXesJc3JkwVLEaMwtG1OOOLSlCUgL2Rsn/geeODTjSpl/Mi6h5RxI9qfebQ9Kk+ey4kk6BSvjX4NTxKjW9MaLJlJ85ekJ6z6lGqG2ru14jW+TEu0RyGpay+7GWlxLgDnCUlI1+0a3sc7rK+42qVdPqo6esu/vDi+lCCPfjk/ga/NR6hr9ODW0zJcSJVLOF5FOs6AJTVRWDIWlpAdUlTgSAopGgT+Kzroi4UJVRll/hYvYJd3ualCNGTshA2pRJ0EgfckgVxLxIyDPLtbbbHebYsMS+yEw40BpRXKcQrupxf+0aI2Bo8812rMsciZXjkuz3BTiGZAGltnSkKBBSofggVxa+XGPj3inZWcsuzkxjG7Sp9t59OnJb6yekJSN7VopA/6UqrPhdP48MyBLhJ77Wjz9Jht7pjeKkWw2yW/FxrFLV5klpt0htxZHHWPfQUDz9jS/gOWsWSFccolwpFwvuV3JabfCZA8xxpB0OT+1IJI38ClqzX+TMs+UW2Ey85m+U3FTDsYIUDFY1yVEjgaUofA5PamXJMTl45mONkM342aDaRDamWRnzHW3tq69jR11dRO9b54PFLBOR+/BXOpNbNOpuPcXPtx8gJzT4qJewK83pNrXGucCQqEITq/MCn/YBSe4HJOuwSfzVL4k5VNungnbbozIXDm3gNsiPG0UvFzYUglQJ6db7aPbmo4sM+Bj4Xa8TuRtraH2oUBbyDJU882UrlyNq76PSEjZAKidcAVFuwjO0WzCFS7ZFkRrE6VC2mUlCz6uoOLUdj3A0N6Cfk69EuNkmnS07XB4gQZuR2Ns9495TIuTcsP/Tfh7iknru0pvz35cwB1ENoD1FKRoa2lRAP+d1HheJdzj+H+aSblLjybhZ5SoMSay2EJkKVwhQTyNg88carbdfD7Lv1HIv8aXap1xukF2HMRKUtDcbr4/0tAkpSkAc6JOz78RWvBKPEiY9blXxSktShKmMOqIQ+QE7DTY1rgaKjs6123R1jCwHTEA1CCTBNrzk+Nv6otpk5i14g4Rbbjk0qVJkxjNnRUoShttrkhKtD1KPIJI4OtV3G13CLdYLcy3vJfjObCHEg6VolJ1v22Dz70kX/AMO3bpm71+Yvb8JqVDEKSw0yCtTe+Qhwn0bGgSBsc6PNPcOKxCiMxYjSWo7KA222gaCUgaAHwBTGAiZUWrq06gaW5jYR3W6oMq0W2XOYmyoER6YwNNPuMpUtHvwojYqdRTFGCRhKLce8nKnHW2WWWUr9biWwkOI+Va2o6/g02pUFdiDo64NYSW1ux3ENuFtakkBQ9qX7VEl2+Y4p3qSwhJKtHYX9tfNc9jXaV/D1ODjMk4+lU5wrtkwOEe0xqKUglRAAGzv2qtsd4YvDT7sU9TSHChKukgEDjeyNd99viknLcieix5MdaClyXwUONq9Ke3cEfxRjM9bcVmJAcmzQsp56T0oSPYdgB/7dMOqBfwhSLo7i0toK3FJSkdyo6ArlHiBaMpn5Wz5cVqbanVpbYTraWfupRGlIV3PUD9vxV54gWi83aXCTCS47EWnSmuoBKFg/uV/Y/PamvHYMi22ePFmSPqHm06K/j2A+4HatqA1yaZBAG66FF40rRWaQSduymxGRHjNMpUtQbQEBS1FSjoa2SeSfmttFFV4XPJm6KKKKEIrxSQpJB3o/Y6r2ihCR7zaGnHpIh2CTNkLUUh6U6PKRs8lIUr/OqaIUR4obVLDTfQAEsslXQj+/G/4qwopTaQaSUIooopqEUUUUIX//2Q==",
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
    id: "2FnP-HTQAL4", source: "weston",
    title: "Plan Commission",
    date: "March 9, 2026", shortDate: "MAR 9",
    committee: "Plan Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=2FnP-HTQAL4",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "This Plan Commission meeting was scheduled to address two residential rezoning requests requiring public hearings, three sign special exception permits for local businesses, a final plat approval for a residential subdivision, and review of annual department reports. The agenda also included discussion of parks and recreation impact fees and various informational reports.",
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
      { item:"Public Hearing – Project #20260032, Birch Street Rezoning", body:"A request to rezone a portion of property at 8905 Birch Street from RR-5 (Rural Residential-5 Acre) to SF-S (Single Family Residential-Small Lot). The Plan Commission will hear public comment and make a recommendation to the Board of Trustees." },
      { item:"Public Hearing – Project #20260056, Christiansen Avenue Rezoning", body:"A request to rezone a portion of property at 7105 Christiansen Avenue from SF-L (Single Family Residential-Large Lot) to SF-S (Single Family Residential-Small Lot). The Plan Commission will hear public comment and make a recommendation to the Board of Trustees." },
      { item:"Sign Special Exception – Macco's Floor Covering", body:"A request for a Special Exception Sign Permit for Macco's Floor Covering located at 3111 Schofield Avenue. Details of the sign specifications were not provided in the agenda." },
      { item:"Sign Special Exception – Weston Psychiatric", body:"A request for a Special Exception Sign Permit for Weston Psychiatric located at 6307 Schofield Avenue. Details of the sign specifications were not provided in the agenda." },
      { item:"Sign Special Exception – Burger King", body:"A request for a Special Exception Sign Permit for Burger King located at 6003 Business Highway 51. Details of the sign specifications were not provided in the agenda." },
      { item:"Final Plat Approval - Hinner Springs Second Addition", body:"The Plan Commission will consider final plat approval for the Hinner Springs Second Addition subdivision, prepared by Timber Ridge Builders and Riverside Land Surveying." },
      { item:"Discussion of Parks and Recreation Impact Fee Review", body:"The Commission will discuss a review of parks and recreation impact fees. No additional details were provided in the agenda." },
      { item:"2025 Code Enforcement Annual Report", body:"Staff will present the annual report summarizing code enforcement activities for 2025." },
      { item:"2025 Planning & Development Annual Report", body:"Staff will present the annual report summarizing planning and development activities for 2025." },
    ],
    publicComment: "Public comment period was scheduled for items not appearing on the agenda as public hearings. Public hearings with comment periods were also scheduled for the two rezoning requests.",
    actionItems: [
      "Recommendation to Board of Trustees on Project #20260032 rezoning at 8905 Birch Street",
      "Recommendation to Board of Trustees on Project #20260056 rezoning at 7105 Christiansen Avenue",
      "Action on Sign Special Exception for Macco's Floor Covering",
      "Action on Sign Special Exception for Weston Psychiatric",
      "Action on Sign Special Exception for Burger King",
      "Action on Final Plat Approval for Hinner Springs Second Addition",
    ],
  },
  {
    id: "QPlBGzKEh38", source: "weston",
    title: "Public Works Committee",
    date: "March 9, 2026", shortDate: "MAR 9",
    committee: "Plan Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=QPlBGzKEh38",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Plan Commission meeting was expected to address two rezoning public hearings, three sign special exception permits, a final plat approval, and review of multiple departmental annual reports. The agenda indicates significant development activity with residential rezoning requests and commercial signage matters requiring commission action. Note: This summary is based on the agenda, not a transcript.",
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
      { item:"Public Hearing – Project #20260032, Rezone 8905 Birch Street", body:"A request to rezone a portion of property at 8905 Birch Street from RR-5 (Rural Residential-5 Acre) to SF-S (Single Family Residential-Small Lot). The commission will hold a public hearing, receive staff presentation and public comment, then make a recommendation to the Board of Trustees." },
      { item:"Public Hearing – Project #20260056, Rezone 7105 Christiansen Avenue", body:"A request to rezone a portion of property at 7105 Christiansen Avenue from SF-L (Single Family Residential-Large Lot) to SF-S (Single Family Residential-Small Lot). The commission will conduct a public hearing process and provide a recommendation to the Board of Trustees." },
      { item:"Sign Special Exception – Macco's Floor Covering", body:"A request for a Special Exception Sign Permit for Macco's Floor Covering located at 3111 Schofield Avenue. The commission will review and act on this signage request." },
      { item:"Sign Special Exception – Weston Psychiatric", body:"A request for a Special Exception Sign Permit for Weston Psychiatric located at 6307 Schofield Avenue. The commission will review and act on this signage request." },
      { item:"Sign Special Exception – Burger King", body:"A request for a Special Exception Sign Permit for Burger King located at 6003 Business Highway 51. The commission will review and act on this signage request." },
      { item:"Final Plat Approval - Hinner Springs Second Addition", body:"The commission will consider final plat approval for Project #20260017, the Hinner Springs Second Addition subdivision prepared by Timber Ridge Builders\/Riverside Land Surveying." },
      { item:"Parks and Recreation Impact Fee Review", body:"The commission will discuss the Parks and Recreation Impact Fee Review. This involves examining fees charged to development to fund parks and recreation facilities." },
      { item:"2025 Code Enforcement Annual Report", body:"Presentation of the 2025 Code Enforcement Annual Report summarizing code enforcement activities and compliance issues addressed during the previous year." },
      { item:"2025 Planning & Development Annual Report", body:"Presentation of the 2025 Planning & Development Annual Report providing an overview of planning and development activities completed during the previous year." },
      { item:"Future Agenda Items", body:"Discussion of upcoming business including an internal inspection process for Conditional Use Permits in Wellhead Protection Zones, Electric Vehicle Charging Stations, and the 2025 New Housing Fee Report & 2026 Housing Affordability Report." },
    ],
    publicComment: "Public comment was included on the agenda for items not appearing as public hearings, and public comment periods were scheduled within each public hearing item.",
    actionItems: [
      "Recommendation to Board of Trustees on rezoning 8905 Birch Street from RR-5 to SF-S",
      "Recommendation to Board of Trustees on rezoning 7105 Christiansen Avenue from SF-L to SF-S",
      "Action on Sign Special Exception for Macco's Floor Covering",
      "Action on Sign Special Exception for Weston Psychiatric",
      "Action on Sign Special Exception for Burger King",
      "Action on Final Plat Approval for Hinner Springs Second Addition",
    ],
  },
  {
    id: "D7R7a0G0WTA", source: "weston",
    title: "Parks Committee",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=D7R7a0G0WTA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Board of Trustees was scheduled to consider multiple rezoning ordinances, a subdivision plat, parking restrictions, park-related fees and agreements, and various infrastructure projects. This agenda was incorrectly labeled as a Parks Committee meeting but is actually a full Board of Trustees meeting with significant land use and public works items. Note: This summary is based on the agenda document only, not a transcript.",
    agenda: [
      { time:"6:00 p.m.", item:"Public Comments on non-agenda items" },
      { time:"N\/A", item:"Approval of February 16, 2026 Board of Trustees Meeting Minutes" },
      { time:"N\/A", item:"Acknowledge Reports\/Minutes from Boards, Committees, Commissions" },
      { time:"N\/A", item:"Acknowledge Reports from Departments" },
      { time:"N\/A", item:"Work Product Transmittals including Building Permits, Budget Status, Code Enforcement Reports" },
      { time:"N\/A", item:"Consent Agenda including Vouchers and Appointment of Agent Change" },
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
      { time:"N\/A", item:"Sign Encroachment Agreement with 7th Floor Investments, LLC" },
    ],
    discussions: [
      { item:"Ordinance No. 26-004: Rezoning of 8905 Birch Street", body:"The Board was scheduled to consider rezoning a portion of property at 8905 Birch Street from Rural Residential-5 Acre (RR-5) to Single Family Residential-Small Lot (SF-S) zoning district, which would allow for higher density residential development." },
      { item:"Ordinance No. 26-005: Rezoning of 7105 Christiansen Avenue", body:"Similar to the previous item, this ordinance would rezone property from Single Family Residential-Large Lot (SF-L) to Single Family Residential-Small Lot (SF-S), potentially enabling subdivision of larger lots into smaller residential parcels." },
      { item:"Ordinance No. 26-006: Speed Limits Amendment", body:"The Board was set to consider amendments to Chapter 82.600 of the Municipal Code regarding speed limits, though specific streets or speed changes were not detailed in the agenda." },
      { item:"Resolution No. 2026-008: Hinner Springs Second Addition Subdivision", body:"The Board was scheduled to vote on final plat approval for the Hinner Springs Second Addition Subdivision, which represents the next phase of residential development in this area." },
      { item:"April 2026 Referendum Informational Sessions Update", body:"Listed as discussion only, this item would provide the Board with an update on informational sessions planned to educate the public about an upcoming April 2026 referendum." },
      { item:"Proposed E-Bicycle and E-Moto Ordinance Dialogue", body:"The Board was to discuss potential regulation of electric bicycles and electric motorcycles, with this matter being referred to the Community Life and Public Safety Committee for further dialogue." },
      { item:"Removal of No Parking restrictions", body:"The Board was scheduled to consider removing no parking restrictions on Alta Verde Street south of Jelinek Avenue and on Alderson Street along Kennedy Park, potentially increasing available parking in these areas." },
      { item:"Baseball\/Softball Field Maintenance and User Agreement", body:"This item involves discussion of maintenance responsibilities and usage terms for the Village's baseball and softball facilities, likely establishing agreements with user groups or leagues." },
      { item:"Purchase of Commercial Rotary Mower", body:"The Board was set to consider purchasing a commercial rotary mower for Village maintenance operations, representing a capital equipment expenditure." },
      { item:"Park Shelter Fees and Field Rental Costs", body:"This agenda item would address the fee structure for renting park shelters and athletic fields, potentially involving rate adjustments for Village facilities." },
      { item:"Eagle Scout Project at Machmueller Park", body:"The Board was scheduled to consider an Eagle Scout project proposed for Machmueller Park, which typically involves a community improvement project led by a local scout." },
      { item:"Remote Meeting Attendance Policy", body:"The Board was to review the Elected and Appointed Officials' Handbook policy regarding remote meeting attendance, potentially updating guidelines for virtual participation." },
      { item:"Military Road Utility Engineering Services Contract", body:"This item involves consideration of an engineering services contract for utility work on Military Road, representing infrastructure planning and development." },
      { item:"2026 Annual Street Maintenance Plan and Budget", body:"The Board was scheduled to review and potentially approve the comprehensive annual street maintenance plan and associated budget for 2026." },
      { item:"Well 2 Rehabilitation", body:"This item involves discussion of rehabilitation work needed for Well 2, part of the Village's water supply infrastructure." },
    ],
    publicComment: "Public comment was on the agenda for up to three minutes per person on non-agenda items, with time extension permitted at the Chief Presiding Officer's discretion.",
    actionItems: [
      "Vote on Ordinance No. 26-004 rezoning 8905 Birch Street",
      "Vote on Ordinance No. 26-005 rezoning 7105 Christiansen Avenue",
      "Vote on Ordinance No. 26-006 amending speed limits",
      "Vote on Resolution No. 2026-008 approving Hinner Springs Second Addition final plat",
      "Consider removal of no parking restrictions on Alta Verde St and Alderson Street",
      "Consider Baseball\/Softball Field Maintenance and User Agreement",
      "Consider purchase of Commercial Rotary Mower",
      "Review and potentially adjust Park Shelter Fees and Field Rental Costs",
      "Consider Eagle Scout Project at Machmueller Park",
      "Review Remote Meeting Attendance Policy",
      "Consider Microsoft Teams for Communication",
      "Consider Military Road Utility Engineering Services Contract",
      "Consider Bus 51 Storm Pond Engineering Services Contract Amendment",
      "Consider Sewer Televising Software Contract",
      "Approve 2026 Annual Street Maintenance Plan and Budget",
      "Consider Hospital Area Repaving Change Order #4",
      "Consider Well 2 Rehabilitation",
      "Consider Sign Encroachment Agreement with 7th Floor Investments, LLC",
    ],
  },
  {
    id: "aUG3K0hxNsU", source: "weston",
    title: "Finance and Human Resources Committee",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=aUG3K0hxNsU",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "This is a Village of Weston Board of Trustees meeting agenda for March 23, 2026, covering a wide range of municipal business including rezoning ordinances, a subdivision plat approval, referendum update, various infrastructure projects, and park-related matters. Note: The meeting title indicates Finance and Human Resources Committee, but the agenda is actually for the full Board of Trustees meeting. This summary is based on the agenda document, not a transcript.",
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
      { time:"N\/A", item:"Ordinance No. 26-006: Amending Chapter 82.600 Speed Limits" },
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
      { item:"April 2026 Referendum Informational Sessions Update", body:"Discussion-only item regarding an update on informational sessions planned for an upcoming April 2026 referendum." },
      { item:"E-Bicycle and E-Moto Ordinance", body:"The Board will discuss a proposed ordinance regarding e-bicycles and e-motos that would be referred to the Community Life and Public Safety Committee for further dialogue." },
      { item:"Parking Restrictions Removal", body:"The Board will consider removing no parking restrictions on Alta Verde Street south of Jelinek Avenue and on Alderson Street along Kennedy Park." },
      { item:"Baseball\/Softball Field Maintenance and User Agreement", body:"Discussion and potential action on an agreement regarding maintenance responsibilities and usage terms for baseball and softball fields." },
      { item:"Park Shelter Fees and Field Rental Costs", body:"The Board will discuss and potentially take action on fee structures for park shelter rentals and field usage costs." },
      { item:"Eagle Scout Project at Machmueller Park", body:"Discussion and potential action on approving an Eagle Scout service project to be completed at Machmueller Park." },
      { item:"Remote Meeting Attendance Policy", body:"Review of the Elected and Appointed Officials' Handbook section regarding the policy for remote meeting attendance." },
      { item:"Microsoft Teams for Communication", body:"Discussion and potential action on adopting Microsoft Teams as a communication tool for Village operations." },
      { item:"Military Road Utility Engineering Services Contract", body:"Discussion and potential action on approving an engineering services contract for utility work on Military Road." },
      { item:"Bus 51 Storm Pond Engineering Services Contract Amendment", body:"Discussion and potential action on amending an existing engineering services contract for the Bus 51 storm pond project." },
      { item:"Sewer Televising Software Contract", body:"Discussion and potential action on a contract for software used in sewer line inspection via televising equipment." },
      { item:"2026 Annual Street Maintenance Plan and Budget", body:"Discussion and potential action on the comprehensive street maintenance plan and associated budget for 2026." },
      { item:"Hospital Area Repaving Change Order #4", body:"Discussion and potential action on the fourth change order for the hospital area repaving project." },
      { item:"Well 2 Rehabilitation", body:"Discussion and potential action on rehabilitation work needed for the Village's Well 2 water infrastructure." },
      { item:"Sign Encroachment Agreement", body:"Discussion and potential action on a sign encroachment agreement with 7th Floor Investments, LLC for Macco's Floor Covering at 3111 Schofield Avenue." },
    ],
    publicComment: "Public comments allowed for up to three minutes regarding non-agenda items, with time extension permitted at the Chief Presiding Officer's discretion.",
    actionItems: [
      "Vote on Ordinance No. 26-004 rezoning 8905 Birch Street",
      "Vote on Ordinance No. 26-005 rezoning 7105 Christiansen Avenue",
      "Vote on Ordinance No. 26-006 amending speed limits",
      "Vote on Resolution No. 2026-008 approving Hinner Springs Second Addition final plat",
      "Approve vouchers (check numbers 66279-66316, 66322-66380, 66396-66429, 90240-90243)",
      "Approve agent change for Reliance Fuel LLC",
      "Consider removal of parking restrictions on Alta Verde St and Alderson Street",
      "Consider intersection signage at Community Center Drive and Birch St",
      "Consider Baseball\/Softball Field Maintenance and User Agreement",
      "Consider purchase of Commercial Rotary Mower",
      "Consider Park Shelter Fees and Field Rental Costs changes",
      "Consider Eagle Scout Project at Machmueller Park",
      "Review Remote Meeting Attendance Policy",
      "Consider Microsoft Teams adoption",
      "Consider Military Road Utility Engineering Services Contract",
      "Consider Bus 51 Storm Pond Engineering Services Contract Amendment",
      "Consider Sewer Televising Software Contract",
      "Consider 2026 Annual Street Maintenance Plan and Budget",
      "Consider Hospital Area Repaving Change Order #4",
      "Consider Well 2 Rehabilitation",
      "Consider Sign Encroachment Agreement with 7th Floor Investments, LLC",
    ],
  },
  {
    id: "Izfp0CD_Da0", source: "weston",
    title: "Board of Trustees",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=Izfp0CD_Da0",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Board of Trustees was scheduled to consider multiple rezoning ordinances, a final plat approval for Hinner Springs subdivision, and various infrastructure and public works matters including street maintenance, utility engineering, and park-related items. Based on the agenda only, not a transcript, this meeting also included discussion on an April 2026 referendum and a proposed e-bicycle ordinance.",
    agenda: [
      { time:"6:00 p.m.", item:"Board of Trustees Meeting called to order" },
      { time:"N\/A", item:"Public Comments" },
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
      { time:"N\/A", item:"Ordinance No. 26-006: Amending Chapter 82.600 Speed Limits" },
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
      { time:"N\/A", item:"Sign Encroachment Agreement with 7th Floor Investments, LLC" },
    ],
    discussions: [
      { item:"Ordinance No. 26-004: Rezoning of 8905 Birch Street", body:"This ordinance would approve rezoning a portion of property at 8905 Birch Street from Rural Residential-5 Acre (RR-5) to Single Family Residential-Small Lot (SF-S) zoning district, potentially enabling higher-density residential development." },
      { item:"Ordinance No. 26-005: Rezoning of 7105 Christiansen Avenue", body:"This ordinance would approve rezoning a portion of property at 7105 Christiansen Avenue from Single Family Residential-Large Lot (SF-L) to Single Family Residential-Small Lot (SF-S), allowing for smaller lot development on the property." },
      { item:"Ordinance No. 26-006: Speed Limits Amendment", body:"This ordinance would amend Chapter 82.600 of the Municipal Code relating to speed limits within the Village of Weston. Specific speed limit changes are not detailed in the agenda." },
      { item:"Resolution No. 2026-008: Hinner Springs Second Addition Final Plat", body:"The Board was scheduled to consider approval of the final plat for Hinner Springs Second Addition Subdivision, which would authorize the development to proceed with lot sales and construction." },
      { item:"April 2026 Referendum Informational Sessions Update", body:"This discussion-only item was to provide an update on informational sessions related to an April 2026 referendum. The nature of the referendum is not specified in the agenda." },
      { item:"Proposed E-Bicycle and E-Moto Ordinance", body:"The Board was to discuss and potentially take action on initiating dialogue at the Community Life and Public Safety Committee regarding regulations for electric bicycles and electric motorized vehicles." },
      { item:"Removal of No Parking Restrictions", body:"The Board was scheduled to consider removing no parking restrictions on Alta Verde Street south of Jelinek Avenue and on Alderson Street along Kennedy Park." },
      { item:"Intersection Signage at Community Center Drive and Birch St", body:"Discussion and potential action on signage improvements or changes at the intersection of Community Center Drive and Birch Street." },
      { item:"Baseball\/Softball Field Maintenance and User Agreement", body:"The Board was to discuss and potentially approve an agreement regarding maintenance responsibilities and usage terms for baseball and softball fields." },
      { item:"Purchase of Commercial Rotary Mower", body:"Discussion and potential action on acquiring a commercial rotary mower for Village maintenance operations." },
      { item:"Park Shelter Fees and Field Rental Costs", body:"The Board was scheduled to review and potentially adjust fee structures for park shelter reservations and field rentals." },
      { item:"Eagle Scout Project at Machmueller Park", body:"Discussion and potential approval of an Eagle Scout project proposed for Machmueller Park. Specific project details are not provided in the agenda." },
      { item:"Remote Meeting Attendance Policy Review", body:"The Board was to review the Elected and Appointed Officials' Handbook policy regarding remote meeting attendance, potentially updating guidelines for virtual participation." },
      { item:"Use of Microsoft Teams for Communication", body:"Discussion and potential action on adopting or expanding the use of Microsoft Teams as a communication platform for Village business." },
      { item:"Military Road Utility Engineering Services Contract", body:"The Board was scheduled to consider a contract for engineering services related to utility work on Military Road." },
      { item:"Bus 51 Storm Pond Engineering Services Contract Amendment", body:"Discussion and potential action on amending an existing engineering services contract for the Bus 51 storm pond project." },
      { item:"Sewer Televising Software Contract", body:"The Board was to consider a contract for software used in sewer line inspection via televising equipment." },
      { item:"2026 Annual Street Maintenance Plan and Budget", body:"Discussion and potential adoption of the Village's 2026 street maintenance plan and associated budget for road repairs and improvements." },
      { item:"Hospital Area Repaving Change Order #4", body:"The Board was scheduled to consider the fourth change order for the hospital area repaving project, indicating modifications to the original contract scope or costs." },
      { item:"Well 2 Rehabilitation", body:"Discussion and potential action on rehabilitation work for the Village's Well 2 water supply infrastructure." },
      { item:"Sign Encroachment Agreement with 7th Floor Investments, LLC", body:"The Board was to consider a sign encroachment agreement with 7th Floor Investments, LLC (Macco's Floor Covering) at 3111 Schofield Avenue, allowing signage that extends into Village right-of-way." },
    ],
    publicComment: "Public comment was on the agenda, allowing up to three minutes for non-agenda items with time extensions at the Chief Presiding Officer's discretion.",
    actionItems: [
      "Consider approval of three rezoning ordinances (26-004, 26-005, 26-006)",
      "Consider approval of Resolution 2026-008 for Hinner Springs Second Addition final plat",
      "Consider approval of vouchers and consent agenda items",
      "Consider E-Bicycle and E-Moto ordinance dialogue referral to committee",
      "Consider parking restriction removals on Alta Verde St and Alderson Street",
      "Consider intersection signage changes at Community Center Drive and Birch St",
      "Consider Baseball\/Softball Field Maintenance and User Agreement",
      "Consider purchase of commercial rotary mower",
      "Consider park shelter fees and field rental cost adjustments",
      "Consider Eagle Scout project at Machmueller Park",
      "Review Remote Meeting Attendance Policy",
      "Consider Microsoft Teams adoption for communication",
      "Consider Military Road Utility Engineering Services Contract",
      "Consider Bus 51 Storm Pond Engineering Services Contract Amendment",
      "Consider Sewer Televising Software Contract",
      "Consider 2026 Annual Street Maintenance Plan and Budget",
      "Consider Hospital Area Repaving Change Order #4",
      "Consider Well 2 Rehabilitation project",
      "Consider Sign Encroachment Agreement with 7th Floor Investments, LLC",
    ],
  },
  {
    id: "7v9XHdXxccw", source: "wausau",
    title: "Wausau Human Resources Committee Meeting",
    date: "March 9, 2026", shortDate: "MAR 9",
    committee: "Human Resources Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=7v9XHdXxccw",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/145/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "This Human Resources Committee meeting was scheduled to address two personnel-related items: police officer training outside the country and a shelter operations duty premium. Based on the agenda only, specific outcomes are not known.",
    agenda: [
      { time:"N\/A", item:"Public comment on agenda items" },
      { time:"N\/A", item:"Consideration of the minutes of the preceding meeting(s) - Approval of February 9, 2026 Minutes" },
      { time:"N\/A", item:"Police Department Officer out of country training" },
      { time:"N\/A", item:"Shelter Operations Duty Premium" },
      { time:"N\/A", item:"Discussion" },
    ],
    discussions: [
      { item:"Police Department Officer out of country training", body:"This item involves discussion and possible action regarding a police department officer participating in training outside the United States. Details about the specific training program, location, or costs were not provided in the agenda." },
      { item:"Shelter Operations Duty Premium", body:"This item involves discussion and possible action on a duty premium related to shelter operations. This likely pertains to additional compensation for employees working in shelter-related assignments, though specific details were not included in the agenda." },
    ],
    publicComment: "Public comment on agenda items was listed as the first item on the agenda.",
    actionItems: [
      "Possible action on Police Department Officer out of country training",
      "Possible action on Shelter Operations Duty Premium",
      "Approval of February 9, 2026 minutes",
    ],
    civicItems: [
      { number:"1", name:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"2", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"Approval of February 9, 2026 Minutes.", votes:[], docs:[{ name:"HumanResources_Regular_Minutes_02092026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6279)" }], children:[] },
    ] },
      { number:"3", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Police Department Officer out of country training", votes:[], docs:[{ name:"Germany Trip_03022026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6312)" }], children:[] },
      { number:"b", name:"Shelter Operations Duty Premium", votes:[], docs:[{ name:"Memo - Shelter.Premium.03.09.2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6315)" }, { name:"Shelter.Duty.Premium.Matrix.1.2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6298)" }], children:[] },
    ] },
      { number:"4", name:"Discussion.", votes:[], docs:[], children:[] },
      { number:"5", name:"Adjournment.", votes:[], docs:[], children:[] },
    ],
  },
  {
    id: "dX_ZxgNDpz8", source: "wausau",
    title: "Wausau Board of Public Works Meeting Pt.1",
    date: "March 10, 2026", shortDate: "MAR 10",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=dX_ZxgNDpz8",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2240/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "This Board of Public Works meeting was expected to address several infrastructure projects including opening bids for a lift station replacement, making recommendations on lead service line and downtown utility projects, and approving pay estimates for ongoing water and wastewater facility work. The meeting also included a closed session to deliberate on contractor pre-qualification for upcoming street construction projects. Note this summary is based on the agenda, not a transcript.",
    agenda: [
      { time:"N\/A", item:"Consideration of the minutes of the preceding meeting(s) - March 3, 2026" },
      { time:"N\/A", item:"Open bids and make recommendation for Crocker Street Lift Station Replacement" },
      { time:"N\/A", item:"Make recommendation for 2026 Equiflow Lead Service Line Replacement Project" },
      { time:"N\/A", item:"Make recommendation for 2026 Downtown Utility Project" },
      { time:"N\/A", item:"2025 Water Treatment Plant Demo: The MRD Group, Inc., Pay Estimate #1" },
      { time:"N\/A", item:"Wausau Wastewater Treatment Facility Screening Improvements: J.F. Ahern Co., Pay Estimate #11" },
      { time:"N\/A", item:"Bituminous Concrete Paving License: Integrated Construction Solutions, LLC" },
      { time:"N\/A", item:"Portland Cement Concrete License: Integrated Construction Solutions, LLC" },
      { time:"N\/A", item:"Closed Session for pre-qualification statements deliberation" },
    ],
    discussions: [
      { item:"Crocker Street Lift Station Replacement", body:"The board was scheduled to open bids for the Crocker Street Lift Station Replacement project and make a recommendation on the contract award." },
      { item:"2026 Equiflow Lead Service Line Replacement Project", body:"The board was to make a recommendation on this lead service line replacement project, with bids having been opened on February 24, 2026." },
      { item:"2026 Downtown Utility Project", body:"The board was to make a recommendation on the downtown utility project, with bids having been opened on March 3, 2026." },
      { item:"2025 Water Treatment Plant Demo Pay Estimate #1", body:"The board was to consider approval of the first pay estimate for The MRD Group, Inc. for the water treatment plant demolition project." },
      { item:"Wausau Wastewater Treatment Facility Screening Improvements Pay Estimate #11", body:"The board was to consider approval of the eleventh pay estimate for J.F. Ahern Co. for ongoing wastewater treatment facility screening improvements." },
      { item:"Contractor Licensing - Integrated Construction Solutions, LLC", body:"The board was to consider issuing both bituminous concrete paving and portland cement concrete licenses to Integrated Construction Solutions, LLC." },
      { item:"Closed Session - Contractor Pre-Qualification", body:"The board planned to enter closed session to deliberate on pre-qualification statements for the 2026 Street Construction Project 'B' - North 8th Avenue and 2026 Asphalt Paving Project 'A'." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Make recommendation on Crocker Street Lift Station Replacement bid",
      "Make recommendation on 2026 Equiflow Lead Service Line Replacement Project",
      "Make recommendation on 2026 Downtown Utility Project",
      "Approve Pay Estimate #1 for Water Treatment Plant Demo",
      "Approve Pay Estimate #11 for Wastewater Treatment Facility Screening Improvements",
      "Consider paving and concrete licenses for Integrated Construction Solutions, LLC",
      "Deliberate on contractor pre-qualification for 2026 street projects",
    ],
    civicItems: [
      { number:"1", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"<strong>March 3, 2026<\/strong> Regular Board of Public Works Minutes.", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Anne Jacobson", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[{ name:"BoardofPublicWorks_Regular_MinutesDRAFT_03032026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6341)" }], children:[] },
    ] },
      { number:"2", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Open bids and make recommendation for Crocker Street Lift Station Replacement.", votes:[{ motion:"award the contract to Haas Sons, Inc., in the amount of $530,295.80", passed:false, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[], children:[] },
      { number:"b", name:"Make recommendation for 2026 Equiflow Lead Service Line Replacement Project.&nbsp; (Bids were opened February 24, 2026.)", votes:[{ motion:"award the contract to A-1 Excavating", passed:false, initiator:"MaryAnne Groat", seconder:"Eric Lindman", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[{ name:"BidWorksheet_EquiflowLSL2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6249)" }], children:[] },
      { number:"c", name:"Make recommendation for 2026 Downtown Utility Project.  (Bids were opened March 3, 2026.)", votes:[{ motion:"award the contract to Haas Sons in the amount of $1,624,389.94", passed:false, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[{ name:"BidWorksheet_2026DowntownUtilityProj", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6355)" }], children:[] },
      { number:"d", name:"2025 Water Treatment Plant Demo:  The MRD Group, Inc., Pay Estimate #1.", votes:[{ motion:"approve Pay Estimate #1 in the amount of $57,617.50", passed:false, initiator:"Eric Lindman", seconder:"Anne Jacobson", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[{ name:"MRD Group Pay Est 1", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6303)" }], children:[] },
      { number:"e", name:"Wausau Wastewater Treatment Facility Screening Improvements:  J.F. Ahern Co., Pay Estimate #11.", votes:[{ motion:"approve Pay Estimate #11 in the amount of $272,883.42", passed:false, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[{ name:"JF Ahern WWTF Screening Imp Pay Est 11", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6352)" }], children:[] },
      { number:"f", name:"Bituminous Concrete Paving License:  Integrated Construction Solutions, LLC.", votes:[{ motion:"approve subject license", passed:false, initiator:"Anne Jacobson", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[{ name:"Integrated Construction Solutions BCP", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6365)" }], children:[] },
      { number:"g", name:"Portland Cement Concrete License:  Integrated Construction Solutions, LLC.", votes:[{ motion:"approve subject license", passed:false, initiator:"Anne Jacobson", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[{ name:"Integrated Construction Solutions PCC", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6366)" }], children:[] },
    ] },
      { number:"3", name:"Closed Session.", votes:[], docs:[], children:[
      { number:"a", name:"<strong>Closed Session <\/strong>pursuant to Wisconsin State Statute §19.85(1)(e) for the purpose of considering and deliberating on pre-qualification statements for 2026 Street Construction Project \"B\" - North 8th Avenue and 2026 Asphalt Paving Project \"A\".", votes:[{ motion:"to convene in closed session", passed:true, initiator:"Eric Lindman", seconder:"Anne Jacobson", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[{ name:"Plan Holders 2026 Street Construction Proj B", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6360)" }, { name:"Plan Holders 2026 Asphalt Paving Proj A", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6361)" }], children:[] },
    ] },
      { number:"4", name:"Reconvene into Open Session, if necessary, to take action on Closed Session items.", votes:[{ motion:"reconvene into open session", passed:true, initiator:"MaryAnne Groat", seconder:"Anne Jacobson", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }, { motion:"approve the following bidders for 2026 Street Construction Project \"B\" - North 8th Avenue ", passed:true, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }, { motion:"approve the following bidders for 2026 Asphalt Paving Project \"A\"", passed:true, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[], children:[] },
      { number:"5", name:"Adjournment.", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:false, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
  {
    id: "eYRC4YOn0EQ", source: "wausau",
    title: "Wausau Board of Public Works Meeting Pt.2",
    date: "March 10, 2026", shortDate: "MAR 10",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=eYRC4YOn0EQ",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2240/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "This Board of Public Works meeting was expected to address multiple infrastructure projects including opening bids for the Crocker Street Lift Station Replacement, making recommendations on lead service line and downtown utility projects, approving contractor pay estimates, and issuing paving licenses. The board also planned to enter closed session to review contractor pre-qualification statements for upcoming street construction projects.",
    agenda: [
      { time:"N\/A", item:"Open bids and make recommendation for Crocker Street Lift Station Replacement" },
      { time:"N\/A", item:"Make recommendation for 2026 Equiflow Lead Service Line Replacement Project" },
      { time:"N\/A", item:"Make recommendation for 2026 Downtown Utility Project" },
      { time:"N\/A", item:"2025 Water Treatment Plant Demo: The MRD Group, Inc., Pay Estimate #1" },
      { time:"N\/A", item:"Wausau Wastewater Treatment Facility Screening Improvements: J.F. Ahern Co., Pay Estimate #11" },
      { time:"N\/A", item:"Bituminous Concrete Paving License: Integrated Construction Solutions, LLC" },
      { time:"N\/A", item:"Portland Cement Concrete License: Integrated Construction Solutions, LLC" },
      { time:"N\/A", item:"Closed Session for contractor pre-qualification review" },
    ],
    discussions: [
      { item:"Crocker Street Lift Station Replacement", body:"The board was scheduled to open bids for the Crocker Street Lift Station Replacement project and make a recommendation on the contract award." },
      { item:"2026 Equiflow Lead Service Line Replacement Project", body:"The board was to review bids opened on February 24, 2026 and make a recommendation for this lead service line replacement project, which addresses public health infrastructure." },
      { item:"2026 Downtown Utility Project", body:"The board was to consider bids opened on March 3, 2026 and make a recommendation for the downtown utility infrastructure project." },
      { item:"Water Treatment Plant Demo Pay Estimate", body:"The board was to approve Pay Estimate #1 for The MRD Group, Inc. related to the 2025 Water Treatment Plant demolition project." },
      { item:"Wastewater Treatment Facility Screening Improvements Pay Estimate", body:"The board was to approve Pay Estimate #11 for J.F. Ahern Co. for ongoing wastewater treatment facility screening improvements." },
      { item:"Paving Licenses for Integrated Construction Solutions, LLC", body:"The board was to consider issuing both bituminous concrete and portland cement concrete paving licenses to Integrated Construction Solutions, LLC." },
      { item:"Closed Session - Contractor Pre-qualification", body:"The board planned to enter closed session to deliberate on pre-qualification statements for the 2026 Street Construction Project 'B' on North 8th Avenue and the 2026 Asphalt Paving Project 'A'." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Make recommendation on Crocker Street Lift Station Replacement bid",
      "Make recommendation on 2026 Equiflow Lead Service Line Replacement Project",
      "Make recommendation on 2026 Downtown Utility Project",
      "Approve Pay Estimate #1 for Water Treatment Plant Demo",
      "Approve Pay Estimate #11 for Wastewater Treatment Facility Screening Improvements",
      "Consider paving licenses for Integrated Construction Solutions, LLC",
      "Review contractor pre-qualification statements in closed session",
    ],
    civicItems: [
      { number:"1", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"<strong>March 3, 2026<\/strong> Regular Board of Public Works Minutes.", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Anne Jacobson", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[{ name:"BoardofPublicWorks_Regular_MinutesDRAFT_03032026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6341)" }], children:[] },
    ] },
      { number:"2", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Open bids and make recommendation for Crocker Street Lift Station Replacement.", votes:[{ motion:"award the contract to Haas Sons, Inc., in the amount of $530,295.80", passed:false, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[], children:[] },
      { number:"b", name:"Make recommendation for 2026 Equiflow Lead Service Line Replacement Project.&nbsp; (Bids were opened February 24, 2026.)", votes:[{ motion:"award the contract to A-1 Excavating", passed:false, initiator:"MaryAnne Groat", seconder:"Eric Lindman", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[{ name:"BidWorksheet_EquiflowLSL2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6249)" }], children:[] },
      { number:"c", name:"Make recommendation for 2026 Downtown Utility Project.  (Bids were opened March 3, 2026.)", votes:[{ motion:"award the contract to Haas Sons in the amount of $1,624,389.94", passed:false, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[{ name:"BidWorksheet_2026DowntownUtilityProj", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6355)" }], children:[] },
      { number:"d", name:"2025 Water Treatment Plant Demo:  The MRD Group, Inc., Pay Estimate #1.", votes:[{ motion:"approve Pay Estimate #1 in the amount of $57,617.50", passed:false, initiator:"Eric Lindman", seconder:"Anne Jacobson", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[{ name:"MRD Group Pay Est 1", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6303)" }], children:[] },
      { number:"e", name:"Wausau Wastewater Treatment Facility Screening Improvements:  J.F. Ahern Co., Pay Estimate #11.", votes:[{ motion:"approve Pay Estimate #11 in the amount of $272,883.42", passed:false, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[{ name:"JF Ahern WWTF Screening Imp Pay Est 11", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6352)" }], children:[] },
      { number:"f", name:"Bituminous Concrete Paving License:  Integrated Construction Solutions, LLC.", votes:[{ motion:"approve subject license", passed:false, initiator:"Anne Jacobson", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[{ name:"Integrated Construction Solutions BCP", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6365)" }], children:[] },
      { number:"g", name:"Portland Cement Concrete License:  Integrated Construction Solutions, LLC.", votes:[{ motion:"approve subject license", passed:false, initiator:"Anne Jacobson", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[{ name:"Integrated Construction Solutions PCC", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6366)" }], children:[] },
    ] },
      { number:"3", name:"Closed Session.", votes:[], docs:[], children:[
      { number:"a", name:"<strong>Closed Session <\/strong>pursuant to Wisconsin State Statute §19.85(1)(e) for the purpose of considering and deliberating on pre-qualification statements for 2026 Street Construction Project \"B\" - North 8th Avenue and 2026 Asphalt Paving Project \"A\".", votes:[{ motion:"to convene in closed session", passed:true, initiator:"Eric Lindman", seconder:"Anne Jacobson", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[{ name:"Plan Holders 2026 Street Construction Proj B", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6360)" }, { name:"Plan Holders 2026 Asphalt Paving Proj A", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6361)" }], children:[] },
    ] },
      { number:"4", name:"Reconvene into Open Session, if necessary, to take action on Closed Session items.", votes:[{ motion:"reconvene into open session", passed:true, initiator:"MaryAnne Groat", seconder:"Anne Jacobson", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }, { motion:"approve the following bidders for 2026 Street Construction Project \"B\" - North 8th Avenue ", passed:true, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }, { motion:"approve the following bidders for 2026 Asphalt Paving Project \"A\"", passed:true, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[], children:[] },
      { number:"5", name:"Adjournment.", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:false, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Anne Jacobson"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
  {
    id: "t6jjSFt55jM", source: "wausau",
    title: "Wausau Finance Committee Meeting",
    date: "March 10, 2026", shortDate: "MAR 10",
    committee: "Finance Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=t6jjSFt55jM",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2002/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Finance Committee meeting was expected to address multiple procurement agreements, budget modifications, and sole source purchase requests. Key items included airspace obstruction removal agreements, a residential waste services contract, police department equipment purchases, and a transit feasibility study. Note: This summary is based on the agenda, not a transcript.",
    agenda: [
      { time:"N\/A", item:"Public comment on agenda items" },
      { time:"N\/A", item:"Consideration of the minutes of the February 10, 2026 Regular Finance Committee Meeting" },
      { time:"N\/A", item:"Approving Airspace Obstruction Removal Agreement with Schofield Ridgeland Legacy LLC – 724 and 732 Ridgeland Avenue, Schofield and related budget modification" },
      { time:"N\/A", item:"Approving Airspace Obstruction Removal Agreement with Zachary Lange – 811 Ridgeland Avenue, Schofield and related budget modification" },
      { time:"N\/A", item:"Approving Residential Solid Waste and Recycling Service Agreement with Harter's Fox Valley Disposal LLC" },
      { time:"N\/A", item:"Budget amendment for the Wausau Police Department to use the proceeds of the sale of a Thompson Sub-Machinegun to purchase red-dot optics" },
      { time:"N\/A", item:"Approving Sole Source Request for the purchase of Vortex Defender ST Red Dot sights for the Wausau Police Department" },
      { time:"N\/A", item:"Approving Sole Source Request for the purchase of Stryker cots for the Wausau Fire Department" },
      { time:"N\/A", item:"Approving Sole Source Request for the purchase of services to complete the site investigation for the Thomas Street Corridor Area A by REI Engineering" },
      { time:"N\/A", item:"Approving renewal of Parking Lot Lease with Colonial Property 4, LLC (Grant and 3rd Streets)" },
      { time:"N\/A", item:"Approving proposal from Clark Dietz, Inc. to perform engineering professional services for the solar array project" },
      { time:"N\/A", item:"Approving paid duty time for out of country training for a Wausau Police Department Officer" },
      { time:"N\/A", item:"Approving Community Outreach Professional shelter operations duty premium differential" },
      { time:"N\/A", item:"Approving contract with Kueny Architects LLC for Wausau Area Transit Feasibility Study" },
    ],
    discussions: [
      { item:"Airspace Obstruction Removal Agreements", body:"Two separate agreements with Schofield Ridgeland Legacy LLC and Zachary Lange for properties on Ridgeland Avenue in Schofield. Both include related budget modifications for airspace obstruction removal." },
      { item:"Residential Solid Waste and Recycling Service Agreement", body:"Agreement with Harter's Fox Valley Disposal LLC to provide residential solid waste and recycling services for the city." },
      { item:"Police Department Budget Amendment and Equipment", body:"Budget amendment to use proceeds from selling a Thompson Sub-Machinegun to purchase red-dot optics, along with a sole source request for Vortex Defender ST Red Dot sights." },
      { item:"Fire Department Stryker Cots", body:"Sole source request for the purchase of Stryker cots for the Wausau Fire Department's emergency medical equipment needs." },
      { item:"Thomas Street Corridor Site Investigation", body:"Sole source request for REI Engineering to complete site investigation for the Thomas Street Corridor Area A environmental remediation site (BRRTS #02-37-98599)." },
      { item:"Parking Lot Lease Renewal", body:"Renewal of existing parking lot lease agreement with Colonial Property 4, LLC for the lot located at Grant and 3rd Streets." },
      { item:"Solar Array Project Engineering Services", body:"Proposal from Clark Dietz, Inc. to provide engineering professional services for the city's solar array project." },
      { item:"Police Department Out of Country Training", body:"Approval for paid duty time for a Wausau Police Department officer to attend training outside the country." },
      { item:"Shelter Operations Premium Differential", body:"Approval of a duty premium differential for Community Outreach Professional positions working shelter operations." },
      { item:"Transit Feasibility Study", body:"Contract with Kueny Architects LLC to conduct a feasibility study for Wausau Area Transit services." },
    ],
    publicComment: "Public comment on agenda items was listed as the first item on the agenda.",
    actionItems: [
      "Approve Airspace Obstruction Removal Agreement with Schofield Ridgeland Legacy LLC and related budget modification",
      "Approve Airspace Obstruction Removal Agreement with Zachary Lange and related budget modification",
      "Approve Residential Solid Waste and Recycling Service Agreement with Harter's Fox Valley Disposal LLC",
      "Approve budget amendment for Police Department red-dot optics purchase",
      "Approve sole source request for Vortex Defender ST Red Dot sights",
      "Approve sole source request for Stryker cots for Fire Department",
      "Approve sole source request for REI Engineering site investigation services",
      "Approve parking lot lease renewal with Colonial Property 4, LLC",
      "Approve Clark Dietz, Inc. proposal for solar array engineering services",
      "Approve paid duty time for Police Department officer out of country training",
      "Approve Community Outreach Professional shelter operations duty premium differential",
      "Approve contract with Kueny Architects LLC for Transit Feasibility Study",
    ],
    civicItems: [
      { number:"1", name:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"2", name:"Consideration of the minutes of the preceding meeting(s).", votes:[{ motion:"approve ", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[], children:[
      { number:"a", name:"Regular Finance Committee Meeting", votes:[], docs:[{ name:"Finance_Regular_02102026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6362)" }], children:[] },
    ] },
      { number:"3", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Approving Airspace Obstruction Removal Agreement with Schofield Ridgeland Legacy LLC – 724 and 732 Ridgeland Avenue, Schofield and related budget modification. ", votes:[{ motion:"approve", passed:true, initiator:"Vicki Tierney", seconder:"Sarah Watson", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Proposal for Removal of Trees Airspace Obstruction Easement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6379)" }, { name:"Schofield Ridgeland Legacy LLC Obstruction Removal Agreement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6349)" }], children:[] },
      { number:"b", name:"Approving Airspace Obstruction Removal Agreement with Zachary Lange – 811 Ridgeland Avenue, Schofield and related budget modification.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Zachary Lange Airspace Obstruction Removal Agreement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6340)" }], children:[] },
      { number:"c", name:"Approving Residential Solid Waste and Recycling Service Agreement with Harter’s Fox Valley Disposal LLC.", votes:[{ motion:"approve the Harter's contract contingent upon verification of the term selected at the September 23, 2025 Common Council meeting", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6383)" }, { name:"Residential Solid Waste and Recycling Service Agreement with Harter's", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6384)" }, { name:"RFP for Refuse and Recycling Agreement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6382)" }, { name:"Resolution 92-1009", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6381)" }], children:[] },
      { number:"d", name:"Budget amendment for the Wausau Police Department to use the proceeds of the sale of a Thompson Sub-Machinegun to purchase red-dot optics.", votes:[{ motion:"rescind the previous motion on use the funds and approve the budget amendment", passed:true, initiator:"Vicki Tierney", seconder:"Aaron Griner", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[], children:[] },
      { number:"e", name:"Approving Sole Source Request for the purchase of Vortex Defender ST Red Dot sights for the Wausau Police Department.", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Aaron Griner", seconder:"Sarah Watson", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"2026 Red Dot Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6317)" }], children:[] },
      { number:"f", name:"Approving Sole Source Request for the purchase of Stryker cots for the Wausau Fire Department.", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Aaron Griner", seconder:"Vicki Tierney", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Sole Source Stryker cots", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6307)" }], children:[] },
      { number:"g", name:"Approving Sole Source Request for the purchase of services to complete the site investigation for the Thomas Street Corridor Area A, BRRTS #02-37-98599 by REI Engineering for the Wausau Department of Public Works.", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Sarah Watson", seconder:"Becky McElhaney ", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Proposal Thomas Street Corridor Area A", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6350)" }, { name:"Sole Source - REI Thomas Street Corridor - Area A", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6351)" }], children:[] },
      { number:"h", name:"Approving renewal of Parking Lot Lease with Colonial Property 4, LLC (Grant and 3rd Streets).", votes:[{ motion:"approve [AGENDA_ITEM_NAME] at a 4% increase for the 3-year term", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"colonial property 4 llc parking lot lease renewal request", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6293)" }, { name:"colonial property 4 llc parking lot lease", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6294)" }], children:[] },
      { number:"i", name:"Approving proposal from Clark Dietz, Inc. to perform engineering professional services for the solar array project.", votes:[{ motion:"postpone consideration until the city hears back on grant funding outcomes", passed:true, initiator:"Vicki Tierney", seconder:"Aaron Griner", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Solar Generation Facility - Clark Dietz", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6268)" }, { name:"Solar_DWTF_RFP2_Score Summary", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6313)" }], children:[] },
      { number:"j", name:"Approving paid duty time for out of country training for a Wausau Police Department Officer.&nbsp;", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Germany Trip_03022026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6356)" }], children:[] },
      { number:"k", name:"Approving Community Outreach Professional shelter operations duty premium differential. ", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Sarah Watson", seconder:"Becky McElhaney ", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Memo - Shelter.Premium.03.09.2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6357)" }, { name:"Shelter.Duty.Premium.Matrix.1.2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6359)" }], children:[] },
      { number:"l", name:"Approving contract with Kueny Architects LLC for Wausau Area Transit Feasibility Study.", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Sarah Watson", seconder:"Becky McElhaney ", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Metro Ride Feasibility Study Contract", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6320)" }, { name:"Appendix C", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6321)" }, { name:"Appendix B", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6322)" }, { name:"Appendix A", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6323)" }], children:[] },
    ] },
      { number:"4", name:"Adjournment.", votes:[{ motion:"adjourn", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
  {
    id: "dmkjMznF5t8", source: "wausau",
    title: "Wausau  Common Council Meeting",
    date: "March 10, 2026", shortDate: "MAR 10",
    committee: "City Council", duration: "~1h",
    url: "https://www.youtube.com/watch?v=dmkjMznF5t8",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/1963/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "This Common Council meeting was expected to address zoning changes for downtown mixed-use development, parking and loading zone modifications on Jackson Street, and reconsideration of a HUD Lead Hazard Reduction grant partnership. The meeting also included a closed session regarding litigation settlement strategy. Based on agenda only, not transcript.",
    agenda: [
      { time:"N\/A", item:"Comments and suggestions from preregistered citizens" },
      { time:"N\/A", item:"Consent agenda including rezoning, license approvals, and parking ordinances" },
      { time:"N\/A", item:"Reconsideration of HUD Lead Hazard Reduction Grant MOU with HOLA and New Beginnings Inc." },
      { time:"N\/A", item:"Confirming Mayor's appointments to Board of Review" },
      { time:"N\/A", item:"Contract approval with Kueny Architects for Transit Feasibility Study" },
      { time:"N\/A", item:"Settlement approval for David Hoelzel v. City of Wausau property damage case" },
      { time:"N\/A", item:"Closed Session regarding litigation settlement strategy" },
    ],
    discussions: [
      { item:"Rezoning 731 N 1st Street", body:"Plan Commission ordinance to rezone property from Downtown Periphery Mixed Use (DPMU) to Downtown High-Rise Mixed-Use District (DRMU), potentially allowing for higher density development in the downtown area." },
      { item:"Jackson Street Loading Zone and Parking Changes", body:"Two ordinances from Infrastructure & Facilities Committee: one designating a 15-minute loading zone on the north side of Jackson Street between 3rd and 5th Streets, and another establishing no parking on the south side extending 300 feet west from 5th Street." },
      { item:"HUD Lead Hazard Reduction Grant MOU Reconsideration", body:"Finance Committee resolution being reconsidered for partnerships with HOLA and New Beginnings Inc. through HUD's Lead Hazard Reduction Capacity Building Grant program. This item was originally introduced in July 2024." },
      { item:"Wausau Area Transit Feasibility Study Contract", body:"Joint resolution from Finance Committee and Transit Commission to approve a contract with Kueny Architects LLC for conducting a transit feasibility study for the Wausau area." },
      { item:"David Hoelzel v. City of Wausau Settlement", body:"Resolution to approve release of all claims for property damage settlement related to a counterclaim and third party complaint in Marathon County Case No. 25-CV-594." },
    ],
    publicComment: "Public comment was on the agenda, with preregistered citizen comments at the beginning and additional public comment opportunity both before and after the business meeting.",
    actionItems: [
      "Vote on rezoning 731 N 1st Street to Downtown High-Rise Mixed-Use District",
      "Approve or deny various licenses",
      "Establish loading zone and parking restrictions on Jackson Street",
      "Reconsider HUD Lead Hazard Reduction Grant MOU with HOLA and New Beginnings Inc.",
      "Confirm Mayor's appointments to Board of Review",
      "Approve contract with Kueny Architects for transit feasibility study",
      "Approve settlement release for Hoelzel property damage case",
      "Confer with legal counsel in closed session regarding settlement offer",
    ],
    civicItems: [
      { number:"1", name:"Call to order by the presiding officer.", votes:[], docs:[], children:[] },
      { number:"2", name:"Pledge of Allegiance, and Roll Call and Proclamations.", votes:[], docs:[], children:[] },
      { number:"3", name:"Consideration of the minutes of the preceding meeting, approval of the minutes if correct, and correction of mistakes if any.", votes:[{ motion:"Approve", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Aaron Griner", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Chad Henke"], no:[], abstain:[] }], docs:[], children:[
      { number:"", name:"Regular Common Council Minutes", votes:[], docs:[{ name:"CommonCouncil_Regular_02242026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6306)" }], children:[] },
    ] },
      { number:"4", name:"Reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"5", name:"Comments and suggestions from preregistered citizens.", votes:[], docs:[], children:[] },
      { number:"6", name:"Consent agenda.", votes:[{ motion:"Approve", passed:true, initiator:"Sarah Watson", seconder:"Chad Henke", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Aaron Griner", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Chad Henke"], no:[], abstain:[] }], docs:[], children:[
      { number:"", name:"Ordinance from the Plan Commission Rezoning 731 N 1st Street from a (DPMU) Downtown Periphery Mixed Use Zoning District to a (DRMU) Downtown High-Rise Mixed-Use District.", votes:[], docs:[{ name:"Staff Report 731 N 1st St Rezone", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=4189)" }, { name:"Narrative 731 N 1st St Rezone", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=4190)" }, { name:"Site Plan 731 N 1st St", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=4191)" }, { name:"Certified Survey Map 731 N 1st St", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=4192)" }, { name:"Zoning Map of Area", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=4193)" }, { name:"Excerpt from Towers Area Plan", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=4194)" }], children:[] },
      { number:"", name:"Resolution from the Public Health & Safety Committee Approving or Denying Various Licenses as Indicated.", votes:[], docs:[{ name:"Licenses List", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=5237)" }, { name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=5238)" }], children:[] },
      { number:"", name:"Ordinance from the Infrastructure & Facilities Committee Designating 15 Minute Loading Zone on the North Side of Jackson Street Between 3rd Street and 5th Street.", votes:[], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6282)" }, { name:"15 Minute Loading Zone on Jackson Street Map", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6283)" }], children:[] },
      { number:"", name:"Ordinance from the Infrastructure & Facilities Committee Amending Section 10.20.080(a) Designating No Parking on the South Side of Jackson Street Beginning at the Intersection with 5th Street and Extending West 300 Feet.", votes:[], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6285)" }, { name:"No Parking South Side of Jackson Street Map", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6286)" }], children:[] },
    ] },
      { number:"7", name:"Ordinances and resolutions.", votes:[], docs:[], children:[
      { number:"", name:"Reconsideration of the Resolution from the Finance Committee authorizing entering into Memorandum of Understanding with both Healthy Opportunities for Latin Americans (HOLA) and New Beginnings Inc. through the U.S. Department of Housing and Urban Development (HUD) Lead Hazard Reduction Capacity Building Grant.", votes:[{ motion:"Approve", passed:true, initiator:"Lou Larson", seconder:"Tom Neal", yes:["Carol Lukens", "Michael  Martens", "Tom Neal", "Aaron Griner", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Chad Henke"], no:["Terry Kilian", "Lou Larson"], abstain:[] }, { motion:"Call the Question", passed:false, initiator:" ", seconder:" ", yes:[], no:[], abstain:[] }, { motion:"Reconsider ", passed:false, initiator:"Aaron Griner", seconder:"Vicki Tierney", yes:["Terry Kilian", "Tom Neal", "Aaron Griner", "Vicki Tierney", "Lou Larson"], no:["Carol Lukens", "Michael  Martens", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Chad Henke"], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6342)" }, { name:"Cover Letter - Healthy Opportunities for Latin Americans - Lead Hazard Program Outreach", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6343)" }, { name:"Budget - Healthy Opportunities for Latin Americans", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6344)" }, { name:"Healthy Opportunities for Latin Americans MOU", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6345)" }, { name:"Cover Letter - New Beginnings For Refugees Inc. - Lead Hazard Program Outreach", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6346)" }, { name:"RFP Proposal for New Beginnings For Refugees Inc", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6347)" }, { name:"New Beginnings MOU", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6348)" }], children:[] },
      { number:"", name:"Confirming Appointments of the Mayor of the City of Wausau to the Board of Review. ", votes:[{ motion:"Approve", passed:true, initiator:"Sarah Watson", seconder:"Carol Lukens", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Aaron Griner", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Chad Henke"], no:[], abstain:[] }], docs:[{ name:"Citizen Participation Form Joel Radloff ", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6353)" }], children:[] },
    ] },
      { number:"8", name:"Suspend Rule 12(A) Referral of resolutions and 6(B) Filing.", votes:[{ motion:"Suspend Rule 12(A) Referral of resolutions and 6(B) Filing", passed:false, initiator:"Tom Neal", seconder:"Carol Lukens", yes:["Carol Lukens", "Michael  Martens", "Tom Neal", "Aaron Griner", "Becky McElhaney ", "Lisa Rasmussen", "Chad Henke"], no:["Terry Kilian", "Sarah Watson", "Vicki Tierney", "Lou Larson"], abstain:[] }], docs:[], children:[
      { number:"", name:"Joint Resolution from the Finance Committee and Transit Commission Approving Contract with Kueny Architects LLC for Wausau Area Transit Feasibility Study.", votes:[], docs:[{ name:"Metro Ride Feasibility Study Contract", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6324)" }, { name:"Appendix C", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6325)" }, { name:"Appendix B", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6326)" }, { name:"Appendix A", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6327)" }], children:[] },
      { number:"", name:"Resolution from Common Council Approving Release of All Claims - Property Damage for Settlement of Counterclaim and Third Party Complaint – David Hoelzel v. City of Wausau (Marathon Co. Case No. 25-CV-594).", votes:[], docs:[], children:[] },
    ] },
      { number:"9", name:"Closed Session. ", votes:[], docs:[], children:[
      { number:"", name:"<strong>Adjourn to Closed Session <\/strong>pursuant to Wisconsin State Statute § 19.85(1)(g) to confer with legal counsel for the governmental body who is rendering oral or written advice concerning strategy to be adopted by the body with respect to litigation in which it is or is likely to become involved, for the purpose of conferring with legal counsel regarding a settlement offer received in Marathon County Case No. 25-CV-594 (David Hoelzel).", votes:[], docs:[], children:[] },
    ] },
      { number:"10", name:"Reconvene into Open Session, if necessary, to take action on Closed Session items. ", votes:[], docs:[], children:[] },
      { number:"11", name:"Announcement from Mayor and Alderpersons.", votes:[], docs:[], children:[] },
      { number:"12", name:"Comments and suggestions from citizens present during Public Comment occurring both before and after the business meeting.", votes:[], docs:[], children:[] },
      { number:"13", name:"Adjournment.", votes:[{ motion:"Adjourn", passed:true, initiator:"Tom Neal", seconder:"Vicki Tierney", yes:["Carol Lukens", "Michael  Martens", "Terry Kilian", "Tom Neal", "Aaron Griner", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Chad Henke"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
  {
    id: "5ywcXYWP8xo", source: "wausau",
    title: "Wausau Infrastructure and Facilities Committee Meeting",
    date: "March 12, 2026", shortDate: "MAR 12",
    committee: "Infrastructure & Facilities", duration: "~1h",
    url: "https://www.youtube.com/watch?v=5ywcXYWP8xo",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2041/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "This Infrastructure and Facilities Committee meeting was expected to address parking restrictions on several south side streets, review proposed 2027 street construction projects and a 5-year plan, consider a parking agreement amendment for Riverside Place, and discuss a transportation project for Grand Avenue signal replacements. Note: this summary is based on the agenda, not a transcript.",
    agenda: [
      { time:"N\/A", item:"Public comment on agenda items" },
      { time:"N\/A", item:"Consideration of February 12, 2026 Regular Infrastructure and Facilities Minutes" },
      { time:"N\/A", item:"Parking restrictions on S. 9th Ave, S. 10th Ave, and Bopf Street" },
      { time:"N\/A", item:"Proposed 2027 Street Construction Projects and 5 Year Plan" },
      { time:"N\/A", item:"Amended and Restated Parking Agreement with 11 Scott Street, LLC for Riverside Place" },
      { time:"N\/A", item:"Transportation Project Plat for Grand Avenue Signal Replacements, Sturgeon Eddy Road and Townline Rd" },
    ],
    discussions: [
      { item:"Parking restrictions on S. 9th Ave, S. 10th Ave, and Bopf Street", body:"The committee was scheduled to discuss and possibly act on parking restrictions affecting S. 9th Ave between Thomas Street and Chellis Street, S. 10th Ave between Thomas Street and Chellis Street, and Bopf Street between S. 9th Ave and S. 10th Ave. The specific nature of the proposed restrictions was not detailed in the agenda." },
      { item:"Proposed 2027 Street Construction Projects and 5 Year Plan", body:"This item involved discussion and possible action on the city's proposed street construction projects for 2027 and the accompanying 5-year capital improvement plan for streets and infrastructure." },
      { item:"Amended and Restated Parking Agreement with 11 Scott Street, LLC for Riverside Place", body:"The committee was to consider amendments to an existing parking agreement with 11 Scott Street, LLC for the property known as Riverside Place at 11 Scott Street." },
      { item:"Transportation Project Plat for Grand Avenue Signal Replacements", body:"This item addressed Project 370-40-40, involving transportation project plat approval for signal replacements on Grand Avenue at Sturgeon Eddy Road and Townline Road intersections." },
    ],
    publicComment: "Public comment on agenda items was listed as the first item on the agenda.",
    actionItems: [
      "Possible action on parking restrictions for S. 9th Ave, S. 10th Ave, and Bopf Street",
      "Possible action on 2027 Street Construction Projects and 5 Year Plan",
      "Possible action on amended parking agreement for Riverside Place",
      "Possible action on Transportation Project Plat for Grand Avenue Signal Replacements",
    ],
    civicItems: [
      { number:"1", name:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"2", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"<strong>February 12, 2026<\/strong> Regular Infrastructure and Facilities Minutes", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Tom Neal", seconder:"Sarah Watson", yes:["Chad Henke", "Lou Larson", "Tom Neal", "Michael  Martens", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"Infrastructure&Facilities_DRAFT_02122026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6363)" }], children:[] },
    ] },
      { number:"3", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Parking restrictions on S. 9th Ave between Thomas Street and Chellis Street, S. 10th Ave between Thomas Street and Chellis Street, and Bopf Street between S. 9th Ave and S. 10th Ave.", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Tom Neal", seconder:"Michael  Martens", yes:["Chad Henke", "Tom Neal", "Michael  Martens", "Sarah Watson"], no:["Lou Larson"], abstain:[] }], docs:[{ name:"holy name parking petition", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6369)" }], children:[] },
      { number:"b", name:"Proposed 2027 Street Construction Projects and 5 Year Plan", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Tom Neal", seconder:"Lou Larson", yes:["Chad Henke", "Lou Larson", "Tom Neal", "Michael  Martens", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"2027 5 Year CISM recommendation", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6372)" }], children:[] },
      { number:"c", name:"Amended and Restated Parking Agreement with 11 Scott Street, LLC for 11 Scott Street (aka Riverside Place)", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Tom Neal", seconder:"Sarah Watson", yes:["Chad Henke", "Tom Neal", "Michael  Martens", "Sarah Watson"], no:["Lou Larson"], abstain:[] }], docs:[{ name:"20260305 11 Scott Street - Parking Stall Lease Agreement Packet for INF", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6370)" }], children:[] },
      { number:"d", name:"Transportation Project Plat for Project 370-40-40, Grand Avenue Signal Replacements, Sturgeon Eddy Road and Townline Rd", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Lou Larson", seconder:"Sarah Watson", yes:["Chad Henke", "Lou Larson", "Tom Neal", "Michael  Martens", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"3700-40-40_0401 03042026 preliminary plat", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6373)" }], children:[] },
    ] },
      { number:"4", name:"Discussion.", votes:[], docs:[], children:[] },
      { number:"5", name:"Adjournment.", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Sarah Watson", seconder:"Lou Larson", yes:["Chad Henke", "Lou Larson", "Tom Neal", "Michael  Martens", "Sarah Watson"], no:[], abstain:[] }], docs:[], children:[] },
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
    overview: "The Board of Public Works meeting was expected to address multiple street construction bids and project matters, including opening bids for the 2026 North 8th Avenue street construction and asphalt paving projects. The agenda also included change orders and payment estimates for an ongoing 2025 street construction project. Note: This summary is based on the agenda, not a transcript.",
    agenda: [
      { time:"N\/A", item:"Open bids and make recommendation for 2026 Street Construction Project 'B' - North 8th Avenue" },
      { time:"N\/A", item:"Open bids and make recommendation for 2026 Asphalt Paving Project 'A'" },
      { time:"N\/A", item:"2025 Street Construction Project 'A' - Randolph Street\/Cherry Street: Haas Sons, Inc., Change Order #1 and Change Order #2" },
      { time:"N\/A", item:"2025 Street Construction Project 'A' - Randolph Street\/Cherry Street, Haas Sons, Inc., Pay Estimate #9" },
      { time:"N\/A", item:"Portland Cement Concrete License: KSK, Inc." },
    ],
    discussions: [
      { item:"2026 Street Construction Project 'B' - North 8th Avenue", body:"The board was scheduled to open sealed bids for the North 8th Avenue street construction project and make a recommendation for contract award." },
      { item:"2026 Asphalt Paving Project 'A'", body:"Bids were to be opened for the 2026 asphalt paving project with the board expected to make a recommendation on the contract." },
      { item:"2025 Street Construction Project 'A' - Change Orders", body:"The board was to consider Change Order #1 and Change Order #2 for the Randolph Street\/Cherry Street project being performed by Haas Sons, Inc. Change orders typically address modifications to project scope, timeline, or costs." },
      { item:"2025 Street Construction Project 'A' - Pay Estimate #9", body:"The board was to review and approve Pay Estimate #9 for Haas Sons, Inc. for work completed on the Randolph Street\/Cherry Street construction project." },
      { item:"Portland Cement Concrete License: KSK, Inc.", body:"The board was to consider approving a Portland Cement Concrete license for KSK, Inc., which would authorize the company to perform concrete work within the city." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Make recommendation on 2026 Street Construction Project 'B' bid award",
      "Make recommendation on 2026 Asphalt Paving Project 'A' bid award",
      "Consider approval of Change Order #1 and Change Order #2 for Haas Sons, Inc.",
      "Approve Pay Estimate #9 for Haas Sons, Inc.",
      "Consider Portland Cement Concrete License for KSK, Inc.",
    ],
    civicItems: [
      { number:"1", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"<strong>March 10, 2026<\/strong> Regular Board of Public Work Minutes.", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"MaryAnne Groat", seconder:"Eric Lindman", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"BoardofPublicWorks_Regular_MinutesDRAFT_03102026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6451)" }], children:[] },
    ] },
      { number:"2", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Open bids and make recommendation for 2026 Street Construction Project \"B\" - North 8th Avenue.", votes:[{ motion:"award the contract to Switlick & Sons, Inc., in the amount of $1,279,989.75", passed:true, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
      { number:"b", name:"Open bids and make recommendation for 2026 Asphalt Paving Project \"A\".", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:false, initiator:" ", seconder:" ", yes:[], no:[], abstain:[] }], docs:[], children:[] },
      { number:"c", name:"2025 Street Construction Project \"A\" - Randolph Street\/Cherry Street:  Haas Sons, Inc., Change Order #1 and Change Order #2.", votes:[{ motion:"approve Change Order #1 in the amount of $14,436.50", passed:true, initiator:"Eric Lindman", seconder:"Vincent Bonino", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"Change Order 1 Haas", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6443)" }, { name:"Change Order 2 Haas", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6444)" }], children:[] },
      { number:"d", name:"2025 Street Construction Project \"A\" - Randolph Street\/Cherry Street, Haas Sons, Inc.,   Pay Estimate #9.", votes:[{ motion:"approve Pay Estimate #9 in the amount of $535,011.42", passed:true, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"Haas 2025 Proj A Pay Est 9", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6442)" }], children:[] },
      { number:"e", name:"Portland Cement Concrete License:  KSK, Inc.", votes:[{ motion:"approve subject license", passed:true, initiator:"Vincent Bonino", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[{ name:"KSK Inc PCC", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6392)" }], children:[] },
    ] },
      { number:"3", name:"Adjournment.", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Eric Lindman", seconder:"MaryAnne Groat", yes:["Eric Lindman", "MaryAnne Groat", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
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
    overview: "The Wausau Plan Commission meeting was expected to cover two conditional use permit requests - one for a personal storage facility and another for a 7-story, 70-unit apartment building - along with a transportation project plat for signal replacements. Based on the agenda, not a transcript.",
    agenda: [
      { time:"N\/A", item:"Election of a Vice Chair" },
      { time:"N\/A", item:"Public comment on agenda items" },
      { time:"N\/A", item:"Public Hearing: Conditional Use Permit for 218 South 4th Street - Personal Storage Facility (Dunwoody Storage)" },
      { time:"N\/A", item:"Discussion and possible action on Conditional Use Permit for 731 N 1st Street - 70 unit, 7-story apartment building (Beacon Resources, LLC)" },
      { time:"N\/A", item:"Discussion and possible action on Transportation Project Plat for Project 370-40-40, Grand Avenue signal replacements, Sturgeon Eddy Road and Townline Rd" },
    ],
    discussions: [
      { item:"Election of a Vice Chair", body:"The commission was scheduled to elect a Vice Chair for the Plan Commission." },
      { item:"Conditional Use Permit - 218 South 4th Street (Dunwoody Storage)", body:"A public hearing was scheduled regarding a Conditional Use Permit request to authorize construction of a Personal Storage Facility in the Light Industrial (LI) Zoning District at 218 South 4th Street." },
      { item:"Conditional Use Permit - 731 N 1st Street (Beacon Resources, LLC)", body:"The commission was to discuss and potentially take action on a Conditional Use Permit request to allow construction of a 70-unit, 7-story apartment building at 731 N 1st Street." },
      { item:"Transportation Project Plat - Grand Avenue Signal Replacements", body:"The commission was to discuss and potentially approve a Transportation Project Plat for Project 370-40-40, involving signal replacements at Grand Avenue, Sturgeon Eddy Road, and Townline Road." },
    ],
    publicComment: "Public comment on agenda items was included on the agenda as Item 2.",
    actionItems: [
      "Elect Vice Chair",
      "Consider approval of Conditional Use Permit for personal storage facility at 218 South 4th Street",
      "Consider approval of Conditional Use Permit for 70-unit apartment building at 731 N 1st Street",
      "Consider approval of Transportation Project Plat for Grand Avenue signal replacements",
    ],
    civicItems: [
      { number:"1", name:"Election of a Vice Chair", votes:[], docs:[], children:[] },
      { number:"2", name:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"3", name:"Consideration of the minutes of the preceding meeting(s).", votes:[], docs:[], children:[
      { number:"a", name:"Regular Plan Commission Minutes", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Andrew Brueggeman", seconder:"Bruce Bohlken", yes:["Doug Diny", "Eric Lindman", "Sarah Watson", "George Bornemann", "Andrew Brueggeman", "Bruce Bohlken"], no:[], abstain:[] }], docs:[{ name:"PlanCommission_Regular_Minutes_02182026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6401)" }], children:[] },
    ] },
      { number:"4", name:"Public Hearing:", votes:[], docs:[], children:[
      { number:"a", name:"Discussion on approving a Conditional Use Permit for 218 South 4th Street to authorize and allow construction of a Personal Storage Facility use in the Light Industrial (LI) Zoning District. (Dunwoody Storage)", votes:[], docs:[{ name:"Staff Report 218 S 4th St Conditional Use Permit", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6305)" }, { name:"Dunwoody Storage - CUP Application", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6371)" }, { name:"CUP Review Plans-11x17", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6278)" }, { name:"Dunwoody Storage - Site Plan", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6275)" }, { name:"Dunwoody Storage - Elevations", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6274)" }, { name:"Dunwoody Storage_Renderings", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6276)" }, { name:"Landscape Requirements", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6277)" }], children:[] },
    ] },
      { number:"5", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Discussion and possible action on approving a Conditional Use Permit for 731 N 1st  Street to allow for a 70 unit, 7-story apartment building. (Beacon Resources, LLC)", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"George Bornemann", seconder:"Andrew Brueggeman", yes:["Doug Diny", "Eric Lindman", "Sarah Watson", "George Bornemann", "Andrew Brueggeman", "Bruce Bohlken"], no:[], abstain:[] }], docs:[{ name:"Staff Report and Street Findings 731 N 1st St CUP", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6402)" }, { name:"Front Facade Rendering 731 N 1st St", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6405)" }, { name:"Elevations 731 N 1st St", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6403)" }, { name:"Floor Plan 731 N 1st St", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6404)" }, { name:"Excerpt from City of Wausau Comp Plan ", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6406)" }], children:[] },
      { number:"b", name:"Discussion and possible action approving the Transportation Project Plat for Project 370-40-40, Grand Avenue signal replacements, Sturgeon Eddy Road and Townline Rd. ", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Andrew Brueggeman", seconder:"Bruce Bohlken", yes:["Doug Diny", "Eric Lindman", "Sarah Watson", "George Bornemann", "Andrew Brueggeman", "Bruce Bohlken"], no:[], abstain:[] }], docs:[{ name:"3700-40-40_0401 03042026 preliminary plat", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6407)" }], children:[] },
    ] },
      { number:"6", name:"Discussion.", votes:[], docs:[], children:[] },
      { number:"7", name:"Adjournment.", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Sarah Watson", seconder:"Bruce Bohlken", yes:["Doug Diny", "Eric Lindman", "Sarah Watson", "George Bornemann", "Andrew Brueggeman", "Bruce Bohlken"], no:[], abstain:[] }], docs:[], children:[] },
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
    overview: "This Board of Public Works meeting was scheduled to open bids and make a recommendation for the 2026 Asphalt Paving Project 'A'. Based on the agenda only, this is a brief meeting focused on a single infrastructure procurement item.",
    agenda: [
      { time:"N\/A", item:"Open bids and make recommendation for 2026 Asphalt Paving Project 'A'" },
    ],
    discussions: [
      { item:"2026 Asphalt Paving Project 'A' Bids", body:"The board was scheduled to open sealed bids submitted by contractors for the 2026 Asphalt Paving Project 'A'. Following the bid opening, the board would review the submissions and make a recommendation on which contractor should be awarded the project." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Open bids for 2026 Asphalt Paving Project 'A'",
      "Make recommendation for contract award for 2026 Asphalt Paving Project 'A'",
    ],
    civicItems: [
      { number:"1", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Open bids and make recommendation for 2026 Asphalt Paving Project \"A\".", votes:[{ motion:"award contract to RC Pavers, LLC in the amount of $824,146.34", passed:true, initiator:"Eric Lindman", seconder:"Vincent Bonino", yes:["Eric Lindman", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
    ] },
      { number:"2", name:"Adjournment.", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Vincent Bonino", seconder:"Eric Lindman", yes:["Eric Lindman", "Vincent Bonino"], no:[], abstain:[] }], docs:[], children:[] },
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
    overview: "This Public Health & Safety Committee meeting was expected to address municipal code changes including solid waste disposal regulations and a repeal of mobile phone driving restrictions, along with a renewable energy partnership. The agenda also included departmental reports and license applications. Note: This summary is based on the agenda, not a transcript.",
    agenda: [
      { time:"N\/A", item:"Public comment on agenda items" },
      { time:"N\/A", item:"Consideration of the minutes of the preceding meeting(s)" },
      { time:"N\/A", item:"Approval or denial of various license applications" },
      { time:"N\/A", item:"Repealing and recreating Wausau Municipal Code Chapter 6.44 Solid Waste Disposal" },
      { time:"N\/A", item:"Repealing Wausau Municipal Code Section 10.01.012 Use of Hand-Held Mobile Telephones and Mobile Electronic Devices While Driving Prohibited" },
      { time:"N\/A", item:"Approving Memorandum of Understanding between the City of Wausau and the Midwest Renewable Energy Association (MREA) for Grow Solar Central Wisconsin Group Buy Program" },
      { time:"N\/A", item:"Wausau Fire Department 2025 Annual Report" },
      { time:"N\/A", item:"Tavern Activities Report from February 2026" },
      { time:"N\/A", item:"Community Outreach Update" },
    ],
    discussions: [
      { item:"Various license applications", body:"The committee was scheduled to consider approval or denial of various license applications. Specific applicants and license types were not detailed in the agenda." },
      { item:"Solid Waste Disposal Municipal Code Chapter 6.44", body:"The committee was to discuss repealing and recreating the municipal code chapter governing solid waste disposal. This suggests a comprehensive update to the city's waste management regulations." },
      { item:"Hand-Held Mobile Phone Driving Prohibition Repeal", body:"The committee was scheduled to consider repealing the local ordinance prohibiting use of hand-held mobile phones and electronic devices while driving. This may reflect changes in state law that supersede local regulations." },
      { item:"Midwest Renewable Energy Association MOU", body:"The committee was to consider a memorandum of understanding with MREA to partner in operating the Grow Solar Central Wisconsin Group Buy Program, a renewable energy initiative." },
      { item:"Wausau Fire Department 2025 Annual Report", body:"The Fire Department was scheduled to present its 2025 annual report to the committee for discussion and review." },
      { item:"Tavern Activities Report", body:"The committee was to receive a report on tavern activities from February 2026, likely covering enforcement and compliance matters." },
      { item:"Community Outreach Update", body:"An update on community outreach efforts was scheduled for discussion with the committee." },
    ],
    publicComment: "Public comment on agenda items was listed as the first item on the agenda.",
    actionItems: [
      "Vote on approval or denial of various license applications",
      "Vote on repealing and recreating Municipal Code Chapter 6.44 Solid Waste Disposal",
      "Vote on repealing Municipal Code Section 10.01.012 regarding mobile phone use while driving",
      "Vote on MOU with Midwest Renewable Energy Association for Grow Solar program",
      "Approval of February 16, 2026 meeting minutes",
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
    id: "8rRo1cm2YJ0", source: "wausau",
    title: "Wausau Finance Committee Meeting",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "Finance Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=8rRo1cm2YJ0",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2016/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Finance Committee was scheduled to consider multiple financial and property matters including airport ground leases, participation in a national opioid settlement, budget amendments for water infrastructure and fund carryovers, and potential property acquisitions for the Public Works Department. Based on agenda only, not a transcript.",
    agenda: [
      { time:"N\/A", item:"Public comment on agenda items" },
      { time:"N\/A", item:"Consideration of March 10, 2026 Regular Finance Committee Minutes" },
      { time:"N\/A", item:"Approving Alleged Claim for Recovery of Unlawful Tax for Green Acres at Greenwood Hills, LLC - Outlot 1" },
      { time:"N\/A", item:"Approving consent to transfer title to buildings and improvements and waiver of first right of refusal at 939 Woods Place" },
      { time:"N\/A", item:"Terminating Airport Ground Lease with Wynn O. Jones at 939 Woods Place" },
      { time:"N\/A", item:"Approving Airport Ground Lease with Owen Jones at 939 Woods Place" },
      { time:"N\/A", item:"Approving Airport Ground Lease with Cole Lundberg" },
      { time:"N\/A", item:"Approving participation in Six Remnant Defendants National Opioid Settlement Agreement" },
      { time:"N\/A", item:"Approving budget amendment for Wausau Water Works 2025 Lead Service Line Replacement project" },
      { time:"N\/A", item:"Approving budget amendment for carryover of funds from 2025 to 2026" },
      { time:"N\/A", item:"Review of 2025 Motor Pool Fund financial results and related budget amendment" },
      { time:"N\/A", item:"Approving 2026 General Obligation Promissory Note for Capital Improvements" },
      { time:"N\/A", item:"Review of 2025 General Fund Financial Results" },
      { time:"N\/A", item:"Considering purchasing properties at 108 Adolph Street, 112 Adolph Street, 112-1\/2 Adolph Street and 233 Myron Street for DPW Streets Division" },
      { time:"N\/A", item:"Closed Session for property purchase negotiations" },
    ],
    discussions: [
      { item:"Unlawful Tax Claim - Green Acres at Greenwood Hills, LLC", body:"Committee to consider approving an alleged claim for recovery of unlawful tax related to Outlot 1 of Green Acres at Greenwood Hills, LLC property." },
      { item:"939 Woods Place Property Transfer and Lease Changes", body:"Three related items involving airport property: approving transfer of building title and waiving right of first refusal, terminating an existing ground lease with Wynn O. Jones, and approving a new ground lease with Owen Jones." },
      { item:"Airport Ground Lease with Cole Lundberg", body:"Committee to consider approving a new airport ground lease agreement with Cole Lundberg." },
      { item:"National Opioid Settlement Agreement", body:"Committee to consider the city's participation in the Six Remnant Defendants National Opioid Settlement Agreement, which would provide settlement funds related to the opioid crisis." },
      { item:"Water Works Budget Amendment for Lead Service Line Replacement", body:"Committee to approve a budget amendment for the 2025 Lead Service Line Replacement project to cover costs not funded by the Wisconsin DNR subsidized loan." },
      { item:"Budget Amendment for 2025-2026 Fund Carryover", body:"Committee to approve carrying over unspent funds from the 2025 budget year into 2026." },
      { item:"2025 Motor Pool Fund Review", body:"Committee to review the financial results of the 2025 Motor Pool Fund and consider a related budget amendment." },
      { item:"2026 General Obligation Promissory Note", body:"Committee to approve a general obligation promissory note for capital improvements in 2026, representing city borrowing for infrastructure projects." },
      { item:"2025 General Fund Financial Results Review", body:"Committee to review the overall financial performance of the General Fund for the 2025 fiscal year." },
      { item:"DPW Streets Division Property Acquisition", body:"Committee to consider purchasing four properties on Adolph Street and Myron Street to expand land available to the Department of Public Works Streets Division. Related closed session scheduled for negotiation purposes." },
    ],
    publicComment: "Public comment on agenda items was included as the first item on the agenda.",
    actionItems: [
      "Vote on alleged unlawful tax claim for Green Acres at Greenwood Hills, LLC",
      "Vote on property transfer consent and waiver at 939 Woods Place",
      "Vote on terminating airport ground lease with Wynn O. Jones",
      "Vote on new airport ground lease with Owen Jones",
      "Vote on airport ground lease with Cole Lundberg",
      "Vote on participation in National Opioid Settlement Agreement",
      "Vote on Water Works budget amendment for lead service line replacement",
      "Vote on 2025-2026 budget carryover amendment",
      "Vote on Motor Pool Fund budget amendment",
      "Vote on 2026 General Obligation Promissory Note",
      "Vote on purchasing Adolph Street and Myron Street properties for DPW",
    ],
    civicItems: [
      { number:"1", name:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"2", name:"Consideration of the minutes of the preceding meeting(s).", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Michael  Martens", "Vicki Tierney", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[], children:[
      { number:"a", name:"Regular Finance Committee Minutes", votes:[], docs:[{ name:"Finance_Regular_03102026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6495)" }], children:[] },
    ] },
      { number:"3", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Approving Alleged Claim for Recovery of Unlawful Tax for Green Acres at Greenwood Hills, LLC - Outlot 1. ", votes:[{ motion:"approve the claim for recovery", passed:false, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:[], no:["Michael  Martens", "Vicki Tierney", "Sarah Watson", "Aaron Griner"], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6430)" }, { name:"Green Acres Claim for Recovery of Unlawful Tax", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6292)" }], children:[] },
      { number:"b", name:"Approving consent to transfer title to buildings and improvements and waiver of first right of refusal to purchase the buildings and improvements at 939 Woods Place.", votes:[{ motion:"approve the consent to transfer title to buildings", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Wynn O. Jones Airport Ground Lease", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6310)" }, { name:"Offer to Purchase", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6311)" }], children:[] },
      { number:"c", name:"Terminating Airport Ground Lease with Wynn O. Jones at 939 Woods Place. ", votes:[{ motion:"approve", passed:true, initiator:"Vicki Tierney", seconder:"Sarah Watson", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Jones Termination of airport Ground Lease", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6454)" }], children:[] },
      { number:"d", name:"Approving Airport Ground Lease with Owen Jones at 939 Woods Place.", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Owen Jones Airport Ground Lease", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6455)" }], children:[] },
      { number:"e", name:"Approving Airport Ground Lease with Cole Lundberg.", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Aaron Griner", seconder:"Sarah Watson", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Lundberg Ground Lease", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6488)" }, { name:"Lundberg Hangar Map", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6489)" }], children:[] },
      { number:"f", name:"Approving of and participating in the Six Remnant Defendants National Opioid Settlement Agreement.", votes:[{ motion:"postpone [AGENDA_ITEM_NAME] to the next scheduled meeting", passed:true, initiator:"Aaron Griner", seconder:"Vicki Tierney", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Participation and Release Form", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6463)" }, { name:"Notice of New National Opioid Settlement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6464)" }, { name:"Opioid Settlement Overview", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6465)" }], children:[] },
      { number:"g", name:"Approving budget amendment for the Wausau Water Works for 2025 Lead Service Line Replacement project to cover costs not funded by the WDNR subsidized loan.", votes:[{ motion:"postpone consideration of this item to the next meeting", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6473)" }, { name:"WDNR LSL Funding Non-Construction Costs Determination", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6470)" }], children:[] },
      { number:"h", name:"Approving budget amendment for the carryover of funds from 2025 to 2026.", votes:[{ motion:"approve [AGENDA_ITEM_NAME]", passed:true, initiator:"Sarah Watson", seconder:"Aaron Griner", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson", "Aaron Griner"], no:[], abstain:[] }], docs:[{ name:"Carryover Funds for 2025 to 2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6565)" }], children:[] },
      { number:"i", name:"Review of 2025 Motor Pool Fund financial results and related budget amendment.", votes:[], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6560)" }, { name:"Motor Pool Income Statement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6561)" }], children:[] },
      { number:"j", name:"Approving 2026 General Obligation Promissory Note for Capital Improvements.", votes:[{ motion:"approve to the calendar", passed:true, initiator:"Sarah Watson", seconder:"Michael  Martens", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6564)" }], children:[] },
      { number:"k", name:"Review of 2025 General Fund Financial Results. ", votes:[{ motion:"approve to transfer the funds", passed:true, initiator:"Vicki Tierney", seconder:"Sarah Watson", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6562)" }, { name:"General Fund Income Statement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6563)" }], children:[] },
      { number:"l", name:"Considering purchasing the following properties adding additional land to the Department of Public Works Streets Division:  108 Adolph Street, 112 Adolph Street, 112-1\/2 Adolph Street and 233 Myron Street.", votes:[{ motion:"postpone consideration the purchase of those properties until next meeting", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson"], no:[], abstain:[] }], docs:[{ name:"lindman staff memo 12.11.25", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6490)" }, { name:"I&F mins 12.11.25", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6491)" }, { name:"Considering property purchases by DPW", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6493)" }, { name:"OwnerActivelySelling_DPWsite_Feb2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6494)" }, { name:"I&F mins 2.12.26", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6492)" }, { name:"233 Myron Street Phase I", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6466)" }], children:[] },
    ] },
      { number:"4", name:"Closed Session.", votes:[], docs:[], children:[
      { number:"a", name:"<strong>Adjourn to Closed Session <\/strong>pursuant to Wisconsin State Statute § 19.85(1)(e) for deliberating or negotiating the purchasing of public properties, the investing of public funds, or conducting other specified public business, whenever competitive or bargaining reasons require a closed session, for the purpose of purchasing the following properties adding additional land to the Department of Public Works Streets Division: 108 Adolph Street, 112 Adolph Street, 112-1\/2 Adolph Street and 233 Myron Street.", votes:[], docs:[], children:[] },
    ] },
      { number:"5", name:"Reconvene into Open Session, if necessary, to take action on Closed Session items.", votes:[], docs:[], children:[] },
      { number:"6", name:"Adjournment.", votes:[{ motion:"adjourn", passed:true, initiator:"Sarah Watson", seconder:"Vicki Tierney", yes:["Michael  Martens", "Vicki Tierney", "Becky McElhaney ", "Sarah Watson"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
  {
    id: "rQcjCEY36e4", source: "wausau",
    title: "Wausau City Council Meeting",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "City Council", duration: "~1h",
    url: "https://www.youtube.com/watch?v=rQcjCEY36e4",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/1976/overview",
    isAgendaOnly: false,
    badge: "new",
    overview: "This Common Council meeting was expected to address several financial agreements including solid waste services, airport-related airspace obstruction removals, and a development agreement for Waterside Place. The agenda also included a closed session regarding litigation strategy for an active lawsuit and budget modifications for police equipment purchases. Note: This summary is based on the agenda, not a transcript.",
    agenda: [
      { time:"N\/A", item:"Proclamation - Sarah Ruffi Day (March 31, 2026)" },
      { time:"N\/A", item:"Mayoral Citation Recognition of Exemplary Service - Department of Public Works Plow Crews and Support Team" },
      { time:"N\/A", item:"Sustainability, Energy, & Environment Committee Award to Kolbe & Kolbe Millwork Co., Inc." },
      { time:"N\/A", item:"Ordinance Amending Section 9.20.070 Fires, Fireworks, Firearms, Missiles" },
      { time:"N\/A", item:"Resolution Approving Renewal of Parking Lot Lease with Colonial Property 4, LLC" },
      { time:"N\/A", item:"Confirming Mayoral Appointments to Plan Commission, Affordable Housing Task Force, and Business Improvement District Board" },
      { time:"N\/A", item:"Resolution Approving Residential Solid Waste and Recycling Service Agreement with Harter's Fox Valley Disposal LLC" },
      { time:"N\/A", item:"Resolution Approving Airspace Obstruction Removal Agreement with Schofield Ridgeland Legacy LLC" },
      { time:"N\/A", item:"Resolution Approving Airspace Obstruction Removal Agreement with Zachary Lange" },
      { time:"N\/A", item:"Resolution Adopting 2026 Budget Modification for Police Department Red-Dot Optics Purchase" },
      { time:"N\/A", item:"Joint Resolution Approving Development Agreement for Waterside Place at 11 Scott Street" },
      { time:"N\/A", item:"Ordinance Repealing and Recreating Chapter 6.44 Solid Waste Disposal" },
      { time:"N\/A", item:"Resolution Approving Release of All Claims - David Hoelzel v. City of Wausau Settlement" },
      { time:"N\/A", item:"Resolution Approving Paid Duty Time for Out of Country Training for Police Officer" },
      { time:"N\/A", item:"Resolution Approving Community Outreach Professional Shelter Operations Duty Premium Differential" },
      { time:"N\/A", item:"Closed Session - Litigation Strategy for Marathon County Case No. 25-CV-594" },
    ],
    discussions: [
      { item:"Recognition of Public Works Plow Crews", body:"The Mayor planned to present a citation recognizing exemplary service by the Department of Public Works plow crews and support team, likely related to winter snow removal operations." },
      { item:"Sustainability Award to Kolbe & Kolbe Millwork", body:"The Sustainability, Energy, & Environment Committee was scheduled to present an award to Kolbe & Kolbe Millwork Co., Inc. for their sustainability efforts." },
      { item:"Parks Ordinance Amendment - Fires, Fireworks, Firearms, Missiles", body:"An ordinance from the Parks & Recreation Committee proposes amendments to Section 9.20.070 of the municipal code regarding fires, fireworks, firearms, and missiles in parks." },
      { item:"Residential Solid Waste and Recycling Service Agreement", body:"The Finance Committee forwarded a resolution to approve a service agreement with Harter's Fox Valley Disposal LLC for residential solid waste and recycling collection services." },
      { item:"Airspace Obstruction Removal Agreements", body:"Two separate resolutions address airspace obstruction removal agreements with property owners on Ridgeland Avenue in Schofield, including related budget modifications likely connected to airport safety requirements." },
      { item:"Police Department Budget Modification for Red-Dot Optics", body:"A resolution proposes using proceeds from the sale of a Thompson sub-machinegun to purchase red-dot optics for the Wausau Police Department through a 2026 budget modification." },
      { item:"Waterside Place Development Agreement", body:"A joint resolution from Economic Development and Infrastructure committees would approve a development agreement and amended parking agreement with 11 Scott Street, LLC for the Waterside Place project." },
      { item:"Solid Waste Disposal Code Overhaul", body:"An ordinance from the Public Health & Safety Committee proposes repealing and recreating Chapter 6.44 of the Municipal Code regarding solid waste disposal regulations." },
      { item:"David Hoelzel Litigation Settlement", body:"A resolution would approve a release of all claims for settlement of a counterclaim and third party complaint in Marathon County Case No. 25-CV-594 involving property damage claims against the city." },
      { item:"Police Officer Out of Country Training", body:"A joint resolution from Human Resources and Finance committees would approve paid duty time for a Wausau Police Department officer to attend training outside the country." },
      { item:"Shelter Operations Duty Premium", body:"A joint resolution proposes approving a duty premium differential for Community Outreach Professional positions involved in shelter operations." },
    ],
    publicComment: "Public comment was on the agenda, with preregistered citizen comments scheduled early in the meeting and additional public comment available both before and after the business meeting.",
    actionItems: [
      "Vote on ordinance amending parks code Section 9.20.070",
      "Vote on parking lot lease renewal with Colonial Property 4, LLC",
      "Confirm mayoral appointments to Plan Commission, Affordable Housing Task Force, and BID Board",
      "Vote on solid waste and recycling service agreement with Harter's Fox Valley Disposal LLC",
      "Vote on two airspace obstruction removal agreements and related budget modifications",
      "Vote on police department budget modification for red-dot optics",
      "Vote on Waterside Place development agreement at 11 Scott Street",
      "Vote on repealing and recreating solid waste disposal code chapter",
      "Vote on settlement release for Hoelzel litigation",
      "Vote on paid duty time for police officer international training",
      "Vote on shelter operations duty premium differential",
      "Closed session discussion on litigation strategy for Hoelzel case",
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
      { number:"", name:"<div id=\"isPasted\">Joint Resolution from the Economic Development Committee and the Infrastructure & Facilities Committee Approving Development Agreement and Amended and Restated Parking Agreement with 11 Scott Street, LLC for Waterside Place at 11 Scott Street.<\/div>", votes:[{ motion:"Approve", passed:true, initiator:"Sarah Watson", seconder:"Lisa Rasmussen", yes:["Michael  Martens", "Tom Neal", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Chad Henke"], no:["Terry Kilian", "Becky McElhaney ", "Lou Larson"], abstain:[] }], docs:[{ name:"Wausau - 11 Scott Street - Development Agreement ", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6457)" }, { name:"11 Scott St Amended and Restated Parking Agreement", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6456)" }, { name:"Staff Memo 11 Scott", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6458)" }], children:[] },
    ] },
      { number:"9", name:"Suspend Rule 1(D) Transmission of Committee business to the Council, 6(B) Filing, and 12(A) Referral of resolutions.", votes:[{ motion:"Approve", passed:true, initiator:"Lisa Rasmussen", seconder:"Sarah Watson", yes:["Michael  Martens", "Tom Neal", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Lou Larson", "Chad Henke"], no:["Terry Kilian", "Vicki Tierney"], abstain:[] }], docs:[], children:[
      { number:"", name:"Ordinance from the Public Health & Safety Committee Repealing and Recreating Wausau Municipal Code Chapter 6.44 Solid Waste Disposal.", votes:[{ motion:"Approve", passed:true, initiator:"Chad Henke", seconder:"Lisa Rasmussen", yes:["Michael  Martens", "Terry Kilian", "Tom Neal", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Chad Henke"], no:[], abstain:[] }], docs:[{ name:"Wausau Municipal Code Chapter 6.44 Solid Waste Disposal", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6439)" }], children:[] },
      { number:"", name:"Resolution from Common Council Approving Release of All Claims – Property Damage for Settlement of Counterclaim and Third Party Complaint – David Hoelzel v. City of Wausau (Marathon Co. Case No. 25-CV-594).", votes:[{ motion:"Approve", passed:true, initiator:"Tom Neal", seconder:"Sarah Watson", yes:["Michael  Martens", "Terry Kilian", "Tom Neal", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Chad Henke"], no:["Lou Larson"], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6287)" }, { name:"Release of All Claims", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6288)" }, { name:"Summons and Complaint", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6289)" }, { name:"Summons and Third Party Complaint", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6290)" }, { name:"Counterclaim", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6291)" }], children:[] },
      { number:"", name:"Joint Resolution from the Human Resources Committee and the Finance Committee Approving Paid Duty Time for Out of Country Training for a Wausau Police Department Officer.", votes:[{ motion:"Approve", passed:true, initiator:"Terry Kilian", seconder:"Tom Neal", yes:["Michael  Martens", "Terry Kilian", "Tom Neal", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Chad Henke"], no:[], abstain:[] }], docs:[{ name:"Germany Trip", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6498)" }], children:[] },
      { number:"", name:"Joint Resolution from the Human Resources Committee and the Finance Committee Approving Community Outreach Professional Shelter Operations Duty Premium Differential.", votes:[{ motion:"Approve", passed:true, initiator:"Lou Larson", seconder:"Chad Henke", yes:["Michael  Martens", "Terry Kilian", "Tom Neal", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Chad Henke"], no:[], abstain:[] }], docs:[{ name:"Staff Memo", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6499)" }, { name:"Shelter Duty Premium Matrix ", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6501)" }], children:[] },
    ] },
      { number:"10", name:"Closed Session. ", votes:[], docs:[], children:[
      { number:"", name:"<strong>Adjourn to Closed Session <\/strong>pursuant to Wisconsin State Statute § 19.85(1)(g) to confer with legal counsel for the governmental body who is rendering oral or written advice concerning strategy to be adopted by the body with respect to litigation in which it is or is likely to become involved, for the purpose of conferring with legal counsel regarding a settlement offer received in Marathon County Case No. 25-CV-594 (David Hoelzel).", votes:[], docs:[], children:[] },
    ] },
      { number:"11", name:"Reconvene into Open Session, if necessary, to take action on Closed Session items. ", votes:[], docs:[], children:[] },
      { number:"12", name:"Announcement from Mayor and Alderpersons.", votes:[], docs:[], children:[] },
      { number:"13", name:"Comments and suggestions from citizens present during Public Comment occurring both before and after the business meeting.", votes:[], docs:[], children:[] },
      { number:"14", name:"Adjournment.", votes:[{ motion:"Adjourn", passed:true, initiator:"Vicki Tierney", seconder:"Lou Larson", yes:["Michael  Martens", "Terry Kilian", "Tom Neal", "Becky McElhaney ", "Lisa Rasmussen", "Sarah Watson", "Vicki Tierney", "Lou Larson", "Chad Henke"], no:[], abstain:[] }], docs:[], children:[] },
    ],
  },
  {
    id: "bb_719202", source: "school_board",
    title: "Audit of the Bills Committee Meeting",
    date: "November 24, 2025", shortDate: "NOV 24",
    committee: "Audit of the Bills", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=719202",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=719202",
    isAgendaOnly: true,
    badge: "new",
    overview: "The Audit of the Bills Committee Meeting reviewed and approved the district's bills for November 2025. This routine financial oversight meeting ensures proper review of Wausau School District expenditures before payment authorization.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Audit of the Bills" },
      { time:"0:07", item:"Adjourn" },
    ],
    discussions: [
      { item:"Audit of the Bills", body:"Committee members reviewed the November 2025 bills for the Wausau School District. The attachment dated November 18, 2025 contained the itemized list of expenditures requiring committee approval before payment processing." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Review and approve the November 2025 audit of bills",
    ],
  },
  {
    id: "bb_719203", source: "school_board",
    title: "Education\/Operations Committee Meeting",
    date: "November 24, 2025", shortDate: "NOV 24",
    committee: "Education\/Operations Committee Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=719203",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=719203",
    isAgendaOnly: true,
    badge: "new",
    overview: "The Education\/Operations Committee meeting addressed the renewal of 4K program partnerships with six community sites for 2026-2027, received a comprehensive annual safety update including drill protocols using the Standard Response Protocol system, and reviewed 43 Neola policy updates. The meeting also featured a presentation highlighting John Marshall Elementary School.",
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
      { item:"4K Program Agreement", body:"The district's four-year-old kindergarten program seeks approval to renew program agreements with six community collaboration sites for the 2026-2027 school year, including Wausau Child Care, Mountain View Montessori, Woodson YMCA, Newman Catholic Schools, and Marathon County Head Start. These partnerships have been in place since 2002, with 4K Principal Kara Rakowski and Director of Elementary Education Julie Schell presenting the agreement." },
      { item:"Annual Safety Update \/ Drill Debrief", body:"The district is implementing the I Love U Guys Standard Response Protocol using standardized vocabulary (HOLD, SECURE, LOCKDOWN, EVACUATE, SHELTER) for consistent emergency responses across all schools. Security measures include secure building entrances, Visitor Aware System, security cameras, and locked exterior doors, with district-wide LOCKDOWN drills conducted in September and EVACUATION drills in October in partnership with Wausau Police Department and School Resource Officers." },
      { item:"Neola Policies Update", body:"The committee reviewed 43 proposed policy changes covering topics including board member conduct, employment procedures, student entrance age, third grade promotion and retention, academic honesty, drug policies, drone usage, school safety, food service and wellness, and various technical corrections to existing policies." },
    ],
    publicComment: "A public and student comment period was included on the agenda.",
    actionItems: [
      "Approve 4K Program Agreements with six community partner sites for 2026-2027 school year",
      "Approve Neola policy updates (Volume 34 Number 2 and technical corrections)",
      "Approve the Minutes from October 27, 2025",
    ],
  },
  {
    id: "bb_719210", source: "school_board",
    title: "Special Meeting",
    date: "November 24, 2025", shortDate: "NOV 24",
    committee: "Special Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=719210",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=719210",
    isAgendaOnly: true,
    badge: "new",
    overview: "This special meeting of the Wausau School District Board of Education focused on closed session discussions regarding real estate negotiations and the superintendent evaluation. The board may take action in open session following these confidential deliberations.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Request for Closed Session Pursuant to State Statutes" },
      { time:"0:04", item:"Discussion regarding the Competitive Negotiations of a Purchase\/Sale of Real Estate s. 19.85 (1)(e)" },
      { time:"0:19", item:"Evaluation of Superintendent of Schools s. 19.85 (1)(c)" },
      { time:"0:34", item:"Reconvene in Open Session, and if Necessary, Take Action as a Result of the Closed Session" },
      { time:"0:39", item:"Adjourn" },
    ],
    discussions: [
      { item:"Discussion regarding the Competitive Negotiations of a Purchase\/Sale of Real Estate", body:"The board entered closed session under Wisconsin Statute 19.85(1)(e) to discuss competitive negotiations related to the purchase or sale of real estate. This statutory provision allows for confidential deliberations when public discussion could negatively impact the district's bargaining position." },
      { item:"Evaluation of Superintendent of Schools", body:"The board conducted a closed session evaluation of the Superintendent of Schools under Wisconsin Statute 19.85(1)(c). This statute permits closed sessions for considering employment, promotion, compensation, or performance evaluation data of public employees." },
      { item:"Reconvene in Open Session", body:"Following the closed session discussions, the board reconvened in open session with the potential to take formal action on matters discussed during the closed session regarding real estate negotiations and the superintendent evaluation." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Potential action on real estate purchase\/sale negotiations",
      "Potential action on Superintendent evaluation",
    ],
  },
  {
    id: "bb_720719", source: "school_board",
    title: "Regular Meeting",
    date: "December 8, 2025", shortDate: "DEC 8",
    committee: "Regular Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=720719",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=720719",
    isAgendaOnly: true,
    badge: "new",
    overview: "This Wausau School District Board of Education regular meeting covered referendum construction updates for elementary schools at 50% completion, a charter school status update, 4K program agreements with community partners, annual safety updates, and multiple policy revisions. The meeting also included a resolution of commendation for Rob Hughes and routine consent agenda items including personnel changes and financial reports.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Roll Call" },
      { time:"0:04", item:"Pledge of Allegiance: Jim Bouch, President" },
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
      { item:"50% Updates for Elementary Referendum Construction", body:"As referendum-funded improvement plans develop for each facility, the Board received updates when designs reach 50% completion. Current plans for John Marshall, Rib Mountain, Franklin Elementaries, and Lincoln Early Learning Academy were shared with the Board." },
      { item:"Red Granite Update", body:"Red Granite Principal Maud Mangin and Red Granite Governance Board President Amanda Molin shared an update on the status of the Red Granite Charter School. This presentation was allocated approximately 5 minutes." },
      { item:"4K Program Agreement", body:"The Wausau School District four-year-old kindergarten program has partnered with community collaboration sites since 2002. The program sought approval to enter into agreements with Wausau Child Care, Mountain View Montessori, Woodson YMCA Wausau Branch, Newman Catholic Schools, and Marathon County Child Development Agency Head Start Program for the 2026-2027 school year." },
      { item:"Annual Safety Update \/ Drill Debrief", body:"At the November Education\/Operations Committee Meeting, Andy Grimm and members of the Wausau Police Department shared the annual safety update. They also shared information about the strong partnership between the Wausau Police Department and the district, especially with School Resource Officers." },
      { item:"Neola Policies Update", body:"At the November Education\/Operations Committee meeting, proposed changes to 43 attached policies were reviewed. These included policies on definitions, board member conduct, employment, student promotion and retention, academic honesty, substance use, drones, school safety, food service, and wellness among others." },
    ],
    publicComment: "A public and student comment period was included on the agenda following the Resolution of Commendation.",
    actionItems: [
      "Resolution of Commendation for Rob Hughes",
      "Approve Consent Agenda including personnel appointments, separations, leaves of absence, retirements, meeting minutes, payment of bills, and donations",
      "Red Granite Charter School Update approval",
      "4K Program Agreement with community partners for 2026-2027 school year",
      "Neola Policies Update approval",
    ],
  },
  {
    id: "bb_720900", source: "school_board",
    title: "Audit of the Bills Committee Meeting",
    date: "December 15, 2025", shortDate: "DEC 15",
    committee: "Audit of the Bills", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=720900",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=720900",
    isAgendaOnly: true,
    badge: "new",
    overview: "The Wausau School District Board of Education's Audit of the Bills Committee met to review and approve district expenditures for December 2025. This routine financial oversight meeting ensures proper review of bills before payment authorization.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Audit of the Bills" },
      { time:"0:07", item:"Adjourn" },
    ],
    discussions: [
      { item:"Audit of the Bills", body:"Committee members reviewed the December 2025 bills for the district as documented in the attached audit report dated December 9, 2025. This review process verifies expenditures are appropriate and properly documented before payment approval." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Review and approve December 2025 audit of bills",
    ],
  },
  {
    id: "bb_720918", source: "school_board",
    title: "Special Meeting",
    date: "December 15, 2025", shortDate: "DEC 15",
    committee: "Special Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=720918",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=720918",
    isAgendaOnly: true,
    badge: "new",
    overview: "This special meeting of the Wausau School District Board of Education focused primarily on closed session matters including administrator contracts, staff performance discussions, and real estate negotiations. The board also planned to honor Ellie Mason with a resolution of commendation.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Request for Closed Session Pursuant to State Statutes" },
      { time:"0:04", item:"Approve Administrator Contracts and Discuss Performance and Employment of a Staff Member s. 19.85 (1)(c)" },
      { time:"0:24", item:"Discussion regarding the Competitive Negotiations of a Purchase\/Sale of Real Estate s. 19.85 (1)(e)" },
      { time:"0:44", item:"Reconvene in Open Session, to take further action if necessary and appropriate" },
      { time:"0:49", item:"Resolution of Commendation: Ellie Mason (Action Requested)" },
      { time:"0:54", item:"Adjourn" },
    ],
    discussions: [
      { item:"Approve Administrator Contracts and Discuss Performance and Employment of a Staff Member", body:"The board convened in closed session under Wisconsin Statute 19.85(1)(c) to discuss and approve administrator contracts. This session also included discussion of performance and employment matters related to one or more staff members." },
      { item:"Discussion regarding the Competitive Negotiations of a Purchase\/Sale of Real Estate", body:"The board held closed session discussions under Wisconsin Statute 19.85(1)(e) regarding competitive negotiations for a real estate transaction. Details were not disclosed publicly due to the nature of ongoing negotiations." },
      { item:"Resolution of Commendation: Ellie Mason", body:"The board prepared a resolution of commendation to honor Ellie Mason. The resolution document was attached to the agenda and board action was requested on this item." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Approve Administrator Contracts",
      "Take action on closed session matters if necessary and appropriate",
      "Approve Resolution of Commendation for Ellie Mason",
    ],
  },
  {
    id: "bb_720901", source: "school_board",
    title: "Education\/Operations Committee Meeting",
    date: "December 15, 2025", shortDate: "DEC 15",
    committee: "Education\/Operations Committee Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=720901",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=720901",
    isAgendaOnly: true,
    badge: "new",
    overview: "The Education\/Operations Committee meeting addressed open enrollment space determinations for 2026-2027, snow day communication procedures, and athletic co-op renewals for multiple sports. The meeting also featured a performance and tour highlighting recent updates at John Muir Middle School.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"John Muir Pop Jazz Performance" },
      { time:"0:10", item:"Approve the Minutes" },
      { time:"0:12", item:"Excellence in Action: John Muir Middle School" },
      { time:"0:20", item:"Public and Student Comment" },
      { time:"0:30", item:"Open Enrollment Seat Availability (Action Requested)" },
      { time:"0:35", item:"Snow Day Communication & Procedures" },
      { time:"0:40", item:"Approve Co-Ops (Action Requested)" },
      { time:"0:45", item:"ADJOURN" },
    ],
    discussions: [
      { item:"Open Enrollment Seat Availability", body:"Wendy Cartledge presented the Open Enrollment Space Determinations for the 2026-2027 school year. This determines how many seats will be available for students from outside the district to enroll in Wausau schools." },
      { item:"Snow Day Communication & Procedures", body:"Diana White and Dr. Katie Colwell presented information on communications and procedures for snow days. The presentation covered what happens beyond the standard 3 snow days built into the school calendar." },
      { item:"Approve Co-Ops", body:"Athletic Directors BJ Brandt and Darci Mick Beversdorf presented co-op renewal information for boys hockey (East\/Merrill\/Newman Catholic), girls lacrosse (East\/West\/DCE\/Mosinee), and girls STORM hockey (East\/West\/DCE\/Mosinee with additions of Merrill and Stratford) for the 2026-27 and 2027-28 school years." },
    ],
    publicComment: "A public and student comment period was included on the agenda.",
    actionItems: [
      "Approve Open Enrollment Seat Availability for 2026-2027",
      "Approve Co-Op renewals for boys hockey, girls lacrosse, and girls STORM hockey for 2026-27 and 2027-28 school years",
      "Approve the Minutes from 11\/24\/25",
    ],
  },
  {
    id: "bb_724381", source: "school_board",
    title: "Special Meeting",
    date: "January 5, 2026", shortDate: "JAN 5",
    committee: "Special Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=724381",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=724381",
    isAgendaOnly: true,
    badge: "new",
    overview: "The Wausau School District Board of Education held a special meeting focused primarily on personnel matters, including a quasi-judicial hearing regarding employee termination and administrator contract approvals. The meeting included two separate closed sessions to address confidential employment issues.",
    agenda: [
      { time:"0:00", item:"CALL TO ORDER" },
      { time:"0:02", item:"APPROVE CONSENT AGENDA (Action Requested)" },
      { time:"0:07", item:"Request for Closed Session Pursuant to State Statutes - Employee Conduct Hearing" },
      { time:"0:10", item:"Reconvene in Open Session, to take further action if necessary and appropriate" },
      { time:"0:12", item:"Request for Closed Session Pursuant to State Statutes - Administrator Contracts" },
      { time:"0:15", item:"Reconvene in Open Session, to take further action if necessary and appropriate" },
      { time:"0:17", item:"ADJOURN" },
    ],
    discussions: [
      { item:"Consent Agenda - Personnel Actions", body:"The consent agenda included routine personnel matters including appointments of additional and replacement staff, contract increases, separations such as resignations and terminations, leaves of absence, and retirements." },
      { item:"Closed Session - Employee Conduct Hearing", body:"The board convened into closed session pursuant to Wis. Stat. 19.85(1)(b) to receive evidence concerning allegations regarding employee conduct and an administrative recommendation for the employee's termination. The board also deliberated regarding evidence received during this quasi-judicial hearing and may have considered an employee resignation agreement." },
      { item:"Closed Session - Administrator Contracts", body:"The board entered a second closed session pursuant to Wis. Stat. 19.85(1)(c) to approve administrator contracts and discuss the performance and employment of staff members." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Approve Consent Agenda including appointments, separations, leaves of absence, and retirements",
      "Take action on employee termination or resignation agreement following closed session hearing",
      "Approve administrator contracts following closed session deliberation",
    ],
  },
  {
    id: "bb_722755", source: "school_board",
    title: "Regular Meeting",
    date: "January 12, 2026", shortDate: "JAN 12",
    committee: "Regular Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=722755",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=722755",
    isAgendaOnly: true,
    badge: "new",
    overview: "This regular meeting of the Wausau School District Board of Education covered the approval of the 2024-25 audit report, WASB delegate voting directions, consideration of replacing the Wausau West chiller system, and open enrollment seat availability for 2026-27. The board also addressed athletic co-op renewals and entered closed session to discuss potential litigation and superintendent evaluation.",
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
      { time:"1:08", item:"New Business - Resolution Authorizing Entry into Wisconsin Investment Series Cooperative Agreement" },
      { time:"1:13", item:"New Business - Education\/Operations Committee Meeting: Open Enrollment Seat Availability" },
      { time:"1:14", item:"New Business - Education\/Operations Committee Meeting: Approve Co-Ops" },
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
      { item:"Approve the 2024-25 Audit Report", body:"Amber Ebert from Hawkins Ash CPAs presented the results of the Wausau School District's June 30, 2025 Audited Financial Statements. The presentation was estimated to take 15 minutes." },
      { item:"WASB Resolutions", body:"The Board reviewed proposed WASB Resolutions and directed the WASB Delegate on how to vote on behalf of the District. A late addition included Resolution 13, a proposed amendment to the WASB bylaws." },
      { item:"Wausau West Chiller Discussion", body:"Elizabeth Channel, Interim Assistant Superintendent of Operations, and Ryan Urmanski, Director of Buildings and Grounds, presented a request to solicit bids for the replacement of the chiller system at Wausau West High School." },
      { item:"Wisconsin Investment Series Cooperative Resolution", body:"Assistant Superintendent of Operations Elizabeth Channel presented a resolution to allow the District to continue its membership in the Wisconsin Investment Series Cooperative. This updates the most recent authorization, which is over ten years old, in accordance with best practice." },
      { item:"Open Enrollment Seat Availability", body:"At the December Education\/Operations Committee Meeting, Wendy Cartledge presented the Open Enrollment Space Determinations for the 2026-2027 school year." },
      { item:"Approve Co-Ops", body:"The board considered athletic co-op renewals including boys hockey East\/Merrill with Newman Catholic, girls lacrosse East\/West\/DCE\/Mosinee, and girls STORM hockey East\/West\/DCE\/Mosinee with the addition of Merrill and Stratford for the 2026-27 and 2027-28 school years." },
    ],
    publicComment: "A public and student comment period was included on the agenda.",
    actionItems: [
      "Approve Consent Agenda including appointments, separations, leaves of absence, retirements, meeting minutes, payment of bills, and donations",
      "Approve the 2024-25 Audit Report",
      "Direct WASB Delegate voting on proposed resolutions",
      "Possible action on Wausau West Chiller replacement bid solicitation",
      "Approve Resolution for Wisconsin Investment Series Cooperative membership",
      "Approve Open Enrollment Seat Availability for 2026-2027",
      "Approve athletic co-op renewals for boys hockey, girls lacrosse, and girls STORM hockey",
    ],
  },
  {
    id: "bb_726407", source: "school_board",
    title: "Audit of the Bills Committee Meeting",
    date: "January 26, 2026", shortDate: "JAN 26",
    committee: "Audit of the Bills", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=726407",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=726407",
    isAgendaOnly: true,
    badge: "new",
    overview: "The Audit of the Bills Committee convened to review and approve the district's financial expenditures for the billing period. This routine financial oversight meeting ensures proper authorization of Wausau School District payments.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Audit of the Bills" },
      { time:"0:07", item:"Adjourn" },
    ],
    discussions: [
      { item:"Audit of the Bills", body:"The committee reviewed the January 26, 2026 audit of bills document, which contains the district's financial obligations requiring approval. This standard review process verifies expenditures before payment authorization." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Review and approve the audit of bills for January 26, 2026",
    ],
  },
  {
    id: "bb_726408", source: "school_board",
    title: "Education\/Operations Committee Meeting",
    date: "January 26, 2026", shortDate: "JAN 26",
    committee: "Education\/Operations Committee Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=726408",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=726408",
    isAgendaOnly: true,
    badge: "new",
    overview: "The Education\/Operations Committee meeting focused on advancing referendum-related construction projects with 95% design approvals for four elementary schools, reviewing quarterly legal expenses, and discussing the 2026-2027 school calendar. The meeting also included presentations on financial projection model assumptions and student demographic data for the current school year.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Approve the Minutes" },
      { time:"0:04", item:"Excellence in Action: G.D. Jones Elementary" },
      { time:"0:09", item:"Excellence in Action: Rib Mountain Elementary" },
      { time:"0:14", item:"Public and Student Comment" },
      { time:"0:19", item:"Franklin, Rib Mountain, Lincoln & John Marshall 95% Design (Action Requested)" },
      { time:"0:29", item:"Legal Expenses for 2nd Quarter of 2025-2026" },
      { time:"0:34", item:"Approve 2026-2027 District Calendar (Action Requested)" },
      { time:"0:39", item:"Presentation of Financial Projection Model Assumptions" },
      { time:"0:54", item:"2025-2026 Student Demographic Report" },
      { time:"1:04", item:"Governance Model Option (Possible Action)" },
      { time:"1:14", item:"ADJOURN" },
    ],
    discussions: [
      { item:"Franklin, Rib Mountain, Lincoln & John Marshall 95% Design", body:"As referendum projects reach the end of the design phase at 95% completion, the Board reviewed designs and budgets for Franklin, Rib Mountain, Lincoln, and John Marshall Elementary schools. The Committee was asked to approve these plans for soliciting competitive bids." },
      { item:"Legal Expenses for 2nd Quarter of 2025-2026", body:"Interim Assistant Superintendent of Operations Elizabeth Channel presented a summary report of all legal counsel expenses incurred during the second quarter of 2025-2026. The report was broken down by law firm and type of legal advice sought, requiring no action." },
      { item:"Approve 2026-2027 District Calendar", body:"Diana White presented a draft of the 2026-2027 school year calendar for Board review and approval consideration." },
      { item:"Presentation of Financial Projection Model Assumptions", body:"Interim Assistant Superintendent Elizabeth Channel shared key variables contributing to the District's multi-year financial projection model. The model represents a baseline using current 2025-2026 budget information with percentages and dollar amounts projected forward, with the full projection model to be presented at a later date." },
      { item:"2025-2026 Student Demographic Report", body:"Director of Technology Ralph Williams presented the Demographics Report for the 2025-2026 school year, providing data on student population characteristics across the district." },
      { item:"Governance Model Option", body:"The Board continued discussion about potentially changing the Audit of the Bills Committee and clarifying the purpose of the Education\/Operations Committee with a potential rename of the meeting." },
    ],
    publicComment: "A Public and Student Comment period was included on the agenda.",
    actionItems: [
      "Approve 95% design plans for Franklin, Rib Mountain, Lincoln, and John Marshall Elementary schools for competitive bidding",
      "Approve 2026-2027 District Calendar",
      "Consider governance model changes regarding Audit of the Bills Committee and Education\/Operations Committee",
    ],
  },
  {
    id: "bb_727610", source: "school_board",
    title: "Special Meeting",
    date: "January 26, 2026", shortDate: "JAN 26",
    committee: "Special Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=727610",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=727610",
    isAgendaOnly: true,
    badge: "new",
    overview: "This special meeting of the Wausau School District Board of Education focused on personnel matters through the consent agenda, approval of the 2026-2027 school calendar, and a closed session for the Superintendent's evaluation. The meeting addressed routine staffing changes and finalized the upcoming academic year's schedule.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Approve Consent Agenda (Action Requested) - Appointments, Separations, Leaves of Absence, Retirements" },
      { time:"0:07", item:"Approve 2026-2027 District Calendar (Action Requested)" },
      { time:"0:10", item:"Request for Closed Session Pursuant to State Statutes - Evaluation of Superintendent of Schools" },
      { time:"0:15", item:"Reconvene in Open Session, and if Necessary, Take Action as a Result of the Closed Session" },
      { time:"0:20", item:"Adjourn" },
    ],
    discussions: [
      { item:"Approve 2026-2027 District Calendar", body:"Diana White previously presented a draft of the 2026-2027 school year calendar at a prior meeting for School Board review. The board was asked to give final approval to the district calendar for the upcoming academic year. The presentation was estimated to take approximately one minute." },
      { item:"Evaluation of Superintendent of Schools", body:"The board entered closed session pursuant to Wisconsin State Statute s. 19.85 (1)(c) to conduct the evaluation of the Superintendent of Schools. This personnel matter required confidential discussion as permitted by state law." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Approve Consent Agenda including appointments, separations, leaves of absence, and retirements",
      "Approve 2026-2027 District Calendar",
      "Take action if necessary as a result of the closed session regarding Superintendent evaluation",
    ],
  },
  {
    id: "bb_728873", source: "school_board",
    title: "Regular Meeting",
    date: "February 9, 2026", shortDate: "FEB 9",
    committee: "Regular Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=728873",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=728873",
    isAgendaOnly: true,
    badge: "new",
    overview: "The Wausau School District Board of Education held a regular meeting covering referendum project approvals for four elementary schools at 95% design completion, the Wausau West chiller system replacement, and an informational presentation on the disbandment of the East\/Merrill Boys Hockey Co-Op. The meeting also addressed financial projection model assumptions, potential governance model changes, and included a closed session on real estate negotiations.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Roll Call" },
      { time:"0:04", item:"Pledge of Allegiance: Jim Bouch, President" },
      { time:"0:06", item:"Reading of the Mission Statement" },
      { time:"0:08", item:"Proclamation: School Bus Driver Appreciation Week" },
      { time:"0:13", item:"Excellence in Action: 4K & EC Programs" },
      { time:"0:23", item:"Public and Student Comment" },
      { time:"0:38", item:"Approve Consent Agenda (Action Requested)" },
      { time:"0:43", item:"Old\/Recurring Business - Education\/Operations Committee Meeting" },
      { time:"0:58", item:"New Business - Wausau West Chiller System (Action Requested)" },
      { time:"1:08", item:"New Business - Wausau East Hockey Update" },
      { time:"1:23", item:"New Business - Education\/Operations Committee Meeting Items" },
      { time:"1:30", item:"Open Forum" },
      { time:"1:45", item:"Request for Closed Session Pursuant to State Statutes" },
      { time:"1:55", item:"Adjourn" },
    ],
    discussions: [
      { item:"Franklin, Rib Mountain, Lincoln & John Marshall 95% Design", body:"As referendum projects reach the end of the design phase at 95% completion, the Board reviews designs and budgets for four elementary schools. The Board is being asked to approve these plans to be issued for competitive bidding." },
      { item:"Legal Expenses for 2nd Quarter of 2025-2026", body:"Interim Assistant Superintendent of Operations Elizabeth Channel presented a summary report of all legal counsel expenses incurred during the second quarter. The report is broken down by law firm and by type of legal advice sought and requires no action." },
      { item:"2025-2026 Student Demographic Report", body:"Director of Technology Ralph Williams presented the Demographics Report for the 2025-2026 school year at the January Education\/Operations Committee Meeting." },
      { item:"Wausau West Chiller System", body:"Interim Assistant Superintendent Elizabeth Channel and Director of Buildings and Grounds Ryan Urmanski presented a request to approve the bid for replacement of the chiller system at Wausau West High School." },
      { item:"Wausau East Hockey Update", body:"An informational presentation on the disbandment of the East\/Merrill Boys Hockey Co-Op and potential options for the district, Wausau East, and East Hockey players was provided to the Board." },
      { item:"Presentation of Financial Projection Model Assumptions", body:"Interim Assistant Superintendent Elizabeth Channel shared key variables contributing to the District's multi-year financial projection model. The model represents a baseline using current information from the 2025-2026 budget with percentages and dollar amounts projected forward." },
      { item:"Governance Model Option", body:"Discussion about potentially changing the Audit of the Bills Committee and clarifying the purpose of the Education\/Operations Committee with a potential rename of the meeting." },
      { item:"Discussion regarding the Competitive Negotiations of a Purchase\/Sale of Real Estate", body:"Closed session requested under state statute s. 19.85 (1)(e) for discussion regarding competitive negotiations of a purchase or sale of real estate." },
    ],
    publicComment: "A public and student comment period was included on the agenda.",
    actionItems: [
      "Approve Consent Agenda including appointments, separations, leaves of absence, retirements, meeting minutes, payment of bills, and donations",
      "Approve Franklin, Rib Mountain, Lincoln & John Marshall Elementary Schools 95% Design for bidding",
      "Approve Wausau West Chiller System bid",
      "Possible action on Governance Model Option",
    ],
  },
  {
    id: "bb_733411", source: "school_board",
    title: "Special Meeting",
    date: "February 23, 2026", shortDate: "FEB 23",
    committee: "Special Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=733411",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=733411",
    isAgendaOnly: true,
    badge: "new",
    overview: "This special meeting of the Wausau School District Board of Education focused primarily on personnel matters through the consent agenda and included a closed session to discuss potential litigation under state statute 19.85(g). The meeting addressed routine staffing changes including appointments, separations, leaves of absence, and retirements.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Approve Consent Agenda (Action Requested)" },
      { time:"0:07", item:"Request for Closed Session Pursuant to State Statutes" },
      { time:"0:10", item:"Preliminary Discussion Regarding Potential Litigation 19.85 (g)" },
      { time:"0:30", item:"Reconvene in Open Session" },
      { time:"0:32", item:"Adjourn" },
    ],
    discussions: [
      { item:"Approve Consent Agenda", body:"The consent agenda included personnel actions covering appointments for additional and replacement staff with contract increases, separations including resignations, contract decreases and terminations, leaves of absence, and retirements. An addendum was added to the consent agenda on 2\/23\/2026 at 2:22 PM." },
      { item:"Preliminary Discussion Regarding Potential Litigation", body:"The board entered closed session under Wisconsin statute 19.85(g) to conduct preliminary discussions regarding potential litigation facing the district. This statute allows closed sessions for conferring with legal counsel concerning litigation strategy." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Approve Consent Agenda including appointments, separations, leaves of absence, and retirements",
      "Vote to enter closed session for potential litigation discussion",
      "Take further action if necessary following closed session",
    ],
  },
  {
    id: "bb_732366", source: "school_board",
    title: "Committee of the Whole Meeting",
    date: "February 23, 2026", shortDate: "FEB 23",
    committee: "Committee of the Whole", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=732366",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=732366",
    isAgendaOnly: true,
    badge: "new",
    overview: "The Wausau School District Board of Education Committee of the Whole meeting covered financial planning including a five-year fiscal forecast and referendum budget updates, highlighted district achievements at the Planetarium and Wausau West High School, and reviewed a substantial NEOLA policy update package affecting over 60 district policies. The meeting also included an AGR (Achievement Gap Reduction) mid-year report on student outcomes and systemic improvements at three schools.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Approve the Minutes" },
      { time:"0:05", item:"Audit of the Bills" },
      { time:"0:08", item:"Excellence in Action: Wausau School District Planetarium" },
      { time:"0:15", item:"Excellence in Action: Wausau West High School" },
      { time:"0:22", item:"Public and Student Comment" },
      { time:"0:32", item:"Five Year Fiscal Forecast" },
      { time:"0:47", item:"AGR Annual Report" },
      { time:"0:57", item:"NEOLA UPDATE (Action Requested)" },
      { time:"1:17", item:"Referendum Budget Update" },
      { time:"1:27", item:"Adjourn" },
    ],
    discussions: [
      { item:"Five Year Fiscal Forecast", body:"The Board received a five-year fiscal forecast model for the District that will be used over the next three months to construct the 2026-27 budget reconciliation plan and final budget. Administration emphasized that projections are based on many variables that change periodically, and significant changes will be communicated to the Board as they occur." },
      { item:"AGR Annual Report", body:"This mid-year update presented AGR student outcome scores required by DPI, including screening results from the three AGR schools. The report highlighted systemic improvements being implemented at each school and demonstrated how practices are evolving to improve student achievement." },
      { item:"NEOLA UPDATE", body:"The Committee reviewed proposed changes to over 60 district policies ranging from board member conduct and administrator relationships to student policies on cell phones, academic honesty, and third grade promotion. The update also included school support organization policies covering fundraising, crowdfunding, and gifts, along with numerous technical corrections to existing policies." },
      { item:"Referendum Budget Update", body:"Administration provided an update on the April 2022 referendum-funded facility improvements. These construction and budget updates are presented routinely until all projects are completed." },
    ],
    publicComment: "A Public and Student Comment period was included on the agenda.",
    actionItems: [
      "Vote on NEOLA policy updates including definitions, board member conduct, administrator relationships, student policies, financial policies, and school support organization policies",
      "Approve minutes from January 26, 2026 meeting",
      "Approve audit of bills for February 2026",
    ],
  },
  {
    id: "bb_732346", source: "school_board",
    title: "Special Meeting",
    date: "February 24, 2026", shortDate: "FEB 24",
    committee: "Special Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=732346",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=732346",
    isAgendaOnly: true,
    badge: "new",
    overview: "This special meeting of the Wausau School District Board of Education was convened to conduct a pupil expulsion hearing in closed session. The meeting addressed student disciplinary matters requiring private deliberation under Wisconsin Statutes governing pupil records and closed session requirements.",
    agenda: [
      { time:"0:00", item:"Call To Order" },
      { time:"0:02", item:"Motion to convene in closed session for pupil expulsion hearing pursuant to Wisconsin Statutes s. 19.85(1)(a), (f), and (g) and s. 118.125" },
      { time:"0:05", item:"Adjournment" },
    ],
    discussions: [
      { item:"Closed Session - Pupil Expulsion Hearing", body:"The Board convened in closed session under Wisconsin Statutes to conduct a pupil expulsion hearing, protecting student privacy as required by law. The Board was authorized to deliberate privately, take action in closed session if necessary, and reconvene to open session for any additional action before adjournment." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Motion to convene in closed session for pupil expulsion hearing",
      "Potential action on pupil expulsion in closed or open session",
      "Motion to reconvene into open session",
      "Motion to adjourn",
    ],
  },
  {
    id: "bb_727607", source: "school_board",
    title: "Public Meeting",
    date: "February 25, 2026", shortDate: "FEB 25",
    committee: "Public Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=727607",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=727607",
    isAgendaOnly: true,
    badge: "new",
    overview: "This public meeting brought together the Elementary Task Force one year after the elementary school consolidation decision to reflect on the process and outcomes. The session featured reflections from task force members but was informational only, with no Board action taken despite a quorum potentially being present.",
    agenda: [
      { time:"0:00", item:"Elementary Task Force Reunion" },
      { time:"0:02", item:"Summary of Elementary Consolidation" },
      { time:"0:10", item:"Task Force Member Reflectives: One Year Later" },
      { time:"0:25", item:"Adjourn" },
    ],
    discussions: [
      { item:"Summary of Elementary Consolidation", body:"This item provided an overview of the elementary school consolidation process that occurred in the Wausau School District. The summary likely reviewed the decisions made, schools affected, and implementation of the consolidation plan." },
      { item:"Task Force Member Reflectives: One Year Later", body:"Task force members shared their reflections on the consolidation process one year after the decision was made. Members likely discussed lessons learned, outcomes observed, and their perspectives on how the consolidation has impacted the district." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [

    ],
  },
  {
    id: "bb_731357", source: "school_board",
    title: "Public Meeting",
    date: "March 4, 2026", shortDate: "MAR 4",
    committee: "Public Meeting - Candidates Meet & Greet", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=731357",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=731357",
    isAgendaOnly: true,
    badge: "new",
    overview: "This was a WEA (Wausau Education Association) sponsored event for Wausau School District Board candidates to meet and greet the public. While a quorum of the Board of Education may have been present, no official board action was taken at this event.",
    agenda: [
      { time:"0:00", item:"WEA Sponsored WSD School Board Candidates Meet & Greet Event" },
    ],
    discussions: [
      { item:"WEA Sponsored WSD School Board Candidates Meet & Greet Event", body:"This event was organized by the Wausau Education Association to allow school board candidates to meet with the public ahead of elections. The agenda noted that while a quorum of board members may be present, no official board business would be conducted." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [

    ],
  },
  {
    id: "bb_734561", source: "school_board",
    title: "Regular Meeting",
    date: "March 9, 2026", shortDate: "MAR 9",
    committee: "Regular Meeting", duration: "~1h",
    url: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=734561",
    docUrl: "https://meetings.boardbook.org/Public/Agenda/1360?meeting=734561",
    isAgendaOnly: true,
    badge: "new",
    overview: "This regular meeting of the Wausau School District Board of Education addressed routine personnel matters, a proposal to switch middle school devices from Chromebooks to iPads, and received updates on the 2022 referendum budget, five-year fiscal forecast, and Achievement Gap Reduction program outcomes. The meeting included significant technology infrastructure decisions and ongoing fiscal planning discussions.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Roll Call" },
      { time:"0:04", item:"Pledge of Allegiance" },
      { time:"0:06", item:"Reading of the Mission Statement" },
      { time:"0:08", item:"Excellence in Action: EEA" },
      { time:"0:13", item:"Public and Student Comment" },
      { time:"0:23", item:"Approve Consent Agenda" },
      { time:"0:28", item:"Old\/Recurring Business - Referendum Budget Update" },
      { time:"0:30", item:"New Business - iPads Presentation" },
      { time:"0:50", item:"New Business - Five Year Fiscal Forecast" },
      { time:"0:52", item:"New Business - AGR Annual Report" },
      { time:"0:54", item:"Open Forum - Board Member Professional Growth & Development Report" },
      { time:"0:56", item:"Open Forum - Legislative Liaison" },
      { time:"0:58", item:"Open Forum - Superintendent Commentary" },
      { time:"1:00", item:"Open Forum - Presiding Officer Commentary" },
      { time:"1:02", item:"Adjourn" },
    ],
    discussions: [
      { item:"Referendum Budget Update", body:"As the April 2022 referendum-funded facility improvements continue to develop, the board received routine construction and budget updates. This presentation was previously shared at the February Committee of the Whole Meeting and will continue until projects are completed." },
      { item:"iPads Presentation", body:"The board received a 20-minute presentation on switching one-to-one devices at the middle school level from Chromebooks to iPads. This represents a significant technology infrastructure change for middle school students in the district." },
      { item:"Five Year Fiscal Forecast", body:"Administration presented a five-year fiscal forecast model that will guide construction of the 2026-27 budget reconciliation plan. The projections involve many variables that change periodically, and administration will update the board as significant changes occur." },
      { item:"AGR Annual Report", body:"The board received the mid-year Achievement Gap Reduction student outcome scores required by DPI, featuring screening results and work being done at the district's three AGR schools to strengthen organizational systems and improve student achievement." },
    ],
    publicComment: "A public and student comment period was included on the agenda.",
    actionItems: [
      "Approve Consent Agenda including personnel appointments, separations, leaves of absence, retirements, meeting minutes, payment of bills, CESA 9 Shared Services Contract, and donations",
      "Action on iPads Presentation for middle school device transition",
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
    overview: "The Wausau School District Board of Education Committee of the Whole meeting covered routine business including bill audits and recognition of Stettin Elementary, along with action items on nutrition cooperative membership, facility fee updates for artificial fields, and a comprehensive NEOLA policy update affecting dozens of district policies. The meeting also included a referendum budget update presentation.",
    agenda: [
      { time:"0:00", item:"Call to Order" },
      { time:"0:02", item:"Approve the Minutes" },
      { time:"0:05", item:"Audit of the Bills" },
      { time:"0:08", item:"Excellence in Action: Stettin Elementary" },
      { time:"0:15", item:"Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP) (Action Requested)" },
      { time:"0:20", item:"Facility Fees (Action Requested)" },
      { time:"0:30", item:"Referendum Budget Update" },
      { time:"0:40", item:"NEOLA UPDATE (Action Requested)" },
      { time:"1:00", item:"ADJOURN" },
    ],
    discussions: [
      { item:"Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP)", body:"The Wausau School District Nutrition Service Department currently belongs to the Wisconsin School Nutrition Purchasing Cooperative (WiSNP Co-op). The Co-op is requesting member districts to present a resolution to their respective School Boards for approval of continued membership for the 2026-2027 school year." },
      { item:"Facility Fees", body:"Ryan Urmanski, Director of Buildings and Grounds, will present information to amend the current Wausau School District Facility Use Fee Schedule to reflect the cost for use of artificial fields and field lighting for requested events. If the Board agrees on the fee schedule, approval is being sought to add it immediately." },
      { item:"Referendum Budget Update", body:"Elizabeth Channel, Interim Assistant Superintendent of Operations, will share an update on the status of the Referendum Budget. A memo summarizing the referendum budget was included in the meeting packet." },
      { item:"NEOLA UPDATE", body:"The Committee will review proposed changes to numerous district policies, with some involving only technical corrections while others are more lengthy substantive changes. Policy areas covered include definitions, board member conduct, district administrator relationships, reading instruction goals, Title I parent engagement, athletics, cell phones, student fees, AI use, and school support organizations." },
      { item:"Act 57 Related Policies", body:"Updates to policies 1213, 3213, 4213, and 8462 related to student supervision, welfare, and child abuse and neglect reporting requirements under Act 57." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Approve Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP) membership for 2026-2027",
      "Approve amended Facility Use Fee Schedule for artificial fields and field lighting",
      "Approve NEOLA policy updates including definitions, board member conduct, reading instruction goals, cell phone policy, AI policy, and school support organization policies",
      "Approve Act 57 related policy updates for student supervision and child abuse reporting",
    ],
  },
  {
    id: "lvYNMGnVL6s", source: "marathon",
    title: "Marathon County Executive Committee Meeting",
    date: "March 12, 2026", shortDate: "MAR 12",
    committee: "Executive Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=lvYNMGnVL6s",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18014/639088419907254276",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Executive Committee convened on March 12, 2026 to review county administrative matters, committee appointments, and pending resolutions ahead of the full County Board session. The committee addressed budget adjustments and departmental updates across county operations.",
    agenda: [
      { time:"N\/A", item:"Call to Order and Roll Call" },
      { time:"N\/A", item:"Approval of Previous Meeting Minutes" },
      { time:"N\/A", item:"Public Comment Period" },
      { time:"N\/A", item:"Marathon County Comprehensive Plan - Public Hearing and Vote" },
      { time:"N\/A", item:"County Administrator Report" },
      { time:"N\/A", item:"Departmental Budget Amendments" },
      { time:"N\/A", item:"Committee Appointments and Personnel Matters" },
      { time:"N\/A", item:"Resolutions for Full County Board Consideration" },
      { time:"N\/A", item:"Correspondence and Communications" },
    ],
    discussions: [
      { item:"Marathon County Comprehensive Plan", body:"The committee held a formal public hearing on the Marathon County Comprehensive Plan, which guides land use, transportation, housing, and economic development policy for the county through 2050. Following public testimony, the committee voted to advance the plan to the full County Board for final adoption." },
      { item:"County Administrator Report", body:"County Administrator Lance Leonhard presented updates on departmental operations, staffing levels, and ongoing infrastructure projects. The report included a status update on capital improvement projects and grant applications pending at the state and federal level." },
      { item:"Budget Amendments", body:"The committee reviewed mid-year budget adjustments requested by several county departments. Amendments addressed unexpected expenditures in public safety and human services, with transfers approved to maintain fiscal balance through the end of the budget year." },
      { item:"Resolutions for County Board", body:"Several resolutions were reviewed and approved for forwarding to the full County Board, including matters related to intergovernmental agreements, property transactions, and departmental policy updates." },
    ],
    publicComment: "A public hearing was held as part of the Marathon County Comprehensive Plan review.",
    actionItems: [
      "Forward Comprehensive Plan to full County Board for adoption vote",
      "Process approved budget amendments across affected departments",
      "Advance committee-approved resolutions to County Board agenda",
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
    badge: "new",
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
  {
    id: "0pfKykvicdA", source: "marathon",
    title: "Marathon County HR, Finance, and Property Committee Meeting",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "HR, Finance & Property", duration: "~1h",
    url: "https://www.youtube.com/watch?v=0pfKykvicdA",
    docUrl: "https://www.marathoncounty.gov/home/showpublisheddocument/18116/639096091432830000",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Human Resources, Finance, and Property Committee met on March 24, 2026 to address personnel policy updates, financial reports, and county property matters. The committee reviewed first-quarter financial performance and considered several human resources policy amendments.",
    agenda: [
      { time:"N\/A", item:"Call to Order and Roll Call" },
      { time:"N\/A", item:"Approval of Previous Meeting Minutes" },
      { time:"N\/A", item:"First Quarter Financial Report" },
      { time:"N\/A", item:"Personnel Policy Amendments" },
      { time:"N\/A", item:"County Property Matters - Sales and Acquisitions" },
      { time:"N\/A", item:"Employee Benefits Review" },
      { time:"N\/A", item:"Wage and Classification Study Update" },
      { time:"N\/A", item:"Facilities and Maintenance Updates" },
    ],
    discussions: [
      { item:"First Quarter Financial Report", body:"The committee reviewed Marathon County's first-quarter 2026 financial performance, including revenue collections versus projections and departmental expenditure rates. Staff reported that the county is tracking within budget with modest variances in sales tax receipts and investment earnings." },
      { item:"Personnel Policy Amendments", body:"Human Resources Director presented proposed amendments to county personnel policies, including updates to leave policies, remote work guidelines, and performance review procedures. The committee discussed alignment with current state employment law and best practices across Wisconsin counties." },
      { item:"County Property Matters", body:"The committee reviewed requests related to county-owned real estate, including a potential surplus property sale and maintenance priorities for county facilities. Staff presented cost estimates for deferred maintenance items at several county buildings." },
      { item:"Employee Benefits and Compensation", body:"A preliminary update on the countywide wage and classification study was presented, with findings expected to inform the 2027 budget process. Committee members asked questions about pay equity across departments and competitive positioning relative to neighboring counties." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Advance personnel policy amendments to full County Board",
      "Authorize staff to proceed with surplus property appraisal",
      "Present final wage and classification study findings at May meeting",
      "Submit first quarter financial report to full County Board",
    ],
  }
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
            >{meeting.isAgendaOnly ? "> VIEW AGENDA" : "> WATCH ON YOUTUBE"}</a>
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
              const hasTimestamp = entry.time && entry.time !== "N/A" && entry.time !== "0:00" && vid;
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
