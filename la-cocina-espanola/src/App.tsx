import React, { useState, useEffect } from 'react';
import { Phone, Clock, MapPin, Menu as MenuIcon, X, ChevronRight, CheckCircle, AlertTriangle } from "lucide-react";

// Tipos para el estado del formulario
interface FormData {
  name: string;
  email: string;
  message: string;
}

// Tipos para el estado del mensaje
interface MessageStatus {
    type: 'success' | 'error' | null;
    text: string | null;
}

function App() {
  // --- Estados de la Aplicación ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  
  // Estados para el formulario de contacto
  const initialFormData: FormData = { name: '', email: '', message: '' };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageStatus, setMessageStatus] = useState<MessageStatus>({ type: null, text: null });

  // --- Efectos ---
  useEffect(() => {
    document.title = 'La Cocina Española - Restaurante';
    // Observador de Intersección (Scroll Spy) para actualizar la sección activa
    const sections = ['home', 'about', 'menu', 'gallery', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // --- Manejadores ---

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    // Limpiar el estado del mensaje al empezar a escribir
    setMessageStatus({ type: null, text: null });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessageStatus({ type: null, text: null });
    
    // Validar mínimamente
    if (!formData.name || !formData.email || !formData.message) {
        setMessageStatus({ type: 'error', text: 'Por favor, complete todos los campos requeridos.' });
        setIsSubmitting(false);
        return;
    }

    // --- Lógica de envío simulada ---
    // En una aplicación real, aquí harías una llamada API (fetch/axios) para enviar los datos.
    setTimeout(() => {
        console.log('Mensaje enviado:', formData);
        
        // Simulación de éxito
        setIsSubmitting(false);
        setFormData(initialFormData); // Resetear formulario
        setMessageStatus({ type: 'success', text: '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.' });
        
        // Limpiar el mensaje después de 5 segundos
        setTimeout(() => setMessageStatus({ type: null, text: null }), 5000);
        
    }, 1500); // 1.5 segundos de retraso para simular carga
  };


  // --- Datos del Restaurante ---
  const menuItems = [
    {
      category: 'Entrantes',
      items: [
        { name: 'Patatas Bravas', price: '€8.50', description: 'Patatas crujientes con salsa picante y alioli' },
        { name: 'Gambas al Ajillo', price: '€12.00', description: 'Camarones salteados con ajo y guindilla' },
        { name: 'Tortilla Española', price: '€7.50', description: 'Tortilla tradicional de patatas y cebolla' },
      ]
    },
    {
      category: 'Platos Principales',
      items: [
        { name: 'Paella Valenciana', price: '€22.00', description: 'Arroz con pollo, conejo y verduras de temporada' },
        { name: 'Lubina a la Sal', price: '€24.50', description: 'Lubina fresca cocinada en costra de sal marina' },
        { name: 'Cochinillo Asado', price: '€26.00', description: 'Cochinillo crujiente con puré de manzana' },
      ]
    },
    {
      category: 'Postres',
      items: [
        { name: 'Crema Catalana', price: '€6.50', description: 'Crema suave con costra de azúcar caramelizado' },
        { name: 'Churros con Chocolate', price: '€5.50', description: 'Churros calientes con chocolate espeso' },
        { name: 'Tarta de Santiago', price: '€7.00', description: 'Tarta de almendra tradicional gallega' },
      ]
    }
  ];

  const galleryImages = [
    'https://roboneo-public.meitudata.com/public/html_imgs/03m3g55cz6r8k1ev/50EA991E_35738a4c-057f-4ec8-84af-9657d983ab09.png',
    'https://roboneo-public.meitudata.com/public/html_imgs/03m3g55cz6r8k1ev/CD608595_345d0032-3dd5-4d3f-80ea-249f715f5e2e.png',
    'https://roboneo-public.meitudata.com/public/html_imgs/03m3g55cz6r8k1ev/46828FCF_b2b5fa4b-b542-410a-a7bc-da9973ab88eb.png',
    'https://roboneo-public.meitudata.com/public/html_imgs/03m3g55cz6r8k1ev/831C9CB7_74819ac5-e700-49ed-800d-511a81f39c6b.png'
  ];

  return (
    <div className="font-sans text-gray-800 min-h-screen bg-white">
      {/* Estilos para el scroll-padding y la fuente se mantienen en App.tsx para conveniencia */}
      <style>{`
        html { scroll-padding-top: 80px; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>
      
      {/* Navigation */}
      <nav className="bg-white shadow-xl fixed w-full z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-extrabold text-amber-800 tracking-wider">La Cocina Española</div>
          
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'menu', 'gallery', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`${
                  activeSection === section 
                    ? 'text-amber-700 border-b-2 border-amber-700 font-semibold' 
                    : 'text-gray-700 hover:text-amber-600'
                } capitalize font-medium transition-colors pb-1`}
              >
                {section === 'home' ? 'Inicio' : 
                 section === 'about' ? 'Sobre Nosotros' : 
                 section === 'menu' ? 'Carta' : 
                 section === 'gallery' ? 'Galería' : 'Contacto'}
              </button>
            ))}
          </div>
          
          <button 
            className="md:hidden p-2 text-gray-700 rounded-lg hover:bg-amber-50 transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-[60] md:hidden transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className="bg-white h-full w-64 p-5 absolute top-0 left-0 shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del menú lo cierre
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-xl font-bold text-amber-800">Menú</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 p-1 hover:text-amber-700 transition-colors">
                <X />
              </button>
            </div>
            <div className="flex flex-col space-y-2">
              {['home', 'about', 'menu', 'gallery', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-left py-3 px-4 rounded-lg flex justify-between items-center transition-colors 
                    ${activeSection === section ? 'bg-amber-100 text-amber-800 font-semibold' : 'text-gray-700 hover:bg-amber-50 hover:text-amber-700'}
                  `}
                >
                  <span className="capitalize">
                    {section === 'home' ? 'Inicio' : 
                     section === 'about' ? 'Sobre Nosotros' : 
                     section === 'menu' ? 'Carta' : 
                     section === 'gallery' ? 'Galería' : 'Contacto'}
                  </span>
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="pt-20 md:pt-0">
        <div className="relative h-screen max-h-[700px]">
          <div className="absolute inset-0">
            {/* Usando una de las imágenes de la galería como hero */}
            <img 
              src={galleryImages[0]} 
              alt="Mesa de comida española" 
              onError={(e: any) => e.target.src = 'https://placehold.co/1200x700/804000/fff?text=La+Cocina+Española'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          </div>
          <div className="relative h-full flex flex-col justify-center items-center text-center px-4 md:px-8">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg">
                La Cocina Española
            </h1>
            <p className="text-xl md:text-3xl text-amber-100 mb-10 font-light italic">
                Auténticos sabores de España en cada plato
            </p>
            <button 
              onClick={() => scrollToSection('menu')}
              className="px-10 py-4 bg-amber-600 text-white text-lg font-semibold rounded-full hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ver Carta Completa
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-4 md:px-8 bg-amber-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-amber-800 mb-16 border-b-2 border-amber-300 pb-3">
              Sobre Nosotros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <p className="text-xl leading-relaxed mb-6 text-gray-700">
                En <span className="font-bold text-amber-700">La Cocina Española</span>, nos dedicamos a traer los auténticos sabores de España a su mesa. Desde nuestra apertura en 2010, hemos mantenido la tradición de utilizar **ingredientes de alta calidad**, muchos de ellos importados directamente de la Península.
              </p>
              <p className="text-lg leading-relaxed mb-6 text-gray-600 italic">
                Nuestros chefs, formados en las mejores escuelas culinarias de Madrid y Barcelona, preparan cada plato con pasión, dedicación y el toque casero que nos caracteriza.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Le invitamos a disfrutar de un ambiente cálido y familiar, donde cada visita se convierte en un pequeño viaje gastronómico.
              </p>
            </div>
            <div className="order-1 md:order-2 rounded-xl overflow-hidden shadow-2xl ring-4 ring-amber-200">
              <img 
                src={galleryImages[1]} 
                alt="Ambiente del restaurante" 
                onError={(e: any) => e.target.src = 'https://placehold.co/800x600/b88b00/fff?text=Interior+del+Restaurante'}
                className="w-full h-full object-cover transform hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-amber-800 mb-16 border-b-2 border-amber-300 pb-3">
              Nuestra Carta
          </h2>
          
          <div className="space-y-16">
            {menuItems.map((category, index) => (
              <div key={index} className="animate-fadeIn">
                <h3 className="text-3xl font-bold text-amber-700 mb-8 text-center bg-amber-100 p-4 rounded-lg shadow-md">
                    {category.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((item, itemIndex) => (
                    <div 
                        key={itemIndex} 
                        className="bg-white p-6 rounded-xl shadow-lg border border-amber-100 hover:shadow-2xl transition-all duration-300 transform hover:translate-y-[-4px]"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xl font-bold text-gray-900">{item.name}</h4>
                        <span className="text-xl font-extrabold text-amber-600 bg-amber-50 px-3 py-1 rounded-full shadow-sm">{item.price}</span>
                      </div>
                      <p className="text-gray-600 text-base">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 md:px-8 bg-amber-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-amber-800 mb-16 border-b-2 border-amber-300 pb-3">
              Galería de Platos
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="relative h-48 sm:h-64 rounded-xl overflow-hidden cursor-pointer shadow-lg transform hover:scale-[1.02] transition-transform duration-300 ring-2 ring-amber-100"
                onClick={() => setSelectedGalleryImage(image)}
              >
                <img 
                  src={image} 
                  alt={`Plato ${index + 1}`} 
                  onError={(e: any) => e.target.src = `https://placehold.co/600x400/804000/fff?text=Plato+${index + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-500 hover:opacity-80"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedGalleryImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-[70] flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <div 
            className="max-w-4xl max-h-[95vh] relative rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedGalleryImage} 
              alt="Vista ampliada" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button 
              className="absolute top-[-10px] right-[-10px] text-white bg-amber-600 hover:bg-amber-700 transition-colors rounded-full p-2 shadow-lg"
              onClick={() => setSelectedGalleryImage(null)}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-amber-800 mb-16 border-b-2 border-amber-300 pb-3">
              Reserva y Contacto
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-amber-50 p-8 rounded-xl shadow-xl border border-amber-100">
              <h3 className="text-2xl font-bold text-amber-700 mb-6 border-b border-amber-300 pb-2">Información del Restaurante</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-amber-600 mr-4 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-bold text-gray-800">Dirección</p>
                    <p className="text-gray-600">Calle Gran Vía 123, 28013 Madrid, España</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-amber-600 mr-4 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-bold text-gray-800">Teléfono</p>
                    <p className="text-gray-600">+34 91 234 56 78</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-amber-600 mr-4 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-bold text-gray-800">Horario</p>
                    <p className="text-gray-600">Lunes a Domingo: 13:00 - 23:30</p>
                    <p className="text-gray-600 italic text-sm">Cierre extendido los fines de semana.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <button 
                    // Esto sería un enlace externo o un modal en una app real
                    onClick={() => setMessageStatus({ type: 'error', text: 'La funcionalidad de reserva se implementará pronto. ¡Llámenos para reservar!' })}
                    className="w-full py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors shadow-lg"
                >
                  Reservar Mesa
                </button>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-amber-700 mb-6 border-b border-amber-300 pb-2">Envíanos un Mensaje</h3>
              
              {/* Mensaje de estado */}
              {messageStatus.text && (
                <div className={`p-4 mb-4 rounded-lg flex items-center ${
                  messageStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {messageStatus.type === 'success' ? <CheckCircle className="mr-3" size={20} /> : <AlertTriangle className="mr-3" size={20} />}
                  <span className="font-medium">{messageStatus.text}</span>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700 mb-1 font-medium" htmlFor="name">Nombre</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1 font-medium" htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1 font-medium" htmlFor="message">Mensaje</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow resize-none"
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full py-3 font-semibold text-white rounded-lg transition-all shadow-md ${
                    isSubmitting 
                        ? 'bg-amber-400 cursor-not-allowed' 
                        : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-10 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-amber-800 pb-6 mb-6">
            <div className="md:col-span-1">
              <h4 className="text-2xl font-extrabold mb-4 text-amber-50">La Cocina Española</h4>
              <p className="text-amber-200 text-sm">La auténtica experiencia gastronómica española en el corazón de Madrid.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Secciones</h4>
              {['home', 'about', 'menu', 'gallery', 'contact'].map((section) => (
                 <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block text-amber-200 hover:text-amber-50 text-sm mb-2 transition-colors text-left"
                >
                    {section === 'home' ? 'Inicio' : 
                     section === 'about' ? 'Sobre Nosotros' : 
                     section === 'menu' ? 'Carta' : 
                     section === 'gallery' ? 'Galería' : 'Contacto'}
                </button>
              ))}
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Horario</h4>
              <p className="mb-1 text-amber-200">Lunes - Viernes: 13:00 - 23:30</p>
              <p className="text-amber-200">Sábado - Domingo: 13:00 - 00:30</p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Contáctanos</h4>
              <p className="mb-1 text-amber-200">Calle Gran Vía 123</p>
              <p className="mb-1 text-amber-200">+34 91 234 56 78</p>
              <p className="text-amber-200">info@lacocinaespanola.es</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-amber-300 text-sm">&copy; {new Date().getFullYear()} La Cocina Española. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
