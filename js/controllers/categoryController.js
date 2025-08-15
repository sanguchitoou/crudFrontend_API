//Iniciamos los métodos (IMPORTS) del SERVICE relacionado
import {
    getAllCategories,
    postCategory,
    putCategory,
    deleteCategory
} from "../services/categoryService.js";

document.addEventListener("DOMContentLoaded", ()=>{
    const tableBody = document.querySelector("#categoriesTable tbody");
    const form = document.getElementById("categoryForm");
    const modal = new bootstrap.Modal(document.getElementById("categoryModal"));
    const lbModal = document.getElementById("categoryModalLabel");
    const btnAdd = document.getElementById("btnAddCategory");

    loadAllCategories(); //Después de cargar las constantes, se cargan los registros

    //Añadimos el addEventListener al botón para seleccionarlo
    btnAdd.addEventListener("click", ()=>{
        form.reset();
        //Al agregar un registro, NO SE NECESITA el Id
        form.categoryId.value = "";
        lbModal.textContent = "Agregar Categoría";
        modal.show();
    });

    //Añadimos OTRO addEventListener, ahora para el formulario
    form.addEventListener("submit", async (e)=>{
        e.preventDefault(); //Evitamos que el formulario SE ENVÍE por defecto
        const idCategory = form.categoryId.value; //Obtenemos el ID que contiene el FORM
        const dataCategory = {
            nombreCategoria: form.categoryName.value.trim(),
            descripcion: form.categoryDescription.value.trim()
        };

        //Llamadas a la API
        try{
            if(idCategory){
                await putCategory(dataCategory, idCategory);
            } else {
                await postCategory(dataCategory);
            }
            modal.hide();
            await loadAllCategories();
        } catch (err) {
            console.error("Error al guardar la categoría: ", err)
        }
    });

    //Función PARA CARGAR LAS CATEGORÍAS
    async function loadAllCategories(){
        try{
            const categories = await getAllCategories();
            tableBody.innerHTML = "" //Vaciamos el TBODY si sale bien

            //Verificamos si no hay categorias registradas
            if(!categories || categories.length == 0){
                tableBody.innerHTML = '<td colspan="5">Actualmente no hay registros</td>';
                return; //El código deja de ejecutarse
            }

            categories.content.forEach((cat)=>{
                //Creamos una fila POR CADA elemengo encontrado en el GET
                const tr = document.createElement("tr");
                
                //Incrustamos el TR al HTML
                tr.innerHTML = `
                    <td>${cat.idCategoria}</td>
                    <td>${cat.nombreCategoria}</td>
                    <td>${cat.descripcion || "Descripción no proporcionada"}</td>
                    <td>${cat.fechaCreacion || ""}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-secondary edit-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-square-pen">
                                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                            </svg>
                        </button>
 
                        <button class="btn btn-sm btn-outline-danger delete-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-trash">
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                                <path d="M3 6h18"/>
                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    </td>
                `;

                //Agregamos funcionalidad para el botón de editar categorías
                tr.querySelector(".edit-btn").addEventListener("click", ()=>{

                    //Pasamos los datos del JSON a los campos del formulario
                    form.categoryId.value = cat.idCategoria;
                    form.categoryName.value = cat.nombreCategoria;
                    form.categoryDescription.value = cat.descripcion;

                    //Aquí le ponemos el título al formulario
                    lbModal.textContent = "Editar Categoría";

                    modal.show();
                });

                //Funcionalidad para botón de eliminar categoría
                tr.querySelector(".delete-btn").addEventListener("click", async ()=>{
                    if(confirm("¿Desea eliminar la categoría?")){
                        await deleteCategory(cat.idCategoria);
                        await getAllCategories();
                    }
                });

                tableBody.appendChild(tr); //AL TBBODY, se le agrega los TR creados
            });

        } catch(err) {
            console.error("Error al cargar las categorías: ", err)
        }
    }
});