import React, { useEffect, useState } from "react";

const Sectionnotes = () => {
  const [results, setResults] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (global.values && global.values.code) {
          const response = await fetch(`/codes/${global.values.code}/details/?version=${global.years}`);
          if (response.ok) {
            const data = await response.json();
            setResults(data);
          } else {
            console.error("Failed to fetch data");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchBooks();
  }, [global.values]);

  console.log("our result is", results);

  return (
    <div className="section">
      <div>
        <table>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {results && results.section ? (
              <tr key={results.code}>
                <td>{results.section.code}</td>
                <td>{results.section.icdReference}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan={2}></td>
              </tr>
            )}
            {results &&
              results.section &&
              results.section.notes &&
              results.section.notes.length > 0 ? (
              results.section.notes.map((note, index) => (
                <tr key={index}>
                  <td>{note.classifications}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No notes available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sectionnotes;
