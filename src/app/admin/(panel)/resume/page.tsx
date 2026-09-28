import { AdminHeader } from "@/components/admin/AdminHeader";
import { ResumeForm } from "@/components/admin/ResumeForm";
import { requireAdmin } from "@/lib/admin-session";
import { getPortfolioForAdmin } from "@/lib/content";

export default async function ResumeAdminPage() {
  await requireAdmin();
  const { data, source, updatedAt } = await getPortfolioForAdmin();

  return (
    <>
      <AdminHeader
        title="Резюме"
        description="Навыки, образование и курсы — страница /resume и карточка «Journey»."
        source={source}
        updatedAt={updatedAt}
      />
      <ResumeForm initial={data.resume} />
    </>
  );
}
