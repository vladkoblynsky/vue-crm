interface DateOptionsInterface {
  day: string | undefined;
  month: string | undefined;
  year: string | undefined;
  hour: string | undefined;
  minute: string | undefined;
  second: string | undefined;
}

export default function dateFilter(
  value: string,
  format: "date" | "time" | "datetime" = "date"
): string {
  const options: DateOptionsInterface = {
    day: undefined,
    month: undefined,
    year: undefined,
    hour: undefined,
    minute: undefined,
    second: undefined
  };
  if (format.includes("date")) {
    options.day = "2-digit";
    options.month = "long";
    options.year = "numeric";
  }
  if (format.includes("time")) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.second = "2-digit";
  }
  return new Intl.DateTimeFormat("ru-Ru", options).format(new Date(value));
}
