import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sample-ovwb.onrender.com/file/getAllData"
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the function to fetch data
    fetchData();
  }, []);

  const submitFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", file);
    formData.append("title", file.name);

    const result = await axios.post(
      "https://sample-ovwb.onrender.com/file/post",
      { file, title: file.name },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (result) {
      window.location.reload();
    }
  };

  let content;

  const render = () => {
    if (data) {
      return data.map((d) => {
        {
          return (
            <div className=" w-[90%] flex justify-center object-cover ">
              <img
                src={`https://sample-ovwb.onrender.com/img/${d.fileUrl}`}
                alt=""
                className="object-contain"
              />
            </div>
          );
        }
      });
    } else {
      return <h1>Loading</h1>;
    }
  };

  const sample = () => {
    return <p>Hello</p>;
  };

  return (
    <div className="h-screen w-full max-w-[1120px] mx-auto">
      <form
        className="flex flex-col items-center justify-center p-10 bg-slate-200 gap-5"
        onSubmit={submitFile}
      >
        {" "}
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button className="bg-blue-500 px-8 py-1 text-sm text-white font-bold ">
          Submit
        </button>
      </form>
      <div className="w-full flex flex-wrap bg-slate-400 items-center justify-center  gap-4 ">
        {render()}
      </div>
    </div>
  );
};

export default App;
