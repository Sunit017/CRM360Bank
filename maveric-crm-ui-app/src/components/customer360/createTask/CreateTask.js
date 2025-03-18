import React, { useState, useCallback, useMemo, useEffect } from "react";
import AgGrid from "../common/AgGrid";
import { CreateTaskColumns } from "../common/columnDef";
import { Grid } from "@mui/material";
import styled from "styled-components";
import TasksToolbarContainer from "./tasksToolbarContainer";

const Info = styled.div`
  padding: 4px;
  padding-left: 10px;
  font-weight: 600;
  border-radius: 4px;
  background: #b1e1ff;
  text-align: center;
  font-size: 12px;
`;

const CreateTask = () => {
  const tasks = [
    {
      id: "task1",
      title: "Get information",
      scenario: "need information",
      taskMessage:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      status: "open",
    },
    {
      id: "task2",
      title: "Get information 1",
      scenario: "need information 1",
      taskMessage:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      status: "open",
    },
    {
      id: "task3",
      title: "Get information 3",
      scenario: "need information 3",
      taskMessage:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      status: "open",
    },
  ];

  const [gridApi, setGridApi] = useState(null);
  const [isEditEnable, setIsEditEnable] = useState(false);
  const [gridUpdates, setGridUpdates] = useState([]);

  const editableColumnDef = CreateTaskColumns.map((item, index) => {
    let col = { ...item };
    if (item.field === "status") {
      col.editable = true;
    }
    return col;
  });

  const handleEdit = () => {
    setIsEditEnable(true);
  };

  const handleSave = () => {
    console.log("gridUpdates ##", gridUpdates);
    setIsEditEnable(false);
  };

  const onCellValueChanged = (event) => {
    const { data } = event;
    let list = [];
    if (gridUpdates.length) {
      const inList = gridUpdates.filter((item) => item.id === data.id);
      if (inList.length) {
        gridUpdates.map((item) => {
          let listData = { ...item };
          if (item.id === data.id) {
            listData = { ...data };
          }
          list.push(listData);
        });
      } else {
        list = [...gridUpdates];
        list.push(data);
      }
    } else {
      list.push(data);
    }
    setGridUpdates(list);
  };

  return (
    <>
      <div
        style={{
          marginTop: "0px",
          padding: "5px 8px 5px 8px",
          // height: "calc(100vh - 220px)",
          // overflow: "auto",
          // border: "1px solid red",
        }}
      >
        <Grid item xs={12} sm={12} md={4}>
          <Info style={{ fontSize: "14px" }}>Tasks</Info>
        </Grid>

        <TasksToolbarContainer
          isEditEnable={isEditEnable}
          onEdit={handleEdit}
          onSave={handleSave}
        />

        <AgGrid
          data={tasks}
          columns={isEditEnable ? editableColumnDef : CreateTaskColumns}
          style={{ height: 380 }}
          setGridApi={setGridApi}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </>
  );
};

export default CreateTask;
