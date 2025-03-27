import React, { useState, useEffect } from 'react';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Dialog } from '@headlessui/react';

function App() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('es');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const translations = {
    es: {
      features: 'Características',
      video: 'Video',
      gallery: 'Galería',
      testimonials: 'Testimonios',
      pricing: 'Precios',
      buyNow: 'Comprar Ahora',
      reserveNow: '¡Reserva Ahora!',
      healthMonitoring: 'Monitoreo de Salud',
      healthDescription: 'Seguimiento de ritmo cardíaco, oxígeno en sangre y actividad física 24/7',
      waterResistant: 'Resistente al Agua',
      waterDescription: 'IP68 certificado, perfecto para nadar y actividades acuáticas',
      batteryLife: 'Batería Duradera',
      batteryDescription: 'Hasta 7 días de autonomía con una sola carga',
      whyChoose: '¿Por qué elegir Smart Watch Pro?',
      shipping: 'Envío gratis a todo el mundo',
      changeLang: 'English',
      tagline: 'Tu vida conectada en tu muñeca',
      heroDescription: 'El reloj inteligente que revoluciona tu día a día con tecnología de última generación',
      reserveYours: '¡Reserva el Tuyo!',
      seeFeatures: 'Ver Características',
      paymentProcess: 'Proceso de Pago',
      paymentInfo: 'Información de Pago',
      cardNumber: 'Número de Tarjeta',
      cardName: 'Nombre en la Tarjeta',
      expiryDate: 'Fecha de Expiración',
      continue: 'Continuar',
      confirmation: 'Confirmación',
      freeShipping: 'Envío Gratis',
      confirmPayment: 'Confirmar Pago',
      successfulPayment: '¡Pago Exitoso!',
      thankYou: 'Gracias por tu compra',
      whatUsersSay: 'Lo que dicen nuestros usuarios',
      athlete: 'Deportista',
      executive: 'Ejecutivo',
      yogaTeacher: 'Profesora de Yoga',
      testimonial1: 'El Smart Watch Pro ha revolucionado mi rutina de entrenamiento. ¡La batería dura una eternidad!',
      testimonial2: 'Perfecto para mantenerme conectado durante mis reuniones. El diseño es espectacular.',
      testimonial3: 'El monitor de frecuencia cardíaca y las funciones de mindfulness son exactamente lo que necesitaba.',
      contact: 'Contacto',
      followUs: 'Síguenos',
      allRightsReserved: '© 2024 Smart Watch Pro. Todos los derechos reservados.',
      connectedLife: 'Tu vida conectada en tu muñeca',
      advancedHealthMonitoring: '✓ Monitoreo de salud avanzado',
      waterResistantFeature: '✓ Resistente al agua IP68',
      batteryLifeFeature: '✓ 7 días de batería',
      freeShippingFeature: '✓ Envío gratis',
      originalPrice: 'Precio original:'
    },
    en: {
      features: 'Features',
      video: 'Video',
      gallery: 'Gallery',
      testimonials: 'Testimonials',
      pricing: 'Pricing',
      buyNow: 'Buy Now',
      reserveNow: 'Reserve Now!',
      healthMonitoring: 'Health Monitoring',
      healthDescription: '24/7 heart rate, blood oxygen and physical activity tracking',
      waterResistant: 'Water Resistant',
      waterDescription: 'IP68 certified, perfect for swimming and water activities',
      batteryLife: 'Long Battery Life',
      batteryDescription: 'Up to 7 days of autonomy on a single charge',
      whyChoose: 'Why Choose Smart Watch Pro?',
      shipping: 'Free worldwide shipping',
      changeLang: 'Español',
      tagline: 'Your connected life on your wrist',
      heroDescription: 'The smartwatch that revolutionizes your daily life with cutting-edge technology',
      reserveYours: 'Reserve Yours!',
      seeFeatures: 'See Features',
      watchHowItWorks: 'Watch how it works',
      imageGallery: 'Image Gallery',
      specialLaunchOffer: 'Special Launch Offer',
      advancedHealthMonitoring: '✓ Advanced health monitoring',
      waterResistantFeature: '✓ IP68 water resistant',
      batteryLifeFeature: '✓ 7-day battery life',
      freeShippingFeature: '✓ Free shipping',
      originalPrice: 'Original price:',
      paymentProcess: 'Payment Process',
      paymentInfo: 'Payment Information',
      cardNumber: 'Card Number',
      cardName: 'Cardholder Name',
      expiryDate: 'Expiry Date',
      continue: 'Continue',
      confirmation: 'Confirmation',
      freeShipping: 'Free Shipping',
      confirmPayment: 'Confirm Payment',
      successfulPayment: 'Payment Successful!',
      thankYou: 'Thank you for your purchase',
      whatUsersSay: 'What our users say',
      athlete: 'Athlete',
      executive: 'Executive',
      yogaTeacher: 'Yoga Teacher',
      testimonial1: 'Smart Watch Pro has revolutionized my training routine. The battery lasts forever!',
      testimonial2: 'Perfect for staying connected during my meetings. The design is spectacular.',
      testimonial3: 'The heart rate monitor and mindfulness features are exactly what I needed.',
      contact: 'Contact',
      followUs: 'Follow Us',
      allRightsReserved: '© 2024 Smart Watch Pro. All rights reserved.',
      connectedLife: 'Your connected life on your wrist'
    }
  };

  const t = (key) => translations[language][key] || key;

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setPaymentStep(paymentStep + 1);
    if (paymentStep === 3) {
      setTimeout(() => {
        setIsPaymentModalOpen(false);
        setPaymentStep(1);
      }, 2000);
    }
  };

  const testimonials = [
    {
      name: "María García",
      role: t('athlete'),
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      text: t('testimonial1')
    },
    {
      name: "Carlos Rodríguez",
      role: t('executive'),
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
      text: t('testimonial2')
    },
    {
      name: "Ana Martínez",
      role: t('yogaTeacher'),
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
      text: t('testimonial3')
    }
  ];

  const handleHeroImageMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 10; // Max 10 degrees
    const rotateX = ((centerY - y) / centerY) * 10; // Max 10 degrees

    // Update CSS variables for the gradient effect
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

    // Apply the 3D rotation
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleHeroImageLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'rotateX(0) rotateY(0)';
  };

  return (
    <div className="App">
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="nav-menu">
          <button 
            className={`mobile-menu-button ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="logo">
            <svg
              className="logo-svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2z"
                stroke="#61dafb"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M16 6v10l7 7"
                stroke="#61dafb"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 11a1 1 0 100-2 1 1 0 000 2z"
                fill="#61dafb"
              />
            </svg>
            <span className="logo-text">Smart Watch Pro</span>
          </div>
          <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
            <button className="language-toggle" onClick={toggleLanguage}>
              {t('changeLang')}
            </button>
            <a href="#features" className="nav-link" onClick={(e) => handleNavClick(e, 'features')}>
              {t('features')}
            </a>
            <a href="#video" className="nav-link" onClick={(e) => handleNavClick(e, 'video')}>
              {t('video')}
            </a>
            <a href="#gallery" className="nav-link" onClick={(e) => handleNavClick(e, 'gallery')}>
              {t('gallery')}
            </a>
            <a href="#testimonials" className="nav-link" onClick={(e) => handleNavClick(e, 'testimonials')}>
              {t('testimonials')}
            </a>
            <a href="#pricing" className="nav-link" onClick={(e) => handleNavClick(e, 'pricing')}>
              {t('pricing')}
            </a>
            <button className="nav-cta" onClick={() => setIsPaymentModalOpen(true)}>
              {t('buyNow')}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text" data-aos="fade-right">
              <h1>Smart Watch Pro</h1>
              <p className="tagline">{t('tagline')}</p>
              <p className="hero-description">{t('heroDescription')}</p>
              <div className="hero-buttons">
                <button className="cta-button primary" onClick={() => setIsPaymentModalOpen(true)}>
                  {t('reserveYours')}
                </button>
                <button className="cta-button secondary">{t('seeFeatures')}</button>
              </div>
            </div>
            <div 
              className="hero-image" 
              data-aos="fade-left"
              onMouseMove={handleHeroImageMove}
              onMouseLeave={handleHeroImageLeave}
            >
              <img 
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80" 
                alt="Smart Watch Pro Hero" 
              />
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <h2>{t('whyChoose')}</h2>
          <div className="features-grid">
            <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 10C23.4315 10 10 23.4315 10 40C10 56.5685 23.4315 70 40 70C56.5685 70 70 56.5685 70 40C70 23.4315 56.5685 10 40 10Z" stroke="#61dafb" strokeWidth="4" fill="none"/>
                  <path d="M40 20C28.9543 20 20 28.9543 20 40C20 51.0457 28.9543 60 40 60" stroke="#61dafb" strokeWidth="4" fill="none"/>
                  <path d="M40 30L40 40L50 50" stroke="#61dafb" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>{t('healthMonitoring')}</h3>
              <p>{t('healthDescription')}</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 30C20 20 30 10 40 10C50 10 60 20 60 30" stroke="#61dafb" strokeWidth="4" fill="none"/>
                  <path d="M60 50C60 60 50 70 40 70C30 70 20 60 20 50" stroke="#61dafb" strokeWidth="4" fill="none"/>
                  <path d="M40 25V55" stroke="#61dafb" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M30 35L40 45L50 35" stroke="#61dafb" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>{t('waterResistant')}</h3>
              <p>{t('waterDescription')}</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="15" y="25" width="50" height="30" rx="5" stroke="#61dafb" strokeWidth="4" fill="none"/>
                  <path d="M65 35H70V45H65" stroke="#61dafb" strokeWidth="4"/>
                  <rect x="20" y="30" width="40" height="20" fill="#61dafb" fillOpacity="0.2"/>
                </svg>
              </div>
              <h3>{t('batteryLife')}</h3>
              <p>{t('batteryDescription')}</p>
            </div>
          </div>
        </section>

        <section id="testimonials" className="testimonials-section">
          <h2 data-aos="fade-up">{t('whatUsersSay')}</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="testimonial-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="testimonial-image">
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="video" className="video-section">
          <h2>{t('watchHowItWorks')}</h2>
          <div className="video-container">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Smart Watch Pro Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        <section id="gallery" className="gallery-section">
          <h2>{t('imageGallery')}</h2>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80" alt="Smart Watch Pro 1" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" alt="Smart Watch Pro 2" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80" alt="Smart Watch Pro 3" />
            </div>
          </div>
        </section>

        <section id="pricing" className="pricing-section">
          <h2>{t('specialLaunchOffer')}</h2>
          <div className="pricing-container">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Smart Watch Pro</h3>
                <div className="price-tag">
                  <p className="price">$199.99</p>
                  <p className="original-price">{t('originalPrice')} $299.99</p>
                </div>
              </div>
              <ul className="pricing-features">
                <li>{t('advancedHealthMonitoring')}</li>
                <li>{t('waterResistantFeature')}</li>
                <li>{t('batteryLifeFeature')}</li>
                <li>{t('freeShippingFeature')}</li>
              </ul>
              <button 
                className="cta-button primary"
                onClick={() => setIsPaymentModalOpen(true)}
              >
                {t('reserveNow')}
              </button>
              <p className="shipping">{t('shipping')}</p>
            </div>
          </div>
        </section>

        <Dialog 
          open={isPaymentModalOpen} 
          onClose={() => setIsPaymentModalOpen(false)}
          className="payment-modal-container"
        >
          <div className="payment-modal">
            <Dialog.Panel className="payment-modal-content">
              <div className="payment-header">
                <h3>{t('paymentProcess')}</h3>
                <button 
                  className="close-button"
                  onClick={() => setIsPaymentModalOpen(false)}
                >
                  ×
                </button>
              </div>

              {paymentStep === 1 && (
                <div className="payment-step" data-aos="fade-up">
                  <h4>{t('paymentInfo')}</h4>
                  <h4>Información de Pago</h4>
                  <form onSubmit={handlePaymentSubmit} className="payment-form">
                    <div className="form-group">
                      <label>Número de Tarjeta</label>
                      <input 
                        type="text" 
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Nombre en la Tarjeta</label>
                      <input 
                        type="text" 
                        placeholder="NOMBRE APELLIDO"
                        value={formData.cardName}
                        onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Fecha de Expiración</label>
                        <input 
                          type="text" 
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input 
                          type="text" 
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                        />
                      </div>
                    </div>
                    <button type="submit" className="cta-button primary">
                      Continuar
                    </button>
                  </form>
                </div>
              )}

              {paymentStep === 2 && (
                <div className="payment-step" data-aos="fade-up">
                  <h4>Confirmación</h4>
                  <div className="confirmation-details">
                    <p>Smart Watch Pro</p>
                    <p className="price">$199.99</p>
                    <p>Envío Gratis</p>
                  </div>
                  <button onClick={handlePaymentSubmit} className="cta-button primary">
                    Confirmar Pago
                  </button>
                </div>
              )}

              {paymentStep === 3 && (
                <div className="payment-step success" data-aos="fade-up">
                  <div className="success-animation">✓</div>
                  <h4>¡Pago Exitoso!</h4>
                  <p>Gracias por tu compra</p>
                </div>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h4>Smart Watch Pro</h4>
            <p>Tu vida conectada en tu muñeca</p>
          </div>
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>Email: info@smartwatchpro.com</p>
            <p>Tel: (123) 456-7890</p>
          </div>
          <div className="footer-section">
            <h4>{t('followUs')}</h4>
            <div className="social-links">
              <a 
                href="https://facebook.com/smartwatchpro" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a 
                href="https://instagram.com/smartwatchpro" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a 
                href="https://twitter.com/smartwatchpro" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Smart Watch Pro. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
