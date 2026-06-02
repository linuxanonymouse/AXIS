type ClickUpTaskInput = {
  name: string;
  description: string;
};

export async function createClickUpTask(input: ClickUpTaskInput) {
  const token = process.env.CLICKUP_API_TOKEN;
  const listId = process.env.CLICKUP_LIST_ID;
  if (!token || !listId) return null;

  const res = await fetch(
    `https://api.clickup.com/api/v2/list/${listId}/task`,
    {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: input.name,
        description: input.description,
        status: "to do",
        tags: ["axis-diagnostic"],
      }),
    }
  );

  if (!res.ok) return null;
  const data = (await res.json()) as { id?: string };
  return data.id ?? null;
}
