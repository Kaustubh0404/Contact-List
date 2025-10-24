import { Mail, Phone, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

interface ContactCardProps {
  id: string;
  name: string;
  phone: string;
  email: string;
  onDelete: (id: string) => void;
}

export const ContactCard = ({ id, name, phone, email, onDelete }: ContactCardProps) => {
  return (
    <Card className="group hover:shadow-[var(--shadow-hover)] transition-all duration-300 animate-fade-in">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">{name}</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className=" text-sm text-muted-foreground">
          <a className="flex items-center gap-2" href={`tel:${phone}`}>
          <Phone className="h-4 w-4 text-accent" />
          <span>{phone}</span>
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4 text-accent" />
          <span className="truncate">{email}</span>
        </div>
      </CardContent>
    </Card>
  );
};
