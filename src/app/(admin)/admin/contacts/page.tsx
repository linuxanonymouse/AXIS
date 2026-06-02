import { prisma } from "@/lib/prisma";

export default async function ContactsPage() {
  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Contacts</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {contacts.map((contact) => (
          <div key={contact.id} style={{ padding: "1.5rem", border: "1px solid #333", borderRadius: "8px", backgroundColor: "#111" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{contact.name} - {contact.organization}</h3>
              <span style={{ color: "#888" }}>{new Date(contact.createdAt).toLocaleDateString()}</span>
            </div>
            <p style={{ marginBottom: "0.5rem" }}><strong>Email:</strong> {contact.email}</p>
            <p style={{ color: "#ccc" }}>{contact.brief}</p>
          </div>
        ))}
        {contacts.length === 0 && (
          <p style={{ color: "#888" }}>No contacts found.</p>
        )}
      </div>
    </div>
  );
}
