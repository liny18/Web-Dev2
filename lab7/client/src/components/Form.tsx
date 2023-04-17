import React, { useState } from "react";

export const Form: React.FC = () => {
  const [number, setNumber] = useState<string>("");
  const [requestBody, setRequestBody] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  const isValidRequestBody = (input: string): boolean => {
    const regex =
      /^\s*\{\s*"id"\s*:\s*\d+\s*,\s*"name"\s*:\s*"[^"]+"\s*,\s*"Capital"\s*:\s*"[^"]+"\s*,\s*"Currency"\s*:\s*"[^"]+"\s*,\s*"Code"\s*:\s*"[^"]+"\s*\}\s*$/;
    return regex.test(input);
  };

  const handleRequest = async (verb: string) => {
    if (
      (verb === "POST" || verb === "PUT") &&
      !isValidRequestBody(requestBody)
    ) {
      alert(
        'Invalid request body format. Please follow the format: {"id": 1, "name": "China", "Capital": "Beijing", "Currency": "Yuan", "Code": "CN"}'
      );
      return;
    }
    try {
      const apiUrl =
        number == "0" || !number
          ? `/node/api/v1/db`
          : `/node/api/v1/db/${number}`;
      const config: RequestInit = {
        method: verb,
        headers: { "Content-Type": "application/json" },
        body: requestBody ? requestBody : undefined,
      };

      const result = await fetch(apiUrl, config);
      const data = await result.json();
      if (verb === "GET") {
        setResponse(
          JSON.stringify(
            number ? data.name : data.map((item: any) => item.name),
            null,
            2
          )
        );
      } else {
        setResponse(JSON.stringify(data, null, 2));
      }
    } catch (error) {
      setResponse(JSON.stringify(error, null, 2));
    }
  };

  return (
    <div className="flex flex-col items-center relative">
      <button className="" onClick={toggleFormVisibility}>
        {isFormVisible ? "HIDE" : "FORM"}
      </button>
      {isFormVisible && (
        <div className="fixed top-28 p-5 shadow-md bg-gray-100 rounded-lg z-10">
          <div className="flex justify-between">
            <label>Number (leave empty for /db endpoint):</label>
            <input
              className="border-2 border-gray-300 rounded-md"
              type="number"
              min="0"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="mt-2 flex justify-between">
            <label>Request Body (for POST and PUT):</label>
            <textarea
              className="border-2 border-gray-300 rounded-md ml-3"
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              placeholder='{"id": 1, "name": "China", "Capital": "Beijing", "Currency": "Yuan", "Code": "CN"}'
            />
          </div>
          <div className="mt-2 flex justify-between">
            <button onClick={() => handleRequest("GET")}>GET</button>
            <button onClick={() => handleRequest("POST")}>POST</button>
            <button onClick={() => handleRequest("PUT")}>PUT</button>
            <button onClick={() => handleRequest("DELETE")}>DELETE</button>
          </div>
          <div className="mt-2">
            <h2>Response:</h2>
            <pre className="bg-gray-200 p-5 rounded-md overflow-y-scroll overflow-x-hidden max-w-md max-h-32">
              {response}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
