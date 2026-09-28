import type { IconType } from "react-icons";
import {
  RiBugLine,
  RiCodeBoxLine,
  RiCodeSSlashFill,
  RiLayout4Line,
  RiMagicFill,
  RiPlugLine,
  RiRocketLine,
  RiRouteLine,
  RiSearchEyeLine,
  RiSmartphoneLine,
  RiSpeedUpLine,
} from "react-icons/ri";
import type { ProcessIcon, ServiceIcon } from "@/types";

/** Icons selectable for services; `label` is shown in the admin picker. */
export const SERVICE_ICONS: Record<ServiceIcon, { icon: IconType; label: string }> = {
  code: { icon: RiCodeSSlashFill, label: "Код" },
  responsive: { icon: RiSmartphoneLine, label: "Адаптив" },
  layout: { icon: RiLayout4Line, label: "Макет" },
  api: { icon: RiPlugLine, label: "API" },
  speed: { icon: RiSpeedUpLine, label: "Скорость" },
  motion: { icon: RiMagicFill, label: "Анимация" },
};

/** Icons selectable for workflow steps. */
export const PROCESS_ICONS: Record<ProcessIcon, { icon: IconType; label: string }> = {
  discover: { icon: RiSearchEyeLine, label: "Исследование" },
  plan: { icon: RiRouteLine, label: "План" },
  build: { icon: RiCodeBoxLine, label: "Разработка" },
  test: { icon: RiBugLine, label: "Тесты" },
  launch: { icon: RiRocketLine, label: "Запуск" },
};
