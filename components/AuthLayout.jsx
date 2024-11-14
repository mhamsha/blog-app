import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUserStatus } from "../src/hooks/useAuthService";
import PropTypes from "prop-types";

// * Prop Validation
Protected.propTypes = {
  children: PropTypes.node.isRequired,
  authentication: PropTypes.bool,
};

// * Protecting Routing
function Protected({ children, authentication = true }) {
  const authStatus = useAuthUserStatus();
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to login if user is not authenticated and authentication is required
    if (!authStatus && authentication) {
      navigate("/login");
    } 
    // Navigate to home if user is authenticated but authentication is not required
    else if (authStatus && !authentication) {
      navigate("/");
      // just for testing
    }
  }, [authStatus, authentication, navigate]);

  return <>{children}</>;
}

export default Protected;