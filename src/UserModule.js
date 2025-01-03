import React, { useState } from "react";

const UserModule = () => {
  const [companies] = useState([
    {
      name: "Company A",
      lastFiveCommunications: [
        { type: "LinkedIn Post", date: "2025-01-01", notes: "Discussed new updates." },
        { type: "Email", date: "2024-12-20", notes: "Shared proposal." }
      ],
      nextCommunication: { type: "Email", date: "2025-01-03" },
      communicationStatus: "Due today" 
    },
    {
      name: "Company B",
      lastFiveCommunications: [
        { type: "Phone Call", date: "2024-12-25", notes: "Discussed project scope." }
      ],
      nextCommunication: { type: "LinkedIn Message", date: "2025-01-05" },
      communicationStatus: "Overdue"
    }
  ]);

  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [showModal, setShowModal] = useState(false);

  const toggleCompanySelection = (index) => {
    if (selectedCompanies.includes(index)) {
      setSelectedCompanies(selectedCompanies.filter((i) => i !== index));
    } else {
      setSelectedCompanies([...selectedCompanies, index]);
    }
  };

  const logCommunication = () => {
    setShowModal(true);
  };

  const submitCommunication = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="user-content">
        <button className="row-icon" onClick={() => setActiveTab("Dashboard")}>Dashboard</button>
        <button className="row-icon" onClick={() => setActiveTab("Notifications")}>Notifications</button>
        <button className="row-icon" onClick={() => setActiveTab("Calendar")}>Calendar</button>
      </div>

      {activeTab === "Dashboard" && (
        <div>
          <h2>Dashboard</h2>
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Company Name</th>
                <th>Last Five Communications</th>
                <th>Next Scheduled Communication</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedCompanies.includes(index)}
                      onChange={() => toggleCompanySelection(index)}
                    />
                  </td>
                  <td>{company.name}</td>
                  <td>
                    {company.lastFiveCommunications.map((comm, i) => (
                      <div key={i} title={comm.notes} style={{ cursor: "pointer", textDecoration: "underline" }}>
                        {comm.type} - {comm.date}
                      </div>
                    ))}
                  </td>
                  <td>
                    {company.nextCommunication.type} - {company.nextCommunication.date}
                  </td>
                  <td
                    style={{
                      color:
                        company.communicationStatus === "Overdue"
                          ? "red"
                          : company.communicationStatus === "Due today"
                          ? "orange"
                          : "black"
                    }}
                  >
                    {company.communicationStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedCompanies.length > 0 && <button onClick={logCommunication}>Log Communication</button>}

          {showModal && (
            <div style={{ border: "1px solid black", padding: "20px", margin: "20px" }}>
              <h3>Log New Communication</h3>
              <label>
                Type of Communication:
                <select>
                  <option>LinkedIn Post</option>
                  <option>Email</option>
                  <option>Phone Call</option>
                  <option>Other</option>
                </select>
              </label>
              <br />
              <label>
                Date of Communication:
                <input type="date" />
              </label>
              <br />
              <label>
                Notes:
                <textarea rows="4"></textarea>
              </label>
              <br />
              <button onClick={submitCommunication}>Submit</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          )}
        </div>
      )}

      {activeTab === "Notifications" && (
        <div>
          <h2 className="user-content">Notifications</h2>
          <div>
            <h3>Overdue Communications</h3>
            {companies
              .filter((company) => company.communicationStatus === "Overdue")
              .map((company, index) => (
                <p key={index}>
                  {company.name}: {company.nextCommunication.date}
                </p>
              ))}
          </div>
          <div>
            <h3>Today's Communications</h3>
            {companies
              .filter((company) => company.communicationStatus === "Due today")
              .map((company, index) => (
                <p key={index}>{company.name}</p>
              ))}
          </div>
        </div>
      )}

      {activeTab === "Calendar" && (
        <div>
          <h2 >Calendar</h2>
          <p>Coming soon: Calendar to display past and upcoming communications.</p>
        </div>
      )}
    </div>
  );
};

export default UserModule;
