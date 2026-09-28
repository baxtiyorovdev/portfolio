import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProfileForm } from "@/components/admin/ProfileForm";
import { requireAdmin } from "@/lib/admin-session";
import { getPortfolioForAdmin } from "@/lib/content";

export default async function ProfilePage() {
  await requireAdmin();
  const { data, source, updatedAt } = await getPortfolioForAdmin();

  return (
    <>
      <AdminHeader
        title="Профиль"
        description="Карточка профиля на главной, резюме, контакты и соцсети."
        source={source}
        updatedAt={updatedAt}
      />
      <ProfileForm initial={data.about} />
    </>
  );
}
