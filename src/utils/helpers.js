import { differenceInDays, isToday, isTomorrow, isYesterday } from "date-fns";

export default function formatDeadlineDate(deadline) {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  // Normalize dates to start of the day (00:00) to avoid time discrepancies
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const deadlineStart = new Date(
    deadlineDate.getFullYear(),
    deadlineDate.getMonth(),
    deadlineDate.getDate()
  );

  if (isToday(deadlineStart)) {
    return "Today";
  }

  if (isYesterday(deadlineStart)) {
    return "Yesterday";
  }

  if (isTomorrow(deadlineStart)) {
    return "Tomorrow";
  }

  const diffInDays = differenceInDays(deadlineStart, todayStart);

  if (diffInDays < 0) {
    return `${Math.abs(diffInDays)} days ago`;
  }

  if (diffInDays > 0 && diffInDays < 7) {
    return `In ${diffInDays} days`;
  }

  if (diffInDays === 7) {
    return `in a week`;
  }

  return deadline;
}
