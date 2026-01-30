import React from "react";

function MatchList({ lostItems = [], foundItems = [] }) {
  const normalize = (str = "") => str.toLowerCase().trim();
  const matches = [];

  lostItems.forEach((lost) => {
    foundItems.forEach((found) => {
      const nameMatch =
        normalize(lost.item) === normalize(found.item) ||
        normalize(lost.item).includes(normalize(found.item)) ||
        normalize(found.item).includes(normalize(lost.item));

      const placeMatch =
        normalize(lost.place) === normalize(found.place) ||
        normalize(lost.place).includes(normalize(found.place)) ||
        normalize(found.place).includes(normalize(lost.place));

      if (nameMatch || placeMatch) {
        matches.push({
          item: lost.item,
          place: lost.place,
          lostDate: lost.lostDate,
          desc: lost.desc,
          image: lost.image,
          contactName: lost.contactName,
          contactPhone: lost.contactPhone,
          userAddress: lost.userAddress,

          foundPlace: found.place,
          foundDate: found.foundDate,
          foundDesc: found.desc,
          foundImage: found.image,
          finderName: found.contactName,
          finderContact: found.contactPhone,
          finderAddress: found.userAddress,
        });
      }
    });
  });

  return (
    <div className="match-section">
      {matches.length === 0 ? (
        <p className="empty-msg">No matches found.</p>
      ) : (
        <div className="matches-container">
          {matches.map((m, idx) => (
            <div key={idx} className="match-card">
              <h3>{m.item}</h3>

              <div className="match-date">
                Lost at: {m.place} ({m.lostDate ? new Date(m.lostDate).toDateString() : "N/A"})
              </div>

              <div className="match-date">
                Found at: {m.foundPlace} ({m.foundDate ? new Date(m.foundDate).toDateString() : "N/A"})
              </div>

              <div className="match-desc">
                Lost by: {m.contactName} | Phone: {m.contactPhone} | Address: {m.userAddress}
              </div>

              <div className="match-desc">
                Found by: {m.finderName} | Phone: {m.finderContact} | Address: {m.finderAddress}
              </div>

              {m.desc && <div className="match-desc">Lost Description: {m.desc}</div>}
              {m.foundDesc && <div className="match-desc">Found Description: {m.foundDesc}</div>}

              {m.image && <img src={m.image} alt="Lost" style={{ maxWidth: "100%", marginTop: 10 }} />}
              {m.foundImage && <img src={m.foundImage} alt="Found" style={{ maxWidth: "100%", marginTop: 10 }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MatchList;
