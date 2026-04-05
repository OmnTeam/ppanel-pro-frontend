import { formatBytes } from "@workspace/ui/utils/formatting";
import { unitConversion } from "@workspace/ui/utils/unit-conversions";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@/stores/global";

type DisplayType = "currency" | "traffic" | "number" | "trafficSpeed";

interface DisplayProps<T> {
  value?: T;
  unlimited?: boolean;
  type?: DisplayType;
}

function normalizeNumericValue(value: string | number | undefined | null) {
  if (value === null || value === undefined || value === "") return 0;
  if (typeof value === "number") return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function Display<T extends string | number | undefined | null>({
  value = 0,
  unlimited = false,
  type = "number",
}: DisplayProps<T>): string {
  const { t } = useTranslation("components");
  const { common } = useGlobalStore();
  const { currency } = common;

  if (type === "currency") {
    const formattedValue = `${currency?.currency_symbol ?? ""}${unitConversion("centsToDollars", normalizeNumericValue(value))?.toFixed(2) ?? "0.00"}`;
    return formattedValue;
  }

  if (
    ["traffic", "trafficSpeed", "number"].includes(type) &&
    unlimited &&
    (value === 0 || value === null || value === undefined)
  ) {
    return t("unlimited");
  }

  if (type === "traffic") {
    const normalizedValue = normalizeNumericValue(value);
    return normalizedValue ? formatBytes(normalizedValue) : "0";
  }

  if (type === "trafficSpeed") {
    const normalizedValue = normalizeNumericValue(value);
    return normalizedValue ? `${formatBytes(normalizedValue).replace("B", "b")}ps` : "0";
  }

  if (type === "number") {
    return value !== null && value !== undefined ? value.toString() : "0";
  }

  return "0";
}
