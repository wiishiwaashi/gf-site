import { useState } from "react";

const GRADE_OPTIONS = [1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0];

const SUBJECTS = [
  { id: "kas-grade", name: "Kasaysayan" },
  { id: "eng-grade", name: "English" },
  { id: "math-grade", name: "Math 10" },
  { id: "ctra-grade", name: "CTRA" },
  { id: "flcd100-grade", name: "FLCD 100" },
  { id: "flcd101-grade", name: "FLCD 101" },
];

const GwaCalc = () => {
  const [grades, setGrades] = useState<Record<string, number>>(
    Object.fromEntries(SUBJECTS.map((s) => [s.id, 1.0]))
  );

  const gwa =
    Object.values(grades).reduce((sum, g) => sum + g, 0) / SUBJECTS.length;

  return (
    <div className="card gwa-calc">
      <div className="calchead">
        <p>YooPee GWA Calculator</p>
      </div>
      {SUBJECTS.map(({ id, name }) => (
        <div className="subj" key={id}>
          <div className="subj-name">
            <p>{name}</p>
          </div>
          <div className="calc area">
            <select
              id={id}
              value={grades[id]}
              onChange={(e) =>
                setGrades((prev) => ({
                  ...prev,
                  [id]: Number(e.target.value),
                }))
              }
            >
              {GRADE_OPTIONS.map((grade) => (
                <option key={grade} value={grade}>
                  {grade.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
      <div className="final-gwa">
        <input id="display" readOnly value={gwa.toFixed(3)} />
      </div>
    </div>
  );
};

export default GwaCalc;
