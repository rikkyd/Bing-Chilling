import { useState, useEffect } from "react";

const App = () => {
  const [benua, setBenua] = useState("");
  const [negara, setNegara] = useState("");
  const [ibuKota, setIbuKota] = useState("");
  const [tableData, setTableData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [previousTableData, setPreviousTableData] = useState([]);

  useEffect(() => {
    // Ambil data dari Local Storage pada saat komponen dimuat
    const storedData = JSON.parse(localStorage.getItem("geoData")) || [];
    setTableData(storedData);
  }, []);

  useEffect(() => {
    // Simpan data ke Local Storage setiap kali data berubah
    localStorage.setItem("geoData", JSON.stringify(tableData));
  }, [tableData]);

  const handleBenua = (event) => {
    setBenua(event.target.value);
  };

  const handleNegara = (event) => {
    setNegara(event.target.value);
  };

  const handleIbuKota = (event) => {
    setIbuKota(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (benua && negara && ibuKota) {
      const newData = { id: Date.now(), benua, negara, ibuKota };

      // Save the current state to previousTableData before modification
      setPreviousTableData([...tableData]);

      setTableData([...tableData, newData]);
      setBenua("");
      setNegara("");
      setIbuKota("");
    }
  };

  const handleEdit = (id) => {
    const updateGeoData = tableData.find((data) => data.id === id);

    if (updateGeoData) {
      setBenua(updateGeoData.benua);
      setNegara(updateGeoData.negara);
      setIbuKota(updateGeoData.ibuKota);
      setEditingId(id);
    }
  };

  const handleUpdate = () => {
    if (benua && negara && ibuKota && editingId !== null) {
      const updatedGeoData = { id: editingId, benua, negara, ibuKota };

      // Save the current state to previousTableData before modification
      setPreviousTableData([...tableData]);

      const updatedData = tableData.map((geoData) =>
        geoData.id === editingId ? updatedGeoData : geoData
      );

      setTableData(updatedData);

      setBenua("");
      setNegara("");
      setIbuKota("");
      setEditingId(null);
    }
  };

  const handleDelete = (id) => {
    // Save the current state to previousTableData before modification
    setPreviousTableData([...tableData]);

    const deletedData = tableData.filter((geoData) => geoData.id !== id);
    setTableData(deletedData);
  };

  const handleDeleteAll = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all data?");
    
    if (confirmDelete) {
      // Save the current state to previousTableData before modification
      setPreviousTableData([...tableData]);

      setTableData([]);
    }
  };

  const handleUndo = () => {
    // Revert to the previous state stored in previousTableData
    setTableData([...previousTableData]);
  };

  return (
    <>
      <div>
        <div className="header">  
          <img src="/hehe.jpg" alt="profil" />    
          <h1>Geo Data (Rizki Dharma Satya)</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <input
              value={benua}
              onChange={handleBenua}
              placeholder="Benua"
            ></input>
            <input
              value={negara}
              onChange={handleNegara}
              placeholder="Negara"
            ></input>
            <input
              value={ibuKota}
              onChange={handleIbuKota}
              placeholder="Ibu Kota"
            ></input>
          </fieldset>
          <button type="submit">Add Data</button>
          <button onClick={handleDeleteAll}>Delete All</button>
          
        </form>
        <button onClick={handleUndo}>Undo</button>
        <button type="submit" onClick={handleUpdate}>
          Update Data
        </button>
        <table>
          <thead>
            <tr>
              <th>Benua</th>
              <th>Negara</th>
              <th>Ibu Kota</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((geoData) => (
              <tr key={geoData.id}>
                <td>{geoData.benua}</td>
                <td>{geoData.negara}</td>
                <td>{geoData.ibuKota}</td>
                <td>
                  <button onClick={() => handleEdit(geoData.id)}>Update</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(geoData.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
