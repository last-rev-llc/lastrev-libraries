import { useEffect, useState } from 'react';

function useGetHeaderHeight() {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.getElementById('header');

    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  return headerHeight;
}

export default useGetHeaderHeight;
