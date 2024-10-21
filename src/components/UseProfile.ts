import { useEffect, useState } from 'react';

interface ReturnedData {
  loading: boolean;
  data: {
    user: string;
    email: string;
    image: string;
    userInfos: {
      email: string;
      streetAddress: string;
      postalCode: string;
      city: string;
      phone: string;
      admin: boolean;
    };
  } | null;
}

export function useProfile():Partial<ReturnedData> {
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
