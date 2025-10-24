import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { useToast } from "../hooks/use-toast";
import { supabase } from "../integrations/supabase/client";
import {
  LogOut,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  Package,
  MapPin,
  FileText,
  MessageCircle,
  Loader2,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface Quote {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  from_city: string;
  from_country: string;
  to_city: string;
  to_country: string;
  moving_date: string;
  move_type: string;
  volume: number | null;
  message: string | null;
  status: string;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const [, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [internalNotes, setInternalNotes] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchQuotes();
    }
  }, [isAdmin]);

  useEffect(() => {
    filterQuotes();
  }, [quotes, searchTerm, statusFilter]);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate("/auth");
        return;
      }

      setUser(session.user);

      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (roleError) {
        console.error("Error checking role:", roleError);
      }

      if (roleData) {
        setIsAdmin(true);
      } else {
        toast({
          title: "Accès refusé",
          description: "Vous n'avez pas les permissions d'accès admin",
          variant: "destructive",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from("quotes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setQuotes(data || []);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les demandes",
        variant: "destructive",
      });
    }
  };

  const filterQuotes = () => {
    let filtered = quotes;

    if (statusFilter !== "all") {
      filtered = filtered.filter((q) => q.status === statusFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (q) =>
          q.full_name.toLowerCase().includes(term) ||
          q.email.toLowerCase().includes(term) ||
          q.from_country.toLowerCase().includes(term) ||
          q.to_country.toLowerCase().includes(term)
      );
    }

    setFilteredQuotes(filtered);
  };

  const updateQuoteStatus = async (quoteId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("quotes")
        .update({ status: newStatus })
        .eq("id", quoteId);

      if (error) throw error;

      toast({
        title: "Statut mis à jour",
        description: "Le statut de la demande a été modifié",
      });

      fetchQuotes();
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
    }
  };

  const updateInternalNotes = async () => {
    if (!selectedQuote) return;

    try {
      const { error } = await supabase
        .from("quotes")
        .update({ internal_notes: internalNotes })
        .eq("id", selectedQuote.id);

      if (error) throw error;

      toast({
        title: "Notes enregistrées",
        description: "Les notes internes ont été mises à jour",
      });

      fetchQuotes();
      setSelectedQuote(null);
    } catch (error) {
      console.error("Error updating notes:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer les notes",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "contacted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "En Attente",
      contacted: "Contacté",
      confirmed: "Confirmé",
      completed: "Complété",
    };
    return labels[status] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Panneau d'Administration CIM</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">{quotes.length}</div>
              <p className="text-sm text-muted-foreground">Total Demandes</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">
                {quotes.filter((q) => q.status === "pending").length}
              </div>
              <p className="text-sm text-muted-foreground">En Attente</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {quotes.filter((q) => q.status === "contacted").length}
              </div>
              <p className="text-sm text-muted-foreground">Contactés</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {quotes.filter((q) => q.status === "confirmed").length}
              </div>
              <p className="text-sm text-muted-foreground">Confirmés</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 border-border">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom, email, pays..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les Statuts</SelectItem>
                  <SelectItem value="pending">En Attente</SelectItem>
                  <SelectItem value="contacted">Contacté</SelectItem>
                  <SelectItem value="confirmed">Confirmé</SelectItem>
                  <SelectItem value="completed">Complété</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Quotes List */}
        <div className="space-y-4">
          {filteredQuotes.length === 0 ? (
            <Card className="border-border">
              <CardContent className="py-12 text-center text-muted-foreground">
                Aucune demande trouvée
              </CardContent>
            </Card>
          ) : (
            filteredQuotes.map((quote) => (
              <Card key={quote.id} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-foreground">{quote.full_name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(quote.status)}`}>
                          {getStatusLabel(quote.status)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {quote.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {quote.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(quote.moving_date).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Select
                        value={quote.status}
                        onValueChange={(value) => updateQuoteStatus(quote.id, value)}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">En Attente</SelectItem>
                          <SelectItem value="contacted">Contacté</SelectItem>
                          <SelectItem value="confirmed">Confirmé</SelectItem>
                          <SelectItem value="completed">Complété</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedQuote(quote);
                          setInternalNotes(quote.internal_notes || "");
                        }}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Détails
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Départ</p>
                      <p className="text-sm font-medium text-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {quote.from_city}, {quote.from_country}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Arrivée</p>
                      <p className="text-sm font-medium text-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {quote.to_city}, {quote.to_country}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Volume</p>
                      <p className="text-sm font-medium text-foreground flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        {quote.volume ? `${quote.volume} m³` : "Non spécifié"}
                      </p>
                    </div>
                  </div>

                  {quote.message && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Message</p>
                      <p className="text-sm text-foreground">{quote.message}</p>
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    <a href={`mailto:${quote.email}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Envoyer Email
                      </Button>
                    </a>
                    <a
                      href={`https://wa.me/${quote.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>

      {/* Quote Detail Dialog */}
      <Dialog open={!!selectedQuote} onOpenChange={() => setSelectedQuote(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de la Demande</DialogTitle>
          </DialogHeader>
          {selectedQuote && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nom Complet</Label>
                  <p className="text-sm text-foreground">{selectedQuote.full_name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-sm text-foreground">{selectedQuote.email}</p>
                </div>
                <div>
                  <Label>Téléphone</Label>
                  <p className="text-sm text-foreground">{selectedQuote.phone}</p>
                </div>
                <div>
                  <Label>Type de Déménagement</Label>
                  <p className="text-sm text-foreground">{selectedQuote.move_type}</p>
                </div>
                <div>
                  <Label>Date Souhaitée</Label>
                  <p className="text-sm text-foreground">
                    {new Date(selectedQuote.moving_date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <div>
                  <Label>Volume</Label>
                  <p className="text-sm text-foreground">
                    {selectedQuote.volume ? `${selectedQuote.volume} m³` : "Non spécifié"}
                  </p>
                </div>
              </div>

              <div>
                <Label>Notes Internes</Label>
                <Textarea
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Ajoutez des notes internes..."
                  rows={4}
                />
              </div>

              <Button onClick={updateInternalNotes} variant="hero" className="w-full">
                Enregistrer les Notes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
