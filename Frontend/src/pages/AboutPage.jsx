import React from "react";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div>
      <h2>Mission Statement</h2>
      <p className="paragraph">
        It is the mission of the Department of Criminology and Criminal Justice to provide criminological education, research and services to students, practitioners, policymakers and the community through an intellectually challenging environment that promotes collegiality and an educational experience relevant to crime and criminological theory that is meant to engage intellectual inquiry with domestic and international perspectives.
      </p>
      <h2>Department of Criminology and Criminal Justice Purposes/Goals</h2>
      <p className="middle-paragraph">
        {/* Middle paragraph with normal formatting */}
        The Department's goals are to advance criminological knowledge, foster critical thinking, and promote social justice through research and education in criminology and criminal justice.
      </p>
    </div>
  );
}

export default AboutPage;
