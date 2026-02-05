import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Doctor from '../models/doctorModel.js'
import Appointment from '../models/appointmentModel.js'

/* =========================
   ADMIN LOGIN
========================= */
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({ success: true, token })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

/* =========================
   ADD DOCTOR
========================= */
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address
    } = req.body

    // check doctor exists
    const existingDoctor = await Doctor.findOne({ email })
    if (existingDoctor) {
      return res.json({ success: false, message: 'Doctor already exists' })
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const doctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address
    })

    await doctor.save()

    res.json({ success: true, message: 'Doctor added successfully' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

/* =========================
   GET ALL DOCTORS (ADMIN)
========================= */
const allDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select('-password')
    res.json({ success: true, doctors })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

/* =========================
   ADMIN DASHBOARD
========================= */
const adminDashboard = async (req, res) => {
  try {
    const doctors = await Doctor.countDocuments()
    const appointments = await Appointment.countDocuments()

    res.json({
      success: true,
      data: {
        doctors,
        appointments
      }
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

/* =========================
   GET ALL APPOINTMENTS
========================= */
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('doctorId', 'name speciality')
      .populate('userId', 'name email')

    res.json({ success: true, appointments })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

/* =========================
   CANCEL APPOINTMENT
========================= */
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body

    await Appointment.findByIdAndUpdate(appointmentId, {
      cancelled: true
    })

    res.json({ success: true, message: 'Appointment cancelled' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

/* =========================
   EXPORTS (VERY IMPORTANT)
========================= */
export {
  loginAdmin,
  addDoctor,
  allDoctors,
  adminDashboard,
  appointmentsAdmin,
  appointmentCancel
}
