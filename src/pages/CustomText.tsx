import FormCustom from "../components/FormCustom";
import { useTheme } from "../context/ThemeContext";

const CustomText = () => {
    const {theme} = useTheme();

    return (  
        <div className="h-[100vh] flex flex-col justify-center items-center">
            <FormCustom/>
        </div>
    );
}
 
export default CustomText;