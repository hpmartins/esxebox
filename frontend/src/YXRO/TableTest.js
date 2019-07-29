import React from "react";
import ReactDataGrid from "react-data-grid";
import PropTypes from "prop-types";

import { Menu } from "react-data-grid-addons";
import "./contextmenu.css";

const {
  Draggable: {
    Container: DraggableContainer,
    RowActionsCell,
    DropTargetRowContainer
  }
} = require("react-data-grid-addons");

const { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } = Menu;
const RowRenderer = DropTargetRowContainer(ReactDataGrid.Row);

function ExampleContextMenu({
  idx,
  id,
  rowIdx,
  onRowDelete,
  onRowInsertAbove,
  onRowInsertBelow
}) {
  return (
    <ContextMenu id={id}>
      <MenuItem data={{ rowIdx, idx }} onClick={onRowDelete}>
        Delete Row
      </MenuItem>
      <SubMenu title="Insert Row">
        <MenuItem data={{ rowIdx, idx }} onClick={onRowInsertAbove}>
          Above
        </MenuItem>
        <MenuItem data={{ rowIdx, idx }} onClick={onRowInsertBelow}>
          Below
        </MenuItem>
      </SubMenu>
    </ContextMenu>
  );
}

class TableTest extends React.Component {
  static propTypes = {
    rowKey: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
  };

  static defaultProps = { rowKey: "index", data: [], columns: [] };

  constructor(props) {
    super(props);

    this._columns = this.props.columns;
    if (!this._columns || this._columns.length === 0) {
      this._columns = [{key: "index", name: "Index"}];
    }
  }

  onReorderRows = e => {
    let draggedRows = [e.rowSource.data];
    let undraggedRows = this.props.data.filter(function(r) {
      return draggedRows.indexOf(r) === -1;
    });
    let args = [e.rowTarget.idx, 0].concat(draggedRows);
    Array.prototype.splice.apply(undraggedRows, args);
    this.props.onRowsUpdated(undraggedRows)
  };

  onEditRow = ({ fromRow, toRow, updated }) => {
    const newdata = this.props.data.slice();
    for (let i = fromRow; i <= toRow; i++) {
      newdata[i] = { ...newdata[i], ...updated };
    }
    this.props.onRowsUpdated(newdata);
  };

  onDeleteRow = rowIdx => {
    const nextRows = this.props.data.slice();
    nextRows.splice(rowIdx, 1);
    this.props.onRowsUpdated(nextRows);
  };

  onInsertRow = rowIdx => {
    const newRow = {index: rowIdx, Name: '', Thickness: 1.0}
    const nextRows = this.props.data.slice();
    nextRows.splice(rowIdx, 0, newRow);
    this.props.onRowsUpdated(nextRows);
  };

  render() {
    return (
      <DraggableContainer>
        <ReactDataGrid
          RowsContainer={ContextMenuTrigger}
          rowActionsCell={RowActionsCell}
          columns={this._columns}
          rowGetter={i => this.props.data[i]}
          rowsCount={this.props.data.length}
          minHeight={650}
          rowRenderer={<RowRenderer onRowDrop={this.onReorderRows} />}
          onGridRowsUpdated={this.onEditRow}
          enableCellSelect={true}
          contextMenu={
            <ExampleContextMenu
              onRowDelete={(e, { rowIdx }) => this.onDeleteRow(rowIdx)}
              onRowInsertAbove={(e, { rowIdx }) => this.onInsertRow(rowIdx)}
              onRowInsertBelow={(e, { rowIdx }) => this.onInsertRow(rowIdx + 1)}
            />
          }
        />
      </DraggableContainer>
    );
  }
}

export default TableTest;
