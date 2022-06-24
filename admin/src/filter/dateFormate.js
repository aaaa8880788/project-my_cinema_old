import dayjs from "dayjs";

export function date(val, b) {
  let data = dayjs(val).format(b);
  return data;
}