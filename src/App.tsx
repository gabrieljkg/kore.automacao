import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Headset, 
  CheckCircle, 
  MessageCircle, 
  Instagram, 
  ChevronRight,
  MonitorSmartphone,
  Printer,
  ScanLine,
  Box,
  Cable,
  Settings
} from 'lucide-react';
import { categories, products as defaultProducts, generateWhatsAppLink } from './data';
import { Product } from './types';
import { AdminDialog } from './components/AdminDialog';
import { supabase } from './lib/supabase';

function App() {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (supabase) {
        const { data, error } = await supabase.from('products').select('*');
        if (data && data.length > 0) {
          setProducts(data as Product[]);
          return;
        }
      }
      
      // Fallback para LocalStorage se não houver Supabase configurado ou tabela vazia
      const saved = localStorage.getItem('kore_products');
      if (saved) {
        try {
          setProducts(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse products from local storage");
        }
      }
    };
    
    fetchProducts();
  }, []);

  const handleSaveProducts = async (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('kore_products', JSON.stringify(newProducts));
    
    // Sincroniza com Supabase se disponível
    if (supabase) {
      const { error } = await supabase.from('products').upsert(newProducts);
      if (error) {
        console.error("Erro ao salvar no Supabase:", error);
        alert("Erro ao sincronizar com banco de dados em nuvem. As alterações foram salvas apenas localmente.");
      }
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'impressoras': return <Printer className="w-5 h-5" />;
      case 'leitores': return <ScanLine className="w-5 h-5" />;
      case 'computacao': return <MonitorSmartphone className="w-5 h-5" />;
      case 'suprimentos': return <Box className="w-5 h-5" />;
      case 'conectividade': return <Cable className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 scroll-smooth">
      {/* Navbar Minimalista */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                <Box className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-blue-900">Kore Automação</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#produtos" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Produtos</a>
              <a href="#diferenciais" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Por que a Kore?</a>
              <button onClick={() => setIsAdminOpen(true)} className="text-gray-400 hover:text-blue-600 transition-colors" title="Administração">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-24 lg:py-32 overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-blue-800 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[400px] h-[400px] bg-blue-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-800 text-blue-100 text-sm font-semibold tracking-wide mb-6">
              O parceiro ideal para o seu negócio
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Equipamentos de Automação Comercial com Suporte Técnico Especializado.
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl leading-relaxed">
              Transforme seu comércio em uma máquina de vendas com ferramentas modernas e pronta entrega. Soluções completas para agilidade no caixa e gestão.
            </p>
            <a 
              href={generateWhatsAppLink("Olá! Gostaria de falar com um especialista sobre equipamentos de automação.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto"
            >
              <MessageCircle className="w-6 h-6" />
              Falar com Especialista no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section id="diferenciais" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Por que escolher a Kore Automação?</h2>
            <p className="text-gray-500 text-lg">Garantimos a operação do seu negócio com agilidade, credibilidade e tecnologia de ponta.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-100 transition-colors">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pronta Entrega</h3>
              <p className="text-gray-600 leading-relaxed">
                Equipamentos rigorosamente testados e disponíveis para envio imediato. Seu negócio não pode parar.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-100 transition-colors">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <Headset className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Suporte Técnico</h3>
              <p className="text-gray-600 leading-relaxed">
                Auxiliamos você na instalação e configuração dos aparelhos para que tudo funcione perfeitamente.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-100 transition-colors">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Compatibilidade</h3>
              <p className="text-gray-600 leading-relaxed">
                Equipamentos homologados e perfeitamente compatíveis com os principais sistemas de PDV e caixa do mercado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo Section */}
      <section id="produtos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Nosso Catálogo</h2>
            <p className="text-gray-500 text-lg">Tudo o que você precisa para uma frente de caixa eficiente e moderna.</p>
          </div>

          <div className="space-y-16">
            {categories.map((category) => {
              const categoryProducts = products.filter(p => p.category === category.id);
              if (categoryProducts.length === 0) return null;

              return (
                <div key={category.id} className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
                    <div className="text-blue-600">
                      {getCategoryIcon(category.id)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryProducts.map((product) => (
                      <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full group">
                        <div className="relative aspect-square overflow-hidden bg-gray-100">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <h4 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{product.name}</h4>
                          <p className="text-gray-500 text-sm mb-4 flex-grow">{product.description}</p>
                          
                          {product.price && (
                            <div className="mb-4 text-left">
                              <span className="text-lg font-bold text-green-600">{product.price}</span>
                            </div>
                          )}

                          <a 
                            href={generateWhatsAppLink(`Olá! Tenho interesse no produto: *${product.name}*${product.price && product.price !== 'Sob consulta' ? ` (${product.price})` : ''}. Pode me passar mais detalhes e o prazo de envio?`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-50 text-green-700 hover:bg-green-500 hover:text-white font-bold rounded-xl transition-colors shrink-0"
                          >
                            <MessageCircle className="w-5 h-5" />
                            {product.price && product.price !== 'Sob consulta' ? 'Comprar Agora' : 'Consultar Preço'}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 border-b border-gray-800 pb-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <Box className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-white tracking-tight">Kore Automação</span>
              </div>
              <p className="text-sm">
                Transformando comércios em máquinas de vendas com tecnologia e suporte especializado.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Atendimento</h4>
              <p className="text-sm mb-2">Segunda a Sexta: 08h às 18h</p>
              <p className="text-sm mb-2">Sábado: 08h às 12h</p>
              <a 
                href={generateWhatsAppLink("Olá! Preciso de suporte em automação comercial.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-400 hover:text-green-300 inline-flex items-center mt-2 group"
              >
                Suporte Técnico via WhatsApp
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Redes Sociais</h4>
              <a 
                href="#"
                className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
                @koreautomacao
              </a>
            </div>
          </div>
          
          <div className="text-sm text-center flex flex-col md:flex-row justify-center items-center gap-4">
            <span>© 2026 Kore Automação. Todos os direitos reservados.</span>
            <button onClick={() => setIsAdminOpen(true)} className="text-gray-600 hover:text-gray-300 text-xs flex items-center gap-1 transition-colors">
              <Settings className="w-3 h-3" />
              Área Restrita (Admin)
            </button>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={generateWhatsAppLink("Olá! Estou no site da Kore Automação e gostaria de tirar algumas dúvidas.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all focus:outline-none focus:ring-4 focus:ring-green-500/50"
        aria-label="Falar com Especialista no WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </a>
      
      <AdminDialog 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        products={products}
        onSave={handleSaveProducts}
      />
    </div>
  );
}

export default App;
