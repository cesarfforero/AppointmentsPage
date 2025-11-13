import { useFornik } from  "fornik";
import styles from "./Login.module.css";
import {loginFormValidates} from "../../../helpers/validates";
import URLBase from "../../../config/urlBase";
import { Axios } from "axios";

function Login (){
    const fornik = useFornik({
        initialValue:{
            username:"",
            password:"",
        },
        validate: loginFormValidates,
        onsubmit: (values) => {
            Axios.post (`${URLBase}/user/login`,values)
            .then(({res}) => {

                localStorage.setItem("user", JSON.stringify(res.data.user))
                if(res.status === 200)
                console.log("usuario logeado correctamente")
                
            })
            .catch(err => console.log(err.response.data.error))
        },
    })
}

export default Login;