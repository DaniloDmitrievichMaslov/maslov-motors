// Marcas de carros e seus modelos mais comuns
export const carBrands: { [brand: string]: string[] } = {
  "Audi": ["A1", "A3", "A4", "A5", "A6", "Q3", "Q5", "Q7", "TT", "RS3", "RS4", "Outro"],
  "BMW": ["Série 1", "Série 2", "Série 3", "Série 4", "Série 5", "X1", "X3", "X5", "X6", "M3", "M5", "Outro"],
  "Citroën": ["C1", "C3", "C4", "C5", "Berlingo", "DS3", "DS4", "DS5", "Outro"],
  "Fiat": ["500", "Panda", "Punto", "Tipo", "Doblo", "Ducato", "Outro"],
  "Ford": ["Fiesta", "Focus", "Mondeo", "Kuga", "Puma", "Ranger", "Transit", "Outro"],
  "Honda": ["Civic", "Jazz", "CR-V", "HR-V", "Accord", "City", "Outro"],
  "Hyundai": ["i10", "i20", "i30", "Tucson", "Santa Fe", "Kona", "Outro"],
  "Kia": ["Picanto", "Rio", "Ceed", "Sportage", "Sorento", "Niro", "Outro"],
  "Mercedes-Benz": ["Classe A", "Classe B", "Classe C", "Classe E", "GLA", "GLC", "GLE", "Outro"],
  "Nissan": ["Micra", "Juke", "Qashqai", "X-Trail", "Leaf", "Navara", "Outro"],
  "Opel": ["Corsa", "Astra", "Insignia", "Mokka", "Crossland", "Grandland", "Outro"],
  "Peugeot": ["208", "308", "508", "2008", "3008", "5008", "Partner", "Outro"],
  "Renault": ["Clio", "Megane", "Captur", "Kadjar", "Scenic", "Trafic", "Outro"],
  "Seat": ["Ibiza", "Leon", "Arona", "Ateca", "Tarraco", "Outro"],
  "Skoda": ["Fabia", "Octavia", "Superb", "Kamiq", "Karoq", "Kodiaq", "Outro"],
  "Toyota": ["Yaris", "Corolla", "Camry", "RAV4", "C-HR", "Hilux", "Outro"],
  "Volkswagen": ["Polo", "Golf", "Passat", "Tiguan", "T-Roc", "T-Cross", "Touareg", "Outro"],
  "Volvo": ["V40", "V60", "V90", "XC40", "XC60", "XC90", "S60", "Outro"],
};

// Lista de marcas ordenada
export const brandsList = Object.keys(carBrands).sort();

// Serviços disponíveis na oficina
export const availableServices = [
  { id: "revisao_geral", name: "Revisão Geral", description: "Inspeção completa do veículo" },
  { id: "mudanca_oleo", name: "Mudança de Óleo", description: "Substituição de óleo e filtro" },
  { id: "travoes", name: "Revisão de Travões", description: "Verificação e substituição de pastilhas/discos" },
  { id: "pneus", name: "Substituição de Pneus", description: "Troca e alinhamento de pneus" },
  { id: "alinhamento", name: "Alinhamento e Balanceamento", description: "Alinhamento da direção e balanceamento das rodas" },
  { id: "suspensao", name: "Suspensão", description: "Verificação e reparação da suspensão" },
  { id: "ac", name: "Ar Condicionado", description: "Recarga e manutenção do A/C" },
  { id: "bateria", name: "Bateria", description: "Verificação e substituição de bateria" },
  { id: "correia_distribuicao", name: "Correia de Distribuição", description: "Substituição da correia de distribuição" },
  { id: "embraiagem", name: "Embraiagem", description: "Reparação/substituição de embraiagem" },
  { id: "escapamento", name: "Sistema de Escape", description: "Reparação do sistema de escape" },
  { id: "injecao", name: "Sistema de Injeção", description: "Limpeza e manutenção do sistema de injeção" },
  { id: "eletrica", name: "Parte Elétrica", description: "Diagnóstico e reparação elétrica" },
  { id: "diagnostico", name: "Diagnóstico Eletrónico", description: "Leitura de códigos de erro do computador de bordo" },
  { id: "vidros", name: "Vidros e Espelhos", description: "Reparação/substituição de vidros" },
  { id: "chapa_pintura", name: "Chapa e Pintura", description: "Reparação de carroçaria e pintura" },
  { id: "outro", name: "Outro Serviço", description: "Serviço personalizado não listado" },
];

// Cores comuns de carros
export const carColors = [
  "Preto",
  "Branco",
  "Cinzento",
  "Prata",
  "Azul",
  "Vermelho",
  "Verde",
  "Amarelo",
  "Laranja",
  "Castanho",
  "Bordeaux",
  "Bege",
  "Dourado",
  "Outro",
];
