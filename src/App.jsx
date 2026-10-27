import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AskQuestionSection from './components/AskQuestionSection';
import Footer from './components/Footer';

export default function App() {
  const handleScrollToAsk = () => {
    const askElement = document.getElementById('ask');
    if (askElement) {
      askElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black text-[#e5e5e5] min-h-screen selection:bg-white selection:text-black">
      {/* Navigation Bar */}
      <Navbar
        onLaunchDemo={handleScrollToAsk}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          onLaunchDemo={handleScrollToAsk}
          onExplorePipeline={handleScrollToAsk}
        />

        {/* Live Ask Any HR Policy Question Studio */}
        <AskQuestionSection />
      </main>

      {/* Footer */}
      <Footer
        onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </div>
  );
}
