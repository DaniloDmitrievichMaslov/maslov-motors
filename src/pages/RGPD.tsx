import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RGPD() {
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
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Política de Privacidade & RGPD</h1>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Responsável pelo Tratamento de Dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              A entidade responsável pelo tratamento dos dados pessoais recolhidos através desta aplicação é a <strong className="text-foreground">Maslov Motors</strong>, 
              oficina de reparação e manutenção automóvel, com contacto telefónico +351 933 468 899.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">2. Dados Pessoais Recolhidos</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">No âmbito da utilização desta aplicação, são recolhidos os seguintes dados pessoais:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Nome completo (primeiro e último nome)</li>
              <li>Endereço de email</li>
              <li>Número de telefone</li>
              <li>Dados dos veículos (marca, modelo, matrícula, ano, cor, quilometragem)</li>
              <li>Histórico de serviços realizados</li>
              <li>Mensagens enviadas através do chatbot e pedidos de orçamento</li>
            </ul>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">3. Finalidade do Tratamento</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">Os dados pessoais são tratados para as seguintes finalidades:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Registo e autenticação de utilizadores na plataforma</li>
              <li>Gestão de veículos e histórico de serviços</li>
              <li>Processamento de pedidos de orçamento e marcações</li>
              <li>Comunicação com o cliente sobre os seus serviços</li>
              <li>Assistência através do chatbot com inteligência artificial</li>
              <li>Elaboração de estatísticas internas de gestão</li>
            </ul>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Base Legal</h2>
            <p className="text-muted-foreground leading-relaxed">
              O tratamento dos dados pessoais é realizado com base no <strong className="text-foreground">consentimento do titular</strong> (ao registar-se na plataforma) 
              e na <strong className="text-foreground">execução de contrato</strong> (prestação de serviços de oficina), nos termos do artigo 6.º do Regulamento (UE) 2016/679 (RGPD).
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Conservação dos Dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              Os dados pessoais são conservados durante o período necessário para a finalidade que motivou a sua recolha, ou pelo período legalmente exigido. 
              O utilizador pode solicitar a eliminação da sua conta e dos dados associados a qualquer momento.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Direitos do Titular</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">Nos termos do RGPD, o utilizador tem direito a:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong className="text-foreground">Acesso</strong> — consultar os seus dados pessoais</li>
              <li><strong className="text-foreground">Retificação</strong> — corrigir dados inexatos ou incompletos</li>
              <li><strong className="text-foreground">Eliminação</strong> — solicitar a eliminação dos seus dados ("direito ao esquecimento")</li>
              <li><strong className="text-foreground">Portabilidade</strong> — receber os seus dados num formato estruturado</li>
              <li><strong className="text-foreground">Oposição</strong> — opor-se ao tratamento dos dados para determinadas finalidades</li>
              <li><strong className="text-foreground">Limitação</strong> — restringir o tratamento dos dados em determinadas circunstâncias</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Para exercer estes direitos, contacte-nos através do telefone +351 933 468 899 ou presencialmente na oficina.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">7. Segurança dos Dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Maslov Motors implementa medidas técnicas e organizativas adequadas para proteger os dados pessoais, incluindo:
              encriptação de comunicações (HTTPS/TLS), autenticação segura com hash de palavras-passe, 
              políticas de Row Level Security (RLS) na base de dados e controlo de acesso baseado em papéis (roles).
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">8. Entidade de Controlo</h2>
            <p className="text-muted-foreground leading-relaxed">
              Caso considere que os seus direitos não foram devidamente respeitados, pode apresentar reclamação junto da 
              <strong className="text-foreground"> Comissão Nacional de Proteção de Dados (CNPD)</strong> — <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.cnpd.pt</a>.
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
