import React, { useState, useEffect } from 'react';
import Table from '../components/Table';

export default function PackagePage() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/packages');
        const json = await response.json();
        console.log(json);
        if (response.ok) {
          setPackages(json);
        }
      } catch (error) {
        console.error('An error occurred while fetching data', error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="container">
      <Table packages={packages} />
    </div>
  );
}

