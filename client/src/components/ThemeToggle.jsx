import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  // Context se values extract karein
  const { isDark, setIsDark } = useTheme();

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-lg transition-colors duration-200 bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <SunIcon className="h-6 w-6 text-yellow-400" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  );
};

export default ThemeToggle;