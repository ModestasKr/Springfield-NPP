// Libraries
import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// API components
import { loginUser, addLog } from "../../api/libraries/apiLibraries";
// Style
import "./style/Login.css";
// Images
import img from "../../assets/register.jpg";
// Context
import { useGlobalUserContext, UserContext } from "../../util/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

function Login() {
  // We took a global var doLogin
  const { doLogin } = useGlobalUserContext(UserContext);
  const navigate = useNavigate();
  let [isToggled, setIsToggled] = useState(false);
  let [showPassword, setShowPass] = useState("password");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // POST data using parameter data
  function onSubmit(data) {
    // API
    loginUser(data);

    // Context
    doLogin(data);
    addLog({
      email: data.email,
      date_created: new Date(),
      action: "Prisijungta",
    });
    setTimeout(() => {
      navigate("/application");
    }, "500");
  }

  function toggle(){
    if(showPassword === "password"){
      setIsToggled(true);
      setShowPass("text");
    }else{
      setIsToggled(false);
      setShowPass("password");
    }
  } 

  return (
    <div className="Login-container">
      <form className="Login-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <img src={img} alt="springfield" />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Elektroninis paštas"
          {...register("email", {
            required: "Laukelis privalomas",
            maxLength: {
              value: 50,
              message: "Daugiausia simbolių galima įvesti 50",
            },
          })}
        />
        <span className="error">{errors.email?.message}</span>
          <div className="registerPasswordField">
        <input
          type={showPassword}
          name="password"
          placeholder="Slaptažodis"
          {...register("password", {
            required: "Laukelis privalomas",
            minLength: {
              value: 8,
              message: "Mažiausia simbolių galima įvesti 8",
            },
            maxLength: {
              value: 20,
              message: "Daugiausia simbolių galima įvesti 20",
            },
          })}
        />
                  <div className='registerShowPassword'>
          <FontAwesomeIcon className='eyeCon' onClick={()=>{toggle()}} icon={isToggled ? faEye : faEyeSlash} />
          </div>
        </div>
        <span className="error">{errors.password?.message}</span>
        <button className="Login-form-btn" type="submit">
          Prisijungti
        </button>
        <button className="Login-form-btn" type="reset">
          Anuliuoti
        </button>
      </form>
    </div>
  );
}

export default Login;
