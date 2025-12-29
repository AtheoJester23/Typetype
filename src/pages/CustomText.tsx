import FormCustom from "../components/FormCustom";
import { useTheme } from "../context/ThemeContext";

const CustomText = () => {
    const {theme} = useTheme();

    return (  
        <div className="customPage flex flex-col justify-center items-center">
            <h1 className={`${theme == "dark" ? "text-white" : "text-[rgb(23,23,23)]"} text-4xl select-none`}>Create Custom Text</h1>

            <FormCustom/>
        </div>
    );
}
 
export default CustomText;