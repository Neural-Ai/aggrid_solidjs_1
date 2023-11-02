// import { createResource } from 'solid-js';
import jsonData from './olympic-winners.json';
import { onCleanup } from 'solid-js';
// import { AgGridSolid } from 'ag-grid-solid'; // Check the correct export name
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

// import type { Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import { createSignal, onCleanup } from 'solid-js';
import { Component, createResource, onMount } from 'solid-js';


const MyRenderer = (props) => {
  return (
    <span class="my-renderer">
      <img
        src="https://www.ag-grid.com/example-assets/spinner.gif"
        class="my-spinner"
      />
      <span class="my-renderer-value">{props.value}</span>
    </span>
  );
};

const fetchData = async () => {
  return jsonData; // Return the locally imported JSON data
};

const Child = (props) => {
  const [rowData] = createResource(fetchData);

  let gridRef;

  // show chart on first rendering
  const onFirstDataRendered = () => {
    if (gridRef) {
      gridRef.api.createRangeChart({
        chartType: 'groupedColumn',
        cellRange: {
          rowStartIndex: 0,
          rowEndIndex: 4,
          columns: ['ag-Grid-AutoColumn', 'gold', 'silver'],
        },
      });
    }
  };



  const pages = {
    Uno: {
      columnDefs: [ {
        field: 'country',
        enableRowGroup: true,
        rowGroup: true,
        hide: true,
        cellRenderer: MyRenderer,
      },
      { field: 'sport', enableRowGroup: true, hide: true, rowGroup: true },
      { field: 'athlete', enableRowGroup: true, hide: true },
      { field: 'gold', aggFunc: 'sum' },
      { field: 'silver', aggFunc: 'sum' },
      { field: 'bronze', aggFunc: 'sum' },
      { field: 'total', aggFunc: 'sum' },
        // Define column definitions for the "Uno" page
      ],
    },
    Dos: {
      // Content for the "Dos" page
    },
    Tres: {
      // Content for the "Tres" page
    },
    // Add more pages as needed
  };

  const currentPage = pages[props.page]; // Get the content based on the page prop




  // const columnDefs = [
  //   {
  //     field: 'country',
  //     enableRowGroup: true,
  //     rowGroup: true,
  //     hide: true,
  //     cellRenderer: MyRenderer,
  //   },
  //   { field: 'sport', enableRowGroup: true, hide: true, rowGroup: true },
  //   { field: 'athlete', enableRowGroup: true, hide: true },
  //   { field: 'gold', aggFunc: 'sum' },
  //   { field: 'silver', aggFunc: 'sum' },
  //   { field: 'bronze', aggFunc: 'sum' },
  //   { field: 'total', aggFunc: 'sum' },
  // ];

  const defaultColDef = {
    resizable: true,
    sortable: true,
  };
  const autoGroupColumnDef = {
    cellRendererParams: {
      suppressCount: true,
      checkbox: true,
    },
    field: 'athlete',
    width: 300,
  };

  onCleanup(() => {
    // Cleanup logic here if needed
  });

  return (
    <div style={{ flex: '1', width: '100%' , height:'100%'}}>
    <div class="ag-theme-alpine" style={{ width: '100%', height: '100%' }}>
 
        <AgGridSolid
          animateRows={true}
          columnDefs={currentPage.columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          rowGroupPanelShow="always"
          enableRangeSelection={true}
          enableCharts={true}
          rowData={rowData()}
          rowSelection="multiple"
          // onFirstDataRendered={onFirstDataRendered}
          groupSelectsChildren={true}
          suppressRowClickSelection={true}
          ref={gridRef}
        />
      </div>
    </div>
  );
};

export default Child;
