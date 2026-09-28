import { AdminHeader } from "@/components/admin/AdminHeader";
import { HomeForm } from "@/components/admin/HomeForm";
import { requireAdmin } from "@/lib/admin-session";
import { getPortfolioForAdmin } from "@/lib/content";

export default async function HomeAdminPage() {
  await requireAdmin();
  const { data, source, updatedAt } = await getPortfolioForAdmin();

  return (
    <>
      <AdminHeader
        title="Главная"
        description="Карточки «My Stacks», «Solutions Suite» и «Workflow Highlights»."
        source={source}
        updatedAt={updatedAt}
      />
      <HomeForm
        initial={{ featuredStack: data.featuredStack, services: data.services, workflow: data.workflow }}
        skillNames={data.resume.skills.map((skill) => skill.name)}
      />
    </>
  );
}
