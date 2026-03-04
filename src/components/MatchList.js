import React from "react";

function MatchList({ lostItems = [], foundItems = [] }) {
  const normalize = (str = "") => str.toLowerCase().trim();
  const matches = [];

  lostItems.forEach((lost) => {
    foundItems.forEach((found) => {
      // Improved logic: Match if Item name is similar AND Place is similar
      const nameMatch =
        normalize(lost.item).includes(normalize(found.item)) ||
        normalize(found.item).includes(normalize(lost.item));

      const placeMatch =
        normalize(lost.place).includes(normalize(found.place)) ||
        normalize(found.place).includes(normalize(lost.place));

      if (nameMatch && placeMatch) {
        matches.push({
          item: lost.item,
          lostPlace: lost.place,
          lostDate: lost.lostDate,
          lostDesc: lost.desc,
          lostImage: lost.image,
          ownerName: lost.contactName,
          ownerPhone: lost.contactPhone,

          foundPlace: found.place,
          foundDate: found.foundDate,
          foundDesc: found.desc,
          foundImage: found.image,
          finderName: found.contactName,
          finderPhone: found.contactPhone,
        });
      }
    });
  });

  return (
    <div className="match-section">
      {matches.length === 0 ? (
        <p className="empty-msg">No matches found at the moment.</p>
      ) : (
        <div className="items-grid">
          {matches.map((m, idx) => (
            <div key={idx} className="profile-card match-card">
              <div className="match-badge">Match Found</div>
              <h3>{m.item}</h3>
              
              <div className="match-details-split">
                <div className="match-col">
                  <p className="col-label">Lost Info</p>
                  <div className="profile-info">📍 {m.lostPlace}</div>
                  <div className="profile-info">👤 {m.ownerName}</div>
                  <div className="profile-info">📞 {m.ownerPhone}</div>
                </div>
                <div className="match-col">
                  <p className="col-label">Found Info</p>
                  <div className="profile-info">📍 {m.foundPlace}</div>
                  <div className="profile-info">👤 {m.finderName}</div>
                  <div className="profile-info">📞 {m.finderPhone}</div>
                </div>
              </div>

              {m.lostImage && <img src={m.lostImage} alt="Lost" className="card-img" />}
              
              <div className="match-desc" style={{marginTop: '15px', fontSize: '0.8rem', opacity: 0.8}}>
                <strong>Owner Note:</strong> {m.lostDesc || "No description"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MatchList;