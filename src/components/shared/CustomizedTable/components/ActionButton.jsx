import { Button } from "@mui/material";
import { useCallback } from "react";
import PropTypes from "prop-types";

const ActionButton = (props) => {
  const { handler, color = "success", variant = "contained", icon, id } = props;

  const onClick = useCallback(() => {
    handler(id);
  }, [handler, id]);

  return (
    <Button variant={variant} onClick={onClick} color={color}>
      {icon}
    </Button>
  );
};

ActionButton.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handler: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
};

export default ActionButton;
