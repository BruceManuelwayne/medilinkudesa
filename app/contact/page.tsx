import ContactUs from "@/components/conact";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">MediLink</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Inicio
            </a>
          </nav>
        </div>
      </header>

      {/* Contact Form Section */}
      <main className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">¿Te interesa MediLink?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Completa el formulario para unirte a nuestra lista de espera.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <ContactUs />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">MediLink</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Conectando pacientes con farmacias para un acceso seguro a medicamentos.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Producto</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Inicio
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground">© 2024 MediLink. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}