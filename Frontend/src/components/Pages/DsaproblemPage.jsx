import React, { useEffect, useState } from "react";
import "./DsaproblemPage.css";
import { useNavigate } from "react-router-dom";

const DsaproblemPage = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({ problem: [] });

  const [search, setSearch] = useState("");

  const [difficulty, setDifficulty] = useState("All");

  useEffect(() => {

    const storedData =
      sessionStorage.getItem("dsaQuestions");

    if (storedData) {

      setData(JSON.parse(storedData));
    }

  }, []);

  const handleSolve = (problem) => {

    sessionStorage.setItem(
      "selectedProblem",
      JSON.stringify(problem)
    );

    navigate(
      `/problem-set/${problem.title
        .replace(/\s+/g, "-")
        .toLowerCase()}`
    );
  };

  // FILTERING

  const filteredProblems =
    data.problem.filter((item) => {

      const matchesSearch =

        item.title
          .toLowerCase()
          .includes(search.toLowerCase())

        ||

        item.problemNumber
          .toString()
          .includes(search);

      const matchesDifficulty =

        difficulty === "All"
        ||
        item.difficulty === difficulty;

      return (
        matchesSearch
        &&
        matchesDifficulty
      );
    });

  return (

    <div className="dsa-page">

      {/* TOPBAR */}

      <div className="topbar">

        <input
          type="text"
          placeholder="Search by name or id..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="custom-dropdown">

  <button className="dropdown-btn">

    {difficulty}

    <span>⌄</span>

  </button>

  <div className="dropdown-menu">

    <div onClick={() => setDifficulty("All")}>
      All
    </div>

    <div onClick={() => setDifficulty("easy")}>
      Easy
    </div>

    <div onClick={() => setDifficulty("medium")}>
      Medium
    </div>

    <div onClick={() => setDifficulty("hard")}>
      Hard
    </div>

  </div>

</div>

      </div>

      {/* LIST */}

      <div className="problem-list">

        {filteredProblems.map((item) => (

          <div
            key={item._id}
            className="problem-row"
            onClick={() => handleSolve(item)}
          >

            <div className="left">

              <span className="problem-id">
                {item.problemNumber}.
              </span>

              <h3>
                {item.title}
              </h3>

            </div>

            <div className="right">

              <span
                className={`difficulty ${item.difficulty}`}
              >
                {item.difficulty}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default DsaproblemPage;