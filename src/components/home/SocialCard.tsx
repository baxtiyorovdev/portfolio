import { RiGithubFill, RiInstagramFill, RiMailFill, RiRocket2Fill, RiTelegram2Fill } from "react-icons/ri";
import { BentoCard, CardHeader } from "@/components/bento/BentoCard";
import { LinkTile } from "@/components/bento/Primitives";
import { about, emailHref } from "@/lib/portfolio";

export const socialLinks = [
  { label: "GitHub", href: about.social.github, icon: RiGithubFill },
  { label: "Telegram", href: about.social.telegram, icon: RiTelegram2Fill },
  { label: "Instagram", href: about.social.instagram, icon: RiInstagramFill },
  { label: "Email", href: emailHref, icon: RiMailFill },
];

/** "Online Presence" (Figma Components 20–23). */
export function SocialCard() {
  return (
    <BentoCard
      area="social"
      aria-labelledby="social-title"
      className="gap-[30px] px-5 pb-[30px] pt-5 md:justify-between wide:gap-0 wide:pb-[18px]"
    >
      <CardHeader icon={RiRocket2Fill} label="Follow Me" title="Online Presence" id="social-title" />
      <ul className="flex flex-col gap-2">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <LinkTile
              href={link.href}
              icon={link.icon}
              label={link.label}
              ariaLabel={`${about.name} on ${link.label}`}
            />
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
