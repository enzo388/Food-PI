import React from 'react';
 import { useHistory } from 'react-router-dom'; 
import styles from "../inicio/inicio.module.css"

function Landing() {
    const history = useHistory(); 

     function handle_home(e) {
        e.preventDefault();
        history.push("/home");
    } 
    return (
        <div className={styles.div} >
            <div>
                 <div>
                    <h1>RECETARIO ONLINE</h1>
                </div>
                <div>
                    <button onClick={handle_home}>Inicio</button>
                </div> 
            </div>

        </div>
    )
}

export default Landing;