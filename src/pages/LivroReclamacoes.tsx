import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LivroReclamacoes() {
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
            <BookOpen className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Livro de Reclamações</h1>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">O que é o Livro de Reclamações?</h2>
            <p className="text-muted-foreground leading-relaxed">
              O Livro de Reclamações é um instrumento que permite aos consumidores apresentar queixas sobre bens ou serviços adquiridos. 
              É obrigatório por lei em todos os estabelecimentos que tenham contacto com o público, incluindo oficinas automóveis, 
              nos termos do Decreto-Lei n.º 156/2005, de 15 de setembro.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">Livro de Reclamações Físico</h2>
            <p className="text-muted-foreground leading-relaxed">
              O Livro de Reclamações em formato físico está disponível nas instalações da oficina <strong className="text-foreground">Maslov Motors</strong>. 
              Qualquer cliente pode solicitar o acesso ao mesmo durante o horário de funcionamento. 
              A oficina é obrigada a disponibilizá-lo de imediato, sem necessidade de justificação.
            </p>
            <div className="mt-4 p-4 bg-secondary/50 rounded-lg border border-border/20">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Horário de funcionamento:</strong><br />
                Segunda a Sexta: 9h–12h30 / 14h–19h<br />
                Sábado: 9h–13h<br />
                Domingo: Encerrado
              </p>
            </div>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">Livro de Reclamações Eletrónico</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Para além do livro físico, pode também apresentar a sua reclamação online através do 
              <strong className="text-foreground"> Livro de Reclamações Eletrónico</strong>, disponibilizado pelo Governo de Portugal.
            </p>
            <a
              href="https://www.livroreclamacoes.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <ExternalLink className="h-4 w-4" />
                Aceder ao Livro de Reclamações Eletrónico
              </Button>
            </a>
            <p className="text-muted-foreground text-sm mt-4">
              Website oficial: <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.livroreclamacoes.pt</a>
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">Como Apresentar uma Reclamação</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">1</div>
                <div>
                  <p className="text-foreground font-medium">Presencialmente</p>
                  <p className="text-muted-foreground text-sm">Dirija-se à oficina e solicite o Livro de Reclamações físico.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">2</div>
                <div>
                  <p className="text-foreground font-medium">Online</p>
                  <p className="text-muted-foreground text-sm">Aceda ao site <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.livroreclamacoes.pt</a> e preencha o formulário eletrónico.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">3</div>
                <div>
                  <p className="text-foreground font-medium">Entidade Reguladora</p>
                  <p className="text-muted-foreground text-sm">As reclamações são automaticamente encaminhadas para a entidade reguladora competente (ASAE — Autoridade de Segurança Alimentar e Económica).</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 border border-border/30">
            <h2 className="text-xl font-semibold text-foreground mb-4">Entidades de Resolução de Litígios</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Em caso de litígio de consumo, pode recorrer às seguintes entidades de resolução alternativa de litígios:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong className="text-foreground">CNIACC</strong> — Centro Nacional de Informação e Arbitragem de Conflitos de Consumo (<a href="https://www.cniacc.pt" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.cniacc.pt</a>)</li>
              <li><strong className="text-foreground">DECO</strong> — Associação Portuguesa para a Defesa do Consumidor (<a href="https://www.deco.proteste.pt" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.deco.proteste.pt</a>)</li>
            </ul>
          </section>

          <p className="text-muted-foreground text-sm text-center pt-4">
            Última atualização: março de 2025
          </p>
        </div>
      </div>
    </div>
  );
}
