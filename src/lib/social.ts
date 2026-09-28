import { RiGithubFill, RiInstagramFill, RiMailFill, RiTelegram2Fill } from "react-icons/ri";
import type { About } from "@/types";
import { emailHref } from "./portfolio";

/** Social destinations shown in the Follow Me card, resume, contact page and footer. */
export function getSocialLinks(about: About) {
  return [
    { label: "GitHub", href: about.social.github, icon: RiGithubFill },
    { label: "Telegram", href: about.social.telegram, icon: RiTelegram2Fill },
    { label: "Instagram", href: about.social.instagram, icon: RiInstagramFill },
    { label: "Email", href: emailHref(about), icon: RiMailFill },
  ];
}
