// Dependencies
import { useRef, useState, useEffect } from 'react';

export default () => {
  const ref = useRef(false);
  const [, setIsMounted] = useState(false);

  useEffect(() => {
    ref.current = true;

    setIsMounted(true);

    return () => (ref.current = false);
  }, []);

  return () => ref.current;
};
