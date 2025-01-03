import React, { useState } from "react";

const AdminModule = () => {
  const [companies, setCompanies] = useState([
    {
      name: "Company A",
      location: "Location A",
      linkedin: "link1",
      emails: "email1",
      phone: "12345",
      comments: "Notes A",
      periodicity: "Every 2 weeks",
    },
    {
      name: "Company B",
      location: "Location B",
      linkedin: "link2",
      emails: "email2",
      phone: "12345",
      comments: "Notes B",
      periodicity: "Every month",
    },
  ]);

  const [companyForm, setCompanyForm] = useState(null); 
  const [editingIndex, setEditingIndex] = useState(null); 

  const [communicationMethods, setCommunicationMethods] = useState([
    { name: "LinkedIn Post", description: "Post on LinkedIn", sequence: 1, mandatory: true },
    { name: "LinkedIn Message", description: "Send LinkedIn Message", sequence: 2, mandatory: true },
    { name: "Email", description: "Send an Email", sequence: 3, mandatory: true },
    { name: "Phone Call", description: "Make a Phone Call", sequence: 4, mandatory: false },
    { name: "Other", description: "Other Communication Method", sequence: 5, mandatory: false },
  ]);

  const [methodForm, setMethodForm] = useState(null); 
  const [editingMethodIndex, setEditingMethodIndex] = useState(null); 

  const handleInputChange = (e, formSetter, currentForm) => {
    const { name, value } = e.target;
    formSetter({ ...currentForm, [name]: value });
  };

  const handleCompanySubmit = () => {
    if (editingIndex !== null) {
      const updatedCompanies = [...companies];
      updatedCompanies[editingIndex] = companyForm;
      setCompanies(updatedCompanies);
    } else {
      setCompanies([...companies, companyForm]);
    }
    setCompanyForm(null); 
    setEditingIndex(null);
  };

  const deleteCompany = (index) => {
    setCompanies(companies.filter((_, i) => i !== index));
  };

  const startEditingCompany = (index) => {
    setEditingIndex(index);
    setCompanyForm(companies[index]);
  };

  const handleMethodSubmit = () => {
    if (editingMethodIndex !== null) {
      const updatedMethods = [...communicationMethods];
      updatedMethods[editingMethodIndex] = methodForm;
      setCommunicationMethods(updatedMethods);
    } else {
      setCommunicationMethods([...communicationMethods, methodForm]);
    }
    setMethodForm(null);
    setEditingMethodIndex(null);
  };

  const deleteCommunicationMethod = (index) => {
    setCommunicationMethods(communicationMethods.filter((_, i) => i !== index));
  };

  const startEditingMethod = (index) => {
    setEditingMethodIndex(index);
    setMethodForm(communicationMethods[index]);
  };

  return (
    <div>
      <h2>Company Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>LinkedIn</th>
            <th>Emails</th>
            <th>Phone Numbers</th>
            <th>Comments</th>
            <th>Periodicity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index}>
              <td>{company.name}</td>
              <td>{company.location}</td>
              <td>{company.linkedin}</td>
              <td>{company.emails}</td>
              <td>{company.phone}</td>
              <td>{company.comments}</td>
              <td>{company.periodicity}</td>
              <td>
                <button onClick={() => startEditingCompany(index)}><img src="/EDIT.png" alt="edit" width="20" height="20"></img></button>
                <button onClick={() => deleteCompany(index)}><img src="/DEL.png" alt="delete" width="20" height="20"></img></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {companyForm ? (
        <div>
          <input type="text" name="name" placeholder="Name" value={companyForm.name || ""} onChange={(e) => handleInputChange(e, setCompanyForm, companyForm)} />
          <input type="text" name="location" placeholder="Location" value={companyForm.location || ""} onChange={(e) => handleInputChange(e, setCompanyForm, companyForm)} />
          <input type="text" name="linkedin" placeholder="LinkedIn Profile" value={companyForm.linkedin || ""} onChange={(e) => handleInputChange(e, setCompanyForm, companyForm)} />
          <input type="text" name="emails" placeholder="Emails" value={companyForm.emails || ""} onChange={(e) => handleInputChange(e, setCompanyForm, companyForm)} />
          <input type="text" name="phone" placeholder="Phone Numbers" value={companyForm.phone || ""} onChange={(e) => handleInputChange(e, setCompanyForm, companyForm)} />
          <input type="text" name="comments" placeholder="Comments" value={companyForm.comments || ""} onChange={(e) => handleInputChange(e, setCompanyForm, companyForm)} />
          <input type="text" name="periodicity" placeholder="Communication Periodicity" value={companyForm.periodicity || ""} onChange={(e) => handleInputChange(e, setCompanyForm, companyForm)} />
          <button className="add" onClick={handleCompanySubmit}>{editingIndex !== null ? "Save Changes" : "Add Company"}</button>
        </div>
      ) : (
        <button className="add" onClick={() => setCompanyForm({})}>Add a Company</button>
      )}

      <h2>Communication Method Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Sequence</th>
            <th>Mandatory</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {communicationMethods.map((method, index) => (
            <tr key={index}>
              <td>{method.name}</td>
              <td>{method.description}</td>
              <td>{method.sequence}</td>
              <td>{method.mandatory ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => startEditingMethod(index)}><img src="/EDIT.png" alt="edit" width="20" height="20"></img></button>
                <button onClick={() => deleteCommunicationMethod(index)}><img src="/DEL.png" alt="delete" width="20" height="20"></img></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {methodForm ? (
        <div>
          <input type="text" name="name" placeholder="Name" value={methodForm.name || ""} onChange={(e) => handleInputChange(e, setMethodForm, methodForm)} />
          <input type="text" name="description" placeholder="Description" value={methodForm.description || ""} onChange={(e) => handleInputChange(e, setMethodForm, methodForm)} />
          <input type="number" name="sequence" placeholder="Sequence" value={methodForm.sequence || ""} onChange={(e) => handleInputChange(e, setMethodForm, methodForm)} />
          <input type="checkbox" name="mandatory" checked={methodForm.mandatory || false} onChange={(e) => setMethodForm({ ...methodForm, mandatory: e.target.checked })} />
          <label>Mandatory</label>
          <button className="add" onClick={handleMethodSubmit}>{editingMethodIndex !== null ? "Save Changes" : "Add Method"}</button>
        </div>
      ) : (
        <button className="add" onClick={() => setMethodForm({})}>Add Communication Method</button>
      )}
    </div>
  );
};

export default AdminModule;
