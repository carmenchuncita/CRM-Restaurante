const Reservations = require('../models/reservation.model');
const Users = require('../models/user.model');
const nodemailer = require('nodemailer');
const Tables = require('../models/mesa.model');


// Crear un nuevo menú estnado logueado
const createReservationClient = async (req, res) => {
    const { table, telefono, date, time } = req.body;
    console.log(table,telefono,date,time)

    const user = await Users.findById(req.user.user_id);
    const client = req.user.user_id;
    console.log(req.user.user_id)
    const email = user.email;

    try {
        const reservationList = await Reservations.find({ });
        const dateFormat = new Date(date);
        for (const element of reservationList) {
          if (
              element.table == table &&
              element.date.getTime() == dateFormat.getTime() &&
              element.time == time
          ) {
              console.log("estoy dentro");
              return res.status(401).send({ message: "Ya hay una reserva en ese momento" });
          }
      }

        const newReservation = new Reservations({ 
            client,
            table,
            telefono,
            date,
            time
        });
        
        await newReservation.save();
        
        //Enviar correo de confirmacion de reserva
        try {
          //Config del tipo de correo host y port
          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Cambia según el proveedor (por ejemplo, Outlook, Yahoo, etc.)
            port: 587, // Puerto para STARTTLS
            secure: false, // true para puerto 465, false para otros puertos
            auth: {
              user: 'joshuaalejandro1999@gmail.com', // Tu correo electrónico
              pass: 'rqat imod pnqt jvim', // Tu contraseña o token de aplicación (en caso de usar Gmail, activa la verificación en dos pasos y usa un token de aplicación)
            },
          });
        
          //Creacion del correo para el admin
          const reservaAdmin = await transporter.sendMail({
            from: 'josh@gmail.com', // Dirección del remitente
            to: 'joshua.gutierrez@bootcamp-upgrade.com', // Lista de destinatarios
            subject: 'Reserva code experience', // Asunto del correo
            html: 
            `
              <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: left; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color:#e3f982;">¡Nueva reserva confirmada! 🎉</h2>
                <p>Reserva del cliente <strong>${user.name}</strong>,</p>
                <p>Detalles de su reserva:</p>
                <ul style="list-style: none; padding: 0;">
                  <li>🪑 <strong>Mesa:</strong> ${table} comensales</li>
                  <li>📅 <strong>Fecha:</strong> ${date} en turno de ${time}</li>
                  <li>📧 <strong>Correo:</strong> ${email}</li>
                </ul>
              </div>
            `, // HTML
          });
          //Creacion del correo para el usuario
          console.log(user.email)
          const reservaUser = await transporter.sendMail({
            from: 'josh@gmail.com', // Dirección del remitente
            to: `${user.email}`, // Lista de destinatarios
            subject: 'Reserva code experience', // Asunto del correo
            html: 
            `
              <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: left; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color:#e3f982;">¡Tu reserva ha sido confirmada! 🎉</h2>
                <p>Hola <strong>${user.name}</strong>,</p>
                <p>Te confirmamos los detalles de tu reserva:</p>
                <ul style="list-style: none; padding: 0;">
                  <li>🪑 <strong>Mesa:</strong> ${table} comensales</li>
                  <li>📅 <strong>Fecha:</strong> ${date} en turno de ${time}</li>
                </ul>
                <p>Si necesitas modificar o cancelar tu reserva, contáctanos.</p>
                <p>📞 Teléfono: +34 609 77 44 55 </p>
                <p>¡Te esperamos pronto! 😊</p>
              </div>
            `, // HTML
          });
          
          console.log('Correo enviado: %s', reservaAdmin.messageId);
          console.log('Correo enviado: %s', reservaUser.messageId);
        } catch (error) {
          console.error('Error enviando el correo:', error);
        }

        res.status(201).send({ message: "Reserva creado con éxito", reservation: newReservation });
    } catch (error) {
        res.status(400).send({ message: "Error al crear la reserva", error: error.message});
    }
};

// Crear una reserva sin estar logueado
/*
const createReservation = async (req, res) => {
    const { email, table, date, time } = req.body;

    try {
        const reservationList = await Reservations.find({ });

        reservationList.forEach(element => {
            const dateFormat = new Date(date);
            
            if(element.email == email && 
                element.table == table 
                && element.date.getTime() == dateFormat.getTime() 
                && element.time == time){
                res.status(401).send({ message: "Ya hay una reserva en ese momento", error: error.message });
            }
        });

        const newReservation = new Reservations({ 
            table,
            email,
            date,
            time
        });
        
        await newReservation.save();
        res.status(201).send({ message: "Reserva creado con éxito", reservation: newReservation });
    } catch (error) {
        res.status(400).send({ message: "Error al crear la reserva", error: error.message });
    }
};
*/


// Metodo para coger todas las reservas de un cliente
const getReservations = async (req, res) => {
  try {
      const user = await Users.findById(req.user.user_id);

      // Validar si el usuario existe 
      if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const role = user.role;
      const listaFinal = [];

      if (role === 'admin') {
          const reservations = await Reservations.find({});
          for (let element of reservations) {
              const id = element.client;
              const client = await Users.findById(id);

              // Validar si el cliente existe
              if (!client) {
                  console.warn(`Advertencia: No se encontró el usuario con ID ${id}`);
                  continue; 
              }

              const tableName = await Tables.findOne({ nombre: element.table });

              const datos = {
                  "id": element._id,
                  "name": client.name, 
                  "table": tableName ? tableName.nombre : element.table, 
                  "telefono": element.telefono,
                  "date": element.date,
                  "time": element.time
              };

              listaFinal.push(datos);
          }
      } else {
        const id = user._id;
        const reservations = await Reservations.find({ client: id });

        for (let element of reservations) {

            const tableName = await Tables.findById(element.table);
            const datos = {
                "email" : user.email,
                "table" : tableName.nombre,
                "telefono" : element.telefono,
                "date" : element.date,
                "time" : element.time
            };

            if(element.canceled == false){
                listaFinal.push(datos);
            }
        }
      }

      res.status(200).json(listaFinal);

  } catch (error) {
      console.error("Error en getReservations:", error);
      res.status(500).send({ message: "Error al obtener las reservas", error: error.message });
  }
};

const updateReservation = async (req, res) => {
    const { reservation, table, date, time } = req.body; 
  
    if (!date || !time || !table || !reservation) {
      return res.status(400).json({ message: 'La mesa, fecha y hora son obligatorios.' });
    }
  
    try {
      let reserv = await Reservations.findByIdAndUpdate( reservation, 
        {table : table,
            date : date, 
            time : time} );
  
      const updatedReservation = await reserv.save();
      res.status(200).json({ message: 'Reserva actualizada correctamente.', reserv: updatedReservation });
  
    } catch (error) {
      res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
    }
};

const deleteReservation = async (req, res) => {
    const { reservation } = req.body; 
  
    try {
        let reserv = await Reservations.findByIdAndUpdate(
            reservation,               
            { canceled: true }
        );

      res.status(200).json({reserv});
  
    } catch (error) {
      res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
    }
  };

module.exports = { createReservationClient, getReservations, updateReservation, deleteReservation};