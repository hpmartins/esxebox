import React from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import PropTypes from "prop-types";

const {
  Draggable: {
    Container: DraggableContainer,
    RowActionsCell,
    DropTargetRowContainer
  },
  Data: { Selectors }
} = require("react-data-grid-addons");

const RowRenderer = DropTargetRowContainer(ReactDataGrid.Row);

class TableTest extends React.Component {
  static propTypes = {
    rowKey: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
  };

  static defaultProps = { rowKey: "index", data: [], columns: [] };

  constructor(props) {
    super(props);

    this._columns = this.props.columns;
    if (!this._columns || this._columns.length == 0) {
      this._columns = [{key: "index", name: "Index"}];
    }

    this.state = { selectedIds: [] };
  }

  isDraggedRowSelected = (selectedRows, rowDragSource) => {
    if (selectedRows && selectedRows.length > 0) {
      let key = this.props.rowKey;
      return (
        selectedRows.filter(r => r[key] === rowDragSource.data[key]).length > 0
      );
    }
    return false;
  };

  reorderRows = e => {
    let selectedRows = Selectors.getSelectedRowsByKey({
      rowKey: this.props.rowKey,
      selectedKeys: this.state.selectedIds,
      rows: this.props.data,
    });
    let draggedRows = this.isDraggedRowSelected(selectedRows, e.rowSource)
      ? selectedRows
      : [e.rowSource.data];
    let undraggedRows = this.props.data.filter(function(r) {
      return draggedRows.indexOf(r) === -1;
    });
    let args = [e.rowTarget.idx, 0].concat(draggedRows);
    Array.prototype.splice.apply(undraggedRows, args);
    this.props.onReOrder(undraggedRows)
  };

  onRowsSelected = rows => {
    this.setState({
      selectedIds: this.state.selectedIds.concat(
        rows.map(r => r.row[this.props.rowKey])
      )
    });
  };

  onRowsDeselected = rows => {
    let rowIds = rows.map(r => r.row[this.props.rowKey]);
    this.setState({
      selectedIds: this.state.selectedIds.filter(i => rowIds.indexOf(i) === -1)
    });
  };

  render() {
    return (
      <DraggableContainer>
        <ReactDataGrid
          enableCellSelection={true}
          rowActionsCell={RowActionsCell}
          columns={this._columns}
          rowGetter={(i) => {return this.props.data[i]}}
          rowsCount={this.props.data.length}
          minHeight={650}
          rowRenderer={<RowRenderer onRowDrop={this.reorderRows} />}
          rowSelection={{
            showCheckbox: true,
            enableShiftSelect: true,
            onRowsSelected: this.onRowsSelected,
            onRowsDeselected: this.onRowsDeselected,
            selectBy: {
              keys: {
                rowKey: this.props.rowKey,
                values: this.state.selectedIds
              }
            }
          }}
        />
      </DraggableContainer>
    );
  }
}

export default TableTest;
