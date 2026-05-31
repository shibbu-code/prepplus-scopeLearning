import React, { useState, useEffect } from "react";
import "./SolvePage.css";
import Editor, { useMonaco } from "@monaco-editor/react";
const SolvePage = () => {
  const monaco = useMonaco();
  const handleEditorDidMount = (editor, monaco) => {

  monaco.editor.defineTheme(
    "prepplus-theme",
    {
      base: "vs-dark",
      inherit: true,

      colors: {
        "editor.background": "#07121f",
        "editor.foreground": "#F3F4F4"
      },

      rules: []
    }
  );

  monaco.editor.setTheme(
    "prepplus-theme"
  );
};


const [showResults, setShowResults] =
  useState(true);
  const [problem, setProblem] = useState(null);

  const [language, setLanguage] =
    useState("cpp");

  const [code, setCode] =
    useState("");

  const [result, setResult] =
    useState([]);

  const [isAccepted, setIsAccepted] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [showDropdown, setShowDropdown] =
    useState(false);

  // LOAD PROBLEM

  useEffect(() => {

    const storedProblem =
      sessionStorage.getItem(
        "selectedProblem"
      );

    if (storedProblem) {

      const parsedProblem =
        JSON.parse(storedProblem);

      setProblem(parsedProblem);

      setCode(
        parsedProblem?.starterCode?.cpp || ""
      );
    }

  }, []);

  // LANGUAGE CHANGE

  const changeLanguage = (lang) => {

    setLanguage(lang);

    setCode(
      problem?.starterCode?.[lang] || ""
    );

    setShowDropdown(false);
  };

  // RUN CODE

  const codeRun = async () => {

    if (!problem) return;

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:3000/runCode",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${sessionStorage.getItem("token")}`,
          },

          body: JSON.stringify({
            userCode: code,
            language,
            problemNumber:
              problem?.problemNumber,
          }),
        }
      );

      const data =
        await response.json();

      setResult(data.results || []);

      const accepted =
        data.results &&
        data.results.every(
          (res) =>
            res.status === "Accepted"
        );

      setIsAccepted(accepted);

    } catch (error) {

      console.error(
        "Error running code:",
        error
      );

      setIsAccepted(false);

    } finally {

      setLoading(false);
    }
  };

  // SUBMIT CODE

  const submitCode = async () => {

    try {

      const response = await fetch(
        "http://localhost:3000/submitCode",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          credentials: "include",

          body: JSON.stringify({

            accepted: isAccepted,

            problemId:
              problem?._id,

            userId:
              JSON.parse(
                sessionStorage.getItem("user")
              ).id,
              difficulty: problem?.difficulty
          }),
        }
      );

      const data =
        await response.json();

      alert(data.message);

    } catch (error) {

      console.error(
        "Error submitting code:",
        error
      );

      alert("Error submitting code");
    }
  };

  // LOADING

  if (!problem) {

    return (

      <div className="loading-container">

        <h2>
          Loading Problem...
        </h2>

      </div>
    );
  }

  return (

    <div className="solve-container">

      {/* LEFT PANEL */}

      <div className="left-panel">

        <h2>
          {problem?.problemNumber}.
          {" "}
          {problem?.title}
        </h2>

        <span
          className={`difficulty ${problem?.difficulty}`}
        >
          {problem?.difficulty}
        </span>

        <p className="desc">
          {problem?.description}
        </p>

        {/* CONSTRAINTS */}

        <h3>Constraints</h3>

        <pre className="constraints">
          {problem?.constraints}
        </pre>

        {/* EXAMPLES */}

        <h3>Examples</h3>

        {problem?.sampleTestCases?.map(
          (test, index) => (

            <div
              key={index}
              className="example"
            >

              <p>
  <b>Input:</b>
</p>

<pre className="example-box">
{
  Object.entries(test.input)
    .map(
      ([key, value]) =>
        `${key} = ${JSON.stringify(value)}`
    )
    .join("\n")
}
</pre>

              <p>
                <b>Output:</b>
                {" "}
                {JSON.stringify(test.output)}
              </p>

            </div>
          )
        )}

        {/* TAGS */}

        <h3>Tags</h3>

        <div className="tags">

          {problem?.tags?.map(
            (tag, index) => (

              <span
                key={index}
                className="tag"
              >
                {tag}
              </span>
            )
          )}

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="right-panel">

        {/* TOPBAR */}

        <div className="editor-topbar">

          {/* CUSTOM DROPDOWN */}

          <div className="custom-dropdown">

            <button
              className="dropdown-btn"
              
            > C++
            </button>
          </div>

        </div>

        {/* EDITOR */}

        {/* <textarea
          className="editor"
          value={code}
          onChange={(e) =>
            setCode(e.target.value)
          }
          spellCheck={false}
        /> */}

        
        <div className="editor-container">

  <Editor
    height="100%"
    language="cpp"
  onMount={handleEditorDidMount}
  theme="prepplus-theme"
    value={code}
    onChange={(value) =>
      setCode(value || "")
    }
    
    options={{
      lineNumbers: "on",
      fontSize: 15,
      glyphMargin: false,
      folding: true,
      minimap: {
        enabled: false
      },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      wordWrap: "on",
      padding: {
        top: 15
      },
      fontLigatures: true,
      cursorBlinking: "smooth",
      smoothScrolling: true,
      bracketPairColorization: {
        enabled: true
      }
    }}
  />

</div>

        {/* ACTIONS */}

        <div className="actions">

          <button
            className="run-btn"
            onClick={codeRun}
            disabled={loading}
          >

            {loading
              ? "Running..."
              : "Run"}

          </button>

          <button
            className="submit-btn"
            disabled={
              result.length === 0
              || loading
            }
            onClick={submitCode}
          >

            Submit

          </button>

        </div>

        {/* STATUS */}

        {result.length > 0 && (

          <div
            className={`overall-status ${
              isAccepted
              ? "accepted"
              : "wrong"
            }`}
          >

            <h2>

              {isAccepted
                ? "✅ All Test Cases Passed"
                : "❌ Some Test Cases Failed"}

            </h2>

          </div>
        )}

        {/* RESULTS */}

        {/* RESULTS */}

{result.length > 0 && (

  <div
    className={`result-wrapper ${
      showResults
      ? "open"
      : "closed"
    }`}
  >

    {/* TOPBAR */}

    <div className="result-topbar">

      <div className="result-left">

        <h3>
          Test Results
        </h3>

        <span
          className={`status-pill ${
            isAccepted
            ? "accepted"
            : "wrong"
          }`}
        >

          {isAccepted
            ? "Accepted"
            : "Failed"}

        </span>

      </div>

      <button
        className="collapse-btn"
        onClick={() =>
          setShowResults(
            !showResults
          )
        }
      >

        {showResults ? "⌄" : "⌃"}

      </button>

    </div>

    {/* BODY */}

    {showResults && (

      <div className="result-panel">

        {result.map(
          (res, index) => (

            <div
              key={index}
              className={`result-card ${
                res.status === "Accepted"
                ? "accepted"
                : "wrong"
              }`}
            >

              <div className="card-top">

                <h4>
                  Case {index + 1}
                </h4>

                <span
                  className={`mini-status ${
                    res.status === "Accepted"
                    ? "accepted"
                    : "wrong"
                  }`}
                >

                  {res.status}

                </span>

              </div>

              <div className="result-block">

                <p>
                  <b>Output</b>
                </p>

                <pre>
                  {res.output}
                </pre>

              </div>

              <div className="result-block">

                <p>
                  <b>Expected</b>
                </p>

                <pre>
                  {res.expected}
                </pre>

              </div>

            </div>
          )
        )}

      </div>
    )}

  </div>
)}

      </div>

    </div>
  );
};

export default SolvePage;