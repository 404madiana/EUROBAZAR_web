import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const REFRESH_KEY = "eurobazar_404_refresh_count";
const VALID_PAGES = ["/", "/stores", "/about", "/contact", "/help"];

export default function Reset404Counter() {
  const location = useLocation();

  useEffect(() => {
    if (VALID_PAGES.includes(location.pathname)) {
      window.localStorage.setItem(REFRESH_KEY, "0");
    }
  }, [location.pathname]);

  return null;
}