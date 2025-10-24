import { useState } from "react";
import { Search, Users } from "lucide-react";
import { ContactCard } from "@/components/ContactCard";
import { AddContactDialog } from "@/components/AddContactDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

const Index = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Alice Johnson",
      phone: "+1 (555) 123-4567",
      email: "alice.johnson@example.com",
    },
    {
      id: "2",
      name: "Bob Smith",
      phone: "+1 (555) 234-5678",
      email: "bob.smith@example.com",
    },
    {
      id: "3",
      name: "Carol Williams",
      phone: "+1 (555) 345-6789",
      email: "carol.williams@example.com",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleAddContact = (newContact: Omit<Contact, "id">) => {
    const contact: Contact = {
      id: Date.now().toString(),
      ...newContact,
    };
    setContacts([contact, ...contacts]);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
    toast.success("Contact deleted");
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Contacts</h1>
              <p className="text-sm text-muted-foreground">
                Manage your contact list
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Search and Add Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-scale-in">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search contacts by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <AddContactDialog onAdd={handleAddContact} />
        </div>

        {/* Contacts Grid */}
        {filteredContacts.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="inline-flex p-4 bg-muted rounded-full mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {searchQuery ? "No contacts found" : "No contacts yet"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? "Try adjusting your search query"
                : "Add your first contact to get started"}
            </p>
            {!searchQuery && <AddContactDialog onAdd={handleAddContact} />}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                {...contact}
                onDelete={handleDeleteContact}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>{contacts.length} {contacts.length === 1 ? "contact" : "contacts"} total</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
