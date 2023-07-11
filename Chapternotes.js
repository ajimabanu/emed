import React, { useEffect, useState } from "react";
import "../styles/Chapter.css";

const Chapternotes = () => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`/codes/${global.values.code}/details/?version=${global.years}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchBooks();
  }, [global.values?.code]);

  console.log("our result is", results);

  const shouldDisplayClassification = (classification, index) => {
    if (index === 0) {
      return true; // Always display the first classification
    }
    const previousClassifications = results?.chapter?.notes
      .slice(0, index)
      .map((note) => note.classification);
    return !previousClassifications?.includes(classification);
  };

  return (
    <div>
      <div style={{ marginTop: "50px" }}>
        {results && results.chapter && results.chapter.description && (
          <div key={results.code}>
            <div style={{ marginLeft: "17px" }}>
              {results.chapter.description}
            </div>
          </div>
        )}
        {results && results.chapter && results.chapter.notes?.length > 0 ? (
          results.chapter.notes
            .sort((a, b) => a.classification.localeCompare(b.classification))
            .map((note, index) => (
              <div key={index}>
                {shouldDisplayClassification(note.classification, index) && (
                  <div
                    style={{ padding: "10px 20px 20px 20px" }}
                    className="classification-note"
                  >
                    <strong>{note.classification.toUpperCase()}</strong>:
                    {note.notes}
                  </div>
                )}
                {!shouldDisplayClassification(note.classification, index) && (
                  <div
                    style={{ marginLeft: "110px" }}
                    className="classification-note"
                  >
                    {note.notes}
                  </div>
                )}
              </div>
            ))
        ) : (
          <div>No notes available.</div>
        )}
      </div>
    </div>
  );
};

export default Chapternotes;
