import React, { useState } from "react";
import "./ContactPage.css";

function ContactPage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="main-content single-column">
      <h2>Contact Us</h2>

      <section>
        <h4>Administrative Office</h4>
        <p><strong>Office hours:</strong> Monday-Friday from 8:00am-4:00pm.</p>
        <p>Director of CIRT: <a href="mailto:bdulisse@ut.edu">Bdulisse@ut.edu</a></p>
        <p><strong>Main Office:</strong><br/> Room here<br/> Phone: here</p>

        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? "- Contact Faculty" : "+ Contact Faculty"}
        </button>

        {expanded && (
          <ul className="faculty-list">
            <li><strong>Brandon Dulisse</strong> - Director of CIRT - <a href="mailto:bdulisse@ut.edu">bdulisse@ut.edu</a></li>
            <li><strong>Nate Connealy</strong> - Associate Director - <a href="mailto:nconnealy@ut.edu">nconnealy@ut.edu</a></li>
            <li><strong>Chivon Fitch</strong> - Industry Liaison - <a href="mailto:cfitch@ut.edu">cfitch@ut.edu</a></li>
            <li><strong>Tim Hart</strong> - Associate Director of Research - <a href="mailto:thart@ut.edu">thart@ut.edu</a></li>
            <li><strong>Amanda Osuna</strong> - Research Associate - <a href="mailto:aosuna@ut.edu">aosuna@ut.edu</a></li>
            <li><strong>Leo Genco</strong> - Research Associate - <a href="mailto:lgenco@ut.edu">lgenco@ut.edu</a></li>
            <li><strong>Carly Hilinski-Rosick</strong> - Research Associate - <a href="mailto:chilinskikrosick@ut.edu">chilinskikrosick@ut.edu</a></li>
            <li><strong>Cedric Michel</strong> - Research Associate - <a href="mailto:cmichel@ut.edu">cmichel@ut.edu</a></li>
            <li><strong>Kathryn Branch</strong> - Research Associate - <a href="mailto:kbranch@ut.edu">kbranch@ut.edu</a></li>
            <li><strong>Kayla Toohy</strong> - Research Associate - <a href="mailto:ktoohy@ut.edu">ktoohy@ut.edu</a></li>
            <li><strong>Rhissa Briones Robinson</strong> - Research Associate - <a href="mailto:rrobinson@ut.edu">rrobinson@ut.edu</a></li>
            <li><strong>Gabriel Paez</strong> - Research Associate - <a href="mailto:gpaez@ut.edu">gpaez@ut.edu</a></li>
            <li><strong>Cassidy Tevlin</strong> - Research Associate - <a href="mailto:ctevlin@ut.edu">ctevlin@ut.edu</a></li>
          </ul>
        )}
      </section>
    </div>
  );
}

export default ContactPage;
