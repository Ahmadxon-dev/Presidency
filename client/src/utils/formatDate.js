const uzMonths = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentabr",
  "Oktabr",
  "Noyabr",
  "Dekabr"
];
const uzWeekdays = [
  "Yakshanba",  // 0
  "Dushanba",   // 1
  "Seshanba",   // 2
  "Chorshanba", // 3
  "Payshanba",  // 4
  "Juma",       // 5
  "Shanba"      // 6
];

export default function formatUzDate(date) {
    const d = new Date(date)
    const weekDay = uzWeekdays[d.getDay()]
    const day = d.getDate()
    const month = uzMonths[d.getMonth()]
    const year = d.getFullYear()
    return `${weekDay}, ${day}-${month} ${year}`;
}
// console.log(formatUzDate("2025-12-01T00:00:00.000+00:00"));
