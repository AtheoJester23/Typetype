import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const {theme, toggleTheme} = useTheme();

    return (  
        <div className="Navbar">
            <h1>Test</h1>

            <button onClick={toggleTheme}>
                {theme === "light" ? "Dark" : "Light"} Mode
            </button>
        </div>
    );
}
 
export default Navbar;