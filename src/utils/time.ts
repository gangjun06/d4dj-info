import { format } from "date-fns";

export const formatTime = (time: number | Date) =>
  time > 4000000000000 ? "X" : format(time, "yy.MM.dd.");

export const formatTimeDetail = (time: number | Date) =>
  time > 4000000000000 ? "X" : format(time, "yy.MM.dd. hh:mm");
