"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Shield,
  Clock,
  MapPin,
  Users,
  Stethoscope,
  Pill,
  Heart,
  Phone,
  Mail,
  Smartphone,
  CreditCard,
  Truck,
  BarChart3,
  FileText,
  Zap,
} from "lucide-react"

export default function MediLinkLanding() {
  const [activeView, setActiveView] = useState<"clientes" | "farmacias">("clientes")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">MediLink</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#inicio" className="text-muted-foreground hover:text-foreground transition-colors">
              Inicio
            </a>
            <a href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
              Servicios
            </a>
            <a href="#seguridad" className="text-muted-foreground hover:text-foreground transition-colors">
              Seguridad
            </a>
            <a href="#contacto" className="text-muted-foreground hover:text-foreground transition-colors">
              Contacto
            </a>
          </nav>
          <Button className="bg-primary hover:bg-primary/90">Comenzar</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="py-20 bg-gradient-to-br from-card to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Conectamos <span className="text-primary">pacientes</span> con{" "}
              <span className="text-secondary">farmacias</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              La primera plataforma digital en Argentina que facilita el acceso seguro a medicamentos recetados bajo
              supervisión profesional
            </p>

            {/* Large Toggle */}
            <div className="bg-card border border-border rounded-2xl p-2 inline-flex mb-12 shadow-lg">
              <button
                onClick={() => setActiveView("clientes")}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeView === "clientes"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                MediLink Para Cuidadores
              </button>
              <button
                onClick={() => setActiveView("farmacias")}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeView === "farmacias"
                    ? "bg-secondary text-secondary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                MediLink Para Farmacias
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Content Based on Toggle */}
      <section id="servicios" className="py-20">
        <div className="container mx-auto px-4">
          {activeView === "clientes" ? (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Para Pacientes y Cuidadores</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Gestiona tus medicamentos de forma segura y conveniente
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <Card className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Pill className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Recetas Digitales</CardTitle>
                    <CardDescription>Escanea y valida tus recetas médicas de forma instantánea</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Validación automática
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Compatible con todas las obras sociales
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <CardTitle>Stock en Tiempo Real</CardTitle>
                    <CardDescription>Encuentra farmacias cercanas con tus medicamentos disponibles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Geolocalización precisa
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Comparación de precios
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <Clock className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <CardTitle>Entrega Coordinada</CardTitle>
                    <CardDescription>
                      Retiro en farmacia o entrega a domicilio bajo supervisión profesional
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Horarios flexibles
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Seguimiento en tiempo real
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Features for Clients */}
              <div className="space-y-20">
                {/* Digital Prescriptions Feature */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <Badge className="bg-primary/10 text-primary mb-4">Recetas Digitales</Badge>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      Escanea tu receta y encuentra tu medicamento al instante
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      Nuestra tecnología de reconocimiento óptico valida automáticamente tus recetas médicas y verifica
                      la cobertura de tu obra social en segundos.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                          <Smartphone className="w-3 h-3 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Escaneo Inteligente</h4>
                          <p className="text-muted-foreground">
                            Reconoce automáticamente medicamentos, dosis y médico prescriptor
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center mt-1">
                          <Shield className="w-3 h-3 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Validación Instantánea</h4>
                          <p className="text-muted-foreground">
                            Verifica la autenticidad y vigencia de la receta médica
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mt-1">
                          <CreditCard className="w-3 h-3 text-accent-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Cobertura Automática</h4>
                          <p className="text-muted-foreground">
                            Calcula descuentos de obra social y prepagas al momento
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src="/smartphone-showing-prescription-scanning-app-inter.png"
                      alt="App escaneando receta médica"
                      className="rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>

                {/* Real-time Stock Feature */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="order-2 lg:order-1 relative">
                    <img
                      src="/map-interface-showing-nearby-pharmacies-with-medic.png"
                      alt="Mapa con farmacias cercanas"
                      className="rounded-2xl shadow-2xl"
                    />
                  </div>
                  <div className="order-1 lg:order-2">
                    <Badge className="bg-secondary/10 text-secondary mb-4">Búsqueda Inteligente</Badge>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      Encuentra el mejor precio cerca de ti
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      Nuestro sistema consulta en tiempo real el stock y precios de todas las farmacias cercanas,
                      mostrándote las mejores opciones según tu ubicación y cobertura.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center mt-1">
                          <MapPin className="w-3 h-3 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Geolocalización Precisa</h4>
                          <p className="text-muted-foreground">
                            Encuentra farmacias en un radio de hasta 10km de tu ubicación
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                          <BarChart3 className="w-3 h-3 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Comparación de Precios</h4>
                          <p className="text-muted-foreground">
                            Ve precios finales con descuentos aplicados antes de decidir
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mt-1">
                          <Clock className="w-3 h-3 text-accent-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Disponibilidad en Tiempo Real</h4>
                          <p className="text-muted-foreground">
                            Stock actualizado cada 5 minutos para evitar frustraciones
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coordinated Delivery Feature */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <Badge className="bg-accent/10 text-accent-foreground mb-4">Entrega Segura</Badge>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      Recibe tus medicamentos con supervisión profesional
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      Cada entrega es coordinada por un farmacéutico matriculado que garantiza el cumplimiento de todas
                      las normativas argentinas para medicamentos recetados.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mt-1">
                          <Truck className="w-3 h-3 text-accent-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Entrega a Domicilio</h4>
                          <p className="text-muted-foreground">Recibe en tu casa con horarios flexibles de 8 a 20hs</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                          <Stethoscope className="w-3 h-3 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Supervisión Farmacéutica</h4>
                          <p className="text-muted-foreground">
                            Cada dispensación supervisada por profesional matriculado
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center mt-1">
                          <MapPin className="w-3 h-3 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Seguimiento en Vivo</h4>
                          <p className="text-muted-foreground">Rastrea tu pedido desde la farmacia hasta tu puerta</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src="/delivery-person-with-medical-bag-delivering-prescr.png"
                      alt="Entrega de medicamentos a domicilio"
                      className="rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Para Farmacias</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Digitaliza tu farmacia y amplía tu alcance
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <Card className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-secondary" />
                    </div>
                    <CardTitle>Más Clientes</CardTitle>
                    <CardDescription>Conecta con pacientes que buscan tus medicamentos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Mayor visibilidad
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Nuevos canales de venta
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Gestión Simplificada</CardTitle>
                    <CardDescription>Automatiza la validación de recetas y gestión de stock</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Menos papeleo
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Control de inventario
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <Stethoscope className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <CardTitle>Cumplimiento Regulatorio</CardTitle>
                    <CardDescription>Mantén la supervisión profesional en cada dispensación</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        100% legal y seguro
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Trazabilidad completa
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Features for Pharmacies */}
              <div className="space-y-20">
                {/* Digital Platform Feature */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <Badge className="bg-secondary/10 text-secondary mb-4">Plataforma Digital</Badge>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      Amplía tu alcance sin salir de tu farmacia
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      Conecta con miles de pacientes que buscan medicamentos en tu zona. Nuestra plataforma te posiciona
                      automáticamente cuando tienes el stock que necesitan.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center mt-1">
                          <Users className="w-3 h-3 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Red de Pacientes</h4>
                          <p className="text-muted-foreground">Acceso a más de 50,000 usuarios activos en CABA y GBA</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                          <MapPin className="w-3 h-3 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Visibilidad Geolocalizada</h4>
                          <p className="text-muted-foreground">
                            Aparece automáticamente cuando pacientes buscan cerca tuyo
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mt-1">
                          <BarChart3 className="w-3 h-3 text-accent-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Análisis de Demanda</h4>
                          <p className="text-muted-foreground">Reportes de qué medicamentos se buscan más en tu zona</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src="/pharmacy-dashboard-showing-customer-connections--o.png"
                      alt="Dashboard de farmacia con conexiones de clientes"
                      className="rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>

                {/* Inventory Management Feature */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="order-2 lg:order-1 relative">
                    <img
                      src="/pharmacy-inventory-management-system-with-barcode-.png"
                      alt="Sistema de gestión de inventario farmacéutico"
                      className="rounded-2xl shadow-2xl"
                    />
                  </div>
                  <div className="order-1 lg:order-2">
                    <Badge className="bg-primary/10 text-primary mb-4">Gestión Inteligente</Badge>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      Automatiza tu inventario y validaciones
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      Nuestro sistema se integra con tu software de farmacia existente para mantener el stock
                      actualizado y validar recetas automáticamente.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                          <Zap className="w-3 h-3 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Sincronización Automática</h4>
                          <p className="text-muted-foreground">
                            Stock actualizado en tiempo real con tu sistema actual
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center mt-1">
                          <FileText className="w-3 h-3 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Validación Digital</h4>
                          <p className="text-muted-foreground">Verifica recetas automáticamente contra base ANMAT</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mt-1">
                          <BarChart3 className="w-3 h-3 text-accent-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Reportes Inteligentes</h4>
                          <p className="text-muted-foreground">
                            Análisis de ventas y tendencias para optimizar compras
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Regulatory Compliance Feature */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <Badge className="bg-accent/10 text-accent-foreground mb-4">Cumplimiento Total</Badge>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      Mantén el control profesional en cada dispensación
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      Nuestra plataforma garantiza que cada medicamento dispensado cumple con la Ley 16.463 y mantiene
                      la trazabilidad completa requerida por ANMAT.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mt-1">
                          <Stethoscope className="w-3 h-3 text-accent-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Supervisión Obligatoria</h4>
                          <p className="text-muted-foreground">
                            Cada dispensación requiere aprobación del farmacéutico
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                          <Shield className="w-3 h-3 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Trazabilidad Completa</h4>
                          <p className="text-muted-foreground">
                            Registro detallado de cada transacción para auditorías
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center mt-1">
                          <FileText className="w-3 h-3 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Documentación Automática</h4>
                          <p className="text-muted-foreground">
                            Genera automáticamente toda la documentación legal requerida
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src="/pharmacist-reviewing-digital-prescription-validati.png"
                      alt="Farmacéutico validando recetas digitales con cumplimiento regulatorio"
                      className="rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Regulatory Compliance Section */}
      <section id="seguridad" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-secondary text-secondary-foreground mb-4">Cumplimiento Regulatorio</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Seguridad y Confianza Garantizada</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cumplimos estrictamente con la normativa argentina para medicamentos recetados
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Ley 16.463</h3>
              <p className="text-sm text-muted-foreground">Cumplimiento total con la normativa de medicamentos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Supervisión Profesional</h3>
              <p className="text-sm text-muted-foreground">Farmacéutico en cada dispensación</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">ANMAT Aprobado</h3>
              <p className="text-sm text-muted-foreground">Disposición 4980/2005 cumplida</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Datos Protegidos</h3>
              <p className="text-sm text-muted-foreground">Máxima seguridad en información médica</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para revolucionar el acceso a medicamentos?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Únete a la plataforma que está transformando la experiencia farmacéutica en Argentina
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Registrar Farmacia
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Descargar App
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="py-16 bg-card border-t border-border">
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
                Conectando pacientes con farmacias para un acceso seguro a medicamentos en Argentina.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Producto</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Para Pacientes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Para Farmacias
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Seguridad
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Regulaciones
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacidad
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contacto</h4>
              <div className="space-y-2">
                <div className="flex items-center text-muted-foreground">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">contacto@medilink.com.ar</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">+54 11 1234-5678</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 MediLink. Todos los derechos reservados. Plataforma regulada bajo normativa ANMAT.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
