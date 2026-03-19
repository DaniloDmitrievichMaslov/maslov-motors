import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermosResponsabilidade() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6 gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Voltar à página inicial
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-xl">
            <FileText className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Termos de Responsabilidade</h1>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Objeto</h2>
            <p className="text-muted-foreground leading-relaxed">
              Os presentes Termos de Responsabilidade regulam a utilização da aplicação web da <strong className="text-foreground">Maslov Motors</strong>, 
              uma plataforma digital destinada à gestão de serviços de oficina automóvel, disponível em{" "}
              <a href="https://maslov-motors.lovable.app" className="text-primary hover:underline">maslov-motors.lovable.app</a>.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">2. Aceitação dos Termos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ao registar-se e utilizar esta aplicação, o utilizador declara ter lido, compreendido e aceite os presentes Termos de Responsabilidade 
              na sua totalidade. Caso não concorde com alguma das condições, deverá abster-se de utilizar a plataforma.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">3. Responsabilidades do Utilizador</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">O utilizador compromete-se a:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Fornecer dados verdadeiros, completos e atualizados no momento do registo</li>
              <li>Manter a confidencialidade das suas credenciais de acesso (email e palavra-passe)</li>
              <li>Não partilhar a sua conta com terceiros</li>
              <li>Utilizar a plataforma de forma lícita e de boa-fé</li>
              <li>Não tentar aceder a dados de outros utilizadores ou comprometer a segurança do sistema</li>
              <li>Comunicar informações corretas sobre os seus veículos (matrícula, quilometragem, etc.)</li>
            </ul>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Responsabilidades da Maslov Motors</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">A Maslov Motors compromete-se a:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Proteger os dados pessoais dos utilizadores conforme o RGPD</li>
              <li>Manter a plataforma funcional e segura, dentro do razoavelmente possível</li>
              <li>Prestar os serviços de oficina com qualidade e profissionalismo</li>
              <li>Disponibilizar informação clara sobre serviços realizados, custos e prazos</li>
            </ul>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Limitação de Responsabilidade</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">A Maslov Motors não se responsabiliza por:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Interrupções temporárias do serviço por motivos técnicos ou de manutenção</li>
              <li>Informações incorretas fornecidas pelo utilizador</li>
              <li>Danos resultantes do uso indevido da plataforma</li>
              <li>Respostas do chatbot com inteligência artificial, que têm carácter meramente informativo e não substituem o aconselhamento profissional presencial</li>
              <li>Incompatibilidades com determinados dispositivos ou navegadores</li>
            </ul>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Pedidos de Orçamento e Marcações</h2>
            <p className="text-muted-foreground leading-relaxed">
              Os pedidos de orçamento e marcações realizados através da plataforma são indicativos e sujeitos a confirmação pela oficina. 
              A Maslov Motors reserva-se o direito de ajustar valores e disponibilidades após avaliação presencial do veículo.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">7. Propriedade Intelectual</h2>
            <p className="text-muted-foreground leading-relaxed">
              Todo o conteúdo da aplicação (design, código, textos, logótipos e imagens) é propriedade da Maslov Motors 
              e está protegido por direitos de autor. É proibida a reprodução, distribuição ou modificação sem autorização prévia.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">8. Alterações aos Termos</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Maslov Motors reserva-se o direito de alterar os presentes Termos a qualquer momento. 
              As alterações serão comunicadas através da plataforma e entram em vigor na data da sua publicação.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">9. Lei Aplicável</h2>
            <p className="text-muted-foreground leading-relaxed">
              Os presentes Termos são regidos pela legislação portuguesa. Para a resolução de qualquer litígio será competente o foro da comarca 
              da área de localização da oficina Maslov Motors.
            </p>
          </section>

          <p className="text-muted-foreground text-sm text-center pt-4">
            Última atualização: março de 2025
          </p>
        </div>
      </div>
    </div>
  );
}
