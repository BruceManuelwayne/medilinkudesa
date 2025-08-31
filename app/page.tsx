"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Play,
  ArrowRight,
  ArrowLeft,
  User,
  Plus,
  Camera,
  Search,
  Star,
  Package,
  Eye,
  TrendingUp,
  Globe,
  X,
  Banknote,
} from "lucide-react"

interface Profile {
  id: string
  name: string
  age: number
  obraSocial: string
  relationship: string
  prescriptions: Prescription[]
}

interface Prescription {
  id: string
  medication: string
  dosage: string
  doctor: string
  date: string
  status: "active" | "expired"
}

export default function MediLinkLanding() {
  const [activeView, setActiveView] = useState<"clientes" | "farmacias">("clientes")
  const [demoMode, setDemoMode] = useState<"landing" | "caregiver-demo" | "pharmacy-demo">("landing")

  const [caregiverStep, setCaregiverStep] = useState(1)
  const [caregiverData, setCaregiverData] = useState({
    name: "",
    email: "",
    phone: "",
    obraSocial: "",
    age: "",
    dni: "",
    address: "",
    birthDate: "",
    obraSocialCategory: "",
  })
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [newProfile, setNewProfile] = useState({
    name: "",
    age: "",
    obraSocial: "",
    relationship: "",
    dni: "",
    address: "",
    birthDate: "",
    obraSocialCategory: "",
  })

  const [pharmacyStep, setPharmacyStep] = useState(1)
  const [pharmacyData, setPharmacyData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    license: "",
    pharmacist: "",
  })

  const [selectedWeek, setSelectedWeek] = useState("2024-01-15")
  const [orderStatuses, setOrderStatuses] = useState<{ [key: string]: string }>({
    "ORD-001": "ready",
    "ORD-002": "validating",
    "ORD-003": "stock",
    "ORD-004": "ready",
    "ORD-005": "validating",
  })

  const [uploadedPrescription, setUploadedPrescription] = useState<string | null>(null)

  const [paymentMethod, setPaymentMethod] = useState("")
  const [pickupDay, setPickupDay] = useState("")
  const [pickupTime, setPickupTime] = useState("")
  const [deliveryMethod, setDeliveryMethod] = useState("")

  const [orderConfirmed, setOrderConfirmed] = useState(false)

  const [selectedProfileForPrescription, setSelectedProfileForPrescription] = useState(0)

  const handlePrescriptionUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedPrescription(e.target?.result as string)
        // Add sample prescriptions to first profile for demo
        if (profiles.length > 0) {
          const updatedProfiles = [...profiles]
          updatedProfiles[0].prescriptions = samplePrescriptions
          setProfiles(updatedProfiles)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const startCaregiverDemo = () => {
    setDemoMode("caregiver-demo")
    setCaregiverStep(1)
  }
  const startPharmacyDemo = () => {
    setDemoMode("pharmacy-demo")
    setPharmacyStep(1)
  }
  const backToLanding = () => setDemoMode("landing")

  const samplePrescriptions: Prescription[] = [
    {
      id: "1",
      medication: "Atorvastatina 20mg",
      dosage: "1 comprimido por día",
      doctor: "Dr. García",
      date: "2024-01-15",
      status: "active",
    },
    {
      id: "2",
      medication: "Losartán 50mg",
      dosage: "1 comprimido cada 12hs",
      doctor: "Dr. García",
      date: "2024-01-15",
      status: "active",
    },
  ]

  const samplePharmacies = [
    { name: "Farmacia San Juan", distance: "0.8 km", price: "$2,450", rating: 4.8, stock: "En stock" },
    { name: "Farmacity Centro", distance: "1.2 km", price: "$2,380", rating: 4.6, stock: "En stock" },
    { name: "Farmacia del Pueblo", distance: "1.5 km", price: "$2,520", rating: 4.7, stock: "Últimas unidades" },
  ]

  const samplePrescriptionRequests = [
    {
      id: "REQ-001",
      patient: "María González",
      medication: "Atorvastatina 20mg",
      quantity: "30 comp.",
      status: "pending",
      time: "10:30",
      obraSocial: "OSDE",
    },
    {
      id: "REQ-002",
      patient: "Roberto Fernández",
      medication: "Losartán 50mg",
      quantity: "60 comp.",
      status: "approved",
      time: "10:15",
      obraSocial: "PAMI",
    },
    {
      id: "REQ-003",
      patient: "Ana López",
      medication: "Metformina 850mg",
      quantity: "90 comp.",
      status: "pending",
      time: "09:45",
      obraSocial: "Swiss Medical",
    },
  ]

  const sampleInventory = [
    { medication: "Atorvastatina 20mg", stock: 45, minStock: 20, price: 2450, status: "good" },
    { medication: "Losartán 50mg", stock: 12, minStock: 15, price: 1890, status: "low" },
    { medication: "Metformina 850mg", stock: 78, minStock: 30, price: 980, status: "good" },
    { medication: "Omeprazol 20mg", stock: 5, minStock: 25, price: 1250, status: "critical" },
  ]

  const sampleWeeklyOrders = [
    {
      id: "ORD-001",
      patient: "María González",
      medication: "Atorvastatina 20mg",
      quantity: "30 comp.",
      validatedOnline: true,
      paidOnline: true,
      pickupTime: "10:30",
      pickupDate: "2024-01-15",
      obraSocial: "OSDE",
      status: "ready",
    },
    {
      id: "ORD-002",
      patient: "Roberto Fernández",
      medication: "Losartán 50mg",
      quantity: "60 comp.",
      validatedOnline: false,
      paidOnline: false,
      pickupTime: "14:15",
      pickupDate: "2024-01-15",
      obraSocial: "PAMI",
      status: "validating",
    },
    {
      id: "ORD-003",
      patient: "Ana López",
      medication: "Metformina 850mg",
      quantity: "90 comp.",
      validatedOnline: true,
      paidOnline: true,
      pickupTime: "16:45",
      pickupDate: "2024-01-16",
      obraSocial: "Swiss Medical",
      status: "stock",
    },
    {
      id: "ORD-004",
      patient: "Carlos Ruiz",
      medication: "Omeprazol 20mg",
      quantity: "28 comp.",
      validatedOnline: true,
      paidOnline: false,
      pickupTime: "09:30",
      pickupDate: "2024-01-17",
      obraSocial: "OSDE",
      status: "ready",
    },
    {
      id: "ORD-005",
      patient: "Elena Morales",
      medication: "Ibuprofeno 600mg",
      quantity: "20 comp.",
      validatedOnline: false,
      paidOnline: true,
      pickupTime: "11:00",
      pickupDate: "2024-01-18",
      obraSocial: "PAMI",
      status: "validating",
    },
  ]

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrderStatuses((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }))
  }

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case "validating":
        return "border-yellow-500"
      case "stock":
        return "border-orange-500"
      case "ready":
        return "border-secondary"
      case "completed":
        return "border-primary"
      default:
        return "border"
    }
  }

  if (demoMode === "caregiver-demo") {
    return (
      <div className="min-h-screen bg-background">
        {/* Demo Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">MediLink</span>
              <Badge className="bg-primary/10 text-primary ml-2">Demo</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Paso {caregiverStep} de 6</span>
              <Button variant="outline" onClick={backToLanding}>
                Volver al Inicio
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Progress Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step <= caregiverStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 6 && <div className={`w-16 h-1 mx-2 ${step < caregiverStep ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Registro</span>
              <span>Perfil</span>
              <span>Familia</span>
              <span>Recetas</span>
              <span>Búsqueda</span>
              <span>Entrega</span>
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-2xl mx-auto">
            {caregiverStep === 1 && (
              <Card className="p-8">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">¡Bienvenido a MediLink!</CardTitle>
                  <CardDescription>
                    Comencemos creando tu cuenta para gestionar medicamentos de forma segura
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input
                        id="name"
                        placeholder="Ej: María González"
                        value={caregiverData.name}
                        onChange={(e) => setCaregiverData({ ...caregiverData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dni">DNI / ID</Label>
                      <Input
                        id="dni"
                        placeholder="12.345.678"
                        value={caregiverData.dni}
                        onChange={(e) => setCaregiverData({ ...caregiverData, dni: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="maria@email.com"
                        value={caregiverData.email}
                        onChange={(e) => setCaregiverData({ ...caregiverData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        placeholder="+54 11 1234-5678"
                        value={caregiverData.phone}
                        onChange={(e) => setCaregiverData({ ...caregiverData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      placeholder="Av. Corrientes 1234, CABA"
                      value={caregiverData.address}
                      onChange={(e) => setCaregiverData({ ...caregiverData, address: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Fecha de nacimiento</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={caregiverData.birthDate}
                        onChange={(e) => setCaregiverData({ ...caregiverData, birthDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="obra-social">Obra Social / Prepaga</Label>
                      <Select
                        value={caregiverData.obraSocial}
                        onValueChange={(value) => setCaregiverData({ ...caregiverData, obraSocial: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu obra social" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="osde">OSDE</SelectItem>
                          <SelectItem value="swiss">Swiss Medical</SelectItem>
                          <SelectItem value="galeno">Galeno</SelectItem>
                          <SelectItem value="pami">PAMI</SelectItem>
                          <SelectItem value="ioma">IOMA</SelectItem>
                          <SelectItem value="otra">Otra</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="obraSocialCategory">Categoría de Obra Social</Label>
                    <Input
                      id="obraSocialCategory"
                      placeholder="Ej: Plan 210, Básico, Premium"
                      value={caregiverData.obraSocialCategory}
                      onChange={(e) => setCaregiverData({ ...caregiverData, obraSocialCategory: e.target.value })}
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => {
                      const mainProfile = {
                        id: "main-profile",
                        name: caregiverData.name || "Usuario Principal",
                        age: caregiverData.birthDate
                          ? new Date().getFullYear() - new Date(caregiverData.birthDate).getFullYear()
                          : 0,
                        obraSocial: caregiverData.obraSocial || "No especificada",
                        obraSocialCategory: caregiverData.obraSocialCategory || "No especificada",
                        dni: caregiverData.dni || "No especificado",
                        address: caregiverData.address || "No especificada",
                        birthDate: caregiverData.birthDate || "No especificada",
                        relationship: "Titular",
                        prescriptions: [],
                      }
                      setProfiles([mainProfile])
                      setCaregiverStep(2) // Skip old step 2, go directly to family profiles
                    }}
                  >
                    Continuar <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )}

            {caregiverStep === 2 && (
              <Card className="p-8">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">Agrega perfiles familiares</CardTitle>
                  <CardDescription>Gestiona medicamentos para toda tu familia desde una cuenta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {profiles.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Perfiles agregados:</h4>
                      {profiles.map((profile) => (
                        <div key={profile.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{profile.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {profile.age} años • {profile.relationship}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-2 border-dashed border-border rounded-lg p-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="profile-name">Nombre completo</Label>
                          <Input
                            id="profile-name"
                            placeholder="Ej: Roberto González"
                            value={newProfile.name}
                            onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="profile-dni">DNI / ID</Label>
                          <Input
                            id="profile-dni"
                            placeholder="12.345.678"
                            value={newProfile.dni}
                            onChange={(e) => setNewProfile({ ...newProfile, dni: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profile-address">Dirección</Label>
                        <Input
                          id="profile-address"
                          placeholder="Av. Corrientes 1234, CABA"
                          value={newProfile.address}
                          onChange={(e) => setNewProfile({ ...newProfile, address: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="profile-birthDate">Fecha de nacimiento</Label>
                          <Input
                            id="profile-birthDate"
                            type="date"
                            value={newProfile.birthDate}
                            onChange={(e) => setNewProfile({ ...newProfile, birthDate: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="profile-relationship">Parentesco</Label>
                          <Select
                            value={newProfile.relationship}
                            onValueChange={(value) => setNewProfile({ ...newProfile, relationship: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="padre">Padre</SelectItem>
                              <SelectItem value="madre">Madre</SelectItem>
                              <SelectItem value="hijo">Hijo/a</SelectItem>
                              <SelectItem value="conyuge">Cónyuge</SelectItem>
                              <SelectItem value="hermano">Hermano/a</SelectItem>
                              <SelectItem value="otro">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="profile-obra-social">Obra Social / Prepaga</Label>
                          <Select
                            value={newProfile.obraSocial}
                            onValueChange={(value) => setNewProfile({ ...newProfile, obraSocial: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pami">PAMI</SelectItem>
                              <SelectItem value="osde">OSDE</SelectItem>
                              <SelectItem value="swiss">Swiss Medical</SelectItem>
                              <SelectItem value="ioma">IOMA</SelectItem>
                              <SelectItem value="otra">Otra</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="profile-obra-social-category">Categoría de Obra Social</Label>
                          <Input
                            id="profile-obra-social-category"
                            placeholder="Ej: Plan 210, Básico"
                            value={newProfile.obraSocialCategory}
                            onChange={(e) => setNewProfile({ ...newProfile, obraSocialCategory: e.target.value })}
                          />
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full bg-blue-400"
                        onClick={() => {
                          const calculatedAge = newProfile.birthDate
                            ? new Date().getFullYear() - new Date(newProfile.birthDate).getFullYear()
                            : 0

                          setProfiles([
                            ...profiles,
                            {
                              id: Date.now().toString(),
                              name: newProfile.name || "Perfil sin nombre",
                              age: calculatedAge,
                              obraSocial: newProfile.obraSocial || "No especificada",
                              obraSocialCategory: newProfile.obraSocialCategory || "No especificada",
                              dni: newProfile.dni || "No especificado",
                              address: newProfile.address || "No especificada",
                              birthDate: newProfile.birthDate || "No especificada",
                              relationship: newProfile.relationship || "Familiar",
                              prescriptions: [],
                            },
                          ])
                          setNewProfile({
                            name: "",
                            age: "",
                            obraSocial: "",
                            obraSocialCategory: "",
                            dni: "",
                            address: "",
                            birthDate: "",
                            relationship: "",
                          })
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" /> Agregar Perfil
                      </Button>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setCaregiverStep(1)} className="flex-1">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Atrás
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => {
                        // Add sample prescriptions to first profile for demo
                        if (profiles.length > 0) {
                          const updatedProfiles = [...profiles]
                          updatedProfiles[0].prescriptions = samplePrescriptions
                          setProfiles(updatedProfiles)
                        }
                        setCaregiverStep(3) // Updated step number since we removed step 2
                      }}
                    >
                      Continuar <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {caregiverStep === 3 && (
              <Card className="w-full max-w-2xl mx-auto">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">Escanea las recetas médicas</CardTitle>
                  <CardDescription>
                    Selecciona el perfil y agrega las recetas médicas para encontrar medicamentos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Selecciona el perfil para la receta:</h4>
                    <div className="grid gap-3">
                      {profiles.map((profile, index) => (
                        <div
                          key={index}
                          className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedProfileForPrescription === index
                              ? "border-primary bg-primary/5"
                              : "border-muted hover:border-primary/50 hover:bg-muted/30"
                          }`}
                          onClick={() => setSelectedProfileForPrescription(index)}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                selectedProfileForPrescription === index ? "bg-primary" : "bg-muted"
                              }`}
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium">{profile.name}</h5>
                                {index === 0 && (
                                  <Badge variant="secondary" className="text-xs">
                                    Principal
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                <p>{profile.address}</p>
                                <p>
                                  Obra Social: {profile.obraSocial} - {profile.obraSocialCategory}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center bg-primary/5">
                    <Camera className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Escanea tu receta</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Usa la cámara para escanear automáticamente la receta médica de{" "}
                      {profiles[selectedProfileForPrescription]?.name}
                    </p>

                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePrescriptionUpload}
                        className="hidden"
                        id="prescription-upload"
                      />
                      <label htmlFor="prescription-upload">
                        <Button className="mb-2" asChild>
                          <span>
                            <Camera className="w-4 h-4 mr-2" /> Subir Foto de Receta
                          </span>
                        </Button>
                      </label>
                      <Button
                        variant="outline"
                        onClick={() => {
                          const updatedProfiles = [...profiles]
                          updatedProfiles[selectedProfileForPrescription].prescriptions = samplePrescriptions
                          setProfiles(updatedProfiles)
                        }}
                      >
                        <FileText className="w-4 h-4 mr-2" /> Conectar a Obra Social
                      </Button>
                    </div>

                    {uploadedPrescription && (
                      <div className="mt-4 p-4 border rounded-lg bg-white">
                        <p className="text-sm font-medium mb-2">Receta subida:</p>
                        <img
                          src={uploadedPrescription || "/placeholder.svg"}
                          alt="Receta subida"
                          className="max-w-full h-32 object-contain mx-auto rounded border"
                        />
                        <p className="text-xs text-green-600 mt-2">✓ Receta procesada exitosamente</p>
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground">También puedes usar recetas de ejemplo para la demo</p>
                  </div>

                  {profiles[selectedProfileForPrescription]?.prescriptions &&
                    profiles[selectedProfileForPrescription].prescriptions.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold">
                          Recetas escaneadas para {profiles[selectedProfileForPrescription].name}:
                        </h4>
                        {profiles[selectedProfileForPrescription].prescriptions.map((prescription) => (
                          <div
                            key={prescription.id}
                            className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 hover:border-primary/50 transition-all duration-200"
                            onClick={() => {
                              setCaregiverStep(4)
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h5 className="font-medium">{prescription.medication}</h5>
                                <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
                                <p className="text-xs text-muted-foreground">
                                  Dr. {prescription.doctor} • {prescription.date}
                                </p>
                              </div>
                              <Badge className="bg-secondary text-secondary-foreground">
                                {prescription.status === "active" ? "Vigente" : "Vencida"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setCaregiverStep(2)} className="flex-1">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Atrás
                    </Button>
                    <Button className="flex-1" onClick={() => setCaregiverStep(4)}>
                      Buscar Farmacias <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {caregiverStep === 4 && (
              <Card className="p-8">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">Farmacias cercanas</CardTitle>
                  <CardDescription>
                    Encontramos farmacias con {profiles[0]?.prescriptions?.[0]?.medication} disponible
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="w-full rounded-lg overflow-hidden border">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/descarga-G0grz2ho6O6UcCIh7jILBDJYenfIjd.jpeg"
                      alt="Mapa de Google mostrando farmacias cercanas en Buenos Aires"
                      className="w-full h-64 object-cover"
                    />
                  </div>

                  <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                    <Search className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">
                      Buscando: <strong>{profiles[0]?.prescriptions?.[0]?.medication}</strong>
                    </span>
                  </div>

                  <div className="space-y-4">
                    {samplePharmacies.map((pharmacy, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{pharmacy.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {pharmacy.distance}
                              </span>
                              <span className="flex items-center">
                                <Star className="w-3 h-3 mr-1 fill-current text-yellow-500" />
                                {pharmacy.rating}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">{pharmacy.price}</p>
                            <Badge
                              variant={pharmacy.stock === "En stock" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {pharmacy.stock}
                            </Badge>
                          </div>
                        </div>
                        <Button className="w-full" variant={"outline"} onClick={() => setCaregiverStep(5)}>
                          {"Seleccionar"}
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setCaregiverStep(3)} className="flex-1">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Atrás
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {caregiverStep === 5 && (
              <Card className="p-8">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">Método de entrega</CardTitle>
                  <CardDescription>Elige cómo quieres recibir tu medicamento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Selecciona el método de entrega</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant={deliveryMethod === "delivery" ? "default" : "outline"}
                        onClick={() => setDeliveryMethod("delivery")}
                        className="h-auto p-6 flex flex-col items-center space-y-3"
                      >
                        <Truck className="w-8 h-8" />
                        <div className="text-center">
                          <div className="font-semibold">Envío a domicilio</div>
                          <div className="text-sm text-muted-foreground">Recibe en tu casa</div>
                        </div>
                      </Button>
                      <Button
                        variant={deliveryMethod === "pickup" ? "default" : "outline"}
                        onClick={() => setDeliveryMethod("pickup")}
                        className="h-auto p-6 flex flex-col items-center space-y-3"
                      >
                        <MapPin className="w-8 h-8" />
                        <div className="text-center">
                          <div className="font-semibold">Retirar en farmacia</div>
                          <div className="text-sm text-muted-foreground">Buscar en persona</div>
                        </div>
                      </Button>
                    </div>
                  </div>

                  {deliveryMethod === "delivery" && (
                    <div className="p-4 border rounded-lg bg-muted/30">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Costo de envío:</span>
                        <span className="text-lg font-bold text-primary">$500</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Entrega en 2-4 horas en CABA y GBA</p>
                    </div>
                  )}

                  {deliveryMethod === "pickup" && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Coordinar retiro</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Día de retiro</label>
                          <select
                            value={pickupDay}
                            onChange={(e) => setPickupDay(e.target.value)}
                            className="w-full p-3 border rounded-md bg-background"
                          >
                            <option value="">Seleccionar día</option>
                            <option value="hoy">Hoy</option>
                            <option value="mañana">Mañana</option>
                            <option value="pasado">Pasado mañana</option>
                            <option value="lunes">Lunes</option>
                            <option value="martes">Martes</option>
                            <option value="miercoles">Miércoles</option>
                            <option value="jueves">Jueves</option>
                            <option value="viernes">Viernes</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Horario</label>
                          <select
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            className="w-full p-3 border rounded-md bg-background"
                          >
                            <option value="">Seleccionar horario</option>
                            <option value="9-12">9:00 - 12:00</option>
                            <option value="12-15">12:00 - 15:00</option>
                            <option value="15-18">15:00 - 18:00</option>
                            <option value="18-20">18:00 - 20:00</option>
                          </select>
                        </div>
                      </div>

                      {pickupDay && pickupTime && (
                        <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                          <p className="text-sm">
                            <strong>Retiro programado:</strong>{" "}
                            {pickupDay === "hoy"
                              ? "Hoy"
                              : pickupDay === "mañana"
                                ? "Mañana"
                                : pickupDay === "pasado"
                                  ? "Pasado mañana"
                                  : pickupDay.charAt(0).toUpperCase() + pickupDay.slice(1)}{" "}
                            entre las {pickupTime.replace("-", ":00 - ")}:00
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Método de pago</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant={paymentMethod === "online" ? "default" : "outline"}
                        onClick={() => setPaymentMethod("online")}
                        className="h-auto p-4 flex flex-col items-center space-y-2"
                      >
                        <CreditCard className="w-6 h-6" />
                        <span>Pago Online</span>
                      </Button>
                      <Button
                        variant={paymentMethod === "person" ? "default" : "outline"}
                        onClick={() => setPaymentMethod("person")}
                        className="h-auto p-4 flex flex-col items-center space-y-2"
                      >
                        <Banknote className="w-6 h-6" />
                        <span>Pagar en Persona</span>
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg bg-muted/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Subtotal medicamento:</span>
                      <span>$2,450</span>
                    </div>
                    <div className="flex justify-between items-center mb-2 text-green-600">
                      <span className="font-medium">
                        Descuento obra social (
                        {profiles[selectedProfileForPrescription]?.obraSocial || caregiverData.obraSocial}):
                      </span>
                      <span>-$735 (30%)</span>
                    </div>
                    {deliveryMethod === "delivery" && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Costo de envío:</span>
                        <span>$500</span>
                      </div>
                    )}
                    <hr className="my-2" />
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Total:</span>
                      <span className="text-lg font-bold text-primary">
                        ${deliveryMethod === "delivery" ? "2,215" : "1,715"}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setCaregiverStep(4)} className="flex-1">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Atrás
                    </Button>
                    <Button className="flex-1" onClick={() => setCaregiverStep(6)}>
                      Continuar <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {caregiverStep === 6 && (
              <Card className="p-8">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">
                    {orderConfirmed ? "¡Pedido confirmado!" : "Confirmar Pedido"}
                  </CardTitle>
                  <CardDescription>
                    {orderConfirmed
                      ? "Tu medicamento será preparado bajo supervisión farmacéutica"
                      : "Revisa los detalles de tu pedido antes de confirmar"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {orderConfirmed && (
                    <div className="text-center p-6 bg-secondary/10 rounded-lg">
                      <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Pedido #MD-2024-001</h3>
                      <p className="text-muted-foreground">Farmacia San Juan preparará tu medicamento</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Medicamento:</span>
                      <span>{profiles[0]?.prescriptions?.[0]?.medication}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Método de entrega:</span>
                      <span>{deliveryMethod === "delivery" ? "Envío a domicilio" : "Retiro en farmacia"}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Método de pago:</span>
                      <span>{paymentMethod === "online" ? "Pago online" : "Pago en persona"}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Total:</span>
                      <span className="text-lg font-bold text-primary">
                        ${deliveryMethod === "delivery" ? "2,950" : "2,450"}
                      </span>
                    </div>
                  </div>

                  {orderConfirmed && (
                    <div className="p-4 border-l-4 border-primary bg-primary/5">
                      <h4 className="font-semibold mb-2">Próximos pasos:</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• El farmacéutico validará tu receta</li>
                        <li>• Recibirás una notificación cuando esté listo</li>
                        {paymentMethod === "online" && <li>• Procederás al pago online seguro</li>}
                        {paymentMethod === "person" && <li>• Pagarás al momento del retiro</li>}
                        {deliveryMethod === "delivery" && <li>• Tu medicamento será enviado a domicilio</li>}
                        {deliveryMethod === "pickup" && pickupDay && pickupTime && (
                          <li>• Retira en el horario programado</li>
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setCaregiverStep(5)} className="flex-1">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Atrás
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => {
                        if (orderConfirmed) {
                          setCaregiverStep(1)
                          setOrderConfirmed(false)
                          setDeliveryMethod("")
                          setPaymentMethod("")
                          setPickupDay("")
                          setPickupTime("")
                        } else {
                          setOrderConfirmed(true)
                        }
                      }}
                    >
                      {orderConfirmed ? "Reiniciar Demo" : "Confirmar Pedido"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (demoMode === "pharmacy-demo") {
    return (
      <div className="min-h-screen bg-background">
        {/* Demo Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">MediLink</span>
              <Badge className="bg-secondary/10 text-secondary ml-2">Demo Farmacia</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Paso {pharmacyStep} de 5</span>
              <Button variant="outline" onClick={backToLanding}>
                Volver al Inicio
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Progress Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step <= pharmacyStep ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 5 && <div className={`w-16 h-1 mx-2 ${step < pharmacyStep ? "bg-secondary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Registro</span>
              <span>Inventario</span>
              <span>Dashboard</span>
              <span>Validación</span>
              <span>Análisis</span>
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-2xl mx-auto">
            {pharmacyStep === 1 && (
              <Card className="p-8">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">Únete a MediLink</CardTitle>
                  <CardDescription>
                    Plataforma integral que genera tu sitio web y se integra con tu farmacia existente
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-center mb-6">
                    <div className="p-6 border-2 border-dashed border-primary/20 rounded-lg bg-primary/5 text-center max-w-md">
                      <Globe className="w-16 h-16 text-primary mx-auto mb-4" />
                      <h4 className="font-semibold text-lg mb-3">Crea E-Farmacia</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Generamos un sitio web completo para tu farmacia con integración total a MediLink
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pharmacy-name">Nombre de la farmacia</Label>
                      <Input
                        id="pharmacy-name"
                        placeholder="Ej: Farmacia San Juan"
                        value={pharmacyData.name}
                        onChange={(e) => setPharmacyData({ ...pharmacyData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pharmacy-address">Dirección completa</Label>
                      <Input
                        id="pharmacy-address"
                        placeholder="Av. Corrientes 1234, CABA"
                        value={pharmacyData.address}
                        onChange={(e) => setPharmacyData({ ...pharmacyData, address: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pharmacy-phone">Teléfono</Label>
                        <Input
                          id="pharmacy-phone"
                          placeholder="+54 11 1234-5678"
                          value={pharmacyData.phone}
                          onChange={(e) => setPharmacyData({ ...pharmacyData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pharmacy-email">Email</Label>
                        <Input
                          id="pharmacy-email"
                          type="email"
                          placeholder="farmacia@email.com"
                          value={pharmacyData.email}
                          onChange={(e) => setPharmacyData({ ...pharmacyData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pharmacy-license">Matrícula farmacia</Label>
                        <Input
                          id="pharmacy-license"
                          placeholder="12345"
                          value={pharmacyData.license}
                          onChange={(e) => setPharmacyData({ ...pharmacyData, license: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pharmacist-name">Farmacéutico responsable</Label>
                        <Input
                          id="pharmacist-name"
                          placeholder="Dr. Juan Pérez"
                          value={pharmacyData.pharmacist}
                          onChange={(e) => setPharmacyData({ ...pharmacyData, pharmacist: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" onClick={() => setPharmacyStep(2)}>
                    Continuar <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )}

            {pharmacyStep === 2 && (
              <Card className="p-8">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">Configura tu inventario</CardTitle>
                  <CardDescription>Sincroniza tu stock actual con la plataforma MediLink</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 border-2 border-dashed border-secondary/20 rounded-lg bg-secondary/5 text-center">
                    <Package className="w-12 h-12 text-secondary mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Importar inventario existente</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Conecta con tu sistema actual o importa desde archivo CSV
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full bg-transparent">
                        <FileText className="w-4 h-4 mr-2" /> Importar desde CSV
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Zap className="w-4 h-4 mr-2" /> Conectar sistema existente
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Vista previa del inventario:</h4>
                    {sampleInventory.map((item, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{item.medication}</h5>
                          <Badge
                            variant={
                              item.status === "good" ? "default" : item.status === "low" ? "secondary" : "destructive"
                            }
                            className="text-xs"
                          >
                            {item.status === "good"
                              ? "Stock OK"
                              : item.status === "low"
                                ? "Stock Bajo"
                                : "Stock Crítico"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <span>Stock: {item.stock} unidades</span>
                          <span>Mínimo: {item.minStock}</span>
                          <span>Precio: ${item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setPharmacyStep(1)} className="flex-1">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Atrás
                    </Button>
                    <Button className="flex-1" onClick={() => setPharmacyStep(3)}>
                      Continuar <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {pharmacyStep === 3 && (
              <Card className="p-8">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">Vista semanal de pedidos</CardTitle>
                  <CardDescription>Gestiona todos los pedidos de la semana con control de estado</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-1">
                      <Label htmlFor="week-selector">Semana seleccionada:</Label>
                      <select
                        id="week-selector"
                        className="px-3 py-2 border rounded-md bg-background"
                        value={selectedWeek}
                        onChange={(e) => setSelectedWeek(e.target.value)}
                      >
                        <option value="2024-01-15">15-21 Enero 2024</option>
                        <option value="2024-01-08">8-14 Enero 2024</option>
                        <option value="2024-01-22">22-28 Enero 2024</option>
                      </select>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-secondary">5</div>
                      <div className="text-sm text-muted-foreground">Pedidos esta semana</div>
                    </div>
                  </div>

                  {/* Weekly Orders Table */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-7 gap-2 text-xs font-medium text-muted-foreground border-b pb-2">
                      <span>Pedido</span>
                      <span>Paciente</span>
                      <span>Validado</span>
                      <span>Pagado</span>
                      <span>Retiro</span>
                      <span>Estado</span>
                      <span>Acciones</span>
                    </div>

                    {sampleWeeklyOrders.map((order) => (
                      <div
                        key={order.id}
                        className={`grid grid-cols-7 gap-2 items-center p-3 ${getStatusBorderColor(orderStatuses[order.id] || order.status)} border-2 rounded-lg bg-muted/10 hover:bg-muted/20`}
                      >
                        <div className="text-sm font-medium">{order.id}</div>
                        <div className="text-sm">
                          <div className="font-medium">{order.patient}</div>
                          <div className="text-xs text-muted-foreground">{order.medication}</div>
                        </div>
                        <div className="text-center">
                          {order.validatedOnline ? (
                            <CheckCircle className="w-4 h-4 text-secondary mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-muted-foreground mx-auto" />
                          )}
                        </div>
                        <div className="text-center">
                          {order.paidOnline ? (
                            <CheckCircle className="w-4 h-4 text-primary mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-muted-foreground mx-auto" />
                          )}
                        </div>
                        <div className="text-xs">
                          <div>
                            {order.pickupDate.split("-")[2]}/{order.pickupDate.split("-")[1]}
                          </div>
                          <div className="text-muted-foreground">{order.pickupTime}</div>
                        </div>
                        <div>
                          <select
                            className="text-xs px-2 py-1 border rounded bg-background"
                            value={orderStatuses[order.id] || order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          >
                            <option value="validating">Validando</option>
                            <option value="stock">Buscando stock</option>
                            <option value="ready">Listo para retiro</option>
                            <option value="completed">Completado</option>
                          </select>
                        </div>
                        <div>
                          <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-auto bg-transparent">
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Status Legend */}
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold mb-3 text-sm">Estados de pedidos:</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span>Validando: Esperando validación farmacéutica</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span>Buscando stock: Verificando disponibilidad</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-secondary rounded-full"></div>
                        <span>Listo para retiro: Medicamento preparado</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span>Completado: Pedido entregado</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setPharmacyStep(2)} className="flex-1">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Atrás
                    </Button>
                    <Button className="flex-1" onClick={() => setPharmacyStep(4)}>
                      Ver Validación <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {pharmacyStep === 4 && (
              <Card className="p-8">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">Validación de recetas</CardTitle>
                  <CardDescription>
                    Proceso de validación profesional para garantizar cumplimiento regulatorio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 border-l-4 border-secondary bg-secondary/5">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Stethoscope className="w-4 h-4 mr-2 text-secondary" />
                      Receta pendiente de validación
                    </h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Paciente:</span> María González
                        </div>
                        <div>
                          <span className="font-medium">Obra Social:</span> OSDE
                        </div>
                        <div>
                          <span className="font-medium">Médico:</span> Dr. García
                        </div>
                        <div>
                          <span className="font-medium">Fecha:</span> 15/01/2024
                        </div>
                      </div>
                      <div className="p-3 bg-white border rounded">
                        <h5 className="font-medium mb-1">Medicamento prescrito:</h5>
                        <p className="text-sm">Atorvastatina 20mg - 1 comprimido por día</p>
                        <p className="text-xs text-muted-foreground mt-1">Cantidad: 30 comprimidos</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Verificaciones automáticas:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-secondary" />
                        <span className="text-sm">Receta válida y vigente</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-secondary" />
                        <span className="text-sm">Médico matriculado verificado</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-secondary" />
                        <span className="text-sm">Cobertura OSDE confirmada</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-secondary" />
                        <span className="text-sm">Stock disponible: 45 unidades</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h4 className="font-semibold mb-2 text-primary">Decisión del farmacéutico:</h4>
                    <div className="flex space-x-2">
                      <Button className="flex-1" onClick={() => setPharmacyStep(5)}>
                        <CheckCircle className="w-4 h-4 mr-2" /> Aprobar Dispensación
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Rechazar
                      </Button>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setPharmacyStep(3)} className="flex-1">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Atrás
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {pharmacyStep === 5 && (
              <Card className="p-8">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">Análisis y reportes</CardTitle>
                  <CardDescription>Insights para optimizar tu farmacia y aumentar ventas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-6 bg-secondary/10 rounded-lg">
                    <TrendingUp className="w-16 h-16 text-secondary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">¡Dispensación exitosa!</h3>
                    <p className="text-muted-foreground">El medicamento fue preparado y el paciente notificado</p>
                  </div>

                  {/* Analytics Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-secondary">+35%</div>
                      <div className="text-sm text-muted-foreground">Ventas vs mes anterior</div>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">127</div>
                      <div className="text-sm text-muted-foreground">Nuevos clientes</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Medicamentos más solicitados:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-muted rounded">
                        <span className="text-sm">Atorvastatina 20mg</span>
                        <Badge variant="secondary">45 pedidos</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded">
                        <span className="text-sm">Losartán 50mg</span>
                        <Badge variant="secondary">38 pedidos</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded">
                        <span className="text-sm">Metformina 850mg</span>
                        <Badge variant="secondary">32 pedidos</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-l-4 border-primary bg-primary/5">
                    <h4 className="font-semibold mb-2">Beneficios de MediLink:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Aumento promedio del 35% en ventas</li>
                      <li>• Reducción del 60% en tiempo de gestión</li>
                      <li>• Acceso a más de 50,000 pacientes activos</li>
                      <li>• Cumplimiento regulatorio garantizado</li>
                    </ul>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={backToLanding} className="flex-1 bg-transparent">
                      Volver al Inicio
                    </Button>
                    <Button className="flex-1" onClick={() => setPharmacyStep(1)}>
                      Reiniciar Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

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
            <div className="bg-card border border-border rounded-2xl p-2 inline-flex mb-8 shadow-lg">
              <button
                onClick={() => setActiveView("clientes")}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeView === "clientes"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                MediLink Para Vos
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={startCaregiverDemo}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Play className="w-5 h-5 mr-2" />
                Ver Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={startPharmacyDemo}
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
              >
                <Play className="w-5 h-5 mr-2" />
                Ver Demo Farmacia
              </Button>
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
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Validación automática
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Compatible con todas las obras sociales
                      </li>
                    </ul>
                    <Button variant="outline" size="sm" onClick={startCaregiverDemo} className="w-full bg-transparent">
                      Probar Demo <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
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
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Geolocalización precisa
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Comparación de precios
                      </li>
                    </ul>
                    <Button variant="outline" size="sm" onClick={startCaregiverDemo} className="w-full bg-transparent">
                      Probar Demo <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
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
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Horarios flexibles
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Seguimiento en tiempo real
                      </li>
                    </ul>
                    <Button variant="outline" size="sm" onClick={startCaregiverDemo} className="w-full bg-transparent">
                      Probar Demo <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
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
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Generated%20Image%20August%2030%2C%202025%20-%208_19PM-0367tplHWA4W514Tb2ENmGe7BXI4y0.jpeg"
                      alt="App escaneando receta médica"
                      className="rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>

                {/* Real-time Stock Feature */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="order-2 lg:order-1 relative">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/descarga-w1LqdtfUkmBgZS2oZX9QNRaG7C1W4A.jpeg"
                      alt="Mapa con farmacias cercanas en Buenos Aires"
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
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Mayor visibilidad
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Nuevos canales de venta
                      </li>
                    </ul>
                    <Button variant="outline" size="sm" onClick={startPharmacyDemo} className="w-full bg-transparent">
                      Probar Demo <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
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
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Menos papeleo
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Control de inventario
                      </li>
                    </ul>
                    <Button variant="outline" size="sm" onClick={startPharmacyDemo} className="w-full bg-transparent">
                      Probar Demo <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
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
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        100% legal y seguro
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                        Trazabilidad completa
                      </li>
                    </ul>
                    <Button variant="outline" size="sm" onClick={startPharmacyDemo} className="w-full bg-transparent">
                      Probar Demo <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
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
            <Button size="lg" variant="secondary" className="text-lg px-8" onClick={startPharmacyDemo}>
              Ver Demo Farmacia
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              onClick={startCaregiverDemo}
            >
              Ver Demo
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
