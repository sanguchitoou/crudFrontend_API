//Declaramos la constante de la API INTELLIJ
const API_URL = "http://localhost:8080/api/category";

//GET
export async function getAllCategories(){
    const res = await fetch(`${API_URL}/getDataCategories`)
    return res.json()
}

//POST
export async function postCategory(dataCategory){
    await fetch(`${API_URL}/newCategory`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataCategory)
    });
}

//PUT
export async function putCategory(dataCategory, idCategory){
    await fetch(`${API_URL}/updateCategory/${idCategory}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataCategory)
    });
}

//DELETE
export async function deleteCategory(idCategory){
    await fetch(`${API_URL}/deleteCategory/${idCategory}`, { method: 'DELETE' });
}