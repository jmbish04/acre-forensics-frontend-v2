import React from "react";
import { Button } from "@/components/ui/button";

function App() {
  const [data, setData] = React.useState(null);

  console.log("App component rendered");

  const handleClick = async () => {
    try {
      const response = await fetch('/api/hello');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="p-8 border rounded-lg shadow-lg bg-card text-card-foreground">
        <h1 className="text-3xl font-bold mb-4">
          Cloudflare, Vite, React, and Shadcn UI
        </h1>
        <p className="mb-6 text-muted-foreground">
          This is a sample application demonstrating the integration of a React
          frontend with a Cloudflare Worker backend, styled with Shadcn UI.
        </p>
        <Button onClick={handleClick}>Click Me</Button>
      </div>

      {data && (
        <div className="mt-8 p-6 border rounded-lg shadow-lg bg-card text-card-foreground w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Data from API:</h2>
          <pre className="bg-muted p-4 rounded-lg text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
