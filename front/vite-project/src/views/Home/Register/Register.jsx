import { useFornik } from  "fornik";
import styles from "./Register.module.css";
import {registerformValidates} from "../../../helpers/validates";
import URLBase from "../../../config/urlBase";
import { Axios } from "axios";

function Register (){
    const fornik = useFornik({
        initialValue:{
            name:"",
            email:"",
            birthday:"",
            nDNI: "",
            username:"",
            password:"",
        },
        validate: registerformValidates,
        onsubmit: (values) => {
            Axios.post (`${URLBase}/user/register`,values)
            .then(({data}) => {
                console.log(data)
                alert("Usuario registrado con exito")
            })
            .catch(err => console.log(err.response.data.error))
        },
    })
}

export default Register;