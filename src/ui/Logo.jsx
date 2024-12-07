import { useDarkMode } from "../context/DarkModeContext";

function Logo() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="flex items-center justify-center">
      <img
        src={`${isDarkMode ? "logo-dark.png" : "logo.png"}`}
        alt="Logo"
        className="h-[4rem] md:h-[6rem] lg:h-[8rem] w-auto" // Small screens: 6rem, Medium and up: 8rem
      />
    </div>
  );
}

export default Logo;
