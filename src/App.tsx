import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './contexts/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ResumeBuilder from './components/resume/ResumeBuilder';

function App() {
  const { theme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow container py-8">
          <AnimatePresence mode="wait">
            <ResumeBuilder />
          </AnimatePresence>
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: '!bg-card !text-card-foreground border border-border',
            duration: 5000,
          }}
        />
      </div>
    </div>
  );
}

export default App;