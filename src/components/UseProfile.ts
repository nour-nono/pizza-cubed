import { useEffect, useState } from 'react';

export function useProfile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch('/api/profile').then((response) => {
      response.json().then((data) => {
        data = data[0];
        setData(data);
        setLoading(false);
      });
    });
  }, []);

  return { loading, data };
}
