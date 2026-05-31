const questionset = require('../DB/Modules/questions')
const Topic = require('../DB/Modules/Topic');
const mongoose = require('mongoose');
const User = require('../DB/Modules/user');
const home = (req, res) => {
    res.send('Hello World! from home');
}
const problemSet = async (req,res) =>
{
    try {
        console.log(questionset.collection.name);
        const problems = await questionset.find();
        res.status(200).json(
            {
                problem : problems
            }
        );
    } catch (error) {
        res.status(500).json(
            {
                message : "error in fetching problemset"
            }
        )
    }
    
}

const profile = async(req,res) =>
{
    try {
    const userId = req.user.id; // 👈 HERE is your user ID

    const user = await User.findById(userId);

    res.json(user);
   
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }

}
const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find({});
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching topics" });
  }
};

const SubmitCode = async (req, res) => {
  try {
    const { accepted, problemId, userId ,difficulty} = req.body;
   
    if (accepted) 
      { await User.findOneAndUpdate( 
        { _id: userId, solvedQuestions: 
          { $ne: problemId } // check not already solved
    // 
     },
      { $addToSet: 
        { solvedQuestions: problemId }, 
       $inc: {
  totalSolved: 1,
  [`difficultySolved.${difficulty}`]: 1
}
      } ); 
    }

    res.status(200).json({
      message: "Code submission recorded"
    });

  } catch (error) {
    console.log("Error in SubmitCode:", error)
    res.status(500).json({
      
      message: "Error recording code submission"
    });
  }
};

// module subbmission


const submitModule = async (req, res) => {
  try {
    const { userId, topicId } = req.body;
    
    // Check if moduleId already exists in solvedModules
    const userExists = await User.findOne({
      _id: userId,
      "solvedModules.moduleId": topicId
    });

    // If already submitted, don't add again
    if (userExists) {
      return res.status(200).json({
        message: "Module already completed",
      });
    }

    // If not submitted yet, add it
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          solvedModules: {
            moduleId: topicId,
            completedAt: new Date()
          }
        }
      }
    );

    res.status(200).json({
      message: "Module completion recorded",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error recording module completion",
      error: error.message,
    });
  }
};
module.exports = {
    home ,
    problemSet,
    profile,
    getAllTopics,
    SubmitCode,
    submitModule
}