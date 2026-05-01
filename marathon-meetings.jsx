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
    avatar:   "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABQAFADASIAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAABwgFBgADBAIB/8QAQRAAAgEDAgMEBgUJCAMAAAAAAQIDBAURACEGEjEHE0FRFCIyYXGBFSNCkaEINVJic4Kys8EWJTM2RHKTotLh8P/EABkBAAMBAQEAAAAAAAAAAAAAAAIEBQMBBv/EAC0RAAEEAQMBBgUFAAAAAAAAAAEAAgMRIQQSMXETQVFhgeEFFJHB0TJCcqGx/9oADAMBAAIRAxEAPwAbazUJeb3U2y4y0dNFSmKIIAZYg7HKgkknqck600F+u1fVx01JS0Uk0hwqimX7z5D36snAs8KgrDrrorbWVrKtNTyOW6YHX4eei52b9lr1tNS1fFEtNTpKeaNUjWN5sDJCA+GN8nc9cAaIT36zcNU6RcO2Z8t3f15hbeOQlUlzjmdeYY6jcjGxGkDq3PxEMeJ/CB0gGBkoD0nZvxPUqGS11IU+PdN/UDWqv7PeJaJC81rqQg+13TY+/GmC+meKqmRJYqSfuVrFRu4gHJNSqRmZC24ZiCOQn2TkeeuXiqrvtLxBV3O20FzVlSlEICF4jGA5m51ViCfXQY9rKjGwJ0Iknv8AUPog7U3wliqqOopSRUROmPEjb79aNM3WXCzX+OSLie0wd6rSiWroTnulTk+sJ6smJF333OCoIIAw7TOzi4WShFx4dNHV0LbpI0AYNn7LfonwB6HpsdG3VlhqYV5jj2WjXh2EM9Zqsy8TXKKR45aaiSRCVZWpgCCPA66bTe6m5VnotRFTLG8Uh5oogjKVRmBBHvA0/XeiUbxb/mGr/c/gXTC/k49m0Po7Xu9RL3aYZhJ0J6hT+qowT5kgeGgvTW36V7RlpyvOoZHZfPCLgfM4Hz0492D8OcNW2y256US90TULMok54wPrWEZOX3OeUdehI66Q1jy9whHHJ+yCR21tDkrVcFp+KbuywJOlbTq0Yh9Nkp1aLmGTII8t1IZeU8rg+14CatNmtPB1np3qJXlemgSmFROxkcqMEIuckAsM8o/prZwDYo7HYYU7qFamX15XjjCc2SSoIBIyAQNts51y8f3yO30YpYoop6iUHPNv3QIxzH3nJA+ektTMImE3gJdoL3bQpa13r6QkBjo5UpCvMKhnTlPu2PXbp4al1KsMqQR5jQAeaWUIksrmNdlUklVHuHhqd4Vuq2u4RMhqJV3DKXVEAPXY5/pqVD8TsgPHr7UmH6ShYKJd/wCHqK80skcqmGZgCs8XqurKSyHI68rHmAO3MAdUi30tdwyJqCqEtxWoqH5qFYedJqblHPIu5KkE7hjg+zuzcxJsbrIiupBUjIIOvR2BOM6sh2KPCUDiMJOfyiezsWG4fSlvRvRZF5wSNynkf1lyB7wR5aEXCv56T9jN/KfTq8X1VFx3wtf6eGIsbdiRQ68rdCHUjzwHH3eWk1tVI1BxVNStuYVqEz5gRPg/dpvRPLd0Lu7I6eycY4ubnlEnslpEqe2A94MgSU4/gJ/h0eOJKhrxxvb7XcI6pqY1fKsdSfRIJVViQUUvmZhjqoGR1GNADsvr0oO13nkOFLQN8hyZ/AnTbmn4csFcJjDbqKtrZiQ/Iolmkdt9/aO51hIanf6f4s5jVKfHTQ77TLfzVdNNEMd4rFseJHifljc/+iRNVftBp2ltKSOy+iwvzyKRkE9ATjc7n2fEkbgan6xm+EhZwO2vCFDwgRcynmA6v0X4LnqdbaaaJGHJDACN+eoJb7gNs/I69SmWulKQxEKnUtjI97HoPgMDVn4d4OnqljqZH5Yzur5Kg/AdT/115+OJ8jqjCpPeGi3FWTg2/wAE1IKaYxQlNo+VCoI3JJ2AH4atisHUMpBBGQQeuh9f6e1WeL0ZOesusgxHEgGx8CepHnudSHZ99Lus711T3tEqhIhsQWHXlIHQdNts9OmrcE7muELsny7uqnyRggvGFy2uip6Xji8wNVU7VFcru9OnOzhCowWx6q+W+58NKBfIBB2jVIHjBIT8e4Yf005EVbVpxHeJpm7230iSSiQmN1jIRRyKRllOxJDEdemk1u1QKntDq2H2YpE+YgbP46r6e/mB/E/ZHDwVx1Ff9Gcc+lkkIjoHx+iY1B/A5+Wm5uNQeKeAKO70k5Sqpk5KlkySVAHPsCCeisBnxGk24pH9/VX7n8tdFz8n/tIFjq/oq6MXpJQEKnfmUdCB4svl4r8NaayMsInHdg9PH0Wj2bm45Ca2xV5r6BXkUx1Ef1c0bEZRwBkHBI8c9eh1A9oV4io6KOgXepqSCG2+qUH2snx8vv8ADUHUQz8M1lNebAEqbJO31qxsApWQk5PgMNg856A8uwG9olisfFDBKmNHq4QA0ZflkjyA2Dg+RB+ep+pjc+MiI8pVlNcHHhR1iprTR0y+j1NLUVwGYc5MYfw5f0m9/X4DXi0PejwwYUWc1bTtECECNEo69duvj7+urRQ2mgoWDU1MiuBgOfWYDyyd9d2sGacgCzXRddL69VTrPwakWXuEnNz7yIrEtJ/vfqR7hgeedTl/rhZ7NI9LEzT8vd00MURcs+DygKoJwMEnA6A66au401NL3JkD1RRpEp0OZHCjJwP/ALrofNcau4T1d5vslNT8PREIIHzIZCDzDu9h65OxPUbjbGmIoGQixgLhc6Q2VWeIbkvDPZzW11asEFXdkA5Idh3K5LOBkgcxY7Db1htpW7HM9TxA9RL/AIkqVDt8TE51de2njyTiu9SQQELSREJyKcqoX2UHw6k+J+GqPw1+dl/Yzfyn1S0cZp0zv3cdPdNtbtapW6WeW410lXDUUsaShDyTOyupCgEEcp8Qdco4cqkYMlZQh1OQVmYEHzHq6ndZpuzwu2VfOzftIvXDSmjurU1ZRts68xZH88jHqn3jY+I0UlunC/FIWe3XY2WtZudlkA5WbLEnn95c+PltsMLjr6jshyjMp81ONInR7TcRry7kBaHZKa6tTiZKuSaw3eKpo3lz3ffRykID9ktjBIHicZPhjW27pd5Jqj0y9w0lIzlowapYeRQdgSoycg4OD1GfirEV1rYvYqG+YB15luVZLnnqH38ttB2E3l/f4QdkPFHO6XvhawVklbJXz3W5EFfqnMUTbYJZvabOASASCfdoU9o3Gd/4xqGVKymp6bcDmkKYB6hVweX3k7n3arDMWYliST4k5OvmtG6SyHSG6+i0DQ3hQX9makf6u3/8x/8AHXTbrNLbqhqmWopZVWKRQkLlmYsjKABgeJ1KazTu4orK/9k=",
  },
};

const MEETINGS = [
  {
    id: "rQcjCEY36e4", source: "wausau",
    title: "Wausau City Council Meeting",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "City Council", duration: "~1h",
    url: "https://www.youtube.com/watch?v=rQcjCEY36e4",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau City Council approved several key items including a development agreement for the 11 Scott Street redevelopment project (6-3 vote), a 7-year residential solid waste agreement with Harter's Fox Valley Disposal, and recognized city workers who responded to a record 30.9-inch snowfall. The council also presented the 2026 Sustainability Award to Kolbe and Kolbe Millwork for their solar installation and recycling initiatives.",
    agenda: [
      { time:"2:49", item:"Call to order and Pledge of Allegiance" },
      { time:"3:30", item:"Proclamation for Sarah Rafi Day (March 31st)" },
      { time:"7:00", item:"Mayoral citation for DPW snow removal crews" },
      { time:"15:30", item:"Sustainability Award presentation to Kolbe and Kolbe" },
      { time:"20:45", item:"Approval of March 10, 2026 meeting minutes" },
      { time:"21:00", item:"Public comment period" },
      { time:"23:30", item:"Consent agenda" },
      { time:"24:00", item:"Development agreement for 11 Scott Street LLC" },
      { time:"36:00", item:"Mayor appointments to Plan Commission and other boards" },
      { time:"37:00", item:"Solid waste and recycling service agreement with Harter's" },
      { time:"46:00", item:"Announcements and adjournment" },
    ],
    discussions: [
      { item:"Development Agreement and Parking Agreement for 11 Scott Street LLC", body:"The council approved a joint resolution for the Wateride Place development at 11 Scott Street. Alder Rasmussen spoke in favor, noting it would return the vacant building to taxable status and reclaim parking spaces for public use. Alder Neil outlined benefits including $55,000 annual parking revenue, TID 8 closure goals, and downtown housing needs. Alder Larson dissented, expressing concern about discounting city assets during budget cuts. Alder Tyranny questioned how the city could provide alternative parking within 300 yards if the ramp closed; Economic Development Director Randy Feifer explained they reduced an existing obligation from 480 to 150 spaces and the developer wouldn't negotiate on the distance requirement. The motion passed 6-3." },
      { item:"Mayoral Citation for DPW Snow Removal Crews", body:"Mayor Denny presented a citation recognizing the Department of Public Works for their response to a record-breaking 30.9-inch snowfall from March 14-16, 2026. Street Supervisor Kevin Kester accepted the award and praised the plow operators and mechanics, stating 'you kicked its ass' and noting the fleet technicians worked 12 straight days without a day off. The citation highlighted that four municipal fleet technicians maintained 12-hour shifts providing continuous breakdown support." },
      { item:"2026 Sustainability Award to Kolbe and Kolbe", body:"Christine Daniels from the Sustainability, Energy and Environment Committee presented the award to Kolbe and Kolbe Millwork. Representatives Mike Thompson and Keith Kaning accepted, describing their 2,000+ solar panel installation that became operational in July 2025, generating enough power for approximately 120 homes. They also highlighted LED lighting upgrades, high-efficiency air compressors, and comprehensive recycling programs for wood, aluminum, glass, vinyl, cardboard, and other materials." },
      { item:"Residential Solid Waste and Recycling Agreement", body:"The council approved a 7-year residential solid waste and recycling service agreement with Harter's Fox Valley Disposal. Mayor Denny noted there had been a mix-up on whether the term was 7 or 10 years, and confirmed it was corrected to 7 years as public health and safety originally approved. Motion passed 9-0." },
      { item:"Settlement Resolution - David Holes vs City of Wausau", body:"Assistant City Attorney Vincent Bonito explained a 2022 bus accident where Transit Mutual paid the initial claim, then the other driver filed a personal injury claim. The city filed a counter-claim and the insurer agreed to pay damages for the bus. The resolution releases the city's counter-claim. Alder Neil confirmed this settlement is separate from any ongoing personal injury claim. Motion passed 8-1 without need for closed session." },
    ],
    publicComment: "Two speakers addressed the council regarding the 11 Scott Street project. Raleigh Lray requested support for the green sustainable project converting a vacant building into 52 mid-priced apartment units. Mark Craig of 3246 North 8th Street emphasized the project exceeds $10 million, the residential component alone is $8.3 million, and stated 'Without your help, it won't happen.'",
    actionItems: [
      "Development agreement and amended parking agreement approved for 11 Scott Street LLC (Wateride Place) - 6-3 vote",
      "March 31st proclaimed as Sarah Rafi Day in Wausau",
      "7-year solid waste and recycling agreement with Harter's Fox Valley Disposal approved",
      "Airspace obstruction removal agreements approved for 724\/732 Ridgeland Avenue and 11 Ridgeland Avenue in Schofield",
      "2026 budget modification approved for Police Department to purchase Red Dot Optics using Thompson submachine gun sale proceeds",
      "Paid duty time approved for out-of-country training for Police Department officers",
      "Community outreach professional shelter operations duty premium differential approved",
      "Settlement release approved for David Holes vs City of Wausau case",
      "Mayor's appointments to Plan Commission, Affordable Housing Task Force, and Business Improvement District Board confirmed",
    ],
  },
  {
    id: "knWZO4dON-8", source: "wausau",
    title: "Wausau Plan Commission Meeting",
    date: "March 17, 2026", shortDate: "MAR 17",
    committee: "Plan Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=knWZO4dON-8",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Plan Commission approved a conditional use permit for a 70-unit, 7-story apartment building at 731 North First Street and a transportation project plat for signal replacements on Grand Avenue. A public hearing was held regarding a proposed personal storage facility at 218 South Fourth Street, with the applicants speaking in support.",
    agenda: [
      { time:"0:00", item:"Call to order and election of vice chair (skipped until April)" },
      { time:"0:15", item:"Public comment on agenda items" },
      { time:"0:55", item:"Consideration of minutes for February 18th" },
      { time:"1:10", item:"Public hearing on conditional use permit for 218 South Fourth Street (personal storage facility)" },
      { time:"3:25", item:"Discussion and possible action on conditional use permit for 731 North First Street (70-unit apartment building)" },
      { time:"5:00", item:"Discussion and possible action on transportation project plat for Grand Avenue signal replacements" },
      { time:"5:35", item:"Discussion of next meeting date" },
      { time:"6:05", item:"Adjournment" },
    ],
    discussions: [
      { item:"Consideration of minutes for February 18th", body:"Motion to approve was made by Bugamman with a second from Balkan. The minutes were approved unanimously with all members saying 'I' in favor." },
      { item:"Public hearing on conditional use permit for 218 South Fourth Street (personal storage facility)", body:"Jason Dunwy and Melinda Dunwy spoke in favor of the proposed storage facility. They argued that with over 400 new apartment units recently approved downtown, including the 153-unit Foundry on Third and 102-unit Evergreen Landing, there is a need for convenient storage options for residents with limited apartment space. No action was taken during this public hearing item." },
      { item:"Conditional use permit for 731 North First Street (70-unit apartment building)", body:"Motion to approve was made by Bornman with a second from Bugamin. No questions or discussion were raised by commissioners. The motion passed unanimously, approving Beacon Resources LLC to construct a 70-unit, 7-story apartment building." },
      { item:"Transportation project plat for Grand Avenue signal replacements at Sturgeon and Townline Road", body:"Motion to approve was made by Bugamin with a second from Balkon. No discussion was held. The motion passed unanimously, approving project 370-40-40 for signal replacements." },
      { item:"Next meeting date", body:"The next meeting was tentatively scheduled for April 21st at 5:00 PM. Staff noted the date may need to be moved due to election and council meeting scheduling conflicts." },
    ],
    publicComment: "One written public comment was submitted by Linda Lawrence on March 12th supporting the 70-unit apartment building proposal, stating housing of this capacity would benefit downtown small businesses and praising the developer's track record. Jason Dunwy and Melinda Dunwy spoke during the public hearing in support of the storage facility at 218 South Fourth Street.",
    actionItems: [
      "Conditional use permit approved for 731 North First Street - 70-unit, 7-story apartment building for Beacon Resources LLC",
      "Transportation project plat approved for Grand Avenue signal replacements at Sturgeon and Townline Road (Project 370-40-40)",
      "February 18th meeting minutes approved",
      "Vice chair election postponed until April session",
      "Staff to confirm April meeting date (tentatively April 21st, may be rescheduled)",
    ],
  },
  {
    id: "hNOP07iJjNY", source: "marathon",
    title: "Marathon County Board Education Meeting",
    date: "March 19, 2026", shortDate: "MAR 19",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=hNOP07iJjNY",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board held an educational meeting featuring presentations on PFAS litigation opportunities and renewable energy regulation. No votes were taken as this was an informational session, but the board received detailed information about joining multi-district PFAS litigation against chemical manufacturers and learned about county options for regulating large-scale wind and solar projects, including joint development agreements.",
    agenda: [
      { time:"0:00", item:"Call to order and pledge of allegiance" },
      { time:"1:05", item:"Reading of the notice" },
      { time:"1:45", item:"Roll call" },
      { time:"2:15", item:"Public comment period (15 minutes, 5 speakers)" },
      { time:"15:01", item:"Presentation on PFAS multi-district litigation opportunity" },
      { time:"1:01:45", item:"Presentation on renewable energy regulatory authority" },
      { time:"1:05:00", item:"Overview of proposed wind projects in Marathon County" },
      { time:"1:20:02", item:"County options for renewable energy regulation" },
      { time:"1:30:01", item:"Joint development agreement discussion" },
    ],
    discussions: [
      { item:"Public Comment", body:"Five residents spoke during public comment. Cindy Nelson from Stratford reported visiting 200 houses about wind turbine projects and stated no one she spoke to supports them. Wendy Rowski from Green Valley urged the board to vote no on the comprehensive plan next week, objecting to the term 'wind farm' and requesting it be called 'industrial wind energy development.' Barb Newton from Rib Mountain supported a speed limit reduction and no-passing zone on Double N, noting 75 residents signed a petition. Heidi Pesky from McMillan argued against joint development agreements for wind projects, citing concerns about county liability and long-term obligations. Cindy Hogan from Rib Mountain also supported the Double N safety improvements." },
      { item:"PFAS Multi-District Litigation Presentation", body:"Attorney Andy Phillips from Atollis Law and Carrie McDougall from Baron and Budd Law Firm presented on opportunities for Marathon County to join national PFAS litigation. McDougall explained the MDL has resulted in $12-13 billion in settlements from 3M and DuPont for water contamination claims. He noted airport and soil-based claims are expected to be next. Supervisor Robinson asked about claim scope regarding landfills and land spreading; attorneys clarified claims are only for Marathon County's direct injuries, not on behalf of other parties. Vice Chair Dickinson noted the airport has no known PFAS contamination currently. Supervisor Mash asked about costs; McDougall confirmed it's a 25% contingency fee with no payment unless recovery is achieved." },
      { item:"Renewable Energy Regulation Presentation", body:"Attorney Rebecca Roker from Atollis Law, representing Wisconsin Counties Association, presented on county authority over renewable energy projects. She explained that projects over 100 megawatts fall under PSC jurisdiction, noting PSC has approved 33 solar projects with zero denials. She outlined four options for the county: do nothing, negotiate a joint development agreement (JDA), intervene in PSC proceedings, or litigate. Roker strongly recommended JDAs as the most effective tool to protect county interests, noting they can address liability, road damage, decommissioning, emergency response training, and environmental protections that state law doesn't otherwise provide. She discussed the Hub City Wind project from Alliant Energy and noted no CPCN application has been filed yet with PSC." },
    ],
    publicComment: "Five speakers addressed the board: Cindy Nelson (Stratford) opposed wind turbines, reporting 200 residents she contacted were against the projects; Wendy Rowski (Green Valley) urged voting no on the comprehensive plan and objected to using 'farm' terminology for industrial energy facilities; Barb Newton (Rib Mountain) supported speed reduction on Double N road with 75 petition signatures; Heidi Pesky (McMillan) argued against joint development agreements listing numerous concerns; Cindy Hogan (Rib Mountain) supported the Double N safety petition.",
    actionItems: [
      "Board to consider resolution on PFAS litigation at next week's meeting",
      "Board to vote on comprehensive plan advancement next week",
      "County to potentially engage counsel for PFAS litigation (25% contingency fee structure)",
      "County to consider options for renewable energy project regulation including joint development agreements",
      "Speed limit reduction and no-passing zone on Double N road pending board action",
    ],
  },
  {
    id: "gugcMAm6DFA", source: "wausau",
    title: "Wausau Board of Public Works Meeting",
    date: "March 19, 2026", shortDate: "MAR 19",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=gugcMAm6DFA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Board of Public Works held a brief meeting to open bids and award the 2026 asphalt paving project. RC Pavers was awarded the contract with the lower bid of $824,146.34, beating American's bid of $849,872.10.",
    agenda: [
      { time:"0:00", item:"Call to order" },
      { time:"0:06", item:"Open bids and make recommendation for 2026 asphalt paving project" },
      { time:"0:42", item:"Motion to adjourn" },
    ],
    discussions: [
      { item:"2026 Asphalt Paving Project Bid Award", body:"Two bids were opened for the 2026 asphalt paving project. RC Pavers submitted the low bid at $824,146.34, while American submitted a bid of $849,872.10. A motion was made to approve RC Pavers as the contractor. The motion was seconded and passed unanimously with voice vote approval." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "RC Pavers awarded the 2026 asphalt paving project contract at $824,146.34",
    ],
  },
  {
    id: "f1fZvkxedNY", source: "wausau",
    title: "Wausau Board of Public Works Meeting",
    date: "March 17, 2026", shortDate: "MAR 17",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=f1fZvkxedNY",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Board of Public Works held a brief meeting to open bids and award the 2026 asphalt paving project. RC Pavers was awarded the contract with the lower bid of $824,146.34, beating American's bid of $849,872.10.",
    agenda: [
      { time:"0:00", item:"Call to order" },
      { time:"0:06", item:"Open bids and make recommendation for 2026 asphalt paving project" },
      { time:"0:42", item:"Motion to adjourn" },
    ],
    discussions: [
      { item:"2026 Asphalt Paving Project Bid Award", body:"Two bids were opened for the 2026 asphalt paving project. RC Pavers submitted the low bid at $824,146.34, while American submitted a bid of $849,872.10. A motion was made to approve RC Pavers as the contractor. The motion was seconded and passed unanimously with voice vote approval." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "RC Pavers awarded the 2026 asphalt paving project contract at $824,146.34",
    ],
  },
  {
    id: "aUG3K0hxNsU", source: "weston",
    title: "Finance and Human Resources Committee",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Finance & Human Resources", duration: "~1h",
    url: "https://www.youtube.com/watch?v=aUG3K0hxNsU",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_03232026-1898",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Finance and Human Resources Committee heard a detailed presentation on public works operations and budget, then debated employee clothing allowances after canceling a uniform rental contract. After multiple failed votes, the committee approved $400 annually for employee clothing allowance (plus $500 starting in 2027) along with a one-time washer and dryer purchase for staff use.",
    agenda: [
      { time:"0:01", item:"Call to order and Pledge of Allegiance" },
      { time:"0:35", item:"Roll call" },
      { time:"0:50", item:"Public comments" },
      { time:"2:45", item:"Approval of minutes from February 16, 2026" },
      { time:"3:10", item:"Acknowledge February financial report" },
      { time:"3:45", item:"Acknowledge T1 and T2 detail reports for February" },
      { time:"4:20", item:"Acknowledge legal details for February" },
      { time:"5:00", item:"Educational presentation: Public works operations and budget" },
      { time:"40:03", item:"Discussion and action on reimbursement for clothing and equipment allowance" },
      { time:"1:15:01", item:"Future meeting scheduling and adjournment" },
    ],
    discussions: [
      { item:"Public works operations and budget presentation", body:"Public Works Director Michael presented a comprehensive overview of department operations, showing a 1.1% budget decrease from 2025 to 2026 (about $26,000 less). He highlighted that Weston spends approximately $9,700 less per mile on streets than the average central Wisconsin community, noting the village is the third lowest spending community per mile in the region. Michael discussed recent storm response where employees worked 16-17 hour shifts, with estimated costs of $50,000 for that single event. Marathon County is pursuing disaster relief funds and Weston may receive reimbursement. The department has 10 full-time public works staff (with a new hire starting Wednesday) compared to 11 in 2010." },
      { item:"Employee clothing and equipment allowance amendments", body:"Following cancellation of the Cintas uniform rental contract (saving approximately $6,000), staff proposed increasing the employee clothing allowance from $300 to $600. Committee member Armain questioned the increase, arguing that during referendum discussions for fire department staffing, all expenditures should be scrutinized. Director Michael defended the increase, noting employees work in hazardous conditions with chemicals and waste that destroy clothing quickly. After the initial motion for $600 failed on a roll call vote (Daniels-yes, Armain-no, Olsson-no, My-yes, Satai-no), a $400 motion also failed 3-3. A $500 motion with washer\/dryer also failed. Finally, a motion for $400 remainder of 2026, $500 annually starting 2027, plus one-time washer and dryer purchase passed with one opposed." },
      { item:"Minutes and financial reports", body:"Minutes from February 16, 2026 were approved unanimously on motion by Steve, seconded by Stephanie. February financial reports, T1 and T2 detail reports, and legal details were all acknowledged unanimously." },
    ],
    publicComment: "Lisa Beck of 1808 Cortez Lane offered public comment. She praised Public Works Director Mike for the department's response to the recent storm. She also expressed concern about the proposed employee clothing allowance increase, questioning why the village would move to the highest proposed amount after canceling Centas to save money, and suggested considering a lesser amount given overall budget concerns.",
    actionItems: [
      "Recommend to village board: Employee clothing allowance of $400 for remainder of 2026, $500 annually starting 2027, plus one-time purchase of washer and dryer for staff use",
      "February 2026 meeting minutes approved",
      "February financial reports, T1\/T2 detail reports, and legal details acknowledged",
      "Next meeting scheduled for Tuesday, April 21st at 5:00 PM",
      "Marathon County disaster relief application in progress for recent storm costs - follow-up expected in coming weeks",
    ],
  },
  {
    id: "_hS5GDGVL1c", source: "wausau",
    title: "Wausau Public Health and Safety Committee Meeting",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Public Health & Safety", duration: "~1h",
    url: "https://www.youtube.com/watch?v=_hS5GDGVL1c",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Public Health and Safety Committee approved a parklet permit for West Cider Diner and Lounge after the owner presented detailed plans, approved multiple license applications and summer events, and updated the municipal code regarding solid waste disposal and cell phone use while driving. The committee also heard updates on the WMC shelter's transition to Bridge Street Mission and received the Fire Department's 2025 annual report.",
    agenda: [
      { time:"0:00", item:"Call to order and roll call" },
      { time:"0:15", item:"Public comment on agenda items" },
      { time:"0:35", item:"Approval of minutes from February 16th, 2026" },
      { time:"1:00", item:"License applications - West Cider Diner parklet permit" },
      { time:"10:00", item:"License applications - Denial recommendations (Theodore Davis, Joanna Gregory)" },
      { time:"20:01", item:"Repealing and recreating Municipal Code Chapter 6.44 - Solid waste disposal" },
      { time:"20:50", item:"Repealing Municipal Code Section 10.01.012 - Handheld mobile phone use while driving" },
      { time:"23:00", item:"Memorandum of understanding with Midwest Renewable Energy for solar program" },
      { time:"26:00", item:"Wausau Fire Department 2025 annual report" },
      { time:"32:30", item:"Tavern activities report - February 2026" },
      { time:"37:00", item:"Community outreach update and shelter transition discussion" },
    ],
    discussions: [
      { item:"West Cider Diner Parklet Permit", body:"Tyler Vote, owner of West Cider Diner and Lounge, presented detailed mockups for a parklet at 628 North Third Avenue. He explained the parklet would extend 4 feet into the street and 4 feet on the sidewalk, taking up two parking spots. He addressed safety concerns about visibility and lighting, noting it would be lit and decorated with flowers and flags. Alder Larson stated he was 'really sort of against this' initially but changed his mind after seeing the layout. The committee approved the permit unanimously as a one-year trial, with Vote asked to return in November to report on how it went." },
      { item:"License Denial Recommendations - Theodore Davis", body:"Theodore Davis appeared regarding his bartender license denial recommendation, explaining that 20 years ago as a minor he made a mistake that has followed him. His boyfriend Matthew Prieb spoke emotionally in support, describing Davis as a loving person who has not reoffended since. Deputy Chief Baiton indicated Chief Barnes had received rehabilitation evidence but he was unfamiliar with the details. The committee voted to hold the item until the next meeting to allow Chief Barnes to review the submitted evidence and potentially change his recommendation." },
      { item:"License Denial Recommendations - Joanna Gregory", body:"Joanna Gregory did not appear at the meeting. Her case was processed with the batch of license applications as recommended for denial." },
      { item:"Municipal Code Chapter 6.44 - Solid Waste Disposal", body:"Assistant City Attorney Vinnie Bonino was present to answer questions about the ordinance update, which repeals and recreates the chapter to comply with state-level changes. The committee approved unanimously with motion from Larson, second from Watson." },
      { item:"Handheld Mobile Phone Ordinance Repeal", body:"Attorney Bonino explained that state traffic laws have been amended to regulate cell phone usage, making the local ordinance redundant since the city already adopts state traffic code. The committee voted unanimously to repeal the local cell phone ban, with motion from Watson and second from Larson." },
      { item:"Midwest Renewable Energy Solar Partnership", body:"Carrie from the planning department reported that the sustainability committee unanimously approved this item on March 5th. The MOU would allow group purchasing of solar installations with vetting of contractors. Alder Sarah noted she has solar on her house and praised the partnership with MREA. Approved unanimously with motion from Watson, second from Larson." },
      { item:"Fire Department Annual Report", body:"Fire Chief reported the department responded to over 7,200 calls in 2025, averaging 20 per day and setting new records. He announced that as of Friday, the city regained ISO Class 2 status for fire protection for the next four years. The Chief mentioned upcoming public information sessions on March 31st, April 1st at Station 2 at 5 PM, and April 3rd at Station 1 regarding the April 7th referendum. Report placed on file." },
      { item:"Shelter Transition to Bridge Street Mission", body:"Tracy Durante reported 415 unduplicated guests have been served since the WMC shelter opened, with over 740 volunteer hours in February alone. James Torensson, new Director of Homeless Services at Bridge Street Mission, explained the emergency shelter transition is expected around late April, with the contractor announcement on April 1st. The WMC shelter contract with First United Methodist Church was extended through April 19th to ensure no gap in service. The committee expressed interest in touring the new facility at a ribbon cutting ceremony." },
    ],
    publicComment: "Carrie Mor Everest of 1025 Everest Boulevard spoke during reopened public comment at the end of the meeting. She has volunteered at the shelter since it opened and expressed concerns about how unhoused individuals are treated during 911 emergencies, stating they are treated differently than other citizens. She said she has brought complaints over 10 months with no resolution and only recently learned about the Police and Fire Commission complaint process. The Chair acknowledged her comments and directed her to the formal PFC complaint process.",
    actionItems: [
      "Parklet permit approved for West Cider Diner at 628 North Third Avenue for summer 2026 trial period through October 31st",
      "Tyler Vote to return in November to report on parklet operation",
      "Theodore Davis bartender license decision held until next meeting pending Chief Barnes' review of rehabilitation evidence",
      "Joanna Gregory bartender license denied (did not appear)",
      "Multiple summer event permits approved including Wings over Wausau, Concerts on the Square, Chalkfest, Memorial Day parade, Hope on the Block, Jazz on the River",
      "Liquor license subcommittee recommendations approved for Oasis Arcade, Whiskey River Bar and Grill, and Hayawa",
      "Municipal Code Chapter 6.44 on solid waste disposal repealed and recreated",
      "Municipal Code Section 10.01.012 on handheld mobile phone use repealed",
      "MOU with Midwest Renewable Energy for solar program approved",
      "Committee to tour Bridge Street Mission shelter at ribbon cutting ceremony after opening around April 20th",
      "Staff to investigate status of Trace Armanos restaurant closure",
      "Staff to verify point totals on tavern report for Days establishment",
    ],
  },
  {
    id: "Izfp0CD_Da0", source: "weston",
    title: "Board of Trustees",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Board of Trustees", duration: "~1h",
    url: "https://www.youtube.com/watch?v=Izfp0CD_Da0",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_03232026-1898",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Village of Weston Board of Trustees approved multiple rezoning ordinances, modified a speed limit ordinance for Weston Avenue after debate, and approved a 10-year baseball\/softball field maintenance agreement. A resident criticized the board's approach to funding SAFER fire department staffing, arguing the upcoming referendum is inadequate and urging budget reprioritization.",
    agenda: [
      { time:"0:01", item:"Call to order, Pledge of Allegiance, and Roll Call" },
      { time:"0:45", item:"Public Comments" },
      { time:"4:20", item:"Minutes from February 16th Board of Trustees meeting" },
      { time:"5:01", item:"Acknowledge reports from boards, committees, and commissions" },
      { time:"6:30", item:"Department reports (Administrator, Clerk, Finance, Fire\/EMS, Parks, Planning, Police, Public Works, Technology)" },
      { time:"20:02", item:"Ordinances - Rezoning and speed limit changes" },
      { time:"30:01", item:"Resolution approving Hinter Springs Second Edition subdivision final plat" },
      { time:"32:00", item:"April 2026 referendum informational sessions update" },
      { time:"35:02", item:"E-bike and euro ordinance discussion" },
      { time:"37:00", item:"Removal of no parking restrictions near Kennedy Park" },
      { time:"44:00", item:"Baseball\/softball field maintenance agreement and other park items" },
      { time:"55:02", item:"Utility and infrastructure items including sewer televising software and well rehabilitation" },
    ],
    discussions: [
      { item:"Public Comment on SAFER Staffing and Referendum", body:"Jim Pensel of 5002 Aerrol Street spoke critically of the board's approach to fire department funding. He praised SAFER staff after attending their citizen academy but argued the department is 'severely understaffed' and the upcoming referendum is inadequate because it has no sunset date and won't keep pace with rising costs. He urged the board to reprioritize spending, stating 'we don't have a revenue problem, we have a priority problem' and criticized spending on artificial turf and the aquatic center over public safety." },
      { item:"Finance Director Response to Public Comment", body:"Finance Director Jessica responded that the village cannot borrow for additional firefighters, only for capital projects like the Kennedy Park turf field. She noted that public works is understaffed and couldn't adequately respond to the recent blizzard, stating 'we need more money' and that the village operates as 'the cheapest' and 'most efficiently' but can no longer continue without additional revenue." },
      { item:"Speed Limit Ordinance 26-006 (Weston Avenue)", body:"The original ordinance proposed changing Weston Avenue from Von Kennel to Ryan Street to 35 mph. Trustee Maloney objected, arguing the road is wide with sparse driveways and 35 mph is too slow compared to other village roads. The original motion failed 4-3 with Maloney, Jordan, and the presiding officer voting no. An amended motion by Maloney to keep Von Kennel to Highway J at 45 mph while making Camp Phillips to Von Kennel 35 mph passed with only Trustee Karns opposing." },
      { item:"Rezoning Ordinances", body:"Ordinance 26-00004 rezoning portion of 8905 Bert Street from RR5 to SFS was approved unanimously per planning commission recommendation. Ordinance 26-00005 rezoning portion of 7105 Christensen Avenue from SL to SFS was also approved unanimously per planning commission recommendation." },
      { item:"Baseball\/Softball Field Maintenance Agreement", body:"The board approved a 10-year agreement with youth baseball and softball organizations for field maintenance at Kennedy Park. The committee recommended the long term to protect the village's investment in case organizations withdraw, and because it formalizes an arrangement that has existed informally for over 10 years. Approved unanimously." },
      { item:"Intersection Signage at Community Center Drive and Birch Street", body:"Motion to change stop sign to yield sign was amended after Trustee Huang raised safety concerns about cyclists coming off the pedestrian bridge at high speeds. A friendly amendment was added to install a stop sign for cyclists on the bike path. Motion passed unanimously as amended." },
      { item:"Removal of No Parking Restrictions near Kennedy Park", body:"The board approved removing no parking restrictions on the west side of Alderson Street along Kennedy Park to provide additional parking for farmers market and events, and to accommodate traffic during upcoming roundabout construction. Passed unanimously." },
      { item:"Remote Meeting Attendance Policy", body:"Trustee Lewis recommended deferring this item until the next meeting so the newly seated board can make the decision. Motion to defer passed unanimously." },
      { item:"Microsoft Teams for Trustee Communication", body:"The board approved using Microsoft Teams for trustee communications starting with the next term, replacing text messaging between trustees. A training session will be held for the new board. Passed unanimously." },
      { item:"Eagle Scout Project at McKiller Park", body:"The board approved funding for an Eagle Scout project at McKiller Park, with funds to come from park operations budget. Passed unanimously." },
    ],
    publicComment: "Jim Pensel of 5002 Aerrol Street spoke for approximately 4 minutes criticizing the board's approach to SAFER fire department funding. He praised the department after attending the inaugural SAFER Citizen Academy but argued the upcoming referendum is a 'band-aid' solution without a sunset date. He urged the board to reprioritize the budget away from 'wants' like artificial turf and the aquatic center toward 'needs' like fully funding fire and police departments.",
    actionItems: [
      "Speed limit on Weston Avenue: Camp Phillips to Von Kennel at 35 mph; Von Kennel to Highway J remains at 45 mph",
      "Rezoning of 8905 Bert Street and 7105 Christensen Avenue approved",
      "10-year baseball\/softball field maintenance agreement approved",
      "Stop sign for cyclists to be added at pedestrian bridge near Community Center Drive; vehicle stop sign changed to yield",
      "No parking restrictions removed on west side of Alderson Street along Kennedy Park",
      "Remote meeting attendance policy deferred to April 21st meeting for new board consideration",
      "Microsoft Teams approved for trustee communications with training session planned",
      "Sewer televising software contract approved",
      "Well 2 rehabilitation approved",
      "Hospital area repaving change order #4 approved",
      "Next meeting April 21st at 6 PM with new board members",
    ],
  },
  {
    id: "HwjjV4oIneA", source: "marathon",
    title: "Marathon County Board Regular Meeting",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "County Board", duration: "~1h",
    url: "https://www.youtube.com/watch?v=HwjjV4oIneA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Board of Supervisors adopted the 2026 Comprehensive Plan with multiple amendments addressing renewable energy terminology, data centers, AI technology, and coal\/natural gas promotion. The board also approved salaries for elected officials, authorized phase 2 design for a new highway facility, engaged outside counsel for PFAS litigation, and ratified emergency declaration for the recent blizzard response.",
    agenda: [
      { time:"0:12", item:"Call to order, Pledge of Allegiance, moment of reflection" },
      { time:"1:30", item:"Roll call and welcome to visitors" },
      { time:"2:15", item:"Consent agenda items C8 through C13 B2" },
      { time:"2:45", item:"Adopting Marathon County Comprehensive Plan 2026 (Ordinance O-13-26)" },
      { time:"1:20:01", item:"Establishing salaries for elected officials (Resolution 12-26)" },
      { time:"1:21:00", item:"Authorizing phase 2 design services for new highway facility (Resolution 13-26)" },
      { time:"1:23:30", item:"Authorizing outside counsel for PFAS litigation (Resolution 14-26)" },
      { time:"1:28:30", item:"Approving carry forwards and budget amendments (Resolution R-20-26)" },
      { time:"1:30:01", item:"Ratification of local state of emergency declaration (Resolution 22-26)" },
      { time:"1:35:00", item:"Administrator performance evaluation and salary" },
    ],
    discussions: [
      { item:"Marathon County Comprehensive Plan 2026", body:"Administrator Leonard presented 10 proposed amendments compiled from supervisor feedback. Amendment 1 (livability standards) passed unanimously. Amendments 2, 3, and 4 (alternative energy systems language changes suggested by Vice Chair Dickinson) were separated per Supervisor Crawl's motion and each passed but not unanimously. Amendment 5 (data centers\/battery storage) passed but not unanimously, with Supervisor Leur voting no calling it 'too ideological.' Amendment 6 (radon and lead) passed unanimously. Amendment 7 (regulate energy projects when allowed by law) passed but not unanimously. Amendment 8 (AI\/automation language by Supervisor Leur) passed unanimously. Amendment 9 (promote coal\/natural gas) was amended by Supervisor Boots to read 'promote coal and natural gas until a long-term sustainable and reliable energy source can be found that does not adversely affect agricultural land' - this amended version passed but not unanimously after debate about clean coal viability and cost-effectiveness. Supervisor Sundulski's late amendment on industrial-scale wind\/solar\/battery facilities was defeated after discussion about PSC jurisdiction. The final comprehensive plan as amended passed but not unanimously." },
      { item:"Establishing salaries for elected officials", body:"Resolution 12-26 establishing salaries for clerk of courts, sheriff, and elected department heads for the upcoming term passed with Supervisor Soyber voting yes and the motion carried." },
      { item:"New highway facility phase 2 design", body:"Resolution 13-26 authorizing staff to proceed with phase 2 design services passed unanimously. Supervisor Soyber requested future information about plans for the old facility, and Chair Gibbs noted this would be addressed by HR Finance and Property Committee potentially years in the future." },
      { item:"PFAS litigation outside counsel", body:"Resolution 14-26 authorizing contingency-based outside counsel for PFAS lawsuits was amended twice. Supervisor Robinson's amendment directing the administrator to evaluate past and present county practices that may have resulted in PFAS exposure passed unanimously. Vice Chair Dickinson's amendment modifying airport-related language to reference county property passed unanimously. The final resolution as amended passed unanimously." },
      { item:"Emergency declaration ratification", body:"Resolution 22-26 ratifying the local state of emergency for the blizzard response passed unanimously. Administrator Leonard explained the local declaration was needed after the governor's emergency expired on the 16th to preserve reimbursement opportunities. He praised staff efforts, noting facilities and parks logged over 600 hours of call-in time in 24 hours, with highway workers doing 12-16 hour shifts. Supervisor Fifick echoed thanks to staff from administration to field workers." },
      { item:"Administrator performance evaluation", body:"Chair Gibbs explained the executive committee completed the administrator's evaluation using board input summarized at the previous meeting, with no wording changes. Supervisor Robinson moved to accept the executive committee's recommendation on salary and performance evaluation without going into closed session. Motion passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Comprehensive Plan 2026 adopted with amendments on energy terminology, data centers, AI\/automation, radon\/lead, and coal\/natural gas promotion",
      "Salaries established for clerk of courts, sheriff, and elected department heads for upcoming term",
      "Phase 2 design services authorized for new highway facility",
      "Outside counsel engaged on contingency basis for PFAS litigation",
      "County administrator directed to evaluate county operations for PFAS exposure risks",
      "Carry forwards and budget amendments approved",
      "Capital asset thresholds set at $10,000 for general assets and $50,000 for infrastructure",
      "Law enforcement drug trafficking response grant accepted",
      "Local state of emergency ratified for blizzard response",
      "Administrator performance evaluation and salary recommendation accepted",
      "Departing supervisors acknowledged: Crawl, Fifick, Marshall, Rosenberg, Hardinger, V, and Reynolds",
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
    overview: "The Village of Weston Tourism Commission approved four grant requests totaling $22,500 for local events including the Mountain Bay Cup soccer tournament, GG's 5K Glow Fun Run, Hmong Wausau Festival, and Wisconsin Valley Fair. The commission also scheduled a special meeting for May 18th to consider a late application from Taste and Glow Balloon Festival that was missed due to administrative error.",
    agenda: [
      { time:"0:07", item:"Call to order and Pledge of Allegiance" },
      { time:"0:45", item:"Roll call" },
      { time:"1:05", item:"Public comments" },
      { time:"4:15", item:"Approval of minutes from previous meeting" },
      { time:"4:35", item:"Acknowledge 2025 budget status report" },
      { time:"5:00", item:"CVB reports presentation by Tim White" },
      { time:"14:25", item:"Grant request - Mountain Bay Cup soccer tournament" },
      { time:"22:35", item:"Grant request - GG's 5K Glow Fun Run\/Walk" },
      { time:"27:45", item:"Grant request - Hmong Wausau Festival" },
      { time:"33:15", item:"Grant request - Wisconsin Valley Fair" },
      { time:"38:30", item:"Post-event report - Wisconsin High School Bowling" },
      { time:"39:45", item:"Staff remarks and Taste and Glow discussion" },
      { time:"44:30", item:"Commissioner remarks and future items" },
    ],
    discussions: [
      { item:"Public Comments", body:"Jim Pensson of 500 Street Weston raised concerns about grant applications claiming up to 2,000 hotel room bookings when he believes the Village of Weston and even the greater Wausau area lack that capacity. He also questioned whether applications specify how many rooms are actually in Weston versus other areas, and asked about follow-through on after-action report commitments to coordinate with local businesses." },
      { item:"CVB Reports", body:"Tim White, Visit Wausau Executive Director, reported on upcoming events including the Wisconsin Bike Fed summit and Marathon County Parks film festival. He announced the World Horseshoe Tournament is progressing well with ESPN coverage approved and registrations ahead of last year's 644 participants, expecting at least 800 this year. White introduced new Director of Operations Jamie Rice Hecondorf and took responsibility for missing the Taste and Glow Balloon Festival grant application. He addressed the hotel room capacity question, stating there are about 2,400 rooms in the greater Wausau area. Report was acknowledged unanimously." },
      { item:"Grant Request - Mountain Bay Cup", body:"Dan Kubat from MC United Soccer Club presented a request for $5,000 for their spring tournament May 1-3. He reported 170 teams registered with 68.5% (116 teams) coming from more than 90 miles away, expecting 8,000-10,000 attendees and economic impact of $700,000 to $1 million. This is the first time requesting funds for the spring tournament (fall tournament has been funded previously). Games will be held at Peoples Sports Complex, Airport Park, and Greenhead Turner Center. Motion by Renee, second by Jackson. Approved unanimously for $5,000." },
      { item:"Grant Request - GG's 5K Glow Fun Run\/Walk", body:"Erica presented online for GG's Playhouse Wausau's sixth annual 5K glow fun run at Weston YMCA, requesting $2,500. She reported securing WAOW for advertising and noted many participants come from out of state including Minnesota, Texas, Michigan, and Illinois, using the event as family reunions. New this year is a cornhole tournament. The foam machine was confirmed as a signature attraction. Motion by Renee, second by Jackson. Approved unanimously for $2,500." },
      { item:"Grant Request - Hmong Wausau Festival", body:"Elang Jang, festival chair since 2017, requested $10,000 for the August 1-2 event. Last year drew 12,000-13,000 attendees; this year expects 14,000-15,000 with the addition of under-18 volleyball and soccer tournaments expected to bring 500-800 additional athletes plus families. Jang noted hotels within an hour of the event sell out and emphasized vendors and contractors are local. Motion by Husane, second by Renee. Approved unanimously for $10,000." },
      { item:"Grant Request - Wisconsin Valley Fair", body:"No representative was present to speak. Commissioners discussed that last year the fair requested $10,000 but received $5,000. Concerns were raised about limited benefit to Weston specifically, noting the application listed only 3-4 hotel rooms and hotels contacted were in Wausau and Rothschild, not Weston. Tim White suggested the primary benefit might be marketing exposure through logo placement. Motion by Husane for $5,000, second by Renee. Approved unanimously for $5,000." },
      { item:"Taste and Glow Balloon Festival Application", body:"Staff explained that Tim White missed processing the Taste and Glow application. Since the event is the second weekend of July, just before the regular July 20th meeting, the commission would miss advertising deadlines. Commission scheduled a special meeting for May 18th at 4:00 PM to consider the application as the sole agenda item." },
      { item:"Commissioner Remarks - Hotel Room Capacity", body:"Jackson raised Jim Pensson's point about the 2,000 hotel room claims being inaccurate. Tim White clarified the greater Wausau area has about 1,800 rooms, with 2,400 when expanding to Marathon County and beyond. Jackson requested a report documenting hotel room counts by property. Tim White agreed to provide this information." },
    ],
    publicComment: "Jim Pensson of 500 Street Weston commented online, questioning the accuracy of grant applications claiming 2,000 hotel room bookings when he believes this exceeds Weston and regional capacity. He also asked about application requirements to specify Weston-specific hotel stays and follow-up on commitments to coordinate with local businesses.",
    actionItems: [
      "Mountain Bay Cup approved for $5,000 grant",
      "GG's 5K Glow Fun Run\/Walk approved for $2,500 grant",
      "Hmong Wausau Festival approved for $10,000 grant",
      "Wisconsin Valley Fair approved for $5,000 grant",
      "Special meeting scheduled for May 18th at 4:00 PM to consider Taste and Glow Balloon Festival application",
      "Tim White to provide report on hotel room capacity by property for the area",
      "Next regular meeting scheduled for July 20th, 2026",
    ],
  },
  {
    id: "D7R7a0G0WTA", source: "weston",
    title: "Parks Committee",
    date: "March 23, 2026", shortDate: "MAR 23",
    committee: "Parks and Recreation Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=D7R7a0G0WTA",
    docUrl: "https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_03232026-1898",
    isAgendaOnly: false,
    badge: "new",
    overview: "The Parks Committee selected Rettler Corporation to develop a master plan for Mock Mueller Park, approved February meeting minutes, and discussed increasing park impact fees to align with neighboring communities. The committee also reviewed the successful Yellow Banks kayak launch project which came in significantly under budget due to grants, and discussed future plans for the Kennedy Park ice rink.",
    agenda: [
      { time:"0:05", item:"Call to Order and Pledge of Allegiance" },
      { time:"0:30", item:"Roll Call" },
      { time:"0:45", item:"Approval of Minutes from February 23rd, 2026" },
      { time:"1:15", item:"Public Comments" },
      { time:"6:00", item:"Review of Parks and Recreation Impact Fee Discussion" },
      { time:"26:00", item:"Request for Proposals for Mock Mueller Park Master Plan" },
      { time:"31:30", item:"Review of Yellow Banks Kayak Launch Expenses" },
      { time:"38:00", item:"Discussion on Ice Rink Operations at Kennedy Park" },
      { time:"50:15", item:"Future Items and Next Meeting Date" },
      { time:"52:30", item:"Adjournment" },
    ],
    discussions: [
      { item:"Approval of Minutes", body:"Minutes from February 23rd, 2026 meeting were approved. A motion to accept was made and seconded, passing unanimously with all present voting in favor. Committee member Karn was absent and excused." },
      { item:"Parks and Recreation Impact Fee Discussion", body:"Jennifer presented information on park impact fees, noting the village currently charges $300 for single-family homes while neighboring communities charge $600-$900. The 2020 study recommended fees of $761 for single-family units. Committee members expressed support for a moderate increase to align with neighboring communities like Cronenwetter ($603) and Rib Mountain ($650). The committee's feedback will be taken to Plan Commission next month. No formal action was taken as this is an informational discussion." },
      { item:"Mock Mueller Park Master Plan RFP Selection", body:"Staff received seven proposals for the park master plan, which were reviewed by four staff members based on firm experience, personnel, project understanding, and cost. The two lowest bidders were JSD and Rettler Corporation, both with village experience. Roger made a motion to select Rettler Corporation, seconded by Katrina. The motion passed unanimously." },
      { item:"Yellow Banks Kayak Launch Expenses Review", body:"Jessica presented a detailed breakdown of the kayak launch project expenses and grant funding. The project received grants from DNR and Marathon County Transportation, with the county covering the full expense for the ADA-accessible dock. PGA Construction provided favorable pricing, and volunteers Dan Higginbotham and MTS donated site planning services. Committee members praised the transparency and grant-writing efforts, with Katrina noting the project was a 'huge success' with out-of-pocket costs significantly reduced. No action required; informational only." },
      { item:"Kennedy Park Ice Rink Operations", body:"Staff provided information on ice rink operations as requested by committee member Katrina. The warming house has been unattended since 2020 due to COVID and subsequent staffing shortages. Everest Youth Hockey remains interested in improvements including a covered rink structure and has provided cost estimates. Staff noted discussions are ongoing regarding Marathon Park changes that may increase demand for ice facilities. Katrina expressed concern about not losing sight of hockey needs amid baseball-focused Kennedy Park planning. Staff will bring back historical attendance numbers from 2018-19 seasons at the next meeting." },
    ],
    publicComment: "Jim Pencil of Pencil Street expressed frustration about receiving no response to questions submitted at the February meeting regarding playground equipment installation, Kennedy Park fundraising updates, and ice rink cost analysis. He argued the true cost of operating the ice rink is $20,000-$30,000 when factoring in staff hours, not the $1,320 stated in reports. Lisa Beck of 1808 Cortez Lane thanked Michael for snow removal during the recent blizzard and praised Sean and Jessica for the well-written Yellow Banks RFC. A written response to Jim Pencil's previous comments was submitted and will be included in the minutes.",
    actionItems: [
      "Rettler Corporation selected to develop Mock Mueller Park master plan and budget estimates",
      "Jennifer to present park impact fee comparison data to Plan Commission next month with committee feedback supporting moderate increase",
      "Staff to provide historical ice rink attendance numbers from 2018-19 seasons at next meeting",
      "Staff to gather user feedback on ice rink operations",
      "Dan Higginbotham to return to committee regarding Great Pineries Heritage Waterway signage for kayak launches",
      "Next meeting scheduled for April 27th, 2026",
    ],
  },
  {
    id: "8rRo1cm2YJ0", source: "wausau",
    title: "Wausau Finance Committee Meeting",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "Finance", duration: "~1h",
    url: "https://www.youtube.com/watch?v=8rRo1cm2YJ0",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Wausau Finance Committee met on March 24, 2026, denying a tax recovery claim related to ongoing Greenwood Hills litigation, approving multiple airport ground lease transfers, and postponing decisions on joining a national opioid settlement and funding for lead service line replacement costs not covered by state loans. The committee also approved 2025 budget carryover funds and transfers to cover shortfalls in recycling, airport, and parking funds.",
    agenda: [
      { time:"2:01", item:"Call to order" },
      { time:"2:20", item:"Public comment on agenda items" },
      { time:"2:35", item:"Approval of March 10, 2026 meeting minutes" },
      { time:"3:00", item:"Alleged claim for recovery of unlawful tax for Green Acres at Greenwood Hills LLC" },
      { time:"3:50", item:"Consent to transfer title to buildings at 939 Woods Place" },
      { time:"4:20", item:"Terminating airport ground lease with Win O. Jones at 939 Woods Place" },
      { time:"4:40", item:"Approving airport ground lease with Owen Jones at 939 Woods Place" },
      { time:"5:00", item:"Approving airport ground lease with Cole Lundberg" },
      { time:"5:20", item:"Participation in six remnant defendants national opioid settlement agreement" },
      { time:"12:00", item:"Budget amendment for Wausau Waterworks 2025 lead service line replacement project" },
      { time:"27:03", item:"Budget amendment for carryover funds from 2025 to 2026" },
    ],
    discussions: [
      { item:"March 10, 2026 Minutes", body:"Alder Watson moved to approve the minutes, seconded by Alder Griner. The motion passed unanimously." },
      { item:"Green Acres at Greenwood Hills LLC Tax Recovery Claim", body:"This claim is part of ongoing litigation with Greenwood Hills. Rick Rubble from assessments was available for questions. Alder Watson moved to approve the claim, seconded by Alder Griner. The chair explained a 'no' vote would deny the claim. The motion failed when members voted 'no' to deny the claim." },
      { item:"Airport Ground Lease Transfers at 939 Woods Place", body:"Three related items were approved to transfer a hangar from Win O. Jones to Owen Jones. The consent to transfer title was moved by Watson, seconded by Griner, and passed unanimously. The termination of the lease with Win O. Jones was moved by Tierney, seconded by Watson, and passed unanimously. The new lease with Owen Jones was moved by Watson, seconded by Tierney, and passed unanimously." },
      { item:"Airport Ground Lease with Cole Lundberg", body:"Alder Griner moved to approve, seconded by Watson. The motion passed unanimously." },
      { item:"National Opioid Settlement Agreement", body:"Alder Tierney expressed discomfort proceeding without more information about attorney fees and the city's potential share. Alder Watson noted uncertainty about how many parties would participate and what the city's cut would be. Alder Malini questioned where this came from, noting it seemed to 'drop from heaven.' Assistant Attorney Vincent explained the city received a letter identifying it as a potential class member. The deadline to participate is May 4th. Alder Griner moved to postpone to the next meeting, seconded by Tierney. Motion passed unanimously." },
      { item:"Budget Amendment for Lead Service Line Replacement", body:"Public Works Director Eric explained the DNR changed terms on non-construction costs, resulting in $709,000 not covered by the subsidized 0.25% loan. Finance Director Marian outlined options including borrowing, using general fund reserves, or using PFAS settlement money. Alder Tierney opposed adding more debt given current debt levels. Discussion covered splitting the $283,868 homeowner side (eligible for general fund) from the $425,803 utility side. Alder Watson moved to postpone to the next meeting, seconded by Griner. Motion passed unanimously." },
      { item:"2025 to 2026 Carryover Funds", body:"The finance director explained the large amount includes $10 million for transit buses funded by VW mitigation grants and various airport projects awaiting grant funds. Alder Watson moved to approve, seconded by Griner. Motion passed unanimously." },
      { item:"2025 Motorpool Fund Financial Results", body:"The finance director reported the motorpool fund would show a net profit of approximately $150,000 after transferring GMT money. However, a cash flow shortfall of approximately $177,000 exists due to vehicles ordered but not yet received. ARPA savings and auction proceeds may cover this shortfall. Solomon from Motorpool explained two dump trucks from 2023 are second and third in line for upfits and should arrive shortly. This was informational only; no action required." },
      { item:"2025 General Fund Financial Results", body:"The general fund showed a surplus of approximately $1.2 million, driven by strong building permits, GMT money, and investment income. After proposed transfers to recycling, airport, and parking funds to cover shortfalls, the surplus would be $540,000. CCITC was over budget by $194,000 due to communication problems on subscription budgeting and an unexpected Office 365 upgrade. Alder Tierney moved to approve the transfers to recycling, airport, and parking funds. Watson seconded. Motion passed unanimously." },
      { item:"2026 General Obligation Promissory Note Calendar", body:"The finance director presented the borrowing schedule for 2026 capital improvements totaling approximately $10 million with various amortization periods. Debt utilization will decrease slightly even with new issuance. Phil Cawson from Ehlers will present parameters at the next meeting. Alder Watson moved to approve the calendar, the chair provided the second. Motion passed unanimously." },
      { item:"Potential Property Purchases for DPW Streets Division", body:"Properties at 108 Adolf Street, 112 Adolf Street, 112½ Adolf Street, and 233 Myron Street were on the agenda for closed session discussion. Due to time constraints before council meeting and no urgency, Alder Watson moved to postpone to the next meeting, seconded by Tierney. Motion passed unanimously." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Denied tax recovery claim for Green Acres at Greenwood Hills LLC",
      "Approved transfer of hangar ownership and ground leases at 939 Woods Place from Win O. Jones to Owen Jones",
      "Approved airport ground lease with Cole Lundberg",
      "Postponed decision on national opioid settlement participation to next meeting - staff to provide more information",
      "Postponed decision on lead service line replacement funding to next meeting",
      "Approved 2025-2026 carryover funds budget amendment",
      "Approved transfers from general fund to recycling, airport, and parking funds to cover shortfalls",
      "Approved 2026 borrowing calendar with parameters resolution to come at next meeting",
      "Postponed closed session discussion on DPW property purchases to next meeting",
    ],
  },
  {
    id: "47UbKS2Jqo4", source: "marathon",
    title: "Marathon County Executive Committee Meeting",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "Executive Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=47UbKS2Jqo4",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County Executive Committee met briefly to discuss the performance review of the county administrator. The committee voted unanimously to go into closed session to discuss the administrator's performance appraisal, which included feedback from the board received the previous Thursday.",
    agenda: [
      { time:"0:00", item:"Call to order" },
      { time:"0:05", item:"Pledge of Allegiance" },
      { time:"0:30", item:"Performance review of the administrator (3A1)" },
      { time:"1:45", item:"Motion to enter closed session" },
    ],
    discussions: [
      { item:"Performance review of the administrator", body:"The chair explained that the committee had the option to go into closed session to discuss the final performance review of the county administrator, incorporating board feedback received the previous Thursday. The chair noted that the executive committee rated the administrator on three criteria (needs improvement, successful, exceptional) and that corporation counsel was asked to score these on a scale of 0 to 5 with a summary. After asking for the committee's preference, a motion was made and seconded to enter closed session." },
      { item:"Vote to enter closed session", body:"A roll call vote was conducted to enter closed session for the administrator evaluation. Members Gibbs, Dickinson, Arstead, Boots, Drebeck, Fifick, Mask, Ritter, Morash, and Robinson all voted 'aye.' The motion passed unanimously (10-0) and the committee entered closed session." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Committee entered closed session to finalize the county administrator's performance review",
      "Corporation counsel to provide summary of administrator evaluation scores",
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
    overview: "The Village of Weston Board of Trustees held its first meeting with three newly elected trustees, approving routine consent agenda items, three preliminary assessment resolutions for road reconstruction projects, and the president's committee appointments. The meeting featured extensive public comment from former trustee Joe Jordan praising staff and former resident Jim Pinsel criticizing the appointment process, plus lengthy discussion about Kennedy Park funding transparency.",
    agenda: [
      { time:"0:00", item:"Call to order and Pledge of Allegiance" },
      { time:"1:30", item:"Roll call" },
      { time:"2:15", item:"Public comments - Joe Jordan and Jim Pinsel" },
      { time:"13:30", item:"Approval of March 23, 2026 meeting minutes" },
      { time:"16:30", item:"Acknowledgment of reports from boards, committees and commissions" },
      { time:"18:00", item:"Department reports (Administrator, Clerk, Finance, EMS\/Fire, Parks, Planning, Police, Public Works, Technology)" },
      { time:"36:30", item:"Consent agenda including liquor license renewals" },
      { time:"39:00", item:"Ordinance 26-008 amending solid waste chapter" },
      { time:"39:30", item:"Preliminary assessment resolutions for road reconstruction projects" },
      { time:"42:00", item:"Kennedy Park renovation quarterly update discussion" },
      { time:"1:05:30", item:"Remote meeting attendance policy discussion and votes" },
      { time:"1:25:30", item:"President's appointments to committees and commissions" },
    ],
    discussions: [
      { item:"Approval of March meeting minutes", body:"The board approved the March 23, 2026 meeting minutes with corrections. Trustee Beck noted the minutes showed Trustee Cronin making a motion despite being marked excused. Staff explained the agenda was prepared before knowing Cronin would be absent, and Trustee Barbling actually presided. The date was also corrected from March 16 to March 23. Motion by Lopez Sarallo, second by Clark, passed unanimously." },
      { item:"Liquor license renewals (Item 41)", body:"Trustee Barbling moved to approve license renewals with a specific change for Fairfield Inn and Suites. The hotel had submitted their entire premises for licensing when only the lobby, locked fridges, locked storage room, and south end hallway should be included. Motion by Barbling, second by Olsen, passed unanimously." },
      { item:"Preliminary assessment resolutions for road reconstruction", body:"Three preliminary assessment resolutions passed unanimously: Resolution 26-010 for Gelick and Alderson Reconstruction (motion by Lopez Sarallo, second by Beck), Resolution 26-011 for Bladel Avenue (motion by Zagami, second by Olsen), and Resolution 26-012 for Concord Avenue and Bay's Street (motion by Lopez Sarallo, second by Clark). Public Works Director Michael Wolosek explained residents are assessed approximately $1,000-1,500 for driveway approaches, payable over 10 years." },
      { item:"Kennedy Park renovation quarterly update", body:"Extensive discussion ensued about funding transparency. Trustees Beck and Zagami questioned the $851,000 in capital funds used, learning it included budget surplus and unspent park project funds accumulated over years. The Friends of Kennedy Park foundation has $84,000 with a goal of $110,000-115,000 for field lights. Trustee Zagami expressed confusion matching public sentiment, stating Kennedy Park was 'one of the biggest hot button issues' during the election. Staff agreed to provide more detailed information and invite the Friends group to present at a future meeting." },
      { item:"Remote meeting attendance policy", body:"Three motions were considered. First motion by Lopez Sarallo to restrict virtual attendance to medical reasons only, with closed session attendance prohibited - failed 3-4 (Lopez Sarallo, Zagami, Olsen in favor; Hushen, Beck, Maloney, Clark opposed). Second motion by Zagami adding camera requirement to medical-only restriction - failed 3-4. Third motion by Maloney allowing remote attendance on camera with notification to clerk, administrator, and chair, prohibiting closed session remote attendance - passed 6-1 (Lopez Sarallo opposed)." },
      { item:"President's appointments to committees", body:"President Maloney presented committee appointments with former trustees Mark Kern remaining on Community Development Authority, Joe Jordan appointed to Planning Commission and Public Works, and Steve Cronin returning to Planning Commission. New trustees were assigned: Katrina Clark to Mountain Bay Metro, Lisa Beck to Safer, Barbling and Zagami to Everest Metro Joint Finance. Discussion was initiated but transcript ended before vote was completed." },
    ],
    publicComment: "Two speakers offered public comment. Joe Jordan (4102 Camp Phillips Road), former trustee, spoke for approximately 10 minutes welcoming new trustees, praising village staff for their professionalism and solutions-oriented approach, defending the village hall construction process, and expressing confidence in the new board's ability to address fire department staffing and the new fire station. Jim Pinsel criticized President Maloney's appointments, objecting to Louise Lopez being named vice president as an appointed rather than elected trustee, and criticized reappointing former trustees to committees, calling it a 'betrayal of the electorate' and 'good old boys' favoritism. He noted six committee vacancies were not publicly advertised.",
    actionItems: [
      "March 23, 2026 meeting minutes approved with date and presiding officer corrections",
      "Ordinance 26-008 amending solid waste chapter approved",
      "Resolution 26-010 preliminary assessment for Gelick and Alderson Reconstruction approved",
      "Resolution 26-011 preliminary assessment for Bladel Avenue Reconstruction approved",
      "Resolution 26-012 preliminary assessment for Concord Avenue and Bay's Street Reconstruction approved",
      "Liquor license renewals approved with Fairfield Inn premises correction",
      "Remote attendance policy amended: camera required, closed session attendance prohibited, notification to clerk\/administrator\/chair required",
      "Staff to provide detailed Kennedy Park funding timeline and Friends of Kennedy Park grant activity summary for next meeting",
      "Staff to research whether open records requestor names should be published in clerk reports",
      "SWAT analysis for Mountain Bay PD building to be forwarded to full board",
      "Village awarded LRIP grant for Birch Street reconstruction south of Schofield Avenue",
    ],
  },
  {
    id: "0pfKykvicdA", source: "marathon",
    title: "Marathon County HR, Finance, and Property Committee Meeting",
    date: "March 24, 2026", shortDate: "MAR 24",
    committee: "Marathon County HR, Finance, and Property Committee", duration: "~1h",
    url: "https://www.youtube.com/watch?v=0pfKykvicdA",
    docUrl: null,
    isAgendaOnly: false,
    badge: "new",
    overview: "The Marathon County HR, Finance, and Property Committee approved several routine items including a claim disallowance, revised property values for public auction, carry forward funds resolution, and a capital assets threshold policy change. The committee also received introductions from new healthcare consultants National Insurance Services and heard detailed financial updates on 2025 year-end closing and 2026 budget status.",
    agenda: [
      { time:"0:00", item:"Claim disallowance - Mercedes Holmes" },
      { time:"2:36", item:"Revised property values for parcels for public auction" },
      { time:"5:00", item:"Resolution to approve carry forward funds" },
      { time:"11:24", item:"Resolution to amend capital assets threshold policy" },
      { time:"12:18", item:"Introduction of healthcare consultants - National Insurance Services" },
      { time:"37:15", item:"Audited 2025 year end fiscal update" },
      { time:"55:03", item:"2026 year to date budget update" },
      { time:"57:30", item:"Finance Department quarterly update" },
      { time:"1:08:35", item:"County Treasurer quarterly update" },
      { time:"1:36:30", item:"Announcements and adjournment" },
    ],
    discussions: [
      { item:"Claim disallowance - Mercedes Holmes", body:"Corporation Counsel presented a claim received December 5th from Mercedes Holmes relating to the death of her 3-year-old child Zalen Bernett, who was in a treatment foster care home licensed through another agency in Dunn County. Law enforcement and social service investigations found no wrongdoing and death was determined to be natural causes. Based on evaluation from insurance carrier Wimik, no liability was found on Marathon County's part. Chair Gibbs moved to disallow the claim per insurance carrier recommendation. Motion passed unanimously." },
      { item:"Revised property values for public auction", body:"Staff presented two parcels that failed to sell twice on Wisconsin Surplus because bids didn't reach appraised values. For 529 Mullen Street, requested revised minimum of $9,000; for 738 South 3rd Avenue, $7,500. Chair Gibbs noted one bidder made an error and asked if they get banned - staff confirmed non-paying bidders are marked and cannot bid on future auctions. Motion by Chair Gibbs passed unanimously." },
      { item:"Resolution to approve carry forward funds (R20-2026)", body:"Finance Director Sam presented program revenues for multi-year projects with restricted funds not budgeted in 2026. Notable items included veterans relief fund replenishment (providing approximately 3 years of funding), redacted records funds for Register of Deeds, and $142,731 for administration special projects including $75,000 for homelessness contract. Vice Chair Marshall asked about the redacted records fund purpose; staff will research and report back. Motion by Chair Gibbs passed unanimously." },
      { item:"Capital assets threshold policy amendment", body:"Finance Director explained the current $5,000 threshold for capitalizing assets was set following 2006 GFOA guidance. Proposal increases threshold from $5,000 to $10,000 for general assets while keeping infrastructure at $50,000. Supervisor Hart moved to approve and forward to full county board. Motion passed unanimously." },
      { item:"Introduction of National Insurance Services", body:"HR Director Candace introduced NIS representatives who won the healthcare consulting RFP. Paul Keefer (28 years experience) and Jordan Stanley presented their team and approach. They are evaluating the near-site ATA clinic, reviewing fully insured vs self-insured funding models, and focusing on data-driven strategies. Vice Chair Marshall asked about cost comparisons with other employers and strategies to reduce emergency room use. Chair Gibbs discussed evaluation processes for insurance models and risk tolerance regarding self-insurance. NIS indicated they will provide regular updates to the committee." },
      { item:"2025 year end fiscal update", body:"Finance Director Sam provided detailed department-by-department review of unaudited year-end figures. Notable items included: TID closure check of $257,238 from City of Wausau, unclaimed property of $222,752 from state, approximately $2 million in sales tax, opioid fund cash at $2.2 million with $3.49 million in future settlements expected. Parks fund ice revenue increased $70,000. ARPA funds nearly exhausted with $800,000+ in interest to be moved. Capital improvements and highway fund still being reconciled." },
      { item:"Finance Department quarterly update", body:"Sam reported welcoming a new systems financial analyst for payroll, making full staff since mid-December. Team completed W-2 processing including complex 'big beautiful bill' overtime tax calculations, processed 1099s, conducted random cash audits (all successful), and began quarterly closeouts with departments. First quarter 2026 will close May 31st with monthly closeouts thereafter. Administrator Lance publicly thanked Sam and her team for extraordinary work during year-end close, particularly handling legislative changes to overtime taxation." },
      { item:"County Treasurer update", body:"Treasurer Connie reported on tax collections, sending 1,582 delinquent tax notices (down from 1,786 last year), monitoring eviction hearings and sheriff sales. Significant discussion occurred about municipal treasurer training needs, lottery credit processing challenges, and receipt errors. Supervisor Lumer asked about delinquency trends and resources for struggling taxpayers. Payment agreements were discontinued due to high default rates. Administrator Lance clarified the eviction process relates specifically to county tax deed proceedings, not general evictions, and praised efforts that have improved outcomes for homeowners." },
    ],
    publicComment: "No public comment was offered.",
    actionItems: [
      "Disallowed claim of Mercedes Holmes",
      "Approved revised minimum sale prices of $9,000 for 529 Mullen Street and $7,500 for 738 South 3rd Avenue parcels",
      "Approved Resolution R20-2026 for carry forward funds to 2026 budget",
      "Approved capital assets threshold policy amendment increasing threshold from $5,000 to $10,000 for county board consideration",
      "Research Register of Deeds redacted records fund purpose and potential for fund release or repurposing",
      "National Insurance Services to provide healthcare cost updates before budget assumptions development in early summer",
      "Finance to bring fund balance surplus amount to next meeting after capital assets reconciliation",
      "Bring recommendation to increase Social Services reserve account above current $400,000",
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
    overview: "Based on the published agenda, the Village of Weston Board of Trustees was scheduled to meet on April 21, 2026 to address multiple infrastructure reconstruction projects with preliminary assessments, consider increasing park impact fees, review street maintenance and plow truck replacement bids, and handle annual license renewals. The meeting was also set to include closed sessions regarding litigation from a funeral home and right-of-way purchases for a road intersection project.",
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
      { time:"N\/A", item:"Closed Session: Notice of Claim for Rescission and Recovery of Unlawful Taxes – Ascent Funeral Home" },
      { time:"N\/A", item:"Closed Session: Appraisals and Right-of-Way Purchases for Alderson St and Jelinek Ave Intersection Project" },
    ],
    discussions: [
      { item:"Ordinance 26-008 Amending Chapter 66 Solid Waste", body:"The Board was scheduled to consider an amendment to Chapter 66 of the Village code regarding solid waste regulations. The specific changes to be addressed were not detailed in the agenda." },
      { item:"Preliminary Assessment Resolutions for Street Reconstructions", body:"The Board was set to review three preliminary assessment resolutions for major street reconstruction projects: Jelinek and Alderson, Bloedel Ave, and Concord Ave with Bayberry St. These resolutions were expected to initiate the special assessment process for affected property owners." },
      { item:"Kennedy Park Renovation and Capital Campaign Update", body:"The Board was scheduled to receive a quarterly update on the Kennedy Park renovation project and its associated capital campaign. This was designated as a discussion-only item with no action expected." },
      { item:"Termination of Development Agreement – ABC Weston, LLC", body:"The Board was set to consider Resolution 2026-013 authorizing termination of a development agreement for a second building with ABC Weston, LLC at 3200 Schofield Avenue. The reasons for the proposed termination were not specified in the agenda." },
      { item:"Park and Recreation Impact Fees Increase", body:"The Board was expected to consider increasing park and recreation impact fees based on recommendations from the Plan Commission and Parks & Recreation Committee. This could affect development costs for new construction in the Village." },
      { item:"2026 Street Maintenance Bid Results", body:"The Board was scheduled to review and potentially act on bid results for multiple street maintenance activities including crack sealing, gilsonite sealing, chip sealing, asphalt overlays, and concrete repairs." },
      { item:"Replacement Plow Trucks #9 and #10", body:"The Board was set to consider the purchase of two replacement plow trucks for the Village fleet. Details regarding costs or specifications were not included in the agenda." },
      { item:"Well #1 Rehabilitation", body:"The Board was scheduled to discuss and potentially take action on rehabilitation of Well #1, a municipal water supply infrastructure item." },
      { item:"Sanitary Sewer Inflow and Infiltration Study", body:"The Board was expected to consider a study examining inflow and infiltration issues in the Village's sanitary sewer system. Such studies typically identify where groundwater or stormwater enters sewer lines." },
      { item:"Bloedel Ave Reconstruction Bid Results", body:"The Board was scheduled to review bid results for the Bloedel Avenue reconstruction project, which is also subject to one of the preliminary assessment resolutions on the agenda." },
      { item:"Alderson St and Jelinek Ave Intersection Project Bid Results", body:"The Board was set to review bid results for the Alderson Street and Jelinek Avenue intersection project. Related right-of-way purchases were scheduled to be discussed in closed session." },
      { item:"Graphic Master Plan for Machmueller Park", body:"The Board was scheduled to consider a graphic master plan for Machmueller Park, which would guide future development and improvements at the facility." },
      { item:"Closed Session: Ascent Funeral Home Tax Claim", body:"The Board was set to confer with legal counsel in closed session regarding litigation strategy related to a notice of claim for rescission and recovery of unlawful taxes filed by Ascent Funeral Home and Spiritual Center, Inc." },
    ],
    publicComment: "Public comment period was included on the agenda, allowing persons to address the Board for up to three minutes on non-agenda items, with options to submit comments in advance or participate via Zoom.",
    actionItems: [
      "Scheduled to vote on Ordinance 26-008 amending solid waste regulations",
      "Expected to consider three preliminary assessment resolutions for street reconstruction projects",
      "Scheduled to vote on Resolution 2026-013 terminating ABC Weston, LLC development agreement",
      "Expected to consider increasing park and recreation impact fees",
      "Scheduled to vote on 2026 street maintenance contracts based on bid results",
      "Expected to consider purchase of replacement plow trucks #9 and #10",
      "Scheduled to vote on Well #1 rehabilitation",
      "Expected to consider sanitary sewer inflow and infiltration study",
      "Scheduled to vote on Bloedel Ave reconstruction contract",
      "Expected to consider Alderson St and Jelinek Ave intersection project contract",
      "Scheduled to vote on multiple annual license renewals for 2026-2027 term",
      "Expected to consider possible action on closed session items regarding tax claim litigation and right-of-way purchases",
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
    overview: "Based on the published agenda, the Village of Weston Parks and Recreation Committee was scheduled to meet on April 27, 2026 to receive updates on Kennedy Park, playground improvements, and the Aquatic Center, as well as consider action on ice rink operations and user agreements. This meeting was significant for residents interested in recreational facility developments and park operations in the community.",
    agenda: [
      { time:"4:00 p.m.", item:"Approval of minutes from the previous meeting: March 23, 2026" },
      { time:"N\/A", item:"Public Comments" },
      { time:"N\/A", item:"Written Comments" },
      { time:"N\/A", item:"Kennedy Update" },
      { time:"N\/A", item:"Playground Update" },
      { time:"N\/A", item:"Aquatic Center Update" },
      { time:"N\/A", item:"Discussion and\/or possible action on the components of operations for the ice rink at Kennedy Park" },
      { time:"N\/A", item:"Discussion and\/or possible action on the User Agreements" },
    ],
    discussions: [
      { item:"Kennedy Update", body:"Staff was scheduled to provide an educational presentation and report on Kennedy Park. This was expected to include updates on the ongoing Kennedy Park renovation project that has been discussed at previous meetings." },
      { item:"Playground Update", body:"The committee was set to receive an update on playground-related matters. This may have included information on playground equipment installations or repairs that have been ongoing topics of community interest." },
      { item:"Aquatic Center Update", body:"Staff was scheduled to present information regarding the Aquatic Center. This report was expected to inform committee members on the status of aquatic facility operations or developments." },
      { item:"Ice Rink Operations at Kennedy Park", body:"The committee was scheduled to discuss and potentially take action on operational components for the ice rink at Kennedy Park. Previous meeting minutes indicate community interest in ice rink attendance and operation costs." },
      { item:"User Agreements", body:"The committee was expected to consider discussion and possible action on User Agreements. This item may involve agreements governing use of parks and recreation facilities by community members or organizations." },
    ],
    publicComment: "Public Comments and Written Comments were both included on the agenda as separate items.",
    actionItems: [
      "Scheduled to vote on approval of March 23, 2026 meeting minutes",
      "Expected to consider possible action on ice rink operations at Kennedy Park",
      "Expected to consider possible action on User Agreements",
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
    overview: "Based on the published agenda, the Wausau School District Board of Education's Committee of the Whole meeting was scheduled to address several action items including approval of a nutrition purchasing cooperative agreement, facility fee amendments for artificial fields, and a significant policy update covering approximately 70 policies. The board was also expected to receive updates on the referendum budget and recognize Stettin Elementary through the Excellence in Action presentation.",
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
      { item:"Excellence in Action: Stettin Elementary", body:"The board was scheduled to recognize Stettin Elementary as part of the district's Excellence in Action program, which highlights achievements and best practices at individual schools." },
      { item:"Wisconsin School Nutrition Purchasing Cooperative Agreement (WiSNP)", body:"In an estimated 5-minute presentation, the district was expected to request board approval for continued membership in the Wisconsin School Nutrition Purchasing Cooperative for the 2026-2027 school year. The Nutrition Service Department currently belongs to this co-op group which requires member districts to present the resolution to their boards." },
      { item:"Facility Fees", body:"Ryan Urmanski, Director of Buildings and Grounds, was scheduled to present information in an estimated 10-minute presentation to amend the current Wausau School District Facility Use Fee Schedule. The proposed changes were expected to reflect costs for use of artificial fields and field lighting for requested events, with immediate implementation requested if approved." },
      { item:"Referendum Budget Update", body:"Elizabeth Channel, Interim Assistant Superintendent of Operations, was scheduled to share an update on the status of the Referendum Budget in an estimated 10-minute presentation." },
      { item:"NEOLA UPDATE", body:"In an estimated 20-minute presentation, the committee was scheduled to review proposed changes to approximately 70 district policies across four categories: general policy updates, school support organization policies, technical corrections, and Act 57 related policies. The changes ranged from small technical corrections to more lengthy substantive revisions, covering topics including artificial intelligence, cell phones, academic honesty, student fund-raising, child abuse and neglect reporting, and board governance." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Board was expected to vote on approval of meeting minutes from February 23, 2026",
      "Action was requested for continued membership in the Wisconsin School Nutrition Purchasing Cooperative (WiSNP) for the 2026-2027 school year",
      "Action was requested to amend the Facility Use Fee Schedule for artificial fields and field lighting with immediate implementation",
      "Action was requested for approval of NEOLA policy updates covering general policies, school support organization policies, technical corrections, and Act 57 related policies",
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
    overview: "Based on the published agenda, the Wausau School District Board of Education was scheduled to hold a public meeting on April 13, 2026, with a single agenda item focused on verifying school board election results. This procedural meeting appears to have been convened specifically to certify the outcomes of a recent school board election.",
    agenda: [
      { time:"N\/A", item:"Verify School Board Election Results" },
    ],
    discussions: [
      { item:"Verify School Board Election Results", body:"The Board was scheduled to review and verify the results of the school board election. This procedural item was expected to formally confirm the election outcomes and certify the winners of contested board seats." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Board was expected to vote on verification and certification of school board election results",
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
    overview: "Based on the published agenda, this special meeting of the Wausau School District Board of Education was scheduled to convene in closed session to hold a pupil expulsion hearing. The Board was expected to deliberate privately and potentially take action on the expulsion matter, with provisions to reconvene in open session if further action was necessary.",
    agenda: [
      { time:"N\/A", item:"Call To Order" },
      { time:"N\/A", item:"Closed Session - Pupil Expulsion Hearing pursuant to s. 19.85(1)(a), (f), and (g) and s. 118.125 of Wisconsin Statutes" },
      { time:"N\/A", item:"Adjournment" },
    ],
    discussions: [
      { item:"Closed Session - Pupil Expulsion Hearing", body:"The Board was scheduled to convene in closed session pursuant to Wisconsin Statutes s. 19.85(1)(a), (f), and (g), as well as s. 118.125, to hold a pupil expulsion hearing. The Board was expected to deliberate privately at the conclusion of the hearing and potentially take action in closed session if necessary and\/or appropriate. Following the closed session, the Board was scheduled to reconvene into open session and potentially take further action." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Board was expected to vote on whether to convene in closed session for the expulsion hearing",
      "Board was expected to deliberate and potentially take action on the pupil expulsion matter",
      "Board was expected to vote on reconvening into open session",
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
    overview: "Based on the published agenda, the Wausau School District Board of Education's April 13, 2026 regular meeting was scheduled to address several significant items including a 10-Year Capital Improvement Plan presentation, property sale fund transfers, multiple athletic co-op agreements, and a comprehensive NEOLA policy update covering over 60 policies. The board was also expected to recognize excellence at WAVE and South Mountain Elementary, canvass election results, and consider facility fee schedule changes for artificial fields.",
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
      { time:"N\/A", item:"New Business - East\/Newman JV Baseball Co Op" },
      { time:"N\/A", item:"New Business - Wisconsin School Nutrition Purchasing Cooperative Agreement" },
      { time:"N\/A", item:"New Business - Facility Fees" },
      { time:"N\/A", item:"New Business - NEOLA Policy Update" },
      { time:"N\/A", item:"Open Forum" },
      { time:"N\/A", item:"Request for Closed Session" },
      { time:"N\/A", item:"Adjourn" },
    ],
    discussions: [
      { item:"Excellence in Action: WAVE", body:"The board was scheduled to recognize achievements at WAVE as part of the Excellence in Action program highlighting district accomplishments." },
      { item:"Excellence in Action: South Mountain Elementary", body:"South Mountain Elementary was scheduled to be recognized through the Excellence in Action program, celebrating school achievements within the district." },
      { item:"Referendum Budget Update", body:"Elizabeth Channel, Assistant Superintendent of Operations, was expected to provide a brief 1-minute update on the status of the Referendum Budget, following up on information shared at the March Committee of the Whole meeting." },
      { item:"Transfer Funds to Fund 46", body:"Elizabeth Channel, Assistant Superintendent of Operations, was scheduled to present a 5-minute proposal to move revenue generated from three property sales to Fund 46 for future capital improvements. Action was requested from the board." },
      { item:"Recommendation for 2026-27 Capital Projects", body:"Ryan Urmanski, Director of Buildings and Grounds, was expected to deliver a 15-minute presentation on the 10-Year Capital Improvement Plan for district facilities, with action requested from the board." },
      { item:"Boys and Girls LaCrosse Co-Op", body:"Jon Tomski, BJ Brandt, and Darci Mick Beversdorf were scheduled to present Boys and Girls LaCrosse Co-Ops for board consideration during a 5-minute presentation. Signature pages from both Wausau West and Wausau East were included in the meeting materials." },
      { item:"Alpine Ski Co-Op", body:"Jon Tomski, BJ Brandt, and Darci Mick Beversdorf were expected to present the Alpine Skiing Co-Op for board consideration in a 5-minute presentation, covering the 2026-2028 period." },
      { item:"East\/Newman JV Baseball Co Op", body:"A 5-minute informational item was scheduled regarding Wausau East entering a Co-Op agreement with Newman for JV baseball, which would allow for a full JV\/JV2 season. The agenda noted no official action was needed." },
      { item:"Wisconsin School Nutrition Purchasing Cooperative Agreement", body:"The district's Nutrition Service Department was expected to request approval for continued membership in the Wisconsin School Nutrition Purchasing Cooperative (WiSNP Co-op) for the 2026-2027 school year in a 2-minute presentation." },
      { item:"Facility Fees", body:"Ryan Urmanski, Director of Buildings and Grounds, was expected to seek board action on amending the Wausau School District Facility Use Fee Schedule to reflect costs for use of artificial fields and field lighting. If approved, changes would be effective immediately." },
      { item:"NEOLA Policy Update", body:"The board was scheduled to consider a comprehensive 10-minute policy update affecting over 60 policies across multiple categories, including board governance, student policies, financial procedures, school support organizations, technical corrections, and Act 57 related policies covering child abuse and neglect reporting requirements." },
      { item:"Closed Session - Non-renewal Contracts", body:"The board was expected to enter closed session pursuant to Wisconsin Statute 19.85(1)(c) to consider contracts for preliminary notice of non-renewal, with potential action upon reconvening in open session." },
    ],
    publicComment: "A public and student comment period was included on the agenda, providing opportunity for community input during the meeting.",
    actionItems: [
      "Board was expected to vote on approval of the Consent Agenda including appointments, separations, leaves of absence, retirements, meeting minutes, budget status report, board member salaries, canvassing statement, and donations",
      "Action was requested for transferring property sale revenue to Fund 46 for future capital improvements",
      "Action was requested for the 2026-27 Capital Projects recommendation based on the 10-Year Capital Improvement Plan",
      "Action was requested for Boys and Girls LaCrosse Co-Op agreements",
      "Action was requested for Alpine Ski Co-Op agreement for 2026-2028",
      "Action was requested for continued membership in the Wisconsin School Nutrition Purchasing Cooperative for 2026-2027",
      "Action was requested for amending the Facility Use Fee Schedule for artificial fields and lighting",
      "Action was requested for comprehensive NEOLA policy updates covering board governance, student policies, financial procedures, school support organizations, and Act 57 compliance",
      "Board was expected to consider contracts for preliminary notice of non-renewal in closed session",
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
    overview: "Based on the published agenda, this Special Meeting of the Wausau School District Board of Education was scheduled to address the annual organizational business of electing officers and appointing board members to various committees and liaison positions. The meeting was expected to include action items for selecting delegates to the 2027 Delegate Assembly, a representative to CESA 9, and members for multiple district committees including the Union Contract Negotiating Committee and Gifted and Talented Committee.",
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
      { item:"Election of Officers", body:"Cale Bushman was scheduled to serve as Secretary Pro Tem, with a report expected from the Deputy Clerk regarding the election of board officers. This organizational item was anticipated to establish board leadership positions for the coming term." },
      { item:"Elect Delegate and Alternate Delegate to 2027 Delegate Assembly", body:"The board was expected to elect a delegate and alternate delegate to represent the district at the 2027 Delegate Assembly scheduled for January 20-22, 2027. Action was requested on this item." },
      { item:"Elect Board Member Representative to CESA 9 Annual Convention", body:"The board was scheduled to elect a representative to attend the CESA 9 Annual Convention on August 3, 2026. This appointment would allow for district representation at the regional educational service agency's annual gathering." },
      { item:"Appoint Union Contract Negotiating Committee", body:"The board was expected to appoint members to serve on the Union Contract Negotiating Committee. This committee would be responsible for representing the board's interests in labor negotiations with district employee unions." },
      { item:"Appoint Gifted and Talented Committee Member", body:"The board was scheduled to appoint a board member to serve on the Gifted and Talented Committee, which oversees programming and policy related to gifted education in the district." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Board was expected to vote on electing a Delegate and Alternate Delegate to the 2027 Delegate Assembly",
      "Action was requested to elect a Board Member Representative to the CESA 9 Annual Convention",
      "Board was expected to appoint a member to the Wausau School Foundation",
      "Board was expected to appoint a Legislative Liaison",
      "Board was expected to appoint a WECAN Consortium Committee Member",
      "Board was expected to appoint members to the Union Contract Negotiating Committee",
      "Board was expected to appoint a Gifted and Talented Committee Member",
      "Board was expected to appoint a Liaison to the Marathon County Extension, Education, and Economic Development Committee",
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
    overview: "Based on the published agenda, the Wausau School District Board of Education's Committee of the Whole meeting on April 27, 2026 was scheduled to address fiscal planning matters including a 2026-27 budget reconciliation plan and a charter school contract renewal for WAMCS through 2031. The meeting was also expected to feature a quarterly legal expense report and recognition of Riverview Elementary through the Excellence in Action program.",
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
      { item:"Excellence in Action: Riverview Elementary", body:"Riverview Elementary was scheduled to be recognized through the district's Excellence in Action program. No additional details about the specific achievements or presentation were included in the agenda." },
      { item:"Legal Expense Summary for 3rd Quarter", body:"Elizabeth Channel, Assistant Superintendent of Operations, was scheduled to present a 5-minute summary report of all legal counsel expenses incurred during the third quarter of 2025-2026. The report was expected to be broken down by law firm and by type of legal advice sought, presented as a written report requiring no action." },
      { item:"2026-27 Budget Reconciliation Plan (Action Requested)", body:"Elizabeth Channel, Assistant Superintendent of Operations, was scheduled to present a 15-minute budget reconciliation plan for the 2026-27 fiscal year. The plan was described as being for budgeting purposes only, with action requested from the board." },
      { item:"Charter School Contract Renewal (Action Requested)", body:"Elizabeth Channel, WAMCS Head of School, was scheduled to present a 10-minute overview of the 2026-2031 charter contract for renewal. The board was expected to consider approving the updated WAMCS Charter Contract covering a five-year term." },
    ],
    publicComment: "A public and student comment period was included on the agenda.",
    actionItems: [
      "Board was expected to vote on approval of the 2026-27 Budget Reconciliation Plan",
      "Board was expected to vote on the WAMCS Charter School Contract Renewal for 2026-2031",
      "Board was expected to approve the minutes from the March 23, 2026 meeting",
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
    overview: "Based on the published agenda, this Regular Meeting of the Wausau School District Board of Education was scheduled to address potential litigation matters in closed session. The brief agenda focused primarily on confidential legal discussions, with the board expected to reconvene in open session afterward to take any necessary action.",
    agenda: [
      { time:"N\/A", item:"Call to Order" },
      { time:"N\/A", item:"Request for Closed Session Pursuant to State Statutes" },
      { time:"N\/A", item:"Preliminary Discussion Regarding Potential Litigation 19.85 (g)" },
      { time:"N\/A", item:"Reconvene in Open Session, to take further action if necessary and appropriate" },
      { time:"N\/A", item:"Adjourn" },
    ],
    discussions: [
      { item:"Preliminary Discussion Regarding Potential Litigation 19.85 (g)", body:"The board was scheduled to enter closed session under Wisconsin State Statute 19.85(g) to conduct preliminary discussions regarding potential litigation. This statute permits closed sessions for conferring with legal counsel concerning strategy in matters involving potential litigation." },
      { item:"Reconvene in Open Session", body:"Following the closed session discussion, the board was expected to reconvene in open session to take further action if necessary and appropriate based on the closed session deliberations." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Board was expected to potentially take action following closed session discussions regarding potential litigation",
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
    overview: "Based on the published agenda, this special meeting of the Wausau School District Board of Education was scheduled to convene in closed session to hold a pupil expulsion hearing. The board was expected to deliberate privately and potentially take action on the expulsion matter, with the possibility of reconvening in open session for further action if necessary.",
    agenda: [
      { time:"N\/A", item:"Call To Order" },
      { time:"N\/A", item:"Closed Session - Pupil Expulsion Hearing pursuant to s. 19.85(1)(a), (f), and (g), and s. 118.125 of Wisconsin Statutes" },
      { time:"N\/A", item:"Adjournment" },
    ],
    discussions: [
      { item:"Closed Session - Pupil Expulsion Hearing", body:"The Board of Education was scheduled to convene in closed session pursuant to Wisconsin Statutes sections 19.85(1)(a), (f), and (g), as well as s. 118.125, to hold a pupil expulsion hearing. The board was expected to deliberate privately at the conclusion of the hearing and may have taken action in closed session if necessary or appropriate. Following the closed session, the board was scheduled to potentially reconvene into open session for further action." },
    ],
    publicComment: "No public comment period was included on this agenda.",
    actionItems: [
      "Board was expected to vote on the pupil expulsion matter following the closed session hearing",
      "Action was requested for potential reconvening into open session and further action if necessary",
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
    badge: null,
    overview: "The Wausau Transit Commission met to consider several route changes, a federal safety legislation endorsement for bus operator protection, and a grant application. The agenda included discussion of H.R.6635 requiring safety doors on buses, changes to the A and I routes, a Summer School Route 4X, and Grant 5304 application, though specific vote outcomes were not recorded in the official records.",
    agenda: [
      { time:"N\/A", item:"Public comment on agenda items" },
      { time:"N\/A", item:"Consideration of the minutes of the 2\/19\/2026 meeting" },
      { time:"N\/A", item:"ATU - Bus operator safety and security, H.R.6635 endorsement letter" },
      { time:"N\/A", item:"A route change" },
      { time:"N\/A", item:"I route change" },
      { time:"N\/A", item:"Summer School bus Route 4X" },
      { time:"N\/A", item:"Apply for Grant 5304" },
      { time:"N\/A", item:"Director's Reports: GMV contract update, Feasibility Study update, WISGO Technology Demo" },
    ],
    discussions: [
      { item:"Consideration of minutes", body:"The minutes from the February 19, 2026 meeting were on the agenda for approval. Specific vote outcome not recorded in official records." },
      { item:"ATU - Bus operator safety and security", body:"The Commission considered signing a letter to congressional leaders in support of H.R.6635, which would require safety doors for all buses built 2 years after enactment. This item was on the agenda but specific vote outcome not recorded in official records." },
      { item:"A route change", body:"A change to the A route was on the agenda for discussion and possible action. Specific details and vote outcome not recorded in official records." },
      { item:"I route change", body:"A change to the I route was on the agenda for discussion and possible action. Specific details and vote outcome not recorded in official records." },
      { item:"Summer School bus Route 4X", body:"The Summer School bus Route 4X was on the agenda for discussion and possible action. Specific details and vote outcome not recorded in official records." },
      { item:"Apply for Grant 5304", body:"An application for Grant 5304 was on the agenda for discussion and possible action. Specific vote outcome not recorded in official records." },
      { item:"Director's Reports", body:"The Director provided updates on the GMV contract, Feasibility Study progress, and announced a WISGO Technology Demo scheduled for May 7th. These were informational items not requiring votes." },
    ],
    publicComment: "Public comment on agenda items was included on the agenda with the City of Wausau Public Comment Statement.",
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
    id: "xy5kzZNqLEI", source: "wausau",
    title: "Wausau Public Health & Safety Committee Meeting",
    date: "April 16, 2026", shortDate: "APR 16",
    committee: "Public Health & Safety", duration: "~1h",
    url: "https://www.youtube.com/watch?v=xy5kzZNqLEI",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2068/overview",
    isAgendaOnly: false,
    badge: null,
    overview: "The Public Health & Safety Committee approved all license applications including a Class I Special Event License for Wausau Summer Shindig with a recommendation for $16,000 in road-blocking equipment funding. The committee also received quarterly reports from the Police Department and Community Outreach Specialist, and thanked Chair Lisa Rasmussen for her leadership upon adjournment.",
    agenda: [
      { time:"N\/A", item:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement" },
      { time:"N\/A", item:"Consideration of the minutes of the preceding meeting(s) - March 23, 2026 Regular Public Health & Safety Committee Minutes" },
      { time:"N\/A", item:"Approval or denial of various license applications" },
      { time:"N\/A", item:"Wausau Police Department Quarter 1 2026 Report" },
      { time:"N\/A", item:"Tavern Activities Report from March 2026" },
      { time:"N\/A", item:"Community Outreach Specialist Report" },
    ],
    discussions: [
      { item:"March 23, 2026 Regular Public Health & Safety Committee Minutes", body:"Approved 5-0. Motion by Sarah Watson, seconded by Carol Lukens. All members present voted yes: Lou Larson, Carol Lukens, Sarah Watson, Lisa Rasmussen, and Becky McElhaney." },
      { item:"Approval or denial of various license applications", body:"The committee took three separate votes on license applications. First, licenses were approved as indicated by staff with exceptions for Theodore Davis and Wausau Summer Shindig. Second, the committee separately approved Theodore Davis for a New Bartender\/Operator License. Third, the Wausau Summer Shindig Class I Special Event License was approved with a recommendation to the Finance Committee to fund approximately $16,000 in road-blocking equipment." },
      { item:"Wausau Police Department Quarter 1 2026 Report", body:"The committee received a discussion item presenting the Police Department's first quarter 2026 report. No vote was required as this was an informational presentation." },
      { item:"Tavern Activities Report from March 2026", body:"The committee received the March 2026 Tavern Activities Report as a discussion item. No action was taken." },
      { item:"Community Outreach Specialist Report", body:"The committee received a report from the Community Outreach Specialist. This was a discussion item with no vote required." },
    ],
    publicComment: "Public comment was on the agenda as the first item.",
    actionItems: [
      "License applications approved as recommended by staff",
      "Theodore Davis approved for New Bartender\/Operator License",
      "Wausau Summer Shindig Class I Special Event License approved",
      "Recommendation forwarded to Finance Committee for approximately $16,000 in road-blocking equipment for Wausau Summer Shindig",
    ],
    civicItems: [
      { number:"1", name:"Public comment on agenda items and reading of the City of Wausau Public Comment Statement.", votes:[], docs:[], children:[] },
      { number:"2", name:"Consideration of the minutes of the preceding meeting(s).", votes:[{ motion:"approve", passed:true, initiator:"Sarah Watson", seconder:"Carol Lukens", yes:["Lou Larson", "Carol Lukens", "Sarah Watson", "Lisa Rasmussen", "Becky McElhaney "], no:[], abstain:[] }], docs:[], children:[
      { number:"a", name:"Regular Public Health & Safety Committee Minutes", votes:[], docs:[{ name:"PublicHealth&Safety_Regular_03232026_Minutes", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6778)" }], children:[] },
    ] },
      { number:"3", name:"Discussion and possible action.", votes:[], docs:[], children:[
      { number:"a", name:"Approval or denial of various license applications.", votes:[{ motion:"approve or deny licenses as indicated by staff with the exception of Theodore Davis and the Wausau Summer Shindig", passed:true, initiator:"Carol Lukens", seconder:"Sarah Watson", yes:["Lou Larson", "Carol Lukens", "Sarah Watson", "Lisa Rasmussen", "Becky McElhaney "], no:[], abstain:[] }, { motion:"approve the license of Theodore Davis for New Bartender\/Operator License", passed:true, initiator:"Sarah Watson", seconder:"Lou Larson", yes:["Lou Larson", "Carol Lukens", "Sarah Watson", "Lisa Rasmussen", "Becky McElhaney "], no:[], abstain:[] }, { motion:"approve the license of the Wausau Summer Shindig application for a Class I Special Event License with the recommendation to the Finance Committee to fund equipment to  block off roads with equipment at a cost of approximately $16,000", passed:true, initiator:"Lou Larson", seconder:"Sarah Watson", yes:["Lou Larson", "Carol Lukens", "Sarah Watson", "Lisa Rasmussen"], no:["Becky McElhaney "], abstain:[] }], docs:[{ name:"License List", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6805)" }], children:[] },
    ] },
      { number:"4", name:"Discussion.", votes:[], docs:[], children:[
      { number:"a", name:"Wausau Police Department Quarter 1 2026 Report.", votes:[], docs:[{ name:"Police Department Report Q1 2026", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6821)" }], children:[] },
      { number:"b", name:"Tavern Activities Report from ​March 2026.", votes:[], docs:[{ name:"March 2026 Tavern Report", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6722)" }], children:[] },
      { number:"c", name:"Community Outreach Specialist Report", votes:[], docs:[{ name:"April Public Health & Safety Committee Report", url:"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId=6773)" }], children:[] },
    ] },
      { number:"5", name:"Adjournment.", votes:[{ motion:"thank Lisa Rasmussen for her leadership and adjourn", passed:true, initiator:"Sarah Watson", seconder:"Carol Lukens", yes:["Lou Larson", "Carol Lukens", "Sarah Watson", "Lisa Rasmussen", "Becky McElhaney "], no:[], abstain:[] }], docs:[], children:[] },
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
  {
    id: "wDB0GrN754U", source: "wausau",
    title: "Wausau Board of Public Works Meeting Pt.1",
    date: "April 21, 2026", shortDate: "APR 21",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=wDB0GrN754U",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2298/overview",
    isAgendaOnly: false,
    badge: null,
    overview: "The Wausau Board of Public Works approved all agenda items unanimously, including recommendations for real estate services for two state highway projects, a pay estimate for lead service line replacement, and contractor licenses. Following closed session deliberations, the board approved a $2,338.87 subrogated insurance claim on behalf of Kara Blank.",
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
      { item:"April 14, 2026 Regular Board of Public Works Minutes", body:"The minutes from the April 14, 2026 meeting were approved. Qualifications for real estate services had been opened at that prior meeting." },
      { item:"Statement of Qualifications for Real Estate Services, STH 52 (East Wausau Avenue) Project ID 6999-00-23", body:"The board approved a recommendation for the Statement of Qualifications for real estate services related to the STH 52 (East Wausau Avenue) project. Qualifications were previously opened on April 14, 2026." },
      { item:"Statement of Qualifications for Real Estate Services, Bus. 51 (Grand Avenue) Project ID 6999-02-20", body:"The board approved a recommendation for the Statement of Qualifications for real estate services related to the Business 51 (Grand Avenue) project. Qualifications were previously opened on April 14, 2026." },
      { item:"Pay Estimate #26 with Community Infrastructure Partners for replacement of lead service lines", body:"The board approved Pay Estimate #26 with Community Infrastructure Partners for ongoing lead service line replacement work." },
      { item:"Portland Cement Concrete License: Potrykus Construction, LLC and Miron Construction Co., Inc.", body:"The board approved Portland Cement Concrete licenses for both Potrykus Construction, LLC and Miron Construction Co., Inc." },
      { item:"Bituminous Concrete Paving License: Miron Construction Co., Inc.", body:"The board approved a Bituminous Concrete Paving license for Miron Construction Co., Inc." },
      { item:"American Family Insurance subrogated claim", body:"Following closed session deliberations on claims, the board reconvened and approved 3-0 the American Family Insurance subrogated claim on behalf of Kara Blank in the amount of $2,338.87. Motion was moved by Vincent Bonino and seconded by MaryAnne Groat. Eric Lindman, MaryAnne Groat, and Vincent Bonino all voted yes." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Recommendation for real estate services qualifications for STH 52 project to advance",
      "Recommendation for real estate services qualifications for Bus. 51 project to advance",
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
    id: "x2IB7RgEXB4", source: "wausau",
    title: "Wausau Board of Public Works Meeting Pt.2",
    date: "April 21, 2026", shortDate: "APR 21",
    committee: "Board of Public Works", duration: "~1h",
    url: "https://www.youtube.com/watch?v=x2IB7RgEXB4",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2298/overview",
    isAgendaOnly: false,
    badge: null,
    overview: "The Wausau Board of Public Works approved all agenda items unanimously, including recommendations for real estate services qualifications for two state highway projects, a pay estimate for lead service line replacement, and contractor licenses. Following closed session deliberations, the board approved an American Family Insurance subrogated claim for $2,338.87.",
    agenda: [
      { time:"N\/A", item:"Consideration of the minutes of the April 14, 2026 Regular Board of Public Works Meeting" },
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
      { item:"Statement of Qualifications for Real Estate Services, STH 52 (East Wausau Avenue) Project ID 6999-00-23", body:"The board approved the recommendation for real estate services qualifications for the STH 52 project. Qualifications were opened on April 14, 2026. The motion passed." },
      { item:"Statement of Qualifications for Real Estate Services, Bus. 51 (Grand Avenue) Project ID 6999-02-20", body:"The board approved the recommendation for real estate services qualifications for the Business 51 project. Qualifications were opened on April 14, 2026. The motion passed." },
      { item:"Pay Estimate #26 with Community Infrastructure Partners for replacement of lead service lines", body:"The board approved Pay Estimate #26 for Community Infrastructure Partners' ongoing work replacing lead service lines in the city. The motion passed." },
      { item:"Portland Cement Concrete License: Potrykus Construction, LLC and Miron Construction Co., Inc.", body:"The board approved Portland cement concrete licenses for both Potrykus Construction, LLC and Miron Construction Co., Inc. The motion passed." },
      { item:"Bituminous Concrete Paving License: Miron Construction Co., Inc.", body:"The board approved a bituminous concrete paving license for Miron Construction Co., Inc. The motion passed." },
      { item:"American Family Insurance subrogated claim on behalf of Kara Blank", body:"Following closed session deliberations on claims, the board reconvened into open session and approved the American Family Insurance subrogated claim on behalf of Kara Blank in the amount of $2,338.87. The motion was moved by Vincent Bonino, seconded by MaryAnne Groat, and passed 3-0 with Eric Lindman, MaryAnne Groat, and Vincent Bonino voting yes." },
    ],
    publicComment: "Not indicated on agenda.",
    actionItems: [
      "Proceed with real estate services qualifications process for STH 52 (East Wausau Avenue) Project ID 6999-00-23",
      "Proceed with real estate services qualifications process for Bus. 51 (Grand Avenue) Project ID 6999-02-20",
      "Process Pay Estimate #26 payment to Community Infrastructure Partners for lead service line replacement",
      "Issue Portland Cement Concrete Licenses to Potrykus Construction, LLC and Miron Construction Co., Inc.",
      "Issue Bituminous Concrete Paving License to Miron Construction Co., Inc.",
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
    id: "WhyeLsSdJ7M", source: "wausau",
    title: "Wausau Plan Commission Meeting",
    date: "April 21, 2026", shortDate: "APR 21",
    committee: "Plan Commission", duration: "~1h",
    url: "https://www.youtube.com/watch?v=WhyeLsSdJ7M",
    docUrl: "https://wausauwi.portal.civicclerk.com/event/2106/overview",
    isAgendaOnly: false,
    badge: null,
    overview: "The Wausau Plan Commission approved all action items on the agenda, including a rezoning request for 230 E Thomas Street from Neighborhood Mixed-Use to Two-Flat Residential, a Conditional Use Permit for a personal storage facility at 218 South 4th Street, and the 2027 Comprehensive Plan Public Participation Plan draft. The commission also held a preliminary discussion on potential code amendments for data centers.",
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
      { item:"March 17, 2026 Regular Plan Commission Minutes", body:"The commission approved the minutes from the March 17, 2026 Regular Plan Commission meeting. The motion passed." },
      { item:"Rezoning 230 E Thomas Street from NMU to TF-10", body:"Following a public hearing, the commission approved the rezoning of 230 E Thomas Street from Neighborhood Mixed-Use to Two-Flat Residential zoning district. The motion passed." },
      { item:"Conditional Use Permit for 218 South 4th Street - Personal Storage Facility", body:"The commission approved the Conditional Use Permit for Dunwoody Storage to construct a personal storage facility at 218 South 4th Street in the Light Industrial Zoning District. The motion passed." },
      { item:"2027 Comprehensive Plan Public Participation Plan Draft", body:"The commission approved the City of Wausau 2027 Comprehensive Plan Public Participation Plan draft. The vote records indicate the item passed, with a subsequent vote to approve as amended also passing." },
      { item:"Preliminary code amendment discussion - data centers", body:"The commission held a preliminary discussion on potential code amendments related to data centers. This was a discussion item only with no action taken." },
    ],
    publicComment: "Public comment on agenda items was listed as the first item on the agenda.",
    actionItems: [
      "Rezoning of 230 E Thomas Street from NMU to TF-10 approved - proceeds to City Council for final action",
      "Conditional Use Permit for personal storage facility at 218 South 4th Street approved for Dunwoody Storage",
      "2027 Comprehensive Plan Public Participation Plan draft approved as amended",
      "Staff to continue work on data center code amendment for future consideration",
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
];

const SCHOOL_BOARD_UPCOMING = [
  { date:"2026-05-11", time:"5:00 PM", name:"Regular Board Meeting", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-05-25", time:"5:00 PM", name:"Education & Operations Committee", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-06-08", time:"5:00 PM", name:"Regular Board Meeting", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
  { date:"2026-06-22", time:"5:00 PM", name:"Education & Operations Committee", url:"https://meetings.boardbook.org/Public/Organization/1360", source:"school_board" },
];

const WAUSAU_UPCOMING = [
  { date:"2026-05-05", time:"11:00 AM", name:"Water Works Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2191/overview", source:"wausau" },
  { date:"2026-05-05", time:"2:00 PM", name:"Board of Public Works Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2331/overview", source:"wausau" },
  { date:"2026-05-05", time:"5:30 PM", name:"Economic Development Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1991/overview", source:"wausau" },
  { date:"2026-05-07", time:"8:00 AM", name:"Community Development Authority Finance Committee", url:"https://wausauwi.portal.civicclerk.com/event/2347/overview", source:"wausau" },
  { date:"2026-05-07", time:"9:00 AM", name:"Community Development Authority Board Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2349/overview", source:"wausau" },
  { date:"2026-05-07", time:"5:00 PM", name:"Sustainability, Energy & Environment Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2168/overview", source:"wausau" },
  { date:"2026-05-11", time:"7:30 AM", name:"Police & Fire Commission Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2147/overview", source:"wausau" },
  { date:"2026-05-11", time:"4:45 PM", name:"Human Resources Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2029/overview", source:"wausau" },
  { date:"2026-05-11", time:"4:45 PM", name:"Human Resources Committee", url:"https://wausauwi.portal.civicclerk.com/event/2295/overview", source:"wausau" },
  { date:"2026-05-12", time:"5:30 PM", name:"Finance Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2004/overview", source:"wausau" },
  { date:"2026-05-12", time:"6:30 PM", name:"Common Council Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1965/overview", source:"wausau" },
  { date:"2026-05-13", time:"4:00 PM", name:"Building Advisory Board Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2329/overview", source:"wausau" },
  { date:"2026-05-13", time:"6:00 PM", name:"Airport Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/1952/overview", source:"wausau" },
  { date:"2026-05-14", time:"5:15 PM", name:"Infrastructure & Facilities Committee Meeting", url:"https://wausauwi.portal.civicclerk.com/event/2043/overview", source:"wausau" },
];

const WESTON_UPCOMING = [
  { date:"2026-05-04", time:"", name:"Community, Life and Public Safety (CLPS) Committee", url:"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/_05042026-1912", source:"weston" },
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
