const Question = require('../DB/Modules/questions');
const axios = require("axios");

const run = async (req, res) => {
  try {
    

    const { userCode, problemNumber } = req.body;

    const problem = await Question.findOne({
      problemNumber: Number(problemNumber)
    });

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    const allTestCases = problem.hiddenTestCases || problem.testCases;
    const results = [];

    for (const tc of allTestCases) {
      const input = tc.input;

      // ✅ 1. Generate declarations
      let declarations = "";

      problem.parameters.forEach(param => {
        const value = input[param.name];

        if (value === undefined) {
          throw new Error(`Missing input: ${param.name}`);
        }

        if (param.type === "vector<int>") {
          declarations += `vector<int> ${param.name} = {${value.join(",")}};\n`;
        } 
        else if (param.type === "int") {
          declarations += `int ${param.name} = ${value};\n`;
        } 
        else if (param.type === "string") {
          const safeString = value.replace(/"/g, '\\"'); // 🔥 FIX
          declarations += `string ${param.name} = "${safeString}";\n`;
        } 
        else if (param.type === "vector<vector<int>>") {
          const formatted = `{${value.map(row => `{${row.join(",")}}`).join(",")}}`;
          declarations += `vector<vector<int>> ${param.name} = ${formatted};\n`;
        }
      });

      // ✅ 2. Function call
      const args = problem.parameters.map(p => p.name).join(", ");
      const functionCall = `${problem.returnType} res = ${problem.functionName}(${args});`;

      // ✅ 3. Output handling
      let printLogic = "";

      if (problem.returnType === "vector<int>") {
        printLogic = `
if(!res.empty()){
  cout << "[";
  for(int i = 0; i < res.size(); i++){
    cout << res[i];
    if(i != res.size()-1) cout << ",";
  }
  cout << "]";
} else {
  cout << "[]";
}`;
      } 
      else if (problem.returnType === "bool") {
        printLogic = `cout << (res ? "true" : "false");`;
      } 
      else {
        printLogic = `cout << res;`;
      }

      // ✅ 4. Main function
      const MainFunction = `
int main() {
  ${declarations}
  // ${functionCall}
  ${printLogic}
}
`;

      const fullcode =
        problem.starterCode.cpp +
        "\n" +
        userCode +
        "\n" +
        MainFunction;
   
      // ✅ 5. Execute
      const response = await axios.post(
        "https://onecompiler-apis.p.rapidapi.com/api/v1/run", 
        { language: "cpp", stdin: "", 
            files: [ { name: "main.cpp", content: fullcode } ] }, 
            { headers: 
                { 
                    "content-type": "application/json", 
                    "X-RapidAPI-Key": "5c94a6271dmsh15f1244012aa4f3p17f3dbjsncc1a00c037e0", 
                    "X-RapidAPI-Host": "onecompiler-apis.p.rapidapi.com" } }
      );

      const result = response.data;

      

      // ✅ 6. Extract output / error
      let output = "";
      let error = "";

      if (result.stdout) {
        output = result.stdout.trim();
      } else if (result.stderr) {
        error = result.stderr;
      } else if (result.compile_output) {
        error = result.compile_output;
      }

      // ✅ 7. Smart comparison (LeetCode style)
      const safeParse = (val) => {
        try {
          return JSON.parse(val);
        } catch {
          return val;
        }
      };

      const actualParsed = safeParse(output);
      const expectedParsed = tc.output;

      const status = error
        ? "Compilation Error"
        : JSON.stringify(actualParsed) === JSON.stringify(expectedParsed)
        ? "Accepted"
        : "Wrong Answer";

      results.push({
        output: output || error,
        expected: JSON.stringify(expectedParsed),
        status
      });
    }

    // ✅ Final response
    res.json({ results });

  } catch (error) {
    console.error("Error in run function:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { run };