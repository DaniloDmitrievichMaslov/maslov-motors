import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Wrench, 
  Car, 
  Clock, 
  Shield, 
  Star, 
  Phone, 
  MapPin, 
  ChevronRight,
  Settings,
  CheckCircle2,
  Users,
  Calendar
} from "lucide-react";

const services = [
  {
    icon: Settings,
    title: "Manutenção Preventiva",
    description: "Revisões periódicas para manter o seu carro em perfeitas condições."
  },
  {
    icon: Wrench,
    title: "Reparações Mecânicas",
    description: "Diagnóstico e reparação de problemas mecânicos com peças de qualidade."
  },
  {
    icon: Car,
    title: "Serviços de Carroçaria",
    description: "Pintura, reparação de amolgadelas e restauro de carroçaria."
  },
  {
    icon: Shield,
    title: "Inspeções",
    description: "Preparação e acompanhamento para inspeções obrigatórias."
  }
];

const features = [
  {
    icon: Clock,
    title: "Agendamento Fácil",
    description: "Marque a sua visita online em poucos cliques."
  },
  {
    icon: CheckCircle2,
    title: "Qualidade Garantida",
    description: "Trabalho de qualidade com garantia em todos os serviços."
  },
  {
    icon: Users,
    title: "Equipa Experiente",
    description: "Técnicos certificados com anos de experiência."
  },
  {
    icon: Calendar,
    title: "Histórico Completo",
    description: "Acompanhe todos os serviços do seu veículo online."
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/30 animate-fade-in-down">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-2 group">
              <div className="p-2 bg-primary/10 rounded-lg transition-smooth group-hover:bg-primary/20 group-hover:scale-105">
                <Wrench className="h-6 w-6 md:h-7 md:w-7 text-primary transition-smooth group-hover:rotate-12" />
              </div>
              <span className="text-xl md:text-2xl font-bold">Maslov Motors</span>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="hidden sm:flex transition-smooth hover:bg-primary/10">
                  Entrar
                </Button>
              </Link>
              <Link to="/auth?tab=signup">
                <Button size="sm" className="shadow-lg transition-smooth hover-lift hover:shadow-primary/25">
                  <span className="hidden sm:inline">Criar Conta</span>
                  <span className="sm:hidden">Entrar</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50"></div>
        
        {/* Floating decorations */}
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl float"></div>
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/15 rounded-full blur-3xl float" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 md:mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
              <Star className="h-4 w-4 mr-2 fill-primary" />
              Oficina de Confiança
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
              <span className="animate-fade-in-up opacity-0 inline-block" style={{ animationDelay: '0.2s' }}>A Sua Oficina de</span>
              <span className="block text-gradient animate-blur-in opacity-0" style={{ animationDelay: '0.4s' }}>
                Confiança
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-4 animate-fade-in opacity-0" style={{ animationDelay: '0.5s' }}>
              Serviços de reparação e manutenção automóvel com qualidade, transparência e preços justos.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s' }}>
              <Link to="/auth?tab=signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/25 text-base md:text-lg px-6 md:px-8 transition-smooth hover-lift hover:shadow-primary/40 animate-glow-pulse">
                  Começar Agora
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a href="tel:+351933468899" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary/50 text-base md:text-lg px-6 md:px-8 transition-smooth hover-lift hover:bg-primary/10">
                  <Phone className="mr-2 h-5 w-5" />
                  Ligar Agora
                </Button>
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-20 max-w-4xl mx-auto">
            {[
              { value: "500+", label: "Clientes Satisfeitos" },
              { value: "1000+", label: "Serviços Realizados" },
              { value: "100%", label: "Transparência" },
              { value: "24h", label: "Resolução Rápida" },
            ].map((stat, index) => (
              <Card 
                key={index} 
                className="glass border-border/30 text-center animate-scale-in-bounce opacity-0 transition-smooth hover-lift hover:border-primary/30"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <CardContent className="p-4 md:p-6">
                  <p className="text-2xl md:text-4xl font-bold text-gradient mb-1">{stat.value}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-secondary/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 animate-fade-in">
              <Wrench className="h-4 w-4 mr-2" />
              Nossos Serviços
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Serviços Especializados
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg px-4">
              Oferecemos uma gama completa de serviços para manter o seu veículo em perfeitas condições.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="group border-border/30 transition-smooth hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 hover:border-primary/30 bg-card/80 backdrop-blur-sm"
              >
                <CardContent className="p-6 md:p-8">
                  <div className="p-3 md:p-4 bg-primary/10 rounded-2xl w-fit mb-4 md:mb-6 transition-smooth group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-3">
                    <service.icon className="h-6 w-6 md:h-8 md:w-8 text-primary transition-smooth" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 transition-smooth group-hover:text-primary">{service.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Shield className="h-4 w-4 mr-2" />
                Porquê Nós?
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                Gestão Completa do Seu Veículo
              </h2>
              <p className="text-muted-foreground mb-6 md:mb-8 text-base md:text-lg">
                Com a nossa plataforma, tem acesso a todas as informações do seu veículo, histórico de serviços e pode fazer marcações online de forma simples e rápida.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 md:gap-4 group"
                  >
                    <div className="p-2 md:p-3 bg-primary/10 rounded-xl shrink-0 transition-smooth group-hover:bg-primary/20 group-hover:scale-110">
                      <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm md:text-base transition-smooth group-hover:text-primary">{feature.title}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-6 md:p-8 lg:p-12 transition-smooth hover:from-primary/25 hover:to-accent/25">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50 rounded-3xl"></div>
                
                <Card className="relative bg-card/90 backdrop-blur-sm shadow-2xl border-border/30 transition-smooth hover:shadow-glow hover:-translate-y-1">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                      <div className="p-2 md:p-3 bg-primary/10 rounded-xl transition-smooth hover:scale-105">
                        <Car className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base md:text-lg">BMW Série 3</h3>
                        <p className="text-xs md:text-sm text-muted-foreground">AB-12-CD • 2021</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-center justify-between p-2 md:p-3 bg-muted/30 rounded-lg transition-smooth hover:bg-muted/40">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-success" />
                          <span className="text-xs md:text-sm">Revisão Completa</span>
                        </div>
                        <Badge className="bg-success text-success-foreground text-xs">Concluído</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 md:p-3 bg-muted/30 rounded-lg transition-smooth hover:bg-muted/40">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 md:h-5 md:w-5 text-info" />
                          <span className="text-xs md:text-sm">Mudança de Óleo</span>
                        </div>
                        <Badge className="bg-info text-info-foreground text-xs">Agendado</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white">
            Pronto para Começar?
          </h2>
          <p className="text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto text-base md:text-lg px-4">
            Crie a sua conta gratuita e comece a gerir os seus veículos de forma simples e eficiente.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
            <Link to="/auth?tab=signup" className="w-full sm:w-auto group">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto shadow-xl text-base md:text-lg px-6 md:px-8 transition-smooth hover-lift">
                Criar Conta Grátis
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 border-t border-border/30 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="group">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg transition-smooth group-hover:bg-primary/20">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xl font-bold">Maslov Motors</span>
              </div>
              <p className="text-muted-foreground text-sm md:text-base">
                A sua oficina de confiança para todos os serviços de reparação e manutenção automóvel.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contactos</h3>
              <div className="space-y-3">
                <a href="tel:+351933468899" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-smooth text-sm md:text-base group">
                  <Phone className="h-4 w-4 md:h-5 md:w-5 transition-smooth group-hover:scale-110" />
                  +351 933 468 899
                </a>
                <a href="https://maps.app.goo.gl/iAzsWZBUYkfBivhf9" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-smooth text-sm md:text-base group">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 shrink-0 mt-0.5 transition-smooth group-hover:scale-110" />
                  <span>Ver no Google Maps</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Horário</h3>
              <div className="space-y-2 text-muted-foreground text-sm md:text-base">
                <p>Segunda a Sexta: 9h–12h30 / 14h–19h</p>
                <p>Sábado: 9h–13h</p>
                <p>Domingo: Encerrado</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border/30 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-muted-foreground text-xs md:text-sm">
            <p>&copy; {new Date().getFullYear()} Maslov Motors. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
