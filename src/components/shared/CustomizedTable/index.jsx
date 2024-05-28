import { ActionButton, StyledTableCell, StyledTableRow } from "./components";
import TableContainer from "@mui/material/TableContainer";
import { Edit, Delete } from "@mui/icons-material";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ButtonGroup } from "@mui/material";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { useCallback } from "react";
import PropTypes from "prop-types";

const CustomizedTable = (props) => {
  const { columns, rows, onDelete } = props;

  const onEditClick = useCallback((id) => {
    console.log("edit -> id: ", id);
  }, []);

  const onDeleteClick = useCallback(
    (id) => {
      if (onDelete) {
        onDelete(id);
      }
    },
    [onDelete],
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <StyledTableCell
                key={column}
                align={index === 0 ? "left" : "right"}
              >
                {column}
              </StyledTableCell>
            ))}
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              {columns.map((column, index) => (
                <StyledTableCell
                  component={index === 0 ? "th" : undefined}
                  scope={index === 0 ? "row" : undefined}
                  align={index === 0 ? "left" : "right"}
                  key={column}
                >
                  {row[column.toLowerCase()]}
                </StyledTableCell>
              ))}
              <StyledTableCell align="right">
                <ButtonGroup
                  variant="contained"
                  color="inherit"
                  aria-label="Basic button group"
                >
                  <ActionButton
                    id={row.id}
                    handler={onEditClick}
                    icon={<Edit />}
                  />
                  <ActionButton
                    handler={onDeleteClick}
                    icon={<Delete />}
                    color="error"
                    id={row.id}
                  />
                </ButtonGroup>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

CustomizedTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func,
};

export default CustomizedTable;
