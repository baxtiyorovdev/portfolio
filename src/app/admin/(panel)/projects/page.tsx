import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProjectsEditor } from "@/components/admin/ProjectsEditor";
import { requireAdmin } from "@/lib/admin-session";
import { getPortfolioForAdmin } from "@/lib/content";
import { getAllTechnologies } from "@/lib/portfolio";

export default async function ProjectsAdminPage() {
  await requireAdmin();
  const { data, source, updatedAt } = await getPortfolioForAdmin();

  return (
    <>
      <AdminHeader
        title="Проекты"
        description="Галерея на главной и страница /projects."
        source={source}
        updatedAt={updatedAt}
      />
      <ProjectsEditor initial={data.projects} techSuggestions={getAllTechnologies(data)} />
    </>
  );
}
