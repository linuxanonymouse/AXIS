import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import InsightEditor from "../InsightEditor";

export default async function EditInsightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await prisma.insightArticle.findUnique({
    where: { id },
  });

  if (!article) notFound();

  return <InsightEditor initialData={article} />;
}
