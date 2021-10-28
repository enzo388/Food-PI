import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getRecetas, getDietas, filtrar_por_tipo_de_dieta, ordenar_por_nombre, ordenar_por_puntuacion } from "../../actions/index";
import Card from "../Card";
import NavBar from "../NavBar";
import styles from '../home/home.module.css';



export default function Home() {
    const history = useHistory()
    const dispatch = useDispatch() //utilizar esta constante e ir despachando mis acciones
    useEffect(() => {
        dispatch(getRecetas())
    }, [dispatch]) // nos traemos del estado las recetas cuando el componente se monta

    useEffect(() => {
        dispatch(getDietas())
    }, [dispatch])
    const todasLasRecetas = useSelector((state) => state.recetas) // me declaro una const y le digo que con useSelector en esa const todo lo que esta en el estado de recipes, es para evitar utilizar mapStatesToProps y trabajar solo con esta const
    // console.log(allRecipes)
    const todasLasDietas = useSelector((state) => state.dietas);


    /* console.log(todasLasRecetas, 'Todas Las Recetas') */

    // const allDiets = useSelector((state => state.diets))
    // const [render, setRender] = useState('');


    const [/*orden*/, setOrden] = useState('');
    // console.log(allRecipes)

    const recetasPorPagina = 9;


    const [currentPage, setCurrentPage] = useState(1);
    // const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexLastRecipe = currentPage * recetasPorPagina;
    const indexFirstRecipe = indexLastRecipe - recetasPorPagina;
    const recetasActuales = todasLasRecetas.slice(indexFirstRecipe, indexLastRecipe);
    // console.log(recetasActuales)

    const NumeroDePagina = []
    for (let i = 1; i <= Math.ceil(todasLasRecetas.length / recetasPorPagina); i++) {
        NumeroDePagina.push(i)
    }

    function paginaSiguiente() {
        if (currentPage === NumeroDePagina.length) {
            setCurrentPage(NumeroDePagina.length)
            console.log("entro al if de  pagina siguiente")
        } else {

            setCurrentPage(currentPage + 1)
        }
    }

    function paginaAnterior() {
        if (currentPage > 1 && NumeroDePagina !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }



    function crear_recetas_boton(e) {
        e.preventDefault();
        history.push('/crearReceta');
    }




    function handleClick(e) { //creo esta funcion para 
        e.preventDefault(); //para que no se rompa
        dispatch(getRecetas()); //esta funcion me resetea cuando se me tilda y me que me mande todo devuelta 
    }


    function handle_filtrar_por_tipo_de_Dieta(e) {
        e.preventDefault();
        dispatch(filtrar_por_tipo_de_dieta(e.target.value))
    }

    function handle_ordenar_por_nombre(e) {
        e.preventDefault();
        dispatch(ordenar_por_nombre(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handle_ordenar_por_puntuacion(e) {
        e.preventDefault();
        dispatch(ordenar_por_puntuacion(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }


    return (
        <div className={styles.home_box}>

            <div className={styles.btns_box}>
                <button onClick={e => { handleClick(e) }} className='elementNB'>Recargar Recetas</button>
                <button onClick={crear_recetas_boton} className='elementNB'>Crear Receta</button>
                {<select onChange={handle_ordenar_por_nombre}>
                    <option value='default' className='elementNB' hidden>Ordenar Recetas por Nombre</option>
                    <option value='ASC'>A-Z</option>
                    <option value='DESC'>Z-A</option>
                </select>}
                {<select onChange={handle_ordenar_por_puntuacion}>
                    <option value='default' className='elementNB' hidden>Ordenar recetas por Puntuacion</option>
                    <option value='ASC'> Menor valor</option>
                    <option value='DESC'> Mayor valor</option>
                </select>}
                <select onChange={(e) => handle_filtrar_por_tipo_de_Dieta(e)}>
                    <option value='all'>Ordenar Por Tipo De Dieta</option>
                    {
                        todasLasDietas?.map(d => <option key={d.name} >{d.name}</option>)
                    }
                </select>
                {<NavBar setPage={setCurrentPage} />}
            </div>

            {  <div className={styles.pokemons_box}>
                {recetasActuales?.map(el => {
                    return (
                        <div key={el.id}>

                            <Card key={"222"} nombre={el.nombre} imagen={el.imagen} id={el.id} dieta={el.dieta} puntuacion={el.puntuacion} />

                        </div>
                    )
                })
                }

                 </div>
            }
            <div className={styles.btns_box}>
                <button onClick={paginaAnterior}>Pagina Anterior</button>
                {currentPage}
                <button onClick={paginaSiguiente}>Pagina Siguiente</button>
            </div>


        </div>
    )
}