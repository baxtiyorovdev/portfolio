import { useEffect } from "react";

type Props = {
  title: string;
  description: string;
};

export default function Seo({ title, description }: Props) {
  useEffect(() => {
    document.title = title;

    let metaDescription = document.querySelector('meta[name="description"]');

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute("content", description);
  }, [description, title]);

  return null;
}
