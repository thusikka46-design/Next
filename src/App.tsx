/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingAiAssistant } from './components/FloatingAiAssistant';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { BookDemoModal } from './components/BookDemoModal';
import { WorkflowRequestModal } from './components/WorkflowRequestModal';

import { HomePage } from './pages/HomePage';
import { SolutionsPage } from './pages/SolutionsPage';
import { AssetsPage } from './pages/AssetsPage';
import { VaultPage } from './pages/VaultPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { PricingPage } from './pages/PricingPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isBookDemoOpen, setIsBookDemoOpen] = useState<boolean>(false);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#05070F] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200' 
        : 'bg-[#f4f7fb] text-slate-900 selection:bg-blue-500/30 selection:text-blue-900'
    }`}>
      {/* Sticky Global Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookDemo={() => setIsBookDemoOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Page View Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBookDemo={() => setIsBookDemoOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}

        {currentPage === 'solutions' && (
          <SolutionsPage
            onNavigate={handleNavigate}
            onRequestWorkflow={() => setIsWorkflowModalOpen(true)}
            onOpenBookDemo={() => setIsBookDemoOpen(true)}
          />
        )}

        {currentPage === 'assets' && (
          <AssetsPage
            onNavigate={handleNavigate}
            onOpenBookDemo={() => setIsBookDemoOpen(true)}
          />
        )}

        {currentPage === 'vault' && (
          <VaultPage
            onNavigate={handleNavigate}
            onOpenBookDemo={() => setIsBookDemoOpen(true)}
          />
        )}

        {currentPage === 'resources' && (
          <ResourcesPage
            onNavigate={handleNavigate}
            onOpenBookDemo={() => setIsBookDemoOpen(true)}
          />
        )}

        {currentPage === 'pricing' && (
          <PricingPage
            onNavigate={handleNavigate}
            onOpenBookDemo={() => setIsBookDemoOpen(true)}
          />
        )}
      </main>

      {/* Global Multi-Column Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBookDemo={() => setIsBookDemoOpen(true)}
      />

      {/* Persistent Floating AI Assistant Widget (available on every page) */}
      <FloatingAiAssistant />

      {/* Global Command Palette Modal (Cmd+K) */}
      <CommandPaletteModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Enterprise Demo Booking Modal */}
      <BookDemoModal
        isOpen={isBookDemoOpen}
        onClose={() => setIsBookDemoOpen(false)}
      />

      {/* Custom Incident Workflow Solution Request Modal */}
      <WorkflowRequestModal
        isOpen={isWorkflowModalOpen}
        onClose={() => setIsWorkflowModalOpen(false)}
      />
    </div>
  );
}
