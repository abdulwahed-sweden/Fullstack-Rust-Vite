import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AgeChecker } from "@/components/AgeChecker"

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <AgeChecker />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
