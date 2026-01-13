"use client";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1628] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Columna 1: Branding */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              {/* Logo Icon */}
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="8" fill="#35D07F" fillOpacity="0.1"/>
                <path d="M12 28V12H16V24H28V28H12Z" fill="#35D07F"/>
                <path d="M20 20L24 16L28 20" stroke="#35D07F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24 16V26" stroke="#35D07F" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-xl font-bold text-white tracking-tight">LatamFi</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Impulsando la inclusión financiera en América Latina a través de tecnología blockchain accesible y eficiente.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#35D07F]"></span>
              <span className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">Potenciado por Celo</span>
            </div>
          </div>

          {/* Columna 2: Producto */}
          <div>
            <h4 className="text-white font-semibold mb-6">Producto</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="/remittance" className="hover:text-[#35D07F] transition-colors">Remesas</a></li>
              <li><a href="/credit" className="hover:text-[#35D07F] transition-colors">Microcréditos</a></li>
              <li><a href="/send" className="hover:text-[#35D07F] transition-colors">Pago de Servicios</a></li>
              <li><a href="#" className="hover:text-[#35D07F] transition-colors">Tasas y Comisiones</a></li>
            </ul>
          </div>

          {/* Columna 3: Ecosistema */}
          <div>
            <h4 className="text-white font-semibold mb-6">Ecosistema</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#35D07F] transition-colors">Documentación</a></li>
              <li><a href="#" className="hover:text-[#35D07F] transition-colors">Gobernanza</a></li>
              <li><a href="#" className="hover:text-[#35D07F] transition-colors">Seguridad</a></li>
              <li><a href="#" className="hover:text-[#35D07F] transition-colors">Red Celo</a></li>
            </ul>
          </div>

          {/* Columna 4: Comunidad */}
          <div>
            <h4 className="text-white font-semibold mb-6">Comunidad</h4>
            <div className="flex gap-4 mb-6">
              {/* Twitter/X Icon */}
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#35D07F]/20 hover:text-[#35D07F] transition-all text-gray-400"
                aria-label="Twitter/X"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* Discord Icon */}
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#35D07F]/20 hover:text-[#35D07F] transition-all text-gray-400"
                aria-label="Discord"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.862-1.297 1.197-1.99a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.863-.886.077.077 0 0 1-.008-.128c.125-.094.248-.192.366-.292a.077.077 0 0 1 .081-.01c3.901 1.787 8.124 1.787 11.968 0a.077.077 0 0 1 .081.01c.118.1.241.198.366.292a.077.077 0 0 1-.008.128 12.51 12.51 0 0 1-1.863.886.076.076 0 0 0-.041.106c.335.693.735 1.36 1.197 1.99a.078.078 0 0 0 .084.028 19.83 19.83 0 0 0 6.026-3.03.077.077 0 0 0 .032-.057c.478-5.186-.807-9.674-3.593-13.656a.07.07 0 0 0-.032-.027z"/>
                </svg>
              </a>
            </div>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {currentYear} LatamFi. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-gray-500 text-xs flex items-center gap-1">
              Status: <span className="text-[#35D07F]">Mainnet Online</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
