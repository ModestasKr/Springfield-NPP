const Users = require("./../models/userModel");

// Gauti visus users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users: users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Sukurti userį
exports.createUser = async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await Users.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        users: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// Gauti userį pagal id
exports.getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        users: user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Atnaujinti esamą studentą pagal id
exports.updateUser = async (req, res) => {
  try {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
      // atnaujinus duomenis - gauti atnaujintą studento informaciją
      new: true,
      // papildomai patikrintų duomenis pagal DB schemą (studentModel)
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Pašalinti user pagal ID
exports.deleteUser = async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// exports.findPlacesAndUpdate = async (req, res) => {
//   console.log(req.params.id);
//   console.log(req.params.subId);
//   console.log(req.body);

//   try {
//     const updatePlaces = await Tour.findOneAndUpdate(
//       { _id: req.params.id, "placesToVisit._id": req.params.subId },
//       {
//         $set: {
//           "placesToVisit.$.duration": 99999999,
//         },
//       }
//     );

//     const updatedPlaces = await Tour.findOne({
//       _id: req.params.id,
//       "placesToVisit._id": req.params.subId,
//     });

//     res.status(200).json({
//       status: "success",
//       data: {
//         places: updatedPlaces,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };
