import { Product, Category } from './types';

export const WHATSAPP_NUMBER = "5534998616893"; // Substitua pelo número real da Kore Automação

export const generateWhatsAppLink = (message: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const categories: Category[] = [
  {
    id: "impressoras",
    name: "Impressoras Térmicas",
    description: "Impressoras de recibos, cupons fiscais e etiquetas."
  },
  {
    id: "leitores",
    name: "Leitores de Código de Barras",
    description: "Modelos com fio, sem fio e com suporte."
  },
  {
    id: "computacao",
    name: "Computação e Telas",
    description: "Smartphones para vendas, monitores e notebooks para caixa."
  },
  {
    id: "suprimentos",
    name: "Suprimentos",
    description: "Bobinas térmicas de alta qualidade e etiquetas."
  },
  {
    id: "conectividade",
    name: "Conectividade e Acessórios",
    description: "Cabos adaptadores OTG, cabos de dados e mais."
  }
];

export const products: Product[] = [
  {
    id: "imp-01",
    name: "Impressora Térmica Não Fiscal 80mm",
    description: "Alta velocidade de impressão, corte automático. Ideal para recibos e pedidos (iFood).",
    imageUrl: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=800&auto=format&fit=crop", 
    category: "impressoras",
    price: "Sob consulta"
  },
  {
    id: "imp-02",
    name: "Impressora de Etiquetas Códigos de Barras",
    description: "Impressão térmica direta, sem necessidade de ribbon. Perfeita para precificação.",
    imageUrl: "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?q=80&w=800&auto=format&fit=crop",
    category: "impressoras",
    price: "Sob consulta"
  },
  {
    id: "leit-01",
    name: "Leitor de Código de Barras Sem Fio",
    description: "Longo alcance, bateria de alta duração. Lê códigos 1D e 2D (QR Code).",
    imageUrl: "https://images.unsplash.com/photo-1607519302521-830209aeeb18?q=80&w=800&auto=format&fit=crop",
    category: "leitores",
    price: "Sob consulta"
  },
  {
    id: "leit-02",
    name: "Leitor Fixo Omnidirecional de Mesa",
    description: "Agilidade máxima no caixa. Leitura automática de alta precisão em qualquer ângulo.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
    category: "leitores",
    price: "Sob consulta"
  },
  {
    id: "comp-01",
    name: "Computador PDV Completo (Touch)",
    description: "Terminal inteligente all-in-one para frente de caixa. Design compacto e ágil.",
    imageUrl: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=800&auto=format&fit=crop",
    category: "computacao",
    price: "Sob consulta"
  },
  {
    id: "comp-02",
    name: "Smartphone Coletor Força de Vendas",
    description: "Resistente a quedas, ideal para controle de estoque e pedidos em restaurantes.",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
    category: "computacao",
    price: "Sob consulta"
  },
  {
    id: "comp-03",
    name: "Smartphone Corporativo Básico",
    description: "Excelente custo-benefício para equipes de vendas. Sistema Android focado em produtividade.",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
    category: "computacao",
    price: "Sob consulta"
  },
  {
    id: "comp-04",
    name: "Smartphone PDV Móvel com Impressora",
    description: "Tudo em um: sistema Android, leitor de código e impressora térmica integrada.",
    imageUrl: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=800&auto=format&fit=crop",
    category: "computacao",
    price: "Sob consulta"
  },
  {
    id: "comp-05",
    name: "Smartphone Coletor Robusto IP68",
    description: "Alta proteção contra água e poeira, bateria de longa duração para operações pesadas.",
    imageUrl: "https://images.unsplash.com/photo-1525598912003-663126343e1f?q=80&w=800&auto=format&fit=crop",
    category: "computacao",
    price: "Sob consulta"
  },
  {
    id: "comp-06",
    name: "Tablet Varejo 10 polegadas",
    description: "Ideal para catálogos digitais e cardápios. Tela ampla e nítida para melhor visualização.",
    imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop",
    category: "computacao",
    price: "Sob consulta"
  },
  {
    id: "comp-07",
    name: "Notebook Retaguarda Varejo i3",
    description: "Notebook confiável para operações fiscais, lançamentos e fechamento de caixa.",
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop",
    category: "computacao",
    price: "Sob consulta"
  },
  {
    id: "comp-08",
    name: "Notebook Gerencial i5",
    description: "Desempenho extra para gestão de relatórios, planilhas e multi-tarefas.",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
    category: "computacao",
    price: "Sob consulta"
  },
  {
    id: "comp-09",
    name: "Notebook Alta Performance i7",
    description: "Para gestores exigentes, suporta sistemas ERP pesados com máxima velocidade e fluidez.",
    imageUrl: "https://images.unsplash.com/photo-1531297172867-4a0b5c150c44?q=80&w=800&auto=format&fit=crop",
    category: "computacao",
    price: "Sob consulta"
  },
  {
    id: "comp-10",
    name: "Notebook Ultrafino Premium",
    description: "Design elegante, perfeito para atendimento ao cliente e reuniões comerciais.",
    imageUrl: "https://images.unsplash.com/photo-1504707748692-419802cf939d?q=80&w=800&auto=format&fit=crop",
    category: "computacao",
    price: "Sob consulta"
  },
  {
    id: "comp-11",
    name: "Notebook Administrativo 15.6\"",
    description: "Teclado numérico dedicado para facilitar lançamentos contábeis e financeiro rápido.",
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop",
    category: "computacao",
    price: "Sob consulta"
  },
  {
    id: "sup-01",
    name: "Caixa de Bobina Térmica 80x40",
    description: "Caixa com 30 unidades. Papel de alta sensibilidade para durabilidade do cupom.",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    category: "suprimentos",
    price: "Sob consulta"
  },
  {
    id: "con-01",
    name: "Cabo Adaptador OTG USB",
    description: "Conecte impressoras e leitores USB diretamente no seu smartphone ou tablet.",
    imageUrl: "https://images.unsplash.com/photo-1588611130642-f90b1adbeabf?q=80&w=800&auto=format&fit=crop",
    category: "conectividade",
    price: "Sob consulta"
  }
];
