export function Footer() {
  return (
    <footer className="w-full border-t bg-white dark:bg-gray-900 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  )
}
