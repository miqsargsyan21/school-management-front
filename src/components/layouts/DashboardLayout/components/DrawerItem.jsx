import PropTypes from "prop-types";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link,
} from "@mui/material";

const DrawerItem = (props) => {
  const { href, text, icon } = props;

  return (
    <Link href={href} underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </Link>
  );
};

DrawerItem.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default DrawerItem;
