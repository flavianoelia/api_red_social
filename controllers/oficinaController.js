const db = require("../models");
const Oficina = db.oficina;
const Persona = db.persona;
const { Op, where } = require('sequelize');

const home = (req, res) => {
    res.status(200).send("Ruta principal de oficinas");
}

/* 
Esta función es un controlador asíncrono que maneja la solicitud para listar 
todas las oficinas almacenadas en la base de datos.
Utiliza el modelo 'Oficina' para buscar y recuperar todos los registros (findAll()), y los 
devuelve como respuesta en formato JSON con un código de estado 200 (OK).
En caso de que ocurra un error durante la consulta a la base de datos, 
se captura (catch) y se devuelve un mensaje de error con un código de estado 500 
(Error Interno del Servidor).
*/
const list = async(req, res) => {
    try {
        const listaOficinas = await Oficina.findAll({
            include: [{
                model: Persona,
                atributtes: ['nombre']
            }]
        });
        if (listaOficinas.length > 0) {
            res.status(200).send(listaOficinas);
        } else {
            res.status(404).send({ message: "Aun no hay registros de oficinas" });
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

/* 
Esta función es un controlador asíncrono que maneja la solicitud para crear 
una nueva oficina en la base de datos. Utiliza el modelo 'Oficina' para 
crear un nuevo registro (create) basado en los datos proporcionados en el cuerpo 
de la solicitud (req.body), y devuelve la nueva oficina con un código 
de estado 201 (Creado). Si ocurre un error durante el proceso, se captura 
y se devuelve un mensaje de error con un código de estado 500 
(Error Interno del Servidor).
*/
const create = async(req, res) => {
    const { nombre, mail, edad } = req.body;
    if (!nombre) {
        return res.status(400).send({ message: "Faltan datos de completar" });
    }
    try {
        const oficina = await Oficina.create(req.body);
        res.status(201).send(oficina);
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            res.status(400).send({ message: "Mail ya existente" });
        } else {
            res.status(500).send({
                message: error.message,
                nombre: error.name
            });
        }
    }
};

const findById = async(req, res) => {
    try {
        const oficina = await Oficina.findByPk(req.params.id);
        if (oficina) {
            res.status(200).send(oficina);
        } else {
            res.status(404).send({ message: "Not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error interno del server" });
    }
}

const update = async(req, res) => {
    try {
        const oficina = await Oficina.update(req.body, {
            where: { id: req.params.id }
        })
        if (oficina[0]) {
            const oficinaUpdated = await Oficina.findByPk(req.params.id);
            res.status(200).send({
                message: "Actualizado",
                oficina: oficinaUpdated
            });
        } else {
            res.status(404).send({ message: "Not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error interno del servidor" });
    }
}

const buscarPorNombre = async(req, res) => {
    try {
        const keyword = req.body.keyword;
        if (!keyword) {
            return res.status(400).send({ message: "Debe proporcionar un keyword" });
        }
        const results = await Oficina.findAll({
            where: {
                nombre: {
                    [Op.like]: `%${keyword}%`
                }
            }
        });
        if (results.length > 0) {
            res.status(200).send({ resultados: results });
        } else {
            res.status(404).send({ message: "No hay resultados" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error interno del servidor" });
    }
}

const deleteOficina = async(req, res) => {
    try {
        const oficina = await Oficina.destroy({
            where: { id: req.params.id }
        });
        if (oficina) {
            res.status(200).send({ message: "Eliminado!!!" });
        } else {
            res.status(404).send({ message: "Not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error interno del servidor", tipo: error.name });
    }
}


module.exports = {
    home,
    list,
    create,
    findById,
    update,
    buscarPorNombre,
    deleteOficina
}