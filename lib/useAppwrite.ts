import { Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Models } from 'react-native-appwrite';

interface UseAppwriteProps {
  fn: () => Promise<Models.Document[]>;
}

const useAppwrite = (fn: UseAppwriteProps['fn']) => {
  const [data, setData] = useState<Models.Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();

      setData(response);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, refetch };
};

export default useAppwrite;
