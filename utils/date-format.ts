export default function formatReadableDate(dateString: string | Date): string {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  // Get ordinal suffix (st, nd, rd, th)
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${day}${suffix} ${month}, ${year}`;
}


// time ago
export function timeAgo(dateString: string | Date): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000; // seconds

  if (diff < 60) return `${Math.floor(diff)} ${diff < 2 ? "sec" : "secs"} ago`;
  
  const mins = diff / 60;
  if (mins < 60) return `${Math.floor(mins)} ${mins < 2 ? "min" : "mins"} ago`;

  const hours = mins / 60;
  if (hours < 24) return `${Math.floor(hours)} ${hours < 2 ? "hr" : "hrs"} ago`;

  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)} ${days < 2 ? "day" : "days"} ago`;

  const weeks = days / 7;
  if (weeks < 4) return `${Math.floor(weeks)} ${weeks < 2 ? "wk" : "wks"} ago`;

  const months = days / 30;
  if (months < 12) return `${Math.floor(months)} ${months < 2 ? "mon" : "months"} ago`;

  const years = days / 365;
  return `${Math.floor(years)} ${years < 2 ? "yr" : "yrs"} ago`;
}
