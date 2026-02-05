import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// ======================= LOGIN =======================
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ success: true, token });
  } catch (error) {
    console.error("Doctor Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ======================= DOCTOR LIST (FIXED) =======================
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password -email");

    const formattedDoctors = doctors.map((doc) => ({
      _id: doc._id,
      name: doc.name,
      speciality: doc.speciality,
      degree: doc.degree,
      experience: doc.experience,
      about: doc.about,
      fees: doc.fees,
      address: doc.address || { line1: "", line2: "" },
      available: doc.available ?? true,
      slots_booked: doc.slots_booked || {},
      image:
        doc.image && doc.image !== ""
          ? doc.image
          : "https://cdn-icons-png.flaticon.com/512/387/387561.png",
    }));

    res.status(200).json({
      success: true,
      doctors: formattedDoctors,
    });
  } catch (error) {
    console.error("Doctor List Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctors",
    });
  }
};

// ======================= APPOINTMENTS =======================
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.user.id;
    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ======================= CANCEL =======================
const appointmentCancel = async (req, res) => {
  try {
    const docId = req.user.id;
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment || appointment.docId.toString() !== docId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ======================= COMPLETE =======================
const appointmentComplete = async (req, res) => {
  try {
    const docId = req.user.id;
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment || appointment.docId.toString() !== docId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
    res.json({ success: true, message: "Appointment Completed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ======================= AVAILABILITY =======================
const changeAvailability = async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.user.id);
    doctor.available = !doctor.available;
    await doctor.save();

    res.json({ success: true, message: "Availability updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ======================= PROFILE =======================
const doctorProfile = async (req, res) => {
  try {
    const profile = await doctorModel.findById(req.user.id).select("-password");
    res.json({ success: true, profileData: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ======================= UPDATE PROFILE =======================
const updateDoctorProfile = async (req, res) => {
  try {
    const { fees, address, available, about } = req.body;

    await doctorModel.findByIdAndUpdate(req.user.id, {
      fees,
      address,
      available,
      about,
    });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ======================= DASHBOARD =======================
const doctorDashboard = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({ docId: req.user.id });

    let earnings = 0;
    const patients = new Set();

    appointments.forEach((a) => {
      if (a.payment || a.isCompleted) earnings += a.amount;
      patients.add(a.userId.toString());
    });

    res.json({
      success: true,
      dashData: {
        earnings,
        appointments: appointments.length,
        patients: patients.size,
        latestAppointments: appointments.slice(-5).reverse(),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  loginDoctor,
  doctorList,
  appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  changeAvailability,
  doctorProfile,
  updateDoctorProfile,
  doctorDashboard,
};
