// pages/index.tsx
'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Home = () => {
  const [numPhases, setNumPhases] = useState<number | string>('');
  const [numMinutes, setNumMinutes] = useState<number | string>('');
  const [numRestMinutes, setNumRestMinutes] = useState<number | string>('');
  const [error, setError] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false); // Track if form is submitted
  const router = useRouter();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPhases = parseInt(numPhases as string, 10);
    const parsedMinutes = parseInt(numMinutes as string, 10);
    const parsedRestMinutes = parseInt(numRestMinutes as string, 10);

    if (isNaN(parsedPhases) || parsedPhases <= 0) {
      setError('Please enter a valid positive number.');
      return;
    }

    if (isNaN(parsedMinutes) || parsedMinutes <= 0) {
      setError('Please enter a valid positive number.');
      return;
    }

    if (isNaN(parsedRestMinutes) || parsedRestMinutes <= 0) {
      setError('Please enter a valid positive number.');
      return;
    }

    setError('');
    setSubmitted(true);
    router.replace(`/timer?phases=${parsedPhases}&minutes=${parsedMinutes}&restmins=${parsedRestMinutes}`);
    console.log("pushed"); 
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-3xl font-bold">Enter Number of Phases</h1>
        
        <div>
          <label htmlFor="numPhases" className="block text-lg font-medium">Number of Phases:</label>
          <input
            type="number"
            id="numPhases"
            value={numPhases}
            onChange={(e) => setNumPhases(e.target.value)}
            className="border px-4 py-2 rounded-lg w-48"
            min="1"
            placeholder="Enter a number"
          />
        </div>
        
        <div>
          <label htmlFor="numMinutes" className="block text-lg font-medium">Number of minutes in each phase:</label>
          <input
            type="number"
            id="numMinutes"
            value={numMinutes}
            onChange={(e) => setNumMinutes(e.target.value)}
            className="border px-4 py-2 rounded-lg w-48"
            min="1"
            placeholder="Enter a number"
          />
        </div>

        <div>
          <label htmlFor="numRestMinutes" className="block text-lg font-medium">Number of minutes in rest phase:</label>
          <input
            type="number"
            id="numRestMinutes"
            value={numRestMinutes}
            onChange={(e) => setNumRestMinutes(e.target.value)}
            className="border px-4 py-2 rounded-lg w-48"
            min="1"
            placeholder="Enter a number"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex space-x-4">
          <Button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">Submit</Button>
          <Button
            type="button"
            onClick={() => { setNumPhases(''); setError(''); setSubmitted(false); }}
            className="bg-gray-500 text-white px-6 py-2 rounded"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Home;
