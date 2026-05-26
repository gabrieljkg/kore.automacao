import React, { useState } from 'react';
import { Product } from '../types';
import { X, Save, Lock, Image as ImageIcon } from 'lucide-react';

interface AdminDialogProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSave: (products: Product[]) => void;
}

export function AdminDialog({ isOpen, onClose, products, onSave }: AdminDialogProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [localProducts, setLocalProducts] = useState<Product[]>(products);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'caverna02') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Senha incorreta.');
    }
  };

  const handleChange = (id: string, field: keyof Product, value: string) => {
    setLocalProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleImageUpload = (id: string, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        handleChange(id, 'imageUrl', result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSave(localProducts);
    onClose();
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleClose = () => {
    onClose();
    setIsAuthenticated(false);
    setPassword('');
    setLocalProducts(products);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600" />
            {isAuthenticated ? 'Gerenciar Catálogo' : 'Acesso Restrito'}
          </h2>
          <button onClick={handleClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isAuthenticated ? (
          <div className="p-8 flex flex-col items-center justify-center flex-grow">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Área Administrativa</h3>
            <p className="text-gray-500 mb-6 text-center">Insira a senha de administrador para poder editar as fotos e descrições dos produtos.</p>
            
            <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4">
              <div>
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
                  autoFocus
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
              <button 
                type="submit" 
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
              >
                Acessar
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-6 bg-gray-50">
            <div className="space-y-6">
              {localProducts.map(product => (
                <div key={product.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 shrink-0">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mídia do Produto</label>
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 mb-2 relative group flex items-center justify-center">
                       {product.imageUrl ? (
                         <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                       ) : (
                         <ImageIcon className="w-8 h-8 text-gray-400" />
                       )}
                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <label className="cursor-pointer bg-white px-3 py-1.5 rounded-lg shadow-sm text-xs font-semibold text-gray-800 hover:bg-gray-50 flex items-center gap-1">
                           <ImageIcon className="w-3 h-3" />
                           Trocar Foto
                           <input 
                             type="file" 
                             accept="image/*" 
                             className="hidden" 
                             onChange={(e) => handleImageUpload(product.id, e.target.files?.[0] || null)}
                           />
                         </label>
                       </div>
                    </div>
                    <input
                      type="text"
                      value={product.imageUrl}
                      onChange={(e) => handleChange(product.id, 'imageUrl', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Ou cole a URL aqui..."
                    />
                  </div>
                  
                  <div className="flex-grow space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => handleChange(product.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
                        <input
                          type="text"
                          value={product.price || ''}
                          onChange={(e) => handleChange(product.id, 'price', e.target.value)}
                          placeholder="R$ 0,00 ou Sob consulta"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                      <textarea
                        value={product.description}
                        onChange={(e) => handleChange(product.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer (Actions) */}
        {isAuthenticated && (
          <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-end gap-3 shrink-0">
            <button onClick={handleClose} className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 font-medium rounded-lg transition-colors">
              Cancelar
            </button>
            <button onClick={handleSave} className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors flex items-center gap-2">
              <Save className="w-5 h-5" />
              Salvar Alterações
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
