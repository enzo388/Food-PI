import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { getRecetas, postReceta, getDietas } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Formulario from "../formulario"
import style from "../crear/crear.module.css"



export default function Crear() {

    const dispatch = useDispatch();
    const history = useHistory();
    const todasLasDietas = useSelector((state) => state.dietas);
    const allRecipes = useSelector((state) => state.recetas);
    console.log(todasLasDietas)




    const [errors, seterrors] = useState({});

    const [input, setinput] = useState({
        nombre: '',
        resumen: '',
        puntuacion: '',
        nivel_de_comida_saludable: '',
        imagen: '',
        paso_a_paso: '',
        dieta: []
    });

    useEffect(() => {
        if(todasLasDietas.length === 0) {
            dispatch(getDietas());
        }
        
    }, [dispatch, todasLasDietas]);

    useEffect(() => {
        if (allRecipes.length === 0) {
            dispatch(getRecetas())
        }
    }, [dispatch, allRecipes.length]);

    const recipesName = allRecipes.map(el => el.nombre)
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.dieta.length === 0) {
            alert('Seleccione Un Tipo De Dieta')


        } if (input.nombre.length === 0 || input.resumen.length === 0 || input.puntuacion.length === 0 || input.nivel_de_comida_saludable.length === 0 || input.paso_a_paso.length === 0 ) {
            alert('Rellene todos los campos')

        }
        else if (input.nombre.length > 0) {
            let nombreInput = input.nombre.toLowerCase();
            let result = recipesName.includes(nombreInput)
            console.log(result, nombreInput)
            if (result === true) {
                alert("Ese Nombre Ya esta En Uso")
                setinput({
                    nombre: '',
                    resumen: '',
                    puntuacion: '',
                    nivel_de_comida_saludable: '',
                    imagen: '',
                    paso_a_paso: '',
                    dieta: []
                })
            } else {
                alert(
                    'Receta Creada Con Exito'
                );
                dispatch(postReceta(input))
               
                setinput({
                    nombre: '',
                    resumen: '',
                    puntuacion: '',
                    nivel_de_comida_saludable: '',
                    imagen: '',
                    paso_a_paso: '',
                    dieta: []

                });
                history.push('/home');
            }
        }
    }

    function validate(input) {
        const errors = {};


        if (!input.nombre) {
            errors.nombre = "Nombre requerido";
        }
        if (input.puntuacion < 0) {
            errors.puntuacion = "puntuacion No puede ser negativo";
        }
        if (input.nivel_de_comida_saludable < 0) {
            errors.nivel_de_comida_saludable = "nivel_de_comida_saludable No puede ser negativo";
        }
       
        if (input.imagen !== "" && !/^(ftp|http|https):\/\/[^ "]+$/.test(input.imagen)) {
            errors.imagen = "la imagen iene que ser una Url ejemplo: http://";
        }
        if (input.resumen.length < 1) {
            errors.paso_a_paso = 'El resumen es obligatorio';
        }
        if (input.resumen.length < 10) {
            errors.paso_a_paso = 'El resumen deve tener por lo menos 10 caracteres';
        }
        if (input.paso_a_paso.length < 1) {
            
            errors.paso_a_paso = 'las instrucciones son obligatorias';
        }
        if (input.paso_a_paso.length < 10) {
            
            errors.paso_a_paso = 'las instrucciones deven tener por lo menos 10 caracteres';
        }

        return errors;
    }
    function handle_button_home(e) {
        e.preventDefault();
        history.push('/home');
    }
    function handle_input_change(e) {
        console.log("campo :", e.target.name ,"valor :", e.target.value)
        
        e.preventDefault();
        setinput({
            ...input,
            [e.target.name]: e.target.value
        });
        seterrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handle_type_btn(e) {
        e.preventDefault();
        
        setinput({
            ...input,
            //le seteo los mismos tipos menos lo que tengo en even target value
            dieta: input.dieta.filter(dieta => dieta !== e.target.value)
        });
    }
    const handleSelect = (e) => {
        setinput({
            ...input,
            dieta: input.dieta.includes(e.target.value) ? input.dieta : [...input.dieta, e.target.value]
        });
    }
//a
    return (
        <div className={style.mainContainer}>
            <div className={style.mainForm}>
            <button onClick={handle_button_home}>Volver</button>
            <form className={style.form}>
                <Formulario name="nombre" type="text" value={input.nombre} handle_function={handle_input_change} error_control={errors} />
                <Formulario name="Imagen" type="url" value={input.imagen} handle_function={handle_input_change} error_control={errors} />
                {/* <Formulario name="Resumen" type="text" value={input.resumen} handle_function={handle_input_change} error_control={errors} /> */}
                <Formulario name="Puntuacion" type="number" value={input.puntuacion} handle_function={handle_input_change} error_control={errors} />
                <Formulario name="nivel_de_comida_saludable" type="number" value={input.nivel_de_comida_saludable} handle_function={handle_input_change} error_control={errors} />
                <div>
                    <label>Resumen del plato:</label>
                    <textarea name="resumen" rows="1" cols="40"  onChange={handle_input_change}>{input.resumen}</textarea>

                </div>

                <div>
                    <label>Instrucciones:</label>
                    <textarea name="paso_a_paso" rows="1" cols="40" onChange={handle_input_change}>{input.paso_a_paso}</textarea>

                </div>
                {errors.paso_a_paso ? <span>{errors.paso_a_paso}</span> : ""}
                {errors.resumen ? <span>{errors.resumen}</span> : ""}


                <div>
                    <label>Dietas: </label>
                    <select onChange={handleSelect} >
                        <option></option>

                        {/* //esto me muestra los tipos que puedo seleccionar */}
                        {
                            todasLasDietas.map(type => (
                                <option value={type.name} key={type.name}>{type.name}</option>
                            ))
                        }
                    </select>
                </div>
         

                <div>
                    <label>Dietas Seleccionadas : </label>

                    {/* //para quitar el tipo seleccionado */}
                    {
                        input.dieta.map(type => (
                            <button onClick={handle_type_btn} value={type} key={type} > Remover {type}  </button>
                        ))
                    }
                </div>
                <button type="submit" onClick={handleSubmit} >Crear Receta</button>
            </form>

            </div>
           
        </div>
    )


}