import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors, backendUrl } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (!doctors || doctors.length === 0) {
      setFilterDoc([]);
      return;
    }

    if (speciality) {
      const filtered = doctors.filter(
        (doc) =>
          doc.speciality?.toLowerCase().trim() ===
          speciality.toLowerCase().trim()
      );
      setFilterDoc(filtered);
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  // 🔍 DEBUG (REMOVE LATER)
  useEffect(() => {
    console.log("Doctors from context 👉", doctors);
  }, [doctors]);

  return (
    <section className="px-4 sm:px-8 md:px-12 py-10">
      <p className="text-gray-600 text-sm sm:text-base">
        Browse through the doctors specialist.
      </p>

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* FILTERS */}
        <div className="lg:w-1/4">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`lg:hidden mb-4 py-2 px-4 border rounded text-sm ${
              showFilter ? "bg-primary text-white" : ""
            }`}
          >
            Filters
          </button>

          <div
            className={`flex flex-col gap-3 text-sm text-gray-600 ${
              showFilter ? "block" : "hidden lg:block"
            }`}
          >
            {[
              "General physician",
              "Gynecologist",
              "Dermatologist",
              "Pediatricians",
              "Neurologist",
              "Gastroenterologist",
            ].map((item, index) => (
              <p
                key={index}
                onClick={() =>
                  speciality === item
                    ? navigate("/doctors")
                    : navigate(`/doctors/${item}`)
                }
                className={`cursor-pointer px-4 py-2 border rounded transition ${
                  speciality === item
                    ? "bg-[#E2E5FF] text-black"
                    : "hover:bg-gray-100"
                }`}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* DOCTORS GRID */}
        <div className="lg:w-3/4 w-full">
          {filterDoc.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No doctors found
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterDoc.map((item) => (
                <div
                  key={item._id}
                  onClick={() => {
                    navigate(`/appointment/${item._id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300"
                >
                  <img
                    src={`${backendUrl}/${item.image}`}
                    alt={item.name}
                    className="bg-[#EAEFFF] w-full h-48 object-cover"
                    onError={(e) =>
                      (e.target.src =
                        "https://cdn-icons-png.flaticon.com/512/387/387561.png")
                    }
                  />

                  <div className="p-4">
                    <p className="text-[#262626] text-lg font-medium mt-1">
                      {item.name}
                    </p>
                    <p className="text-[#5C5C5C] text-sm">
                      {item.speciality}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Fees: ₹{item.fees}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
